import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculo, calculos, associar, planilha, dissertativa, somar } from "../ajudantes";

const CONCILIACAO = [
  ["02/03", "Recebimento cliente Alfa", 4200, 4200],
  ["03/03", "Pagamento fornecedor Norte", -1850, -1850],
  ["05/03", "Cheque 1048 — Papelaria", "", -1500],
  ["07/03", "Depósito de caixa (em trânsito)", "", 2000],
  ["09/03", "Tarifa de manutenção da conta", -80, ""],
  ["12/03", "Rendimento da aplicação", 35, ""],
  ["15/03", "Pagamento salários", -6200, -6200],
];
const EXTRATO = somar(CONCILIACAO.map((l) => (l[2] as number) || 0));
const LIVRO = somar(CONCILIACAO.map((l) => (l[3] as number) || 0));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Administração Financeira — Conciliação Bancária e Fatura de Cartão",
  introducao:
    "Conciliar é conferir se o controle interno da empresa bate com o extrato do banco e com a fatura do cartão. Monte a conciliação, classifique as diferenças e investigue o que não confere. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
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
    planilha({
      id: "extrato-x-livro",
      titulo: "Planilha: extrato bancário x controle da empresa",
      cenario: "Compare o que o banco registrou (extrato) com o que a empresa lançou (livro). Células vazias significam que o lançamento não aparece naquele lado. Cole a planilha no Excel para somar as colunas.",
      colunas: ["Data", "Descrição", "Extrato (R$)", "Livro (R$)"],
      linhas: CONCILIACAO,
      instrucao: "Calcule:",
      tarefas: [
        { id: "total-extrato", rotulo: "Movimento líquido no extrato (R$)", valor: EXTRATO, explicacao: "Soma da coluna Extrato." },
        { id: "total-livro", rotulo: "Movimento líquido no livro (R$)", valor: LIVRO, explicacao: "Soma da coluna Livro." },
        { id: "diferenca", rotulo: "Diferença entre os dois lados (R$, extrato menos livro)", valor: EXTRATO - LIVRO, explicacao: "É o valor que a conciliação precisa explicar linha a linha." },
      ],
    }),
    dissertativa({
      id: "explicar-diferencas",
      titulo: "Explicando cada diferença",
      instrucao: "Escreva a nota de conciliação que explica cada lançamento que não bate entre extrato e livro.",
      deve: [
        "Explique o cheque 1048 e o depósito em trânsito: de que lado aparecem e quando serão compensados.",
        "Explique a tarifa e o rendimento: quem precisa lançar e em qual conta.",
        "Diga como ficam os saldos depois dos ajustes e como comprovar que fecham.",
      ],
      chave: /(cheque|dep[oó]sito|tarifa|rendimento|lan[cç]ar|ajust|saldo|compens)/i,
    }),
    dissertativa({
      id: "investigar-fatura",
      titulo: "Fatura do cartão corporativo",
      instrucao: "A fatura veio R$ 200,00 maior que o controle interno. Descreva como você investigaria e resolveria a diferença.",
      deve: [
        "Diga como compararia a fatura com os comprovantes e as notas de despesa.",
        "Explique o que faria com uma compra não reconhecida (contestação, prazo, comunicação).",
        "Cite a ação para evitar que a diferença se repita no próximo mês.",
      ],
      chave: /(compar|comprovante|contest|administradora|fraude|portador|lan[cç]amento|prazo)/i,
    }),
  ],
};

export default atividade;
