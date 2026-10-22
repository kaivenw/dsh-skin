#!/bin/bash
# 双击运行：把 dsh-skin 装进默认 DSH profile，然后请重启 DSH。
set -euo pipefail
cd "$(dirname "$0")"
if command -v node >/dev/null 2>&1; then
  node scripts/install-profile.mjs "$@"
else
  # macOS 没有独立 Node.js 时借用 DSH 自带运行时
  APP="/Applications/DeepSeek Harness.app/Contents/MacOS/DeepSeek Harness"
  if [ ! -x "$APP" ]; then
    echo "找不到 node，也找不到 DeepSeek Harness.app。" >&2
    exit 1
  fi
  ELECTRON_RUN_AS_NODE=1 "$APP" scripts/install-profile.mjs "$@"
fi
echo
read -n 1 -s -r -p "按任意键关闭窗口…"
