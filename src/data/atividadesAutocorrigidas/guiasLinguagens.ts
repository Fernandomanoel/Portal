import imgAbrir from "@/assets/atividades/analise-de-dados/colab-abrir.svg";
import imgErro from "@/assets/atividades/analise-de-dados/colab-erro.svg";
import imgExecutar from "@/assets/atividades/analise-de-dados/colab-executar.svg";
import imgTela from "@/assets/atividades/analise-de-dados/colab-tela.svg";
import imgUpload from "@/assets/atividades/analise-de-dados/colab-upload.svg";
import imgCopiar from "@/assets/atividades/analise-de-dados/copiar-planilha.svg";
import imgSqlResultado from "@/assets/atividades/analise-de-dados/sql-colab-resultado.svg";
import imgWorkbenchConexao from "@/assets/atividades/analise-de-dados/workbench-conexao.svg";
import imgWorkbenchEditor from "@/assets/atividades/analise-de-dados/workbench-editor.svg";
import imgXampp from "@/assets/atividades/analise-de-dados/xampp-mysql.svg";
import type { BlocoConteudo, ItemAtividade } from "@/types/atividadeAutocorrigida";

/**
 * Guias de «primeiros passos» de Python e de SQL para quem nunca usou: onde clicar, o que
 * configurar e por quê, com ilustrações. O código de preparação (que cria as tabelas ou o
 * DataFrame) é gerado a partir dos mesmos dados da atividade, então nada precisa ser digitado.
 * As imagens são desenhos do portal (scripts/ilustracoes/telas/linguagens-colab-sql.mjs), não
 * prints: a tela real do Colab, do XAMPP e do Workbench pode ter pequenas diferenças.
 */

export type TipoColuna = "inteiro" | "texto" | "decimal" | "data";
export type ValorCelula = string | number | null;

export interface TabelaSql {
  nome: string;
  colunas: { nome: string; tipo: TipoColuna }[];
  linhas: ValorCelula[][];
}

const AVISO_IMAGEM = "Ilustração do portal: a tela real pode ter cores e posições um pouco diferentes.";

const porque = (texto: string): BlocoConteudo => ({ tipo: "nota", variante: "dica", rotulo: "Por quê?", texto });
const texto = (t: string): BlocoConteudo => ({ tipo: "texto", texto: t });
const lista = (itens: string[], numerada = false): BlocoConteudo => ({ tipo: "lista", itens, numerada });

const literalSql = (valor: ValorCelula, tipo: TipoColuna): string => {
  if (valor === null || valor === "") return "NULL";
  if (tipo === "inteiro" || tipo === "decimal") return String(Number(valor));
  return `'${String(valor).replace(/'/g, "''")}'`;
};

const insercoes = (t: TabelaSql) =>
  `INSERT INTO ${t.nome} VALUES\n${t.linhas.map((l) => `  (${l.map((v, i) => literalSql(v, t.colunas[i].tipo)).join(", ")})`).join(",\n")};`;

/** Código para colar numa célula do Colab: cria o banco SQLite na memória, as tabelas e a função sql(). */
export function codigoSqlite(tabelas: TabelaSql[]): string {
  const tipo: Record<TipoColuna, string> = { inteiro: "INTEGER", texto: "TEXT", decimal: "REAL", data: "TEXT" };
  const criar = tabelas.map((t) => `CREATE TABLE ${t.nome} (${t.colunas.map((c) => `${c.nome} ${tipo[c.tipo]}`).join(", ")});\n${insercoes(t)}`).join("\n\n");
  return `import sqlite3
import pandas as pd

# Banco de dados temporário, guardado na memória: some quando a sessão termina.
conexao = sqlite3.connect(":memory:")
conexao.executescript("""
${criar}
""")

# sql("...") envia um comando ao banco e mostra o resultado como tabela.
def sql(comando):
    return pd.read_sql_query(comando, conexao)

print("Tabelas criadas:", [t[0] for t in conexao.execute("SELECT name FROM sqlite_master WHERE type = 'table'")])`;
}

/** Script para o editor do MySQL Workbench: cria o banco «atividade», as tabelas e os dados. */
export function codigoMysql(tabelas: TabelaSql[]): string {
  const tipo: Record<TipoColuna, string> = { inteiro: "INT", texto: "VARCHAR(100)", decimal: "DECIMAL(12,2)", data: "DATE" };
  const criar = tabelas
    .map((t) => `DROP TABLE IF EXISTS ${t.nome};\nCREATE TABLE ${t.nome} (${t.colunas.map((c) => `${c.nome} ${tipo[c.tipo]}`).join(", ")});\n${insercoes(t)}`)
    .join("\n\n");
  return `CREATE DATABASE IF NOT EXISTS atividade;
USE atividade;

${criar}`;
}

const literalPython = (v: ValorCelula) => (v === null || v === "" ? "None" : typeof v === "number" ? String(v) : JSON.stringify(v));

/** Código para colar numa célula do Colab: cria o DataFrame df direto dos dados da atividade. */
export function codigoDataFrame(colunas: string[], linhas: ValorCelula[][]): string {
  return `import pandas as pd

dados = [
${linhas.map((l) => `    [${l.map(literalPython).join(", ")}]`).join(",\n")},
]
df = pd.DataFrame(dados, columns=[${colunas.map((c) => JSON.stringify(c)).join(", ")}])
print(df.shape)
df.head()`;
}

/** Célula do Colab que cria o arquivo CSV (%%writefile) com os dados: dispensa o upload. */
export function codigoCsv(arquivo: string, colunas: string[], linhas: ValorCelula[][]): string {
  return `%%writefile ${arquivo}
${colunas.join(",")}
${linhas.map((l) => l.map((v) => (v === null || v === "" ? "" : String(v))).join(",")).join("\n")}`;
}

interface Verificacao {
  rotulo: string;
  valor: number;
}

const itemVerificacao = (id: string, titulo: string, instrucao: string, v: Verificacao): ItemAtividade => ({
  id,
  titulo,
  instrucao,
  campos: [
    {
      id: `${id}-valor`,
      rotulo: v.rotulo,
      placeholder: "Digite o número que apareceu no seu Colab ou Workbench",
      regra: { tipo: "numero", esperado: v.valor, tolerancia: 0.01 },
      mensagemCerta: "Seu ambiente está funcionando e os dados estão carregados. Pode seguir para as etapas da atividade.",
      mensagemErrada: "Esse número não bate. Confira se executou TODAS as células na ordem e se os dados foram colados por inteiro, sem cortar linhas.",
    },
  ],
});

const colabAbrir = (id: string): ItemAtividade => ({
  id,
  titulo: "Passo 1 — Abrir o Google Colab e criar um notebook",
  imagem: { url: imgAbrir, alt: "Navegador em colab.research.google.com com a janela Abrir notebook e o botão Novo notebook em destaque.", legenda: AVISO_IMAGEM },
  blocos: [
    lista(
      [
        "Abra o navegador (Chrome, Edge ou Firefox) e digite colab.research.google.com na barra de endereço, depois Enter.",
        "Se o site pedir, clique em Fazer login (canto superior direito) e entre com a sua conta Google. Quem não tem conta pode criar uma de graça em accounts.google.com.",
        "Na janela «Abrir notebook», clique em + Novo notebook. Se a janela não aparecer, use o menu Arquivo > Novo notebook.",
        "Pronto: abre uma tela com uma célula vazia. Esse arquivo é o seu notebook, onde você escreve e executa o código.",
      ],
      true,
    ),
    porque(
      "Programar exige um «lugar onde o código roda». O Colab é um computador do Google que você usa pelo navegador: não precisa instalar nada, funciona em qualquer máquina e já vem com as bibliotecas de dados (pandas, matplotlib, seaborn, sqlite3) prontas. A conta Google serve só para guardar os seus notebooks.",
    ),
    { tipo: "nota", variante: "aviso", rotulo: "Se a escola usa outro programa", texto: "Se o laboratório usa IDLE, Thonny, VS Code ou Jupyter, o código das atividades é o mesmo. Nesse caso, confirme com o instrutor se pandas, matplotlib e seaborn estão instalados (no terminal: pip install pandas matplotlib seaborn)." },
  ],
});

const colabTela: ItemAtividade = {
  id: "guia-colab-tela",
  titulo: "Passo 2 — Conhecer a tela do notebook",
  imagem: { url: imgTela, alt: "Notebook do Colab com os números 1 a 6 marcando nome, botão de código, executar, célula, saída e painel de arquivos.", legenda: AVISO_IMAGEM },
  blocos: [
    lista([
      "1 — Nome do notebook: clique nele para trocar «Sem título0.ipynb» por algo como atividade-dados.",
      "2 — Botão + Código: acrescenta uma nova célula de código abaixo da atual. Use sempre que quiser escrever um novo trecho.",
      "3 — Botão de play (executar): roda a célula ao lado dele.",
      "4 — Célula de código: o retângulo cinza onde você escreve. Só o que está dentro dela é executado quando você clica em play.",
      "5 — Saída: o resultado do código aparece logo abaixo da célula.",
      "6 — Painel Arquivos (ícone de pasta, à esquerda): é onde você envia arquivos do seu computador para o Colab.",
    ]),
    porque(
      "O notebook é dividido em células para você executar o trabalho em pedaços: primeiro preparar os dados, depois calcular, depois fazer o gráfico. Se algo der errado, você corrige só aquele pedaço, sem refazer tudo. A ordem importa: uma célula só enxerga o que as células anteriores já executaram.",
    ),
  ],
};

const colabExecutar: ItemAtividade = {
  id: "guia-colab-executar",
  titulo: "Passo 3 — Executar a primeira célula",
  imagem: { url: imgExecutar, alt: "Célula com print(\"Olá, mundo!\") e botão de play em destaque; abaixo, a saída Olá, mundo!; teclas Shift + Enter.", legenda: AVISO_IMAGEM },
  blocos: [
    lista(
      [
        "Clique dentro da célula e digite: print(\"Olá, mundo!\")",
        "Clique no botão de play ao lado da célula. Outra forma: segure Shift e aperte Enter (executa e vai para a próxima célula). Ctrl + Enter executa e fica na mesma célula.",
        "Na primeira execução pode aparecer «Conectando…» por alguns segundos. Espere: é normal.",
        "O texto Olá, mundo! aparece abaixo da célula. Se apareceu, o seu ambiente está funcionando.",
      ],
      true,
    ),
    porque(
      "O código não roda no seu computador: ele vai para uma máquina do Google. A primeira execução é mais lenta porque o Google precisa ligar essa máquina («conectar»). Se você ficar muito tempo parado, a máquina desliga sozinha e as variáveis se perdem; aí é só executar as células de novo, de cima para baixo.",
    ),
  ],
};

const colabErros: ItemAtividade = {
  id: "guia-colab-erros",
  titulo: "Passo 6 — Quando aparecer um erro em vermelho",
  imagem: { url: imgErro, alt: "Célula com print(totl) e, abaixo, o erro NameError: name 'totl' is not defined em destaque.", legenda: AVISO_IMAGEM },
  blocos: [
    texto("Todo programador vê erros o tempo todo: eles fazem parte do trabalho. A regra de ouro é ler a ÚLTIMA linha da mensagem vermelha, que diz o tipo do erro e o que o causou."),
    {
      tipo: "tabela",
      colunas: ["Mensagem", "O que significa", "O que fazer"],
      linhas: [
        ["NameError: name 'x' is not defined", "O nome «x» não existe: digitado errado ou a célula que o cria não foi executada.", "Confira a grafia e execute as células anteriores, de cima para baixo."],
        ["SyntaxError: ...", "O código está escrito de um jeito que o Python não entende (aspas, parênteses ou dois-pontos faltando).", "Olhe a linha indicada e confira se cada ( tem seu ) e cada \" tem seu par."],
        ["FileNotFoundError: ... 'arquivo.csv'", "O arquivo não está no Colab ou o nome está diferente.", "Envie o arquivo (Passo 5) e copie o nome exatamente igual, com maiúsculas e .csv."],
        ["KeyError: 'coluna'", "A coluna não existe na tabela com esse nome.", "Escreva df.columns para ver os nomes certos e copie igual."],
        ["ModuleNotFoundError: No module named ...", "A biblioteca não está instalada.", "No Colab, escreva !pip install nome-da-biblioteca e execute."],
      ],
    },
    porque("Ler a última linha poupa muito tempo: ela quase sempre aponta o problema. Copiar a mensagem para uma busca ou perguntar ao instrutor é prática normal na profissão."),
  ],
};

const colabBoasPraticas: ItemAtividade = {
  id: "guia-colab-boas-praticas",
  titulo: "Passo 7 — Hábitos que evitam dor de cabeça",
  blocos: [
    lista([
      "Salve com Ctrl + S: o notebook vai para o seu Google Drive. Os dados enviados e as variáveis, não.",
      "Antes de entregar, use o menu Ambiente de execução > Reiniciar sessão e executar tudo. Se der certo, o seu trabalho funciona do zero, sem depender de uma célula esquecida.",
      "Escreva comentários com # (por exemplo, # total por filial): o que não é código vira anotação para você mesmo no futuro.",
      "Execute a célula após cada pequena mudança: é mais fácil achar um erro quando só mudou uma coisa.",
    ]),
    porque("Variáveis ficam apenas na memória da sessão. Reiniciar e executar tudo é o teste de que o seu notebook conta a história completa e outra pessoa consegue refazer o seu resultado."),
  ],
};

export interface OpcoesGuiaPython {
  /** Código que cria o df (ou o CSV) a partir dos dados da atividade. */
  codigo: { rotulo: string; conteudo: string };
  /** Pergunta de conferência feita depois do preparo. */
  verificacao: Verificacao;
  /** Como obter o resultado: o comando para mostrar o número pedido. */
  comandoVerificacao: string;
}

/** Guia ilustrado de Python (Google Colab), para abrir uma atividade. */
export function guiaPython({ codigo, verificacao, comandoVerificacao }: OpcoesGuiaPython): ItemAtividade[] {
  return [
    {
      id: "guia-python-intro",
      titulo: "Etapa 0 — Preparando o Python (para quem nunca usou)",
      blocos: [
        texto("Esta etapa mostra, passo a passo, como deixar o Python funcionando antes de começar o trabalho da atividade. Se você já usa Python, pode pular direto para o passo do «código pronto». Cada passo traz uma imagem do lugar onde clicar e uma explicação do porquê."),
        lista(["O que você precisa: um computador com internet, um navegador e uma conta Google (gratuita).", "O que vamos fazer: abrir o Google Colab, executar uma célula, carregar os dados da atividade e conferir se deu certo.", "Quanto tempo leva: uns 10 minutos na primeira vez."]),
        porque("Python é só a linguagem: para executá-la é preciso um ambiente. Usamos o Google Colab porque não exige instalação e funciona igual em qualquer computador."),
      ],
    },
    colabAbrir("guia-python-abrir"),
    colabTela,
    colabExecutar,
    {
      id: "guia-python-dados",
      titulo: "Passo 4 — Carregar os dados da atividade (código pronto)",
      imagem: { url: imgCopiar, alt: "Tabela da atividade com o botão Copiar planilha para colar no Excel em destaque e instruções para colar.", legenda: AVISO_IMAGEM },
      blocos: [
        texto("Para você não precisar digitar os dados, o portal já escreveu o código que os cria. Faça assim:"),
        lista(
          [
            "No Colab, clique em + Código para criar uma célula nova.",
            "Clique dentro do bloco de código abaixo, selecione tudo (Ctrl + A), copie (Ctrl + C) e cole (Ctrl + V) na célula do Colab.",
            "Clique no play (ou Shift + Enter) e espere a saída aparecer. Na primeira linha da saída deve aparecer o tamanho dos dados.",
          ],
          true,
        ),
        { tipo: "codigo", conteudo: codigo.conteudo, rotulo: codigo.rotulo },
        porque("O código cria os dados direto na memória do Colab, sem arquivo para enviar nem formato para converter. Se preferir o caminho do Excel (copiar a tabela da atividade, colar no Excel e salvar como CSV), o botão «Copiar planilha» da própria tabela faz a cópia, mas o código pronto evita erros de formato, como vírgula decimal e acentos."),
      ],
    },
    {
      id: "guia-python-upload",
      titulo: "Passo 5 — Quando a atividade pede um arquivo (CSV)",
      imagem: { url: imgUpload, alt: "Painel Arquivos do Colab com o ícone de enviar em destaque e o arquivo faturamento.csv listado.", legenda: AVISO_IMAGEM },
      blocos: [
        texto("Algumas atividades pedem para ler um arquivo, por exemplo pd.read_csv('faturamento.csv'). O Colab só enxerga arquivos que estão dentro dele, então você precisa colocá-lo lá:"),
        lista(
          [
            "Clique no ícone de pasta (à esquerda) para abrir o painel Arquivos.",
            "Clique no ícone de enviar (seta para cima) e escolha o arquivo .csv no seu computador. Se a atividade traz o código que cria o arquivo (célula que começa com %%writefile), basta executá-la: ela já cria o arquivo.",
            "Confira se o nome aparece na lista e use exatamente o mesmo nome no código, entre aspas.",
          ],
          true,
        ),
        porque("O Colab é outro computador: ele não vê a sua pasta Downloads. Os arquivos enviados ficam guardados só enquanto a sessão estiver aberta; se fechar e reabrir, envie de novo ou execute outra vez a célula que o cria."),
      ],
    },
    colabErros,
    colabBoasPraticas,
    itemVerificacao(
      "guia-python-conferencia",
      "Conferência — o seu ambiente está funcionando?",
      `Depois de executar o código pronto, rode ${comandoVerificacao} e digite o número que apareceu.`,
      verificacao,
    ),
  ];
}

export interface OpcoesGuiaSql {
  tabelas: TabelaSql[];
  verificacao: Verificacao;
  /** Consulta pedida na conferência (texto completo, para o aluno copiar). */
  consultaVerificacao: string;
}

/** Guia ilustrado de SQL (SQLite no Colab ou MySQL Workbench com XAMPP), para abrir uma atividade. */
export function guiaSql({ tabelas, verificacao, consultaVerificacao }: OpcoesGuiaSql): ItemAtividade[] {
  return [
    {
      id: "guia-sql-intro",
      titulo: "Etapa 0 — Preparando o SQL (para quem nunca usou)",
      blocos: [
        texto("SQL é a linguagem usada para fazer perguntas a um banco de dados: «quantos clientes não têm e-mail?», «qual cidade vendeu mais?». Para praticar, você precisa de um banco de dados funcionando e das tabelas da atividade dentro dele. Escolha UMA das duas opções abaixo:"),
        lista([
          "Opção A (recomendada para quem não tem nada instalado): Google Colab com SQLite. Não instala nada e o código de preparação cria tudo sozinho. Passos 1 a 4.",
          "Opção B (o programa do curso de SQL): XAMPP + MySQL Workbench, se já estiverem instalados no computador. Passos 5 a 7.",
        ]),
        porque("O comando SQL é praticamente o mesmo nos dois ambientes (SELECT, FROM, WHERE, GROUP BY, JOIN). O que muda é onde o banco roda: na memória do Colab (SQLite) ou no servidor MySQL do seu computador."),
        { tipo: "nota", variante: "aviso", rotulo: "Duas diferenças que mudam o resultado", texto: "1) O SQLite diferencia maiúsculas de minúsculas ao comparar textos (Maria e MARIA são diferentes); o MySQL, por padrão, não. Nas contas de «distintos» da atividade de limpeza, no MySQL use BINARY (por exemplo, COUNT(DISTINCT BINARY nome)) para comparar do mesmo jeito que o SQLite. 2) As funções de data mudam: strftime no SQLite, EXTRACT, MONTH e DATE_FORMAT no MySQL." },
      ],
    },
    colabAbrir("guia-sql-colab"),
    {
      id: "guia-sql-preparar",
      titulo: "Passo 2 (opção A) — Criar o banco e as tabelas com o código pronto",
      imagem: { url: imgExecutar, alt: "Célula do Colab com o botão de play em destaque e a saída abaixo.", legenda: AVISO_IMAGEM },
      blocos: [
        lista(
          [
            "No Colab, clique em + Código para criar uma célula.",
            "Copie o código abaixo, cole na célula e clique no play (ou Shift + Enter).",
            "A saída deve mostrar «Tabelas criadas:» com os nomes das tabelas da atividade.",
          ],
          true,
        ),
        { tipo: "codigo", conteudo: codigoSqlite(tabelas), rotulo: "Código de preparação (Python + SQL)" },
        texto("O que cada parte faz:"),
        lista([
          "import sqlite3 e import pandas as pd: trazem as ferramentas. O sqlite3 é o banco de dados; o pandas mostra os resultados em tabela.",
          "sqlite3.connect(\":memory:\"): cria um banco novo, guardado na memória (temporário).",
          "CREATE TABLE ...: cria cada tabela com suas colunas e tipos. INSERT INTO ... VALUES ...: coloca os dados dentro.",
          "def sql(comando): cria um atalho. Daqui em diante você escreve sql(\"\"\" ... \"\"\") e o resultado aparece como tabela.",
        ]),
        porque("Um banco precisa existir e ter dados antes de você consultá-lo. A memória é rápida e não deixa nada instalado, mas some quando a sessão termina: se isso acontecer, execute esta célula de novo."),
      ],
    },
    {
      id: "guia-sql-consulta",
      titulo: "Passo 3 (opção A) — Escrever uma consulta e ler o resultado",
      imagem: { url: imgSqlResultado, alt: "Célula com sql(\"\"\" SELECT COUNT(*) ... \"\"\") e, abaixo, a tabela de resultado com o número 5 em destaque.", legenda: AVISO_IMAGEM },
      blocos: [
        lista(
          [
            "Crie outra célula com + Código.",
            "Escreva o seu comando SQL dentro de sql(\"\"\" ... \"\"\"), como no exemplo abaixo.",
            "Execute. O banco devolve uma tabela: cada coluna tem o nome do campo e cada linha é um resultado.",
            "Copie o número que o banco devolveu para o campo de resposta da atividade, no portal.",
          ],
          true,
        ),
        { tipo: "codigo", conteudo: `sql("""\n${consultaVerificacao}\n""")`, rotulo: "Exemplo de consulta" },
        texto("Como ler o comando: SELECT diz o que mostrar; FROM diz de qual tabela; WHERE filtra as linhas; GROUP BY agrupa; ORDER BY ordena. O ponto e vírgula no fim é opcional no Colab, mas obrigatório entre dois comandos."),
        porque("As três aspas ao redor do comando permitem escrever em várias linhas, o que deixa consultas longas legíveis. Dentro do SQL, textos usam aspas SIMPLES ('pago'); as aspas duplas são do Python."),
      ],
    },
    {
      id: "guia-sql-xampp",
      titulo: "Passo 4 (opção B) — Ligar o MySQL no XAMPP",
      imagem: { url: imgXampp, alt: "Painel de controle do XAMPP com o botão Start da linha do MySQL em destaque e o módulo MySQL em verde.", legenda: AVISO_IMAGEM },
      blocos: [
        lista(
          [
            "Abra o XAMPP Control Panel (menu Iniciar > XAMPP).",
            "Na linha MySQL, clique em Start. Não precisa ligar o Apache.",
            "Quando o nome «MySQL» ficar verde e aparecer a porta 3306, o banco está ligado. O botão passa a dizer Stop.",
            "Se aparecer erro de porta, outro programa pode estar usando a 3306: chame o instrutor.",
          ],
          true,
        ),
        porque("O MySQL é um programa que fica rodando em segundo plano, esperando pedidos. O XAMPP é só o painel que liga e desliga esse programa. Sem ele ligado, o Workbench não encontra o banco."),
      ],
    },
    {
      id: "guia-sql-workbench-conexao",
      titulo: "Passo 5 (opção B) — Conectar o MySQL Workbench",
      imagem: { url: imgWorkbenchConexao, alt: "Tela inicial do MySQL Workbench com o cartão Local instance MySQL em destaque.", legenda: AVISO_IMAGEM },
      blocos: [
        lista(
          [
            "Abra o MySQL Workbench.",
            "Na seção MySQL Connections, dê dois cliques no cartão «Local instance MySQL» (usuário root, porta 3306).",
            "Se pedir senha e você não criou nenhuma, deixe em branco ou pergunte ao instrutor.",
            "Se aparecer «Cannot connect», volte ao XAMPP: provavelmente o MySQL está parado.",
          ],
          true,
        ),
        porque("O Workbench é o «controle remoto» do banco: ele não guarda dados, apenas se conecta ao MySQL que o XAMPP ligou e mostra o resultado dos comandos."),
      ],
    },
    {
      id: "guia-sql-workbench-editor",
      titulo: "Passo 6 (opção B) — Criar as tabelas e executar consultas",
      imagem: { url: imgWorkbenchEditor, alt: "Editor SQL do Workbench com o script, o botão de raio em destaque e o resultado COUNT(*) igual a 5.", legenda: AVISO_IMAGEM },
      blocos: [
        lista(
          [
            "Na tela do Workbench, clique no ícone de nova aba SQL (SQL+) para abrir um editor vazio.",
            "Cole o script abaixo (ele cria o banco «atividade», as tabelas e os dados) e execute o script inteiro com Ctrl + Shift + Enter, ou clique no ícone do raio.",
            "No painel SCHEMAS (à esquerda), clique no ícone de atualizar e confira se o banco «atividade» e as tabelas apareceram.",
            "Apague o script, escreva a sua consulta (sempre começando com USE atividade; se for outra sessão) e execute com Ctrl + Enter. O resultado aparece embaixo.",
          ],
          true,
        ),
        { tipo: "codigo", conteudo: codigoMysql(tabelas), rotulo: "Script de preparação (MySQL)" },
        porque("O script tem três partes: criar o banco, escolher o banco com USE e criar as tabelas com os dados. Sem o USE o Workbench não sabe em qual banco trabalhar. Ctrl + Enter executa só o comando onde o cursor está; Ctrl + Shift + Enter executa tudo."),
      ],
    },
    {
      id: "guia-sql-erros",
      titulo: "Passo 7 — Erros comuns em SQL e como resolver",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["Mensagem", "O que significa", "O que fazer"],
          linhas: [
            ["no such table (SQLite) / Table ... doesn't exist (MySQL)", "A tabela não existe ou o nome está diferente.", "Execute de novo o código de preparação e confira o nome da tabela."],
            ["no such column / Unknown column", "O nome da coluna está errado ou não existe nessa tabela.", "Veja as colunas da tabela (SELECT * FROM tabela LIMIT 3) e copie o nome igual."],
            ["syntax error near ...", "Falta ou sobra uma vírgula, aspas ou palavra, perto do trecho indicado.", "Leia o comando em voz alta: SELECT ... FROM ... WHERE ... e confira vírgulas e aspas."],
            ["Resultado vazio", "O filtro não encontrou nenhuma linha.", "Confira o texto do filtro: 'pago' em minúsculas, acentos e espaços importam."],
            ["Resultado diferente do esperado no portal", "O ambiente mudou um dado ou um filtro ficou de fora.", "Reexecute a preparação do zero e releia o enunciado: pode faltar um WHERE."],
          ],
        },
        porque("Ler a mensagem do banco é o jeito mais rápido de achar o problema: ela cita o trecho que deu erro. Um resultado vazio ou diferente não é erro do banco: é sinal de que a pergunta feita não é a pergunta que você quis fazer."),
      ],
    },
    itemVerificacao(
      "guia-sql-conferencia",
      "Conferência — o seu ambiente está funcionando?",
      `Depois de preparar o banco, execute a consulta de exemplo (${consultaVerificacao.replace(/\n/g, " ")}) e digite o número que o banco devolveu.`,
      verificacao,
    ),
  ];
}
