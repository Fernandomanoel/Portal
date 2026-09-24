import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Trocar a tela de fundo",
  introducao: "Você vai trocar a imagem que aparece atrás dos ícones da área de trabalho.",
  itens: [
    {
      id: "abrir",
      titulo: "Abrir Personalizar",
      passosGuiados: [
        {
          texto: "Clique com o botão direito do mouse num lugar vazio da área de trabalho.",
          imagem: figura("win-botao-direito-desktop", "Lugar vazio da área de trabalho marcado e o mouse com o botão direito pintado"),
        },
        {
          texto: "Abriu uma lista. Clique em Personalizar.",
          imagem: figura("win-menu-personalizar", "Lista do botão direito com Personalizar marcado"),
        },
        {
          texto: "Abriu a janela Configurações. Clique em Tela de fundo.",
          imagem: figura("win-config-personalizacao", "Janela Configurações com Tela de fundo marcado"),
        },
      ],
    },
    {
      id: "escolher",
      titulo: "Escolher a imagem",
      passosGuiados: [
        {
          texto: "Clique numa das imagens. Nesta, clique na imagem laranja.",
          imagem: figura("win-config-fotos", "Quatro imagens para escolher, com a imagem laranja marcada"),
        },
        {
          texto: "A tela de fundo mudou. Pronto!",
          imagem: figura("win-fundo-novo", "Área de trabalho com a imagem laranja no fundo e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
