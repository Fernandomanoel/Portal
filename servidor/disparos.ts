import { randomUUID } from "node:crypto";

import { LIMITES_DISPARO, type ItemDisparo, type RegistroDisparo } from "../src/types/disparo.js";

export const caminhoDisparo = (registro: Pick<RegistroDisparo, "id" | "disparadoEm">) => `disparos/${registro.disparadoEm.slice(0, 10)}/${registro.id}.json`;

const STATUS = ["enviado", "falhou", "sem_telefone", "cancelado"];
const FINS = ["completo", "cancelado", "desconectado"];

/** Confere o registro que chega do navegador e devolve só os campos conhecidos, ou a mensagem do que está errado. */
export function validarDisparo(corpo: Record<string, unknown> | null): Pick<RegistroDisparo, "tipo" | "modelo" | "comImagem" | "fim" | "itens"> | string {
  if (!corpo) return "Registro em formato inválido.";
  if (corpo.tipo !== "faltas" && corpo.tipo !== "aviso") return "Tipo de mensagem inválido.";
  if (!FINS.includes(corpo.fim as string)) return "Situação final inválida.";
  if (!Array.isArray(corpo.itens) || !corpo.itens.length) return "Registro sem destinatários.";
  if (corpo.itens.length > LIMITES_DISPARO.itens) return `Um disparo registra até ${LIMITES_DISPARO.itens} destinatários.`;
  const itens: ItemDisparo[] = [];
  for (const bruto of corpo.itens as Record<string, unknown>[]) {
    const nome = typeof bruto?.nome === "string" ? bruto.nome.trim().slice(0, LIMITES_DISPARO.nome) : "";
    const numero = typeof bruto?.numero === "string" ? bruto.numero : "";
    if (!nome || !STATUS.includes(bruto.status as string) || !/^\d{0,15}$/.test(numero)) return "Destinatário inválido no registro.";
    const canal = bruto.canal === "aluno" || bruto.canal === "responsavel" ? bruto.canal : "";
    itens.push({ nome, numero, canal, status: bruto.status as ItemDisparo["status"] });
  }
  return {
    tipo: corpo.tipo,
    modelo: typeof corpo.modelo === "string" ? corpo.modelo.slice(0, LIMITES_DISPARO.modelo) : "",
    comImagem: corpo.comImagem === true,
    fim: corpo.fim as RegistroDisparo["fim"],
    itens,
  };
}

export const novoIdDisparo = () => `dsp_${randomUUID().replace(/-/g, "").slice(0, 12)}`;
