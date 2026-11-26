import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

/** Como a música sai: original, com a voz do meio reduzida (karaokê) ou com a voz em destaque. */
export type ModoVoz = "original" | "karaoke" | "voz";

export interface Mixagem {
  volume: number;
  mudo: boolean;
  modo: ModoVoz;
  velocidade: number;
}

export const MIXAGEM_PADRAO: Mixagem = { volume: 0.9, mudo: false, modo: "original", velocidade: 1 };

interface Grafo {
  contexto: AudioContext;
  saida: GainNode;
  caminhos: Record<ModoVoz, GainNode>;
}

/**
 * Monta o mixer: o som do vídeo passa por três caminhos e só um fica ligado.
 * Karaokê = esquerdo menos direito (some o que está no centro, onde costuma ficar a voz);
 * voz em destaque = só o centro, com reforço na faixa da voz. O resultado depende da gravação.
 */
function montarGrafo(el: HTMLVideoElement): Grafo | null {
  const Contexto = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Contexto) return null;
  const contexto = new Contexto();
  const fonte = contexto.createMediaElementSource(el);
  const saida = contexto.createGain();
  saida.connect(contexto.destination);

  const original = contexto.createGain();
  fonte.connect(original).connect(saida);

  const divisor = contexto.createChannelSplitter(2);
  fonte.connect(divisor);

  const karaoke = contexto.createGain();
  const invertido = contexto.createGain();
  invertido.gain.value = -1;
  divisor.connect(karaoke, 0);
  divisor.connect(invertido, 1).connect(karaoke);
  karaoke.connect(saida);

  const centro = contexto.createGain();
  centro.gain.value = 0.5;
  divisor.connect(centro, 0);
  divisor.connect(centro, 1);
  const realce = contexto.createBiquadFilter();
  realce.type = "peaking";
  realce.frequency.value = 2200;
  realce.Q.value = 0.8;
  realce.gain.value = 7;
  const voz = contexto.createGain();
  centro.connect(realce).connect(voz).connect(saida);

  return { contexto, saida, caminhos: { original, karaoke, voz } };
}

/** Player do vídeo do clipe dentro de `alvoRef`: controles, tempo e mixagem. */
export function useVideoArquivo(alvoRef: RefObject<HTMLDivElement | null>, url: string, capa?: string) {
  const video = useRef<HTMLVideoElement | null>(null);
  const grafo = useRef<Grafo | null>(null);
  const [pronto, definirPronto] = useState(false);
  const [tocando, definirTocando] = useState(false);
  const [tempo, definirTempo] = useState({ atual: 0, total: 0 });
  const [falha, definirFalha] = useState<string | null>(null);
  const [mixagem, definirMixagem] = useState<Mixagem>(MIXAGEM_PADRAO);

  useEffect(() => {
    const alvo = alvoRef.current;
    if (!alvo || !url) return;
    const el = document.createElement("video");
    el.src = url;
    if (capa) el.poster = capa;
    el.playsInline = true;
    el.preload = "auto";
    el.addEventListener("loadedmetadata", () => {
      definirPronto(true);
      definirTempo({ atual: 0, total: el.duration });
    });
    el.addEventListener("play", () => definirTocando(true));
    el.addEventListener("pause", () => definirTocando(false));
    el.addEventListener("ended", () => definirTocando(false));
    el.addEventListener("timeupdate", () => definirTempo({ atual: el.currentTime, total: el.duration || 0 }));
    el.addEventListener("error", () => definirFalha("Não foi possível abrir o vídeo. Recarregue a página."));
    alvo.appendChild(el);
    video.current = el;
    return () => {
      el.pause();
      el.removeAttribute("src");
      el.load();
      video.current = null;
      void grafo.current?.contexto.close();
      grafo.current = null;
      definirPronto(false);
      definirTocando(false);
      alvo.replaceChildren();
    };
  }, [alvoRef, url, capa]);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    el.muted = mixagem.mudo;
    el.playbackRate = mixagem.velocidade;
    const g = grafo.current;
    if (g) {
      el.volume = 1;
      g.saida.gain.value = mixagem.volume;
      for (const modo of Object.keys(g.caminhos) as ModoVoz[]) g.caminhos[modo].gain.value = modo === mixagem.modo ? 1 : 0;
    } else {
      el.volume = mixagem.volume;
    }
  }, [mixagem, pronto]);

  /** O mixer só pode nascer depois de um clique ou tecla (regra dos navegadores para som). */
  const garantirGrafo = useCallback(() => {
    const el = video.current;
    if (!el) return;
    if (!grafo.current) {
      try {
        grafo.current = montarGrafo(el);
      } catch {
        grafo.current = null;
      }
      definirMixagem((m) => ({ ...m }));
    }
    void grafo.current?.contexto.resume();
  }, []);

  const tocar = useCallback(() => {
    garantirGrafo();
    void video.current?.play().catch(() => undefined);
  }, [garantirGrafo]);
  const pausar = useCallback(() => video.current?.pause(), []);
  const alternar = useCallback(() => {
    if (video.current?.paused) tocar();
    else pausar();
  }, [tocar, pausar]);
  const irPara = useCallback((segundos: number) => {
    if (video.current) video.current.currentTime = Math.max(0, segundos);
  }, []);
  const tempoAgora = useCallback(() => video.current?.currentTime ?? 0, []);
  const mudarMixagem = useCallback(
    (parte: Partial<Mixagem>) => {
      if (parte.modo && parte.modo !== "original") garantirGrafo();
      definirMixagem((m) => ({ ...m, ...parte }));
    },
    [garantirGrafo],
  );

  return { pronto, tocando, tempo, falha, alternar, irPara, tocar, pausar, tempoAgora, mixagem, mudarMixagem };
}
