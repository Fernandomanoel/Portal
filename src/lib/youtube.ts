import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

interface JogadorYoutube {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(segundos: number, permitirBusca: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  destroy(): void;
}

interface ApiYoutube {
  Player: new (
    elemento: HTMLElement,
    opcoes: {
      videoId: string;
      width: string;
      height: string;
      playerVars: Record<string, number | string>;
      events: { onReady: () => void; onStateChange: (e: { data: number }) => void };
    },
  ) => JogadorYoutube;
}

declare global {
  interface Window {
    YT?: ApiYoutube;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let promessaApi: Promise<ApiYoutube> | null = null;

function carregarApi(): Promise<ApiYoutube> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  promessaApi ??= new Promise((resolve, reject) => {
    const anterior = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      anterior?.();
      if (window.YT) resolve(window.YT);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => {
      promessaApi = null;
      reject(new Error("Não foi possível carregar o player do YouTube."));
    };
    document.head.appendChild(script);
  });
  return promessaApi;
}

/** Player do YouTube dentro de `alvoRef`; devolve os controles e o tempo. */
export function useYoutube(alvoRef: RefObject<HTMLDivElement | null>, videoId: string | undefined) {
  const jogador = useRef<JogadorYoutube | null>(null);
  const [pronto, definirPronto] = useState(false);
  const [tocando, definirTocando] = useState(false);
  const [tempo, definirTempo] = useState({ atual: 0, total: 0 });
  const [falha, definirFalha] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;
    const alvo = alvoRef.current;
    if (!alvo || !videoId) return;
    const filho = document.createElement("div");
    alvo.appendChild(filho);
    carregarApi()
      .then((YT) => {
        if (cancelado) return;
        jogador.current = new YT.Player(filho, {
          videoId,
          width: "100%",
          height: "100%",
          playerVars: { controls: 0, rel: 0, modestbranding: 1, playsinline: 1, disablekb: 1, cc_load_policy: 0 },
          events: {
            onReady: () => definirPronto(true),
            onStateChange: (e) => definirTocando(e.data === 1),
          },
        });
      })
      .catch((erro: Error) => definirFalha(erro.message));
    return () => {
      cancelado = true;
      jogador.current?.destroy();
      jogador.current = null;
      definirPronto(false);
      definirTocando(false);
      alvo.replaceChildren();
    };
  }, [alvoRef, videoId]);

  useEffect(() => {
    if (!pronto) return;
    const intervalo = window.setInterval(() => {
      const j = jogador.current;
      if (j) definirTempo({ atual: j.getCurrentTime(), total: j.getDuration() });
    }, 500);
    return () => window.clearInterval(intervalo);
  }, [pronto]);

  const alternar = useCallback(() => {
    if (tocando) jogador.current?.pauseVideo();
    else jogador.current?.playVideo();
  }, [tocando]);
  const irPara = useCallback((segundos: number) => jogador.current?.seekTo(Math.max(0, segundos), true), []);
  const tocar = useCallback(() => jogador.current?.playVideo(), []);

  return { pronto, tocando, tempo, falha, alternar, irPara, tocar };
}
