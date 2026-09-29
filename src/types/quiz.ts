export interface PerguntaMultiplaEscolha {
  tipo?: "multipla_escolha";
  pergunta: string;
  opcoes: string[];
  /** Índice da opção correta. Fica no servidor: nunca chega ao navegador do aluno. */
  correta: number;
}

/**
 * Pergunta dissertativa que o servidor tenta corrigir sozinho, comparando a
 * resposta do aluno com uma lista de respostas aceitas (ver
 * `src/lib/correcaoTexto.ts`: ignora maiúsculas, acentos e espaço extra).
 * Quando a resposta não bate com nenhuma, a questão fica "a revisar" — nunca
 * marcada errada sem o professor conferir.
 */
export interface PerguntaDissertativaAuto {
  tipo: "dissertativa";
  pergunta: string;
  respostasAceitas: string[];
}

export type PerguntaMista = PerguntaMultiplaEscolha | PerguntaDissertativaAuto;

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
  /** Tabela de exemplo só para ilustrar o formato esperado (útil em Excel) —
   *  não é editável, não é enviada, é puramente uma demonstração visual.
   *  `rotulo` troca a legenda padrão (“não precisa ser igual”) quando a
   *  tabela traz os dados que o aluno tem de digitar. */
  exemploTabela?: { rotulo?: string; colunas: string[]; linhas: string[][] };
  /** Imagem de exemplo só para ilustrar o resultado esperado (ex.: um e-mail
   *  com assinatura). `url` é um caminho em `public/` — a prova é carregada
   *  pelo servidor, então não pode importar arquivo de `src/assets/`. */
  exemploImagem?: { url: string; alt: string; legenda?: string };
  envioArquivo: EnvioArquivo;
}

/**
 * Prova mista: mistura múltipla escolha com dissertativas autocorrigidas no
 * mesmo formulário. Continua 100% autocorrigida — a nota só fica pendente
 * (null) quando alguma dissertativa cai em "a revisar".
 */
export interface ProvaMista extends RegrasProva {
  tipo: "mista";
  titulo: string;
  perguntas: PerguntaMista[];
}

export type ProvaInterativa = ProvaMultiplaEscolha | ProvaDescritiva | ProvaPratica | ProvaMista;

/**
 * A prova como chega ao navegador do aluno: igual, menos o gabarito. Quem
 * entrega é o servidor (`GET /api/provas/<id>`), que também é quem corrige.
 */
export type ProvaMultiplaEscolhaAluno = Omit<ProvaMultiplaEscolha, "perguntas"> & {
  perguntas: Omit<PerguntaMultiplaEscolha, "correta">[];
};
export type PerguntaMistaAluno = Omit<PerguntaMultiplaEscolha, "correta"> | Omit<PerguntaDissertativaAuto, "respostasAceitas">;
export type ProvaMistaAluno = Omit<ProvaMista, "perguntas"> & { perguntas: PerguntaMistaAluno[] };
export type ProvaParaAluno = ProvaMultiplaEscolhaAluno | ProvaDescritiva | ProvaPratica | ProvaMistaAluno;

export const NOTA_APROVACAO = 7;

export function ehDescritiva(prova: ProvaParaAluno): prova is ProvaDescritiva {
  return prova.tipo === "descritiva";
}

export function ehPratica(prova: ProvaParaAluno): prova is ProvaPratica {
  return prova.tipo === "pratica";
}

export function ehMista(prova: ProvaParaAluno): prova is ProvaMistaAluno {
  return prova.tipo === "mista";
}

export function tipoDaProva(prova: ProvaParaAluno): "multipla_escolha" | "descritiva" | "pratica" | "mista" {
  return prova.tipo ?? "multipla_escolha";
}

export function totalDeQuestoes(prova: ProvaParaAluno): number {
  return ehPratica(prova) ? 0 : prova.perguntas.length;
}
