import type { Envio, LancarNotaInput, Professor, ReciboEnvio } from "@/types/envio";
import type { ProvaInterativa, ProvaParaAluno } from "@/types/quiz";

/** Erro da API com a mensagem já pronta para mostrar na tela. */
export class ErroApi extends Error {
  readonly status: number;
  readonly code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

async function chamar<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  let resposta: Response;
  try {
    resposta = await fetch(`/api/${caminho}`, { credentials: "same-origin", ...opcoes });
  } catch {
    throw new ErroApi("Sem conexão com o servidor. Confira a internet e tente de novo.", 0);
  }
  if (resposta.status === 204) return undefined as T;
  const corpo = await resposta.json().catch(() => null);
  if (!resposta.ok) {
    const erro = corpo?.error;
    throw new ErroApi(erro?.message ?? "O servidor não respondeu como esperado. Tente de novo.", resposta.status, erro?.code);
  }
  return corpo as T;
}

function comJson(metodo: string, corpo: unknown): RequestInit {
  return { method: metodo, headers: { "Content-Type": "application/json" }, body: JSON.stringify(corpo) };
}

// ------------------------------------------------------------------- aluno

export interface DadosEnvio {
  /** Gerada uma vez por prova: reenviar depois de uma falha de rede não duplica. */
  chave: string;
  provaId: string;
  nomeAluno: string;
  iniciadaEm: string;
  respostas: (number | string | null)[];
  saidas: Envio["saidas"];
}

export const obterProva = (id: string) => chamar<ProvaParaAluno>(`provas/${id.split("/").map(encodeURIComponent).join("/")}`);

export function enviarProva(dados: DadosEnvio, arquivo: File | null) {
  const formulario = new FormData();
  formulario.set("dados", JSON.stringify(dados));
  if (arquivo) formulario.set("arquivo", arquivo);
  return chamar<ReciboEnvio>("envios", { method: "POST", body: formulario });
}

export function liberarProva(usuario: string, senha: string) {
  return chamar<{ nome: string }>("liberacoes", comJson("POST", { usuario, senha }));
}

/** Só existe enquanto a nota está pendente (`correcao.aRevisar > 0`): fecha a
 *  nota provisória ali mesmo, sem esperar o professor revisar. */
export const aceitarResultadoProvisorio = (id: string) => chamar<ReciboEnvio>(`envios/${encodeURIComponent(id)}/aceitar`, { method: "POST" });

// --------------------------------------------------------------- professor

export const entrar = (usuario: string, senha: string) => chamar<Professor>("sessao", comJson("POST", { usuario, senha }));
export const sair = () => chamar<void>("sessao", { method: "DELETE" });
export const sessaoAtual = () => chamar<Professor>("sessao");

export function listarEnvios(filtros: { provaId?: string; busca?: string } = {}) {
  const parametros = new URLSearchParams();
  if (filtros.provaId) parametros.set("provaId", filtros.provaId);
  if (filtros.busca) parametros.set("busca", filtros.busca);
  const consulta = parametros.toString();
  return chamar<{ dados: Envio[] }>(`envios${consulta ? `?${consulta}` : ""}`);
}

/** `prova` vem com o gabarito; é nula se o arquivo da prova saiu do portal depois do envio. */
export const obterEnvio = (id: string) => chamar<{ envio: Envio; prova: ProvaInterativa | null }>(`envios/${encodeURIComponent(id)}`);
export const lancarNota = (id: string, input: LancarNotaInput) => chamar<Envio>(`envios/${encodeURIComponent(id)}`, comJson("PATCH", input));
export const apagarEnvio = (id: string) => chamar<void>(`envios/${encodeURIComponent(id)}`, { method: "DELETE" });
export const urlArquivo = (id: string) => `/api/envios/${encodeURIComponent(id)}/arquivo`;
