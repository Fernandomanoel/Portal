import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculo, calculos, escolha } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Administração Financeira — Conciliação Bancária e Fatura de Cartão",
  introducao:
    "Conciliar é conferir se o controle interno da empresa bate com o extrato do banco e com a fatura do cartão. Monte a conciliação, classifique as diferenças e investigue o que não confere.",
  itens: [
    escolha({
      id: "conceito",
      titulo: "O que é conciliação bancária",
      instrucao: "Qual é o objetivo da conciliação bancária?",
      opcoes: [
        "Pedir um empréstimo ao banco.",
        "Comparar o extrato do banco com os lançamentos da empresa e explicar cada diferença.",
        "Contar o dinheiro físico do cofre.",
        "Mudar a empresa de banco.",
      ],
      correta: 1,
      explicacao: "A conciliação confirma que o saldo do controle interno e o do banco diferem só por itens conhecidos e explicados.",
    }),
    calculos({
      id: "conciliar",
      titulo: "Montando a conciliação",
      cenario:
        "O extrato bancário mostra saldo de R$ 12.400,00. A empresa emitiu um cheque de R$ 1.500,00 que ainda não foi compensado e fez um depósito de R$ 2.000,00 que ainda não apareceu no extrato. No controle interno, o saldo é R$ 12.980,00, mas falta lançar uma tarifa bancária de R$ 80,00.",
      instrucao: "Calcule o saldo ajustado pelos dois lados. Se a conciliação estiver certa, eles devem ser iguais.",
      campos: [
        { id: "saldo-banco", rotulo: "Saldo do extrato ajustado (R$)", esperado: 12900, explicacao: "12.400 − 1.500 (cheque em aberto) + 2.000 (depósito em trânsito) = 12.900." },
        { id: "saldo-interno", rotulo: "Saldo do controle interno ajustado (R$)", esperado: 12900, explicacao: "12.980 − 80 (tarifa ainda não lançada) = 12.900." },
      ],
    }),
    associar({
      id: "ajustes",
      titulo: "De que lado fica o ajuste",
      instrucao: "Informe qual saldo precisa ser ajustado para cada diferença encontrada.",
      opcoes: ["Ajusta o saldo do extrato do banco", "Ajusta o saldo do controle interno da empresa"],
      linhas: [
        { id: "cheque", rotulo: "Cheque emitido e ainda não compensado", correta: 0 },
        { id: "deposito", rotulo: "Depósito feito e ainda não creditado (em trânsito)", correta: 0 },
        { id: "tarifa", rotulo: "Tarifa cobrada pelo banco e não lançada pela empresa", correta: 1 },
        { id: "rendimento", rotulo: "Rendimento creditado pelo banco e não lançado pela empresa", correta: 1 },
      ],
      explicacao: "O que a empresa já fez e o banco ainda não processou ajusta o extrato; o que o banco fez e a empresa ainda não registrou ajusta o controle interno.",
    }),
    calculo({
      id: "fatura-cartao",
      titulo: "Conciliando a fatura do cartão corporativo",
      cenario: "A fatura do cartão veio com R$ 3.250,00. A soma das compras registradas no controle interno é R$ 3.050,00.",
      instrucao: "Qual é a diferença que precisa ser investigada?",
      rotulo: "Diferença (R$)",
      esperado: 200,
      explicacao: "3.250 − 3.050 = 200. Há compras na fatura sem registro interno, ou valores lançados errado.",
    }),
    escolha({
      id: "compra-desconhecida",
      titulo: "Compra que ninguém reconhece",
      instrucao: "Na fatura aparece uma compra de R$ 200,00 que ninguém da empresa reconhece. Qual é a atitude correta?",
      opcoes: [
        "Pagar a fatura e esquecer o assunto.",
        "Verificar com os portadores dos cartões e, se não for reconhecida, contestar com a administradora do cartão dentro do prazo.",
        "Lançar o valor como despesa diversa sem investigar.",
        "Cancelar todos os cartões imediatamente sem conferir nada.",
      ],
      correta: 1,
      explicacao: "Primeiro se confirma internamente; compra não reconhecida deve ser contestada com a administradora e pode indicar fraude.",
    }),
  ],
};

export default atividade;
