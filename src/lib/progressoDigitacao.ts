/**
 * Progresso dos jogos de digitação (fases liberadas, estrelas, anéis): fica só no
 * navegador de quem joga. Aqui está a lista das chaves e o jeito de apagar tudo,
 * para o botão «Recomeçar do zero» de cada jogo e para a área do professor.
 */

export const JOGOS_COM_PROGRESSO = [
  { chave: "digitacao-baloes-progresso-v1", titulo: "Balões de Letras" },
  { chave: "digitacao-pulo-progresso-v1", titulo: "Pulo das Palavras" },
  { chave: "digitacao-nave-progresso-v1", titulo: "Esquadrão Hiper" },
  { chave: "digitacao-constelacao-progresso-v1", titulo: "Constelação" },
  { chave: "digitacao-sonic-progresso-v1", titulo: "Sonic Digital Pro" },
] as const;

export function limparProgresso(chave: string) {
  try {
    window.localStorage.removeItem(chave);
  } catch {
    // sem armazenamento: não há o que apagar
  }
}

export function temProgresso(chave: string): boolean {
  try {
    return window.localStorage.getItem(chave) !== null;
  } catch {
    return false;
  }
}

export function limparTodoProgresso() {
  JOGOS_COM_PROGRESSO.forEach((jogo) => limparProgresso(jogo.chave));
}
