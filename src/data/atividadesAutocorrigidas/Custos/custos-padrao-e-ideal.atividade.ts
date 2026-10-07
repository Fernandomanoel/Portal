import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculos, associar, resposta, planilha, dissertativa, somar } from "../ajudantes";

const FICHA = [
  ["Madeira (kg)", 4, 12, 4.3, 12.5],
  ["Tecido (m)", 2, 30, 2, 33],
  ["Mão de obra (h)", 3, 25, 3.2, 24],
];
const PADRAO_UNIT = somar(FICHA.map((l) => (l[1] as number) * (l[2] as number)));
const REAL_UNIT = somar(FICHA.map((l) => (l[3] as number) * (l[4] as number)));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Custos — Sistemas de Custeio Padrão e Ideal",
  introducao:
    "O custo padrão é a meta de quanto cada unidade deveria custar. Comparando com o custo real, a empresa descobre onde gastou mais ou menos do que o planejado. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    associar({
      id: "conceitos",
      titulo: "Padrão, ideal e real",
      instrucao: "Associe cada tipo de custo ao seu significado.",
      opcoes: [
        "Custo real: o que realmente foi gasto",
        "Custo padrão: meta realista, com perdas normais previstas",
        "Custo ideal: perfeição, sem nenhuma perda ou ineficiência",
      ],
      linhas: [
        { id: "real", rotulo: "Apurado depois da produção, com os gastos efetivos.", correta: 0 },
        { id: "padrao", rotulo: "Definido antes, considerando uma eficiência alcançável.", correta: 1 },
        { id: "ideal", rotulo: "Alcançado só sob condições perfeitas, raramente atingido.", correta: 2 },
      ],
      explicacao: "O padrão serve de meta prática; o ideal mostra o limite teórico; o real é o resultado.",
    }),
    calculos({
      id: "variacao",
      titulo: "Variação de custo",
      cenario: "O custo padrão de uma peça é R$ 12,00. O custo real foi R$ 13,50 por peça. Foram produzidas 1.000 peças.",
      instrucao: "Calcule a variação por unidade e a variação total (use valor positivo se o real foi maior que o padrão).",
      campos: [
        { id: "unidade", rotulo: "Variação por unidade (R$)", esperado: 1.5, explicacao: "13,50 − 12,00 = 1,50 acima do padrão." },
        { id: "total", rotulo: "Variação total (R$)", esperado: 1500, explicacao: "1,50 × 1.000 = 1.500 de gasto a mais." },
      ],
    }),
    escolha({
      id: "favoravel",
      titulo: "Variação favorável ou desfavorável",
      instrucao: "No exemplo anterior, o custo real ficou acima do padrão. Essa variação é...",
      opcoes: ["Favorável.", "Desfavorável.", "Nula.", "Impossível de classificar."],
      correta: 1,
      explicacao: "Gastar mais que o padrão reduz o lucro: variação desfavorável. Gastar menos seria favorável.",
    }),
    resposta({
      id: "medida",
      titulo: "O que fazer com a variação",
      instrucao: "Se a variação desfavorável vem de maior consumo de matéria-prima, que ações a gerência pode tomar?",
      rotulo: "Sua resposta",
      placeholder: "Verificar desperdício, revisar o processo, treinar a equipe, checar a qualidade do material...",
      chave: /(desperd|treina|process|revis|qualidade|m[aá]quina|perda|controle)/i,
    }),
    planilha({
      id: "ficha-padrao",
      titulo: "Planilha: ficha de custo padrão x real de uma poltrona",
      cenario: "A ficha mostra a quantidade e o preço padrão de cada insumo por poltrona, e o que de fato foi consumido e pago. Foram produzidas 1.000 poltronas no mês. Cole a planilha no Excel e resolva (variação de preço = (preço real − preço padrão) × quantidade real × produção; variação de quantidade = (quantidade real − quantidade padrão) × preço padrão × produção).",
      colunas: ["Insumo", "Qtd padrão", "Preço padrão (R$)", "Qtd real", "Preço real (R$)"],
      linhas: FICHA,
      instrucao: "Calcule:",
      tarefas: [
        { id: "padrao-unit", rotulo: "Custo padrão por poltrona (R$)", valor: PADRAO_UNIT, explicacao: "4×12 + 2×30 + 3×25 = 48 + 60 + 75 = 183." },
        { id: "real-unit", rotulo: "Custo real por poltrona (R$)", valor: REAL_UNIT, explicacao: "4,3×12,5 + 2×33 + 3,2×24 = 53,75 + 66 + 76,80 = 196,55." },
        { id: "var-preco-madeira", rotulo: "Variação de preço da madeira no mês (R$)", valor: (12.5 - 12) * 4.3 * 1000, explicacao: "0,50 × 4,3 × 1.000 = 2.150, desfavorável." },
        { id: "var-qtd-madeira", rotulo: "Variação de quantidade da madeira no mês (R$)", valor: (4.3 - 4) * 12 * 1000, explicacao: "0,3 × 12 × 1.000 = 3.600, desfavorável." },
      ],
    }),
    dissertativa({
      id: "causas-variacoes",
      titulo: "Causas e providências",
      instrucao: "Escreva o relatório de variações do mês para a gerência de produção.",
      deve: [
        "Resuma a variação total e diga quais insumos foram favoráveis e desfavoráveis (note que a mão de obra teve preço real menor que o padrão).",
        "Levante uma causa provável para o consumo maior de madeira e uma para o preço maior do tecido.",
        "Proponha duas providências e como você verificaria se funcionaram.",
      ],
      chave: /(vari[aá]ç|desfavor|favor|madeira|tecido|causa|desperd|prov[ie]d|compra|padr[aã]o)/i,
    }),
  ],
};

export default atividade;
