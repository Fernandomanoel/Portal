export type AssuntoGuiado = "windows" | "word" | "excel" | "powerpoint" | "ia" | "seguranca";

export interface TutorialResumo {
  titulo: string;
  descricao: string;
  /** Caminho do `.atividade.ts` dentro de `src/data/atividadesAutocorrigidas/`. */
  caminho: string;
  assunto: AssuntoGuiado;
  /** Capa do card na vitrine; sem ela, o card mostra a cor e o ícone do assunto. */
  capa?: string;
}

/** A mecânica de cada jogo é um componente próprio; isto é só o card da vitrine. */
export interface JogoConceito {
  slug: string;
  titulo: string;
  descricao: string;
  capa?: string;
}
