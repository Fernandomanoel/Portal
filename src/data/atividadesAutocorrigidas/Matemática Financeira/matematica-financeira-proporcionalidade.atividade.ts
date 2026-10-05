import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { calculo, calculos, escolha, associar } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Matemática Financeira — Proporcionalidade e Grandezas Proporcionais",
  introducao:
    "Regra de três e divisão proporcional estão por trás de preços, cotações e rateio de lucros. Revise a ideia de proporção e resolva problemas do dia a dia.",
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
  ],
};

export default atividade;
