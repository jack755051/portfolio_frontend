#!/usr/bin/env node
/**
 * stdin: raw markdown body from Obsidian
 * args: --path <vaultRelPath> --date <ISO> --out-dir <dir>
 *
 * Writes one Nuxt Content markdown file with frontmatter.
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

function arg(name) {
  const i = process.argv.indexOf(name)
  if (i === -1 || i + 1 >= process.argv.length) return null
  return process.argv[i + 1]
}

const vaultPath = arg('--path')
const dateIso = arg('--date')
const outDir = arg('--out-dir')

if (!vaultPath || !dateIso || !outDir) {
  console.error('usage: obsidian-note-transform.mjs --path <p> --date <iso> --out-dir <dir> < body.md')
  process.exit(1)
}

const bodyRaw = await readStdin()

const category = vaultPath.startsWith('Vue/')
  ? 'frontend'
  : vaultPath.startsWith('C#/')
    ? 'backend'
    : 'other'

const fileBase = vaultPath.split('/').pop().replace(/\.md$/i, '')
const title = cleanTitle(fileBase)

const date = dateIso.slice(0, 10)
const slug = slugifyPath(vaultPath)
const description = makeDescription(bodyRaw, title)
const tags = tagsFor(vaultPath, category)
const body = sanitizeBody(bodyRaw)

const frontmatter = [
  '---',
  `title: ${yamlQuote(title)}`,
  `description: ${yamlQuote(description)}`,
  `category: ${category}`,
  `date: ${date}`,
  `tags: [${tags.map(yamlQuote).join(', ')}]`,
  'draft: false',
  `sourcePath: ${yamlQuote(vaultPath)}`,
  '---',
  '',
].join('\n')

mkdirSync(outDir, { recursive: true })
const outFile = join(outDir, `${slug}.md`)
writeFileSync(outFile, `${frontmatter}${body.trim()}\n`, 'utf8')

function readStdin() {
  return new Promise((resolve, reject) => {
    const chunks = []
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', (c) => chunks.push(c))
    process.stdin.on('end', () => resolve(chunks.join('')))
    process.stdin.on('error', reject)
  })
}

function cleanTitle(name) {
  return name
    .replace(/^\d+-/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function slugifyPath(path) {
  const withoutExt = path.replace(/\.md$/i, '')
  return withoutExt
    .replace(/^C#\//, 'csharp/')
    .replace(/^Vue\//, 'vue/')
    .split('/')
    .map((part) =>
      part
        .normalize('NFKD')
        // keep CJK + alnum; turn others into hyphen
        .replace(/[^\p{L}\p{N}]+/gu, '-')
        .replace(/^-+|-+$/g, '')
        .toLowerCase(),
    )
    .filter(Boolean)
    .join('-')
}

function makeDescription(md, fallback) {
  const lines = md.split(/\r?\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    if (trimmed.startsWith('#')) continue
    if (trimmed.startsWith('```')) continue
    if (trimmed.startsWith('>')) {
      const quote = trimmed.replace(/^>\s?/, '').replace(/\*\*/g, '').trim()
      if (quote) return truncate(quote, 140)
      continue
    }
    if (trimmed.startsWith('![[')) continue
    const plain = trimmed
      .replace(/!\[\[.*?\]\]/g, '')
      .replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, '$1')
      .replace(/[*_`#]/g, '')
      .trim()
    if (plain) return truncate(plain, 140)
  }
  return truncate(fallback, 140)
}

function truncate(text, max) {
  if (text.length <= max) return text
  return `${text.slice(0, max - 1)}…`
}

function tagsFor(path, category) {
  const tags = new Set()
  if (category === 'frontend') tags.add('Vue')
  if (category === 'backend') tags.add('C#')
  if (path.includes('/LINQ/')) tags.add('LINQ')
  if (path.includes('/物件/')) tags.add('OOP')
  if (path.includes('/易混淆概念/')) tags.add('Concepts')
  if (path.includes('/開發/')) tags.add('Practice')
  return [...tags]
}

function sanitizeBody(md) {
  return md
    // Obsidian embeds / wikilinks → plain text or drop
    .replace(/!\[\[([^\]]+)\]\]/g, '<!-- obsidian image: $1 -->')
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, a, b) => b || a)
    // common fence typo from paste: ```javascript=
    .replace(/```([a-zA-Z0-9_+-]*)=/g, '```$1')
}

function yamlQuote(value) {
  const s = String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  return `"${s}"`
}
