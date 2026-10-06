import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, briefing, calculos, dissertativa, planilha, somar } from "../ajudantes";
import { inteiro, sorteio } from "../dadosFicticios";

const r = sorteio(3808);
const PEDIDOS = Array.from({ length: 24 }, (_, i) => {
  const linhas = inteiro(r, 3, 28);
  const minutos = Math.round(linhas * (1.2 + r() * 1.6));
  return [`PV-${4100 + i}`, linhas, minutos, r() < 0.88 ? "Sim" : "Não", r() < 0.9 ? "Sim" : "Não", r() < 0.12 ? "Sim" : "Não"];
});
const LINHAS = somar(PEDIDOS.map((l) => l[1] as number));
const MINUTOS = somar(PEDIDOS.map((l) => l[2] as number));
const otif = PEDIDOS.filter((l) => l[3] === "Sim" && l[4] === "Sim").length;
const erros = PEDIDOS.filter((l) => l[5] === "Sim").length;

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Compras e Estoque — Separação de Materiais, Informática no Estoque e Introdução à Gestão da Qualidade",
  introducao:
    "Um dia de trabalho de expedição: medir a produtividade da separação de 24 pedidos, calcular o indicador OTIF e a taxa de erro e propor melhorias com apoio do sistema de gestão de estoque. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "A semana difícil da expedição",
      remetente: "Cíntia Vasconcelos, gerente de logística do Centro de Distribuição Rota Sul",
      assunto: "Indicadores da separação — preciso de um diagnóstico",
      paragrafos: [
        "A separação (picking) é a etapa em que o operador retira do estoque os itens de cada pedido de venda. Três indicadores medem a qualidade do processo: produtividade (linhas separadas por hora), OTIF (pedidos entregues no prazo e completos, do inglês On Time In Full) e a taxa de erro de separação.",
        "Os clientes reclamaram. Estão aqui os 24 pedidos da semana, com o número de linhas do pedido, o tempo gasto na separação, se foi entregue no prazo, se foi entregue completo e se houve erro de separação. Quero um diagnóstico com números e um plano de melhoria que use melhor o sistema de gestão do armazém.",
      ],
      entregas: [
        "Produtividade, tempo médio, OTIF e taxa de erro (etapa 2).",
        "A meta de OTIF e o quanto falta para atingi-la (etapa 3).",
        "Um plano de melhoria por escrito com apoio da informática no estoque e conceitos de qualidade (etapa 4).",
      ],
    }),
    planilha({
      id: "pedidos-da-semana",
      titulo: "Etapa 2 — Planilha: os 24 pedidos separados na semana",
      cenario: "Cole a planilha no Excel. Produtividade = linhas ÷ horas (minutos ÷ 60). OTIF = pedidos com «Sim» em prazo E completo ÷ total. Use CONT.SES.",
      colunas: ["Pedido", "Linhas do pedido", "Tempo de separação (min)", "Entregue no prazo", "Entregue completo", "Erro de separação"],
      linhas: PEDIDOS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "linhas", rotulo: "Total de linhas separadas na semana", valor: LINHAS, explicacao: "Soma da coluna Linhas do pedido.", tolerancia: 0 },
        { id: "horas", rotulo: "Tempo total de separação (horas)", valor: MINUTOS / 60, explicacao: "Soma dos minutos ÷ 60." },
        { id: "produtividade", rotulo: "Produtividade (linhas por hora)", valor: LINHAS / (MINUTOS / 60), explicacao: "Total de linhas ÷ total de horas." },
        { id: "tempo-medio", rotulo: "Tempo médio de separação por pedido (min)", valor: MINUTOS / PEDIDOS.length, explicacao: "Soma dos minutos ÷ 24 pedidos." },
        { id: "otif", rotulo: "OTIF da semana (%)", valor: (otif / PEDIDOS.length) * 100, explicacao: "Pedidos no prazo e completos ÷ 24 × 100." },
        { id: "erro", rotulo: "Taxa de erro de separação (%)", valor: (erros / PEDIDOS.length) * 100, explicacao: "Pedidos com erro ÷ 24 × 100." },
        { id: "pedidos-erro", rotulo: "Quantidade de pedidos com erro de separação", valor: erros, explicacao: "Conte as linhas com Erro de separação = Sim.", tolerancia: 0 },
      ],
    }),
    calculos({
      id: "meta-otif",
      titulo: "Etapa 3 — A meta de OTIF",
      cenario: "A meta do centro de distribuição é 95% de OTIF. Em 24 pedidos, isso significa no máximo 1 pedido fora do padrão (95% de 24 = 22,8, arredondando para cima, 23 pedidos).",
      instrucao: "Calcule:",
      campos: [
        { id: "minimo", rotulo: "Mínimo de pedidos que precisam estar no prazo e completos para atingir a meta", esperado: 23, tolerancia: 0, explicacao: "95% de 24 = 22,8 → 23 pedidos." },
        { id: "falta", rotulo: "Quantos pedidos a mais precisavam estar OK nesta semana para atingir a meta (0 se já atingiu)", esperado: Math.max(0, 23 - otif), tolerancia: 0, explicacao: "23 menos os pedidos OTIF da semana." },
      ],
    }),
    associar({
      id: "qualidade",
      titulo: "Informática no estoque e qualidade",
      instrucao: "Associe cada recurso ou conceito ao que ele resolve no armazém.",
      opcoes: ["Código de barras / leitor de coletor", "WMS (sistema de gestão de armazém)", "Ciclo PDCA", "Ação corretiva"],
      linhas: [
        { id: "conferir", rotulo: "Confirmar na hora que o item separado é o do pedido, reduzindo erro de picking.", correta: 0 },
        { id: "enderecar", rotulo: "Indicar o endereço de cada item, sugerir a rota de separação e controlar saldo em tempo real.", correta: 1 },
        { id: "melhoria", rotulo: "Método de melhoria contínua: planejar, executar, verificar e agir.", correta: 2 },
        { id: "erro", rotulo: "Medida para eliminar a causa de um erro que já aconteceu e evitar que se repita.", correta: 3 },
      ],
      explicacao: "Tecnologia reduz erro e retrabalho; método de qualidade garante que os problemas sejam analisados e corrigidos na causa.",
    }),
    dissertativa({
      id: "plano-de-melhoria",
      titulo: "Etapa 4 — Plano de melhoria da separação",
      instrucao: "Escreva o plano de melhoria que a gerente apresentaria à diretoria.",
      deve: [
        "Resuma o diagnóstico com os números da planilha (produtividade, OTIF, erro).",
        "Proponha ao menos três ações, ligando cada uma a um recurso (coletor com leitura de código de barras, endereçamento no WMS, rota de picking, conferência de saída).",
        "Organize o plano no ciclo PDCA, dizendo o que seria planejado, executado, verificado e padronizado.",
        "Defina duas metas com prazo e como seriam acompanhadas semanalmente.",
      ],
      chave: /(pdca|otif|erro|produtividade|wms|c[oó]digo de barras|coletor|picking|meta|prazo|corretiva)/i,
      minPalavras: 75,
    }),
  ],
};

export default atividade;
