import type { RegistroDisparo } from "@/types/disparo";
import { chamar, comJson } from "./apiProvas";
import { comUnidade } from "./unidade";

export const listarDisparos = () => chamar<{ dados: RegistroDisparo[]; diasGuardados: number }>(comUnidade("disparos"));
export const registrarDisparo = (registro: Pick<RegistroDisparo, "tipo" | "modelo" | "comImagem" | "fim" | "itens">) => chamar<RegistroDisparo>(comUnidade("disparos"), comJson("POST", registro));
