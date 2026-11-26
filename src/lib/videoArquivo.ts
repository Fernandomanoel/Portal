import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

/** Mesmos controles do player do YouTube, para um vídeo escolhido no computador (`url` vazia = não faz nada). */
export function useVideoArquivo(alvoRef: RefObject<HTMLDivElement | null>, url: string | undefined) {
  const video = useRef<HTMLVideoElement | null>(null);
  const [pronto, definirPronto] = useState(false);
  const [tocando, definirTocando] = useState(false);
  const [tempo, definirTempo] = useState({ atual: 0, total: 0 });
  const [falha, definirFalha] = useState<string | null>(null);

  useEffect(() => {
    const alvo = alvoRef.current;
    if (!alvo || !url) return;
    const el = document.createElement("video");
    el.src = url;
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
    el.addEventListener("error", () => definirFalha("Este navegador não conseguiu abrir o vídeo. Tente um arquivo MP4."));
    alvo.appendChild(el);
    video.current = el;
    return () => {
      el.pause();
      el.removeAttribute("src");
      el.load();
      video.current = null;
      definirPronto(false);
      definirTocando(false);
      alvo.replaceChildren();
    };
  }, [alvoRef, url]);

  const alternar = useCallback(() => {
    const el = video.current;
    if (!el) return;
    if (el.paused) void el.play().catch(() => undefined);
    else el.pause();
  }, []);
  const irPara = useCallback((segundos: number) => {
    if (video.current) video.current.currentTime = Math.max(0, segundos);
  }, []);
  const tocar = useCallback(() => void video.current?.play().catch(() => undefined), []);

  return { pronto, tocando, tempo, falha, alternar, irPara, tocar };
}
