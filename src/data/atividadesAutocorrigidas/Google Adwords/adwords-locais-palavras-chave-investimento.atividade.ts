import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculos, resposta, planilha, dissertativa, somar } from "../ajudantes";

const CIDADES = [
  ["Centro", 420, 504, 28],
  ["Zona Norte", 310, 341, 12],
  ["Zona Sul", 280, 392, 21],
  ["Bairro Industrial", 150, 270, 3],
  ["Cidade vizinha", 90, 117, 4],
];
const CPA_CIDADES = CIDADES.map((l) => (l[2] as number) / (l[3] as number));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Google Ads — Locais, Palavras-chave e Investimento",
  introducao:
    "Melhorar o desempenho é mostrar o anúncio ao público certo, com as palavras certas, ajustando o dinheiro para onde ele dá mais resultado. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    escolha({
      id: "programacao",
      titulo: "Horário dos anúncios",
      cenario: "Uma escola de idiomas recebe a maioria das ligações de segunda a sexta, das 8h às 20h.",
      instrucao: "Que ajuste evita desperdício de verba?",
      opcoes: [
        "Exibir anúncios 24 horas, todos os dias.",
        "Programar os anúncios para os dias e horários em que a escola atende.",
        "Desligar a campanha.",
        "Gastar mais de madrugada.",
      ],
      correta: 1,
      explicacao: "Anúncio com telefone aparecendo quando ninguém atende gera cliques perdidos.",
    }),
    calculos({
      id: "ajuste-lance",
      titulo: "Ajustando o lance",
      cenario: "O CPC máximo definido é R$ 1,50. Os usuários de celular convertem melhor, e o gestor decide aumentar o lance em 20% para esse público.",
      instrucao: "Qual é o novo CPC máximo para celulares? E quanto custaria 100 cliques, se todos fossem cobrados nesse valor?",
      campos: [
        { id: "novo-lance", rotulo: "Novo CPC máximo (R$)", esperado: 1.8, explicacao: "1,50 × 1,20 = 1,80." },
        { id: "cem-cliques", rotulo: "Custo de 100 cliques (R$)", esperado: 180, explicacao: "100 × 1,80 = 180 (no máximo: o valor cobrado costuma ser menor que o lance)." },
      ],
    }),
    resposta({
      id: "lista-palavras",
      titulo: "Monte uma lista",
      cenario: "Um escritório de contabilidade quer atrair micro e pequenas empresas da cidade.",
      instrucao: "Escreva 4 palavras-chave que você usaria e 2 palavras negativas.",
      rotulo: "Sua lista",
      placeholder: "Palavras: contador para mei, abrir empresa... Negativas: curso, gratuito...",
      minPalavras: 15,
    }),
    planilha({
      id: "desempenho-por-local",
      titulo: "Planilha: desempenho por local de exibição",
      cenario: "Uma clínica anuncia em cinco regiões. O relatório de localização mostra os cliques, o custo e as conversões (agendamentos) de cada uma. Cole a planilha no Excel e crie a coluna CPA (=custo ÷ conversões).",
      colunas: ["Região", "Cliques", "Custo (R$)", "Conversões"],
      linhas: CIDADES,
      instrucao: "Calcule:",
      tarefas: [
        { id: "cpa-centro", rotulo: "CPA do Centro (R$)", valor: CPA_CIDADES[0], explicacao: "504 ÷ 28 = 18." },
        { id: "melhor-cpa", rotulo: "Menor CPA entre as regiões (R$)", valor: Math.min(...CPA_CIDADES), explicacao: "O menor valor da coluna CPA." },
        { id: "pior-cpa", rotulo: "Maior CPA entre as regiões (R$)", valor: Math.max(...CPA_CIDADES), explicacao: "O Bairro Industrial: 270 ÷ 3 = 90." },
        { id: "custo-total", rotulo: "Custo total das cinco regiões (R$)", valor: somar(CIDADES.map((l) => l[2] as number)), explicacao: "Soma da coluna Custo." },
      ],
    }),
    dissertativa({
      id: "ajuste-geografico",
      titulo: "Ajustando locais, horários e lances",
      instrucao: "Escreva as decisões de otimização que você tomaria a partir do relatório por região.",
      deve: [
        "Diga em quais regiões aumentaria o lance ou o orçamento e em quais reduziria ou pausaria, justificando com o CPA.",
        "Proponha ao menos duas palavras-chave negativas ou ajustes de horário que evitem cliques sem valor.",
        "Explique como acompanharia se os ajustes funcionaram.",
      ],
      chave: /(cpa|lance|or[cç]amento|regi[aã]o|negativ|hor[aá]rio|pausar|reduz|aument)/i,
    }),
  ],
};

export default atividade;
