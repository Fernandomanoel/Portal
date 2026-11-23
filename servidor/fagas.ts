import { CONFIG_MODULOS_INGLES, LIMITES_FAGA, type AtividadeFaga, type Faga, type FaixaFaga } from "../src/types/faga.js";
import type { Armazenamento } from "./armazenamento.js";

/** FAGAs moram em `fagas/<id>.json`, fora das pastas que a limpeza de 3 dias percorre. */
export const caminhoFaga = (id: string) => `fagas/${id}.json`;
export const idFagaValido = (id: string) => /^[a-z0-9-]{6,50}$/.test(id);

export const lerFaga = (armazenamento: Armazenamento, id: string) => armazenamento.lerJson<Faga>(caminhoFaga(id));

export async function listarFagas(armazenamento: Armazenamento): Promise<Faga[]> {
  const itens = (await armazenamento.listar("fagas/")).filter((i) => i.caminho.endsWith(".json"));
  const lidas = await Promise.all(itens.map((i) => armazenamento.lerJson<Faga>(i.caminho)));
  return lidas.filter((f): f is Faga => f !== null).sort((a, b) => a.aluno.localeCompare(b.aluno, "pt-BR"));
}

const texto = (v: unknown, max: number = LIMITES_FAGA.texto) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");
const data = (v: unknown) => (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v)) ? v : "");
const idItem = (v: unknown) => (typeof v === "string" && /^[A-Za-z0-9_-]{1,40}$/.test(v) ? v : "");
const inteiro = (v: unknown, min: number, max: number, padrao: number) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, Math.round(n))) : padrao;
};

export type DadosFaga = Pick<Faga, "aluno" | "livro" | "etapaInicio" | "etapaFim" | "horas" | "faixas" | "config" | "autoavaliacao" | "topicos">;

/** Confere o que veio da tela e devolve só campos conhecidos, ou a mensagem do que está errado. */
export function sanearFaga(corpo: Record<string, unknown>): DadosFaga | string {
  const aluno = texto(corpo.aluno);
  if (aluno.length < 2) return "Informe o nome do aluno.";
  if (!Array.isArray(corpo.faixas)) return "Faixas inválidas.";
  if (corpo.faixas.length > LIMITES_FAGA.faixas) return `A FAGA aceita até ${LIMITES_FAGA.faixas} faixas.`;
  const vistos = new Set<string>();
  const unico = (id: string) => {
    if (!id || vistos.has(id)) return false;
    vistos.add(id);
    return true;
  };
  const faixas: FaixaFaga[] = [];
  for (const bruta of corpo.faixas) {
    const f = (bruta ?? {}) as Record<string, unknown>;
    const id = idItem(f.id);
    if (!unico(id)) return "Faixa com identificador inválido ou repetido.";
    if (!Array.isArray(f.atividades) || f.atividades.length > LIMITES_FAGA.atividades) return `Cada faixa aceita até ${LIMITES_FAGA.atividades} atividades.`;
    const atividades: AtividadeFaga[] = [];
    for (const a of f.atividades) {
      const at = (a ?? {}) as Record<string, unknown>;
      const aid = idItem(at.id);
      if (!unico(aid)) return "Atividade com identificador inválido ou repetido.";
      const rotulo = texto(at.rotulo, 60);
      if (!rotulo) return "Toda atividade precisa de um nome.";
      atividades.push({ id: aid, rotulo, feita: at.feita === true });
    }
    faixas.push({ id, titulo: texto(f.titulo), bloco: texto(f.bloco), inicio: data(f.inicio), fim: data(f.fim), professor: texto(f.professor), atividades });
  }
  const c = (corpo.config ?? {}) as Record<string, unknown>;
  return {
    aluno,
    livro: texto(corpo.livro),
    etapaInicio: data(corpo.etapaInicio),
    etapaFim: data(corpo.etapaFim),
    horas: texto(corpo.horas, 40),
    faixas,
    config: {
      blocosDoLivro: inteiro(c.blocosDoLivro, 1, LIMITES_FAGA.blocosMax, CONFIG_MODULOS_INGLES.blocosDoLivro),
      aulasPorBloco: inteiro(c.aulasPorBloco, 1, LIMITES_FAGA.aulasPorBlocoMax, CONFIG_MODULOS_INGLES.aulasPorBloco),
      mesesPorLivro: inteiro(c.mesesPorLivro, 1, LIMITES_FAGA.mesesMax, CONFIG_MODULOS_INGLES.mesesPorLivro),
    },
    autoavaliacao: corpo.autoavaliacao === true,
    topicos: (Array.isArray(corpo.topicos) ? corpo.topicos : []).slice(0, LIMITES_FAGA.topicos).map((t) => texto(t)).filter(Boolean),
  };
}
