export interface PerguntaMultiplaEscolha {
  pergunta: string;
  opcoes: string[];
  /** Índice da opção correta. Fica no servidor: nunca chega ao navegador do aluno. */
  correta: number;
}

/** Arquivo que o aluno anexa à prova (a planilha da prova de Excel, por exemplo). */
export interface EnvioArquivo {
  /** Sem o arquivo, o botão de enviar a prova não libera. */
  obrigatorio: boolean;
  /** Com ponto e em minúsculas: [".xlsx", ".xls"]. */
  extensoes: string[];
  /** O que aparece acima do campo ("Envie a planilha com as fórmulas"). */
  rotulo?: string;
}

/** Regras de aplicação que valem para qualquer tipo de prova. */
export interface RegrasProva {
  /**
   * Por padrão a prova trava o aluno nela: tela cheia e bloqueio ao trocar de
   * aba ou janela, até o professor liberar. Prova feita fora do portal (a de
   * IA, que usa outras abas) desliga a trava com `true`.
   */
  permiteSairDaAba?: boolean;
  envioArquivo?: EnvioArquivo;
}

export interface ProvaMultiplaEscolha extends RegrasProva {
  tipo?: "multipla_escolha";
  titulo: string;
  perguntas: PerguntaMultiplaEscolha[];
}

export interface ProvaDescritiva extends RegrasProva {
  tipo: "descritiva";
  titulo: string;
  /** Cada item é o enunciado de uma pergunta aberta. */
  perguntas: string[];
}

/**
 * Prova prática: o aluno segue as instruções num programa (Excel, Word...) e
 * envia o arquivo que produziu. Sem perguntas na tela; a nota é do professor.
 */
export interface ProvaPratica extends RegrasProva {
  tipo: "pratica";
  titulo: string;
  instrucoes: string[];
  /** Material de apoio: o enunciado em PDF, a planilha de dados. */
  material?: { rotulo: string; url: string };
  envioArquivo: EnvioArquivo;
}

export type ProvaInterativa = ProvaMultiplaEscolha | ProvaDescritiva | ProvaPratica;

/**
 * A prova como chega ao navegador do aluno: igual, menos o gabarito. Quem
 * entrega é o servidor (`GET /api/provas/<id>`), que também é quem corrige.
 */
export type ProvaMultiplaEscolhaAluno = Omit<ProvaMultiplaEscolha, "perguntas"> & {
  perguntas: Omit<PerguntaMultiplaEscolha, "correta">[];
};
export type ProvaParaAluno = ProvaMultiplaEscolhaAluno | ProvaDescritiva | ProvaPratica;

export const NOTA_APROVACAO = 7;

export function ehDescritiva(prova: ProvaParaAluno): prova is ProvaDescritiva {
  return prova.tipo === "descritiva";
}

export function ehPratica(prova: ProvaParaAluno): prova is ProvaPratica {
  return prova.tipo === "pratica";
}

export function tipoDaProva(prova: ProvaParaAluno): "multipla_escolha" | "descritiva" | "pratica" {
  return prova.tipo ?? "multipla_escolha";
}

export function totalDeQuestoes(prova: ProvaParaAluno): number {
  return ehPratica(prova) ? 0 : prova.perguntas.length;
}
