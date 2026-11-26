import type { Clipe, LinhaClipe } from "@/types/digitacaoClipe";

export const LIMITES_CLIPE = { linhas: 300, texto: 200, titulo: 80, clipesGuardados: 20 } as const;

/** Link do YouTube (watch, youtu.be, embed, shorts) ou o próprio código -> código do vídeo; vazio se não reconhecer. */
export function idDoYoutube(entrada: string): string {
  const texto = entrada.trim();
  if (/^[\w-]{11}$/.test(texto)) return texto;
  const achado = texto.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  return achado?.[1] ?? "";
}

/**
 * Uma linha por verso. Opcional no começo, o minuto em que o verso entra: «[0:42] texto».
 * Opcional no fim, a tradução depois de « | »: «texto | tradução».
 */
export function lerLetra(bruto: string): LinhaClipe[] {
  const linhas: LinhaClipe[] = [];
  for (const crua of bruto.split(/\r?\n/)) {
    let resto = crua.trim();
    if (!resto) continue;
    let inicio: number | undefined;
    const tempo = resto.match(/^\[(\d{1,3}):(\d{2})\]\s*/);
    if (tempo) {
      inicio = Number(tempo[1]) * 60 + Number(tempo[2]);
      resto = resto.slice(tempo[0].length);
    }
    const [texto, ...traducao] = resto.split(/\s+\|\s+/);
    const limpo = texto.replace(/\s+/g, " ").trim().slice(0, LIMITES_CLIPE.texto);
    if (!limpo) continue;
    const trad = traducao.join(" | ").trim().slice(0, LIMITES_CLIPE.texto);
    linhas.push({ texto: limpo, ...(trad ? { traducao: trad } : {}), ...(inicio !== undefined ? { inicio } : {}) });
    if (linhas.length >= LIMITES_CLIPE.linhas) break;
  }
  return linhas;
}

/** Aspas e travessões «bonitos» valem como os do teclado, para o aluno não travar num verso copiado de site. */
export const normalizarLetra = (c: string) => c.replace(/[‘’´`]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, "-");

export const calcularPrecisao = (acertos: number, erros: number) => (acertos + erros === 0 ? 100 : Math.round((acertos / (acertos + erros)) * 100));

export function calcularPPM(inicioMs: number | null, acertos: number, agoraMs: number) {
  if (!inicioMs) return 0;
  const minutos = (agoraMs - inicioMs) / 60000;
  return minutos <= 0 ? 0 : Math.max(0, Math.min(Math.round(acertos / 5 / minutos), 999));
}

export const formatarTempo = (segundos: number) => {
  const s = Math.max(0, Math.floor(segundos));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};

// ------------------------------------------------------------------ clipes montados no navegador

const CHAVE = "digitacao:clipes-montados";

export function lerClipesGuardados(): Clipe[] {
  try {
    const valores = JSON.parse(window.localStorage.getItem(CHAVE) || "[]");
    if (!Array.isArray(valores)) return [];
    return valores.filter((c): c is Clipe => typeof c?.id === "string" && typeof c?.titulo === "string" && typeof c?.youtubeId === "string" && Array.isArray(c?.linhas));
  } catch {
    return [];
  }
}

export function guardarClipes(clipes: Clipe[]) {
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(clipes.slice(0, LIMITES_CLIPE.clipesGuardados)));
  } catch {
    // sem localStorage: o clipe vale só até fechar a página
  }
}
