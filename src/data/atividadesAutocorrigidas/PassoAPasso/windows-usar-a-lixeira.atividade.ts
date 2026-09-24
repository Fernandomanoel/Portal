import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Usar a Lixeira",
  introducao: "Você vai criar uma pasta, mandar a pasta para a Lixeira e depois trazer a pasta de volta.",
  itens: [
    {
      id: "criar-pasta",
      titulo: "Criar uma pasta para treinar",
      passosGuiados: [
        {
          texto: "Olhe a tela com o fundo e os ícones. Essa tela se chama área de trabalho.",
          imagem: figura("win-area-de-trabalho", "Área de trabalho azul do Windows com o nome Área de trabalho escrito no meio"),
        },
        {
          texto: "Clique com o botão direito do mouse em um lugar vazio da área de trabalho.",
          imagem: figura("win-botao-direito-desktop", "Área de trabalho azul com um lugar vazio marcado e o botão direito do mouse pintado"),
        },
        {
          texto: "Um menu apareceu. Coloque a seta do mouse em cima da palavra Novo.",
          imagem: figura("win-menu-novo", "Menu aberto na área de trabalho com a palavra Novo marcada"),
        },
        { texto: "Clique na palavra Pasta.", imagem: figura("win-menu-pasta", "Menu Novo aberto com a palavra Pasta marcada") },
        {
          texto: "Digite o nome TREINO no teclado.",
          textoNarrado: "Digite a palavra treino no teclado.",
          imagem: figura("win-pasta-treino-nome", "Pasta nova na área de trabalho com o nome TREINO sendo escrito"),
        },
        { texto: "Aperte a tecla Enter.", imagem: figura("tecla-enter", "A tecla Enter do teclado, desenhada grande") },
      ],
    },
    {
      id: "mandar-para-lixeira",
      titulo: "Mandar a pasta para a Lixeira",
      passosGuiados: [
        {
          texto: "Clique uma vez na pasta TREINO.",
          textoNarrado: "Clique uma vez na pasta treino.",
          imagem: figura("win-pasta-treino-clique", "Pasta TREINO marcada na área de trabalho, com o botão esquerdo do mouse pintado"),
        },
        {
          texto: "Aperte a tecla Delete. Em alguns teclados ela tem o nome Del.",
          textoNarrado: "Aperte a tecla Delete. Em alguns teclados ela tem o nome Dél.",
          imagem: figura("tecla-delete", "A tecla Delete do teclado, desenhada grande"),
        },
        {
          texto: "A pasta sumiu da área de trabalho. Ela foi para a Lixeira.",
          imagem: figura("win-pasta-sumiu", "Lugar vazio onde estava a pasta, com uma seta até o ícone da Lixeira"),
        },
        {
          texto: "Procure na área de trabalho o ícone da Lixeira. É o desenho de um cesto de lixo.",
          imagem: figura("win-lixeira-icone", "Ícone da Lixeira no canto de cima da área de trabalho, com o nome Lixeira ao lado"),
        },
        {
          texto: "Clique duas vezes na Lixeira para abrir.",
          imagem: figura("win-lixeira-dois-cliques", "Ícone da Lixeira marcado, com o aviso de dois cliques"),
        },
        {
          texto: "Veja: a pasta TREINO está aqui dentro.",
          textoNarrado: "Veja: a pasta treino está aqui dentro.",
          imagem: figura("win-lixeira-com-treino", "Janela da Lixeira com a pasta TREINO dentro e um sinal verde de certo"),
        },
      ],
    },
    {
      id: "trazer-de-volta",
      titulo: "Trazer a pasta de volta",
      passosGuiados: [
        {
          texto: "Clique com o botão direito do mouse na pasta TREINO.",
          textoNarrado: "Clique com o botão direito do mouse na pasta treino.",
          imagem: figura("win-lixeira-botao-direito", "Pasta TREINO marcada na Lixeira, com o botão direito do mouse pintado"),
        },
        {
          texto: "Clique na palavra Restaurar.",
          imagem: figura("win-lixeira-restaurar", "Menu aberto sobre a pasta TREINO com a palavra Restaurar marcada"),
        },
        {
          texto: "A pasta voltou para a área de trabalho. Pronto!",
          imagem: figura("win-treino-de-volta", "Pasta TREINO de volta na área de trabalho e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
