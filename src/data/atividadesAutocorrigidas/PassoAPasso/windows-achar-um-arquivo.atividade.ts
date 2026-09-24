import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Achar um arquivo com a pesquisa",
  introducao:
    "Você vai achar o arquivo teste escrevendo o nome dele no menu Iniciar. O arquivo teste foi criado no tutorial Criar pastas e um arquivo.",
  itens: [
    {
      id: "pesquisar",
      titulo: "Pesquisar",
      passosGuiados: [
        {
          texto: "Clique no botão Iniciar. É o ícone com quatro quadradinhos azuis.",
          imagem: figura("iniciar-botao", "Botão Iniciar marcado na barra de tarefas"),
        },
        {
          texto: "Digite a palavra teste no teclado.",
          imagem: figura("win-busca-teste", "Menu Iniciar com a palavra teste escrita na busca"),
        },
        {
          texto: "Olhe embaixo. O computador achou o arquivo teste.",
          imagem: figura("win-busca-teste-olhe", "Resultado da busca com o arquivo teste indicado"),
        },
      ],
    },
    {
      id: "abrir",
      titulo: "Abrir e fechar",
      passosGuiados: [
        {
          texto: "Clique no arquivo teste.",
          imagem: figura("win-busca-teste-clique", "Arquivo teste marcado no resultado da busca"),
        },
        {
          texto: "O arquivo abriu no Bloco de Notas.",
          imagem: figura("win-teste-aberto", "Bloco de Notas aberto com o arquivo teste e um sinal verde de certo"),
        },
        {
          texto: "Clique no X, no canto de cima do lado direito, para fechar. Pronto!",
          imagem: figura("win-bloco-fechar", "Botão Fechar marcado no Bloco de Notas"),
        },
      ],
    },
  ],
};

export default atividade;
