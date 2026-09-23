// Gera as ilustrações SVG das atividades a partir de scripts/ilustracoes/telas/*.mjs.
// Uso: npm run ilustracoes            → gera todas
//      npm run ilustracoes -- copiar  → só as telas cujo nome contém "copiar"
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';

const raiz = new URL('../../', import.meta.url);
const filtro = process.argv[2] ?? '';
let total = 0;

for (const arquivo of readdirSync(new URL('./telas/', import.meta.url)).filter((f) => f.endsWith('.mjs'))) {
  const { destino, telas } = await import(`./telas/${arquivo}`);
  const pasta = new URL(`src/assets/atividades/${destino}/`, raiz);
  mkdirSync(pasta, { recursive: true });
  for (const [nome, conteudo] of Object.entries(telas)) {
    if (!nome.includes(filtro)) continue;
    writeFileSync(new URL(`${nome}.svg`, pasta), conteudo);
    console.log(`src/assets/atividades/${destino}/${nome}.svg`);
    total++;
  }
}

console.log(`${total} ilustração(ões) gerada(s).`);
