import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Colocar um retângulo no slide",
  introducao: "Você vai desenhar um retângulo azul no slide.",
  itens: [
    {
      id: "inserir",
      titulo: "Escolher a forma",
      passosGuiados: [
        {
          texto: "Abra o PowerPoint e escreva o título e o seu nome. Você aprendeu isso no tutorial Escrever o subtítulo.",
          textoNarrado: "Abra o Páuer-póint e escreva o título e o seu nome. Você aprendeu isso no tutorial Escrever o subtítulo.",
          imagem: figura("ppt-sub-pronto", "Slide com o título Meu primeiro slide e o nome Ana Souza embaixo"),
        },
        {
          texto: "Clique na palavra Inserir. Ela fica em cima, na faixa do PowerPoint.",
          textoNarrado: "Clique na palavra Inserir. Ela fica em cima, na faixa do Páuer-póint.",
          imagem: figura("ppt-fm-aba", "Aba Inserir marcada em cima"),
        },
        { texto: "Clique no botão Formas.", imagem: figura("ppt-fm-formas", "Botão Formas marcado na faixa") },
        {
          texto: "Abriu uma lista de formas. Clique no retângulo. É o primeiro desenho.",
          imagem: figura("ppt-fm-retangulo", "Lista de formas aberta com o retângulo marcado"),
        },
      ],
    },
    {
      id: "desenhar",
      titulo: "Desenhar",
      passosGuiados: [
        {
          texto: "Segure o botão esquerdo do mouse no slide e arraste para baixo e para a direita. Depois solte o botão.",
          imagem: figura("ppt-fm-arrastar", "Ponto de começo marcado no slide e uma seta mostrando o arrasto até o canto"),
        },
        {
          texto: "Apareceu um retângulo azul no slide. Pronto!",
          imagem: figura("ppt-fm-pronto", "Retângulo azul no slide e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
