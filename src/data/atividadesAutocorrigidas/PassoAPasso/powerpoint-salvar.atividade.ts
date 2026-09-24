import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Salvar a apresentação",
  introducao: "Você vai guardar a apresentação num arquivo com o nome minha-apresentacao.",
  itens: [
    {
      id: "arquivo",
      titulo: "Abrir Salvar como",
      passosGuiados: [
        {
          texto: "Abra o PowerPoint e escreva o título e o seu nome. Você aprendeu isso no tutorial Escrever o subtítulo.",
          textoNarrado: "Abra o Páuer-póint e escreva o título e o seu nome. Você aprendeu isso no tutorial Escrever o subtítulo.",
          imagem: figura("ppt-sub-pronto", "Slide com o título Meu primeiro slide e o nome Ana Souza embaixo"),
        },
        {
          texto: "Clique em Arquivo. Fica em cima, do lado esquerdo.",
          imagem: figura("ppt-sv-arquivo", "Aba Arquivo marcada no canto de cima do PowerPoint"),
        },
        {
          texto: "Clique em Salvar como.",
          imagem: figura("ppt-sv-salvar-como", "Lista do lado esquerdo com Salvar como marcado"),
        },
        { texto: "Clique em Procurar.", imagem: figura("ppt-sv-procurar", "Botão Procurar marcado") },
      ],
    },
    {
      id: "nome",
      titulo: "Dar o nome e salvar",
      passosGuiados: [
        {
          texto: "No Nome do arquivo, digite minha-apresentacao.",
          textoNarrado: "No nome do arquivo, digite minha apresentação.",
          imagem: figura("ppt-sv-nome", "Janela Salvar como com minha-apresentacao escrito no nome do arquivo"),
        },
        { texto: "Clique no botão azul Salvar.", imagem: figura("ppt-sv-botao", "Botão Salvar marcado na janela") },
        {
          texto: "Olhe em cima: o nome agora é minha-apresentacao. Pronto!",
          textoNarrado: "Olhe em cima: o nome agora é minha apresentação. Pronto!",
          imagem: figura("ppt-sv-pronto", "PowerPoint com o nome minha-apresentacao em cima e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
