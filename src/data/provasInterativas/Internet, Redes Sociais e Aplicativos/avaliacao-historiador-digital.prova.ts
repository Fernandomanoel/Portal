import type { ProvaInterativa } from "@/types/quiz";

/** Formatada a partir de "Avaliação Prática – Internet, Redes Sociais e Aplicativos" (PDF do portal antigo, versão 1): mesmo enunciado e mesmas especificações. */
const prova: ProvaInterativa = {
  tipo: "pratica",
  titulo: "Internet, Redes Sociais e Aplicativos — Avaliação Prática: Historiador Digital",
  instrucoes: [
    "Hora de colocar seus conhecimentos em prática! Você trabalha como historiador digital e precisa fazer uma pequena pesquisa sobre o início das redes sociais. Utilize os recursos fornecidos durante as aulas e pela internet.",
    "Passo 1 (Pesquisar · 2,0 pontos): Pesquise e reúna as informações para explicar: como surgiram as redes sociais, quais os nomes e pessoas envolvidas na criação, redes que não existem mais e as mais utilizadas atualmente.",
    "Passo 2 (Documento no Word · 4,0 pontos): Elabore o documento no Word com no mínimo 2 páginas, título, alinhamento justificado e formatado. Salve como Redes_SeuNome.docx.",
    "Passo 3 (Imagens · 2,0 pontos): Crie, pesquise e anexe pelo menos 2 imagens do seu computador para ilustrar o documento.",
    "Passo 4 (Enviar por e-mail · 2,0 pontos): Ao término, seu educador fornecerá um e-mail. Envie a pesquisa anexada, usando o assunto \"AVALIAÇÃO REDES SOCIAIS - SEU NOME\". Depois, envie o mesmo documento no campo abaixo.",
  ],
  envioArquivo: {
    obrigatorio: true,
    extensoes: [".docx", ".doc"],
    rotulo: "Envie o documento do Word com a pesquisa",
  },
};

export default prova;
