import type { Clipe } from "@/types/digitacaoClipe";

/**
 * Clipes fixos da digitação «Digite o Clipe». Vazio de propósito: letra de música tem dono e só entra aqui com
 * a fonte do texto (e do vídeo) em mãos. Enquanto isso, o professor e o aluno montam o clipe na própria tela,
 * colando o link do YouTube e a letra; isso fica guardado só no navegador de quem montou.
 */
export const CLIPES_DIGITACAO: Clipe[] = [];

/** Chave do ranking da digitação com clipes (um só, para todos os clipes). */
export const ID_RANKING_CLIPE = "digitacao-clipe";
