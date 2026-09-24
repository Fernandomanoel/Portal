import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Usar a fórmula SE",
  introducao:
    "A fórmula SE faz uma pergunta e escolhe a resposta. Você vai perguntar: a nota é 6 ou mais? Se sim, o Excel escreve Passou. Se não, escreve Estudar mais.",
  itens: [
    {
      id: "nota",
      titulo: "Escrever a nota",
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
          texto: "Digite a nota 7 e aperte Enter.",
          imagem: figura("excel-se-nota", "Nota 7 no primeiro quadradinho, com a palavra nota ao lado"),
        },
        {
          texto: "Clique no quadradinho do lado da nota. O nome dele é B1.",
          textoNarrado: "Clique no quadradinho do lado da nota. O nome dele é B um.",
          imagem: figura("excel-se-clique-b1", "Quadradinho B1, do lado da nota, marcado"),
        },
      ],
    },
    {
      id: "formula",
      titulo: "Escrever a fórmula",
      passosGuiados: [
        {
          texto: "Digite =SE(A1>=6; . O sinal >= quer dizer maior ou igual. O ; é a tecla do lado da letra Ç.",
          textoNarrado:
            "Digite: igual, SE, abre parêntese, A um, maior, igual, seis, ponto e vírgula. Maior e igual juntos querem dizer: seis ou mais. O ponto e vírgula fica do lado da letra cê cedilha.",
          imagem: figura("excel-se-pergunta", "Começo da fórmula =SE(A1>=6; escrito no B1"),
        },
        {
          texto: 'Digite "Passou"; . Segure Shift e aperte a tecla do lado esquerdo do número 1 para fazer as aspas.',
          textoNarrado:
            "Digite: aspas, a palavra Passou, aspas, ponto e vírgula. Para fazer as aspas, segure Shift e aperte a tecla do lado esquerdo do número um.",
          imagem: figura("excel-se-passou", "Fórmula com a resposta Passou escrita"),
        },
        {
          texto: 'Digite "Estudar mais") para terminar.',
          textoNarrado: "Digite: aspas, Estudar mais, aspas, fecha parêntese.",
          imagem: figura("excel-se-estudar", "Fórmula completa =SE(A1>=6;\"Passou\";\"Estudar mais\")"),
        },
        { texto: "Aperte a tecla Enter.", imagem: figura("tecla-enter", "A tecla Enter do teclado, desenhada grande") },
        {
          texto: "A nota é 7. Sete é 6 ou mais, então o Excel escreveu Passou.",
          textoNarrado: "A nota é sete. Sete é seis ou mais, então o Excel escreveu Passou.",
          imagem: figura("excel-se-resultado", "Palavra Passou no B1 e um sinal verde de certo"),
        },
      ],
    },
    {
      id: "trocar",
      titulo: "Trocar a nota",
      passosGuiados: [
        {
          texto: "Clique na nota 7, digite 4 e aperte Enter.",
          textoNarrado: "Clique na nota sete, digite quatro e aperte Enter.",
          imagem: figura("excel-se-nota-4", "Nota 4 no primeiro quadradinho e Estudar mais do lado, com as palavras mudou sozinho"),
        },
        {
          texto: "A nota é 4. Quatro é menos que 6, então o Excel escreveu Estudar mais. Pronto!",
          textoNarrado: "A nota é quatro. Quatro é menos que seis, então o Excel escreveu Estudar mais. Pronto!",
          imagem: figura("excel-se-pronto", "Estudar mais no B1 e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
