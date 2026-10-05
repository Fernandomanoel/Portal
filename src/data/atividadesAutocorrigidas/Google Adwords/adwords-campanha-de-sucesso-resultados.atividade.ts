import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculos, associar, resposta, planilha, dissertativa, somar } from "../ajudantes";

const VENDAS = [
  ["Pesquisa — Serviços", 2400, 96, 14400, 9100],
  ["Pesquisa — Marca", 600, 70, 7000, 4300],
  ["Display — Remarketing", 900, 24, 3600, 2500],
  ["Vídeo — Institucional", 800, 6, 900, 600],
];
const LUCRO = VENDAS.map((l) => (l[3] as number) - (l[4] as number) - (l[1] as number));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Google Ads — Criando uma Campanha de Sucesso e Analisando os Resultados",
  introducao:
    "Uma campanha de sucesso é a que traz retorno acima do investimento. Calcule o ganho real e decida o que manter, ajustar ou pausar. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    escolha({
      id: "sucesso",
      titulo: "O que é sucesso",
      instrucao: "Como saber se uma campanha foi bem-sucedida?",
      opcoes: [
        "Quando teve muitas impressões, mesmo sem vendas.",
        "Quando o retorno (vendas ou contatos qualificados) supera o investimento, de acordo com a meta definida no início.",
        "Quando o anúncio ficou bonito.",
        "Quando gastou todo o orçamento.",
      ],
      correta: 1,
      explicacao: "Sucesso é medido pelo objetivo definido, não pela quantidade de exibições.",
    }),
    calculos({
      id: "ganho-real",
      titulo: "O ganho real de uma campanha",
      cenario:
        "No mês, uma loja investiu R$ 2.000,00 em anúncios. A campanha teve 1.600 cliques, 80 vendas e faturou R$ 9.000,00.",
      instrucao: "Calcule o ROAS (receita ÷ investimento), o custo por venda (CPA) e a taxa de conversão.",
      campos: [
        { id: "roas", rotulo: "ROAS (receita para cada R$ 1 investido)", esperado: 4.5, explicacao: "9.000 ÷ 2.000 = 4,5: cada real investido trouxe R$ 4,50 de receita." },
        { id: "cpa", rotulo: "Custo por venda (R$)", esperado: 25, explicacao: "2.000 ÷ 80 = 25." },
        { id: "conversao", rotulo: "Taxa de conversão (%)", esperado: 5, explicacao: "80 ÷ 1.600 = 5%." },
      ],
    }),
    associar({
      id: "decisao",
      titulo: "Decisão a partir dos números",
      instrucao: "Escolha a ação mais indicada para cada situação.",
      opcoes: ["Aumentar o investimento", "Ajustar anúncio ou página", "Pausar ou reformular"],
      linhas: [
        { id: "bom", rotulo: "ROAS alto, CPA abaixo da meta e orçamento esgotando cedo.", correta: 0 },
        { id: "cliques-sem-venda", rotulo: "Muitos cliques e CTR bom, mas conversão muito baixa.", correta: 1 },
        { id: "prejuizo", rotulo: "Custo por venda maior que o lucro do produto, por várias semanas, sem melhora após ajustes.", correta: 2 },
      ],
      explicacao: "Os números indicam onde atuar: expandir o que dá retorno, corrigir o que perde vendas e parar o que só dá prejuízo.",
    }),
    resposta({
      id: "relatorio",
      titulo: "Relatório para o chefe",
      instrucao: "Em poucas linhas, resuma o resultado da campanha da atividade (R$ 2.000 investidos, 80 vendas, ROAS 4,5) e proponha um próximo passo.",
      rotulo: "Seu relatório",
      placeholder: "A campanha investiu R$ 2.000 e gerou 80 vendas... Proponho...",
      chave: /(roas|venda|retorno|invest|proponho|pr[oó]ximo|aument|ajust)/i,
      minPalavras: 15,
    }),
    planilha({
      id: "resultado-financeiro",
      titulo: "Planilha: o resultado financeiro de cada campanha",
      cenario: "A loja registrou, por campanha, o quanto investiu em anúncios, as vendas atribuídas, a receita e o custo dos produtos vendidos. Resultado = receita − custo dos produtos − investimento. ROAS = receita ÷ investimento. Cole a planilha no Excel e resolva.",
      colunas: ["Campanha", "Investimento (R$)", "Vendas", "Receita (R$)", "Custo dos produtos (R$)"],
      linhas: VENDAS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "roas-servicos", rotulo: "ROAS da Pesquisa — Serviços", valor: 14400 / 2400, explicacao: "14.400 ÷ 2.400 = 6." },
        { id: "cpa-remarketing", rotulo: "Custo por venda do Remarketing (R$)", valor: 900 / 24, explicacao: "900 ÷ 24 = 37,50." },
        { id: "lucro-total", rotulo: "Resultado total da conta (R$)", valor: somar(LUCRO), explicacao: "Soma do resultado de cada campanha, já descontado o investimento." },
        { id: "lucro-video", rotulo: "Resultado da campanha de Vídeo (R$)", valor: LUCRO[3], explicacao: "900 − 600 − 800 = −500: a campanha deu prejuízo direto." },
      ],
    }),
    dissertativa({
      id: "relatorio-final",
      titulo: "Relatório final para a diretoria",
      instrucao: "Escreva o relatório do período com a sua recomendação para o mês seguinte.",
      deve: [
        "Resuma o resultado total e diga qual campanha mais contribuiu e qual teve prejuízo.",
        "Explique por que a campanha de vídeo pode ainda ter valor mesmo com prejuízo direto (e o que falta medir).",
        "Recomende como redistribuiria a verba e quais metas definiria para o próximo período.",
      ],
      chave: /(resultado|roas|cpa|invest|v[ií]deo|verba|meta|lucro|preju[ií]zo)/i,
      minPalavras: 35,
    }),
  ],
};

export default atividade;
