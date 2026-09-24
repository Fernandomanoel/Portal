import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Somar uma coluna com a AutoSoma",
  introducao: "Você vai escrever quatro números um embaixo do outro. Depois o botão AutoSoma soma todos de uma vez.",
  itens: [
    {
      id: "numeros",
      titulo: "Escrever os números",
      passosGuiados: [
        {
          texto: "Abra o Excel com uma pasta de trabalho em branco. Você aprendeu isso no tutorial Escrever um número no Excel.",
          imagem: figura("excel-em-branco", "Tela inicial do Excel com Pasta de trabalho em branco marcada"),
        },
        {
          texto: "Clique no primeiro quadradinho, em cima, do lado esquerdo.",
          imagem: figura("excel-clique-a1", "Primeiro quadradinho da planilha marcado"),
        },
        {
          texto: "Digite 2 e aperte Enter. Digite 4 e aperte Enter. Digite 6 e aperte Enter. Digite 8 e aperte Enter.",
          imagem: figura("excel-as-valores", "Números 2, 4, 6 e 8, um embaixo do outro, e a borda verde no quadradinho de baixo"),
        },
        {
          texto: "A borda verde precisa ficar no quadradinho vazio embaixo do 8. Se não estiver, clique nele.",
          imagem: figura("excel-as-clique-a5", "Quadradinho vazio embaixo do 8 marcado"),
        },
      ],
    },
    {
      id: "somar",
      titulo: "Somar",
      passosGuiados: [
        {
          texto: "Clique no botão AutoSoma. Ele fica em cima, do lado direito da faixa.",
          textoNarrado: "Clique no botão auto soma. Ele fica em cima, do lado direito da faixa.",
          imagem: figura("excel-as-botao", "Botão AutoSoma marcado na faixa do Excel"),
        },
        {
          texto: "O Excel escreveu =SOMA(A1:A4). Quer dizer: somar do A1 até o A4. Os números ficaram dentro de um tracejado.",
          textoNarrado: "O Excel escreveu a conta SOMA, do A um até o A quatro. Os números ficaram dentro de um tracejado.",
          imagem: figura("excel-as-formula", "Fórmula =SOMA(A1:A4) escrita e os quatro números dentro de um tracejado"),
        },
        { texto: "Aperte a tecla Enter.", imagem: figura("tecla-enter", "A tecla Enter do teclado, desenhada grande") },
        {
          texto: "O Excel somou: 2 + 4 + 6 + 8 = 20. Pronto!",
          textoNarrado: "O Excel somou: dois mais quatro mais seis mais oito é igual a vinte. Pronto!",
          imagem: figura("excel-as-resultado", "Resultado 20 embaixo dos números e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
