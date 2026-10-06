import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, briefing, calculos, dissertativa, planilha, somar } from "../ajudantes";

const CONTAS = [
  ["Caixa e bancos", 38400, 0],
  ["Clientes (duplicatas a receber)", 61200, 0],
  ["Estoques", 74800, 0],
  ["Imóveis e instalações", 210000, 0],
  ["Veículos", 96000, 0],
  ["Despesas com salários", 48200, 0],
  ["Despesas com aluguel", 14400, 0],
  ["Despesas com energia e água", 5300, 0],
  ["Custo das mercadorias vendidas", 132600, 0],
  ["Fornecedores", 0, 58900],
  ["Impostos a recolher", 0, 19700],
  ["Empréstimos bancários", 0, 80000],
  ["Capital social", 0, 150000],
  ["Lucros acumulados", 0, 42600],
  ["Receita de vendas", 0, 276000],
  ["Receita de serviços", 0, 53250],
];
const DEBITOS = somar(CONTAS.map((l) => l[1] as number));
const CREDITOS = somar(CONTAS.map((l) => l[2] as number));

const DIVIDA = 48000;
const PARCELAS = 24;
const TAXA = 1.1;
const PMT = (DIVIDA * (TAXA / 100)) / (1 - (1 + TAXA / 100) ** -PARCELAS);

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Escrita Fiscal — Fundamentos de Contabilidade, Escrituração, Obrigações Tributárias e Parcelamento de Débitos",
  introducao:
    "Um dia de trabalho de fechamento: conferir um balancete de verificação, achar uma diferença de lançamento e simular o parcelamento de um débito tributário. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "O balancete que não fechou",
      remetente: "Dr. Antônio Veloso, contador responsável",
      assunto: "Balancete de setembro e débito em aberto — Comercial Três Rios",
      paragrafos: [
        "Na contabilidade, pelo método das partidas dobradas, todo lançamento tem um débito e um crédito de mesmo valor. Por isso, a soma dos saldos devedores do balancete de verificação deve ser igual à soma dos saldos credores. Se não for, existe erro de lançamento e o balancete não pode ser usado para demonstrações.",
        "O balancete de setembro da Comercial Três Rios não fechou. Além disso, a empresa tem um débito federal de R$ 48.000,00 e quer saber quanto pagaria por mês se parcelasse em 24 vezes. Os valores e a taxa de atualização (1,1% ao mês) são fictícios, para treino: no trabalho real, as condições do parcelamento vêm do órgão credor e da legislação vigente.",
      ],
      entregas: [
        "A conferência do balancete com a diferença encontrada (etapa 2).",
        "A simulação do parcelamento (etapa 3).",
        "Um relatório por escrito sobre as causas possíveis da diferença e a decisão sobre o parcelamento (etapa 4).",
      ],
    }),
    planilha({
      id: "balancete-de-setembro",
      titulo: "Etapa 2 — Planilha: balancete de verificação de setembro",
      cenario: "Cole a planilha no Excel e some as duas colunas de saldo. Se a conta é de Ativo ou de Despesa, o saldo é devedor; se é de Passivo, Patrimônio Líquido ou Receita, o saldo é credor.",
      colunas: ["Conta", "Saldo devedor (R$)", "Saldo credor (R$)"],
      linhas: CONTAS,
      instrucao: "Confira e responda:",
      tarefas: [
        { id: "devedor", rotulo: "Soma dos saldos devedores (R$)", valor: DEBITOS, explicacao: "Soma da coluna Saldo devedor." },
        { id: "credor", rotulo: "Soma dos saldos credores (R$)", valor: CREDITOS, explicacao: "Soma da coluna Saldo credor." },
        { id: "diferenca", rotulo: "Diferença entre devedores e credores (R$)", valor: DEBITOS - CREDITOS, explicacao: "Se o balancete estivesse certo, a diferença seria zero." },
        { id: "ativo", rotulo: "Total do Ativo (Caixa, Clientes, Estoques, Imóveis, Veículos) (R$)", valor: 38400 + 61200 + 74800 + 210000 + 96000, explicacao: "Soma das cinco contas de Ativo." },
        { id: "despesas", rotulo: "Total de despesas e custo das mercadorias vendidas (R$)", valor: 48200 + 14400 + 5300 + 132600, explicacao: "Soma das contas de despesa e de custo." },
        { id: "receitas", rotulo: "Total das receitas (R$)", valor: 276000 + 53250, explicacao: "Receita de vendas + receita de serviços." },
        { id: "resultado", rotulo: "Resultado do período, receitas menos despesas e custo (R$)", valor: 276000 + 53250 - (48200 + 14400 + 5300 + 132600), explicacao: "Lucro do período, antes dos tributos sobre o lucro." },
      ],
    }),
    associar({
      id: "natureza-das-contas",
      titulo: "Natureza do saldo das contas",
      instrucao: "Informe a natureza normal do saldo de cada conta.",
      opcoes: ["Saldo normalmente devedor", "Saldo normalmente credor"],
      linhas: [
        { id: "caixa", rotulo: "Caixa e bancos (Ativo)", correta: 0 },
        { id: "fornecedores", rotulo: "Fornecedores (Passivo)", correta: 1 },
        { id: "receita", rotulo: "Receita de vendas", correta: 1 },
        { id: "despesa", rotulo: "Despesa com aluguel", correta: 0 },
        { id: "capital", rotulo: "Capital social (Patrimônio Líquido)", correta: 1 },
      ],
      explicacao: "Ativo e despesas aumentam por débito; passivo, patrimônio líquido e receitas aumentam por crédito.",
    }),
    calculos({
      id: "parcelamento",
      titulo: "Etapa 3 — Simulação do parcelamento do débito",
      cenario: "O débito de R$ 48.000,00 será parcelado em 24 parcelas iguais, com atualização de 1,1% ao mês, pela tabela Price. No Excel, use =PGTO(1,1%; 24; −48000).",
      instrucao: "Calcule:",
      campos: [
        { id: "parcela", rotulo: "Valor de cada parcela (R$)", esperado: PMT, tolerancia: 0.05, explicacao: "PGTO com taxa de 1,1% ao mês, 24 parcelas e valor de 48.000." },
        { id: "total", rotulo: "Total pago ao fim do parcelamento (R$)", esperado: PMT * PARCELAS, tolerancia: 1, explicacao: "Parcela × 24." },
        { id: "encargos", rotulo: "Encargos pagos além da dívida original (R$)", esperado: PMT * PARCELAS - DIVIDA, tolerancia: 1, explicacao: "Total pago menos 48.000." },
        { id: "percentual", rotulo: "Encargos como % da dívida original", esperado: ((PMT * PARCELAS - DIVIDA) / DIVIDA) * 100, tolerancia: 0.05, explicacao: "Encargos ÷ 48.000 × 100." },
      ],
    }),
    dissertativa({
      id: "relatorio-ao-contador",
      titulo: "Etapa 4 — Relatório sobre o balancete e o parcelamento",
      instrucao: "Escreva o relatório para o contador responsável.",
      deve: [
        "Informe a diferença encontrada no balancete e explique por que ela mostra que existe um lançamento errado, e não apenas uma diferença de arredondamento.",
        "Levante ao menos três causas prováveis (lançamento sem contrapartida, valor digitado errado, conta no lado trocado) e como você procuraria cada uma.",
        "Apresente o valor da parcela do parcelamento e o total de encargos, e diga em que condições compensaria parcelar em vez de pagar à vista.",
        "Cite uma consequência de deixar o débito sem regularização (restrição de certidão, juros e multa).",
      ],
      chave: /(partidas dobradas|d[eé]bito|cr[eé]dito|lan[cç]amento|diferen[cç]a|parcela|juros|encargo|certid[aã]o|balancete)/i,
      minPalavras: 65,
    }),
  ],
};

export default atividade;
