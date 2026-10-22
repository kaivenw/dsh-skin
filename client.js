// Generated from client/*.jsx by `node scripts/build-client.mjs`. Do not edit by hand.
window.__ModuleLoader__.load({
  id: '@local/dsh-skin',
  factory: (require) => {
const module = { exports: {} }
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// client/index.jsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(index_exports);
var import_client = require("react-dom/client");
var import_react3 = require("react");
var import_react_dom = require("react-dom");

// client/engine.js
var APP_CSS = `
html[data-dsh-skin-on] {
  --dsks-surface-rgb: 249 250 252;
  --dsks-raised-rgb: 255 255 255;
  --dsks-alpha: 0.55;
  --dsks-glass-blur: 22px;
  --dsks-sidebar-alpha: 0.55;
  --dsks-center-alpha: 0.55;
  --dsks-composer-alpha: 0.8;
  --dsks-panel-bg: rgb(255 255 255 / 0.82);
  --dsks-panel-border: rgb(255 255 255 / 0.55);
  --dsks-panel-shadow: 0 24px 64px -12px rgb(15 20 35 / 0.28), 0 2px 8px rgb(15 20 35 / 0.08);
  --dsks-label: #1b1d22;
  --dsks-label-2: #5c606b;
  --dsks-label-3: #8a8f9b;
  --dsks-hairline: rgb(15 20 35 / 0.1);
  --dsks-fill: rgb(15 20 35 / 0.05);
  --dsks-fill-strong: rgb(15 20 35 / 0.09);
  --dsks-accent: #4d6bfe;
  --dsks-accent-soft: rgb(77 107 254 / 0.12);
  --dsks-danger: #d64545;
  background: #0b0d12;
}
html[data-dsh-skin-on] body[data-ds-dark-theme] {
  --dsks-surface-rgb: 20 22 28;
  --dsks-raised-rgb: 30 33 41;
  --dsks-panel-bg: rgb(22 24 30 / 0.84);
  --dsks-panel-border: rgb(255 255 255 / 0.1);
  --dsks-panel-shadow: 0 28px 72px -16px rgb(0 0 0 / 0.72), 0 2px 10px rgb(0 0 0 / 0.4);
  --dsks-label: #f2f3f5;
  --dsks-label-2: #b6bac4;
  --dsks-label-3: #878d99;
  --dsks-hairline: rgb(255 255 255 / 0.1);
  --dsks-fill: rgb(255 255 255 / 0.07);
  --dsks-fill-strong: rgb(255 255 255 / 0.12);
  --dsks-accent: #8aa1ff;
  --dsks-accent-soft: rgb(138 161 255 / 0.16);
  --dsks-danger: #ff7b7b;
}
html[data-dsh-skin-on],
html[data-dsh-skin-on] body,
html[data-dsh-skin-on] #root,
html[data-dsh-skin-on] #root > div {
  background: transparent !important;
}

/* 清晰模式（默认）：每个区域只铺一层浅色 surface，主题文字色原样保留。
   功能容器本身不透明，壁纸只作为淡底纹，深色/浅色主题都按原色显示。 */
html[data-dsh-skin-on][data-dsh-skin-mode="clear"] [class*="_frame"] {
  background: transparent !important;
  backdrop-filter: blur(calc(var(--dsks-glass-blur) * 1.8)) saturate(1.05);
  -webkit-backdrop-filter: blur(calc(var(--dsks-glass-blur) * 1.8)) saturate(1.05);
}
html[data-dsh-skin-on][data-dsh-skin-mode="clear"] [class*="composer"] {
  background-color: transparent !important;
}
html[data-dsh-skin-on][data-dsh-skin-mode="clear"] [class*="composer"] [class*="_card"] {
  background-color: rgb(var(--dsks-raised-rgb) / var(--dsks-composer-alpha)) !important;
}
html[data-dsh-skin-on][data-dsh-skin-mode="clear"] [class*="_centerCol"],
html[data-dsh-skin-on][data-dsh-skin-mode="clear"] [class*="_rightbarCol"],
html[data-dsh-skin-on][data-dsh-skin-mode="clear"] [class*="_bottomRow"] {
  background: transparent !important;
}
html[data-dsh-skin-on][data-dsh-skin-mode="clear"] [class*="_sidebarCol"],
html[data-dsh-skin-on][data-dsh-skin-mode="clear"] [class*="_rightbarCol"],
html[data-dsh-skin-on][data-dsh-skin-mode="clear"] [class*="_bottomRow"] {
  background: rgb(var(--dsks-surface-rgb) / var(--dsks-sidebar-alpha)) !important;
}
html[data-dsh-skin-on][data-dsh-skin-mode="clear"] [class*="_sidebarCol"] > [class*="_root"] {
  background: transparent !important;
}

/* 玻璃模式：外壳容器透明，壁纸明显透出，实度由滑杆控制 */
html[data-dsh-skin-on][data-dsh-skin-mode="glass"] [class*="_frame"] {
  background: transparent !important;
  backdrop-filter: blur(var(--dsks-glass-blur)) saturate(calc(1 + var(--dsks-alpha) * 0.35));
  -webkit-backdrop-filter: blur(var(--dsks-glass-blur)) saturate(calc(1 + var(--dsks-alpha) * 0.35));
}
html[data-dsh-skin-on][data-dsh-skin-mode="glass"] [class*="_sidebarCol"],
html[data-dsh-skin-on][data-dsh-skin-mode="glass"] [class*="_centerCol"],
html[data-dsh-skin-on][data-dsh-skin-mode="glass"] [class*="_bottomRow"],
html[data-dsh-skin-on][data-dsh-skin-mode="glass"] [class*="_rightbarCol"] {
  background: transparent !important;
}
html[data-dsh-skin-on][data-dsh-skin-mode="glass"] [class*="composer"] {
  background-color: transparent !important;
}
html[data-dsh-skin-on][data-dsh-skin-mode="glass"] [class*="composer"] [class*="_card"] {
  background-color: rgb(var(--dsks-raised-rgb) / var(--dsks-composer-alpha)) !important;
}

html[data-dsh-skin-on][data-dsh-skin-perf] [class*="_frame"] {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}
html[data-dsh-skin-on][data-dsh-skin-perf] .dsks-grain {
  display: none !important;
}

/* 壁纸层 */
.dsks-layer {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  background: #08090d;
  contain: strict;
}
.dsks-parallax,
.dsks-card {
  position: absolute;
  inset: -3%;
  transform: translate3d(var(--dsks-px, 0px), var(--dsks-py, 0px), 0);
  will-change: transform;
}
.dsks-media {
  position: absolute;
  inset: 0;
  transform: scale(var(--dsks-scale, 1));
  transform-origin: center center;
  transition: transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.dsks-media-inner,
.dsks-media video,
.dsks-media img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: var(--dsks-fit, cover);
  object-position: var(--dsks-position, center center);
}
.dsks-media img.dsks-gradient,
.dsks-gradient {
  width: 100%;
  height: 100%;
  display: block;
  background-size: cover;
  background-position: center;
}
.dsks-media-inner[data-kenburns="on"] {
  animation: dsks-kenburns 42s ease-in-out infinite;
}
.dsks-gradient[data-animated="on"] {
  background-size: 220% 220% !important;
  animation: dsks-gradient-drift 26s ease-in-out infinite alternate;
}
@keyframes dsks-kenburns {
  0% { transform: scale(1) translate3d(0, 0, 0); }
  50% { transform: scale(1.075) translate3d(1.4%, -1.2%, 0); }
  100% { transform: scale(1) translate3d(0, 0, 0); }
}
@keyframes dsks-gradient-drift {
  0% { background-position: 0% 35%; }
  50% { background-position: 80% 65%; }
  100% { background-position: 100% 40%; }
}
.dsks-veil,
.dsks-vignette,
.dsks-grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.dsks-vignette {
  background: radial-gradient(120% 90% at 50% 42%, transparent 38%, rgb(0 0 0 / 0.62) 100%);
}
.dsks-grain {
  background-image: url("data:image/svg+xml;utf8,_%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E");
  background-size: 160px 160px;
  mix-blend-mode: overlay;
}
@media (prefers-reduced-motion: reduce) {
  .dsks-media-inner[data-kenburns="on"], .dsks-gradient[data-animated="on"] { animation: none !important; }
  .dsks-media { transition: none; }
}
@media (prefers-reduced-transparency: reduce) {
  html[data-dsh-skin-on] [class*="_frame"] { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }
  .dsks-panel { background: var(--dsks-raised-rgb) !important; }
}

/* 触发按钮 */
.dsks-trigger {
  -webkit-app-region: no-drag;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin: 0 8px 0 2px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--dsw-alias-label-secondary, #6b7280);
  cursor: pointer;
  flex: none;
  transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
}
.dsks-trigger:hover {
  background: var(--dsw-alias-interactive-bg-hover, rgb(127 127 127 / 0.12));
  color: var(--dsw-alias-label-primary, #111827);
}
.dsks-trigger:active { transform: scale(0.94); }
.dsks-trigger[data-on="true"] { color: var(--dsks-accent); }
.dsks-trigger:focus-visible { outline: 2px solid var(--dsks-accent); outline-offset: 1px; }
.dsks-trigger-dot {
  position: absolute;
  right: 3px;
  bottom: 3px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--dsks-accent);
  box-shadow: 0 0 0 2px var(--dsw-specific-sidebar-fill, #fff);
  opacity: 0;
  transition: opacity 0.15s ease;
}
.dsks-trigger[data-on="true"] .dsks-trigger-dot { opacity: 1; }
[data-dsh-skin-collapsed] .dsks-trigger { margin: 0; }

/* 面板 */
.dsks-panel {
  position: fixed;
  z-index: 2147483100;
  width: 392px;
  max-width: calc(100vw - 24px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid var(--dsks-panel-border);
  background: var(--dsks-panel-bg);
  box-shadow: var(--dsks-panel-shadow);
  backdrop-filter: blur(30px) saturate(1.6);
  -webkit-backdrop-filter: blur(30px) saturate(1.6);
  color: var(--dsks-label);
  font-size: 13px;
  line-height: 1.45;
  animation: dsks-pop-in 0.18s cubic-bezier(0.2, 0.8, 0.3, 1);
}
@keyframes dsks-pop-in {
  from { opacity: 0; transform: translateY(-6px) scale(0.985); }
  to { opacity: 1; transform: none; }
}
.dsks-panel[data-hidden="true"] { display: none; }
.dsks-head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 14px 10px 16px;
}
.dsks-title { font-size: 14px; font-weight: 650; letter-spacing: 0.01em; display: flex; align-items: center; gap: 8px; min-width: 0; flex: 1; }
.dsks-title small { font-weight: 400; color: var(--dsks-label-3); font-size: 11px; min-width: 0; max-width: 190px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dsks-head-actions { margin-left: auto; display: flex; align-items: center; gap: 4px; }
.dsks-iconbtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--dsks-label-2);
  cursor: pointer;
}
.dsks-iconbtn:hover { background: var(--dsks-fill-strong); color: var(--dsks-label); }
.dsks-tabs {
  display: flex;
  gap: 2px;
  margin: 0 14px 10px;
  padding: 3px;
  border-radius: 10px;
  background: var(--dsks-fill);
}
.dsks-tab {
  flex: 1;
  padding: 6px 4px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--dsks-label-2);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
}
.dsks-tab[data-active="true"] {
  background: var(--dsks-panel-bg);
  color: var(--dsks-label);
  font-weight: 600;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.12);
}
.dsks-body {
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 0 14px 12px;
  min-height: 120px;
  scrollbar-width: thin;
}
.dsks-body::-webkit-scrollbar { width: 8px; }
.dsks-body::-webkit-scrollbar-thumb { background: var(--dsks-fill-strong); border-radius: 999px; border: 2px solid transparent; background-clip: padding-box; }
.dsks-section { margin: 4px 0 14px; }
.dsks-section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 2px 8px;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--dsks-label-3);
}
.dsks-section-title::after { content: ""; flex: 1; height: 1px; background: var(--dsks-hairline); }
.dsks-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 7px 2px; }
.dsks-row-label { color: var(--dsks-label-2); }
.dsks-hint { color: var(--dsks-label-3); font-size: 11px; margin: 2px 2px 8px; }
.dsks-actions { display: flex; gap: 8px; flex-wrap: wrap; }
.dsks-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 30px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid var(--dsks-hairline);
  background: var(--dsks-fill);
  color: var(--dsks-label);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
}
.dsks-btn:hover { background: var(--dsks-fill-strong); }
.dsks-btn[data-primary="true"] { background: var(--dsks-accent); border-color: transparent; color: #fff; font-weight: 600; }
.dsks-btn[data-primary="true"]:hover { filter: brightness(1.06); }
.dsks-btn[data-danger="true"] { color: var(--dsks-danger); }
.dsks-btn:disabled { opacity: 0.5; cursor: default; }
.dsks-input {
  width: 100%;
  height: 30px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid var(--dsks-hairline);
  background: var(--dsks-fill);
  color: var(--dsks-label);
  font: inherit;
  font-size: 12px;
  outline: none;
  box-sizing: border-box;
}
.dsks-input:focus { border-color: var(--dsks-accent); box-shadow: 0 0 0 3px var(--dsks-accent-soft); }
.dsks-input::placeholder { color: var(--dsks-label-3); }
.dsks-searchrow { display: flex; gap: 6px; }
.dsks-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.dsks-tile {
  position: relative;
  aspect-ratio: 16 / 10;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 10px;
  overflow: hidden;
  background: var(--dsks-fill);
  cursor: pointer;
  color: inherit;
}
.dsks-tile img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.25s ease; }
.dsks-tile:hover img { transform: scale(1.05); }
.dsks-tile[data-active="true"] { border-color: var(--dsks-accent); box-shadow: 0 0 0 2px var(--dsks-accent-soft); }
.dsks-tile[data-broken="true"] { cursor: default; opacity: 0.72; }
.dsks-tile[data-broken="true"]:hover img { transform: none; }
.dsks-tile-name {
  position: absolute;
  inset: auto 0 0 0;
  padding: 16px 6px 5px;
  background: linear-gradient(to top, rgb(0 0 0 / 0.72), rgb(0 0 0 / 0.22) 65%, transparent);
  color: #fff;
  text-shadow: 0 1px 2px rgb(0 0 0 / 0.55);
  font-size: 10px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.dsks-tile-badge {
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 1px 5px;
  border-radius: 999px;
  background: rgb(0 0 0 / 0.5);
  color: #fff;
  font-size: 9px;
  letter-spacing: 0.04em;
  backdrop-filter: blur(6px);
}
.dsks-tile-gradient {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgb(120 126 142 / 0.35), rgb(48 53 68 / 0.55));
}
.dsks-empty {
  padding: 22px 12px;
  border: 1px dashed var(--dsks-hairline);
  border-radius: 10px;
  color: var(--dsks-label-3);
  text-align: center;
  font-size: 12px;
}
.dsks-chips { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
.dsks-chip {
  padding: 3px 9px;
  border-radius: 999px;
  border: 1px solid var(--dsks-hairline);
  background: transparent;
  color: var(--dsks-label-2);
  font: inherit;
  font-size: 11px;
  cursor: pointer;
}
.dsks-chip[data-active="true"] { background: var(--dsks-accent); border-color: transparent; color: #fff; }
.dsks-slider { padding: 3px 2px 8px; }
.dsks-slider-head { display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: var(--dsks-label-2); }
.dsks-slider-value { color: var(--dsks-label-3); font-variant-numeric: tabular-nums; font-size: 11px; }
.dsks-slider input[type="range"] {
  width: 100%;
  margin: 6px 0 0;
  accent-color: var(--dsks-accent);
  height: 16px;
}
.dsks-switch {
  position: relative;
  width: 34px;
  height: 20px;
  border-radius: 999px;
  border: 0;
  padding: 0;
  background: var(--dsks-fill-strong);
  cursor: pointer;
  flex: none;
  transition: background 0.15s ease;
}
.dsks-switch::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.25);
  transition: transform 0.18s cubic-bezier(0.2, 0.8, 0.3, 1);
}
.dsks-switch[data-checked="true"] { background: var(--dsks-accent); }
.dsks-switch[data-checked="true"]::after { transform: translateX(14px); }
.dsks-segmented {
  display: inline-flex;
  padding: 2px;
  border-radius: 8px;
  background: var(--dsks-fill);
  gap: 2px;
}
.dsks-segmented button {
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--dsks-label-2);
  font: inherit;
  font-size: 11px;
  padding: 4px 8px;
  cursor: pointer;
}
.dsks-segmented button[data-active="true"] { background: var(--dsks-panel-bg); color: var(--dsks-label); font-weight: 600; box-shadow: 0 1px 2px rgb(0 0 0 / 0.1); }
.dsks-preview {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: #0c0e13;
  margin: 2px 0 10px;
  border: 1px solid var(--dsks-hairline);
}
.dsks-preview-media { position: absolute; inset: 0; }
.dsks-preview-media img, .dsks-preview-media video, .dsks-preview-media .dsks-gradient { width: 100%; height: 100%; object-fit: cover; display: block; }
.dsks-preview-ui { position: absolute; inset: 0; display: flex; }
.dsks-preview-side { width: 30%; background: rgb(249 250 252 / 0.72); backdrop-filter: blur(8px); padding: 8px; display: flex; flex-direction: column; gap: 5px; }
.dsks-preview-main { flex: 1; margin: 12px 14px; background: rgb(255 255 255 / 0.62); backdrop-filter: blur(8px); border-radius: 8px; padding: 9px; display: flex; flex-direction: column; gap: 6px; }
body[data-ds-dark-theme] .dsks-preview-side { background: rgb(22 24 30 / 0.72); }
body[data-ds-dark-theme] .dsks-preview-main { background: rgb(30 33 41 / 0.66); }
body[data-ds-dark-theme] .dsks-preview-line { background: rgb(255 255 255 / 0.3); }
.dsks-preview-line { height: 4px; border-radius: 999px; background: rgb(20 24 32 / 0.28); }
.dsks-preview-line[data-short="true"] { width: 55%; }
.dsks-preview-caption {
  position: absolute;
  left: 8px;
  bottom: 6px;
  color: #fff;
  font-size: 10px;
  text-shadow: 0 1px 3px rgb(0 0 0 / 0.6);
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dsks-foot {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px 12px;
  border-top: 1px solid var(--dsks-hairline);
  background: rgb(var(--dsks-raised-rgb) / 0.18);
}
.dsks-foot-status { flex: 1; min-width: 0; color: var(--dsks-label-3); font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dsks-preview-chip {
  position: fixed;
  z-index: 2147483200;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  padding: 8px 14px;
  border-radius: 999px;
  background: rgb(18 20 26 / 0.82);
  color: #fff;
  font-size: 12px;
  border: 1px solid rgb(255 255 255 / 0.16);
  backdrop-filter: blur(16px);
  cursor: pointer;
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.35);
  animation: dsks-pop-in 0.2s ease;
}
.dsks-banner {
  margin: 0 0 10px;
  padding: 8px 10px;
  border-radius: 8px;
  background: var(--dsks-accent-soft);
  color: var(--dsks-label-2);
  font-size: 11px;
}
.dsks-error { color: var(--dsks-danger); font-size: 11px; margin: 6px 2px; }
.dsks-scheme {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid var(--dsks-hairline);
  margin-bottom: 6px;
}
.dsks-scheme-preview { width: 44px; height: 28px; border-radius: 6px; background-size: cover; background-position: center; flex: none; }
.dsks-scheme-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* 面板自带配色（与换肤是否启用无关）：默认浅色，body 暗色主题时覆盖。 */
.dsks-panel {
  --dsks-surface-rgb: 249 250 252;
  --dsks-raised-rgb: 255 255 255;
  --dsks-panel-bg: rgb(255 255 255 / 0.86);
  --dsks-panel-border: rgb(255 255 255 / 0.6);
  --dsks-panel-shadow: 0 24px 64px -12px rgb(15 20 35 / 0.26), 0 2px 8px rgb(15 20 35 / 0.08);
  --dsks-label: #1b1d22;
  --dsks-label-2: #5c606b;
  --dsks-label-3: #8a8f9b;
  --dsks-hairline: rgb(15 20 35 / 0.1);
  --dsks-fill: rgb(15 20 35 / 0.05);
  --dsks-fill-strong: rgb(15 20 35 / 0.09);
  --dsks-accent: #4d6bfe;
  --dsks-accent-soft: rgb(77 107 254 / 0.12);
  --dsks-danger: #d64545;
}
body[data-ds-dark-theme] .dsks-panel {
  --dsks-surface-rgb: 20 22 28;
  --dsks-raised-rgb: 30 33 41;
  --dsks-panel-bg: rgb(22 24 30 / 0.88);
  --dsks-panel-border: rgb(255 255 255 / 0.1);
  --dsks-panel-shadow: 0 28px 72px -16px rgb(0 0 0 / 0.72), 0 2px 10px rgb(0 0 0 / 0.4);
  --dsks-label: #f2f3f5;
  --dsks-label-2: #b6bac4;
  --dsks-label-3: #878d99;
  --dsks-hairline: rgb(255 255 255 / 0.1);
  --dsks-fill: rgb(255 255 255 / 0.07);
  --dsks-fill-strong: rgb(255 255 255 / 0.12);
  --dsks-accent: #8aa1ff;
  --dsks-accent-soft: rgb(138 161 255 / 0.16);
  --dsks-danger: #ff7b7b;
}
`;
function applyVars(settings, source, alpha) {
  const html = document.documentElement;
  const media = settings.media;
  const surface = settings.surface;
  const effective = typeof alpha === "number" && Number.isFinite(alpha) ? Math.min(1, Math.max(0.05, alpha)) : surface.glass;
  const perf = settings.behavior.performance === true;
  const animated = source?.assetKind === "video" || source?.assetKind === "animated";
  html.setAttribute("data-dsh-skin-on", "");
  if (perf) html.setAttribute("data-dsh-skin-perf", "");
  else html.removeAttribute("data-dsh-skin-perf");
  html.setAttribute("data-dsh-skin-mode", surface.mode === "glass" ? "glass" : "clear");
  const set = (name2, value) => html.style.setProperty(name2, value);
  set("--dsks-alpha", String(effective));
  set("--dsks-glass-blur", (perf ? 0 : Math.min(surface.glassBlur, animated ? 8 : surface.glassBlur)) + "px");
  set("--dsks-sidebar-alpha", String(Math.min(1, effective * Math.max(0.25, surface.sidebar))));
  const center = Math.min(1, effective + surface.textShadow * 0.18);
  set("--dsks-center-alpha", String(center));
  const composerLift = surface.mode === "glass" ? 0.34 * surface.composer : 0.04;
  set("--dsks-composer-alpha", String(Math.min(1, effective + composerLift)));
  set("--dsks-chrome-alpha", String(Math.min(1, Math.max(0.55, effective - 0.02))));
  set("--dsks-scale", String(media.zoom));
  set("--dsks-fit", media.fit === "tile" ? "cover" : media.fit);
  set("--dsks-position", media.position);
  return () => {
    html.removeAttribute("data-dsh-skin-on");
    html.removeAttribute("data-dsh-skin-perf");
    html.removeAttribute("data-dsh-skin-mode");
    for (const name2 of ["--dsks-alpha", "--dsks-glass-blur", "--dsks-sidebar-alpha", "--dsks-center-alpha", "--dsks-composer-alpha", "--dsks-chrome-alpha", "--dsks-scale", "--dsks-fit", "--dsks-position", "--dsks-px", "--dsks-py"]) {
      html.style.removeProperty(name2);
    }
  };
}
function mediaFilter(settings) {
  const media = settings.media;
  const parts = [];
  if (media.blur > 0) parts.push("blur(" + media.blur.toFixed(2) + "px)");
  if (media.brightness !== 1) parts.push("brightness(" + media.brightness + ")");
  if (media.contrast !== 1) parts.push("contrast(" + media.contrast + ")");
  if (media.saturation !== 1) parts.push("saturate(" + media.saturation + ")");
  if (media.hue !== 0) parts.push("hue-rotate(" + media.hue + "deg)");
  return parts.length ? parts.join(" ") : "none";
}
function effectiveScale(settings) {
  const blurBoost = settings.media.blur > 0 ? 1 + settings.media.blur / 160 : 1;
  return settings.media.zoom * blurBoost;
}

// client/settings.js
var SETTINGS_KEY = "dsh.skin.settings.v1";
var SCHEMES_KEY = "dsh.skin.schemes.v1";
var RANGES = {
  "media.opacity": [0.05, 1, 0.01],
  "media.blur": [0, 40, 0.5],
  "media.zoom": [1, 2, 0.01],
  "media.brightness": [0.3, 1.6, 0.01],
  "media.contrast": [0.5, 1.6, 0.01],
  "media.saturation": [0, 2, 0.01],
  "media.hue": [-180, 180, 1],
  "media.dim": [0, 0.85, 0.01],
  "media.vignette": [0, 1, 0.01],
  "media.grain": [0, 0.5, 0.01],
  "surface.glass": [0, 1, 0.01],
  "surface.glassBlur": [0, 60, 1],
  "surface.sidebar": [0, 1.2, 0.01],
  "surface.composer": [0, 1, 0.01],
  "surface.textShadow": [0, 1, 0.01],
  "video.rate": [0.25, 2, 0.05]
};
var FITS = [
  { value: "cover", label: "填满裁切" },
  { value: "contain", label: "完整显示" },
  { value: "fill", label: "拉伸铺满" },
  { value: "tile", label: "平铺" }
];
var POSITIONS = [
  ["center center", "居中"],
  ["center top", "顶部"],
  ["center bottom", "底部"],
  ["left center", "左侧"],
  ["right center", "右侧"]
];
var DEFAULTS = {
  enabled: false,
  source: null,
  media: {
    fit: "cover",
    position: "center center",
    zoom: 1,
    opacity: 1,
    blur: 0,
    brightness: 1,
    contrast: 1,
    saturation: 1,
    hue: 0,
    dim: 0.12,
    dimColor: "#05070c",
    vignette: 0.18,
    grain: 0.05
  },
  surface: {
    mode: "glass",
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
    rotate: "off",
    performance: false
  },
  ui: {
    tab: "library",
    filter: "all",
    tone: "all"
  },
  schema: 7
};
var clamp = (value, min, max) => Math.min(max, Math.max(min, value));
function num(value, fallback, min, max) {
  const parsed = typeof value === "number" ? value : Number.parseFloat(value);
  if (!Number.isFinite(parsed)) return fallback;
  return clamp(parsed, min, max);
}
function pick(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}
function defaultSettings() {
  return JSON.parse(JSON.stringify(DEFAULTS));
}
function normalizeSettings(raw) {
  const base = defaultSettings();
  if (!raw || typeof raw !== "object") return base;
  const out = base;
  out.enabled = raw.enabled === true;
  out.source = normalizeSource(raw.source);
  const media = raw.media ?? {};
  out.media.fit = pick(media.fit, FITS.map((item) => item.value), base.media.fit);
  out.media.position = pick(media.position, POSITIONS.map((item) => item[0]), base.media.position);
  for (const key of ["zoom", "opacity", "blur", "brightness", "contrast", "saturation", "hue", "dim", "vignette", "grain"]) {
    const [min, max] = RANGES["media." + key];
    out.media[key] = num(media[key], base.media[key], min, max);
  }
  out.media.dimColor = typeof media.dimColor === "string" && /^#[0-9a-f]{6}$/i.test(media.dimColor) ? media.dimColor : base.media.dimColor;
  const surface = raw.surface ?? {};
  out.surface.mode = pick(surface.mode, ["clear", "glass"], "clear");
  out.surface.auto = surface.auto !== false;
  for (const key of ["glass", "glassBlur", "sidebar", "composer", "textShadow"]) {
    const [min, max] = RANGES["surface." + key];
    out.surface[key] = num(surface[key], base.surface[key], min, max);
  }
  out.surface.menusOpaque = surface.menusOpaque !== false;
  out.motion.kenBurns = raw.motion?.kenBurns === true;
  out.motion.parallax = raw.motion?.parallax === true;
  out.motion.respectReducedMotion = raw.motion?.respectReducedMotion !== false;
  out.video.muted = raw.video?.muted !== false;
  out.video.loop = raw.video?.loop !== false;
  out.video.pauseHidden = raw.video?.pauseHidden !== false;
  out.video.rate = num(raw.video?.rate, base.video.rate, 0.25, 2);
  out.behavior.rotate = pick(raw.behavior?.rotate, ["off", "daily", "hourly", "session"], "off");
  out.behavior.performance = raw.behavior?.performance === true;
  out.schema = 7;
  out.ui.tab = pick(raw.ui?.tab, ["library", "adjust", "surface", "schemes"], "library");
  out.ui.filter = pick(raw.ui?.filter, ["all", "image", "animated", "video", "gradient"], "all");
  out.ui.tone = pick(raw.ui?.tone, ["all", "dark", "light"], "all");
  return out;
}
function normalizeSource(raw) {
  if (!raw || typeof raw !== "object") return null;
  const type = pick(raw.type, ["asset", "remote", "local", "gradient"], null);
  if (type === null) return null;
  const source = { type, id: String(raw.id ?? ""), name: String(raw.name ?? "未命名素材") };
  if (type === "asset") {
    if (typeof raw.file !== "string" || raw.file === "") return null;
    source.file = raw.file;
    source.thumb = typeof raw.thumb === "string" ? raw.thumb : void 0;
    source.assetKind = pick(raw.assetKind, ["image", "animated", "video", "gradient"], "image");
    if (raw.variants && typeof raw.variants === "object") {
      const variants = {};
      for (const edge of ["960", "1600", "2400"]) {
        if (typeof raw.variants[edge] === "string" && raw.variants[edge] !== "") variants[edge] = raw.variants[edge];
      }
      if (Object.keys(variants).length > 0) source.variants = variants;
    }
  } else if (type === "remote") {
    if (typeof raw.url !== "string") return null;
    if (!/^https?:\/\//i.test(raw.url) && !raw.url.startsWith("/dsh-skin/api/image?url=")) return null;
    source.url = raw.url;
    source.thumb = typeof raw.thumb === "string" ? raw.thumb : void 0;
    source.assetKind = pick(raw.assetKind, ["image", "animated", "video"], "image");
    source.license = typeof raw.license === "string" ? raw.license : void 0;
    source.author = typeof raw.author === "string" ? raw.author : void 0;
    source.sourceUrl = typeof raw.sourceUrl === "string" ? raw.sourceUrl : void 0;
  } else if (type === "local") {
    if (typeof raw.id !== "string" || raw.id === "") return null;
    source.mime = typeof raw.mime === "string" ? raw.mime : "";
    const mime = String(source.mime || "");
    const derived = mime.startsWith("video/") ? "video" : mime === "image/gif" || mime === "image/apng" ? "animated" : "image";
    source.assetKind = pick(raw.assetKind, ["image", "animated", "video"], derived);
  } else {
    if (typeof raw.gradient !== "string" || raw.gradient === "") return null;
    source.gradient = raw.gradient;
  }
  if (typeof source.thumb === "string" && source.thumb !== "") source.thumb = source.thumb;
  if (raw.palette && Array.isArray(raw.palette)) source.palette = raw.palette.filter((c) => typeof c === "string").slice(0, 5);
  return source;
}
function weakDevice() {
  try {
    const cores = navigator.hardwareConcurrency || 8;
    const memory = navigator.deviceMemory || 8;
    return cores <= 4 || memory <= 4;
  } catch {
    return false;
  }
}
function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      const initial = defaultSettings();
      if (weakDevice()) initial.behavior.performance = true;
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (parsed && parsed.schema !== 7) {
      if (parsed.surface) {
        parsed.surface.mode = "glass";
        parsed.surface.auto = false;
        parsed.surface.glass = 0.4;
        parsed.surface.glassBlur = 12;
        parsed.surface.sidebar = 1.35;
        parsed.surface.composer = 0.9;
      }
      parsed.schema = 7;
    }
    return normalizeSettings(parsed);
  } catch {
    return defaultSettings();
  }
}
function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
  }
}
function loadSchemes() {
  try {
    const raw = localStorage.getItem(SCHEMES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item && typeof item.id === "string" && item.settings).map((item) => ({ id: item.id, name: String(item.name ?? "未命名方案"), savedAt: Number(item.savedAt) || 0, settings: normalizeSettings(item.settings) }));
  } catch {
    return [];
  }
}
function saveSchemes(schemes) {
  try {
    localStorage.setItem(SCHEMES_KEY, JSON.stringify(schemes));
  } catch {
  }
}
function newSchemeId() {
  return "scheme-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);
}

// client/media.js
var DB_NAME = "dsh-skin";
var DB_VERSION = 1;
var STORE = "media";
var MAX_IMAGE_EDGE = 1920;
var MAX_IMAGE_BYTES = 80 * 1024 * 1024;
var MAX_VIDEO_BYTES = 200 * 1024 * 1024;
var MAX_TOTAL_BYTES = 1.2 * 1024 * 1024 * 1024;
var THUMB_EDGE = 360;
var dbPromise = null;
function openDb() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: "id" });
        store.createIndex("addedAt", "addedAt");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("indexedDB open failed"));
  });
  return dbPromise;
}
function tx(mode) {
  return openDb().then((db) => db.transaction(STORE, mode).objectStore(STORE));
}
function done(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("indexedDB request failed"));
  });
}
async function putLocal(record) {
  const store = await tx("readwrite");
  await done(store.put(record));
  return record.id;
}
async function getLocal(id) {
  if (!id) return null;
  const store = await tx("readonly");
  return await done(store.get(id)) ?? null;
}
async function listLocal() {
  const store = await tx("readonly");
  const rows = await done(store.getAll());
  return (Array.isArray(rows) ? rows : []).map(({ blob, thumbBlob, ...meta }) => meta).sort((a, b) => (b.addedAt ?? 0) - (a.addedAt ?? 0));
}
async function removeLocal(id) {
  if (!id) return;
  const store = await tx("readwrite");
  await done(store.delete(id));
}
async function clearLocal() {
  const store = await tx("readwrite");
  await done(store.clear());
}
function newLocalId() {
  return "local-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
}
function isAnimatedType(type) {
  return type === "image/gif";
}
function readImageSize(blob) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(blob);
    const image = new Image();
    image.onload = () => {
      resolve({ width: image.naturalWidth || 0, height: image.naturalHeight || 0 });
      URL.revokeObjectURL(url);
    };
    image.onerror = () => {
      resolve({ width: 0, height: 0 });
      URL.revokeObjectURL(url);
    };
    image.src = url;
  });
}
async function makeThumbnail(blob, width, height) {
  const edge = Math.max(width, height);
  if (edge <= 0) return null;
  const scale = Math.min(1, THUMB_EDGE / edge);
  const target = { width: Math.max(1, Math.round(width * scale)), height: Math.max(1, Math.round(height * scale)) };
  try {
    const bitmap = await createImageBitmap(blob);
    const canvas = document.createElement("canvas");
    canvas.width = target.width;
    canvas.height = target.height;
    const context = canvas.getContext("2d");
    context.imageSmoothingQuality = "high";
    context.drawImage(bitmap, 0, 0, target.width, target.height);
    bitmap.close?.();
    const thumb = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.82));
    return thumb ?? null;
  } catch {
    return null;
  }
}
async function downscaleImage(blob, width, height) {
  const edge = Math.max(width, height);
  if (edge <= MAX_IMAGE_EDGE) return blob;
  const scale = MAX_IMAGE_EDGE / edge;
  const target = { width: Math.max(1, Math.round(width * scale)), height: Math.max(1, Math.round(height * scale)) };
  try {
    const bitmap = await createImageBitmap(blob);
    const canvas = document.createElement("canvas");
    canvas.width = target.width;
    canvas.height = target.height;
    const context = canvas.getContext("2d");
    context.imageSmoothingQuality = "high";
    context.drawImage(bitmap, 0, 0, target.width, target.height);
    bitmap.close?.();
    const next = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.9));
    return next ?? blob;
  } catch {
    return blob;
  }
}
async function importLocalFile(file) {
  if (!(file instanceof Blob)) throw new Error("不是可用的文件");
  const type = file.type || "";
  const isVideo = type.startsWith("video/");
  const isImage = type.startsWith("image/");
  if (!isVideo && !isImage) throw new Error("只支持图片、动图（GIF）或视频文件");
  if (isVideo && file.size > MAX_VIDEO_BYTES) throw new Error("视频超过 200MB，换小一点的视频或改用链接");
  if (isImage && file.size > MAX_IMAGE_BYTES) throw new Error("图片超过 80MB，先压缩一下再导入");
  try {
    const estimate = await navigator.storage?.estimate?.();
    if (estimate && Number(estimate.usage) + file.size > MAX_TOTAL_BYTES) {
      throw new Error("本地素材总占用接近 1.2GB，请先删掉一些旧素材再导入");
    }
  } catch (error) {
    if (String(error?.message || "").includes("1.2GB")) throw error;
  }
  let blob = file;
  let width = 0;
  let height = 0;
  let kind = isVideo ? "video" : "image";
  if (isVideo) {
    const size = await new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        resolve({ width: video.videoWidth || 0, height: video.videoHeight || 0 });
        URL.revokeObjectURL(url);
      };
      video.onerror = () => {
        resolve({ width: 0, height: 0 });
        URL.revokeObjectURL(url);
      };
      video.src = url;
    });
    width = size.width;
    height = size.height;
  } else {
    const size = await readImageSize(file);
    width = size.width;
    height = size.height;
    if (isAnimatedType(type)) {
      kind = "animated";
    } else {
      blob = await downscaleImage(file, width, height);
      if (blob !== file) {
        const nextSize = await readImageSize(blob);
        width = nextSize.width || width;
        height = nextSize.height || height;
      }
    }
  }
  const id = newLocalId();
  const thumbBlob = isVideo ? null : await makeThumbnail(blob, width, height);
  await putLocal({
    id,
    name: file.name || (kind === "video" ? "本地视频" : "本地图片"),
    mime: blob.type || type || "",
    kind,
    width,
    height,
    size: blob.size,
    blob,
    thumbBlob,
    addedAt: Date.now()
  });
  return { id, name: file.name || "", mime: blob.type || type, kind, width, height, size: blob.size };
}
function pickMediaFile(files) {
  const list = Array.from(files ?? []);
  return list.find((file) => {
    const type = file?.type || "";
    return type.startsWith("image/") || type.startsWith("video/");
  }) ?? null;
}
function assetThumbUrl(thumb) {
  if (!thumb) return null;
  if (/^https?:\/\//i.test(thumb) || thumb.startsWith("/")) return thumb;
  return "/dsh-skin/assets/" + thumb.replace(/^\/+/, "");
}

// client/materials.js
var GRADIENTS = [
  {
    id: "grad-deep-aurora",
    name: "深海极光",
    kind: "gradient",
    animated: true,
    gradient: "radial-gradient(120% 90% at 18% 12%, #173a6b 0%, transparent 55%), radial-gradient(100% 80% at 82% 18%, #0a6a72 0%, transparent 52%), radial-gradient(120% 100% at 60% 100%, #2a1a5e 0%, transparent 58%), linear-gradient(160deg, #05070d, #070b14 60%, #04060b)",
    tags: ["深色", "蓝绿", "抽象"],
    palette: ["#0a2a52", "#0a6a72", "#2a1a5e"]
  },
  {
    id: "grad-dusk-lava",
    name: "暮色熔岩",
    kind: "gradient",
    animated: true,
    gradient: "radial-gradient(90% 70% at 15% 20%, #5b1e3c 0%, transparent 55%), radial-gradient(80% 70% at 85% 30%, #7a2f1f 0%, transparent 50%), radial-gradient(120% 100% at 50% 100%, #2a1230 0%, transparent 60%), linear-gradient(#0a060a, #0a060a)",
    tags: ["深色", "暖红", "抽象"],
    palette: ["#5b1e3c", "#7a2f1f", "#2a1230"]
  },
  {
    id: "grad-mist-glass",
    name: "雾青玻璃",
    kind: "gradient",
    gradient: "radial-gradient(80% 70% at 12% 10%, #d9ecff 0%, transparent 60%), radial-gradient(70% 60% at 88% 14%, #cfe9e2 0%, transparent 55%), radial-gradient(120% 110% at 50% 100%, #e7e2fb 0%, transparent 65%), linear-gradient(#f6f8fb, #f6f8fb)",
    tags: ["浅色", "青蓝", "柔和"],
    palette: ["#d9ecff", "#cfe9e2", "#e7e2fb"]
  },
  {
    id: "grad-morning-apricot",
    name: "晨雾杏光",
    kind: "gradient",
    gradient: "radial-gradient(80% 70% at 15% 12%, #ffe8d6 0%, transparent 60%), radial-gradient(70% 65% at 88% 20%, #ffd6e8 0%, transparent 55%), radial-gradient(120% 100% at 45% 100%, #fff2cf 0%, transparent 60%), linear-gradient(#fdf8f4, #fdf8f4)",
    tags: ["浅色", "暖杏", "柔和"],
    palette: ["#ffe8d6", "#ffd6e8", "#fff2cf"]
  },
  {
    id: "grad-teal-peacock",
    name: "孔雀石",
    kind: "gradient",
    animated: true,
    gradient: "radial-gradient(100% 80% at 20% 15%, #0f4c4a 0%, transparent 55%), radial-gradient(90% 80% at 85% 25%, #155e63 0%, transparent 52%), radial-gradient(120% 100% at 50% 100%, #08222e 0%, transparent 62%), linear-gradient(#05121a, #05121a)",
    tags: ["深色", "青绿", "抽象"],
    palette: ["#0f4c4a", "#155e63", "#05121a"]
  },
  {
    id: "grad-graphite",
    name: "石墨极简",
    kind: "gradient",
    gradient: "radial-gradient(120% 100% at 20% 0%, #1c2333 0%, transparent 55%), radial-gradient(90% 80% at 90% 20%, #232a3d 0%, transparent 50%), linear-gradient(180deg, #0e1118, #0a0c11)",
    tags: ["深色", "中性", "极简"],
    palette: ["#1c2333", "#232a3d", "#0a0c11"]
  },
  {
    id: "grad-sakura",
    name: "樱雾",
    kind: "gradient",
    gradient: "radial-gradient(80% 70% at 18% 15%, #ffe0ea 0%, transparent 58%), radial-gradient(80% 70% at 82% 18%, #f3d9ff 0%, transparent 55%), radial-gradient(120% 100% at 50% 100%, #e5f1ff 0%, transparent 62%), linear-gradient(#fbf7fa, #fbf7fa)",
    tags: ["浅色", "粉紫", "柔和"],
    palette: ["#ffe0ea", "#f3d9ff", "#e5f1ff"]
  },
  {
    id: "grad-cyber",
    name: "赛博紫",
    kind: "gradient",
    animated: true,
    gradient: "radial-gradient(90% 70% at 12% 18%, #3b0f6b 0%, transparent 55%), radial-gradient(90% 80% at 88% 22%, #0b3f66 0%, transparent 52%), radial-gradient(100% 80% at 50% 95%, #6b0f4a 0%, transparent 58%), linear-gradient(#05040a, #05040a)",
    tags: ["深色", "紫蓝", "霓虹"],
    palette: ["#3b0f6b", "#0b3f66", "#6b0f4a"]
  }
];
var KIND_LABEL = { image: "静态", animated: "动图", video: "视频", gradient: "渐变" };
function proxiedImage(url) {
  if (typeof url !== "string" || !/^https?:\/\//i.test(url)) return url;
  return "/dsh-skin/api/image?url=" + encodeURIComponent(url);
}
function kindLabel(kind) {
  return KIND_LABEL[kind] ?? "素材";
}
function materialToSource(material) {
  if (material.kind === "gradient") {
    return {
      type: "gradient",
      id: material.id,
      name: material.name,
      gradient: material.gradient,
      assetKind: "gradient"
    };
  }
  return {
    type: "asset",
    id: material.id,
    name: material.name,
    file: material.file,
    thumb: material.thumb,
    ...material.variants ? { variants: material.variants } : {},
    assetKind: material.kind,
    ...material.palette ? { palette: material.palette } : {}
  };
}
function normalizeManifestRow(row) {
  if (!row || typeof row !== "object") return null;
  const kind = ["image", "animated", "video", "gradient"].includes(row.kind) ? row.kind : null;
  if (kind === null) return null;
  if (kind === "gradient") {
    return {
      id: String(row.id ?? ""),
      name: String(row.name ?? "渐变"),
      kind,
      gradient: String(row.gradient ?? ""),
      animated: row.animated === true,
      tags: Array.isArray(row.tags) ? row.tags.filter((tag) => typeof tag === "string") : [],
      palette: Array.isArray(row.palette) ? row.palette : void 0,
      license: row.license
    };
  }
  if (typeof row.file !== "string" || row.file === "") return null;
  return {
    id: String(row.id ?? row.file),
    name: String(row.name ?? "素材"),
    kind,
    file: row.file,
    thumb: typeof row.thumb === "string" ? row.thumb : void 0,
    variants: row.variants && typeof row.variants === "object" ? row.variants : void 0,
    width: Number(row.width) || 0,
    height: Number(row.height) || 0,
    durationMs: Number(row.durationMs) || 0,
    tags: Array.isArray(row.tags) ? row.tags.filter((tag) => typeof tag === "string") : [],
    palette: Array.isArray(row.palette) ? row.palette : void 0,
    license: row.license
  };
}
async function fetchMaterialLibrary() {
  const rows = [];
  try {
    const response = await fetch("/dsh-skin/api/materials", { cache: "no-store" });
    if (response.ok) {
      const body = await response.json();
      for (const row of Array.isArray(body?.materials) ? body.materials : []) {
        const normalized = normalizeManifestRow(row);
        if (normalized) rows.push(normalized);
      }
    }
  } catch {
  }
  const gradients = GRADIENTS.map((item) => ({ ...item }));
  return [...gradients, ...rows];
}
async function searchMaterials(query, page = 1, source = "auto") {
  const params = new URLSearchParams({ q: query, page: String(page), source });
  const response = await fetch("/dsh-skin/api/search?" + params.toString(), { cache: "no-store" });
  if (!response.ok) {
    const message = await response.json().catch(() => null);
    throw new Error(message?.error || message?.problem || "搜索失败（" + response.status + "）");
  }
  const body = await response.json();
  const results = (Array.isArray(body?.results) ? body.results : []).filter((row) => row && typeof row.full === "string").map((row) => ({
    id: String(row.id),
    title: String(row.title || "在线素材"),
    full: row.full,
    thumb: proxiedImage(row.thumb || row.full),
    width: Number(row.width) || 0,
    height: Number(row.height) || 0,
    author: String(row.author || ""),
    license: String(row.license || ""),
    licenseUrl: String(row.licenseUrl || ""),
    source: String(row.source || ""),
    sourceUrl: String(row.sourceUrl || "")
  }));
  return { provider: body?.provider ?? "", providers: Array.isArray(body?.providers) ? body.providers : [], results };
}
function remoteToSource(row) {
  const isVideo = /\.(mp4|webm|mov)(\?|$)/i.test(row.full);
  return {
    type: "remote",
    id: row.id,
    name: row.title,
    url: isVideo ? row.full : proxiedImage(row.full),
    thumb: proxiedImage(row.thumb),
    assetKind: isVideo ? "video" : "image",
    license: row.license,
    author: row.author,
    sourceUrl: row.sourceUrl
  };
}

// client/panel.jsx
var import_react2 = require("react");

// client/ui.jsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var paths = {
  palette: "M12 3c4.6 0 7.7 3.2 7.7 7.3 0 4.4-3.5 7.8-7.9 7.8h-2.2a5.4 5.4 0 0 1-1-10.7C9.3 4.1 10.5 3 12 3Z",
  image: "M4 5.5h16v13H4z M7.5 10.2a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2Z M5 17l5.2-5.6 3.1 3.2 2.3-2.5L20 17",
  video: "M4 6.5h11.5v11H4z M15.5 10.2 20 8v8l-4.5-2.2",
  sparkles: "M12 3.5l1.6 4.4 4.4 1.6-4.4 1.6L12 15.5l-1.6-4.4L6 9.5l4.4-1.6L12 3.5Z M18.5 14.5l.9 2.2 2.1.8-2.1.8-.9 2.2-.9-2.2-2.1-.8 2.1-.8.9-2.2Z",
  close: "M6 6l12 12M18 6 6 18",
  search: "M10.8 17.2a6.4 6.4 0 1 0 0-12.8 6.4 6.4 0 0 0 0 12.8Z M15.5 15.5 20 20",
  link: "M10 13.8a3.6 3.6 0 0 0 5.1 0l2.6-2.6a3.6 3.6 0 0 0-5.1-5.1l-1.2 1.2 M14 10.2a3.6 3.6 0 0 0-5.1 0l-2.6 2.6a3.6 3.6 0 0 0 5.1 5.1l1.2-1.2",
  upload: "M12 16V4.5 M7.5 9 12 4.5 16.5 9 M4.5 15v3.5h15V15",
  trash: "M5 7h14 M9.5 7V4.5h5V7 M7 7l1 13h8l1-13",
  check: "M5 12.5 9.5 17 19 7",
  reset: "M4.5 12a7.5 7.5 0 1 0 2.2-5.3 M4.5 5.2V10h4.8",
  expand: "M9 4.5H4.5V9 M15 4.5h4.5V9 M9 19.5H4.5V15 M15 19.5h4.5V15",
  shuffle: "M4 7h3.5l9 10H20 M4 17h3.5l2.2-2.5 M14 8.2 16.5 7H20 M16.5 4.5 20 7l-3.5 2.5 M16.5 14.5 20 17l-3.5 2.5",
  save: "M5 4.5h11L19 8v11.5H5z M8 4.5v5h7v-5 M8 19.5v-6h8v6",
  download: "M12 4.5V16 M7.5 11.5 12 16l4.5-4.5 M4.5 19.5h15",
  eye: "M2.8 12S6.2 6 12 6s9.2 6 9.2 6-3.4 6-9.2 6S2.8 12 2.8 12Z M12 14.8a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Z",
  sliders: "M4 7h10 M18 7h2 M4 12h3 M11 12h9 M4 17h7 M15 17h5 M14 5v4 M9 10v4 M13 15v4",
  layers: "M12 3.5 20 7.8l-8 4.3-8-4.3 8-4.3Z M4 12.2l8 4.3 8-4.3 M4 16.4l8 4.3 8-4.3",
  wand: "M4 20 13 11 M15.5 3.5l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z M19.5 12.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z",
  folder: "M3.5 6.5h6l1.8 2.2h9.2v10.8H3.5z",
  close2: "M5 5l14 14 M19 5 5 19"
};
function Icon({ name: name2, size = 16, strokeWidth = 1.7 }) {
  const d = paths[name2] ?? paths.image;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d })
    }
  );
}
function IconButton({ icon, label, onClick, size = 16, disabled }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      type: "button",
      className: "dsks-iconbtn",
      title: label,
      "aria-label": label,
      onClick,
      disabled,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: icon, size })
    }
  );
}
function Slider({ label, value, min, max, step, format, onChange, disabled }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsks-slider", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsks-slider-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsks-slider-value", children: format ? format(value) : value })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "input",
      {
        type: "range",
        min,
        max,
        step,
        value,
        disabled,
        onChange: (event) => onChange(Number(event.target.value))
      }
    )
  ] });
}
function SwitchRow({ label, hint, checked, onChange, disabled }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsks-row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: label }),
      hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsks-hint", style: { margin: "2px 0 0" }, children: hint }) : null
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": checked,
        className: "dsks-switch",
        "data-checked": checked ? "true" : "false",
        disabled,
        onClick: () => onChange(!checked)
      }
    )
  ] });
}
function Segmented({ options, value, onChange }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsks-segmented", children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      type: "button",
      "data-active": option.value === value ? "true" : "false",
      onClick: () => onChange(option.value),
      children: option.label
    },
    option.value
  )) });
}
function SectionTitle({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsks-section-title", children });
}
function formatPercent(value) {
  return Math.round(value * 100) + "%";
}

// client/panel.jsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function formatBytes(bytes) {
  const value = Number(bytes) || 0;
  if (value < 1024 * 1024) return Math.max(0, Math.round(value / 1024)) + " KB";
  const mb = value / (1024 * 1024);
  return mb >= 1024 ? (mb / 1024).toFixed(2) + " GB" : mb.toFixed(mb < 10 ? 1 : 0) + " MB";
}
var TABS = [
  { id: "library", label: "素材" },
  { id: "adjust", label: "画面" },
  { id: "surface", label: "界面" },
  { id: "schemes", label: "方案" }
];
var FILTERS = [
  { id: "all", label: "全部" },
  { id: "image", label: "静态" },
  { id: "animated", label: "动图" },
  { id: "video", label: "视频" },
  { id: "gradient", label: "渐变" }
];
function sourceUrlOf(source) {
  if (!source) return null;
  if (source.type === "asset") return "/dsh-skin/assets/" + source.file.replace(/^\/+/, "");
  if (source.type === "remote") return source.url ?? null;
  return null;
}
function sourceThumbOf(source) {
  if (!source) return null;
  if (source.type === "asset") return assetThumbUrl(source.thumb || source.file);
  if (source.type === "remote") return source.thumb || source.url;
  return null;
}
function isSameSource(a, b) {
  if (!a || !b) return false;
  return a.type === b.type && a.id === b.id;
}
function useLocalUrls(localItems) {
  const [urls, setUrls] = (0, import_react2.useState)({});
  (0, import_react2.useEffect)(() => {
    let alive = true;
    const created = [];
    Promise.all(localItems.map(async (item) => {
      try {
        const record = await getLocal(item.id);
        if (!record?.blob) return null;
        const full = URL.createObjectURL(record.blob);
        created.push(full);
        let thumb = full;
        if (record.thumbBlob) {
          thumb = URL.createObjectURL(record.thumbBlob);
          created.push(thumb);
        }
        return [item.id, { full, thumb }];
      } catch {
        return null;
      }
    })).then((pairs) => {
      if (!alive) return;
      const table = {};
      for (const pair of pairs) if (pair) table[pair[0]] = pair[1];
      setUrls(table);
    });
    return () => {
      alive = false;
      for (const url of created) URL.revokeObjectURL(url);
    };
  }, [localItems]);
  return urls;
}
function MiniPreview({ settings, source, localUrls }) {
  const surface = settings.surface;
  const direct = source?.type === "local" ? localUrls[source.id]?.thumb ?? null : source?.type === "asset" ? assetThumbUrl(source.thumb || source.file) : sourceUrlOf(source);
  const isVideo = source?.assetKind === "video";
  const style = (0, import_react2.useMemo)(() => ({
    "--p-glass": String(Math.min(1, surface.glass + 0.15))
  }), [surface.glass]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-preview", style, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-preview-media", children: source?.type === "gradient" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-gradient", style: { backgroundImage: source.gradient } }) : isVideo && direct ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("video", { src: direct, muted: true, loop: true, autoPlay: true, playsInline: true }) : direct ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: direct, alt: "" }) : null }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-preview-ui", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-preview-side", style: { opacity: Math.min(1, surface.glass + 0.2) }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-preview-line", style: { width: "62%" } }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-preview-line", "data-short": "true" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-preview-line" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-preview-line", "data-short": "true" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-preview-main", style: { opacity: Math.min(1, surface.glass) }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-preview-line", style: { width: "42%" } }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-preview-line" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-preview-line", "data-short": "true" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-preview-caption", children: source?.name ?? "还没有选择壁纸" })
  ] });
}
function Tile({ label, badge, thumb, fallback, gradient, active, onClick, title }) {
  const [src, setSrc] = (0, import_react2.useState)(thumb);
  const [broken, setBroken] = (0, import_react2.useState)(false);
  (0, import_react2.useEffect)(() => {
    setSrc(thumb);
    setBroken(false);
  }, [thumb]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "button",
    {
      type: "button",
      className: "dsks-tile",
      "data-active": active ? "true" : "false",
      "data-broken": broken ? "true" : "false",
      disabled: broken,
      title: broken ? "缩略图加载失败（素材源可能已失效）" : title || label,
      onClick,
      children: [
        gradient ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-tile-gradient", style: { backgroundImage: gradient } }) : src && !broken ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src, alt: "", loading: "lazy", onError: () => {
          if (fallback && src !== fallback) setSrc(fallback);
          else setBroken(true);
        } }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-tile-gradient" }),
        broken ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dsks-tile-badge", children: "失效" }) : badge ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dsks-tile-badge", children: badge }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dsks-tile-name", children: label })
      ]
    }
  );
}
function SkinPanel({
  settings,
  patch,
  apply: apply2,
  close,
  library,
  libraryError,
  reloadLibrary,
  localItems,
  refreshLocal,
  removeLocalItem,
  importFiles,
  clearLocalMaterials,
  localStorageBytes,
  schemes,
  saveScheme,
  applyScheme,
  deleteScheme,
  resetAll,
  exportSettings,
  importSettings,
  effectiveAlpha,
  position
}) {
  const tab = settings.ui.tab;
  const filter = settings.ui.filter;
  const [query, setQuery] = (0, import_react2.useState)("");
  const [searchSource, setSearchSource] = (0, import_react2.useState)("auto");
  const [searchOpen, setSearchOpen] = (0, import_react2.useState)(false);
  const [searching, setSearching] = (0, import_react2.useState)(false);
  const [searchRows, setSearchRows] = (0, import_react2.useState)([]);
  const [searchPage, setSearchPage] = (0, import_react2.useState)(1);
  const [searchProvider, setSearchProvider] = (0, import_react2.useState)("");
  const [searchError, setSearchError] = (0, import_react2.useState)("");
  const [urlDraft, setUrlDraft] = (0, import_react2.useState)("");
  const [showUrl, setShowUrl] = (0, import_react2.useState)(false);
  const [notice, setNotice] = (0, import_react2.useState)("");
  const [schemeName, setSchemeName] = (0, import_react2.useState)("");
  const [importDraft, setImportDraft] = (0, import_react2.useState)("");
  const [previewing, setPreviewing] = (0, import_react2.useState)(false);
  const [dragOver, setDragOver] = (0, import_react2.useState)(false);
  const fileInput = (0, import_react2.useRef)(null);
  const previewTimer = (0, import_react2.useRef)(null);
  const localUrls = useLocalUrls(localItems);
  (0, import_react2.useEffect)(() => () => clearTimeout(previewTimer.current), []);
  const flash = (0, import_react2.useCallback)((text) => {
    setNotice(text);
    const timer = setTimeout(() => setNotice((current) => current === text ? "" : current), 2600);
    return () => clearTimeout(timer);
  }, []);
  const requestReset = (0, import_react2.useCallback)(() => {
    if (!window.confirm("恢复默认设置？会关闭换肤并清掉当前素材选择，本地素材和保存的方案保留。")) return;
    resetAll();
    flash("已恢复默认设置");
  }, [flash, resetAll]);
  (0, import_react2.useEffect)(() => {
    if (!library && !libraryError) void reloadLibrary();
  }, [library, libraryError, reloadLibrary]);
  const materials = (0, import_react2.useMemo)(() => {
    const order = { video: 0, animated: 1, image: 2, gradient: 3 };
    const rows = [...library ?? []].sort((a, b) => (order[a.kind] ?? 9) - (order[b.kind] ?? 9) || String(a.name).localeCompare(String(b.name), "zh"));
    let out = filter === "all" ? rows : rows.filter((row) => row.kind === filter);
    const tone = settings.ui.tone;
    if (tone === "dark" || tone === "light") {
      out = out.filter((row) => (row.tags ?? []).some((tag) => tone === "dark" ? /深色|dark/i.test(tag) : /浅色|light/i.test(tag)));
    }
    return out;
  }, [library, filter, settings.ui.tone]);
  const settingsSource = settings.source;
  const onPickMaterial = (0, import_react2.useCallback)((material) => {
    apply2(materialToSource(material));
    setNotice("");
  }, [apply2]);
  const onPickLocal = (0, import_react2.useCallback)((item) => {
    apply2({
      type: "local",
      id: item.id,
      name: item.name || "本地素材",
      mime: item.mime || "",
      assetKind: item.kind === "video" ? "video" : item.kind
    });
    flash("已应用本地素材");
  }, [apply2, flash]);
  const onFiles = (0, import_react2.useCallback)(async (fileList) => {
    const files = Array.from(fileList ?? []).filter(Boolean);
    if (files.length === 0) return;
    let applied = 0;
    for (const file of files) {
      try {
        const item = await importLocalFile(file);
        await refreshLocal();
        if (applied === 0) {
          apply2({ type: "local", id: item.id, name: item.name || "本地素材", mime: item.mime, assetKind: item.kind });
          applied++;
        }
      } catch (error) {
        flash(String(error?.message || error));
        break;
      }
    }
    if (applied > 0) flash("已导入 " + applied + " 个本地素材");
  }, [apply2, flash, refreshLocal]);
  const runSearch = (0, import_react2.useCallback)(async (page = 1) => {
    const text = query.trim();
    if (text === "" && searchSource !== "bing") {
      setSearchError("先输入关键词；想看必应每日壁纸，把来源切到「必应壁纸」再搜索。");
      return;
    }
    setSearching(true);
    setSearchError("");
    try {
      const result = await searchMaterials(text, page, searchSource);
      setSearchProvider(result.provider || "");
      setSearchRows((rows) => page === 1 ? result.results : [...rows, ...result.results]);
      setSearchPage(page);
    } catch (error) {
      setSearchError(String(error?.message || error));
    } finally {
      setSearching(false);
    }
  }, [query, searchSource]);
  const onUseUrl = (0, import_react2.useCallback)(() => {
    const raw = urlDraft.trim();
    if (!/^https?:\/\//i.test(raw)) {
      flash("请填写 http(s):// 开头的图片或视频直链");
      return;
    }
    const isVideo = /\.(mp4|webm|mov)(\?|#|$)/i.test(raw);
    apply2({
      type: "remote",
      id: "url:" + raw,
      name: isVideo ? "链接视频" : "链接图片",
      url: isVideo ? raw : proxiedImage(raw),
      assetKind: isVideo ? "video" : "image"
    });
    flash("已应用链接素材");
  }, [apply2, flash, urlDraft]);
  const startPreview = (0, import_react2.useCallback)(() => {
    setPreviewing(true);
    clearTimeout(previewTimer.current);
    previewTimer.current = setTimeout(() => setPreviewing(false), 12e3);
  }, []);
  const stopPreview = (0, import_react2.useCallback)(() => {
    clearTimeout(previewTimer.current);
    setPreviewing(false);
  }, []);
  (0, import_react2.useEffect)(() => {
    if (!previewing) return;
    const onKey = (event) => {
      if (event.key === "Escape") stopPreview();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [previewing, stopPreview]);
  const media = settings.media;
  const surface = settings.surface;
  const disabledMedia = !settings.source;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "div",
      {
        className: "dsks-panel",
        "data-hidden": previewing ? "true" : "false",
        style: { left: position.left, top: position.top, maxHeight: position.maxHeight },
        onPointerDown: (event) => event.stopPropagation(),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-head", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-title", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "palette", size: 16 }),
              "换肤",
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("small", { children: settingsSource?.name ?? "未选择素材" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-head-actions", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconButton, { icon: "reset", label: "恢复默认设置", onClick: requestReset }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "button",
                {
                  type: "button",
                  role: "switch",
                  "aria-checked": settings.enabled,
                  className: "dsks-switch",
                  "data-checked": settings.enabled ? "true" : "false",
                  title: settings.enabled ? "停用换肤" : "启用换肤",
                  onClick: () => patch("enabled", !settings.enabled)
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconButton, { icon: "close", label: "关闭", onClick: close })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-tabs", children: TABS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "button",
            {
              type: "button",
              className: "dsks-tab",
              "data-active": tab === item.id ? "true" : "false",
              onClick: () => patch("ui.tab", item.id),
              children: item.label
            },
            item.id
          )) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "div",
            {
              className: "dsks-body",
              onDragOver: (event) => {
                event.preventDefault();
                setDragOver(true);
              },
              onDragLeave: () => setDragOver(false),
              onDrop: (event) => {
                event.preventDefault();
                setDragOver(false);
                const file = pickMediaFile(event.dataTransfer?.files);
                if (file) void onFiles([file]);
              },
              children: [
                notice ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-banner", children: notice }) : null,
                dragOver ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-banner", children: "松手导入本地素材" }) : null,
                tab === "library" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(MiniPreview, { settings, source: settingsSource, localUrls }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-actions", style: { marginBottom: 10 }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "dsks-btn", onClick: () => fileInput.current?.click(), children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "upload", size: 14 }),
                      "导入本地"
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "dsks-btn", onClick: () => setSearchOpen(true), children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "search", size: 14 }),
                      "在线搜索"
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "dsks-btn", onClick: () => {
                      setSearchOpen(false);
                      setUrlDraft(settingsSource?.type === "remote" ? settingsSource.url ?? "" : "");
                      setShowUrl((value) => !value);
                    }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "link", size: 14 }),
                      "链接"
                    ] })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                    "input",
                    {
                      ref: fileInput,
                      type: "file",
                      accept: "image/*,video/*",
                      multiple: true,
                      hidden: true,
                      onChange: (event) => {
                        void onFiles(event.target.files);
                        event.target.value = "";
                      }
                    }
                  ),
                  showUrl ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-searchrow", style: { marginBottom: 10 }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      "input",
                      {
                        className: "dsks-input",
                        value: urlDraft,
                        placeholder: "粘贴图片 / 视频直链（https://…）",
                        onChange: (event) => setUrlDraft(event.target.value),
                        onKeyDown: (event) => {
                          if (event.key === "Enter") onUseUrl();
                        }
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "dsks-btn", onClick: onUseUrl, children: "使用" })
                  ] }) : null,
                  searchOpen ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-section", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionTitle, { children: "在线素材" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-chips", style: { marginBottom: 8 }, children: [["auto", "自动"], ["cn", "国内"], ["intl", "国外"], ["bing", "必应壁纸"]].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      "button",
                      {
                        type: "button",
                        className: "dsks-chip",
                        "data-active": searchSource === value ? "true" : "false",
                        onClick: () => {
                          setSearchSource(value);
                          setSearchRows([]);
                          setSearchError("");
                          setSearchProvider("");
                        },
                        children: label
                      },
                      value
                    )) }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-searchrow", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                        "input",
                        {
                          className: "dsks-input",
                          value: query,
                          placeholder: searchSource === "bing" ? "必应每日壁纸无需关键词，直接搜索" : "搜索壁纸：星空 / 山脉 / 极简…",
                          onChange: (event) => setQuery(event.target.value),
                          onKeyDown: (event) => {
                            if (event.key === "Enter") void runSearch(1);
                          }
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                        "button",
                        {
                          type: "button",
                          className: "dsks-btn",
                          "data-primary": "true",
                          disabled: searching,
                          onClick: () => void runSearch(1),
                          children: searching ? "搜索中…" : "搜索"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-hint", children: "自动 = 国内 360 图片 + 国外 Openverse/Wikimedia 并发，谁先返回先用谁；国外素材带 CC 授权，国内图源版权归原作者、仅建议个人使用。" }),
                    searchError ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-error", children: searchError }) : null,
                    searchRows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-grid", style: { marginTop: 8 }, children: searchRows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                        Tile,
                        {
                          label: row.title,
                          thumb: row.thumb,
                          fallback: proxiedImage(row.full),
                          badge: row.license || "在线",
                          onClick: () => {
                            apply2(remoteToSource(row));
                            stopPreview();
                            flash("已应用在线素材");
                          }
                        },
                        row.id
                      )) }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-actions", style: { marginTop: 8 }, children: [
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                          "button",
                          {
                            type: "button",
                            className: "dsks-btn",
                            disabled: searching,
                            onClick: () => void runSearch(searchPage + 1),
                            children: "加载更多"
                          }
                        ),
                        searchProvider ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dsks-hint", style: { margin: 0, alignSelf: "center" }, children: [
                          "来源：",
                          searchProvider
                        ] }) : null
                      ] })
                    ] }) : null,
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-actions", style: { marginTop: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "dsks-btn", onClick: () => setSearchOpen(false), children: "收起搜索" }) })
                  ] }) : null,
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-section", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionTitle, { children: "内置素材" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-chips", style: { marginBottom: 4 }, children: FILTERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      "button",
                      {
                        type: "button",
                        className: "dsks-chip",
                        "data-active": filter === item.id ? "true" : "false",
                        onClick: () => patch("ui.filter", item.id),
                        children: item.label
                      },
                      item.id
                    )) }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-chips", children: [["all", "全部明暗"], ["dark", "深色"], ["light", "浅色"]].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      "button",
                      {
                        type: "button",
                        className: "dsks-chip",
                        "data-active": (settings.ui.tone ?? "all") === value ? "true" : "false",
                        onClick: () => patch("ui.tone", value),
                        children: label
                      },
                      value
                    )) }),
                    library === null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-empty", children: "正在载入素材库…" }) : materials.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-empty", children: [
                      "没有这一类的内置素材。",
                      libraryError ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-error", children: libraryError }) : null
                    ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-grid", children: materials.map((material) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      Tile,
                      {
                        label: material.name,
                        badge: kindLabel(material.kind),
                        thumb: material.kind === "gradient" ? null : assetThumbUrl(material.thumb || material.file),
                        gradient: material.kind === "gradient" ? material.gradient : null,
                        active: isSameSource(settingsSource, materialToSource(material)),
                        onClick: () => onPickMaterial(material)
                      },
                      material.id
                    )) })
                  ] }),
                  localItems.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-section", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionTitle, { children: "本地素材" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-hint", style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
                        localItems.length,
                        " 个 · 约 ",
                        formatBytes(localStorageBytes)
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                        "button",
                        {
                          type: "button",
                          className: "dsks-btn",
                          style: { marginLeft: "auto", height: 26 },
                          onClick: () => {
                            if (!window.confirm("删除全部本地素材？壁纸若正在使用本地素材会一起清空。")) return;
                            clearLocalMaterials?.();
                          },
                          children: "清空本地素材"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-grid", children: localItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { position: "relative" }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                        Tile,
                        {
                          label: item.name,
                          badge: item.kind === "video" ? "视频" : item.kind === "animated" ? "动图" : "本地",
                          thumb: item.kind === "video" ? null : localUrls[item.id]?.thumb ?? localUrls[item.id]?.full,
                          active: isSameSource(settingsSource, { type: "local", id: item.id }),
                          onClick: () => onPickLocal(item)
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                        "button",
                        {
                          type: "button",
                          className: "dsks-iconbtn",
                          title: "删除本地素材",
                          style: { position: "absolute", top: 2, right: 2, background: "rgb(0 0 0 / 0.45)", color: "#fff" },
                          onClick: async (event) => {
                            event.stopPropagation();
                            await removeLocalItem(item.id);
                            flash("已删除 " + item.name);
                          },
                          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "trash", size: 12 })
                        }
                      )
                    ] }, item.id)) })
                  ] }) : null
                ] }) : null,
                tab === "adjust" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-section", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionTitle, { children: "适配" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-row", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dsks-row-label", children: "铺法" }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Segmented, { options: FITS, value: media.fit, onChange: (value) => patch("media.fit", value) })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-row", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dsks-row-label", children: "对齐" }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-chips", style: { margin: 0 }, children: POSITIONS.map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                        "button",
                        {
                          type: "button",
                          className: "dsks-chip",
                          "data-active": media.position === value ? "true" : "false",
                          onClick: () => patch("media.position", value),
                          children: label
                        },
                        value
                      )) })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      Slider,
                      {
                        label: "缩放",
                        value: media.zoom,
                        min: 1,
                        max: 2,
                        step: 0.01,
                        format: (value) => Math.round(value * 100) + "%",
                        onChange: (value) => patch("media.zoom", value)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-section", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionTitle, { children: "画面" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      Slider,
                      {
                        label: "壁纸不透明度",
                        value: media.opacity,
                        min: 0.05,
                        max: 1,
                        step: 0.01,
                        format: formatPercent,
                        onChange: (value) => patch("media.opacity", value)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      Slider,
                      {
                        label: "模糊",
                        value: media.blur,
                        min: 0,
                        max: 40,
                        step: 0.5,
                        format: (value) => value.toFixed(value % 1 === 0 ? 0 : 1) + " px",
                        onChange: (value) => patch("media.blur", value)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      Slider,
                      {
                        label: "亮度",
                        value: media.brightness,
                        min: 0.3,
                        max: 1.6,
                        step: 0.01,
                        format: formatPercent,
                        onChange: (value) => patch("media.brightness", value)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      Slider,
                      {
                        label: "对比度",
                        value: media.contrast,
                        min: 0.5,
                        max: 1.6,
                        step: 0.01,
                        format: formatPercent,
                        onChange: (value) => patch("media.contrast", value)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      Slider,
                      {
                        label: "饱和度",
                        value: media.saturation,
                        min: 0,
                        max: 2,
                        step: 0.01,
                        format: formatPercent,
                        onChange: (value) => patch("media.saturation", value)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      Slider,
                      {
                        label: "色相",
                        value: media.hue,
                        min: -180,
                        max: 180,
                        step: 1,
                        format: (value) => value + "°",
                        onChange: (value) => patch("media.hue", value)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      Slider,
                      {
                        label: "压暗",
                        value: media.dim,
                        min: 0,
                        max: 0.85,
                        step: 0.01,
                        format: formatPercent,
                        onChange: (value) => patch("media.dim", value)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      Slider,
                      {
                        label: "暗角",
                        value: media.vignette,
                        min: 0,
                        max: 1,
                        step: 0.01,
                        format: formatPercent,
                        onChange: (value) => patch("media.vignette", value)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      Slider,
                      {
                        label: "颗粒",
                        value: media.grain,
                        min: 0,
                        max: 0.5,
                        step: 0.01,
                        format: formatPercent,
                        onChange: (value) => patch("media.grain", value)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-section", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionTitle, { children: "动效" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      SwitchRow,
                      {
                        label: "缓慢推拉（Ken Burns）",
                        hint: "静态壁纸缓慢放大平移，省电模式下自动关闭",
                        checked: settings.motion.kenBurns,
                        onChange: (value) => patch("motion.kenBurns", value)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      SwitchRow,
                      {
                        label: "鼠标视差",
                        hint: "壁纸随指针轻微移动",
                        checked: settings.motion.parallax,
                        onChange: (value) => patch("motion.parallax", value)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      SwitchRow,
                      {
                        label: "遵循系统减少动效",
                        checked: settings.motion.respectReducedMotion,
                        onChange: (value) => patch("motion.respectReducedMotion", value)
                      }
                    )
                  ] }),
                  settingsSource?.assetKind === "video" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-section", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionTitle, { children: "视频" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      SwitchRow,
                      {
                        label: "静音播放",
                        checked: settings.video.muted,
                        onChange: (value) => patch("video.muted", value)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      SwitchRow,
                      {
                        label: "循环",
                        checked: settings.video.loop,
                        onChange: (value) => patch("video.loop", value)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      SwitchRow,
                      {
                        label: "切到后台暂停",
                        checked: settings.video.pauseHidden,
                        onChange: (value) => patch("video.pauseHidden", value)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      Slider,
                      {
                        label: "播放速度",
                        value: settings.video.rate,
                        min: 0.25,
                        max: 2,
                        step: 0.05,
                        format: (value) => value.toFixed(2) + "×",
                        onChange: (value) => patch("video.rate", value)
                      }
                    )
                  ] }) : null,
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-actions", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "dsks-btn", onClick: () => {
                    patch("media", { ...media, opacity: 1, blur: 0, brightness: 1, contrast: 1, saturation: 1, hue: 0, zoom: 1, dim: 0.18, vignette: 0.22, grain: 0.05 });
                    flash("画面参数已重置");
                  }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "reset", size: 14 }),
                    "重置画面"
                  ] }) })
                ] }) : null,
                tab === "surface" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-section", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionTitle, { children: "界面玻璃" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-hint", style: { marginTop: 0 }, children: [
                      "当前为最初交付的玻璃效果（实度 0.4）；也可以切到「跟随皮肤（自动）」按壁纸明暗自动调实度。当前实际实度：",
                      Math.round((effectiveAlpha ?? surface.glass) * 100),
                      "%。"
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-actions", style: { marginBottom: 10 }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                        "button",
                        {
                          type: "button",
                          className: "dsks-btn",
                          "data-primary": surface.auto ? "true" : "false",
                          onClick: () => {
                            patch("surface.mode", "clear");
                            patch("surface.auto", true);
                            patch("surface.glass", 0.62);
                            patch("surface.glassBlur", 10);
                            patch("surface.sidebar", 1);
                            patch("surface.composer", 0.9);
                          },
                          children: "跟随皮肤（自动）"
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                        "button",
                        {
                          type: "button",
                          className: "dsks-btn",
                          "data-primary": !surface.auto && surface.mode !== "glass" ? "true" : "false",
                          onClick: () => {
                            patch("surface.auto", false);
                            patch("surface.mode", "clear");
                            patch("surface.glass", 0.88);
                            patch("surface.glassBlur", 10);
                            patch("surface.sidebar", 1);
                            patch("surface.composer", 0.9);
                          },
                          children: "清晰（接近原样）"
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                        "button",
                        {
                          type: "button",
                          className: "dsks-btn",
                          "data-primary": !surface.auto && surface.mode === "glass" ? "true" : "false",
                          onClick: () => {
                            patch("surface.auto", false);
                            patch("surface.mode", "glass");
                            patch("surface.glass", 0.55);
                            patch("surface.glassBlur", 12);
                            patch("surface.sidebar", 0.9);
                            patch("surface.composer", 0.9);
                          },
                          children: "玻璃（透出壁纸）"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      SwitchRow,
                      {
                        label: "自动对比度保护",
                        hint: "按壁纸平均明暗自动抬高界面实度，深色/浅色主题下都能看清",
                        checked: surface.auto !== false,
                        onChange: (value) => patch("surface.auto", value)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      Slider,
                      {
                        label: "最低实度（壁纸可见度基准）",
                        value: surface.glass,
                        min: 0.2,
                        max: 1,
                        step: 0.01,
                        format: formatPercent,
                        onChange: (value) => patch("surface.glass", value)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      Slider,
                      {
                        label: "玻璃模糊",
                        value: surface.glassBlur,
                        min: 0,
                        max: 60,
                        step: 1,
                        format: (value) => value + " px",
                        onChange: (value) => patch("surface.glassBlur", value)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      Slider,
                      {
                        label: "侧栏实度",
                        value: surface.sidebar,
                        min: 0,
                        max: 1.2,
                        step: 0.01,
                        format: (value) => Math.round(Math.min(1, surface.glass * value) * 100) + "%",
                        onChange: (value) => patch("surface.sidebar", value)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      Slider,
                      {
                        label: "输入框实度",
                        value: surface.composer,
                        min: 0,
                        max: 1,
                        step: 0.01,
                        format: formatPercent,
                        onChange: (value) => patch("surface.composer", value)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      Slider,
                      {
                        label: "正文可读性保护",
                        value: surface.textShadow,
                        min: 0,
                        max: 1,
                        step: 0.01,
                        format: formatPercent,
                        onChange: (value) => patch("surface.textShadow", value)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-section", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionTitle, { children: "性能" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      SwitchRow,
                      {
                        label: "省电模式",
                        hint: "关闭玻璃模糊与颗粒，降低 GPU 占用",
                        checked: settings.behavior.performance,
                        onChange: (value) => patch("behavior.performance", value)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-section", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionTitle, { children: "底色" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-row", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dsks-row-label", children: "压暗色调" }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-chips", style: { margin: 0 }, children: ["#05070c", "#10131a", "#1a1020", "#0a1410"].map((color) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                        "button",
                        {
                          type: "button",
                          className: "dsks-chip",
                          title: color,
                          "data-active": media.dimColor === color ? "true" : "false",
                          style: { background: color, width: 22, height: 22, padding: 0, borderColor: media.dimColor === color ? "var(--dsks-accent)" : "var(--dsks-hairline)" },
                          onClick: () => patch("media.dimColor", color)
                        },
                        color
                      )) })
                    ] })
                  ] })
                ] }) : null,
                tab === "schemes" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-section", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionTitle, { children: "方案" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-hint", style: { marginTop: 0 }, children: "把当前壁纸与全部参数保存成方案，一键切换。" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-searchrow", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                        "input",
                        {
                          className: "dsks-input",
                          value: schemeName,
                          placeholder: "方案名称，例如「夜间星空」",
                          onChange: (event) => setSchemeName(event.target.value),
                          onKeyDown: (event) => {
                            if (event.key === "Enter" && schemeName.trim()) {
                              saveScheme(schemeName.trim());
                              setSchemeName("");
                              flash("方案已保存");
                            }
                          }
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                        "button",
                        {
                          type: "button",
                          className: "dsks-btn",
                          "data-primary": "true",
                          onClick: () => {
                            if (schemeName.trim() === "") {
                              flash("先给方案起个名字");
                              return;
                            }
                            saveScheme(schemeName.trim());
                            setSchemeName("");
                            flash("方案已保存");
                          },
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "save", size: 14 }),
                            "保存"
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { marginTop: 10 }, children: schemes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-empty", children: "还没有保存的方案。" }) : schemes.map((scheme) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-scheme", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-scheme-preview", style: {
                        backgroundImage: scheme.settings.source?.type === "gradient" ? scheme.settings.source.gradient : "url(" + (scheme.settings.source?.thumb ? assetThumbUrl(scheme.settings.source.thumb) : sourceThumbOf(scheme.settings.source)) + ")"
                      } }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-scheme-name", children: [
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { color: "var(--dsks-label)" }, children: scheme.name }),
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-hint", style: { margin: 0 }, children: scheme.settings.source?.name ?? "无素材" })
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "dsks-btn", onClick: () => {
                        applyScheme(scheme);
                        flash("已应用方案「" + scheme.name + "」");
                      }, children: "应用" }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconButton, { icon: "trash", label: "删除方案", onClick: () => deleteScheme(scheme.id) })
                    ] }, scheme.id)) })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-section", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionTitle, { children: "轮换" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-row", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dsks-row-label", children: "自动轮换素材" }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                        Segmented,
                        {
                          options: [{ value: "off", label: "关闭" }, { value: "session", label: "每次启动" }, { value: "daily", label: "每天" }, { value: "hourly", label: "每小时" }],
                          value: settings.behavior.rotate,
                          onChange: (value) => patch("behavior.rotate", value)
                        }
                      )
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-hint", children: "轮换只在内置素材库内挑选，保持当前参数不变。" })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-section", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionTitle, { children: "重置" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-hint", style: { marginTop: 0 }, children: "关闭换肤、清空当前素材选择，把画面与界面参数恢复默认；不会删除已导入的本地素材和已保存方案。" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "dsks-btn", "data-danger": "true", onClick: () => {
                      if (!window.confirm("恢复默认设置？会关闭换肤并清掉当前素材选择，本地素材和保存的方案保留。")) return;
                      resetAll();
                      flash("已恢复默认设置");
                    }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "reset", size: 14 }),
                      "恢复默认设置"
                    ] })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-section", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionTitle, { children: "导入 / 导出" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-actions", style: { marginBottom: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "dsks-btn", onClick: async () => {
                      const text = exportSettings();
                      try {
                        await navigator.clipboard.writeText(text);
                        flash("设置 JSON 已复制到剪贴板");
                      } catch {
                        setImportDraft(text);
                        flash("剪贴板不可用，已填入下方输入框");
                      }
                    }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "download", size: 14 }),
                      "导出到剪贴板"
                    ] }) }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      "textarea",
                      {
                        className: "dsks-input",
                        style: { height: 64, padding: 8, resize: "vertical" },
                        value: importDraft,
                        placeholder: "在这里粘贴导出的设置 JSON，然后点导入",
                        onChange: (event) => setImportDraft(event.target.value)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsks-actions", style: { marginTop: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "dsks-btn", onClick: () => {
                      if (importSettings(importDraft)) {
                        flash("设置已导入");
                        setImportDraft("");
                      } else flash("JSON 不合法或不是换肤设置");
                    }, children: "导入" }) })
                  ] })
                ] }) : null
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsks-foot", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dsks-foot-status", children: settingsSource ? settingsSource.name + (settingsSource.license ? " · " + settingsSource.license : "") : disabledMedia ? "选择一张素材开始" : "" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "dsks-btn", onClick: startPreview, disabled: !settingsSource, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "eye", size: 14 }),
              "预览"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "dsks-btn", "data-primary": "true", onClick: close, children: "完成" })
          ] })
        ]
      }
    ),
    previewing ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "dsks-preview-chip", onClick: stopPreview, children: "预览中 · 点击任意处或按 Esc 退出" }) : null
  ] });
}

// client/index.jsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var PANEL_WIDTH = 392;
var PANEL_GAP = 10;
var ROTATE_KEY = "dsh.skin.lastRotate";
function useHostNode(selector) {
  const [node, setNode] = (0, import_react3.useState)(null);
  (0, import_react3.useEffect)(() => {
    let observer = null;
    const find = () => {
      const element = document.querySelector(selector);
      if (!element) return false;
      setNode(element);
      return true;
    };
    if (!find()) {
      observer = new MutationObserver(() => {
        if (find()) observer?.disconnect();
      });
      observer.observe(document.documentElement, { childList: true, subtree: true });
    }
    return () => observer?.disconnect();
  }, [selector]);
  return node;
}
function screenBucket() {
  try {
    const pixels = window.innerWidth * (window.devicePixelRatio || 1);
    if (pixels <= 1150) return "960";
    if (pixels <= 1900) return "1600";
    return "2400";
  } catch {
    return "1600";
  }
}
function useScreenBucket() {
  const [bucket, setBucket] = (0, import_react3.useState)(screenBucket);
  (0, import_react3.useEffect)(() => {
    let timer = 0;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setBucket(screenBucket()), 200);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return bucket;
}
function useSourceUrl(source, bucket) {
  const [url, setUrl] = (0, import_react3.useState)(null);
  (0, import_react3.useEffect)(() => {
    let alive = true;
    let created = null;
    setUrl(null);
    if (!source) return () => {
    };
    if (source.type === "asset") {
      const variants = source.variants ?? {};
      const file = variants[bucket] ?? source.file;
      setUrl("/dsh-skin/assets/" + String(file).replace(/^\/+/, ""));
      return () => {
      };
    }
    if (source.type === "remote") {
      setUrl(source.url ?? null);
      return () => {
      };
    }
    if (source.type === "local") {
      getLocal(source.id).then((record) => {
        if (!alive || !record?.blob) return;
        created = URL.createObjectURL(record.blob);
        setUrl(created);
      }).catch(() => {
      });
    }
    return () => {
      alive = false;
      if (created) URL.revokeObjectURL(created);
    };
  }, [source, bucket]);
  return url;
}
function useReducedMotion() {
  const [reduced, setReduced] = (0, import_react3.useState)(() => {
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      return false;
    }
  });
  (0, import_react3.useEffect)(() => {
    let media;
    try {
      media = window.matchMedia("(prefers-reduced-motion: reduce)");
      const onChange = () => setReduced(media.matches);
      media.addEventListener?.("change", onChange);
      return () => media.removeEventListener?.("change", onChange);
    } catch {
      return () => {
      };
    }
  }, []);
  return reduced;
}
function SkinLayer({ settings, source, reduceMotion, onLuma }) {
  const bucket = useScreenBucket();
  const url = useSourceUrl(source, bucket);
  const layerRef = (0, import_react3.useRef)(null);
  const videoRef = (0, import_react3.useRef)(null);
  const media = settings.media;
  const motion = settings.motion;
  const kenBurns = motion.kenBurns && !(motion.respectReducedMotion && reduceMotion);
  const parallax = motion.parallax && !(motion.respectReducedMotion && reduceMotion) && !settings.behavior.performance;
  const isVideo = source?.assetKind === "video";
  const isGradient = source?.type === "gradient";
  (0, import_react3.useEffect)(() => {
    onLuma?.(null);
  }, [onLuma, source?.type, source?.id, source?.file, source?.url]);
  (0, import_react3.useEffect)(() => {
    if (source?.type !== "gradient") return;
    onLuma?.(gradientLuma(source.gradient));
  }, [onLuma, source]);
  (0, import_react3.useEffect)(() => {
    if (!parallax || !layerRef.current) return;
    let frame = 0;
    const onMove = (event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const element = layerRef.current;
        if (!element) return;
        const px = (event.clientX / window.innerWidth - 0.5) * -16;
        const py = (event.clientY / window.innerHeight - 0.5) * -12;
        element.style.setProperty("--dsks-px", px.toFixed(2) + "px");
        element.style.setProperty("--dsks-py", py.toFixed(2) + "px");
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [parallax]);
  (0, import_react3.useEffect)(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = settings.video.muted;
    video.loop = settings.video.loop;
    video.playbackRate = settings.video.rate;
    const play = () => {
      video.play().catch(() => {
      });
    };
    play();
    if (!settings.video.pauseHidden) return;
    const onVisibility = () => {
      if (document.hidden) video.pause();
      else play();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [isVideo, settings.video.muted, settings.video.loop, settings.video.rate, settings.video.pauseHidden, url]);
  const style = {
    "--dsks-scale": String(effectiveScale(settings)),
    "--dsks-fit": media.fit === "tile" ? "cover" : media.fit,
    "--dsks-position": media.position
  };
  const filter = mediaFilter(settings);
  const tileMode = media.fit === "tile" && url;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ref: layerRef, className: "dsks-layer", style, "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dsks-parallax", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dsks-media", style: { opacity: media.opacity }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "div",
      {
        className: "dsks-media-inner",
        "data-kenburns": kenBurns ? "on" : "off",
        style: tileMode ? {
          backgroundImage: 'url("' + url + '")',
          backgroundRepeat: "repeat",
          backgroundSize: "auto 42%",
          backgroundPosition: "center",
          filter
        } : void 0,
        children: isGradient ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: "dsks-gradient",
            "data-animated": source?.id?.startsWith("grad-") ? "on" : "off",
            style: { backgroundImage: source.gradient, filter, objectFit: "cover" }
          }
        ) : isVideo && url ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "video",
          {
            ref: videoRef,
            src: url,
            muted: settings.video.muted,
            loop: settings.video.loop,
            autoPlay: true,
            playsInline: true,
            preload: "auto",
            style: { filter },
            onLoadedData: (event) => onLuma?.(sampleLuma(event.currentTarget))
          }
        ) : url && !tileMode ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "img",
          {
            src: url,
            alt: "",
            draggable: false,
            style: { filter },
            onLoad: (event) => onLuma?.(sampleLuma(event.currentTarget))
          }
        ) : null
      }
    ) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dsks-veil", style: { background: media.dimColor, opacity: media.dim } }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dsks-vignette", style: { opacity: media.vignette } }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dsks-grain", style: { opacity: media.grain } })
  ] });
}
function Trigger({ onToggle, enabled, host }) {
  const [narrow, setNarrow] = (0, import_react3.useState)(false);
  (0, import_react3.useEffect)(() => {
    if (!host) return;
    const measure = () => setNarrow((host.getBoundingClientRect().width || 0) < 120);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    return () => observer.disconnect();
  }, [host]);
  if (!host || narrow) return null;
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "button",
      {
        type: "button",
        className: "dsks-trigger",
        "data-on": enabled ? "true" : "false",
        title: "换肤 · 壁纸与界面透明（⌘⇧K）",
        "aria-label": "换肤",
        onClick: (event) => {
          event.preventDefault();
          event.stopPropagation();
          onToggle();
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon, { name: "palette", size: 17 }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dsks-trigger-dot" })
        ]
      }
    ),
    host
  );
}
var clamp01 = (value) => Math.min(1, Math.max(0, Number(value) || 0));
function computeSurfaceAlpha(surface, dark, luma) {
  const base = clamp01(surface.glass ?? 0.55);
  if (surface.auto === false) return base;
  if (typeof luma !== "number" || !Number.isFinite(luma)) {
    return Math.min(0.9, Math.max(base, dark ? 0.78 : 0.62));
  }
  const wall = clamp01(luma);
  const required = dark ? wall > 0.16 ? (wall - 0.16) / Math.max(0.06, wall - 0.02) : 0 : wall < 0.35 ? (0.35 - wall) / Math.max(0.06, 0.97 - wall) : 0;
  return Math.min(0.94, Math.max(base, required));
}
function sampleLuma(element) {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.drawImage(element, 0, 0, 32, 32);
    const data = context.getImageData(0, 0, 32, 32).data;
    let sum = 0;
    for (let index = 0; index < data.length; index += 4) {
      sum += (0.2126 * data[index] + 0.7152 * data[index + 1] + 0.0722 * data[index + 2]) / 255;
    }
    return sum / (32 * 32);
  } catch {
    return null;
  }
}
function gradientLuma(css) {
  try {
    const colors = [...String(css ?? "").matchAll(/#([0-9a-f]{6})/gi)];
    if (colors.length === 0) return null;
    let sum = 0;
    for (const match of colors) {
      const hex = match[1];
      const r = Number.parseInt(hex.slice(0, 2), 16) / 255;
      const g = Number.parseInt(hex.slice(2, 4), 16) / 255;
      const b = Number.parseInt(hex.slice(4, 6), 16) / 255;
      sum += 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }
    return sum / colors.length;
  } catch {
    return null;
  }
}
function useDarkTheme() {
  const [dark, setDark] = (0, import_react3.useState)(() => {
    try {
      return document.body.hasAttribute("data-ds-dark-theme");
    } catch {
      return false;
    }
  });
  (0, import_react3.useEffect)(() => {
    const update = () => setDark(document.body.hasAttribute("data-ds-dark-theme"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-ds-dark-theme"] });
    return () => observer.disconnect();
  }, []);
  return dark;
}
function themeTokens(settings, alpha) {
  const side = Math.min(1, alpha * Math.max(0.5, settings.surface.sidebar));
  const dual = (light, dark) => ({ light, dark });
  return {
    "--dsw-alias-bg-base": dual(
      "rgb(252 252 253 / " + alpha.toFixed(3) + ")",
      "rgb(19 20 25 / " + alpha.toFixed(3) + ")"
    ),
    "--dsw-specific-sidebar-fill": dual(
      "rgb(249 250 251 / " + side.toFixed(3) + ")",
      "rgb(17 19 24 / " + side.toFixed(3) + ")"
    )
  };
}
function SkinApp({ ctx }) {
  const [settings, setSettings] = (0, import_react3.useState)(() => loadSettings());
  const [schemes, setSchemes] = (0, import_react3.useState)(() => loadSchemes());
  const [open, setOpen] = (0, import_react3.useState)(false);
  const [anchor, setAnchor] = (0, import_react3.useState)(null);
  const [library, setLibrary] = (0, import_react3.useState)(null);
  const [libraryError, setLibraryError] = (0, import_react3.useState)("");
  const [localItems, setLocalItems] = (0, import_react3.useState)([]);
  const triggerHost = useHostNode('[class*="logoRow"]');
  const reduceMotion = useReducedMotion();
  const darkTheme = useDarkTheme();
  const [mediaLuma, setMediaLuma] = (0, import_react3.useState)(null);
  const alpha = (0, import_react3.useMemo)(() => computeSurfaceAlpha(settings.surface, darkTheme, mediaLuma), [settings.surface, darkTheme, mediaLuma]);
  const settingsRef = (0, import_react3.useRef)(settings);
  settingsRef.current = settings;
  const tokenDispose = (0, import_react3.useRef)(null);
  const tokenTimer = (0, import_react3.useRef)(null);
  (0, import_react3.useEffect)(() => {
    const theme = ctx?.theme;
    if (!theme?.overrideTokens) return;
    clearTimeout(tokenTimer.current);
    if (!settings.enabled) {
      tokenDispose.current?.();
      tokenDispose.current = null;
      return;
    }
    const tokens = themeTokens(settings, alpha);
    tokenTimer.current = setTimeout(() => {
      tokenDispose.current?.();
      tokenDispose.current = theme.overrideTokens("@local/dsh-skin", tokens);
    }, 60);
    return () => clearTimeout(tokenTimer.current);
  }, [ctx, settings.enabled, alpha, settings.surface.sidebar]);
  (0, import_react3.useEffect)(() => () => {
    clearTimeout(tokenTimer.current);
    tokenDispose.current?.();
  }, []);
  (0, import_react3.useEffect)(() => {
    const timer = setTimeout(() => saveSettings(settings), 120);
    return () => clearTimeout(timer);
  }, [settings]);
  (0, import_react3.useEffect)(() => {
    if (!settings.enabled) {
      document.documentElement.removeAttribute("data-dsh-skin-on");
      document.documentElement.removeAttribute("data-dsh-skin-perf");
      for (const name2 of ["--dsks-alpha", "--dsks-glass-blur", "--dsks-sidebar-alpha", "--dsks-center-alpha", "--dsks-composer-alpha", "--dsks-chrome-alpha", "--dsks-scale", "--dsks-fit", "--dsks-position", "--dsks-px", "--dsks-py"]) {
        document.documentElement.style.removeProperty(name2);
      }
      return;
    }
    return applyVars(settings, settings.source, alpha);
  }, [settings, alpha]);
  const patch = (0, import_react3.useCallback)((path, value) => {
    setSettings((current) => {
      const next = JSON.parse(JSON.stringify(current));
      const keys = path.split(".");
      let cursor = next;
      for (let i = 0; i < keys.length - 1; i++) {
        if (cursor[keys[i]] === null || typeof cursor[keys[i]] !== "object") cursor[keys[i]] = {};
        cursor = cursor[keys[i]];
      }
      cursor[keys[keys.length - 1]] = value;
      return next;
    });
  }, []);
  const apply2 = (0, import_react3.useCallback)((source) => {
    const normalized = normalizeSource(source);
    if (!normalized) return;
    setSettings((current) => ({ ...current, enabled: true, source: normalized }));
  }, []);
  const reloadLibrary = (0, import_react3.useCallback)(async () => {
    setLibraryError("");
    try {
      const rows = await fetchMaterialLibrary();
      setLibrary(rows);
    } catch (error) {
      setLibrary([]);
      setLibraryError(String(error?.message || error));
    }
  }, []);
  const refreshLocal = (0, import_react3.useCallback)(async () => {
    try {
      setLocalItems(await listLocal());
    } catch {
      setLocalItems([]);
    }
  }, []);
  (0, import_react3.useEffect)(() => {
    void refreshLocal();
  }, [refreshLocal]);
  const storageBytes = (0, import_react3.useMemo)(() => localItems.reduce((sum, item) => sum + (Number(item.size) || 0), 0), [localItems]);
  const clearLocalMaterials = (0, import_react3.useCallback)(async () => {
    await clearLocal();
    await refreshLocal();
    setSettings((current) => current.source?.type === "local" ? { ...current, source: null } : current);
  }, [refreshLocal]);
  const removeLocalItem = (0, import_react3.useCallback)(async (id) => {
    await removeLocal(id);
    await refreshLocal();
    setSettings((current) => current.source?.type === "local" && current.source.id === id ? { ...current, source: null } : current);
  }, [refreshLocal]);
  const saveScheme = (0, import_react3.useCallback)((name2) => {
    setSchemes((current) => {
      const next = [{ id: newSchemeId(), name: name2, savedAt: Date.now(), settings: JSON.parse(JSON.stringify(settingsRef.current)) }, ...current].slice(0, 30);
      saveSchemes(next);
      return next;
    });
  }, []);
  const applyScheme = (0, import_react3.useCallback)((scheme) => {
    const next = normalizeSettings(scheme.settings);
    setSettings({ ...next, enabled: true });
  }, []);
  const deleteScheme = (0, import_react3.useCallback)((id) => {
    setSchemes((current) => {
      const next = current.filter((item) => item.id !== id);
      saveSchemes(next);
      return next;
    });
  }, []);
  const resetAll = (0, import_react3.useCallback)(() => {
    setSettings((current) => {
      const next = defaultSettings();
      next.ui = { ...next.ui, tab: current.ui.tab, filter: current.ui.filter, tone: current.ui.tone };
      return next;
    });
  }, []);
  const exportSettings = (0, import_react3.useCallback)(() => JSON.stringify(settingsRef.current, null, 2), []);
  const importSettings = (0, import_react3.useCallback)((text) => {
    try {
      const parsed = JSON.parse(text);
      if (!parsed || typeof parsed !== "object" || !parsed.media) return false;
      setSettings(normalizeSettings(parsed));
      return true;
    } catch {
      return false;
    }
  }, []);
  (0, import_react3.useEffect)(() => {
    if (!settings.enabled || !settings.source || settings.behavior.rotate === "off") return;
    if (!library || library.length === 0) return;
    const interval = settings.behavior.rotate === "hourly" ? 36e5 : settings.behavior.rotate === "daily" ? 864e5 : 0;
    let last = 0;
    try {
      last = Number(localStorage.getItem(ROTATE_KEY) || 0);
    } catch {
    }
    if (settings.behavior.rotate === "session") {
      let seen = "";
      try {
        seen = sessionStorage.getItem(ROTATE_KEY + ":session") || "";
      } catch {
      }
      if (seen === String(settings.source.id)) return;
      const alternatives2 = library.filter((row) => row.kind !== "gradient");
      if (alternatives2.length === 0) return;
      const pick3 = alternatives2[Math.floor(Math.random() * alternatives2.length)];
      try {
        sessionStorage.setItem(ROTATE_KEY + ":session", String(pick3.id));
      } catch {
      }
      apply2(materialToSource(pick3));
      return;
    }
    if (Date.now() - last < interval) return;
    const alternatives = library.filter((row) => row.kind !== "gradient" && row.id !== settings.source?.id);
    if (alternatives.length === 0) return;
    const pick2 = alternatives[Math.floor(Math.random() * alternatives.length)];
    try {
      localStorage.setItem(ROTATE_KEY, String(Date.now()));
    } catch {
    }
    apply2(materialToSource(pick2));
  }, [settings.enabled, settings.source, settings.behavior.rotate, library, apply2]);
  (0, import_react3.useEffect)(() => {
    if (!open) return;
    const update = () => {
      const trigger2 = document.querySelector(".dsks-trigger");
      if (!trigger2) return;
      const rect = trigger2.getBoundingClientRect();
      let left = rect.right + PANEL_GAP;
      if (left + PANEL_WIDTH > window.innerWidth - 12) left = Math.max(12, rect.left - PANEL_WIDTH - PANEL_GAP);
      let top = rect.bottom + 8;
      let maxHeight = window.innerHeight - top - 16;
      if (maxHeight < 360) {
        top = 64;
        maxHeight = window.innerHeight - 80;
      }
      setAnchor({ left, top, maxHeight });
    };
    update();
    const observer = new ResizeObserver(update);
    const trigger = document.querySelector(".dsks-trigger");
    if (trigger) observer.observe(trigger);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [open]);
  (0, import_react3.useEffect)(() => {
    if (!open) return;
    const onPointerDown = (event) => {
      if (event.target?.closest?.(".dsks-panel, .dsks-trigger, .dsks-preview-chip")) return;
      setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  (0, import_react3.useEffect)(() => {
    const onKey = (event) => {
      const modifier = event.metaKey || event.ctrlKey;
      if (modifier && event.shiftKey && String(event.key).toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  const enabledLayer = settings.enabled && settings.source && settings.source.type !== void 0;
  const position = anchor ?? { left: 300, top: 72, maxHeight: window.innerHeight - 96 };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("style", { children: APP_CSS }),
    enabledLayer ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(SkinLayer, { settings, source: settings.source, reduceMotion, onLuma: setMediaLuma }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Trigger, { host: triggerHost, enabled: settings.enabled, onToggle: () => setOpen((value) => !value) }),
    open ? (0, import_react_dom.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        SkinPanel,
        {
          settings,
          patch,
          apply: apply2,
          close: () => setOpen(false),
          library,
          libraryError,
          reloadLibrary,
          localItems,
          refreshLocal,
          removeLocalItem,
          clearLocalMaterials,
          localStorageBytes: storageBytes,
          schemes,
          saveScheme,
          applyScheme,
          deleteScheme,
          resetAll,
          exportSettings,
          importSettings,
          effectiveAlpha: alpha,
          position
        }
      ),
      document.body
    ) : null
  ] });
}
var name = "dsh-skin";
var inject = ["theme"];
function apply(ctx) {
  ctx.effect(() => {
    const container = document.createElement("div");
    container.setAttribute("data-dsh-skin-root", "");
    container.style.cssText = "position:static;display:block;width:0;height:0;overflow:visible";
    const mountPoint = document.getElementById("root") ?? document.body;
    mountPoint.appendChild(container);
    const root = (0, import_client.createRoot)(container);
    root.render(/* @__PURE__ */ (0, import_jsx_runtime3.jsx)(SkinApp, { ctx }));
    return () => {
      try {
        root.unmount();
      } catch {
      }
      container.remove();
      document.documentElement.removeAttribute("data-dsh-skin-on");
      document.documentElement.removeAttribute("data-dsh-skin-perf");
    };
  }, "dsh-skin: mount");
}
return Object.defineProperty({ ...module.exports }, Symbol.toStringTag, { value: 'Module' })
  },
})
