import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, consulta, dissertativa, reais, somar } from "../ajudantes";
import { CATEGORIAS, FLUXO_OUTUBRO, SALDOS_OUTUBRO, SALDO_INICIAL_OUTUBRO, paraData } from "../dadosCaixa";

const fluxo = FLUXO_OUTUBRO.map((p, i) => ({ ...p, saldo: SALDOS_OUTUBRO[i] }));
const porCategoria = (c: string) => somar(FLUXO_OUTUBRO.filter((p) => p.categoria === c).map((p) => p.valor));
const entradas = somar(FLUXO_OUTUBRO.filter((p) => p.tipo === "Entrada").map((p) => p.valor));
const saidas = somar(FLUXO_OUTUBRO.filter((p) => p.tipo === "Saída").map((p) => p.valor));
const menor = fluxo.reduce((m, p) => (p.saldo < m.saldo ? p : m));
const primeiroNegativo = fluxo.find((p) => p.saldo < 0);
const negativos = fluxo.filter((p) => p.saldo < 0).length;
const final = SALDOS_OUTUBRO[SALDOS_OUTUBRO.length - 1];
const dia = (n: number) => Number(paraData(n).slice(0, 2));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Assistente Financeiro — Configurando a Planilha de Fluxo de Caixa",
  introducao: `Situação de trabalho real: a diretoria quer saber, antes do mês começar, se o dinheiro do banco aguenta outubro. Sua tarefa é CONFIGURAR a planilha de fluxo de caixa projetado: ${FLUXO_OUTUBRO.length} recebimentos e pagamentos previstos, saldo acumulado dia a dia, alerta de saldo negativo, lista de categorias, totais por categoria e os indicadores que respondem «vai faltar dinheiro? quando? quanto?». A planilha é baixada aqui mesmo, na etapa 1.`,
  itens: [
    briefing({
      id: "briefing",
      titulo: "O pedido da diretora administrativa",
      remetente: "Helena Prado, diretora administrativa e financeira da Distribuidora Horizonte",
      assunto: "Outubro tem folha, impostos e aluguel na mesma quinzena",
      paragrafos: [
        `Começamos outubro com ${reais(SALDO_INICIAL_OUTUBRO)} no banco. Na primeira quinzena caem salários, FGTS, aluguel e ISS, e no dia 20 vêm DCTFWeb, Simples e adiantamento. Os recebimentos de clientes estão espalhados pelo mês.`,
        "Quero a planilha que mostre o saldo depois de cada lançamento, pinte de vermelho quando ficar negativo e me diga qual o pior momento do mês. Com isso decido se negocio prazo com fornecedor, antecipo recebível ou aciono o limite do banco.",
        "Use só as categorias da aba Categorias, para o relatório por categoria não sair furado.",
      ],
      entregas: [
        "As colunas de valor com sinal e saldo acumulado (etapa 2).",
        "O alerta de saldo negativo e a validação das categorias (etapa 3).",
        "O resumo por categoria, os indicadores do pior momento e o parecer para a diretoria (etapas 4 a 6).",
      ],
    }),
    {
      id: "conheca",
      titulo: "Etapa 1 — Baixar a planilha e conhecer as abas",
      download: {
        url: "/atividades/assistente-administracao-financeira/fluxo-caixa-para-configurar.xlsx",
        nome: "fluxo-caixa-para-configurar.xlsx",
        rotulo: "Baixar planilha",
        descricao: `Abas Leia-me, Fluxo (${FLUXO_OUTUBRO.length} lançamentos previstos, em ordem de data), Resumo (saldo inicial em B1 e espaços para os totais) e Categorias.`,
      },
      passos: [
        "Clique em «Baixar planilha», abra no Excel e clique em Habilitar Edição se aparecer a faixa amarela.",
        "Salve uma cópia como Fluxo de Caixa Outubro.xlsx.",
        "Na aba Fluxo, confira: os lançamentos já estão em ordem de data, e no mesmo dia as entradas vêm antes das saídas (é a ordem em que o banco credita e debita).",
        "O saldo inicial do mês está em Resumo!B1. Formate a coluna Valor como Moeda (Página Inicial > grupo Número).",
      ],
      blocos: [{ tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "Saldo acumulado só faz sentido com os lançamentos em ordem. Se um recebimento do dia 25 aparecer antes da folha do dia 7, a planilha mostra dinheiro que, no dia 7, ainda não existia." }],
    },
    consulta({
      id: "saldo",
      titulo: "Etapa 2 — Valor com sinal e saldo acumulado",
      cenario: "Na aba Fluxo, crie F = Valor com sinal (entrada positiva, saída negativa) e G = Saldo. Na linha 2, o saldo é o saldo inicial (Resumo!$B$1) mais F2. Da linha 3 em diante, é o saldo da linha de cima mais o valor da linha.",
      instrucao: "Escreva as fórmulas, estenda até o último lançamento e responda.",
      formato: "planilha",
      tabelas: [{ nome: `Fluxo previsto de outubro (${FLUXO_OUTUBRO.length} lançamentos — o mesmo da planilha)`, colunas: ["Data", "Descrição", "Categoria", "Tipo", "Valor (R$)"], linhas: FLUXO_OUTUBRO.map((p) => [paraData(p.data), p.descricao, p.categoria, p.tipo, p.valor]) }],
      comandos: [
        { id: "sinal", rotulo: "Sua fórmula de Valor com sinal (F2)", padrao: /^=\s*(SE|IF)\s*\([\s\S]*(Entrada|Sa[ií]da)/i, placeholder: "=SE(D2=\"Entrada\";E2;-E2)", dica: "SE o tipo for Entrada, o valor; senão, o valor com sinal de menos." },
        { id: "saldo", rotulo: "Sua fórmula de Saldo da linha 3 (G3)", padrao: /^=\s*\$?G\$?2\s*\+\s*\$?F\$?3\s*$|^=\s*\$?F\$?3\s*\+\s*\$?G\$?2\s*$|^=\s*SOMA\s*\(/i, placeholder: "=G2+F3", dica: "O saldo da linha de cima mais o valor com sinal desta linha (=G2+F3)." },
      ],
      resultados: [
        { id: "entradas", rotulo: "Total de entradas previstas no mês (R$)", valor: entradas, explicacao: "SOMASE(D:D;\"Entrada\";E:E).", tolerancia: 0.1 },
        { id: "saidas", rotulo: "Total de saídas previstas no mês (R$)", valor: saidas, explicacao: "SOMASE(D:D;\"Saída\";E:E).", tolerancia: 0.1 },
        { id: "final", rotulo: "Saldo final previsto em 31/10 (R$)", valor: final, explicacao: "Último valor da coluna Saldo (= saldo inicial + entradas − saídas).", tolerancia: 0.1 },
      ],
    }),
    {
      id: "alertas",
      titulo: "Etapa 3 — Saldo negativo em vermelho e categorias validadas",
      passos: [
        "Selecione a coluna Saldo (G2 até a última linha). Página Inicial > Formatação Condicional > Realçar Regras das Células > É Menor do que... > 0 > «Preenchimento vermelho claro e texto vermelho escuro».",
        "Selecione a coluna Categoria (C2 até C200). Dados > Validação de Dados > Permitir: Lista > Fonte: clique no botão de seleção e marque Categorias!A2:A9 (fica =Categorias!$A$2:$A$9).",
        "Teste: digite «impostos» em minúsculas numa linha vazia. Se a categoria não estiver exatamente como na lista, o Excel recusa.",
      ],
      campos: [
        { id: "negativas", rotulo: "Quantas linhas da coluna Saldo ficaram vermelhas?", placeholder: "Número", regra: { tipo: "numero", esperado: negativos, tolerancia: 0 }, mensagemCerta: "Certo: os momentos do mês em que a conta fica no negativo.", mensagemErrada: "Confira se o saldo da linha 2 parte de Resumo!$B$1 e se a regra é «menor do que 0»." },
        { id: "fonte", rotulo: "O que ficou no campo Fonte da validação", placeholder: "=Categorias!...", regra: { tipo: "padrao", padrao: /^=?\s*Categorias!\$?A\$?2\s*:\s*\$?A\$?9\s*$/i }, mensagemCerta: "Isso: a lista vem da aba Categorias.", mensagemErrada: "A fonte é o intervalo da aba Categorias: =Categorias!$A$2:$A$9." },
      ],
      blocos: [{ tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: `A lista vinda de uma aba (e não digitada na Fonte) é atualizada num lugar só: se a diretoria criar uma categoria nova, basta acrescentá-la na aba Categorias. São ${CATEGORIAS.length} hoje.` }],
    },
    consulta({
      id: "categorias",
      titulo: "Etapa 4 — Resumo por categoria",
      cenario: "Na aba Resumo, ao lado de cada categoria (A4 em diante), some o total do mês com SOMASE sobre a aba Fluxo.",
      instrucao: "Escreva a fórmula e responda.",
      tabelas: [],
      comandos: [{ id: "somase", rotulo: "Sua fórmula do total da categoria (B4)", padrao: /^=\s*(SOMASES?|SUMIFS?)\s*\([\s\S]*Fluxo!/i, placeholder: "=SOMASE(Fluxo!C:C;A4;Fluxo!E:E)", dica: "SOMASE: intervalo da Categoria na aba Fluxo, critério A4, soma da coluna Valor." }],
      resultados: [
        { id: "clientes", rotulo: "Recebimento de clientes (R$)", valor: porCategoria("Recebimento de clientes"), explicacao: "Total da categoria.", tolerancia: 0.1 },
        { id: "fornecedores", rotulo: "Fornecedores (R$)", valor: porCategoria("Fornecedores"), explicacao: "Total da categoria.", tolerancia: 0.1 },
        { id: "impostos", rotulo: "Impostos (R$)", valor: porCategoria("Impostos"), explicacao: "FGTS, ISS, DCTFWeb e Simples.", tolerancia: 0.1 },
        { id: "folha", rotulo: "Folha de pagamento (R$)", valor: porCategoria("Folha de pagamento"), explicacao: "Salários e adiantamento.", tolerancia: 0.1 },
      ],
    }),
    consulta({
      id: "pior-momento",
      titulo: "Etapa 5 — O pior momento do mês",
      cenario: "Ainda na aba Resumo, calcule: o menor saldo do mês (MÍNIMO da coluna Saldo), a data em que ele acontece (ÍNDICE + CORRESP) e quantas linhas ficam no negativo (CONT.SE com \"<0\").",
      instrucao: "Escreva a fórmula da data do menor saldo e responda.",
      tabelas: [],
      comandos: [{ id: "data", rotulo: "Sua fórmula da data do menor saldo", padrao: /(CORRESP|MATCH|PROCX|XLOOKUP)\s*\(/i, placeholder: "=ÍNDICE(Fluxo!A:A;CORRESP(MÍNIMO(Fluxo!G:G);Fluxo!G:G;0))", dica: "CORRESP(menor saldo; coluna Saldo; 0) devolve a linha; ÍNDICE pega a data dessa linha na coluna A." }],
      resultados: [
        { id: "menor", rotulo: "Menor saldo do mês (R$, com o sinal)", valor: menor.saldo, explicacao: `Acontece em ${paraData(menor.data)}.`, tolerancia: 0.1 },
        { id: "dia-menor", rotulo: "Dia do mês do menor saldo (só o número do dia)", valor: dia(menor.data), explicacao: "Use DIA() sobre a data encontrada, ou leia a data.", tolerancia: 0 },
        { id: "primeiro", rotulo: "Dia do mês em que o saldo fica negativo pela primeira vez", valor: primeiroNegativo ? dia(primeiroNegativo.data) : 0, explicacao: "A primeira linha vermelha da coluna Saldo.", tolerancia: 0 },
        { id: "capital", rotulo: "Quanto de crédito a empresa precisa ter disponível para não ficar negativa em nenhum momento (R$)", valor: Math.max(0, -menor.saldo), explicacao: "O tamanho do buraco no pior momento: o menor saldo, sem o sinal.", tolerancia: 0.1 },
      ],
    }),
    dissertativa({
      id: "parecer",
      titulo: "Etapa 6 — Parecer para a diretoria",
      instrucao: "Proteja as fórmulas (Revisão > Proteger Planilha, deixando livre só o que se digita) e escreva o parecer que vai com a planilha.",
      deve: [
        "Diga se o caixa aguenta outubro, qual o menor saldo, em que dia e por quanto tempo a conta fica negativa.",
        "Aponte quais saídas concentram o problema e em que datas.",
        "Proponha pelo menos duas saídas concretas (negociar prazo com fornecedor, antecipar recebíveis, usar limite bancário) com o custo ou risco de cada uma.",
        "Feche com o saldo final previsto e o que deve ser acompanhado semana a semana.",
      ],
      chave: /(saldo|negativ|folha|imposto|fornecedor|antecip|limite|prazo|caixa)/i,
      minPalavras: 90,
    }),
  ],
};

export default atividade;
