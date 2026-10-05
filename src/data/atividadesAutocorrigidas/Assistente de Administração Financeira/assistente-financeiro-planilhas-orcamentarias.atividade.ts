import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { calculo, calculos, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Administração Financeira — Construindo Planilhas Orçamentárias",
  introducao:
    "O orçamento é a previsão de receitas e despesas de um período. Monte e leia um orçamento mensal, use as fórmulas de planilha e compare o previsto com o realizado.",
  itens: [
    escolha({
      id: "conceito",
      titulo: "Para que serve o orçamento",
      instrucao: "Qual é a função principal de uma planilha orçamentária?",
      opcoes: [
        "Registrar o que já aconteceu, sem olhar para o futuro.",
        "Prever receitas e despesas de um período para planejar e depois comparar com o que realmente ocorreu.",
        "Substituir o extrato bancário.",
        "Calcular apenas os impostos da empresa.",
      ],
      correta: 1,
      explicacao: "O orçamento é um plano em números: ele orienta as decisões e vira régua para medir o resultado.",
    }),
    calculos({
      id: "orcamento-mensal",
      titulo: "Orçamento de janeiro",
      cenario: "Uma pequena loja prevê, para janeiro, a receita e as despesas da tabela abaixo.",
      tabela: {
        colunas: ["Conta", "Valor previsto (R$)"],
        linhas: [
          ["Receita de vendas", "18.000,00"],
          ["Aluguel", "3.500,00"],
          ["Salários", "7.200,00"],
          ["Energia e água", "650,00"],
          ["Marketing", "1.200,00"],
          ["Outras despesas", "950,00"],
        ],
      },
      instrucao: "Calcule o total das despesas, o resultado previsto (receita menos despesas) e a margem do resultado sobre a receita (em %).",
      campos: [
        { id: "despesas", rotulo: "Total das despesas (R$)", esperado: 13500, explicacao: "3.500 + 7.200 + 650 + 1.200 + 950 = 13.500." },
        { id: "resultado", rotulo: "Resultado previsto (R$)", esperado: 4500, explicacao: "18.000 − 13.500 = 4.500." },
        { id: "margem", rotulo: "Margem sobre a receita (%)", esperado: 25, explicacao: "4.500 ÷ 18.000 = 0,25, ou seja, 25%." },
      ],
    }),
    escolha({
      id: "formula-soma",
      titulo: "Fórmula de soma na planilha",
      cenario: "As despesas estão nas células B3 até B7 e o total deve aparecer em B8.",
      instrucao: "Qual fórmula calcula o total corretamente?",
      opcoes: ["=B3+B7", "=SOMA(B3:B7)", "=SOMA(B3;B7;B8)", "=TOTAL(B3-B7)"],
      correta: 1,
      explicacao: "SOMA(B3:B7) soma todas as células do intervalo de B3 até B7. As outras opções somam só as pontas ou não existem.",
    }),
    calculo({
      id: "variacao",
      titulo: "Orçado x realizado",
      cenario: "O total de despesas orçado era R$ 13.500,00, mas as despesas realizadas no mês foram R$ 14.175,00.",
      instrucao: "De quantos por cento foi a variação das despesas em relação ao orçado?",
      rotulo: "Variação (%)",
      esperado: 5,
      explicacao: "A diferença é 675 (14.175 − 13.500) e 675 ÷ 13.500 = 0,05, ou 5% acima do orçado.",
    }),
    resposta({
      id: "por-que-comparar",
      titulo: "Por que comparar orçado e realizado",
      instrucao: "Explique por que o assistente financeiro precisa comparar todo mês o valor orçado com o realizado.",
      rotulo: "Sua explicação",
      placeholder: "Ex.: Para descobrir desvios cedo, entender a causa e corrigir o rumo...",
      chave: /(desvio|diferen|varia|corrig|ajust|control|planej)/i,
    }),
  ],
};

export default atividade;
