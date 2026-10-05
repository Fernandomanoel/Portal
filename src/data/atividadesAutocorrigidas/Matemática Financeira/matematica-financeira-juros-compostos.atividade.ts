import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculo, calculos, planilha, dissertativa } from "../ajudantes";

const CARTEIRA = [
  ["Reserva de emergência", 15000, 0.9, 12],
  ["Fundo de equipamentos", 30000, 1.1, 24],
  ["Capital de giro", 8000, 1.4, 6],
  ["Viagem de formatura", 4000, 0.8, 18],
];
const VF = (l: (string | number)[]) => (l[1] as number) * (1 + (l[2] as number) / 100) ** (l[3] as number);

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Matemática Financeira — Juros Compostos",
  introducao:
    "Nos juros compostos, os juros de cada período entram na base do período seguinte. Calcule montante, valor presente e taxa a partir da fórmula M = C·(1 + i)ⁿ. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
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
    planilha({
      id: "carteira-de-aplicacoes",
      titulo: "Planilha: carteira de aplicações em juros compostos",
      cenario: "Uma empresa mantém quatro aplicações a juros compostos, cada uma com sua taxa ao mês e seu prazo. Cole a planilha no Excel e use a função VF (=VF(taxa; meses; 0; -capital)) ou a fórmula =C*(1+i)^n.",
      colunas: ["Aplicação", "Capital (R$)", "Taxa ao mês (%)", "Prazo (meses)"],
      linhas: CARTEIRA,
      instrucao: "Calcule:",
      tarefas: [
        { id: "montante-reserva", rotulo: "Montante da Reserva de emergência (R$)", valor: VF(CARTEIRA[0]), explicacao: "15.000 × 1,009¹²." },
        { id: "montante-equipamentos", rotulo: "Montante do Fundo de equipamentos (R$)", valor: VF(CARTEIRA[1]), explicacao: "30.000 × 1,011²⁴." },
        { id: "juros-giro", rotulo: "Juros ganhos pelo Capital de giro (R$)", valor: VF(CARTEIRA[2]) - 8000, explicacao: "8.000 × 1,014⁶ − 8.000." },
        { id: "valor-presente", rotulo: "Quanto aplicar hoje a 1,0% ao mês para ter R$ 20.000,00 em 12 meses (R$)", valor: 20000 / 1.01 ** 12, explicacao: "Valor presente = 20.000 ÷ 1,01¹² ≈ 17.748,98." },
      ],
    }),
    dissertativa({
      id: "tempo-e-juros",
      titulo: "O tempo e os juros sobre juros",
      instrucao: "Explique, com base na carteira, por que o prazo pesa tanto nos juros compostos.",
      deve: [
        "Compare o rendimento percentual total do Fundo de equipamentos (24 meses) com o do Capital de giro (6 meses).",
        "Explique a ideia de juros sobre juros em suas palavras.",
        "Dê um conselho para quem quer juntar dinheiro: começar cedo ou aplicar mais, e por quê.",
      ],
      chave: /(composto|juros sobre juros|prazo|tempo|taxa|rendimento|cedo|mont)/i,
    }),
  ],
};

export default atividade;
