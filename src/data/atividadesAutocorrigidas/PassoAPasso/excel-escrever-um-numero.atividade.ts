import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Escrever um número no Excel",
  introducao: "Você vai abrir o Excel, escolher um quadradinho e escrever um número dentro dele.",
  itens: [
    {
      id: "abrir-excel",
      titulo: "Abrir o Excel",
      passosGuiados: [
        { texto: "Clique no botão Iniciar. É o ícone com quatro quadradinhos azuis." },
        { texto: "Digite a palavra Excel no teclado." },
        { texto: "Clique no ícone verde com a letra X." },
        { texto: "Espere o Excel abrir. Isso pode demorar um pouco." },
        { texto: "Clique em Pasta de trabalho em branco." },
      ],
    },
    {
      id: "escrever-numero",
      titulo: "Escrever um número",
      passosGuiados: [
        { texto: "Veja os quadradinhos na tela. Cada quadradinho se chama célula." },
        { texto: "Clique uma vez no primeiro quadradinho, em cima, do lado esquerdo." },
        { texto: "Veja a borda verde em volta desse quadradinho. Ela mostra o quadradinho que você escolheu." },
        { texto: "Digite o número 10 no teclado.", textoNarrado: "Digite o número dez no teclado." },
        { texto: "Aperte a tecla Enter." },
        {
          texto: "O número 10 ficou no quadradinho. A borda verde desceu para o quadradinho de baixo. Pronto!",
          textoNarrado: "O número dez ficou no quadradinho. A borda verde desceu para o quadradinho de baixo. Pronto!",
        },
      ],
    },
  ],
};

export default atividade;
