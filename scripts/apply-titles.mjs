import { readFileSync, writeFileSync } from 'node:fs'

const genContent = readFileSync('scripts/generate-catalog.mjs', 'utf8')
const titlesMatch = genContent.match(/const TITLES = \{([\s\S]*?)\n\}/)
if (!titlesMatch) { console.log('Could not find TITLES'); process.exit(1) }

const titlesBlock = titlesMatch[1]
const entries = {}
const entryRegex = /(\w+):\s*\[([^\]]*)\]/g
let m
while ((m = entryRegex.exec(titlesBlock)) !== null) {
  const code = m[1]
  const items = m[2].match(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g) || []
  entries[code] = items.map(s => {
    const quote = s[0]
    return s.slice(1, -1).replace(/\\(.)/g, '$1')
  })
}
console.log('Found', Object.keys(entries).length, 'TITLES entries')

let content = readFileSync('lib/catalog.ts', 'utf8')
let replaced = 0

for (const [code, titles] of Object.entries(entries)) {
  const bookStart = content.indexOf(`"id": "${code}"`)
  if (bookStart === -1) continue

  const chaptersStart = content.indexOf('"chapters": [', bookStart)
  if (chaptersStart === -1) continue

  // Count chapters by finding each "number": pattern until we hit the next book or end
  // Find the next "id": pattern after this book
  const nextBookIdx = content.indexOf('\n    "id":', bookStart + 10)
  const searchEnd = nextBookIdx !== -1 ? nextBookIdx : content.length
  const chaptersBlock = content.substring(chaptersStart, searchEnd)
  const chapterCount = (chaptersBlock.match(/"number":/g) || []).length

  if (titles.length !== chapterCount) {
    continue
  }

  // Replace each chapter title
  let newChapters = chaptersBlock
  for (let i = 0; i < titles.length; i++) {
    const num = i + 1
    const titlePattern = new RegExp(`("number": ${num}[\\s\\S]*?"title": ")([^"]*)(")`)
    const escaped = titles[i].replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\$/g, '\\$')
    newChapters = newChapters.replace(titlePattern, `$1${escaped}$3`)
  }

  content = content.substring(0, chaptersStart) + newChapters + content.substring(chaptersStart + chaptersBlock.length)
  replaced++
}

writeFileSync('lib/catalog.ts', content)
console.log('Applied titles to', replaced, 'books')
