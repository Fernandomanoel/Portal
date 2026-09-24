import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Colocar o nome no meio da folha",
  introducao: "Você vai mudar o seu nome de lugar: para o meio e para o lado direito da folha.",
  itens: [
    {
      id: "olhar",
      titulo: "Olhar o nome",
      passosGuiados: [
        {
          texto: "Abra o Word e escreva o seu nome. Você aprendeu isso no tutorial Abrir o Word e escrever seu nome.",
          imagem: figura("word-nome-pronto", "Folha do Word com o nome Ana Souza escrito"),
        },
        {
          texto: "Olhe o seu nome. Ele está do lado esquerdo da folha.",
          imagem: figura("word-nome-esquerda", "Nome Ana Souza do lado esquerdo da folha, com as palavras lado esquerdo"),
        },
        {
          texto: "Clique uma vez em cima do seu nome.",
          imagem: figura("word-clique-nome", "Nome Ana Souza marcado e o mouse com o botão esquerdo pintado"),
        },
      ],
    },
    {
      id: "mudar",
      titulo: "Mudar de lugar",
      passosGuiados: [
        {
          texto: "Clique no botão com os riscos no meio. Ele fica em cima, na faixa do Word.",
          imagem: figura("word-clique-centro", "Botão Centralizar marcado na faixa do Word"),
        },
        {
          texto: "O nome foi para o meio da folha.",
          imagem: figura("word-centro", "Nome Ana Souza no meio da folha, com as palavras no meio"),
        },
        {
          texto: "Agora clique no botão com os riscos do lado direito.",
          imagem: figura("word-clique-direita", "Botão Alinhar à direita marcado na faixa do Word"),
        },
        {
          texto: "O nome foi para o lado direito da folha.",
          imagem: figura("word-direita", "Nome Ana Souza do lado direito da folha, com as palavras lado direito"),
        },
        {
          texto: "Clique de novo no botão com os riscos no meio.",
          imagem: figura("word-clique-centro-2", "Botão Centralizar marcado de novo na faixa do Word"),
        },
        {
          texto: "Pronto! O seu nome está no meio da folha.",
          imagem: figura("word-centro-pronto", "Nome Ana Souza no meio da folha e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
