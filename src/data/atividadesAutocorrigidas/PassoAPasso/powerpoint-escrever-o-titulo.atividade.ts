import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Escrever o título do slide",
  introducao: "Você vai abrir o PowerPoint e escrever o título do primeiro slide.",
  itens: [
    {
      id: "abrir-powerpoint",
      titulo: "Abrir o PowerPoint",
      passosGuiados: [
        { texto: "Clique no botão Iniciar. É o ícone com quatro quadradinhos azuis." },
        { texto: "Digite a palavra PowerPoint no teclado.", textoNarrado: "Digite a palavra Páuer-póint no teclado." },
        { texto: "Clique no ícone laranja com a letra P." },
        { texto: "Espere o PowerPoint abrir. Isso pode demorar um pouco.", textoNarrado: "Espere o Páuer-póint abrir. Isso pode demorar um pouco." },
        { texto: "Clique em Apresentação em branco." },
      ],
    },
    {
      id: "escrever-titulo",
      titulo: "Escrever o título",
      passosGuiados: [
        { texto: "Veja o retângulo branco grande no meio da tela. Ele se chama slide." },
        { texto: "Dentro do slide tem uma caixa com a frase: Clique para adicionar um título." },
        { texto: "Clique uma vez dentro dessa caixa." },
        { texto: "Digite: Meu primeiro slide." },
        { texto: "Clique em um lugar vazio, fora da caixa." },
        { texto: "O título está no slide. Pronto!" },
      ],
    },
  ],
};

export default atividade;
