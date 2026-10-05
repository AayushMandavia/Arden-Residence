const fs = require('fs');

const files = [
  'assets/TerraceExperience-B6r5GuYE.js',
  'assets/vendor-three-FFYe1X5b.js',
  'assets/TerraceExperience-DPRIbK4J.css',
  'assets/ReposeLifestyle-C-0HJaSK.js',
  'assets/ReposeLifestyle-CyDo--Vq.css'
];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const chunkMatches = content.match(/assets\/[a-zA-Z0-9_\-]+\.(?:js|css)/g) || [];
  const assetMatches = content.match(/["'`]([^"'`\s]+\.(?:webp|png|jpg|jpeg|svg|glb|gltf|bin|hdr|mp4|webm))["'`]/gi) || [];
  console.log('=== ' + f + ' ===');
  if (chunkMatches.length) console.log('  Chunks:', Array.from(new Set(chunkMatches)));
  if (assetMatches.length) console.log('  Assets:', Array.from(new Set(assetMatches)));
}
