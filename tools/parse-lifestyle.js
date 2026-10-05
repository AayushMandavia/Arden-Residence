const fs = require('fs');
const js = fs.readFileSync('assets/ReposeLifestyle-C-0HJaSK.js', 'utf8');

// Look for definitions of base paths or variables
const varRegex = /([a-zA-Z0-9_$]+)\s*=\s*["'](\/assets\/[^"']+)["']/g;
let m;
while ((m = varRegex.exec(js)) !== null) {
  console.log(`Variable ${m[1]} = ${m[2]}`);
}

// Extract the embedded JSON array L
const lMatch = js.match(/JSON\.parse\(`(\[.*?\])`\)/);
if (lMatch) {
  const items = JSON.parse(lMatch[1]);
  console.log('Total items in embedded JSON L:', items.length);
  fs.writeFileSync('tools/lifestyle_items.json', JSON.stringify(items, null, 2));
}

// Find all template literals with ${...}
const tplRegex = /`\$\{([a-zA-Z0-9_$]+)\}\/([^`]+)`/g;
while ((m = tplRegex.exec(js)) !== null) {
  console.log(`Template: \${${m[1]}}/${m[2]}`);
}
