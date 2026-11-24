import type { AreaId } from "@/types/acesso";
import type { ListaAcompanhamento, ResumoLista } from "@/types/lista";
import { chamar, comJson } from "./apiProvas";
import { comUnidade } from "./unidade";

const caminho = (id: string) => `listas/${encodeURIComponent(id)}`;

export const listarListas = () => chamar<{ dados: ResumoLista[] }>(comUnidade("listas"));
export const criarLista = (duplicarDe?: string, paraTodas = false, area?: AreaId) =>
  chamar<ListaAcompanhamento>(comUnidade("listas"), comJson("POST", { ...(duplicarDe ? { duplicarDe } : {}), ...(paraTodas ? { paraTodas: true } : {}), ...(area ? { area } : {}) }));
export const obterLista = (id: string) => chamar<ListaAcompanhamento>(caminho(id));
export const apagarLista = (id: string) => chamar<void>(caminho(id), { method: "DELETE" });

/** Responde 409 (ErroApi com `corpo.atual`) quando outro professor gravou antes. */
export function gravarLista(lista: ListaAcompanhamento) {
  const { titulo, colunas, linhas, versao, compartilhamento, mesclagens, congelar, graficos } = lista;
  // `compartilhamento: null` avisa o servidor que parou de compartilhar; só quem é da unidade dona consegue mudar isso.
  return chamar<ListaAcompanhamento>(caminho(lista.id), comJson("PUT", { titulo, colunas, linhas, versao, compartilhamento: compartilhamento ?? null, mesclagens, congelar, graficos }));
}
