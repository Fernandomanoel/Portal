import type { CampoProva, ItemProva, ProvaInterativa } from "@/types/quiz";

/**
 * Matemática Financeira — Avaliação B (nível mais simples): porcentagem,
 * descontos, parcelas, troco, juros simples e lucro, com contas curtas.
 * Prova escrita para o portal. Respostas numéricas aceitam vírgula, ponto e
 * "R$", com diferença de até 1 centavo.
 */
const num = (id: string, rotulo: string, esperado: number, mensagemCerta?: string, mensagemErrada?: string): CampoProva => ({
  id,
  rotulo,
  placeholder: "Digite apenas o número",
  regra: { tipo: "numero", esperado, tolerancia: 0.01 },
  mensagemCerta,
  mensagemErrada,
});
const mc = (id: string, opcoes: string[], correta: number): CampoProva => ({ id, regra: { tipo: "multipla_escolha", opcoes, correta } });
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
    titulo: "Questão 1: Quanto é a porcentagem?",
    enunciado: "Quanto é 10% de R$ 200,00?",
    referencia: "Dica: 10% é o mesmo que dividir por 10.",
    campos: [num("valor", "Resposta (R$):", 20)],
    mensagemCerta: "200 ÷ 10 = R$ 20,00.",
    mensagemErrada: "10% é a décima parte: divida 200 por 10.",
  },
  {
    titulo: "Questão 2: Desconto",
    enunciado: "Uma camiseta de R$ 150,00 está com 20% de desconto. Quanto você paga?",
    referencia: "Dica: 20% de 150 = 30. Subtraia o desconto do preço.",
    campos: [num("preco", "Preço final (R$):", 120)],
    mensagemCerta: "150 − 30 = R$ 120,00.",
    mensagemErrada: "Calcule 20% de 150 (= 30) e tire do preço.",
  },
  {
    titulo: "Questão 3: Aumento",
    enunciado: "Um produto de R$ 400,00 aumentou 5%. Qual é o novo preço?",
    referencia: "Dica: 5% de 400 = 20. Some o aumento ao preço.",
    campos: [num("preco", "Novo preço (R$):", 420)],
    mensagemCerta: "400 + 20 = R$ 420,00.",
    mensagemErrada: "Calcule 5% de 400 (= 20) e some ao preço.",
  },
  {
    titulo: "Questão 4: Juros simples",
    enunciado: "Você aplicou R$ 1.000,00 a juros simples de 2% ao mês, por 3 meses.",
    referencia: "Juros por mês = 2% de 1.000 = 20. Juros total = juros por mês × número de meses.",
    campos: [num("juros", "Juros recebidos (R$):", 60), num("montante", "Total na conta (R$):", 1060)],
    mensagemCerta: "20 × 3 = R$ 60,00 de juros; 1.000 + 60 = R$ 1.060,00.",
    mensagemErrada: "Multiplique os 20 reais de cada mês por 3 e some ao valor aplicado.",
  },
  {
    titulo: "Questão 5: Parcelas",
    enunciado: "Uma TV de R$ 600,00 será paga em 6 parcelas iguais, sem juros. Qual é o valor de cada parcela?",
    campos: [num("parcela", "Valor da parcela (R$):", 100)],
    mensagemCerta: "600 ÷ 6 = R$ 100,00.",
    mensagemErrada: "Divida o preço total pelo número de parcelas.",
  },
  {
    titulo: "Questão 6: Troco",
    enunciado: "Uma compra deu R$ 87,50. Você pagou com uma nota de R$ 100,00. Qual é o troco?",
    campos: [num("troco", "Troco (R$):", 12.5)],
    mensagemCerta: "100 − 87,50 = R$ 12,50.",
    mensagemErrada: "Subtraia o valor da compra da nota entregue.",
  },
  {
    titulo: "Questão 7: O que são juros?",
    enunciado: "Escolha a melhor explicação:",
    campos: [
      mc(
        "juros",
        [
          "a) É um desconto dado em compras à vista.",
          "b) É o valor cobrado (ou ganho) pelo uso do dinheiro durante um tempo.",
          "c) É o nome do troco que sobra no caixa.",
        ],
        1,
      ),
    ],
    mensagemCerta: "Isso mesmo: quem empresta cobra juros; quem aplica ganha juros.",
    mensagemErrada: "Pense: pagar mais caro para usar o dinheiro de outra pessoa por um tempo.",
  },
  {
    titulo: "Questão 8: Qual desconto é maior?",
    enunciado: "Uma loja oferece três descontos sobre o mesmo produto de R$ 100,00. Qual deles é o maior?",
    campos: [mc("maior", ["a) 10% de desconto", "b) R$ 15,00 de desconto", "c) 12% de desconto"], 1)],
    mensagemCerta: "10% de 100 = 10; 12% = 12; R$ 15,00 é o maior.",
    mensagemErrada: "Transforme as porcentagens em reais (10% de 100 = 10) e compare.",
  },
  {
    titulo: "Questão 9: Verdadeiro ou falso",
    enunciado: "Julgue as afirmações:",
    campos: [
      sel("parcelar", "1. Pagar parcelado com juros costuma custar mais do que pagar à vista.", VF, "V"),
      sel("desconto", "2. Um desconto de 50% deixa o produto com o dobro do preço.", VF, "F"),
      sel("lucro", "3. Lucro é a diferença entre o valor de venda e o custo.", VF, "V"),
    ],
    mensagemCerta: "Isso mesmo!",
    mensagemErrada: "Revise: 50% de desconto reduz o preço à metade.",
  },
  {
    titulo: "Questão 10: Lucro",
    enunciado: "Uma vendedora comprou um produto por R$ 50,00 e o vendeu por R$ 65,00.",
    referencia: "Lucro = venda − custo. Percentual de lucro sobre o custo = lucro ÷ custo × 100.",
    campos: [num("lucro", "Lucro (R$):", 15), num("percentual", "Lucro sobre o custo (%):", 30)],
    mensagemCerta: "65 − 50 = R$ 15,00; 15 ÷ 50 = 0,30 = 30%.",
    mensagemErrada: "O lucro é 65 − 50. Divida o lucro por 50 (custo) e multiplique por 100.",
  },
];

const prova: ProvaInterativa = {
  tipo: "autocorrigida",
  titulo: "Matemática Financeira — Avaliação B",
  introducao: "Contas curtas do dia a dia: use papel ou a calculadora do computador e digite só o resultado. Pode usar vírgula ou ponto.",
  itens,
};

export default prova;
