import type { ImagemReferencia } from "@/types/atividadeAutocorrigida";

const PASTA = "/src/assets/atividades/passo-a-passo/";
const DESENHOS = import.meta.glob<string>("/src/assets/atividades/passo-a-passo/*.svg", {
  eager: true,
  import: "default",
});

/**
 * Desenho de um passo, pelo nome do arquivo em `src/assets/atividades/passo-a-passo/`
 * (gerado por `npm run ilustracoes`, telas em `scripts/ilustracoes/telas/passo-a-passo.mjs`).
 * Nome errado quebra na hora, em vez de virar imagem vazia na tela do aluno.
 */
export function figura(nome: string, alt: string): ImagemReferencia {
  const url = DESENHOS[`${PASTA}${nome}.svg`];
  if (!url) throw new Error(`Desenho não encontrado: ${PASTA}${nome}.svg`);
  return { url, alt };
}
