/** Unidade (escola/filial): quem usa o portal se identifica por ela com a senha da aba Provas. */
export interface Unidade {
  id: string;
  nome: string;
}

/** O que a senha da unidade devolve: a unidade e uma ficha assinada que o envio da prova leva junto. */
export interface FichaUnidade {
  unidade: Unidade;
  ficha: string;
  /** ISO. Depois disso a senha é pedida de novo. */
  expiraEm: string;
}

/** Quem está logado na área do professor, com a unidade resolvida. */
export interface SessaoProfessor {
  usuario: string;
  nome: string;
  unidade: Unidade;
  /** Coordenação: enxerga todas as unidades. */
  coordenacao: boolean;
  /** Só na coordenação: todas as unidades cadastradas. */
  unidades: Unidade[];
}

export const TODAS_AS_UNIDADES = "*";
