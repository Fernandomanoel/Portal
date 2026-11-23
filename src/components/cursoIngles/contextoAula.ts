import { createContext, useContext } from "react";

import type { FalaDialogoSimulado } from "@/types/aulaIngles";

export interface NarracaoAula {
  suportado: boolean;
  /** Chave do botão que está falando agora (ou null). */
  falandoChave: string | null;
  falar: (chave: string, texto: string, velocidade?: number) => void;
  pararTudo: () => void;
  dialogo: { tocando: boolean; rotuloAtual: string | null; tocar: (roteiro: FalaDialogoSimulado[]) => void; parar: () => void };
}

export const NarracaoContexto = createContext<NarracaoAula | null>(null);

export function useNarracaoAula(): NarracaoAula {
  const contexto = useContext(NarracaoContexto);
  if (!contexto) throw new Error("useNarracaoAula fora do NarracaoAulaProvider");
  return contexto;
}

/** Botão «ME EXPLIQUE EM PORTUGUÊS» do passo: troca os textos `{ en, pt }` entre inglês e português. */
export interface ExplicacaoPt {
  pt: boolean;
  alternar: () => void;
}

export const ExplicacaoPtContexto = createContext<ExplicacaoPt>({ pt: false, alternar: () => undefined });
export const useExplicacaoPt = () => useContext(ExplicacaoPtContexto);

/** Pula para outro passo da aula, e opcionalmente para um trecho dele (`ancora` = id do elemento). */
export const NavegacaoAulaContexto = createContext<{ irPara: (passoId: string, ancora?: string) => void }>({ irPara: () => undefined });
export const useNavegacaoAula = () => useContext(NavegacaoAulaContexto);
