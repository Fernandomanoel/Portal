import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Administração Financeira — História e o Papel do Assistente Financeiro",
  introducao:
    "Como a administração financeira nasceu e mudou, o que ela faz dentro de uma empresa e onde o assistente financeiro se encaixa. Responda e use \"Corrigir atividade\" para conferir.",
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
    escolha({
      id: "evolucao",
      titulo: "Da contabilidade ao apoio à decisão",
      cenario:
        "No início do século XX, a área financeira cuidava sobretudo de captar recursos e registrar operações. Ao longo das décadas, passou a analisar risco, custo de capital e retorno dos investimentos.",
      instrucao: "O que mudou na função financeira ao longo do tempo?",
      opcoes: [
        "Deixou de existir, porque os bancos passaram a cuidar de tudo.",
        "Passou de um papel só de registro para um papel de apoio às decisões da empresa.",
        "Passou a cuidar apenas de impostos.",
        "Ficou restrita às grandes indústrias.",
      ],
      correta: 1,
      explicacao: "Hoje o financeiro não só registra: ele mostra números que orientam investimentos, preços, crédito e cortes de custo.",
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
    escolha({
      id: "perfil",
      titulo: "Postura profissional",
      instrucao: "Qual característica é indispensável para quem lida com dados financeiros da empresa?",
      opcoes: [
        "Comentar saldos e salários com os colegas para ser simpático.",
        "Sigilo, atenção a detalhes e ética no uso das informações.",
        "Pagar sempre as contas mais rápido, mesmo sem conferir.",
        "Evitar registrar tudo por escrito.",
      ],
      correta: 1,
      explicacao: "Quem lida com dinheiro e dados sensíveis precisa de sigilo, atenção e ética: um erro ou vazamento custa caro.",
    }),
    resposta({
      id: "habilidades",
      titulo: "Habilidades do assistente financeiro",
      instrucao: "Cite duas habilidades importantes para o assistente financeiro e explique por que cada uma importa na rotina.",
      rotulo: "Habilidades e por quê",
      placeholder: "Ex.: Atenção a detalhes, porque um zero a mais em um pagamento gera prejuízo...",
    }),
  ],
};

export default atividade;
