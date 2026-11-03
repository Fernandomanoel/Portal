import type { Campo, ImagemReferencia, ItemAtividade } from "@/types/atividadeAutocorrigida";

/**
 * Apoio das atividades de Contabilidade: figuras (prints da própria planilha, gerados por
 * `scripts/planilhas/prints_contabilidade.py`) e montadores de campo. Não termina em
 * `.atividade.ts`, então o carregador não o trata como atividade.
 */
const PASTA = "/src/assets/atividades/contabilidade/";
const PRINTS = import.meta.glob<string>("/src/assets/atividades/contabilidade/*.png", { eager: true, import: "default" });

/** Print da planilha pelo nome do arquivo. Nome errado quebra na hora, em vez de virar imagem vazia. */
export function print(nome: string, alt: string, legenda?: string): ImagemReferencia {
  const url = PRINTS[`${PASTA}${nome}.png`];
  if (!url) throw new Error(`Print não encontrado: ${PASTA}${nome}.png`);
  return { url, alt, legenda };
}

export const planilhaDe = (arquivo: string, descricao: string): NonNullable<ItemAtividade["download"]> => ({
  url: `/atividades/contabilidade/${arquivo}`,
  nome: arquivo,
  rotulo: "Baixar planilha",
  descricao,
});

export function numero(id: string, rotulo: string, esperado: number, explicacao: string, tolerancia = 0.01): Campo {
  return {
    id,
    rotulo,
    placeholder: "Digite o valor (ex.: 1250,50)",
    regra: { tipo: "numero", esperado, tolerancia },
    mensagemCerta: `Isso mesmo! ${explicacao}`,
    mensagemErrada: `Ainda não. ${explicacao}`,
  };
}

export function escolher(id: string, rotulo: string, opcoes: string[], correta: number, explicacao: string): Campo {
  return {
    id,
    rotulo,
    regra: { tipo: "multipla_escolha", opcoes, correta },
    mensagemCerta: `Isso mesmo! ${explicacao}`,
    mensagemErrada: `Ainda não. ${explicacao}`,
  };
}

export function sintetica(id: string, rotulo: string, esperado: "S" | "A", explicacao: string): Campo {
  return {
    id,
    rotulo,
    regra: {
      tipo: "selecao",
      opcoes: [
        { valor: "S", texto: "S — Sintética" },
        { valor: "A", texto: "A — Analítica" },
      ],
      esperado,
    },
    mensagemCerta: `Isso mesmo! ${explicacao}`,
    mensagemErrada: `Ainda não. ${explicacao}`,
  };
}
