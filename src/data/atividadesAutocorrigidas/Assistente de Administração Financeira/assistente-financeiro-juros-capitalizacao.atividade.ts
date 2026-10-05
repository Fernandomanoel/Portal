import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculos, associar, planilha, dissertativa } from "../ajudantes";

const APLICACOES = [
  ["A", 3000, 2, 6, "Simples"],
  ["B", 3000, 2, 6, "Composta"],
  ["C", 8000, 1.5, 10, "Composta"],
  ["D", 8000, 1.5, 10, "Simples"],
];
const montante = (l: (string | number)[]) => {
  const [, c, i, n, regime] = l as [string, number, number, number, string];
  return regime === "Simples" ? c * (1 + (i / 100) * n) : c * (1 + i / 100) ** n;
};

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Administração Financeira — Juros e Sistemas de Capitalização",
  introducao:
    "Juros são o preço do dinheiro no tempo. Compare a capitalização simples e a composta, calcule montantes e reconheça cada sistema. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
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
    planilha({
      id: "comparar-aplicacoes",
      titulo: "Planilha: quatro aplicações para comparar",
      cenario: "O financeiro precisa decidir onde aplicar o caixa excedente. Cole a planilha no Excel e calcule o montante de cada aplicação (juros simples: =C*(1+i*n); compostos: =C*(1+i)^n, ou use a função VF).",
      colunas: ["Aplicação", "Capital (R$)", "Taxa ao mês (%)", "Meses", "Regime"],
      linhas: APLICACOES,
      instrucao: "Calcule os montantes e a diferença:",
      tarefas: [
        { id: "montante-a", rotulo: "Montante da aplicação A (R$)", valor: montante(APLICACOES[0]), explicacao: "3.000 × (1 + 0,02 × 6) em juros simples." },
        { id: "montante-b", rotulo: "Montante da aplicação B (R$)", valor: montante(APLICACOES[1]), explicacao: "3.000 × 1,02⁶ em juros compostos." },
        { id: "montante-c", rotulo: "Montante da aplicação C (R$)", valor: montante(APLICACOES[2]), explicacao: "8.000 × 1,015¹⁰ em juros compostos." },
        { id: "diferenca-cd", rotulo: "Quanto C rende a mais que D (R$)", valor: montante(APLICACOES[2]) - montante(APLICACOES[3]), explicacao: "Mesmo capital, taxa e prazo: a diferença é o efeito de juros sobre juros." },
      ],
    }),
    dissertativa({
      id: "recomendacao-aplicacao",
      titulo: "Qual aplicação recomendar",
      instrucao: "Escreva uma recomendação ao gestor com base nos montantes calculados.",
      deve: [
        "Explique por que o regime composto rendeu mais que o simples nas mesmas condições.",
        "Diga em que situação a diferença entre os dois regimes fica maior (prazo, taxa).",
        "Cite um cuidado antes de aplicar (liquidez, risco, imposto, prazo de resgate).",
      ],
      chave: /(juros sobre juros|composto|simples|prazo|taxa|liquidez|risco|resgate)/i,
    }),
  ],
};

export default atividade;
