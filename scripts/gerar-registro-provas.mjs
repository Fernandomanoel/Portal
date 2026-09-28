// Gera servidor/provas.gerado.ts: o índice das provas para o servidor corrigir
// sem confiar no navegador. O navegador usa import.meta.glob; o servidor não
// tem glob, então recebe esta lista estática. Roda sozinho no build.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const RAIZ = "src/data/provasInterativas";
const SAIDA = "servidor/provas.gerado.ts";

function percorrer(pasta) {
  return readdirSync(pasta, { withFileTypes: true }).flatMap((entrada) => {
    const caminho = join(pasta, entrada.name);
    if (entrada.isDirectory()) return percorrer(caminho);
    return entrada.name.endsWith(".prova.ts") ? [caminho] : [];
  });
}

const ids = percorrer(RAIZ)
  .map((arquivo) => relative(RAIZ, arquivo).split(sep).join("/").replace(/\.prova\.ts$/, ""))
  .sort();

const linhas = ids.map(
  (id) => `  ${JSON.stringify(id)}: () => import(${JSON.stringify(`../${RAIZ}/${id}.prova.js`)}),`,
);

const conteudo = `// Gerado por scripts/gerar-registro-provas.mjs no build. Não edite à mão.
import type { ProvaInterativa } from "../src/types/quiz.js";

export const REGISTRO_PROVAS: Record<string, () => Promise<{ default: ProvaInterativa }>> = {
${linhas.join("\n")}${linhas.length ? "\n" : ""}};
`;

let atual = "";
try {
  atual = readFileSync(SAIDA, "utf8");
} catch {
  /* primeira vez */
}
if (atual !== conteudo) writeFileSync(SAIDA, conteudo);
console.log(`registro de provas: ${ids.length} prova(s)`);
