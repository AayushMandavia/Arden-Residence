const fs = require('fs');
const path = require('path');

const js = fs.readFileSync(path.join(__dirname, '../assets/index-Bez0Vhn_.js'), 'utf8');

// Find all URLs starting with http, https, or mailto or tel or /
const urlRegex = /["'`](https?:\/\/[^"'`\s]+|mailto:[^"'`\s]+|tel:[^"'`\s]+|\/[a-zA-Z0-9_\-\.\/]+)[\"'\`]/g;
const links = new Set();
let m;
while ((m = urlRegex.exec(js)) !== null) {
  links.add(m[1]);
}

console.log('Total URLs/paths extracted from JS:', links.size);
fs.writeFileSync(path.join(__dirname, 'all_bundle_links.json'), JSON.stringify(Array.from(links).sort(), null, 2));

const mediaMatches = js.match(/[^"'`\s\(\)]+\.(?:glb|gltf|bin|hdr|exr|mp3|wav|ogg|m4a|wasm)/gi) || [];
console.log('3D / Audio / HDR / Wasm matches:', Array.from(new Set(mediaMatches)));

