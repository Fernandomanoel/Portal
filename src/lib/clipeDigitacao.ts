/** Aspas e travessões «bonitos» valem como os do teclado, para o aluno não travar num verso copiado de site. */
export const normalizarLetra = (c: string) => c.replace(/[‘’´`]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, "-");

export const calcularPrecisao = (acertos: number, erros: number) => (acertos + erros === 0 ? 100 : Math.round((acertos / (acertos + erros)) * 100));

export function calcularPPM(inicioMs: number | null, acertos: number, agoraMs: number) {
  if (!inicioMs) return 0;
  const minutos = (agoraMs - inicioMs) / 60000;
  return minutos <= 0 ? 0 : Math.max(0, Math.min(Math.round(acertos / 5 / minutos), 999));
}

export const formatarTempo = (segundos: number) => {
  const s = Math.max(0, Math.floor(Number.isFinite(segundos) ? segundos : 0));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};
