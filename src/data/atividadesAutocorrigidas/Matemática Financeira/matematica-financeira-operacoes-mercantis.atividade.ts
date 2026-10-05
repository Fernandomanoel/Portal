import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculo, calculos, escolha } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Matemática Financeira — Operações Mercantis",
  introducao:
    "Comprar e vender gera lucro ou prejuízo. Calcule o resultado sobre o custo e sobre a venda e forme preços a partir da margem desejada.",
  itens: [
    calculos({
      id: "lucro",
      titulo: "Lucro sobre o custo e sobre a venda",
      cenario: "Uma loja comprou um produto por R$ 80,00 e o vendeu por R$ 100,00.",
      instrucao: "Calcule o lucro em reais, o lucro sobre o custo (%) e o lucro sobre a venda (%).",
      campos: [
        { id: "lucro-reais", rotulo: "Lucro (R$)", esperado: 20, explicacao: "100 − 80 = 20." },
        { id: "sobre-custo", rotulo: "Lucro sobre o custo (%)", esperado: 25, explicacao: "20 ÷ 80 = 25%." },
        { id: "sobre-venda", rotulo: "Lucro sobre a venda (%)", esperado: 20, explicacao: "20 ÷ 100 = 20%." },
      ],
    }),
    calculo({
      id: "preco-por-margem",
      titulo: "Preço para uma margem sobre a venda",
      cenario: "O custo de um produto é R$ 70,00 e a empresa quer lucro de 30% sobre o preço de venda.",
      instrucao: "Qual deve ser o preço de venda?",
      rotulo: "Preço de venda (R$)",
      esperado: 100,
      explicacao: "O custo representa 70% do preço (100% − 30%): 70 ÷ 0,70 = 100.",
    }),
    calculo({
      id: "preco-por-custo",
      titulo: "Preço para uma margem sobre o custo",
      cenario: "Um produto custa R$ 80,00 e será vendido com lucro de 40% sobre o custo.",
      instrucao: "Qual é o preço de venda?",
      rotulo: "Preço de venda (R$)",
      esperado: 112,
      explicacao: "80 × 1,40 = 112.",
    }),
    calculos({
      id: "prejuizo",
      titulo: "Venda com prejuízo",
      cenario: "Uma mercadoria comprada por R$ 250,00 foi vendida em liquidação por R$ 200,00.",
      instrucao: "Calcule o prejuízo em reais e o prejuízo sobre o custo (%).",
      campos: [
        { id: "prejuizo-reais", rotulo: "Prejuízo (R$)", esperado: 50, explicacao: "250 − 200 = 50." },
        { id: "sobre-custo", rotulo: "Prejuízo sobre o custo (%)", esperado: 20, explicacao: "50 ÷ 250 = 20%." },
      ],
    }),
    associar({
      id: "termos",
      titulo: "Termos das operações mercantis",
      instrucao: "Associe cada termo ao seu significado.",
      opcoes: ["Preço de custo", "Preço de venda", "Desconto", "Comissão"],
      linhas: [
        { id: "custo", rotulo: "O que a loja pagou pela mercadoria.", correta: 0 },
        { id: "venda", rotulo: "O que o cliente paga pela mercadoria.", correta: 1 },
        { id: "desconto", rotulo: "Redução concedida sobre o preço de venda.", correta: 2 },
        { id: "comissao", rotulo: "Percentual pago ao vendedor sobre a venda.", correta: 3 },
      ],
      explicacao: "Dominar o vocabulário evita confundir o custo, o preço e as parcelas que reduzem o resultado.",
    }),
    escolha({
      id: "margem-markup",
      titulo: "Margem não é markup",
      instrucao: "Um lucro de 25% sobre o custo é igual a um lucro de 25% sobre a venda?",
      opcoes: [
        "Sim, são iguais.",
        "Não: 25% sobre o custo equivale a 20% sobre a venda; a base de cálculo é diferente.",
        "Sim, nos dois casos é 25%.",
        "Não: 25% sobre o custo equivale a 50% sobre a venda.",
      ],
      correta: 1,
      explicacao: "A base muda o percentual: 20 de lucro é 25% de 80 (custo), mas só 20% de 100 (venda).",
    }),
  ],
};

export default atividade;
