/**
 * Contrato da API do Portal de Atividades.
 *
 * Fonte da verdade dos formatos trocados entre o frontend React e a API PHP.
 * O documento que explica as regras é docs/API.md; este arquivo é a forma.
 *
 * Regra de evolução: campo novo entra opcional. Remover campo ou mudar o tipo
 * de um campo existente é quebra, e quebra vai para /api/v2.
 */

// ---------------------------------------------------------------- identidade

/** Ids são opacos: o cliente nunca monta nem interpreta um. */
export type InstrutorId = string & { readonly __marca: "InstrutorId" };
export type ProvaId = string & { readonly __marca: "ProvaId" };
export type AplicacaoId = string & { readonly __marca: "AplicacaoId" };
export type SubmissaoId = string & { readonly __marca: "SubmissaoId" };

/** Código curto que o aluno digita para abrir a prova. */
export type CodigoAplicacao = string & { readonly __marca: "CodigoAplicacao" };

/** ISO 8601 em UTC. */
export type DataHora = string;

// -------------------------------------------------------------------- erros

export type CodigoErro =
  | "VALIDATION_ERROR"
  | "NAO_AUTENTICADO"
  | "SEM_PERMISSAO"
  | "NAO_ENCONTRADO"
  | "CREDENCIAIS_INVALIDAS"
  | "LIMITE_TENTATIVAS"
  | "APLICACAO_ENCERRADA"
  | "JA_ENVIADA"
  | "IDEMPOTENCY_KEY_AUSENTE"
  | "IDEMPOTENCY_KEY_REUSADA"
  | "SUBMISSAO_EM_ANDAMENTO"
  | "NOTA_AUTOMATICA"
  | "ERRO_INTERNO";

export interface RespostaErro {
  error: {
    code: CodigoErro;
    message: string;
    details?: unknown;
  };
}

// --------------------------------------------------------------- paginação

export interface Paginacao {
  pagina: number;
  porPagina: number;
  totalItens: number;
  totalPaginas: number;
}

export interface Pagina<T> {
  dados: T[];
  paginacao: Paginacao;
}

/** Aceito por toda rota de lista. `porPagina` vai de 1 a 100, padrão 20. */
export interface ParametrosPagina {
  pagina?: number;
  porPagina?: number;
  ordenarPor?: string;
  ordem?: "asc" | "desc";
}

// ------------------------------------------------------------ autenticação

export interface Instrutor {
  id: InstrutorId;
  nome: string;
  email: string;
}

export interface EntrarInput {
  email: string;
  senha: string;
}

export interface Sessao {
  accessToken: string;
  /** Segundos até expirar. O refresh vai em cookie HttpOnly, nunca aqui. */
  expiraEm: number;
  instrutor: Instrutor;
}

// -------------------------------------------------------------------- prova

export type TipoProva = "MULTIPLA_ESCOLHA" | "DESCRITIVA";

/** O que o instrutor vê numa listagem. */
export interface ProvaResumo {
  id: ProvaId;
  titulo: string;
  curso: string;
  tipo: TipoProva;
  totalQuestoes: number;
  criadaEm: DataHora;
}

/** Questão com gabarito. Só o instrutor recebe este formato. */
export interface QuestaoMultiplaEscolha {
  numero: number;
  enunciado: string;
  opcoes: string[];
  /** Índice da opção correta em `opcoes`. Nunca sai numa rota pública. */
  correta: number;
}

export interface QuestaoDescritiva {
  numero: number;
  enunciado: string;
}

export type ProvaDetalhe = ProvaResumo &
  (
    | { tipo: "MULTIPLA_ESCOLHA"; questoes: QuestaoMultiplaEscolha[] }
    | { tipo: "DESCRITIVA"; questoes: QuestaoDescritiva[] }
  );

export interface ListarProvasParams extends ParametrosPagina {
  curso?: string;
  tipo?: TipoProva;
  busca?: string;
}

// ---------------------------------------------------------------- aplicação

export type StatusAplicacao = "ABERTA" | "ENCERRADA";

export interface Aplicacao {
  id: AplicacaoId;
  codigo: CodigoAplicacao;
  provaId: ProvaId;
  turma: string;
  status: StatusAplicacao;
  abertaEm: DataHora;
  /** Ausente quando o instrutor não definiu prazo. */
  encerraEm?: DataHora;
}

export interface AbrirAplicacaoInput {
  turma: string;
  encerraEm?: DataHora;
}

/** Atualização parcial: só o que está aqui pode mudar. */
export interface AtualizarAplicacaoInput {
  status?: StatusAplicacao;
  encerraEm?: DataHora | null;
}

/**
 * O que o aluno recebe. A ausência de `correta` nas questões é a garantia
 * central deste contrato: o gabarito não sai do servidor.
 */
export interface AplicacaoPublica {
  codigo: CodigoAplicacao;
  status: StatusAplicacao;
  prova: {
    titulo: string;
    tipo: TipoProva;
    questoes: QuestaoDescritiva[] | QuestaoSemGabarito[];
  };
}

export interface QuestaoSemGabarito {
  numero: number;
  enunciado: string;
  opcoes: string[];
}

// --------------------------------------------------------------- submissão

export type StatusSubmissao = "CORRIGIDA" | "AGUARDANDO_CORRECAO";

export type RespostaAluno =
  | { numero: number; opcao: number }
  | { numero: number; texto: string };

export interface EnviarSubmissaoInput {
  nomeAluno: string;
  respostas: RespostaAluno[];
}

/**
 * O recibo do envio. Discriminado por `status` para que o cliente não precise
 * checar `nota != null` para saber em que fase está.
 */
export type SubmissaoRecibo =
  | {
      id: SubmissaoId;
      status: "CORRIGIDA";
      nota: number;
      acertos: number;
      totalQuestoes: number;
      enviadaEm: DataHora;
    }
  | {
      id: SubmissaoId;
      status: "AGUARDANDO_CORRECAO";
      nota: null;
      totalQuestoes: number;
      enviadaEm: DataHora;
    };

export interface SubmissaoResumo {
  id: SubmissaoId;
  aplicacaoId: AplicacaoId;
  nomeAluno: string;
  status: StatusSubmissao;
  nota: number | null;
  enviadaEm: DataHora;
}

export interface SubmissaoDetalhe extends SubmissaoResumo {
  respostas: RespostaAluno[];
  /** Presente só em múltipla escolha, para o instrutor conferir. */
  gabarito?: { numero: number; correta: number }[];
  comentario?: string;
}

export interface ListarSubmissoesParams extends ParametrosPagina {
  aplicacaoId?: AplicacaoId;
  status?: StatusSubmissao;
  busca?: string;
}

/** Lançamento de nota. `nota` é número: a vírgula é problema da interface. */
export interface LancarNotaInput {
  nota: number;
  comentario?: string;
}

// ------------------------------------------------------------------ rotas

/**
 * As rotas como contrato executável. Cada método diz o que recebe e o que
 * devolve; o que ele lança está em docs/API.md, na tabela de status.
 */
export interface PortalAPI {
  // sessões
  entrar(input: EntrarInput): Promise<Sessao>;
  /** Autentica pelo cookie de refresh, não pelo Authorization. */
  renovarSessao(): Promise<Sessao>;
  /** Idempotente: encerrar sessão já encerrada não é erro. */
  sair(): Promise<void>;

  // provas
  listarProvas(params?: ListarProvasParams): Promise<Pagina<ProvaResumo>>;
  obterProva(id: ProvaId): Promise<ProvaDetalhe>;

  // aplicações
  abrirAplicacao(
    provaId: ProvaId,
    input: AbrirAplicacaoInput,
  ): Promise<Aplicacao>;
  listarAplicacoes(params?: ParametrosPagina): Promise<Pagina<Aplicacao>>;
  atualizarAplicacao(
    id: AplicacaoId,
    input: AtualizarAplicacaoInput,
  ): Promise<Aplicacao>;
  /** Público: é o que o aluno abre com o código. */
  obterAplicacaoPublica(codigo: CodigoAplicacao): Promise<AplicacaoPublica>;

  /**
   * Público. `idempotencyKey` é obrigatório e precisa ser gerado uma vez por
   * intenção de envio e reusado em toda retentativa — não um valor novo por
   * tentativa, que anula a garantia.
   */
  enviarSubmissao(
    codigo: CodigoAplicacao,
    input: EnviarSubmissaoInput,
    idempotencyKey: string,
  ): Promise<SubmissaoRecibo>;

  // correção
  listarSubmissoes(
    params?: ListarSubmissoesParams,
  ): Promise<Pagina<SubmissaoResumo>>;
  obterSubmissao(id: SubmissaoId): Promise<SubmissaoDetalhe>;
  lancarNota(id: SubmissaoId, input: LancarNotaInput): Promise<SubmissaoDetalhe>;
}
