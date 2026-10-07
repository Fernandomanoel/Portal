import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculos, associar, resposta, planilha, dissertativa } from "../ajudantes";

const CENARIOS = [
  ["Base", 3000, 50, 30, 40000],
  ["Vendas +10%", 3300, 50, 30, 40000],
  ["Vendas −10%", 2700, 50, 30, 40000],
];
const lucro = (l: (string | number)[]) => ((l[2] as number) - (l[3] as number)) * (l[1] as number) - (l[4] as number);

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Custos — Alavancagem Operacional e Financeira",
  introducao:
    "Alavancagem mostra o quanto uma variação nas vendas é ampliada no lucro. Com muitos custos fixos, o lucro cresce rápido, mas também cai rápido. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
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
    planilha({
      id: "cenarios-de-vendas",
      titulo: "Planilha: três cenários de vendas",
      cenario: "Uma empresa projeta o lucro operacional em três cenários de volume. Lucro operacional = (preço − custo variável) × unidades − custos fixos. Cole a planilha no Excel e resolva.",
      colunas: ["Cenário", "Unidades vendidas", "Preço (R$)", "Custo variável unitário (R$)", "Custos fixos (R$)"],
      linhas: CENARIOS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "lucro-base", rotulo: "Lucro operacional no cenário base (R$)", valor: lucro(CENARIOS[0]), explicacao: "(50 − 30) × 3.000 − 40.000 = 20.000." },
        { id: "lucro-alta", rotulo: "Lucro operacional com vendas +10% (R$)", valor: lucro(CENARIOS[1]), explicacao: "(50 − 30) × 3.300 − 40.000 = 26.000." },
        { id: "variacao-lucro", rotulo: "Variação percentual do lucro com vendas −10% (%)", valor: ((lucro(CENARIOS[2]) - lucro(CENARIOS[0])) / lucro(CENARIOS[0])) * 100, explicacao: "Lucro de 14.000 contra 20.000: queda de 30% para uma queda de 10% nas vendas." },
        { id: "gao", rotulo: "Grau de alavancagem operacional no cenário base", valor: (20 * 3000) / lucro(CENARIOS[0]), explicacao: "Margem de contribuição (60.000) ÷ lucro operacional (20.000) = 3." },
      ],
    }),
    dissertativa({
      id: "estrutura-de-custos",
      titulo: "Decisão sobre a estrutura de custos",
      cenario: "A diretoria avalia trocar a máquina atual por outra que reduz o custo variável, mas aumenta os custos fixos.",
      instrucao: "Escreva um parecer com base na alavancagem operacional.",
      deve: [
        "Explique como o GAO ajuda a prever o efeito de uma variação nas vendas sobre o lucro.",
        "Diga quando a troca vale a pena (vendas estáveis e em crescimento) e quando é arriscada (vendas incertas).",
        "Cite uma medida para reduzir o risco, como contratos de volume mínimo ou custos fixos flexíveis.",
      ],
      chave: /(gao|alavanc|fixo|vari[aá]vel|vendas|risco|lucro|est[aá]vel|incerta)/i,
    }),
  ],
};

export default atividade;
