import type { ProvaInterativa } from "@/types/quiz";

/** Formatada a partir de "Avaliação Prática - Power BI" (PDF do portal antigo, atividade 2 — Funcionários): mesmos passos e tabela de dados. */
const prova: ProvaInterativa = {
  tipo: "pratica",
  titulo: "Power BI — Avaliação Prática: Análise de Dados de Funcionários",
  instrucoes: [
    "Objetivo: aprender a importar dados, criar um gráfico de pizza, um cartão resumo e usar um filtro básico no Power BI.",
    "Passo 1 (Preparação dos dados): Digite no Excel a tabela abaixo e salve o arquivo como Funcionarios.xlsx.",
    "Passo 2 (Importação de dados no Power BI): Abra o Power BI Desktop. Clique em Obter Dados → Excel, selecione Funcionarios.xlsx e carregue os dados para o Power BI.",
    "Passo 3 (Criar visualizações): (a) Gráfico de Pizza: selecione Gráfico de Pizza e arraste Departamento para Legendas e Salário para Valores — mostra a proporção do total de salários por departamento. (b) Cartão Resumo: selecione Cartão e arraste Salário para Campos — exibe o valor total dos salários. (c) Tabela de Dados: selecione Tabela e arraste Nome, Departamento e Salário para os campos — exibe os dados individuais.",
    "Passo 4 (Aplicar filtro): Abra o Painel de Filtros, à direita. Arraste o campo Idade para a área de Filtros do relatório e configure para exibir apenas funcionários com mais de 30 anos.",
    "Tarefa final: personalize o relatório (cores, fontes, títulos) e salve como Relatorio_Funcionarios.pbix. Tire um print do relatório com o filtro aplicado (Print_Funcionarios.png).",
    "Entrega: coloque Relatorio_Funcionarios.pbix, Funcionarios.xlsx e Print_Funcionarios.png numa pasta, compacte em .zip e envie no campo abaixo.",
  ],
  exemploTabela: {
    rotulo: "Dados para a avaliação — digite exatamente esta tabela",
    colunas: ["Nome", "Departamento", "Salário", "Idade", "Data de Admissão"],
    linhas: [
      ["João Silva", "Vendas", "3000", "28", "01/01/2020"],
      ["Maria Souza", "RH", "4500", "35", "15/03/2019"],
      ["Ana Costa", "TI", "5000", "30", "20/07/2021"],
      ["Pedro Lima", "Vendas", "3200", "26", "05/06/2018"],
      ["Carla Dias", "Marketing", "4000", "29", "12/11/2020"],
      ["Lucas Santos", "Vendas", "7000", "28", "05/01/2020"],
      ["Mariana Lima", "RH", "4300", "37", "13/03/2019"],
      ["Ana Clara Lemos", "TI", "5600", "31", "19/07/2021"],
      ["Pedro Lucas", "Vendas", "3800", "25", "02/06/2018"],
      ["Karen Santana", "Marketing", "7500", "33", "11/11/2020"],
      ["João Pedro", "Vendas", "9500", "22", "08/01/2020"],
      ["Tárcio Oliveira", "RH", "8400", "34", "07/05/2020"],
    ],
  },
  envioArquivo: {
    obrigatorio: true,
    extensoes: [".zip", ".pbix"],
    rotulo: "Envie a pasta compactada (.zip) com o relatório, a planilha e o print",
  },
};

export default prova;
