/**
 * FAGA: ficha de acompanhamento do aluno de Inglês. O professor monta à mão: uma faixa por aula
 * (com as atividades que ela tem) e marca cada atividade quando o aluno conclui. Nada vem pronto:
 * o conteúdo de cada livro é o que o professor escrever.
 */

export interface AtividadeFaga {
  id: string;
  rotulo: string;
  feita: boolean;
}

export interface FaixaFaga {
  id: string;
  /** «Unit 73 – First Class». */
  titulo: string;
  /** Bloco a que a aula pertence (várias faixas com o mesmo nome formam um bloco). */
  bloco: string;
  /** AAAA-MM-DD, ou vazio. */
  inicio: string;
  fim: string;
  professor: string;
  atividades: AtividadeFaga[];
}

/** Valores do cálculo de módulos; mudam conforme o livro e a velocidade do aluno. */
export interface ConfigModulosIngles {
  /** Blocos que o livro tem. */
  blocosDoLivro: number;
  /** Aulas em que cada bloco deve ser visto. */
  aulasPorBloco: number;
  /** Em quantos meses o livro deve terminar. */
  mesesPorLivro: number;
}

export const CONFIG_MODULOS_INGLES: ConfigModulosIngles = { blocosDoLivro: 8, aulasPorBloco: 6, mesesPorLivro: 12 };

export interface Faga {
  id: string;
  /** Unidade do aluno (mesmo id das unidades do portal). */
  unidade: string;
  aluno: string;
  livro: string;
  /** Início e fim da etapa, AAAA-MM-DD ou vazio. */
  etapaInicio: string;
  etapaFim: string;
  /** Carga horária da etapa, texto livre. */
  horas: string;
  faixas: FaixaFaga[];
  config: ConfigModulosIngles;
  /** Turma e aluno da turma a que esta FAGA pertence; vazio = aluno avulso. */
  turmaId?: string;
  alunoId?: string;
  /** Imprimir também a folha de autoavaliação. */
  autoavaliacao: boolean;
  /** Assuntos do livro para o aluno marcar na autoavaliação («Check what you have learned thoroughly»). */
  topicos: string[];
  criadoEm: string;
  alteradoEm: string;
  criadoPor: string;
}

export const LIMITES_FAGA = { topicos: 8, texto: 120, faixas: 80, atividades: 60, blocosMax: 60, aulasPorBlocoMax: 40, mesesMax: 60 } as const;

/** Faixa/atividade concluída: todas as atividades marcadas (faixa sem atividade conta pela data de término). */
export function faixaConcluida(faixa: FaixaFaga): boolean {
  return faixa.atividades.length ? faixa.atividades.every((a) => a.feita) : Boolean(faixa.fim);
}

/** Modelo de um livro, copiado das FAGAs em papel: aulas e atividades na ordem original. */
export interface ModeloFagaLivro {
  /** «FB25». */
  livro: string;
  /** Coleção do livro («Book 8»). */
  colecao: string;
  faixas: { titulo: string; atividades: string[] }[];
  topicos: string[];
}

/** Bloco da aula: «Unit 73» para as aulas da unidade; Flashback e Musical Meeting formam o próprio bloco. */
export const blocoDaAula = (titulo: string) => titulo.split(" - ")[0].trim();

export const DIAS_DA_SEMANA = [
  { id: 1, curto: "Seg", nome: "Segunda" },
  { id: 2, curto: "Ter", nome: "Terça" },
  { id: 3, curto: "Qua", nome: "Quarta" },
  { id: 4, curto: "Qui", nome: "Quinta" },
  { id: 5, curto: "Sex", nome: "Sexta" },
  { id: 6, curto: "Sáb", nome: "Sábado" },
  { id: 0, curto: "Dom", nome: "Domingo" },
] as const;

export interface AlunoTurma {
  id: string;
  nome: string;
}

/** Turma de Inglês: a professora digita os alunos, os dias da semana e o horário; cada aluno tem a própria FAGA. */
export interface Turma {
  id: string;
  unidade: string;
  nome: string;
  /** Livro da turma («FB25»): vira o modelo das FAGAs dos alunos. */
  livro: string;
  /** 0 = domingo … 6 = sábado. */
  dias: number[];
  horario: string;
  alunos: AlunoTurma[];
  criadoEm: string;
  alteradoEm: string;
  criadoPor: string;
}

export const LIMITES_TURMA = { alunos: 60, texto: 80 } as const;
