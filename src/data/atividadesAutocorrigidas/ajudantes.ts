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

/** Resposta em texto livre; `chave` exige que o texto toque nos pontos principais. */
export function resposta(
  base: Base & { instrucao: string; rotulo: string; placeholder: string; chave?: RegExp; minPalavras?: number; minCaracteres?: number },
): ItemAtividade {
  const { id, titulo, cenario, blocos, tabela, instrucao, rotulo, placeholder, chave, minPalavras = 15, minCaracteres = 80 } = base;
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
        regra: { tipo: "texto", minPalavras, minCaracteres, palavrasChave: chave },
        mensagemCerta: "Resposta registrada. Compare com o que o material da aula diz.",
        mensagemErrada: chave
          ? "A resposta está legível, mas falta tocar nos pontos principais do enunciado. Releia o texto e tente de novo."
          : undefined,
      },
    ],
  };
}

export type Celula = string | number;

const FORMATO = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 });

export const somar = (valores: number[]) => valores.reduce((total, v) => total + v, 0);
export const arredondar = (n: number, casas = 2) => Math.round(n * 10 ** casas) / 10 ** casas;

/**
 * Planilha entregue dentro da atividade: a tabela de dados aparece no item (com o
 * botão de copiar para colar no Excel/Planilhas) e o aluno responde com os
 * resultados que tirou dela. Os valores esperados saem de `valor`, calculados no
 * próprio arquivo a partir de `linhas`, para a conferência nunca destoar da tabela.
 */
export function planilha(
  base: Base & {
    colunas: string[];
    linhas: Celula[][];
    instrucao: string;
    tarefas: { id: string; rotulo: string; valor: number; explicacao: string; tolerancia?: number }[];
  },
): ItemAtividade {
  const { id, titulo, cenario, blocos, colunas, linhas, instrucao, tarefas } = base;
  return {
    id,
    titulo,
    cenario,
    instrucao,
    blocos,
    tabelaReferencia: {
      colunas,
      linhas: linhas.map((linha) => linha.map((c) => (typeof c === "number" ? FORMATO.format(c) : c))),
    },
    campos: tarefas.map(
      (t): Campo => ({
        id: `${id}-${t.id}`,
        rotulo: t.rotulo,
        placeholder: "Digite o resultado que você calculou na planilha",
        regra: { tipo: "numero", esperado: arredondar(t.valor), tolerancia: t.tolerancia ?? 0.02 },
        mensagemCerta: `Correto! ${t.explicacao}`,
        mensagemErrada: `Confira a planilha. ${t.explicacao}`,
      }),
    ),
  };
}

/** Questão dissertativa: lista o que a resposta deve trazer e exige texto de verdade, com os pontos-chave. */
export function dissertativa(
  base: Base & {
    instrucao: string;
    deve: string[];
    placeholder?: string;
    chave: RegExp;
    minPalavras?: number;
  },
): ItemAtividade {
  const { id, titulo, cenario, blocos, tabela, instrucao, deve, placeholder, chave, minPalavras = 30 } = base;
  return {
    id,
    titulo,
    cenario,
    instrucao,
    blocos: [...(blocos ?? []), { tipo: "lista", itens: deve }],
    tabelaReferencia: tabela,
    campos: [
      {
        id: `${id}-texto`,
        rotulo: "Sua resposta",
        placeholder: placeholder ?? "Escreva com as suas palavras, com argumentos e números da planilha quando houver.",
        regra: { tipo: "texto", minPalavras, minCaracteres: minPalavras * 5, palavrasChave: chave },
        mensagemCerta: "Resposta registrada. Compare com o que o material da aula e o instrutor dizem.",
        mensagemErrada: "A resposta está legível, mas falta tocar nos pontos pedidos acima. Releia a lista e complete o texto.",
      },
    ],
  };
}

/** E-mail do gestor que abre o «dia de trabalho»: contexto real e a lista do que deve ser entregue. Não tem campo para responder. */
export function briefing(
  base: { id: string; titulo: string; remetente: string; assunto: string; paragrafos: string[]; entregas: string[] },
): ItemAtividade {
  const { id, titulo, remetente, assunto, paragrafos, entregas } = base;
  return {
    id,
    titulo,
    cenario: `De: ${remetente} · Assunto: ${assunto}`,
    blocos: [
      ...paragrafos.map((texto): BlocoConteudo => ({ tipo: "texto", texto })),
      { tipo: "nota", variante: "objetivo", rotulo: "O que você deve entregar", texto: "", itens: entregas },
    ],
  };
}

/**
 * Trabalho em outro sistema (SQL, Python, portal de notas...): as tabelas ficam no item,
 * o aluno escreve o comando (conferido por `padrao`) e informa o resultado que o
 * sistema devolveu, calculado aqui a partir das mesmas tabelas.
 */
export function consulta(
  base: Base & {
    instrucao: string;
    tabelas: { nome: string; colunas: string[]; linhas: Celula[][] }[];
    codigo?: { rotulo?: string; conteudo: string };
    comandos: { id: string; rotulo: string; padrao: RegExp; placeholder?: string; dica: string }[];
    resultados: { id: string; rotulo: string; valor: number; explicacao: string; tolerancia?: number }[];
  },
): ItemAtividade {
  const { id, titulo, cenario, instrucao, tabelas, codigo, comandos, resultados } = base;
  const blocos: BlocoConteudo[] = [];
  if (codigo) blocos.push({ tipo: "codigo", conteudo: codigo.conteudo, rotulo: codigo.rotulo });
  for (const t of tabelas) {
    blocos.push({ tipo: "subtitulo", texto: t.nome });
    blocos.push({
      tipo: "tabela",
      colunas: t.colunas,
      // Sem separador de milhar e com ponto decimal: é o formato que SQL e Python aceitam ao importar.
      linhas: t.linhas.map((l) => l.map((c) => String(c))),
      copiavel: true,
    });
  }
  return {
    id,
    titulo,
    cenario,
    instrucao,
    blocos,
    campos: [
      ...comandos.map(
        (c): Campo => ({
          id: `${id}-${c.id}`,
          rotulo: c.rotulo,
          placeholder: c.placeholder ?? "Escreva o comando que você executou",
          regra: { tipo: "padrao", padrao: c.padrao },
          mensagemCerta: "Comando coerente com o pedido. Confira também o resultado abaixo.",
          mensagemErrada: c.dica,
        }),
      ),
      ...resultados.map(
        (r): Campo => ({
          id: `${id}-${r.id}`,
          rotulo: r.rotulo,
          placeholder: "Digite o resultado que o sistema devolveu",
          regra: { tipo: "numero", esperado: arredondar(r.valor), tolerancia: r.tolerancia ?? 0.02 },
          mensagemCerta: `Correto! ${r.explicacao}`,
          mensagemErrada: `Confira o resultado. ${r.explicacao}`,
        }),
      ),
    ],
  };
}
