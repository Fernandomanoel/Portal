import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, briefing, consulta, dissertativa, somar } from "../ajudantes";
import { codigoDataFrame, guiaPython } from "../guiasLinguagens";
import { decimal, inteiro, sortear, sorteio } from "../dadosFicticios";

const r = sorteio(4707);
const PRODUTOS = ["Caneta", "Caderno", "Mochila", "Estojo", "Régua", "Calculadora"];
const REGIOES = ["Norte", "Sul", "Leste", "Oeste"] as const;
const DF = Array.from({ length: 20 }, (_, i) => [String(i), sortear(r, PRODUTOS), sortear(r, REGIOES), inteiro(r, 4, 60), decimal(r, 3, 95)]);
const qtd = DF.map((l) => l[3] as number);
const preco = DF.map((l) => l[4] as number);
const media = (xs: number[]) => somar(xs) / xs.length;
const mediana = (xs: number[]) => {
  const o = [...xs].sort((a, b) => a - b);
  const m = Math.floor(o.length / 2);
  return o.length % 2 ? o[m] : (o[m - 1] + o[m]) / 2;
};
const desvio = (xs: number[]) => Math.sqrt(somar(xs.map((x) => (x - media(xs)) ** 2)) / (xs.length - 1));
const receita = somar(DF.map((l) => (l[3] as number) * (l[4] as number)));
const doSul = DF.filter((l) => l[2] === "Sul");

const CODIGO = `import pandas as pd

df = pd.DataFrame(dados, columns=["id", "produto", "regiao", "quantidade", "preco"])
print(df.shape)`;

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Análise de Dados — Big Data e Análise Descritiva com Python",
  introducao:
    "Um dia de trabalho com Python: entender os 5 Vs do Big Data e usar pandas para descrever uma base de vendas, com média, mediana, desvio padrão, receita total e agrupamento por região. A tabela vem dentro da atividade: crie o DataFrame no seu Python (Colab, Jupyter ou terminal), escreva o código e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "Do Big Data ao relatório descritivo",
      remetente: "Dr. Felipe Andrade, cientista de dados líder da Rede Papel & Cia",
      assunto: "Primeiros números da base de vendas de material escolar",
      paragrafos: [
        "Big Data é o conjunto de dados cujo volume, velocidade e variedade exigem ferramentas diferentes das planilhas comuns. Mesmo assim, o primeiro trabalho do analista costuma ser pequeno e descritivo: olhar o formato da base, calcular medidas-resumo e agrupar. É o que você vai fazer com uma amostra de 20 vendas, usando pandas.",
        "Crie o DataFrame df com as colunas da tabela abaixo (você pode copiar os dados para um arquivo CSV e usar pd.read_csv, ou montar uma lista de listas) e escreva cada comando em Python. Os comandos são conferidos por padrão (por exemplo, df['quantidade'].mean()).",
      ],
      entregas: [
        "Quatro comandos em pandas com os resultados (etapas 2 e 3).",
        "Um parágrafo sobre os 5 Vs e sobre os limites de uma amostra pequena (etapa 5).",
      ],
    }),
    ...guiaPython({
      codigo: { rotulo: "Código pronto: cria o DataFrame df com as 20 vendas", conteudo: codigoDataFrame(["id", "produto", "regiao", "quantidade", "preco"], DF.map((l) => [Number(l[0]), l[1], l[2], l[3], l[4]])) },
      comandoVerificacao: "df.shape",
      verificacao: { rotulo: "Número de linhas do df (primeiro número de df.shape)", valor: DF.length },
    }),
    associar({
      id: "cinco-vs",
      titulo: "Etapa 2 — Os 5 Vs do Big Data",
      instrucao: "Associe cada situação ao V correspondente.",
      opcoes: ["Volume", "Velocidade", "Variedade", "Veracidade", "Valor"],
      linhas: [
        { id: "terabytes", rotulo: "A rede registra bilhões de linhas de venda por ano.", correta: 0 },
        { id: "tempo-real", rotulo: "Os dados precisam ser processados quase em tempo real para detectar fraude no cartão.", correta: 1 },
        { id: "formatos", rotulo: "Há planilhas, e-mails, imagens e vídeos de câmeras da loja.", correta: 2 },
        { id: "qualidade", rotulo: "Parte do cadastro está desatualizada e há dados duplicados.", correta: 3 },
        { id: "decisao", rotulo: "O que importa é que os dados gerem uma decisão que traga resultado.", correta: 4 },
      ],
      explicacao: "Os 5 Vs lembram que Big Data não é só tamanho: é também rapidez, formato, confiabilidade e utilidade.",
    }),
    consulta({
      id: "estatisticas",
      titulo: "Etapa 3 — Medidas-resumo com pandas",
      cenario: "Calcule as medidas de resumo da coluna quantidade e do preço.",
      instrucao: "Use .mean(), .median() e .std() (o std do pandas é o desvio padrão amostral).",
      codigo: { rotulo: "Montagem do DataFrame", conteudo: CODIGO },
      tabelas: [{ nome: "Dados (20 linhas)", colunas: ["id", "produto", "regiao", "quantidade", "preco"], linhas: DF }],
      comandos: [
        { id: "media", rotulo: "Comando da média da quantidade", padrao: /df\s*\[\s*['"]quantidade['"]\s*\]\s*\.\s*mean\s*\(\s*\)/, dica: "Use df['quantidade'].mean()." },
        { id: "mediana", rotulo: "Comando da mediana do preço", padrao: /df\s*\[\s*['"]preco['"]\s*\]\s*\.\s*median\s*\(\s*\)/, dica: "Use df['preco'].median()." },
        { id: "desvio", rotulo: "Comando do desvio padrão da quantidade", padrao: /df\s*\[\s*['"]quantidade['"]\s*\]\s*\.\s*std\s*\(\s*\)/, dica: "Use df['quantidade'].std()." },
      ],
      resultados: [
        { id: "r-media", rotulo: "Resultado: média da quantidade", valor: media(qtd), explicacao: "Soma das quantidades ÷ 20." },
        { id: "r-mediana", rotulo: "Resultado: mediana do preço (R$)", valor: mediana(preco), explicacao: "Valor central dos preços ordenados." },
        { id: "r-desvio", rotulo: "Resultado: desvio padrão da quantidade", valor: desvio(qtd), explicacao: "O .std() do pandas usa n − 1 no divisor.", tolerancia: 0.05 },
      ],
    }),
    consulta({
      id: "agrupamentos",
      titulo: "Etapa 4 — Receita e agrupamento por região",
      cenario: "Crie a coluna receita (quantidade × preço), some a receita total e conte as vendas da região Sul.",
      instrucao: "Use df['receita'] = df['quantidade'] * df['preco'], depois .sum(); e df.groupby('regiao') com .size() ou .count().",
      tabelas: [],
      comandos: [
        { id: "receita", rotulo: "Comando que cria a coluna de receita", padrao: /df\s*\[\s*['"]receita['"]\s*\]\s*=\s*df\s*\[\s*['"]quantidade['"]\s*\]\s*\*\s*df\s*\[\s*['"]preco['"]\s*\]/, dica: "Use df['receita'] = df['quantidade'] * df['preco']." },
        { id: "grupo", rotulo: "Comando de agrupamento por região", padrao: /df\s*\.\s*groupby\s*\(\s*['"]regiao['"]\s*\)/, dica: "Use df.groupby('regiao')." },
      ],
      resultados: [
        { id: "total", rotulo: "Resultado: receita total (R$)", valor: receita, explicacao: "Soma de quantidade × preço de todas as linhas." },
        { id: "sul", rotulo: "Resultado: número de vendas da região Sul", valor: doSul.length, explicacao: "Linhas com regiao igual a Sul.", tolerancia: 0 },
        { id: "receita-sul", rotulo: "Resultado: receita da região Sul (R$)", valor: somar(doSul.map((l) => (l[3] as number) * (l[4] as number))), explicacao: "Soma de quantidade × preço das vendas do Sul." },
      ],
    }),
    dissertativa({
      id: "limites-da-amostra",
      titulo: "Etapa 5 — Big Data, amostras e cautela",
      instrucao: "Escreva o parágrafo final do relatório.",
      deve: [
        "Explique os 5 Vs com um exemplo da Rede Papel & Cia para cada um (ao menos três deles).",
        "Comente o que os números da amostra de 20 vendas dizem e por que não se deve concluir sobre a rede inteira a partir dela.",
        "Explique por que a mediana e a média da quantidade podem ser diferentes e o que isso revela.",
        "Diga que cuidados de privacidade e de qualidade de dados você teria ao crescer da amostra para a base completa.",
      ],
      chave: /(volume|velocidade|variedade|veracidade|valor|amostra|m[eé]dia|mediana|qualidade|privacidade|lgpd)/i,
      minPalavras: 70,
    }),
  ],
};

export default atividade;
