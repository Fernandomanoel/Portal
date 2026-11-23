// Gera servidor/aulas.gerado.ts: o índice das aulas do Curso de Inglês para o servidor entregá-las só depois da
// senha. O navegador nunca importa uma `.aula.ts` (o conteúdo vazaria no bundle público). Roda sozinho no dev e no build.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const RAIZ = "src/data/cursoIngles";
const SAIDA = "servidor/aulas.gerado.ts";

function percorrer(pasta) {
  return readdirSync(pasta, { withFileTypes: true }).flatMap((entrada) => {
    const caminho = join(pasta, entrada.name);
    if (entrada.isDirectory()) return percorrer(caminho);
    return entrada.name.endsWith(".aula.ts") ? [caminho] : [];
  });
}

const ids = (existsSync(RAIZ) ? percorrer(RAIZ) : [])
  .map((arquivo) => relative(RAIZ, arquivo).split(sep).join("/").replace(/\.aula\.ts$/, ""))
  .sort();

const linhas = ids.map((id) => `  ${JSON.stringify(id)}: () => import(${JSON.stringify(`../${RAIZ}/${id}.aula.js`)}),`);

const conteudo = `// Gerado por scripts/gerar-registro-aulas.mjs no dev e no build. Não edite à mão.
import type { AulaIngles } from "../src/types/aulaIngles.js";

export const REGISTRO_AULAS_INGLES: Record<string, () => Promise<{ default: AulaIngles }>> = {
${linhas.join("\n")}${linhas.length ? "\n" : ""}};
`;

let atual = "";
try {
  atual = readFileSync(SAIDA, "utf8");
} catch {
  /* primeira vez */
}
if (atual !== conteudo) writeFileSync(SAIDA, conteudo);
console.log(`registro de aulas de inglês: ${ids.length} aula(s)`);
