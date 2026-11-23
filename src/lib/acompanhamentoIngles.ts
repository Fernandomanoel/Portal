import { faixaConcluida, type Faga } from "@/types/faga";

/**
 * Módulos de Inglês: compara o que a FAGA mostra com o que o livro pede.
 * O livro tem `blocosDoLivro` blocos, cada um visto em `aulasPorBloco` aulas, e deve terminar em
 * `mesesPorLivro` meses a contar do início da etapa. O ritmo previsto sai dessas três contas.
 */

const DIA_MS = 86_400_000;
const SEMANAS_POR_MES = 365 / 12 / 7;

export type SituacaoBloco = "concluido" | "em_dia" | "atrasado" | "a_iniciar";

export interface BlocoCalculado {
  nome: string;
  /** Aulas que o bloco deveria ter tido até hoje (de 0 ao máximo do bloco). */
  aulasPrevistas: number;
  aulasDadas: number;
  atrasoAulas: number;
  situacao: SituacaoBloco;
  /** Bloco que o livro prevê, mas que ainda não foi montado na FAGA. */
  naoMontado: boolean;
}

export interface ResultadoModulosIngles {
  semInicio: boolean;
  totalAulas: number;
  aulasDadas: number;
  aulasPrevistasHoje: number;
  atrasoAulas: number;
  ritmoPrevistoPorSemana: number;
  ritmoRealPorSemana: number | null;
  /** AAAA-MM-DD */
  fimPrevisto: string | null;
  fimProjetado: string | null;
  /** Positivo: termina depois do prazo. Nulo sem dado para projetar. */
  diasDeAtraso: number | null;
  blocos: BlocoCalculado[];
}

const paraData = (iso: string) => new Date(`${iso}T12:00:00`);
const paraIso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function somarMeses(iso: string, meses: number) {
  const d = paraData(iso);
  d.setMonth(d.getMonth() + meses);
  return paraIso(d);
}

/** Faixas seguidas com o mesmo nome de bloco formam um bloco; faixa sem nome fica em «Sem bloco». */
export function blocosDaFaga(faga: Pick<Faga, "faixas">) {
  const blocos: { nome: string; dadas: number }[] = [];
  let ultimo: string | null = null;
  for (const faixa of faga.faixas) {
    const nome = faixa.bloco || "Sem bloco";
    if (nome !== ultimo) blocos.push({ nome, dadas: 0 });
    ultimo = nome;
    if (faixaConcluida(faixa)) blocos[blocos.length - 1].dadas += 1;
  }
  return blocos;
}

export function calcularModulosIngles(faga: Faga, hoje: Date = new Date()): ResultadoModulosIngles {
  const { blocosDoLivro, aulasPorBloco, mesesPorLivro } = faga.config;
  const totalAulas = blocosDoLivro * aulasPorBloco;
  const inicio = faga.etapaInicio || faga.faixas.map((f) => f.inicio).filter(Boolean).sort()[0] || "";
  const montados = blocosDaFaga(faga);
  const aulasDadas = montados.reduce((soma, b) => soma + b.dadas, 0);
  const ritmoPrevistoPorSemana = totalAulas / (mesesPorLivro * SEMANAS_POR_MES);

  const base = { totalAulas, aulasDadas, ritmoPrevistoPorSemana };
  if (!inicio) {
    return { ...base, semInicio: true, aulasPrevistasHoje: 0, atrasoAulas: 0, ritmoRealPorSemana: null, fimPrevisto: null, fimProjetado: null, diasDeAtraso: null, blocos: montados.map((b) => ({ nome: b.nome, aulasPrevistas: 0, aulasDadas: Math.min(b.dadas, aulasPorBloco), atrasoAulas: 0, situacao: b.dadas >= aulasPorBloco ? "concluido" : b.dadas ? "em_dia" : "a_iniciar", naoMontado: false })) };
  }

  const semanas = Math.max(0, (hoje.getTime() - paraData(inicio).getTime()) / DIA_MS / 7);
  const aulasPrevistasHoje = Math.min(totalAulas, Math.floor(ritmoPrevistoPorSemana * semanas));

  const quantidade = Math.max(blocosDoLivro, montados.length);
  const blocos: BlocoCalculado[] = Array.from({ length: quantidade }, (_, i) => {
    const doBloco = montados[i];
    const previstas = Math.min(aulasPorBloco, Math.max(0, aulasPrevistasHoje - i * aulasPorBloco));
    const dadas = Math.min(doBloco?.dadas ?? 0, aulasPorBloco);
    const atraso = Math.max(0, previstas - dadas);
    const situacao: SituacaoBloco = dadas >= aulasPorBloco ? "concluido" : atraso > 0 ? "atrasado" : dadas > 0 || previstas > 0 ? "em_dia" : "a_iniciar";
    return { nome: doBloco?.nome ?? `Bloco ${i + 1}`, aulasPrevistas: previstas, aulasDadas: dadas, atrasoAulas: atraso, situacao, naoMontado: !doBloco };
  }).filter((b) => !b.naoMontado || b.aulasPrevistas > 0);

  const fimPrevisto = somarMeses(inicio, mesesPorLivro);
  const ritmoRealPorSemana = aulasDadas > 0 && semanas > 0 ? aulasDadas / semanas : null;
  let fimProjetado: string | null = null;
  if (aulasDadas >= totalAulas) fimProjetado = paraIso(hoje);
  else if (ritmoRealPorSemana) fimProjetado = paraIso(new Date(hoje.getTime() + ((totalAulas - aulasDadas) / ritmoRealPorSemana) * 7 * DIA_MS));
  const diasDeAtraso = fimProjetado ? Math.round((paraData(fimProjetado).getTime() - paraData(fimPrevisto).getTime()) / DIA_MS) : null;

  return { ...base, semInicio: false, aulasPrevistasHoje, atrasoAulas: Math.max(0, aulasPrevistasHoje - aulasDadas), ritmoRealPorSemana, fimPrevisto, fimProjetado, diasDeAtraso, blocos };
}
