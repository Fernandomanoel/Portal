import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculo, calculos, associar, planilha, dissertativa } from "../ajudantes";

const OFERTAS = [
  ["Banco A", 1.2, "ao mês"],
  ["Banco B", 15, "ao ano"],
  ["Banco C", 3.6, "ao trimestre"],
];
const ANUAL_A = ((1 + 1.2 / 100) ** 12 - 1) * 100;
const ANUAL_C = ((1 + 3.6 / 100) ** 4 - 1) * 100;

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Matemática Financeira — Taxas de Juros Efetivas e Equivalentes",
  introducao:
    "Taxas anunciadas em um período podem não ser as taxas reais de outro. Converta taxas, descubra a taxa efetiva e compare propostas. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    associar({
      id: "tipos",
      titulo: "Nominal, efetiva e equivalente",
      instrucao: "Associe cada tipo de taxa à definição.",
      opcoes: [
        "Taxa nominal: o período da taxa é diferente do período de capitalização",
        "Taxa efetiva: o período da taxa é o mesmo da capitalização",
        "Taxas equivalentes: produzem o mesmo montante, em períodos diferentes",
      ],
      linhas: [
        { id: "nominal", rotulo: "24% ao ano, capitalizados mensalmente.", correta: 0 },
        { id: "efetiva", rotulo: "2% ao mês, capitalizados mensalmente.", correta: 1 },
        { id: "equivalentes", rotulo: "10% ao semestre e 21% ao ano.", correta: 2 },
      ],
      explicacao: "A taxa nominal «engana» porque não mostra o ganho real; a efetiva reflete a capitalização que de fato ocorre.",
    }),
    calculo({
      id: "efetiva-anual",
      titulo: "Da taxa mensal para a anual efetiva",
      cenario: "Um investimento rende 1% ao mês, juros compostos. (Use 1,01¹² ≈ 1,126825.)",
      instrucao: "Qual é a taxa efetiva anual, em %?",
      rotulo: "Taxa anual (%)",
      esperado: 12.68,
      tolerancia: 0.02,
      explicacao: "1,01¹² − 1 = 0,126825, ou cerca de 12,68% ao ano, mais que os 12% de 1% × 12.",
    }),
    calculo({
      id: "nominal-efetiva",
      titulo: "Taxa nominal para efetiva",
      cenario: "Um financiamento cobra 24% ao ano com capitalização mensal. A taxa mensal é 2%. (Use 1,02¹² ≈ 1,268242.)",
      instrucao: "Qual é a taxa efetiva anual, em %?",
      rotulo: "Taxa efetiva anual (%)",
      esperado: 26.82,
      tolerancia: 0.02,
      explicacao: "1,02¹² − 1 ≈ 0,2682: a taxa efetiva é 26,82% ao ano, maior que os 24% anunciados.",
    }),
    calculos({
      id: "equivalentes",
      titulo: "Taxas equivalentes",
      cenario: "A taxa semestral é de 10%. (Use 1,10² = 1,21.)",
      instrucao: "Qual é a taxa anual equivalente, em %? E a taxa proporcional simples (10% × 2)?",
      campos: [
        { id: "equivalente", rotulo: "Taxa anual equivalente (%)", esperado: 21, explicacao: "(1 + 0,10)² − 1 = 0,21, ou 21% ao ano." },
        { id: "proporcional", rotulo: "Taxa proporcional (%)", esperado: 20, explicacao: "10% × 2 = 20%: no regime composto a proporcional não é equivalente." },
      ],
    }),
    escolha({
      id: "comparar",
      titulo: "Qual proposta é melhor",
      cenario: "Banco A: 2,0% ao mês. Banco B: 25% ao ano (juros compostos). (1,02¹² ≈ 1,2682.)",
      instrucao: "Para tomar um empréstimo, qual é a melhor opção?",
      opcoes: [
        "Banco A, pois 2% é menor que 25%.",
        "Banco B, pois a taxa anual equivalente do A é cerca de 26,8% e a do B é 25%.",
        "Tanto faz.",
        "Nenhum dos dois.",
      ],
      correta: 1,
      explicacao: "Só se comparam taxas no mesmo período: A equivale a ~26,8% ao ano e B é 25%, portanto B é mais barata.",
    }),
    planilha({
      id: "taxas-anunciadas",
      titulo: "Planilha: três ofertas com taxas em períodos diferentes",
      cenario: "Três bancos oferecem a mesma aplicação, cada um com a taxa informada em um período diferente. Para comparar, é preciso converter todas para a mesma base (ao ano), em juros compostos: taxa anual = (1 + taxa do período)ⁿ − 1, em que n é o número de períodos em um ano. Cole a planilha no Excel e resolva.",
      colunas: ["Oferta", "Taxa (%)", "Período da taxa"],
      linhas: OFERTAS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "anual-a", rotulo: "Taxa anual efetiva do Banco A (%)", valor: ANUAL_A, explicacao: "(1,012¹² − 1) × 100 ≈ 15,39%." },
        { id: "anual-c", rotulo: "Taxa anual efetiva do Banco C (%)", valor: ANUAL_C, explicacao: "(1,036⁴ − 1) × 100 ≈ 15,20%." },
        { id: "mensal-b", rotulo: "Taxa mensal equivalente do Banco B (%)", valor: ((1 + 15 / 100) ** (1 / 12) - 1) * 100, explicacao: "(1,15^(1/12) − 1) × 100 ≈ 1,17%." },
        { id: "diferenca", rotulo: "Diferença entre a melhor e a pior oferta, em pontos percentuais por ano", valor: Math.max(ANUAL_A, 15, ANUAL_C) - Math.min(ANUAL_A, 15, ANUAL_C), explicacao: "Banco A (15,39%) menos Banco B (15,00%)." },
      ],
    }),
    dissertativa({
      id: "como-comparar",
      titulo: "Como comparar propostas",
      instrucao: "Escreva uma orientação para o setor financeiro sobre como comparar propostas com taxas em períodos diferentes.",
      deve: [
        "Explique por que não se compara 1,2% ao mês com 15% ao ano sem converter.",
        "Diferencie taxa nominal, efetiva e equivalente com um exemplo da planilha.",
        "Diga qual banco você escolheria para aplicar e qual escolheria para tomar crédito, e por quê.",
      ],
      chave: /(efetiva|equivalente|nominal|converter|per[ií]odo|ano|m[eê]s|aplicar|cr[eé]dito)/i,
    }),
  ],
};

export default atividade;
