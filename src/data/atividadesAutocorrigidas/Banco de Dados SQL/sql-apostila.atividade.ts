import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/sql-apostila.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Apostila Básica de SQL para Iniciantes",
  introducao: "Microlins — Unidade São José",
  itens: [
    {
      id: "o-que-e-banco-de-dados",
      titulo: "O que é Banco de Dados",
      blocos: [
        {
          tipo: "texto",
          texto: "Banco de dados é um local onde armazenamos informações organizadas.",
        },
        {
          tipo: "texto",
          texto: "Exemplo de informações armazenadas:",
        },
        {
          tipo: "lista",
          itens: ["cadastro de alunos","cadastro de produtos","cadastro de clientes","vendas de uma loja"],
        },
        {
          tipo: "texto",
          texto: "Esses dados ficam organizados em tabelas.",
        },
        {
          tipo: "subtitulo",
          texto: "Exemplo de tabela",
        },
        {
          tipo: "tabela",
          colunas: ["id","nome","idade"],
          linhas: [
            ["1","Ana","20"],
            ["2","Carlos","22"],
            ["3","Maria","19"],
          ],
        },
      ],
    },
    {
      id: "o-que-e-sql",
      titulo: "O que é SQL",
      blocos: [
        {
          tipo: "texto",
          texto: "SQL significa:",
        },
        {
          tipo: "texto",
          texto: "Structured Query Language",
        },
        {
          tipo: "texto",
          texto: "É a linguagem usada para consultar e manipular bancos de dados.",
        },
        {
          tipo: "texto",
          texto: "Com SQL podemos:",
        },
        {
          tipo: "lista",
          itens: ["criar tabelas","inserir dados","consultar dados","atualizar dados","excluir dados"],
        },
      ],
    },
    {
      id: "criando-uma-tabela",
      titulo: "Criando uma tabela",
      blocos: [
        {
          tipo: "texto",
          texto: "Para criar uma tabela usamos o comando CREATE TABLE.",
        },
        {
          tipo: "texto",
          texto: "Exemplo:",
        },
        {
          tipo: "codigo",
          conteudo: `CREATE TABLE alunos (
  id INT,
  nome VARCHAR(50),
  idade INT
);`,
        },
        {
          tipo: "texto",
          texto: "Explicação:",
        },
        {
          tipo: "tabela",
          colunas: ["comando","significado"],
          linhas: [
            ["CREATE","criar"],
            ["TABLE","tabela"],
            ["INT","número inteiro"],
            ["VARCHAR","texto"],
          ],
        },
      ],
    },
    {
      id: "inserindo-dados-na-tabela",
      titulo: "Inserindo dados na tabela",
      blocos: [
        {
          tipo: "texto",
          texto: "Para inserir dados usamos INSERT INTO.",
        },
        {
          tipo: "texto",
          texto: "Exemplo:",
        },
        {
          tipo: "codigo",
          conteudo: `INSERT INTO alunos VALUES
(1,'Ana',20),
(2,'Carlos',22),
(3,'Maria',19);`,
        },
        {
          tipo: "texto",
          texto: "Esse comando adiciona registros na tabela.",
        },
      ],
    },
    {
      id: "consultando-dados",
      titulo: "Consultando dados",
      blocos: [
        {
          tipo: "texto",
          texto: "Para visualizar dados usamos SELECT.",
        },
        {
          tipo: "texto",
          texto: "Exemplo:",
        },
        {
          tipo: "codigo",
          conteudo: "SELECT * FROM alunos;",
        },
        {
          tipo: "texto",
          texto: "Explicação:",
        },
        {
          tipo: "tabela",
          colunas: ["comando","significado"],
          linhas: [
            ["SELECT","selecionar dados"],
          ],
        },
        {
          tipo: "lista",
          itens: ["| todos os campos | FROM | da tabela |"],
        },
      ],
    },
    {
      id: "filtrando-informacoes",
      titulo: "Filtrando informações",
      blocos: [
        {
          tipo: "texto",
          texto: "Podemos filtrar dados usando WHERE.",
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
          texto: "Esse comando mostra apenas alunos com idade maior que 20.",
        },
      ],
    },
    {
      id: "ordenando-dados",
      titulo: "Ordenando dados",
      blocos: [
        {
          tipo: "texto",
          texto: "Para organizar os dados usamos ORDER BY.",
        },
        {
          tipo: "texto",
          texto: "Exemplo:",
        },
        {
          tipo: "codigo",
          conteudo: `SELECT * FROM alunos
ORDER BY nome;`,
        },
        {
          tipo: "texto",
          texto: "Esse comando organiza os alunos em ordem alfabética.",
        },
      ],
    },
    {
      id: "atualizando-dados",
      titulo: "Atualizando dados",
      blocos: [
        {
          tipo: "texto",
          texto: "Para atualizar informações usamos UPDATE.",
        },
        {
          tipo: "texto",
          texto: "Exemplo:",
        },
        {
          tipo: "codigo",
          conteudo: `UPDATE alunos
SET idade = 21
WHERE nome = 'Ana';`,
        },
      ],
    },
    {
      id: "deletando-dados",
      titulo: "Deletando dados",
      blocos: [
        {
          tipo: "texto",
          texto: "Para apagar dados usamos DELETE.",
        },
        {
          tipo: "texto",
          texto: "Exemplo:",
        },
        {
          tipo: "codigo",
          conteudo: `DELETE FROM alunos
WHERE id = 3;`,
        },
      ],
    },
    {
      id: "exercicios",
      titulo: "Exercícios",
      blocos: [
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Exercício 1",
          texto: "Criar tabela produtos com os campos:",
          itens: ["id","nome","preço"],
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Exercício 2",
          texto: "Inserir 5 produtos.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Exercício 3",
          texto: "Mostrar todos os produtos.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Exercício 4",
          texto: "Mostrar produtos com preço maior que 50.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Exercício 5",
          texto: "Ordenar produtos pelo nome.",
        },
      ],
    },
    {
      id: "dica-de-estudo",
      titulo: "Dica de estudo",
      blocos: [
        {
          tipo: "texto",
          texto: "Pratique SQL 3 vezes por semana.",
        },
        {
          tipo: "texto",
          texto: "Sugestão:",
        },
        {
          tipo: "texto",
          texto: "Segunda → estudar teoria",
        },
        {
          tipo: "texto",
          texto: "Quarta → praticar exercícios",
        },
        {
          tipo: "texto",
          texto: "Sexta → revisar comandos",
        },
      ],
    },
  ],
};

export default atividade;
