import type { ItemAtividade, PassoGuiado } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

/** Começo repetido dos tutoriais de Word que mexem no nome já escrito. */
export const PREPARAR_NOME_NO_WORD: PassoGuiado[] = [
  {
    texto: "Abra o Word e escreva o seu nome. Você aprendeu isso no tutorial Abrir o Word e escrever seu nome.",
    imagem: figura("word-nome-pronto", "Folha do Word com o nome Ana Souza escrito"),
  },
  {
    texto: "Segure a tecla Ctrl e aperte a letra A.",
    textoNarrado: "Segure a tecla control e aperte a letra A.",
    imagem: figura("atalho-ctrl-a", "Tecla Ctrl e tecla A desenhadas grandes, com as palavras Marcar tudo"),
  },
  {
    texto: "O seu nome ficou marcado de azul. Agora o Word sabe qual texto você quer mudar.",
    imagem: figura("word-nome-selecionado", "Nome Ana Souza marcado de azul na folha do Word"),
  },
];

/** Começo repetido dos tutoriais de PowerPoint que continuam o slide do título. */
export const PREPARAR_SLIDE: PassoGuiado[] = [
  {
    texto: "Abra o PowerPoint e escreva o título. Você aprendeu isso no tutorial Escrever o título do slide.",
    textoNarrado: "Abra o Páuer-póint e escreva o título. Você aprendeu isso no tutorial Escrever o título do slide.",
    imagem: figura("ppt-pronto", "Slide do PowerPoint com o título Meu primeiro slide"),
  },
];

interface Conta {
  /** Prefixo dos desenhos da conta (ex.: `excel-soma`). */
  prefixo: string;
  a: string;
  b: string;
  /** Sinal como o Excel escreve (`+`, `-`, `*`, `/`). */
  sinal: string;
  resultado: string;
  /** Como se lê o sinal no meio da conta ("dividido por"). */
  sinalFalado: string;
  /** Nome do sinal sozinho ("sinal de dividir"). */
  nomeDoSinal: string;
  /** Passo que ensina onde fica o sinal no teclado. */
  tecla: { texto: string; desenho: string; alt: string };
}

/**
 * As quatro contas do Excel seguem a mesma sequência: dois números, o sinal
 * de igual, clicar no primeiro, o sinal da conta, clicar no segundo, Enter.
 * Fica num lugar só para as quatro não saírem diferentes umas das outras.
 */
export function contaNoExcel({ prefixo, a, b, sinal, resultado, sinalFalado, nomeDoSinal, tecla }: Conta): ItemAtividade[] {
  return [
    {
      id: "numeros",
      titulo: "Escrever os números",
      passosGuiados: [
        {
          texto: "Abra o Excel com uma pasta de trabalho em branco. Você aprendeu isso no tutorial Escrever um número no Excel.",
          imagem: figura("excel-em-branco", "Tela inicial do Excel com Pasta de trabalho em branco marcada"),
        },
        {
          texto: "Clique no primeiro quadradinho. O nome dele é A1: a letra A fica em cima e o número 1 fica do lado.",
          textoNarrado: "Clique no primeiro quadradinho. O nome dele é A um: a letra A fica em cima e o número um fica do lado.",
          imagem: figura("excel-clique-a1", "Primeiro quadradinho da planilha, o A1, marcado"),
        },
        {
          texto: `Digite o número ${a} e aperte a tecla Tab.`,
          imagem: figura("tecla-tab", "A tecla Tab do teclado, desenhada grande"),
        },
        {
          texto: `O ${a} ficou no A1. A borda verde foi para o lado, no B1.`,
          textoNarrado: `O ${a} ficou no A um. A borda verde foi para o lado, no B um.`,
          imagem: figura(`${prefixo}-a1`, `Número ${a} no A1 e a borda verde no B1`),
        },
        {
          texto: `Digite o número ${b} e aperte a tecla Tab.`,
          imagem: figura(`${prefixo}-b1`, `Número ${a} no A1, número ${b} no B1 e a borda verde no C1`),
        },
      ],
    },
    {
      id: "conta",
      titulo: "Fazer a conta",
      passosGuiados: [
        {
          texto: "Toda conta no Excel começa com o sinal de igual. Aperte a tecla =.",
          textoNarrado: "Toda conta no Excel começa com o sinal de igual. Aperte a tecla igual.",
          imagem: figura("tecla-igual", "A tecla do sinal de igual, desenhada grande"),
        },
        {
          texto: "O sinal = apareceu no C1.",
          textoNarrado: "O sinal de igual apareceu no C um.",
          imagem: figura(`${prefixo}-igual`, "Sinal de igual escrito no C1"),
        },
        {
          texto: `Clique no A1, onde está o ${a}. O Excel escreve A1 na conta.`,
          textoNarrado: `Clique no A um, onde está o ${a}. O Excel escreve A um na conta.`,
          imagem: figura(`${prefixo}-clique-a1`, `A1 marcado e a conta =A1 escrita no C1`),
        },
        { texto: tecla.texto, imagem: figura(tecla.desenho, tecla.alt) },
        {
          texto: `O sinal ${sinal} apareceu na conta.`,
          textoNarrado: `O sinal de ${nomeDoSinal} apareceu na conta.`,
          imagem: figura(`${prefixo}-sinal`, `Conta =A1${sinal} escrita no C1`),
        },
        {
          texto: `Clique no B1, onde está o ${b}.`,
          textoNarrado: `Clique no B um, onde está o ${b}.`,
          imagem: figura(`${prefixo}-clique-b1`, `B1 marcado e a conta =A1${sinal}B1 escrita no C1`),
        },
        { texto: "Aperte a tecla Enter.", imagem: figura("tecla-enter", "A tecla Enter do teclado, desenhada grande") },
        {
          texto: `O Excel fez a conta: ${a} ${sinal} ${b} = ${resultado}. Pronto!`,
          textoNarrado: `O Excel fez a conta: ${a} ${sinalFalado} ${b} é igual a ${resultado}. Pronto!`,
          imagem: figura(`${prefixo}-resultado`, `Resultado ${resultado} no C1 e um sinal verde de certo`),
        },
      ],
    },
  ];
}
