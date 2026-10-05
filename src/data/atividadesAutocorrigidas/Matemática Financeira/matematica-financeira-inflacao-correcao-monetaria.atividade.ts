import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculo, calculos, associar, planilha, dissertativa } from "../ajudantes";

const IPCA = [
  ["Janeiro", 0.42], ["Fevereiro", 0.83], ["Março", 0.71], ["Abril", 0.38],
  ["Maio", 0.44], ["Junho", 0.26], ["Julho", 0.3], ["Agosto", 0.19],
  ["Setembro", 0.4], ["Outubro", 0.44], ["Novembro", 0.39], ["Dezembro", 0.45],
];
const acumular = (taxas: number[]) => (taxas.reduce((f, t) => f * (1 + t / 100), 1) - 1) * 100;
const ANO = acumular(IPCA.map((l) => l[1] as number));
const SEMESTRE = acumular(IPCA.slice(0, 6).map((l) => l[1] as number));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Matemática Financeira — Taxas de Inflação e Correção Monetária",
  introducao:
    "A inflação reduz o poder de compra do dinheiro. Calcule a inflação acumulada, corrija valores e descubra o ganho real de um investimento. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    escolha({
      id: "conceito",
      titulo: "O que é inflação",
      instrucao: "O que significa uma inflação de 5% ao ano?",
      opcoes: [
        "Os preços, em média, subiram 5% em um ano, e o dinheiro compra menos.",
        "Os salários subiram 5%.",
        "O dólar caiu 5%.",
        "Os juros do banco subiram 5%.",
      ],
      correta: 0,
      explicacao: "Inflação é o aumento generalizado e contínuo dos preços, medido por índices como o IPCA.",
    }),
    calculo({
      id: "acumulada",
      titulo: "Inflação acumulada",
      cenario: "A inflação foi de 0,5% em janeiro, 0,4% em fevereiro e 0,3% em março.",
      instrucao: "Qual é a inflação acumulada no trimestre, em %? (Multiplique os fatores 1,005 × 1,004 × 1,003.)",
      rotulo: "Inflação acumulada (%)",
      esperado: 1.2,
      tolerancia: 0.02,
      explicacao: "1,005 × 1,004 × 1,003 ≈ 1,01205: cerca de 1,20%, um pouco acima da soma simples de 1,2%.",
    }),
    calculos({
      id: "correcao",
      titulo: "Correção monetária",
      cenario: "Um aluguel de R$ 2.000,00 será corrigido pela inflação de 12 meses, que foi de 4,5%.",
      instrucao: "Calcule o novo aluguel e o aumento em reais.",
      campos: [
        { id: "novo", rotulo: "Novo aluguel (R$)", esperado: 2090, explicacao: "2.000 × 1,045 = 2.090." },
        { id: "aumento", rotulo: "Aumento (R$)", esperado: 90, explicacao: "2.090 − 2.000 = 90." },
      ],
    }),
    calculo({
      id: "poder-de-compra",
      titulo: "Poder de compra",
      cenario: "Com inflação de 5% ao ano, R$ 100,00 guardados sem render nada perdem poder de compra.",
      instrucao: "Daqui a um ano, o poder de compra de R$ 100,00 equivale a quantos reais de hoje?",
      rotulo: "Valor em reais de hoje (R$)",
      esperado: 95.24,
      tolerancia: 0.02,
      explicacao: "100 ÷ 1,05 ≈ 95,24: o mesmo dinheiro compra cerca de 4,8% menos.",
    }),
    calculo({
      id: "taxa-real",
      titulo: "Ganho real",
      cenario: "Um investimento rendeu 12% no ano (taxa nominal), e a inflação do período foi 5%.",
      instrucao: "Qual foi o ganho real, em %? (Taxa real = (1 + nominal) ÷ (1 + inflação) − 1.)",
      rotulo: "Taxa real (%)",
      esperado: 6.67,
      tolerancia: 0.02,
      explicacao: "1,12 ÷ 1,05 − 1 ≈ 0,0667: 6,67% de ganho real, e não 7%.",
    }),
    associar({
      id: "indices",
      titulo: "Índices e taxas",
      instrucao: "Associe cada termo ao que ele representa.",
      opcoes: ["Taxa nominal", "Taxa real", "Taxa de inflação"],
      linhas: [
        { id: "nominal", rotulo: "O rendimento anunciado, sem descontar a inflação.", correta: 0 },
        { id: "real", rotulo: "O rendimento depois de descontada a inflação.", correta: 1 },
        { id: "inflacao", rotulo: "A variação média dos preços no período.", correta: 2 },
      ],
      explicacao: "Um investimento só aumenta o seu poder de compra se a taxa real for positiva.",
    }),
    planilha({
      id: "inflacao-do-ano",
      titulo: "Planilha: inflação mensal de um ano (dados ilustrativos)",
      cenario: "A tabela traz a inflação mensal de um ano, em dados ilustrativos feitos para o treino. A inflação acumulada se calcula multiplicando os fatores (1 + taxa) de cada mês. Cole a planilha no Excel e resolva.",
      colunas: ["Mês", "Inflação do mês (%)"],
      linhas: IPCA,
      instrucao: "Calcule:",
      tarefas: [
        { id: "semestre", rotulo: "Inflação acumulada no primeiro semestre (%)", valor: SEMESTRE, explicacao: "Produto dos fatores de janeiro a junho, menos 1." },
        { id: "ano", rotulo: "Inflação acumulada no ano (%)", valor: ANO, explicacao: "Produto dos 12 fatores, menos 1." },
        { id: "aluguel", rotulo: "Novo valor de um aluguel de R$ 2.400,00 corrigido pela inflação do ano (R$)", valor: 2400 * (1 + ANO / 100), explicacao: "2.400 × (1 + inflação acumulada)." },
        { id: "taxa-real", rotulo: "Ganho real de uma aplicação que rendeu 11% no ano (%)", valor: ((1.11 / (1 + ANO / 100)) - 1) * 100, explicacao: "1,11 ÷ (1 + inflação) − 1." },
      ],
    }),
    dissertativa({
      id: "inflacao-no-contrato",
      titulo: "Inflação nos contratos e nas aplicações",
      instrucao: "Explique como a inflação afeta a empresa e como ela se protege.",
      deve: [
        "Diga por que os contratos de aluguel e de serviços costumam ter cláusula de correção por índice.",
        "Explique a diferença entre taxa nominal e taxa real e por que a segunda importa para quem aplica.",
        "Dê um exemplo de como a inflação alta aperta o caixa de uma empresa e uma medida de proteção.",
      ],
      chave: /(infla|corre[cç][aã]o|[ií]ndice|real|nominal|poder de compra|contrato|caixa|aplica)/i,
    }),
  ],
};

export default atividade;
