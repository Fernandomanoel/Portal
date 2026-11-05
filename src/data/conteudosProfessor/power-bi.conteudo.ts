import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "O Power BI transforma dados em painéis (dashboards) que ajudam a decidir. O curso explica o que é Business Intelligence, o fluxo de trabalho (conectar, tratar, modelar, visualizar, publicar), a escolha de gráficos e as medidas em DAX, usando bases de RH e de vendas.",
  topicos: [
    {
      titulo: "O que é Business Intelligence e o que é um dashboard",
      texto: [
        "Business Intelligence (BI) é o conjunto de práticas e ferramentas que organiza dados da empresa para apoiar decisões. Dashboard é um painel visual que reúne os indicadores mais importantes em uma tela, com gráficos, números e filtros. Um bom dashboard responde a uma pergunta de negócio (as vendas estão crescendo? onde está o maior custo?) e é claro à primeira vista.",
        "O Power BI tem três partes: o Power BI Desktop (onde se constrói), o serviço online (onde se publica e compartilha) e o aplicativo móvel.",
      ],
      pontos: ["Explicar a função de um dashboard.", "Citar as três partes do Power BI."],
      atividades: ["powerbi-primeiro-dashboard"],
    },
    {
      titulo: "Conectar e tratar os dados (Power Query)",
      texto: [
        "O primeiro passo é conectar a fonte de dados (Excel, CSV, banco de dados, web). O Power Query é o editor onde os dados são tratados antes de serem usados: remover colunas e linhas, corrigir tipos (texto, número, data), remover duplicados, preencher vazios e dividir colunas. Cada ação fica registrada em «etapas aplicadas», e pode ser refeita quando a base for atualizada.",
        "Dados mal tratados geram gráficos errados: uma data como texto não vira linha do tempo, e um número com vírgula errada soma errado.",
      ],
      pontos: ["Conectar um arquivo do Excel.", "Corrigir os tipos de dados.", "Remover duplicados e linhas vazias."],
      erros: ["Pular o tratamento e ir direto aos gráficos.", "Deixar colunas numéricas como texto."],
      atividades: ["powerbi-primeiro-dashboard", "powerbi-analise-rh"],
    },
    {
      titulo: "Modelagem: tabelas fato, dimensão e relacionamentos",
      texto: [
        "Para analisar com mais de uma tabela, relacionam-se por uma coluna em comum. A tabela fato guarda os eventos (cada venda, com valor e data); as tabelas dimensão guardam as descrições (produtos, clientes, calendário). Relacionamentos geralmente são de um para muitos: um produto aparece em muitas vendas. Esse arranjo se chama modelo estrela.",
      ],
      pontos: ["Distinguir fato de dimensão.", "Criar um relacionamento por uma chave."],
      atividades: ["powerbi-analise-de-vendas", "powerbi-dashboard-atacadao"],
    },
    {
      titulo: "Visualizações: escolher o gráfico certo",
      texto: [
        "Cada pergunta pede um tipo de gráfico. Comparar categorias: colunas ou barras. Evolução no tempo: linhas. Participação em um total: pizza ou rosca (poucas fatias). Valores únicos importantes: cartões. Detalhes: tabelas e matrizes. Mapas para dados geográficos. Segmentações de dados (filtros) deixam o usuário explorar.",
        "Boas práticas: um título claro, poucas cores com propósito, números formatados (moeda, porcentagem) e nada que distraia.",
      ],
      pontos: ["Escolher o gráfico para uma pergunta.", "Usar segmentação de dados para filtrar."],
      erros: ["Gráfico de pizza com muitas fatias.", "Painel sobrecarregado de gráficos."],
      atividades: ["powerbi-analise-rh", "powerbi-analise-de-vendas", "powerbi-dashboard-atacadao"],
    },
    {
      titulo: "Medidas e DAX básico",
      texto: [
        "Medidas são cálculos feitos na hora, segundo o filtro do painel, escritos em DAX (a linguagem de fórmulas do Power BI). Exemplos: Total de Vendas = SUM(Vendas[Valor]); Quantidade de Pedidos = COUNTROWS(Vendas); Ticket Médio = DIVIDE([Total de Vendas], [Quantidade de Pedidos]). Colunas calculadas, por sua vez, são calculadas linha a linha e armazenadas na tabela.",
      ],
      pontos: ["Escrever uma medida de soma e uma de contagem.", "Dizer a diferença entre medida e coluna calculada."],
      atividades: ["powerbi-dashboard-atacadao"],
    },
    {
      titulo: "Publicar e compartilhar",
      texto: [
        "Depois de pronto, o relatório pode ser publicado no serviço do Power BI e compartilhado com colegas, com permissões adequadas. Dados de RH e financeiros são sensíveis: só devem ser vistos por quem precisa. A atualização agendada mantém o painel em dia.",
      ],
      pontos: ["Explicar por que a segurança dos dados importa."],
    },
  ],
  glossario: [
    { termo: "Dashboard", definicao: "Painel visual com os principais indicadores." },
    { termo: "Power Query", definicao: "Editor para tratar e transformar os dados." },
    { termo: "DAX", definicao: "Linguagem de fórmulas do Power BI." },
    { termo: "Medida", definicao: "Cálculo feito de acordo com os filtros do painel." },
    { termo: "Tabela fato", definicao: "Tabela com os eventos medidos (vendas, por exemplo)." },
    { termo: "Segmentação", definicao: "Filtro visual que o usuário usa para explorar o painel." },
  ],
  dicas: [
    "Comece sempre por uma pergunta de negócio e só depois abra o programa.",
    "Peça que os alunos descrevam, em uma frase, o que o painel mostra: se não conseguem, o painel está confuso.",
    "A interface do Power BI muda com atualizações mensais: ensine o conceito e peça para localizar o recurso no menu atual.",
  ],
};

export default conteudo;
