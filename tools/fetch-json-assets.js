const fs = require('fs');
const https = require('https');
const path = require('path');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  const base = 'https://www.reposeresidence.com';
  const dir = path.join(__dirname, '../floor-explorer/repose-floor-explorer-assets');
  fs.mkdirSync(dir, { recursive: true });

  const f1 = '/floor-explorer/repose-floor-explorer-assets/floor-selector.json';
  const f2 = '/floor-explorer/repose-floor-explorer-assets/residences-map.json';

  console.log('Downloading json files...');
  await downloadFile(base + f1, path.join(__dirname, '..', f1));
  await downloadFile(base + f2, path.join(__dirname, '..', f2));

  const json1 = JSON.parse(fs.readFileSync(path.join(__dirname, '..', f1), 'utf8'));
  const json2 = JSON.parse(fs.readFileSync(path.join(__dirname, '..', f2), 'utf8'));

  // Collect all strings in json that look like file paths
  const filePaths = new Set();
  function walk(obj) {
    if (!obj) return;
    if (typeof obj === 'string') {
      if (obj.match(/\.(webp|png|jpg|jpeg|svg|json|pdf)$/i) || obj.includes('/') || obj.includes('\\')) {
        filePaths.add(obj);
      }
    } else if (Array.isArray(obj)) {
      obj.forEach(walk);
    } else if (typeof obj === 'object') {
      Object.values(obj).forEach(walk);
    }
  }

  walk(json1);
  walk(json2);

  console.log('Total file paths referenced in JSONs:', filePaths.size);
  fs.writeFileSync(path.join(__dirname, 'json_assets.json'), JSON.stringify(Array.from(filePaths).sort(), null, 2));
}

main().catch(console.error);
