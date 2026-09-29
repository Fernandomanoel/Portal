import type { ProvaInterativa } from "@/types/quiz";

/** Formatada a partir de "Atividade Prática – Segurança na Era Digital" (PDF do portal antigo): mesmo enunciado e mesmas especificações. */
const prova: ProvaInterativa = {
  tipo: "pratica",
  titulo: "Segurança na Era Digital — Atividade Prática: LGPD",
  instrucoes: [
    "Hora de colocar seus conhecimentos em prática! Você trabalha como consultor digital e precisa fazer uma pesquisa sobre a LGPD. Utilize os recursos fornecidos durante as aulas e pela internet.",
    "Passo 1 (Pesquisar · 3,0 pontos): Reúna as informações para explicar: como surgiu a necessidade da LGPD, quais os nomes de pessoas e instituições envolvidas na criação e em que ocasião ela é aplicada.",
    "Passo 2 (Documento no Word · 4,0 pontos): Elabore o documento no Word com no mínimo 2 páginas, título, alinhamento justificado e formatado. Salve como LGPD_SeuNome.docx.",
    "Passo 3 (Imagens · 2,0 pontos): Crie, pesquise e anexe pelo menos 2 imagens do seu computador para ilustrar o documento.",
    "Passo 4 (Acabamento profissional · 1,0 ponto): Deixe o documento o mais profissional possível e mostre ao seu educador antes de enviar no campo abaixo.",
  ],
  envioArquivo: {
    obrigatorio: true,
    extensoes: [".docx", ".doc"],
    rotulo: "Envie o documento do Word com a pesquisa sobre a LGPD",
  },
};

export default prova;
