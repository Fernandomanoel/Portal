import type { BlocoConteudo, Campo, ItemAtividade, TabelaReferencia } from "@/types/atividadeAutocorrigida";

/**
 * Montadores dos tipos de questão mais repetidos nas atividades de apostila
 * (escolha, cálculo, associação, texto curto). Devolvem o mesmo `ItemAtividade`
 * que se escreveria à mão: só tiram a repetição de `campos`/`regra`/mensagens.
 * Não termina em `.atividade.ts`, então o carregador não o trata como atividade.
 */

interface Base {
  id: string;
  titulo: string;
  cenario?: string;
  blocos?: BlocoConteudo[];
  tabela?: TabelaReferencia;
}

export function escolha(
  base: Base & { instrucao: string; opcoes: string[]; correta: number; explicacao: string },
): ItemAtividade {
  const { id, titulo, cenario, blocos, tabela, instrucao, opcoes, correta, explicacao } = base;
  return {
    id,
    titulo,
    cenario,
    instrucao,
    blocos,
    tabelaReferencia: tabela,
    campos: [
      {
        id: `${id}-resposta`,
        regra: { tipo: "multipla_escolha", opcoes, correta },
        mensagemCerta: `Correto! ${explicacao}`,
        mensagemErrada: `Ainda não. ${explicacao}`,
      },
    ],
  };
}

export function calculo(
  base: Base & {
    instrucao: string;
    rotulo: string;
    esperado: number;
    tolerancia?: number;
    explicacao: string;
    placeholder?: string;
  },
): ItemAtividade {
  const { id, titulo, cenario, blocos, tabela, instrucao, rotulo, esperado, tolerancia = 0.01, explicacao, placeholder } = base;
  return {
    id,
    titulo,
    cenario,
    instrucao,
    blocos,
    tabelaReferencia: tabela,
    campos: [
      {
        id: `${id}-valor`,
        rotulo,
        placeholder: placeholder ?? "Digite o valor (ex.: 1250,50)",
        regra: { tipo: "numero", esperado, tolerancia },
        mensagemCerta: `Correto! ${explicacao}`,
        mensagemErrada: `Confira o cálculo. ${explicacao}`,
      },
    ],
  };
}

/** Vários cálculos ligados ao mesmo cenário; cada campo traz o seu valor e a sua explicação. */
export function calculos(
  base: Base & {
    instrucao: string;
    campos: { id: string; rotulo: string; esperado: number; tolerancia?: number; explicacao: string }[];
  },
): ItemAtividade {
  const { id, titulo, cenario, blocos, tabela, instrucao } = base;
  return {
    id,
    titulo,
    cenario,
    instrucao,
    blocos,
    tabelaReferencia: tabela,
    campos: base.campos.map(
      (c): Campo => ({
        id: `${id}-${c.id}`,
        rotulo: c.rotulo,
        placeholder: "Digite o valor",
        regra: { tipo: "numero", esperado: c.esperado, tolerancia: c.tolerancia ?? 0.01 },
        mensagemCerta: `Correto! ${c.explicacao}`,
        mensagemErrada: `Confira o cálculo. ${c.explicacao}`,
      }),
    ),
  };
}

/** Associação: cada linha tem a sua lista (as mesmas opções) e a resposta certa. */
export function associar(
  base: Base & {
    instrucao: string;
    opcoes: string[];
    linhas: { id: string; rotulo: string; correta: number }[];
    explicacao: string;
  },
): ItemAtividade {
  const { id, titulo, cenario, blocos, tabela, instrucao, opcoes, linhas, explicacao } = base;
  return {
    id,
    titulo,
    cenario,
    instrucao,
    blocos,
    tabelaReferencia: tabela,
    campos: linhas.map(
      (l): Campo => ({
        id: `${id}-${l.id}`,
        rotulo: l.rotulo,
        regra: {
          tipo: "selecao",
          esperado: String(l.correta),
          opcoes: opcoes.map((texto, i) => ({ valor: String(i), texto })),
        },
        mensagemCerta: `Correto! ${explicacao}`,
        mensagemErrada: `Ainda não. ${explicacao}`,
      }),
    ),
  };
}

/** Resposta curta em texto livre; `chave` exige que o texto toque nos pontos principais. */
export function resposta(
  base: Base & { instrucao: string; rotulo: string; placeholder: string; chave?: RegExp; minPalavras?: number },
): ItemAtividade {
  const { id, titulo, cenario, blocos, tabela, instrucao, rotulo, placeholder, chave, minPalavras = 4 } = base;
  return {
    id,
    titulo,
    cenario,
    instrucao,
    blocos,
    tabelaReferencia: tabela,
    campos: [
      {
        id: `${id}-texto`,
        rotulo,
        placeholder,
        regra: { tipo: "texto", minPalavras, minCaracteres: 20, palavrasChave: chave },
        mensagemCerta: "Resposta registrada. Compare com o que o material da aula diz.",
        mensagemErrada: chave
          ? "A resposta está legível, mas falta tocar nos pontos principais do enunciado. Releia o texto e tente de novo."
          : undefined,
      },
    ],
  };
}
