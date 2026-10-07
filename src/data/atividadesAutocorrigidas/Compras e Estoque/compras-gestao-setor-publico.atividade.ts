import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, briefing, calculos, dissertativa, planilha, somar } from "../ajudantes";
import { decimal, inteiro, sorteio } from "../dadosFicticios";

const DESCRICOES = ["Resma de papel A4", "Toner para impressora", "Computador desktop", "Monitor 21\"", "Cadeira giratória", "Mesa de escritório", "Armário de aço", "Ar-condicionado 12.000 BTU", "Purificador de água", "Material de limpeza (kit)", "Uniforme de servidor", "Projetor multimídia"];
const r = sorteio(3303);
const ITENS = DESCRICOES.map((nome, i) => {
  const quantidade = inteiro(r, 5, 120);
  const estimado = decimal(r, 18, 4800);
  const lance = Math.round(estimado * decimal(r, 0.72, 1.04, 3) * 100) / 100;
  return [i + 1, nome, quantidade, estimado, lance];
});
const totalEstimado = somar(ITENS.map((l) => (l[2] as number) * (l[3] as number)));
const totalLances = somar(ITENS.map((l) => (l[2] as number) * (l[4] as number)));
const acima = ITENS.filter((l) => (l[4] as number) > (l[3] as number));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Compras e Estoque — Gestão de Compras no Setor Público",
  introducao:
    "Um dia de trabalho na área de licitações de um órgão público: conferir o resultado de um pregão com 12 itens, calcular a economia obtida e identificar lances acima do valor estimado. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "O resultado do pregão",
      remetente: "Renata Albuquerque, pregoeira da Secretaria Municipal de Administração",
      assunto: "Pregão eletrônico para material permanente e de consumo",
      paragrafos: [
        "O município realizou um pregão eletrônico, modalidade usada pela Lei nº 14.133/2021 para a contratação de bens e serviços comuns, com critério de julgamento de menor preço. A sessão terminou e o sistema exportou, para cada um dos 12 itens, a quantidade, o valor unitário estimado pela administração (pesquisa de preços) e o menor lance válido recebido.",
        "Preciso do relatório de economia para o processo e da lista dos itens em que o lance ficou acima do valor estimado, porque nesses casos a administração não pode simplesmente aceitar a proposta sem analisar. Os valores desta atividade são fictícios.",
      ],
      entregas: [
        "O total estimado, o total dos lances e a economia obtida (etapa 2).",
        "A lista dos itens com lance acima do estimado (etapa 2).",
        "A classificação das modalidades de licitação (etapa 3) e uma ata resumida por escrito (etapa 4).",
      ],
    }),
    planilha({
      id: "mapa-do-pregao",
      titulo: "Etapa 2 — Planilha: os 12 itens do pregão",
      cenario: "Cole a planilha no Excel. Para cada item, valor estimado total = quantidade × valor unitário estimado, e valor do lance total = quantidade × lance unitário.",
      colunas: ["Item", "Descrição", "Quantidade", "Valor unitário estimado (R$)", "Menor lance unitário (R$)"],
      linhas: ITENS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "estimado", rotulo: "Valor total estimado pela administração (R$)", valor: totalEstimado, explicacao: "Soma de quantidade × valor estimado de cada item." },
        { id: "lances", rotulo: "Valor total dos menores lances (R$)", valor: totalLances, explicacao: "Soma de quantidade × lance de cada item." },
        { id: "economia", rotulo: "Economia obtida (R$; negativo se houve gasto maior que o estimado)", valor: totalEstimado - totalLances, explicacao: "Total estimado menos total dos lances." },
        { id: "economia-pct", rotulo: "Economia em relação ao estimado (%)", valor: ((totalEstimado - totalLances) / totalEstimado) * 100, explicacao: "Economia ÷ total estimado × 100." },
        { id: "itens-acima", rotulo: "Quantidade de itens com lance acima do valor estimado", valor: acima.length, explicacao: "Itens em que o lance unitário supera o estimado.", tolerancia: 0 },
        { id: "maior-desconto", rotulo: "Maior desconto de um item em relação ao estimado (%)", valor: Math.max(...ITENS.map((l) => (1 - (l[4] as number) / (l[3] as number)) * 100)), explicacao: "O maior (1 − lance ÷ estimado) × 100.", tolerancia: 0.05 },
      ],
    }),
    associar({
      id: "modalidades",
      titulo: "Etapa 3 — Modalidades de licitação (Lei nº 14.133/2021)",
      instrucao: "Associe cada situação à modalidade mais adequada.",
      opcoes: ["Pregão", "Concorrência", "Concurso", "Leilão", "Diálogo competitivo"],
      linhas: [
        { id: "papel", rotulo: "Comprar resmas de papel, bem comum com padrão de mercado definido.", correta: 0 },
        { id: "obra", rotulo: "Contratar a reforma de uma escola, serviço de engenharia.", correta: 1 },
        { id: "projeto", rotulo: "Escolher o melhor projeto artístico para o monumento da praça, premiando o vencedor.", correta: 2 },
        { id: "veiculos", rotulo: "Vender veículos antigos e inservíveis da prefeitura.", correta: 3 },
        { id: "inovacao", rotulo: "Contratar uma solução tecnológica inovadora, em que a administração precisa conversar com os licitantes para definir como atender à necessidade.", correta: 4 },
      ],
      explicacao: "O pregão é para bens e serviços comuns; a concorrência, para obras e bens ou serviços especiais; o concurso escolhe trabalho técnico, científico ou artístico; o leilão vende bens; o diálogo competitivo atende a objetos inovadores ou complexos.",
    }),
    calculos({
      id: "dispensa",
      titulo: "Etapa 3 — Limite de dispensa (valor fictício)",
      cenario: "Para este treino, considere que o limite de dispensa de licitação por valor, para bens e serviços comuns, é de R$ 50.000,00 (valor fictício: o limite real é atualizado por decreto e deve ser consultado na norma vigente). Uma secretaria quer comprar 40 cadeiras a R$ 1.350,00 cada e 25 mesas a R$ 980,00 cada.",
      instrucao: "Calcule:",
      campos: [
        { id: "cadeiras", rotulo: "Valor das cadeiras (R$)", esperado: 54000, explicacao: "40 × 1.350 = 54.000." },
        { id: "mesas", rotulo: "Valor das mesas (R$)", esperado: 24500, explicacao: "25 × 980 = 24.500." },
        { id: "total", rotulo: "Valor total da compra (R$)", esperado: 78500, explicacao: "54.000 + 24.500 = 78.500." },
        { id: "excesso", rotulo: "Quanto o total ultrapassa o limite de dispensa de treino (R$)", esperado: 28500, explicacao: "78.500 − 50.000 = 28.500: a compra não poderia ser dispensada por valor." },
      ],
    }),
    dissertativa({
      id: "ata-resumida",
      titulo: "Etapa 4 — Ata resumida e providências",
      instrucao: "Escreva o resumo que a pregoeira anexaria ao processo.",
      deve: [
        "Informe o total estimado, o total dos lances, a economia e o percentual, com os números da planilha.",
        "Explique o que a administração deve fazer com os itens cujo lance ficou acima do estimado (negociação, justificativa, nova pesquisa).",
        "Diga por que a pesquisa de preços prévia e o registro das etapas protegem o gestor e o interesse público.",
        "Cite a diferença entre dispensa, inexigibilidade e licitação.",
      ],
      chave: /(estimado|lance|economia|negocia|pesquisa de pre[cç]os|licita[cç][aã]o|dispensa|inexigibilidade|processo)/i,
      minPalavras: 65,
    }),
  ],
};

export default atividade;
