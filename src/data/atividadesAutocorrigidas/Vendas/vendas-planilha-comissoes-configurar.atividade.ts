import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, consulta, dissertativa, somar } from "../ajudantes";
import { DESCONTO_MAXIMO, PEDIDOS_AGOSTO, PRODUTOS, VENDAS_AGOSTO, VENDEDORES, porCodigoProduto } from "../dadosVendas";

const { processados: I, resumo: R } = VENDAS_AGOSTO;
const ok = I.filter((i) => i.situacao === "OK");
const ranking = [...R].sort((a, b) => b.faturamento - a.faturamento);
const meio = R.find((r) => r.percentual === 3) ?? R[1];
const alcadas = Object.entries(DESCONTO_MAXIMO).map(([c, d]) => `${c}: até ${d}%`).join("; ");

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Vendas — Configurando a Planilha de Pedidos e Comissões",
  introducao: `Situação de trabalho real: todo começo de mês o comercial briga por causa da comissão, porque cada um faz a conta de um jeito. Sua tarefa é CONFIGURAR a planilha de pedidos e comissões: preço puxado da tabela pelo código, valor líquido com desconto, alerta de desconto acima da alçada, faturamento por vendedor só com o que é válido, atingimento da meta, comissão escalonada e ranking. A planilha com os ${PEDIDOS_AGOSTO.length} itens vendidos em agosto é baixada aqui mesmo, na etapa 1.`,
  itens: [
    briefing({
      id: "briefing",
      titulo: "O pedido do gerente comercial",
      remetente: "Marcos Vieira, gerente comercial da Distribuidora Horizonte",
      assunto: "Comissão de agosto sem discussão",
      paragrafos: [
        `Quero uma planilha única de comissão. O preço vem da tabela (aba Produtos), nunca digitado. Cada categoria tem uma alçada de desconto (${alcadas}): item com desconto acima disso não entra no faturamento do vendedor sem a minha aprovação.`,
        "A comissão é sobre o faturamento líquido e depende de quanto da meta o vendedor bateu: abaixo de 80%, 2%; de 80% até antes de 100%, 3%; meta batida, 5%. As faixas estão na aba Regras.",
        "Depois de pronta, eu confiro agosto com você e ela vira o padrão do time.",
      ],
      entregas: [
        "Descrição, preço, valor bruto e líquido nos pedidos (etapa 2) e o alerta de alçada (etapa 3).",
        "Faturamento, atingimento e comissão por vendedor (etapa 4).",
        "Destaques, validação, ranking e o comunicado ao time (etapas 5 a 7).",
      ],
    }),
    {
      id: "conheca",
      titulo: "Etapa 1 — Baixar a planilha e conhecer as abas",
      download: {
        url: "/atividades/vendas/vendas-para-configurar.xlsx",
        nome: "vendas-para-configurar.xlsx",
        rotulo: "Baixar planilha",
        descricao: `Abas Leia-me, Produtos (${PRODUTOS.length} itens com preço e desconto máximo), Vendedores (${VENDEDORES.length}, com meta), Regras (faixas de comissão) e Pedidos (agosto).`,
      },
      passos: [
        "Clique em «Baixar planilha», abra no Excel e clique em Habilitar Edição se aparecer a faixa amarela.",
        "Salve uma cópia como Comissões Agosto.xlsx.",
        "Confira a aba Regras: A3:B5 traz «atingimento a partir de» e a comissão de cada faixa (0% → 2%, 80% → 3%, 100% → 5%).",
        "Na aba Pedidos, clique numa célula dos dados e aperte Ctrl + T. Cada linha é um item de um pedido: o mesmo pedido pode ter vários itens.",
      ],
      blocos: [{ tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "Preço digitado à mão é a origem de metade das brigas de comissão: um zero a menos e o vendedor «perde» uma venda. Com o PROCV, o preço sai sempre da tabela oficial." }],
    },
    consulta({
      id: "valores",
      titulo: "Etapa 2 — Descrição, preço, bruto e líquido",
      cenario: "Na aba Pedidos, crie H = Descrição e I = Preço (PROCV pelo código na aba Produtos), J = Valor bruto (Qtd × Preço) e K = Valor líquido (bruto × (1 − desconto ÷ 100)).",
      instrucao: "Escreva as fórmulas, estenda e responda.",
      formato: "planilha",
      tabelas: [{ nome: `Pedidos de agosto (${PEDIDOS_AGOSTO.length} itens — os mesmos da planilha)`, colunas: ["Pedido", "Data", "Vendedor", "Cliente", "Código", "Qtd", "Desconto %"], linhas: PEDIDOS_AGOSTO.map((i) => [i.pedido, i.data, i.vendedor, i.cliente, i.codigo, i.quantidade, i.desconto]) }],
      comandos: [
        { id: "formula-preco", rotulo: "Sua fórmula de Preço (I2)", padrao: /^=\s*(SEERRO\s*\(\s*)?(PROCV|VLOOKUP|PROCX|XLOOKUP)\s*\([\s\S]*Produtos!/i, placeholder: "=PROCV(E2;Produtos!$A:$E;4;FALSO)", dica: "PROCV com o código (E2), a aba Produtos, a coluna 4 (preço) e FALSO." },
        { id: "formula-liquido", rotulo: "Sua fórmula de Valor líquido (K2)", padrao: /^=[\s\S]*\(\s*1\s*-\s*\$?G\$?2\s*\/\s*100\s*\)|^=[\s\S]*-\s*\$?J\$?2\s*\*\s*\$?G\$?2\s*\/\s*100/i, placeholder: "=J2*(1-G2/100)", dica: "Bruto vezes (1 − desconto ÷ 100)." },
      ],
      resultados: [
        { id: "bruto", rotulo: "Valor bruto de todos os itens de agosto (R$)", valor: somar(I.map((i) => i.bruto)), explicacao: "Soma da coluna Valor bruto.", tolerancia: 0.5 },
        { id: "liquido", rotulo: "Valor líquido de todos os itens de agosto (R$)", valor: somar(I.map((i) => i.liquido)), explicacao: "Soma da coluna Valor líquido.", tolerancia: 0.5 },
        { id: "preco", rotulo: `Preço de tabela do item ${PRODUTOS[27].codigo} (R$)`, valor: porCodigoProduto(PRODUTOS[27].codigo)!.preco, explicacao: "Coluna 4 da aba Produtos.", tolerancia: 0 },
      ],
    }),
    consulta({
      id: "alcada",
      titulo: "Etapa 3 — Alerta de desconto acima da alçada",
      cenario: "Crie L = Desconto máximo (PROCV na coluna 5 da aba Produtos; ele vem em %, ou seja, 0,1 para 10%) e M = Alerta: «ACIMA DA ALÇADA» quando o desconto da linha passar do máximo; senão, «OK».",
      instrucao: "Escreva a fórmula do alerta e responda.",
      tabelas: [],
      comandos: [{ id: "alerta", rotulo: "Sua fórmula de Alerta (M2)", padrao: /^=\s*(SE|IF)\s*\([\s\S]*>[\s\S]*ACIMA DA AL[CÇ]ADA/i, placeholder: "=SE(G2/100>L2;\"ACIMA DA ALÇADA\";\"OK\")", dica: "Compare G2/100 (o desconto em fração) com L2 (o máximo)." }],
      resultados: [
        { id: "acima", rotulo: "Quantos itens ficaram ACIMA DA ALÇADA?", valor: I.filter((i) => i.situacao === "BLOQUEADO").length, explicacao: "CONT.SE(M:M;\"ACIMA DA ALÇADA\").", tolerancia: 0 },
        { id: "valor-acima", rotulo: "Valor líquido desses itens, que fica fora do faturamento (R$)", valor: somar(I.filter((i) => i.situacao === "BLOQUEADO").map((i) => i.liquido)), explicacao: "SOMASE(M:M;\"ACIMA DA ALÇADA\";K:K).", tolerancia: 0.5 },
      ],
      blocos: [{ tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "Se o desconto vem como 10 (número) e o máximo como 10% (0,1), comparar direto diz que 10 é maior que 0,1 e marca tudo como acima. Por isso a fórmula divide o desconto por 100: os dois lados na mesma unidade." }],
    }),
    consulta({
      id: "comissao",
      titulo: "Etapa 4 — Faturamento, atingimento e comissão",
      cenario: "Na aba Vendedores, crie D = Faturamento (SOMASES do Valor líquido com vendedor = A2 E alerta = \"OK\"), E = Atingimento (D ÷ meta), F = % de comissão (PROCV aproximado do atingimento na aba Regras) e G = Comissão (D × F).",
      instrucao: "Escreva as fórmulas e responda.",
      tabelas: [],
      comandos: [
        { id: "formula-faturamento", rotulo: "Sua fórmula de Faturamento (D2)", padrao: /^=\s*(SOMASES|SUMIFS)\s*\([\s\S]*OK/i, placeholder: "=SOMASES(Pedidos!K:K;Pedidos!C:C;A2;Pedidos!M:M;\"OK\")", dica: "SOMASES com dois critérios: o vendedor e o alerta OK." },
        { id: "percentual", rotulo: "Sua fórmula de % de comissão (F2)", padrao: /(PROCV|VLOOKUP)\s*\([\s\S]*Regras![\s\S]*(VERDADEIRO|TRUE|;\s*1\s*\)|,\s*1\s*\))/i, placeholder: "=PROCV(E2;Regras!$A$3:$B$5;2;VERDADEIRO)", dica: "PROCV aproximado (VERDADEIRO) na tabela de faixas da aba Regras." },
      ],
      resultados: [
        { id: "faturamento", rotulo: "Faturamento total do time, só com itens OK (R$)", valor: somar(ok.map((i) => i.liquido)), explicacao: "Soma da coluna Faturamento.", tolerancia: 0.5 },
        { id: "comissao-total", rotulo: "Total de comissões a pagar em agosto (R$)", valor: somar(R.map((r) => r.comissao)), explicacao: "Soma da coluna Comissão.", tolerancia: 0.5 },
        { id: "meio", rotulo: `Comissão de ${meio.vendedor.nome} (${meio.vendedor.codigo}) (R$)`, valor: meio.comissao, explicacao: `Atingimento de ${(meio.atingimento * 100).toFixed(1).replace(".", ",")}%: faixa de ${meio.percentual}%.`, tolerancia: 0.1 },
        { id: "atingimento", rotulo: `Atingimento de ${R[3].vendedor.nome} (${R[3].vendedor.codigo}) (%)`, valor: R[3].atingimento * 100, explicacao: "Faturamento ÷ meta × 100.", tolerancia: 0.1 },
      ],
    }),
    {
      id: "destaques",
      titulo: "Etapa 5 — Meta batida em verde e vendedor validado",
      passos: [
        "Na aba Vendedores, selecione o Atingimento (E2:E7). Formatação Condicional > Realçar Regras das Células > É Maior do que... > digite 0,9999 (ou use Nova Regra com =$E2>=1) > Preenchimento verde.",
        "Na aba Pedidos, selecione M2 até o fim e crie uma regra Texto que Contém «ACIMA» com vermelho claro.",
        "Selecione a coluna Vendedor de Pedidos (C2:C500) > Dados > Validação de Dados > Lista > Fonte =Vendedores!$A$2:$A$7.",
      ],
      campos: [
        { id: "verdes", rotulo: "Quantos vendedores ficaram em verde (meta batida)?", placeholder: "Número", regra: { tipo: "numero", esperado: R.filter((r) => r.atingimento >= 1).length, tolerancia: 0 }, mensagemCerta: "Certo.", mensagemErrada: "Conte os vendedores com atingimento igual ou maior que 100%." },
      ],
      blocos: [{ tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "Código de vendedor digitado errado (V7, v01, 01) faz a venda sumir do SOMASES: ninguém recebe comissão por ela. A lista impede isso na digitação." }],
    },
    consulta({
      id: "ranking",
      titulo: "Etapa 6 — Ranking e proteção",
      cenario: "Na aba Vendedores, crie H = Ranking com ORDEM (1 = maior faturamento). Depois desbloqueie as colunas de digitação de Pedidos (A a G) e proteja todas as abas (Revisão > Proteger Planilha).",
      instrucao: "Escreva a fórmula do ranking e responda.",
      tabelas: [],
      comandos: [{ id: "ordem", rotulo: "Sua fórmula de Ranking (H2)", padrao: /^=\s*(ORDEM|RANK|ORDEM\.EQ|RANK\.EQ)\s*\(/i, placeholder: "=ORDEM(D2;$D$2:$D$7)", dica: "ORDEM(faturamento da linha; todos os faturamentos com $)." }],
      resultados: [
        { id: "primeiro", rotulo: "Faturamento do 1º colocado (R$)", valor: ranking[0].faturamento, explicacao: `${ranking[0].vendedor.nome}.`, tolerancia: 0.5 },
        { id: "ultimo", rotulo: "Comissão do último colocado (R$)", valor: ranking[ranking.length - 1].comissao, explicacao: `${ranking[ranking.length - 1].vendedor.nome}, faixa de ${ranking[ranking.length - 1].percentual}%.`, tolerancia: 0.1 },
      ],
    }),
    dissertativa({
      id: "comunicado",
      titulo: "Etapa 7 — Comunicado ao time comercial",
      instrucao: "Escreva o comunicado que o Marcos vai mandar para os vendedores junto com o resultado de agosto.",
      deve: [
        "Explique a regra da comissão (faixas de atingimento) e da alçada de desconto, em linguagem direta.",
        "Apresente o resultado de agosto: faturamento do time, quem bateu a meta e o total de comissões.",
        "Diga quanto ficou de fora por desconto acima da alçada e como pedir aprovação antes de fechar o pedido.",
        "Mostre como cada vendedor pode conferir a própria comissão na planilha.",
      ],
      chave: /(comiss|meta|al[cç]ada|desconto|faturamento|aprova|ranking|faixa)/i,
      minPalavras: 80,
    }),
  ],
};

export default atividade;
