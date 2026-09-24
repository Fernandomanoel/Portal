import type { ArquivoProva } from "./prova";

/** Exercício da prática "Ouça e Leia": um por tela, corrigido na hora. */
export type ExercicioIngles =
  /** A Gabi fala a frase; o aluno escolhe a tradução. */
  | { tipo: "ouvir-multipla"; frase: string; opcoes: string[]; resposta: number }
  /** O aluno lê a frase (pode ouvir) e escolhe a tradução. */
  | { tipo: "ler-multipla"; frase: string; opcoes: string[]; resposta: number }
  /** A Gabi fala; o aluno escreve em inglês o que ouviu. */
  | { tipo: "ouvir-escrever"; frase: string; respostas: string[] }
  /** Frase em português; o aluno escreve em inglês. */
  | { tipo: "traduzir"; prompt: string; respostas: string[] };

interface FalaBase {
  /** O que a Gabi diz, em inglês. */
  gabi: string;
  traducao: string;
}

/** Uma vez na conversa: a Gabi fala e o aluno responde. */
export type FalaDialogo =
  | (FalaBase & { tipo: "multipla"; opcoes: string[]; resposta: number })
  | (FalaBase & { tipo: "escrever"; respostas: string[] })
  /** A resposta vem pronta com uma palavra faltando (`antes` + ___ + `depois`). */
  | (FalaBase & { tipo: "completar"; antes: string; depois: string; opcoes: string[]; resposta: number });

export interface Dialogo {
  titulo: string;
  falas: FalaDialogo[];
}

export type ConteudoIngles =
  | { tipo: "exercicios"; exercicios: ExercicioIngles[] }
  | { tipo: "dialogos"; dialogos: Dialogo[] };

/** Inglês é uma trilha própria: tem atividades e provas separadas do fluxo geral. */
export interface AtividadeIngles {
  slug: string;
  titulo: string;
  descricao: string;
  /** Fala da Gabi na tela de abertura. */
  abertura: { titulo: string; texto: string };
  nivel?: string;
  cor: string;
  conteudo: ConteudoIngles;
}

/** Atividade de inglês que mora em outra seção (ex.: jogo de digitação) e aparece na trilha como atalho. */
export interface AtalhoIngles {
  titulo: string;
  descricao: string;
  cor: string;
  para: string;
}

export interface ProvaIngles extends ArquivoProva {
  /** Agrupa as provas por nível ou módulo dentro da seção de Inglês. */
  grupo?: string;
}
