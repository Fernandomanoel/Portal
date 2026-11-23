import type { AulaIngles, ResumoAulaIngles } from "@/types/aulaIngles";
import { chamar, comJson } from "./apiProvas";

/** Curso de Inglês: área com senha própria. O cookie da senha é cuidado pelo navegador; a página não guarda nada. */
export const entrarCursoIngles = (senha: string) => chamar<{ ok: boolean }>("curso-ingles/entrar", comJson("POST", { senha }));

export const sairCursoIngles = () => chamar<void>("curso-ingles/sair", { method: "POST" });

export const listarAulasIngles = async () => (await chamar<{ dados: ResumoAulaIngles[] }>("curso-ingles/aulas")).dados;

export const obterAulaIngles = async (id: string) => (await chamar<{ aula: AulaIngles }>(`curso-ingles/aulas/${encodeURIComponent(id)}`)).aula;
