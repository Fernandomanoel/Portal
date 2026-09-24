import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/sql-cadastro-de-produtos.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Cadastrando Dados no SQL",
  introducao: "Banco de Dados | SQL",
  itens: [
    {
      id: "o-cenario-a-lojinha-de-eletronicos",
      titulo: "O cenário: a lojinha de eletrônicos",
      blocos: [
        {
          tipo: "texto",
          texto: "Uma loja de produtos eletrônicos decidiu organizar o estoque usando um banco de dados. Em vez de anotar tudo numa planilha solta, ela quer guardar cada produto numa tabela chamada produtos, com estas informações:",
        },
        {
          tipo: "lista",
          itens: [
            "id — um número único que identifica o produto",
            "nome — o nome do produto",
            "preco — o preço de venda",
            "quantidade — quantas unidades tem em estoque",
          ],
        },
        {
          tipo: "nota",
          variante: "objetivo",
          rotulo: "Objetivo da atividade",
          texto: "Criar a tabela produtos, cadastrar 5 produtos reais da loja e praticar as consultas mais usadas no dia a dia: SELECT, WHERE, ORDER BY, UPDATE e DELETE.",
        },
      ],
    },
    {
      id: "criando-a-tabela",
      titulo: "Criando a tabela",
      blocos: [
        {
          tipo: "texto",
          texto: "Para criar a tabela usamos CREATE TABLE, indicando o nome de cada coluna e o tipo de dado que ela guarda:",
        },
        {
          tipo: "codigo",
          conteudo: `CREATE TABLE produtos (
   id INT PRIMARY KEY,
   nome VARCHAR(100),
   preco FLOAT,
   quantidade INT
);`,
          rotulo: "SQL correto",
        },
        {
          tipo: "subtitulo",
          texto: "Atenção: erros comuns (e por que eles acontecem)",
        },
        {
          tipo: "texto",
          texto: "Se você já viu uma versão desta atividade com erro, vale entender exatamente o que estava errado — porque são erros que todo mundo comete quando está aprendendo SQL.",
        },
        {
          tipo: "texto",
          texto: "ERRO 1 — vírgula faltando",
        },
        {
          tipo: "texto",
          texto: "Uma versão errada da tabela ficava assim:",
        },
        {
          tipo: "codigo",
          conteudo: `CREATE TABLE produtos(
 id INT PRIMARY KEY,
 nome VARCHAR(100),
 preço FLOAT
 quantidade INT
);`,
        },
        {
          tipo: "texto",
          texto: "Repare que depois de preço FLOAT não tem vírgula antes de quantidade INT. No SQL, toda coluna dentro do CREATE TABLE precisa terminar com vírgula, exceto a última. Sem a vírgula, o banco de dados não sabe onde termina uma coluna e começa a próxima — e o comando dá erro de sintaxe.",
        },
        {
          tipo: "texto",
          texto: "ERRO 2 — nome de coluna com acento",
        },
        {
          tipo: "texto",
          texto: "A coluna estava escrita como preço, com cedilha. O problema é que nomes de coluna com acentos e caracteres especiais podem dar problema em vários bancos de dados (MySQL, SQLite e outros), principalmente se o servidor não estiver configurado para aceitar acentuação (charset UTF-8 correto). Isso pode gerar erro na hora de criar a tabela ou, pior, funcionar em um computador e dar erro em outro.",
        },
        {
          tipo: "texto",
          texto: "A solução mais segura é evitar acentos nos nomes de coluna: usamos preco em vez de preço. Se quiser mesmo manter o acento, é possível colocar o nome entre crases no MySQL (`preço`) ou aspas duplas em outros bancos, mas isso deixa toda consulta mais chata de escrever — por isso a prática recomendada é simplesmente não usar acento em nomes de tabela e coluna.",
        },
        {
          tipo: "texto",
          texto: "ERRO 3 — INSERT incompleto e com valor errado",
        },
        {
          tipo: "texto",
          texto: "Uma versão errada do cadastro do Mouse ficava assim:",
        },
        {
          tipo: "codigo",
          conteudo: `INSERT INTO produtos(id, nome, preco, quantidade) VALUES
(1, 'Mouse', 50, 'Quantidade'),`,
        },
        {
          tipo: "texto",
          texto: "Dois problemas aqui: primeiro, no lugar da quantidade em estoque (que deveria ser o número 10), foi colocado o texto 'Quantidade' — ou seja, a palavra em vez do valor. Segundo, o comando termina com vírgula, como se fosse continuar com mais produtos, mas não continua — e sem um ; no final, o SQL fica esperando mais linhas e o comando nunca é considerado completo.",
        },
        {
          tipo: "texto",
          texto: "Toda vez que o INSERT tiver várias linhas, cada linha termina em vírgula menos a última, que termina em ; — é esse ponto e vírgula que avisa \"acabou o comando\".",
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "preco ;",
        },
      ],
    },
    {
      id: "cadastrando-os-produtos",
      titulo: "Cadastrando os produtos",
      blocos: [
        {
          tipo: "texto",
          texto: "Agora vamos inserir os 5 produtos da loja usando INSERT INTO. Repare que aqui colocamos todas as linhas de uma vez, separadas por vírgula, e só a última termina em ;:",
        },
        {
          tipo: "tabela",
          colunas: ["id","nome","preco","quantidade"],
          linhas: [
            ["1","Mouse","50","10"],
            ["2","Teclado","120","5"],
            ["3","Monitor","900","3"],
            ["4","Headset","200","8"],
            ["5","Webcam","150","6"],
          ],
        },
        {
          tipo: "codigo",
          conteudo: `INSERT INTO produtos (id, nome, preco, quantidade) VALUES
(1, 'Mouse', 50, 10),
(2, 'Teclado', 120, 5),
(3, 'Monitor', 900, 3),
(4, 'Headset', 200, 8),
(5, 'Webcam', 150, 6);`,
          rotulo: "SQL correto",
        },
        {
          tipo: "nota",
          variante: "aviso",
          texto: "aspas simples ' ' não",
        },
      ],
    },
    {
      id: "consultando-os-produtos-select",
      titulo: "Consultando os produtos (SELECT)",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Mostrar todos os produtos",
        },
        {
          tipo: "codigo",
          conteudo: "SELECT * FROM produtos;",
        },
        {
          tipo: "texto",
          texto: "Resultado esperado:",
        },
        {
          tipo: "tabela",
          colunas: ["id","nome","preco","quantidade"],
          linhas: [
            ["1","Mouse","50","10"],
            ["2","Teclado","120","5"],
            ["3","Monitor","900","3"],
            ["4","Headset","200","8"],
            ["5","Webcam","150","6"],
          ],
        },
        {
          tipo: "subtitulo",
          texto: "Mostrar apenas nome e preço",
        },
        {
          tipo: "codigo",
          conteudo: "SELECT nome, preco FROM produtos;",
        },
        {
          tipo: "texto",
          texto: "Resultado esperado:",
        },
        {
          tipo: "tabela",
          colunas: ["nome","preco"],
          linhas: [
            ["Mouse","50"],
            ["Teclado","120"],
            ["Monitor","900"],
            ["Headset","200"],
            ["Webcam","150"],
          ],
        },
        {
          tipo: "subtitulo",
          texto: "WHERE — filtrando por preço",
        },
        {
          tipo: "texto",
          texto: "Quando queremos ver só os produtos acima de um certo preço, usamos WHERE. Aqui, produtos com preço maior que R$ 150:",
        },
        {
          tipo: "codigo",
          conteudo: `SELECT * FROM produtos
WHERE preco > 150;`,
        },
        {
          tipo: "texto",
          texto: "Resultado esperado (só Monitor e Headset têm preço maior que 150):",
        },
        {
          tipo: "tabela",
          colunas: ["id","nome","preco","quantidade"],
          linhas: [
            ["3","Monitor","900","3"],
            ["4","Headset","200","8"],
          ],
        },
        {
          tipo: "subtitulo",
          texto: "ORDER BY — ordenando por preço",
        },
        {
          tipo: "texto",
          texto: "Para organizar a lista do mais barato para o mais caro, usamos ORDER BY:",
        },
        {
          tipo: "codigo",
          conteudo: `SELECT * FROM produtos
ORDER BY preco ASC;`,
        },
        {
          tipo: "texto",
          texto: "Resultado esperado:",
        },
        {
          tipo: "tabela",
          colunas: ["id","nome","preco","quantidade"],
          linhas: [
            ["1","Mouse","50","10"],
            ["2","Teclado","120","5"],
            ["5","Webcam","150","6"],
            ["4","Headset","200","8"],
            ["3","Monitor","900","3"],
          ],
        },
        {
          tipo: "texto",
          texto: "Use DESC no lugar de ASC para inverter, do mais caro para o mais barato.",
        },
      ],
    },
    {
      id: "atualizando-dados-update",
      titulo: "Atualizando dados (UPDATE)",
      blocos: [
        {
          tipo: "texto",
          texto: "Imagine que o preço do Teclado mudou para R$ 135. Para atualizar um registro já existente, usamos UPDATE junto com WHERE — sem o WHERE, o comando atualizaria a coluna em todas as linhas da tabela!",
        },
        {
          tipo: "codigo",
          conteudo: `UPDATE produtos
SET preco = 135
WHERE nome = 'Teclado';`,
        },
        {
          tipo: "texto",
          texto: "Resultado esperado (consultando novamente com SELECT * FROM produtos;):",
        },
        {
          tipo: "tabela",
          colunas: ["id","nome","preco","quantidade"],
          linhas: [
            ["1","Mouse","50","10"],
            ["2","Teclado","135","5"],
            ["3","Monitor","900","3"],
            ["4","Headset","200","8"],
            ["5","Webcam","150","6"],
          ],
        },
      ],
    },
    {
      id: "removendo-dados-delete",
      titulo: "Removendo dados (DELETE)",
      blocos: [
        {
          tipo: "texto",
          texto: "Se a loja parou de vender a Webcam, removemos o registro com DELETE — também sempre com WHERE, para apagar só o produto certo:",
        },
        {
          tipo: "codigo",
          conteudo: `DELETE FROM produtos
WHERE nome = 'Webcam';`,
        },
        {
          tipo: "texto",
          texto: "Resultado esperado (a Webcam sai da tabela):",
        },
        {
          tipo: "tabela",
          colunas: ["id","nome","preco","quantidade"],
          linhas: [
            ["1","Mouse","50","10"],
            ["2","Teclado","135","5"],
            ["3","Monitor","900","3"],
            ["4","Headset","200","8"],
          ],
        },
        {
          tipo: "nota",
          variante: "aviso",
          texto: "Cuidado: UPDATE DELETE WHERE a tabela inteira",
        },
      ],
    },
    {
      id: "checklist-da-atividade",
      titulo: "Checklist da atividade",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Criei a tabela produtos com id, nome, preco e quantidade, usando vírgula entre todas as colunas.",
            "Usei preco sem acento no nome da coluna.",
            "Inseri os 5 produtos (Mouse, Teclado, Monitor, Headset, Webcam) com um único INSERT terminando em ;.",
            "Consultei todos os produtos e depois só nome e preço.",
            "Filtrei produtos com WHERE por preço.",
            "Ordenei os produtos com ORDER BY.",
            "Atualizei um preço com UPDATE ... WHERE.",
            "Removi um produto com DELETE ... WHERE.",
          ],
        },
      ],
    },
  ],
};

export default atividade;
