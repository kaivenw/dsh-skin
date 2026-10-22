/**
 * dsh-skin · 客户端半侧入口
 *
 * 在侧栏品牌行的右端插入换肤按钮（红框位置），面板通过 portal 浮在主区上方；
 * 壁纸层由 React 渲染到 body 下的固定层（z-index:-1），全局样式通过 APP_CSS 注入。
 * 不注册 sidebar.panellist / main 面板：换肤是即时生效的装饰层，不打断当前会话。
 */
import { createRoot } from 'react-dom/client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { APP_CSS, applyVars, mediaFilter, effectiveScale } from './engine.js'
import {
  loadSettings, saveSettings, normalizeSettings, normalizeSource,
  loadSchemes, saveSchemes, newSchemeId, defaultSettings
} from './settings.js'
import { getLocal, listLocal, removeLocal, clearLocal } from './media.js'
import { fetchMaterialLibrary, materialToSource } from './materials.js'
import { SkinPanel } from './panel.jsx'
import { Icon } from './ui.jsx'

const PANEL_WIDTH = 392
const PANEL_GAP = 10
const ROTATE_KEY = 'dsh.skin.lastRotate'

/** 等宿主 DOM 出现后再挂 portal。 */
function useHostNode(selector) {
  const [node, setNode] = useState(null)
  useEffect(() => {
    let observer = null
    const find = () => {
      const element = document.querySelector(selector)
      if (!element) return false
      setNode(element)
      return true
    }
    if (!find()) {
      observer = new MutationObserver(() => { if (find()) observer?.disconnect() })
      observer.observe(document.documentElement, { childList: true, subtree: true })
    }
    return () => observer?.disconnect()
  }, [selector])
  return node
}

function screenBucket() {
  try {
    const pixels = window.innerWidth * (window.devicePixelRatio || 1)
    if (pixels <= 1150) return '960'
    if (pixels <= 1900) return '1600'
    return '2400'
  } catch {
    return '1600'
  }
}

function useScreenBucket() {
  const [bucket, setBucket] = useState(screenBucket)
  useEffect(() => {
    let timer = 0
    const onResize = () => {
      clearTimeout(timer)
      timer = setTimeout(() => setBucket(screenBucket()), 200)
    }
    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', onResize)
    }
  }, [])
  return bucket
}

function useSourceUrl(source, bucket) {
  const [url, setUrl] = useState(null)
  useEffect(() => {
    let alive = true
    let created = null
    setUrl(null)
    if (!source) return () => {}
    if (source.type === 'asset') {
      const variants = source.variants ?? {}
      const file = variants[bucket] ?? source.file
      setUrl('/dsh-skin/assets/' + String(file).replace(/^\/+/, ''))
      return () => {}
    }
    if (source.type === 'remote') {
      setUrl(source.url ?? null)
      return () => {}
    }
    if (source.type === 'local') {
      getLocal(source.id).then((record) => {
        if (!alive || !record?.blob) return
        created = URL.createObjectURL(record.blob)
        setUrl(created)
      }).catch(() => {})
    }
    return () => {
      alive = false
      if (created) URL.revokeObjectURL(created)
    }
  }, [source, bucket])
  return url
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch { return false }
  })
  useEffect(() => {
    let media
    try {
      media = window.matchMedia('(prefers-reduced-motion: reduce)')
      const onChange = () => setReduced(media.matches)
      media.addEventListener?.('change', onChange)
      return () => media.removeEventListener?.('change', onChange)
    } catch {
      return () => {}
    }
  }, [])
  return reduced
}

function SkinLayer({ settings, source, reduceMotion, onLuma }) {
  const bucket = useScreenBucket()
  const url = useSourceUrl(source, bucket)
  const layerRef = useRef(null)
  const videoRef = useRef(null)
  const media = settings.media
  const motion = settings.motion
  const kenBurns = motion.kenBurns && !(motion.respectReducedMotion && reduceMotion)
  const parallax = motion.parallax && !(motion.respectReducedMotion && reduceMotion) && !settings.behavior.performance
  const isVideo = source?.assetKind === 'video'
  const isGradient = source?.type === 'gradient'

  // 换素材先清掉旧亮度，采样完成后再驱动自动实度
  useEffect(() => {
    onLuma?.(null)
  }, [onLuma, source?.type, source?.id, source?.file, source?.url])

  useEffect(() => {
    if (source?.type !== 'gradient') return
    onLuma?.(gradientLuma(source.gradient))
  }, [onLuma, source])

  useEffect(() => {
    if (!parallax || !layerRef.current) return
    let frame = 0
    const onMove = (event) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const element = layerRef.current
        if (!element) return
        const px = (event.clientX / window.innerWidth - 0.5) * -16
        const py = (event.clientY / window.innerHeight - 0.5) * -12
        element.style.setProperty('--dsks-px', px.toFixed(2) + 'px')
        element.style.setProperty('--dsks-py', py.toFixed(2) + 'px')
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [parallax])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = settings.video.muted
    video.loop = settings.video.loop
    video.playbackRate = settings.video.rate
    const play = () => { video.play().catch(() => {}) }
    play()
    if (!settings.video.pauseHidden) return
    const onVisibility = () => {
      if (document.hidden) video.pause()
      else play()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [isVideo, settings.video.muted, settings.video.loop, settings.video.rate, settings.video.pauseHidden, url])

  const style = {
    '--dsks-scale': String(effectiveScale(settings)),
    '--dsks-fit': media.fit === 'tile' ? 'cover' : media.fit,
    '--dsks-position': media.position
  }
  const filter = mediaFilter(settings)
  const tileMode = media.fit === 'tile' && url

  return (
    <div ref={layerRef} className="dsks-layer" style={style} aria-hidden="true">
      <div className="dsks-parallax">
        <div className="dsks-media" style={{ opacity: media.opacity }}>
          <div className="dsks-media-inner" data-kenburns={kenBurns ? 'on' : 'off'}
            style={tileMode ? {
              backgroundImage: 'url("' + url + '")',
              backgroundRepeat: 'repeat',
              backgroundSize: 'auto 42%',
              backgroundPosition: 'center',
              filter
            } : undefined}>
            {isGradient ? (
              <div className="dsks-gradient" data-animated={source?.id?.startsWith('grad-') ? 'on' : 'off'}
                style={{ backgroundImage: source.gradient, filter, objectFit: 'cover' }} />
            ) : isVideo && url ? (
              <video ref={videoRef} src={url} muted={settings.video.muted} loop={settings.video.loop}
                autoPlay playsInline preload="auto" style={{ filter }}
                onLoadedData={(event) => onLuma?.(sampleLuma(event.currentTarget))} />
            ) : url && !tileMode ? (
              <img src={url} alt="" draggable={false} style={{ filter }}
                onLoad={(event) => onLuma?.(sampleLuma(event.currentTarget))} />
            ) : null}
          </div>
        </div>
      </div>
      <div className="dsks-veil" style={{ background: media.dimColor, opacity: media.dim }} />
      <div className="dsks-vignette" style={{ opacity: media.vignette }} />
      <div className="dsks-grain" style={{ opacity: media.grain }} />
    </div>
  )
}

function Trigger({ onToggle, enabled, host }) {
  const [narrow, setNarrow] = useState(false)
  useEffect(() => {
    if (!host) return
    const measure = () => setNarrow((host.getBoundingClientRect().width || 0) < 120)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(host)
    return () => observer.disconnect()
  }, [host])
  if (!host || narrow) return null
  return createPortal(
    <button type="button" className="dsks-trigger" data-on={enabled ? 'true' : 'false'}
      title="换肤 · 壁纸与界面透明（⌘⇧K）" aria-label="换肤" onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        onToggle()
      }}>
      <Icon name="palette" size={17} />
      <span className="dsks-trigger-dot" />
    </button>,
    host
  )
}

const clamp01 = (value) => Math.min(1, Math.max(0, Number(value) || 0))

/** 按壁纸平均明暗自动抬高界面实度：浅色主题保证黑字对比度，深色主题保证亮字对比度。 */
function computeSurfaceAlpha(surface, dark, luma) {
  const base = clamp01(surface.glass ?? 0.55)
  if (surface.auto === false) return base
  if (typeof luma !== 'number' || !Number.isFinite(luma)) {
    return Math.min(0.9, Math.max(base, dark ? 0.78 : 0.62))
  }
  const wall = clamp01(luma)
  const required = dark
    ? (wall > 0.16 ? (wall - 0.16) / Math.max(0.06, wall - 0.02) : 0)
    : (wall < 0.35 ? (0.35 - wall) / Math.max(0.06, 0.97 - wall) : 0)
  return Math.min(0.94, Math.max(base, required))
}

function sampleLuma(element) {
  try {
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const context = canvas.getContext('2d', { willReadFrequently: true })
    context.drawImage(element, 0, 0, 32, 32)
    const data = context.getImageData(0, 0, 32, 32).data
    let sum = 0
    for (let index = 0; index < data.length; index += 4) {
      sum += (0.2126 * data[index] + 0.7152 * data[index + 1] + 0.0722 * data[index + 2]) / 255
    }
    return sum / (32 * 32)
  } catch {
    return null
  }
}

function gradientLuma(css) {
  try {
    const colors = [...String(css ?? '').matchAll(/#([0-9a-f]{6})/gi)]
    if (colors.length === 0) return null
    let sum = 0
    for (const match of colors) {
      const hex = match[1]
      const r = Number.parseInt(hex.slice(0, 2), 16) / 255
      const g = Number.parseInt(hex.slice(2, 4), 16) / 255
      const b = Number.parseInt(hex.slice(4, 6), 16) / 255
      sum += 0.2126 * r + 0.7152 * g + 0.0722 * b
    }
    return sum / colors.length
  } catch {
    return null
  }
}

function useDarkTheme() {
  const [dark, setDark] = useState(() => {
    try { return document.body.hasAttribute('data-ds-dark-theme') } catch { return false }
  })
  useEffect(() => {
    const update = () => setDark(document.body.hasAttribute('data-ds-dark-theme'))
    update()
    const observer = new MutationObserver(update)
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-ds-dark-theme'] })
    return () => observer.disconnect()
  }, [])
  return dark
}

function themeTokens(settings, alpha) {
  const side = Math.min(1, alpha * Math.max(0.5, settings.surface.sidebar))
  const dual = (light, dark) => ({ light, dark })
  // 只改外壳两块基础表面；卡片/菜单等更高层级 token 保持原样，避免浮层与内容带被意外打薄。
  return {
    '--dsw-alias-bg-base': dual(
      'rgb(252 252 253 / ' + alpha.toFixed(3) + ')',
      'rgb(19 20 25 / ' + alpha.toFixed(3) + ')'
    ),
    '--dsw-specific-sidebar-fill': dual(
      'rgb(249 250 251 / ' + side.toFixed(3) + ')',
      'rgb(17 19 24 / ' + side.toFixed(3) + ')'
    )
  }
}

function SkinApp({ ctx }) {
  const [settings, setSettings] = useState(() => loadSettings())
  const [schemes, setSchemes] = useState(() => loadSchemes())
  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState(null)
  const [library, setLibrary] = useState(null)
  const [libraryError, setLibraryError] = useState('')
  const [localItems, setLocalItems] = useState([])
  const triggerHost = useHostNode('[class*="logoRow"]')
  const reduceMotion = useReducedMotion()
  const darkTheme = useDarkTheme()
  const [mediaLuma, setMediaLuma] = useState(null)
  const alpha = useMemo(() => computeSurfaceAlpha(settings.surface, darkTheme, mediaLuma), [settings.surface, darkTheme, mediaLuma])
  const settingsRef = useRef(settings)
  settingsRef.current = settings
  const tokenDispose = useRef(null)
  const tokenTimer = useRef(null)

  // 官方主题 token 覆盖：外壳四块表面的取色点改用半透明色，卸载即回收，不依赖构建哈希类名。
  useEffect(() => {
    const theme = ctx?.theme
    if (!theme?.overrideTokens) return
    clearTimeout(tokenTimer.current)
    if (!settings.enabled) {
      tokenDispose.current?.()
      tokenDispose.current = null
      return
    }
    const tokens = themeTokens(settings, alpha)
    tokenTimer.current = setTimeout(() => {
      tokenDispose.current?.()
      tokenDispose.current = theme.overrideTokens('@local/dsh-skin', tokens)
    }, 60)
    return () => clearTimeout(tokenTimer.current)
  }, [ctx, settings.enabled, alpha, settings.surface.sidebar])

  useEffect(() => () => {
    clearTimeout(tokenTimer.current)
    tokenDispose.current?.()
  }, [])

  // 持久化（滑杆拖动时合并写）
  useEffect(() => {
    const timer = setTimeout(() => saveSettings(settings), 120)
    return () => clearTimeout(timer)
  }, [settings])

  // 样式变量：停用时移除全部标记，界面恢复原样
  useEffect(() => {
    if (!settings.enabled) {
      document.documentElement.removeAttribute('data-dsh-skin-on')
      document.documentElement.removeAttribute('data-dsh-skin-perf')
      for (const name of ['--dsks-alpha','--dsks-glass-blur','--dsks-sidebar-alpha','--dsks-center-alpha','--dsks-composer-alpha','--dsks-chrome-alpha','--dsks-scale','--dsks-fit','--dsks-position','--dsks-px','--dsks-py']) {
        document.documentElement.style.removeProperty(name)
      }
      return
    }
    return applyVars(settings, settings.source, alpha)
  }, [settings, alpha])

  const patch = useCallback((path, value) => {
    setSettings((current) => {
      const next = JSON.parse(JSON.stringify(current))
      const keys = path.split('.')
      let cursor = next
      for (let i = 0; i < keys.length - 1; i++) {
        if (cursor[keys[i]] === null || typeof cursor[keys[i]] !== 'object') cursor[keys[i]] = {}
        cursor = cursor[keys[i]]
      }
      cursor[keys[keys.length - 1]] = value
      return next
    })
  }, [])

  const apply = useCallback((source) => {
    const normalized = normalizeSource(source)
    if (!normalized) return
    setSettings((current) => ({ ...current, enabled: true, source: normalized }))
  }, [])

  const reloadLibrary = useCallback(async () => {
    setLibraryError('')
    try {
      const rows = await fetchMaterialLibrary()
      setLibrary(rows)
    } catch (error) {
      setLibrary([])
      setLibraryError(String(error?.message || error))
    }
  }, [])

  const refreshLocal = useCallback(async () => {
    try {
      setLocalItems(await listLocal())
    } catch {
      setLocalItems([])
    }
  }, [])

  useEffect(() => { void refreshLocal() }, [refreshLocal])

  const storageBytes = useMemo(() => localItems.reduce((sum, item) => sum + (Number(item.size) || 0), 0), [localItems])

  const clearLocalMaterials = useCallback(async () => {
    await clearLocal()
    await refreshLocal()
    setSettings((current) => current.source?.type === 'local' ? { ...current, source: null } : current)
  }, [refreshLocal])

  const removeLocalItem = useCallback(async (id) => {
    await removeLocal(id)
    await refreshLocal()
    setSettings((current) => current.source?.type === 'local' && current.source.id === id
      ? { ...current, source: null }
      : current)
  }, [refreshLocal])

  const saveScheme = useCallback((name) => {
    setSchemes((current) => {
      const next = [{ id: newSchemeId(), name, savedAt: Date.now(), settings: JSON.parse(JSON.stringify(settingsRef.current)) }, ...current].slice(0, 30)
      saveSchemes(next)
      return next
    })
  }, [])

  const applyScheme = useCallback((scheme) => {
    const next = normalizeSettings(scheme.settings)
    setSettings({ ...next, enabled: true })
  }, [])

  const deleteScheme = useCallback((id) => {
    setSchemes((current) => {
      const next = current.filter((item) => item.id !== id)
      saveSchemes(next)
      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    setSettings((current) => {
      const next = defaultSettings()
      // 保留当前面板位置（素材/画面/界面/方案）与筛选，避免点完重置被跳回首页
      next.ui = { ...next.ui, tab: current.ui.tab, filter: current.ui.filter, tone: current.ui.tone }
      return next
    })
  }, [])

  const exportSettings = useCallback(() => JSON.stringify(settingsRef.current, null, 2), [])

  const importSettings = useCallback((text) => {
    try {
      const parsed = JSON.parse(text)
      if (!parsed || typeof parsed !== 'object' || !parsed.media) return false
      setSettings(normalizeSettings(parsed))
      return true
    } catch {
      return false
    }
  }, [])

  // 自动轮换：session / hourly / daily，只在挂载后检查一次
  useEffect(() => {
    if (!settings.enabled || !settings.source || settings.behavior.rotate === 'off') return
    if (!library || library.length === 0) return
    const interval = settings.behavior.rotate === 'hourly' ? 3600_000 : settings.behavior.rotate === 'daily' ? 86400_000 : 0
    let last = 0
    try { last = Number(localStorage.getItem(ROTATE_KEY) || 0) } catch {}
    if (settings.behavior.rotate === 'session') {
      let seen = ''
      try { seen = sessionStorage.getItem(ROTATE_KEY + ':session') || '' } catch {}
      if (seen === String(settings.source.id)) return
      const alternatives = library.filter((row) => row.kind !== 'gradient')
      if (alternatives.length === 0) return
      const pick = alternatives[Math.floor(Math.random() * alternatives.length)]
      try { sessionStorage.setItem(ROTATE_KEY + ':session', String(pick.id)) } catch {}
      apply(materialToSource(pick))
      return
    }
    if (Date.now() - last < interval) return
    const alternatives = library.filter((row) => row.kind !== 'gradient' && row.id !== settings.source?.id)
    if (alternatives.length === 0) return
    const pick = alternatives[Math.floor(Math.random() * alternatives.length)]
    try { localStorage.setItem(ROTATE_KEY, String(Date.now())) } catch {}
    apply(materialToSource(pick))
  }, [settings.enabled, settings.source, settings.behavior.rotate, library, apply])

  // 面板锚点：按钮位置变了就重算
  useEffect(() => {
    if (!open) return
    const update = () => {
      const trigger = document.querySelector('.dsks-trigger')
      if (!trigger) return
      const rect = trigger.getBoundingClientRect()
      let left = rect.right + PANEL_GAP
      if (left + PANEL_WIDTH > window.innerWidth - 12) left = Math.max(12, rect.left - PANEL_WIDTH - PANEL_GAP)
      let top = rect.bottom + 8
      let maxHeight = window.innerHeight - top - 16
      if (maxHeight < 360) {
        top = 64
        maxHeight = window.innerHeight - 80
      }
      setAnchor({ left, top, maxHeight })
    }
    update()
    const observer = new ResizeObserver(update)
    const trigger = document.querySelector('.dsks-trigger')
    if (trigger) observer.observe(trigger)
    window.addEventListener('resize', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [open])

  // 点空白关闭 / Esc 关闭 / ⌘⇧K 开关
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event) => {
      if (event.target?.closest?.('.dsks-panel, .dsks-trigger, .dsks-preview-chip')) return
      setOpen(false)
    }
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    const onKey = (event) => {
      const modifier = event.metaKey || event.ctrlKey
      if (modifier && event.shiftKey && String(event.key).toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const enabledLayer = settings.enabled && settings.source && settings.source.type !== undefined
  const position = anchor ?? { left: 300, top: 72, maxHeight: window.innerHeight - 96 }

  return (
    <>
      <style>{APP_CSS}</style>
      {enabledLayer ? <SkinLayer settings={settings} source={settings.source} reduceMotion={reduceMotion} onLuma={setMediaLuma} /> : null}
      <Trigger host={triggerHost} enabled={settings.enabled} onToggle={() => setOpen((value) => !value)} />
      {open ? createPortal(
        <SkinPanel
          settings={settings}
          patch={patch}
          apply={apply}
          close={() => setOpen(false)}
          library={library}
          libraryError={libraryError}
          reloadLibrary={reloadLibrary}
          localItems={localItems}
          refreshLocal={refreshLocal}
          removeLocalItem={removeLocalItem}
          clearLocalMaterials={clearLocalMaterials}
          localStorageBytes={storageBytes}
          schemes={schemes}
          saveScheme={saveScheme}
          applyScheme={applyScheme}
          deleteScheme={deleteScheme}
          resetAll={resetAll}
          exportSettings={exportSettings}
          importSettings={importSettings}
          effectiveAlpha={alpha}
          position={position}
        />,
        document.body
      ) : null}
    </>
  )
}

export const name = 'dsh-skin'
export const inject = ['theme']

export function apply(ctx) {
  ctx.effect(() => {
    const container = document.createElement('div')
    container.setAttribute('data-dsh-skin-root', '')
    container.style.cssText = 'position:static;display:block;width:0;height:0;overflow:visible'
    const mountPoint = document.getElementById('root') ?? document.body
    mountPoint.appendChild(container)
    const root = createRoot(container)
    root.render(<SkinApp ctx={ctx} />)
    return () => {
      try { root.unmount() } catch {}
      container.remove()
      document.documentElement.removeAttribute('data-dsh-skin-on')
      document.documentElement.removeAttribute('data-dsh-skin-perf')
    }
  }, 'dsh-skin: mount')
}
