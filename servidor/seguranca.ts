import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

import type { Professor } from "../src/types/envio.js";
import { TODAS_AS_UNIDADES, type Unidade } from "../src/types/unidade.js";

/**
 * Professores vêm da variável PROFESSORES, um JSON:
 *   [{"usuario":"fernando","nome":"Fernando","senha":"scrypt:..."}]
 * A senha nunca fica em texto: o valor é o hash gerado por
 * `npm run professor:senha`. Não existe tela de cadastro de propósito — quem
 * tem acesso às variáveis do servidor é quem cria professor.
 */
interface ProfessorCadastrado extends Professor {
  senha: string;
}

function professores(): ProfessorCadastrado[] {
  const bruto = process.env.PROFESSORES;
  if (!bruto) return [];
  try {
    const lista = JSON.parse(bruto) as ProfessorCadastrado[];
    if (!Array.isArray(lista)) return [];
    // Professor cadastrado antes de existirem unidades (sem `unidade`) fica na
    // unidade padrão, como os envios e listas antigos: ninguém perde o login.
    const padrao = unidadePadrao();
    return lista.filter((p) => p.usuario && p.senha).map((p) => (p.unidade ? p : { ...p, unidade: padrao ?? "" }));
  } catch {
    return [];
  }
}

export function gerarHashSenha(senha: string): string {
  const sal = randomBytes(16);
  const hash = scryptSync(senha, sal, 32);
  return `scrypt:${sal.toString("hex")}:${hash.toString("hex")}`;
}

function senhaConfere(senha: string, guardada: string): boolean {
  const [algoritmo, salHex, hashHex] = guardada.split(":");
  if (algoritmo !== "scrypt" || !salHex || !hashHex) return false;
  const esperado = Buffer.from(hashHex, "hex");
  const calculado = scryptSync(senha, Buffer.from(salHex, "hex"), esperado.length);
  return timingSafeEqual(calculado, esperado);
}

// Mesmo usuário inexistente passa pelo scrypt: a resposta leva o mesmo tempo
// e não revela quais usuários existem.
const HASH_FALSO = gerarHashSenha(randomBytes(12).toString("hex"));

export function autenticar(usuario: string, senha: string): Professor | "SEM_UNIDADE" | null {
  const alvo = usuario.trim().toLowerCase();
  const professor = professores().find((p) => p.usuario.toLowerCase() === alvo);
  const confere = senhaConfere(senha, professor?.senha ?? HASH_FALSO);
  if (!professor || !confere) return null;
  if (!unidadeValida(professor.unidade)) return "SEM_UNIDADE";
  return { usuario: professor.usuario, nome: professor.nome || professor.usuario, unidade: professor.unidade };
}

// ----------------------------------------------------------------- unidades

/**
 * Unidades vêm da variável UNIDADES, um JSON:
 *   [{"id":"centro","nome":"Unidade Centro","senha":"scrypt:..."}]
 * A senha é a que se digita na aba Provas depois de escolher a unidade na lista
 * (o `id` e o `nome` são públicos, a senha não); vale o mesmo cuidado dos professores
 * (só o hash, gerado por `npm run unidade:senha`). Cada professor da variável
 * PROFESSORES aponta para o `id` da sua unidade, ou para `*` (coordenação).
 */
interface UnidadeCadastrada extends Unidade {
  senha: string;
}

function unidadesCadastradas(): UnidadeCadastrada[] {
  const bruto = process.env.UNIDADES;
  if (!bruto) return [];
  try {
    const lista = JSON.parse(bruto) as UnidadeCadastrada[];
    return Array.isArray(lista) ? lista.filter((u) => /^[a-z0-9-]{2,30}$/.test(u?.id ?? "") && u.nome && u.senha) : [];
  } catch {
    return [];
  }
}

export const todasAsUnidades = (): Unidade[] => unidadesCadastradas().map(({ id, nome }) => ({ id, nome }));
export const acharUnidade = (id: string): Unidade | null => todasAsUnidades().find((u) => u.id === id) ?? null;
export const unidadeValida = (id: unknown): id is string => id === TODAS_AS_UNIDADES || (typeof id === "string" && !!acharUnidade(id));

/** Unidade que herda envios e listas criados antes de existirem unidades (variável UNIDADE_PADRAO). */
export function unidadePadrao(): string | null {
  const id = process.env.UNIDADE_PADRAO?.trim();
  return id && acharUnidade(id) ? id : null;
}

/** Quem aplica a prova escolhe a unidade na lista e digita a senha dela. Id inexistente também passa pelo scrypt: o tempo não revela se a unidade existe. */
export function autenticarUnidade(id: string, senha: string): Unidade | null {
  const unidade = unidadesCadastradas().find((u) => u.id === id);
  const confere = senhaConfere(senha, unidade?.senha ?? HASH_FALSO);
  return unidade && confere ? { id: unidade.id, nome: unidade.nome } : null;
}

// ------------------------------------------------------------------ sessão

export const COOKIE_SESSAO = "portal_professor";
const DURACAO_SESSAO_MS = 12 * 60 * 60 * 1000;

function segredo(): string {
  const valor = process.env.SEGREDO_SESSAO;
  if (!valor || valor.length < 32) throw new Error("SEGREDO_SESSAO ausente ou curto (mínimo 32 caracteres)");
  return valor;
}

function assinar(conteudo: string) {
  return createHmac("sha256", segredo()).update(conteudo).digest("base64url");
}

export function criarSessao(professor: Professor): string {
  const conteudo = Buffer.from(JSON.stringify({ ...professor, expira: Date.now() + DURACAO_SESSAO_MS })).toString("base64url");
  return `${conteudo}.${assinar(conteudo)}`;
}

export function lerSessao(token: string | undefined): Professor | null {
  if (!token) return null;
  const [conteudo, assinatura] = token.split(".");
  if (!conteudo || !assinatura) return null;
  const esperada = Buffer.from(assinar(conteudo));
  const recebida = Buffer.from(assinatura);
  if (esperada.length !== recebida.length || !timingSafeEqual(esperada, recebida)) return null;
  try {
    const dado = JSON.parse(Buffer.from(conteudo, "base64url").toString()) as Professor & { expira: number };
    if (dado.expira < Date.now()) return null;
    // Professor removido da variável perde o acesso sem esperar a sessão expirar;
    // a unidade vem da variável, então mudar o professor de unidade vale na hora.
    const atual = professores().find((p) => p.usuario === dado.usuario);
    if (!atual || !unidadeValida(atual.unidade)) return null;
    return { usuario: dado.usuario, nome: dado.nome, unidade: atual.unidade };
  } catch {
    return null;
  }
}

// A ficha da unidade é o que o aluno carrega depois de digitar a senha da aba Provas.
const DURACAO_FICHA_MS = 12 * 60 * 60 * 1000;

export function criarFicha(unidade: Unidade): { ficha: string; expiraEm: string } {
  const expira = Date.now() + DURACAO_FICHA_MS;
  const conteudo = Buffer.from(JSON.stringify({ u: unidade.id, expira, t: "ficha" })).toString("base64url");
  return { ficha: `${conteudo}.${assinar(conteudo)}`, expiraEm: new Date(expira).toISOString() };
}

export function lerFicha(token: unknown): Unidade | null {
  if (typeof token !== "string") return null;
  const [conteudo, assinatura] = token.split(".");
  if (!conteudo || !assinatura) return null;
  const esperada = Buffer.from(assinar(conteudo));
  const recebida = Buffer.from(assinatura);
  if (esperada.length !== recebida.length || !timingSafeEqual(esperada, recebida)) return null;
  try {
    const dado = JSON.parse(Buffer.from(conteudo, "base64url").toString()) as { u?: string; expira?: number; t?: string };
    if (dado.t !== "ficha" || typeof dado.expira !== "number" || dado.expira < Date.now()) return null;
    return acharUnidade(String(dado.u));
  } catch {
    return null;
  }
}

export function cookieSessao(token: string, seguro: boolean): string {
  return [
    `${COOKIE_SESSAO}=${token}`,
    "Path=/api",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${DURACAO_SESSAO_MS / 1000}`,
    seguro ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

export function cookieApagado(seguro: boolean): string {
  return [`${COOKIE_SESSAO}=`, "Path=/api", "HttpOnly", "SameSite=Strict", "Max-Age=0", seguro ? "Secure" : ""].filter(Boolean).join("; ");
}

export function lerCookie(cabecalho: string | null, nome: string): string | undefined {
  if (!cabecalho) return undefined;
  for (const parte of cabecalho.split(";")) {
    const [chave, ...valor] = parte.trim().split("=");
    if (chave === nome) return valor.join("=");
  }
  return undefined;
}

// ------------------------------------------------------ limite de tentativas

/**
 * Limite por IP, em memória. No servidor físico vale de verdade; na Vercel,
 * cada instância da função tem o seu, então é uma barreira parcial. O custo
 * do scrypt em cada tentativa completa a proteção.
 */
const tentativas = new Map<string, { contagem: number; desde: number }>();
const JANELA_MS = 10 * 60 * 1000;
const MAXIMO = 10;

export function tentativaPermitida(chave: string): boolean {
  const agora = Date.now();
  const registro = tentativas.get(chave);
  if (!registro || agora - registro.desde > JANELA_MS) {
    tentativas.set(chave, { contagem: 1, desde: agora });
    return true;
  }
  registro.contagem += 1;
  return registro.contagem <= MAXIMO;
}

export function limparTentativas(chave: string) {
  tentativas.delete(chave);
}
