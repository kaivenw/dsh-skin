/**
 * 本地素材仓库：IndexedDB 存 Blob（图片 / 动图 / 视频），localStorage 只存引用 id。
 * 导入时对大静态图做一次降采样（<= 2560px），动图与视频保持原文件，避免破坏动画。
 */

const DB_NAME = 'dsh-skin'
const DB_VERSION = 1
const STORE = 'media'
const MAX_IMAGE_EDGE = 1920
const MAX_IMAGE_BYTES = 80 * 1024 * 1024
const MAX_VIDEO_BYTES = 200 * 1024 * 1024
const MAX_TOTAL_BYTES = 1.2 * 1024 * 1024 * 1024
const THUMB_EDGE = 360

let dbPromise = null

function openDb() {
  if (dbPromise) return dbPromise
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'id' })
        store.createIndex('addedAt', 'addedAt')
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error('indexedDB open failed'))
  })
  return dbPromise
}

function tx(mode) {
  return openDb().then((db) => db.transaction(STORE, mode).objectStore(STORE))
}

function done(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error('indexedDB request failed'))
  })
}

export async function putLocal(record) {
  const store = await tx('readwrite')
  await done(store.put(record))
  return record.id
}

export async function getLocal(id) {
  if (!id) return null
  const store = await tx('readonly')
  return (await done(store.get(id))) ?? null
}

export async function listLocal() {
  const store = await tx('readonly')
  const rows = await done(store.getAll())
  return (Array.isArray(rows) ? rows : [])
    .map(({ blob, thumbBlob, ...meta }) => meta)
    .sort((a, b) => (b.addedAt ?? 0) - (a.addedAt ?? 0))
}

export async function removeLocal(id) {
  if (!id) return
  const store = await tx('readwrite')
  await done(store.delete(id))
}

export async function clearLocal() {
  const store = await tx('readwrite')
  await done(store.clear())
}

export function newLocalId() {
  return 'local-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8)
}

function isAnimatedType(type) {
  return type === 'image/gif'
}

function readImageSize(blob) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(blob)
    const image = new Image()
    image.onload = () => {
      resolve({ width: image.naturalWidth || 0, height: image.naturalHeight || 0 })
      URL.revokeObjectURL(url)
    }
    image.onerror = () => {
      resolve({ width: 0, height: 0 })
      URL.revokeObjectURL(url)
    }
    image.src = url
  })
}

/** 生成 360px 缩略图：面板列表只解码小图，避免每张本地大图都被解码进内存。 */
async function makeThumbnail(blob, width, height) {
  const edge = Math.max(width, height)
  if (edge <= 0) return null
  const scale = Math.min(1, THUMB_EDGE / edge)
  const target = { width: Math.max(1, Math.round(width * scale)), height: Math.max(1, Math.round(height * scale)) }
  try {
    const bitmap = await createImageBitmap(blob)
    const canvas = document.createElement('canvas')
    canvas.width = target.width
    canvas.height = target.height
    const context = canvas.getContext('2d')
    context.imageSmoothingQuality = 'high'
    context.drawImage(bitmap, 0, 0, target.width, target.height)
    bitmap.close?.()
    const thumb = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', 0.82))
    return thumb ?? null
  } catch {
    return null
  }
}

async function downscaleImage(blob, width, height) {
  const edge = Math.max(width, height)
  if (edge <= MAX_IMAGE_EDGE) return blob
  const scale = MAX_IMAGE_EDGE / edge
  const target = { width: Math.max(1, Math.round(width * scale)), height: Math.max(1, Math.round(height * scale)) }
  try {
    const bitmap = await createImageBitmap(blob)
    const canvas = document.createElement('canvas')
    canvas.width = target.width
    canvas.height = target.height
    const context = canvas.getContext('2d')
    context.imageSmoothingQuality = 'high'
    context.drawImage(bitmap, 0, 0, target.width, target.height)
    bitmap.close?.()
    const next = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', 0.9))
    return next ?? blob
  } catch {
    return blob
  }
}

/**
 * 用户选择/拖入/粘贴的文件 → IndexedDB 记录。
 * @returns {Promise<{id:string,name:string,mime:string,kind:'image'|'animated'|'video',width:number,height:number,size:number}>}
 */
export async function importLocalFile(file) {
  if (!(file instanceof Blob)) throw new Error('不是可用的文件')
  const type = file.type || ''
  const isVideo = type.startsWith('video/')
  const isImage = type.startsWith('image/')
  if (!isVideo && !isImage) throw new Error('只支持图片、动图（GIF）或视频文件')
  if (isVideo && file.size > MAX_VIDEO_BYTES) throw new Error('视频超过 200MB，换小一点的视频或改用链接')
  if (isImage && file.size > MAX_IMAGE_BYTES) throw new Error('图片超过 80MB，先压缩一下再导入')
  try {
    const estimate = await navigator.storage?.estimate?.()
    if (estimate && Number(estimate.usage) + file.size > MAX_TOTAL_BYTES) {
      throw new Error('本地素材总占用接近 1.2GB，请先删掉一些旧素材再导入')
    }
  } catch (error) {
    if (String(error?.message || '').includes('1.2GB')) throw error
  }

  let blob = file
  let width = 0
  let height = 0
  let kind = isVideo ? 'video' : 'image'

  if (isVideo) {
    const size = await new Promise((resolve) => {
      const url = URL.createObjectURL(file)
      const video = document.createElement('video')
      video.preload = 'metadata'
      video.onloadedmetadata = () => {
        resolve({ width: video.videoWidth || 0, height: video.videoHeight || 0 })
        URL.revokeObjectURL(url)
      }
      video.onerror = () => {
        resolve({ width: 0, height: 0 })
        URL.revokeObjectURL(url)
      }
      video.src = url
    })
    width = size.width
    height = size.height
  } else {
    const size = await readImageSize(file)
    width = size.width
    height = size.height
    if (isAnimatedType(type)) {
      kind = 'animated'
    } else {
      blob = await downscaleImage(file, width, height)
      if (blob !== file) {
        const nextSize = await readImageSize(blob)
        width = nextSize.width || width
        height = nextSize.height || height
      }
    }
  }

  const id = newLocalId()
  const thumbBlob = isVideo ? null : await makeThumbnail(blob, width, height)
  await putLocal({
    id,
    name: file.name || (kind === 'video' ? '本地视频' : '本地图片'),
    mime: blob.type || type || '',
    kind,
    width,
    height,
    size: blob.size,
    blob,
    thumbBlob,
    addedAt: Date.now()
  })
  return { id, name: file.name || '', mime: blob.type || type, kind, width, height, size: blob.size }
}

/** 从剪贴板/拖拽里挑第一个可用的媒体文件。 */
export function pickMediaFile(files) {
  const list = Array.from(files ?? [])
  return list.find((file) => {
    const type = file?.type || ''
    return type.startsWith('image/') || type.startsWith('video/')
  }) ?? null
}

/** 素材地址：asset/remote 直接用 URL；local 从 IndexedDB 取 Blob 生成 object URL（调用方负责 revoke）。 */
export function sourceUrl(source) {
  if (!source) return null
  if (source.type === 'asset') return '/dsh-skin/assets/' + source.file.replace(/^\/+/, '')
  if (source.type === 'remote') return source.url ?? null
  return null
}

export function assetThumbUrl(thumb) {
  if (!thumb) return null
  if (/^https?:\/\//i.test(thumb) || thumb.startsWith('/')) return thumb
  return '/dsh-skin/assets/' + thumb.replace(/^\/+/, '')
}
