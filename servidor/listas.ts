import { randomUUID } from "node:crypto";

import type { Professor } from "../src/types/envio.js";
import { sanear } from "../src/lib/gradeLista.js";
import {
  CORES_LINHA,
  LARGURA_MAXIMA,
  LARGURA_MINIMA,
  GRADE_INICIAL,
  LARGURA_PADRAO,
  LIMITES_LISTA,
  type ColunaLista,
  type Compartilhamento,
  type EstiloCelula,
  type Grafico,
  type Mesclagem,
  LIMITES_GRAFICO,
  type LinhaLista,
  type ListaAcompanhamento,
  type ResumoLista,
  type TipoColuna,
  type ValorCelula,
} from "../src/types/lista.js";
import type { Armazenamento } from "./armazenamento.js";

/**
 * Listas de acompanhamento dos professores. Moram em `listas/<id>.json`, fora
 * das pastas que a limpeza de 7 dias percorre (envios/, arquivos/, tentativas/):
 * ficam até um professor apagar.
 */

export const idListaValido = (id: string) => /^lst_[a-zA-Z0-9]{12}$/.test(id);
export const caminhoLista = (id: string) => `listas/${id}.json`;

const novoId = (prefixo: string, tamanho: number) => `${prefixo}${randomUUID().replace(/-/g, "").slice(0, tamanho)}`;
const TIPOS: TipoColuna[] = ["texto", "numero", "data", "marca", "simnao", "opcoes"];
const FORMATOS = ["numero", "moeda", "percentual"];
const TIPOS_GRAFICO = ["coluna", "barra", "linha", "area", "pizza", "rosca", "empilhada"];
const AGREGACOES = ["soma", "media", "contagem", "minimo", "maximo"];
const ISO = /^\d{4}-\d{2}-\d{2}$/;
const CORES = new Set(CORES_LINHA.map((c) => c.cor));
const idParte = (v: unknown): v is string => typeof v === "string" && /^[a-zA-Z0-9_-]{1,40}$/.test(v);
const texto = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");

export function resumir(lista: ListaAcompanhamento): ResumoLista {
  const { id, titulo, colunas, linhas, alteradaPor, alteradaEm, unidade, compartilhamento } = lista;
  return { id, titulo, unidade, compartilhamento, colunas: colunas.length, linhas: linhas.filter((l) => l.titulo === undefined && Object.keys(l.valores).length > 0).length, alteradaPor, alteradaEm };
}

export function novaLista(professor: Professor, unidade: string | null, origem?: ListaAcompanhamento): ListaAcompanhamento {
  const agora = new Date().toISOString();
  // Lista da rede (unidade "*") nasce visível para todas; a de uma unidade nasce só dela, e a cópia não herda o compartilhamento.
  const compartilhamento: Compartilhamento | undefined = unidade === "*" ? { com: "todas", unidades: [], edicao: false } : undefined;
  const autoria = { unidade: unidade ?? undefined, compartilhamento, versao: 1, criadaPor: professor.nome, criadaEm: agora, alteradaPor: professor.nome, alteradaEm: agora };
  if (origem) {
    return { ...origem, ...autoria, id: novoId("lst_", 12), titulo: `${origem.titulo} (cópia)`.slice(0, LIMITES_LISTA.titulo) };
  }
  // Como numa planilha: a grade já nasce de A a Z e com 100 linhas; depois disso, quem precisar acrescenta.
  const colunas = Array.from({ length: GRADE_INICIAL.colunas }, (_, i) => ({
    id: novoId("c", 8),
    titulo: `Coluna ${String.fromCharCode(65 + i)}`,
    tipo: "texto" as const,
    largura: LARGURA_PADRAO.texto,
  }));
  return {
    id: novoId("lst_", 12),
    titulo: "Nova lista",
    colunas,
    linhas: Array.from({ length: GRADE_INICIAL.linhas }, () => ({ id: novoId("l", 8), valores: {} })),
    ...autoria,
  };
}

/**
 * Confere a lista que chegou do navegador e devolve uma cópia limpa: só os
 * campos conhecidos, valores coerentes com o tipo da coluna, dentro dos limites.
 * Devolve uma mensagem quando não dá para aproveitar.
 */
export function validarLista(
  corpo: Record<string, unknown> | null,
  unidadesValidas: string[] = [],
): { lista: Pick<ListaAcompanhamento, "titulo" | "colunas" | "linhas" | "mesclagens" | "congelar" | "graficos">; versao: number; compartilhamento: Compartilhamento | null | undefined } | string {
  if (!corpo) return "Lista em formato inválido.";
  const versao = Number(corpo.versao);
  if (!Number.isInteger(versao) || versao < 1) return "Lista sem versão.";
  const titulo = texto(corpo.titulo, LIMITES_LISTA.titulo).trim() || "Sem título";
  if (!Array.isArray(corpo.colunas) || !Array.isArray(corpo.linhas)) return "Lista sem colunas ou linhas.";
  if (corpo.colunas.length > LIMITES_LISTA.colunas) return `Uma lista pode ter até ${LIMITES_LISTA.colunas} colunas.`;
  if (corpo.linhas.length > LIMITES_LISTA.linhas) return `Uma lista pode ter até ${LIMITES_LISTA.linhas} linhas.`;

  const colunas: ColunaLista[] = [];
  const ids = new Set<string>();
  for (const bruta of corpo.colunas as Record<string, unknown>[]) {
    if (!bruta || !idParte(bruta.id) || ids.has(bruta.id) || !TIPOS.includes(bruta.tipo as TipoColuna)) return "Coluna inválida na lista.";
    ids.add(bruta.id);
    const tipo = bruta.tipo as TipoColuna;
    const largura = Math.min(LARGURA_MAXIMA, Math.max(LARGURA_MINIMA, Math.round(Number(bruta.largura) || LARGURA_PADRAO[tipo])));
    const coluna: ColunaLista = { id: bruta.id, titulo: texto(bruta.titulo, 80).trim() || "Coluna", tipo, largura };
    if (tipo === "numero") {
      if (FORMATOS.includes(bruta.formato as string)) coluna.formato = bruta.formato as ColunaLista["formato"];
      const casas = Number(bruta.casas);
      if (bruta.casas !== undefined && Number.isInteger(casas) && casas >= 0 && casas <= 6) coluna.casas = casas;
      if (AGREGACOES.includes(bruta.rodape as string)) coluna.rodape = bruta.rodape as ColunaLista["rodape"];
    }
    if (tipo === "opcoes") {
      const opcoes = Array.isArray(bruta.opcoes) ? bruta.opcoes.map((o) => texto(o, 60).trim()).filter(Boolean) : [];
      coluna.opcoes = [...new Set(opcoes)].slice(0, LIMITES_LISTA.opcoes);
    }
    colunas.push(coluna);
  }
  const porId = new Map(colunas.map((c) => [c.id, c]));

  const linhas: LinhaLista[] = [];
  const idsLinha = new Set<string>();
  for (const bruta of corpo.linhas as Record<string, unknown>[]) {
    if (!bruta || !idParte(bruta.id) || idsLinha.has(bruta.id)) return "Linha inválida na lista.";
    idsLinha.add(bruta.id);
    const valores: Record<string, ValorCelula> = {};
    const brutos = bruta.valores && typeof bruta.valores === "object" ? (bruta.valores as Record<string, unknown>) : {};
    for (const [colunaId, valor] of Object.entries(brutos)) {
      const coluna = porId.get(colunaId);
      if (!coluna) continue; // coluna apagada: o valor some junto
      if (coluna.tipo === "marca" && valor === true) valores[colunaId] = true;
      else if (coluna.tipo === "simnao" && (valor === "sim" || valor === "nao")) valores[colunaId] = valor;
      else if ((coluna.tipo === "texto" || coluna.tipo === "numero") && typeof valor === "string" && valor !== "") valores[colunaId] = valor.slice(0, LIMITES_LISTA.texto);
      else if (coluna.tipo === "data" && typeof valor === "string" && ISO.test(valor)) valores[colunaId] = valor;
      else if (coluna.tipo === "opcoes" && typeof valor === "string" && coluna.opcoes?.includes(valor)) valores[colunaId] = valor;
    }
    const ehTitulo = typeof bruta.titulo === "string";
    const linha: LinhaLista = { id: bruta.id, valores: ehTitulo ? {} : valores };
    if (ehTitulo) linha.titulo = texto(bruta.titulo, LIMITES_LISTA.titulo);
    if (typeof bruta.cor === "string" && CORES.has(bruta.cor as never)) linha.cor = bruta.cor as LinhaLista["cor"];
    if (bruta.negrito === true) linha.negrito = true;
    const estilos = ehTitulo ? undefined : validarEstilos(bruta.estilos, porId);
    if (estilos) linha.estilos = estilos;
    linhas.push(linha);
  }
  const compartilhamento = validarCompartilhamento(corpo.compartilhamento, unidadesValidas);
  if (typeof compartilhamento === "string") return compartilhamento;

  const mesclagens = lerMesclagens(corpo.mesclagens);
  const congelar = lerCongelamento(corpo.congelar);
  const graficos = validarGraficos(corpo.graficos, colunas);
  if (typeof graficos === "string") return graficos;
  // `sanear` tira a mesclagem que ficou inválida (linha apagada, título no meio) e acerta o congelamento.
  const base = { titulo, colunas, linhas, mesclagens, congelar } as ListaAcompanhamento;
  const limpa = sanear(base);
  return { lista: { titulo, colunas, linhas, mesclagens: limpa.mesclagens, congelar: limpa.congelar, graficos }, versao, compartilhamento };
}

const CORES_ESTILO = new Set<string>(CORES_LINHA.map((c) => c.cor));

function validarEstilos(bruto: unknown, porId: Map<string, ColunaLista>): Record<string, EstiloCelula> | undefined {
  if (!bruto || typeof bruto !== "object") return undefined;
  const saida: Record<string, EstiloCelula> = {};
  for (const [colunaId, e] of Object.entries(bruto as Record<string, unknown>)) {
    if (!porId.has(colunaId) || !e || typeof e !== "object") continue;
    const { fundo, negrito, italico, alinhar, bordas } = e as Record<string, unknown>;
    const estilo: EstiloCelula = {};
    if (typeof fundo === "string" && CORES_ESTILO.has(fundo)) estilo.fundo = fundo as EstiloCelula["fundo"];
    if (negrito === true) estilo.negrito = true;
    if (italico === true) estilo.italico = true;
    if (alinhar === "esquerda" || alinhar === "centro" || alinhar === "direita") estilo.alinhar = alinhar;
    if (bordas === "todas" || bordas === "nenhuma") estilo.bordas = bordas;
    if (Object.keys(estilo).length) saida[colunaId] = estilo;
  }
  return Object.keys(saida).length ? saida : undefined;
}

function lerMesclagens(bruto: unknown): Mesclagem[] | undefined {
  if (!Array.isArray(bruto)) return undefined;
  return bruto.slice(0, 200).flatMap((m): Mesclagem[] => {
    if (!m || typeof m !== "object") return [];
    const { linha, coluna, linhas, colunas } = m as Record<string, unknown>;
    if (!idParte(linha) || !idParte(coluna) || !Number.isInteger(linhas) || !Number.isInteger(colunas)) return [];
    return [{ linha, coluna, linhas: Math.max(1, Math.min(LIMITES_LISTA.linhas, linhas as number)), colunas: Math.max(1, Math.min(LIMITES_LISTA.colunas, colunas as number)) }];
  });
}

function lerCongelamento(bruto: unknown): ListaAcompanhamento["congelar"] {
  if (!bruto || typeof bruto !== "object") return undefined;
  const { linhas, colunas } = bruto as Record<string, unknown>;
  const l = Number.isInteger(linhas) ? Math.max(0, Math.min(5, linhas as number)) : 0;
  const c = Number.isInteger(colunas) ? Math.max(0, Math.min(3, colunas as number)) : 0;
  return l || c ? { linhas: l, colunas: c } : undefined;
}

/** Gráficos só podem apontar para colunas que existem; a série «contagem» não precisa de coluna. */
function validarGraficos(bruto: unknown, colunas: ColunaLista[]): Grafico[] | undefined | string {
  if (bruto === undefined || bruto === null) return undefined;
  if (!Array.isArray(bruto)) return "Gráficos em formato inválido.";
  if (bruto.length > LIMITES_GRAFICO.graficos) return `Uma lista pode ter até ${LIMITES_GRAFICO.graficos} gráficos.`;
  const ids = new Set(colunas.map((c) => c.id));
  const usados = new Set<string>();
  const saida: Grafico[] = [];
  for (const g of bruto as Record<string, unknown>[]) {
    if (!g || !idParte(g.id) || usados.has(g.id) || !TIPOS_GRAFICO.includes(g.tipo as string) || typeof g.categoria !== "string" || !ids.has(g.categoria)) continue;
    usados.add(g.id);
    const series = (Array.isArray(g.series) ? g.series : [])
      .slice(0, LIMITES_GRAFICO.series)
      .flatMap((s: unknown) => {
        if (!s || typeof s !== "object") return [];
        const { coluna, agregacao } = s as Record<string, unknown>;
        if (!AGREGACOES.includes(agregacao as string)) return [];
        if (coluna !== undefined && coluna !== null && (typeof coluna !== "string" || !ids.has(coluna))) return [];
        return [{ ...(typeof coluna === "string" ? { coluna } : {}), agregacao: agregacao as Grafico["series"][number]["agregacao"] }];
      });
    if (!series.length) continue;
    saida.push({ id: g.id, titulo: texto(g.titulo, LIMITES_GRAFICO.titulo).trim() || "Gráfico", tipo: g.tipo as Grafico["tipo"], categoria: g.categoria, series, ...(g.valores === true ? { valores: true } : {}) });
  }
  return saida.length ? saida : undefined;
}

/**
 * `undefined`: a tela não mandou (mantém o que está guardado); `null`: parou de compartilhar.
 * `unidades` só guarda ids que existem.
 */
export function validarCompartilhamento(bruto: unknown, unidadesValidas: string[]): Compartilhamento | null | undefined | string {
  if (bruto === undefined) return undefined;
  if (bruto === null) return null;
  if (typeof bruto !== "object") return "Compartilhamento inválido.";
  const { com, unidades, edicao } = bruto as Record<string, unknown>;
  if (com !== "todas" && com !== "unidades") return "Compartilhamento inválido.";
  const ids = com === "unidades" && Array.isArray(unidades) ? [...new Set(unidades.filter((u): u is string => typeof u === "string" && unidadesValidas.includes(u)))] : [];
  if (com === "unidades" && !ids.length) return "Escolha ao menos uma unidade para compartilhar.";
  return { com, unidades: ids, edicao: edicao === true };
}

export async function listarListas(armazenamento: Armazenamento): Promise<ResumoLista[]> {
  const itens = (await armazenamento.listar("listas/")).filter((item) => item.caminho.endsWith(".json"));
  const listas = await Promise.all(itens.map((item) => armazenamento.lerJson<ListaAcompanhamento>(item.caminho)));
  return listas
    .filter((lista): lista is ListaAcompanhamento => lista !== null)
    .map(resumir)
    .sort((a, b) => b.alteradaEm.localeCompare(a.alteradaEm));
}
