import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Apresentar os slides",
  introducao: "Você vai mostrar os slides na tela inteira, como numa apresentação de verdade.",
  itens: [
    {
      id: "comecar",
      titulo: "Começar",
      passosGuiados: [
        {
          texto: "Abra o PowerPoint e escreva o título e o seu nome. Você aprendeu isso no tutorial Escrever o subtítulo.",
          textoNarrado: "Abra o Páuer-póint e escreva o título e o seu nome. Você aprendeu isso no tutorial Escrever o subtítulo.",
          imagem: figura("ppt-sub-pronto", "Slide com o título Meu primeiro slide e o nome Ana Souza embaixo"),
        },
        {
          texto: "Aperte a tecla F5. Ela fica na fileira de cima do teclado.",
          textoNarrado: "Aperte a tecla F cinco. Ela fica na fileira de cima do teclado.",
          imagem: figura("tecla-f5", "Fileira de cima do teclado com a tecla F5 marcada"),
        },
        {
          texto: "O slide ocupou a tela inteira.",
          imagem: figura("ppt-ap-tela-cheia", "Slide ocupando a tela inteira"),
        },
        {
          texto: "Para ir ao próximo slide, aperte a seta para a direita ou clique com o mouse.",
          imagem: figura("ppt-ap-proximo", "Tecla da seta para a direita ou o mouse: próximo slide"),
        },
      ],
    },
    {
      id: "sair",
      titulo: "Sair",
      passosGuiados: [
        {
          texto: "Para sair, aperte a tecla Esc. Ela fica no canto de cima, do lado esquerdo.",
          textoNarrado: "Para sair, aperte a tecla ésqui. Ela fica no canto de cima, do lado esquerdo.",
          imagem: figura("tecla-esc", "Fileira de cima do teclado com a tecla Esc marcada"),
        },
        {
          texto: "Você voltou para o PowerPoint. Pronto!",
          textoNarrado: "Você voltou para o Páuer-póint. Pronto!",
          imagem: figura("ppt-ap-pronto", "PowerPoint de volta ao normal e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
