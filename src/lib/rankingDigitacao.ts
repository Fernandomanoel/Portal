/**
 * Ranking de Digitação — estoque provisório em localStorage.
 *
 * O ranking final precisa ser compartilhado entre alunos e computadores do
 * laboratório, o que só um backend garante. Como o backend ainda não existe,
 * este módulo guarda os recordes no navegador por enquanto — mesmo padrão já
 * usado no motor de prova antes do backend existir. Quando a API de verdade
 * entrar, só `registrarResultado` e `obterRanking` mudam de implementação
 * (viram chamadas HTTP); nenhum componente que os usa precisa mudar.
 */

export interface RegistroRanking {
  apelido: string;
  ppm: number;
  precisao: number;
  /** ISO 8601. */
  data: string;
}

const MAXIMO_POR_JOGO = 10;
const CHAVE_ULTIMO_APELIDO = "digitacao:ultimo-apelido";

function chaveDoJogo(jogoId: string): string {
  return `digitacao:ranking:${jogoId}`;
}

function lerBruto(jogoId: string): RegistroRanking[] {
  try {
    const bruto = window.localStorage.getItem(chaveDoJogo(jogoId));
    if (!bruto) return [];
    const valores = JSON.parse(bruto);
    if (!Array.isArray(valores)) return [];
    return valores.filter(
      (item): item is RegistroRanking =>
        typeof item === "object" &&
        item !== null &&
        typeof item.apelido === "string" &&
        typeof item.ppm === "number" &&
        typeof item.precisao === "number" &&
        typeof item.data === "string",
    );
  } catch {
    return [];
  }
}

/** Top 10 do jogo, ordenado por PPM (desempate por precisão), mais rápido primeiro. */
export function obterRanking(jogoId: string): RegistroRanking[] {
  return lerBruto(jogoId)
    .sort((a, b) => b.ppm - a.ppm || b.precisao - a.precisao)
    .slice(0, MAXIMO_POR_JOGO);
}

/**
 * Registra um resultado. Um apelido guarda só o melhor resultado dele por
 * jogo — repetir a rodada com o mesmo apelido substitui o recorde anterior
 * só se for melhor. Devolve o ranking já atualizado.
 */
export function registrarResultado(
  jogoId: string,
  resultado: Omit<RegistroRanking, "data">,
): RegistroRanking[] {
  const apelido = resultado.apelido.trim().slice(0, 24) || "Anônimo";
  const novo: RegistroRanking = {
    apelido,
    ppm: Math.max(0, Math.round(resultado.ppm)),
    precisao: Math.max(0, Math.min(100, Math.round(resultado.precisao))),
    data: new Date().toISOString(),
  };

  const registrados = lerBruto(jogoId);
  const existente = registrados.find(
    (item) => item.apelido.toLowerCase() === apelido.toLowerCase(),
  );
  const outros = registrados.filter(
    (item) => item.apelido.toLowerCase() !== apelido.toLowerCase(),
  );
  const melhor =
    existente && existente.ppm >= novo.ppm && existente.precisao >= novo.precisao
      ? existente
      : novo;
  const atualizados = [...outros, melhor];

  try {
    window.localStorage.setItem(chaveDoJogo(jogoId), JSON.stringify(atualizados));
  } catch {
    // Sem localStorage disponível (modo privado etc.) — segue sem persistir.
  }

  try {
    window.localStorage.setItem(CHAVE_ULTIMO_APELIDO, apelido);
  } catch {
    // idem
  }

  return obterRanking(jogoId);
}

export function ultimoApelidoUsado(): string {
  try {
    return window.localStorage.getItem(CHAVE_ULTIMO_APELIDO) ?? "";
  } catch {
    return "";
  }
}
