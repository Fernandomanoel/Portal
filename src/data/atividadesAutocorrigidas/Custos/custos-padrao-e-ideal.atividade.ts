import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculos, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Custos — Sistemas de Custeio Padrão e Ideal",
  introducao:
    "O custo padrão é a meta de quanto cada unidade deveria custar. Comparando com o custo real, a empresa descobre onde gastou mais ou menos do que o planejado.",
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
    escolha({
      id: "analise",
      titulo: "Descobrindo a causa",
      instrucao: "Uma variação de custo de material pode vir de duas causas principais. Quais são?",
      opcoes: [
        "Mudança de preço do material (preço) e consumo diferente do previsto (quantidade).",
        "A cor da embalagem e o nome do cliente.",
        "O horário do café e o tamanho da sala.",
        "Apenas erro de digitação.",
      ],
      correta: 0,
      explicacao: "Separar preço e quantidade mostra se o problema está em comprar caro ou em desperdiçar.",
    }),
    resposta({
      id: "medida",
      titulo: "O que fazer com a variação",
      instrucao: "Se a variação desfavorável vem de maior consumo de matéria-prima, que ações a gerência pode tomar?",
      rotulo: "Sua resposta",
      placeholder: "Verificar desperdício, revisar o processo, treinar a equipe, checar a qualidade do material...",
      chave: /(desperd|treina|process|revis|qualidade|m[aá]quina|perda|controle)/i,
    }),
  ],
};

export default atividade;
