import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/sql-primeiro-banco-de-dados.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Básica de Banco de Dados",
  introducao: "Meu Primeiro Banco de Dados",
  itens: [
    {
      id: "meu-primeiro-banco-de-dados",
      titulo: "Meu Primeiro Banco de Dados",
      blocos: [
        {
          tipo: "texto",
          texto: "Uma escola decidiu criar um pequeno banco de dados para armazenar informações sobre seus alunos. Para isso, será criada uma tabela chamada alunos, que guardará alguns dados importantes.",
        },
        {
          tipo: "texto",
          texto: "A tabela deve conter as seguintes informações:",
        },
        {
          tipo: "lista",
          itens: ["id (do aluno)","nome (do aluno)","idade","cidade (onde mora)"],
        },
        {
          tipo: "texto",
          texto: "Depois de criar a tabela, alguns registros de alunos deverão ser inseridos no banco de dados.",
        },
        {
          tipo: "texto",
          texto: "Com os dados cadastrados, responda às seguintes perguntas utilizando consultas SQL:",
        },
        {
          tipo: "lista",
          itens: [
            "Mostre todos os dados da tabela alunos.",
            "Mostre apenas o nome e a idade dos alunos.",
            "Mostre os alunos que moram em Manaus.",
            "Mostre os alunos que têm idade maior que 20 anos.",
            "Liste todos os alunos ordenados pela idade do maior para o menor.",
          ],
          numerada: true,
        },
        {
          tipo: "nota",
          variante: "objetivo",
          rotulo: "Objetivo da atividade",
          texto: "Praticar comandos básicos de SQL como CREATE TABLE, INSERT INTO, SELECT, WHERE e ORDER BY.",
        },
      ],
    },
    {
      id: "parte-1-criar-a-tabela",
      titulo: "Parte 1: Criar a tabela",
      blocos: [
        {
          tipo: "texto",
          texto: "Crie uma tabela chamada alunos com as seguintes colunas:",
        },
        {
          tipo: "lista",
          itens: ["id (inteiro, chave primária)","nome (texto)","idade (inteiro)","cidade (texto)"],
        },
        {
          tipo: "texto",
          texto: "Escreva o código abaixo:",
        },
        {
          tipo: "codigo",
          conteudo: `CREATE TABLE alunos (
   id INT PRIMARY KEY,
   nome VARCHAR(100),
   idade INT,
   cidade VARCHAR(100)
);`,
        },
      ],
    },
    {
      id: "parte-2-inserir-dados",
      titulo: "Parte 2: Inserir dados",
      blocos: [
        {
          tipo: "texto",
          texto: "Insira alguns alunos na tabela:",
        },
        {
          tipo: "codigo",
          conteudo: `INSERT INTO alunos (id, nome, idade, cidade) VALUES
(1, 'Ana', 20, 'Manaus'),
(2, 'Carlos', 22, 'São Paulo'),
(3, 'Marina', 19, 'Rio de Janeiro'),
(4, 'João', 21, 'Manaus');`,
        },
      ],
    },
    {
      id: "parte-3-consultas-basicas",
      titulo: "Parte 3: Consultas básicas",
      blocos: [
        {
          tipo: "texto",
          texto: "Mostrar todos os alunos:",
        },
        {
          tipo: "codigo",
          conteudo: "SELECT * FROM alunos;",
        },
        {
          tipo: "texto",
          texto: "Mostrar apenas nome e idade:",
        },
        {
          tipo: "codigo",
          conteudo: "SELECT nome, idade FROM alunos;",
        },
        {
          tipo: "texto",
          texto: "Mostrar alunos que moram em Manaus:",
        },
        {
          tipo: "codigo",
          conteudo: `SELECT * FROM alunos
WHERE cidade = 'Manaus';`,
        },
        {
          tipo: "texto",
          texto: "Mostrar alunos com idade maior que 20:",
        },
        {
          tipo: "codigo",
          conteudo: `SELECT * FROM alunos
WHERE idade > 20;`,
        },
      ],
    },
    {
      id: "explicacao-dos-comandos",
      titulo: "Explicação dos comandos",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "1. CREATE TABLE",
        },
        {
          tipo: "texto",
          texto: "O que faz?",
        },
        {
          tipo: "texto",
          texto: "O comando CREATE TABLE serve para criar uma tabela dentro do banco de dados.",
        },
        {
          tipo: "texto",
          texto: "Exemplo:",
        },
        {
          tipo: "codigo",
          conteudo: `CREATE TABLE alunos (
   id INT PRIMARY KEY,
   nome VARCHAR(100),
   idade INT,
   cidade VARCHAR(100)
);`,
        },
        {
          tipo: "texto",
          texto: "Como funciona",
        },
        {
          tipo: "lista",
          itens: [
            "CREATE TABLE alunos → cria uma tabela chamada alunos.",
            "Dentro dos parênteses ficam as colunas da tabela.",
          ],
        },
        {
          tipo: "texto",
          texto: "Explicação das colunas:",
        },
        {
          tipo: "tabela",
          colunas: ["Coluna","Tipo","Significado"],
          linhas: [
            [
              "Id",
              "INT",
              "Numero Inteiro e também o principal do banco de dados a Primary Key ou Chave Primária.",
            ],
            ["Nome","VARCHAR(100)","Cria um texto com até 100 caracteres"],
            ["Idade","INT","Idade sendo um número Inteiro"],
            ["Cidade","VARCHAR(100)","Nome da Cidade com até 100 caracteres"],
          ],
        },
        {
          tipo: "subtitulo",
          texto: "2. INSERT INTO",
        },
        {
          tipo: "texto",
          texto: "O que faz",
        },
        {
          tipo: "texto",
          texto: "O comando INSERT INTO serve para inserir dados dentro da tabela.",
        },
        {
          tipo: "texto",
          texto: "Exemplo:",
        },
        {
          tipo: "codigo",
          conteudo: `INSERT INTO alunos (id, nome, idade, cidade) VALUES
(1, 'Ana', 20, 'Manaus'),
(2, 'Carlos', 22, 'São Paulo');`,
        },
        {
          tipo: "texto",
          texto: "Como funciona",
        },
        {
          tipo: "lista",
          itens: [
            "INSERT INTO alunos → diz em qual tabela vamos inserir dados.",
            "(id, nome, idade, cidade) → indica as colunas que receberão valores.",
            "VALUES → indica os valores que serão inseridos.",
          ],
        },
        {
          tipo: "texto",
          texto: "Cada linha representa um registro (um aluno).",
        },
        {
          tipo: "subtitulo",
          texto: "3. SELECT",
        },
        {
          tipo: "texto",
          texto: "O que faz",
        },
        {
          tipo: "texto",
          texto: "O comando SELECT é usado para consultar dados da tabela.",
        },
        {
          tipo: "texto",
          texto: "Exemplo",
        },
        {
          tipo: "codigo",
          conteudo: "SELECT * FROM alunos;",
        },
        {
          tipo: "texto",
          texto: "Como funciona",
        },
        {
          tipo: "lista",
          itens: [
            "SELECT → seleciona dados.",
            "* → significa todas as colunas.",
            "FROM alunos → indica de qual tabela os dados serão buscados.",
          ],
        },
        {
          tipo: "texto",
          texto: "Resultado: mostra todas as informações dos alunos.",
        },
        {
          tipo: "subtitulo",
          texto: "4. SELECT com colunas específicas",
        },
        {
          tipo: "texto",
          texto: "Exemplo:",
        },
        {
          tipo: "codigo",
          conteudo: "SELECT nome, idade FROM alunos;",
        },
        {
          tipo: "texto",
          texto: "Como funciona",
        },
        {
          tipo: "lista",
          itens: [
            "SELECT nome, idade → mostra apenas essas duas colunas.",
            "FROM alunos → busca os dados na tabela alunos.",
          ],
        },
        {
          tipo: "texto",
          texto: "Resultado: mostra apenas nome e idade, não todas as colunas.",
        },
        {
          tipo: "subtitulo",
          texto: "5. WHERE",
        },
        {
          tipo: "texto",
          texto: "O que faz",
        },
        {
          tipo: "texto",
          texto: "O comando WHERE serve para filtrar dados, ou seja, mostrar apenas registros que atendem uma condição.",
        },
        {
          tipo: "texto",
          texto: "Exemplo:",
        },
        {
          tipo: "codigo",
          conteudo: `SELECT * FROM alunos
WHERE idade > 20;`,
        },
        {
          tipo: "texto",
          texto: "Como funciona",
        },
        {
          tipo: "lista",
          itens: ["WHERE cidade = 'Manaus' → mostra apenas alunos que moram em Manaus."],
        },
        {
          tipo: "texto",
          texto: "Outro exemplo:",
        },
        {
          tipo: "codigo",
          conteudo: `SELECT * FROM alunos
WHERE idade > 20;`,
        },
        {
          tipo: "texto",
          texto: "Operadores comuns:",
        },
        {
          tipo: "tabela",
          colunas: ["Operadores","Significados"],
          linhas: [
            ["=","IGUAL"],
            [">","MAIOR"],
            ["<","MENOR"],
            [">=","MAIOR OU IGUAL"],
            ["=<","MENOR OU IGUAL"],
          ],
        },
        {
          tipo: "subtitulo",
          texto: "6. ORDER BY",
        },
        {
          tipo: "texto",
          texto: "O que faz",
        },
        {
          tipo: "texto",
          texto: "O comando ORDER BY serve para ordenar os resultados.",
        },
        {
          tipo: "texto",
          texto: "Exemplo",
        },
        {
          tipo: "codigo",
          conteudo: `SELECT * FROM alunos
ORDER BY idade DESC;`,
        },
        {
          tipo: "texto",
          texto: "Como funciona",
        },
        {
          tipo: "lista",
          itens: ["ORDER BY idade → ordena pela coluna idade.","DESC → do maior para o menor."],
        },
        {
          tipo: "texto",
          texto: "Tipos de ordenação:",
        },
        {
          tipo: "tabela",
          colunas: ["Comando","Resultado"],
          linhas: [
            ["ORDER BY idade ASC","Maior > Maior"],
            ["ORDER BY idade DESC","Maior > Menor"],
          ],
        },
      ],
    },
  ],
};

export default atividade;
