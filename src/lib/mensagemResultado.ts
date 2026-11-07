import { NOTA_APROVACAO } from "@/types/quiz";

export interface DadosMensagem {
  curso: string;
  /** dd/mm */
  data: string;
  nota: number;
  genero: "aluna" | "aluno";
  /** Frase livre sobre o desempenho; vazia, a mensagem sai sem ela. */
  observacao: string;
}

export const aprovada = (nota: number) => nota >= NOTA_APROVACAO;

const notaTexto = (n: number) => n.toFixed(1);

/** A observação entra no fim da frase: sem ponto final duplicado e sem maiúscula no começo. */
function observacaoNaFrase(texto: string) {
  const limpa = texto.trim().replace(/[.\s]+$/, "");
  if (!limpa) return "";
  return limpa.charAt(0).toLowerCase() + limpa.slice(1);
}

/** Mensagem pronta para enviar ao responsável (WhatsApp): aprovado ou reprovado conforme a nota. */
export function mensagemResultado({ curso, data, nota, genero, observacao }: DadosMensagem) {
  const ok = aprovada(nota);
  const artigo = genero === "aluna" ? "a aluna" : "o aluno";
  const final = genero === "aluna" ? "a" : "o";
  const obs = observacaoNaFrase(observacao);

  const cabecalho = [ok ? "✅ APROVADO" : "❌ REPROVADO", `Curso/Módulo ${curso.trim()}`, `Data: ${data}`, `Nota: ${notaTexto(nota)}`, "Prezado Responsável,"];

  const corpo = ok
    ? [`Com satisfação informamos que ${artigo} foi aprovad${final} na avaliação${obs ? ` ${obs}` : ""}.`, "Parabéns pelo esforço e dedicação!"]
    : [
        `Informamos que ${artigo} não atingiu a nota mínima de ${notaTexto(NOTA_APROVACAO)} na avaliação${obs ? ` ${obs}` : ""}.`,
        "Estamos à disposição para conversar sobre os próximos passos e apoiar o aprendizado. Contamos com o seu apoio!",
      ];

  return [...cabecalho, ...corpo, "Equipe Microlins Ⓜ"].join("\n");
}

/** Nota digitada à mão (aceita vírgula ou ponto); vazia ou inválida vira `null`, que a mensagem escreve como «Pendente». */
export function lerNotaLivro(texto: string): number | null {
  const n = Number(texto.trim().replace(",", "."));
  return texto.trim() !== "" && Number.isFinite(n) && n >= 0 && n <= 10 ? n : null;
}

const notaVirgula = (n: number) => n.toFixed(1).replace(".", ",");

export interface DadosHistorico {
  curso: string;
  nota: number;
  /** Nota do livro lançada na hora; sem ela, a mensagem sai com «Pendente». */
  livro: number | null;
  texto: string;
}

/** Texto inicial do histórico, que o professor ajusta: o que a pessoa fez na prova, conforme a nota. */
export function textoPadraoHistorico(nota: number, genero: "aluna" | "aluno") {
  const artigo = genero === "aluna" ? "A aluna" : "O aluno";
  return aprovada(nota)
    ? `${artigo} concluiu todas as etapas solicitadas na prova e demonstrou bom domínio do conteúdo. Parabéns!!`
    : `${artigo} não concluiu todas as etapas solicitadas na prova e precisa reforçar o conteúdo.`;
}

/** Registro para o histórico do outro sistema: módulo, nota da prova, nota do livro e um parágrafo. */
export function mensagemHistorico({ curso, nota, livro, texto }: DadosHistorico) {
  const livroTexto = livro === null ? "Pendente" : notaVirgula(livro);
  return `Módulo: ${curso.trim()}\n\nProva: ${notaVirgula(nota)}         Livro: ${livroTexto}\n\n${texto.trim()}`;
}
