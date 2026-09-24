import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Escrever um número no Excel",
  introducao: "Você vai abrir o Excel, escolher um quadradinho e escrever um número dentro dele.",
  itens: [
    {
      id: "abrir-excel",
      titulo: "Abrir o Excel",
      passosGuiados: [
        {
          texto: "Clique no botão Iniciar. É o ícone com quatro quadradinhos azuis.",
          imagem: figura("iniciar-botao", "Botão Iniciar marcado na barra de tarefas"),
        },
        { texto: "Digite a palavra Excel no teclado.", imagem: figura("excel-busca", "Menu Iniciar aberto com a palavra Excel escrita na busca") },
        {
          texto: "Clique no ícone verde com a letra X.",
          imagem: figura("excel-resultado", "Resultado da busca com o ícone verde do Excel marcado"),
        },
        { texto: "Espere o Excel abrir. Isso pode demorar um pouco.", imagem: figura("excel-abrindo", "Tela verde do Excel abrindo") },
        {
          texto: "Clique em Pasta de trabalho em branco.",
          imagem: figura("excel-em-branco", "Tela inicial do Excel com Pasta de trabalho em branco marcada"),
        },
      ],
    },
    {
      id: "escrever-numero",
      titulo: "Escrever um número",
      passosGuiados: [
        {
          texto: "Veja os quadradinhos na tela. Cada quadradinho se chama célula.",
          imagem: figura("excel-celulas", "Planilha do Excel com um quadradinho pintado de amarelo e o nome célula ao lado"),
        },
        {
          texto: "Clique uma vez no primeiro quadradinho, em cima, do lado esquerdo.",
          imagem: figura("excel-clique-a1", "Primeiro quadradinho da planilha marcado, em cima e à esquerda"),
        },
        {
          texto: "Veja a borda verde em volta desse quadradinho. Ela mostra o quadradinho que você escolheu.",
          imagem: figura("excel-a1-verde", "Primeiro quadradinho com borda verde e o nome borda verde ao lado"),
        },
        {
          texto: "Digite o número 10 no teclado.",
          textoNarrado: "Digite o número dez no teclado.",
          imagem: figura("excel-a1-10", "Primeiro quadradinho com o número 10 escrito"),
        },
        { texto: "Aperte a tecla Enter.", imagem: figura("tecla-enter", "A tecla Enter do teclado, desenhada grande") },
        {
          texto: "O número 10 ficou no quadradinho. A borda verde desceu para o quadradinho de baixo. Pronto!",
          textoNarrado: "O número dez ficou no quadradinho. A borda verde desceu para o quadradinho de baixo. Pronto!",
          imagem: figura("excel-a2-pronto", "Número 10 no primeiro quadradinho, borda verde no quadradinho de baixo e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
