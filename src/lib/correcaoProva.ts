/**
 * Correção dos campos da prova autocorrigida (`ProvaAutocorrigida`). Importado
 * pelo servidor (que corrige de verdade, no "Testar resposta" e no envio) e
 * pela área do professor (que mostra o que cada resposta valeu).
 */
import type { CampoProva, ItemProva, ResultadoItem } from "../types/quiz.js";
import { verificarCodigo } from "./correcaoTexto.js";

/** Lê "1.234,56", "1234.56", "R$ 820,00" e "35%". */
export function lerNumero(texto: string): number {
  let s = texto.trim().replace(/[R$\s%]/gi, "");
  if (s === "") return NaN;
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  return parseFloat(s);
}

/** Barra texto vazio, só números, sem espaços, teclado aleatório ou curto demais. */
export function validarTextoInteligente(texto: string, minPalavras = 3, minComprimento = 12): { valido: boolean; motivo: string } {
  const limpo = (texto ?? "").trim();
  if (!limpo) return { valido: false, motivo: "O campo não pode ficar vazio." };
  if (limpo.length < minComprimento) return { valido: false, motivo: `Escreva pelo menos ${minComprimento} caracteres coerentes.` };
  if (/^\d+$/.test(limpo)) return { valido: false, motivo: "Apenas números foram digitados. Escreva uma resposta em português." };
  if (!limpo.includes(" ") && limpo.length > 16) return { valido: false, motivo: "Sequência contínua sem espaços detectada." };
  const palavras = limpo.split(/\s+/).filter(Boolean);
  if (palavras.length < minPalavras) return { valido: false, motivo: `Escreva pelo menos ${minPalavras} palavras (você escreveu ${palavras.length}).` };
  const vogais = (limpo.match(/[aeiouáéíóúâêôãõà]/gi) ?? []).length;
  const razao = vogais / limpo.length;
  if (razao < 0.18 || razao > 0.82) return { valido: false, motivo: "Texto ilegível ou digitação aleatória." };
  if (/(.)\1{4,}/i.test(limpo) || /qwerty|asdfgh|zxcvbn|123456/i.test(limpo)) return { valido: false, motivo: "Padrão repetitivo do teclado detectado." };
  return { valido: true, motivo: "" };
}

type ResultadoCampo = ResultadoItem["campos"][string];

export function conferirCampo(campo: CampoProva, valor: string): ResultadoCampo {
  const regra = campo.regra;
  const certo = (): ResultadoCampo => ({ certo: true, ...(campo.mensagemCerta ? { mensagem: campo.mensagemCerta } : {}) });
  const errado = (mensagem?: string, detalhes?: ResultadoCampo["detalhes"]): ResultadoCampo => {
    const texto = mensagem ?? campo.mensagemErrada;
    return { certo: false, ...(texto ? { mensagem: texto } : {}), ...(detalhes ? { detalhes } : {}) };
  };

  switch (regra.tipo) {
    case "selecao":
      return valor === regra.esperado ? certo() : errado(valor ? undefined : "Escolha uma opção.");
    case "multipla_escolha":
      return valor === String(regra.correta) ? certo() : errado(valor ? undefined : "Escolha uma opção.");
    case "marcar": {
      const marcadas = valor.split(",").filter(Boolean).map(Number).sort((a, b) => a - b);
      const certas = [...regra.corretas].sort((a, b) => a - b);
      return marcadas.length === certas.length && marcadas.every((m, i) => m === certas[i]) ? certo() : errado(marcadas.length ? undefined : "Marque as afirmativas verdadeiras.");
    }
    case "numero": {
      const numero = lerNumero(valor);
      return !Number.isNaN(numero) && Math.abs(numero - regra.esperado) <= (regra.tolerancia ?? 0.0001) ? certo() : errado(Number.isNaN(numero) ? "Digite um número." : undefined);
    }
    case "texto": {
      const base = validarTextoInteligente(valor, regra.minPalavras, regra.minCaracteres);
      if (!base.valido) return errado(base.motivo);
      if (regra.palavrasChave && !new RegExp(regra.palavrasChave, "i").test(valor)) return errado(regra.mensagemSemPalavraChave);
      return certo();
    }
    case "codigo": {
      const detalhes = verificarCodigo(valor, regra.verificacoes);
      return detalhes.every((d) => d.ok) ? { ...certo(), detalhes } : errado(undefined, detalhes);
    }
  }
}

/** O item só é certo se todos os campos forem certos. */
export function conferirItem(item: ItemProva, valores: Record<string, string>): ResultadoItem {
  const campos = Object.fromEntries(item.campos.map((campo) => [campo.id, conferirCampo(campo, valores[campo.id] ?? "")]));
  const certo = Object.values(campos).every((c) => c.certo);
  const mensagem = certo ? item.mensagemCerta : item.mensagemErrada;
  return { certo, ...(mensagem ? { mensagem } : {}), campos };
}
