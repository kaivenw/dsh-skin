/**
 * 换肤面板：素材（内置/本地/在线）、画面参数、界面玻璃参数、方案管理、全屏预览。
 * 面板自己不做渲染决策：所有修改通过 patch/apply 写回集中设置，engine 消费后立即生效。
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Icon, IconButton, Slider, SwitchRow, Segmented, SectionTitle, formatPercent
} from './ui.jsx'
import { FITS, POSITIONS } from './settings.js'
import {
  fetchMaterialLibrary, searchMaterials, materialToSource, remoteToSource, kindLabel, isAnimatedKind, proxiedImage
} from './materials.js'
import { importLocalFile, listLocal, removeLocal, getLocal, pickMediaFile, assetThumbUrl } from './media.js'

function formatBytes(bytes) {
  const value = Number(bytes) || 0
  if (value < 1024 * 1024) return Math.max(0, Math.round(value / 1024)) + ' KB'
  const mb = value / (1024 * 1024)
  return mb >= 1024 ? (mb / 1024).toFixed(2) + ' GB' : mb.toFixed(mb < 10 ? 1 : 0) + ' MB'
}

const TABS = [
  { id: 'library', label: '素材' },
  { id: 'adjust', label: '画面' },
  { id: 'surface', label: '界面' },
  { id: 'schemes', label: '方案' }
]

const FILTERS = [
  { id: 'all', label: '全部' },
  { id: 'image', label: '静态' },
  { id: 'animated', label: '动图' },
  { id: 'video', label: '视频' },
  { id: 'gradient', label: '渐变' }
]

function sourceUrlOf(source) {
  if (!source) return null
  if (source.type === 'asset') return '/dsh-skin/assets/' + source.file.replace(/^\/+/, '')
  if (source.type === 'remote') return source.url ?? null
  return null
}

function sourceThumbOf(source) {
  if (!source) return null
  if (source.type === 'asset') return assetThumbUrl(source.thumb || source.file)
  if (source.type === 'remote') return source.thumb || source.url
  return null
}

function isSameSource(a, b) {
  if (!a || !b) return false
  return a.type === b.type && a.id === b.id
}

/** 本地素材 Blob URL 表：随本地列表刷新重建，卸载时统一 revoke。 */
function useLocalUrls(localItems) {
  const [urls, setUrls] = useState({})
  useEffect(() => {
    let alive = true
    const created = []
    Promise.all(localItems.map(async (item) => {
      try {
        const record = await getLocal(item.id)
        if (!record?.blob) return null
        const full = URL.createObjectURL(record.blob)
        created.push(full)
        let thumb = full
        if (record.thumbBlob) {
          thumb = URL.createObjectURL(record.thumbBlob)
          created.push(thumb)
        }
        return [item.id, { full, thumb }]
      } catch {
        return null
      }
    })).then((pairs) => {
      if (!alive) return
      const table = {}
      for (const pair of pairs) if (pair) table[pair[0]] = pair[1]
      setUrls(table)
    })
    return () => {
      alive = false
      for (const url of created) URL.revokeObjectURL(url)
    }
  }, [localItems])
  return urls
}

function MiniPreview({ settings, source, localUrls }) {
  const surface = settings.surface
  const direct = source?.type === 'local'
    ? (localUrls[source.id]?.thumb ?? null)
    : source?.type === 'asset'
      ? assetThumbUrl(source.thumb || source.file)
      : sourceUrlOf(source)
  const isVideo = source?.assetKind === 'video'
  const style = useMemo(() => ({
    '--p-glass': String(Math.min(1, surface.glass + 0.15))
  }), [surface.glass])
  return (
    <div className="dsks-preview" style={style}>
      <div className="dsks-preview-media">
        {source?.type === 'gradient'
          ? <div className="dsks-gradient" style={{ backgroundImage: source.gradient }} />
          : isVideo && direct
            ? <video src={direct} muted loop autoPlay playsInline />
            : direct
              ? <img src={direct} alt="" />
              : null}
      </div>
      <div className="dsks-preview-ui">
        <div className="dsks-preview-side" style={{ opacity: Math.min(1, surface.glass + 0.2) }}>
          <div className="dsks-preview-line" style={{ width: '62%' }} />
          <div className="dsks-preview-line" data-short="true" />
          <div className="dsks-preview-line" />
          <div className="dsks-preview-line" data-short="true" />
        </div>
        <div className="dsks-preview-main" style={{ opacity: Math.min(1, surface.glass) }}>
          <div className="dsks-preview-line" style={{ width: '42%' }} />
          <div className="dsks-preview-line" />
          <div className="dsks-preview-line" data-short="true" />
        </div>
      </div>
      <div className="dsks-preview-caption">{source?.name ?? '还没有选择壁纸'}</div>
    </div>
  )
}

function Tile({ label, badge, thumb, fallback, gradient, active, onClick, title }) {
  const [src, setSrc] = useState(thumb)
  const [broken, setBroken] = useState(false)
  useEffect(() => { setSrc(thumb); setBroken(false) }, [thumb])
  return (
    <button type="button" className="dsks-tile" data-active={active ? 'true' : 'false'}
      data-broken={broken ? 'true' : 'false'} disabled={broken}
      title={broken ? '缩略图加载失败（素材源可能已失效）' : (title || label)} onClick={onClick}>
      {gradient
        ? <div className="dsks-tile-gradient" style={{ backgroundImage: gradient }} />
        : src && !broken
          ? <img src={src} alt="" loading="lazy" onError={() => {
              if (fallback && src !== fallback) setSrc(fallback)
              else setBroken(true)
            }} />
          : <div className="dsks-tile-gradient" />}
      {broken ? <span className="dsks-tile-badge">失效</span> : badge ? <span className="dsks-tile-badge">{badge}</span> : null}
      <span className="dsks-tile-name">{label}</span>
    </button>
  )
}

export function SkinPanel({
  settings, patch, apply, close,
  library, libraryError, reloadLibrary,
  localItems, refreshLocal, removeLocalItem, importFiles, clearLocalMaterials, localStorageBytes,
  schemes, saveScheme, applyScheme, deleteScheme, resetAll, exportSettings, importSettings,
  effectiveAlpha, position
}) {
  const tab = settings.ui.tab
  const filter = settings.ui.filter
  const [query, setQuery] = useState('')
  const [searchSource, setSearchSource] = useState('auto')
  const [searchOpen, setSearchOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const [searchRows, setSearchRows] = useState([])
  const [searchPage, setSearchPage] = useState(1)
  const [searchProvider, setSearchProvider] = useState('')
  const [searchError, setSearchError] = useState('')
  const [urlDraft, setUrlDraft] = useState('')
  const [showUrl, setShowUrl] = useState(false)
  const [notice, setNotice] = useState('')
  const [schemeName, setSchemeName] = useState('')
  const [importDraft, setImportDraft] = useState('')
  const [previewing, setPreviewing] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInput = useRef(null)
  const previewTimer = useRef(null)

  const localUrls = useLocalUrls(localItems)

  useEffect(() => () => clearTimeout(previewTimer.current), [])

  const flash = useCallback((text) => {
    setNotice(text)
    const timer = setTimeout(() => setNotice((current) => current === text ? '' : current), 2600)
    return () => clearTimeout(timer)
  }, [])

  const requestReset = useCallback(() => {
    if (!window.confirm('恢复默认设置？会关闭换肤并清掉当前素材选择，本地素材和保存的方案保留。')) return
    resetAll()
    flash('已恢复默认设置')
  }, [flash, resetAll])

  useEffect(() => {
    if (!library && !libraryError) void reloadLibrary()
  }, [library, libraryError, reloadLibrary])

  const materials = useMemo(() => {
    const order = { video: 0, animated: 1, image: 2, gradient: 3 }
    const rows = [...(library ?? [])].sort((a, b) =>
      (order[a.kind] ?? 9) - (order[b.kind] ?? 9) || String(a.name).localeCompare(String(b.name), 'zh'))
    let out = filter === 'all' ? rows : rows.filter((row) => row.kind === filter)
    const tone = settings.ui.tone
    if (tone === 'dark' || tone === 'light') {
      out = out.filter((row) => (row.tags ?? []).some((tag) => tone === 'dark' ? /深色|dark/i.test(tag) : /浅色|light/i.test(tag)))
    }
    return out
  }, [library, filter, settings.ui.tone])

  const settingsSource = settings.source

  const onPickMaterial = useCallback((material) => {
    apply(materialToSource(material))
    setNotice('')
  }, [apply])

  const onPickLocal = useCallback((item) => {
    apply({
      type: 'local',
      id: item.id,
      name: item.name || '本地素材',
      mime: item.mime || '',
      assetKind: item.kind === 'video' ? 'video' : item.kind
    })
    flash('已应用本地素材')
  }, [apply, flash])

  const onFiles = useCallback(async (fileList) => {
    const files = Array.from(fileList ?? []).filter(Boolean)
    if (files.length === 0) return
    let applied = 0
    for (const file of files) {
      try {
        const item = await importLocalFile(file)
        await refreshLocal()
        if (applied === 0) {
          apply({ type: 'local', id: item.id, name: item.name || '本地素材', mime: item.mime, assetKind: item.kind })
          applied++
        }
      } catch (error) {
        flash(String(error?.message || error))
        break
      }
    }
    if (applied > 0) flash('已导入 ' + applied + ' 个本地素材')
  }, [apply, flash, refreshLocal])

  const runSearch = useCallback(async (page = 1) => {
    const text = query.trim()
    if (text === '' && searchSource !== 'bing') {
      setSearchError('先输入关键词；想看必应每日壁纸，把来源切到「必应壁纸」再搜索。')
      return
    }
    setSearching(true)
    setSearchError('')
    try {
      const result = await searchMaterials(text, page, searchSource)
      setSearchProvider(result.provider || '')
      setSearchRows((rows) => page === 1 ? result.results : [...rows, ...result.results])
      setSearchPage(page)
    } catch (error) {
      setSearchError(String(error?.message || error))
    } finally {
      setSearching(false)
    }
  }, [query, searchSource])

  const onUseUrl = useCallback(() => {
    const raw = urlDraft.trim()
    if (!/^https?:\/\//i.test(raw)) {
      flash('请填写 http(s):// 开头的图片或视频直链')
      return
    }
    const isVideo = /\.(mp4|webm|mov)(\?|#|$)/i.test(raw)
    apply({
      type: 'remote',
      id: 'url:' + raw,
      name: isVideo ? '链接视频' : '链接图片',
      url: isVideo ? raw : proxiedImage(raw),
      assetKind: isVideo ? 'video' : 'image'
    })
    flash('已应用链接素材')
  }, [apply, flash, urlDraft])

  const startPreview = useCallback(() => {
    setPreviewing(true)
    clearTimeout(previewTimer.current)
    previewTimer.current = setTimeout(() => setPreviewing(false), 12000)
  }, [])

  const stopPreview = useCallback(() => {
    clearTimeout(previewTimer.current)
    setPreviewing(false)
  }, [])

  useEffect(() => {
    if (!previewing) return
    const onKey = (event) => { if (event.key === 'Escape') stopPreview() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [previewing, stopPreview])

  const media = settings.media
  const surface = settings.surface
  const disabledMedia = !settings.source

  return (
    <>
      <div className="dsks-panel" data-hidden={previewing ? 'true' : 'false'}
        style={{ left: position.left, top: position.top, maxHeight: position.maxHeight }}
        onPointerDown={(event) => event.stopPropagation()}>
        <div className="dsks-head">
          <div className="dsks-title">
            <Icon name="palette" size={16} />
            换肤
            <small>{settingsSource?.name ?? '未选择素材'}</small>
          </div>
          <div className="dsks-head-actions">
            <IconButton icon="reset" label="恢复默认设置" onClick={requestReset} />
            <button type="button" role="switch" aria-checked={settings.enabled} className="dsks-switch"
              data-checked={settings.enabled ? 'true' : 'false'}
              title={settings.enabled ? '停用换肤' : '启用换肤'}
              onClick={() => patch('enabled', !settings.enabled)} />
            <IconButton icon="close" label="关闭" onClick={close} />
          </div>
        </div>

        <div className="dsks-tabs">
          {TABS.map((item) => (
            <button key={item.id} type="button" className="dsks-tab"
              data-active={tab === item.id ? 'true' : 'false'}
              onClick={() => patch('ui.tab', item.id)}>{item.label}</button>
          ))}
        </div>

        <div className="dsks-body"
          onDragOver={(event) => { event.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(event) => {
            event.preventDefault()
            setDragOver(false)
            const file = pickMediaFile(event.dataTransfer?.files)
            if (file) void onFiles([file])
          }}>
          {notice ? <div className="dsks-banner">{notice}</div> : null}
          {dragOver ? <div className="dsks-banner">松手导入本地素材</div> : null}

          {tab === 'library' ? (
            <>
              <MiniPreview settings={settings} source={settingsSource} localUrls={localUrls} />
              <div className="dsks-actions" style={{ marginBottom: 10 }}>
                <button type="button" className="dsks-btn" onClick={() => fileInput.current?.click()}>
                  <Icon name="upload" size={14} />导入本地
                </button>
                <button type="button" className="dsks-btn" onClick={() => setSearchOpen(true)}>
                  <Icon name="search" size={14} />在线搜索
                </button>
                <button type="button" className="dsks-btn" onClick={() => { setSearchOpen(false); setUrlDraft(settingsSource?.type === 'remote' ? (settingsSource.url ?? '') : ''); setShowUrl((value) => !value) }}>
                  <Icon name="link" size={14} />链接
                </button>
              </div>
              <input ref={fileInput} type="file" accept="image/*,video/*" multiple hidden
                onChange={(event) => { void onFiles(event.target.files); event.target.value = '' }} />
              {showUrl ? (
                <div className="dsks-searchrow" style={{ marginBottom: 10 }}>
                  <input className="dsks-input" value={urlDraft} placeholder="粘贴图片 / 视频直链（https://…）"
                    onChange={(event) => setUrlDraft(event.target.value)}
                    onKeyDown={(event) => { if (event.key === 'Enter') onUseUrl() }} />
                  <button type="button" className="dsks-btn" onClick={onUseUrl}>使用</button>
                </div>
              ) : null}

              {searchOpen ? (
                <div className="dsks-section">
                  <SectionTitle>在线素材</SectionTitle>
                  <div className="dsks-chips" style={{ marginBottom: 8 }}>
                  {[['auto', '自动'], ['cn', '国内'], ['intl', '国外'], ['bing', '必应壁纸']].map(([value, label]) => (
                    <button key={value} type="button" className="dsks-chip"
                      data-active={searchSource === value ? 'true' : 'false'}
                      onClick={() => { setSearchSource(value); setSearchRows([]); setSearchError(''); setSearchProvider('') }}>{label}</button>
                  ))}
                </div>
                <div className="dsks-searchrow">
                    <input className="dsks-input" value={query}
                      placeholder={searchSource === 'bing' ? '必应每日壁纸无需关键词，直接搜索' : '搜索壁纸：星空 / 山脉 / 极简…'}
                      onChange={(event) => setQuery(event.target.value)}
                      onKeyDown={(event) => { if (event.key === 'Enter') void runSearch(1) }} />
                    <button type="button" className="dsks-btn" data-primary="true" disabled={searching}
                      onClick={() => void runSearch(1)}>{searching ? '搜索中…' : '搜索'}</button>
                  </div>
                  <div className="dsks-hint">自动 = 国内 360 图片 + 国外 Openverse/Wikimedia 并发，谁先返回先用谁；国外素材带 CC 授权，国内图源版权归原作者、仅建议个人使用。</div>
                  {searchError ? <div className="dsks-error">{searchError}</div> : null}
                  {searchRows.length > 0 ? (
                    <>
                      <div className="dsks-grid" style={{ marginTop: 8 }}>
                        {searchRows.map((row) => (
                          <Tile key={row.id} label={row.title} thumb={row.thumb}
                            fallback={proxiedImage(row.full)} badge={row.license || '在线'}
                            onClick={() => { apply(remoteToSource(row)); stopPreview(); flash('已应用在线素材') }} />
                        ))}
                      </div>
                      <div className="dsks-actions" style={{ marginTop: 8 }}>
                        <button type="button" className="dsks-btn" disabled={searching}
                          onClick={() => void runSearch(searchPage + 1)}>加载更多</button>
                        {searchProvider ? <span className="dsks-hint" style={{ margin: 0, alignSelf: 'center' }}>来源：{searchProvider}</span> : null}
                      </div>
                    </>
                  ) : null}
                  <div className="dsks-actions" style={{ marginTop: 8 }}>
                    <button type="button" className="dsks-btn" onClick={() => setSearchOpen(false)}>收起搜索</button>
                  </div>
                </div>
              ) : null}

              <div className="dsks-section">
                <SectionTitle>内置素材</SectionTitle>
                <div className="dsks-chips" style={{ marginBottom: 4 }}>
                  {FILTERS.map((item) => (
                    <button key={item.id} type="button" className="dsks-chip"
                      data-active={filter === item.id ? 'true' : 'false'}
                      onClick={() => patch('ui.filter', item.id)}>{item.label}</button>
                  ))}
                </div>
                <div className="dsks-chips">
                  {[['all', '全部明暗'], ['dark', '深色'], ['light', '浅色']].map(([value, label]) => (
                    <button key={value} type="button" className="dsks-chip"
                      data-active={(settings.ui.tone ?? 'all') === value ? 'true' : 'false'}
                      onClick={() => patch('ui.tone', value)}>{label}</button>
                  ))}
                </div>
                {library === null ? (
                  <div className="dsks-empty">正在载入素材库…</div>
                ) : materials.length === 0 ? (
                  <div className="dsks-empty">
                    没有这一类的内置素材。
                    {libraryError ? <div className="dsks-error">{libraryError}</div> : null}
                  </div>
                ) : (
                  <div className="dsks-grid">
                    {materials.map((material) => (
                      <Tile key={material.id}
                        label={material.name}
                        badge={kindLabel(material.kind)}
                        thumb={material.kind === 'gradient' ? null : assetThumbUrl(material.thumb || material.file)}
                        gradient={material.kind === 'gradient' ? material.gradient : null}
                        active={isSameSource(settingsSource, materialToSource(material))}
                        onClick={() => onPickMaterial(material)} />
                    ))}
                  </div>
                )}
              </div>

              {localItems.length > 0 ? (
                <div className="dsks-section">
                  <SectionTitle>本地素材</SectionTitle>
                  <div className="dsks-hint" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span>{localItems.length} 个 · 约 {formatBytes(localStorageBytes)}</span>
                    <button type="button" className="dsks-btn" style={{ marginLeft: 'auto', height: 26 }}
                      onClick={() => {
                        if (!window.confirm('删除全部本地素材？壁纸若正在使用本地素材会一起清空。')) return
                        clearLocalMaterials?.()
                      }}>清空本地素材</button>
                  </div>
                  <div className="dsks-grid">
                    {localItems.map((item) => (
                      <div key={item.id} style={{ position: 'relative' }}>
                        <Tile label={item.name}
                          badge={item.kind === 'video' ? '视频' : item.kind === 'animated' ? '动图' : '本地'}
                          thumb={item.kind === 'video' ? null : (localUrls[item.id]?.thumb ?? localUrls[item.id]?.full)}
                          active={isSameSource(settingsSource, { type: 'local', id: item.id })}
                          onClick={() => onPickLocal(item)} />
                        <button type="button" className="dsks-iconbtn"
                          title="删除本地素材"
                          style={{ position: 'absolute', top: 2, right: 2, background: 'rgb(0 0 0 / 0.45)', color: '#fff' }}
                          onClick={async (event) => {
                            event.stopPropagation()
                            await removeLocalItem(item.id)
                            flash('已删除 ' + item.name)
                          }}><Icon name="trash" size={12} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          ) : null}

          {tab === 'adjust' ? (
            <>
              <div className="dsks-section">
                <SectionTitle>适配</SectionTitle>
                <div className="dsks-row">
                  <span className="dsks-row-label">铺法</span>
                  <Segmented options={FITS} value={media.fit} onChange={(value) => patch('media.fit', value)} />
                </div>
                <div className="dsks-row">
                  <span className="dsks-row-label">对齐</span>
                  <div className="dsks-chips" style={{ margin: 0 }}>
                    {POSITIONS.map(([value, label]) => (
                      <button key={value} type="button" className="dsks-chip"
                        data-active={media.position === value ? 'true' : 'false'}
                        onClick={() => patch('media.position', value)}>{label}</button>
                    ))}
                  </div>
                </div>
                <Slider label="缩放" value={media.zoom} min={1} max={2} step={0.01}
                  format={(value) => Math.round(value * 100) + '%'}
                  onChange={(value) => patch('media.zoom', value)} />
              </div>
              <div className="dsks-section">
                <SectionTitle>画面</SectionTitle>
                <Slider label="壁纸不透明度" value={media.opacity} min={0.05} max={1} step={0.01}
                  format={formatPercent} onChange={(value) => patch('media.opacity', value)} />
                <Slider label="模糊" value={media.blur} min={0} max={40} step={0.5}
                  format={(value) => value.toFixed(value % 1 === 0 ? 0 : 1) + ' px'}
                  onChange={(value) => patch('media.blur', value)} />
                <Slider label="亮度" value={media.brightness} min={0.3} max={1.6} step={0.01}
                  format={formatPercent} onChange={(value) => patch('media.brightness', value)} />
                <Slider label="对比度" value={media.contrast} min={0.5} max={1.6} step={0.01}
                  format={formatPercent} onChange={(value) => patch('media.contrast', value)} />
                <Slider label="饱和度" value={media.saturation} min={0} max={2} step={0.01}
                  format={formatPercent} onChange={(value) => patch('media.saturation', value)} />
                <Slider label="色相" value={media.hue} min={-180} max={180} step={1}
                  format={(value) => value + '°'} onChange={(value) => patch('media.hue', value)} />
                <Slider label="压暗" value={media.dim} min={0} max={0.85} step={0.01}
                  format={formatPercent} onChange={(value) => patch('media.dim', value)} />
                <Slider label="暗角" value={media.vignette} min={0} max={1} step={0.01}
                  format={formatPercent} onChange={(value) => patch('media.vignette', value)} />
                <Slider label="颗粒" value={media.grain} min={0} max={0.5} step={0.01}
                  format={formatPercent} onChange={(value) => patch('media.grain', value)} />
              </div>
              <div className="dsks-section">
                <SectionTitle>动效</SectionTitle>
                <SwitchRow label="缓慢推拉（Ken Burns）" hint="静态壁纸缓慢放大平移，省电模式下自动关闭"
                  checked={settings.motion.kenBurns} onChange={(value) => patch('motion.kenBurns', value)} />
                <SwitchRow label="鼠标视差" hint="壁纸随指针轻微移动"
                  checked={settings.motion.parallax} onChange={(value) => patch('motion.parallax', value)} />
                <SwitchRow label="遵循系统减少动效" checked={settings.motion.respectReducedMotion}
                  onChange={(value) => patch('motion.respectReducedMotion', value)} />
              </div>
              {settingsSource?.assetKind === 'video' ? (
                <div className="dsks-section">
                  <SectionTitle>视频</SectionTitle>
                  <SwitchRow label="静音播放" checked={settings.video.muted}
                    onChange={(value) => patch('video.muted', value)} />
                  <SwitchRow label="循环" checked={settings.video.loop}
                    onChange={(value) => patch('video.loop', value)} />
                  <SwitchRow label="切到后台暂停" checked={settings.video.pauseHidden}
                    onChange={(value) => patch('video.pauseHidden', value)} />
                  <Slider label="播放速度" value={settings.video.rate} min={0.25} max={2} step={0.05}
                    format={(value) => value.toFixed(2) + '×'}
                    onChange={(value) => patch('video.rate', value)} />
                </div>
              ) : null}
              <div className="dsks-actions">
                <button type="button" className="dsks-btn" onClick={() => {
                  patch('media', { ...media, opacity: 1, blur: 0, brightness: 1, contrast: 1, saturation: 1, hue: 0, zoom: 1, dim: 0.18, vignette: 0.22, grain: 0.05 })
                  flash('画面参数已重置')
                }}><Icon name="reset" size={14} />重置画面</button>
              </div>
            </>
          ) : null}

          {tab === 'surface' ? (
            <>
              <div className="dsks-section">
                <SectionTitle>界面玻璃</SectionTitle>
                <div className="dsks-hint" style={{ marginTop: 0 }}>
                  当前为最初交付的玻璃效果（实度 0.4）；也可以切到「跟随皮肤（自动）」按壁纸明暗自动调实度。当前实际实度：{Math.round((effectiveAlpha ?? surface.glass) * 100)}%。
                </div>
                <div className="dsks-actions" style={{ marginBottom: 10 }}>
                  <button type="button" className="dsks-btn" data-primary={surface.auto ? 'true' : 'false'}
                    onClick={() => {
                      patch('surface.mode', 'clear')
                      patch('surface.auto', true)
                      patch('surface.glass', 0.62)
                      patch('surface.glassBlur', 10)
                      patch('surface.sidebar', 1)
                      patch('surface.composer', 0.9)
                    }}>跟随皮肤（自动）</button>
                  <button type="button" className="dsks-btn" data-primary={!surface.auto && surface.mode !== 'glass' ? 'true' : 'false'}
                    onClick={() => {
                      patch('surface.auto', false)
                      patch('surface.mode', 'clear')
                      patch('surface.glass', 0.88)
                      patch('surface.glassBlur', 10)
                      patch('surface.sidebar', 1)
                      patch('surface.composer', 0.9)
                    }}>清晰（接近原样）</button>
                  <button type="button" className="dsks-btn" data-primary={!surface.auto && surface.mode === 'glass' ? 'true' : 'false'}
                    onClick={() => {
                      patch('surface.auto', false)
                      patch('surface.mode', 'glass')
                      patch('surface.glass', 0.55)
                      patch('surface.glassBlur', 12)
                      patch('surface.sidebar', 0.9)
                      patch('surface.composer', 0.9)
                    }}>玻璃（透出壁纸）</button>
                </div>
                <SwitchRow label="自动对比度保护" hint="按壁纸平均明暗自动抬高界面实度，深色/浅色主题下都能看清"
                  checked={surface.auto !== false}
                  onChange={(value) => patch('surface.auto', value)} />
                <Slider label="最低实度（壁纸可见度基准）" value={surface.glass} min={0.2} max={1} step={0.01}
                  format={formatPercent} onChange={(value) => patch('surface.glass', value)} />
                <Slider label="玻璃模糊" value={surface.glassBlur} min={0} max={60} step={1}
                  format={(value) => value + ' px'} onChange={(value) => patch('surface.glassBlur', value)} />
                <Slider label="侧栏实度" value={surface.sidebar} min={0} max={1.2} step={0.01}
                  format={(value) => Math.round(Math.min(1, surface.glass * value) * 100) + '%'}
                  onChange={(value) => patch('surface.sidebar', value)} />
                <Slider label="输入框实度" value={surface.composer} min={0} max={1} step={0.01}
                  format={formatPercent} onChange={(value) => patch('surface.composer', value)} />
                <Slider label="正文可读性保护" value={surface.textShadow} min={0} max={1} step={0.01}
                  format={formatPercent} onChange={(value) => patch('surface.textShadow', value)} />
              </div>
              <div className="dsks-section">
                <SectionTitle>性能</SectionTitle>
                <SwitchRow label="省电模式" hint="关闭玻璃模糊与颗粒，降低 GPU 占用"
                  checked={settings.behavior.performance}
                  onChange={(value) => patch('behavior.performance', value)} />
              </div>
              <div className="dsks-section">
                <SectionTitle>底色</SectionTitle>
                <div className="dsks-row">
                  <span className="dsks-row-label">压暗色调</span>
                  <div className="dsks-chips" style={{ margin: 0 }}>
                    {['#05070c', '#10131a', '#1a1020', '#0a1410'].map((color) => (
                      <button key={color} type="button" className="dsks-chip"
                        title={color}
                        data-active={media.dimColor === color ? 'true' : 'false'}
                        style={{ background: color, width: 22, height: 22, padding: 0, borderColor: media.dimColor === color ? 'var(--dsks-accent)' : 'var(--dsks-hairline)' }}
                        onClick={() => patch('media.dimColor', color)} />
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {tab === 'schemes' ? (
            <>
              <div className="dsks-section">
                <SectionTitle>方案</SectionTitle>
                <div className="dsks-hint" style={{ marginTop: 0 }}>把当前壁纸与全部参数保存成方案，一键切换。</div>
                <div className="dsks-searchrow">
                  <input className="dsks-input" value={schemeName} placeholder="方案名称，例如「夜间星空」"
                    onChange={(event) => setSchemeName(event.target.value)}
                    onKeyDown={(event) => { if (event.key === 'Enter' && schemeName.trim()) { saveScheme(schemeName.trim()); setSchemeName(''); flash('方案已保存') } }} />
                  <button type="button" className="dsks-btn" data-primary="true"
                    onClick={() => { if (schemeName.trim() === '') { flash('先给方案起个名字'); return } saveScheme(schemeName.trim()); setSchemeName(''); flash('方案已保存') }}>
                    <Icon name="save" size={14} />保存
                  </button>
                </div>
                <div style={{ marginTop: 10 }}>
                  {schemes.length === 0 ? <div className="dsks-empty">还没有保存的方案。</div> : schemes.map((scheme) => (
                    <div className="dsks-scheme" key={scheme.id}>
                      <div className="dsks-scheme-preview" style={{
                        backgroundImage: scheme.settings.source?.type === 'gradient'
                          ? scheme.settings.source.gradient
                          : 'url(' + (scheme.settings.source?.thumb ? assetThumbUrl(scheme.settings.source.thumb) : sourceThumbOf(scheme.settings.source)) + ')'
                      }} />
                      <div className="dsks-scheme-name">
                        <div style={{ color: 'var(--dsks-label)' }}>{scheme.name}</div>
                        <div className="dsks-hint" style={{ margin: 0 }}>{scheme.settings.source?.name ?? '无素材'}</div>
                      </div>
                      <button type="button" className="dsks-btn" onClick={() => { applyScheme(scheme); flash('已应用方案「' + scheme.name + '」') }}>应用</button>
                      <IconButton icon="trash" label="删除方案" onClick={() => deleteScheme(scheme.id)} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="dsks-section">
                <SectionTitle>轮换</SectionTitle>
                <div className="dsks-row">
                  <span className="dsks-row-label">自动轮换素材</span>
                  <Segmented
                    options={[{ value: 'off', label: '关闭' }, { value: 'session', label: '每次启动' }, { value: 'daily', label: '每天' }, { value: 'hourly', label: '每小时' }]}
                    value={settings.behavior.rotate}
                    onChange={(value) => patch('behavior.rotate', value)} />
                </div>
                <div className="dsks-hint">轮换只在内置素材库内挑选，保持当前参数不变。</div>
              </div>
              <div className="dsks-section">
                <SectionTitle>重置</SectionTitle>
                <div className="dsks-hint" style={{ marginTop: 0 }}>
                  关闭换肤、清空当前素材选择，把画面与界面参数恢复默认；不会删除已导入的本地素材和已保存方案。
                </div>
                <button type="button" className="dsks-btn" data-danger="true" onClick={() => {
                  if (!window.confirm('恢复默认设置？会关闭换肤并清掉当前素材选择，本地素材和保存的方案保留。')) return
                  resetAll()
                  flash('已恢复默认设置')
                }}>
                  <Icon name="reset" size={14} />恢复默认设置
                </button>
              </div>
              <div className="dsks-section">
                <SectionTitle>导入 / 导出</SectionTitle>
                <div className="dsks-actions" style={{ marginBottom: 8 }}>
                  <button type="button" className="dsks-btn" onClick={async () => {
                    const text = exportSettings()
                    try {
                      await navigator.clipboard.writeText(text)
                      flash('设置 JSON 已复制到剪贴板')
                    } catch {
                      setImportDraft(text)
                      flash('剪贴板不可用，已填入下方输入框')
                    }
                  }}><Icon name="download" size={14} />导出到剪贴板</button>
                </div>
                <textarea className="dsks-input" style={{ height: 64, padding: 8, resize: 'vertical' }}
                  value={importDraft} placeholder="在这里粘贴导出的设置 JSON，然后点导入"
                  onChange={(event) => setImportDraft(event.target.value)} />
                <div className="dsks-actions" style={{ marginTop: 8 }}>
                  <button type="button" className="dsks-btn" onClick={() => {
                    if (importSettings(importDraft)) { flash('设置已导入'); setImportDraft('') }
                    else flash('JSON 不合法或不是换肤设置')
                  }}>导入</button>

                </div>
              </div>
            </>
          ) : null}
        </div>

        <div className="dsks-foot">
          <span className="dsks-foot-status">
            {settingsSource ? (settingsSource.name + (settingsSource.license ? ' · ' + settingsSource.license : '')) : (disabledMedia ? '选择一张素材开始' : '')}
          </span>
          <button type="button" className="dsks-btn" onClick={startPreview} disabled={!settingsSource}>
            <Icon name="eye" size={14} />预览
          </button>
          <button type="button" className="dsks-btn" data-primary="true" onClick={close}>完成</button>
        </div>
      </div>
      {previewing ? (
        <button type="button" className="dsks-preview-chip" onClick={stopPreview}>
          预览中 · 点击任意处或按 Esc 退出
        </button>
      ) : null}
    </>
  )
}
