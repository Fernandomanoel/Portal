/**
 * Acesso dos usuários da área do professor: o que cada um pode usar e de quais
 * unidades. Usuários criados na tela de administração moram no armazenamento
 * (`usuarios/<usuario>.json`); os professores da variável PROFESSORES continuam
 * valendo, com as permissões padrão.
 */

export const PERMISSOES = [
  { id: "provas", rotulo: "Provas enviadas e correção", descricao: "Ver os envios das unidades liberadas e lançar nota." },
  { id: "conteudos", rotulo: "Conteúdos dos cursos", descricao: "Ler e editar a teoria de cada curso." },
  { id: "listas", rotulo: "Listas: ver", descricao: "Abrir as listas das unidades liberadas e as compartilhadas com elas." },
  { id: "listas_editar", rotulo: "Listas: criar e editar", descricao: "Criar listas, editar e compartilhar com outras unidades." },
  { id: "usuarios", rotulo: "Gerenciar usuários", descricao: "Criar usuários e definir o que cada um acessa." },
] as const;

export type PermissaoId = (typeof PERMISSOES)[number]["id"];

export const IDS_PERMISSAO: PermissaoId[] = PERMISSOES.map((p) => p.id);

/** Professores da variável PROFESSORES, e quem o administrador não marcar nada: tudo, menos gerenciar usuários. */
export const PERMISSOES_PADRAO: PermissaoId[] = ["provas", "conteudos", "listas", "listas_editar"];

/** Editar lista pressupõe poder ver. */
export function normalizarPermissoes(lista: unknown): PermissaoId[] {
  const ids = new Set((Array.isArray(lista) ? lista : []).filter((p): p is PermissaoId => IDS_PERMISSAO.includes(p as PermissaoId)));
  if (ids.has("listas_editar")) ids.add("listas");
  return IDS_PERMISSAO.filter((p) => ids.has(p));
}

/** `unidades: ["*"]` = todas as unidades, as de hoje e as que forem criadas. */
export interface UsuarioCadastrado {
  usuario: string;
  nome: string;
  unidades: string[];
  permissoes: PermissaoId[];
  ativo: boolean;
  criadoEm: string;
  criadoPor: string;
  alteradoEm?: string;
}

/** Professor da variável PROFESSORES, mostrado só para consulta (muda-se pela Vercel). */
export interface UsuarioFixo {
  usuario: string;
  nome: string;
  unidade: string;
  administrador: boolean;
}

export const LIMITES_USUARIO = { usuario: 30, nome: 80, senhaMinima: 8, senhaMaxima: 100 } as const;
export const usuarioValido = (usuario: string) => /^[a-z0-9][a-z0-9._-]{2,29}$/.test(usuario);
