import type { ImagemReferencia, ItemAtividade } from "@/types/atividadeAutocorrigida";

/**
 * Apoio das atividades de Inteligência Emocional: figuras do kit
 * (`scripts/ilustracoes/telas/inteligencia-emocional.mjs`) e um atalho para pôr figura numa pergunta.
 * Não termina em `.atividade.ts`, então o carregador não o trata como atividade.
 */
const PASTA = "/src/assets/atividades/inteligencia-emocional/";
const FIGURAS = import.meta.glob<string>("/src/assets/atividades/inteligencia-emocional/*.svg", { eager: true, import: "default" });

/** Figura pelo nome do arquivo. Nome errado quebra na hora, em vez de virar imagem vazia. */
export function figura(nome: string, alt: string, legenda?: string): ImagemReferencia {
  const url = FIGURAS[`${PASTA}${nome}.svg`];
  if (!url) throw new Error(`Figura não encontrada: ${PASTA}${nome}.svg`);
  return { url, alt, legenda };
}

export const comFigura = (item: ItemAtividade, imagem: ImagemReferencia): ItemAtividade => ({ ...item, imagem });
