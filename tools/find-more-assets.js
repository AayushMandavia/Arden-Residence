const fs = require('fs');
const js = fs.readFileSync('assets/ReposeLifestyle-C-0HJaSK.js', 'utf8');

const lIdx = js.indexOf('JSON.parse');
console.log('--- Context around JSON.parse ---');
console.log(js.substring(Math.max(0, lIdx - 300), Math.min(js.length, lIdx + 1500)));
