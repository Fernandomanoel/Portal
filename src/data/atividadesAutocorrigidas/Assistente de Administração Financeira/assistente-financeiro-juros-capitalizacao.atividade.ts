import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculos, escolha } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Administração Financeira — Juros e Sistemas de Capitalização",
  introducao:
    "Juros são o preço do dinheiro no tempo. Compare a capitalização simples e a composta, calcule montantes e reconheça cada sistema.",
  itens: [
    escolha({
      id: "conceito",
      titulo: "Simples x composta",
      instrucao: "Qual afirmação diferencia corretamente os dois regimes?",
      opcoes: [
        "No simples os juros incidem sobre o capital mais os juros acumulados; no composto, só sobre o capital.",
        "No simples os juros incidem sempre sobre o capital inicial; no composto, sobre o capital mais os juros já acumulados.",
        "Os dois dão sempre o mesmo resultado.",
        "No composto os juros diminuem a cada período.",
      ],
      correta: 1,
      explicacao: "Juros compostos são «juros sobre juros»: a base de cálculo cresce a cada período.",
    }),
    calculos({
      id: "simples",
      titulo: "Juros simples",
      cenario: "Um capital de R$ 5.000,00 foi aplicado a 2% ao mês, juros simples, por 6 meses.",
      instrucao: "Calcule os juros e o montante.",
      campos: [
        { id: "juros", rotulo: "Juros (R$)", esperado: 600, explicacao: "J = C · i · n = 5.000 × 0,02 × 6 = 600." },
        { id: "montante", rotulo: "Montante (R$)", esperado: 5600, explicacao: "M = C + J = 5.000 + 600 = 5.600." },
      ],
    }),
    calculos({
      id: "composto",
      titulo: "Juros compostos",
      cenario: "O mesmo capital de R$ 5.000,00 foi aplicado a 2% ao mês, agora em juros compostos, por 3 meses.",
      instrucao: "Calcule o montante e os juros ganhos (arredonde para centavos).",
      campos: [
        { id: "montante", rotulo: "Montante (R$)", esperado: 5306.04, explicacao: "M = C · (1 + i)ⁿ = 5.000 × 1,02³ = 5.000 × 1,061208 = 5.306,04." },
        { id: "juros", rotulo: "Juros (R$)", esperado: 306.04, explicacao: "5.306,04 − 5.000 = 306,04." },
      ],
    }),
    associar({
      id: "reconhecer",
      titulo: "Reconhecendo o sistema",
      instrucao: "Associe cada característica ao sistema de capitalização.",
      opcoes: ["Capitalização simples", "Capitalização composta"],
      linhas: [
        { id: "linear", rotulo: "O valor dos juros é o mesmo em todos os períodos (crescimento linear).", correta: 0 },
        { id: "juros-sobre-juros", rotulo: "Há «juros sobre juros».", correta: 1 },
        { id: "formula-simples", rotulo: "M = C · (1 + i · n)", correta: 0 },
        { id: "formula-composta", rotulo: "M = C · (1 + i)ⁿ", correta: 1 },
      ],
      explicacao: "A fórmula e o formato do crescimento (reta ou curva) identificam o sistema.",
    }),
    calculos({
      id: "um-ano",
      titulo: "Doze meses de rendimento",
      cenario: "R$ 1.000,00 aplicados a 1% ao mês por 12 meses em juros compostos.",
      instrucao: "Qual é o montante? (Use 1,01¹² ≈ 1,126825.)",
      campos: [{ id: "montante", rotulo: "Montante (R$)", esperado: 1126.83, explicacao: "1.000 × 1,126825 = 1.126,83 (arredondado)." }],
    }),
    escolha({
      id: "qual-rende-mais",
      titulo: "Qual rende mais",
      instrucao: "Para o mesmo capital, mesma taxa e prazo maior que um período, qual regime rende mais?",
      opcoes: ["O simples.", "O composto.", "Rendem igual.", "Depende do banco, sempre."],
      correta: 1,
      explicacao: "Depois do primeiro período, o composto sempre rende mais, pois os juros também rendem juros.",
    }),
  ],
};

export default atividade;
