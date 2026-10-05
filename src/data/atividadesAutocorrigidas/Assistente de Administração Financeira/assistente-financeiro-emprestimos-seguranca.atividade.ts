import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculos, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Administração Financeira — Empréstimos, Financiamentos e Segurança da Informação",
  introducao:
    "Entenda a diferença entre empréstimo e financiamento, calcule as primeiras parcelas de um financiamento pelo sistema SAC e veja os cuidados de segurança em operações financeiras.",
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
    escolha({
      id: "comparar-custo",
      titulo: "Olhar o custo total",
      instrucao: "Ao comparar propostas de crédito, qual indicador mostra o custo real, com juros, tarifas e seguros?",
      opcoes: ["Só a taxa de juros mensal.", "O valor da primeira parcela.", "O Custo Efetivo Total (CET).", "O nome do banco."],
      correta: 2,
      explicacao: "O CET reúne juros, tarifas, tributos e seguros: é a forma justa de comparar propostas.",
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
  ],
};

export default atividade;
