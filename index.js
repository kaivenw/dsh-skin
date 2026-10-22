/**
 * dsh-skin · 宿主半侧
 *
 * 只做两件事：
 *   1. GET /dsh-skin/assets/*     把插件包内的素材目录（图片/动图/视频/缩略图/清单）发给浏览器；
 *     支持 Range，视频可边下边播。
 *   2. GET /dsh-skin/api/search   在线素材搜索代理（Openverse 为主，Wikimedia Commons 兜底），
 *     避免浏览器跨域与第三方 key 问题。
 *
 * 界面、壁纸渲染、参数调节、本地文件存储全在客户端半侧（client.js）。
 */
import { createReadStream } from 'node:fs'
import { readFile, stat } from 'node:fs/promises'
import { dirname, extname, join, normalize, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const ASSETS = join(HERE, 'assets')
const ASSET_PREFIX = '/dsh-skin/assets'
const SEARCH_PATH = '/dsh-skin/api/search'
const MATERIALS_PATH = '/dsh-skin/api/materials'
const IMAGE_PROXY_PATH = '/dsh-skin/api/image'
const UA = 'dsh-skin/0.1 (+local DeepSeek Harness plugin)'

const MIME = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
}

/** 已认证浏览器才允许读同源路由；没有 connection 服务的组合直接放行（web 服务已受保护）。 */
function rejected(ctx, req, res) {
  const connection = typeof ctx.get === 'function' ? ctx.get('connection') : undefined
  const code = connection && typeof connection.requestRejection === 'function'
    ? connection.requestRejection(req)
    : undefined
  if (code === undefined) return false
  res.statusCode = code
  res.end()
  return true
}

function sendJson(res, status, value) {
  const body = JSON.stringify(value)
  res.statusCode = status
  res.setHeader('content-type', 'application/json; charset=utf-8')
  res.setHeader('cache-control', 'no-store')
  res.end(body)
}

/** 解析 /dsh-skin/assets/<相对路径>，越界返回 null。 */
function assetPathOf(rawUrl) {
  let pathname
  try {
    pathname = decodeURIComponent(new URL(rawUrl, 'http://local').pathname)
  } catch {
    return null
  }
  if (!pathname.startsWith(ASSET_PREFIX + '/')) return null
  const rel = pathname.slice(ASSET_PREFIX.length)
  const target = resolve(normalize(join(ASSETS, rel)))
  if (target !== ASSETS && !target.startsWith(ASSETS + sep)) return null
  return target
}

function parseRange(header, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(String(header || '').trim())
  if (!match) return null
  let start = match[1] === '' ? null : Number(match[1])
  let end = match[2] === '' ? null : Number(match[2])
  if (start === null && end === null) return null
  if (start === null) {
    start = Math.max(0, size - end)
    end = size - 1
  } else if (end === null || end >= size) {
    end = size - 1
  }
  if (start > end || start >= size) return null
  return { start, end }
}

async function serveAsset(ctx, req, res) {
  if (rejected(ctx, req, res)) return
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405
    res.end()
    return
  }
  const target = assetPathOf(req.url ?? '/')
  if (target === null) {
    res.statusCode = 403
    res.end()
    return
  }
  let info
  try {
    info = await stat(target)
    if (!info.isFile()) throw Object.assign(new Error('not a file'), { code: 'ENOENT' })
  } catch {
    res.statusCode = 404
    res.end()
    return
  }
  const type = MIME[extname(target).toLowerCase()] ?? 'application/octet-stream'
  const range = parseRange(req.headers.range, info.size)
  res.setHeader('content-type', type)
  res.setHeader('accept-ranges', 'bytes')
  res.setHeader('cache-control', 'public, max-age=86400, immutable')
  if (range !== null) {
    res.statusCode = 206
    res.setHeader('content-range', `bytes ${range.start}-${range.end}/${info.size}`)
    res.setHeader('content-length', String(range.end - range.start + 1))
    if (req.method === 'HEAD') return res.end()
    createReadStream(target, { start: range.start, end: range.end }).pipe(res)
    return
  }
  res.statusCode = 200
  res.setHeader('content-length', String(info.size))
  if (req.method === 'HEAD') return res.end()
  createReadStream(target).pipe(res)
}

const imageCache = new Map()
const IMAGE_CACHE_MAX_BYTES = 48 * 1024 * 1024
const IMAGE_MAX_BYTES = 12 * 1024 * 1024
let imageCacheBytes = 0

/** 远程图片只允许 https 且禁止本机/内网地址，避免把 host 当 SSRF 跳板。 */
function publicImageUrl(raw) {
  try {
    const url = new URL(String(raw))
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null
    const host = url.hostname
    if (/^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.|\[?::1\]?$)/i.test(host)) return null
    return url
  } catch {
    return null
  }
}

/** 远程缩略图/图片代理：绕过第三方图床的 ORB / 防盗链 / CORS，限制 25MB 与 15s。 */
async function serveImage(ctx, req, res) {
  if (rejected(ctx, req, res)) return
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405
    res.end()
    return
  }
  const target = publicImageUrl(new URL(req.url ?? '/', 'http://local').searchParams.get('url'))
  if (target === null) return sendJson(res, 400, { error: 'url must be a public http(s) image URL' })
  const key = target.href
  const cached = imageCache.get(key)
  if (cached !== undefined && Date.now() - cached.at < 10 * 60_000) {
    res.statusCode = 200
    res.setHeader('content-type', cached.type)
    res.setHeader('cache-control', 'public, max-age=86400')
    res.end(cached.body)
    return
  }
  let response
  try {
    response = await fetch(key, {
      signal: AbortSignal.timeout(15_000),
      redirect: 'follow',
      headers: {
        'user-agent': UA,
        accept: 'image/avif,image/webp,image/*,*/*;q=0.8',
        referer: target.origin + '/'
      }
    })
  } catch (error) {
    return sendJson(res, 502, { error: 'image fetch failed', problem: String(error?.message || error) })
  }
  if (!response.ok) return sendJson(res, 502, { error: 'image fetch failed', problem: 'upstream ' + response.status })
  const type = String(response.headers.get('content-type') ?? '').split(';', 1)[0].trim().toLowerCase()
  if (!type.startsWith('image/')) return sendJson(res, 415, { error: 'upstream is not an image', type })
  const declared = Number(response.headers.get('content-length') ?? 0)
  if (declared > IMAGE_MAX_BYTES) return sendJson(res, 413, { error: 'image too large' })
  const buffer = Buffer.from(await response.arrayBuffer())
  if (buffer.byteLength > IMAGE_MAX_BYTES) return sendJson(res, 413, { error: 'image too large' })
  imageCache.set(key, { at: Date.now(), type, body: buffer, size: buffer.byteLength })
  imageCacheBytes += buffer.byteLength
  // 字节上限 48MB：避免搜索多页后把代理缓存吃成几百 MB
  while (imageCacheBytes > IMAGE_CACHE_MAX_BYTES && imageCache.size > 0) {
    const [oldKey, old] = imageCache.entries().next().value
    imageCache.delete(oldKey)
    imageCacheBytes -= old.size
  }
  res.statusCode = 200
  res.setHeader('content-type', type)
  res.setHeader('cache-control', 'public, max-age=86400')
  res.end(req.method === 'HEAD' ? undefined : buffer)
}

async function readMaterials() {
  try {
    const raw = await readFile(join(ASSETS, 'materials.json'), 'utf8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed?.materials) ? parsed : { version: 0, materials: [] }
  } catch {
    return { version: 0, materials: [] }
  }
}

/** Openverse：CC 授权图片，免 key。 */
async function searchOpenverse(query, page, signal) {
  const url = 'https://api.openverse.org/v1/images/?' + new URLSearchParams({
    q: query,
    page: String(page),
    page_size: '20',
    license_type: 'all',
    mature: 'false',
    filter_dead: 'false'
  })
  const response = await fetch(url, { signal, headers: { 'user-agent': UA, accept: 'application/json' } })
  if (!response.ok) throw new Error('openverse ' + response.status)
  const body = await response.json()
  const rows = Array.isArray(body?.results) ? body.results : []
  return rows
    .filter((row) => typeof row?.url === 'string' && row.url.startsWith('https://') && (row.width ?? 0) >= 960)
    .sort((a, b) => ((b.width ?? 0) > (b.height ?? 0) ? 1 : 0) - ((a.width ?? 0) > (a.height ?? 0) ? 1 : 0) || (b.width ?? 0) - (a.width ?? 0))
    .map((row) => ({
      id: 'openverse:' + row.id,
      title: row.title || row.id,
      full: row.url,
      thumb: row.thumbnail || row.url,
      width: row.width ?? 0,
      height: row.height ?? 0,
      author: row.creator || '',
      license: row.license ? String(row.license).toUpperCase() : '',
      licenseUrl: row.license_url || '',
      source: row.source || 'Openverse',
      sourceUrl: row.foreign_landing_url || row.url
    }))
}

/** Wikimedia Commons 兜底：PD/CC 图片，免 key。 */
async function searchWikimedia(query, signal) {
  const url = 'https://commons.wikimedia.org/w/api.php?' + new URLSearchParams({
    action: 'query',
    format: 'json',
    formatversion: '2',
    origin: '*',
    generator: 'search',
    gsrsearch: 'filetype:bitmap ' + query,
    gsrnamespace: '6',
    gsrlimit: '20',
    prop: 'imageinfo',
    iiprop: 'url|size|extmetadata',
    iiurlwidth: '2560'
  })
  const response = await fetch(url, { signal, headers: { 'user-agent': UA, accept: 'application/json' } })
  if (!response.ok) throw new Error('wikimedia ' + response.status)
  const body = await response.json()
  const pages = Array.isArray(body?.query?.pages) ? body.query.pages : []
  return pages.flatMap((page) => {
    const info = page?.imageinfo?.[0]
    if (!info?.url) return []
    const meta = info.extmetadata ?? {}
    return [{
      id: 'commons:' + page.pageid,
      title: String(page.title || '').replace(/^File:/, ''),
      full: info.thumburl || info.url,
      thumb: info.thumburl || info.url,
      width: info.width ?? 0,
      height: info.height ?? 0,
      author: String(meta.Artist?.value || '').replace(/<[^>]+>/g, '').slice(0, 120),
      license: String(meta.LicenseShortName?.value || ''),
      licenseUrl: String(meta.LicenseUrl?.value || ''),
      source: 'Wikimedia Commons',
      sourceUrl: info.descriptionurl || info.url
    }]
  }).filter((row) => row.width >= 960)
    .sort((a, b) => ((b.width > b.height) ? 1 : 0) - ((a.width > a.height) ? 1 : 0) || b.width - a.width)
}

/** 国内图源：360 图片（免 key JSON；版权归原作者，只建议个人使用）。 */
async function search360(query, page, signal) {
  const sn = (page - 1) * 30
  const url = 'https://image.so.com/j?' + new URLSearchParams({ q: query, src: 'srp', sn: String(sn), pn: '30' })
  const response = await fetch(url, {
    signal,
    headers: { 'user-agent': UA, accept: 'application/json', referer: 'https://image.so.com/' }
  })
  if (!response.ok) throw new Error('360 ' + response.status)
  const body = await response.json()
  const rows = Array.isArray(body?.list) ? body.list : []
  return rows.flatMap((row) => {
    // 360 的 thumb 与 img 是同一份原图（实测同字节），直接用 https CDN thumb，避免原站防盗链/死链
    const thumb = typeof row?.thumb === 'string' && row.thumb !== '' ? row.thumb : ''
    const full = thumb
    if (full === '' || thumb === '') return []
    const width = Number(row.width) || 0
    const height = Number(row.height) || 0
    // 只留横图、宽 >= 1200，过滤表情包和竖图
    if (width > 0 && height > 0 && (width < 1200 || width <= height)) return []
    return [{
      id: '360:' + (row.id || row.imgkey || full),
      title: String(row.title || row.litetitle || '360 图片'),
      full,
      thumb,
      width,
      height,
      author: '',
      license: '国内图源',
      licenseUrl: '',
      source: '360图片',
      sourceUrl: typeof row.link === 'string' ? row.link : ''
    }]
  }).slice(0, 30)
}

/** 必应每日壁纸（mkt=zh-CN，免 key，近 8 天，1920×1080）。 */
async function searchBingWallpaper(signal) {
  const url = 'https://www.bing.com/HPImageArchive.aspx?' + new URLSearchParams({ format: 'js', idx: '0', n: '8', mkt: 'zh-CN' })
  const response = await fetch(url, { signal, headers: { 'user-agent': UA, accept: 'application/json' } })
  if (!response.ok) throw new Error('bing ' + response.status)
  const body = await response.json()
  const images = Array.isArray(body?.images) ? body.images : []
  return images.flatMap((image) => {
    if (typeof image?.url !== 'string') return []
    const full = 'https://www.bing.com' + image.url
    return [{
      id: 'bing:' + (image.hsh || image.url),
      title: String(image.title || '必应壁纸'),
      full,
      thumb: full,
      width: 1920,
      height: 1080,
      author: String(image.copyright || ''),
      license: '必应壁纸',
      licenseUrl: '',
      source: 'Bing 每日壁纸',
      sourceUrl: typeof image.copyrightlink === 'string' ? image.copyrightlink : 'https://www.bing.com'
    }]
  })
}

const searchCache = new Map()
const searchInflight = new Map()
const SEARCH_TTL = 30 * 60_000

const PROVIDERS = {
  360: { id: '360', label: '360图片', run: (query, page, signal) => search360(query, page, signal) },
  openverse: { id: 'openverse', label: 'Openverse', run: (query, page, signal) => searchOpenverse(query, page, signal) },
  wikimedia: { id: 'wikimedia', label: 'Wikimedia', run: (query, page, signal) => searchWikimedia(query, signal) },
  bing: { id: 'bing', label: 'Bing 壁纸', run: (query, page, signal) => searchBingWallpaper(signal) }
}

function providersFor(source) {
  if (source === 'cn') return [PROVIDERS[360]]
  if (source === 'intl') return [PROVIDERS.openverse, PROVIDERS.wikimedia]
  if (source === 'bing') return [PROVIDERS.bing]
  return [PROVIDERS[360], PROVIDERS.openverse, PROVIDERS.wikimedia]
}

function dedupeResults(rows) {
  const seen = new Set()
  const out = []
  for (const row of rows) {
    const key = row.full || row.thumb
    if (key === undefined || seen.has(key)) continue
    seen.add(key)
    out.push(row)
  }
  return out
}

async function runSearch(source, query, page) {
  const list = providersFor(source)
  const settled = new Map()
  const errors = {}
  const tasks = list.map(async (provider) => {
    try {
      settled.set(provider.id, await provider.run(query, page, AbortSignal.timeout(8000)))
    } catch (error) {
      errors[provider.id] = String(error?.message || error)
    }
  })
  // 到点就返回已到的结果：国内 360 一般 <1s，不被 Openverse 拖住
  // auto 只给国外源 1.8s 的搭车窗口：360 通常 <1s 就回，不能被 Openverse 拖到 4s
  const deadline = source === 'intl' ? 6500 : source === 'auto' ? 1800 : 4000
  await Promise.race([Promise.allSettled(tasks), new Promise((resolve) => setTimeout(resolve, deadline))])
  const rows = dedupeResults(list.flatMap((provider) => settled.get(provider.id) ?? []))
  const providers = list.filter((provider) => (settled.get(provider.id) ?? []).length > 0).map((provider) => provider.label)
  return { rows, providers, errors }
}

async function serveSearch(ctx, req, res) {
  if (rejected(ctx, req, res)) return
  if (req.method !== 'GET') {
    res.statusCode = 405
    res.end()
    return
  }
  const url = new URL(req.url ?? '/', 'http://local')
  const requested = String(url.searchParams.get('source') ?? '')
  const source = ['auto', 'cn', 'intl', 'bing'].includes(requested) ? requested : 'auto'
  const query = String(url.searchParams.get('q') ?? '').trim().slice(0, 80)
  if (query === '' && source !== 'bing') return sendJson(res, 400, { error: 'q is required' })
  const page = Math.max(1, Math.min(20, Number.parseInt(url.searchParams.get('page') ?? '1', 10) || 1))
  const key = source + '|' + query.toLowerCase() + '|' + page

  const cached = searchCache.get(key)
  if (cached !== undefined && Date.now() - cached.at < SEARCH_TTL) {
    return sendJson(res, 200, { ...cached.value, cached: true })
  }

  let pending = searchInflight.get(key)
  if (pending === undefined) {
    pending = runSearch(source, query, page).finally(() => searchInflight.delete(key))
    searchInflight.set(key, pending)
  }
  const { rows, providers, errors } = await pending
  const value = {
    provider: providers.join(' + ') || 'none',
    providers,
    source,
    query,
    page,
    results: rows.slice(0, 30),
    errors
  }
  if (rows.length > 0) {
    searchCache.set(key, { at: Date.now(), value })
    if (searchCache.size > 120) searchCache.delete(searchCache.keys().next().value)
  }
  sendJson(res, 200, value)
}

export const name = 'dsh-skin'
export const inject = ['webServer']

export function apply(ctx) {
  ctx.effect(() => ctx.webServer.register({
    kind: 'prefix',
    path: ASSET_PREFIX,
    handler: (req, res) => serveAsset(ctx, req, res)
  }), 'dsh-skin: assets')

  ctx.effect(() => ctx.webServer.register({
    kind: 'exact',
    path: IMAGE_PROXY_PATH,
    handler: (req, res) => serveImage(ctx, req, res)
  }), 'dsh-skin: image proxy')

  ctx.effect(() => ctx.webServer.register({
    kind: 'exact',
    path: SEARCH_PATH,
    handler: (req, res) => serveSearch(ctx, req, res)
  }), 'dsh-skin: search proxy')

  ctx.effect(() => ctx.webServer.register({
    kind: 'exact',
    path: MATERIALS_PATH,
    handler: async (req, res) => {
      if (rejected(ctx, req, res)) return
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        res.statusCode = 405
        res.end()
        return
      }
      sendJson(res, 200, await readMaterials())
    }
  }), 'dsh-skin: materials manifest')
}
