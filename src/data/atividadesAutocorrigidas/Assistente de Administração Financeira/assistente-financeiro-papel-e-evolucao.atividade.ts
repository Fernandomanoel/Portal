import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, associar, resposta, planilha, dissertativa, somar } from "../ajudantes";

const ROTINA = [
  ["NF 4821 — Papelaria Central", "Pagar", 1850],
  ["Boleto de energia", "Pagar", 2340.5],
  ["Fatura do cliente Alfa", "Receber", 5200],
  ["Salário da estagiária", "Pagar", 1450],
  ["Fatura do cliente Beta", "Receber", 3180.75],
  ["Contrato de internet", "Pagar", 690],
  ["Fatura do cliente Gama", "Receber", 2100],
  ["Imposto municipal (ISS)", "Pagar", 975.25],
];
const A_PAGAR = somar(ROTINA.filter((l) => l[1] === "Pagar").map((l) => l[2] as number));
const A_RECEBER = somar(ROTINA.filter((l) => l[1] === "Receber").map((l) => l[2] as number));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Administração Financeira — História e o Papel do Assistente Financeiro",
  introducao:
    "Como a administração financeira nasceu e mudou, o que ela faz dentro de uma empresa e onde o assistente financeiro se encaixa. Responda e use \"Corrigir atividade\" para conferir. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    escolha({
      id: "o-que-e",
      titulo: "O que é administração financeira",
      instrucao: "Qual alternativa descreve melhor a administração financeira de uma empresa?",
      opcoes: [
        "Registrar as vendas no caixa ao fim do dia.",
        "Planejar, obter, aplicar e controlar os recursos financeiros para a empresa alcançar seus objetivos.",
        "Cuidar apenas do pagamento dos funcionários.",
        "Decidir o preço dos produtos sem olhar para custos.",
      ],
      correta: 1,
      explicacao: "A função financeira cuida do ciclo completo do dinheiro: de onde ele vem, onde é aplicado e como é controlado.",
    }),
    associar({
      id: "quem-faz",
      titulo: "Rotina do assistente x decisão do gestor",
      instrucao: "Marque quem normalmente executa cada tarefa em uma empresa de médio porte.",
      opcoes: ["Assistente financeiro (rotina operacional)", "Gestor ou diretor financeiro (decisão estratégica)"],
      linhas: [
        { id: "lancar-nf", rotulo: "Conferir a nota fiscal e lançar a conta a pagar", correta: 0 },
        { id: "politica", rotulo: "Definir a política de investimento do caixa excedente", correta: 1 },
        { id: "baixa", rotulo: "Emitir boletos e dar baixa nos recebimentos", correta: 0 },
        { id: "financiamento", rotulo: "Decidir contratar um financiamento de longo prazo", correta: 1 },
      ],
      explicacao: "O assistente executa e controla a rotina com precisão; o gestor usa esses dados para decidir os rumos do caixa.",
    }),
    resposta({
      id: "habilidades",
      titulo: "Habilidades do assistente financeiro",
      instrucao: "Cite duas habilidades importantes para o assistente financeiro e explique por que cada uma importa na rotina.",
      rotulo: "Habilidades e por quê",
      placeholder: "Ex.: Atenção a detalhes, porque um zero a mais em um pagamento gera prejuízo...",
    }),
    planilha({
      id: "rotina-do-dia",
      titulo: "Planilha: a rotina financeira de um dia",
      cenario: "Esta é a lista de documentos que chegou ao financeiro de uma pequena empresa na segunda-feira. Cole a planilha no Excel ou nos Planilhas Google para resolver.",
      colunas: ["Documento", "Tipo", "Valor (R$)"],
      linhas: ROTINA,
      instrucao: "Use SOMASE (ou filtre a coluna Tipo) e responda:",
      tarefas: [
        { id: "pagar", rotulo: "Total a pagar (R$)", valor: A_PAGAR, explicacao: "Soma dos documentos do tipo Pagar." },
        { id: "receber", rotulo: "Total a receber (R$)", valor: A_RECEBER, explicacao: "Soma dos documentos do tipo Receber." },
        { id: "saldo", rotulo: "Saldo previsto do dia (R$)", valor: A_RECEBER - A_PAGAR, explicacao: "Total a receber menos total a pagar." },
      ],
    }),
    dissertativa({
      id: "parecer-do-dia",
      titulo: "Parecer ao gestor",
      cenario: "Você é o assistente financeiro e o gestor pediu um resumo curto do dia, com base na planilha acima.",
      instrucao: "Escreva o parecer que você enviaria.",
      deve: [
        "Cite o total a pagar, o total a receber e o saldo previsto.",
        "Diga qual documento você conferiria primeiro e por quê.",
        "Aponte um risco para o caixa se os recebimentos atrasarem.",
      ],
      chave: /(saldo|pagar|receber|caixa|risco|confer)/i,
    }),
    dissertativa({
      id: "evolucao-da-funcao",
      titulo: "Do registro à decisão",
      instrucao: "Explique como o papel da área financeira mudou ao longo do tempo e dê um exemplo de decisão da empresa que hoje depende dos números do financeiro.",
      deve: [
        "Diga o que o financeiro fazia antes (registro, captação) e o que faz hoje (apoio à decisão).",
        "Dê um exemplo concreto de decisão apoiada em números.",
        "Explique onde o assistente financeiro entra nesse processo.",
      ],
      chave: /(decis|registr|apoio|planej|estrat|controle|an[aá]lise|assistente)/i,
    }),
  ],
};

export default atividade;
