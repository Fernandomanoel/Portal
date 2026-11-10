// Compara as aulas previstas até hoje com as realizadas, a partir da planilha de agendamentos.
// Sem imports de propósito, para o Node conseguir rodar scripts/verificar-analisador.mjs direto neste arquivo.

type Celula = string | number | null;

export class ErroPacotes extends Error {}

export type Dia = "SEGUNDA" | "TERCA" | "QUARTA" | "QUINTA" | "SABADO";
export type Grupo = "seg_qua" | "ter_qui" | "sabado";
export type StatusPacote = "Atrasado" | "Em dia" | "Adiantado";

export const ROTULOS_GRUPO: Record<Grupo, string> = { seg_qua: "Seg/Qua", ter_qui: "Ter/Qui", sabado: "Sábado" };

export interface LinhaPacote {
  nome: string;
  educador: string | null;
  diasAgendamento: string | null;
  qtdRealizada: number;
  qtdAgendamento: number | null;
  dias: Dia[];
  diasDesconhecidos: string[];
}

export interface AlunoPacote {
  nome: string;
  educador: string | null;
  diasAgendamento: string | null;
  qtdRealizada: number;
  totalPrevistoMes: number | null;
  previstoAteHoje: number | null;
  status: StatusPacote | null;
  diferenca: number | null;
  aviso: string | null;
}

export interface RelatorioPacotes {
  ano: number;
  mes: number;
  diaAtual: number;
  feriados: { data: string; nome: string }[];
  grupos: Record<Grupo, AlunoPacote[]>;
  naoAgrupados: AlunoPacote[];
  avisos: { nome: string; educador: string | null; motivo: string }[];
  totalAlunos: number;
}

const OBRIGATORIAS = ["Educador", "Aluno", "Qtd Aula Realizada", "Qtd Agendamento", "Dias Agendamento"] as const;

const DIAS: Record<string, Dia> = {
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

// getUTCDay(): domingo = 0.
const DIA_DA_SEMANA: Record<Dia, number> = { SEGUNDA: 1, TERCA: 2, QUARTA: 3, QUINTA: 4, SABADO: 6 };

const GRUPOS: [Grupo, Dia[]][] = [
  ["seg_qua", ["SEGUNDA", "QUARTA"]],
  ["ter_qui", ["TERCA", "QUINTA"]],
  ["sabado", ["SABADO"]],
];

// Nacionais obrigatórios. Carnaval e Corpus Christi ficam de fora de propósito; 5/9 é o feriado regional da unidade.
const FERIADOS_FIXOS: [number, number, string][] = [
  [1, 1, "Confraternização Universal"],
  [4, 21, "Tiradentes"],
  [5, 1, "Dia do Trabalho"],
  [9, 5, "Feriado regional"],
  [9, 7, "Independência do Brasil"],
  [10, 12, "Nossa Senhora Aparecida"],
  [11, 2, "Finados"],
  [11, 15, "Proclamação da República"],
  [11, 20, "Consciência Negra"],
  [12, 25, "Natal"],
];

const TOLERANCIA_EM_DIA = 1;

function semAcento(texto: string): string {
  return texto.normalize("NFD").replace(/\p{Mn}/gu, "").replace(/\s+/g, " ").trim().toLowerCase();
}

function texto(valor: Celula | undefined): string | null {
  if (valor === null || valor === undefined) return null;
  const limpo = String(valor).trim();
  return limpo && limpo.toLowerCase() !== "nan" ? limpo : null;
}

function inteiro(valor: Celula | undefined): number | null {
  const limpo = texto(valor);
  if (limpo === null) return null;
  const numero = Number(limpo.replace(",", "."));
  return Number.isFinite(numero) ? Math.trunc(numero) : null;
}

export function normalizarDias(bruto: string | null): { dias: Dia[]; desconhecidos: string[] } {
  const dias: Dia[] = [];
  const desconhecidos: string[] = [];
  for (const pedaco of (bruto ?? "").split(",").map((p) => p.trim()).filter(Boolean)) {
    const dia = DIAS[semAcento(pedaco)];
    if (!dia) desconhecidos.push(pedaco);
    else if (!dias.includes(dia)) dias.push(dia);
  }
  return { dias, desconhecidos };
}

export function lerLinhasPacotes(matriz: Celula[][]): LinhaPacote[] {
  const cabecalho = (matriz[0] ?? []).map((c) => String(c ?? "").replace("﻿", "").trim().toLowerCase());
  const coluna = (nome: string) => cabecalho.indexOf(nome.toLowerCase());
  const faltando = OBRIGATORIAS.filter((nome) => coluna(nome) < 0);
  if (faltando.length > 0) {
    throw new ErroPacotes(`Planilha inválida: faltam as colunas ${faltando.map((c) => `"${c}"`).join(", ")}.`);
  }

  const linhas: LinhaPacote[] = [];
  for (const linha of matriz.slice(1)) {
    const nome = texto(linha[coluna("Aluno")]);
    if (!nome) continue;
    const diasAgendamento = texto(linha[coluna("Dias Agendamento")]);
    const { dias, desconhecidos } = normalizarDias(diasAgendamento);
    linhas.push({
      nome,
      educador: texto(linha[coluna("Educador")]),
      diasAgendamento,
      qtdRealizada: inteiro(linha[coluna("Qtd Aula Realizada")]) ?? 0,
      qtdAgendamento: inteiro(linha[coluna("Qtd Agendamento")]),
      dias,
      diasDesconhecidos: desconhecidos,
    });
  }
  if (linhas.length === 0) throw new ErroPacotes("Nenhuma linha com aluno preenchido foi encontrada na planilha.");
  return linhas;
}

function pascoa(ano: number): Date {
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
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(ano, mes - 1, dia));
}

function iso(data: Date): string {
  return data.toISOString().slice(0, 10);
}

export function feriadosSemAula(ano: number): { data: string; nome: string }[] {
  const sextaSanta = pascoa(ano);
  sextaSanta.setUTCDate(sextaSanta.getUTCDate() - 2);
  return [
    ...FERIADOS_FIXOS.map(([mes, dia, nome]) => ({ data: iso(new Date(Date.UTC(ano, mes - 1, dia))), nome })),
    { data: iso(sextaSanta), nome: "Sexta-feira Santa" },
  ].sort((x, y) => x.data.localeCompare(y.data));
}

export function classificarGrupo(dias: Dia[]): Grupo | null {
  if (dias.length === 0) return null;
  return GRUPOS.find(([, permitidos]) => dias.every((dia) => permitidos.includes(dia)))?.[0] ?? null;
}

export function statusDoPacote(realizada: number, previsto: number): { status: StatusPacote; diferenca: number } {
  const diferenca = previsto - realizada;
  if (diferenca > TOLERANCIA_EM_DIA) return { status: "Atrasado", diferenca };
  return { status: diferenca >= 0 ? "Em dia" : "Adiantado", diferenca };
}

/** A data de hoje em São Paulo, onde a escola fica, mesmo que o computador esteja em outro fuso. */
export function hojeEmSaoPaulo(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date());
}

export function calcularPacotes(linhas: LinhaPacote[], hoje: string = hojeEmSaoPaulo()): RelatorioPacotes {
  const [ano, mes, diaAtual] = hoje.split("-").map(Number);
  const diasNoMes = new Date(Date.UTC(ano, mes, 0)).getUTCDate();
  const feriados = feriadosSemAula(ano).filter((f) => Number(f.data.slice(5, 7)) === mes);
  const semAula = new Set(feriados.map((f) => f.data));

  const ocorrencias = (diaDaSemana: number) => {
    let total = 0;
    for (let dia = 1; dia <= diasNoMes; dia++) {
      const data = new Date(Date.UTC(ano, mes - 1, dia));
      if (data.getUTCDay() === diaDaSemana && !semAula.has(iso(data))) total++;
    }
    return total;
  };

  const relatorio: RelatorioPacotes = {
    ano,
    mes,
    diaAtual,
    feriados,
    grupos: { seg_qua: [], ter_qui: [], sabado: [] },
    naoAgrupados: [],
    avisos: [],
    totalAlunos: linhas.length,
  };

  for (const linha of linhas) {
    const temDesconhecido = linha.diasDesconhecidos.length > 0;
    const grupo = temDesconhecido ? null : classificarGrupo(linha.dias);
    const qtd = linha.qtdAgendamento;
    const numDias = linha.dias.length;

    const avisos: string[] = [];
    if (temDesconhecido) avisos.push(`Dia(s) de agendamento não reconhecido(s): ${linha.diasDesconhecidos.join(", ")}`);
    if (numDias === 0) avisos.push("Dias de agendamento vazios ou inválidos.");
    else if (grupo === null && !temDesconhecido) avisos.push(`Combinação de dias fora dos grupos Seg/Qua, Ter/Qui ou Sábado: ${linha.diasAgendamento ?? ""}`);
    if (qtd === null) avisos.push("Qtd Agendamento ausente ou inválida.");
    else if (numDias > 0 && qtd % numDias !== 0) avisos.push(`Qtd Agendamento (${qtd}) não é divisível pelo número de dias (${numDias}).`);

    const aluno: AlunoPacote = {
      nome: linha.nome,
      educador: linha.educador,
      diasAgendamento: linha.diasAgendamento,
      qtdRealizada: linha.qtdRealizada,
      totalPrevistoMes: null,
      previstoAteHoje: null,
      status: null,
      diferenca: null,
      aviso: avisos.length > 0 ? avisos.join("; ") : null,
    };

    if (grupo !== null && qtd !== null && qtd >= 0 && qtd % numDias === 0) {
      const aulasPorDia = qtd / numDias;
      const totalPrevisto = linha.dias.reduce((soma, dia) => soma + aulasPorDia * ocorrencias(DIA_DA_SEMANA[dia]), 0);
      const previsto = Math.floor(totalPrevisto * (diaAtual / diasNoMes));
      aluno.totalPrevistoMes = totalPrevisto;
      aluno.previstoAteHoje = previsto;
      Object.assign(aluno, statusDoPacote(linha.qtdRealizada, previsto));
    }

    if (aluno.aviso) relatorio.avisos.push({ nome: linha.nome, educador: linha.educador, motivo: aluno.aviso });
    if (grupo === null) relatorio.naoAgrupados.push(aluno);
    else relatorio.grupos[grupo].push(aluno);
  }

  return relatorio;
}
