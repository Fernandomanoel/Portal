import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Deixar o título com letra grossa",
  introducao: "Você vai deixar as palavras Fruta e Quantidade com letra grossa, para ficarem diferentes do resto da tabela.",
  itens: [
    {
      id: "fruta",
      titulo: "Fruta com letra grossa",
      passosGuiados: [
        {
          texto: "Faça a tabela de frutas. Você aprendeu isso no tutorial Fazer uma tabela pequena.",
          imagem: figura("excel-t-pronto", "Tabela com Fruta e Quantidade, Maçã 5 e Banana 8"),
        },
        {
          texto: "Clique no quadradinho da palavra Fruta.",
          imagem: figura("excel-n-clique-a1", "Quadradinho da palavra Fruta marcado"),
        },
        {
          texto: "Clique no botão N. Ele fica em cima, na faixa do Excel.",
          textoNarrado: "Clique no botão ene. Ele fica em cima, na faixa do Excel.",
          imagem: figura("excel-n-botao", "Botão N marcado na faixa do Excel"),
        },
        {
          texto: "A palavra Fruta ficou com letra grossa.",
          imagem: figura("excel-n-fruta", "Palavra Fruta com letra grossa e as palavras letra grossa ao lado"),
        },
      ],
    },
    {
      id: "quantidade",
      titulo: "Quantidade com letra grossa",
      passosGuiados: [
        {
          texto: "Clique no quadradinho da palavra Quantidade.",
          imagem: figura("excel-n-clique-b1", "Quadradinho da palavra Quantidade marcado"),
        },
        {
          texto: "Clique no botão N de novo.",
          textoNarrado: "Clique no botão ene de novo.",
          imagem: figura("excel-n-botao-2", "Botão N marcado de novo na faixa do Excel"),
        },
        {
          texto: "Pronto! Fruta e Quantidade estão com letra grossa.",
          imagem: figura("excel-n-pronto", "Fruta e Quantidade com letra grossa e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
