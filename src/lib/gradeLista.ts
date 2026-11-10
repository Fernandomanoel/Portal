import { lerNumero } from "./formulas.js";
import {
  LIMITES_LISTA,
  type ColunaLista,
  type EstiloCelula,
  type LinhaLista,
  type ListaAcompanhamento,
  type Mesclagem,
  type ValorCelula,
} from "../types/lista.js";

/**
 * Operações da grade que servem ao navegador e ao servidor (por isso não tocam em DOM nem em React):
 * mesclagem de células, seleção em área, estilo por célula, copiar e colar.
 */
type Lista = ListaAcompanhamento;

/** Retângulo de células, em posições da lista (linha e coluna, a partir de 0), com l1 ≤ l2 e c1 ≤ c2. */
export interface Area {
  l1: number;
  c1: number;
  l2: number;
  c2: number;
}

/** Seleção na tela: a célula de onde começou e a de onde termina (podem ser a mesma). */
export interface Selecao {
  ancora: { l: number; c: number };
  fim: { l: number; c: number };
}
export const areaDaSelecao = (s: Selecao): Area => normalizarArea({ l1: s.ancora.l, c1: s.ancora.c, l2: s.fim.l, c2: s.fim.c });

export const normalizarArea = (a: Area): Area => ({ l1: Math.min(a.l1, a.l2), l2: Math.max(a.l1, a.l2), c1: Math.min(a.c1, a.c2), c2: Math.max(a.c1, a.c2) });
export const areaContem = (a: Area, l: number, c: number) => l >= a.l1 && l <= a.l2 && c >= a.c1 && c <= a.c2;
export const areaUnica = (a: Area) => a.l1 === a.l2 && a.c1 === a.c2;

// ------------------------------------------------------------------ mesclagem

export interface CelulaMesclada {
  ancora: boolean;
  linhas: number;
  colunas: number;
}

/** Posição de cada célula coberta por uma mesclagem (`linhaId:colunaId`); a âncora diz o tamanho. */
export function indiceMesclagens(lista: Lista): Map<string, CelulaMesclada> {
  const indice = new Map<string, CelulaMesclada>();
  for (const m of lista.mesclagens ?? []) {
    const l0 = lista.linhas.findIndex((l) => l.id === m.linha);
    const c0 = lista.colunas.findIndex((c) => c.id === m.coluna);
    if (l0 < 0 || c0 < 0) continue;
    for (let l = l0; l < l0 + m.linhas; l++) {
      for (let c = c0; c < c0 + m.colunas; c++) {
        const linha = lista.linhas[l];
        const coluna = lista.colunas[c];
        if (linha && coluna) indice.set(`${linha.id}:${coluna.id}`, { ancora: l === l0 && c === c0, linhas: m.linhas, colunas: m.colunas });
      }
    }
  }
  return indice;
}

/** Por que não dá para mesclar essa área (ou `null` se dá). Mescla só dentro do mesmo bloco, sem título e sem sobrepor outra. */
export function erroDeMesclagem(lista: Lista, a: Area, ignorar: Mesclagem[] = []): string | null {
  if (areaUnica(a)) return "Selecione duas ou mais células.";
  if (a.l1 < 0 || a.c1 < 0 || a.l2 >= lista.linhas.length || a.c2 >= lista.colunas.length) return "Área fora da lista.";
  for (let l = a.l1; l <= a.l2; l++) if (lista.linhas[l].titulo !== undefined) return "Não dá para mesclar por cima de um título de bloco.";
  const indice = indiceMesclagens({ ...lista, mesclagens: (lista.mesclagens ?? []).filter((m) => !ignorar.includes(m)) });
  for (let l = a.l1; l <= a.l2; l++) for (let c = a.c1; c <= a.c2; c++) if (indice.has(`${lista.linhas[l].id}:${lista.colunas[c].id}`)) return "Já existem células mescladas nessa área. Desfaça a mesclagem antes.";
  return null;
}

/** Mescla a área; o valor que fica é o da célula de cima, à esquerda, e o das outras é apagado. */
export function mesclarArea(lista: Lista, area: Area): Lista {
  const a = normalizarArea(area);
  if (erroDeMesclagem(lista, a)) return lista;
  const cobertas = new Set<string>();
  for (let l = a.l1; l <= a.l2; l++) for (let c = a.c1; c <= a.c2; c++) if (l !== a.l1 || c !== a.c1) cobertas.add(`${lista.linhas[l].id}:${lista.colunas[c].id}`);
  const linhas = lista.linhas.map((linha) => {
    const valores = { ...linha.valores };
    const estilos = linha.estilos ? { ...linha.estilos } : undefined;
    for (const c of lista.colunas) {
      if (cobertas.has(`${linha.id}:${c.id}`)) {
        delete valores[c.id];
        if (estilos) delete estilos[c.id];
      }
    }
    return { ...linha, valores, ...(estilos ? { estilos } : {}) };
  });
  const nova: Mesclagem = { linha: lista.linhas[a.l1].id, coluna: lista.colunas[a.c1].id, linhas: a.l2 - a.l1 + 1, colunas: a.c2 - a.c1 + 1 };
  return { ...lista, linhas, mesclagens: [...(lista.mesclagens ?? []), nova] };
}

/** Desfaz as mesclagens que tocam a área. */
export function desmesclarArea(lista: Lista, area: Area): Lista {
  const a = normalizarArea(area);
  const indice = indiceMesclagens(lista);
  const tocadas = new Set<string>();
  for (let l = a.l1; l <= a.l2; l++) for (let c = a.c1; c <= a.c2; c++) if (indice.has(`${lista.linhas[l].id}:${lista.colunas[c].id}`)) tocadas.add(`${lista.linhas[l].id}:${lista.colunas[c].id}`);
  const mesclagens = (lista.mesclagens ?? []).filter((m) => {
    const l0 = lista.linhas.findIndex((l) => l.id === m.linha);
    const c0 = lista.colunas.findIndex((c) => c.id === m.coluna);
    for (let l = l0; l < l0 + m.linhas; l++) for (let c = c0; c < c0 + m.colunas; c++) if (tocadas.has(`${lista.linhas[l]?.id}:${lista.colunas[c]?.id}`)) return false;
    return true;
  });
  return { ...lista, mesclagens: mesclagens.length ? mesclagens : undefined };
}

/**
 * Tira o que ficou sem sentido depois de mexer na lista: mesclagem cujas linhas ou colunas sumiram,
 * mudaram de ordem ou passaram por cima de um título, e congelamento maior que a lista.
 */
export function sanear(lista: Lista): Lista {
  let mesclagens: Mesclagem[] = [];
  for (const m of lista.mesclagens ?? []) {
    const l0 = lista.linhas.findIndex((l) => l.id === m.linha);
    const c0 = lista.colunas.findIndex((c) => c.id === m.coluna);
    if (l0 < 0 || c0 < 0 || !Number.isInteger(m.linhas) || !Number.isInteger(m.colunas) || m.linhas < 1 || m.colunas < 1) continue;
    const area = { l1: l0, c1: c0, l2: l0 + m.linhas - 1, c2: c0 + m.colunas - 1 };
    if (erroDeMesclagem({ ...lista, mesclagens }, area)) continue;
    mesclagens = [...mesclagens, m];
  }
  const congelar = lista.congelar
    ? { linhas: Math.min(lista.congelar.linhas, 5, lista.linhas.length), colunas: Math.min(lista.congelar.colunas, 3, Math.max(0, lista.colunas.length - 1)) }
    : undefined;
  const mesmo = mesclagens.length === (lista.mesclagens?.length ?? 0);
  return {
    ...lista,
    ...(mesmo ? {} : { mesclagens: mesclagens.length ? mesclagens : undefined }),
    ...(congelar && (congelar.linhas || congelar.colunas) ? { congelar } : { congelar: undefined }),
  };
}

// ------------------------------------------------------------------ estilo por célula

const vazio = (e: EstiloCelula) => Object.keys(e).length === 0;

/** Aplica o estilo a todas as células da área; um campo `null` limpa aquele campo. */
export function estilarArea(lista: Lista, area: Area, mudanca: { [K in keyof EstiloCelula]?: EstiloCelula[K] | null }): Lista {
  const a = normalizarArea(area);
  const linhas = lista.linhas.map((linha, l) => {
    if (l < a.l1 || l > a.l2 || linha.titulo !== undefined) return linha;
    const estilos: Record<string, EstiloCelula> = { ...(linha.estilos ?? {}) };
    for (let c = a.c1; c <= a.c2; c++) {
      const coluna = lista.colunas[c];
      if (!coluna) continue;
      const novo: Record<string, unknown> = { ...(estilos[coluna.id] ?? {}) };
      for (const [campo, valor] of Object.entries(mudanca)) {
        if (valor === null || valor === false || valor === undefined) delete novo[campo];
        else novo[campo] = valor;
      }
      if (vazio(novo as EstiloCelula)) delete estilos[coluna.id];
      else estilos[coluna.id] = novo as EstiloCelula;
    }
    const { estilos: _antigos, ...resto } = linha;
    return Object.keys(estilos).length ? { ...resto, estilos } : (resto as LinhaLista);
  });
  return { ...lista, linhas };
}

/** O estilo comum da área (campo igual em todas as células) — para a barra mostrar «negrito ligado», por exemplo. */
export function estiloDaArea(lista: Lista, area: Area): EstiloCelula {
  const a = normalizarArea(area);
  let comum: EstiloCelula | null = null;
  for (let l = a.l1; l <= a.l2; l++) {
    const linha = lista.linhas[l];
    if (!linha || linha.titulo !== undefined) continue;
    for (let c = a.c1; c <= a.c2; c++) {
      const e = linha.estilos?.[lista.colunas[c]?.id ?? ""] ?? {};
      if (comum === null) comum = { ...e };
      else for (const k of Object.keys(comum) as (keyof EstiloCelula)[]) if (comum[k] !== e[k]) delete comum[k];
    }
  }
  return comum ?? {};
}

// ------------------------------------------------------------------ copiar e colar

const SEPARA_LINHA = /\r\n|\n|\r/;

/** Texto da área separado por tabulação, como o Excel e o Sheets entendem ao colar. */
export function copiarArea(lista: Lista, area: Area, texto: (l: number, c: number) => string): string {
  const a = normalizarArea(area);
  const linhas: string[] = [];
  for (let l = a.l1; l <= a.l2; l++) {
    if (lista.linhas[l].titulo !== undefined) {
      linhas.push(lista.linhas[l].titulo ?? "");
      continue;
    }
    const celulas: string[] = [];
    for (let c = a.c1; c <= a.c2; c++) celulas.push(texto(l, c).replace(/[\t\r\n]+/g, " "));
    linhas.push(celulas.join("\t"));
  }
  return linhas.join("\n");
}

const ISO = /^\d{4}-\d{2}-\d{2}$/;
function lerData(texto: string): string | null {
  const t = texto.trim();
  if (ISO.test(t)) return t;
  const m = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2}|\d{4})$/.exec(t);
  if (!m) return null;
  const ano = m[3].length === 2 ? 2000 + Number(m[3]) : Number(m[3]);
  const data = new Date(Date.UTC(ano, Number(m[2]) - 1, Number(m[1])));
  return data.getUTCMonth() === Number(m[2]) - 1 ? data.toISOString().slice(0, 10) : null;
}

/** Converte um texto colado para o valor que a coluna guarda; `undefined` = não serve nessa coluna. */
export function valorParaColuna(coluna: ColunaLista, texto: string): ValorCelula | undefined {
  const t = texto.trim();
  if (t === "") return undefined;
  switch (coluna.tipo) {
    case "texto":
      return texto.slice(0, LIMITES_LISTA.texto);
    case "numero": {
      if (t.startsWith("=")) return t.slice(0, LIMITES_LISTA.texto);
      const n = lerNumero(t);
      return n === null ? t.slice(0, LIMITES_LISTA.texto) : String(n);
    }
    case "data":
      return lerData(t) ?? undefined;
    case "marca":
      return /^(✓|✔|x|sim|s|true|verdadeiro|1)$/i.test(t) ? true : undefined;
    case "simnao":
      return /^(sim|s|yes|true|1)$/i.test(t) ? "sim" : /^(n[aã]o|n|no|false|0)$/i.test(t) ? "nao" : undefined;
    case "opcoes":
      return coluna.opcoes?.find((o) => o.toLowerCase() === t.toLowerCase());
  }
}

/** Cola um bloco de texto (tabulação entre colunas, quebra de linha entre linhas) a partir da célula indicada. */
export function colarTexto(lista: Lista, l0: number, c0: number, texto: string, novoId: () => string): Lista {
  const blocos = texto.replace(/\n$/, "").split(SEPARA_LINHA).map((l) => l.split("\t"));
  let linhas = [...lista.linhas];
  let alvo = l0;
  for (const celulas of blocos) {
    while (alvo < linhas.length && linhas[alvo].titulo !== undefined) alvo++;
    if (alvo >= linhas.length) {
      if (linhas.length >= LIMITES_LISTA.linhas) break;
      linhas.push({ id: novoId(), valores: {} });
    }
    const valores = { ...linhas[alvo].valores };
    celulas.forEach((bruto, i) => {
      const coluna = lista.colunas[c0 + i];
      if (!coluna) return;
      const v = valorParaColuna(coluna, bruto);
      if (v === undefined) delete valores[coluna.id];
      else valores[coluna.id] = v;
    });
    linhas = linhas.map((l, i) => (i === alvo ? { ...l, valores } : l));
    alvo++;
  }
  return sanear({ ...lista, linhas });
}

/** Apaga os valores da área (tecla Delete com várias células selecionadas). */
export function limparArea(lista: Lista, area: Area): Lista {
  const a = normalizarArea(area);
  const linhas = lista.linhas.map((linha, l) => {
    if (l < a.l1 || l > a.l2 || linha.titulo !== undefined) return linha;
    const valores = { ...linha.valores };
    for (let c = a.c1; c <= a.c2; c++) if (lista.colunas[c]) delete valores[lista.colunas[c].id];
    return { ...linha, valores };
  });
  return { ...lista, linhas };
}
