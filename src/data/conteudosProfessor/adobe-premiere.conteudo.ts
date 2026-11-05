import type { ConteudoCurso } from "@/types/conteudoProfessor";
import premiere from "./premiere.conteudo";

/**
 * O curso «Adobe Premiere» e o «Premiere» compartilham a teoria de edição de
 * vídeo: o conteúdo é o mesmo, com o foco no Adobe Premiere Pro.
 */
const conteudo: ConteudoCurso = {
  ...premiere,
  resumo:
    "O Adobe Premiere Pro é um dos programas mais usados na edição profissional de vídeo. O curso apresenta o fluxo de trabalho de edição (importar, organizar, cortar, montar, ajustar áudio e cor e exportar), com os conceitos de linguagem audiovisual e as ferramentas do Premiere Pro.",
  dicas: [
    ...premiere.dicas,
    "Mostre o painel Essential Graphics (gráficos essenciais) para títulos e o Lumetri Color para a correção de cor, que são recursos específicos do Premiere Pro.",
  ],
};

export default conteudo;
