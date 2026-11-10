/**
 * Acompanhamento de módulos: compara as parcelas pagas com o módulo em que o aluno
 * está e com as faltas, e diz se ele está regular, em atenção ou pendente. É uma
 * calculadora: nada é guardado. As contas são as do sistema de gestão de origem.
 */

export const CONFIG_PADRAO = { aulasPorSemana: 2, aulasPorModulo: 16, mensalidadesPorModulo: 2, valorReposicao: 20 } as const;

export type Situacao = "REGULAR" | "ATENÇÃO" | "PENDENTE";

export interface EntradaAcompanhamento {
  nome: string;
  parcelasPagas: number;
  moduloAtual: number;
  totalModulos: number;
  faltas: number;
  aulasPorSemana: number;
  aulasPorModulo: number;
  mensalidadesPorModulo: number;
  valorReposicao: number;
}

export interface ResultadoAcompanhamento extends EntradaAcompanhamento {
  modulosCorrespondentes: number;
  diferencaModulos: number;
  semanasReposicao: number;
  semanasReposicaoCeil: number;
  semanasPorModulo: number;
  semanasPorMensalidade: number;
  mensalidadesAdicionais: number;
  mensalidadesAdicionaisCeil: number;
  valorReposicoes: number;
  situacao: Situacao;
  explicacao: string;
}

export const moeda = (valor: number) => (Number.isFinite(valor) ? valor : 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function numero(valor: number, casas = 1): string {
  if (!Number.isFinite(valor)) return "0";
  return Number.isInteger(valor) ? String(valor) : valor.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: casas });
}

export function calcularAcompanhamento(e: EntradaAcompanhamento): { erros: string[] } | ResultadoAcompanhamento {
  const erros: string[] = [];
  if (e.parcelasPagas < 0) erros.push("Parcelas pagas não podem ser negativas.");
  if (e.moduloAtual < 0) erros.push("Módulo atual não pode ser negativo.");
  if (e.totalModulos < 0) erros.push("Total de módulos não pode ser negativo.");
  if (e.faltas < 0) erros.push("Faltas não podem ser negativas.");
  if (!Number.isFinite(e.aulasPorSemana) || e.aulasPorSemana <= 0) erros.push("Aulas por semana devem ser maiores que zero.");
  if (!Number.isFinite(e.aulasPorModulo) || e.aulasPorModulo <= 0) erros.push("Aulas por módulo devem ser maiores que zero.");
  if (!Number.isFinite(e.mensalidadesPorModulo) || e.mensalidadesPorModulo <= 0) erros.push("Mensalidades por módulo devem ser maiores que zero.");
  if (!Number.isFinite(e.valorReposicao) || e.valorReposicao < 0) erros.push("Valor da reposição não pode ser negativo.");
  if (erros.length) return { erros };

  const modulosCorrespondentes = e.parcelasPagas / e.mensalidadesPorModulo;
  const diferencaModulos = Math.max(0, modulosCorrespondentes - e.moduloAtual);
  const semanasReposicao = e.faltas / e.aulasPorSemana;
  const semanasPorModulo = e.aulasPorModulo / e.aulasPorSemana;
  const semanasPorMensalidade = semanasPorModulo / e.mensalidadesPorModulo;
  const mensalidadesAdicionais = semanasPorMensalidade > 0 ? semanasReposicao / semanasPorMensalidade : 0;

  const atrasadoNosModulos = e.moduloAtual < modulosCorrespondentes;
  const temFaltas = e.faltas > 0;
  const situacao: Situacao = atrasadoNosModulos && temFaltas ? "PENDENTE" : atrasadoNosModulos || temFaltas ? "ATENÇÃO" : "REGULAR";

  const parcial = {
    ...e,
    nome: e.nome.trim(),
    modulosCorrespondentes,
    diferencaModulos,
    semanasReposicao,
    semanasReposicaoCeil: Math.ceil(semanasReposicao),
    semanasPorModulo,
    semanasPorMensalidade,
    mensalidadesAdicionais,
    mensalidadesAdicionaisCeil: Math.ceil(mensalidadesAdicionais),
    valorReposicoes: e.faltas * e.valorReposicao,
    situacao,
  };
  return { ...parcial, explicacao: explicar(parcial) };
}

function explicar(r: Omit<ResultadoAcompanhamento, "explicacao">): string {
  const linhas = [
    `O aluno possui ${numero(r.parcelasPagas)} parcela(s) paga(s).`,
    "",
    `Considerando ${numero(r.mensalidadesPorModulo)} mensalidade(s) por módulo:`,
    `${numero(r.parcelasPagas)} ÷ ${numero(r.mensalidadesPorModulo)} = ${numero(r.modulosCorrespondentes)} módulo(s).`,
    "",
    `O aluno está no módulo ${numero(r.moduloAtual)}.`,
    r.diferencaModulos > 0
      ? `Existe uma diferença de ${numero(r.diferencaModulos)} módulo(s) em relação às parcelas pagas.`
      : "O módulo atual está alinhado (ou adiantado) em relação às parcelas pagas.",
    "",
    `O aluno possui ${numero(r.faltas)} falta(s).`,
  ];
  if (r.faltas > 0) {
    linhas.push(
      "",
      `Considerando ${numero(r.aulasPorSemana)} aula(s) por semana:`,
      `${numero(r.faltas)} ÷ ${numero(r.aulasPorSemana)} = ${numero(r.semanasReposicao)} semana(s) de reposição.`,
      `Arredondando para cima: ${numero(r.semanasReposicaoCeil)} semana(s).`,
      "",
      `Considerando um módulo de ${numero(r.aulasPorModulo)} aula(s):`,
      `${numero(r.aulasPorModulo)} ÷ ${numero(r.aulasPorSemana)} = ${numero(r.semanasPorModulo)} semana(s) por módulo.`,
      "",
      `Como cada módulo corresponde a ${numero(r.mensalidadesPorModulo)} mensalidade(s):`,
      `${numero(r.semanasPorModulo)} ÷ ${numero(r.mensalidadesPorModulo)} = ${numero(r.semanasPorMensalidade)} semana(s) por mensalidade.`,
      "",
      `${numero(r.semanasReposicao)} ÷ ${numero(r.semanasPorMensalidade)} = ${numero(r.mensalidadesAdicionais)} mensalidade(s) adicional(is) estimada(s).`,
      `Arredondando para cima: ${numero(r.mensalidadesAdicionaisCeil)} mensalidade(s).`,
    );
  } else linhas.push("Não há faltas a repor e não há extensão estimada de contrato por faltas.");
  return linhas.join("\n");
}

export function mensagemAoResponsavel(r: ResultadoAcompanhamento): string {
  return [
    `Olá, ${r.nome || "[NOME]"}.`,
    "",
    "Realizamos uma verificação da sua situação acadêmica.",
    "",
    `Atualmente constam ${numero(r.parcelasPagas)} parcela(s) paga(s) e o aluno encontra-se no módulo ${numero(r.moduloAtual)}.`,
    "",
    `Também identificamos ${numero(r.faltas)} falta(s), que correspondem aproximadamente a ${numero(r.semanasReposicaoCeil)} semana(s) de aulas para reposição.`,
    "",
    `Caso opte por realizar as reposições, o valor estimado será de ${moeda(r.valorReposicoes)}.`,
    "",
    `Caso as faltas não sejam repostas, o período contratual poderá ser estendido em aproximadamente ${numero(r.mensalidadesAdicionaisCeil)} mensalidade(s), conforme os cálculos apresentados.`,
    "",
    "Caso tenha interesse em realizar as reposições ou queira mais informações, estamos à disposição para orientá-lo.",
    "",
    "Atenciosamente,",
    "Microlins",
  ].join("\n");
}
