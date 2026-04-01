import { readFileSync, writeFileSync } from 'fs'

const path = './src/components/Hero.jsx'
let content = readFileSync(path, 'utf8')
const before = content

// Remove the hero__logo div entirely
content = content.replace(/<div className="hero__logo">[\s\S]*?<\/div>/, '')

if (content !== before) {
  writeFileSync(path, content, 'utf8')
  console.log('✓ Hero logo removed')
} else {
  console.log('✗ No match found — may need manual removal')
}
