import type { ConteudoCurso } from "@/types/conteudoProfessor";

/**
 * Carrega a teoria de um curso só quando a página dele abre: o pacote do
 * professor não vai junto com o do aluno. Um curso entra aqui por ter o arquivo
 * `<slug>.conteudo.ts` nesta pasta.
 */
const MODULOS = import.meta.glob<{ default: ConteudoCurso }>("./*.conteudo.ts");

const chave = (slug: string) => `./${slug}.conteudo.ts`;

export const temConteudo = (slug: string) => chave(slug) in MODULOS;

export async function carregarConteudo(slug: string): Promise<ConteudoCurso | null> {
  const carregar = MODULOS[chave(slug)];
  return carregar ? (await carregar()).default : null;
}
