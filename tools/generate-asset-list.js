const fs = require('fs');
const path = require('path');

const js = fs.readFileSync(path.join(__dirname, '../assets/index-Bez0Vhn_.js'), 'utf8');

const allUrls = new Set();

// 1. Static base files
allUrls.add('/assets/opening/branding/saion-logo.png');
allUrls.add('/assets/opening/building/final-frame.webp');
allUrls.add('/assets/reception-entry/building-final.webp');
allUrls.add('/assets/reception-entry/reception-final.webp');
allUrls.add('/models/repose-terrace.glb');

// 2. Sequence-01 (1 to 200)
for (let i = 1; i <= 200; i++) {
  const pad = String(i).padStart(4, '0');
  allUrls.add(`/assets/opening/sequence-01/webp/frame-${pad}.webp`);
}

// 3. Sequence-02 (1 to 240)
for (let i = 1; i <= 240; i++) {
  const pad = String(i).padStart(4, '0');
  allUrls.add(`/assets/opening/sequence-02/webp/frame-${pad}.webp`);
}

// 4. Floor explorer JSONs
allUrls.add('/floor-explorer/repose-floor-explorer-assets/floor-selector.json');
allUrls.add('/floor-explorer/repose-floor-explorer-assets/residences-map.json');

// 5. Assets from floor-selector.json and residences-map.json
const jsonAssets = JSON.parse(fs.readFileSync(path.join(__dirname, 'json_assets.json'), 'utf8'));
const pt = '/floor-explorer/repose-floor-explorer-assets/';
const gt = '/floor-explorer/relit/';

for (const item of jsonAssets) {
  if (item.match(/\.(webp|png|jpg|jpeg|svg)$/i)) {
    // Under repose-floor-explorer-assets
    allUrls.add(pt + item);
    // If it is in floorplates-web or units-web, there is also the relit transparent version!
    if (item.startsWith('floorplates-web/')) {
      allUrls.add(gt + item.replace(/^floorplates-web\//, 'floorplates/'));
    }
    if (item.startsWith('units-web/')) {
      allUrls.add(gt + item.replace(/^units-web\//, 'units/'));
    }
  }
}

// 6. Units 3D from index-Bez0Vhn_.js
const units3dRegex = /units-3d\/[a-zA-Z0-9_\-\.]+\.webp/g;
let m;
while ((m = units3dRegex.exec(js)) !== null) {
  allUrls.add(pt + m[0]);
}

console.log('Total unique assets compiled:', allUrls.size);
const assetList = Array.from(allUrls).sort();
fs.writeFileSync(path.join(__dirname, 'master_asset_list.json'), JSON.stringify(assetList, null, 2));

// Print summary by directory
const categoryCount = {};
for (const u of assetList) {
  const prefix = u.split('/').slice(0, 3).join('/');
  categoryCount[prefix] = (categoryCount[prefix] || 0) + 1;
}
console.log('Categories:', categoryCount);
