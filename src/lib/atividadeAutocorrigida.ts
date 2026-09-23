import type { Campo, ItemAtividade } from "@/types/atividadeAutocorrigida";

/**
 * Detector de digitação aleatória — portado de `corrigirAtividade()` no
 * repositório antigo (a versão mais recente entre as ~48 atividades, usada
 * como motor de referência para esta padronização). Mede proporção de
 * vogais, repetição de caractere e padrões de teclado (qwerty, asdfgh...).
 */
export function pareceGibberish(valor: string): boolean {
  const texto = valor.trim();
  if (!texto) return false;

  if ((texto.match(/[´`^~]/g) ?? []).length >= 2) return true;
  if (texto.length >= 12 && !/\s/.test(texto)) return true;
  if (/(.)\1{5,}/.test(texto)) return true;
  if (/asdfgh|qwerty|zxcvbn|qazwsx|1234567890/i.test(texto.replace(/\s/g, ""))) return true;

  const palavras = texto.split(/\s+/).filter(Boolean);
  let avaliadas = 0;
  let suspeitas = 0;
  for (const palavra of palavras) {
    const letras = palavra.replace(/[^a-zà-úA-ZÀ-Ú]/g, "");
    if (letras.length < 3) continue;
    avaliadas++;
    const vogais = (letras.match(/[aeiouàáâãéêíóôõúAEIOUÀÁÂÃÉÊÍÓÔÕÚ]/g) ?? []).length;
    const razao = vogais / letras.length;
    if (razao < 0.15 || razao > 0.85) {
      suspeitas++;
      continue;
    }
    if (/[^aeiouàáâãéêíóôõúAEIOUÀÁÂÃÉÊÍÓÔÕÚ\d]{5,}/.test(letras)) suspeitas++;
  }
  return avaliadas > 0 && suspeitas / avaliadas > 0.4;
}

export function contarPalavras(valor: string): number {
  return valor.trim().split(/\s+/).filter(Boolean).length;
}

/** Aceita "1.800,00", "1800.5" ou "1800" — formato livre de calculadora/planilha brasileira. */
export function analisarNumero(valor: string): number | null {
  const limpo = valor
    .replace(/[^\d,.-]/g, "")
    .replace(/\.(?=\d{3}(\D|$))/g, "")
    .replace(",", ".");
  const numero = Number.parseFloat(limpo);
  return Number.isNaN(numero) ? null : numero;
}

export type ResultadoCampo =
  | { status: "vazio" }
  | { status: "certo"; mensagem?: string }
  | { status: "errado"; mensagem: string };

/** `respostas` traz os demais campos do mesmo item, para regras de `numero` calculadas (ex.: reembolso = adiantamento − total). */
export function corrigirCampo(campo: Campo, valor: string, respostas: Record<string, string>): ResultadoCampo {
  const limpo = valor.trim();
  if (!limpo) return { status: "vazio" };
  if (!campo.regra) return { status: "certo" };

  const regra = campo.regra;

  switch (regra.tipo) {
    case "texto": {
      if (pareceGibberish(limpo)) {
        return { status: "errado", mensagem: campo.mensagemErrada ?? "Isso não parece uma resposta válida — parece digitação aleatória." };
      }
      if (regra.minCaracteres && limpo.length < regra.minCaracteres) {
        return { status: "errado", mensagem: campo.mensagemErrada ?? `Resposta muito curta — escreva pelo menos ${regra.minCaracteres} caracteres.` };
      }
      if (regra.minPalavras && contarPalavras(limpo) < regra.minPalavras) {
        return { status: "errado", mensagem: campo.mensagemErrada ?? `Resposta muito curta — desenvolva mais (mínimo ${regra.minPalavras} palavras).` };
      }
      if (regra.palavrasChave && !regra.palavrasChave.test(limpo)) {
        return { status: "errado", mensagem: campo.mensagemErrada ?? "A resposta está legível, mas falta abordar os pontos principais do enunciado." };
      }
      return { status: "certo", mensagem: campo.mensagemCerta };
    }

    case "padrao": {
      const certo = regra.padrao.test(limpo);
      return certo
        ? { status: "certo", mensagem: campo.mensagemCerta }
        : { status: "errado", mensagem: campo.mensagemErrada ?? "Formato inválido." };
    }

    case "selecao": {
      const certo = Array.isArray(regra.esperado) ? regra.esperado.includes(limpo) : limpo === regra.esperado;
      return certo
        ? { status: "certo", mensagem: campo.mensagemCerta }
        : { status: "errado", mensagem: campo.mensagemErrada ?? "Alternativa incorreta." };
    }

    case "multipla_escolha": {
      const certo = Number(limpo) === regra.correta;
      return certo
        ? { status: "certo", mensagem: campo.mensagemCerta }
        : { status: "errado", mensagem: campo.mensagemErrada ?? "Alternativa incorreta." };
    }

    case "numero": {
      const numero = analisarNumero(limpo);
      if (numero === null) {
        return { status: "errado", mensagem: "Digite um valor numérico." };
      }
      const alvo = typeof regra.esperado === "function" ? regra.esperado(respostas) : regra.esperado;
      const certo = Math.abs(numero - alvo) <= (regra.tolerancia ?? 0);
      return certo
        ? { status: "certo", mensagem: campo.mensagemCerta }
        : { status: "errado", mensagem: campo.mensagemErrada ?? "Valor incorreto." };
    }
  }
}

export interface ResultadoItem {
  status: "vazio" | "certo" | "parcial" | "errado";
  campos: Record<string, ResultadoCampo>;
}

export function itemTemCorrecao(item: ItemAtividade): boolean {
  return (item.campos ?? []).some((campo) => campo.regra);
}

/** Um item só é "certo" se todos os seus campos graduáveis estiverem certos. */
export function corrigirItem(item: ItemAtividade, respostas: Record<string, string>): ResultadoItem {
  const campos: Record<string, ResultadoCampo> = {};
  const graduaveis = (item.campos ?? []).filter((campo) => campo.regra);

  for (const campo of graduaveis) {
    campos[campo.id] = corrigirCampo(campo, respostas[campo.id] ?? "", respostas);
  }

  const resultados = Object.values(campos);
  const vazios = resultados.filter((r) => r.status === "vazio").length;
  const certos = resultados.filter((r) => r.status === "certo").length;

  let status: ResultadoItem["status"];
  if (vazios === resultados.length) status = "vazio";
  else if (certos === resultados.length) status = "certo";
  else if (certos > 0) status = "parcial";
  else status = "errado";

  return { status, campos };
}
