/**
 * Formatos trocados entre a prova, a área do professor e o servidor
 * (`servidor/`). Um arquivo só para os dois lados não divergirem.
 */

/** Saída da prova travada: trocou de aba, de janela ou saiu da tela cheia. */
export interface SaidaProva {
  em: string;
  motivo: "aba" | "janela" | "tela-cheia";
  /** Preenchidos quando o professor liberou a prova de novo. */
  liberadaEm?: string;
  liberadaPor?: string;
}

export interface ArquivoEnviado {
  nome: string;
  tipo: string;
  tamanho: number;
  /** Caminho interno no armazenamento; o professor baixa pela rota do envio. */
  caminho: string;
}

export interface Envio {
  id: string;
  /** Caminho do `.prova.ts` dentro de `provasInterativas/` ("IA/prompts"). */
  provaId: string;
  provaTitulo: string;
  tipoProva: "multipla_escolha" | "descritiva" | "pratica" | "mista" | "autocorrigida";
  nomeAluno: string;
  iniciadaEm: string;
  enviadaEm: string;
  /** Múltipla escolha: índice escolhido por questão. Descritiva: o texto.
   *  Mista: mistura os dois, na ordem das perguntas da prova. */
  respostas: (number | string | null)[];
  /** Múltipla escolha e mista, corrigida pelo servidor no envio. `aRevisar`
   *  só existe na mista: quantas dissertativas não bateram com nenhuma
   *  resposta aceita (a nota fica pendente até o professor conferir). */
  correcao?: { acertos: number; total: number; aRevisar?: number };
  /** 0 a 10. Nula até o professor corrigir (descritiva e prática). */
  nota: number | null;
  comentario?: string;
  corrigidaEm?: string;
  corrigidaPor?: string;
  arquivo?: ArquivoEnviado;
  saidas: SaidaProva[];
  /** O envio e o arquivo somem do banco nesta data (7 dias depois do envio). */
  apagarEm: string;
}

/** O que o aluno recebe depois de enviar: sem gabarito, sem respostas. */
export interface ReciboEnvio {
  id: string;
  nota: number | null;
  correcao?: { acertos: number; total: number; aRevisar?: number };
  enviadaEm: string;
}

export interface Professor {
  usuario: string;
  nome: string;
}

/** Mesmo formato de `LancarNotaInput` em contrato/api.ts. */
export interface LancarNotaInput {
  nota: number;
  comentario?: string;
}

export const DIAS_GUARDADOS = 7;
export const LIMITE_ARQUIVO_MB = 4;
