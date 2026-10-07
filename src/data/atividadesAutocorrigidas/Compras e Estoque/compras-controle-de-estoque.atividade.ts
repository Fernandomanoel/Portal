import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, calculos, dissertativa, planilha, somar } from "../ajudantes";
import { decimal, inteiro, sorteio } from "../dadosFicticios";

const NOMES = ["Arroz 5 kg", "Feijão 1 kg", "Óleo de soja 900 ml", "Açúcar 1 kg", "Café 500 g", "Macarrão 500 g", "Molho de tomate", "Sal 1 kg", "Farinha de trigo 1 kg", "Leite longa vida", "Biscoito", "Sabão em pó", "Detergente", "Papel higiênico (pct)", "Água sanitária", "Sabonete", "Shampoo", "Creme dental", "Desodorante", "Refrigerante 2 L", "Suco em caixa", "Atum em lata", "Sardinha em lata", "Milho em lata", "Maionese", "Ketchup", "Vinagre", "Margarina"];
const r = sorteio(3505);
const INVENTARIO = NOMES.map((nome, i) => {
  const sistema = inteiro(r, 20, 260);
  const desvio = r() < 0.4 ? inteiro(r, -9, 7) : 0;
  return [`MER-${300 + i}`, nome, sistema, Math.max(0, sistema + desvio), decimal(r, 2.5, 38)];
});
const dif = (l: (string | number)[]) => (l[3] as number) - (l[2] as number);
const valor = (l: (string | number)[]) => dif(l) * (l[4] as number);
const DIVERGENTES = INVENTARIO.filter((l) => dif(l) !== 0);
const SOBRAS = somar(INVENTARIO.filter((l) => dif(l) > 0).map(valor));
const FALTAS = somar(INVENTARIO.filter((l) => dif(l) < 0).map(valor));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Compras e Estoque — Controle de Estoque",
  introducao:
    "Um dia de trabalho de inventário: comparar o saldo do sistema com a contagem física de 28 itens, medir a acuracidade e valorizar as sobras e faltas. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "O inventário rotativo da semana",
      remetente: "Marcos Vinícius, gerente de operações do Supermercado Bom Preço",
      assunto: "Resultado da contagem física do corredor 3",
      paragrafos: [
        "A equipe contou fisicamente 28 itens do corredor 3 e anotou o resultado ao lado do saldo que o sistema mostra. Quando os dois números não batem, existe uma divergência: pode ser erro de recebimento, de baixa de venda, de reposição, furto ou perda por vencimento.",
        "Preciso de três coisas: a acuracidade do inventário, o valor das sobras e das faltas (quanto o supermercado ganhou e perdeu em mercadoria) e um relatório com o que investigar primeiro.",
      ],
      entregas: [
        "A acuracidade e as divergências (etapa 2).",
        "O valor das sobras, das faltas e o saldo líquido (etapa 2).",
        "Um relatório por escrito com causas prováveis e plano de ação (etapa 4).",
      ],
    }),
    planilha({
      id: "contagem-fisica",
      titulo: "Etapa 2 — Planilha: sistema x contagem física",
      cenario: "Cole a planilha no Excel e crie as colunas Divergência (=físico − sistema) e Valor da divergência (=divergência × custo).",
      colunas: ["Código", "Item", "Saldo no sistema", "Contagem física", "Custo unitário (R$)"],
      linhas: INVENTARIO,
      instrucao: "Calcule:",
      tarefas: [
        { id: "divergentes", rotulo: "Quantidade de itens com divergência", valor: DIVERGENTES.length, explicacao: "Itens em que a contagem física difere do sistema.", tolerancia: 0 },
        { id: "acuracidade", rotulo: "Acuracidade do inventário (% de itens sem divergência)", valor: ((INVENTARIO.length - DIVERGENTES.length) / INVENTARIO.length) * 100, explicacao: "Itens corretos ÷ total de itens × 100." },
        { id: "sobras", rotulo: "Valor das sobras (físico maior que o sistema) (R$)", valor: SOBRAS, explicacao: "Soma do valor das divergências positivas." },
        { id: "faltas", rotulo: "Valor das faltas (físico menor que o sistema), como número positivo (R$)", valor: -FALTAS, explicacao: "Soma, em módulo, do valor das divergências negativas." },
        { id: "liquido", rotulo: "Saldo líquido de divergências (sobras menos faltas) (R$)", valor: SOBRAS + FALTAS, explicacao: "Sobras menos faltas; negativo indica perda líquida." },
        { id: "bruto", rotulo: "Divergência absoluta total (sobras + faltas em módulo) (R$)", valor: SOBRAS - FALTAS, explicacao: "O valor de itens errados, sem compensar sobras com faltas." },
      ],
    }),
    calculos({
      id: "meta",
      titulo: "Etapa 3 — Meta de acuracidade",
      cenario: "A meta do supermercado é 98% de acuracidade no inventário rotativo. O corredor 3 tem 28 itens contados.",
      instrucao: "Calcule:",
      campos: [
        { id: "maximo", rotulo: "Quantos itens com divergência, no máximo, a meta permitiria em 28 itens (arredondando para baixo)?", esperado: 0, tolerancia: 0, explicacao: "2% de 28 é 0,56: arredondando para baixo, a meta não permite nenhuma divergência." },
        { id: "gap", rotulo: "Quantos pontos percentuais a acuracidade medida ficou abaixo da meta de 98%", esperado: 98 - ((INVENTARIO.length - DIVERGENTES.length) / INVENTARIO.length) * 100, explicacao: "98 menos a acuracidade medida." },
      ],
    }),
    dissertativa({
      id: "plano-de-acao",
      titulo: "Etapa 4 — Causas e plano de ação",
      instrucao: "Escreva o relatório para o gerente de operações.",
      deve: [
        "Resuma a acuracidade, o valor das sobras e das faltas e o saldo líquido, com os números da planilha.",
        "Levante ao menos quatro causas possíveis de divergência e como investigaria cada uma (conferir recebimentos, baixas, devoluções, validade, furto).",
        "Explique por que sobra também é um problema, não só falta.",
        "Proponha um plano de ação com responsável e prazo, incluindo a frequência das próximas contagens.",
      ],
      chave: /(diverg[eê]ncia|acuracidade|sobra|falta|causa|recebimento|baixa|contagem|plano|prazo|respons[aá]vel)/i,
      minPalavras: 70,
    }),
    dissertativa({
      id: "ajuste-de-estoque",
      titulo: "Etapa 5 — Como ajustar o sistema com segurança",
      instrucao: "Explique como o ajuste do saldo no sistema deve ser feito depois do inventário.",
      deve: [
        "Diga por que não se deve ajustar o saldo apenas pela contagem, sem recontar e investigar as maiores divergências.",
        "Cite quem deve aprovar o ajuste e o que deve ficar registrado.",
        "Explique o efeito contábil do ajuste de uma perda de estoque.",
      ],
      chave: /(recontar|aprova|registro|justificativa|ajuste|perda|cont[aá]bil|auditoria)/i,
    }),
  ],
};

export default atividade;
