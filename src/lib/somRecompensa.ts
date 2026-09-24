let contexto: AudioContext | null = null;

/**
 * "Ding" curto e baixo, sintetizado na hora — sem arquivo de áudio. Duas notas
 * subindo, com entrada e saída suaves, para soar como elogio e não como alarme.
 */
export function tocarSomRecompensa() {
  if (typeof window === "undefined" || !("AudioContext" in window)) return;
  contexto ??= new AudioContext();
  const agora = contexto.currentTime;

  [523.25, 783.99].forEach((frequencia, indice) => {
    const inicio = agora + indice * 0.12;
    const oscilador = contexto!.createOscillator();
    const volume = contexto!.createGain();
    oscilador.type = "sine";
    oscilador.frequency.value = frequencia;
    volume.gain.setValueAtTime(0, inicio);
    volume.gain.linearRampToValueAtTime(0.12, inicio + 0.02);
    volume.gain.exponentialRampToValueAtTime(0.0001, inicio + 0.3);
    oscilador.connect(volume).connect(contexto!.destination);
    oscilador.start(inicio);
    oscilador.stop(inicio + 0.32);
  });
}
