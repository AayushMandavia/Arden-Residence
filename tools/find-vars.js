const fs = require('fs');
const js = fs.readFileSync('assets/ReposeLifestyle-C-0HJaSK.js', 'utf8');

const vars = ['U', 'Se', 'we', 'Ce', 'q', 'A', 't'];
for (const v of vars) {
  const reg = new RegExp(`(?:const|let|var|,)\\s*${v}\\s*=\\s*([^,;]+)`, 'g');
  let m;
  while ((m = reg.exec(js)) !== null) {
    console.log(`${v} = ${m[1]}`);
  }
}
