const fs = require('fs');

const files = [
  'index.html',
  'assets/index-Bez0Vhn_.js',
  'assets/ReposeLifestyle-C-0HJaSK.js',
  'assets/TerraceExperience-B6r5GuYE.js',
  'floor-explorer/repose-floor-explorer-assets/floor-selector.json',
  'floor-explorer/repose-floor-explorer-assets/residences-map.json'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  const regex = /.{0,60}repos[eé].{0,60}/gi;
  let m;
  console.log(`\n================ ${file} ================`);
  while ((m = regex.exec(content)) !== null) {
    console.log('->', m[0]);
  }
}
