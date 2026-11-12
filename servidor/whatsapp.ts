/**
 * Ponte entre o portal e a Evolution API (o serviço ligado ao WhatsApp). A Evolution fica na rede interna do
 * servidor, sem porta aberta para a internet; só este módulo fala com ela, com a chave guardada em variável de
 * ambiente. O navegador nunca vê a chave nem o endereço: pede ao portal, que confere a sessão e a permissão
 * `whatsapp` antes de repassar (veja as rotas `/api/whatsapp/*` em rotas.ts).
 *
 * Variáveis: EVOLUTION_API_KEY (obrigatória para ligar), EVOLUTION_URL (padrão http://evolution_api:8080, o nome
 * do serviço no docker-compose) e EVOLUTION_INSTANCE (padrão «portal»).
 */

export type EstadoWhatsapp = "conectado" | "desconectado" | "sem_instancia";

export class ErroWhatsapp extends Error {
  status: number;
  constructor(status: number, mensagem: string) {
    super(mensagem);
    this.status = status;
  }
}

const url = () => (process.env.EVOLUTION_URL?.trim() || "http://evolution_api:8080").replace(/\/+$/, "");
const chave = () => process.env.EVOLUTION_API_KEY?.trim() ?? "";
const instancia = () => (process.env.EVOLUTION_INSTANCE ?? "portal").trim().replace(/[^a-zA-Z0-9_-]/g, "_") || "portal";

export const whatsappConfigurado = () => chave() !== "";

const esperar = (ms: number) => new Promise<void>((resolver) => setTimeout(resolver, ms));

async function pedir(caminho: string, opcoes: { metodo?: string; corpo?: unknown; tempoMs?: number } = {}): Promise<{ status: number; dados: unknown }> {
  if (!whatsappConfigurado()) throw new ErroWhatsapp(503, "A conexão com o WhatsApp não está configurada no servidor (variável EVOLUTION_API_KEY).");
  let resposta: Response;
  try {
    resposta = await fetch(`${url()}${caminho}`, {
      method: opcoes.metodo ?? "GET",
      headers: { apikey: chave(), ...(opcoes.corpo ? { "Content-Type": "application/json" } : {}) },
      body: opcoes.corpo ? JSON.stringify(opcoes.corpo) : undefined,
      signal: AbortSignal.timeout(opcoes.tempoMs ?? 20000),
    });
  } catch {
    throw new ErroWhatsapp(502, "O servidor não conseguiu falar com a Evolution API. Confira se o serviço está no ar.");
  }
  let dados: unknown = null;
  try {
    dados = await resposta.json();
  } catch {
    dados = null;
  }
  return { status: resposta.status, dados };
}

const objeto = (v: unknown): Record<string, unknown> =>
  v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : Array.isArray(v) && v[0] && typeof v[0] === "object" ? (v[0] as Record<string, unknown>) : {};

export async function estadoDaConexao(): Promise<EstadoWhatsapp> {
  const { status, dados } = await pedir(`/instance/connectionState/${instancia()}`);
  if (status === 401 || status === 403) throw new ErroWhatsapp(502, "A Evolution API recusou a chave do servidor. Confira EVOLUTION_API_KEY.");
  if (status === 404) return "sem_instancia";
  if (status !== 200) return "desconectado";
  const d = objeto(dados);
  const estado = String(objeto(d.instance).state ?? d.state ?? "close").toLowerCase();
  return estado === "open" || estado === "connected" ? "conectado" : "desconectado";
}

function qrDe(dados: unknown): { imagem: string | null; codigo: string | null } {
  const d = objeto(dados);
  const q = objeto(d.qrcode);
  let imagem: string | null = null;
  for (const valor of [d.base64, q.base64, d.code, q.code, typeof d.qrcode === "string" ? d.qrcode : null]) {
    if (typeof valor !== "string" || !valor) continue;
    if (valor.startsWith("data:image")) imagem = valor;
    else if (valor.startsWith("iVBOR") || valor.startsWith("/9j/") || (valor.length > 80 && !valor.startsWith("2@"))) imagem = `data:image/png;base64,${valor}`;
    if (imagem) break;
  }
  const pareamento = [d.pairingCode, q.pairingCode].find((v): v is string => typeof v === "string" && v.trim() !== "");
  return { imagem, codigo: pareamento?.trim() ?? null };
}

/** Garante a conexão (instância) e devolve o QR Code para ler no celular, ou `conectado` se já estiver. */
export async function conectar(): Promise<{ estado: EstadoWhatsapp; imagem: string | null; codigo: string | null }> {
  const nome = instancia();
  let estado = await estadoDaConexao();
  if (estado === "conectado") return { estado, imagem: null, codigo: null };
  let qr = { imagem: null as string | null, codigo: null as string | null };
  if (estado === "sem_instancia") {
    const criada = await pedir("/instance/create", { metodo: "POST", corpo: { instanceName: nome, qrcode: true, integration: "WHATSAPP-BAILEYS" }, tempoMs: 30000 });
    if (![200, 201, 403, 409].includes(criada.status)) throw new ErroWhatsapp(502, "A Evolution API não conseguiu criar a conexão do WhatsApp.");
    qr = qrDe(criada.dados);
  }
  for (let tentativa = 0; tentativa < 8 && !qr.imagem; tentativa += 1) {
    const resposta = await pedir(`/instance/connect/${nome}`, { tempoMs: 25000 });
    if (resposta.status === 200 || resposta.status === 201) qr = qrDe(resposta.dados);
    if (qr.imagem) break;
    estado = await estadoDaConexao();
    if (estado === "conectado") return { estado, imagem: null, codigo: null };
    await esperar(1500);
  }
  if (!qr.imagem && !qr.codigo) throw new ErroWhatsapp(502, "A Evolution API não devolveu o QR Code. Tente de novo em alguns segundos.");
  return { estado: "desconectado", ...qr };
}

export async function desconectar(): Promise<void> {
  await pedir(`/instance/logout/${instancia()}`, { metodo: "DELETE" });
}

export const LIMITES_WHATSAPP = { texto: 4096, imagemBytes: 5 * 1024 * 1024 } as const;
const TIPOS_IMAGEM = ["image/jpeg", "image/png", "image/webp"];
const PAUSA_DIGITANDO_MS = 1500;

export interface ImagemWhatsapp {
  /** Conteúdo em base64, sem o prefixo `data:`. */
  base64: string;
  tipo: string;
  nome: string;
}

/** Confere o corpo vindo do navegador; devolve a mensagem do que está errado, ou `null` se estiver bom. */
export function validarEnvio(corpo: Record<string, unknown> | null): { numero: string; texto: string; imagem: ImagemWhatsapp | null } | string {
  if (!corpo) return "Envio em formato inválido.";
  const numero = typeof corpo.numero === "string" ? corpo.numero : "";
  if (!/^\d{10,15}$/.test(numero)) return "Número de telefone inválido.";
  const texto = typeof corpo.texto === "string" ? corpo.texto : "";
  if (!texto.trim() || texto.length > LIMITES_WHATSAPP.texto) return `A mensagem precisa ter de 1 a ${LIMITES_WHATSAPP.texto} caracteres.`;
  const bruta = corpo.imagem;
  if (bruta === undefined || bruta === null) return { numero, texto, imagem: null };
  const i = objeto(bruta);
  const base64 = typeof i.base64 === "string" ? i.base64 : "";
  const tipo = typeof i.tipo === "string" ? i.tipo : "";
  // O base64 ocupa cerca de 4/3 do tamanho do arquivo.
  if (!base64 || !/^[A-Za-z0-9+/=]+$/.test(base64) || base64.length > Math.ceil((LIMITES_WHATSAPP.imagemBytes * 4) / 3) + 4) return "Imagem inválida ou grande demais.";
  if (!TIPOS_IMAGEM.includes(tipo)) return "Use uma imagem JPG, PNG ou WebP.";
  const nome = (typeof i.nome === "string" ? i.nome : "imagem").replace(/[^\w.-]+/g, "_").slice(0, 80) || "imagem";
  return { numero, texto, imagem: { base64, tipo, nome } };
}

/** Envia um texto (ou uma imagem com o texto de legenda). `true` se a Evolution aceitou. */
export async function enviar(numero: string, texto: string, imagem: ImagemWhatsapp | null): Promise<boolean> {
  const nome = instancia();
  const resposta = imagem
    ? await pedir(`/message/sendMedia/${nome}`, {
        metodo: "POST",
        tempoMs: 60000,
        corpo: { number: numero, mediatype: "image", mimetype: imagem.tipo, caption: texto, media: `data:${imagem.tipo};base64,${imagem.base64}`, fileName: imagem.nome, delay: PAUSA_DIGITANDO_MS },
      })
    : await pedir(`/message/sendText/${nome}`, {
        metodo: "POST",
        tempoMs: 15000 + PAUSA_DIGITANDO_MS,
        corpo: { number: numero, text: texto, options: { delay: PAUSA_DIGITANDO_MS, presence: "composing" }, textMessage: { text: texto } },
      });
  return resposta.status === 200 || resposta.status === 201;
}
