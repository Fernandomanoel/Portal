/**
 * Uma atividade autocorrigida é uma lista de itens; cada item tem 1+ campos,
 * e o item só conta como certo se todos os seus campos estiverem certos.
 * Isso cobre tanto pergunta simples (1 campo) quanto exercício de associação
 * onde 2-3 seletores juntos formam uma única resposta (ver `Campo`).
 */
export type RegraCampo =
  | { tipo: "texto"; minPalavras?: number; minCaracteres?: number; palavrasChave?: RegExp }
  | { tipo: "padrao"; padrao: RegExp }
  | { tipo: "selecao"; opcoes: { valor: string; texto: string }[]; esperado: string | string[] }
  | { tipo: "multipla_escolha"; opcoes: string[]; correta: number }
  | {
      tipo: "numero";
      /** Valor alvo, ou uma fórmula sobre as respostas dos outros campos do item (ex.: reembolso = adiantamento − total). */
      esperado: number | ((respostas: Record<string, string>) => number);
      tolerancia?: number;
    };

export interface Campo {
  id: string;
  rotulo?: string;
  placeholder?: string;
  /** Campo de referência, não editável (ex.: "Adiantamento recebido: R$ 1.200,00"). */
  somenteLeitura?: boolean;
  valorPadrao?: string;
  /** Sem `regra`, o campo é só informativo — não entra na correção. */
  regra?: RegraCampo;
  mensagemCerta?: string;
  mensagemErrada?: string;
}

export interface TabelaReferencia {
  colunas: string[];
  linhas: string[][];
}

export interface ItemAtividade {
  id: string;
  titulo: string;
  cenario?: string;
  instrucao?: string;
  campos: Campo[];
  tabelaReferencia?: TabelaReferencia;
}

export interface AtividadeAutocorrigida {
  titulo: string;
  introducao: string;
  itens: ItemAtividade[];
}
