import type { PermissaoId, UsuarioCadastrado, UsuarioFixo } from "@/types/acesso";
import type { Unidade } from "@/types/unidade";
import { chamar, comJson } from "./apiProvas";

export interface ListaDeUsuarios {
  dados: UsuarioCadastrado[];
  /** Professores da variável PROFESSORES: só consulta, mudam pela Vercel. */
  fixos: UsuarioFixo[];
  unidades: Unidade[];
}

export interface DadosUsuario {
  nome: string;
  unidades: string[];
  permissoes: PermissaoId[];
}

const caminho = (usuario: string) => `usuarios/${encodeURIComponent(usuario)}`;

export const listarUsuarios = () => chamar<ListaDeUsuarios>("usuarios");
export const criarUsuario = (dados: DadosUsuario & { usuario: string; senha: string }) => chamar<UsuarioCadastrado>("usuarios", comJson("POST", dados));
export const atualizarUsuario = (usuario: string, mudanca: Partial<DadosUsuario> & { senha?: string; ativo?: boolean }) => chamar<UsuarioCadastrado>(caminho(usuario), comJson("PATCH", mudanca));
export const apagarUsuario = (usuario: string) => chamar<void>(caminho(usuario), { method: "DELETE" });
