import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { calculos, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Custos — Rateio dos Custos de Produção",
  introducao:
    "Custos indiretos servem a vários produtos ao mesmo tempo. O rateio distribui esses custos por um critério justo para que cada produto tenha o seu custo real.",
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
    escolha({
      id: "criterio",
      titulo: "Escolhendo o critério",
      cenario: "Uma indústria produz dois produtos em máquinas, e o produto B usa muito mais tempo de máquina que o A. O custo a ratear é a energia elétrica das máquinas.",
      instrucao: "Qual é o critério de rateio mais adequado?",
      opcoes: ["Horas-máquina de cada produto.", "Nome dos produtos.", "Número de funcionários do RH.", "Cor das embalagens."],
      correta: 0,
      explicacao: "O critério deve refletir a causa do custo: a energia é consumida pelo tempo que as máquinas trabalham.",
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
  ],
};

export default atividade;
