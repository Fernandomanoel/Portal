import { dataBR, decimal, inteiro, sortear, sorteio } from "./dadosFicticios";

/**
 * Dados da folha de pagamento fictícia (setembro/2025) das atividades de planilha do Departamento
 * Pessoal: o cadastro de 40 funcionários e as ocorrências do mês, com os problemas que aparecem de
 * verdade (matrícula digitada errada, ocorrência lançada duas vezes, falta com atestado, hora extra
 * acima do limite diário).
 *
 * Tabelas de INSS e IRRF: as vigentes em setembro de 2025 (INSS de janeiro/2025; IRRF a partir de
 * maio/2025, com o desconto simplificado de R$ 607,20). São as da competência do treino; na empresa,
 * confira sempre a tabela do mês.
 */

export const COMPETENCIA = "setembro/2025";
export const DIAS_UTEIS = 26; // segunda a sábado de setembro/2025
export const DOMINGOS_FERIADOS = 4; // 7, 14, 21 e 28 (o 7 de setembro caiu num domingo)
export const DIVISOR_HORAS = 220;
export const LIMITE_HE_DIA = 2;
export const DEDUCAO_DEPENDENTE = 189.59;
export const DESCONTO_SIMPLIFICADO = 607.2;
export const FGTS = 8;
export const VT_PERCENTUAL = 6;

export const FAIXAS_INSS = [
  { ate: 1518, aliquota: 7.5 },
  { ate: 2793.88, aliquota: 9 },
  { ate: 4190.83, aliquota: 12 },
  { ate: 8157.41, aliquota: 14 },
];

export const FAIXAS_IRRF = [
  { de: 0, aliquota: 0, deducao: 0 },
  { de: 2428.81, aliquota: 7.5, deducao: 182.16 },
  { de: 2826.66, aliquota: 15, deducao: 394.16 },
  { de: 3751.06, aliquota: 22.5, deducao: 675.49 },
  { de: 4664.69, aliquota: 27.5, deducao: 908.73 },
];

const arred = (v: number) => Math.round(v * 100) / 100;

export function inss(base: number) {
  let total = 0;
  let anterior = 0;
  for (const f of FAIXAS_INSS) {
    total += Math.max(0, Math.min(base, f.ate) - anterior) * (f.aliquota / 100);
    anterior = f.ate;
  }
  return arred(total);
}

export function irrf(baseIr: number) {
  const faixa = [...FAIXAS_IRRF].reverse().find((f) => baseIr >= f.de)!;
  return arred(Math.max(0, (baseIr * faixa.aliquota) / 100 - faixa.deducao));
}

const NOMES = [
  "Ana Paula Souza", "Bruno Carvalho", "Camila Ferreira", "Diego Martins", "Eduarda Lima", "Felipe Rocha", "Gabriela Nunes", "Henrique Alves",
  "Isabela Ribeiro", "João Victor Santos", "Karina Duarte", "Leonardo Pires", "Mariana Costa", "Nathalia Gomes", "Otavio Barros", "Patrícia Mendes",
  "Rafael Teixeira", "Sabrina Moura", "Thiago Araújo", "Vanessa Freitas", "William Cardoso", "Yasmin Correia", "André Lopes", "Beatriz Pinto",
  "Carlos Eduardo Dias", "Daniela Ramos", "Everton Silva", "Fernanda Batista", "Gustavo Melo", "Helena Castro", "Igor Monteiro", "Juliana Rezende",
  "Kleber Andrade", "Larissa Vieira", "Marcos Antônio Reis", "Natália Farias", "Paulo Sérgio Cunha", "Renata Oliveira", "Sérgio Machado", "Tatiane Campos",
];

const CARGOS: [cargo: string, setor: string, vagas: number, minimo: number, maximo: number][] = [
  ["Auxiliar administrativo", "Administrativo", 5, 1518, 2100],
  ["Assistente administrativo", "Administrativo", 4, 2200, 3200],
  ["Recepcionista", "Administrativo", 2, 1518, 1900],
  ["Analista de DP", "Administrativo", 2, 3800, 4900],
  ["Assistente financeiro", "Financeiro", 3, 2500, 3400],
  ["Analista financeiro", "Financeiro", 3, 4300, 6400],
  ["Vendedor interno", "Comercial", 6, 1800, 2700],
  ["Gerente comercial", "Comercial", 1, 9800, 12500],
  ["Motorista", "Logística", 4, 2400, 3100],
  ["Conferente", "Logística", 5, 1900, 2500],
  ["Almoxarife", "Logística", 3, 2300, 3000],
  ["Supervisor de logística", "Logística", 2, 5200, 7400],
];

export interface Funcionario {
  matricula: string;
  nome: string;
  cargo: string;
  setor: string;
  admissao: string;
  salario: number;
  dependentes: number;
  valeTransporte: number; // custo mensal das passagens; 0 = não optou
}

const rf = sorteio(8101);
const vagas = CARGOS.flatMap(([cargo, setor, n, minimo, maximo]) => Array.from({ length: n }, () => ({ cargo, setor, minimo, maximo })))
  .map((v) => ({ v, k: rf() }))
  .sort((a, b) => a.k - b.k)
  .map(({ v }) => v);

export const FUNCIONARIOS: Funcionario[] = NOMES.map((nome, i) => {
  const v = vagas[i];
  return {
    matricula: `F-${101 + i}`,
    nome,
    cargo: v.cargo,
    setor: v.setor,
    admissao: dataBR(inteiro(rf, 1, 28), inteiro(rf, 1, 12), inteiro(rf, 2014, 2024)),
    salario: v.minimo === 1518 && rf() < 0.4 ? 1518 : Math.round(decimal(rf, v.minimo, v.maximo) / 10) * 10,
    dependentes: sortear(rf, [0, 0, 0, 1, 1, 2, 3] as const),
    valeTransporte: rf() < 0.25 ? 0 : Math.round(decimal(rf, 176, 440) * 10) / 10,
  };
});

export const porMatricula = (m: string) => FUNCIONARIOS.find((f) => f.matricula === m);

export type TipoOcorrencia = "HE 50%" | "HE 100%" | "Falta" | "Atraso" | "Adiantamento";
export const TIPOS_OCORRENCIA: TipoOcorrencia[] = ["HE 50%", "HE 100%", "Falta", "Atraso", "Adiantamento"];

export interface Ocorrencia {
  data: string;
  matricula: string;
  tipo: TipoOcorrencia;
  quantidade: number; // horas (decimal), dias ou reais, conforme o tipo
  obs: string;
}

const DOMINGOS = [7, 14, 21, 28];
const UTEIS = Array.from({ length: 30 }, (_, i) => i + 1).filter((d) => !DOMINGOS.includes(d));
const diaDe = (o: Ocorrencia) => Number(o.data.slice(0, 2));

const ro = sorteio(8202);
const comHoraExtra = FUNCIONARIOS.filter((f) => f.cargo !== "Gerente comercial"); // cargo de gestão (art. 62 da CLT) não recebe hora extra
const base: Ocorrencia[] = [];
const chaves = new Set<string>();
function incluir(o: Ocorrencia) {
  const chave = `${o.data}|${o.matricula}|${o.tipo}`;
  if (chaves.has(chave)) return;
  chaves.add(chave);
  base.push(o);
}
while (base.filter((o) => o.tipo === "HE 50%").length < 34)
  incluir({ data: dataBR(sortear(ro, UTEIS), 9), matricula: sortear(ro, comHoraExtra).matricula, tipo: "HE 50%", quantidade: sortear(ro, [0.5, 1, 1, 1.5, 1.5, 2, 2, 2.5, 3] as const), obs: "Cartão de ponto" });
while (base.filter((o) => o.tipo === "HE 100%").length < 8)
  incluir({ data: dataBR(sortear(ro, DOMINGOS), 9), matricula: sortear(ro, comHoraExtra).matricula, tipo: "HE 100%", quantidade: sortear(ro, [4, 6, 8] as const), obs: "Trabalho no domingo — cartão de ponto" });
while (base.filter((o) => o.tipo === "Falta").length < 11) {
  const atestado = base.filter((o) => o.tipo === "Falta").length >= 8;
  incluir({ data: dataBR(sortear(ro, UTEIS), 9), matricula: sortear(ro, FUNCIONARIOS).matricula, tipo: "Falta", quantidade: 1, obs: atestado ? "Atestado médico entregue ao RH" : "Sem justificativa" });
}
while (base.filter((o) => o.tipo === "Atraso").length < 12)
  incluir({ data: dataBR(sortear(ro, UTEIS), 9), matricula: sortear(ro, FUNCIONARIOS).matricula, tipo: "Atraso", quantidade: sortear(ro, [0.25, 0.5, 0.5, 1, 1.5] as const), obs: "Cartão de ponto" });
while (base.filter((o) => o.tipo === "Adiantamento").length < 12) {
  const f = sortear(ro, FUNCIONARIOS);
  incluir({ data: dataBR(15, 9), matricula: f.matricula, tipo: "Adiantamento", quantidade: arred(f.salario * 0.4), obs: "Vale de 40% pedido pelo funcionário" });
}

// Erros do dia a dia injetados de propósito: letra «O» no lugar do zero, matrícula de quem já saiu, espaço no lugar do hífen, ocorrência repetida.
const invalidas: Ocorrencia[] = [
  { data: dataBR(4, 9), matricula: "F-1O7", tipo: "HE 50%", quantidade: 1.5, obs: "Cartão de ponto" },
  { data: dataBR(12, 9), matricula: "F-152", tipo: "Falta", quantidade: 1, obs: "Sem justificativa" },
  { data: dataBR(23, 9), matricula: "F 118", tipo: "Atraso", quantidade: 0.5, obs: "Cartão de ponto" },
];
const duplicadas = [base.findIndex((o) => o.tipo === "HE 50%" && o.quantidade <= 2), base.findIndex((o) => o.tipo === "Falta"), base.findIndex((o) => o.tipo === "Atraso")].map((i) => ({ ...base[i] }));

export const OCORRENCIAS: Ocorrencia[] = [...base, ...invalidas, ...duplicadas]
  .map((o, i) => ({ o, i }))
  .sort((a, b) => diaDe(a.o) - diaDe(b.o) || a.i - b.i)
  .map(({ o }) => o);

export type SituacaoOcorrencia = "OK" | "MATRÍCULA INVÁLIDA" | "DUPLICADA" | "ABONADA";

export interface OcorrenciaProcessada extends Ocorrencia {
  situacao: SituacaoOcorrencia;
  acimaDoLimite: boolean;
}

export interface LinhaFolha {
  funcionario: Funcionario;
  he50: number; // horas
  he100: number;
  faltas: number; // dias
  atrasos: number; // horas
  adiantamento: number;
  valorHoraExtra: number;
  dsr: number;
  descontoFaltas: number;
  bruto: number;
  inss: number;
  deducaoIr: number;
  baseIr: number;
  irrf: number;
  vt: number;
  liquido: number;
  fgts: number;
}

/** Folha de um funcionário, com as regras da empresa (briefing das atividades). */
export function calcularFolha(f: Funcionario, he50 = 0, he100 = 0, faltas = 0, atrasos = 0, adiantamento = 0): LinhaFolha {
  const hora = f.salario / DIVISOR_HORAS;
  const valorHoraExtra = he50 * hora * 1.5 + he100 * hora * 2;
  const dsr = (valorHoraExtra * DOMINGOS_FERIADOS) / DIAS_UTEIS;
  const descontoFaltas = (faltas * f.salario) / 30 + atrasos * hora;
  const bruto = f.salario + valorHoraExtra + dsr - descontoFaltas;
  const vInss = inss(bruto);
  const deducaoIr = Math.max(vInss + f.dependentes * DEDUCAO_DEPENDENTE, DESCONTO_SIMPLIFICADO);
  const baseIr = Math.max(0, bruto - deducaoIr);
  const vIrrf = irrf(baseIr);
  const vt = f.valeTransporte > 0 ? arred(Math.min((f.salario * VT_PERCENTUAL) / 100, f.valeTransporte)) : 0;
  return {
    funcionario: f, he50, he100, faltas, atrasos, adiantamento, valorHoraExtra, dsr, descontoFaltas, bruto,
    inss: vInss, deducaoIr, baseIr, irrf: vIrrf, vt,
    liquido: bruto - vInss - vIrrf - vt - adiantamento,
    fgts: arred((bruto * FGTS) / 100),
  };
}

export function processarOcorrencias(ocorrencias: Ocorrencia[]) {
  const vistos = new Set<string>();
  const processadas: OcorrenciaProcessada[] = ocorrencias.map((o) => {
    const chave = `${o.data}|${o.matricula}|${o.tipo}`;
    let situacao: SituacaoOcorrencia = "OK";
    if (!porMatricula(o.matricula)) situacao = "MATRÍCULA INVÁLIDA";
    else if (vistos.has(chave)) situacao = "DUPLICADA";
    else {
      vistos.add(chave);
      if (o.tipo === "Falta" && /atestado/i.test(o.obs)) situacao = "ABONADA";
    }
    return { ...o, situacao, acimaDoLimite: situacao === "OK" && o.tipo === "HE 50%" && o.quantidade > LIMITE_HE_DIA };
  });
  const ok = processadas.filter((o) => o.situacao === "OK");
  const soma = (m: string, t: TipoOcorrencia) => ok.filter((o) => o.matricula === m && o.tipo === t).reduce((s, o) => s + o.quantidade, 0);
  const folha = FUNCIONARIOS.map((f) =>
    calcularFolha(f, soma(f.matricula, "HE 50%"), soma(f.matricula, "HE 100%"), soma(f.matricula, "Falta"), soma(f.matricula, "Atraso"), soma(f.matricula, "Adiantamento")),
  );
  return { processadas, folha };
}

export const FOLHA_BASE = FUNCIONARIOS.map((f) => calcularFolha(f));
export const FOLHA_SETEMBRO = processarOcorrencias(OCORRENCIAS);
