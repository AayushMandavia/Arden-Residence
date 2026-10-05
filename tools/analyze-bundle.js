const fs = require('fs');
const path = require('path');

const js = fs.readFileSync(path.join(__dirname, '../assets/index-Bez0Vhn_.js'), 'utf8');

// 1. Dynamic imports: import("...")
const dynamicImports = [];
const dynRegex = /import\s*\(\s*["']([^"']+)["']\s*\)/g;
let m;
while ((m = dynRegex.exec(js)) !== null) {
  dynamicImports.push(m[1]);
}
console.log('Dynamic imports:', dynamicImports);

// 2. Search for opening sequence definitions
const seqIdx = js.indexOf('/assets/opening/');
if (seqIdx !== -1) {
  console.log('--- Context around /assets/opening/ ---');
  console.log(js.substring(Math.max(0, seqIdx - 400), Math.min(js.length, seqIdx + 600)));
}

// 3. Search for units-3d context
const unitsIdx = js.indexOf('units-3d/');
if (unitsIdx !== -1) {
  console.log('--- Context around units-3d/ ---');
  console.log(js.substring(Math.max(0, unitsIdx - 200), Math.min(js.length, unitsIdx + 800)));
}

// 4. Search for other file extensions (.pdf, .mp4, .svg, .webp, .png, .jpg)
const fileExtRegex = /["'`]([^"'`\s]+\.(?:webp|png|jpg|jpeg|svg|mp4|webm|pdf|woff2|woff|json))["'`]/gi;
const allFiles = new Set();
while ((m = fileExtRegex.exec(js)) !== null) {
  allFiles.add(m[1]);
}
console.log('--- All file references found (' + allFiles.size + ') ---');
console.log(Array.from(allFiles).sort());
