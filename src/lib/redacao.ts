/**
 * Métricas que o aluno vê enquanto escreve a redação (TOEFL/IELTS). Não é
 * nota: o examinador corrige por critérios, e nenhuma conta substitui isso. As
 * métricas apontam o que dá para conferir sozinho — tamanho, organização,
 * conectivos, repetição e informalidade.
 */

/** Conectivos e marcadores de coesão mais usados em redação acadêmica. */
export const CONECTIVOS = [
  "however",
  "moreover",
  "furthermore",
  "in addition",
  "additionally",
  "therefore",
  "consequently",
  "as a result",
  "thus",
  "hence",
  "for example",
  "for instance",
  "such as",
  "to illustrate",
  "on the other hand",
  "in contrast",
  "by contrast",
  "nevertheless",
  "nonetheless",
  "although",
  "even though",
  "whereas",
  "while",
  "despite",
  "in spite of",
  "firstly",
  "secondly",
  "finally",
  "in conclusion",
  "to conclude",
  "to sum up",
  "overall",
  "similarly",
  "likewise",
  "in particular",
  "because",
  "since",
  "not only",
  "as well as",
  "meanwhile",
  "instead",
  "indeed",
  "admittedly",
  "above all",
  "in my view",
  "in my opinion",
  "this means that",
  "as a consequence",
  "due to",
  "owing to",
] as const;

/** Palavras e expressões informais que perdem ponto em texto acadêmico. */
const INFORMAIS = ["gonna", "wanna", "gotta", "kinda", "sorta", "stuff", "kids", "guys", "cool", "awesome", "okay", "ok", "lots of", "a lot of", "pretty much", "nowadays people"];

/** Palavras curtas e funcionais que não contam como repetição. */
const FUNCIONAIS = new Set(
  "that this these those with have from they their there which would could should about what when where will been were more also than them then into some such only other very most many much your just because being does each make made over even after while those both".split(" "),
);

export interface AnaliseRedacao {
  palavras: number;
  palavrasDiferentes: number;
  paragrafos: number;
  frases: number;
  mediaPorFrase: number;
  conectivos: string[];
  contracoes: string[];
  informais: string[];
  repetidas: { palavra: string; vezes: number }[];
  frasesLongas: number;
}

const PALAVRA = /[A-Za-zÀ-ÿ0-9]+(?:['’-][A-Za-zÀ-ÿ0-9]+)*/g;
const CONTRACAO = /\b(?:\w+n['’]t|\w+['’](?:re|ve|ll|m|d)|(?:it|that|there|what|let|he|she|who)['’]s)\b/gi;

function ocorrencias(texto: string, termo: string): boolean {
  return new RegExp(`(?:^|[^a-z])${termo.replace(/ /g, "\\s+")}(?:[^a-z]|$)`, "i").test(texto);
}

export function contarPalavras(texto: string): number {
  return (texto.match(PALAVRA) ?? []).length;
}

export function analisarRedacao(texto: string): AnaliseRedacao {
  const palavras = texto.match(PALAVRA) ?? [];
  const minusculas = palavras.map((p) => p.toLowerCase().replace(/’/g, "'"));
  const frasesTexto = texto
    .split(/(?<=[.!?])\s+|\n+/)
    .map((f) => f.trim())
    .filter((f) => contarPalavras(f) > 0);
  const contagem = new Map<string, number>();
  for (const p of minusculas) {
    if (p.length < 4 || FUNCIONAIS.has(p)) continue;
    contagem.set(p, (contagem.get(p) ?? 0) + 1);
  }
  // Em texto curto, 3 vezes já chama atenção; em 250+ palavras, só a partir de 4.
  const limiteRepeticao = palavras.length >= 200 ? 4 : 3;

  return {
    palavras: palavras.length,
    palavrasDiferentes: new Set(minusculas).size,
    paragrafos: texto.split(/\n+/).filter((linha) => contarPalavras(linha) > 0).length,
    frases: frasesTexto.length,
    mediaPorFrase: frasesTexto.length ? Math.round(palavras.length / frasesTexto.length) : 0,
    conectivos: CONECTIVOS.filter((c) => ocorrencias(texto, c)),
    contracoes: [...new Set((texto.match(CONTRACAO) ?? []).map((c) => c.toLowerCase()))],
    informais: INFORMAIS.filter((i) => ocorrencias(texto, i)),
    repetidas: [...contagem.entries()]
      .filter(([, vezes]) => vezes >= limiteRepeticao)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([palavra, vezes]) => ({ palavra, vezes })),
    frasesLongas: frasesTexto.filter((f) => contarPalavras(f) > 40).length,
  };
}

/** "mm:ss" para o cronômetro. */
export function formatarTempo(segundos: number): string {
  const s = Math.max(0, Math.round(segundos));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}
