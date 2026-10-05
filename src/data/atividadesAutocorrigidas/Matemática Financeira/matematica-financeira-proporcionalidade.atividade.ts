import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculo, calculos, associar, planilha, dissertativa, somar } from "../ajudantes";

const SOCIOS = [
  ["Ana", 40000, 12],
  ["Bruno", 25000, 8],
  ["Carla", 15000, 6],
];
const LUCRO = 24000;
const CAPITAL = somar(SOCIOS.map((l) => l[1] as number));
const PESOS = SOCIOS.map((l) => (l[1] as number) * (l[2] as number));
const PESO_TOTAL = somar(PESOS);

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Matemática Financeira — Proporcionalidade e Grandezas Proporcionais",
  introducao:
    "Regra de três e divisão proporcional estão por trás de preços, cotações e rateio de lucros. Revise a ideia de proporção e resolva problemas do dia a dia. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    associar({
      id: "tipo-grandeza",
      titulo: "Direta ou inversa",
      instrucao: "Classifique a relação entre as grandezas.",
      opcoes: ["Diretamente proporcionais", "Inversamente proporcionais"],
      linhas: [
        { id: "preco-quantidade", rotulo: "Quantidade de canetas compradas e valor a pagar.", correta: 0 },
        { id: "operarios-dias", rotulo: "Número de operários e dias para terminar uma obra.", correta: 1 },
        { id: "velocidade-tempo", rotulo: "Velocidade do carro e tempo para fazer o mesmo percurso.", correta: 1 },
        { id: "consumo-distancia", rotulo: "Distância percorrida e combustível gasto (mesmo consumo médio).", correta: 0 },
      ],
      explicacao: "Se uma sobe e a outra sobe na mesma razão, é direta; se uma sobe e a outra cai, é inversa.",
    }),
    calculo({
      id: "regra-tres-direta",
      titulo: "Regra de três simples (direta)",
      cenario: "12 canetas custam R$ 30,00.",
      instrucao: "Quanto custam 20 canetas, mantido o preço unitário?",
      rotulo: "Valor (R$)",
      esperado: 50,
      explicacao: "30 ÷ 12 = 2,50 por caneta; 2,50 × 20 = 50.",
    }),
    calculo({
      id: "regra-tres-inversa",
      titulo: "Regra de três simples (inversa)",
      cenario: "4 operários terminam um serviço em 6 dias, trabalhando no mesmo ritmo.",
      instrucao: "Em quantos dias 3 operários terminariam o mesmo serviço?",
      rotulo: "Dias",
      esperado: 8,
      tolerancia: 0,
      explicacao: "Menos operários, mais dias: 4 × 6 = 24 operário-dia; 24 ÷ 3 = 8 dias.",
    }),
    calculos({
      id: "divisao-proporcional",
      titulo: "Divisão proporcional do lucro",
      cenario: "Três sócios investiram, respectivamente, R$ 30.000,00, R$ 20.000,00 e R$ 10.000,00. O lucro do ano foi R$ 12.000,00 e deve ser dividido proporcionalmente ao capital de cada um.",
      instrucao: "Quanto cada sócio recebe?",
      campos: [
        { id: "socio-1", rotulo: "Sócio 1 (R$)", esperado: 6000, explicacao: "Capital total 60.000; 30.000 ÷ 60.000 = 1/2 do lucro: 6.000." },
        { id: "socio-2", rotulo: "Sócio 2 (R$)", esperado: 4000, explicacao: "20.000 ÷ 60.000 = 1/3 do lucro: 4.000." },
        { id: "socio-3", rotulo: "Sócio 3 (R$)", esperado: 2000, explicacao: "10.000 ÷ 60.000 = 1/6 do lucro: 2.000." },
      ],
    }),
    escolha({
      id: "escala",
      titulo: "Câmbio como proporção",
      cenario: "Se US$ 1,00 vale R$ 5,00, então o câmbio é uma relação de proporcionalidade direta.",
      instrucao: "Quantos reais valem US$ 250,00?",
      opcoes: ["R$ 50,00", "R$ 250,00", "R$ 1.250,00", "R$ 2.500,00"],
      correta: 2,
      explicacao: "250 × 5 = 1.250 reais.",
    }),
    planilha({
      id: "divisao-do-lucro",
      titulo: "Planilha: divisão do lucro de uma sociedade",
      cenario: "Três sócios abriram uma empresa e o lucro do ano foi R$ 24.000,00. A divisão pode ser proporcional só ao capital investido ou ao capital multiplicado pelo tempo de permanência na sociedade. Cole a planilha no Excel e resolva.",
      colunas: ["Sócio", "Capital investido (R$)", "Meses na sociedade"],
      linhas: SOCIOS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "ana-capital", rotulo: "Parte da Ana, proporcional só ao capital (R$)", valor: (LUCRO * 40000) / CAPITAL, explicacao: "40.000 ÷ 80.000 = 1/2 de 24.000 = 12.000." },
        { id: "carla-capital", rotulo: "Parte da Carla, proporcional só ao capital (R$)", valor: (LUCRO * 15000) / CAPITAL, explicacao: "15.000 ÷ 80.000 × 24.000 = 4.500." },
        { id: "ana-tempo", rotulo: "Parte da Ana, proporcional a capital × meses (R$)", valor: (LUCRO * PESOS[0]) / PESO_TOTAL, explicacao: "480.000 ÷ 770.000 × 24.000 ≈ 14.961,04." },
        { id: "bruno-tempo", rotulo: "Parte do Bruno, proporcional a capital × meses (R$)", valor: (LUCRO * PESOS[1]) / PESO_TOTAL, explicacao: "200.000 ÷ 770.000 × 24.000 ≈ 6.233,77." },
      ],
    }),
    dissertativa({
      id: "criterio-de-divisao",
      titulo: "Qual divisão é mais justa",
      instrucao: "Compare as duas formas de dividir o lucro e escreva o que você proporia aos sócios.",
      deve: [
        "Mostre, com os números da planilha, como a parte de cada sócio muda de um critério para o outro.",
        "Explique quem ganha e quem perde com a inclusão do tempo de permanência.",
        "Diga que critério adotaria no contrato social e por quê.",
      ],
      chave: /(capital|tempo|meses|proporcional|justo|crit[eé]rio|contrato|s[oó]cio)/i,
    }),
  ],
};

export default atividade;
