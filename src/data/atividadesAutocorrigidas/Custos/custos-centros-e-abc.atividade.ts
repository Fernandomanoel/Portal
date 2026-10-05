import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculos, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Custos — Sistemas por Centros de Custos e Custeio ABC",
  introducao:
    "Os centros de custos agrupam gastos por departamento. O custeio ABC vai além: distribui os custos pelas atividades realizadas, conforme o que realmente consome recursos.",
  itens: [
    escolha({
      id: "centro-custo",
      titulo: "O que é um centro de custos",
      instrucao: "O que é um centro de custos?",
      opcoes: [
        "Um departamento ou área da empresa para a qual se acumulam os custos, a fim de controlá-los.",
        "O prédio da diretoria.",
        "O lugar onde se guardam os produtos acabados.",
        "Um tipo de imposto.",
      ],
      correta: 0,
      explicacao: "Acumular custos por departamento permite responsabilizar gestores e achar onde o custo está crescendo.",
    }),
    associar({
      id: "produtivo-apoio",
      titulo: "Departamentos produtivos e de apoio",
      instrucao: "Classifique os centros de uma indústria.",
      opcoes: ["Produtivo (transforma o produto)", "De apoio (serve aos demais)"],
      linhas: [
        { id: "montagem", rotulo: "Montagem", correta: 0 },
        { id: "manutencao", rotulo: "Manutenção", correta: 1 },
        { id: "usinagem", rotulo: "Usinagem", correta: 0 },
        { id: "almoxarifado", rotulo: "Almoxarifado", correta: 1 },
      ],
      explicacao: "Os custos dos centros de apoio são depois distribuídos aos centros produtivos, que os levam aos produtos.",
    }),
    escolha({
      id: "abc-ideia",
      titulo: "A ideia do ABC",
      instrucao: "Qual é a ideia central do custeio baseado em atividades (ABC)?",
      opcoes: [
        "Os produtos consomem atividades, e as atividades consomem recursos; o custo segue esse caminho.",
        "Ratear tudo igualmente entre todos os produtos.",
        "Ignorar os custos indiretos.",
        "Usar só horas de mão de obra.",
      ],
      correta: 0,
      explicacao: "O ABC rastreia a causa do custo, com mais precisão que rateios simples, sobretudo com custos indiretos altos.",
    }),
    calculos({
      id: "inspecao",
      titulo: "Custo por atividade: inspeção de qualidade",
      cenario: "A atividade «inspeção» custou R$ 20.000,00 no mês e foram realizadas 400 inspeções. O produto A exigiu 100 inspeções e o produto B exigiu 300.",
      instrucao: "Calcule o custo por inspeção (direcionador de custo) e a parte de cada produto.",
      campos: [
        { id: "taxa", rotulo: "Custo por inspeção (R$)", esperado: 50, explicacao: "20.000 ÷ 400 = 50." },
        { id: "produto-a", rotulo: "Custo de inspeção do produto A (R$)", esperado: 5000, explicacao: "100 × 50 = 5.000." },
        { id: "produto-b", rotulo: "Custo de inspeção do produto B (R$)", esperado: 15000, explicacao: "300 × 50 = 15.000." },
      ],
    }),
    escolha({
      id: "abc-vs-volume",
      titulo: "ABC x rateio por volume",
      cenario: "Se o rateio fosse feito por volume produzido e A e B tivessem a mesma quantidade, cada um receberia R$ 10.000,00 da inspeção.",
      instrucao: "O que o ABC revela nesse caso?",
      opcoes: [
        "Que A recebia custo a mais e B, a menos; o produto B, que exige mais inspeções, estava subcustado.",
        "Que A recebia custo a menos e B, a mais.",
        "Que não há diferença.",
        "Que o ABC é inútil.",
      ],
      correta: 0,
      explicacao: "Pelo ABC, B consome 15.000 e A só 5.000: um preço calculado com o rateio por volume subestimaria o custo de B.",
    }),
    resposta({
      id: "direcionador",
      titulo: "Escolha o direcionador",
      instrucao: "Dê um exemplo de atividade (como compra de materiais ou preparação de máquinas) e o direcionador de custo que você usaria para distribuí-la.",
      rotulo: "Atividade e direcionador",
      placeholder: "Atividade: preparação de máquinas. Direcionador: número de preparações...",
      minPalavras: 8,
    }),
  ],
};

export default atividade;
