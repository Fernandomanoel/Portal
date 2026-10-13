import { useEffect, useRef } from "react";

/** Peças comuns aos jogos de arcade (Balões, Constelação, Pulo): medidas, sorteio, laço de animação e progresso. */

export function precisao(acertos: number, erros: number) {
  const total = acertos + erros;
  return total === 0 ? 100 : Math.round((acertos / total) * 100);
}

/** Palavras por minuto (5 teclas = 1 palavra). Menos de 4 segundos de jogo não diz nada. */
export function ppm(acertos: number, msJogados: number) {
  if (msJogados < 4000) return 0;
  return Math.min(999, Math.round(acertos / 5 / (msJogados / 60000)));
}

export function sortear<T>(lista: readonly T[]): T {
  return lista[Math.floor(Math.random() * lista.length)];
}

export function embaralhar<T>(lista: readonly T[]): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/**
 * Chama `passo(dt)` a cada quadro enquanto `ativo`, com dt em segundos. O
 * passo mais recente fica numa ref: o laço não reinicia a cada render.
 * dt é limitado a 0,1 s para a aba voltar do segundo plano sem um salto.
 */
export function useLaco(ativo: boolean, passo: (dt: number) => void) {
  const passoRef = useRef(passo);
  useEffect(() => {
    passoRef.current = passo;
  });

  useEffect(() => {
    if (!ativo) return;
    let quadro = 0;
    let anterior = performance.now();
    const rodar = (agora: number) => {
      const dt = Math.min(0.1, (agora - anterior) / 1000);
      anterior = agora;
      passoRef.current(dt);
      quadro = requestAnimationFrame(rodar);
    };
    quadro = requestAnimationFrame(rodar);
    return () => cancelAnimationFrame(quadro);
  }, [ativo]);
}

export interface Progresso {
  /** Índice do nível mais alto já liberado. */
  liberado: number;
  /** Estrelas (0 a 3) do melhor resultado em cada nível concluído. */
  estrelas: Record<number, number>;
}

// Progresso fica só neste navegador: é conveniência de quem joga (voltar de
// onde parou), não registro oficial — o ranking é que guarda resultado.
export function lerProgresso(chave: string): Progresso {
  try {
    const salvo = JSON.parse(localStorage.getItem(chave) ?? "null") as Partial<Progresso> | null;
    if (salvo && typeof salvo.liberado === "number") return { liberado: salvo.liberado, estrelas: salvo.estrelas ?? {} };
  } catch {
    // sem acesso ao armazenamento: começa do zero
  }
  return { liberado: 0, estrelas: {} };
}

export function salvarProgresso(chave: string, progresso: Progresso) {
  try {
    localStorage.setItem(chave, JSON.stringify(progresso));
  } catch {
    // sem acesso ao armazenamento: o jogo continua, só não lembra depois
  }
}

/** Progresso com o nível fechado: libera o próximo e guarda a melhor nota (estrelas). */
export function comNivelConcluido(progresso: Progresso, nivel: number, estrelas: number, total: number): Progresso {
  return {
    liberado: Math.min(total - 1, Math.max(progresso.liberado, nivel + 1)),
    estrelas: { ...progresso.estrelas, [nivel]: Math.max(progresso.estrelas[nivel] ?? 0, estrelas) },
  };
}

/** 3 estrelas: 97% de precisão ou mais; 2: 90% ou mais; 1: terminou. */
export function estrelasPorPrecisao(valor: number) {
  if (valor >= 97) return 3;
  if (valor >= 90) return 2;
  return 1;
}
