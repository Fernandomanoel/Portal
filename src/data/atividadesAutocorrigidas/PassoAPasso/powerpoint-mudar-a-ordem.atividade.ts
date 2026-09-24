import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Mudar a ordem dos slides",
  introducao: "Você vai pegar o último slide e colocar ele em primeiro lugar.",
  itens: [
    {
      id: "olhar",
      titulo: "Olhar os slides",
      passosGuiados: [
        {
          texto: "Faça uma apresentação com três slides. Use o botão Novo Slide para criar mais slides.",
          imagem: figura("ppt-ns-botao", "Botão Novo Slide marcado na faixa do PowerPoint"),
        },
        {
          texto: "Olhe do lado esquerdo. Os slides pequenos estão em ordem: 1, 2 e 3.",
          textoNarrado: "Olhe do lado esquerdo. Os slides pequenos estão em ordem: um, dois e três.",
          imagem: figura("ppt-or-olhe", "Três miniaturas de slide do lado esquerdo, com as palavras slides 1, 2 e 3"),
        },
      ],
    },
    {
      id: "arrastar",
      titulo: "Arrastar o slide",
      passosGuiados: [
        {
          texto: "Segure o botão esquerdo do mouse em cima do slide 3. Não solte.",
          textoNarrado: "Segure o botão esquerdo do mouse em cima do slide três. Não solte.",
          imagem: figura("ppt-or-segure", "Miniatura do slide 3 marcada e o mouse com o botão esquerdo pintado"),
        },
        {
          texto: "Arraste para cima, até antes do slide 1. Agora solte o botão.",
          textoNarrado: "Arraste para cima, até antes do slide um. Agora solte o botão.",
          imagem: figura("ppt-or-arraste", "Seta mostrando o slide 3 sendo arrastado para cima do slide 1"),
        },
        {
          texto: "O slide azul agora é o primeiro. Pronto!",
          imagem: figura("ppt-or-pronto", "Miniatura azul em primeiro lugar e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
