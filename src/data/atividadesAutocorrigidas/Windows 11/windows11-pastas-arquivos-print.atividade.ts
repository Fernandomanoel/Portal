import imagemBlocoDeNotas from "@/assets/atividades/windows-11/bloco-de-notas-salvar.svg";
import imagemOrganizacao from "@/assets/atividades/windows-11/organizacao-pastas.svg";
import imagemPaint from "@/assets/atividades/windows-11/paint-salvar-bmp.svg";
import imagemSubpastas from "@/assets/atividades/windows-11/pasta-atividade-windows-subpastas.svg";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Windows 11 — Pastas, Arquivos e Print da Tela",
  introducao:
    "Objetivo: aprender a criar pastas, organizar documentos, editar arquivos e salvar uma imagem (print) no formato .bmp.",
  itens: [
    {
      id: "criar-pastas",
      titulo: "Parte 1 — Criar Pastas",
      passos: [
        "Na Área de Trabalho, clique com o botão direito do mouse.",
        "Clique em Novo → Pasta.",
        "Dê o nome da pasta principal: Atividade Windows.",
        "Abra essa pasta e crie 3 subpastas com os nomes: Textos, Imagens e Print.",
      ],
      imagem: {
        url: imagemSubpastas,
        alt: "Pasta Atividade Windows aberta no Explorador com as subpastas Textos, Imagens e Print",
        legenda: "As 3 subpastas ficam dentro de Atividade Windows.",
      },
      objetivo: "Criar uma pasta principal e organizar subpastas dentro dela.",
    },
    {
      id: "criar-escrever-arquivos",
      titulo: "Parte 2 — Criar e Escrever Arquivos",
      passos: [
        "Entre na pasta Textos.",
        "Clique com o botão direito → Novo → Documento de Texto.",
        "Nomeie o arquivo como: texto1.txt.",
        "Abra o arquivo e escreva um pequeno texto, por exemplo: \"Esta é uma atividade de Windows. Estou aprendendo a criar pastas e organizar arquivos.\"",
        "Clique em Arquivo → Salvar e feche.",
      ],
      imagem: {
        url: imagemBlocoDeNotas,
        alt: "Bloco de Notas com o arquivo texto1.txt aberto e o menu Arquivo mostrando a opção Salvar",
        legenda: "No Bloco de Notas: Arquivo → Salvar (ou Ctrl + S).",
      },
      objetivo: "Criar, editar e salvar um arquivo de texto.",
    },
    {
      id: "organizacao",
      titulo: "Parte 3 — Organização",
      instrucao: "Confirme se:",
      passos: [
        "O arquivo texto1.txt está dentro da pasta Textos.",
        "As pastas Textos, Imagens e Print estão organizadas dentro de Atividade Windows.",
      ],
      imagem: {
        url: imagemOrganizacao,
        alt: "Pasta Textos com o arquivo texto1.txt e o esquema da organização das pastas",
        legenda: "Estrutura esperada ao final da Parte 3.",
      },
      objetivo: "Conferir se cada arquivo está no lugar certo.",
    },
    {
      id: "print-da-tela",
      titulo: "Parte 4 — Tirar Print da Tela",
      passos: [
        "Com a pasta Atividade Windows aberta, pressione a tecla Print Screen (PrtSc) no teclado.",
        "Abra o Paint: Menu Iniciar → digite Paint → Abrir.",
        "Aperte Ctrl + V (primeiro aperte Ctrl e, logo depois, o V) para colar a imagem.",
        "Clique em Arquivo → Salvar como → Imagem BMP.",
        "Salve o arquivo com o nome: print_atividade.bmp.",
        "Escolha a pasta Print para salvar.",
      ],
      imagem: {
        url: imagemPaint,
        alt: "Paint com o print colado e o menu Arquivo, Salvar como, com a opção Imagem BMP em destaque",
        legenda: "PrtSc copia a tela; Ctrl + V cola no Paint; Salvar como → Imagem BMP.",
      },
      aviso:
        "em alguns computadores com Windows 11, a tecla Print Screen abre a Ferramenta de Captura em vez de copiar a tela. Nesse caso, escolha o modo \"Tela inteira\" (ou selecione a área) e depois cole no Paint com Ctrl + V.",
      objetivo: "Capturar a tela e salvar a imagem no formato .bmp, na pasta certa.",
    },
  ],
};

export default atividade;
