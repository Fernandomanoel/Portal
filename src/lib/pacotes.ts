/**
 * Analisador de pacotes: lê a planilha de agendamentos e diz, por aluno, se as
 * aulas realizadas no mês estão atrasadas, em dia ou adiantadas em relação ao
 * previsto até hoje. As regras (grupos de dias, feriados, tolerância de 1 aula)
 * são as do sistema de gestão de onde a ferramenta veio.
 */
import { comCabecalho, inteiroDaCelula, semAcento, type Tabela } from "./lerPlanilha";

export type DiaAula = "SEGUNDA" | "TERCA" | "QUARTA" | "QUINTA" | "SABADO";
export type GrupoId = "seg_qua" | "ter_qui" | "sabado";
export type StatusPacote = "Atrasado" | "Em dia" | "Adiantado";

export const GRUPOS: { id: GrupoId; titulo: string; dias: DiaAula[] }[] = [
  { id: "seg_qua", titulo: "Segunda / Quarta", dias: ["SEGUNDA", "QUARTA"] },
  { id: "ter_qui", titulo: "Terça / Quinta", dias: ["TERCA", "QUINTA"] },
  { id: "sabado", titulo: "Sábado", dias: ["SABADO"] },
];

const DIA_DA_SEMANA: Record<DiaAula, number> = { SEGUNDA: 1, TERCA: 2, QUARTA: 3, QUINTA: 4, SABADO: 6 };

const DIAS_CANONICOS: Record<string, DiaAula> = {
  segunda: "SEGUNDA",
  "segunda-feira": "SEGUNDA",
  "segunda feira": "SEGUNDA",
  terca: "TERCA",
  "terca-feira": "TERCA",
  "terca feira": "TERCA",
  quarta: "QUARTA",
  "quarta-feira": "QUARTA",
  "quarta feira": "QUARTA",
  quinta: "QUINTA",
  "quinta-feira": "QUINTA",
  "quinta feira": "QUINTA",
  sabado: "SABADO",
};

// Nacionais obrigatórios; Carnaval e Corpus Christi ficam de fora de propósito, como no sistema de origem.
const FERIADOS_FIXOS: [number, number, string][] = [
  [1, 1, "Confraternização Universal"],
  [4, 21, "Tiradentes"],
  [5, 1, "Dia do Trabalho"],
  [9, 7, "Independência do Brasil"],
  [10, 12, "Nossa Senhora Aparecida"],
  [11, 2, "Finados"],
  [11, 15, "Proclamação da República"],
  [11, 20, "Consciência Negra"],
  [12, 25, "Natal"],
  // Dia em que a unidade não opera, além dos nacionais.
  [9, 5, "Feriado regional"],
];

/** Só a aritmética do calendário: sem fuso, uma data é ano, mês (1-12) e dia. */
interface Dia {
  ano: number;
  mes: number;
  dia: number;
}

function pascoa(ano: number): Dia {
  const a = ano % 19;
  const b = Math.floor(ano / 100);
  const c = ano % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  return { ano, mes: Math.floor((h + l - 7 * m + 114) / 31), dia: ((h + l - 7 * m + 114) % 31) + 1 };
}

export function feriadosSemAula(ano: number): { data: string; nome: string; mes: number; dia: number }[] {
  const p = pascoa(ano);
  const sexta = new Date(Date.UTC(ano, p.mes - 1, p.dia - 2));
  const itens = [...FERIADOS_FIXOS.map(([mes, dia, nome]) => ({ mes, dia, nome })), { mes: sexta.getUTCMonth() + 1, dia: sexta.getUTCDate(), nome: "Sexta-feira Santa" }];
  return itens
    .sort((x, y) => x.mes - y.mes || x.dia - y.dia)
    .map((f) => ({ ...f, data: `${ano}-${String(f.mes).padStart(2, "0")}-${String(f.dia).padStart(2, "0")}` }));
}

/** Hoje em Manaus/São Paulo não importa aqui: a escola e quem usa estão no mesmo dia do navegador. */
export function hojeLocal(): Dia {
  const agora = new Date();
  return { ano: agora.getFullYear(), mes: agora.getMonth() + 1, dia: agora.getDate() };
}

export interface LinhaPacote {
  nome: string;
  educador: string;
  diasAgendamento: string;
  horasAgendamento: string;
  qtdRealizada: number;
  qtdAgendamento: number | null;
  qtdAulaExtra: number;
  diasNormalizados: DiaAula[];
  diasDesconhecidos: string[];
}

export interface AlunoPacote extends LinhaPacote {
  aulasPorDia: number | null;
  totalPrevistoMes: number | null;
  previstoAteHoje: number | null;
  status: StatusPacote | null;
  /** Previsto até hoje menos o realizado: positivo é déficit. */
  diferenca: number | null;
  aviso: string | null;
}

export interface RelatorioPacotes {
  ano: number;
  mes: number;
  diaAtual: number;
  diasTotaisMes: number;
  feriadosAplicados: { data: string; nome: string }[];
  grupos: Record<GrupoId, AlunoPacote[]>;
  naoAgrupados: AlunoPacote[];
  avisos: { nome: string; educador: string; motivo: string }[];
  totalAlunos: number;
}

const COLUNAS_OBRIGATORIAS = ["Educador", "Aluno", "Qtd Aula Realizada", "Qtd Agendamento", "Dias Agendamento"] as const;

export function normalizarDias(texto: string): { conhecidos: DiaAula[]; desconhecidos: string[] } {
  const conhecidos: DiaAula[] = [];
  const desconhecidos: string[] = [];
  for (const bruto of texto.split(",")) {
    const pedaco = bruto.trim();
    if (!pedaco) continue;
    const canonico = DIAS_CANONICOS[semAcento(pedaco)];
    if (!canonico) desconhecidos.push(pedaco);
    else if (!conhecidos.includes(canonico)) conhecidos.push(canonico);
  }
  return { conhecidos, desconhecidos };
}

export function lerPlanilhaDePacotes(tabela: Tabela): LinhaPacote[] {
  const { coluna, linhas, celula } = comCabecalho(tabela);
  const indices = Object.fromEntries(COLUNAS_OBRIGATORIAS.map((nome) => [nome, coluna([nome])])) as Record<(typeof COLUNAS_OBRIGATORIAS)[number], number>;
  const faltando = COLUNAS_OBRIGATORIAS.filter((nome) => indices[nome] < 0);
  if (faltando.length) throw new Error(`Planilha inválida: faltam as colunas ${faltando.map((c) => `"${c}"`).join(", ")}.`);
  const extra = coluna(["Qtd Aula Extra"]);
  const horas = coluna(["Horas Agendamento"]);

  const saida: LinhaPacote[] = [];
  for (const linha of linhas) {
    const nome = celula(linha, indices.Aluno);
    if (!nome) continue;
    const diasAgendamento = celula(linha, indices["Dias Agendamento"]);
    const { conhecidos, desconhecidos } = normalizarDias(diasAgendamento);
    const qtdBruta = celula(linha, indices["Qtd Agendamento"]);
    const qtd = Number(qtdBruta.replace(",", "."));
    saida.push({
      nome,
      educador: celula(linha, indices.Educador),
      diasAgendamento,
      horasAgendamento: celula(linha, horas),
      qtdRealizada: inteiroDaCelula(celula(linha, indices["Qtd Aula Realizada"])),
      qtdAgendamento: qtdBruta !== "" && Number.isFinite(qtd) ? Math.trunc(qtd) : null,
      qtdAulaExtra: inteiroDaCelula(celula(linha, extra)),
      diasNormalizados: conhecidos,
      diasDesconhecidos: desconhecidos,
    });
  }
  if (!saida.length) throw new Error("Nenhuma linha com aluno preenchido foi encontrada na planilha.");
  return saida;
}

export function classificarGrupo(dias: DiaAula[]): GrupoId | null {
  if (!dias.length) return null;
  return GRUPOS.find((g) => dias.every((d) => g.dias.includes(d)))?.id ?? null;
}

const TOLERANCIA_DEFICIT_EM_DIA = 1;

function situacao(realizada: number, previsto: number): { status: StatusPacote; diferenca: number } {
  const diferenca = previsto - realizada;
  if (diferenca > TOLERANCIA_DEFICIT_EM_DIA) return { status: "Atrasado", diferenca };
  return { status: diferenca >= 0 ? "Em dia" : "Adiantado", diferenca };
}

export function calcularRelatorio(linhas: LinhaPacote[], hoje: Dia = hojeLocal()): RelatorioPacotes {
  const { ano, mes, dia: diaAtual } = hoje;
  const diasTotaisMes = new Date(Date.UTC(ano, mes, 0)).getUTCDate();
  const feriadosMes = feriadosSemAula(ano).filter((f) => f.mes === mes);
  const diasDeFeriado = new Set(feriadosMes.map((f) => f.dia));
  const ocorrencias = (diaDaSemana: number) => {
    let total = 0;
    for (let d = 1; d <= diasTotaisMes; d += 1) {
      if (new Date(Date.UTC(ano, mes - 1, d)).getUTCDay() === diaDaSemana && !diasDeFeriado.has(d)) total += 1;
    }
    return total;
  };

  const relatorio: RelatorioPacotes = {
    ano,
    mes,
    diaAtual,
    diasTotaisMes,
    feriadosAplicados: feriadosMes.map(({ data, nome }) => ({ data, nome })),
    grupos: { seg_qua: [], ter_qui: [], sabado: [] },
    naoAgrupados: [],
    avisos: [],
    totalAlunos: linhas.length,
  };

  for (const linha of linhas) {
    const grupo = linha.diasDesconhecidos.length ? null : classificarGrupo(linha.diasNormalizados);
    const avisos: string[] = [];
    if (linha.diasDesconhecidos.length) avisos.push(`Dia(s) de agendamento não reconhecido(s): ${linha.diasDesconhecidos.join(", ")}`);
    else if (!linha.diasNormalizados.length) avisos.push("Dias de agendamento vazios ou inválidos.");
    else if (grupo === null) avisos.push(`Combinação de dias fora dos grupos Seg/Qua, Ter/Qui ou Sábado: ${linha.diasAgendamento}`);

    const qtd = linha.qtdAgendamento;
    const numDias = linha.diasNormalizados.length;
    if (qtd === null) avisos.push("Qtd Agendamento ausente ou inválida.");
    else if (numDias > 0 && qtd % numDias !== 0) avisos.push(`Qtd Agendamento (${qtd}) não é divisível pelo número de dias (${numDias}).`);

    const aluno: AlunoPacote = { ...linha, aulasPorDia: null, totalPrevistoMes: null, previstoAteHoje: null, status: null, diferenca: null, aviso: avisos.length ? avisos.join("; ") : null };

    if (qtd !== null && numDias > 0 && qtd >= 0 && qtd % numDias === 0 && grupo !== null) {
      const aulasPorDia = qtd / numDias;
      const totalPrevisto = linha.diasNormalizados.reduce((soma, d) => soma + aulasPorDia * ocorrencias(DIA_DA_SEMANA[d]), 0);
      const previstoHoje = Math.floor(totalPrevisto * (diaAtual / diasTotaisMes));
      Object.assign(aluno, { aulasPorDia, totalPrevistoMes: totalPrevisto, previstoAteHoje: previstoHoje, ...situacao(linha.qtdRealizada, previstoHoje) });
    }

    if (aluno.aviso) relatorio.avisos.push({ nome: linha.nome, educador: linha.educador, motivo: aluno.aviso });
    if (grupo === null) relatorio.naoAgrupados.push(aluno);
    else relatorio.grupos[grupo].push(aluno);
  }
  return relatorio;
}

export function rotuloDoStatus(aluno: AlunoPacote): string {
  if (!aluno.status) return aluno.aviso ? "Sem cálculo" : "—";
  if (aluno.status === "Atrasado") return `Atrasado · déficit ${aluno.diferenca}`;
  if (aluno.status === "Adiantado") return `Adiantado · ${Math.abs(aluno.diferenca ?? 0)}`;
  return "Em dia";
}
