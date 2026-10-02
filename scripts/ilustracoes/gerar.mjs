// Gera as ilustrações SVG das atividades a partir de scripts/ilustracoes/telas/*.mjs.
// Uso: npm run ilustracoes            → gera todas
//      npm run ilustracoes -- copiar  → só as telas cujo nome contém "copiar"
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';

const raiz = new URL('../../', import.meta.url);
const filtro = process.argv[2] ?? '';
let total = 0;

for (const arquivo of readdirSync(new URL('./telas/', import.meta.url)).filter((f) => f.endsWith('.mjs'))) {
  const { destino, saida, telas } = await import(`./telas/${arquivo}`);
  // `saida` (opcional): pasta relativa à raiz do projeto, para imagens que
  // precisam ficar em public/ (provas: o .prova.ts é carregado pelo servidor).
  const base = saida ?? `src/assets/atividades/${destino}`;
  const pasta = new URL(`${base}/`, raiz);
  mkdirSync(pasta, { recursive: true });
  for (const [nome, conteudo] of Object.entries(telas)) {
    if (!nome.includes(filtro)) continue;
    writeFileSync(new URL(`${nome}.svg`, pasta), conteudo);
    console.log(`${base}/${nome}.svg`);
    total++;
  }
}

console.log(`${total} ilustração(ões) gerada(s).`);
