const fs = require('fs');
const js = fs.readFileSync('assets/ReposeLifestyle-C-0HJaSK.js', 'utf8');

// Find all occurrences of template literals or path strings
const matches = [];
const regex = /["'`](\/[^"'`\s]+)["'`]/g;
let m;
while ((m = regex.exec(js)) !== null) {
  matches.push(m[1]);
}
console.log('Explicit paths in ReposeLifestyle:', Array.from(new Set(matches)));

// Inspect context around living-room.mp4
const mp4Idx = js.indexOf('living-room.mp4');
if (mp4Idx !== -1) {
  console.log('--- Context around living-room.mp4 ---');
  console.log(js.substring(Math.max(0, mp4Idx - 200), Math.min(js.length, mp4Idx + 300)));
}

// Inspect context around pool-01.webp
const poolIdx = js.indexOf('pool-01.webp');
if (poolIdx !== -1) {
  console.log('--- Context around pool-01.webp ---');
  console.log(js.substring(Math.max(0, poolIdx - 200), Math.min(js.length, poolIdx + 300)));
}
