import { useCallback, useEffect, useRef } from "react";

import type { SaidaProva } from "@/types/envio";

/**
 * Vigia a saída da prova travada. Nenhum navegador deixa um site impedir a
 * troca de aba (Alt+Tab sempre funciona), então a trava é: prova em tela
 * cheia e, se o aluno sair dela, trocar de aba ou de janela, avisar quem usa
 * o hook — que bloqueia a tela até o professor liberar.
 */
export function useTravaProva(ativa: boolean, aoSair: (motivo: SaidaProva["motivo"]) => void) {
  const aoSairRef = useRef(aoSair);
  const pausada = useRef(false);
  const retomarTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    aoSairRef.current = aoSair;
  });

  useEffect(() => {
    if (!ativa) return;

    const sair = (motivo: SaidaProva["motivo"]) => {
      if (!pausada.current) aoSairRef.current(motivo);
    };
    const aoMudarVisibilidade = () => {
      if (document.visibilityState === "hidden") sair("aba");
    };
    // Perder o foco com a aba ainda visível é outra janela ou outro programa.
    // A espera separa isso da troca de aba, que também dispara blur.
    const aoPerderFoco = () => {
      window.setTimeout(() => {
        if (document.visibilityState === "visible" && !document.hasFocus()) sair("janela");
      }, 200);
    };
    const aoMudarTelaCheia = () => {
      if (!document.fullscreenElement) sair("tela-cheia");
    };

    document.addEventListener("visibilitychange", aoMudarVisibilidade);
    window.addEventListener("blur", aoPerderFoco);
    document.addEventListener("fullscreenchange", aoMudarTelaCheia);
    return () => {
      document.removeEventListener("visibilitychange", aoMudarVisibilidade);
      window.removeEventListener("blur", aoPerderFoco);
      document.removeEventListener("fullscreenchange", aoMudarTelaCheia);
    };
  }, [ativa]);

  /** Precisa rodar dentro do clique: o navegador só aceita tela cheia a partir de um gesto. */
  const entrarTelaCheia = useCallback(async () => {
    if (document.fullscreenElement || !document.documentElement.requestFullscreen) return;
    try {
      await document.documentElement.requestFullscreen({ navigationUI: "hide" });
    } catch {
      /* navegador sem tela cheia: a vigilância de aba e janela continua valendo */
    }
  }, []);

  const sairTelaCheia = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => undefined);
  }, []);

  // A janela de escolher arquivo tira o foco da página: sem pausar, anexar a
  // planilha travaria a prova.
  const pausar = useCallback(() => {
    window.clearTimeout(retomarTimer.current);
    pausada.current = true;
  }, []);

  const retomar = useCallback(() => {
    window.clearTimeout(retomarTimer.current);
    retomarTimer.current = window.setTimeout(() => {
      pausada.current = false;
    }, 800);
  }, []);

  return { entrarTelaCheia, sairTelaCheia, pausar, retomar };
}
