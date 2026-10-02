import type { CampoProva, ItemProva, ProvaInterativa } from "@/types/quiz";

/**
 * Matemática Financeira — Avaliação A (nível normal): porcentagem, juros
 * simples e compostos, desconto simples e comparações, sem fórmulas pesadas.
 * Prova escrita para o portal. Respostas numéricas aceitam vírgula, ponto e
 * "R$" (ex.: 920, 920,00 ou R$ 920,00), com diferença de até 1 centavo.
 */
const num = (id: string, rotulo: string, esperado: number, mensagemCerta?: string, mensagemErrada?: string): CampoProva => ({
  id,
  rotulo,
  placeholder: "Digite apenas o número",
  regra: { tipo: "numero", esperado, tolerancia: 0.01 },
  mensagemCerta,
  mensagemErrada,
});
const sel = (id: string, rotulo: string, opcoes: [string, string][], esperado: string): CampoProva => ({
  id,
  rotulo,
  regra: { tipo: "selecao", opcoes: opcoes.map(([valor, texto]) => ({ valor, texto })), esperado },
});
const VF: [string, string][] = [
  ["V", "Verdadeiro"],
  ["F", "Falso"],
];

const itens: ItemProva[] = [
  {
    titulo: "Questão 1: Porcentagem",
    enunciado: "Um produto custa R$ 800,00 e teve um aumento de 15%. Qual é o novo preço?",
    referencia: "Dica: novo preço = preço × (1 + taxa). Para 15%, a taxa é 0,15.",
    campos: [num("preco", "Novo preço (R$):", 920)],
    mensagemCerta: "800 × 1,15 = R$ 920,00.",
    mensagemErrada: "Calcule 15% de 800 (= 120) e some ao preço original.",
  },
  {
    titulo: "Questão 2: Juros simples",
    enunciado: "Um capital de R$ 2.000,00 é aplicado a juros simples, à taxa de 3% ao mês, durante 5 meses.",
    referencia: "Juros simples: J = C × i × n   ·   Montante: M = C + J",
    campos: [num("juros", "Juros recebidos (R$):", 300), num("montante", "Montante final (R$):", 2300)],
    mensagemCerta: "J = 2.000 × 0,03 × 5 = R$ 300,00 e M = 2.000 + 300 = R$ 2.300,00.",
    mensagemErrada: "Use J = C × i × n com i = 0,03 e n = 5; depois some o capital.",
  },
  {
    titulo: "Questão 3: Taxa de juros simples",
    enunciado: "Um capital de R$ 1.500,00 rendeu R$ 270,00 de juros simples em 6 meses. Qual foi a taxa mensal?",
    referencia: "Taxa: i = J ÷ (C × n)  (o resultado vem em decimal; multiplique por 100 para %).",
    campos: [num("taxa", "Taxa mensal (% ao mês):", 3)],
    mensagemCerta: "270 ÷ (1.500 × 6) = 0,03 = 3% ao mês.",
    mensagemErrada: "Divida 270 por (1.500 × 6) e multiplique por 100.",
  },
  {
    titulo: "Questão 4: Juros compostos",
    enunciado: "Qual é o montante de R$ 1.000,00 aplicados a juros compostos, a 2% ao mês, durante 3 meses?",
    referencia: "Juros compostos: M = C × (1 + i)ⁿ.  Dica: 1,02 × 1,02 × 1,02 = 1,061208.",
    campos: [num("montante", "Montante (R$, com 2 casas):", 1061.21)],
    mensagemCerta: "1.000 × 1,02³ = R$ 1.061,21.",
    mensagemErrada: "Multiplique 1.000 por 1,02 três vezes (um mês de cada vez).",
  },
  {
    titulo: "Questão 5: Juros compostos em anos",
    enunciado: "Uma aplicação de R$ 5.000,00 rende 10% ao ano, a juros compostos, por 2 anos.",
    campos: [num("montante", "Montante (R$):", 6050), num("juros", "Juros ganhos (R$):", 1050)],
    mensagemCerta: "5.000 × 1,10 × 1,10 = R$ 6.050,00; juros = 6.050 − 5.000 = R$ 1.050,00.",
    mensagemErrada: "Aplique 10% duas vezes, uma sobre o resultado da outra; os juros são montante menos capital.",
  },
  {
    titulo: "Questão 6: Desconto simples",
    enunciado:
      "Um título de R$ 3.000,00 será pago 2 meses antes do vencimento. O banco cobra desconto simples de 2% ao mês sobre o valor do título.",
    referencia: "Desconto: D = valor × taxa × tempo   ·   Valor pago = valor − D",
    campos: [num("desconto", "Desconto (R$):", 120), num("pago", "Valor efetivamente pago (R$):", 2880)],
    mensagemCerta: "D = 3.000 × 0,02 × 2 = R$ 120,00 e valor pago = 3.000 − 120 = R$ 2.880,00.",
    mensagemErrada: "Calcule 2% de 3.000 por mês, multiplique por 2 meses e subtraia do título.",
  },
  {
    titulo: "Questão 7: À vista ou a prazo?",
    enunciado: "Uma geladeira custa R$ 1.200,00 à vista, ou 3 parcelas de R$ 420,00 sem entrada.",
    campos: [num("total", "Total pago a prazo (R$):", 1260), num("acrescimo", "Acréscimo em relação ao preço à vista (%):", 5)],
    mensagemCerta: "3 × 420 = R$ 1.260,00; o acréscimo é 60 ÷ 1.200 = 5%.",
    mensagemErrada: "Multiplique 420 por 3; a diferença para 1.200, dividida por 1.200, dá o acréscimo.",
  },
  {
    titulo: "Questão 8: Simples ou composto?",
    enunciado: "Compare duas aplicações de R$ 1.000,00 por 12 meses: A rende 2% ao mês a juros simples; B rende 1,5% ao mês a juros compostos.",
    referencia: "Dica: 1,015¹² ≈ 1,195618.",
    campos: [num("a", "Montante da aplicação A (R$):", 1240), num("b", "Montante da aplicação B (R$, 2 casas):", 1195.62)],
    mensagemCerta: "A: 1.000 + 1.000 × 0,02 × 12 = R$ 1.240,00. B: 1.000 × 1,015¹² ≈ R$ 1.195,62. Aqui o simples rende mais.",
    mensagemErrada: "A: some 12 vezes 20 reais a 1.000. B: multiplique 1.000 por 1,015 doze vezes (use 1,195618).",
  },
  {
    titulo: "Questão 9: Verdadeiro ou falso",
    enunciado: "Julgue as afirmações sobre juros:",
    campos: [
      sel("simples", "1. No juros simples, os juros são calculados sempre sobre o capital inicial.", VF, "V"),
      sel("composto", "2. No juros compostos, os juros de cada período são calculados sobre o montante do período anterior (juros sobre juros).", VF, "V"),
      sel("tempo", "3. Quanto maior o tempo de aplicação a juros compostos, menor a diferença para os juros simples.", VF, "F"),
    ],
    mensagemCerta: "Isso mesmo: com o tempo, o juros composto se afasta (para cima) do simples.",
    mensagemErrada: "Revise: simples = sempre sobre o capital; composto = sobre o montante anterior, e a diferença só cresce.",
  },
  {
    titulo: "Questão 10: Lucro sobre custo e sobre venda",
    enunciado: "Uma loja comprou um produto por R$ 80,00 e o vendeu por R$ 100,00.",
    referencia: "Lucro = venda − custo. Percentual sobre o custo = lucro ÷ custo. Percentual sobre a venda = lucro ÷ venda.",
    campos: [num("custo", "Lucro em porcentagem sobre o custo (%):", 25), num("venda", "Lucro em porcentagem sobre a venda (%):", 20)],
    mensagemCerta: "Lucro de R$ 20,00: 20 ÷ 80 = 25% sobre o custo e 20 ÷ 100 = 20% sobre a venda.",
    mensagemErrada: "O lucro é 20 reais. Divida por 80 (custo) e por 100 (venda) e multiplique por 100.",
  },
];

const prova: ProvaInterativa = {
  tipo: "autocorrigida",
  titulo: "Matemática Financeira — Avaliação A",
  introducao: "Resolva com calma, no papel ou na calculadora do computador, e digite só o resultado. Pode usar vírgula ou ponto.",
  itens,
};

export default prova;
