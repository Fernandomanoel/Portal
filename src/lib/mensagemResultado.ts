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
