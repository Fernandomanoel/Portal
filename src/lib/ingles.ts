/**
 * Compara o que o aluno escreveu com a resposta: minúsculas, sem pontuação
 * no fim e sem espaço duplicado — "Good morning!" vale como "good morning".
 * É a mesma regra das atividades do portal antigo.
 */
export function normalizarResposta(texto: string): string {
  return texto.trim().toLowerCase().replace(/[.,!?;:]+$/g, "").replace(/\s+/g, " ");
}

export function respostaEscritaCerta(digitado: string, respostas: string[]): boolean {
  const alvo = normalizarResposta(digitado);
  return respostas.some((resposta) => normalizarResposta(resposta) === alvo);
}

/** Resposta escrita com cara de frase (maiúscula e ponto) para aparecer no chat. */
export function comoFrase(texto: string): string {
  const limpo = texto.trim();
  const frase = limpo.charAt(0).toUpperCase() + limpo.slice(1);
  return /[.!?]$/.test(frase) ? frase : `${frase}.`;
}

/**
 * Nos diálogos antigos a resposta certa era quase sempre a primeira opção —
 * dava para acertar sem ler. A ordem na tela é embaralhada, mas sempre igual
 * para a mesma pergunta (sem sorteio a cada render).
 */
export function ordemDasOpcoes(chave: string, quantidade: number): number[] {
  let semente = 0;
  for (const letra of chave) semente = (semente * 31 + letra.charCodeAt(0)) >>> 0;
  const ordem = Array.from({ length: quantidade }, (_, i) => i);
  for (let i = ordem.length - 1; i > 0; i--) {
    semente = (semente * 1103515245 + 12345) >>> 0;
    const j = semente % (i + 1);
    [ordem[i], ordem[j]] = [ordem[j], ordem[i]];
  }
  return ordem;
}

/** Título do resultado pela precisão — as mesmas faixas do portal antigo. */
export function tituloDoResultado(acertos: number, total: number, frases: [string, string, string]) {
  const precisao = (acertos / total) * 100;
  if (precisao >= 80) return { titulo: frases[0], humor: "acertou" as const };
  if (precisao >= 50) return { titulo: frases[1], humor: "neutra" as const };
  return { titulo: frases[2], humor: "explicando" as const };
}
