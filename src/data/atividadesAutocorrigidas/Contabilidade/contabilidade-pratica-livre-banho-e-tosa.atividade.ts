import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { reais } from "../ajudantes";
import { AULA_16, fechamento, saldos } from "../dadosContabilidade";
import { escolher, numero, planilhaDe, print } from "../contabilidadeComum";

const depois = (n: number) => saldos(AULA_16.slice(0, n));
const fim = fechamento(AULA_16);
const f = depois(AULA_16.length);

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Contabilidade — Contabilidade Completa de uma Empresa Nova (Banho e Tosa)",
  introducao:
    "Agora você faz sozinho. A Walking Pet abriu uma unidade de banho e tosa, com os livros zerados, e aconteceram 13 fatos no primeiro mês: capital dos sócios, compra de máquinas, serviços prestados, salários, imposto, cartão. Você decide, para cada fato, o valor e as contas de débito e de crédito. A planilha corrige cada linha e confere os totais no fim. Os passos abaixo dão o método e as dicas, sem entregar as respostas.",
  itens: [
    {
      id: "metodo",
      titulo: "Antes de começar — o método para qualquer fato",
      cenario: "Com a prática, o contador faz a pergunta certa em segundos. Use sempre as mesmas três perguntas e a tabela de apoio.",
      blocos: [
        {
          tipo: "lista",
          numerada: true,
          itens: [
            "Quanto foi? Se houver contas a fazer (como 5% ou 2%), faça no Excel ou na calculadora.",
            "O que aumentou ou entrou? Ativo e despesa aumentam a débito. Esse é o lado do DÉBITO.",
            "O que deu ou passou a dever? Passivo, capital e receita aumentam a crédito, e Ativo diminui a crédito. Esse é o lado do CRÉDITO.",
          ],
        },
        { tipo: "subtitulo", texto: "Tabela de apoio: tipos de fato mais comuns" },
        {
          tipo: "tabela",
          colunas: ["Fato", "Débito (aumenta ou entra)", "Crédito (dá ou passa a dever)"],
          linhas: [
            ["Sócios põem dinheiro na empresa", "Banco (Ativo)", "Capital social integralizado (Patrimônio Líquido)"],
            ["Compra de bem, pago na hora", "Máquinas e equipamentos (Ativo)", "Banco (Ativo)"],
            ["Compra a prazo", "Estoque ou insumos (Ativo)", "Fornecedores (Passivo)"],
            ["Serviço prestado e recebido à vista", "Banco (Ativo)", "Venda de prestações de serviços (Receita)"],
            ["Serviço prestado, recebimento futuro", "Clientes (Ativo)", "Venda de prestações de serviços (Receita)"],
            ["Uso do estoque (consumo)", "Custo (Despesa)", "Estoque ou insumos (Ativo)"],
            ["Despesa paga na hora", "Despesa", "Banco (Ativo)"],
            ["Despesa reconhecida, a pagar depois", "Custo ou despesa", "Obrigação a pagar (Passivo)"],
            ["Imposto sobre a receita", "Deduções de tributos (Receita redutora)", "Imposto a pagar (Passivo)"],
            ["Pagar uma dívida", "A dívida (Passivo)", "Banco (Ativo)"],
            ["Receber de cliente", "Banco (Ativo)", "Clientes (Ativo)"],
          ],
        },
      ],
      campos: [escolher("capital", "Os sócios depositam R$ 20.000,00 de capital na conta da empresa. Qual par de lados está certo?", ["Débito em Contas bancárias, crédito em Capital social integralizado", "Débito em Capital social integralizado, crédito em Contas bancárias", "Débito em Receita, crédito em Contas bancárias"], 0, "O banco (Ativo) aumentou: débito. O capital dos sócios (Patrimônio Líquido) aumentou: crédito.")],
    },
    {
      id: "baixar",
      titulo: "Etapa 1 — Baixar a planilha e começar",
      download: planilhaDe("banho-e-tosa-aula-16-para-lancar.xlsx", "Abas Leia-me e Aula 16: o plano de contas com saldos automáticos e os 13 fatos do primeiro mês da unidade de banho e tosa, para você lançar."),
      imagem: print("a16-1-comecar", "Área de lançamentos da Aula 16 com treze fatos em roxo, ainda sem valores. As células de valor, débito e crédito do primeiro fato estão contornadas em laranja.", "Treze fatos para lançar. O primeiro, em laranja, é o capital dos sócios."),
      passos: [
        "Clique em «Baixar planilha», abra no Excel, habilite a edição e salve uma cópia com o seu nome.",
        "Abra a aba «Aula 16». Dessa vez os livros partem de ZERO: todos os saldos mostram um traço.",
        "Leia o fato 1 na coluna H. Digite o valor (coluna I), a conta a debitar (K) e a conta a creditar (M).",
        "Para achar o número de uma conta, procure o nome na coluna E e leia o número na coluna D, ao lado. Só vale conta analítica, de quatro níveis.",
        "Confira o OK ao lado de cada coluna. Se for Errado, volte à tabela de apoio acima.",
      ],
      aviso: "Faça os fatos na ordem. Alguns dependem dos anteriores: não dá para pagar um fornecedor antes de comprar a prazo.",
      objetivo: "Começar uma contabilidade do zero.",
    },
    {
      id: "capital",
      titulo: "Etapa 2 — Capital, máquinas e a primeira compra",
      cenario: `Fatos 1, 2 e 3. Comece pelo capital: «${AULA_16[0].texto}».`,
      imagem: print("a16-2-capital", "Os três primeiros fatos lançados e contornados em laranja: capital de 20.000,00, máquinas de 6.500,00 e insumos de 1.200,00, todos com OK em verde.", "Os três primeiros fatos prontos: todos os OK verdes."),
      passos: [
        "Fato 1 (capital): valor 20.000. O dinheiro entrou no banco e é dos sócios.",
        "Fato 2 (máquinas): valor 6.500. Máquinas e equipamentos é Ativo imobilizado e aumentou; o dinheiro saiu do banco.",
        "Fato 3 (insumos a prazo): valor 1.200. Os insumos entraram no estoque (Ativo) e a loja ficou devendo ao fornecedor (Passivo).",
        "Dica para achar as contas: máquinas está no grupo 1.2.3 (Imobilizado) e insumos em 1.1.3 (Estoques).",
      ],
      campos: [
        numero("banco-2", "Depois dos fatos 1 e 2, qual é o saldo de Contas bancárias (1.1.1.02), em R$?", depois(2)["1.1.1.02"], "R$ 20.000,00 de capital − R$ 6.500,00 das máquinas."),
        numero("fornecedor-3", "Depois do fato 3, qual é o saldo de Fornecedores nacionais (2.1.1.01), em R$?", depois(3)["2.1.1.01"], "A dívida de R$ 1.200,00 com o fornecedor dos insumos."),
      ],
      objetivo: "Registrar capital, compra de bem à vista e compra de insumos a prazo.",
    },
    {
      id: "servicos",
      titulo: "Etapa 3 — Serviços prestados e consumo de insumos",
      cenario: `Fatos 4, 5 e 6: «${AULA_16[3].texto}»; «${AULA_16[4].texto}»; «${AULA_16[5].texto}».`,
      imagem: print("a16-3-servicos", "Fatos 1 a 6 lançados, com os fatos 4, 5 e 6 contornados em laranja: serviços de 6.000,00 à vista, serviços de 3.800,00 no cartão e consumo de insumos de 900,00.", "Serviços à vista, no cartão e o consumo de insumos."),
      passos: [
        "Fato 4: serviço à vista. O dinheiro entrou no banco e o ganho é receita de serviços: conta 3.1.1.02.",
        "Fato 5: serviço no cartão. O dinheiro ainda não entrou: o cliente passou a dever. Use Clientes (1.1.2.01) no lugar do banco.",
        "Fato 6: consumo de insumos. O estoque de insumos diminuiu (crédito) e virou custo do serviço (débito). Use 3.2.1.01 — Custos dos insumos/produtos.",
        "Dica: receita de serviço não é «Venda de mercadorias». Procure «prestações de serviços» no grupo 3.1.1.",
      ],
      campos: [
        numero("receita-5", "Depois do fato 5, qual é o saldo de Venda de prestações de serviços (3.1.1.02), em R$?", depois(5)["3.1.1.02"], "R$ 6.000,00 + R$ 3.800,00: a receita conta mesmo antes de o cartão pagar."),
        numero("insumos-6", "Depois do fato 6, qual é o saldo de Insumos (1.1.3.01), em R$?", depois(6)["1.1.3.01"], "R$ 1.200,00 comprados − R$ 900,00 usados = R$ 300,00 em estoque."),
      ],
      objetivo: "Registrar receitas à vista e a prazo e a baixa de insumos usados.",
    },
    {
      id: "despesas",
      titulo: "Etapa 4 — Aluguel, salários e ISS",
      cenario: `Fatos 7, 8 e 9: «${AULA_16[6].texto}»; «${AULA_16[7].texto}»; «${AULA_16[8].texto}».`,
      imagem: print("a16-4-despesas", "Fatos 1 a 9 lançados, com os fatos 7, 8 e 9 contornados em laranja: aluguel de 1.800,00, salários de 3.000,00 e ISS de 490,00.", "Aluguel pago, salários a pagar e o ISS."),
      passos: [
        "Fato 7 (aluguel): despesa paga na hora. Despesa é débito (use «Despesas administrativas», 3.2.2.01) e o banco é crédito.",
        "Fato 8 (salários): despesa que ainda não foi paga. Débito em «Custos da mão de obra» (3.2.1.02) e crédito em «Salários a pagar» (2.1.4.01), que é Passivo.",
        "Fato 9 (ISS): calcule 5% de R$ 9.800,00 (os dois serviços). O imposto é dedução da receita (débito) e dívida com a prefeitura (crédito: 2.1.3.03 — ISS).",
        "Confira nos saldos: Salários a pagar e ISS mostram os valores certos.",
      ],
      aviso: "O ISS é calculado sobre TODA a receita do mês (R$ 9.800,00), não só sobre a parte recebida à vista.",
      campos: [
        numero("iss", "Qual é o valor do ISS de 5% sobre os serviços do mês, em R$?", AULA_16[8].valor, "5% × R$ 9.800,00 = R$ 490,00.", 0.01),
        numero("salarios", "Depois do fato 8, qual é o saldo de Salários a pagar (2.1.4.01), em R$?", depois(8)["2.1.4.01"], "A folha está reconhecida, mas ainda não foi paga: R$ 3.000,00."),
      ],
      objetivo: "Diferenciar despesa paga, despesa a pagar e imposto sobre a receita.",
    },
    {
      id: "pagamentos",
      titulo: "Etapa 5 — Pagamentos, cartão e tarifa",
      cenario: `Fatos 10 a 13: «${AULA_16[9].texto}»; «${AULA_16[10].texto}»; «${AULA_16[11].texto}»; «${AULA_16[12].texto}».`,
      imagem: print("a16-5-pagamentos", "Todos os 13 fatos lançados, com os fatos 10 a 13 contornados em laranja: pagamento dos salários de 3.000,00, recebimento do cartão de 3.800,00, tarifa de 76,00 e pagamento do fornecedor de 1.200,00.", "Os quatro últimos fatos: pagar as dívidas e receber do cartão."),
      passos: [
        "Fato 10 (pagar os salários): a dívida de 2.1.4.01 acaba (débito) e o dinheiro sai do banco (crédito).",
        "Fato 11 (cartão pagou): o banco aumenta (débito) e o cliente deixa de dever (crédito em Clientes).",
        "Fato 12 (tarifa): 2% de R$ 3.800,00 = R$ 76,00. É despesa financeira (débito 3.2.3.02) e sai do banco (crédito).",
        "Fato 13 (pagar o fornecedor): a dívida de 2.1.1.01 acaba (débito) e o dinheiro sai do banco (crédito).",
        "Agora todos os OK devem estar verdes.",
      ],
      campos: [
        numero("tarifa", "Qual é a tarifa de 2% sobre R$ 3.800,00 do cartão, em R$?", AULA_16[11].valor, "2% × R$ 3.800,00 = R$ 76,00."),
        numero("banco-fim", "Qual é o saldo final de Contas bancárias (1.1.1.02), em R$?", f["1.1.1.02"], "20.000 − 6.500 + 6.000 − 1.800 − 3.000 + 3.800 − 76 − 1.200 = R$ 17.224,00."),
      ],
      objetivo: "Quitar dívidas, receber do cartão e pagar a tarifa.",
    },
    {
      id: "conferencia",
      titulo: "Etapa 6 — Conferir os totais",
      imagem: print("a16-6-conferencia", "Os 13 fatos, todos com OK em verde, e o quadro de conferência embaixo, contornado em laranja, com Correto para Ativo, Passivo + PL e Resultado.", "As três conferências finais dizem «Correto» quando tudo está certo."),
      passos: [
        "Olhe todas as colunas de OK: nenhuma pode estar vermelha ou vazia.",
        "No quadro embaixo, as três linhas — ATIVO, PASSIVO + PL e RESULTADO — precisam dizer Correto.",
        "Se uma disser Errado, volte ao fato: provavelmente um lançamento está invertido, com o valor errado ou ainda em branco.",
      ],
      campos: [
        numero("ativo", "Qual é o saldo do ATIVO (conta 1), em R$?", fim.ativo, "Banco R$ 17.224,00 + máquinas R$ 6.500,00 + insumos R$ 300,00."),
        numero("passivo-pl", "Qual é o saldo do PASSIVO E PATRIMÔNIO LÍQUIDO (conta 2), em R$?", fim.passivo + fim.patrimonio, "Capital R$ 20.000,00 + ISS a pagar R$ 490,00."),
        numero("resultado", "Qual é o saldo do RESULTADO (conta 3), em R$?", fim.resultado, "Receita de serviços R$ 9.800,00 − ISS R$ 490,00 − custos R$ 3.900,00 − aluguel R$ 1.800,00 − tarifa R$ 76,00."),
      ],
      objetivo: "Chegar aos totais corretos sem a ajuda da planilha para decidir os lançamentos.",
    },
    {
      id: "equacao",
      titulo: "Etapa 7 — A prova dos nove",
      imagem: print("a16-7-saldos", "Saldos finais: ATIVO 24.024,00; Contas bancárias 17.224,00; Máquinas e equipamentos 6.500,00; PASSIVO E PL 20.490,00; ISS 490,00; Capital social integralizado 20.000,00; RESULTADO 3.534,00; Venda de prestações de serviços 9.800,00; Deduções -490,00; Custos da mão de obra 3.000,00.", "Os principais saldos finais da unidade de banho e tosa."),
      cenario: `Ativo ${reais(fim.ativo)} = Passivo e PL ${reais(fim.passivo + fim.patrimonio)} + Resultado ${reais(fim.resultado)}. Se a soma bate, os 13 lançamentos estão consistentes.`,
      campos: [
        escolher("lucro-ou-prejuizo", "O que o resultado de R$ 3.534,00 significa para a unidade de banho e tosa?", ["Lucro: as receitas superaram os custos e as despesas", "Prejuízo", "Dívida com o banco"], 0, "Resultado positivo é lucro: sobrou dinheiro depois de pagar custos, despesas e impostos."),
        escolher("capital-mantido", "O capital dos sócios (R$ 20.000,00) aparece no balanço como...", ["Patrimônio Líquido (crédito)", "Despesa (débito)", "Receita"], 0, "É dinheiro dos sócios que está na empresa: Patrimônio Líquido, a crédito."),
      ],
      desafio: "Na planilha, troque o valor do fato 4 (serviços à vista) de 6000 para 7000 e veja que lançamentos viram Errado e o que acontece com os totais. Depois volte ao valor correto. Qual lançamento precisaria ser refeito para a equação voltar a fechar?",
      objetivo: "Usar Ativo = Passivo + PL + Resultado como prova final da contabilidade.",
    },
  ],
};

export default atividade;
