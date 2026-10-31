const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('canva_page.html', 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);

const start = html.indexOf("window['bootstrap'] = JSON.parse('");
const end = html.indexOf("');", start);
const code = html.slice(start, end + 3);
vm.runInContext(code, sandbox);

const bootstrap = sandbox.window.bootstrap;

bootstrap.page.I.B.forEach((m, i) => {
  if (m.id === 'MAHZZxB-m9g' || m.A === 'MAHZZxB-m9g') {
    console.log('Found in I.B:', m.id || m.A, m.files);
  }
});

// Also check bootstrap.page.A.E
bootstrap.page.A.E?.forEach(m => {
  if (m.id === 'MAHZZxB-m9g' || m.A === 'MAHZZxB-m9g') {
    console.log('Found in A.E:', m.id || m.A, m.files);
  }
});

