import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Imprimir o documento",
  introducao: "Você vai mandar o documento para a impressora e pegar a folha impressa.",
  itens: [
    {
      id: "antes",
      titulo: "Antes de imprimir",
      passosGuiados: [
        {
          texto: "Abra o documento meu-nome. Você aprendeu isso no tutorial Abrir um documento salvo.",
          textoNarrado: "Abra o documento meu nome. Você aprendeu isso no tutorial Abrir um documento salvo.",
          imagem: figura("word-salvo", "Word com o documento meu-nome aberto"),
        },
        {
          texto: "Veja se a impressora está ligada e tem folha. Se não souber, peça ajuda para o professor.",
          imagem: figura("word-impressora", "Desenho de uma impressora com a luz verde acesa"),
        },
      ],
    },
    {
      id: "imprimir",
      titulo: "Imprimir",
      passosGuiados: [
        {
          texto: "Clique em Arquivo. Fica em cima, do lado esquerdo.",
          imagem: figura("word-clique-arquivo", "Aba Arquivo marcada no canto de cima do Word"),
        },
        {
          texto: "Clique em Imprimir.",
          imagem: figura("word-bastidores-imprimir", "Lista azul do lado esquerdo com Imprimir marcado"),
        },
        {
          texto: "Olhe a folha do lado direito. É assim que ela vai sair da impressora.",
          imagem: figura("word-previa", "Tela Imprimir com a folha do documento mostrada do lado direito"),
        },
        {
          texto: "Clique no botão Imprimir.",
          imagem: figura("word-clique-imprimir", "Botão Imprimir marcado"),
        },
        {
          texto: "Espere a folha sair da impressora. Pronto!",
          imagem: figura("word-impresso", "Impressora com a folha impressa saindo e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
