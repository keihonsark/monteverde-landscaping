import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const TARGET_DIR = './src';

const replacements = [
  // Business name
  [/The Lawncare Bros LLC/gi, 'MonteVerde Landscaping'],
  [/Lawncare Bros/gi, 'MonteVerde Landscaping'],
  [/DLS Lawn Services/gi, 'MonteVerde Landscaping'],
  [/Straight Edge Landscaping/gi, 'MonteVerde Landscaping'],
  [/Your (Business|Company) Name/gi, 'MonteVerde Landscaping'],
  [/\[Business Name\]/gi, 'MonteVerde Landscaping'],
  [/lawncare template/gi, 'MonteVerde Landscaping'],

  // Tagline
  [/Your Tagline Here/gi, 'Where Every Yard Becomes a Masterpiece'],
  [/\[Tagline\]/gi, 'Where Every Yard Becomes a Masterpiece'],
  [/Professional Lawn Care Services/gi, 'Where Every Yard Becomes a Masterpiece'],

  // Phone
  [/\(555\) 555-5555/g, '(209) 589-4257'],
  [/555-555-5555/g, '(209) 589-4257'],
  [/\[Phone\]/gi, '(209) 589-4257'],
  [/\+1 \(555\)[^)]*\)/g, '(209) 589-4257'],

  // Email
  [/info@yourbusiness\.com/gi, 'veroj1970@gmail.com'],
  [/hello@yourbusiness\.com/gi, 'veroj1970@gmail.com'],
  [/\[Email\]/gi, 'veroj1970@gmail.com'],
  [/email@example\.com/gi, 'veroj1970@gmail.com'],

  // Address
  [/123 Main Street[^<"']*/gi, '3312 Aristides Ct, Modesto, CA 95355'],
  [/\[Address\]/gi, '3312 Aristides Ct, Modesto, CA 95355'],
  [/Your City, State \d{5}/gi, 'Modesto, CA 95355'],
  [/City, State \d{5}/gi, 'Modesto, CA 95355'],

  // Meta / SEO
  [/Lawn Care Services \| [^<"]*/gi, 'MonteVerde Landscaping | Modesto, CA'],
  [/Professional Lawn Care \| [^<"]*/gi, 'MonteVerde Landscaping | Modesto, CA'],

  // Copyright
  [/© \d{4} [^<"'\n]*(Lawn|Care|Bros|DLS|Straight)[^<"'\n]*/gi, '© 2025 MonteVerde Landscaping'],

  // Services — replace generic service names in content
  [/Lawn Mowing/gi, 'Lawn Maintenance'],
  [/Weed Control/gi, 'Pruning'],
];

const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.json', '.md'];

let filesChanged = 0;
let totalReplacements = 0;

function processDir(dir) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (EXTENSIONS.includes(extname(entry))) {
      let content = readFileSync(fullPath, 'utf8');
      let original = content;
      let count = 0;
      for (const [pattern, replacement] of replacements) {
        const before = content;
        content = content.replace(pattern, replacement);
        if (content !== before) count++;
      }
      if (content !== original) {
        writeFileSync(fullPath, content, 'utf8');
        filesChanged++;
        totalReplacements += count;
        console.log(`✓ ${fullPath} (${count} replacements)`);
      }
    }
  }
}

console.log('Starting MonteVerde reskin...\n');
processDir(TARGET_DIR);
console.log(`\nDone. ${filesChanged} files updated, ${totalReplacements} replacements made.`);
