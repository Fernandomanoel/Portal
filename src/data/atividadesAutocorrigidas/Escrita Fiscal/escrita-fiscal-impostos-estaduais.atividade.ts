import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, calculos, dissertativa, planilha, somar } from "../ajudantes";
import { FORNECEDORES, CLIENTES, dataBR, inteiro, sortear, sorteio } from "../dadosFicticios";

const r = sorteio(2404);
const ALIQUOTA = 18;
const COMPRAS = Array.from({ length: 14 }, (_, i) => [`NF-e entrada ${5100 + i}`, dataBR(inteiro(r, 1, 28), 5), sortear(r, FORNECEDORES), inteiro(r, 20, 140) * 100]);
const VENDAS = Array.from({ length: 18 }, (_, i) => [`NF-e saída ${8200 + i}`, dataBR(inteiro(r, 1, 28), 5), sortear(r, CLIENTES), inteiro(r, 30, 220) * 100]);
const LINHAS = [
  ...COMPRAS.map((l) => [l[0], l[1], l[2], "Compra", l[3]]),
  ...VENDAS.map((l) => [l[0], l[1], l[2], "Venda", l[3]]),
];
const icms = (valor: number) => (valor * ALIQUOTA) / 100;
const CREDITO = somar(COMPRAS.map((l) => icms(l[3] as number)));
const DEBITO = somar(VENDAS.map((l) => icms(l[3] as number)));

const VEICULOS = [
  ["Van de entregas", 92000],
  ["Caminhonete", 148000],
  ["Utilitário leve", 67500],
];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Escrita Fiscal — Impostos Estaduais (ICMS e IPVA)",
  introducao:
    "Um dia de trabalho com o imposto estadual mais importante do comércio: apurar o ICMS do mês pela conta gráfica (débitos das vendas menos créditos das compras) e calcular o IPVA da frota. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "A apuração de maio",
      remetente: "Henrique Duarte, analista fiscal sênior",
      assunto: "ICMS de maio — Distribuidora Ponto Novo",
      paragrafos: [
        "A Distribuidora Ponto Novo comprou mercadorias para revenda e vendeu a clientes no mesmo estado. O ICMS destacado nas compras gera crédito; o destacado nas vendas gera débito. A diferença é o imposto a recolher naquele mês. Você vai montar a conta gráfica com as 32 notas fiscais eletrônicas do mês (14 de entrada e 18 de saída).",
        "Para este treino a alíquota interna usada é 18% sobre o valor das operações (valor fictício para o exercício: as alíquotas variam por estado e por mercadoria, e no trabalho real vêm do documento e da legislação estadual).",
      ],
      entregas: [
        "A conta gráfica do ICMS: débito, crédito e saldo a recolher (etapa 2).",
        "O IPVA dos veículos da empresa (etapa 3).",
        "Um relatório por escrito sobre a situação do mês e os pontos de atenção (etapa 4).",
      ],
    }),
    planilha({
      id: "conta-grafica",
      titulo: "Etapa 2 — Planilha: 32 notas fiscais de maio",
      cenario: "Cole a planilha no Excel. Crie a coluna ICMS (=valor × 18%). Some o ICMS das linhas de Compra (crédito) e das linhas de Venda (débito) com SOMASE.",
      colunas: ["Documento", "Data", "Parceiro", "Operação", "Valor da operação (R$)"],
      linhas: LINHAS,
      instrucao: "Apure e responda:",
      tarefas: [
        { id: "compras", rotulo: "Total das compras (R$)", valor: somar(COMPRAS.map((l) => l[3] as number)), explicacao: "Soma das linhas de Compra." },
        { id: "vendas", rotulo: "Total das vendas (R$)", valor: somar(VENDAS.map((l) => l[3] as number)), explicacao: "Soma das linhas de Venda." },
        { id: "credito", rotulo: "ICMS a creditar nas compras (R$)", valor: CREDITO, explicacao: "Total das compras × 18%." },
        { id: "debito", rotulo: "ICMS a debitar nas vendas (R$)", valor: DEBITO, explicacao: "Total das vendas × 18%." },
        { id: "saldo", rotulo: "Saldo de ICMS a recolher (R$; negativo se houver crédito a transportar)", valor: DEBITO - CREDITO, explicacao: "Débito menos crédito." },
        { id: "maior-compra", rotulo: "Maior crédito de ICMS em uma única nota de entrada (R$)", valor: Math.max(...COMPRAS.map((l) => icms(l[3] as number))), explicacao: "Use MÁXIMO no crédito por nota." },
        { id: "relacao", rotulo: "Crédito como % do débito", valor: (CREDITO / DEBITO) * 100, explicacao: "Crédito ÷ débito × 100: quanto do imposto das vendas foi compensado." },
      ],
    }),
    calculos({
      id: "ipva",
      titulo: "Etapa 3 — IPVA da frota",
      cenario: "O IPVA é calculado sobre o valor venal do veículo, com alíquota definida por cada estado. Para o treino, use 4% para todos os veículos da tabela (valor fictício).",
      tabela: { colunas: ["Veículo", "Valor venal (R$)"], linhas: VEICULOS.map((l) => [String(l[0]), (l[1] as number).toLocaleString("pt-BR")]) },
      instrucao: "Calcule:",
      campos: [
        { id: "van", rotulo: "IPVA da Van de entregas (R$)", esperado: 3680, explicacao: "92.000 × 4% = 3.680." },
        { id: "total", rotulo: "IPVA total da frota (R$)", esperado: somar(VEICULOS.map((l) => l[1] as number)) * 0.04, explicacao: "Valor venal total × 4%." },
        { id: "parcela", rotulo: "Cada cota, se o IPVA total for pago em 3 parcelas iguais (R$)", esperado: (somar(VEICULOS.map((l) => l[1] as number)) * 0.04) / 3, explicacao: "Total ÷ 3." },
      ],
    }),
    dissertativa({
      id: "relatorio-do-mes",
      titulo: "Etapa 4 — Relatório ao gestor",
      cenario: "O sócio da distribuidora quer entender por que precisa recolher ICMS se também comprou muita mercadoria.",
      instrucao: "Escreva o relatório do mês.",
      deve: [
        "Explique a não cumulatividade com as suas palavras e com os números da conta gráfica.",
        "Informe o saldo a recolher e o que significaria um saldo credor para o mês seguinte.",
        "Aponte dois cuidados para não perder crédito (nota fiscal escriturada, mercadoria que dá direito ao crédito, prazo de lançamento).",
        "Descreva um erro de lançamento que alteraria o saldo e como você o detectaria.",
      ],
      chave: /(n[aã]o cumulativ|cr[eé]dito|d[eé]bito|saldo|recolh|nota|escritur|erro)/i,
      minPalavras: 55,
    }),
    dissertativa({
      id: "ipva-frota",
      titulo: "Etapa 5 — Política para a frota",
      instrucao: "A empresa pensa em comprar mais um veículo. Escreva um parecer fiscal curto.",
      deve: [
        "Diga como o IPVA entra no custo anual do veículo e como você estimaria esse custo.",
        "Explique a diferença entre o IPVA, que é imposto estadual sobre a propriedade, e o ICMS, que incide sobre a circulação de mercadorias.",
        "Cite uma outra despesa fiscal ou legal do veículo que deveria entrar na conta.",
      ],
      chave: /(ipva|propriedade|icms|circula|custo|anual|licenciamento|seguro)/i,
    }),
  ],
};

export default atividade;
