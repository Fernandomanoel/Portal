/** Um verso para digitar. `inicio` (segundos no vídeo) e `traducao` são opcionais. */
export interface LinhaClipe {
  texto: string;
  traducao?: string;
  inicio?: number;
}

export interface Clipe {
  id: string;
  titulo: string;
  artista: string;
  /** Caminho do vídeo em `public/digitacao/clipes/`. */
  video: string;
  /** Imagem de capa (quadro do vídeo). */
  capa: string;
  linhas: LinhaClipe[];
}
