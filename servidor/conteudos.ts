import type { ConteudoCurso, TopicoTeoria } from "../src/types/conteudoProfessor.js";
import { LIMITES_CONTEUDO as L } from "../src/types/conteudoProfessor.js";

/**
 * Conteúdos dos cursos editados pelos professores (a «wiki»). Cada curso tem um
 * arquivo `conteudos/<slug>.json` com todas as versões, fora das pastas que a
 * limpeza de 7 dias percorre. A versão 0 é o arquivo do código e não é guardada.
 */

export const slugValido = (slug: string) => /^[a-z0-9][a-z0-9-]{0,59}$/.test(slug);
export const caminhoConteudo = (slug: string) => `conteudos/${slug}.json`;

const texto = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\r\n/g, "\n").slice(0, max).trim() : "");

function lista(v: unknown, quantos: number, max: number): string[] | null {
  if (v === undefined) return [];
  if (!Array.isArray(v) || v.length > quantos) return null;
  return v.map((x) => texto(x, max)).filter(Boolean);
}

/** Devolve o conteúdo limpo (só os campos conhecidos, dentro dos limites) ou a mensagem do que está errado. */
export function validarConteudo(bruto: unknown): ConteudoCurso | string {
  if (!bruto || typeof bruto !== "object") return "Conteúdo em formato inválido.";
  const c = bruto as Record<string, unknown>;
  const resumo = texto(c.resumo, L.resumo);
  if (!resumo) return "O resumo do curso não pode ficar vazio.";

  if (!Array.isArray(c.topicos) || c.topicos.length === 0) return "O curso precisa de ao menos um tópico.";
  if (c.topicos.length > L.topicos) return `Um curso pode ter até ${L.topicos} tópicos.`;
  const topicos: TopicoTeoria[] = [];
  for (const [i, t] of (c.topicos as Record<string, unknown>[]).entries()) {
    if (!t || typeof t !== "object") return `Tópico ${i + 1} inválido.`;
    const titulo = texto(t.titulo, L.tituloTopico);
    if (!titulo) return `O tópico ${i + 1} precisa de um título.`;
    const paragrafos = lista(t.texto, L.paragrafos, L.paragrafo);
    if (!paragrafos || paragrafos.length === 0) return `O tópico «${titulo}» precisa de ao menos um parágrafo.`;
    const pontos = lista(t.pontos, L.itens, L.item);
    const erros = lista(t.erros, L.itens, L.item);
    if (!pontos || !erros) return `Listas grandes demais no tópico «${titulo}».`;
    const atividades = Array.isArray(t.atividades) && t.atividades.length <= L.atividades ? t.atividades.filter((a): a is string => typeof a === "string" && /^[a-zA-Z0-9_-]{1,120}$/.test(a)) : [];
    const exemplo = texto(t.exemplo, L.exemplo);
    topicos.push({
      titulo,
      texto: paragrafos,
      ...(pontos.length ? { pontos } : {}),
      ...(exemplo ? { exemplo } : {}),
      ...(erros.length ? { erros } : {}),
      ...(atividades.length ? { atividades } : {}),
    });
  }

  if (!Array.isArray(c.glossario) || c.glossario.length > L.glossario) return `O glossário pode ter até ${L.glossario} termos.`;
  const glossario = (c.glossario as Record<string, unknown>[])
    .map((g) => ({ termo: texto(g?.termo, L.termo), definicao: texto(g?.definicao, L.definicao) }))
    .filter((g) => g.termo && g.definicao);
  const dicas = lista(c.dicas, L.dicas, L.dica);
  if (!dicas) return `Pode haver até ${L.dicas} dicas.`;
  return { resumo, topicos, glossario, dicas };
}

export const comentarioValido = (v: unknown) => texto(v, L.comentario);
