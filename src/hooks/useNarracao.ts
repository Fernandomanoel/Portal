import { useCallback, useEffect, useRef, useState } from "react";

type EstadoNarracao = "parada" | "falando";

/** Um pouco mais lento que o normal: o público da seção precisa de tempo para acompanhar. */
const VELOCIDADE = 0.85;

function escolherVoz(): SpeechSynthesisVoice | undefined {
  const vozes = window.speechSynthesis.getVoices();
  return vozes.find((voz) => voz.lang === "pt-BR") ?? vozes.find((voz) => voz.lang.startsWith("pt"));
}

/**
 * Narração pela voz do próprio navegador. Só começa por clique — nunca
 * autoplay, que assusta quem tem sensibilidade sensorial — e pode ser
 * repetida sem limite. Trocar por áudio gravado no futuro é mudar só
 * `falar`/`parar` aqui dentro.
 */
export function useNarracao() {
  const suportado = typeof window !== "undefined" && "speechSynthesis" in window;
  const [estado, definirEstado] = useState<EstadoNarracao>("parada");
  const vozRef = useRef<SpeechSynthesisVoice | undefined>(undefined);

  useEffect(() => {
    if (!suportado) return;
    const atualizar = () => {
      vozRef.current = escolherVoz();
    };
    atualizar();
    window.speechSynthesis.addEventListener("voiceschanged", atualizar);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", atualizar);
      window.speechSynthesis.cancel();
    };
  }, [suportado]);

  const parar = useCallback(() => {
    if (!suportado) return;
    window.speechSynthesis.cancel();
    definirEstado("parada");
  }, [suportado]);

  const falar = useCallback(
    (texto: string) => {
      if (!suportado) return;
      window.speechSynthesis.cancel();
      const fala = new SpeechSynthesisUtterance(texto);
      fala.lang = "pt-BR";
      fala.rate = VELOCIDADE;
      if (vozRef.current) fala.voice = vozRef.current;
      fala.onstart = () => definirEstado("falando");
      fala.onend = () => definirEstado("parada");
      fala.onerror = () => definirEstado("parada");
      window.speechSynthesis.speak(fala);
    },
    [suportado],
  );

  return { suportado, estado, falar, parar };
}
