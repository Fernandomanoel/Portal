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

/**
 * Imagem de apoio de um item — molde único para qualquer atividade futura
 * que precise de captura de tela/foto real (ex.: tutorial de software).
 * `url` pode ser um link externo (capturas oficiais de documentação do
 * fabricante) ou um `import` de `src/assets/` quando o arquivo for
 * hospedado no próprio projeto — nesse caso `url` recebe o valor do
 * import. Adicionar imagem a uma atividade é só preencher este objeto no
 * dado; o componente de renderização já sabe exibi-la.
 */
export interface ImagemReferencia {
  url: string;
  alt: string;
  legenda?: string;
}

/**
 * Um item serve dois formatos com o mesmo molde:
 * - exercício prático (o aluno faz no próprio computador): `passos` +
 *   `objetivo` + `imagem`, sem `campos` — não há o que corrigir;
 * - questão corrigida: `cenario`/`instrucao` + `campos` com `regra`.
 * Os dois podem conviver na mesma atividade.
 */
export interface ItemAtividade {
  id: string;
  titulo: string;
  cenario?: string;
  instrucao?: string;
  /** Tarefa em passos numerados, na ordem em que o aluno executa. */
  passos?: string[];
  /** Tarefa opcional a mais, para quem terminar antes ("Desafio extra"). */
  desafio?: string;
  /** Cuidado que o aluno precisa ter nesse item ("Atenção"). */
  aviso?: string;
  /** O que o aluno aprende com o item — exibido em destaque no fim do item. */
  objetivo?: string;
  campos?: Campo[];
  tabelaReferencia?: TabelaReferencia;
  imagem?: ImagemReferencia;
}

export interface AtividadeAutocorrigida {
  titulo: string;
  introducao: string;
  /** Regras lidas antes de começar (ex.: segurança ao mexer no disco), exibidas em destaque no topo. */
  regras?: { titulo: string; itens: string[] };
  itens: ItemAtividade[];
  /** Nota de atribuição exibida uma vez, quando algum item usa imagem de terceiros. */
  fonte?: { texto: string; url: string };
}
