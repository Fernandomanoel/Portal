import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Abrir o Word e escrever seu nome",
  introducao: "Você vai abrir o Word, abrir uma folha em branco e escrever o seu nome.",
  itens: [
    {
      id: "abrir-word",
      titulo: "Abrir o Word",
      passosGuiados: [
        {
          texto: "Olhe a faixa na parte de baixo da tela. Essa faixa se chama barra de tarefas.",
          imagem: figura("barra-de-tarefas", "Área de trabalho com o nome Barra de tarefas em cima da faixa de baixo da tela"),
        },
        {
          texto: "Clique no botão Iniciar. É o ícone com quatro quadradinhos azuis.",
          imagem: figura("iniciar-botao", "Botão Iniciar marcado na barra de tarefas"),
        },
        {
          texto: "Digite a palavra Word no teclado.",
          imagem: figura("word-busca", "Menu Iniciar aberto com a palavra Word escrita na busca"),
        },
        {
          texto: "Clique no ícone azul com a letra W.",
          imagem: figura("word-resultado", "Resultado da busca com o ícone azul do Word marcado"),
        },
        {
          texto: "Espere o Word abrir. Isso pode demorar um pouco.",
          imagem: figura("word-abrindo", "Tela azul do Word abrindo"),
        },
        {
          texto: "Clique em Documento em branco.",
          imagem: figura("word-em-branco", "Tela inicial do Word com Documento em branco marcado"),
        },
        {
          texto: "Apareceu uma folha branca. O Word está aberto.",
          imagem: figura("word-folha", "Word aberto com uma folha branca e um sinal verde de certo"),
        },
      ],
    },
    {
      id: "escrever-nome",
      titulo: "Escrever o seu nome",
      passosGuiados: [
        {
          texto: "Clique uma vez no meio da folha branca.",
          imagem: figura("word-clique-folha", "Folha branca do Word com um lugar marcado no meio"),
        },
        {
          texto: "Veja o risco que pisca na folha. A letra vai aparecer nesse lugar.",
          imagem: figura("word-risco", "Folha do Word com o risco que pisca e o nome risco que pisca ao lado"),
        },
        {
          texto: "Digite o seu nome no teclado.",
          imagem: figura("word-nome", "Folha do Word com um nome escrito, por exemplo Ana Souza"),
        },
        {
          texto: "Errou uma letra? Aperte a tecla Backspace. Ela tem uma seta que aponta para a esquerda.",
          textoNarrado: "Errou uma letra? Aperte a tecla Béqui-spêice. Ela tem uma seta que aponta para a esquerda.",
          imagem: figura("tecla-backspace", "A tecla Backspace do teclado, com a seta para a esquerda"),
        },
        {
          texto: "O seu nome está na folha. Pronto!",
          imagem: figura("word-nome-pronto", "Folha do Word com o nome escrito e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
