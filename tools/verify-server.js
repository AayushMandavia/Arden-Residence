const http = require('http');

function testUrl(path, options = {}) {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: options.method || 'GET',
      headers: options.headers || {}
    }, (res) => {
      let data = '';
      res.on('data', chunk => {
        if (data.length < 500) data += chunk.toString();
      });
      res.on('end', () => {
        resolve({
          path,
          status: res.statusCode,
          contentType: res.headers['content-type'],
          contentLength: res.headers['content-length'],
          contentRange: res.headers['content-range'],
          sample: data.substring(0, 150)
        });
      });
    });
    req.on('error', (err) => resolve({ path, error: err.message }));
    req.end();
  });
}

async function verify() {
  const tests = [
    { path: '/' },
    { path: '/assets/index-Bez0Vhn_.js' },
    { path: '/assets/index-Dvt1c2aj.css' },
    { path: '/assets/vendor-react-CL6k3kZJ.js' },
    { path: '/assets/fonts/repose-display.woff2' },
    { path: '/assets/ReposeLifestyle-C-0HJaSK.js' },
    { path: '/assets/TerraceExperience-B6r5GuYE.js' },
    { path: '/assets/vendor-three-FFYe1X5b.js' },
    { path: '/models/repose-terrace.glb' },
    { path: '/assets/opening/sequence-01/webp/frame-0001.webp' },
    { path: '/assets/opening/sequence-02/webp/frame-0240.webp' },
    { path: '/assets/opening/building/final-frame.webp' },
    { path: '/assets/reception-entry/building-final.webp' },
    { path: '/assets/reception-entry/reception-final.webp' },
    { path: '/floor-explorer/repose-floor-explorer-assets/floor-selector.json' },
    { path: '/floor-explorer/repose-floor-explorer-assets/residences-map.json' },
    { path: '/floor-explorer/repose-floor-explorer-assets/units-3d/unit-l01-05-07-11-1bhk-a-3d.webp' },
    { path: '/floor-explorer/relit/floorplates/floorplate-l01-05-07-11.webp' },
    { path: '/assets/repose-experience/pool-01.webp' },
    { path: '/assets/amenities/web/kids-play-area.webp' },
    { path: '/assets/terrace/plate-sports-court.webp' },
    { path: '/assets/interiors/living-room.mp4', headers: { Range: 'bytes=0-1023' } },
    { path: '/assets/walkthrough/one-bedroom-walkthrough.mp4', headers: { Range: 'bytes=0-1023' } }
  ];

  console.log('--- Verifying Local Server Endpoints ---');
  let passed = 0;
  for (const t of tests) {
    const res = await testUrl(t.path, t);
    const ok = res.status === 200 || res.status === 206;
    if (ok) passed++;
    console.log(`[${ok ? 'PASS' : 'FAIL'} ${res.status}] ${t.path} (${res.contentType}, ${res.contentLength || res.contentRange || ''})`);
  }

  console.log(`\nVerification Result: ${passed}/${tests.length} passed.`);
}

verify();
