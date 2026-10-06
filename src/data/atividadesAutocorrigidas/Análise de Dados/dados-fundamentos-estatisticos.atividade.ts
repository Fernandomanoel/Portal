import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, dissertativa, planilha, somar } from "../ajudantes";
import { decimal, inteiro, sorteio } from "../dadosFicticios";

const r = sorteio(4202);
const VENDAS = Array.from({ length: 30 }, (_, i) => {
  const base = decimal(r, 3800, 7200, 0);
  const extra = i === 8 ? 9800 : i === 21 ? -2700 : 0;
  return [i + 1, Math.round((base + extra) / 10) * 10, inteiro(r, 20, 90)];
});
const valores = VENDAS.map((l) => l[1] as number);
const n = valores.length;
const media = somar(valores) / n;
const ordenados = [...valores].sort((a, b) => a - b);
const percentil = (p: number) => {
  const pos = (n - 1) * p;
  const baixo = Math.floor(pos);
  const frac = pos - baixo;
  return ordenados[baixo] + (ordenados[Math.min(baixo + 1, n - 1)] - ordenados[baixo]) * frac;
};
const mediana = percentil(0.5);
const q1 = percentil(0.25);
const q3 = percentil(0.75);
const variancia = somar(valores.map((v) => (v - media) ** 2)) / (n - 1);
const desvio = Math.sqrt(variancia);
const iqr = q3 - q1;
const outliers = valores.filter((v) => v < q1 - 1.5 * iqr || v > q3 + 1.5 * iqr);

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Análise de Dados — Fundamentos Estatísticos para Análise de Dados",
  introducao:
    "Um dia de trabalho de analista: descrever 30 dias de vendas com média, mediana, desvio padrão, quartis e valores atípicos, e explicar o que cada medida diz ao gestor. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "O relatório estatístico do mês",
      remetente: "Rodrigo Esteves, diretor comercial da Rede Ponto Forte",
      assunto: "Como foi o mês de vendas da loja do shopping?",
      paragrafos: [
        "O diretor quer entender o comportamento das vendas diárias da loja do shopping em 30 dias, e não apenas o total. Média e mediana mostram o centro dos dados; desvio padrão e quartis mostram o quanto os dias variam; valores atípicos (outliers) apontam dias fora do padrão que merecem investigação.",
        "Regra do outlier: valor abaixo de Q1 − 1,5 × IQR ou acima de Q3 + 1,5 × IQR, onde IQR = Q3 − Q1. Use os quartis do Excel (função QUARTIL.INC) e o desvio padrão amostral (DESVPAD.A).",
      ],
      entregas: [
        "As medidas de posição e de dispersão das vendas diárias (etapa 2).",
        "A identificação dos dias atípicos (etapa 2).",
        "Uma interpretação por escrito para o diretor, sem jargão (etapa 3).",
      ],
    }),
    planilha({
      id: "vendas-diarias",
      titulo: "Etapa 2 — Planilha: vendas diárias de 30 dias",
      cenario: "Cole a planilha no Excel e use MÉDIA, MED, DESVPAD.A, QUARTIL.INC, MÍNIMO e MÁXIMO na coluna de vendas.",
      colunas: ["Dia", "Vendas do dia (R$)", "Número de clientes atendidos"],
      linhas: VENDAS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "media", rotulo: "Média das vendas diárias (R$)", valor: media, explicacao: "Soma ÷ 30 dias." },
        { id: "mediana", rotulo: "Mediana das vendas diárias (R$)", valor: mediana, explicacao: "O valor central dos 30 dias ordenados (média dos dois centrais)." },
        { id: "desvio", rotulo: "Desvio padrão amostral (R$)", valor: desvio, explicacao: "DESVPAD.A da coluna de vendas.", tolerancia: 0.5 },
        { id: "q1", rotulo: "Primeiro quartil, Q1 (R$)", valor: q1, explicacao: "QUARTIL.INC(vendas; 1)." },
        { id: "q3", rotulo: "Terceiro quartil, Q3 (R$)", valor: q3, explicacao: "QUARTIL.INC(vendas; 3)." },
        { id: "amplitude", rotulo: "Amplitude (máximo menos mínimo) (R$)", valor: Math.max(...valores) - Math.min(...valores), explicacao: "MÁXIMO − MÍNIMO." },
        { id: "outliers", rotulo: "Quantidade de dias atípicos pela regra de 1,5 × IQR", valor: outliers.length, explicacao: "Dias abaixo do limite inferior ou acima do limite superior.", tolerancia: 0 },
        { id: "cv", rotulo: "Coeficiente de variação (desvio ÷ média, %)", valor: (desvio / media) * 100, explicacao: "Desvio padrão ÷ média × 100: mede a dispersão relativa.", tolerancia: 0.1 },
      ],
    }),
    dissertativa({
      id: "interpretacao",
      titulo: "Etapa 3 — Interpretação para o diretor",
      instrucao: "Escreva a leitura dos números sem jargão, como se explicasse a alguém que não é da área.",
      deve: [
        "Compare a média com a mediana e explique o que a diferença entre elas indica (presença de dias muito altos ou muito baixos).",
        "Explique o desvio padrão e os quartis dizendo, em palavras, quanto as vendas variam de um dia para o outro.",
        "Descreva os dias atípicos: que hipóteses de negócio você levantaria para cada um (promoção, feriado, falha de sistema) e como as checaria.",
        "Diga se você usaria a média ou a mediana como «venda típica» do mês e por quê.",
      ],
      chave: /(m[eé]dia|mediana|desvio|quartil|outlier|at[ií]pic|varia|t[ií]pic|promo[cç][aã]o|dispers)/i,
      minPalavras: 70,
    }),
    dissertativa({
      id: "qual-medida",
      titulo: "Etapa 4 — Quando cada medida engana",
      instrucao: "Dê dois exemplos de situações em que a média engana e a mediana é mais honesta, e uma situação em que o desvio padrão muda a decisão.",
      deve: [
        "Use exemplos concretos de negócio (salários, tempo de entrega, valor de pedidos).",
        "Explique a razão matemática: a média é sensível a valores extremos.",
        "Descreva uma decisão em que dois conjuntos com a mesma média, mas desvios diferentes, levariam a escolhas diferentes.",
      ],
      chave: /(m[eé]dia|mediana|extremo|desvio|salário|decis|sens[ií]vel|exemplo)/i,
    }),
  ],
};

export default atividade;
