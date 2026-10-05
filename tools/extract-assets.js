const fs = require('fs');
const path = require('path');

const js = fs.readFileSync(path.join(__dirname, '../assets/index-Bez0Vhn_.js'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, '../assets/index-Dvt1c2aj.css'), 'utf8');
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

const matches = new Set();

// 1. URLs in quotes
const quoteRegex = /["'`](\/assets\/[^"'`\s\)\\]+|\.\/assets\/[^"'`\s\)\\]+)["'`]/g;
let m;
while ((m = quoteRegex.exec(js)) !== null) {
  matches.add(m[1]);
}
while ((m = quoteRegex.exec(css)) !== null) {
  matches.add(m[1]);
}
while ((m = quoteRegex.exec(html)) !== null) {
  matches.add(m[1]);
}

// 2. CSS url(...)
const cssUrlRegex = /url\(\s*["']?([^"')]+)["']?\s*\)/g;
while ((m = cssUrlRegex.exec(css)) !== null) {
  if (!m[1].startsWith('data:')) {
    matches.add(m[1]);
  }
}

// 3. String patterns for image sequences / frame patterns
// e.g. frame-%04d or sequence or template strings
console.log('Explicit asset count:', matches.size);
fs.writeFileSync(path.join(__dirname, 'extracted_urls.json'), JSON.stringify(Array.from(matches).sort(), null, 2));

// Let's inspect potential frame sequences or dynamic asset patterns in JS
const seqMatches = js.match(/sequence[^\s"'`]+|frame[^\s"'`]+|\.webp|\.png|\.jpg|\.jpeg|\.svg|\.mp4|\.woff2/gi) || [];
console.log('File extension occurrences count:', seqMatches.length);

// Let's search for sequences specifically:
const seqPaths = [];
const seqRegex = /["'`]([^"'`]*(?:sequence|frame|webp|png|jpg)[^"'`]*)["'`]/gi;
while ((m = seqRegex.exec(js)) !== null) {
  if (m[1].includes('/') || m[1].includes('.')) {
    seqPaths.push(m[1]);
  }
}
console.log('Sequence/image path patterns found:', seqPaths.length);
fs.writeFileSync(path.join(__dirname, 'seq_patterns.json'), JSON.stringify(Array.from(new Set(seqPaths)), null, 2));
