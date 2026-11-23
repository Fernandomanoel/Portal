import { useCallback, useEffect, useRef, useState } from "react";

import { generoDaVoz, ordenarVozes } from "@/lib/vozes";
import type { FalaDialogoSimulado } from "@/types/aulaIngles";

const suportado = () => typeof window !== "undefined" && "speechSynthesis" in window;

/**
 * Lê um roteiro com duas vozes: o falante A com voz feminina e tom mais agudo, o B com voz masculina e tom mais grave
 * (se o sistema só tiver um tipo de voz, as duas usam a mesma e o tom ainda as distingue). Como no original da aula:
 * velocidade 0,92 e uma pausa de 260 ms entre as falas.
 */
export function useDialogoSimulado() {
  const [tocando, definirTocando] = useState(false);
  const [rotuloAtual, definirRotuloAtual] = useState<string | null>(null);
  const ativo = useRef(false);

  const parar = useCallback((cancelarFala = true) => {
    ativo.current = false;
    if (cancelarFala && suportado()) window.speechSynthesis.cancel();
    definirTocando(false);
    definirRotuloAtual(null);
  }, []);

  const tocar = useCallback(
    (roteiro: FalaDialogoSimulado[]) => {
      if (!suportado()) return;
      parar(true);
      ativo.current = true;
      definirTocando(true);
      const vozes = ordenarVozes(window.speechSynthesis.getVoices(), "en-US");
      const feminina = vozes.find((v) => generoDaVoz(v.name) === "feminina") ?? vozes[0];
      const masculina = vozes.find((v) => generoDaVoz(v.name) === "masculina") ?? vozes[0];
      let indice = 0;
      const proxima = () => {
        if (!ativo.current || indice >= roteiro.length) {
          parar(false);
          return;
        }
        const linha = roteiro[indice];
        definirRotuloAtual(linha.rotulo);
        const fala = new SpeechSynthesisUtterance(linha.texto);
        fala.lang = "en-US";
        fala.rate = 0.92;
        const falanteA = linha.falante === "A";
        fala.pitch = falanteA ? 1.12 : 0.88;
        const voz = falanteA ? feminina : masculina;
        if (voz) fala.voice = voz;
        fala.onend = () => {
          indice += 1;
          if (ativo.current) window.setTimeout(proxima, 260);
        };
        fala.onerror = () => parar(false);
        window.speechSynthesis.speak(fala);
      };
      proxima();
    },
    [parar],
  );

  useEffect(
    () => () => {
      ativo.current = false;
      if (suportado()) window.speechSynthesis.cancel();
    },
    [],
  );

  return { tocando, rotuloAtual, tocar, parar };
}
