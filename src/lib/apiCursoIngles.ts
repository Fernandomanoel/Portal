import type { AulaIngles, ResumoAulaIngles } from "@/types/aulaIngles";
import { chamar, comJson } from "./apiProvas";

/** Curso de Inglês: área com senha própria. O cookie da senha é cuidado pelo navegador; a página não guarda nada. */
export const entrarCursoIngles = (senha: string) => chamar<{ ok: boolean }>("curso-ingles/entrar", comJson("POST", { senha }));

export const sairCursoIngles = () => chamar<void>("curso-ingles/sair", { method: "POST" });

/** `comSenha` é falso enquanto o servidor não tem a variável SENHA_CURSO_INGLES: a área abre sem senha. */
export const listarAulasIngles = () => chamar<{ dados: ResumoAulaIngles[]; comSenha: boolean }>("curso-ingles/aulas");

export const obterAulaIngles = async (id: string) => (await chamar<{ aula: AulaIngles }>(`curso-ingles/aulas/${encodeURIComponent(id)}`)).aula;
