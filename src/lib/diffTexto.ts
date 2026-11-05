import type { ConteudoCurso } from "@/types/conteudoProfessor";

export type Parte = { tipo: "igual" | "novo" | "removido"; texto: string };

/** Menor sequência de edições entre duas listas (LCS); suficiente para textos de aula. */
function diffLista<T>(a: T[], b: T[], igual: (x: T, y: T) => boolean = (x, y) => x === y): { tipo: Parte["tipo"]; valor: T }[] {
  const n = a.length;
  const m = b.length;
  const t: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) t[i][j] = igual(a[i], b[j]) ? t[i + 1][j + 1] + 1 : Math.max(t[i + 1][j], t[i][j + 1]);
  const saida: { tipo: Parte["tipo"]; valor: T }[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (igual(a[i], b[j])) {
      saida.push({ tipo: "igual", valor: a[i] });
      i++;
      j++;
    } else if (t[i + 1][j] >= t[i][j + 1]) saida.push({ tipo: "removido", valor: a[i++] });
    else saida.push({ tipo: "novo", valor: b[j++] });
  }
  while (i < n) saida.push({ tipo: "removido", valor: a[i++] });
  while (j < m) saida.push({ tipo: "novo", valor: b[j++] });
  return saida;
}

/** Diferença palavra a palavra dentro de uma linha alterada. */
export function diffPalavras(antes: string, depois: string): Parte[] {
  const quebra = (s: string) => s.match(/\s+|[^\s]+/g) ?? [];
  const partes: Parte[] = [];
  for (const { tipo, valor } of diffLista(quebra(antes), quebra(depois))) {
    const ultima = partes.at(-1);
    if (ultima && ultima.tipo === tipo) ultima.texto += valor;
    else partes.push({ tipo, texto: valor });
  }
  return partes;
}

export interface LinhaDiff {
  tipo: "igual" | "novo" | "removido" | "alterado";
  texto: string;
  /** Só em `alterado`: a linha com as palavras trocadas marcadas. */
  partes?: Parte[];
}

/** O conteúdo como linhas legíveis, na ordem em que aparece na tela: é o que se compara entre versões. */
export function paraLinhas(c: ConteudoCurso): string[] {
  const l: string[] = [`Resumo: ${c.resumo}`];
  c.topicos.forEach((t, i) => {
    l.push(`Tópico ${i + 1}: ${t.titulo}`);
    t.texto.forEach((p) => l.push(p));
    if (t.exemplo) l.push(`Exemplo: ${t.exemplo}`);
    t.pontos?.forEach((p) => l.push(`Sair sabendo: ${p}`));
    t.erros?.forEach((p) => l.push(`Erro comum: ${p}`));
    if (t.atividades?.length) l.push(`Aparece em: ${t.atividades.join(", ")}`);
  });
  c.glossario.forEach((g) => l.push(`Glossário — ${g.termo}: ${g.definicao}`));
  c.dicas.forEach((d) => l.push(`Dica: ${d}`));
  return l;
}

export function compararConteudos(antes: ConteudoCurso, depois: ConteudoCurso): LinhaDiff[] {
  const ops = diffLista(paraLinhas(antes), paraLinhas(depois));
  const saida: LinhaDiff[] = [];
  for (let k = 0; k < ops.length; ) {
    if (ops[k].tipo === "igual") {
      saida.push({ tipo: "igual", texto: ops[k++].valor });
      continue;
    }
    const removidos: string[] = [];
    const novos: string[] = [];
    while (k < ops.length && ops[k].tipo !== "igual") (ops[k].tipo === "removido" ? removidos : novos).push(ops[k++].valor);
    // Linhas trocadas por outras: mostra o que mudou dentro de cada uma, em vez de apagar e reescrever.
    const pares = Math.min(removidos.length, novos.length);
    for (let p = 0; p < pares; p++) {
      const partes = diffPalavras(removidos[p], novos[p]);
      const parecidas = partes.filter((x) => x.tipo === "igual").reduce((s, x) => s + x.texto.length, 0) > Math.min(removidos[p].length, novos[p].length) * 0.35;
      if (parecidas) saida.push({ tipo: "alterado", texto: novos[p], partes });
      else saida.push({ tipo: "removido", texto: removidos[p] }, { tipo: "novo", texto: novos[p] });
    }
    removidos.slice(pares).forEach((texto) => saida.push({ tipo: "removido", texto }));
    novos.slice(pares).forEach((texto) => saida.push({ tipo: "novo", texto }));
  }
  return saida;
}

export const houveMudanca = (linhas: LinhaDiff[]) => linhas.some((l) => l.tipo !== "igual");
