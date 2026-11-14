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
  { id: "acompanhamento", rotulo: "Acompanhamento de módulos", descricao: "Calcular se o aluno está atrasado nos módulos em relação às parcelas e às faltas." },
  { id: "historico", rotulo: "Histórico dos alunos", descricao: "Montar e formatar o texto de acompanhamento educacional de cada aluno." },
  { id: "pacotes", rotulo: "Analisador de pacotes", descricao: "Analisar a planilha de agendamentos (atrasado, em dia, adiantado)." },
  { id: "mensagens", rotulo: "Mensagens para alunos", descricao: "Montar avisos de faltas e lembretes e abrir no WhatsApp." },
  { id: "usuarios", rotulo: "Gerenciar usuários", descricao: "Criar usuários e definir o que cada um acessa." },
] as const;

export type PermissaoId = (typeof PERMISSOES)[number]["id"];

export const IDS_PERMISSAO: PermissaoId[] = PERMISSOES.map((p) => p.id);

/** Professores da variável PROFESSORES: tudo, menos gerenciar usuários (só o administrador e quem ele liberar). */
export const PERMISSOES_PADRAO: PermissaoId[] = ["provas", "conteudos", "listas", "listas_editar", "acompanhamento", "pacotes", "mensagens", "historico"];

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

/**
 * Professor da variável PROFESSORES. Nome, usuário e senha só mudam pela Vercel; o administrador
 * pode ajustar pela tela as unidades, as permissões e bloquear o acesso (`ajustes/<usuario>.json`).
 */
export interface UsuarioFixo {
  usuario: string;
  nome: string;
  /** Unidade escrita na variável. */
  unidade: string;
  administrador: boolean;
  /** Acesso em vigor: o do ajuste, ou o padrão da variável. */
  unidades: string[];
  permissoes: PermissaoId[];
  ativo: boolean;
  /** Tem ajuste feito pela tela. */
  ajustado: boolean;
  /** Administradores da variável e usuários com nome fora do padrão não são ajustáveis pela tela. */
  ajustavel: boolean;
}

/** Ajuste de um professor da variável, feito pelo administrador na tela Usuários. */
export interface AjusteFixo {
  usuario: string;
  unidades: string[];
  permissoes: PermissaoId[];
  ativo: boolean;
  alteradoEm: string;
  alteradoPor: string;
}

export const LIMITES_USUARIO = { usuario: 30, nome: 80, senhaMinima: 8, senhaMaxima: 100 } as const;
export const usuarioValido = (usuario: string) => /^[a-z0-9][a-z0-9._-]{2,29}$/.test(usuario);
