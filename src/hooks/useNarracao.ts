import { useCallback, useEffect, useRef, useState } from "react";

import { dividirFala, ordenarVozes, type IdiomaNarracao } from "@/lib/vozes";

export type { IdiomaNarracao } from "@/lib/vozes";

type EstadoNarracao = "parada" | "falando";

interface Opcoes {
  idioma?: IdiomaNarracao;
  /** 1 é a velocidade normal do navegador. */
  velocidade?: number;
}

// Voz que já falhou neste computador (online sem internet, por exemplo) não é
// tentada de novo até recarregar a página.
const vozesQueFalharam = new Set<string>();

// "interrupted"/"canceled" vêm do nosso próprio cancel() ao trocar de fala;
// "not-allowed" é o navegador bloqueando fala sem clique (autoplay): trocar de
// voz não resolve nenhum dos três.
const ERROS_SEM_NOVA_TENTATIVA = new Set(["interrupted", "canceled", "not-allowed"]);

function candidatas(idioma: IdiomaNarracao) {
  return ordenarVozes(window.speechSynthesis.getVoices(), idioma).filter((voz) => !vozesQueFalharam.has(voz.voiceURI));
}

/** No Chrome a lista de vozes chega depois do carregamento da página. */
function esperarVozes(): Promise<void> {
  if (window.speechSynthesis.getVoices().length) return Promise.resolve();
  return new Promise((resolver) => {
    const pronto = () => {
      window.speechSynthesis.removeEventListener("voiceschanged", pronto);
      resolver();
    };
    window.speechSynthesis.addEventListener("voiceschanged", pronto);
    window.setTimeout(pronto, 1200);
  });
}

/**
 * Narração pela voz do próprio navegador, sempre com voz feminina quando o
 * sistema tiver uma. Se a voz der erro, tenta a próxima do mesmo idioma. Pode
 * ser repetida sem limite. Trocar por áudio gravado no futuro é mudar só
 * `falar`/`parar` aqui dentro.
 */
export function useNarracao({ idioma = "pt-BR", velocidade = 0.85 }: Opcoes = {}) {
  const suportado = typeof window !== "undefined" && "speechSynthesis" in window;
  const [estado, definirEstado] = useState<EstadoNarracao>("parada");
  // Cada fala nova invalida os eventos atrasados da anterior.
  const falaAtual = useRef(0);

  const parar = useCallback(() => {
    if (!suportado) return;
    falaAtual.current += 1;
    window.speechSynthesis.cancel();
    definirEstado("parada");
  }, [suportado]);

  useEffect(() => {
    if (!suportado) return;
    return () => {
      falaAtual.current += 1;
      window.speechSynthesis.cancel();
    };
  }, [suportado]);

  const falar = useCallback(
    (texto: string, velocidadeDestaVez?: number) => {
      if (!suportado) return;
      const sintese = window.speechSynthesis;
      const minha = ++falaAtual.current;
      sintese.cancel();
      const partes = dividirFala(texto);
      if (!partes.length) return;

      const dizer = (indice: number, vozes: SpeechSynthesisVoice[]) => {
        if (minha !== falaAtual.current) return;
        const [voz, ...reservas] = vozes;
        const fala = new SpeechSynthesisUtterance(partes[indice]);
        fala.lang = voz?.lang ?? idioma;
        fala.rate = velocidadeDestaVez ?? velocidade;
        if (voz) fala.voice = voz;
        fala.onstart = () => {
          if (minha === falaAtual.current) definirEstado("falando");
        };
        fala.onend = () => {
          if (minha !== falaAtual.current) return;
          if (indice + 1 < partes.length) dizer(indice + 1, vozes);
          else definirEstado("parada");
        };
        fala.onerror = (evento) => {
          if (minha !== falaAtual.current) return;
          if (!ERROS_SEM_NOVA_TENTATIVA.has(evento.error) && voz && reservas.length) {
            vozesQueFalharam.add(voz.voiceURI);
            dizer(indice, reservas);
            return;
          }
          definirEstado("parada");
        };
        // Chrome às vezes fica "pausado" depois de um cancel(): retomar antes
        // de falar evita o botão que não faz som nenhum.
        sintese.resume();
        sintese.speak(fala);
      };

      void esperarVozes().then(() => {
        // Falar logo depois do cancel() faz o Chrome engolir a fala nova.
        window.setTimeout(() => dizer(0, candidatas(idioma)), 60);
      });
    },
    [suportado, idioma, velocidade],
  );

  return { suportado, estado, falar, parar };
}
