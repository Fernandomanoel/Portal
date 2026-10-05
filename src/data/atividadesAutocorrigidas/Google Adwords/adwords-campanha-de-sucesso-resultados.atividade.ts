import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculos, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Google Ads — Criando uma Campanha de Sucesso e Analisando os Resultados",
  introducao:
    "Uma campanha de sucesso é a que traz retorno acima do investimento. Calcule o ganho real e decida o que manter, ajustar ou pausar.",
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
    escolha({
      id: "receita-nao-e-lucro",
      titulo: "Receita não é lucro",
      cenario: "A campanha anterior faturou R$ 9.000,00 e o custo dos produtos vendidos foi R$ 6.500,00, além dos R$ 2.000,00 de anúncios.",
      instrucao: "Qual é o resultado, depois de descontar custo do produto e anúncios?",
      opcoes: ["R$ 9.000,00", "R$ 2.500,00", "R$ 500,00", "Prejuízo de R$ 500,00"],
      correta: 2,
      explicacao: "9.000 − 6.500 − 2.000 = 500. Um ROAS bom pode esconder uma margem apertada: olhe sempre o resultado final.",
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
  ],
};

export default atividade;
