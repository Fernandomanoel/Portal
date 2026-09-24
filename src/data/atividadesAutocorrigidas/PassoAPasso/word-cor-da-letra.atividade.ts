import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";
import { PREPARAR_NOME_NO_WORD } from "./passosComuns";

const atividade: AtividadeAutocorrigida = {
  titulo: "Mudar a cor da letra",
  introducao: "Você vai pintar o seu nome de azul.",
  itens: [
    { id: "marcar-nome", titulo: "Marcar o seu nome", passosGuiados: PREPARAR_NOME_NO_WORD },
    {
      id: "cor",
      titulo: "Escolher a cor",
      passosGuiados: [
        {
          texto: "Clique no botão da letra A com um risco colorido embaixo.",
          imagem: figura("word-clique-cor", "Botão da cor da letra marcado na faixa do Word"),
        },
        {
          texto: "Abriram os quadradinhos de cor. Clique no quadradinho azul.",
          imagem: figura("word-paleta-azul", "Quadradinhos de cor abertos com o azul marcado"),
        },
        {
          texto: "O seu nome ficou azul.",
          imagem: figura("word-azul", "Nome Ana Souza com a letra azul, ainda marcado"),
        },
        {
          texto: "Clique num lugar vazio da folha para tirar a marcação.",
          imagem: figura("word-azul-clique-vazio", "Lugar vazio da folha marcado e o mouse com o botão esquerdo pintado"),
        },
        {
          texto: "Pronto! O seu nome está azul.",
          imagem: figura("word-azul-pronto", "Nome Ana Souza com a letra azul e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
