# DSH 换肤插件 · 基线 DOM（真实运行页面）

采集条件（2026-10-21）：

- DSH 0.2.1-rc.2（桌面端 app.asar 内的 dsh CLI），headless Chrome 1440x900、DPR 1、light 主题（`prefers-color-scheme: light`）。
- profile：`skinbase` = 仅 `@deepseek-ai/dsh-base` + `@deepseek-ai/dsh-web-app`，**不加载 @local/dsh-skin**，因此是干净基线。
- DSH_HOME：`dsh-skin/.verify/home`；URL 带 token（无 token 直接访问返回 401）。
- 原始数据：`.verify/baseline-dom.json`、`.verify/collapsed-dom.json`；截图：`.verify/shots/baseline.png`、`.verify/shots/sidebar-collapsed.png`。
- 结论均来自运行页面 `getComputedStyle` / `getBoundingClientRect`；`ref/` 里的构建产物只作类名对照，不作为数据来源。

## 0. 给插件落地的结论

- **背景是三层各自绘制的**：`body` 白、`.frame` 白、`.sidebarCol` #f9fafb；`#root` 和 `.centerCol` 本身透明。只改 `--dsw-*` 变量不会让背景透明——`body` 的白色来自一条内联样式规则 `body { background-color: rgb(255,255,255) }`。
- **主题 token 定义在 body 作用域**：451 个 `--dsw-*`/`--dsh-*` 变量在 body 上可取值，html(`:root`) 上只有 27 个非空。在 html 上覆盖会被 body 的定义遮蔽，覆盖应落在 body 或更高优先级选择器上。
- **logo 行右端当前被“收起侧边栏”按钮占满**（freeRight = 0）。品牌按钮是 `flex: 1 1 0`，内部有 28px 空白；实测插入 28x28 的兄弟按钮后布局不破，但品牌 SVG 字标（固定 156px 宽）会溢出自身 8px，正好贴到新按钮。折叠态 logo 行只有 toggle（35x36），新按钮必须隐藏或换位。
- **class 名是 CSS Modules 哈希**（`_6Qf49G_`、`_3WPZCG_`），随构建变化，不要写死整段类名。稳定钩子：`data-slot`、`data-window-drag`、`aria-label`、`[class*="logoRow"]`。
- **`shell.overlay` 图层已存在**：`frame > ._6Qf49G_overlayLayer`（absolute、inset 0、z-index 20、pointer-events none），其内是 `[data-slot="shell.overlay"]`（display: contents，基线为空）。菜单/弹层打开时才往里挂内容。

## 1. html / body / #root 的 computedStyle

| 元素 | background-color | position | z-index | height | 其他 |
|---|---|---|---|---|---|
| `html` | `rgba(0, 0, 0, 0)` | static | auto | 900px | `style="color-scheme: light"`，`data-ds-theme-source="system"` |
| `body` | `rgb(255, 255, 255)` | static | auto | 900px | color `rgb(15,17,21)`，overflow visible，无 class |
| `#root` | `rgba(0, 0, 0, 0)` | static | auto | 900px | 1440x900，overflow visible |

挂载链（`#root` 下第一层是 display:contents 的 wrapper，本身 0x0）：

```
body > #root > div[data-slot="root"](display: contents) > div._6Qf49G_frame
```

## 2. 应用外层结构

`._6Qf49G_frame`：1440x900，**background #fff**，`position: relative`，`display: grid`，`overflow: hidden`，`z-index: auto`，无 transform/filter。

frame 的直接子节点（按 DOM 顺序）：

| # | class | rect | background | position | z-index | backdrop-filter | pointer-events |
|---|---|---|---|---|---|---|---|
| 1 | `._6Qf49G_sidebarCol` | 0,0 280x900 | `rgb(249, 250, 251)` | static | auto | none | auto |
| 2 | `._6Qf49G_centerCol` | 280,0 1160x900 | `rgba(0, 0, 0, 0)` | static | auto | none | auto |
| 3 | `._6Qf49G_rightbarCol` | 1440,0 0x900 | `rgba(0, 0, 0, 0)` | relative | auto | none | auto |
| 4 | `._6Qf49G_bottomRow` | 0,900 1440x0 | `rgb(255, 255, 255)` | static | auto | none | auto |
| 5 | `._6Qf49G_overlayLayer` | 0,0 1440x900 | `rgba(0, 0, 0, 0)` | absolute | **20** | none | **none** |
| 6 | `._6Qf49G_handle` | 276,0 8x900 | `rgba(0, 0, 0, 0)` | absolute | 11 | none | auto（cursor: col-resize） |

侧栏内容容器：`sidebarCol > div[data-slot="sidebar"](display:contents) > div._3WPZCG_root._3WPZCG_quietBars`（280x900）。

## 3. 侧栏 logo 行（红框位置）真实 DOM

```
._3WPZCG_logoRow[data-window-drag="true"]        x=12 y=6 256x60
├─ button._3WPZCG_brand._3WPZCG_wide             x=16 y=24 216x24   flex: 1 1 0    aria-label="新建会话"
│  └─ span._3WPZCG_brandIdentity                 x=16 y=24 188x24   display:flex gap:8
│     ├─ span._3WPZCG_brandMark                  x=16 y=27.2 24x17.66
│     │  └─ div[data-slot="sidebar.brand.mark"]  display:contents（内含 24x17.66 的 svg）
│     └─ span._3WPZCG_brandName                  x=48 y=24 156x24
│        └─ div[data-slot="sidebar.brand.name"]  display:contents（内含固定 width=156 的 svg 字标）
└─ button._3WPZCG_iconButton._3WPZCG_toggle      x=240 y=22 28x28   flex: 0 0 auto  aria-label="收起侧边栏"
```

logo 行自身 computed：

| 属性 | 值 |
|---|---|
| rect | 12, 6, **256x60**（sidebar 280 宽，左右各 12 外边距） |
| padding | `8px 0px 8px 4px` |
| justify-content | **flex-end** |
| align-items | center |
| gap | 8px |
| background | transparent |
| data-window-drag | true（整行是窗口拖拽区，行内已有可点击按钮，说明按钮不破坏拖拽） |

右端剩余空间与可插入性（实测）：

- 起始：最后一个子节点右边缘 = row 右边缘 = 268 → **freeRight = 0**；但品牌按钮 216 宽而内部内容仅 188 宽，按钮右侧有 28px 空白；字标 svg 实际画到 x=204，按钮到 232。
- 实测插入一个 28x28 按钮到 brand 与 toggle 之间后：brand 216→180、brandIdentity 188→180、brandName 156→148、toggle 位置尺寸不变、新按钮落在 x=204..232，`identityClipped=false`；但字标 svg 是固定 `width=156`，在 148 容器里向左右溢出 8px，正好贴住新按钮左缘（无重叠、无换行）。
- 结论：**在 logo 行右端插入一个约 28px 的按钮可行**；更稳妥的做法是绝对定位到 logo 行右侧、或插在 brand 按钮内部的空白处；不要改动 toggle。
- 折叠态实测：logo 行只保留 toggle，且行宽 35px；此时插入的兄弟按钮会与 toggle 重叠（行 overflow: visible）。插件按钮必须在折叠态隐藏/换位。

稳定选择器候选：`[class*="logoRow"]`、`button[aria-label="收起侧边栏"]` / `"打开侧边栏"`、`[data-slot="sidebar.brand.mark"]`、`[data-slot="sidebar.brand.name"]`、`[data-slot="sidebar.toggle.badge"]`。

## 4. CSS 变量清单（body 上取值，light）

- 变量总数：**451**（`--dsw-*` 为主，另有 `--dsh-*`）；其中 html(`:root`) 上非空的只有 27 个，主题变量实际定义在 body 作用域。
- 全量清单在 `.verify/baseline-dom.json` 的 `result.bodyVars`；下面列关键 token。

| token | 值 | token | 值 |
|---|---|---|---|
| `--dsw-alias-bg-base` | `#fff` | `--dsw-alias-bg-layer-1` | `#fff` |
| `--dsw-alias-bg-layer-2` | `#fff` | `--dsw-alias-bg-layer-3` | `#fff` |
| `--dsw-alias-bg-overlay` | `#e9ecf2` | `--dsw-alias-bg-module-platform` | `#f5f6f7` |
| `--dsw-alias-bg-document-preview` | `#ebeef2` | `--dsw-alias-bg-skeleton` | `#0000000a` |
| `--dsw-alias-bg-mask-1` | `#0000003d` | `--dsw-alias-bg-mask-2` | `#0000001f` |
| `--dsw-alias-bg-mask-3` | `#0000007a` | `--dsw-alias-bg-mask-drop` | `#ffffffb3` |
| `--dsw-alias-label-primary` | `#0f1115` | `--dsw-alias-label-secondary` | `#61666b` |
| `--dsw-alias-label-tertiary` | `#81858c` | `--dsw-alias-label-primary-foreground` | `#fff` |
| `--dsw-alias-border-l1` | `#0000000a` | `--dsw-alias-border-l2` | `#0000001a` |
| `--dsw-alias-brand-primary` | `#0f1115` | `--dsw-alias-interactive-bg-hover` | `#2631480f` |
| `--dsw-alias-interactive-bg-hover-solid` | `#f1f3f5` | `--dsh-boot-bg` | `#fff` |

背景色来源（重要）：页面里有一条内联规则 `body { background-color: rgb(255,255,255); --dsh-boot-bg: #fff }`；暗色分支是 `@media (prefers-color-scheme: dark) { body { background-color: rgb(21,21,23); --dsh-boot-bg: #151517 } }`。所以：

- 只覆写 `--dsw-alias-bg-base` 不会让 body/frame 透明，必须直接覆盖 `body` / `._6Qf49G_frame` 的 `background`。
- html 上有 `data-ds-theme-source="system"`，主题跟随系统；headless 默认 light。

## 5. shell.overlay 图层

- DOM 位置：`body > #root > div[data-slot="root"] > ._6Qf49G_frame > ._6Qf49G_overlayLayer > div[data-slot="shell.overlay"]`。
- `._6Qf49G_overlayLayer`：absolute，inset 0，1440x900，`z-index: 20`，`pointer-events: none`，背景透明，无 backdrop-filter。
- `[data-slot="shell.overlay"]`：`display: contents`，基线时 0 个子节点；菜单/弹层等按需挂载，子元素自己开启 pointer-events。
- 基线页面没有其它常驻浮层；扫描到的其它 overlay 候选只有 `.yhfFVG_overlayAnchor`（absolute，0 高）等局部锚点，不覆盖全屏。

## 6. 侧栏折叠前/后差异

| 项 | 展开 | 折叠 |
|---|---|---|
| `._6Qf49G_sidebarCol` | 0,0 **280x900** | 0,0 **56x900** |
| 侧栏根节点 class | `_3WPZCG_root _3WPZCG_quietBars` | `_3WPZCG_root _3WPZCG_collapsed _3WPZCG_railIn _3WPZCG_quietBars` |
| logoRow | 12,6 **256x60**，justify `flex-end` | 10,18 **35x36**，justify `flex-start` |
| brandIdentity / brand 按钮 | 存在（188x24 / 216x24） | **从 DOM 移除**（querySelector 返回 null） |
| logoRow 内按钮 | 收起按钮 28x28 @240,22 | 只有“打开侧边栏”按钮 36x36 @10,18 |
| `._6Qf49G_centerCol` | 280,0 1160x900 | 56,0 **1384x900** |
| 折叠动画类 | — | `_railIn`（有入场动画，测量需等 ~700ms 稳定） |

折叠后 logo 行只剩 toggle，插件按钮必须跟随折叠态隐藏或换位（见 §3 实测重叠）。

## 7. 首次打开时的弹层（复现注意事项）

新浏览器上下文首次访问会出现两层引导，都会挡住截图：

1. “预览版说明”弹窗 → 点“继续”。
2. “开始使用 / 登录 DeepSeek 账号，或添加 API Key”弹窗 → 点右上角 ×。

关掉后主界面完整可用（侧栏、新会话、composer、工作区都在），无需真实登录即可做 DOM/布局验证；模型选择器显示“请选择模型”。`.verify/evals/baseline-dom.js` 与 `collapsed-dom.js` 已内置这两步关闭逻辑。

## 8. 复现命令

```bash
cd dsh-skin/.verify
node boot.mjs --profile skinbase            # 不带插件的基线实例（63155）
node interact.mjs --eval evals/baseline-dom.js --out shots/baseline.png --wait 10000 --json baseline-dom.json
node interact.mjs --eval evals/collapsed-dom.js --out shots/sidebar-collapsed.png --wait 10000 --json collapsed-dom.json
node boot.mjs --profile skin                # 换回插件实例
node stop.mjs
```

启动/profile 说明：`bin.js --profile skin --no-open --port 63155`，**不要带位置参数 `web`**（会报 `too many arguments. Expected 0 arguments but got 1: web`）。`skinbase` 由 `.verify/templates/skinbase` 自动创建，可在 `--fresh` 重建 home 后恢复。

## 9. 当前插件状态（非基线，16:52 采集）

带 `skin` profile 启动后插件已加载：logo 行右端出现一个 `aria-label="换肤"` 的 28px 按钮（见 `.verify/shots/current-skin.png`），控制台无报错；当时 `body`/`.frame` 仍是白色（插件尚未接管背景）。这只是采集时点状态，后续以插件版本为准。
