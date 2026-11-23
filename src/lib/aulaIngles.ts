import type { TrechoLacuna } from "@/types/aulaIngles";

/** Regras de correção da aula de inglês, iguais às do HTML original (cada função indica de onde veio). */

export const preencherMensagem = (modelo: string, n: number, total: number) => modelo.replaceAll("{n}", String(n)).replaceAll("{total}", String(total));

/** Lacunas com should/shouldn't: ignora maiúsculas, espaços repetidos e o tipo de apóstrofo. */
export const normalizarModal = (texto: string) => texto.trim().toLowerCase().replace(/[’‘`]/g, "'").replace(/\s+/g, " ");

/** Frases da Practice IV: além do acima, aceita «should not»/«shouldn't», «do not»/«don't», «camomile»/«chamomile» e ignora o ponto final. */
export const normalizarFrase = (texto: string) =>
  texto
    .trim()
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/should not/g, "shouldn't")
    .replace(/do not/g, "don't")
    .replace(/camomile/g, "chamomile")
    .replace(/[.!?]+$/g, "")
    .replace(/\s+/g, " ");

/** Practice V: a palavra exata, sem maiúsculas nem espaços nas pontas. */
export const normalizarPalavra = (texto: string) => texto.trim().toLowerCase();

export function contarPalavras(texto: string): number {
  const limpo = texto.trim();
  return limpo ? limpo.split(/\s+/).length : 0;
}

export function embaralhar<T>(lista: readonly T[]): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export interface AvaliacaoCaso {
  palavras: number;
  comprimento: boolean;
  vocabulario: boolean;
  modais: boolean;
  conector: boolean;
  tudo: boolean;
}

/** Os quatro critérios da redação do Flashback (5.1), avaliados a cada tecla. */
export function avaliarCaso(texto: string, termos: readonly string[], minimoPalavras: number): AvaliacaoCaso {
  const minusculo = texto.toLowerCase().replace(/[’‘`]/g, "'");
  const palavras = contarPalavras(texto);
  const comprimento = palavras >= minimoPalavras;
  const vocabulario = termos.filter((termo) => new RegExp(`\\b${termo}\\b`, "i").test(minusculo)).length >= 2;
  const modais = /\bshould\b/.test(minusculo) && /\bshouldn't\b|\bshould not\b/.test(minusculo);
  const conector = /\bwhich\b/.test(minusculo);
  return { palavras, comprimento, vocabulario, modais, conector, tudo: comprimento && vocabulario && modais && conector };
}

export type EstadoLinha = "neutro" | "ok" | "erro";

/** Cor da questão depois de «CHECK»: neutra antes de conferir, verde se certa, vermelha se errada. */
export const estadoDe = (conferido: boolean, certo: boolean): EstadoLinha => (!conferido ? "neutro" : certo ? "ok" : "erro");

export const ehLacuna = (trecho: TrechoLacuna): trecho is Extract<TrechoLacuna, { lacuna: number }> => typeof trecho !== "string";
