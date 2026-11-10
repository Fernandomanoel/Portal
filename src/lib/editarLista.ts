import {
  LARGURA_MAXIMA,
  LARGURA_MINIMA,
  LARGURA_PADRAO,
  type ColunaLista,
  type CorLinha,
  type LinhaLista,
  type ListaAcompanhamento,
  type TipoColuna,
  type ValorCelula,
} from "@/types/lista";

/** Operações de edição da lista: todas puras, devolvem uma lista nova. */

const novoId = (prefixo: string) => `${prefixo}${crypto.randomUUID().replace(/-/g, "").slice(0, 8)}`;
const linhaVazia = (): LinhaLista => ({ id: novoId("l"), valores: {} });
type Lista = ListaAcompanhamento;

export function definirValor(lista: Lista, linhaId: string, colunaId: string, valor: ValorCelula | null): Lista {
  return {
    ...lista,
    linhas: lista.linhas.map((l) => {
      if (l.id !== linhaId) return l;
      const valores = { ...l.valores };
      if (valor === null || valor === "" || valor === false) delete valores[colunaId];
      else valores[colunaId] = valor;
      return { ...l, valores };
    }),
  };
}

export function inserirTitulo(lista: Lista, posicao = lista.linhas.length, titulo = ""): Lista {
  const linhas = [...lista.linhas];
  linhas.splice(posicao, 0, { id: novoId("l"), valores: {}, titulo });
  return { ...lista, linhas };
}

export function definirTitulo(lista: Lista, linhaId: string, titulo: string): Lista {
  return { ...lista, linhas: lista.linhas.map((l) => (l.id === linhaId ? { ...l, titulo } : l)) };
}

/** Linha comum vira título (o texto da primeira célula de texto vira o título) e vice-versa. */
export function alternarTitulo(lista: Lista, linhaId: string): Lista {
  return {
    ...lista,
    linhas: lista.linhas.map((l) => {
      if (l.id !== linhaId) return l;
      if (l.titulo !== undefined) {
        const comum = { ...l, valores: {} as LinhaLista["valores"] };
        delete comum.titulo;
        const primeiraTexto = lista.colunas.find((c) => c.tipo === "texto");
        if (primeiraTexto && l.titulo) comum.valores[primeiraTexto.id] = l.titulo;
        return comum;
      }
      const texto = Object.values(l.valores).find((v): v is string => typeof v === "string") ?? "";
      return { ...l, valores: {}, titulo: texto };
    }),
  };
}

/** Faixas [inicio, fim) de linhas comuns entre títulos; só quando a lista tem algum título. */
export function blocos(lista: Lista) {
  if (!lista.linhas.some((l) => l.titulo !== undefined)) return [];
  const faixas: { titulo: string | null; inicio: number; fim: number }[] = [];
  let atual: { titulo: string | null; inicio: number; fim: number } | null = null;
  lista.linhas.forEach((l, i) => {
    if (l.titulo !== undefined) {
      if (atual) faixas.push({ ...atual, fim: i });
      atual = { titulo: l.titulo, inicio: i + 1, fim: i + 1 };
    } else if (!atual) atual = { titulo: null, inicio: i, fim: i };
  });
  if (atual) faixas.push({ ...(atual as { titulo: string | null; inicio: number; fim: number }), fim: lista.linhas.length });
  return faixas;
}

export function inserirLinha(lista: Lista, posicao = lista.linhas.length): Lista {
  const linhas = [...lista.linhas];
  linhas.splice(posicao, 0, linhaVazia());
  return { ...lista, linhas };
}

export function duplicarLinha(lista: Lista, linhaId: string): Lista {
  const i = lista.linhas.findIndex((l) => l.id === linhaId);
  if (i < 0) return lista;
  const linhas = [...lista.linhas];
  linhas.splice(i + 1, 0, { ...structuredClone(lista.linhas[i]), id: novoId("l") });
  return { ...lista, linhas };
}

export const apagarLinha = (lista: Lista, linhaId: string): Lista => ({ ...lista, linhas: lista.linhas.filter((l) => l.id !== linhaId) });

export function moverLinha(lista: Lista, linhaId: string, passo: -1 | 1): Lista {
  const i = lista.linhas.findIndex((l) => l.id === linhaId);
  const j = i + passo;
  if (i < 0 || j < 0 || j >= lista.linhas.length) return lista;
  const linhas = [...lista.linhas];
  [linhas[i], linhas[j]] = [linhas[j], linhas[i]];
  return { ...lista, linhas };
}

export function formatarLinha(lista: Lista, linhaId: string, formato: { cor?: CorLinha | null; negrito?: boolean }): Lista {
  return {
    ...lista,
    linhas: lista.linhas.map((l) => {
      if (l.id !== linhaId) return l;
      const nova = { ...l };
      if (formato.cor !== undefined) {
        if (formato.cor === null) delete nova.cor;
        else nova.cor = formato.cor;
      }
      if (formato.negrito !== undefined) {
        if (formato.negrito) nova.negrito = true;
        else delete nova.negrito;
      }
      return nova;
    }),
  };
}

export function inserirColuna(lista: Lista, tipo: TipoColuna, titulo: string): Lista {
  const coluna: ColunaLista = { id: novoId("c"), titulo, tipo, largura: LARGURA_PADRAO[tipo] };
  if (tipo === "opcoes") coluna.opcoes = ["Opção 1", "Opção 2"];
  return { ...lista, colunas: [...lista.colunas, coluna] };
}

/** Ao trocar o tipo, só sobrevivem os valores que fazem sentido no tipo novo. */
export function alterarColuna(lista: Lista, colunaId: string, mudanca: Partial<Omit<ColunaLista, "id">>): Lista {
  const antiga = lista.colunas.find((c) => c.id === colunaId);
  if (!antiga) return lista;
  const nova: ColunaLista = { ...antiga, ...mudanca };
  if (mudanca.largura !== undefined) nova.largura = Math.min(LARGURA_MAXIMA, Math.max(LARGURA_MINIMA, Math.round(mudanca.largura)));
  if (nova.tipo === "opcoes" && !nova.opcoes) nova.opcoes = ["Opção 1", "Opção 2"];
  if (nova.tipo !== "opcoes") delete nova.opcoes;
  if (nova.tipo !== "numero") {
    delete nova.formato;
    delete nova.casas;
    delete nova.rodape;
  }
  if (mudanca.tipo && mudanca.tipo !== antiga.tipo && mudanca.largura === undefined) nova.largura = LARGURA_PADRAO[mudanca.tipo];

  const serve = (v: ValorCelula) => {
    if (nova.tipo === "marca") return v === true;
    if (nova.tipo === "simnao") return v === "sim" || v === "nao";
    if (nova.tipo === "opcoes") return typeof v === "string" && !!nova.opcoes?.includes(v);
    if (nova.tipo === "data") return typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v);
    return typeof v === "string";
  };
  return {
    ...lista,
    colunas: lista.colunas.map((c) => (c.id === colunaId ? nova : c)),
    linhas: lista.linhas.map((l) => {
      const v = l.valores[colunaId];
      if (v === undefined || serve(v)) return l;
      const valores = { ...l.valores };
      delete valores[colunaId];
      return { ...l, valores };
    }),
  };
}

export function moverColuna(lista: Lista, colunaId: string, passo: -1 | 1): Lista {
  const i = lista.colunas.findIndex((c) => c.id === colunaId);
  const j = i + passo;
  if (i < 0 || j < 0 || j >= lista.colunas.length) return lista;
  const colunas = [...lista.colunas];
  [colunas[i], colunas[j]] = [colunas[j], colunas[i]];
  return { ...lista, colunas };
}

export function apagarColuna(lista: Lista, colunaId: string): Lista {
  return {
    ...lista,
    colunas: lista.colunas.filter((c) => c.id !== colunaId),
    linhas: lista.linhas.map((l) => {
      if (!(colunaId in l.valores)) return l;
      const valores = { ...l.valores };
      delete valores[colunaId];
      return { ...l, valores };
    }),
  };
}

/** Contagem do rodapé, só para colunas de marca e Sim/Não. */
export function contagem(lista: Lista, coluna: ColunaLista, inicio = 0, fim = lista.linhas.length) {
  const linhas = lista.linhas.slice(inicio, fim).filter((l) => l.titulo === undefined);
  const total = linhas.length;
  if (coluna.tipo === "marca") return { marcadas: linhas.filter((l) => l.valores[coluna.id] === true).length, total };
  if (coluna.tipo === "simnao") {
    return {
      sim: linhas.filter((l) => l.valores[coluna.id] === "sim").length,
      nao: linhas.filter((l) => l.valores[coluna.id] === "nao").length,
      total,
    };
  }
  return null;
}

const igual = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

/**
 * Junta as minhas alterações (minha × base) com as de outro professor (deles × base),
 * célula a célula. Devolve null quando os dois mudaram a mesma coisa de jeitos
 * diferentes — aí quem decide é a pessoa.
 */
export function mesclar(base: Lista, minha: Lista, deles: Lista): Lista | null {
  const titulo = minha.titulo !== base.titulo ? minha.titulo : deles.titulo;

  const mudeiColunas = !igual(minha.colunas, base.colunas);
  const mudaramColunas = !igual(deles.colunas, base.colunas);
  if (mudeiColunas && mudaramColunas && !igual(minha.colunas, deles.colunas)) return null;
  const colunas = mudeiColunas ? minha.colunas : deles.colunas;

  const naBase = new Map(base.linhas.map((l) => [l.id, l]));
  const nasMinhas = new Map(minha.linhas.map((l) => [l.id, l]));
  let linhas = deles.linhas.filter((l) => !(naBase.has(l.id) && !nasMinhas.has(l.id)));

  for (const [i, minhaLinha] of minha.linhas.entries()) {
    const original = naBase.get(minhaLinha.id);
    const indiceDeles = linhas.findIndex((l) => l.id === minhaLinha.id);
    if (!original) {
      // Linha nova minha: entra logo depois da linha que vinha antes dela na minha tela.
      const anterior = minha.linhas[i - 1]?.id;
      const posicao = anterior ? linhas.findIndex((l) => l.id === anterior) + 1 : 0;
      linhas = [...linhas.slice(0, posicao), minhaLinha, ...linhas.slice(posicao)];
      continue;
    }
    if (indiceDeles < 0) {
      // O outro apagou a linha; se eu mexi nela, é conflito.
      if (!igual(minhaLinha, original)) return null;
      continue;
    }
    const delesLinha = linhas[indiceDeles];
    const valores = { ...delesLinha.valores };
    const chaves = new Set([...Object.keys(minhaLinha.valores), ...Object.keys(original.valores)]);
    for (const chave of chaves) {
      const meu = minhaLinha.valores[chave];
      const antes = original.valores[chave];
      if (meu === antes) continue;
      const deles = delesLinha.valores[chave];
      if (deles !== antes && deles !== meu) return null;
      if (meu === undefined) delete valores[chave];
      else valores[chave] = meu;
    }
    const estilos = { ...(delesLinha.estilos ?? {}) };
    const chavesEstilo = new Set([...Object.keys(minhaLinha.estilos ?? {}), ...Object.keys(original.estilos ?? {})]);
    for (const chave of chavesEstilo) {
      const meu = minhaLinha.estilos?.[chave];
      const antes = original.estilos?.[chave];
      if (igual(meu, antes)) continue;
      const deles = delesLinha.estilos?.[chave];
      if (!igual(deles, antes) && !igual(deles, meu)) return null;
      if (meu === undefined) delete estilos[chave];
      else estilos[chave] = meu;
    }
    const nova = { ...delesLinha, valores, ...(Object.keys(estilos).length ? { estilos } : {}) };
    if (!Object.keys(estilos).length) delete nova.estilos;
    for (const campo of ["cor", "negrito", "titulo"] as const) {
      if (minhaLinha[campo] === original[campo]) continue;
      if (delesLinha[campo] !== original[campo] && delesLinha[campo] !== minhaLinha[campo]) return null;
      if (minhaLinha[campo] === undefined) delete nova[campo];
      else (nova as Record<string, unknown>)[campo] = minhaLinha[campo];
    }
    linhas[indiceDeles] = nova;
  }

  // Mesclagens, congelamento e gráficos: cada um vai inteiro de quem mudou; se os dois mudaram de jeitos diferentes, é conflito.
  const extras: Partial<Lista> = {};
  for (const campo of ["mesclagens", "congelar", "graficos"] as const) {
    const meuMudou = !igual(minha[campo], base[campo]);
    const delesMudou = !igual(deles[campo], base[campo]);
    if (meuMudou && delesMudou && !igual(minha[campo], deles[campo])) return null;
    (extras as Record<string, unknown>)[campo] = meuMudou ? minha[campo] : deles[campo];
  }

  const ids = new Set(colunas.map((c) => c.id));
  return {
    ...deles,
    ...extras,
    titulo,
    colunas,
    linhas: linhas.map((l) => ({ ...l, valores: Object.fromEntries(Object.entries(l.valores).filter(([c]) => ids.has(c))) })),
  };
}
