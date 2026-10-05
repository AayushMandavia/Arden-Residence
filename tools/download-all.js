const fs = require('fs');
const path = require('path');
const https = require('https');

const baseUrl = 'https://www.reposeresidence.com';
const assetList = JSON.parse(fs.readFileSync(path.join(__dirname, 'master_asset_list.json'), 'utf8'));

// High-performance agent with keep-alive
const agent = new https.Agent({
  keepAlive: true,
  maxSockets: 25,
  timeout: 30000
});

function downloadFile(relPath, retry = 3) {
  return new Promise((resolve) => {
    const dest = path.join(__dirname, '..', relPath.replace(/^\//, ''));
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      return resolve({ path: relPath, status: 'skipped', size: fs.statSync(dest).size });
    }

    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const url = baseUrl + relPath;

    const req = https.get(url, { agent }, (res) => {
      if (res.statusCode !== 200) {
        res.resume(); // consume response data to free memory
        if (retry > 0 && res.statusCode >= 500) {
          return setTimeout(() => resolve(downloadFile(relPath, retry - 1)), 1000);
        }
        return resolve({ path: relPath, status: 'error', code: res.statusCode });
      }

      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close(() => {
          resolve({ path: relPath, status: 'ok', size: fs.statSync(dest).size });
        });
      });

      fileStream.on('error', (err) => {
        fs.unlink(dest, () => {});
        if (retry > 0) {
          setTimeout(() => resolve(downloadFile(relPath, retry - 1)), 1000);
        } else {
          resolve({ path: relPath, status: 'error', error: err.message });
        }
      });
    });

    req.on('error', (err) => {
      if (retry > 0) {
        setTimeout(() => resolve(downloadFile(relPath, retry - 1)), 1000);
      } else {
        resolve({ path: relPath, status: 'error', error: err.message });
      }
    });

    req.setTimeout(30000, () => {
      req.destroy();
      if (retry > 0) {
        setTimeout(() => resolve(downloadFile(relPath, retry - 1)), 1000);
      } else {
        resolve({ path: relPath, status: 'error', error: 'timeout' });
      }
    });
  });
}

async function runQueue(concurrency = 15) {
  let index = 0;
  let completed = 0;
  const total = assetList.length;
  const errors = [];
  let totalBytes = 0;
  const startTime = Date.now();

  console.log(`Starting download of ${total} assets with concurrency ${concurrency}...`);

  async function worker() {
    while (index < total) {
      const current = index++;
      const relPath = assetList[current];
      const result = await downloadFile(relPath);
      completed++;

      if (result.status === 'ok') {
        totalBytes += result.size;
      } else if (result.status === 'error') {
        errors.push(result);
        console.warn(`[${completed}/${total}] FAILED: ${relPath} (${result.code || result.error})`);
      }

      if (completed % 50 === 0 || completed === total) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        const mb = (totalBytes / (1024 * 1024)).toFixed(2);
        console.log(`Progress: ${completed}/${total} (${((completed/total)*100).toFixed(1)}%) | Downloaded: ${mb} MB | Time: ${elapsed}s`);
      }
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);
  console.log(`\nAll done in ${duration}s!`);
  console.log(`Successfully downloaded/verified ${completed - errors.length}/${total} assets (${totalMB} MB newly downloaded).`);
  
  if (errors.length > 0) {
    console.warn(`Encountered ${errors.length} errors:`);
    fs.writeFileSync(path.join(__dirname, 'download_errors.json'), JSON.stringify(errors, null, 2));
  } else {
    console.log('Zero errors! 100% of assets downloaded successfully.');
  }
}

runQueue(16).catch(console.error);
