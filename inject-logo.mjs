import { readFileSync, writeFileSync } from 'fs'

const files = [
  {
    path: './src/components/Navbar.jsx',
    find: /<Link to="\/" className="nav__logo">[\s\S]*?<\/Link>/,
    replace: `<Link to="/" className="nav__logo">
          <img src="/monteverde-logo.png" alt="MonteVerde Landscaping" style={{ height: '48px', width: 'auto' }} />
        </Link>`
  },
  {
    path: './src/components/Hero.jsx',
    find: /<div className="hero__logo">[\s\S]*?<\/div>/,
    replace: `<div className="hero__logo">
          <img src="/monteverde-logo.png" alt="MonteVerde Landscaping" style={{ height: '72px', width: 'auto', marginBottom: '1rem' }} />
        </div>`
  },
  {
    path: './src/components/Footer.jsx',
    find: /<div className="footer__logo">[\s\S]*?<\/div>/,
    replace: `<div className="footer__logo">
          <img src="/monteverde-logo.png" alt="MonteVerde Landscaping" style={{ height: '48px', width: 'auto' }} />
        </div>`
  }
]

for (const { path, find, replace } of files) {
  let content = readFileSync(path, 'utf8')
  const before = content
  content = content.replace(find, replace)
  if (content !== before) {
    writeFileSync(path, content, 'utf8')
    console.log(`✓ ${path}`)
  } else {
    console.log(`✗ No match found in ${path} — check manually`)
  }
}

console.log('\nDone.')
