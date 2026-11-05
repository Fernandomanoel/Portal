import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Análise de dados é transformar números em respostas para decisões. O curso cobre o ciclo de vida da análise, estatística descritiva, SQL (consulta, limpeza e transformação), clusterização, Big Data e Python (pandas e gráficos).",
  topicos: [
    {
      titulo: "Ciclo de vida da análise de dados",
      texto: [
        "A análise segue etapas: definir a pergunta de negócio, coletar os dados, limpar e preparar, explorar, analisar ou modelar, comunicar os resultados e agir. A parte da limpeza costuma tomar a maior parte do tempo. Dados são estruturados (tabelas), semiestruturados (JSON) e não estruturados (texto, imagens).",
      ],
      pontos: ["Listar as etapas do ciclo.", "Dar exemplos de dados estruturados e não estruturados."],
      atividades: ["dados-introducao-e-ciclo-de-vida"],
    },
    {
      titulo: "Estatística descritiva",
      texto: [
        "Resume um conjunto de dados. Média é a soma dividida pela quantidade (sensível a valores extremos). Mediana é o valor central depois de ordenar (mais estável). Moda é o valor que mais aparece. Amplitude é a diferença entre o maior e o menor. Desvio padrão mede o quanto os valores se afastam da média: quanto maior, mais dispersos.",
        "Outliers são valores muito distantes dos demais e podem ser erro ou um caso importante: investigue antes de apagar.",
      ],
      pontos: ["Calcular média, mediana e moda.", "Interpretar o desvio padrão."],
      exemplo: "Vendas: 10, 12, 11, 13, 100. Média = 29,2; mediana = 12. O valor 100 puxa a média.",
      atividades: ["dados-fundamentos-estatisticos"],
    },
    {
      titulo: "SQL para análise: consultar dados",
      texto: [
        "SQL é a linguagem para consultar bancos de dados relacionais. Comandos principais: SELECT (colunas), FROM (tabela), WHERE (filtro das linhas), GROUP BY (agrupar), HAVING (filtro de grupos), ORDER BY (ordenar), JOIN (juntar tabelas) e funções de agregação (COUNT, SUM, AVG, MIN, MAX). A ordem de escrita é SELECT, FROM, WHERE, GROUP BY, HAVING e ORDER BY.",
      ],
      pontos: ["Escrever um SELECT com filtro, agrupamento e ordenação.", "Explicar a diferença entre INNER JOIN e LEFT JOIN."],
      exemplo: "SELECT categoria, SUM(valor) FROM vendas GROUP BY categoria ORDER BY 2 DESC;",
      erros: ["Usar WHERE para filtrar o resultado de um agrupamento (o certo é HAVING).", "Esquecer a condição do JOIN e multiplicar as linhas."],
      atividades: ["dados-sql-analise-de-dados"],
    },
    {
      titulo: "Limpeza e transformação de dados em SQL",
      texto: [
        "Limpar é encontrar e tratar problemas: valores nulos (contar com COUNT e IS NULL), duplicados (GROUP BY com HAVING COUNT(*) > 1), textos fora do padrão (UPPER, LOWER, TRIM). Transformar é juntar tabelas, criar colunas calculadas e classificar com CASE WHEN. Um dado de má qualidade leva a uma decisão ruim.",
      ],
      pontos: ["Contar nulos e achar duplicados.", "Usar CASE WHEN para criar uma categoria."],
      atividades: ["dados-sql-limpeza-de-dados", "dados-sql-manipulacao-e-transformacao"],
    },
    {
      titulo: "Clusterização",
      texto: [
        "Clusterização agrupa itens parecidos sem rótulos prévios, por exemplo segmentar clientes por comportamento de compra. No método k-means escolhe-se o número de grupos (k), atribui-se cada ponto ao centro mais próximo, recalcula-se o centro de cada grupo e repete-se até estabilizar. Serve para segmentação de mercado e detecção de padrões.",
      ],
      pontos: ["Explicar a ideia de agrupar por semelhança.", "Descrever os passos do k-means."],
      atividades: ["dados-clusterizacao-e-metodos"],
    },
    {
      titulo: "Big Data e Python (pandas) para análise",
      texto: [
        "Big Data são volumes de dados que exigem ferramentas especiais, descritos pelos 5 Vs: Volume, Velocidade, Variedade, Veracidade e Valor. Em Python, a biblioteca pandas organiza os dados em DataFrames (tabelas): ler arquivos (read_csv), ver o início (head), resumir (describe), filtrar, agrupar (groupby) e tratar nulos. As bibliotecas Matplotlib e Seaborn desenham os gráficos.",
      ],
      pontos: ["Citar os 5 Vs.", "Ler um CSV com pandas e fazer um resumo."],
      exemplo: "df = pd.read_csv('vendas.csv'); df.groupby('regiao')['valor'].sum()",
      atividades: ["dados-big-data-e-python-descritiva", "dados-python-extracao-tratamento-e-graficos"],
    },
  ],
  glossario: [
    { termo: "DataFrame", definicao: "Tabela de dados em Python, usada na biblioteca pandas." },
    { termo: "Outlier", definicao: "Valor muito distante dos demais." },
    { termo: "Mediana", definicao: "Valor do meio em um conjunto ordenado." },
    { termo: "JOIN", definicao: "Operação que junta linhas de duas tabelas por uma chave." },
    { termo: "Cluster", definicao: "Grupo de itens parecidos entre si." },
    { termo: "Big Data", definicao: "Grandes volumes de dados, de formatos variados e geração rápida." },
  ],
  dicas: [
    "Dê sempre um contexto de negócio: «o que o gerente quer saber?».",
    "Insista em olhar os dados (head, contagens) antes de calcular qualquer coisa.",
    "Corrija o resultado e a interpretação: não basta o número certo, é preciso dizer o que ele quer dizer.",
  ],
};

export default conteudo;
