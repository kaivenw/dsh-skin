/**
 * 面板基础控件与图标。全部用内联 SVG + CSS 变量，不依赖宿主组件库版本。
 */
import { useCallback } from 'react'

const paths = {
  palette: 'M12 3c4.6 0 7.7 3.2 7.7 7.3 0 4.4-3.5 7.8-7.9 7.8h-2.2a5.4 5.4 0 0 1-1-10.7C9.3 4.1 10.5 3 12 3Z',
  image: 'M4 5.5h16v13H4z M7.5 10.2a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2Z M5 17l5.2-5.6 3.1 3.2 2.3-2.5L20 17',
  video: 'M4 6.5h11.5v11H4z M15.5 10.2 20 8v8l-4.5-2.2',
  sparkles: 'M12 3.5l1.6 4.4 4.4 1.6-4.4 1.6L12 15.5l-1.6-4.4L6 9.5l4.4-1.6L12 3.5Z M18.5 14.5l.9 2.2 2.1.8-2.1.8-.9 2.2-.9-2.2-2.1-.8 2.1-.8.9-2.2Z',
  close: 'M6 6l12 12M18 6 6 18',
  search: 'M10.8 17.2a6.4 6.4 0 1 0 0-12.8 6.4 6.4 0 0 0 0 12.8Z M15.5 15.5 20 20',
  link: 'M10 13.8a3.6 3.6 0 0 0 5.1 0l2.6-2.6a3.6 3.6 0 0 0-5.1-5.1l-1.2 1.2 M14 10.2a3.6 3.6 0 0 0-5.1 0l-2.6 2.6a3.6 3.6 0 0 0 5.1 5.1l1.2-1.2',
  upload: 'M12 16V4.5 M7.5 9 12 4.5 16.5 9 M4.5 15v3.5h15V15',
  trash: 'M5 7h14 M9.5 7V4.5h5V7 M7 7l1 13h8l1-13',
  check: 'M5 12.5 9.5 17 19 7',
  reset: 'M4.5 12a7.5 7.5 0 1 0 2.2-5.3 M4.5 5.2V10h4.8',
  expand: 'M9 4.5H4.5V9 M15 4.5h4.5V9 M9 19.5H4.5V15 M15 19.5h4.5V15',
  shuffle: 'M4 7h3.5l9 10H20 M4 17h3.5l2.2-2.5 M14 8.2 16.5 7H20 M16.5 4.5 20 7l-3.5 2.5 M16.5 14.5 20 17l-3.5 2.5',
  save: 'M5 4.5h11L19 8v11.5H5z M8 4.5v5h7v-5 M8 19.5v-6h8v6',
  download: 'M12 4.5V16 M7.5 11.5 12 16l4.5-4.5 M4.5 19.5h15',
  eye: 'M2.8 12S6.2 6 12 6s9.2 6 9.2 6-3.4 6-9.2 6S2.8 12 2.8 12Z M12 14.8a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Z',
  sliders: 'M4 7h10 M18 7h2 M4 12h3 M11 12h9 M4 17h7 M15 17h5 M14 5v4 M9 10v4 M13 15v4',
  layers: 'M12 3.5 20 7.8l-8 4.3-8-4.3 8-4.3Z M4 12.2l8 4.3 8-4.3 M4 16.4l8 4.3 8-4.3',
  wand: 'M4 20 13 11 M15.5 3.5l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z M19.5 12.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z',
  folder: 'M3.5 6.5h6l1.8 2.2h9.2v10.8H3.5z',
  close2: 'M5 5l14 14 M19 5 5 19'
}

export function Icon({ name, size = 16, strokeWidth = 1.7 }) {
  const d = paths[name] ?? paths.image
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

export function IconButton({ icon, label, onClick, size = 16, disabled }) {
  return (
    <button type="button" className="dsks-iconbtn" title={label} aria-label={label}
      onClick={onClick} disabled={disabled}>
      <Icon name={icon} size={size} />
    </button>
  )
}

export function Slider({ label, value, min, max, step, format, onChange, disabled }) {
  return (
    <div className="dsks-slider">
      <div className="dsks-slider-head">
        <span>{label}</span>
        <span className="dsks-slider-value">{format ? format(value) : value}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} disabled={disabled}
        onChange={(event) => onChange(Number(event.target.value))} />
    </div>
  )
}

export function SwitchRow({ label, hint, checked, onChange, disabled }) {
  return (
    <div className="dsks-row">
      <div>
        <div>{label}</div>
        {hint ? <div className="dsks-hint" style={{ margin: '2px 0 0' }}>{hint}</div> : null}
      </div>
      <button type="button" role="switch" aria-checked={checked} className="dsks-switch"
        data-checked={checked ? 'true' : 'false'} disabled={disabled}
        onClick={() => onChange(!checked)} />
    </div>
  )
}

export function Segmented({ options, value, onChange }) {
  return (
    <div className="dsks-segmented">
      {options.map((option) => (
        <button key={option.value} type="button"
          data-active={option.value === value ? 'true' : 'false'}
          onClick={() => onChange(option.value)}>{option.label}</button>
      ))}
    </div>
  )
}

export function SectionTitle({ children }) {
  return <div className="dsks-section-title">{children}</div>
}

export function useToastText() {
  return useCallback((text) => {
    // 简易状态条：等价的 toast 由面板底部状态栏承担
    return text
  }, [])
}

export function formatPercent(value) {
  return Math.round(value * 100) + '%'
}
