import { conferirItem } from "../src/lib/correcaoProva.js";
import { respostaAceita, verificarCodigo } from "../src/lib/correcaoTexto.js";
import type { CampoProva, EntradaCampo, ProvaAutocorrigida, ProvaInterativa, ProvaParaAluno } from "../src/types/quiz.js";
import { REGISTRO_PROVAS } from "./provas.gerado.js";

export async function acharProva(id: string): Promise<ProvaInterativa | null> {
  const carregar = REGISTRO_PROVAS[id];
  if (!carregar) return null;
  return (await carregar()).default;
}

/** Tira o gabarito: é isto que vai para o navegador do aluno. */
function entradaDe(campo: CampoProva): EntradaCampo {
  const { regra } = campo;
  if (regra.tipo === "selecao") return { tipo: "selecao", opcoes: regra.opcoes };
  if (regra.tipo === "multipla_escolha" || regra.tipo === "marcar") return { tipo: regra.tipo, opcoes: regra.opcoes };
  if (regra.tipo === "numero") return { tipo: "numero" };
  return { tipo: regra.tipo === "codigo" ? "codigo" : "texto" };
}

export function semGabarito(prova: ProvaInterativa): ProvaParaAluno {
  if (prova.tipo === "descritiva" || prova.tipo === "pratica") return prova;
  if (prova.tipo === "autocorrigida") {
    return {
      ...prova,
      itens: prova.itens.map(({ mensagemCerta: _certa, mensagemErrada: _errada, campos, ...item }) => ({
        ...item,
        campos: campos.map(({ regra: _regra, mensagemCerta: _c, mensagemErrada: _e, ...campo }) => ({ ...campo, entrada: entradaDe({ ...campo, regra: _regra }) })),
      })),
    };
  }
  if (prova.tipo === "mista") {
    return {
      ...prova,
      perguntas: prova.perguntas.map((pergunta) =>
        pergunta.tipo === "dissertativa"
          ? { tipo: pergunta.tipo, pergunta: pergunta.pergunta, audio: pergunta.audio, ...(pergunta.codigo ? { codigo: true as const } : {}) }
          : { pergunta: pergunta.pergunta, audio: pergunta.audio, opcoes: pergunta.opcoes },
      ),
    };
  }
  return { ...prova, perguntas: prova.perguntas.map(({ pergunta, audio, opcoes }) => ({ pergunta, audio, opcoes })) };
}

export function tipoDe(prova: ProvaInterativa) {
  return prova.tipo ?? "multipla_escolha";
}

/**
 * Confere as respostas contra a prova. Devolve as respostas normalizadas ou a
 * mensagem do que está errado — o envio chega do navegador e não é confiável.
 */
export function validarRespostas(prova: ProvaInterativa, respostas: unknown): { ok: true; respostas: (number | string | null)[] } | { ok: false; erro: string } {
  if (prova.tipo === "pratica") return { ok: true, respostas: [] };
  if (prova.tipo === "autocorrigida") {
    if (!Array.isArray(respostas) || respostas.length !== prova.itens.length) {
      return { ok: false, erro: "As respostas não batem com o número de questões da prova." };
    }
    return { ok: true, respostas: respostas.map((r, i) => JSON.stringify(valoresDoItem(prova.itens[i], r))) };
  }
  if (!Array.isArray(respostas) || respostas.length !== prova.perguntas.length) {
    return { ok: false, erro: "As respostas não batem com o número de questões da prova." };
  }
  if (prova.tipo === "descritiva") {
    const textos = respostas.map((r) => (typeof r === "string" ? r.slice(0, 20_000) : null));
    if (textos.some((t) => t === null || !t.trim())) return { ok: false, erro: "Toda questão descritiva precisa de resposta." };
    return { ok: true, respostas: textos };
  }
  if (prova.tipo === "mista") {
    const valores = respostas.map((r, i) => {
      const pergunta = prova.perguntas[i];
      if (pergunta.tipo === "dissertativa") return typeof r === "string" ? r.slice(0, 20_000) : null;
      return Number.isInteger(r) && (r as number) >= 0 && (r as number) < pergunta.opcoes.length ? (r as number) : null;
    });
    if (valores.some((v) => v === null || (typeof v === "string" && !v.trim()))) {
      return { ok: false, erro: "Toda questão precisa de uma resposta." };
    }
    return { ok: true, respostas: valores };
  }
  const escolhas = respostas.map((r, i) =>
    Number.isInteger(r) && (r as number) >= 0 && (r as number) < prova.perguntas[i].opcoes.length ? (r as number) : null,
  );
  if (escolhas.some((e) => e === null)) return { ok: false, erro: "Toda questão precisa de uma opção marcada." };
  return { ok: true, respostas: escolhas };
}

/** Aceita o objeto do item (ou o texto JSON dele) e guarda só os campos que a questão tem. */
export function valoresDoItem(item: ProvaAutocorrigida["itens"][number], bruto: unknown): Record<string, string> {
  let objeto: unknown = bruto;
  if (typeof bruto === "string") {
    try {
      objeto = JSON.parse(bruto);
    } catch {
      objeto = null;
    }
  }
  const origem = objeto && typeof objeto === "object" ? (objeto as Record<string, unknown>) : {};
  return Object.fromEntries(item.campos.map((campo) => [campo.id, typeof origem[campo.id] === "string" ? (origem[campo.id] as string).slice(0, 20_000) : ""]));
}

export function corrigir(prova: ProvaInterativa, respostas: (number | string | null)[]) {
  if (prova.tipo === "pratica" || prova.tipo === "descritiva") return null;
  if (prova.tipo === "autocorrigida") {
    const acertos = prova.itens.reduce((soma, item, i) => (conferirItem(item, valoresDoItem(item, respostas[i])).certo ? soma + 1 : soma), 0);
    const total = prova.itens.length;
    return { acertos, total, nota: Math.round((acertos / total) * 100) / 10 };
  }
  if (prova.tipo === "mista") {
    let acertos = 0;
    let aRevisar = 0;
    prova.perguntas.forEach((pergunta, i) => {
      if (pergunta.tipo === "dissertativa" && pergunta.verificacoes) {
        if (verificarCodigo(String(respostas[i] ?? ""), pergunta.verificacoes).every((v) => v.ok)) acertos += 1;
      } else if (pergunta.tipo === "dissertativa") {
        if (respostaAceita(String(respostas[i] ?? ""), pergunta.respostasAceitas)) acertos += 1;
        else aRevisar += 1;
      } else if (respostas[i] === pergunta.correta) {
        acertos += 1;
      }
    });
    const total = prova.perguntas.length;
    // Enquanto alguma dissertativa não bate com nenhuma resposta aceita, a
    // nota fica pendente — o professor decide, nunca "errada" sem revisão.
    return { acertos, total, aRevisar, nota: aRevisar > 0 ? null : Math.round((acertos / total) * 100) / 10 };
  }
  const acertos = prova.perguntas.reduce((soma, pergunta, i) => (respostas[i] === pergunta.correta ? soma + 1 : soma), 0);
  const total = prova.perguntas.length;
  return { acertos, total, nota: Math.round((acertos / total) * 100) / 10 };
}
