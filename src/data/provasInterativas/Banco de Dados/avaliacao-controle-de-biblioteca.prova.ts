import type { ProvaInterativa, VerificacaoCodigo } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Banco de Dados/Avaliação - Banco de
 * Dados.docx): o mesmo tema (controle de biblioteca), os mesmos 5 passos e a
 * mesma tabela, os mesmos livros e as mesmas consultas, 2,0 pontos cada. Antes
 * o aluno rodava os comandos no DB Fiddle e colava o print num Word; agora ele
 * escreve o SQL aqui, testa até 3 vezes e o servidor confere o que o comando
 * tem — não existe banco de dados rodando por trás.
 */
const v = (descricao: string, padrao: string): VerificacaoCodigo => ({ descricao, padrao, flags: "i" });
const ASPAS = String.raw`["']`;

const prova: ProvaInterativa = {
  tipo: "autocorrigida",
  titulo: "Avaliação Prática: Banco de Dados — Sistema de Controle de Biblioteca",
  introducao:
    "Tema: sistema de controle de biblioteca. Objetivo: criar e manipular uma base de dados para uma biblioteca. Cada questão vale 2,0 pontos. Se quiser ver o resultado de verdade, rode os comandos também no DB Fiddle (MySQL); aqui o servidor confere o que o seu comando tem.",
  itens: [
    {
      titulo: "Passo 1 – Criando a tabela \"livros\" (2,0 pts)",
      enunciado: "Crie uma tabela chamada livros com os campos abaixo.",
      referencia:
        "id (número inteiro, chave primária e auto incremento) • titulo (texto, até 255 caracteres) • autor (texto, até 255 caracteres) • ano_publicacao (número inteiro)",
      campos: [
        {
          id: "sql",
          rotulo: "Escreva seu SQL:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("CREATE TABLE livros ( ... )", String.raw`CREATE\s+TABLE\s+livros\s*\(`),
              v("id INT com PRIMARY KEY e AUTO_INCREMENT", String.raw`\bid\s+INT(?:EGER)?\b(?=[^,]*PRIMARY\s+KEY)(?=[^,]*AUTO_INCREMENT)`),
              v("titulo VARCHAR(255)", String.raw`\btitulo\s+VARCHAR\s*\(\s*255\s*\)`),
              v("autor VARCHAR(255)", String.raw`\bautor\s+VARCHAR\s*\(\s*255\s*\)`),
              v("ano_publicacao INT", String.raw`\bano_publicacao\s+INT(?:EGER)?\b`),
              v("Comando terminado com ); ", String.raw`\)\s*;`),
            ],
          },
        },
      ],
      mensagemCerta: "Tabela criada com todos os campos exigidos.",
      mensagemErrada: "Revise os nomes e os tipos dos 4 campos e o fecho do comando.",
    },
    {
      titulo: "Passo 2 – Inserindo livros na tabela (2,0 pts)",
      enunciado: "Insira na tabela os livros abaixo, com um único INSERT.",
      referencia:
        "Dom Casmurro — Machado de Assis — 1899 • O Pequeno Príncipe — Antoine de Saint-Exupéry — 1943 • 1984 — George Orwell — 1949",
      campos: [
        {
          id: "sql",
          rotulo: "Escreva seu SQL:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("INSERT INTO livros (titulo, autor, ano_publicacao) VALUES", String.raw`INSERT\s+INTO\s+livros\s*\(\s*titulo\s*,\s*autor\s*,\s*ano_publicacao\s*\)\s*VALUES`),
              v("Dom Casmurro, Machado de Assis, 1899", String.raw`Dom\s+Casmurro${ASPAS}\s*,\s*${ASPAS}Machado\s+de\s+Assis${ASPAS}\s*,\s*1899\b`),
              v("O Pequeno Príncipe, Antoine de Saint-Exupéry, 1943", String.raw`O\s+Pequeno\s+Pr[ií]ncipe${ASPAS}\s*,\s*${ASPAS}Antoine\s+de\s+Saint-Exup[eé]ry${ASPAS}\s*,\s*1943\b`),
              v("1984, George Orwell, 1949", String.raw`${ASPAS}1984${ASPAS}\s*,\s*${ASPAS}George\s+Orwell${ASPAS}\s*,\s*1949\b`),
              v("Comando terminado com ponto e vírgula", String.raw`1949\s*\)\s*;`),
            ],
          },
        },
      ],
      mensagemCerta: "Os três livros foram inseridos.",
      mensagemErrada: "Confira os nomes das colunas, os textos entre aspas simples e os três registros.",
    },
    {
      titulo: "Passo 3 – Cadastrando novos livros (autônomo) (2,0 pts)",
      enunciado: "Agora cadastre mais 3 livros de sua escolha na tabela livros, com título, autor e ano de publicação diferentes dos anteriores.",
      exemplo: {
        rotulo: "Exemplo de código (você deve criar um similar)",
        conteudo: "INSERT INTO livros (titulo, autor, ano_publicacao) VALUES\n('Harry Potter e a Pedra Filosofal', 'J.K. Rowling', 1997);",
      },
      campos: [
        {
          id: "sql",
          rotulo: "Escreva seu SQL:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("INSERT INTO livros com as colunas titulo, autor e ano_publicacao", String.raw`INSERT\s+INTO\s+livros\s*\(\s*titulo\s*,\s*autor\s*,\s*ano_publicacao\s*\)\s*VALUES`),
              v(
                "3 registros no formato ('título', 'autor', ano)",
                String.raw`(?:\(\s*${ASPAS}[^'"]+${ASPAS}\s*,\s*${ASPAS}[^'"]+${ASPAS}\s*,\s*\d{3,4}\s*\)[\s\S]*?){3}`,
              ),
              v("Nenhum dos 3 livros do Passo 2 repetido", String.raw`^(?![\s\S]*(?:Dom\s+Casmurro|Pequeno\s+Pr[ií]ncipe|${ASPAS}1984${ASPAS}))`),
              v("Comando terminado com ponto e vírgula", String.raw`\)\s*;`),
            ],
          },
        },
      ],
      mensagemCerta: "Três livros novos cadastrados.",
      mensagemErrada: "Cadastre 3 livros diferentes dos anteriores, cada um com título, autor e ano.",
    },
    {
      titulo: "Passo 4 – Consultando os livros cadastrados (2,0 pts)",
      enunciado: "Agora consulte todos os livros cadastrados na tabela.",
      campos: [
        {
          id: "sql",
          rotulo: "Escreva seu SQL:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("SELECT * FROM livros", String.raw`SELECT\s+\*\s+FROM\s+livros\b`),
              v("Sem filtro WHERE (traz todos os livros)", String.raw`^(?![\s\S]*\bWHERE\b)`),
              v("Comando terminado com ponto e vírgula", String.raw`livros\s*;`),
            ],
          },
        },
      ],
      mensagemCerta: "A consulta mostra todos os livros.",
      mensagemErrada: "Use SELECT * FROM livros; sem filtro.",
    },
    {
      titulo: "Passo 5 – Filtrando livros por ano de publicação (2,0 pts)",
      enunciado: "Liste todos os livros publicados após o ano de 1900.",
      campos: [
        {
          id: "sql",
          rotulo: "Escreva seu SQL:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("SELECT ... FROM livros", String.raw`SELECT\s+[\s\S]+?\s+FROM\s+livros\b`),
              v("WHERE ano_publicacao > 1900 (só depois de 1900)", String.raw`WHERE\s+ano_publicacao\s*>\s*1900\b`),
              v("Comando terminado com ponto e vírgula", String.raw`1900\s*;`),
            ],
          },
        },
      ],
      mensagemCerta: "Só os livros publicados após 1900.",
      mensagemErrada: "Use WHERE ano_publicacao > 1900 (maior que, sem o igual).",
    },
  ],
};

export default prova;
