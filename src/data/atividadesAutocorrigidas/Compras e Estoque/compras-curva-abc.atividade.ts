import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, briefing, dissertativa, planilha, somar } from "../ajudantes";
import { decimal, inteiro, sorteio } from "../dadosFicticios";

const NOMES = ["Motor elétrico 5 cv", "Bomba centrífuga", "Painel de comando", "Inversor de frequência", "Redutor de velocidade", "Rolamento 6205", "Correia dentada", "Filtro de ar", "Filtro de óleo", "Sensor indutivo", "Contator 25 A", "Relé térmico", "Cabo PP 3x2,5", "Terminal de compressão", "Parafuso M10", "Porca M10", "Arruela de pressão", "Graxa (kg)", "Óleo hidráulico (L)", "Fita veda rosca", "Luva de raspa", "Óculos de proteção", "Protetor auricular", "Etiqueta de identificação", "Abraçadeira de nylon", "Lâmpada tubular", "Reator eletrônico", "Cola epóxi", "Estopa (kg)", "Papelão técnico"];
const r = sorteio(3606);
const BRUTO = NOMES.map((nome, i) => {
  const caro = i < 8;
  const custo = caro ? decimal(r, 800, 9000) : i < 18 ? decimal(r, 60, 700) : decimal(r, 3, 60);
  const consumo = caro ? inteiro(r, 2, 12) : i < 18 ? inteiro(r, 10, 90) : inteiro(r, 40, 600);
  return { cod: `ITM-${500 + i}`, nome, consumo, custo, valor: consumo * custo };
});
const ORDENADO = [...BRUTO].sort((a, b) => b.valor - a.valor);
const TOTAL = somar(BRUTO.map((b) => b.valor));
let acumulado = 0;
const CLASSES = new Map<string, "A" | "B" | "C">();
for (const b of ORDENADO) {
  acumulado += b.valor;
  const pct = (acumulado / TOTAL) * 100;
  CLASSES.set(b.cod, pct <= 80 ? "A" : pct <= 95 ? "B" : "C");
}
const classe = (c: "A" | "B" | "C") => ORDENADO.filter((b) => CLASSES.get(b.cod) === c);
const LINHAS = BRUTO.map((b) => [b.cod, b.nome, b.consumo, b.custo]);

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Compras e Estoque — Classificação ABC dos Materiais",
  introducao:
    "Um dia de trabalho de priorização: classificar 30 materiais pela curva ABC, descobrir quais poucos itens concentram a maior parte do dinheiro e decidir onde colocar o esforço de controle. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "A reunião de segunda-feira",
      remetente: "Eduardo Prado, diretor industrial da Fábrica Nova Era",
      assunto: "Quais itens merecem mais atenção do estoque?",
      paragrafos: [
        "O almoxarifado tem 30 itens de manutenção, mas a equipe é pequena e não consegue controlar todos com o mesmo rigor. A curva ABC resolve isso: ordena os itens pelo valor anual consumido (consumo anual × custo unitário) e os separa em três classes.",
        "Regra da fábrica: ordene do maior para o menor valor e calcule o percentual acumulado. Item com acumulado até 80% do valor total é classe A; até 95%, classe B; o restante, classe C.",
      ],
      entregas: [
        "A curva ABC dos 30 itens, com a contagem e o valor de cada classe (etapa 2).",
        "Uma recomendação por escrito de como controlar cada classe (etapa 4).",
      ],
    }),
    planilha({
      id: "curva-abc",
      titulo: "Etapa 2 — Planilha: consumo anual dos 30 itens",
      cenario: "Cole a planilha no Excel. Crie a coluna Valor anual (=consumo × custo), ordene do maior para o menor, calcule % do total e % acumulado e classifique com SE.",
      colunas: ["Código", "Item", "Consumo anual (unidades)", "Custo unitário (R$)"],
      linhas: LINHAS,
      instrucao: "Classifique e responda:",
      tarefas: [
        { id: "total", rotulo: "Valor total anual consumido (R$)", valor: TOTAL, explicacao: "Soma de consumo × custo dos 30 itens." },
        { id: "maior", rotulo: "Valor anual do item de maior valor (R$)", valor: ORDENADO[0].valor, explicacao: "O primeiro item da lista ordenada." },
        { id: "qtd-a", rotulo: "Quantidade de itens da classe A", valor: classe("A").length, explicacao: "Itens cujo percentual acumulado vai até 80%.", tolerancia: 0 },
        { id: "valor-a", rotulo: "Valor anual da classe A (R$)", valor: somar(classe("A").map((b) => b.valor)), explicacao: "Soma dos valores dos itens da classe A." },
        { id: "pct-a", rotulo: "Participação da classe A no valor total (%)", valor: (somar(classe("A").map((b) => b.valor)) / TOTAL) * 100, explicacao: "Valor da classe A ÷ valor total × 100." },
        { id: "qtd-b", rotulo: "Quantidade de itens da classe B", valor: classe("B").length, explicacao: "Itens com acumulado acima de 80% até 95%.", tolerancia: 0 },
        { id: "qtd-c", rotulo: "Quantidade de itens da classe C", valor: classe("C").length, explicacao: "Itens com acumulado acima de 95%.", tolerancia: 0 },
        { id: "pct-c", rotulo: "Participação da classe C no valor total (%)", valor: (somar(classe("C").map((b) => b.valor)) / TOTAL) * 100, explicacao: "Valor da classe C ÷ valor total × 100." },
      ],
    }),
    associar({
      id: "controle-por-classe",
      titulo: "Etapa 3 — Que controle para cada classe",
      instrucao: "Associe cada prática à classe de materiais em que ela faz mais sentido.",
      opcoes: ["Classe A", "Classe B", "Classe C"],
      linhas: [
        { id: "inventario", rotulo: "Contagem frequente, previsão de demanda cuidadosa e negociação individual com fornecedores.", correta: 0 },
        { id: "intermediario", rotulo: "Controle moderado, revisão periódica do ponto de pedido.", correta: 1 },
        { id: "simples", rotulo: "Controle simples, compras em lotes maiores e estoques de segurança mais folgados.", correta: 2 },
      ],
      explicacao: "O esforço de controle deve seguir o valor: poucos itens de alto valor (A) exigem rigor; muitos itens de baixo valor (C) pedem processos simples.",
    }),
    dissertativa({
      id: "recomendacao-abc",
      titulo: "Etapa 4 — Recomendação para o diretor",
      instrucao: "Escreva a recomendação de gestão do estoque a partir da curva ABC.",
      deve: [
        "Resuma quantos itens e que percentual do valor há em cada classe, com os números da planilha.",
        "Proponha um controle diferente para cada classe (frequência de contagem, política de compra, nível de segurança).",
        "Explique uma limitação da curva ABC por valor: um item barato pode parar a fábrica (cite como a criticidade complementa a classificação).",
        "Diga com que frequência a curva deve ser refeita.",
      ],
      chave: /(classe a|classe b|classe c|valor|acumulado|controle|contagem|criticidade|fornecedor|curva)/i,
      minPalavras: 65,
    }),
  ],
};

export default atividade;
