const { spawn } = require('child_process');
const fs = require('fs');
const p = spawn('node', ['node_modules/@angular/cli/bin/ng.js', 'build'], {
  cwd: 'f:\\MyPro\\Ai-Anti\\Portofile\\portfolio',
  shell: true
});
let out = '';
p.stdout.on('data', d => { out += d.toString(); });
p.stderr.on('data', d => { out += d.toString(); });
p.on('close', code => {
  out += '\nEXIT CODE: ' + code;
  fs.writeFileSync('f:\\MyPro\\Ai-Anti\\Portofile\\portfolio\\build_result.txt', out);
  console.log(out);
});
setTimeout(() => {
  out += '\nTIMEOUT after 90s';
  fs.writeFileSync('f:\\MyPro\\Ai-Anti\\Portofile\\portfolio\\build_result.txt', out);
  process.exit(1);
}, 90000);
