import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "A matemática financeira estuda o valor do dinheiro no tempo. O curso parte da proporcionalidade e da porcentagem, passa pelas operações mercantis, juros simples e compostos, taxas equivalentes, inflação e chega à análise de investimentos (VPL, TIR e payback).",
  topicos: [
    {
      titulo: "Proporcionalidade, regra de três e porcentagem",
      texto: [
        "Duas grandezas são diretamente proporcionais quando uma cresce na mesma razão da outra (mais produtos, mais preço). A regra de três resolve: se 3 itens custam R$ 45, 5 itens custam 5 × 45 ÷ 3 = R$ 75. Na divisão proporcional, reparte-se um valor em partes proporcionais a números dados.",
        "Porcentagem é uma razão de base 100. Parte = base × taxa ÷ 100. Descontos e aumentos sucessivos se multiplicam, não se somam: +10% e depois −10% resulta em 1,10 × 0,90 = 0,99, uma queda de 1%.",
      ],
      pontos: ["Resolver regra de três simples.", "Calcular aumentos e descontos sucessivos."],
      erros: ["Somar porcentagens sucessivas."],
      atividades: ["matematica-financeira-proporcionalidade", "matematica-financeira-porcentagem-potenciacao"],
    },
    {
      titulo: "Operações mercantis: lucro e prejuízo",
      texto: [
        "Preço de venda = custo + lucro (ou − prejuízo). O lucro pode ser medido sobre o custo (lucro ÷ custo) ou sobre a venda (lucro ÷ venda), e a base muda o percentual. Por isso é preciso sempre dizer «sobre quê».",
      ],
      pontos: ["Calcular lucro sobre o custo e sobre a venda."],
      exemplo: "Custo R$ 80, venda R$ 100: lucro R$ 20, ou seja, 25% sobre o custo e 20% sobre a venda.",
      atividades: ["matematica-financeira-operacoes-mercantis"],
    },
    {
      titulo: "Juros simples",
      texto: [
        "No regime simples os juros incidem sempre sobre o capital inicial: J = C × i × n, e o montante M = C + J. A taxa e o tempo precisam estar na mesma unidade (taxa ao mês com tempo em meses).",
      ],
      pontos: ["Calcular juros e montante.", "Ajustar a unidade da taxa e do tempo."],
      exemplo: "R$ 2.000 a 1,5% ao mês por 8 meses: J = 2.000 × 0,015 × 8 = R$ 240; M = R$ 2.240.",
      atividades: ["matematica-financeira-juros-simples"],
    },
    {
      titulo: "Juros compostos",
      texto: [
        "No regime composto, os juros de cada período entram na base do seguinte: M = C × (1 + i)^n. O crescimento é exponencial. Para achar o capital, divide-se o montante por (1 + i)^n. O tempo se calcula com logaritmos, ou por tentativa na calculadora ou planilha.",
      ],
      pontos: ["Aplicar a fórmula do montante.", "Explicar por que composto rende mais que simples depois de um período."],
      exemplo: "R$ 1.000 a 2% ao mês por 12 meses: 1.000 × 1,02^12 ≈ R$ 1.268,24.",
      atividades: ["matematica-financeira-juros-compostos"],
    },
    {
      titulo: "Taxas efetivas e equivalentes",
      texto: [
        "Taxas equivalentes produzem o mesmo montante no mesmo tempo, em períodos diferentes. Em juros compostos, 1 + taxa anual = (1 + taxa mensal)^12. Taxa nominal é a anunciada; a efetiva é a que realmente incide, depois da capitalização. 1% ao mês não é 12% ao ano, e sim cerca de 12,68% ao ano.",
      ],
      pontos: ["Converter uma taxa mensal em anual (e vice-versa).", "Distinguir nominal de efetiva."],
      atividades: ["matematica-financeira-taxas-efetivas-equivalentes"],
    },
    {
      titulo: "Inflação e correção monetária",
      texto: [
        "Inflação é o aumento geral dos preços; reduz o poder de compra. Taxa real = (1 + taxa nominal) ÷ (1 + inflação) − 1. Uma aplicação que rende 10% com inflação de 6% tem rendimento real de cerca de 3,77%, e não 4%. A correção monetária atualiza valores por um índice de preços (como o IPCA).",
      ],
      pontos: ["Calcular a taxa real.", "Atualizar um valor por um índice."],
      atividades: ["matematica-financeira-inflacao-correcao-monetaria"],
    },
    {
      titulo: "Investimentos: fluxo de caixa, VPL, TIR e payback",
      texto: [
        "Um projeto tem um investimento inicial e fluxos de caixa futuros. O VPL (valor presente líquido) traz os fluxos futuros ao valor de hoje descontando uma taxa mínima de atratividade e subtrai o investimento: VPL positivo indica que o projeto vale a pena. A TIR é a taxa que zera o VPL; compara-se com a taxa mínima. O payback é o tempo para recuperar o investimento.",
        "VPL = soma de cada fluxo ÷ (1 + i)^período − investimento.",
      ],
      pontos: ["Calcular o VPL de um projeto curto.", "Interpretar TIR e payback."],
      atividades: ["matematica-financeira-investimentos-fluxo-de-caixa"],
    },
  ],
  glossario: [
    { termo: "Capital", definicao: "Valor inicial de uma operação financeira." },
    { termo: "Montante", definicao: "Capital mais juros." },
    { termo: "Taxa equivalente", definicao: "Taxas de períodos diferentes que dão o mesmo resultado." },
    { termo: "Taxa real", definicao: "Taxa descontada da inflação." },
    { termo: "VPL", definicao: "Valor presente líquido de um projeto." },
    { termo: "TIR", definicao: "Taxa interna de retorno: a que zera o VPL." },
    { termo: "Payback", definicao: "Tempo para recuperar o investimento." },
  ],
  dicas: [
    "Deixe a calculadora científica ou a planilha sempre à mão e treine a potência (^).",
    "Mostre uma tabela mês a mês de juros simples e compostos lado a lado: o aluno vê a diferença nascer.",
    "Exija a unidade no resultado: R$, %, meses.",
  ],
};

export default conteudo;
