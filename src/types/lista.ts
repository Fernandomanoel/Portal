/**
 * Listas de acompanhamento da área do professor: uma planilha simples que os
 * professores montam e preenchem juntos. Ficam guardadas até alguém apagar —
 * não entram na limpeza de 7 dias dos envios.
 */

export type TipoColuna = "texto" | "marca" | "simnao" | "opcoes";

export const TIPOS_COLUNA: { tipo: TipoColuna; rotulo: string; descricao: string }[] = [
  { tipo: "texto", rotulo: "Texto", descricao: "Nome, observação, qualquer anotação" },
  { tipo: "marca", rotulo: "Marca", descricao: "Um clique marca, outro desmarca" },
  { tipo: "simnao", rotulo: "Sim / Não", descricao: "Três estados: vazio, Sim ou Não" },
  { tipo: "opcoes", rotulo: "Lista de opções", descricao: "Você define as opções e escolhe na célula" },
];

export type CorLinha = "azul" | "verde" | "amarelo" | "vermelho";
export const CORES_LINHA: { cor: CorLinha; rotulo: string }[] = [
  { cor: "azul", rotulo: "Azul" },
  { cor: "verde", rotulo: "Verde" },
  { cor: "amarelo", rotulo: "Amarelo" },
  { cor: "vermelho", rotulo: "Vermelho" },
];

export interface ColunaLista {
  id: string;
  titulo: string;
  tipo: TipoColuna;
  /** Só em `opcoes`. */
  opcoes?: string[];
  /** Em pixels, de LARGURA_MINIMA a LARGURA_MAXIMA. */
  largura: number;
}

/** Texto e opções guardam string; marca guarda true; Sim/Não guarda "sim" ou "nao". Vazio é ausente. */
export type ValorCelula = string | boolean;

export interface LinhaLista {
  id: string;
  valores: Record<string, ValorCelula>;
  cor?: CorLinha;
  negrito?: boolean;
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
  compartilhamento?: Compartilhamento;
  acesso?: AcessoLista;
  titulo: string;
  colunas: ColunaLista[];
  linhas: LinhaLista[];
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
export const LARGURA_PADRAO: Record<TipoColuna, number> = { texto: 220, marca: 140, simnao: 150, opcoes: 170 };
