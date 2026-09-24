import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const CLIQUE_TESTE = figura("win-teste-clique", "Arquivo teste marcado na janela, com o botão esquerdo do mouse pintado");
const DOIS_CLIQUES_ARQUIVOS = figura("win-arquivos-dois-cliques", "Pasta ARQUIVOS marcada, com o aviso de dois cliques");
const CTRL_V = figura("atalho-ctrl-v", "As teclas Ctrl e V, com a palavra Colar");

const atividade: AtividadeAutocorrigida = {
  titulo: "Copiar, recortar e colar",
  introducao:
    "Copiar faz uma cópia: o arquivo fica nos dois lugares. Recortar muda o arquivo de lugar. Você vai fazer as duas coisas com o arquivo teste.",
  itens: [
    {
      id: "copiar",
      titulo: "Copiar o arquivo",
      passosGuiados: [
        {
          texto: "Na área de trabalho, clique duas vezes na pasta AULA WINDOWS para abrir.",
          textoNarrado: "Na área de trabalho, clique duas vezes na pasta aula windows para abrir.",
          imagem: figura("win-aula-dois-cliques", "Pasta AULA WINDOWS marcada na área de trabalho, com o aviso de dois cliques"),
        },
        {
          texto: "Veja o que tem dentro: a pasta ARQUIVOS e o arquivo teste.",
          textoNarrado: "Veja o que tem dentro: a pasta arquivos e o arquivo teste.",
          imagem: figura("win-aula-conteudo", "Janela com a pasta ARQUIVOS e o arquivo teste, cada um com seu nome embaixo"),
        },
        { texto: "Clique uma vez no arquivo teste.", imagem: CLIQUE_TESTE },
        {
          texto: "Segure a tecla Ctrl. Com ela apertada, aperte a tecla C.",
          textoNarrado: "Segure a tecla control. Com ela apertada, aperte a tecla C.",
          imagem: figura("atalho-ctrl-c", "As teclas Ctrl e C, com a palavra Copiar"),
        },
        { texto: "Clique duas vezes na pasta ARQUIVOS para abrir.", textoNarrado: "Clique duas vezes na pasta arquivos para abrir.", imagem: DOIS_CLIQUES_ARQUIVOS },
        {
          texto: "Segure a tecla Ctrl. Com ela apertada, aperte a tecla V.",
          textoNarrado: "Segure a tecla control. Com ela apertada, aperte a tecla V.",
          imagem: CTRL_V,
        },
        {
          texto: "O arquivo teste apareceu aqui. Este arquivo é a cópia.",
          imagem: figura("win-arquivos-com-copia", "Pasta ARQUIVOS com o arquivo teste dentro e um sinal verde de certo"),
        },
        {
          texto: "Clique na seta do canto de cima, do lado esquerdo, para voltar.",
          imagem: figura("win-voltar-seta", "Seta de voltar marcada no canto de cima da janela"),
        },
        {
          texto: "Veja: o arquivo teste continua aqui também. Copiar deixa o arquivo nos dois lugares.",
          imagem: figura("win-aula-teste-continua", "Pasta AULA WINDOWS ainda com o arquivo teste e um sinal verde de certo"),
        },
      ],
    },
    {
      id: "recortar",
      titulo: "Recortar e mudar de lugar",
      passosGuiados: [
        { texto: "Clique uma vez no arquivo teste.", imagem: CLIQUE_TESTE },
        {
          texto: "Segure a tecla Ctrl. Com ela apertada, aperte a tecla X.",
          textoNarrado: "Segure a tecla control. Com ela apertada, aperte a tecla X.",
          imagem: figura("atalho-ctrl-x", "As teclas Ctrl e X, com a palavra Recortar"),
        },
        {
          texto: "O arquivo teste ficou mais claro. Isso mostra que ele foi recortado.",
          imagem: figura("win-teste-recortado", "Arquivo teste mais claro que o normal, com o aviso mais claro"),
        },
        {
          texto: "Do lado esquerdo da janela, clique em Área de Trabalho.",
          imagem: figura("win-nav-area-de-trabalho", "Lista do lado esquerdo da janela com Área de Trabalho marcada"),
        },
        {
          texto: "Segure a tecla Ctrl. Com ela apertada, aperte a tecla V.",
          textoNarrado: "Segure a tecla control. Com ela apertada, aperte a tecla V.",
          imagem: CTRL_V,
        },
        {
          texto: "O arquivo teste apareceu na Área de Trabalho.",
          imagem: figura("win-area-com-teste", "Janela da Área de Trabalho com a pasta AULA WINDOWS e o arquivo teste"),
        },
        {
          texto: "Clique duas vezes na pasta AULA WINDOWS.",
          textoNarrado: "Clique duas vezes na pasta aula windows.",
          imagem: figura("win-area-aula-dois-cliques", "Pasta AULA WINDOWS marcada dentro da janela, com o aviso de dois cliques"),
        },
        {
          texto: "Veja: o arquivo teste não está mais aqui. Recortar tira o arquivo do lugar antigo.",
          imagem: figura("win-aula-sem-teste", "Pasta AULA WINDOWS só com a pasta ARQUIVOS e um lugar vazio onde estava o arquivo"),
        },
      ],
    },
  ],
};

export default atividade;
