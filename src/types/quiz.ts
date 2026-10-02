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
  /**
   * Pergunta de programação: o aluno escreve código num campo monoespaçado e o
   * servidor confere cada verificação. Aqui a correção é definitiva — passou
   * em todas, acertou; faltou alguma, errou (nunca fica "a revisar"), então
   * `respostasAceitas` fica `[]`.
   */
  codigo?: boolean;
  verificacoes?: VerificacaoCodigo[];
}

/** Um requisito do código do aluno, checado por expressão regular (ver `verificarCodigo`). */
export interface VerificacaoCodigo {
  /** O que o código precisa ter; é o texto mostrado ao professor. */
  descricao: string;
  /** Fonte da RegExp, sem as barras. Roda sobre o código sem comentários. */
  padrao: string;
  /** Flags da RegExp ("i" para HTML e CSS, que não diferenciam maiúsculas). */
  flags?: string;
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

/**
 * Como cada campo de uma questão é corrigido. Fica no servidor: o aluno recebe
 * só o tipo de entrada (`EntradaCampo`), nunca o gabarito.
 *
 * Os valores digitados/escolhidos viajam sempre como texto: `selecao` guarda o
 * `valor` da opção, `multipla_escolha` o índice, `marcar` os índices separados
 * por vírgula ("0,2").
 */
export type RegraCampoProva =
  | { tipo: "selecao"; opcoes: { valor: string; texto: string }[]; esperado: string }
  | { tipo: "multipla_escolha"; opcoes: string[]; correta: number }
  | { tipo: "marcar"; opcoes: string[]; corretas: number[] }
  | { tipo: "numero"; esperado: number; tolerancia?: number }
  | {
      tipo: "texto";
      minPalavras?: number;
      minCaracteres?: number;
      /** Fonte da RegExp (sem as barras, testada sem diferenciar maiúsculas): a resposta precisa casar. */
      palavrasChave?: string;
      /** Mensagem quando o texto é válido mas não casa com `palavrasChave`. */
      mensagemSemPalavraChave?: string;
    }
  | { tipo: "codigo"; verificacoes: VerificacaoCodigo[] };

export interface CampoProva {
  id: string;
  /** Texto da linha do campo ("Objetivo: ...", "O limite de texto é definido pela sua ___"). */
  rotulo?: string;
  placeholder?: string;
  regra: RegraCampoProva;
  mensagemCerta?: string;
  mensagemErrada?: string;
}

/**
 * Uma questão da prova autocorrigida: 1+ campos, e ela só conta como certa se
 * todos os campos estiverem certos — o mesmo molde das atividades do portal.
 */
export interface ItemProva {
  titulo: string;
  enunciado?: string;
  /** Caixa de apoio com fórmulas ou dados do cenário. */
  referencia?: string;
  /** Exemplo de saída ou de chamada, em fonte monoespaçada. */
  exemplo?: { rotulo: string; conteudo: string };
  /** Figura da questão (um fluxograma, por exemplo). `url` é um caminho em `public/`. */
  imagem?: { url: string; alt: string; legenda?: string };
  campos: CampoProva[];
  mensagemCerta?: string;
  mensagemErrada?: string;
}

/**
 * Prova com teste na hora: o aluno responde, clica em "Testar resposta" e vê
 * onde errou, quantas vezes quiser; o envio final é corrigido de novo pelo
 * servidor. Como não sai da tela (a trava de aba vale como em qualquer prova
 * que não seja prática), o professor acompanha as saídas no envio.
 */
export interface ProvaAutocorrigida extends RegrasProva {
  tipo: "autocorrigida";
  titulo: string;
  introducao?: string;
  itens: ItemProva[];
}

export type ProvaInterativa = ProvaMultiplaEscolha | ProvaDescritiva | ProvaPratica | ProvaMista | ProvaAutocorrigida;

export type EntradaCampo =
  | { tipo: "selecao"; opcoes: { valor: string; texto: string }[] }
  | { tipo: "multipla_escolha"; opcoes: string[] }
  | { tipo: "marcar"; opcoes: string[] }
  | { tipo: "numero" }
  | { tipo: "texto" }
  | { tipo: "codigo" };

export type CampoProvaAluno = Omit<CampoProva, "regra" | "mensagemCerta" | "mensagemErrada"> & { entrada: EntradaCampo };
export type ItemProvaAluno = Omit<ItemProva, "campos" | "mensagemCerta" | "mensagemErrada"> & { campos: CampoProvaAluno[] };
export type ProvaAutocorrigidaAluno = Omit<ProvaAutocorrigida, "itens"> & { itens: ItemProvaAluno[] };

/** Quantas vezes o aluno pode testar cada questão da prova autocorrigida. */
export const TENTATIVAS_POR_QUESTAO = 3;

/** Resposta do servidor a um "Testar resposta". */
export interface ResultadoItem {
  certo: boolean;
  mensagem?: string;
  /** Quantos testes a questão já gastou (de `maximo`). */
  tentativas: { usadas: number; maximo: number };
  campos: Record<string, { certo: boolean; mensagem?: string; detalhes?: { descricao: string; ok: boolean }[] }>;
}

/**
 * A prova como chega ao navegador do aluno: igual, menos o gabarito. Quem
 * entrega é o servidor (`GET /api/provas/<id>`), que também é quem corrige.
 */
export type ProvaMultiplaEscolhaAluno = Omit<ProvaMultiplaEscolha, "perguntas"> & {
  perguntas: Omit<PerguntaMultiplaEscolha, "correta">[];
};
export type PerguntaMistaAluno = Omit<PerguntaMultiplaEscolha, "correta"> | Omit<PerguntaDissertativaAuto, "respostasAceitas" | "verificacoes">;
export type ProvaMistaAluno = Omit<ProvaMista, "perguntas"> & { perguntas: PerguntaMistaAluno[] };
export type ProvaParaAluno = ProvaMultiplaEscolhaAluno | ProvaDescritiva | ProvaPratica | ProvaMistaAluno | ProvaAutocorrigidaAluno;

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

export function ehAutocorrigida(prova: ProvaParaAluno): prova is ProvaAutocorrigidaAluno {
  return prova.tipo === "autocorrigida";
}

export function tipoDaProva(prova: ProvaParaAluno): "multipla_escolha" | "descritiva" | "pratica" | "mista" | "autocorrigida" {
  return prova.tipo ?? "multipla_escolha";
}

export function totalDeQuestoes(prova: ProvaParaAluno): number {
  if (ehPratica(prova)) return 0;
  return ehAutocorrigida(prova) ? prova.itens.length : prova.perguntas.length;
}
