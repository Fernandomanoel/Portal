import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, calculos, dissertativa, planilha, somar } from "../ajudantes";
import { decimal, sorteio } from "../dadosFicticios";

const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const r = sorteio(2202);
const FATURAMENTO = MESES.map((mes) => [mes, Math.round(decimal(r, 38000, 62000, 0) / 100) * 100] as [string, number]);
const RECEITA = somar(FATURAMENTO.map((l) => l[1]));
const ALIQUOTA_SIMPLES = 8.4;

// Lucro presumido, serviços em geral: presunção de 32% para IRPJ e CSLL, PIS 0,65%, COFINS 3%, ISS 5%.
const mensal = (receita: number) => {
  const base = receita * 0.32;
  const irpj = base * 0.15 + Math.max(0, base - 20000) * 0.1;
  const csll = base * 0.09;
  const pis = receita * 0.0065;
  const cofins = receita * 0.03;
  const iss = receita * 0.05;
  return { base, irpj, csll, pis, cofins, iss, total: irpj + csll + pis + cofins + iss };
};
const PRESUMIDO = FATURAMENTO.map((l) => mensal(l[1]));
const TOTAL_PRESUMIDO = somar(PRESUMIDO.map((p) => p.total));
const TOTAL_SIMPLES = (RECEITA * ALIQUOTA_SIMPLES) / 100;

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Escrita Fiscal — Regimes Opcionais de Tributação",
  introducao:
    "Um dia de trabalho de planejamento tributário: com o faturamento de 12 meses de uma empresa de serviços, comparar o Simples Nacional com o Lucro Presumido e recomendar o regime. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "O pedido do cliente",
      remetente: "Rogério Tavares, sócio da Agência Pixel Norte",
      assunto: "Qual regime é mais barato para nós em 2025?",
      paragrafos: [
        "Somos uma agência de design e marketing, prestadora de serviços no município de Campinas. Faturamos de R$ 38 mil a R$ 62 mil por mês. Hoje estamos no Simples Nacional, mas um colega disse que o Lucro Presumido sairia mais barato. Quero uma comparação com números, não com achismo.",
        "Premissas combinadas com a contadora: o Simples teria alíquota efetiva de 8,4% sobre a receita bruta (valor fictício para o exercício, informado pelo contador); o Lucro Presumido para serviços em geral usa presunção de 32% sobre a receita para IRPJ e CSLL, mais PIS de 0,65%, COFINS de 3% e ISS de 5%. O IRPJ é de 15% sobre a base presumida, com adicional de 10% sobre a parte da base mensal que passar de R$ 20.000,00.",
      ],
      entregas: [
        "O total anual de tributos nos dois regimes (planilha).",
        "O mês de maior carga e a diferença anual entre os regimes.",
        "Uma recomendação por escrito, com os riscos e o que ainda faltaria analisar.",
      ],
    }),
    planilha({
      id: "faturamento-anual",
      titulo: "Etapa 2 — Planilha: faturamento dos 12 meses",
      cenario: "Cole a planilha no Excel. No Simples, imposto = receita × 8,4%. No Presumido, crie colunas para base (32%), IRPJ (15% + adicional), CSLL (9%), PIS, COFINS e ISS.",
      colunas: ["Mês", "Receita bruta de serviços (R$)"],
      linhas: FATURAMENTO,
      instrucao: "Calcule:",
      tarefas: [
        { id: "receita-anual", rotulo: "Receita bruta anual (R$)", valor: RECEITA, explicacao: "Soma dos 12 meses." },
        { id: "simples-anual", rotulo: "Total anual de tributos no Simples Nacional (R$)", valor: TOTAL_SIMPLES, explicacao: "Receita anual × 8,4%." },
        { id: "irpj-janeiro", rotulo: "IRPJ de janeiro no Lucro Presumido (R$)", valor: PRESUMIDO[0].irpj, explicacao: "15% da base presumida (32% da receita) mais 10% sobre o que passar de 20.000 na base." },
        { id: "presumido-janeiro", rotulo: "Total de tributos de janeiro no Lucro Presumido (R$)", valor: PRESUMIDO[0].total, explicacao: "IRPJ + CSLL + PIS + COFINS + ISS do mês." },
        { id: "presumido-anual", rotulo: "Total anual de tributos no Lucro Presumido (R$)", valor: TOTAL_PRESUMIDO, explicacao: "Soma mês a mês dos cinco tributos." },
        { id: "diferenca", rotulo: "Diferença anual (Presumido menos Simples, R$; negativo se o Presumido for mais barato)", valor: TOTAL_PRESUMIDO - TOTAL_SIMPLES, explicacao: "Total anual do Presumido menos o do Simples." },
        { id: "carga-presumido", rotulo: "Carga tributária efetiva do Presumido sobre a receita (%)", valor: (TOTAL_PRESUMIDO / RECEITA) * 100, explicacao: "Total do Presumido ÷ receita anual × 100." },
      ],
    }),
    calculos({
      id: "adicional-ir",
      titulo: "Etapa 3 — Conferindo o adicional do IRPJ em um mês específico",
      cenario: "Em um mês em que a receita de serviços foi de R$ 90.000,00, a base presumida é 32% da receita. O adicional de 10% incide sobre o que passar de R$ 20.000,00 na base do mês.",
      instrucao: "Calcule:",
      campos: [
        { id: "base", rotulo: "Base presumida (R$)", esperado: 28800, explicacao: "90.000 × 32% = 28.800." },
        { id: "irpj-normal", rotulo: "IRPJ de 15% (R$)", esperado: 4320, explicacao: "28.800 × 15% = 4.320." },
        { id: "adicional", rotulo: "Adicional de 10% sobre o excedente de 20.000 (R$)", esperado: 880, explicacao: "(28.800 − 20.000) × 10% = 880." },
        { id: "irpj-total", rotulo: "IRPJ total do mês (R$)", esperado: 5200, explicacao: "4.320 + 880 = 5.200." },
      ],
    }),
    dissertativa({
      id: "recomendacao-de-regime",
      titulo: "Etapa 4 — Recomendação ao cliente",
      cenario: "Rogério quer saber, sem rodeios, em qual regime ficar.",
      instrucao: "Escreva a recomendação que a contabilidade enviaria.",
      deve: [
        "Diga qual regime saiu mais barato na planilha e a diferença anual em reais.",
        "Cite pelo menos duas premissas que, se mudarem, podem inverter o resultado (alíquota efetiva do Simples, folha de pagamento, despesas dedutíveis).",
        "Explique em uma frase o que seria o Lucro Real e por que ele não foi comparado.",
        "Aponte as obrigações acessórias que mudam com a troca de regime e o prazo em que a opção pode ser feita.",
      ],
      chave: /(simples|presumido|real|al[ií]quota|anual|diferen[cç]a|obriga[cç][aã]o|op[cç][aã]o|folha)/i,
      minPalavras: 60,
    }),
    dissertativa({
      id: "riscos-da-troca",
      titulo: "Etapa 5 — Riscos antes de decidir",
      instrucao: "Liste e explique os riscos de trocar de regime com base apenas na comparação de carga tributária.",
      deve: [
        "Mostre que o regime muda não só o imposto, mas também a forma de apurar e as obrigações acessórias.",
        "Explique por que a empresa não deve trocar de regime no meio do ano sem checar a regra de opção.",
        "Diga que informações você pediria ao cliente antes de fechar a recomendação.",
      ],
      chave: /(op[cç][aã]o|obriga[cç][aã]o|apura|prazo|ano|folha|despesa|informa)/i,
    }),
  ],
};

export default atividade;
