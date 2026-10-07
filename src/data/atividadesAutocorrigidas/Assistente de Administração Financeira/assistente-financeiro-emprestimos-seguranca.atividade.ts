import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculos, associar, resposta, planilha, dissertativa } from "../ajudantes";

const PROPOSTAS = [
  ["Banco Aurora", 30000, 1.8, 12],
  ["Banco Brasil Sul", 30000, 1.5, 18],
  ["Cooperativa Vale", 30000, 1.65, 24],
];
const PARCELA = (l: (string | number)[]) => {
  const [, pv, i, n] = l as [string, number, number, number];
  const t = i / 100;
  return (pv * t) / (1 - (1 + t) ** -n);
};

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Administração Financeira — Empréstimos, Financiamentos e Segurança da Informação",
  introducao:
    "Entenda a diferença entre empréstimo e financiamento, calcule as primeiras parcelas de um financiamento pelo sistema SAC e veja os cuidados de segurança em operações financeiras. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    escolha({
      id: "emprestimo-financiamento",
      titulo: "Empréstimo ou financiamento",
      instrucao: "Qual alternativa distingue melhor os dois?",
      opcoes: [
        "Não há diferença: são o mesmo contrato.",
        "O empréstimo libera o dinheiro para uso livre; o financiamento é destinado à compra de um bem ou projeto específico, que muitas vezes serve de garantia.",
        "No financiamento não há juros.",
        "O empréstimo só existe para pessoas físicas.",
      ],
      correta: 1,
      explicacao: "No financiamento o dinheiro tem destino definido (veículo, máquina, imóvel); no empréstimo, o uso é livre.",
    }),
    calculos({
      id: "sac",
      titulo: "Financiamento pelo sistema SAC",
      cenario:
        "A empresa financia R$ 12.000,00 em 4 parcelas mensais, pelo SAC (amortização constante), com juros de 2% ao mês sobre o saldo devedor.",
      instrucao: "Calcule a amortização, a primeira parcela e a segunda parcela.",
      campos: [
        { id: "amortizacao", rotulo: "Amortização mensal (R$)", esperado: 3000, explicacao: "12.000 ÷ 4 = 3.000 em cada parcela." },
        { id: "parcela-1", rotulo: "1ª parcela (R$)", esperado: 3240, explicacao: "Juros de 2% sobre 12.000 = 240; 3.000 + 240 = 3.240." },
        { id: "parcela-2", rotulo: "2ª parcela (R$)", esperado: 3180, explicacao: "Saldo de 9.000; juros 2% = 180; 3.000 + 180 = 3.180. No SAC as parcelas diminuem." },
      ],
    }),
    associar({
      id: "seguranca",
      titulo: "Atitude segura ou arriscada",
      instrucao: "Classifique cada situação em operações financeiras.",
      opcoes: ["Atitude segura", "Atitude arriscada"],
      linhas: [
        { id: "boleto-alterado", rotulo: "Receber um e-mail com boleto novo do fornecedor e pagar sem confirmar", correta: 1 },
        { id: "confirmar", rotulo: "Confirmar por telefone oficial qualquer mudança de conta bancária de um fornecedor", correta: 0 },
        { id: "senha-compartilhada", rotulo: "Compartilhar a senha do internet banking da empresa com colegas", correta: 1 },
        { id: "dois-fatores", rotulo: "Ativar a autenticação em dois fatores no acesso ao banco", correta: 0 },
      ],
      explicacao: "Fraudes de boleto e de troca de conta são comuns: confirmar por outro canal e proteger o acesso reduz muito o risco.",
    }),
    resposta({
      id: "cuidados",
      titulo: "Cuidados no internet banking",
      instrucao: "Cite dois cuidados que o assistente financeiro deve ter ao operar o internet banking da empresa.",
      rotulo: "Cuidados",
      placeholder: "Ex.: Não acessar de computador público e ativar a autenticação em dois fatores...",
      chave: /(senha|token|dois fatores|autentic|link|phishing|golpe|computador|rede|confirm|e-?mail)/i,
    }),
    planilha({
      id: "propostas-credito",
      titulo: "Planilha: três propostas de financiamento",
      cenario: "A empresa recebeu três propostas para financiar R$ 30.000,00 pela tabela Price (parcelas iguais). Cole a planilha no Excel e use a função PGTO (=PGTO(taxa; meses; -valor)) para achar a parcela.",
      colunas: ["Instituição", "Valor (R$)", "Taxa ao mês (%)", "Parcelas"],
      linhas: PROPOSTAS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "parcela-aurora", rotulo: "Parcela do Banco Aurora (R$)", valor: PARCELA(PROPOSTAS[0]), explicacao: "PGTO com 1,8% ao mês, 12 parcelas e valor de 30.000.", tolerancia: 0.05 },
        { id: "parcela-vale", rotulo: "Parcela da Cooperativa Vale (R$)", valor: PARCELA(PROPOSTAS[2]), explicacao: "PGTO com 1,65% ao mês, 24 parcelas e valor de 30.000.", tolerancia: 0.05 },
        { id: "total-brasil-sul", rotulo: "Total pago ao Banco Brasil Sul (R$)", valor: PARCELA(PROPOSTAS[1]) * 18, explicacao: "Parcela × 18. O total mostra o custo real do crédito.", tolerancia: 0.05 },
        { id: "juros-vale", rotulo: "Juros pagos na Cooperativa Vale (R$)", valor: PARCELA(PROPOSTAS[2]) * 24 - 30000, explicacao: "Total pago menos o valor financiado.", tolerancia: 0.05 },
      ],
    }),
    dissertativa({
      id: "escolher-proposta",
      titulo: "Qual proposta escolher",
      instrucao: "Escreva o parecer que recomenda uma das três propostas.",
      deve: [
        "Compare parcela, prazo e total pago, e não só a taxa.",
        "Explique o que o fluxo de caixa mensal da empresa aguenta.",
        "Cite o CET e pelo menos um cuidado de segurança ao assinar e pagar (conferir o contrato e os dados da instituição).",
      ],
      chave: /(parcela|prazo|total|taxa|cet|caixa|contrato|seguran)/i,
    }),
  ],
};

export default atividade;
