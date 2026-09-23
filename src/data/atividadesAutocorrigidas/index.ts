import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

/**
 * Cada atividade autocorrigida é um módulo `.ts` que exporta a atividade como
 * default. O glob é lazy: o arquivo só é baixado quando o aluno abre aquela
 * atividade. Mesmo padrão de `src/data/provasInterativas/index.ts`.
 */
const MODULOS = import.meta.glob<{ default: AtividadeAutocorrigida }>("./**/*.atividade.ts");

export async function carregarAtividadeAutocorrigida(
  caminho: string,
): Promise<AtividadeAutocorrigida | null> {
  const chave = `./${caminho.replace(/^\.?\//, "")}`;
  const carregar = MODULOS[chave] ?? MODULOS[`${chave}.atividade.ts`];
  if (!carregar) return null;

  const modulo = await carregar();
  return modulo.default;
}
