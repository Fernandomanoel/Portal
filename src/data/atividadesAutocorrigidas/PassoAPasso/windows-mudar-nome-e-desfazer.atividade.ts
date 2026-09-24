import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Mudar o nome e desfazer",
  introducao:
    "Você vai mudar o nome de um arquivo com a tecla F2. Depois vai usar Ctrl e Z para voltar o nome antigo.",
  itens: [
    {
      id: "mudar-nome",
      titulo: "Mudar o nome do arquivo",
      passosGuiados: [
        {
          texto: "Dentro da pasta AULA WINDOWS, clique duas vezes na pasta ARQUIVOS.",
          textoNarrado: "Dentro da pasta aula windows, clique duas vezes na pasta arquivos.",
          imagem: figura("win-aula-so-arquivos-dois-cliques", "Pasta ARQUIVOS marcada, com o aviso de dois cliques"),
        },
        {
          texto: "Clique uma vez no arquivo teste.",
          imagem: figura("win-copia-clique", "Arquivo teste marcado dentro da pasta ARQUIVOS, com o botão esquerdo do mouse pintado"),
        },
        {
          texto: "Aperte a tecla F2. Ela fica na fileira de cima do teclado.",
          textoNarrado: "Aperte a tecla F dois. Ela fica na fileira de cima do teclado.",
          imagem: figura("tecla-f2", "Fileira de cima do teclado com a tecla F2 marcada"),
        },
        {
          texto: "O nome ficou dentro de uma caixa. Agora você pode escrever.",
          imagem: figura("win-copia-caixa-nome", "Nome do arquivo teste dentro de uma caixa de escrever"),
        },
        {
          texto: "Digite o nome novo: atividade.",
          imagem: figura("win-copia-atividade-nome", "Caixa do nome com a palavra atividade escrita"),
        },
        { texto: "Aperte a tecla Enter.", imagem: figura("tecla-enter", "A tecla Enter do teclado, desenhada grande") },
        {
          texto: "O arquivo agora se chama atividade.",
          imagem: figura("win-copia-atividade", "Arquivo com o nome atividade e um sinal verde de certo"),
        },
      ],
    },
    {
      id: "desfazer",
      titulo: "Desfazer",
      passosGuiados: [
        {
          texto: "Segure a tecla Ctrl. Com ela apertada, aperte a tecla Z.",
          textoNarrado: "Segure a tecla control. Com ela apertada, aperte a tecla Z.",
          imagem: figura("atalho-ctrl-z", "As teclas Ctrl e Z, com a palavra Desfazer"),
        },
        {
          texto: "O nome antigo voltou: teste. Ctrl e Z desfazem a última coisa que você fez.",
          textoNarrado: "O nome antigo voltou: teste. Control e Z desfazem a última coisa que você fez.",
          imagem: figura("win-copia-teste-de-volta", "Arquivo de novo com o nome teste e um sinal verde de certo"),
        },
      ],
    },
    {
      id: "atalhos",
      titulo: "Lembrar as teclas",
      passosGuiados: [
        {
          texto: "Ctrl e C copiam. Ctrl e X recortam. Ctrl e V colam.",
          textoNarrado: "Control e C copiam. Control e X recortam. Control e V colam.",
          imagem: figura("atalhos-copiar-recortar-colar", "Quadro com as teclas Ctrl C para copiar, Ctrl X para recortar e Ctrl V para colar"),
        },
        {
          texto: "F2 muda o nome. Ctrl e Z desfazem.",
          textoNarrado: "F dois muda o nome. Control e Z desfazem.",
          imagem: figura("atalhos-f2-desfazer", "Quadro com a tecla F2 para mudar o nome e as teclas Ctrl Z para desfazer"),
        },
      ],
    },
  ],
};

export default atividade;
