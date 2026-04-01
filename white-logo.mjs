import { readFileSync, writeFileSync } from 'fs'

const files = [
  './src/components/Navbar.jsx',
  './src/components/Footer.jsx',
]

for (const path of files) {
  let content = readFileSync(path, 'utf8')
  const before = content
  content = content.replace(/monteverde-logo\.png/g, 'monteverde-logo-white.png')
  if (content !== before) {
    writeFileSync(path, content, 'utf8')
    console.log(`✓ ${path}`)
  } else {
    console.log(`✗ No match in ${path}`)
  }
}

console.log('\nDone.')
