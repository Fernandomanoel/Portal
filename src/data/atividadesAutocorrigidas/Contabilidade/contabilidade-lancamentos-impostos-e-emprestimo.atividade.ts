import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { reais } from "../ajudantes";
import { AULA_14, AULA_15, fechamento, saldos } from "../dadosContabilidade";
import { escolher, numero, planilhaDe, print } from "../contabilidadeComum";

const depois = (k: number) => saldos([...AULA_14, ...AULA_15.slice(0, k)]);
const antes = fechamento(AULA_14);
const fim = fechamento([...AULA_14, ...AULA_15]);
const f = depois(AULA_15.length);

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Contabilidade — Lançamentos na Planilha: Imposto, Fornecedor e Cheque Especial",
  introducao:
    "A história da Walking Pet continua. Hoje a loja paga o fornecedor, descobre que a conta do banco ficou negativa, usa o cheque especial, faz uma grande venda de 80 kits e paga o ICMS. São nove lançamentos novos, feitos na mesma planilha da Aula 14, que já traz os sete fatos anteriores em cinza.",
  itens: [
    {
      id: "como-fica",
      titulo: "Antes de começar — três ideias novas",
      cenario: "Esta aula usa três situações que aparecem em toda empresa de verdade. Leia as três antes de lançar.",
      blocos: [
        { tipo: "subtitulo", texto: "1. ICMS: imposto que vem junto com a venda" },
        { tipo: "texto", texto: "O ICMS é um imposto estadual que já está dentro do preço de venda. A loja o cobra do cliente, mas precisa repassá-lo ao governo. Enquanto não paga, é uma dívida: ICMS a pagar, Passivo. E, como o imposto não é do vendedor, ele reduz a receita: entra na conta de dedução da receita, 3.1.1.03." },
        { tipo: "subtitulo", texto: "2. Conta bancária negativa" },
        { tipo: "texto", texto: "Quando a empresa gasta mais do que tem no banco, o banco empresta a diferença (o cheque especial). Na contabilidade, saldo negativo na conta de Ativo não pode ficar assim: o valor negativo é, na verdade, uma dívida com o banco, que se registra no Passivo (Empréstimos)." },
        { tipo: "subtitulo", texto: "3. Despesa de juros" },
        { tipo: "texto", texto: "Quem usa o cheque especial paga juros. Eles são despesa financeira, que aumenta a débito." },
        { tipo: "nota", variante: "dica", rotulo: "Como você vai trabalhar", texto: "Para cada fato: (1) calcule o valor; (2) descubra a conta que AUMENTA ou RECEBE (débito) e a que DÁ ou PASSA A DEVER (crédito); (3) digite e confira os OK." },
      ],
      campos: [escolher("icms-passivo", "Enquanto a loja não repassa o ICMS ao governo, em que grupo do plano ele fica registrado?", ["Ativo", "Passivo", "Receita"], 1, "Ele é uma dívida com o governo: Passivo (conta 2.1.3.02 — ICMS).")],
    },
    {
      id: "baixar",
      titulo: "Etapa 1 — Baixar a planilha e ler o histórico",
      download: planilhaDe("walking-pet-aula-15-para-lancar.xlsx", "Abas Leia-me e Aula 15: o plano de contas com saldos automáticos e 16 linhas de lançamentos: 7 já feitos (cinza, da Aula 14) e 9 para você lançar."),
      imagem: print("a15-1-historico", "Área de lançamentos com as sete primeiras linhas em cinza, contornadas em laranja: são os fatos da Aula 14, já lançados, com OK em cada coluna. Abaixo delas, as linhas coloridas para os fatos novos.", "As linhas em cinza são o que você fez na Aula 14. Os saldos já levam isso em conta."),
      passos: [
        "Clique em «Baixar planilha», abra no Excel, habilite a edição e salve uma cópia com o seu nome.",
        "Abra a aba «Aula 15». As sete primeiras linhas, em cinza, são os fatos da Aula 14, já lançados e conferidos. Não mexa nelas.",
        "As linhas coloridas (roxo, vermelho e verde), logo abaixo, são os nove fatos desta aula. É nelas que você digita.",
        "Olhe o saldo do ATIVO (célula F3): ele já parte de R$ 3.039,50, o resultado da Aula 14.",
      ],
      campos: [numero("ativo-inicial", "Antes de qualquer lançamento novo, qual é o saldo do ATIVO (F3), em R$?", antes.ativo, "É o fim da Aula 14: banco R$ 99,50 + estoque R$ 2.940,00.")],
      objetivo: "Abrir a planilha e ver que os saldos já trazem a Aula 14.",
    },
    {
      id: "icms",
      titulo: "Etapa 2 — ICMS a pagar sobre as duas primeiras vendas",
      cenario: `Fato 1: «${AULA_15[0].texto}».`,
      imagem: print("a15-1b-icms", "Última linha cinza e primeira linha nova preenchida e contornada em laranja: valor 18,00, débito 3.1.1.03 e crédito 2.1.3.02, com OK verde nas três colunas.", "Primeiro fato novo: o ICMS das duas vendas de R$ 50,00."),
      passos: [
        "Calcule o imposto: 18% de R$ 100,00 (as duas vendas) = R$ 18,00. Digite 18 no Valor.",
        "O imposto reduz a receita. Debite 3.1.1.03 — (–) Deduções de tributos, descontos e devoluções.",
        "A loja passou a dever o imposto ao governo. Credite 2.1.3.02 — ICMS.",
        "Confira os OK. Em seguida, olhe o PASSIVO (conta 2): subiu R$ 18,00.",
      ],
      blocos: [
        {
          tipo: "tabela",
          colunas: ["Conta", "Tipo", "O que aconteceu", "Lado"],
          linhas: [
            ["3.1.1.03 Deduções de tributos", "Receita (redutora)", "A receita diminuiu: o imposto não é da loja", "Débito"],
            ["2.1.3.02 ICMS", "Passivo", "Surgiu a dívida com o governo", "Crédito"],
          ],
        },
      ],
      campos: [numero("icms-18", "Qual é o valor do ICMS de 18% sobre as duas vendas de R$ 50,00, em R$?", AULA_15[0].valor, "18% × R$ 100,00 = R$ 18,00.")],
      objetivo: "Registrar um imposto sobre a venda: dedução da receita e dívida com o governo.",
    },
    {
      id: "fornecedor",
      titulo: "Etapa 3 — Pagar o fornecedor e ver o banco ficar negativo",
      cenario: `Fato 2: «${AULA_15[1].texto}».`,
      imagem: print("a15-3-banco-negativo", "Coluna de saldos com cinco linhas visíveis: ATIVO 39,50, Caixa, bancos e equivalentes -2.900,50, Contas bancárias -2.900,50 (contornada em laranja), PASSIVO E PL 18,00 e Fornecedores nacionais zerado.", "Depois de pagar o fornecedor, a conta bancária fica negativa."),
      passos: [
        "O valor é a dívida inteira: R$ 3.000,00.",
        "A dívida acabou: o Passivo diminui a débito. Debite 2.1.1.01 — Fornecedores nacionais.",
        "O dinheiro saiu do banco: Ativo diminui a crédito. Credite 1.1.1.02 — Contas bancárias.",
        "Aperte Enter e olhe o saldo de Contas bancárias (1.1.1.02): ele ficou NEGATIVO. A loja tinha só R$ 99,50 e pagou R$ 3.000,00.",
      ],
      aviso: "Saldo negativo em conta de Ativo é o sinal de que algo precisa ser registrado: no banco real, o que sobrou foi emprestado pelo cheque especial.",
      campos: [numero("banco-negativo", "Qual ficou o saldo de Contas bancárias (1.1.1.02) depois de pagar o fornecedor, em R$? (use o sinal de menos)", depois(2)["1.1.1.02"], "R$ 99,50 − R$ 3.000,00 = −R$ 2.900,50. Foi esse valor que o banco cobriu.")],
      objetivo: "Pagar uma dívida e ver o efeito no saldo bancário.",
    },
    {
      id: "cheque",
      titulo: "Etapa 4 — Registrar o cheque especial",
      cenario: `Fato 3: «${AULA_15[2].texto}».`,
      imagem: print("a15-2-cheque", "Três fatos novos preenchidos; o terceiro, contornado em laranja, tem valor 2.900,50, débito 1.1.1.02 e crédito 2.1.2.02 com OK em verde.", "O empréstimo do cheque especial cobre exatamente o buraco da conta bancária."),
      passos: [
        "O valor do empréstimo é o tanto que faltava na conta: R$ 2.900,50. Digite 2900,5.",
        "O banco emprestou dinheiro, e o saldo da conta bancária volta a zero. Contas bancárias é Ativo e aumenta a débito: debite 1.1.1.02.",
        "A loja ficou devendo ao banco: Passivo, a crédito. Credite 2.1.2.02 — Empréstimos.",
        "Confira: o saldo de Contas bancárias volta para R$ 0,00 e o de Empréstimos mostra R$ 2.900,50.",
      ],
      campos: [numero("emprestimo", "Qual é o saldo de Empréstimos (2.1.2.02) depois do fato 3, em R$?", depois(3)["2.1.2.02"], "A dívida com o banco é de R$ 2.900,50.")],
      objetivo: "Transformar um saldo bancário negativo em dívida no Passivo.",
    },
    {
      id: "zerado",
      titulo: "Etapa 5 — Conferir que o banco zerou",
      imagem: print("a15-4-banco-zerado", "Saldos com Ativo 2.940,00, Contas bancárias zerada (contornada), Passivo e PL 2.918,50 e Empréstimos 2.900,50 (contornada).", "Banco em zero, dívida com o banco no Passivo."),
      passos: [
        "Olhe a conta 1.1.1.02 — Contas bancárias: precisa mostrar R$ 0,00 (ou um traço).",
        "Olhe a conta 2.1.2.02 — Empréstimos: R$ 2.900,50.",
        "O ATIVO (conta 1) mostra agora só o estoque: R$ 2.940,00. O dinheiro dos kits foi todo para pagar o fornecedor.",
      ],
      campos: [numero("ativo-3", "Depois do fato 3, qual é o saldo do ATIVO (conta 1), em R$?", fechamento([...AULA_14, ...AULA_15.slice(0, 3)]).ativo, "Só os 98 kits que sobraram: R$ 2.940,00.")],
      objetivo: "Confirmar o efeito do cheque especial nos saldos.",
    },
    {
      id: "venda-grande",
      titulo: "Etapa 6 — A venda de 80 kits",
      cenario: `Fato 4: «${AULA_15[3].texto}». Fato 5: «${AULA_15[4].texto}». Fato 6: «${AULA_15[5].texto}».`,
      imagem: print("a15-5-venda-grande", "Os fatos 4, 5 e 6 contornados em laranja: venda de 3.600,00, baixa de estoque de 2.400,00 e ICMS de 252,00.", "Uma venda grande rende três lançamentos: a venda, a baixa do estoque e o imposto."),
      passos: [
        "Fato 4 (a venda): 80 kits × R$ 45,00 = R$ 3.600,00. Entrou no banco: débito 1.1.1.02. É receita: crédito 3.1.1.01 — Venda de mercadorias.",
        "Fato 5 (a baixa): 80 kits × R$ 30,00 (o custo de cada um, da Aula 14) = R$ 2.400,00. Custo é despesa, a débito: 3.2.1.01. O estoque diminui, a crédito: 1.1.3.02.",
        "Fato 6 (o ICMS): 7% de R$ 3.600,00 = R$ 252,00. Débito 3.1.1.03 — Deduções; crédito 2.1.3.02 — ICMS.",
        "Confira os OK. Depois olhe Produtos acabados (R$ 540,00) e o ICMS acumulado.",
      ],
      blocos: [
        { tipo: "nota", variante: "dica", rotulo: "Por quê 7%?", texto: "Na venda para outro estado a alíquota do ICMS é menor. Aqui ela vale 7%; na venda dentro do estado das duas primeiras vendas valia 18%. Em cada fato, use a alíquota que ele informa." },
      ],
      campos: [
        numero("venda-80", "Qual é o valor da venda dos 80 kits, em R$?", AULA_15[3].valor, "80 × R$ 45,00."),
        numero("baixa-80", "Qual é o custo dos 80 kits que saíram do estoque, em R$?", AULA_15[4].valor, "80 × R$ 30,00."),
        numero("icms-7", "Qual é o ICMS de 7% sobre essa venda, em R$?", AULA_15[5].valor, "7% × R$ 3.600,00 = R$ 252,00."),
      ],
      objetivo: "Fazer os três lançamentos de uma venda com imposto e custo.",
    },
    {
      id: "quitacoes",
      titulo: "Etapa 7 — Quitar o empréstimo, pagar os juros e o ICMS",
      cenario: `Fato 7: «${AULA_15[6].texto}». Fato 8: «${AULA_15[7].texto}». Fato 9: «${AULA_15[8].texto}».`,
      imagem: print("a15-6a-quitacoes", "Os fatos 7, 8 e 9 contornados em laranja: quitação do empréstimo de 2.900,50, juros de 25,60 e pagamento do ICMS de 270,00, todos com a conta bancária no crédito.", "Três saídas de dinheiro do banco, cada uma para um destino diferente."),
      passos: [
        "Fato 7 (quitar o empréstimo): valor R$ 2.900,50. A dívida acaba: débito 2.1.2.02 — Empréstimos. O dinheiro sai do banco: crédito 1.1.1.02.",
        "Fato 8 (juros): valor R$ 25,60. Despesa financeira, a débito: 3.2.3.01 — Despesas com juros passivos. Sai do banco: crédito 1.1.1.02.",
        "Fato 9 (pagar o ICMS): some as duas parcelas, R$ 18,00 + R$ 252,00 = R$ 270,00. A dívida acaba: débito 2.1.3.02 — ICMS. Sai do banco: crédito 1.1.1.02.",
        "Confira os OK. O saldo bancário final deve estar em R$ 403,90.",
      ],
      aviso: "O ICMS pago NÃO vira despesa de novo. Ele já reduziu a receita no dia em que foi gerado (fatos 1 e 6). Quando você paga, só baixa a dívida.",
      campos: [
        numero("icms-total", "Quanto foi pago de ICMS no total (fato 9), em R$?", AULA_15[8].valor, "R$ 18,00 das duas primeiras vendas + R$ 252,00 da venda de 80 kits."),
        numero("banco-final", "Qual é o saldo final de Contas bancárias (1.1.1.02), em R$?", f["1.1.1.02"], "R$ 3.600,00 de venda − R$ 2.900,50 do empréstimo − R$ 25,60 de juros − R$ 270,00 de ICMS = R$ 403,90."),
      ],
      objetivo: "Registrar três pagamentos pela conta bancária e conferir o saldo final.",
    },
    {
      id: "conferencia",
      titulo: "Etapa 8 — Conferir os totais",
      imagem: print("a15-6-final", "As 16 linhas de lançamentos, todas com OK, e o quadro de conferência embaixo, contornado em laranja: Ativo, Passivo + PL e Resultado, os três com Correto em verde.", "Tudo certo: as três conferências finais dizem «Correto»."),
      passos: [
        "Role pelas 16 linhas: nenhum Errado pode sobrar.",
        "Olhe o quadro embaixo das linhas: «O saldo do ATIVO ficou», «O saldo do PASSIVO + PL ficou» e «O saldo da conta de RESULTADO ficou»: as três precisam dizer Correto.",
        "Se alguma disser Errado, ache o lançamento com valor, débito ou crédito errado e corrija.",
      ],
      campos: [
        numero("ativo-final", "Qual é o saldo final do ATIVO (conta 1), em R$?", fim.ativo, "R$ 403,90 no banco + R$ 540,00 de estoque."),
        numero("passivo-final", "Qual é o saldo final do PASSIVO E PATRIMÔNIO LÍQUIDO (conta 2), em R$?", fim.passivo + fim.patrimonio, "Todas as dívidas foram pagas: o Passivo zerou."),
        numero("resultado-final", "Qual é o saldo final do RESULTADO (conta 3), em R$?", fim.resultado, "Receitas R$ 3.700,00 − ICMS R$ 270,00 − custos R$ 2.460,00 − juros R$ 25,60 − tarifa R$ 0,50 = R$ 943,90."),
      ],
      objetivo: "Conferir os três totais depois dos 16 lançamentos.",
    },
    {
      id: "equacao",
      titulo: "Etapa 9 — A equação contábil fechou",
      imagem: print("a15-7-saldos-finais", "Saldos finais: ATIVO 943,90; Contas bancárias 403,90; Produtos acabados 540,00; PASSIVO E PL zerado; RESULTADO 943,90; Venda de mercadorias 3.700,00; Deduções -270,00; Custos 2.460,00; juros 25,60 e tarifas 0,50.", "Ativo e Resultado iguais: como não sobrou dívida, tudo o que a loja tem é lucro."),
      cenario: `Ativo ${reais(fim.ativo)} = Passivo ${reais(fim.passivo + fim.patrimonio)} + Resultado ${reais(fim.resultado)}. Quando a loja pagou todas as dívidas, tudo o que ela tem (banco e estoque) passou a ser fruto do lucro: ${reais(fim.resultado)}.`,
      blocos: [
        { tipo: "nota", variante: "dica", rotulo: "O próximo passo", texto: "Na próxima atividade você leva esses saldos para dois relatórios oficiais: o Balanço Patrimonial e a Demonstração do Resultado do Exercício (DRE)." },
      ],
      campos: [escolher("igual", "No fim desta aula, o ATIVO (R$ 943,90) é igual ao RESULTADO (R$ 943,90) porque...", ["a empresa não tem mais dívidas nem capital dos sócios: tudo o que possui veio do lucro", "o contador copiou o valor de uma conta para a outra", "os dois são sempre iguais"], 0, "Ativo = Passivo + Patrimônio Líquido + Resultado. Com Passivo e Patrimônio Líquido zerados, sobra Ativo = Resultado.")],
      desafio: "Na planilha, mude o valor do fato 4 (venda dos 80 kits) para 4000 e veja os OK e os totais reagirem. O que acontece com o ICMS do fato 6, que foi calculado sobre R$ 3.600,00? Depois volte ao valor certo.",
      objetivo: "Ver a equação contábil fechar com as dívidas pagas.",
    },
  ],
};

export default atividade;
