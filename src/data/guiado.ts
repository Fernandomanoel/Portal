import type { NomeIcone } from "@/components/Icone";
import type { AssuntoGuiado, JogoConceito, TutorialResumo } from "@/types/guiado";

/**
 * Catálogo da seção "Passo a Passo". Adicionar tutorial é criar o
 * `.atividade.ts` em `atividadesAutocorrigidas/PassoAPasso/` (com
 * `passosGuiados`) e acrescentar uma linha em TUTORIAIS — a vitrine monta a
 * prateleira do assunto sozinha. Capa de card e imagem de passo são
 * fornecidas pela equipe depois; sem elas, a tela usa a cor e o ícone do
 * assunto.
 */
export const ASSUNTOS: { id: AssuntoGuiado; nome: string; icone: NomeIcone; acento: string }[] = [
  { id: "windows", nome: "Windows 11", icone: "informatica", acento: "#2f6fdb" },
  { id: "word", nome: "Word", icone: "doc", acento: "#2b5cb8" },
  { id: "excel", nome: "Excel", icone: "planilha", acento: "#1d7a45" },
  { id: "powerpoint", nome: "PowerPoint", icone: "slides", acento: "#c4532a" },
  { id: "ia", nome: "Inteligência Artificial", icone: "robo", acento: "#7c4dd6" },
  { id: "seguranca", nome: "Segurança na Era Digital", icone: "escudo", acento: "#a0680f" },
];

export const TUTORIAIS: TutorialResumo[] = [
  {
    titulo: "Criar pastas e um arquivo",
    descricao: "Criar a pasta AULA WINDOWS, a pasta ARQUIVOS e o arquivo teste.",
    caminho: "PassoAPasso/windows-criar-pastas-e-arquivo",
    assunto: "windows",
  },
  {
    titulo: "Copiar, recortar e colar",
    descricao: "Fazer uma cópia do arquivo teste e depois mudar o arquivo de lugar.",
    caminho: "PassoAPasso/windows-copiar-recortar-colar",
    assunto: "windows",
  },
  {
    titulo: "Mudar o nome e desfazer",
    descricao: "Mudar o nome de um arquivo com F2 e voltar o nome antigo com Ctrl e Z.",
    caminho: "PassoAPasso/windows-mudar-nome-e-desfazer",
    assunto: "windows",
  },
  {
    titulo: "Usar a Lixeira",
    descricao: "Criar uma pasta, mandar para a Lixeira e trazer de volta.",
    caminho: "PassoAPasso/windows-usar-a-lixeira",
    assunto: "windows",
  },
  {
    titulo: "Abrir o Word e escrever seu nome",
    descricao: "Achar o Word, abrir uma folha em branco e digitar seu nome.",
    caminho: "PassoAPasso/word-abrir-e-escrever-seu-nome",
    assunto: "word",
  },
  {
    titulo: "Escrever um número no Excel",
    descricao: "Abrir o Excel, escolher um quadradinho e digitar um número.",
    caminho: "PassoAPasso/excel-escrever-um-numero",
    assunto: "excel",
  },
  {
    titulo: "Escrever o título do slide",
    descricao: "Abrir o PowerPoint e escrever o título do primeiro slide.",
    caminho: "PassoAPasso/powerpoint-escrever-o-titulo",
    assunto: "powerpoint",
  },
  {
    titulo: "O que é um programa que conversa",
    descricao: "Quem responde é um programa, não uma pessoa — e ele pode errar.",
    caminho: "PassoAPasso/ia-programa-que-conversa",
    assunto: "ia",
  },
  {
    titulo: "Posso clicar nesse link?",
    descricao: "Como reconhecer uma mensagem estranha e o que fazer com ela.",
    caminho: "PassoAPasso/seguranca-posso-clicar-nesse-link",
    assunto: "seguranca",
  },
];

export const JOGOS_CONCEITO: JogoConceito[] = [
  {
    slug: "o-que-e-o-mouse",
    titulo: "O que é o Mouse?",
    descricao: "Clique em cada parte do mouse e descubra para que ela serve.",
  },
];

export function acharAssunto(id: AssuntoGuiado) {
  return ASSUNTOS.find((assunto) => assunto.id === id) ?? ASSUNTOS[0];
}

export function acharTutorial(caminho: string) {
  return TUTORIAIS.find((tutorial) => tutorial.caminho === caminho);
}
