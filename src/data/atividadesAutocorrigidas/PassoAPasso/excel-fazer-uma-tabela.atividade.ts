import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Fazer uma tabela pequena",
  introducao: "Você vai fazer uma tabela com o nome de duas frutas e quantas frutas tem de cada uma.",
  itens: [
    {
      id: "titulos",
      titulo: "Escrever os títulos",
      passosGuiados: [
        {
          texto: "Abra o Excel com uma pasta de trabalho em branco. Você aprendeu isso no tutorial Escrever um número no Excel.",
          imagem: figura("excel-em-branco", "Tela inicial do Excel com Pasta de trabalho em branco marcada"),
        },
        {
          texto: "Clique no primeiro quadradinho, em cima, do lado esquerdo.",
          imagem: figura("excel-clique-a1", "Primeiro quadradinho da planilha marcado"),
        },
        { texto: "Digite a palavra Fruta.", imagem: figura("excel-t-fruta", "Palavra Fruta escrita no primeiro quadradinho") },
        { texto: "Aperte a tecla Tab. A borda verde vai para o lado.", imagem: figura("tecla-tab", "A tecla Tab do teclado, desenhada grande") },
        {
          texto: "Digite a palavra Quantidade.",
          imagem: figura("excel-t-quantidade", "Palavra Quantidade escrita no quadradinho do lado de Fruta"),
        },
        { texto: "Aperte a tecla Enter.", imagem: figura("tecla-enter", "A tecla Enter do teclado, desenhada grande") },
        {
          texto: "A borda verde foi para a linha de baixo, embaixo de Fruta.",
          imagem: figura("excel-t-a2", "Borda verde no quadradinho embaixo de Fruta, com as palavras linha de baixo"),
        },
      ],
    },
    {
      id: "frutas",
      titulo: "Escrever as frutas",
      passosGuiados: [
        { texto: "Digite a palavra Maçã.", imagem: figura("excel-t-maca", "Palavra Maçã escrita embaixo de Fruta") },
        { texto: "Aperte a tecla Tab. A borda verde vai para o lado.", imagem: figura("tecla-tab", "A tecla Tab do teclado, desenhada grande") },
        { texto: "Digite o número 5.", imagem: figura("excel-t-5", "Número 5 escrito embaixo de Quantidade") },
        { texto: "Aperte a tecla Enter.", imagem: figura("tecla-enter", "A tecla Enter do teclado, desenhada grande") },
        { texto: "Digite a palavra Banana.", imagem: figura("excel-t-banana", "Palavra Banana escrita embaixo de Maçã") },
        { texto: "Aperte a tecla Tab. A borda verde vai para o lado.", imagem: figura("tecla-tab", "A tecla Tab do teclado, desenhada grande") },
        { texto: "Digite o número 8.", imagem: figura("excel-t-8", "Número 8 escrito embaixo do 5") },
        { texto: "Aperte a tecla Enter.", imagem: figura("tecla-enter", "A tecla Enter do teclado, desenhada grande") },
        {
          texto: "Pronto! A sua tabela tem duas frutas e a quantidade de cada uma.",
          imagem: figura("excel-t-pronto", "Tabela com Fruta e Quantidade, Maçã 5 e Banana 8, e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
