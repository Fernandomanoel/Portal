import { randomUUID } from "node:crypto";

import type { Professor } from "../src/types/envio.js";
import {
  CORES_LINHA,
  LARGURA_MAXIMA,
  LARGURA_MINIMA,
  LARGURA_PADRAO,
  LIMITES_LISTA,
  type ColunaLista,
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
const TIPOS: TipoColuna[] = ["texto", "marca", "simnao", "opcoes"];
const CORES = new Set(CORES_LINHA.map((c) => c.cor));
const idParte = (v: unknown): v is string => typeof v === "string" && /^[a-zA-Z0-9_-]{1,40}$/.test(v);
const texto = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");

export function resumir(lista: ListaAcompanhamento): ResumoLista {
  const { id, titulo, colunas, linhas, alteradaPor, alteradaEm, unidade } = lista;
  return { id, titulo, unidade, colunas: colunas.length, linhas: linhas.filter((l) => l.titulo === undefined).length, alteradaPor, alteradaEm };
}

export function novaLista(professor: Professor, unidade: string | null, origem?: ListaAcompanhamento): ListaAcompanhamento {
  const agora = new Date().toISOString();
  const autoria = { unidade: unidade ?? undefined, versao: 1, criadaPor: professor.nome, criadaEm: agora, alteradaPor: professor.nome, alteradaEm: agora };
  if (origem) {
    return { ...origem, ...autoria, id: novoId("lst_", 12), titulo: `${origem.titulo} (cópia)`.slice(0, LIMITES_LISTA.titulo) };
  }
  const aluno = novoId("c", 8);
  const presente = novoId("c", 8);
  return {
    id: novoId("lst_", 12),
    titulo: "Nova lista",
    colunas: [
      { id: aluno, titulo: "Aluno", tipo: "texto", largura: LARGURA_PADRAO.texto },
      { id: presente, titulo: "Presente", tipo: "marca", largura: LARGURA_PADRAO.marca },
    ],
    linhas: [{ id: novoId("l", 8), valores: {} }],
    ...autoria,
  };
}

/**
 * Confere a lista que chegou do navegador e devolve uma cópia limpa: só os
 * campos conhecidos, valores coerentes com o tipo da coluna, dentro dos limites.
 * Devolve uma mensagem quando não dá para aproveitar.
 */
export function validarLista(corpo: Record<string, unknown> | null): { lista: Pick<ListaAcompanhamento, "titulo" | "colunas" | "linhas">; versao: number } | string {
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
      else if (coluna.tipo === "texto" && typeof valor === "string" && valor !== "") valores[colunaId] = valor.slice(0, LIMITES_LISTA.texto);
      else if (coluna.tipo === "opcoes" && typeof valor === "string" && coluna.opcoes?.includes(valor)) valores[colunaId] = valor;
    }
    const ehTitulo = typeof bruta.titulo === "string";
    const linha: LinhaLista = { id: bruta.id, valores: ehTitulo ? {} : valores };
    if (ehTitulo) linha.titulo = texto(bruta.titulo, LIMITES_LISTA.titulo);
    if (typeof bruta.cor === "string" && CORES.has(bruta.cor as never)) linha.cor = bruta.cor as LinhaLista["cor"];
    if (bruta.negrito === true) linha.negrito = true;
    linhas.push(linha);
  }
  return { lista: { titulo, colunas, linhas }, versao };
}

export async function listarListas(armazenamento: Armazenamento): Promise<ResumoLista[]> {
  const itens = (await armazenamento.listar("listas/")).filter((item) => item.caminho.endsWith(".json"));
  const listas = await Promise.all(itens.map((item) => armazenamento.lerJson<ListaAcompanhamento>(item.caminho)));
  return listas
    .filter((lista): lista is ListaAcompanhamento => lista !== null)
    .map(resumir)
    .sort((a, b) => b.alteradaEm.localeCompare(a.alteradaEm));
}
