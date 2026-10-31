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

// Look at Slide 3: SKILL AND TOOLS
const slide3 = bootstrap.page.A.A[3];
console.log('Slide 3 name:', slide3.B);
slide3.t.forEach((layer, lIdx) => {
  layer.E?.forEach((el, eIdx) => {
    console.log(`Layer ${lIdx} El ${eIdx}: type=${el['A?']} role=${el.N}`);
    if (el.a?.C?.A) console.log('  text:', el.a.C.A.join('').replace(/\n/g, ' '));
    if (el.a?.B?.A?.A) console.log('  mediaId:', el.a.B.A.A);
    if (el.b) console.log('  svg count:', el.b.length);
    // Find all media or children inside el
    function findMedia(node, p = '') {
      if (!node) return;
      if (typeof node === 'object') {
        if (node['A?'] === 'd' && node.A) {
          console.log(`  nested media: ${p} -> ${node.A}`);
        }
        for (const [k, v] of Object.entries(node)) {
          findMedia(v, `${p}.${k}`);
        }
      }
    }
    findMedia(el);
  });
});

// Also check media definitions for MAGg4705JoA or similar
console.log('\nSearch media for MAG or tools:');
bootstrap.page.I.B.forEach((m, idx) => {
  if (m.A?.startsWith('MAG') || m.id?.startsWith('MAG')) {
    console.log(idx, m.A || m.id, m.files?.[0]?.url, m.title || m.name);
  }
});

