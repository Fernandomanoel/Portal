import type { ConteudoCurso, HistoricoConteudo } from "@/types/conteudoProfessor";
import { chamar, comJson } from "./apiProvas";

const caminho = (slug: string) => `conteudos/${encodeURIComponent(slug)}`;

export const obterHistoricoConteudo = (slug: string) => chamar<HistoricoConteudo>(caminho(slug));

/** `base` é o número da última versão que a tela viu; se outro professor gravou depois, responde 409 (ErroApi com `corpo.atual`). */
export const gravarConteudo = (slug: string, conteudo: ConteudoCurso, base: number, comentario: string, tipo: "edicao" | "restauracao" = "edicao") =>
  chamar<HistoricoConteudo>(caminho(slug), comJson("PUT", { conteudo, base, comentario, tipo }));
