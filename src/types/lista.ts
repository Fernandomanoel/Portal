import type { AreaId } from "./acesso";

/**
 * Listas de acompanhamento da área do professor: uma planilha simples que os
 * professores montam e preenchem juntos. Ficam guardadas até alguém apagar —
 * não entram na limpeza de 7 dias dos envios.
 */

export type TipoColuna = "texto" | "numero" | "data" | "marca" | "simnao" | "opcoes";

export const TIPOS_COLUNA: { tipo: TipoColuna; rotulo: string; descricao: string }[] = [
  { tipo: "texto", rotulo: "Texto", descricao: "Nome, observação, qualquer anotação" },
  { tipo: "numero", rotulo: "Número", descricao: "Valores, moeda ou porcentagem; aceita fórmulas como =SOMA(B1:B9)" },
  { tipo: "data", rotulo: "Data", descricao: "Escolhe o dia num calendário" },
  { tipo: "marca", rotulo: "Marca", descricao: "Um clique marca, outro desmarca" },
  { tipo: "simnao", rotulo: "Sim / Não", descricao: "Três estados: vazio, Sim ou Não" },
  { tipo: "opcoes", rotulo: "Lista de opções", descricao: "Você define as opções e escolhe na célula" },
];

export type CorLinha = "azul" | "verde" | "amarelo" | "vermelho" | "cinza";
export const CORES_LINHA: { cor: CorLinha; rotulo: string }[] = [
  { cor: "azul", rotulo: "Azul" },
  { cor: "verde", rotulo: "Verde" },
  { cor: "amarelo", rotulo: "Amarelo" },
  { cor: "vermelho", rotulo: "Vermelho" },
  { cor: "cinza", rotulo: "Cinza" },
];

/** Como um número aparece na célula; o valor guardado é sempre o mesmo (com ponto decimal). */
export type FormatoNumero = "numero" | "moeda" | "percentual";
export const FORMATOS_NUMERO: { formato: FormatoNumero; rotulo: string }[] = [
  { formato: "numero", rotulo: "Número (1.234,50)" },
  { formato: "moeda", rotulo: "Moeda (R$ 1.234,50)" },
  { formato: "percentual", rotulo: "Porcentagem (12,5%)" },
];

export interface EstiloCelula {
  fundo?: CorLinha;
  negrito?: boolean;
  italico?: boolean;
  alinhar?: "esquerda" | "centro" | "direita";
  /** `todas`: contorno forte em volta da célula; `nenhuma`: sem as linhas da grade. */
  bordas?: "todas" | "nenhuma";
}

/** Células mescladas: o canto de cima, à esquerda, e quantas linhas e colunas ocupa. Só dentro do mesmo bloco. */
export interface Mesclagem {
  linha: string;
  coluna: string;
  linhas: number;
  colunas: number;
}

/** Quantas linhas (de cima) e colunas (da esquerda) ficam fixas ao rolar. O cabeçalho é sempre fixo. */
export interface Congelamento {
  linhas: number;
  colunas: number;
}

export type TipoGrafico = "coluna" | "barra" | "linha" | "area" | "pizza" | "rosca" | "empilhada";
export type Agregacao = "soma" | "media" | "contagem" | "minimo" | "maximo";

/** Uma série do gráfico: valores de uma coluna numérica, ou, sem coluna, a contagem de linhas de cada categoria. */
export interface SerieGrafico {
  coluna?: string;
  agregacao: Agregacao;
}

export interface Grafico {
  id: string;
  titulo: string;
  tipo: TipoGrafico;
  /** Coluna que forma as categorias (eixo x, fatias). */
  categoria: string;
  series: SerieGrafico[];
  /** Mostra o valor em cada mark; vale para poucos pontos. */
  valores?: boolean;
}

export const LIMITES_GRAFICO = { graficos: 12, series: 6, titulo: 80 } as const;

export interface ColunaLista {
  id: string;
  titulo: string;
  tipo: TipoColuna;
  /** Só em `opcoes`. */
  opcoes?: string[];
  /** Em pixels, de LARGURA_MINIMA a LARGURA_MAXIMA. */
  largura: number;
  /** Só em `numero`. */
  formato?: FormatoNumero;
  /** Só em `numero`: casas decimais (0 a 6). */
  casas?: number;
  /** Só em `numero`: o que aparece no rodapé da coluna (soma, média, mínimo, máximo ou contagem). */
  rodape?: Agregacao;
}

/** Texto e opções guardam string; marca guarda true; Sim/Não guarda "sim" ou "nao". Vazio é ausente. */
export type ValorCelula = string | boolean;

export interface LinhaLista {
  id: string;
  valores: Record<string, ValorCelula>;
  cor?: CorLinha;
  negrito?: boolean;
  /** Estilo de células soltas (cor, negrito, alinhamento, bordas), por id de coluna. */
  estilos?: Record<string, EstiloCelula>;
  /** Linha de título de bloco (turma, horário): uma célula só, mesclada em todas as colunas. Sem `valores`. */
  titulo?: string;
}

/**
 * Com quem a lista é compartilhada além da unidade dona, como numa lista do SharePoint.
 * `todas`: todas as unidades; `unidades`: só as escolhidas. `edicao`: quem recebe também edita.
 */
export interface Compartilhamento {
  com: "todas" | "unidades";
  unidades: string[];
  edicao: boolean;
}

/** O que quem abriu a lista pode fazer nela. Calculado pelo servidor a cada resposta, nunca guardado. */
export interface AcessoLista {
  editar: boolean;
  /** Mudar o compartilhamento e apagar: só quem é da unidade dona (ou de todas). */
  administrar: boolean;
}

export interface ListaAcompanhamento {
  id: string;
  /** Unidade dona da lista; `*` = lista da rede, criada por quem enxerga todas. Listas antigas não têm: valem como a unidade padrão. */
  unidade?: string;
  /** Área da lista (Informática ou Inglês). Listas antigas não têm: Informática. */
  area?: AreaId;
  compartilhamento?: Compartilhamento;
  acesso?: AcessoLista;
  titulo: string;
  colunas: ColunaLista[];
  linhas: LinhaLista[];
  mesclagens?: Mesclagem[];
  congelar?: Congelamento;
  graficos?: Grafico[];
  /** Sobe a cada gravação: duas pessoas salvando ao mesmo tempo não apagam o trabalho uma da outra. */
  versao: number;
  criadaPor: string;
  criadaEm: string;
  alteradaPor: string;
  alteradaEm: string;
}

export interface ResumoLista {
  id: string;
  unidade?: string;
  area?: AreaId;
  compartilhamento?: Compartilhamento;
  /** Calculado pelo servidor para quem pediu a lista. */
  acesso?: AcessoLista;
  titulo: string;
  colunas: number;
  linhas: number;
  alteradaPor: string;
  alteradaEm: string;
}

export const LIMITES_LISTA = { colunas: 60, linhas: 1000, texto: 500, titulo: 120, opcoes: 30 } as const;
export const LARGURA_MINIMA = 64;
export const LARGURA_MAXIMA = 480;
export const LARGURA_PADRAO: Record<TipoColuna, number> = { texto: 220, numero: 140, data: 150, marca: 140, simnao: 150, opcoes: 170 };

/** Tamanho de uma lista nova: colunas A a Z e 100 linhas, como numa planilha. */
export const GRADE_INICIAL = { colunas: 26, linhas: 100 } as const;
