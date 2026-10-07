import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, consulta, dissertativa, somar } from "../ajudantes";
import { codigoCsv, guiaPython } from "../guiasLinguagens";
import { decimal, sortear, sorteio } from "../dadosFicticios";

const r = sorteio(4808);
const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const FILIAIS = ["Centro", "Shopping"] as const;
const LINHAS = MESES.flatMap((mes, i) =>
  FILIAIS.map((filial, j) => {
    const base = 42000 + i * 1400 + (j === 1 ? 9000 : 0);
    const valor = r() < 0.12 ? "" : Math.round(base * decimal(r, 0.92, 1.1, 3) * 100) / 100;
    return [`${mes}/2025`, filial, valor, sortear(r, [4, 5, 6, 7, 8] as const)];
  }),
);
const validas = LINHAS.filter((l) => l[2] !== "");
const nan = LINHAS.length - validas.length;
const porFilial = (f: string) => somar(validas.filter((l) => l[1] === f).map((l) => l[2] as number));
const TOTAL = somar(validas.map((l) => l[2] as number));
const exibe = LINHAS.map((l) => l.map((c) => (c === "" ? "(vazio)" : c)));

const CODIGO = `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns`;

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Análise de Dados — Extração e Tratamento de Dados em Python e Gráficos com Matplotlib e Seaborn",
  introducao:
    "Um dia de trabalho com Python: ler um arquivo CSV, tratar valores vazios, agrupar por filial e montar gráficos que contem a história dos dados. A tabela vem dentro da atividade: salve como CSV (separado por vírgula), escreva o código no seu Python e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "O faturamento das duas lojas",
      remetente: "Natália Bittencourt, gerente financeira da Rede Casa Nova",
      assunto: "Faturamento de 2025 — Centro x Shopping",
      paragrafos: [
        "A rede tem duas lojas, Centro e Shopping, e o sistema exporta o faturamento mensal em CSV. Algumas linhas vieram sem valor (falha na integração). Você vai ler o arquivo, tratar os vazios com pandas, calcular o total por filial e preparar dois gráficos: um de linha (evolução mensal) e um de barras (comparação entre filiais).",
        "Salve os dados abaixo em um arquivo faturamento.csv (cabeçalho: mes,filial,faturamento,dias_uteis_com_promocao). Os comandos são conferidos por padrão, por exemplo pd.read_csv, dropna, groupby, plt.plot, sns.barplot.",
      ],
      entregas: [
        "Código de leitura, tratamento e agrupamento, com os resultados (etapas 2 e 3).",
        "Código dos dois gráficos (etapa 4).",
        "Uma explicação por escrito dos gráficos, escolhendo bem o tipo e as cores para quem decide (etapa 5).",
      ],
    }),
    ...guiaPython({
      codigo: { rotulo: "Célula que cria o arquivo faturamento.csv (execute-a sozinha, como primeira linha da célula)", conteudo: codigoCsv("faturamento.csv", ["mes", "filial", "faturamento", "dias_uteis_com_promocao"], LINHAS) },
      comandoVerificacao: "len(pd.read_csv(\"faturamento.csv\"))  (depois de import pandas as pd)",
      verificacao: { rotulo: "Número de linhas de dados do arquivo (sem o cabeçalho)", valor: LINHAS.length },
    }),
    consulta({
      id: "leitura-e-tratamento",
      titulo: "Etapa 2 — Extração e tratamento dos dados",
      cenario: "Leia o CSV, veja quantas linhas têm faturamento vazio e remova-as.",
      instrucao: "Use pd.read_csv('faturamento.csv'), df['faturamento'].isna().sum() e df.dropna(subset=['faturamento']).",
      codigo: { rotulo: "Importações", conteudo: CODIGO },
      tabelas: [{ nome: `Conteúdo de faturamento.csv (${LINHAS.length} linhas)`, colunas: ["mes", "filial", "faturamento", "dias_uteis_com_promocao"], linhas: exibe }],
      comandos: [
        { id: "leitura", rotulo: "Comando de leitura do arquivo", padrao: /pd\s*\.\s*read_csv\s*\(\s*['"]faturamento\.csv['"]/, dica: "Use pd.read_csv('faturamento.csv')." },
        { id: "vazios", rotulo: "Comando que conta os valores vazios do faturamento", padrao: /(isna|isnull)\s*\(\s*\)\s*\.\s*sum\s*\(\s*\)/, dica: "Use df['faturamento'].isna().sum()." },
        { id: "limpeza", rotulo: "Comando que remove as linhas sem faturamento", padrao: /dropna\s*\(/, dica: "Use df.dropna(subset=['faturamento'])." },
      ],
      resultados: [
        { id: "linhas", rotulo: "Resultado: linhas no arquivo", valor: LINHAS.length, explicacao: "12 meses × 2 filiais.", tolerancia: 0 },
        { id: "nulos", rotulo: "Resultado: linhas com faturamento vazio", valor: nan, explicacao: "Valores que o pandas lê como NaN.", tolerancia: 0 },
        { id: "restam", rotulo: "Resultado: linhas que sobram depois do dropna", valor: validas.length, explicacao: "Linhas totais menos as vazias.", tolerancia: 0 },
      ],
    }),
    consulta({
      id: "agrupamento",
      titulo: "Etapa 3 — Total por filial",
      cenario: "Some o faturamento válido de cada filial.",
      instrucao: "Use df.groupby('filial')['faturamento'].sum() depois do tratamento.",
      tabelas: [],
      comandos: [{ id: "sql", rotulo: "Seu comando em Python", padrao: /groupby\s*\(\s*['"]filial['"]\s*\)[\s\S]*\[\s*['"]faturamento['"]\s*\]\s*\.\s*sum\s*\(\s*\)/, dica: "Use df.groupby('filial')['faturamento'].sum()." }],
      resultados: [
        { id: "centro", rotulo: "Resultado: faturamento da filial Centro (R$)", valor: porFilial("Centro"), explicacao: "Soma dos meses válidos da filial Centro." },
        { id: "shopping", rotulo: "Resultado: faturamento da filial Shopping (R$)", valor: porFilial("Shopping"), explicacao: "Soma dos meses válidos da filial Shopping." },
        { id: "peso", rotulo: "Resultado: participação do Shopping no total (%)", valor: (porFilial("Shopping") / TOTAL) * 100, explicacao: "Faturamento do Shopping ÷ total × 100.", tolerancia: 0.05 },
      ],
    }),
    consulta({
      id: "graficos",
      titulo: "Etapa 4 — Dois gráficos",
      cenario: "Monte um gráfico de linha com a evolução mensal por filial e um gráfico de barras com o total por filial. Informe a quantidade de pontos de cada um.",
      instrucao: "Use sns.lineplot(data=df, x='mes', y='faturamento', hue='filial') e sns.barplot(...) ou plt.bar(...), com plt.title, plt.xlabel, plt.ylabel e plt.show().",
      tabelas: [],
      comandos: [
        { id: "linha", rotulo: "Comando do gráfico de linha", padrao: /(sns\s*\.\s*lineplot|plt\s*\.\s*plot)\s*\(/, dica: "Use sns.lineplot(...) ou plt.plot(...)." },
        { id: "barra", rotulo: "Comando do gráfico de barras", padrao: /(sns\s*\.\s*barplot|plt\s*\.\s*bar)\s*\(/, dica: "Use sns.barplot(...) ou plt.bar(...)." },
        { id: "titulo", rotulo: "Comando que define o título e os rótulos dos eixos", padrao: /plt\s*\.\s*title\s*\([\s\S]*plt\s*\.\s*(xlabel|ylabel)\s*\(|plt\s*\.\s*(xlabel|ylabel)\s*\([\s\S]*plt\s*\.\s*title\s*\(/, dica: "Use plt.title, plt.xlabel e plt.ylabel." },
      ],
      resultados: [
        { id: "pontos-linha", rotulo: "Resultado: quantidade de pontos desenhados no gráfico de linha (uma por mês válido de cada filial)", valor: validas.length, explicacao: "Cada linha válida vira um ponto.", tolerancia: 0 },
        { id: "barras", rotulo: "Resultado: quantidade de barras do gráfico de barras", valor: 2, explicacao: "Uma barra por filial.", tolerancia: 0 },
      ],
    }),
    dissertativa({
      id: "contando-a-historia",
      titulo: "Etapa 5 — Contando a história com gráficos",
      instrucao: "Escreva o texto que acompanharia os dois gráficos no relatório da gerente financeira.",
      deve: [
        "Explique por que escolheu linha para a evolução no tempo e barras para a comparação entre filiais.",
        "Resuma o que os números mostram (total por filial, tendência ao longo do ano), citando os valores calculados.",
        "Explique como você tratou os meses sem dado e que alerta colocaria no gráfico para não enganar quem lê.",
        "Cite três boas práticas de visualização que aplicou (título claro, eixos nomeados, escala honesta, poucas cores, destaque do ponto importante).",
      ],
      chave: /(linha|barra|tend[eê]ncia|filial|dropna|vazio|escala|t[ií]tulo|eixo|cor|gr[aá]fico)/i,
      minPalavras: 70,
    }),
  ],
};

export default atividade;
