import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Abrir e fechar uma janela",
  introducao: "Você vai abrir uma janela, esconder a janela e depois fechar a janela.",
  itens: [
    {
      id: "abrir",
      titulo: "Abrir a janela",
      passosGuiados: [
        {
          texto: "Olhe a barra de baixo da tela. Ache o ícone da pasta amarela.",
          imagem: figura("win-barra-pasta-amarela", "Área de trabalho com a pasta amarela da barra de tarefas indicada"),
        },
        {
          texto: "Clique uma vez na pasta amarela com o botão esquerdo do mouse.",
          imagem: figura("win-clique-pasta-amarela", "Pasta amarela da barra de tarefas marcada e o mouse com o botão esquerdo pintado"),
        },
        {
          texto: "Abriu uma janela. O nome dela é Explorador de Arquivos.",
          imagem: figura("win-explorador-aberto", "Janela do Explorador de Arquivos aberta"),
        },
      ],
    },
    {
      id: "botoes",
      titulo: "Os três botões",
      passosGuiados: [
        {
          texto: "Olhe o canto de cima, do lado direito da janela. Tem três botões: Minimizar, Maximizar e Fechar.",
          imagem: figura("win-tres-botoes", "Os três botões da janela desenhados grandes: Minimizar, Maximizar e Fechar"),
        },
        {
          texto: "Clique no botão Minimizar. É o botão com um risco.",
          imagem: figura("win-clique-minimizar", "Botão Minimizar marcado no canto da janela"),
        },
        {
          texto: "A janela sumiu da tela, mas não fechou. Ela está escondida na pasta amarela.",
          imagem: figura("win-janela-na-barra", "Área de trabalho com um risquinho azul embaixo da pasta amarela"),
        },
        {
          texto: "Clique de novo na pasta amarela. A janela volta para a tela.",
          imagem: figura("win-clique-pasta-amarela-2", "Pasta amarela da barra de tarefas marcada de novo"),
        },
      ],
    },
    {
      id: "fechar",
      titulo: "Fechar a janela",
      passosGuiados: [
        {
          texto: "Clique no X, no canto de cima do lado direito. É o botão Fechar.",
          imagem: figura("win-clique-fechar", "Botão Fechar, com o X, marcado no canto da janela"),
        },
        {
          texto: "A janela fechou. Pronto!",
          imagem: figura("win-desktop-certo", "Área de trabalho vazia com um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
