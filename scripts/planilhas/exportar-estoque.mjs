// Exporta os dados do almoxarifado fictício (src/data/atividadesAutocorrigidas/dadosEstoque.ts) em JSON,
// para o gerar_estoque.py montar as planilhas .xlsx com exatamente os mesmos números das atividades.
// Uso: npm run planilhas
import { build } from "vite";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const raiz = new URL("../../", import.meta.url).pathname;
const pasta = mkdtempSync(join(tmpdir(), "planilhas-"));
const entrada = join(pasta, "entrada.ts");
writeFileSync(entrada, `import { CADASTRO, MOVIMENTOS, RESULTADO } from "@/data/atividadesAutocorrigidas/dadosEstoque";
export default { cadastro: CADASTRO, movimentos: MOVIMENTOS, amostra: RESULTADO.lancamentos.filter((l) => l.situacao === "OK").slice(0, 40) };`);
await build({ root: raiz, configFile: false, logLevel: "error", resolve: { alias: { "@": join(raiz, "src") } }, build: { ssr: entrada, outDir: join(pasta, "saida"), emptyOutDir: true, rollupOptions: { output: { entryFileNames: "v.mjs" } } } });
const { default: dados } = await import(pathToFileURL(join(pasta, "saida", "v.mjs")).href);
const json = join(pasta, "estoque.json");
writeFileSync(json, JSON.stringify(dados));
console.log(json);
