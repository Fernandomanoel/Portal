import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, briefing, consulta, dissertativa, somar } from "../ajudantes";
import { inteiro, sorteio } from "../dadosFicticios";

const r = sorteio(5808);
const PRODUTOS = [
  ["1", "Notebook 14\"", "Computadores", 3890, 3050],
  ["2", "Monitor 24\"", "Computadores", 980, 720],
  ["3", "Teclado sem fio", "Periféricos", 189, 118],
  ["4", "Mouse ergonômico", "Periféricos", 129, 76],
  ["5", "Impressora a laser", "Impressão", 1290, 940],
  ["6", "Toner compatível", "Impressão", 215, 120],
  ["7", "Roteador Wi-Fi 6", "Redes", 459, 310],
  ["8", "Switch 8 portas", "Redes", 169, 105],
];
const VENDAS = Array.from({ length: 30 }, (_, i) => [
  String(i + 1),
  `2025-0${inteiro(r, 1, 3)}-${String(inteiro(r, 1, 28)).padStart(2, "0")}`,
  String(inteiro(r, 1, 8)),
  inteiro(r, 1, 12),
]);
const prod = (id: string) => PRODUTOS.find((p) => p[0] === id)!;
const receita = (v: (string | number)[]) => (v[3] as number) * (prod(v[2] as string)[3] as number);
const custo = (v: (string | number)[]) => (v[3] as number) * (prod(v[2] as string)[4] as number);
const RECEITA = somar(VENDAS.map(receita));
const CUSTO = somar(VENDAS.map(custo));
const porCategoria = (c: string) => somar(VENDAS.filter((v) => prod(v[2] as string)[2] === c).map(receita));
const lucroCategoria = (c: string) => somar(VENDAS.filter((v) => prod(v[2] as string)[2] === c).map((v) => receita(v) - custo(v)));
const lider = ["Computadores", "Periféricos", "Impressão", "Redes"].sort((a, b) => porCategoria(b) - porCategoria(a))[0];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Inteligência Artificial II — Relatórios com Auxílio de IA no Power BI e no Excel e Tabelas Vinculadas",
  introducao:
    "Um dia de trabalho de analista de BI: ligar uma tabela de vendas a uma tabela de produtos pela chave, calcular receita, margem e categorias com PROCV/PROCX e medidas DAX e usar o assistente de IA para acelerar o relatório, sempre conferindo os números. As tabelas vêm dentro da atividade: copie para o Excel ou o Power BI, escreva a fórmula e digite o resultado. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "O painel de vendas da Distribuidora TecnoPonto",
      remetente: "Gabriel Sampaio, gerente comercial da TecnoPonto",
      assunto: "Preciso de um relatório com receita, margem e categoria — e confio no número, não na IA",
      paragrafos: [
        "A TecnoPonto tem duas tabelas: Produtos (id, produto, categoria, preço de venda, custo) e Vendas (id da venda, data, id do produto, quantidade). Os dados estão separados de propósito: a tabela de vendas só guarda o código do produto, e o preço e a categoria vivem na tabela de produtos. Para analisar, é preciso vincular as duas pelo código do produto (relação um-para-muitos: um produto aparece em muitas vendas).",
        "O Power BI e o Excel têm assistentes de IA que sugerem relatórios e medidas a partir de uma pergunta em linguagem natural. Eles aceleram o trabalho, mas o analista continua responsável pelo número: confira sempre as medidas geradas com um cálculo independente. Aqui você escreve as fórmulas, informa os resultados e depois usa a IA para sugerir, conferindo o que ela entregar.",
      ],
      entregas: [
        "A busca de preço e categoria na tabela de produtos e a receita total (etapa 2).",
        "As medidas de receita, margem e a categoria líder (etapa 3).",
        "O passo a passo do relatório, do uso do assistente de IA e das conferências por escrito (etapa 5).",
      ],
    }),
    consulta({
      id: "procv",
      titulo: "Etapa 2 — Buscando o preço na tabela de produtos (PROCV ou PROCX)",
      cenario: "Na planilha de vendas, crie a coluna Preço unitário buscando o preço pelo id do produto e, depois, a coluna Receita (=quantidade × preço).",
      instrucao: "Use =PROCV(C2; Produtos!A:E; 4; FALSO) ou =PROCX(C2; Produtos!A:A; Produtos!D:D) e some a coluna Receita.",
      tabelas: [
        { nome: "Tabela Produtos (8 linhas)", colunas: ["id", "produto", "categoria", "preço de venda (R$)", "custo (R$)"], linhas: PRODUTOS },
        { nome: "Tabela Vendas (30 linhas)", colunas: ["id da venda", "data", "id do produto", "quantidade"], linhas: VENDAS },
      ],
      comandos: [{ id: "formula", rotulo: "Sua fórmula de busca do preço", padrao: /=\s*(procv|vlookup|procx|xlookup|[ií]ndice|index)\s*\(/i, placeholder: "Ex.: =PROCV(C2; Produtos!A:E; 4; FALSO)", dica: "Use PROCV, PROCX (XLOOKUP) ou ÍNDICE/CORRESP buscando pelo id do produto." }],
      resultados: [
        { id: "receita", rotulo: "Resultado: receita total das 30 vendas (R$)", valor: RECEITA, explicacao: "Soma de quantidade × preço de cada venda." },
        { id: "unidades", rotulo: "Resultado: total de unidades vendidas", valor: somar(VENDAS.map((v) => v[3] as number)), explicacao: "Soma da coluna quantidade.", tolerancia: 0 },
        { id: "computadores", rotulo: "Resultado: receita da categoria Computadores (R$)", valor: porCategoria("Computadores"), explicacao: "Soma da receita das vendas de produtos da categoria Computadores." },
      ],
    }),
    consulta({
      id: "medidas",
      titulo: "Etapa 3 — Medidas no Power BI (DAX)",
      cenario: "Com as tabelas relacionadas pela coluna id do produto, crie medidas para receita e custo. Em DAX, a tabela Vendas precisa buscar o preço na tabela Produtos com RELATED dentro de um iterador, como SUMX.",
      instrucao: "Escreva as medidas Receita e Margem bruta (%), por exemplo: Receita = SUMX(Vendas; Vendas[quantidade] * RELATED(Produtos[preco])).",
      tabelas: [],
      comandos: [
        { id: "medida-receita", rotulo: "Sua medida de Receita", padrao: /sumx\s*\(\s*vendas[\s\S]+related\s*\(\s*produtos\s*\[/i, placeholder: "Receita = SUMX(Vendas; ...)", dica: "Use SUMX sobre a tabela Vendas com RELATED(Produtos[...]) para buscar o preço." },
        { id: "medida-margem", rotulo: "Sua medida de Margem bruta (%)", padrao: /divide\s*\(|\/\s*\[?\s*receita|\[\s*receita\s*\]\s*[-/]/i, placeholder: "Margem % = DIVIDE([Receita] - [Custo]; [Receita])", dica: "Use DIVIDE([Receita] − [Custo]; [Receita]) ou a divisão equivalente." },
      ],
      resultados: [
        { id: "custo", rotulo: "Resultado: custo total dos produtos vendidos (R$)", valor: CUSTO, explicacao: "Soma de quantidade × custo de cada venda." },
        { id: "margem", rotulo: "Resultado: margem bruta total (%)", valor: ((RECEITA - CUSTO) / RECEITA) * 100, explicacao: "(Receita − custo) ÷ receita × 100.", tolerancia: 0.05 },
        { id: "lucro-impressao", rotulo: "Resultado: lucro bruto da categoria Impressão (R$)", valor: lucroCategoria("Impressão"), explicacao: "Receita menos custo das vendas da categoria Impressão." },
        { id: "lider", rotulo: `Resultado: receita da categoria líder (${lider}) (R$)`, valor: porCategoria(lider), explicacao: `A categoria que mais faturou é ${lider}.` },
      ],
    }),
    associar({
      id: "relacionamentos",
      titulo: "Etapa 4 — Relacionamentos entre tabelas",
      instrucao: "Associe cada situação ao conceito.",
      opcoes: ["Chave primária", "Chave estrangeira", "Relação um-para-muitos", "Tabela fato", "Tabela dimensão"],
      linhas: [
        { id: "pk", rotulo: "A coluna id da tabela Produtos, que identifica cada produto de forma única.", correta: 0 },
        { id: "fk", rotulo: "A coluna id do produto na tabela Vendas, que aponta para a tabela Produtos.", correta: 1 },
        { id: "um-muitos", rotulo: "Um produto aparece em muitas vendas.", correta: 2 },
        { id: "fato", rotulo: "A tabela Vendas, com um registro por evento (cada venda).", correta: 3 },
        { id: "dimensao", rotulo: "A tabela Produtos, que descreve o produto, a categoria e o custo.", correta: 4 },
      ],
      explicacao: "Separar fato e dimensão evita repetir o preço e a categoria em cada venda e permite que o relatório filtre e some em qualquer combinação.",
    }),
    dissertativa({
      id: "relatorio-e-ia",
      titulo: "Etapa 5 — O relatório, o assistente de IA e as conferências",
      instrucao: "Escreva o procedimento e o resumo executivo para o gerente comercial.",
      deve: [
        "Descreva o passo a passo do relatório: importar as duas tabelas, criar o relacionamento pelo id do produto, criar as medidas e montar os visuais (cartões de receita e margem, gráfico por categoria).",
        "Escreva o pedido (prompt) que daria ao assistente de IA do Power BI ou do Excel para sugerir o relatório, citando as tabelas, as colunas e o resultado esperado.",
        "Explique como você conferiria as medidas sugeridas pela IA com os números que calculou nas etapas 2 e 3 (receita, custo e margem), e o que faria se não batessem.",
        "Resuma o resultado para o gerente em três frases com receita total, margem e categoria líder, e aponte uma limitação (poucos dados, só três meses).",
      ],
      chave: /(relacionamento|id do produto|medida|receita|margem|categoria|prompt|assistente|ia|confer|importar|visual)/i,
      minPalavras: 90,
    }),
  ],
};

export default atividade;
