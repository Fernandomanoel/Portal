import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { calculo, calculos, escolha } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Matemática Financeira — Juros Compostos",
  introducao:
    "Nos juros compostos, os juros de cada período entram na base do período seguinte. Calcule montante, valor presente e taxa a partir da fórmula M = C·(1 + i)ⁿ.",
  itens: [
    calculos({
      id: "montante",
      titulo: "Montante composto",
      cenario: "Um capital de R$ 10.000,00 foi aplicado a 1,5% ao mês, juros compostos, por 4 meses. (Use 1,015⁴ ≈ 1,061364.)",
      instrucao: "Calcule o montante e os juros ganhos (arredonde em centavos).",
      campos: [
        { id: "montante", rotulo: "Montante (R$)", esperado: 10613.64, explicacao: "10.000 × 1,061364 = 10.613,64." },
        { id: "juros", rotulo: "Juros (R$)", esperado: 613.64, explicacao: "10.613,64 − 10.000 = 613,64." },
      ],
    }),
    calculo({
      id: "valor-presente",
      titulo: "Valor presente",
      cenario: "Quanto é preciso aplicar hoje, a 10% ao mês em juros compostos, para ter R$ 12.100,00 daqui a 2 meses?",
      instrucao: "Calcule o valor presente (C = M ÷ (1 + i)ⁿ).",
      rotulo: "Valor presente (R$)",
      esperado: 10000,
      explicacao: "12.100 ÷ 1,10² = 12.100 ÷ 1,21 = 10.000.",
    }),
    calculo({
      id: "taxa",
      titulo: "Descobrindo a taxa",
      cenario: "R$ 1.000,00 viraram R$ 1.210,00 em 2 meses, a juros compostos.",
      instrucao: "Qual foi a taxa mensal, em %?",
      rotulo: "Taxa ao mês (%)",
      esperado: 10,
      explicacao: "(1.210 ÷ 1.000)^(1/2) = 1,10: 10% ao mês.",
    }),
    escolha({
      id: "comparacao",
      titulo: "Simples x composto no tempo",
      instrucao: "Em quanto tempo o regime composto passa a render mais que o simples, para a mesma taxa?",
      opcoes: [
        "Já no primeiro período, os dois são iguais.",
        "A partir do segundo período, porque os juros passam a render juros; no primeiro período os dois são iguais.",
        "Nunca.",
        "Só depois de 10 anos.",
      ],
      correta: 1,
      explicacao: "No primeiro período os dois dão o mesmo valor; do segundo em diante o composto se afasta cada vez mais.",
    }),
    calculos({
      id: "dobrar",
      titulo: "Dinheiro dobrando",
      cenario: "Aplicando R$ 1.000,00 a 10% ao ano em juros compostos, veja como o valor cresce. (1,10² = 1,21; 1,10³ = 1,331.)",
      instrucao: "Calcule o montante em 2 anos e em 3 anos.",
      campos: [
        { id: "dois-anos", rotulo: "Montante em 2 anos (R$)", esperado: 1210, explicacao: "1.000 × 1,21 = 1.210." },
        { id: "tres-anos", rotulo: "Montante em 3 anos (R$)", esperado: 1331, explicacao: "1.000 × 1,331 = 1.331." },
      ],
    }),
  ],
};

export default atividade;
