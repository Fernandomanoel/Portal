/**
 * Comparação usada na correção automática das dissertativas (ver
 * `PerguntaDissertativaAuto` em `src/types/quiz.ts`). Importado tanto pelo
 * servidor (corrige de verdade) quanto pela área do professor (mostra por
 * que uma resposta caiu em "a revisar").
 */

/** Ignora maiúsculas/minúsculas, acentos e espaço extra nas duas pontas. */
export function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

/** A resposta do aluno conta como certa se contiver alguma das variantes aceitas. */
export function respostaAceita(resposta: string, aceitas: string[]): boolean {
  const normalizada = normalizarTexto(resposta);
  return normalizada.length > 0 && aceitas.some((aceita) => normalizada.includes(normalizarTexto(aceita)));
}

/** Tira comentários para o aluno não passar numa verificação só escrevendo a resposta num `//`. */
function semComentarios(codigo: string): string {
  return codigo.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/.*$/gm, "$1");
}

/** Resultado de cada verificação do código, na ordem em que foram declaradas. */
export function verificarCodigo(codigo: string, verificacoes: { descricao: string; padrao: string }[]): { descricao: string; ok: boolean }[] {
  const limpo = semComentarios(codigo);
  return verificacoes.map(({ descricao, padrao }) => ({ descricao, ok: new RegExp(padrao).test(limpo) }));
}
