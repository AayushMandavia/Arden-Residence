const fs = require('fs');
const path = require('path');

function searchInFile(filePath) {
  if (filePath.endsWith('.webp') || filePath.endsWith('.woff2') || filePath.endsWith('.glb') || filePath.endsWith('.png')) {
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const matches = [];
  const regex = /repos[eé]/gi;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const start = Math.max(0, m.index - 40);
    const end = Math.min(content.length, m.index + 50);
    matches.push({
      index: m.index,
      matched: m[0],
      context: content.substring(start, end).replace(/\n/g, ' ')
    });
  }
  if (matches.length > 0) {
    console.log(`\n=== Found ${matches.length} in ${filePath} ===`);
    matches.slice(0, 10).forEach(m => console.log(`  [${m.matched}]: ...${m.context}...`));
    if (matches.length > 10) console.log(`  ... and ${matches.length - 10} more`);
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'tools') continue;
    if (entry.isDirectory()) {
      walkDir(full);
    } else {
      searchInFile(full);
    }
  }
}

walkDir(path.join(__dirname, '..'));
