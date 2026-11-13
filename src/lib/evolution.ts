/**
 * Envio automático de WhatsApp, em dois modos escolhidos sozinhos:
 * - servidor: o portal guarda a chave da Evolution (EVOLUTION_API_KEY) e repassa as chamadas em `/api/whatsapp/*`,
 *   depois de conferir a sessão e a permissão `whatsapp`;
 * - local: sem a chave no servidor (portal na Vercel e Evolution num computador da escola), a página aberta nesse
 *   computador fala direto com a Evolution (padrão http://localhost:8081). Endereço e chave ficam só no navegador
 *   de quem configurou, nunca vão para o servidor.
 * Aqui também ficam as pausas do disparo (contra bloqueio do número).
 */
import { chamar, comJson } from "./apiProvas";

export type Estado = "conectado" | "desconectado" | "sem_instancia";
export type Modo = "servidor" | "local";

export interface ConfigEvolution {
  url: string;
  chave: string;
  instancia: string;
}

export const CONFIG_INICIAL: ConfigEvolution = { url: "http://localhost:8081", chave: "", instancia: "portal" };

const CHAVE_ARMAZENADA = "portal:mensagens:evolution";

export function lerConfig(): ConfigEvolution {
  try {
    const bruto = JSON.parse(localStorage.getItem(CHAVE_ARMAZENADA) ?? "null") as Partial<ConfigEvolution> | null;
    return { ...CONFIG_INICIAL, ...(bruto ?? {}) };
  } catch {
    return CONFIG_INICIAL;
  }
}

export function guardarConfig(config: ConfigEvolution) {
  try {
    localStorage.setItem(CHAVE_ARMAZENADA, JSON.stringify(config));
  } catch {
    // Sem armazenamento (janela anônima): vale só enquanto a página estiver aberta.
  }
}

export const instanciaLimpa = (nome: string) => nome.trim().replace(/[^a-zA-Z0-9_-]/g, "_") || CONFIG_INICIAL.instancia;

/** Pausas contra bloqueio do número: entre envios, a cada lote, e a conferência periódica da conexão. */
export const RITMO = { entreMs: 4000, variacaoMs: 2000, loteACada: 40, pausaLoteMs: 30000, conferirACada: 10, digitandoMs: 1500 } as const;

export class ErroEvolution extends Error {}

const FORA_DO_AR =
  "Não foi possível falar com a Evolution API. Confira se ela está ligada neste computador, se o endereço e a chave estão certos e se o navegador tem permissão para acessar a rede local.";

async function pedir(config: ConfigEvolution, caminho: string, opcoes: { metodo?: string; corpo?: unknown; tempoMs?: number } = {}): Promise<{ status: number; dados: unknown }> {
  const base = config.url.trim().replace(/\/+$/, "");
  let resposta: Response;
  try {
    resposta = await fetch(`${base}${caminho}`, {
      method: opcoes.metodo ?? "GET",
      headers: { apikey: config.chave.trim(), ...(opcoes.corpo ? { "Content-Type": "application/json" } : {}) },
      body: opcoes.corpo ? JSON.stringify(opcoes.corpo) : undefined,
      signal: AbortSignal.timeout(opcoes.tempoMs ?? 20000),
    });
  } catch {
    throw new ErroEvolution(FORA_DO_AR);
  }
  let dados: unknown = null;
  try {
    dados = await resposta.json();
  } catch {
    dados = null;
  }
  return { status: resposta.status, dados };
}

const objeto = (v: unknown): Record<string, unknown> => (v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : Array.isArray(v) && v[0] && typeof v[0] === "object" ? (v[0] as Record<string, unknown>) : {});

async function estadoLocal(config: ConfigEvolution): Promise<Estado> {
  const { status, dados } = await pedir(config, `/instance/connectionState/${instanciaLimpa(config.instancia)}`);
  if (status === 401 || status === 403) throw new ErroEvolution("A Evolution API recusou a chave. Confira a chave (AUTHENTICATION_API_KEY).");
  if (status === 404) return "sem_instancia";
  if (status !== 200) return "desconectado";
  const d = objeto(dados);
  const estado = String(objeto(d.instance).state ?? d.state ?? "close").toLowerCase();
  return estado === "open" || estado === "connected" ? "conectado" : "desconectado";
}

function qrDe(dados: unknown): { imagem: string | null; codigo: string | null } {
  const d = objeto(dados);
  const q = objeto(d.qrcode);
  const candidatos = [d.base64, q.base64, d.code, q.code, typeof d.qrcode === "string" ? d.qrcode : null];
  let imagem: string | null = null;
  for (const valor of candidatos) {
    if (typeof valor !== "string" || !valor) continue;
    if (valor.startsWith("data:image")) imagem = valor;
    else if (valor.startsWith("iVBOR") || valor.startsWith("/9j/") || (valor.length > 80 && !valor.startsWith("2@"))) imagem = `data:image/png;base64,${valor}`;
    if (imagem) break;
  }
  const pareamento = [d.pairingCode, q.pairingCode].find((v): v is string => typeof v === "string" && v.trim() !== "");
  return { imagem, codigo: pareamento?.trim() ?? null };
}

/** Garante a instância e devolve o QR Code para ler no celular (ou `conectado`, se já estiver). */
async function conectarLocal(config: ConfigEvolution): Promise<{ estado: Estado; imagem: string | null; codigo: string | null }> {
  const nome = instanciaLimpa(config.instancia);
  let estado = await estadoLocal(config);
  if (estado === "conectado") return { estado, imagem: null, codigo: null };
  let qr = { imagem: null as string | null, codigo: null as string | null };
  if (estado === "sem_instancia") {
    const criada = await pedir(config, "/instance/create", { metodo: "POST", corpo: { instanceName: nome, qrcode: true, integration: "WHATSAPP-BAILEYS" }, tempoMs: 30000 });
    if (![200, 201, 403, 409].includes(criada.status)) throw new ErroEvolution("A Evolution API não conseguiu criar a instância do WhatsApp.");
    qr = qrDe(criada.dados);
  }
  for (let tentativa = 0; tentativa < 8 && !qr.imagem; tentativa += 1) {
    const resposta = await pedir(config, `/instance/connect/${nome}`, { tempoMs: 25000 });
    if (resposta.status === 200 || resposta.status === 201) qr = qrDe(resposta.dados);
    if (qr.imagem) break;
    estado = await estadoLocal(config);
    if (estado === "conectado") return { estado, imagem: null, codigo: null };
    await esperar(1500);
  }
  if (!qr.imagem && !qr.codigo) throw new ErroEvolution("A Evolution API não devolveu o QR Code. Tente de novo em alguns segundos.");
  return { estado: "desconectado", ...qr };
}

async function desconectarLocal(config: ConfigEvolution): Promise<void> {
  await pedir(config, `/instance/logout/${instanciaLimpa(config.instancia)}`, { metodo: "DELETE" });
}

async function enviarLocal(config: ConfigEvolution, numero: string, texto: string, imagem?: Imagem | null): Promise<boolean> {
  const nome = instanciaLimpa(config.instancia);
  try {
    const resposta = imagem
      ? await pedir(config, `/message/sendMedia/${nome}`, {
          metodo: "POST",
          tempoMs: 60000,
          corpo: { number: numero, mediatype: "image", mimetype: imagem.tipo, caption: texto, media: `data:${imagem.tipo};base64,${imagem.base64}`, fileName: imagem.nome, delay: RITMO.digitandoMs },
        })
      : await pedir(config, `/message/sendText/${nome}`, {
          metodo: "POST",
          tempoMs: 15000 + RITMO.digitandoMs,
          corpo: { number: numero, text: texto, options: { delay: RITMO.digitandoMs, presence: "composing" }, textMessage: { text: texto } },
        });
    return resposta.status === 200 || resposta.status === 201;
  } catch {
    return false;
  }
}

export interface Imagem {
  /** Conteúdo em base64, sem o prefixo `data:`. */
  base64: string;
  tipo: string;
  nome: string;
}

export interface SituacaoWhatsapp {
  modo: Modo;
  /** Pronto para usar: chave no servidor (modo servidor) ou chave guardada neste navegador (modo local). */
  configurado: boolean;
  estado: Estado;
}

let modoAtual: Modo = "servidor";

/** Descobre o modo (pergunta ao portal se ele tem a chave) e o estado da conexão. */
export async function situacaoDoWhatsapp(): Promise<SituacaoWhatsapp> {
  const doServidor = await chamar<{ configurado: boolean; estado: Estado }>("whatsapp/estado");
  if (doServidor.configurado) {
    modoAtual = "servidor";
    return { modo: "servidor", ...doServidor };
  }
  modoAtual = "local";
  const config = lerConfig();
  if (!config.chave.trim()) return { modo: "local", configurado: false, estado: "desconectado" };
  return { modo: "local", configurado: true, estado: await estadoLocal(config) };
}

export const estadoDaConexao = async (): Promise<Estado> =>
  modoAtual === "local" ? estadoLocal(lerConfig()) : (await chamar<{ estado: Estado }>("whatsapp/estado")).estado;

/** Garante a conexão e devolve o QR Code para ler no celular (ou `conectado`, se já estiver). */
export const conectar = () =>
  modoAtual === "local" ? conectarLocal(lerConfig()) : chamar<{ estado: Estado; imagem: string | null; codigo: string | null }>("whatsapp/conectar", comJson("POST", {}));

export const desconectar = async (): Promise<void> => {
  if (modoAtual === "local") await desconectarLocal(lerConfig());
  else await chamar<{ ok: boolean }>("whatsapp/desconectar", comJson("POST", {}));
};

/** Envia para um número; com imagem, o texto vai como legenda. `true` se a Evolution aceitou. */
export async function enviar(numero: string, texto: string, imagem?: Imagem | null): Promise<boolean> {
  if (modoAtual === "local") return enviarLocal(lerConfig(), numero, texto, imagem);
  try {
    const resposta = await chamar<{ ok: boolean }>("whatsapp/enviar", comJson("POST", { numero, texto, ...(imagem ? { imagem } : {}) }));
    return resposta.ok === true;
  } catch {
    return false;
  }
}

export const esperar = (ms: number) => new Promise<void>((resolver) => setTimeout(resolver, ms));

/** Pausa antes do envio de número `feitos + 1` (nenhuma antes do primeiro). */
export function pausaAntesDoProximo(feitos: number): number {
  if (feitos <= 0) return 0;
  const lote = feitos % RITMO.loteACada === 0 ? RITMO.pausaLoteMs : 0;
  return RITMO.entreMs + Math.floor(Math.random() * (RITMO.variacaoMs + 1)) + lote;
}

export const LIMITE_IMAGEM_MB = 5;

export function lerImagem(arquivo: File): Promise<Imagem> {
  return new Promise((resolver, rejeitar) => {
    if (!/^image\/(jpeg|png|webp)$/.test(arquivo.type)) return rejeitar(new Error("Use uma imagem JPG, PNG ou WebP."));
    if (arquivo.size > LIMITE_IMAGEM_MB * 1024 * 1024) return rejeitar(new Error(`A imagem passa de ${LIMITE_IMAGEM_MB} MB.`));
    const leitor = new FileReader();
    leitor.onload = () => resolver({ base64: String(leitor.result).split(",")[1] ?? "", tipo: arquivo.type, nome: arquivo.name });
    leitor.onerror = () => rejeitar(new Error("Não foi possível ler a imagem."));
    leitor.readAsDataURL(arquivo);
  });
}
