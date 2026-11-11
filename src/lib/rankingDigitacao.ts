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
/** Avisa as listas abertas na mesma página que o placar mudou (o evento `storage` só chega às outras abas). */
export const EVENTO_RANKING = "digitacao:ranking-mudou";
const avisar = () => window.dispatchEvent(new Event(EVENTO_RANKING));
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
        Number.isFinite(item.ppm) &&
        Number.isFinite(item.precisao) &&
        typeof item.data === "string",
    );
  } catch {
    return [];
  }
}

/** Mais rápido primeiro; no empate de PPM, quem acertou mais; no empate total, quem chegou antes. */
const maisAlto = (a: RegistroRanking, b: RegistroRanking) => b.ppm - a.ppm || b.precisao - a.precisao || a.data.localeCompare(b.data);

/** Top 10 do jogo. */
export function obterRanking(jogoId: string): RegistroRanking[] {
  return lerBruto(jogoId).sort(maisAlto).slice(0, MAXIMO_POR_JOGO);
}

/** Apaga o placar de um jogo neste navegador. */
export function zerarRanking(jogoId: string) {
  try {
    window.localStorage.removeItem(chaveDoJogo(jogoId));
  } catch {
    // sem armazenamento: não há o que apagar
  }
  avisar();
}

/** Apaga o placar de todos os jogos, e o último apelido lembrado, neste navegador. */
export function zerarTodosOsRankings() {
  try {
    const chaves: string[] = [];
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const chave = window.localStorage.key(i);
      if (chave && (chave.startsWith("digitacao:ranking:") || chave === CHAVE_ULTIMO_APELIDO)) chaves.push(chave);
    }
    chaves.forEach((chave) => window.localStorage.removeItem(chave));
  } catch {
    // sem armazenamento: não há o que apagar
  }
  avisar();
}

/** Quantos registros o jogo tem neste navegador. */
export const totalDeRegistros = (jogoId: string) => lerBruto(jogoId).length;

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
  // Rodada sem tecla acertada dá 0/0 (NaN): vira 0, senão o NaN embaralharia a ordenação do placar.
  const numero = (valor: number) => (Number.isFinite(valor) ? valor : 0);
  const novo: RegistroRanking = {
    apelido,
    ppm: Math.max(0, Math.round(numero(resultado.ppm))),
    precisao: Math.max(0, Math.min(100, Math.round(numero(resultado.precisao)))),
    data: new Date().toISOString(),
  };

  const registrados = lerBruto(jogoId);
  const existente = registrados.find(
    (item) => item.apelido.toLowerCase() === apelido.toLowerCase(),
  );
  const outros = registrados.filter(
    (item) => item.apelido.toLowerCase() !== apelido.toLowerCase(),
  );
  // Fica o melhor pela mesma regra do placar. Antes, um PPM maior com precisão menor trocava o recorde
  // por um resultado pior: quem fazia 80 ppm a 95% e depois 60 ppm a 99% caía para 60.
  const melhor = existente && maisAlto(existente, novo) <= 0 ? existente : novo;
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
