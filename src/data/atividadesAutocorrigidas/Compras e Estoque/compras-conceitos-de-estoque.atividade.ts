import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, briefing, dissertativa, planilha, somar } from "../ajudantes";
import { decimal, inteiro, sortear, sorteio } from "../dadosFicticios";

const NOMES = ["Parafuso sextavado M8", "Porca M8", "Arruela lisa", "Cabo de aço 6 mm", "Rolamento 6204", "Correia em V", "Óleo lubrificante 1 L", "Luva de proteção", "Máscara PFF2", "Fita isolante", "Disco de corte", "Eletrodo de solda", "Tinta esmalte 3,6 L", "Solvente 5 L", "Broca 8 mm", "Lâmpada LED", "Disjuntor 20 A", "Fio flexível 2,5 mm", "Tubo PVC 50 mm", "Joelho PVC 50 mm", "Registro esfera", "Lixa d'água", "Estopa (kg)", "Graxa (kg)", "Abraçadeira", "Cola industrial", "Vedante", "Chave de fenda", "Alicate", "Trena 5 m"];
const r = sorteio(3101);
const ITENS = NOMES.map((nome, i) => {
  const consumo = inteiro(r, 20, 400);
  const lead = sortear(r, [5, 7, 10, 15, 20] as const);
  const saldo = Math.round(consumo * decimal(r, 0.2, 2.2));
  return [`ALM-${100 + i}`, nome, saldo, consumo, lead, decimal(r, 1.5, 85)];
});
const pp = (l: (string | number)[]) => {
  const diario = (l[3] as number) / 30;
  const demanda = diario * (l[4] as number);
  return demanda + demanda * 0.5;
};
const valorTotal = somar(ITENS.map((l) => (l[2] as number) * (l[5] as number)));
const ABAIXO = ITENS.filter((l) => (l[2] as number) < pp(l));
const necessidade = somar(ABAIXO.map((l) => (pp(l) - (l[2] as number)) * (l[5] as number)));
const cobertura = (l: (string | number)[]) => ((l[2] as number) / (l[3] as number)) * 30;

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Compras e Estoque — Conceitos de Estoque",
  introducao:
    "Um dia de trabalho no almoxarifado: avaliar o estoque de 30 itens, achar quais já passaram do ponto de pedido e calcular quanto custa repô-los. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "O pedido da gerente de suprimentos",
      remetente: "Patrícia Nogueira, gerente de suprimentos",
      assunto: "Posição do almoxarifado de manutenção — Indústria Vale Verde",
      paragrafos: [
        "Na semana passada duas máquinas pararam por falta de rolamento e de correia. Preciso entender onde o estoque está frágil. O almoxarifado tem 30 itens de manutenção com saldo atual, consumo médio mensal, prazo de entrega do fornecedor (lead time) e custo unitário.",
        "Regra da empresa: o ponto de pedido é a demanda durante o prazo de entrega mais um estoque de segurança de 50% dessa demanda. Considere o mês com 30 dias. Quando o saldo está abaixo do ponto de pedido, é hora de comprar.",
      ],
      entregas: [
        "O valor total do estoque e a cobertura de itens críticos (etapa 2).",
        "A lista dos itens abaixo do ponto de pedido e o custo para trazê-los de volta ao ponto (etapa 2).",
        "Uma explicação por escrito dos conceitos para a diretoria entender (etapa 4).",
      ],
    }),
    planilha({
      id: "posicao-do-almoxarifado",
      titulo: "Etapa 2 — Planilha: 30 itens do almoxarifado de manutenção",
      cenario: "Cole a planilha no Excel e crie as colunas Valor em estoque (=saldo × custo), Ponto de pedido (=consumo ÷ 30 × lead time × 1,5) e Situação (=SE(saldo < ponto; \"Comprar\"; \"OK\")).",
      colunas: ["Código", "Item", "Saldo atual", "Consumo mensal", "Lead time (dias)", "Custo unitário (R$)"],
      linhas: ITENS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "valor-total", rotulo: "Valor total em estoque (R$)", valor: valorTotal, explicacao: "Soma de saldo × custo unitário dos 30 itens." },
        { id: "pp-rolamento", rotulo: "Ponto de pedido do Rolamento 6204 (unidades)", valor: pp(ITENS[4]), explicacao: "Consumo ÷ 30 × lead time × 1,5.", tolerancia: 0.05 },
        { id: "cobertura-rolamento", rotulo: "Cobertura do Rolamento 6204 (dias de consumo)", valor: cobertura(ITENS[4]), explicacao: "Saldo ÷ consumo mensal × 30.", tolerancia: 0.05 },
        { id: "abaixo", rotulo: "Quantidade de itens abaixo do ponto de pedido", valor: ABAIXO.length, explicacao: "Itens cujo saldo é menor que o ponto de pedido.", tolerancia: 0 },
        { id: "reposicao", rotulo: "Custo para levar os itens abaixo do ponto até o ponto de pedido (R$)", valor: necessidade, explicacao: "Soma de (ponto de pedido − saldo) × custo dos itens a comprar.", tolerancia: 0.5 },
        { id: "giro", rotulo: "Giro anual do estoque total (consumo anual em valor ÷ valor em estoque)", valor: somar(ITENS.map((l) => (l[3] as number) * 12 * (l[5] as number))) / valorTotal, explicacao: "Quantas vezes o estoque se renova em um ano.", tolerancia: 0.03 },
      ],
    }),
    associar({
      id: "conceitos",
      titulo: "Etapa 3 — Conceitos de estoque",
      instrucao: "Associe cada situação ao conceito.",
      opcoes: ["Estoque de segurança", "Ponto de pedido", "Lead time", "Giro de estoque", "Cobertura"],
      linhas: [
        { id: "prazo", rotulo: "Tempo entre fazer o pedido e receber o material no almoxarifado.", correta: 2 },
        { id: "reserva", rotulo: "Quantidade extra mantida para o caso de atraso do fornecedor ou aumento do consumo.", correta: 0 },
        { id: "gatilho", rotulo: "Nível de estoque em que um novo pedido deve ser feito.", correta: 1 },
        { id: "renovacao", rotulo: "Quantas vezes o estoque é consumido e reposto em um período.", correta: 3 },
        { id: "dias", rotulo: "Por quantos dias o estoque atual atende ao consumo médio.", correta: 4 },
      ],
      explicacao: "Esses cinco conceitos juntos dizem quando comprar, quanto manter de reserva e se o capital parado no estoque está sendo bem usado.",
    }),
    dissertativa({
      id: "explicacao-diretoria",
      titulo: "Etapa 4 — Explicação à diretoria",
      cenario: "A diretoria pergunta por que não se compra tudo de uma vez para nunca faltar.",
      instrucao: "Escreva o texto que a gerente enviaria.",
      deve: [
        "Explique os custos de manter estoque em excesso (capital parado, espaço, perdas, obsolescência).",
        "Explique os custos de faltar material (máquina parada, atraso na produção, compra emergencial mais cara).",
        "Use os números da planilha para mostrar o equilíbrio: valor em estoque, itens abaixo do ponto e custo de reposição.",
        "Proponha uma regra simples para o almoxarifado avisar a compra no momento certo.",
      ],
      chave: /(estoque|capital|falta|ponto de pedido|seguran[cç]a|lead time|cobertura|giro|compra)/i,
      minPalavras: 60,
    }),
  ],
};

export default atividade;
