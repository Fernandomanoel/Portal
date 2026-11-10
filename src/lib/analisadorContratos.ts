// Calculadora local: nada daqui sai do navegador nem é guardado.
// Sem imports de propósito, para o Node conseguir rodar scripts/verificar-analisador.mjs direto neste arquivo.

export const CONFIG_CONTRATO = {
  aulasPorSemana: 2,
  aulasPorModulo: 16,
  mensalidadesPorModulo: 2,
  valorReposicao: 20,
};

export type Situacao = "REGULAR" | "ATENÇÃO" | "PENDENTE";

export interface EntradaContrato {
  nome: string;
  parcelasPagas: number;
  moduloAtual: number;
  totalModulos: number;
  faltas: number;
}

export interface AnaliseContrato extends EntradaContrato {
  modulosCorrespondentes: number;
  diferencaModulos: number;
  semanasReposicao: number;
  mensalidadesAdicionais: number;
  valorReposicoes: number;
  situacao: Situacao;
  explicacao: string;
}

export type ResultadoAnalise = { valido: true; analise: AnaliseContrato } | { valido: false; erros: string[] };

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatarNumero(valor: number): string {
  if (Number.isInteger(valor)) return String(valor);
  return valor.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 1 });
}

export function analisarContrato(entrada: EntradaContrato): ResultadoAnalise {
  const { parcelasPagas, moduloAtual, totalModulos, faltas } = entrada;
  const { aulasPorSemana, aulasPorModulo, mensalidadesPorModulo, valorReposicao } = CONFIG_CONTRATO;

  const erros: string[] = [];
  if (parcelasPagas < 0) erros.push("Parcelas pagas não podem ser negativas.");
  if (moduloAtual < 0) erros.push("Módulo atual não pode ser negativo.");
  if (totalModulos < 0) erros.push("Total de módulos não pode ser negativo.");
  if (faltas < 0) erros.push("Faltas não podem ser negativas.");
  if (erros.length > 0) return { valido: false, erros };

  const modulosCorrespondentes = parcelasPagas / mensalidadesPorModulo;
  const diferencaModulos = Math.max(0, modulosCorrespondentes - moduloAtual);
  const semanasExatas = faltas / aulasPorSemana;
  const semanasPorModulo = aulasPorModulo / aulasPorSemana;
  const semanasPorMensalidade = semanasPorModulo / mensalidadesPorModulo;
  const mensalidadesExatas = semanasExatas / semanasPorMensalidade;
  // Semanas e mensalidades extras sempre arredondam para cima: meia semana de reposição ocupa a semana inteira.
  const semanasReposicao = Math.ceil(semanasExatas);
  const mensalidadesAdicionais = Math.ceil(mensalidadesExatas);

  const atrasado = moduloAtual < modulosCorrespondentes;
  const temFaltas = faltas > 0;
  const situacao: Situacao = atrasado && temFaltas ? "PENDENTE" : atrasado || temFaltas ? "ATENÇÃO" : "REGULAR";

  const n = formatarNumero;
  const linhas = [
    `O aluno possui ${n(parcelasPagas)} parcela(s) paga(s).`,
    "",
    `Considerando ${n(mensalidadesPorModulo)} mensalidade(s) por módulo:`,
    `${n(parcelasPagas)} ÷ ${n(mensalidadesPorModulo)} = ${n(modulosCorrespondentes)} módulo(s).`,
    "",
    `O aluno está no módulo ${n(moduloAtual)}.`,
    diferencaModulos > 0
      ? `Existe uma diferença de ${n(diferencaModulos)} módulo(s) em relação às parcelas pagas.`
      : "O módulo atual está alinhado (ou adiantado) em relação às parcelas pagas.",
    "",
    `O aluno possui ${n(faltas)} falta(s).`,
  ];
  if (temFaltas) {
    linhas.push(
      "",
      `Considerando ${n(aulasPorSemana)} aula(s) por semana:`,
      `${n(faltas)} ÷ ${n(aulasPorSemana)} = ${n(semanasExatas)} semana(s) de reposição.`,
      `Arredondando para cima: ${n(semanasReposicao)} semana(s).`,
      "",
      `Considerando um módulo de ${n(aulasPorModulo)} aula(s):`,
      `${n(aulasPorModulo)} ÷ ${n(aulasPorSemana)} = ${n(semanasPorModulo)} semana(s) por módulo.`,
      "",
      `Como cada módulo corresponde a ${n(mensalidadesPorModulo)} mensalidade(s):`,
      `${n(semanasPorModulo)} ÷ ${n(mensalidadesPorModulo)} = ${n(semanasPorMensalidade)} semana(s) por mensalidade.`,
      "",
      `${n(semanasExatas)} ÷ ${n(semanasPorMensalidade)} = ${n(mensalidadesExatas)} mensalidade(s) adicional(is) estimada(s).`,
      `Arredondando para cima: ${n(mensalidadesAdicionais)} mensalidade(s).`,
    );
  } else {
    linhas.push("Não há faltas a repor e não há extensão estimada de contrato por faltas.");
  }

  return {
    valido: true,
    analise: {
      ...entrada,
      nome: entrada.nome.trim(),
      modulosCorrespondentes,
      diferencaModulos,
      semanasReposicao,
      mensalidadesAdicionais,
      valorReposicoes: faltas * valorReposicao,
      situacao,
      explicacao: linhas.join("\n"),
    },
  };
}

export function mensagemParaResponsavel(analise: AnaliseContrato): string {
  const n = formatarNumero;
  return [
    `Olá, ${analise.nome || "[NOME]"}.`,
    "",
    "Realizamos uma verificação da sua situação acadêmica.",
    "",
    `Atualmente constam ${n(analise.parcelasPagas)} parcela(s) paga(s) e o aluno encontra-se no módulo ${n(analise.moduloAtual)}.`,
    "",
    `Também identificamos ${n(analise.faltas)} falta(s), que correspondem aproximadamente a ${n(analise.semanasReposicao)} semana(s) de aulas para reposição.`,
    "",
    `Caso opte por realizar as reposições, o valor estimado será de ${formatarMoeda(analise.valorReposicoes)}.`,
    "",
    `Caso as faltas não sejam repostas, o período contratual poderá ser estendido em aproximadamente ${n(analise.mensalidadesAdicionais)} mensalidade(s), conforme os cálculos apresentados.`,
    "",
    "Caso tenha interesse em realizar as reposições ou queira mais informações, estamos à disposição para orientá-lo.",
    "",
    "Atenciosamente,",
    "Microlins",
  ].join("\n");
}
