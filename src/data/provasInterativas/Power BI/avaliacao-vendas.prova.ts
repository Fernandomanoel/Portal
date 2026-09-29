import type { ProvaInterativa } from "@/types/quiz";

/** Formatada a partir de "Avaliação Prática - Power BI" (PDF do portal antigo, atividade 1): mesmos 5 passos, pontuação e tabela de dados. */
const prova: ProvaInterativa = {
  tipo: "pratica",
  titulo: "Power BI — Avaliação Prática: Relatório de Vendas",
  instrucoes: [
    "Objetivo: aprender a importar dados, criar visualizações básicas e personalizar um relatório no Power BI.",
    "Passo 1 (Preparação dos dados · 2,0 pontos): Digite no Excel a tabela de dados abaixo e salve o arquivo como DadosVendas.xlsx.",
    "Passo 2 (Importação de dados no Power BI · 2,0 pontos): Abra o Power BI Desktop. Clique em Obter Dados → Excel, importe o arquivo DadosVendas.xlsx e carregue os dados para o Power BI.",
    "Passo 3 (Criar visualizações · 2,0 pontos): (a) Gráfico de Barras: selecione Gráfico de Barras Clusterizado e arraste Categoria para o eixo Y e Vendas para Valores. (b) Cartão Resumo: selecione Cartão e arraste Vendas para o campo Campos — ele mostrará o total de vendas. (c) Gráfico de Linha: selecione Gráfico de Linha e arraste Data da Venda para o eixo X e Vendas para Valores — mostrará a evolução das vendas ao longo do tempo.",
    "Passo 4 (Personalização do relatório · 2,0 pontos): Adicione um título ao relatório em Inserir → Caixa de Texto. Formate os gráficos (cores, rótulos de dados) para deixar mais visual. Salve o relatório como Relatorio_Vendas.pbix.",
    "Passo 5 (Tarefa final · 2,0 pontos): Adicione um filtro de Categoria no painel. Modifique o gráfico de barras para exibir os Custos em vez de Vendas. Tire um print do relatório finalizado (salve como Print_Relatorio.png).",
    "Entrega: coloque Relatorio_Vendas.pbix, DadosVendas.xlsx e Print_Relatorio.png numa pasta, compacte em .zip e envie no campo abaixo.",
  ],
  exemploTabela: {
    rotulo: "Dados para a avaliação — digite exatamente esta tabela",
    colunas: ["Produto", "Categoria", "Vendas", "Custo", "Data da Venda"],
    linhas: [
      ["Produto A", "Eletrônicos", "1000", "600", "01/01/2024"],
      ["Produto B", "Eletrônicos", "800", "500", "02/01/2024"],
      ["Produto C", "Vestuário", "600", "300", "03/01/2024"],
      ["Produto D", "Eletrônicos", "1200", "800", "04/01/2024"],
      ["Produto E", "Vestuário", "700", "400", "05/01/2024"],
      ["Produto C", "Vestuário", "600", "300", "06/01/2024"],
      ["Produto D", "Eletrônicos", "1200", "800", "07/01/2024"],
      ["Produto E", "Vestuário", "700", "400", "08/01/2024"],
      ["Produto G", "Eletrônicos", "550", "700", "09/01/2024"],
      ["Produto H", "Vestuário", "850", "650", "10/01/2024"],
      ["Produto I", "Eletrônicos", "1300", "530", "11/01/2024"],
      ["Produto J", "Vestuário", "900", "440", "12/01/2024"],
      ["Produto K", "Eletrônicos", "950", "900", "13/01/2024"],
      ["Produto L", "Vestuário", "870", "850", "14/01/2024"],
    ],
  },
  envioArquivo: {
    obrigatorio: true,
    extensoes: [".zip", ".pbix"],
    rotulo: "Envie a pasta compactada (.zip) com o relatório, a planilha e o print",
  },
};

export default prova;
