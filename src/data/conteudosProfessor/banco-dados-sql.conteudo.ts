import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Banco de dados é um conjunto organizado de informações que permite guardar, achar e alterar dados com segurança. O curso introduz o modelo relacional e a linguagem SQL: criar tabelas, inserir, consultar, alterar e excluir dados.",
  topicos: [
    {
      titulo: "O que é um banco de dados",
      texto: [
        "Um banco de dados guarda informações em tabelas (como planilhas relacionadas): cada linha é um registro, e cada coluna, um campo com um tipo (texto, número, data). O SGBD (sistema gerenciador de banco de dados), como MySQL, SQLite, PostgreSQL e SQL Server, controla o acesso e a segurança.",
        "Chave primária identifica cada registro de modo único (um código de produto, por exemplo). Chave estrangeira liga uma tabela a outra, criando o relacionamento.",
      ],
      pontos: ["Explicar registro, campo e tabela.", "Distinguir chave primária de chave estrangeira."],
      atividades: ["sql-apostila", "sql-primeiro-banco-de-dados"],
    },
    {
      titulo: "Criando tabelas e inserindo dados (DDL e INSERT)",
      texto: [
        "CREATE TABLE define a estrutura: nome, colunas e tipos. INSERT INTO acrescenta registros. Tipos comuns: INT (inteiro), DECIMAL (valores com casas), VARCHAR (texto) e DATE (data). Convém escolher o tipo certo e marcar a chave primária.",
      ],
      pontos: ["Escrever um CREATE TABLE simples.", "Inserir registros."],
      exemplo: "CREATE TABLE produtos (id INT PRIMARY KEY, nome VARCHAR(50), preco DECIMAL(10,2));\nINSERT INTO produtos VALUES (1, 'Caneta', 2.50);",
      erros: ["Esquecer as aspas em textos.", "Repetir uma chave primária."],
      atividades: ["sql-guia-para-iniciantes", "sql-cadastro-de-produtos"],
    },
    {
      titulo: "Consultando: SELECT, WHERE e ORDER BY",
      texto: [
        "SELECT escolhe as colunas e FROM, a tabela. WHERE filtra as linhas com condições (=, >, <, BETWEEN, LIKE, AND, OR). ORDER BY ordena (ASC crescente, DESC decrescente). SELECT * traz todas as colunas, o que é útil para explorar e mau hábito em sistemas grandes.",
      ],
      pontos: ["Filtrar com WHERE e vários operadores.", "Ordenar o resultado."],
      exemplo: "SELECT nome, preco FROM produtos WHERE preco > 5 ORDER BY preco DESC;",
      atividades: ["sql-cadastro-de-produtos"],
    },
    {
      titulo: "Alterando e excluindo: UPDATE e DELETE",
      texto: [
        "UPDATE altera registros existentes e DELETE os remove. Os dois são perigosos sem WHERE: atingem a tabela inteira. A boa prática é rodar antes um SELECT com a mesma condição para ver quais linhas serão afetadas.",
      ],
      pontos: ["Escrever UPDATE e DELETE com WHERE.", "Explicar o risco de esquecer o WHERE."],
      erros: ["UPDATE ou DELETE sem WHERE."],
      atividades: ["sql-cadastro-de-produtos"],
    },
    {
      titulo: "Agrupamento e junção de tabelas",
      texto: [
        "Funções de agregação resumem dados: COUNT, SUM, AVG, MIN e MAX. GROUP BY agrupa. JOIN junta tabelas relacionadas por uma chave: INNER JOIN traz só o que existe nas duas; LEFT JOIN traz tudo da esquerda, mesmo sem par.",
      ],
      pontos: ["Calcular totais por grupo.", "Juntar duas tabelas."],
      atividades: ["sql-apostila"],
    },
  ],
  glossario: [
    { termo: "SGBD", definicao: "Sistema que gerencia o banco de dados." },
    { termo: "Chave primária", definicao: "Campo que identifica cada registro de forma única." },
    { termo: "Chave estrangeira", definicao: "Campo que liga uma tabela a outra." },
    { termo: "Consulta (query)", definicao: "Comando que pede dados ao banco." },
    { termo: "JOIN", definicao: "Junção de tabelas por uma chave." },
  ],
  dicas: [
    "Use um tema do cotidiano (loja, biblioteca) e monte as tabelas junto com a turma.",
    "Ensine a ler o erro do SQL: quase sempre indica o ponto do problema.",
    "Reforce o hábito: antes de DELETE ou UPDATE, um SELECT com o mesmo WHERE.",
  ],
};

export default conteudo;
