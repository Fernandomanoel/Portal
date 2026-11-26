/** Um verso para digitar. `inicio` e `fim` (segundos no vídeo) sincronizam o clipe; `traducao` é opcional. */
export interface LinhaClipe {
  texto: string;
  traducao?: string;
  inicio?: number;
  fim?: number;
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
