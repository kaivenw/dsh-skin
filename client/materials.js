/**
 * 内置渐变预设 + 宿主机素材清单 + 在线素材搜索客户端。
 * 图片/动图/视频的实际文件由宿主侧 /dsh-skin/assets 提供，在线搜索走 /dsh-skin/api/search 代理。
 */

/** 不落文件的高级渐变（多层 radial 叠 linear，带缓慢漂移）。 */
export const GRADIENTS = [
  {
    id: 'grad-deep-aurora',
    name: '深海极光',
    kind: 'gradient',
    animated: true,
    gradient: 'radial-gradient(120% 90% at 18% 12%, #173a6b 0%, transparent 55%), radial-gradient(100% 80% at 82% 18%, #0a6a72 0%, transparent 52%), radial-gradient(120% 100% at 60% 100%, #2a1a5e 0%, transparent 58%), linear-gradient(160deg, #05070d, #070b14 60%, #04060b)',
    tags: ['深色', '蓝绿', '抽象'],
    palette: ['#0a2a52', '#0a6a72', '#2a1a5e']
  },
  {
    id: 'grad-dusk-lava',
    name: '暮色熔岩',
    kind: 'gradient',
    animated: true,
    gradient: 'radial-gradient(90% 70% at 15% 20%, #5b1e3c 0%, transparent 55%), radial-gradient(80% 70% at 85% 30%, #7a2f1f 0%, transparent 50%), radial-gradient(120% 100% at 50% 100%, #2a1230 0%, transparent 60%), linear-gradient(#0a060a, #0a060a)',
    tags: ['深色', '暖红', '抽象'],
    palette: ['#5b1e3c', '#7a2f1f', '#2a1230']
  },
  {
    id: 'grad-mist-glass',
    name: '雾青玻璃',
    kind: 'gradient',
    gradient: 'radial-gradient(80% 70% at 12% 10%, #d9ecff 0%, transparent 60%), radial-gradient(70% 60% at 88% 14%, #cfe9e2 0%, transparent 55%), radial-gradient(120% 110% at 50% 100%, #e7e2fb 0%, transparent 65%), linear-gradient(#f6f8fb, #f6f8fb)',
    tags: ['浅色', '青蓝', '柔和'],
    palette: ['#d9ecff', '#cfe9e2', '#e7e2fb']
  },
  {
    id: 'grad-morning-apricot',
    name: '晨雾杏光',
    kind: 'gradient',
    gradient: 'radial-gradient(80% 70% at 15% 12%, #ffe8d6 0%, transparent 60%), radial-gradient(70% 65% at 88% 20%, #ffd6e8 0%, transparent 55%), radial-gradient(120% 100% at 45% 100%, #fff2cf 0%, transparent 60%), linear-gradient(#fdf8f4, #fdf8f4)',
    tags: ['浅色', '暖杏', '柔和'],
    palette: ['#ffe8d6', '#ffd6e8', '#fff2cf']
  },
  {
    id: 'grad-teal-peacock',
    name: '孔雀石',
    kind: 'gradient',
    animated: true,
    gradient: 'radial-gradient(100% 80% at 20% 15%, #0f4c4a 0%, transparent 55%), radial-gradient(90% 80% at 85% 25%, #155e63 0%, transparent 52%), radial-gradient(120% 100% at 50% 100%, #08222e 0%, transparent 62%), linear-gradient(#05121a, #05121a)',
    tags: ['深色', '青绿', '抽象'],
    palette: ['#0f4c4a', '#155e63', '#05121a']
  },
  {
    id: 'grad-graphite',
    name: '石墨极简',
    kind: 'gradient',
    gradient: 'radial-gradient(120% 100% at 20% 0%, #1c2333 0%, transparent 55%), radial-gradient(90% 80% at 90% 20%, #232a3d 0%, transparent 50%), linear-gradient(180deg, #0e1118, #0a0c11)',
    tags: ['深色', '中性', '极简'],
    palette: ['#1c2333', '#232a3d', '#0a0c11']
  },
  {
    id: 'grad-sakura',
    name: '樱雾',
    kind: 'gradient',
    gradient: 'radial-gradient(80% 70% at 18% 15%, #ffe0ea 0%, transparent 58%), radial-gradient(80% 70% at 82% 18%, #f3d9ff 0%, transparent 55%), radial-gradient(120% 100% at 50% 100%, #e5f1ff 0%, transparent 62%), linear-gradient(#fbf7fa, #fbf7fa)',
    tags: ['浅色', '粉紫', '柔和'],
    palette: ['#ffe0ea', '#f3d9ff', '#e5f1ff']
  },
  {
    id: 'grad-cyber',
    name: '赛博紫',
    kind: 'gradient',
    animated: true,
    gradient: 'radial-gradient(90% 70% at 12% 18%, #3b0f6b 0%, transparent 55%), radial-gradient(90% 80% at 88% 22%, #0b3f66 0%, transparent 52%), radial-gradient(100% 80% at 50% 95%, #6b0f4a 0%, transparent 58%), linear-gradient(#05040a, #05040a)',
    tags: ['深色', '紫蓝', '霓虹'],
    palette: ['#3b0f6b', '#0b3f66', '#6b0f4a']
  }
]

const KIND_LABEL = { image: '静态', animated: '动图', video: '视频', gradient: '渐变' }

/** 远程图片走宿主代理：绕开第三方图床的 ORB / 防盗链 / CORS。 */
export function proxiedImage(url) {
  if (typeof url !== 'string' || !/^https?:\/\//i.test(url)) return url
  return '/dsh-skin/api/image?url=' + encodeURIComponent(url)
}

export function kindLabel(kind) {
  return KIND_LABEL[kind] ?? '素材'
}

export function isAnimatedKind(kind) {
  return kind === 'animated' || kind === 'video'
}

/** 把素材清单里的一条转成设置里的 source。 */
export function materialToSource(material) {
  if (material.kind === 'gradient') {
    return {
      type: 'gradient',
      id: material.id,
      name: material.name,
      gradient: material.gradient,
      assetKind: 'gradient'
    }
  }
  return {
    type: 'asset',
    id: material.id,
    name: material.name,
    file: material.file,
    thumb: material.thumb,
    ...(material.variants ? { variants: material.variants } : {}),
    assetKind: material.kind,
    ...(material.palette ? { palette: material.palette } : {})
  }
}

export function gradientToSource(gradient) {
  return { type: 'gradient', id: gradient.id, name: gradient.name, gradient: gradient.gradient, assetKind: 'gradient' }
}

function normalizeManifestRow(row) {
  if (!row || typeof row !== 'object') return null
  const kind = ['image', 'animated', 'video', 'gradient'].includes(row.kind) ? row.kind : null
  if (kind === null) return null
  if (kind === 'gradient') {
    return {
      id: String(row.id ?? ''),
      name: String(row.name ?? '渐变'),
      kind,
      gradient: String(row.gradient ?? ''),
      animated: row.animated === true,
      tags: Array.isArray(row.tags) ? row.tags.filter((tag) => typeof tag === 'string') : [],
      palette: Array.isArray(row.palette) ? row.palette : undefined,
      license: row.license
    }
  }
  if (typeof row.file !== 'string' || row.file === '') return null
  return {
    id: String(row.id ?? row.file),
    name: String(row.name ?? '素材'),
    kind,
    file: row.file,
    thumb: typeof row.thumb === 'string' ? row.thumb : undefined,
    variants: row.variants && typeof row.variants === 'object' ? row.variants : undefined,
    width: Number(row.width) || 0,
    height: Number(row.height) || 0,
    durationMs: Number(row.durationMs) || 0,
    tags: Array.isArray(row.tags) ? row.tags.filter((tag) => typeof tag === 'string') : [],
    palette: Array.isArray(row.palette) ? row.palette : undefined,
    license: row.license
  }
}

/** 拉宿主素材清单；失败只退回渐变，不阻塞界面。 */
export async function fetchMaterialLibrary() {
  const rows = []
  try {
    const response = await fetch('/dsh-skin/api/materials', { cache: 'no-store' })
    if (response.ok) {
      const body = await response.json()
      for (const row of Array.isArray(body?.materials) ? body.materials : []) {
        const normalized = normalizeManifestRow(row)
        if (normalized) rows.push(normalized)
      }
    }
  } catch {}
  const gradients = GRADIENTS.map((item) => ({ ...item }))
  return [...gradients, ...rows]
}

/** 在线素材搜索（Openverse / Wikimedia Commons），宿主代理返回统一结构。 */
export async function searchMaterials(query, page = 1, source = 'auto') {
  const params = new URLSearchParams({ q: query, page: String(page), source })
  const response = await fetch('/dsh-skin/api/search?' + params.toString(), { cache: 'no-store' })
  if (!response.ok) {
    const message = await response.json().catch(() => null)
    throw new Error(message?.error || message?.problem || ('搜索失败（' + response.status + '）'))
  }
  const body = await response.json()
  const results = (Array.isArray(body?.results) ? body.results : [])
    .filter((row) => row && typeof row.full === 'string')
    .map((row) => ({
      id: String(row.id),
      title: String(row.title || '在线素材'),
      full: row.full,
      thumb: proxiedImage(row.thumb || row.full),
      width: Number(row.width) || 0,
      height: Number(row.height) || 0,
      author: String(row.author || ''),
      license: String(row.license || ''),
      licenseUrl: String(row.licenseUrl || ''),
      source: String(row.source || ''),
      sourceUrl: String(row.sourceUrl || '')
    }))
  return { provider: body?.provider ?? '', providers: Array.isArray(body?.providers) ? body.providers : [], results }
}

export function remoteToSource(row) {
  const isVideo = /\.(mp4|webm|mov)(\?|$)/i.test(row.full)
  return {
    type: 'remote',
    id: row.id,
    name: row.title,
    url: isVideo ? row.full : proxiedImage(row.full),
    thumb: proxiedImage(row.thumb),
    assetKind: isVideo ? 'video' : 'image',
    license: row.license,
    author: row.author,
    sourceUrl: row.sourceUrl
  }
}
