import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Abrir um documento salvo",
  introducao:
    "Você vai abrir de novo o documento meu-nome. Ele foi salvo no tutorial Salvar o documento.",
  itens: [
    {
      id: "abrir-word",
      titulo: "Abrir o Word",
      passosGuiados: [
        {
          texto: "Clique no botão Iniciar. É o ícone com quatro quadradinhos azuis.",
          imagem: figura("iniciar-botao", "Botão Iniciar marcado na barra de tarefas"),
        },
        { texto: "Digite a palavra Word no teclado.", imagem: figura("word-busca", "Menu Iniciar com a palavra Word escrita na busca") },
        {
          texto: "Clique no ícone azul com a letra W.",
          imagem: figura("word-resultado", "Resultado da busca com o ícone azul do Word marcado"),
        },
        { texto: "Espere o Word abrir.", imagem: figura("word-abrindo", "Tela azul do Word abrindo") },
      ],
    },
    {
      id: "abrir-documento",
      titulo: "Abrir o documento",
      passosGuiados: [
        {
          texto: "Clique em Abrir. Fica na lista azul do lado esquerdo.",
          imagem: figura("word-inicio-abrir", "Tela inicial do Word com Abrir marcado na lista do lado esquerdo"),
        },
        {
          texto: "Clique no documento meu-nome.",
          textoNarrado: "Clique no documento meu nome.",
          imagem: figura("word-abrir-arquivo", "Lista de documentos com meu-nome marcado"),
        },
        {
          texto: "O documento abriu com o seu nome. Pronto!",
          imagem: figura("word-salvo", "Word com o documento meu-nome aberto e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
