/** Um verso para digitar. `inicio` (segundos no vídeo) e `traducao` são opcionais. */
export interface LinhaClipe {
  texto: string;
  traducao?: string;
  inicio?: number;
}

export interface Clipe {
  id: string;
  titulo: string;
  /** Código de 11 caracteres do vídeo no YouTube. */
  youtubeId: string;
  linhas: LinhaClipe[];
}
