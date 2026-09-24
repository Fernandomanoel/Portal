import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Fazer uma lista com bolinhas",
  introducao: "Você vai escrever uma lista de comidas. Cada comida vai ter uma bolinha na frente.",
  itens: [
    {
      id: "linha-nova",
      titulo: "Ir para a linha de baixo",
      passosGuiados: [
        {
          texto: "Abra o Word e escreva o seu nome. Você aprendeu isso no tutorial Abrir o Word e escrever seu nome.",
          imagem: figura("word-nome-pronto", "Folha do Word com o nome Ana Souza escrito"),
        },
        {
          texto: "Clique logo depois da última letra do seu nome.",
          imagem: figura("word-clique-fim-nome", "Fim do nome Ana Souza marcado"),
        },
        {
          texto: "Aperte a tecla Enter. O risquinho que pisca desce para a linha de baixo.",
          imagem: figura("tecla-enter", "A tecla Enter do teclado, desenhada grande"),
        },
      ],
    },
    {
      id: "bolinhas",
      titulo: "Escrever a lista",
      passosGuiados: [
        {
          texto: "Clique no botão com bolinhas e riscos. Ele fica em cima, na faixa do Word.",
          imagem: figura("word-clique-marcadores", "Botão Marcadores marcado na faixa do Word"),
        },
        {
          texto: "Apareceu uma bolinha na linha.",
          imagem: figura("word-lista-bolinha", "Linha nova com uma bolinha na frente e a palavra bolinha ao lado"),
        },
        {
          texto: "Digite a palavra Arroz.",
          imagem: figura("word-lista-1", "Lista com a palavra Arroz depois da bolinha"),
        },
        {
          texto: "Aperte a tecla Enter.",
          imagem: figura("tecla-enter", "A tecla Enter do teclado, desenhada grande"),
        },
        {
          texto: "Apareceu outra bolinha na linha de baixo.",
          imagem: figura("word-lista-nova-bolinha", "Lista com Arroz e uma bolinha nova embaixo"),
        },
        {
          texto: "Digite a palavra Feijão.",
          imagem: figura("word-lista-2", "Lista com Arroz e Feijão, cada um com uma bolinha"),
        },
        {
          texto: "Pronto! Você fez uma lista com bolinhas.",
          imagem: figura("word-lista-pronto", "Lista com Arroz e Feijão e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
