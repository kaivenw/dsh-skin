/**
 * 换肤设置：默认值、归一化（范围/类型校验）、localStorage 持久化、方案（scheme）管理。
 * 所有可调参数集中在这里，panel 只负责展示，engine 只负责消费。
 */

export const SETTINGS_KEY = 'dsh.skin.settings.v1'
export const SCHEMES_KEY = 'dsh.skin.schemes.v1'

/** 控件元数据：面板用它渲染滑杆，engine 只读数值。 */
export const RANGES = {
  'media.opacity': [0.05, 1, 0.01],
  'media.blur': [0, 40, 0.5],
  'media.zoom': [1, 2, 0.01],
  'media.brightness': [0.3, 1.6, 0.01],
  'media.contrast': [0.5, 1.6, 0.01],
  'media.saturation': [0, 2, 0.01],
  'media.hue': [-180, 180, 1],
  'media.dim': [0, 0.85, 0.01],
  'media.vignette': [0, 1, 0.01],
  'media.grain': [0, 0.5, 0.01],
  'surface.glass': [0, 1, 0.01],
  'surface.glassBlur': [0, 60, 1],
  'surface.sidebar': [0, 1.2, 0.01],
  'surface.composer': [0, 1, 0.01],
  'surface.textShadow': [0, 1, 0.01],
  'video.rate': [0.25, 2, 0.05]
}

export const FITS = [
  { value: 'cover', label: '填满裁切' },
  { value: 'contain', label: '完整显示' },
  { value: 'fill', label: '拉伸铺满' },
  { value: 'tile', label: '平铺' }
]

export const POSITIONS = [
  ['center center', '居中'],
  ['center top', '顶部'],
  ['center bottom', '底部'],
  ['left center', '左侧'],
  ['right center', '右侧']
]

export const DEFAULTS = {
  enabled: false,
  source: null,
  media: {
    fit: 'cover',
    position: 'center center',
    zoom: 1,
    opacity: 1,
    blur: 0,
    brightness: 1,
    contrast: 1,
    saturation: 1,
    hue: 0,
    dim: 0.12,
    dimColor: '#05070c',
    vignette: 0.18,
    grain: 0.05
  },
  surface: {
    mode: 'glass',
    auto: false,
    glass: 0.4,
    glassBlur: 12,
    sidebar: 1.35,
    composer: 0.9,
    textShadow: 0.35,
    menusOpaque: true
  },
  motion: {
    kenBurns: false,
    parallax: false,
    respectReducedMotion: true
  },
  video: {
    muted: true,
    loop: true,
    rate: 1,
    pauseHidden: true
  },
  behavior: {
    rotate: 'off',
    performance: false
  },
  ui: {
    tab: 'library',
    filter: 'all',
    tone: 'all'
  },
  schema: 7
}

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

function num(value, fallback, min, max) {
  const parsed = typeof value === 'number' ? value : Number.parseFloat(value)
  if (!Number.isFinite(parsed)) return fallback
  return clamp(parsed, min, max)
}

function pick(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback
}

/** 深拷贝默认值，避免共享引用。 */
export function defaultSettings() {
  return JSON.parse(JSON.stringify(DEFAULTS))
}

/** 归一化外部数据（旧版本设置/方案/导入的 JSON）：字段缺失用默认值，越界夹紧，类型不对丢弃。 */
export function normalizeSettings(raw) {
  const base = defaultSettings()
  if (!raw || typeof raw !== 'object') return base
  const out = base
  out.enabled = raw.enabled === true
  out.source = normalizeSource(raw.source)
  const media = raw.media ?? {}
  out.media.fit = pick(media.fit, FITS.map((item) => item.value), base.media.fit)
  out.media.position = pick(media.position, POSITIONS.map((item) => item[0]), base.media.position)
  for (const key of ['zoom','opacity','blur','brightness','contrast','saturation','hue','dim','vignette','grain']) {
    const [min, max] = RANGES['media.' + key]
    out.media[key] = num(media[key], base.media[key], min, max)
  }
  out.media.dimColor = typeof media.dimColor === 'string' && /^#[0-9a-f]{6}$/i.test(media.dimColor) ? media.dimColor : base.media.dimColor
  const surface = raw.surface ?? {}
  out.surface.mode = pick(surface.mode, ['clear','glass'], 'clear')
  out.surface.auto = surface.auto !== false
  for (const key of ['glass','glassBlur','sidebar','composer','textShadow']) {
    const [min, max] = RANGES['surface.' + key]
    out.surface[key] = num(surface[key], base.surface[key], min, max)
  }
  out.surface.menusOpaque = surface.menusOpaque !== false
  out.motion.kenBurns = raw.motion?.kenBurns === true
  out.motion.parallax = raw.motion?.parallax === true
  out.motion.respectReducedMotion = raw.motion?.respectReducedMotion !== false
  out.video.muted = raw.video?.muted !== false
  out.video.loop = raw.video?.loop !== false
  out.video.pauseHidden = raw.video?.pauseHidden !== false
  out.video.rate = num(raw.video?.rate, base.video.rate, 0.25, 2)
  out.behavior.rotate = pick(raw.behavior?.rotate, ['off','daily','hourly','session'], 'off')
  out.behavior.performance = raw.behavior?.performance === true
  out.schema = 7
  out.ui.tab = pick(raw.ui?.tab, ['library','adjust','surface','schemes'], 'library')
  out.ui.filter = pick(raw.ui?.filter, ['all','image','animated','video','gradient'], 'all')
  out.ui.tone = pick(raw.ui?.tone, ['all','dark','light'], 'all')
  return out
}

export function normalizeSource(raw) {
  if (!raw || typeof raw !== 'object') return null
  const type = pick(raw.type, ['asset','remote','local','gradient'], null)
  if (type === null) return null
  const source = { type, id: String(raw.id ?? ''), name: String(raw.name ?? '未命名素材') }
  if (type === 'asset') {
    if (typeof raw.file !== 'string' || raw.file === '') return null
    source.file = raw.file
    source.thumb = typeof raw.thumb === 'string' ? raw.thumb : undefined
    source.assetKind = pick(raw.assetKind, ['image','animated','video','gradient'], 'image')
    if (raw.variants && typeof raw.variants === 'object') {
      const variants = {}
      for (const edge of ['960', '1600', '2400']) {
        if (typeof raw.variants[edge] === 'string' && raw.variants[edge] !== '') variants[edge] = raw.variants[edge]
      }
      if (Object.keys(variants).length > 0) source.variants = variants
    }
  } else if (type === 'remote') {
    if (typeof raw.url !== 'string') return null
    if (!/^https?:\/\//i.test(raw.url) && !raw.url.startsWith('/dsh-skin/api/image?url=')) return null
    source.url = raw.url
    source.thumb = typeof raw.thumb === 'string' ? raw.thumb : undefined
    source.assetKind = pick(raw.assetKind, ['image','animated','video'], 'image')
    source.license = typeof raw.license === 'string' ? raw.license : undefined
    source.author = typeof raw.author === 'string' ? raw.author : undefined
    source.sourceUrl = typeof raw.sourceUrl === 'string' ? raw.sourceUrl : undefined
  } else if (type === 'local') {
    if (typeof raw.id !== 'string' || raw.id === '') return null
    source.mime = typeof raw.mime === 'string' ? raw.mime : ''
    const mime = String(source.mime || '')
    const derived = mime.startsWith('video/') ? 'video' : mime === 'image/gif' || mime === 'image/apng' ? 'animated' : 'image'
    source.assetKind = pick(raw.assetKind, ['image','animated','video'], derived)
  } else {
    if (typeof raw.gradient !== 'string' || raw.gradient === '') return null
    source.gradient = raw.gradient
  }
  if (typeof source.thumb === 'string' && source.thumb !== '') source.thumb = source.thumb
  if (raw.palette && Array.isArray(raw.palette)) source.palette = raw.palette.filter((c) => typeof c === 'string').slice(0, 5)
  return source
}

function weakDevice() {
  try {
    const cores = navigator.hardwareConcurrency || 8
    const memory = navigator.deviceMemory || 8
    return cores <= 4 || memory <= 4
  } catch {
    return false
  }
}

export function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) {
      const initial = defaultSettings()
      // 低配机首次加载直接进省电模式：关闭全屏毛玻璃与颗粒，避免首帧就卡
      if (weakDevice()) initial.behavior.performance = true
      return initial
    }
    const parsed = JSON.parse(raw)
    // v5：默认「跟随皮肤 + 自动对比度」：壁纸透出来，但按壁纸明暗自动抬高实度，保证文字对比度
    // v7：恢复到最初交付版本的视觉效果（玻璃模式、实度 0.4、玻璃模糊 12px）
    if (parsed && parsed.schema !== 7) {
      if (parsed.surface) {
        parsed.surface.mode = 'glass'
        parsed.surface.auto = false
        parsed.surface.glass = 0.4
        parsed.surface.glassBlur = 12
        parsed.surface.sidebar = 1.35
        parsed.surface.composer = 0.9
      }
      parsed.schema = 7
    }
    return normalizeSettings(parsed)
  } catch {
    return defaultSettings()
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  } catch {}
}

export function loadSchemes() {
  try {
    const raw = localStorage.getItem(SCHEMES_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((item) => item && typeof item.id === 'string' && item.settings)
      .map((item) => ({ id: item.id, name: String(item.name ?? '未命名方案'), savedAt: Number(item.savedAt) || 0, settings: normalizeSettings(item.settings) }))
  } catch {
    return []
  }
}

export function saveSchemes(schemes) {
  try {
    localStorage.setItem(SCHEMES_KEY, JSON.stringify(schemes))
  } catch {}
}

export function newSchemeId() {
  return 'scheme-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7)
}

/** 把方案设置里的 source 一起带回去（source 属于方案的一部分）。 */
export function schemePayload(settings) {
  return normalizeSettings(settings)
}
