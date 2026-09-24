/**
 * Onde os envios e os arquivos dos alunos moram. Duas implementações com a
 * mesma forma: Vercel Blob (hoje, no portal publicado) e uma pasta no disco
 * (o servidor físico da escola). As rotas não sabem qual das duas estão usando.
 */
export interface ItemArmazenado {
  caminho: string;
  criadoEm: Date;
}

export interface ArquivoLido {
  corpo: ReadableStream<Uint8Array>;
  tipo: string;
  tamanho: number;
}

export interface Armazenamento {
  salvarJson(caminho: string, dado: unknown): Promise<void>;
  lerJson<T>(caminho: string): Promise<T | null>;
  salvarArquivo(caminho: string, bytes: Uint8Array, tipo: string): Promise<void>;
  lerArquivo(caminho: string): Promise<ArquivoLido | null>;
  listar(prefixo: string): Promise<ItemArmazenado[]>;
  apagar(caminhos: string[]): Promise<void>;
}
