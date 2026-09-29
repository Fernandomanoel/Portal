import type { ProvaInterativa } from "@/types/quiz";

/** Formatada a partir de "Avaliação Prática: Excel Essencial" (PDF do portal antigo): mesmas 5 questões e a mesma tabela de dados. */
const prova: ProvaInterativa = {
  tipo: "pratica",
  titulo: "Excel Avançado I — Avaliação Prática: Excel Essencial",
  instrucoes: [
    "Instruções gerais: leia atentamente todas as questões antes de iniciar; use o Microsoft Excel (ou similar); as respostas devem estar no próprio arquivo Excel, que será entregue ao final; em caso de dúvidas, consulte o professor. Digite a tabela de dados abaixo numa planilha nova — ela é a base de todas as questões. Cada questão vale 2,0 pontos.",
    "Questão 1 (Cálculo de totais · 2,0 pontos): Crie uma nova coluna ao lado de \"Preço Unitário\" e renomeie-a como \"Total da Venda\". Calcule o valor total de cada venda multiplicando a Quantidade pelo Preço Unitário correspondente.",
    "Questão 2 (Fórmulas de resumo · 2,0 pontos): Em células abaixo da tabela de dados, calcule o \"Total Geral de Vendas\" (somando todos os valores da coluna \"Total da Venda\") e a \"Média de Preço Unitário\" de todos os produtos listados.",
    "Questão 3 (Pesquisa de dados com PROCV · 2,0 pontos): Em uma célula separada, use a função PROCV para encontrar o Produto, o Preço Unitário e a Categoria do ID 109. Apresente o resultado de forma clara, num pequeno quadro: um título \"ID 109\" e, abaixo, as linhas produto, Preço unitário e categoria com o valor de cada uma.",
    "Exemplo de fórmula: =PROCV(105; A2:F11; 5; 0) — esse exemplo busca o ID 105 (Webcam, 250, Hardware) no intervalo A2:F11 e devolve a coluna indicada.",
    "Questão 4 (Tabela Dinâmica · 2,0 pontos): Crie uma Tabela Dinâmica em uma nova planilha. Ela deve mostrar o \"Total da Venda\" (soma) para cada \"Categoria\" de produto, e estar formatada de maneira legível.",
    "Questão 5 (Gráfico Dinâmico · 2,0 pontos): Com base na Tabela Dinâmica da Questão 4, insira um Gráfico Dinâmico de Colunas. O gráfico deve mostrar o total de vendas por categoria, facilitando ver as categorias com maior e menor faturamento. Salve o arquivo e envie no campo abaixo.",
  ],
  exemploTabela: {
    rotulo: "Dados para a avaliação — digite exatamente esta tabela",
    colunas: ["ID", "Produto", "Categoria", "Quantidade", "Preço Unitário"],
    linhas: [
      ["101", "Mouse", "Periféricos", "10", "50,00"],
      ["102", "Teclado", "Periféricos", "5", "150,00"],
      ["103", "Monitor", "Hardware", "2", "800,00"],
      ["104", "Headset", "Acessórios", "8", "120,00"],
      ["105", "Webcam", "Hardware", "4", "250,00"],
      ["106", "Laptop", "Computadores", "1", "3500,00"],
      ["107", "Tablet", "Computadores", "3", "1200,00"],
      ["108", "Impressora", "Hardware", "2", "600,00"],
      ["109", "Caixa de Som", "Acessórios", "6", "180,00"],
      ["110", "Mousepad", "Periféricos", "15", "30,00"],
    ],
  },
  envioArquivo: {
    obrigatorio: true,
    extensoes: [".xlsx", ".xls"],
    rotulo: "Envie a planilha com todas as respostas",
  },
};

export default prova;
