#!/usr/bin/env node
/**
 * 把 dsh-skin 装进 / 卸出某个 DSH profile。
 *
 * 只改 profile 的 package.json（依赖 + bundles）与 node_modules 软链，不动其它配置；
 * 装/卸之后需要重启 DSH（或从侧栏「插件」页安装，可即时生效）。
 *
 * 用法：
 *   node scripts/install-profile.mjs [--profile <dir>] [--dry-run]
 *   node scripts/install-profile.mjs --uninstall [--profile <dir>]
 */
import {
  existsSync, lstatSync, mkdirSync, readFileSync, readlinkSync, symlinkSync, unlinkSync, writeFileSync
} from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(HERE, '..')
const PACKAGE_NAME = '@local/dsh-skin'
const BUNDLE_NAME = PACKAGE_NAME

if (!existsSync(join(REPO, 'package.json')) || JSON.parse(readFileSync(join(REPO, 'package.json'), 'utf8')).name !== PACKAGE_NAME) {
  throw new Error('不是 dsh-skin 插件目录：' + REPO)
}

function parseArgs(argv) {
  const options = { profile: undefined, dryRun: false, uninstall: false }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--profile') options.profile = argv[++i]
    else if (arg.startsWith('--profile=')) options.profile = arg.slice('--profile='.length)
    else if (arg === '--dry-run') options.dryRun = true
    else if (arg === '--uninstall') options.uninstall = true
    else if (arg === '--help' || arg === '-h') {
      console.log('usage: node scripts/install-profile.mjs [--profile <profile-dir>] [--dry-run] [--uninstall]')
      process.exit(0)
    } else throw new Error('unknown argument: ' + arg)
  }
  if (options.profile === undefined) {
    const home = process.env.DSH_HOME ? resolve(process.env.DSH_HOME) : resolve(homedir(), '.dsh')
    const profiles = join(home, 'profiles')
    const found = ['desktop', 'web'].find((name) => existsSync(join(profiles, name, 'package.json')))
    if (found === undefined) {
      throw new Error('找不到已初始化的 DSH profile（' + join(profiles, 'desktop') + '）。先启动一次 DSH，或显式传 --profile <profile 目录>。')
    }
    options.profile = join(profiles, found)
  } else {
    options.profile = resolve(options.profile.replace(/^~(?=\/)/, homedir()))
  }
  return options
}

function lstatSafe(path) {
  try { return lstatSync(path) } catch { return undefined }
}

function linkPointsTo(link, target) {
  if (lstatSafe(link) === undefined) return false
  try { return resolve(dirname(link), readlinkSync(link)) === target } catch { return false }
}

function createLink(link, target) {
  mkdirSync(dirname(link), { recursive: true })
  if (lstatSafe(link) !== undefined) unlinkSync(link)
  symlinkSync(target, link, process.platform === 'win32' ? 'junction' : 'dir')
}

function main() {
  const options = parseArgs(process.argv.slice(2))
  const profileDir = options.profile
  const file = join(profileDir, 'package.json')
  if (!existsSync(file)) throw new Error('profile package.json not found: ' + file)
  const value = JSON.parse(readFileSync(file, 'utf8'))
  const dependencies = value.dependencies ?? (value.dependencies = {})
  const dsh = value.dsh ?? (value.dsh = {})
  const profile = dsh.profile ?? (dsh.profile = {})
  const bundles = Array.isArray(profile.bundles) ? profile.bundles : (profile.bundles = [])
  const link = join(profileDir, 'node_modules', '@local', 'dsh-skin')
  const wanted = 'link:' + REPO
  const actions = []

  if (options.uninstall) {
    if (dependencies[PACKAGE_NAME] !== undefined) { delete dependencies[PACKAGE_NAME]; actions.push('remove dependency') }
    const index = bundles.indexOf(BUNDLE_NAME)
    if (index >= 0) { bundles.splice(index, 1); actions.push('remove bundle') }
    if (lstatSafe(link) !== undefined) { unlinkSync(link); actions.push('remove symlink') }
  } else {
    if (dependencies[PACKAGE_NAME] !== wanted) { dependencies[PACKAGE_NAME] = wanted; actions.push('dependency -> ' + wanted) }
    if (!bundles.includes(BUNDLE_NAME)) { bundles.push(BUNDLE_NAME); actions.push('append bundle') }
    if (!linkPointsTo(link, REPO)) actions.push('symlink -> ' + REPO)
  }

  const changed = actions.some((action) => action.includes('dependency') || action.includes('bundle'))
  if (options.dryRun) {
    console.log(JSON.stringify({ profile: profileDir, plugin: REPO, uninstall: options.uninstall, dryRun: true, actions }, null, 2))
    return
  }
  if (!options.uninstall && actions.includes('symlink -> ' + REPO)) createLink(link, REPO)
  if (changed) {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backup = file + '.bak-dsh-skin-' + stamp
    writeFileSync(backup, readFileSync(file))
    writeFileSync(file, JSON.stringify(value, null, 2) + '\n')
    actions.push('wrote ' + file + ' (backup ' + backup + ')')
  }
  console.log(JSON.stringify({ profile: profileDir, plugin: REPO, uninstall: options.uninstall, actions }, null, 2))
  if (!options.uninstall && changed) {
    console.log('\n安装完成。重启 DSH（退出重开）后生效；也可以从侧栏「插件」页添加本目录即时安装。')
  }
}

main()
