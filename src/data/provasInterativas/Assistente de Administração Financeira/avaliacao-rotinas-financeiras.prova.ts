import type { CampoProva, ItemProva, ProvaInterativa } from "@/types/quiz";

/**
 * Assistente de Administração Financeira — rotinas do setor: contas a pagar
 * e a receber, juros de boleto atrasado, fluxo de caixa, conciliação bancária,
 * comissão, depreciação, orçamento e controles. Prova escrita para o portal;
 * respostas numéricas aceitam vírgula, ponto e "R$" (diferença de até 1 centavo).
 */
const num = (id: string, rotulo: string, esperado: number): CampoProva => ({
  id,
  rotulo,
  placeholder: "Digite apenas o número",
  regra: { tipo: "numero", esperado, tolerancia: 0.01 },
});
const mc = (id: string, opcoes: string[], correta: number): CampoProva => ({ id, regra: { tipo: "multipla_escolha", opcoes, correta } });
const sel = (id: string, rotulo: string, opcoes: [string, string][], esperado: string): CampoProva => ({
  id,
  rotulo,
  regra: { tipo: "selecao", opcoes: opcoes.map(([valor, texto]) => ({ valor, texto })), esperado },
});
const PAGAR_RECEBER: [string, string][] = [
  ["pagar", "Conta a pagar"],
  ["receber", "Conta a receber"],
];
const FIXA_VARIAVEL: [string, string][] = [
  ["fixa", "Despesa fixa"],
  ["variavel", "Despesa variável"],
];

const itens: ItemProva[] = [
  {
    titulo: "Situação 1: Contas a pagar ou a receber?",
    enunciado: "No contas a pagar e a receber da empresa, classifique cada lançamento:",
    campos: [
      sel("aluguel", "Aluguel da loja, que vence todo dia 5", PAGAR_RECEBER, "pagar"),
      sel("duplicata", "Duplicata de uma venda a prazo para o cliente Mercado Sol", PAGAR_RECEBER, "receber"),
      sel("fornecedor", "Nota do fornecedor de embalagens, com vencimento em 30 dias", PAGAR_RECEBER, "pagar"),
      sel("cartao", "Vendas no cartão de crédito que a operadora vai repassar à empresa", PAGAR_RECEBER, "receber"),
    ],
    mensagemCerta: "Isso mesmo: o que a empresa deve é a pagar; o que tem direito de receber é a receber.",
    mensagemErrada: "Pergunte-se: a empresa vai tirar ou vai receber dinheiro nesse lançamento?",
  },
  {
    titulo: "Situação 2: Boleto pago com atraso",
    enunciado:
      "Um boleto de R$ 500,00 venceu no dia 10 e só foi pago no dia 16 (6 dias de atraso). O contrato prevê multa de 2% (cobrada uma vez) e juros de mora de 1% ao mês, calculados por dia (1% ÷ 30 por dia de atraso).",
    referencia: "Multa = valor × 2%   ·   Juros = valor × (1% ÷ 30) × dias   ·   Total = valor + multa + juros",
    campos: [num("multa", "Multa (R$):", 10), num("juros", "Juros de mora (R$):", 1), num("total", "Total a pagar (R$):", 511)],
    mensagemCerta: "Multa 500 × 0,02 = R$ 10,00; juros 500 × (0,01 ÷ 30) × 6 = R$ 1,00; total R$ 511,00.",
    mensagemErrada: "Calcule a multa (2% de 500), depois os juros dos 6 dias e some tudo ao valor do boleto.",
  },
  {
    titulo: "Situação 3: Fluxo de caixa da semana",
    enunciado: "O caixa começou o mês com R$ 2.000,00. Entraram R$ 5.500,00 de vendas e saíram R$ 4.200,00 em pagamentos.",
    referencia: "Saldo final = saldo inicial + entradas − saídas",
    campos: [num("saldo", "Saldo final de caixa (R$):", 3300)],
    mensagemCerta: "2.000 + 5.500 − 4.200 = R$ 3.300,00.",
    mensagemErrada: "Some as entradas ao saldo inicial e tire as saídas.",
  },
  {
    titulo: "Situação 4: Conciliação bancária",
    enunciado:
      "O extrato do banco mostra saldo de R$ 4.800,00. No controle da empresa há um cheque de R$ 600,00 emitido que ainda não foi compensado e um depósito de R$ 350,00 feito hoje que ainda não apareceu no extrato.",
    referencia: "Saldo conciliado = saldo do extrato − cheques não compensados + depósitos em trânsito",
    campos: [num("conciliado", "Saldo conciliado (R$):", 4550)],
    mensagemCerta: "4.800 − 600 + 350 = R$ 4.550,00.",
    mensagemErrada: "O cheque ainda vai sair (subtrai) e o depósito ainda vai entrar (soma).",
  },
  {
    titulo: "Situação 5: Qual documento comprova o pagamento?",
    enunciado: "O fornecedor ligou dizendo que não recebeu um boleto. Qual documento você deve guardar e mostrar para provar que ele foi pago?",
    campos: [
      mc(
        "documento",
        [
          "a) A cópia do boleto, sem autenticação.",
          "b) O comprovante de pagamento (ou o recibo do banco) com data e autenticação.",
          "c) A nota fiscal do próprio fornecedor.",
        ],
        1,
      ),
    ],
    mensagemCerta: "Certo: comprovante com data e autenticação é a prova do pagamento.",
    mensagemErrada: "O boleto e a nota mostram a cobrança, não o pagamento.",
  },
  {
    titulo: "Situação 6: Comissão de vendas",
    enunciado: "Uma vendedora vendeu R$ 12.000,00 no mês e recebe comissão de 3% sobre as vendas.",
    campos: [num("comissao", "Comissão do mês (R$):", 360)],
    mensagemCerta: "12.000 × 0,03 = R$ 360,00.",
    mensagemErrada: "Multiplique as vendas por 3% (0,03).",
  },
  {
    titulo: "Situação 7: Depreciação",
    enunciado: "A empresa comprou um computador de R$ 12.000,00 com vida útil de 10 anos. Calcule a depreciação linear (igual todos os anos).",
    referencia: "Depreciação anual = valor do bem ÷ vida útil em anos   ·   Mensal = anual ÷ 12",
    campos: [num("anual", "Depreciação por ano (R$):", 1200), num("mensal", "Depreciação por mês (R$):", 100)],
    mensagemCerta: "12.000 ÷ 10 = R$ 1.200,00 por ano; ÷ 12 = R$ 100,00 por mês.",
    mensagemErrada: "Divida o valor pelos 10 anos; para o mês, divida o resultado por 12.",
  },
  {
    titulo: "Situação 8: Despesa fixa ou variável?",
    enunciado: "Classifique cada despesa da empresa:",
    campos: [
      sel("aluguel", "Aluguel do escritório (mesmo valor todo mês)", FIXA_VARIAVEL, "fixa"),
      sel("comissao", "Comissão paga aos vendedores sobre cada venda", FIXA_VARIAVEL, "variavel"),
      sel("embalagem", "Embalagens usadas em cada pedido enviado", FIXA_VARIAVEL, "variavel"),
      sel("seguro", "Mensalidade do seguro do imóvel", FIXA_VARIAVEL, "fixa"),
    ],
    mensagemCerta: "Isso mesmo: fixa não muda com as vendas; variável cresce com elas.",
    mensagemErrada: "Pergunte-se: se a empresa vender o dobro, esse valor muda?",
  },
  {
    titulo: "Situação 9: Orçamento do mês",
    enunciado: "O orçamento prevê receitas de R$ 20.000,00 e despesas de R$ 17.500,00.",
    referencia: "Resultado = receitas − despesas   ·   Margem = resultado ÷ receitas × 100",
    campos: [num("resultado", "Resultado previsto (R$):", 2500), num("margem", "Margem sobre as receitas (%):", 12.5)],
    mensagemCerta: "20.000 − 17.500 = R$ 2.500,00; 2.500 ÷ 20.000 = 12,5%.",
    mensagemErrada: "Subtraia as despesas das receitas e divida o resultado pelas receitas.",
  },
  {
    titulo: "Situação 10: Quem aprova e quem paga?",
    enunciado: "Para evitar fraudes no setor financeiro, qual prática de controle é a mais recomendada?",
    campos: [
      mc(
        "controle",
        [
          "a) A mesma pessoa aprova a compra, faz o pagamento e concilia o banco, para ser mais rápido.",
          "b) Pessoas diferentes aprovam, pagam e conferem (separação de funções), com registro de cada etapa.",
          "c) Só o dono pode ver os extratos; o setor financeiro nunca deve conferir.",
        ],
        1,
      ),
    ],
    mensagemCerta: "Certo: separar as funções reduz o risco de erro e de fraude.",
    mensagemErrada: "Um controle só funciona quando uma pessoa confere o trabalho da outra.",
  },
];

const prova: ProvaInterativa = {
  tipo: "autocorrigida",
  titulo: "Assistente de Administração Financeira — Avaliação: Rotinas do Setor Financeiro",
  introducao: "Situações do dia a dia do setor financeiro. Resolva e digite só os resultados; pode usar vírgula ou ponto.",
  itens,
};

export default prova;
