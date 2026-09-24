import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Abrir o Word e escrever seu nome",
  introducao: "Você vai abrir o Word, abrir uma folha em branco e escrever o seu nome.",
  itens: [
    {
      id: "abrir-word",
      titulo: "Abrir o Word",
      passosGuiados: [
        { texto: "Olhe a faixa na parte de baixo da tela. Essa faixa se chama barra de tarefas." },
        { texto: "Clique no botão Iniciar. É o ícone com quatro quadradinhos azuis." },
        { texto: "Digite a palavra Word no teclado." },
        { texto: "Clique no ícone azul com a letra W." },
        { texto: "Espere o Word abrir. Isso pode demorar um pouco." },
        { texto: "Clique em Documento em branco." },
        { texto: "Apareceu uma folha branca. O Word está aberto." },
      ],
    },
    {
      id: "escrever-nome",
      titulo: "Escrever o seu nome",
      passosGuiados: [
        { texto: "Clique uma vez no meio da folha branca." },
        { texto: "Veja o risco que pisca na folha. A letra vai aparecer nesse lugar." },
        { texto: "Digite o seu nome no teclado." },
        {
          texto: "Errou uma letra? Aperte a tecla Backspace. Ela tem uma seta que aponta para a esquerda.",
          textoNarrado: "Errou uma letra? Aperte a tecla Béqui-spêice. Ela tem uma seta que aponta para a esquerda.",
        },
        { texto: "O seu nome está na folha. Pronto!" },
      ],
    },
  ],
};

export default atividade;
