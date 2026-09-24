import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const TECLA_ENTER = figura("tecla-enter", "A tecla Enter do teclado, desenhada grande");

const atividade: AtividadeAutocorrigida = {
  titulo: "Criar pastas e um arquivo",
  introducao:
    "Você vai criar a pasta AULA WINDOWS, criar a pasta ARQUIVOS dentro dela e criar um arquivo chamado teste.",
  itens: [
    {
      id: "pasta-aula-windows",
      titulo: "Criar a pasta AULA WINDOWS",
      passosGuiados: [
        {
          texto: "Clique com o botão direito do mouse em um lugar vazio da área de trabalho.",
          imagem: figura("win-botao-direito-desktop", "Área de trabalho azul com um lugar vazio marcado e o botão direito do mouse pintado"),
        },
        {
          texto: "Um menu apareceu. Coloque a seta do mouse em cima da palavra Novo.",
          imagem: figura("win-menu-novo", "Menu aberto na área de trabalho com a palavra Novo marcada"),
        },
        {
          texto: "Clique na palavra Pasta.",
          imagem: figura("win-menu-pasta", "Menu Novo aberto com a palavra Pasta marcada"),
        },
        {
          texto: "Uma pasta nova apareceu. Digite o nome AULA WINDOWS.",
          textoNarrado: "Uma pasta nova apareceu. Digite o nome aula windows.",
          imagem: figura("win-pasta-aula-nome", "Pasta nova na área de trabalho com o nome AULA WINDOWS sendo escrito"),
        },
        { texto: "Aperte a tecla Enter.", imagem: TECLA_ENTER },
      ],
    },
    {
      id: "pasta-arquivos",
      titulo: "Criar a pasta ARQUIVOS",
      passosGuiados: [
        {
          texto: "Clique duas vezes na pasta AULA WINDOWS para abrir.",
          textoNarrado: "Clique duas vezes na pasta aula windows para abrir.",
          imagem: figura("win-aula-dois-cliques", "Pasta AULA WINDOWS marcada na área de trabalho, com o aviso de dois cliques"),
        },
        {
          texto: "A pasta abriu numa janela. A pasta ainda está vazia.",
          imagem: figura("win-aula-vazia", "Janela da pasta AULA WINDOWS sem nada dentro"),
        },
        {
          texto: "Clique com o botão direito do mouse na parte branca da janela.",
          imagem: figura("win-aula-botao-direito", "Janela da pasta com um lugar branco marcado e o botão direito do mouse pintado"),
        },
        {
          texto: "Coloque a seta do mouse em cima da palavra Novo.",
          imagem: figura("win-aula-menu-novo", "Menu aberto na janela com a palavra Novo marcada"),
        },
        {
          texto: "Clique na palavra Pasta.",
          imagem: figura("win-aula-menu-pasta", "Menu Novo aberto na janela com a palavra Pasta marcada"),
        },
        {
          texto: "Digite o nome ARQUIVOS.",
          textoNarrado: "Digite o nome arquivos.",
          imagem: figura("win-arquivos-nome", "Pasta nova na janela com o nome ARQUIVOS sendo escrito"),
        },
        { texto: "Aperte a tecla Enter.", imagem: TECLA_ENTER },
      ],
    },
    {
      id: "arquivo-teste",
      titulo: "Criar o arquivo teste",
      passosGuiados: [
        {
          texto: "Clique com o botão direito do mouse na parte branca da janela, ao lado da pasta ARQUIVOS.",
          textoNarrado: "Clique com o botão direito do mouse na parte branca da janela, ao lado da pasta arquivos.",
          imagem: figura("win-aula-botao-direito-2", "Janela com a pasta ARQUIVOS e um lugar branco marcado ao lado dela"),
        },
        {
          texto: "Coloque a seta do mouse em cima da palavra Novo.",
          imagem: figura("win-aula-menu-novo-2", "Menu aberto ao lado da pasta ARQUIVOS com a palavra Novo marcada"),
        },
        {
          texto: "Clique em Documento de Texto.",
          imagem: figura("win-aula-menu-documento", "Menu Novo aberto com Documento de Texto marcado"),
        },
        {
          texto: "Digite o nome teste.",
          imagem: figura("win-teste-nome", "Arquivo novo na janela com o nome teste sendo escrito"),
        },
        { texto: "Aperte a tecla Enter.", imagem: TECLA_ENTER },
        {
          texto: "Pronto! Dentro da pasta AULA WINDOWS tem a pasta ARQUIVOS e o arquivo teste.",
          textoNarrado: "Pronto! Dentro da pasta aula windows tem a pasta arquivos e o arquivo teste.",
          imagem: figura("win-pastas-prontas", "Janela com a pasta ARQUIVOS e o arquivo teste, e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
