import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Calcular a média",
  introducao:
    "Você vai calcular a média de três notas. A média soma as notas e divide pela quantidade de notas: 6 + 8 + 10 = 24, e 24 dividido por 3 = 8.",
  itens: [
    {
      id: "notas",
      titulo: "Escrever as notas",
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
          texto: "Digite 6 e aperte Enter. Digite 8 e aperte Enter. Digite 10 e aperte Enter.",
          imagem: figura("excel-md-valores", "Notas 6, 8 e 10, uma embaixo da outra"),
        },
        {
          texto: "A borda verde precisa ficar no quadradinho vazio embaixo do 10. Se não estiver, clique nele.",
          imagem: figura("excel-md-clique-a4", "Quadradinho vazio embaixo do 10 marcado"),
        },
      ],
    },
    {
      id: "media",
      titulo: "Escrever a média",
      passosGuiados: [
        {
          texto: "Digite =MÉDIA( . Não esqueça o acento no É e o parêntese no fim.",
          textoNarrado: "Digite: igual, a palavra média, e abre parêntese. Não esqueça o acento no É.",
          imagem: figura("excel-md-inicio", "Começo da fórmula =MÉDIA( escrito"),
        },
        {
          texto: "Segure o botão esquerdo do mouse em cima do 6 e arraste até o 10. Solte o botão.",
          imagem: figura("excel-md-intervalo", "Notas 6, 8 e 10 dentro de um tracejado e a fórmula =MÉDIA(A1:A3"),
        },
        {
          texto: "Digite ) para fechar o parêntese.",
          textoNarrado: "Digite fecha parêntese.",
          imagem: figura("excel-md-fechar", "Fórmula completa =MÉDIA(A1:A3)"),
        },
        { texto: "Aperte a tecla Enter.", imagem: figura("tecla-enter", "A tecla Enter do teclado, desenhada grande") },
        {
          texto: "A média das notas é 8. Pronto!",
          textoNarrado: "A média das notas é oito. Pronto!",
          imagem: figura("excel-md-resultado", "Resultado 8 embaixo das notas e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
