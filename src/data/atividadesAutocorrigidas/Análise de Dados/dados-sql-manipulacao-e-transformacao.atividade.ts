import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, consulta, dissertativa, somar } from "../ajudantes";
import { decimal, inteiro, sorteio } from "../dadosFicticios";

const r = sorteio(4505);
const CATEGORIAS = ["Papelaria", "Informática", "Limpeza", "Copa"] as const;
const NOMES = ["Caderno universitário", "Caneta gel", "Mouse sem fio", "Teclado USB", "Pen drive 64 GB", "Detergente 5 L", "Desinfetante 2 L", "Papel toalha", "Café 1 kg", "Açúcar 5 kg", "Fones de ouvido", "Marcador permanente", "Pasta com elástico", "Cabo HDMI", "Esponja multiuso", "Copo descartável (cx)"];
const PRODUTOS = NOMES.map((nome, i) => [String(i + 1), nome, CATEGORIAS[i % 4], decimal(r, 8, 260)]);
const VENDAS = Array.from({ length: 36 }, (_, i) => [String(i + 1), String(inteiro(r, 1, 16)), inteiro(r, 1, 12), `2025-0${inteiro(r, 1, 4)}-${String(inteiro(r, 1, 28)).padStart(2, "0")}`]);
const preco = (id: string) => PRODUTOS.find((p) => p[0] === id)![3] as number;
const categoria = (id: string) => PRODUTOS.find((p) => p[0] === id)![2] as string;
const receita = (v: (string | number)[]) => (v[2] as number) * preco(v[1] as string);
const porCategoria = new Map<string, number>();
for (const v of VENDAS) porCategoria.set(categoria(v[1] as string), (porCategoria.get(categoria(v[1] as string)) ?? 0) + receita(v));
const faixa = (p: number) => (p < 50 ? "Barato" : p <= 150 ? "Médio" : "Caro");
const contFaixa = (f: string) => PRODUTOS.filter((p) => faixa(p[3] as number) === f).length;
const mes = (m: string) => VENDAS.filter((v) => (v[3] as string).slice(5, 7) === m);
const receitaMedia = somar(VENDAS.map(receita)) / VENDAS.length;
const acimaMedia = VENDAS.filter((v) => receita(v) > receitaMedia).length;

const ESQUEMA = `CREATE TABLE produtos (id INT, nome VARCHAR(60), categoria VARCHAR(30), preco DECIMAL(10,2));
CREATE TABLE vendas (id INT, produto_id INT, quantidade INT, data DATE);`;

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Análise de Dados — Manipulação e Transformação de Dados em SQL",
  introducao:
    "Um dia de trabalho de transformação de dados: juntar tabelas, criar colunas calculadas, classificar com CASE WHEN, agregar por período e comparar com a média usando subconsulta. As tabelas vêm dentro da atividade: copie para o seu banco, escreva os comandos e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "O relatório gerencial da loja de suprimentos",
      remetente: "Mônica Aguiar, gerente da Suprimentos Central",
      assunto: "Vendas por categoria, faixa de preço e mês",
      paragrafos: [
        "A loja tem duas tabelas: produtos (id, nome, categoria, preco) e vendas (id, produto_id, quantidade, data). A receita de uma venda é quantidade × preço do produto, e para calculá-la é preciso juntar as duas tabelas com JOIN.",
        "Quero um relatório por categoria, uma classificação dos produtos por faixa de preço (Barato: abaixo de R$ 50; Médio: de R$ 50 a R$ 150; Caro: acima de R$ 150), a receita de fevereiro e uma lista das vendas acima da média. Os comandos são conferidos por padrão: escreva em SQL padrão.",
      ],
      entregas: [
        "Quatro consultas e seus resultados (etapas 2 a 5).",
        "Um resumo gerencial por escrito (etapa 6).",
      ],
    }),
    consulta({
      id: "receita-por-categoria",
      titulo: "Etapa 2 — Consulta 1: receita por categoria",
      cenario: "Some a receita de cada categoria (quantidade × preço), juntando vendas e produtos.",
      instrucao: "Use JOIN, SUM(quantidade * preco) e GROUP BY categoria.",
      codigo: { rotulo: "Estrutura das tabelas", conteudo: ESQUEMA },
      tabelas: [
        { nome: "Tabela produtos (16 linhas)", colunas: ["id", "nome", "categoria", "preco"], linhas: PRODUTOS },
        { nome: "Tabela vendas (36 linhas)", colunas: ["id", "produto_id", "quantidade", "data"], linhas: VENDAS },
      ],
      comandos: [{ id: "sql", rotulo: "Seu comando SQL", padrao: /select[\s\S]+sum\s*\(\s*(\w+\.)?quantidade\s*\*\s*(\w+\.)?preco\s*\)[\s\S]+join[\s\S]+on[\s\S]+group\s+by[\s\S]+categoria/i, dica: "Faltam SUM(quantidade * preco), o JOIN com ON ou o GROUP BY categoria." }],
      resultados: [
        { id: "papelaria", rotulo: "Resultado: receita da categoria Papelaria (R$)", valor: porCategoria.get("Papelaria") ?? 0, explicacao: "Soma de quantidade × preço das vendas de produtos da categoria Papelaria." },
        { id: "informatica", rotulo: "Resultado: receita da categoria Informática (R$)", valor: porCategoria.get("Informática") ?? 0, explicacao: "Soma de quantidade × preço das vendas de produtos de Informática." },
        { id: "total", rotulo: "Resultado: receita total das quatro categorias (R$)", valor: somar(VENDAS.map(receita)), explicacao: "Soma das receitas de todas as vendas." },
      ],
    }),
    consulta({
      id: "faixas",
      titulo: "Etapa 3 — Consulta 2: produtos por faixa de preço",
      cenario: "Classifique os produtos em Barato (abaixo de 50), Médio (de 50 a 150) ou Caro (acima de 150) e conte quantos há em cada faixa.",
      instrucao: "Use CASE WHEN ... THEN ... END e GROUP BY na expressão.",
      tabelas: [],
      comandos: [{ id: "sql", rotulo: "Seu comando SQL", padrao: /select[\s\S]+case[\s\S]+when[\s\S]+then[\s\S]+end[\s\S]+count\s*\(|select[\s\S]+count\s*\([\s\S]+case[\s\S]+when[\s\S]+end/i, dica: "Falta o CASE WHEN ... THEN ... END ou o COUNT para contar por faixa." }],
      resultados: [
        { id: "barato", rotulo: "Resultado: produtos na faixa Barato", valor: contFaixa("Barato"), explicacao: "Produtos com preço menor que 50.", tolerancia: 0 },
        { id: "medio", rotulo: "Resultado: produtos na faixa Médio", valor: contFaixa("Médio"), explicacao: "Produtos com preço de 50 a 150.", tolerancia: 0 },
        { id: "caro", rotulo: "Resultado: produtos na faixa Caro", valor: contFaixa("Caro"), explicacao: "Produtos com preço acima de 150.", tolerancia: 0 },
      ],
    }),
    consulta({
      id: "fevereiro",
      titulo: "Etapa 4 — Consulta 3: receita e vendas de fevereiro",
      cenario: "Quantas vendas aconteceram em fevereiro e qual foi a receita do mês?",
      instrucao: "Filtre as datas de 2025-02-01 a 2025-02-28 (WHERE data BETWEEN ... AND ...) e some quantidade × preço com JOIN.",
      tabelas: [],
      comandos: [{ id: "sql", rotulo: "Seu comando SQL", padrao: /select[\s\S]+join[\s\S]+where[\s\S]+(between[\s\S]+2025-02|2025-02|month\s*\(|extract\s*\(|strftime)/i, dica: "Faltam o JOIN ou o filtro de datas de fevereiro (BETWEEN, EXTRACT, MONTH ou strftime)." }],
      resultados: [
        { id: "qtd", rotulo: "Resultado: quantidade de vendas em fevereiro", valor: mes("02").length, explicacao: "Vendas com data entre 2025-02-01 e 2025-02-28.", tolerancia: 0 },
        { id: "receita", rotulo: "Resultado: receita de fevereiro (R$)", valor: somar(mes("02").map(receita)), explicacao: "Soma de quantidade × preço das vendas de fevereiro." },
      ],
    }),
    consulta({
      id: "acima-da-media",
      titulo: "Etapa 5 — Consulta 4: vendas acima da média",
      cenario: `A receita média por venda é R$ ${receitaMedia.toFixed(2).replace(".", ",")}. Quantas vendas ficaram acima dessa média?`,
      instrucao: "Use uma subconsulta: compare a receita da venda com (SELECT AVG(...)) calculada sobre todas as vendas.",
      tabelas: [],
      comandos: [{ id: "sql", rotulo: "Seu comando SQL", padrao: /select[\s\S]+where[\s\S]+>\s*\(\s*select[\s\S]+avg\s*\(/i, dica: "Falta a subconsulta: WHERE receita > (SELECT AVG(...) ...)." }],
      resultados: [{ id: "qtd", rotulo: "Resultado: vendas com receita acima da média", valor: acimaMedia, explicacao: "Vendas cuja receita supera a média de todas as vendas.", tolerancia: 0 }],
    }),
    dissertativa({
      id: "resumo-gerencial",
      titulo: "Etapa 6 — Resumo gerencial",
      instrucao: "Escreva o resumo que a gerente receberia.",
      deve: [
        "Diga qual categoria rendeu mais e menos, com os valores que o banco devolveu.",
        "Explique, em palavras, por que o JOIN foi necessário para calcular a receita e o que aconteceria se as tabelas não fossem ligadas pela chave produto_id.",
        "Explique o que o CASE WHEN fez com os preços e como a faixa ajudaria a loja a decidir promoções.",
        "Sugira uma nova consulta para aprofundar o relatório (por produto, por semana ou por faixa de preço).",
      ],
      chave: /(categoria|join|chave|produto_id|case|faixa|receita|m[eé]dia|promo[cç][aã]o|consulta)/i,
      minPalavras: 65,
    }),
  ],
};

export default atividade;
