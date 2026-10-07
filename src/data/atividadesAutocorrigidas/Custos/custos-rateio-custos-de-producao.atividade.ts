import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculos, resposta, planilha, dissertativa, somar } from "../ajudantes";

const PRODUTOS = [
  ["Mesa", 120, 28000, 400],
  ["Cadeira", 200, 31000, 500],
  ["Armário", 80, 22000, 100],
];
const TOTAL_HORAS = somar(PRODUTOS.map((l) => l[1] as number));
const TAXA = 48000 / TOTAL_HORAS;
const RATEIO = PRODUTOS.map((l) => (l[1] as number) * TAXA);

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Custos — Rateio dos Custos de Produção",
  introducao:
    "Custos indiretos servem a vários produtos ao mesmo tempo. O rateio distribui esses custos por um critério justo para que cada produto tenha o seu custo real. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    escolha({
      id: "por-que",
      titulo: "Por que ratear",
      instrucao: "Por que é necessário ratear os custos indiretos?",
      opcoes: [
        "Porque não se pode saber quanto custou nada.",
        "Porque eles não podem ser ligados diretamente a um produto e precisam ser distribuídos por um critério.",
        "Porque o fisco proíbe cálculos exatos.",
        "Porque eles só existem em empresas grandes.",
      ],
      correta: 1,
      explicacao: "Sem rateio, o custo dos produtos ficaria incompleto e o preço de venda, subestimado.",
    }),
    calculos({
      id: "rateio-horas",
      titulo: "Rateio por horas-máquina",
      cenario: "Os custos indiretos do mês somam R$ 30.000,00. O produto A usou 200 horas-máquina e o produto B usou 300 horas-máquina.",
      instrucao: "Calcule a parte de cada produto e o valor por hora-máquina.",
      campos: [
        { id: "taxa", rotulo: "Custo indireto por hora-máquina (R$)", esperado: 60, explicacao: "30.000 ÷ (200 + 300) = 60." },
        { id: "produto-a", rotulo: "Parte do produto A (R$)", esperado: 12000, explicacao: "200 × 60 = 12.000." },
        { id: "produto-b", rotulo: "Parte do produto B (R$)", esperado: 18000, explicacao: "300 × 60 = 18.000." },
      ],
    }),
    calculos({
      id: "custo-unitario",
      titulo: "Custo unitário completo",
      cenario: "O produto A teve custos diretos de R$ 20.000,00 e foram produzidas 400 unidades. A parte dos custos indiretos que lhe cabe é R$ 12.000,00.",
      instrucao: "Calcule o custo total do produto A e o custo por unidade.",
      campos: [
        { id: "total", rotulo: "Custo total de A (R$)", esperado: 32000, explicacao: "20.000 + 12.000 = 32.000." },
        { id: "unitario", rotulo: "Custo por unidade (R$)", esperado: 80, explicacao: "32.000 ÷ 400 = 80." },
      ],
    }),
    resposta({
      id: "outro-criterio",
      titulo: "Escolha um critério",
      cenario: "O aluguel de um galpão é dividido entre três linhas de produção que ocupam áreas diferentes.",
      instrucao: "Sugira o critério de rateio do aluguel e explique por quê.",
      rotulo: "Seu critério",
      placeholder: "Metros quadrados ocupados por cada linha, porque o aluguel depende do espaço usado...",
      chave: /(metro|[aá]rea|espa[cç]o|m²|ocup)/i,
    }),
    planilha({
      id: "rateio-fabrica",
      titulo: "Planilha: rateio dos custos indiretos entre três produtos",
      cenario: "Os custos indiretos de fabricação do mês somam R$ 48.000,00 e serão rateados pelas horas-máquina de cada produto. Cole a planilha no Excel e crie as colunas Rateio e Custo por unidade.",
      colunas: ["Produto", "Horas-máquina", "Custos diretos (R$)", "Unidades produzidas"],
      linhas: PRODUTOS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "taxa", rotulo: "Custo indireto por hora-máquina (R$)", valor: TAXA, explicacao: "48.000 ÷ 400 horas = 120." },
        { id: "rateio-cadeira", rotulo: "Custo indireto atribuído à Cadeira (R$)", valor: RATEIO[1], explicacao: "200 horas × 120 = 24.000." },
        { id: "unitario-cadeira", rotulo: "Custo por unidade da Cadeira (R$)", valor: (31000 + RATEIO[1]) / 500, explicacao: "(31.000 + 24.000) ÷ 500 = 110." },
        { id: "unitario-armario", rotulo: "Custo por unidade do Armário (R$)", valor: (22000 + RATEIO[2]) / 100, explicacao: "(22.000 + 9.600) ÷ 100 = 316." },
      ],
    }),
    dissertativa({
      id: "critico-do-criterio",
      titulo: "O critério de rateio é justo?",
      instrucao: "Discuta o critério de rateio por horas-máquina usado na planilha.",
      deve: [
        "Explique por que as horas-máquina são um critério razoável aqui.",
        "Mostre como o custo unitário do Armário muda se o rateio fosse feito por número de unidades (1.000 unidades no total) em vez de horas-máquina.",
        "Diga qual critério seria melhor para ratear o aluguel do galpão e por quê.",
      ],
      chave: /(hora|m[aá]quina|unidade|crit[eé]rio|aluguel|[aá]rea|m²|justo|rateio)/i,
    }),
  ],
};

export default atividade;
