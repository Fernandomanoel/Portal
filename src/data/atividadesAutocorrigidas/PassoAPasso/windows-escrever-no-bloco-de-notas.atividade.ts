import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Escrever e salvar no Bloco de Notas",
  introducao: "Você vai abrir o Bloco de Notas, escrever uma frase e guardar a frase num arquivo.",
  itens: [
    {
      id: "abrir",
      titulo: "Abrir o Bloco de Notas",
      passosGuiados: [
        {
          texto: "Clique no botão Iniciar. É o ícone com quatro quadradinhos azuis.",
          imagem: figura("iniciar-botao", "Botão Iniciar marcado na barra de tarefas"),
        },
        {
          texto: "Digite bloco de notas no teclado.",
          imagem: figura("win-busca-bloco", "Menu Iniciar com bloco de notas escrito na busca"),
        },
        {
          texto: "Clique em Bloco de Notas.",
          imagem: figura("win-busca-bloco-clique", "Bloco de Notas marcado no resultado da busca"),
        },
      ],
    },
    {
      id: "escrever",
      titulo: "Escrever",
      passosGuiados: [
        {
          texto: "Clique uma vez na parte branca.",
          imagem: figura("win-bloco-vazio-clique", "Parte branca do Bloco de Notas marcada e o mouse com o botão esquerdo pintado"),
        },
        {
          texto: "Digite: Eu gosto de aprender.",
          imagem: figura("win-bloco-texto", "Bloco de Notas com a frase Eu gosto de aprender"),
        },
      ],
    },
    {
      id: "salvar",
      titulo: "Salvar",
      passosGuiados: [
        {
          texto: "Segure a tecla Ctrl e aperte a letra S.",
          textoNarrado: "Segure a tecla control e aperte a letra S.",
          imagem: figura("atalho-ctrl-s", "Tecla Ctrl e tecla S desenhadas grandes, com a palavra Salvar"),
        },
        {
          texto: "Abriu uma janela. No Nome do arquivo, digite meu-texto.",
          textoNarrado: "Abriu uma janela. No nome do arquivo, digite meu texto.",
          imagem: figura("win-salvar-nome", "Janela Salvar como com meu-texto escrito no nome do arquivo"),
        },
        {
          texto: "Clique no botão azul Salvar.",
          imagem: figura("win-salvar-botao", "Botão Salvar marcado na janela"),
        },
        {
          texto: "Olhe em cima: o nome agora é meu-texto. O arquivo foi salvo. Pronto!",
          textoNarrado: "Olhe em cima: o nome agora é meu texto. O arquivo foi salvo. Pronto!",
          imagem: figura("win-bloco-salvo", "Bloco de Notas com o nome meu-texto em cima e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
