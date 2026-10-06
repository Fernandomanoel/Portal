import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, briefing, calculos, dissertativa, planilha, somar } from "../ajudantes";
import { dataBR, inteiro, sortear, sorteio } from "../dadosFicticios";

const TRIBUTOS = [
  ["ICMS", 18],
  ["ISS", 5],
  ["PIS", 0.65],
  ["COFINS", 3],
  ["IPI", 10],
] as const;

const r = sorteio(2101);
const LANCAMENTOS = Array.from({ length: 24 }, (_, i) => {
  const [tributo, aliquota] = sortear(r, TRIBUTOS);
  const base = inteiro(r, 16, 180) * 50;
  return [`DOC-${1040 + i}`, dataBR(inteiro(r, 1, 28), 3), tributo, base, aliquota];
});
const imposto = (l: (string | number)[]) => ((l[3] as number) * (l[4] as number)) / 100;
const por = (t: string) => somar(LANCAMENTOS.filter((l) => l[2] === t).map(imposto));
const TOTAL = somar(LANCAMENTOS.map(imposto));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Escrita Fiscal — Sistema Tributário Brasileiro e o Código Tributário Nacional",
  introducao:
    "Um dia de trabalho no escritório de contabilidade: entender a natureza de cada tributo, localizar fato gerador, base de cálculo e alíquota e apurar o imposto de um mês inteiro de lançamentos. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "Seu primeiro dia: o pedido da contadora",
      remetente: "Marta Oliveira, contadora responsável",
      assunto: "Apuração de março — Loja Casa & Conforto",
      paragrafos: [
        "Bem-vindo(a) à equipe. A Loja Casa & Conforto vende móveis e também presta serviço de montagem. Em março, o setor fiscal deixou 24 lançamentos pendentes, cada um com o tributo envolvido, a base de cálculo e a alíquota. Antes de lançar qualquer guia, preciso que você apure o que cada tributo gerou e que me explique, por escrito, de que tipo de tributo se trata cada um.",
        "Use a planilha da etapa 2 e siga o roteiro. Se algo parecer estranho, registre na sua entrega: é melhor perguntar antes de fechar a apuração.",
      ],
      entregas: [
        "A apuração por tributo (planilha da etapa 2).",
        "A classificação dos tributos pelo Código Tributário Nacional (etapa 3).",
        "Um parecer curto, em texto, que eu possa encaminhar ao dono da loja (etapa 5).",
      ],
    }),
    planilha({
      id: "apuracao-de-marco",
      titulo: "Etapa 2 — Planilha: apuração dos 24 lançamentos de março",
      cenario: "Cole a planilha no Excel e crie a coluna Imposto (=base × alíquota ÷ 100). Depois use SOMASE para somar por tributo.",
      colunas: ["Documento", "Data", "Tributo", "Base de cálculo (R$)", "Alíquota (%)"],
      linhas: LANCAMENTOS,
      instrucao: "Apure e responda:",
      tarefas: [
        { id: "icms", rotulo: "Total de ICMS apurado (R$)", valor: por("ICMS"), explicacao: "Soma de base × 18% das linhas de ICMS." },
        { id: "iss", rotulo: "Total de ISS apurado (R$)", valor: por("ISS"), explicacao: "Soma de base × 5% das linhas de ISS." },
        { id: "pis-cofins", rotulo: "Total de PIS + COFINS apurado (R$)", valor: por("PIS") + por("COFINS"), explicacao: "PIS a 0,65% e COFINS a 3%, somados." },
        { id: "ipi", rotulo: "Total de IPI apurado (R$)", valor: por("IPI"), explicacao: "Soma de base × 10% das linhas de IPI." },
        { id: "total", rotulo: "Total geral de tributos do mês (R$)", valor: TOTAL, explicacao: "Soma de todos os impostos calculados." },
        { id: "maior", rotulo: "Maior imposto de um único lançamento (R$)", valor: Math.max(...LANCAMENTOS.map(imposto)), explicacao: "Use MÁXIMO na coluna Imposto." },
        { id: "peso-icms", rotulo: "Participação do ICMS no total apurado (%)", valor: (por("ICMS") / TOTAL) * 100, explicacao: "ICMS ÷ total geral × 100." },
      ],
    }),
    associar({
      id: "especie-do-tributo",
      titulo: "Etapa 3 — Classificação pelo Código Tributário Nacional",
      cenario: "O Código Tributário Nacional (Lei nº 5.172/1966) organiza o sistema tributário e reconhece, entre as espécies de tributo, os impostos, as taxas e a contribuição de melhoria.",
      instrucao: "Classifique cada cobrança que apareceu na pasta da loja.",
      opcoes: ["Imposto (não tem contraprestação específica)", "Taxa (serviço específico ou poder de polícia)", "Contribuição de melhoria (valorização do imóvel por obra pública)"],
      linhas: [
        { id: "iss", rotulo: "ISS sobre a montagem de móveis na casa do cliente.", correta: 0 },
        { id: "alvara", rotulo: "Taxa anual de licença de funcionamento do município.", correta: 1 },
        { id: "calcamento", rotulo: "Valor cobrado dos donos de imóveis da rua pela valorização após o calçamento feito pela prefeitura.", correta: 2 },
        { id: "icms", rotulo: "ICMS sobre a venda dos móveis.", correta: 0 },
        { id: "lixo", rotulo: "Taxa de coleta de lixo cobrada pelo município por serviço prestado e divisível.", correta: 1 },
      ],
      explicacao: "Imposto não depende de uma atividade estatal específica; taxa depende de serviço público específico ou poder de polícia; contribuição de melhoria nasce de obra pública que valoriza o imóvel.",
    }),
    calculos({
      id: "elementos-do-tributo",
      titulo: "Etapa 4 — Elementos do tributo em um caso concreto",
      cenario: "A loja prestou um serviço de montagem de R$ 12.500,00 e o município aplica ISS de 3% sobre o preço do serviço. Fato gerador: a prestação do serviço. Base de cálculo: o preço do serviço. Alíquota: 3%. Sujeito passivo: a loja, que presta o serviço.",
      instrucao: "Aplique os elementos e calcule:",
      campos: [
        { id: "iss", rotulo: "ISS devido (R$)", esperado: 375, explicacao: "12.500 × 3% = 375." },
        { id: "liquido", rotulo: "Valor que sobra para a loja depois do ISS (R$)", esperado: 12125, explicacao: "12.500 − 375 = 12.125, antes dos demais tributos e custos." },
        { id: "carga", rotulo: "Se a alíquota subisse para 5%, quanto o ISS aumentaria (R$)?", esperado: 250, explicacao: "5% de 12.500 = 625; 625 − 375 = 250." },
      ],
    }),
    dissertativa({
      id: "parecer-ao-dono",
      titulo: "Etapa 5 — Parecer para o dono da loja",
      cenario: "Marta pediu um texto que ela possa encaminhar ao dono da Casa & Conforto, que não é contador.",
      instrucao: "Escreva o parecer com base na apuração de março.",
      deve: [
        "Diga o total de tributos do mês e qual tributo mais pesou, usando os números da planilha.",
        "Explique, em linguagem simples, a diferença entre imposto, taxa e contribuição de melhoria com um exemplo da loja.",
        "Explique o que são fato gerador, base de cálculo e alíquota usando o caso do ISS de R$ 12.500,00.",
        "Aponte uma dúvida ou possível erro que você levantaria antes de fechar a apuração.",
      ],
      chave: /(icms|iss|imposto|taxa|fato gerador|base de c[aá]lculo|al[ií]quota|total)/i,
      minPalavras: 50,
    }),
  ],
};

export default atividade;
