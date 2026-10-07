import type { NomeFigura } from "@/components/ingles/figuras";
import type { ArquivoProva } from "./prova";

/**
 * Exercício da prática "Ouça e Leia": um por tela, corrigido na hora.
 * `explicacao` aparece depois de verificar (pegadinhas, regra de gramática).
 */
export type ExercicioIngles = { explicacao?: string } & (
  /** A Gabi fala a frase; o aluno escolhe a tradução. */
  | { tipo: "ouvir-multipla"; frase: string; opcoes: string[]; resposta: number }
  /** O aluno lê a frase (pode ouvir) e escolhe a tradução. */
  | { tipo: "ler-multipla"; frase: string; opcoes: string[]; resposta: number }
  /** A Gabi fala; o aluno escreve em inglês o que ouviu. */
  | { tipo: "ouvir-escrever"; frase: string; respostas: string[] }
  /** Frase em português; o aluno escreve em inglês. */
  | { tipo: "traduzir"; prompt: string; respostas: string[] }
  /** Desenho na tela; o aluno escolhe a palavra em inglês. */
  | { tipo: "imagem-multipla"; figura: NomeFigura; opcoes: string[]; resposta: number }
  /** Desenho na tela; o aluno escreve a palavra em inglês. */
  | { tipo: "imagem-escrever"; figura: NomeFigura; respostas: string[] }
  /** A Gabi fala; o aluno escolhe o desenho certo. */
  | { tipo: "ouvir-imagem"; frase: string; figuras: NomeFigura[]; resposta: number }
  /**
   * Monta a frase tocando nas palavras, na ordem. `palavras` já está na ordem
   * certa (a tela embaralha); `extras` são palavras que sobram de propósito.
   */
  | { tipo: "ordenar"; traducao: string; palavras: string[]; extras?: string[]; dica?: string }
);

/** Vocabulário mostrado antes dos exercícios: desenho, palavra e tradução. */
export interface ItemVocabulario {
  figura: NomeFigura;
  palavra: string;
  traducao: string;
}

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

/** Pergunta de compreensão sobre um texto ou conversa, com a explicação mostrada depois. */
export interface PerguntaCompreensao {
  pergunta: string;
  opcoes: string[];
  resposta: number;
  explicacao: string;
}

/** Discurso, aviso ou texto lido em voz alta, parágrafo a parágrafo, com tradução. */
export interface TextoFalado {
  titulo: string;
  /** Quem fala e para quem ("Diretora da escola, na formatura"). */
  quem: string;
  tipo: "discurso" | "aviso" | "apresentacao";
  paragrafos: { en: string; pt: string }[];
  vocabulario: { en: string; pt: string }[];
  perguntas: PerguntaCompreensao[];
}

export type Registro = "informal" | "neutro" | "formal";

/** Abreviação, gíria ou expressão explicada no glossário da conversa. */
export interface Expressao {
  /** Como aparece no texto ("brb", "gonna"). */
  termo: string;
  /** Forma completa em inglês, quando é abreviação ou contração. */
  porExtenso?: string;
  significado: string;
  registro: Registro;
  /** Onde cabe e onde não cabe usar. */
  uso: string;
}

export type CanalConversa = "mensagem" | "presencial" | "email" | "chat-trabalho" | "rede-social";

/** Conversa do mundo real entre duas pessoas, com o glossário do que ela usa. */
export interface ConversaReal {
  titulo: string;
  canal: CanalConversa;
  /** Situação em português: quem são, onde estão, por que conversam. */
  situacao: string;
  pessoas: [string, string];
  /** Em e-mail, `assunto` vai no cabeçalho de cada mensagem. */
  falas: { quem: 0 | 1; texto: string; traducao: string; assunto?: string }[];
  expressoes: Expressao[];
  perguntas: PerguntaCompreensao[];
}

/** Bloco de explicação da redação: o texto é em português; `exemplos` traz frases-modelo em inglês. */
export type BlocoRedacao =
  | { tipo: "texto"; texto: string }
  | { tipo: "lista"; itens: string[]; numerada?: boolean }
  | { tipo: "exemplos"; titulo?: string; itens: { en: string; pt?: string }[] }
  | { tipo: "tabela"; colunas: string[]; linhas: string[][] }
  | { tipo: "dica"; texto: string }
  | { tipo: "atencao"; texto: string };

export interface SecaoRedacao {
  titulo: string;
  blocos: BlocoRedacao[];
}

/** Um critério oficial de correção (as "métricas" do exame) e como ele vira autoavaliação. */
export interface CriterioRedacao {
  /** Nome oficial, em inglês ("Task Response"). */
  nome: string;
  traducao: string;
  /** Peso na nota da redação ("25%"). */
  peso: string;
  /** O que o examinador observa. */
  avalia: string;
  /** Como é uma redação de nota alta nesse critério. */
  notaAlta: string;
  /** O que mais tira ponto. */
  tiraPonto: string;
  /** Itens que o aluno confere na própria redação antes de terminar. */
  checklist: string[];
}

export interface ParagrafoModelo {
  /** Função do parágrafo ("Introdução", "Desenvolvimento 1"). */
  papel: string;
  en: string;
  pt: string;
  /** Por que esse parágrafo funciona, ligado aos critérios. */
  comentario: string;
}

/** O enunciado da redação, como aparece no exame. */
export interface PropostaRedacao {
  exame: "IELTS" | "TOEFL";
  /** Nome da tarefa no exame ("Writing Task 2"). */
  tarefa: string;
  minutos: number;
  /** Mínimo de palavras exigido ou recomendado. */
  minPalavras: number;
  /** Enunciado em inglês, um parágrafo por item. */
  enunciado: string[];
  /** O que o enunciado pede, explicado em português. */
  enunciadoPt: string;
  /** Dados da tarefa (tabela do IELTS Task 1). */
  tabela?: { titulo: string; colunas: string[]; linhas: string[][] };
  /** Fórum da tarefa Academic Discussion do TOEFL: a pergunta do professor e as respostas dos colegas. */
  discussao?: { professor: { nome: string; texto: string }; colegas: { nome: string; texto: string }[] };
  /** Tópicos que o texto precisa cobrir (o e-mail do TOEFL). */
  topicos?: string[];
}

/** Pergunta do treino: múltipla escolha com explicação, ou montar a frase (como o "Build a Sentence" do TOEFL). */
export type QuestaoTreinoRedacao =
  | ({ tipo?: "multipla" } & PerguntaCompreensao)
  | { tipo: "ordenar"; pergunta: string; palavras: string[]; extras?: string[]; explicacao: string };

export interface Redacao {
  proposta: PropostaRedacao;
  /** "Como é a tarefa": formato, estrutura, planejamento, frases-modelo e erros comuns. */
  guia: SecaoRedacao[];
  /** Escala de notas do exame, das faixas mais altas às mais baixas. */
  escala: { titulo: string; nota?: string; faixas: { nota: string; descricao: string }[] };
  criterios: CriterioRedacao[];
  modelo: { titulo: string; nota: string; paragrafos: ParagrafoModelo[] };
  treino: QuestaoTreinoRedacao[];
}

export type ConteudoIngles =
  | { tipo: "exercicios"; exercicios: ExercicioIngles[]; vocabulario?: ItemVocabulario[] }
  | { tipo: "dialogos"; dialogos: Dialogo[] }
  | { tipo: "textos"; textos: TextoFalado[] }
  | { tipo: "conversas"; conversas: ConversaReal[] }
  | { tipo: "redacao"; redacao: Redacao };

export type TrilhaIngles = "vocabulario" | "ouvir-ler" | "frases" | "gabi" | "vida-real" | "textos" | "redacao";

/** Inglês é uma trilha própria: tem atividades e provas separadas do fluxo geral. */
export interface AtividadeIngles {
  slug: string;
  titulo: string;
  descricao: string;
  /** Fala da Gabi na tela de abertura. */
  abertura: { titulo: string; texto: string };
  nivel: NivelIngles;
  trilha: TrilhaIngles;
  cor: string;
  conteudo: ConteudoIngles;
}

export type NivelIngles = "Básico" | "Intermediário" | "Avançado";

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
