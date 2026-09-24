import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Mudar as cores do slide",
  introducao: "Você vai escolher um modelo de cores pronto para o slide ficar azul.",
  itens: [
    {
      id: "design",
      titulo: "Abrir Design",
      passosGuiados: [
        {
          texto: "Abra o PowerPoint e escreva o título e o seu nome. Você aprendeu isso no tutorial Escrever o subtítulo.",
          textoNarrado: "Abra o Páuer-póint e escreva o título e o seu nome. Você aprendeu isso no tutorial Escrever o subtítulo.",
          imagem: figura("ppt-sub-pronto", "Slide com o título Meu primeiro slide e o nome Ana Souza embaixo"),
        },
        {
          texto: "Clique na palavra Design. Ela fica em cima, na faixa do PowerPoint.",
          textoNarrado: "Clique na palavra Dizáin. Ela fica em cima, na faixa do Páuer-póint.",
          imagem: figura("ppt-ds-aba", "Aba Design marcada em cima"),
        },
        {
          texto: "Apareceram os modelos de cores. Cada quadradinho é um modelo.",
          imagem: figura("ppt-ds-modelos", "Modelos de cores mostrados na faixa, com as palavras modelos de cores"),
        },
      ],
    },
    {
      id: "escolher",
      titulo: "Escolher o modelo",
      passosGuiados: [
        {
          texto: "Clique no modelo azul.",
          imagem: figura("ppt-ds-clique-azul", "Modelo azul marcado na faixa"),
        },
        {
          texto: "O slide ficou azul. Pronto!",
          imagem: figura("ppt-ds-pronto", "Slide com fundo azul e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
