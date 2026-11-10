import type { Agregacao, ColunaLista, ListaAcompanhamento } from "../types/lista.js";
import { calculadora, ehErro, lerNumero, type Resultado } from "./formulas.js";

/**
 * Leitura dos valores de uma lista já com as fórmulas calculadas: serve ao rodapé da grade,
 * aos gráficos e à exportação. Sem DOM, sem React.
 */
export type Calculo = ReturnType<typeof calculadora>;

/** Números de uma coluna (linhas `inicio` até `fim`, sem contar títulos de bloco), ignorando células vazias e texto. */
export function numerosDaColuna(lista: ListaAcompanhamento, calc: Calculo, c: number, inicio = 0, fim = lista.linhas.length): number[] {
  const saida: number[] = [];
  for (let l = inicio; l < Math.min(fim, lista.linhas.length); l++) {
    if (lista.linhas[l].titulo !== undefined) continue;
    const r: Resultado = calc.resolver(l, c);
    if (ehErro(r) || r === null) continue;
    if (typeof r === "number") saida.push(r);
    else if (typeof r === "string") {
      const n = lerNumero(r);
      if (n !== null) saida.push(n);
    }
  }
  return saida;
}

export function agregar(numeros: number[], como: Agregacao): number | null {
  if (como === "contagem") return numeros.length;
  if (!numeros.length) return null;
  if (como === "soma") return numeros.reduce((s, n) => s + n, 0);
  if (como === "media") return numeros.reduce((s, n) => s + n, 0) / numeros.length;
  return como === "minimo" ? Math.min(...numeros) : Math.max(...numeros);
}

export const ROTULO_AGREGACAO: Record<Agregacao, string> = { soma: "Soma", media: "Média", contagem: "Contagem", minimo: "Mínimo", maximo: "Máximo" };

/** Texto de uma célula como a pessoa a vê (usado ao copiar, nos rótulos dos gráficos e na exportação). */
export function textoVisivel(lista: ListaAcompanhamento, calc: Calculo, l: number, c: number): string {
  const coluna: ColunaLista | undefined = lista.colunas[c];
  const linha = lista.linhas[l];
  if (!coluna || !linha || linha.titulo !== undefined) return "";
  const valor = linha.valores[coluna.id];
  if (coluna.tipo === "marca") return valor === true ? "Sim" : "";
  if (coluna.tipo === "simnao") return valor === "sim" ? "Sim" : valor === "nao" ? "Não" : "";
  if (coluna.tipo === "data" && typeof valor === "string") return valor.split("-").reverse().join("/");
  const r = calc.resolver(l, c);
  if (ehErro(r)) return r.erro;
  if (r === null) return "";
  if (typeof r === "number") return String(Number(r.toPrecision(12))).replace(".", ",");
  return String(r);
}
