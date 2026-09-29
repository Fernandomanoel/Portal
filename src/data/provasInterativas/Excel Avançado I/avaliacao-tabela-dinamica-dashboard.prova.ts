import type { ProvaInterativa } from "@/types/quiz";

/** Formatada a partir de "Avaliação Prática - Excel Avançado I" (PDF do portal antigo): mesmos 5 passos e a mesma base de dados. */
const prova: ProvaInterativa = {
  tipo: "pratica",
  titulo: "Excel Avançado I — Avaliação Prática: Fórmulas, Tabela Dinâmica e Dashboard",
  instrucoes: [
    "Objetivo: avaliar a capacidade de usar ferramentas essenciais do Excel — criação de fórmulas, construção de tabelas dinâmicas e desenvolvimento de um dashboard — em cenários práticos. Cada passo vale 2,0 pontos.",
    "Passo 1 (Criar e preencher a base de dados · 2,0 pontos): Abra o Microsoft Excel, crie uma nova planilha e digite a base de dados de produtos do exemplo abaixo (ID do Produto, Nome do Produto, Categoria, Quantidade Vendida e Preço Unitário).",
    "Salve a planilha com o nome Avaliacao_Excel_SeuNome.xlsx.",
    "Crie uma coluna com o nome \"Receita Total\" e multiplique a Quantidade Vendida pelo Preço Unitário com a fórmula =D2*E2. Arraste a fórmula para preencher todas as linhas.",
    "Passo 2 (Criar uma Tabela Dinâmica · 2,0 pontos): Em outra planilha (aba) do mesmo arquivo, crie uma tabela com as colunas Produto, Categoria, Vendas e Mês, e os dados: Produto A, Eletrônicos, 1500, Janeiro · Produto B, Roupas, 1200, Janeiro · Produto C, Eletrônicos, 1800, Fevereiro · Produto D, Roupas, 1100, Fevereiro · Produto E, Eletrônicos, 2000, Março · Produto F, Roupas, 1300, Março.",
    "Selecione a tabela de dados, vá para a guia Inserir e clique em Tabela Dinâmica. Escolha onde colocá-la (em uma nova planilha ou na planilha existente).",
    "Configure a Tabela Dinâmica: arraste o campo Categoria para a área de Linhas, o campo Mês para a área de Colunas e o campo Vendas para a área de Valores.",
    "Passo 3 (Construção de um Dashboard · 2,0 pontos): Clique no ícone de + na parte inferior do Excel para adicionar uma nova planilha e renomeie-a para Dashboard (botão direito na aba da planilha → Renomear).",
    "Selecione a Tabela Dinâmica que você criou, vá para a guia Inserir e escolha Gráfico de Colunas ou Gráfico de Pizza. Ajuste o gráfico conforme necessário e mova-o para a planilha Dashboard.",
    "Passo 4 (Segmentação de Dados · 2,0 pontos): Selecione a Tabela Dinâmica, vá para a guia Analisar (ou Ferramentas de Tabela Dinâmica) e clique em Inserir Segmentação de Dados.",
    "Escolha os campos que deseja usar para filtrar (por exemplo, Categoria e Mês). Clique e arraste as segmentações de dados para a planilha Dashboard e ajuste o tamanho e a posição conforme necessário.",
    "Passo 5 (Revisão e salvamento final · 2,0 pontos): Revise toda a planilha, garantindo que as fórmulas, a tabela dinâmica e o dashboard estejam funcionando corretamente.",
    "Salve o arquivo novamente, certificando-se de que está na pasta correta. Demonstre que sabe salvar e localizar o arquivo sozinho, garantindo que ele esteja armazenado corretamente antes de finalizar a prova. Envie a planilha no campo abaixo.",
  ],
  exemploTabela: {
    rotulo: "Base de dados do Passo 1 — digite estes dados",
    colunas: ["ID do Produto", "Nome do Produto", "Categoria", "Quantidade Vendida", "Preço Unitário"],
    linhas: [
      ["101", "Produto A", "Eletrônicos", "10", "150,00"],
      ["102", "Produto B", "Vestuário", "5", "80,00"],
      ["103", "Produto C", "Alimentos", "20", "25,00"],
      ["104", "Produto D", "Eletrônicos", "7", "200,00"],
      ["105", "Produto E", "Vestuário", "12", "50,00"],
      ["106", "Produto F", "Alimentos", "15", "30,00"],
      ["107", "Produto G", "Eletrônicos", "8", "400,00"],
      ["108", "Produto H", "Vestuário", "10", "60,00"],
      ["109", "Produto I", "Alimentos", "25", "20,00"],
      ["110", "Produto J", "Eletrônicos", "6", "500,00"],
    ],
  },
  envioArquivo: {
    obrigatorio: true,
    extensoes: [".xlsx", ".xls"],
    rotulo: "Envie a planilha Avaliacao_Excel_SeuNome.xlsx",
  },
};

export default prova;
