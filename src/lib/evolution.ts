/**
 * Envio automático de WhatsApp. O navegador não fala com a Evolution API: pede ao portal (`/api/whatsapp/*`), que
 * guarda a chave no servidor, confere a sessão e a permissão `whatsapp` e repassa. Aqui ficam as chamadas ao
 * portal e as pausas do disparo (contra bloqueio do número), que seguem o sistema de gestão de onde o disparador veio.
 */
import { chamar, comJson } from "./apiProvas";

export type Estado = "conectado" | "desconectado" | "sem_instancia";

/** Pausas contra bloqueio do número: entre envios, a cada lote, e a conferência periódica da conexão. */
export const RITMO = { entreMs: 4000, variacaoMs: 2000, loteACada: 40, pausaLoteMs: 30000, conferirACada: 10, digitandoMs: 1500 } as const;

export interface SituacaoWhatsapp {
  /** O servidor tem a chave da Evolution (variável EVOLUTION_API_KEY). */
  configurado: boolean;
  estado: Estado;
}

export const situacaoDoWhatsapp = () => chamar<SituacaoWhatsapp>("whatsapp/estado");

export const estadoDaConexao = async (): Promise<Estado> => (await situacaoDoWhatsapp()).estado;

/** Garante a conexão e devolve o QR Code para ler no celular (ou `conectado`, se já estiver). */
export const conectar = () => chamar<{ estado: Estado; imagem: string | null; codigo: string | null }>("whatsapp/conectar", comJson("POST", {}));

export const desconectar = () => chamar<{ ok: boolean }>("whatsapp/desconectar", comJson("POST", {}));

export interface Imagem {
  /** Conteúdo em base64, sem o prefixo `data:`. */
  base64: string;
  tipo: string;
  nome: string;
}

/** Envia para um número; com imagem, o texto vai como legenda. `true` se a Evolution aceitou. */
export async function enviar(numero: string, texto: string, imagem?: Imagem | null): Promise<boolean> {
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
