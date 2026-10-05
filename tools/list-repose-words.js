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
  const regex = /(?:[A-Za-z0-9_\-\.\/]*repos[eé][A-Za-z0-9_\-\.\/]*)/gi;
  const matches = content.match(regex) || [];
  console.log(`\n=== ${file} (${matches.length} matches) ===`);
  const unique = Array.from(new Set(matches));
  unique.forEach(u => console.log('  ', u));
}
