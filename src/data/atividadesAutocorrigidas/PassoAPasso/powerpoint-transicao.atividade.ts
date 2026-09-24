import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Colocar uma transição",
  introducao: "Transição é o jeito que um slide aparece quando troca para o próximo. Você vai escolher a transição Esmaecer: o slide aparece devagar.",
  itens: [
    {
      id: "transicoes",
      titulo: "Abrir Transições",
      passosGuiados: [
        {
          texto: "Abra o PowerPoint e escreva o título e o seu nome. Você aprendeu isso no tutorial Escrever o subtítulo.",
          textoNarrado: "Abra o Páuer-póint e escreva o título e o seu nome. Você aprendeu isso no tutorial Escrever o subtítulo.",
          imagem: figura("ppt-sub-pronto", "Slide com o título Meu primeiro slide e o nome Ana Souza embaixo"),
        },
        {
          texto: "Clique na palavra Transições. Ela fica em cima, na faixa do PowerPoint.",
          textoNarrado: "Clique na palavra Transições. Ela fica em cima, na faixa do Páuer-póint.",
          imagem: figura("ppt-tr-aba", "Aba Transições marcada em cima"),
        },
        {
          texto: "Apareceram os jeitos de trocar de slide.",
          imagem: figura("ppt-tr-olhe", "Tipos de transição mostrados na faixa, com as palavras jeitos de trocar"),
        },
      ],
    },
    {
      id: "escolher",
      titulo: "Escolher Esmaecer",
      passosGuiados: [
        { texto: "Clique em Esmaecer.", imagem: figura("ppt-tr-esmaecer", "Transição Esmaecer marcada na faixa") },
        {
          texto: "Apareceu uma estrelinha do lado do slide pequeno. Ela mostra que o slide tem transição. Pronto!",
          imagem: figura("ppt-tr-pronto", "Estrelinha do lado da miniatura do slide, com as palavras marca da transição, e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
