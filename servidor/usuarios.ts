import type { AjusteFixo, UsuarioCadastrado } from "../src/types/acesso.js";
import { LIMITES_USUARIO, normalizarPermissoes, usuarioValido } from "../src/types/acesso.js";
import { TODAS_AS_UNIDADES } from "../src/types/unidade.js";
import type { Armazenamento } from "./armazenamento.js";

/**
 * Usuários criados na tela de administração: um arquivo por usuário em
 * `usuarios/<usuario>.json`, fora das pastas que a limpeza de 7 dias percorre.
 * A senha fica só como hash (o mesmo scrypt dos professores da variável).
 */
export interface UsuarioGuardado extends UsuarioCadastrado {
  senha: string;
}

export const caminhoUsuario = (usuario: string) => `usuarios/${usuario}.json`;

export const lerUsuario = (armazenamento: Armazenamento, usuario: string) => armazenamento.lerJson<UsuarioGuardado>(caminhoUsuario(usuario));

export async function listarUsuarios(armazenamento: Armazenamento): Promise<UsuarioGuardado[]> {
  const itens = (await armazenamento.listar("usuarios/")).filter((i) => i.caminho.endsWith(".json"));
  const lidos = await Promise.all(itens.map((i) => armazenamento.lerJson<UsuarioGuardado>(i.caminho)));
  return lidos.filter((u): u is UsuarioGuardado => u !== null).sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
}

/** Ajustes dos professores da variável PROFESSORES (unidades, permissões, bloqueio), um arquivo por usuário. */
export const caminhoAjuste = (usuario: string) => `ajustes/${usuario.toLowerCase()}.json`;

export const lerAjuste = (armazenamento: Armazenamento, usuario: string) =>
  usuarioValido(usuario.toLowerCase()) ? armazenamento.lerJson<AjusteFixo>(caminhoAjuste(usuario)) : Promise.resolve(null);

export const semSenha = ({ senha: _senha, ...resto }: UsuarioGuardado): UsuarioCadastrado => resto;

const texto = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * Confere unidades e permissões vindas da tela. `unidadesValidas`: ids que existem.
 * Devolve a lista limpa (`["*"]` quando marcou todas) ou a mensagem do que está errado.
 */
export function validarAcesso(corpo: Record<string, unknown>, unidadesValidas: string[]): { unidades: string[]; permissoes: ReturnType<typeof normalizarPermissoes> } | string {
  const brutas = Array.isArray(corpo.unidades) ? corpo.unidades.filter((u): u is string => typeof u === "string") : [];
  const todas = brutas.includes(TODAS_AS_UNIDADES);
  const unidades = todas ? [TODAS_AS_UNIDADES] : [...new Set(brutas)];
  if (!unidades.length) return "Escolha ao menos uma unidade (ou marque todas).";
  if (!todas && unidades.some((u) => !unidadesValidas.includes(u))) return "Unidade desconhecida.";
  const permissoes = normalizarPermissoes(corpo.permissoes);
  if (!permissoes.length) return "Marque ao menos uma permissão.";
  return { unidades, permissoes };
}

export function validarNome(corpo: Record<string, unknown>): string | null {
  const nome = texto(corpo.nome, LIMITES_USUARIO.nome);
  return nome.length >= 2 ? nome : null;
}

export function validarSenhaNova(valor: unknown): string | null {
  return typeof valor === "string" && valor.length >= LIMITES_USUARIO.senhaMinima && valor.length <= LIMITES_USUARIO.senhaMaxima ? valor : null;
}

export { usuarioValido };
