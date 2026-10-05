import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculos, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Matemática Financeira — Investimentos, Fluxo de Caixa, VPL, TIR e Payback",
  introducao:
    "Para decidir se um investimento vale a pena, a empresa projeta o fluxo de caixa e o traz a valor presente. Calcule o saldo de caixa, o VPL e o payback e interprete a TIR.",
  itens: [
    calculos({
      id: "fluxo-caixa",
      titulo: "Fluxo de caixa do mês",
      cenario: "Uma loja iniciou o mês com R$ 1.200,00 em caixa. Teve entradas de R$ 8.000,00 e saídas de R$ 5.500,00.",
      instrucao: "Calcule o saldo do período (entradas − saídas) e o saldo final de caixa.",
      campos: [
        { id: "saldo-periodo", rotulo: "Saldo do período (R$)", esperado: 2500, explicacao: "8.000 − 5.500 = 2.500." },
        { id: "saldo-final", rotulo: "Saldo final de caixa (R$)", esperado: 3700, explicacao: "1.200 + 2.500 = 3.700." },
      ],
    }),
    calculos({
      id: "vpl",
      titulo: "Valor presente líquido (VPL)",
      cenario:
        "Um projeto exige investimento de R$ 10.000,00 hoje e traz R$ 6.000,00 ao fim do ano 1 e R$ 6.000,00 ao fim do ano 2. A taxa mínima de atratividade é 10% ao ano. (Use 6.000 ÷ 1,10 ≈ 5.454,55 e 6.000 ÷ 1,21 ≈ 4.958,68.)",
      instrucao: "Calcule o valor presente das entradas e o VPL.",
      campos: [
        { id: "vp-entradas", rotulo: "Valor presente das entradas (R$)", esperado: 10413.23, tolerancia: 0.05, explicacao: "5.454,55 + 4.958,68 = 10.413,23." },
        { id: "vpl", rotulo: "VPL (R$)", esperado: 413.23, tolerancia: 0.05, explicacao: "10.413,23 − 10.000 = 413,23. VPL positivo: o projeto remunera acima da taxa mínima." },
      ],
    }),
    escolha({
      id: "decisao-vpl",
      titulo: "Decidindo pelo VPL",
      instrucao: "Com VPL positivo, qual é a decisão em geral recomendada?",
      opcoes: ["Aceitar o projeto, pois ele cria valor acima do exigido.", "Rejeitar o projeto.", "Esperar sem fazer nada.", "O VPL não serve para decidir."],
      correta: 0,
      explicacao: "VPL positivo: o projeto rende mais do que a taxa mínima exigida; VPL negativo: rende menos.",
    }),
    escolha({
      id: "tir",
      titulo: "Interpretando a TIR",
      cenario: "No projeto anterior o VPL a 10% ao ano é positivo.",
      instrucao: "O que isso diz sobre a taxa interna de retorno (TIR)?",
      opcoes: [
        "A TIR é menor que 10%.",
        "A TIR é maior que 10%: a taxa que zera o VPL fica acima da exigida.",
        "A TIR é exatamente zero.",
        "Não há relação.",
      ],
      correta: 1,
      explicacao: "A TIR é a taxa que torna o VPL igual a zero. Se o VPL é positivo a 10%, a TIR passa de 10% (neste caso, cerca de 13%).",
    }),
    calculos({
      id: "payback",
      titulo: "Payback simples",
      cenario: "O mesmo projeto investiu R$ 10.000,00 e devolve R$ 6.000,00 por ano.",
      instrucao: "Em quanto tempo o investimento se paga (payback)? Calcule o saldo a recuperar após o ano 1 e o payback em anos.",
      campos: [
        { id: "saldo", rotulo: "Falta recuperar após o ano 1 (R$)", esperado: 4000, explicacao: "10.000 − 6.000 = 4.000." },
        { id: "payback", rotulo: "Payback (anos)", esperado: 1.67, tolerancia: 0.02, explicacao: "1 ano + 4.000 ÷ 6.000 ≈ 1,67 ano (cerca de 1 ano e 8 meses)." },
      ],
    }),
    associar({
      id: "indicadores",
      titulo: "O que cada indicador responde",
      instrucao: "Associe cada indicador à pergunta que ele responde.",
      opcoes: [
        "Quanto valor o projeto cria, em reais de hoje?",
        "Qual taxa de retorno o projeto entrega?",
        "Em quanto tempo recupero o investimento?",
      ],
      linhas: [
        { id: "vpl", rotulo: "VPL", correta: 0 },
        { id: "tir", rotulo: "TIR", correta: 1 },
        { id: "payback", rotulo: "Payback", correta: 2 },
      ],
      explicacao: "Os três se complementam: VPL (valor), TIR (taxa) e payback (tempo e risco de liquidez).",
    }),
    resposta({
      id: "limite-payback",
      titulo: "Limite do payback",
      instrucao: "Explique uma limitação do payback simples como único critério para decidir um investimento.",
      rotulo: "Sua explicação",
      placeholder: "O payback simples ignora o valor do dinheiro no tempo e o que acontece depois de recuperado...",
      chave: /(tempo|valor|ignora|depois|taxa|lucro|futuro|desconta)/i,
    }),
  ],
};

export default atividade;
