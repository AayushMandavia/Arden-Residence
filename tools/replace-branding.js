const fs = require('fs');
const path = require('path');

// 1. index.html
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<title>Reposé Residence — SAION Properties<\/title>/g, '<title>Arden Residence — SAION Properties</title>');
html = html.replace(/content="Reposé Residence by SAION Properties — Al Furjan, Dubai\. A luxurious lifestyle awaits you\."/g, 'content="Arden Residence by SAION Properties — Al Furjan, Dubai. A luxurious lifestyle awaits you."');
html = html.replace(/>R<\//g, '>A</');
fs.writeFileSync('index.html', html, 'utf8');
console.log('Updated index.html');

// 2. floor-selector.json
let fsJson = fs.readFileSync('floor-explorer/repose-floor-explorer-assets/floor-selector.json', 'utf8');
fsJson = fsJson.replace(/"project":\s*"Reposé Residence"/g, '"project": "Arden Residence"');
fs.writeFileSync('floor-explorer/repose-floor-explorer-assets/floor-selector.json', fsJson, 'utf8');
console.log('Updated floor-selector.json');

// 3. residences-map.json
let rmJson = fs.readFileSync('floor-explorer/repose-floor-explorer-assets/residences-map.json', 'utf8');
rmJson = rmJson.replace(/"name":\s*"Reposé Residence"/g, '"name": "Arden Residence"');
fs.writeFileSync('floor-explorer/repose-floor-explorer-assets/residences-map.json', rmJson, 'utf8');
console.log('Updated residences-map.json');

// 4. index-Bez0Vhn_.js
let js1 = fs.readFileSync('assets/index-Bez0Vhn_.js', 'utf8');
js1 = js1.replace(/titleLines:\[`Reposé`,`Residence`\]/g, 'titleLines:[`Arden`,`Residence`]');
js1 = js1.replace(/project:`Reposé Residence`/g, 'project:`Arden Residence`');
js1 = js1.replace(/status:`Loading Reposé Residence`/g, 'status:`Loading Arden Residence`');
js1 = js1.replace(/alt:`Reposé Residence, completed`/g, 'alt:`Arden Residence, completed`');
js1 = js1.replace(/welcome:`Welcome to Reposé`/g, 'welcome:`Welcome to Arden`');
js1 = js1.replace(/explore:`Explore Reposé`/g, 'explore:`Explore Arden`');
js1 = js1.replace(/Repos%C3%A9%20Residence/g, 'Arden%20Residence');
js1 = js1.replace(/"aria-label":`Reposé Residence — the approach`/g, '"aria-label":`Arden Residence — the approach`');
js1 = js1.replace(/children:`Reposé Residence · Al Furjan`/g, 'children:`Arden Residence · Al Furjan`');
js1 = js1.replace(/`Reposé: this device cannot keep up/g, '`Arden: this device cannot keep up');
js1 = js1.replace(/`Reposé: the lifestyle chapter could not be loaded`/g, '`Arden: the lifestyle chapter could not be loaded`');
fs.writeFileSync('assets/index-Bez0Vhn_.js', js1, 'utf8');
console.log('Updated assets/index-Bez0Vhn_.js');

// 5. ReposeLifestyle-C-0HJaSK.js
let js2 = fs.readFileSync('assets/ReposeLifestyle-C-0HJaSK.js', 'utf8');
js2 = js2.replace(/name:`Reposé Residence`/g, 'name:`Arden Residence`');
js2 = js2.replace(/alt:`The Reposé living room/g, 'alt:`The Arden living room');
js2 = js2.replace(/alt:`The Reposé kitchen/g, 'alt:`The Arden kitchen');
js2 = js2.replace(/alt:`A Reposé bedroom/g, 'alt:`An Arden bedroom');
js2 = js2.replace(/alt:`The Reposé bathroom/g, 'alt:`The Arden bathroom');
js2 = js2.replace(/place:`Reposé Residence · Al Furjan, Dubai`/g, 'place:`Arden Residence · Al Furjan, Dubai`');
js2 = js2.replace(/alt:`The Reposé zen garden`/g, 'alt:`The Arden zen garden`');
js2 = js2.replace(/alt:`The Reposé yoga studio`/g, 'alt:`The Arden yoga studio`');
js2 = js2.replace(/alt:`The equipped gym at Reposé`/g, 'alt:`The equipped gym at Arden`');
js2 = js2.replace(/alt:`The outdoor gym at Reposé`/g, 'alt:`The outdoor gym at Arden`');
js2 = js2.replace(/Everything at Reposé sits/g, 'Everything at Arden sits');
js2 = js2.replace(/THE REPOSÉ COLLECTION/g, 'THE ARDEN COLLECTION');
js2 = js2.replace(/Stone pathway and greenery in the Reposé zen garden/g, 'Stone pathway and greenery in the Arden zen garden');
js2 = js2.replace(/The calm Reposé yoga studio/g, 'The calm Arden yoga studio');
js2 = js2.replace(/alt:`Reposé’s equipped gym/g, 'alt:`Arden’s equipped gym');
js2 = js2.replace(/alt:`Warmly lit Reposé steam room/g, 'alt:`Warmly lit Arden steam room');
js2 = js2.replace(/swimming pool at Reposé`/g, 'swimming pool at Arden`');
js2 = js2.replace(/More Reposé\./g, 'More Arden.');
js2 = js2.replace(/Reposé brochure/g, 'Arden brochure');
js2 = js2.replace(/Family life at Reposé/g, 'Family life at Arden');
js2 = js2.replace(/alt:`Reposé living and dining space/g, 'alt:`Arden living and dining space');
js2 = js2.replace(/children:\[\(0,O\.jsx\)\(`span`,{children:`REPOSÉ`}\)/g, 'children:[(0,O.jsx)(`span`,{children:`ARDEN`})');
js2 = js2.replace(/alt:`The Reposé Residence podium level/g, 'alt:`The Arden Residence podium level');
js2 = js2.replace(/className:`rp-final-word`,children:`REPOSÉ`/g, 'className:`rp-final-word`,children:`ARDEN`');
js2 = js2.replace(/completed Reposé Residence tower/g, 'completed Arden Residence tower');
js2 = js2.replace(/children:`ENQUIRE ABOUT REPOSÉ`/g, 'children:`ENQUIRE ABOUT ARDEN`');
js2 = js2.replace(/eyebrowProject:`Reposé Residence · `/g, 'eyebrowProject:`Arden Residence · `');
js2 = js2.replace(/about Reposé\./g, 'about Arden.');
js2 = js2.replace(/"aria-label":`Reposé Residence — explore the floors again`/g, '"aria-label":`Arden Residence — explore the floors again`');
js2 = js2.replace(/children:`REPOSÉ RESIDENCE`/g, 'children:`ARDEN RESIDENCE`');
js2 = js2.replace(/"aria-label":`Reposé, back to life chapter`/g, '"aria-label":`Arden, back to life chapter`');
js2 = js2.replace(/children:`Reposé`}\),\(0,O\.jsx\)\(`small`,{children:`RESIDENCE`}\)/g, 'children:`Arden`}),(0,O.jsx)(`small`,{children:`RESIDENCE`})');
js2 = js2.replace(/Reposé Residence\./g, 'Arden Residence.');
js2 = js2.replace(/REPOSÉ RESIDENCE · AL FURJAN, DUBAI/g, 'ARDEN RESIDENCE · AL FURJAN, DUBAI');
js2 = js2.replace(/learn more about Reposé Residence\./g, 'learn more about Arden Residence.');
js2 = js2.replace(/The Reposé swimming pool/g, 'The Arden swimming pool');
js2 = js2.replace(/REPOSÉ RESIDENCE · THE AMENITY COLLECTION/g, 'ARDEN RESIDENCE · THE AMENITY COLLECTION');
fs.writeFileSync('assets/ReposeLifestyle-C-0HJaSK.js', js2, 'utf8');
console.log('Updated assets/ReposeLifestyle-C-0HJaSK.js');

// 6. TerraceExperience-B6r5GuYE.js
let js3 = fs.readFileSync('assets/TerraceExperience-B6r5GuYE.js', 'utf8');
js3 = js3.replace(/eyebrow:`Reposé Residence`/g, 'eyebrow:`Arden Residence`');
js3 = js3.replace(/sceneLabel:`Reposé Residence open terrace/g, 'sceneLabel:`Arden Residence open terrace');
fs.writeFileSync('assets/TerraceExperience-B6r5GuYE.js', js3, 'utf8');
console.log('Updated assets/TerraceExperience-B6r5GuYE.js');
