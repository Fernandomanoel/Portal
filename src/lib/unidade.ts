import type { FichaUnidade } from "@/types/unidade";

/**
 * A ficha da unidade (devolvida pela senha da aba Provas) fica só na aba do
 * navegador: fechar a aba apaga, recarregar a página de Provas pede a senha de
 * novo, mas a prova em andamento sobrevive a um recarregamento.
 */
const CHAVE_FICHA = "portal-ficha-unidade";
const CHAVE_ATIVA = "portal-unidade-ativa";

export function guardarFicha(ficha: FichaUnidade) {
  try {
    sessionStorage.setItem(CHAVE_FICHA, JSON.stringify(ficha));
  } catch {
    // Sem armazenamento (aba anônima bloqueada): a ficha vale só enquanto a página não recarrega.
    memoria = ficha;
  }
}

let memoria: FichaUnidade | null = null;

export function lerFicha(): FichaUnidade | null {
  let ficha: FichaUnidade | null = memoria;
  try {
    const bruto = sessionStorage.getItem(CHAVE_FICHA);
    if (bruto) ficha = JSON.parse(bruto) as FichaUnidade;
  } catch {
    // ignora
  }
  if (!ficha || new Date(ficha.expiraEm).getTime() < Date.now()) return null;
  return ficha;
}

export function limparFicha() {
  memoria = null;
  try {
    sessionStorage.removeItem(CHAVE_FICHA);
  } catch {
    // ignora
  }
}

// ---------------------------------------------- unidade em que a coordenação trabalha

let ativa: string | null = null;

/** Só a coordenação usa: qual unidade ela está olhando (`null` = todas). */
export function unidadeAtiva(): string | null {
  if (ativa !== null) return ativa === "" ? null : ativa;
  try {
    const guardada = sessionStorage.getItem(CHAVE_ATIVA);
    ativa = guardada ?? "";
  } catch {
    ativa = "";
  }
  return ativa === "" ? null : ativa;
}

export function definirUnidadeAtiva(id: string | null) {
  ativa = id ?? "";
  try {
    sessionStorage.setItem(CHAVE_ATIVA, ativa);
  } catch {
    // ignora
  }
}

/** Acrescenta ?unidade= à rota da API quando a coordenação escolheu uma unidade. */
export function comUnidade(caminho: string) {
  const id = unidadeAtiva();
  if (!id) return caminho;
  return `${caminho}${caminho.includes("?") ? "&" : "?"}unidade=${encodeURIComponent(id)}`;
}
