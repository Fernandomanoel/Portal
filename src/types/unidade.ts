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
  /** Senha da aba Provas, por id de unidade, para quem esqueceu: só as unidades que têm lembrete cadastrado (a do professor; na coordenação, todas). */
  senhasProvas: Record<string, string>;
}

export const TODAS_AS_UNIDADES = "*";
