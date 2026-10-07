import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, consulta, dissertativa, somar } from "../ajudantes";
import { PEDIDOS_SETEMBRO, VENDAS_SETEMBRO } from "../dadosVendas";

const { processados: I, resumo: R } = VENDAS_SETEMBRO;
const conta = (s: string) => I.filter((i) => i.situacao === s).length;
const ok = I.filter((i) => i.situacao === "OK");
const pedidosCancelados = new Set(I.filter((i) => i.situacao === "CANCELADO").map((i) => i.pedido)).size;
const perguntas = [R[0], R[3], R[4]];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Vendas — Lançando os Pedidos na Planilha de Comissões Já Configurada",
  introducao: `Situação de trabalho real: fechamento comercial de setembro. A planilha de comissões já está pronta e protegida; o seu trabalho é PREENCHER: ${PEDIDOS_SETEMBRO.length} itens de pedido vindos do CRM e do papel, com código de produto digitado errado, item lançado duas vezes, pedido cancelado pelo cliente e desconto acima da alçada (alguns aprovados pelo gerente, outros não). Baixe a planilha pela própria atividade, lance tudo e feche as comissões.`,
  itens: [
    briefing({
      id: "briefing",
      titulo: "Fechamento das comissões de setembro",
      remetente: "Marcos Vieira, gerente comercial da Distribuidora Horizonte",
      assunto: "Lançar setembro e me mandar as comissões até sexta",
      paragrafos: [
        "A planilha está configurada com a tabela de preços, as metas e as faixas de comissão. A aba «Pedidos de setembro» tem tudo o que chegou no mês, na ordem de chegada.",
        "Regras: (1) pedido cancelado pelo cliente não se lança; (2) código de produto que não existe não entra: volta para o vendedor corrigir; (3) o mesmo item do mesmo pedido só entra uma vez; (4) desconto acima da alçada só entra no faturamento se a observação disser «Desconto aprovado pelo gerente» (aí você marca «Gerente» na coluna Aprovação); sem isso, o item fica BLOQUEADO e não conta para meta nem comissão.",
        "A comissão sai sozinha na aba Vendedores. Quero os números e a lista do que ficou de fora, com o motivo.",
      ],
      entregas: [
        "A conferência dos itens com problema (etapa 2).",
        "O faturamento e as comissões por vendedor (etapa 3).",
        "O e-mail ao time com o que ficou de fora (etapa 4).",
      ],
    }),
    {
      id: "conheca",
      titulo: "Etapa 1 — Conheça a planilha antes de lançar",
      download: {
        url: "/atividades/vendas/vendas-configurada-setembro.xlsx",
        nome: "vendas-configurada-setembro.xlsx",
        rotulo: "Baixar planilha",
        descricao: `Planilha já configurada e protegida: Produtos, Vendedores (com metas e comissão), Regras, Pedidos de setembro (${PEDIDOS_SETEMBRO.length} itens) e Lançamentos (para preencher).`,
      },
      passos: [
        "Clique em «Baixar planilha», abra no Excel e clique em Habilitar Edição se aparecer a faixa amarela.",
        "Na aba «Pedidos de setembro», os pedidos cancelados aparecem riscados. Pule esses.",
        "Na aba Lançamentos, lance os demais nas colunas A a G: Pedido, Data, Vendedor (lista), Código, Qtd, Desconto % e Aprovação (escolha «Gerente» só quando a observação disser que o desconto foi aprovado).",
        "Olhe a coluna K (Alerta): CORRIGIR CÓDIGO, DUPLICADO e BLOQUEADO — SEM APROVAÇÃO ficam fora do faturamento. Não apague: eles são a sua lista de pendências.",
        "No fim, confira a aba Vendedores: faturamento, atingimento, faixa e valor da comissão de cada um.",
      ],
      blocos: [{ tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "Marcar «Gerente» sem a aprovação escrita é dar ao vendedor uma comissão que a empresa não autorizou, e quem responde por isso é quem lançou. A coluna Aprovação existe para deixar a decisão registrada." }],
    },
    consulta({
      id: "conferencia",
      titulo: "Etapa 2 — Itens com problema",
      cenario: "Depois de lançar, conte as situações. A tabela abaixo é a mesma da aba «Pedidos de setembro».",
      instrucao: "Use CONT.SE na coluna Alerta e a coluna Status do pedido.",
      formato: "planilha",
      tabelas: [{ nome: `Pedidos de setembro (${PEDIDOS_SETEMBRO.length} itens)`, colunas: ["Pedido", "Data", "Vendedor", "Cliente", "Código", "Qtd", "Desconto %", "Status", "Observação"], linhas: PEDIDOS_SETEMBRO.map((i) => [i.pedido, i.data, i.vendedor, i.cliente, i.codigo, i.quantidade, i.desconto, i.status, i.obs]) }],
      comandos: [],
      resultados: [
        { id: "cancelados", rotulo: "Pedidos cancelados (pedidos, não itens)", valor: pedidosCancelados, explicacao: "Pedidos com status Cancelado: nenhum item deles se lança.", tolerancia: 0 },
        { id: "codigo", rotulo: "Itens com código de produto inexistente", valor: conta("CÓDIGO INVÁLIDO"), explicacao: "Letra no lugar do zero, espaço no lugar do hífen ou código fora da tabela.", tolerancia: 0 },
        { id: "duplicados", rotulo: "Itens repetidos", valor: conta("DUPLICADO"), explicacao: "Mesmo pedido e mesmo código aparecendo de novo.", tolerancia: 0 },
        { id: "bloqueados", rotulo: "Itens bloqueados por desconto acima da alçada sem aprovação", valor: conta("BLOQUEADO"), explicacao: "Alerta BLOQUEADO — SEM APROVAÇÃO.", tolerancia: 0 },
        { id: "excecoes", rotulo: "Itens acima da alçada que entraram por aprovação do gerente", valor: I.filter((i) => i.excecao).length, explicacao: "Os que você marcou como «Gerente».", tolerancia: 0 },
        { id: "ok", rotulo: "Itens com Alerta OK (contam para a comissão)", valor: ok.length, explicacao: "CONT.SE(K:K;\"OK\").", tolerancia: 0 },
      ],
    }),
    consulta({
      id: "comissoes",
      titulo: "Etapa 3 — Faturamento e comissões",
      cenario: "Leia a aba Vendedores. Para o valor que ficou de fora, some na aba Lançamentos o Valor líquido dos itens BLOQUEADOS (SOMASE).",
      instrucao: "Informe os números.",
      tabelas: [],
      comandos: [],
      resultados: [
        { id: "faturamento", rotulo: "Faturamento total do time em setembro (R$)", valor: somar(R.map((r) => r.faturamento)), explicacao: "Soma da coluna Faturamento da aba Vendedores.", tolerancia: 0.5 },
        { id: "comissoes", rotulo: "Total de comissões a pagar (R$)", valor: somar(R.map((r) => r.comissao)), explicacao: "Soma da coluna Comissão.", tolerancia: 0.5 },
        { id: "metas", rotulo: "Quantos vendedores bateram a meta?", valor: R.filter((r) => r.atingimento >= 1).length, explicacao: "Atingimento de 100% ou mais (em verde).", tolerancia: 0 },
        { id: "fora", rotulo: "Valor líquido bloqueado por falta de aprovação (R$)", valor: somar(I.filter((i) => i.situacao === "BLOQUEADO").map((i) => i.liquido)), explicacao: "SOMASE(K:K;\"BLOQUEADO — SEM APROVAÇÃO\";J:J).", tolerancia: 0.5 },
        ...perguntas.map((r) => ({ id: `comissao-${r.vendedor.codigo}`, rotulo: `Comissão de ${r.vendedor.nome} (${r.vendedor.codigo}) (R$)`, valor: r.comissao, explicacao: `Faturamento ${r.faturamento.toFixed(2).replace(".", ",")} × ${r.percentual}% (atingimento de ${(r.atingimento * 100).toFixed(1).replace(".", ",")}%).`, tolerancia: 0.1 })),
      ],
    }),
    dissertativa({
      id: "email",
      titulo: "Etapa 4 — E-mail ao time com o fechamento",
      instrucao: "Escreva o e-mail do fechamento de setembro para os vendedores, com cópia para o gerente.",
      deve: [
        "Informe o faturamento do time, quem bateu a meta e o total de comissões.",
        "Liste o que ficou de fora e por quê: códigos errados (o vendedor precisa corrigir), itens repetidos, pedidos cancelados e descontos sem aprovação.",
        "Diga quanto em vendas ficou bloqueado e o que fazer para que isso entre no mês (aprovação antes de fechar o pedido).",
        "Proponha um cuidado para o mês seguinte que evite os erros de lançamento.",
      ],
      chave: /(comiss|meta|c[oó]digo|duplic|repetid|cancel|al[cç]ada|aprova|bloque)/i,
      minPalavras: 80,
    }),
  ],
};

export default atividade;
