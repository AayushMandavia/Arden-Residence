const fs = require('fs');

// 1. index-Bez0Vhn_.js
let js1 = fs.readFileSync('assets/index-Bez0Vhn_.js', 'utf8');
js1 = js1.replace(/receptionAlt:`Reposé Residence reception — SAION Properties`/g, 'receptionAlt:`Arden Residence reception — SAION Properties`');
js1 = js1.replace(/buildingAlt:`Reposé Residence, the entrance`/g, 'buildingAlt:`Arden Residence, the entrance`');
fs.writeFileSync('assets/index-Bez0Vhn_.js', js1, 'utf8');

// 2. ReposeLifestyle-C-0HJaSK.js
let js2 = fs.readFileSync('assets/ReposeLifestyle-C-0HJaSK.js', 'utf8');
js2 = js2.replace(/\[Reposé\]/g, '[Arden]');
fs.writeFileSync('assets/ReposeLifestyle-C-0HJaSK.js', js2, 'utf8');

console.log('Additional branding replacements completed.');
