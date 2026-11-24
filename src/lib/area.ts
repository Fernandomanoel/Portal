import type { AreaId } from "@/types/acesso";

const CHAVE = "portal-area-professor";

export const areaDaProva = (provaId: string): AreaId => (provaId.startsWith("Ingles/") ? "ingles" : "informatica");

export function lerAreaEscolhida(): AreaId | null {
  try {
    const salva = sessionStorage.getItem(CHAVE);
    return salva === "informatica" || salva === "ingles" ? salva : null;
  } catch {
    return null;
  }
}

export function guardarAreaEscolhida(area: AreaId) {
  try {
    sessionStorage.setItem(CHAVE, area);
  } catch {
    /* sem armazenamento: vale só até recarregar */
  }
}
