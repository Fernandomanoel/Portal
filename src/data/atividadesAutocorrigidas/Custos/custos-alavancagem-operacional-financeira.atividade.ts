import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculos, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Custos — Alavancagem Operacional e Financeira",
  introducao:
    "Alavancagem mostra o quanto uma variação nas vendas é ampliada no lucro. Com muitos custos fixos, o lucro cresce rápido, mas também cai rápido.",
  itens: [
    escolha({
      id: "conceito",
      titulo: "O que é alavancagem operacional",
      instrucao: "A alavancagem operacional mede...",
      opcoes: [
        "Quanto o lucro operacional varia, em %, para cada 1% de variação nas vendas, por causa dos custos fixos.",
        "O total de impostos pagos.",
        "O número de funcionários.",
        "O saldo do banco.",
      ],
      correta: 0,
      explicacao: "Custos fixos são «a alavanca»: quando as vendas sobem, eles não crescem, e o lucro sobe mais que proporcionalmente.",
    }),
    calculos({
      id: "gao",
      titulo: "Grau de alavancagem operacional (GAO)",
      cenario: "Uma empresa tem margem de contribuição de R$ 60.000,00 e lucro operacional de R$ 20.000,00.",
      instrucao: "Calcule o GAO (margem de contribuição ÷ lucro operacional) e o lucro operacional novo, se as vendas crescerem 10% (os custos fixos não mudam).",
      campos: [
        { id: "gao", rotulo: "GAO", esperado: 3, explicacao: "60.000 ÷ 20.000 = 3: cada 1% a mais nas vendas gera cerca de 3% a mais de lucro operacional." },
        { id: "lucro-novo", rotulo: "Lucro operacional com vendas +10% (R$)", esperado: 26000, explicacao: "A margem sobe 10%, para 66.000; 66.000 − 40.000 de custos fixos = 26.000 (30% a mais)." },
      ],
    }),
    escolha({
      id: "risco",
      titulo: "O outro lado da alavanca",
      instrucao: "O que acontece com o lucro de uma empresa com GAO alto se as vendas caírem?",
      opcoes: ["Cai pouco.", "Cai mais que proporcionalmente.", "Não muda.", "Sobe."],
      correta: 1,
      explicacao: "A alavancagem amplia ganhos e perdas: por isso um GAO alto significa maior risco quando a demanda cai.",
    }),
    calculos({
      id: "gaf",
      titulo: "Grau de alavancagem financeira (GAF)",
      cenario: "Considere o lucro operacional de R$ 20.000,00 e despesas financeiras (juros de dívidas) de R$ 5.000,00.",
      instrucao: "Calcule o lucro antes do imposto de renda (LAIR) e o GAF (lucro operacional ÷ LAIR).",
      campos: [
        { id: "lair", rotulo: "LAIR (R$)", esperado: 15000, explicacao: "20.000 − 5.000 = 15.000." },
        { id: "gaf", rotulo: "GAF", esperado: 1.33, tolerancia: 0.01, explicacao: "20.000 ÷ 15.000 ≈ 1,33: as dívidas amplificam as oscilações do lucro." },
      ],
    }),
    associar({
      id: "tipos",
      titulo: "Operacional ou financeira",
      instrucao: "Associe cada fator ao tipo de alavancagem que ele provoca.",
      opcoes: ["Alavancagem operacional", "Alavancagem financeira"],
      linhas: [
        { id: "custos-fixos", rotulo: "Altos custos fixos na produção.", correta: 0 },
        { id: "juros", rotulo: "Pagamento de juros de empréstimos.", correta: 1 },
        { id: "maquinas", rotulo: "Investimento em máquinas que aumentam os custos fixos.", correta: 0 },
        { id: "divida", rotulo: "Uso de capital de terceiros para financiar a empresa.", correta: 1 },
      ],
      explicacao: "A operacional vem da estrutura de custos; a financeira, da estrutura de capital (dívidas).",
    }),
    resposta({
      id: "decisao",
      titulo: "Aplicando a ideia",
      instrucao: "Uma empresa com vendas instáveis deve preferir uma estrutura com muitos custos fixos ou com mais custos variáveis? Justifique.",
      rotulo: "Sua resposta",
      placeholder: "Deve preferir custos variáveis, porque se as vendas caírem os custos também caem...",
      chave: /(vari[aá]vel|fixo|risco|queda|vendas|flexib)/i,
    }),
  ],
};

export default atividade;
