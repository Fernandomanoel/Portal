import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { reais } from "../ajudantes";
import { AULA_15_COMPLETA, fechamento, totaisPorConta } from "../dadosContabilidade";
import { escolher, numero, planilhaDe, print } from "../contabilidadeComum";

const t = totaisPorConta(AULA_15_COMPLETA);
const fim = fechamento(AULA_15_COMPLETA);
const receitaLiquida = t["3.1.1.01"] + t["3.1.1.03"];
const lucroBruto = receitaLiquida - t["3.2.1"];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Contabilidade — Montando o Balanço Patrimonial e a DRE da Walking Pet",
  introducao:
    "Lançamentos são o caderno do dia a dia. Quem lê a contabilidade da empresa, como sócio, banco ou governo, quer dois relatórios prontos: o Balanço Patrimonial (a foto do que a empresa tem e deve) e a Demonstração do Resultado do Exercício, a DRE (o filme do que ganhou e gastou). Nesta atividade você monta os dois na planilha, ligando cada número aos saldos que a Aula 15 calculou.",
  itens: [
    {
      id: "dois-relatorios",
      titulo: "Antes de começar — Balanço e DRE, lado a lado",
      cenario: "O Balanço e a DRE usam os mesmos números dos lançamentos, mas organizam cada um de um jeito diferente. Conhecer a diferença é o que permite ler qualquer demonstração.",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["", "Balanço Patrimonial", "DRE"],
          linhas: [
            ["Pergunta que responde", "O que a empresa TEM e DEVE hoje?", "Quanto a empresa GANHOU e GASTOU no período?"],
            ["Imagem", "Uma foto de um dia", "Um filme do período"],
            ["Contas usadas", "Ativo, Passivo e Patrimônio Líquido (grupos 1 e 2)", "Receitas, custos e despesas (grupo 3)"],
            ["Termina em", "Total do Ativo = Total do Passivo + PL", "Lucro (ou prejuízo) líquido"],
          ],
        },
        { tipo: "subtitulo", texto: "A DRE em uma escadinha" },
        {
          tipo: "lista",
          itens: [
            "Receita bruta de vendas",
            "(−) Deduções (imposto sobre a venda) → Receita líquida",
            "(−) Custo das mercadorias vendidas → Lucro bruto",
            "(−) Despesas com venda e administrativas, (−) despesas financeiras, (+) receitas financeiras → Lucro líquido",
          ],
        },
        { tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "O lucro líquido da DRE aparece também no Balanço, dentro do Patrimônio Líquido. É a ponte entre os dois relatórios: o que a empresa ganhou no período é um pedaço do que ela tem." },
      ],
      campos: [escolher("qual-lucro", "Qual relatório mostra o lucro do período, linha por linha (receitas menos custos e despesas)?", ["Balanço Patrimonial", "DRE — Demonstração do Resultado do Exercício"], 1, "A DRE: ela abre as receitas, os custos e as despesas até chegar ao lucro líquido.")],
    },
    {
      id: "baixar",
      titulo: "Etapa 1 — Baixar a planilha e conhecer as duas abas",
      download: planilhaDe("walking-pet-balanco-e-dre-para-montar.xlsx", "Abas Leia-me, Aula 15 (os livros fechados, com os 16 lançamentos já feitos) e Aula 15 - BP e DRE (o modelo do Balanço e da DRE, com as células amarelas para você preencher)."),
      imagem: print("bp-2-modelo", "Modelo de relatório da Walking Pet: título WALKING PET em azul, faixa laranja com o período, Balanço Patrimonial à esquerda em verde, DRE à direita em amarelo, com células amarelas vazias ao lado de cada linha.", "O modelo: todo o texto já está pronto. Você preenche as células amarelas."),
      passos: [
        "Clique em «Baixar planilha», abra no Excel, habilite a edição e salve uma cópia com o seu nome.",
        "Abra a aba «Aula 15». Ela traz o plano de contas com todos os 16 lançamentos já feitos: é a fonte de todos os números.",
        "Abra a aba «Aula 15 - BP e DRE». À esquerda, em verde, o Balanço Patrimonial (Ativo na esquerda, Passivo e Patrimônio Líquido ao lado). À direita, em amarelo, a DRE.",
        "Repare nas células amarelas, ao lado de cada linha: são todas as que você vai preencher.",
        "Embaixo, depois das assinaturas, há uma «Conferência» que vai dizer Correto ou Errado.",
      ],
      aviso: "Os textos do modelo (WALKING PET, CNPJ, XX/XX/XXXX) ficam como estão. Em uma empresa real, o contador os troca pelos dados verdadeiros.",
      objetivo: "Saber onde está a fonte dos números e onde fica o modelo a preencher.",
    },
    {
      id: "ligar",
      titulo: "Etapa 2 — Como ligar uma célula ao saldo de outra aba",
      imagem: print("bp-1-saldo-ativo", "Aba Aula 15 com a coluna de saldos: a célula do saldo de ATIVO, F3, mostra R$ 943,90 e está contornada em laranja. Abaixo, Ativo Circulante 943,90, Caixa bancos e equivalentes 403,90 e as contas Caixa, Contas bancárias, Contas de movimento, Contas a receber e Clientes.", "A célula F3 da aba «Aula 15» é o saldo do ATIVO. É ela que vamos copiar para o Balanço."),
      passos: [
        "Vá à aba «Aula 15 - BP e DRE» e clique na célula amarela ao lado de «Ativo» (B5).",
        "Digite o sinal de igual (=). Ele avisa ao Excel que você vai escrever uma fórmula.",
        "Clique na aba «Aula 15» (embaixo da tela) e depois na célula F3, o saldo do ATIVO. Repare que o Excel escreve sozinho 'Aula 15'!F3.",
        "Aperte Enter. O Excel volta para a aba do Balanço e a célula B5 passa a mostrar R$ 943,90, com a fórmula ='Aula 15'!F3.",
        "A célula fica verde se o valor estiver certo, e vermelha se estiver errado.",
      ],
      blocos: [
        {
          tipo: "tabela",
          colunas: ["Fórmula", "Lê-se"],
          linhas: [
            ["='Aula 15'!F3", "Traga o que está na célula F3 da aba Aula 15."],
            ["='Aula 15'!F85", "Traga o que está na célula F85 (Venda de mercadorias) da aba Aula 15."],
          ],
        },
        { tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "Ligar por fórmula, em vez de digitar o número, faz o relatório se atualizar sozinho: se um lançamento mudar na aba Aula 15, o Balanço e a DRE acompanham. Número digitado à mão fica velho." },
      ],
      campos: [numero("b5", "Qual valor apareceu na célula B5 (Ativo) depois de ligá-la ao F3, em R$?", fim.ativo, "O ATIVO total: banco R$ 403,90 + estoque R$ 540,00.")],
      objetivo: "Ligar uma célula do relatório ao saldo certo, com uma fórmula e sem digitar o número.",
    },
    {
      id: "ativo",
      titulo: "Etapa 3 — Preencher o lado do Ativo",
      imagem: print("bp-4-ativo", "Lado do Ativo do Balanço preenchido: Ativo 943,90; Circulante 943,90; Disponível 403,90; Contas a receber zerada; Estoques 540,00; Outros créditos zerado; e o Não-Circulante zerado. As células de valor, todas em verde, estão contornadas em laranja.", "Lado do Ativo pronto: as células ficam verdes quando você acerta."),
      cenario: "Use o mesmo método da etapa 2 para cada célula amarela do Ativo. A tabela abaixo diz qual saldo da aba «Aula 15» ligar a cada linha.",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["Linha do Balanço", "Célula a preencher", "Fórmula", "Saldo"],
          linhas: [
            ["Ativo", "B5", "='Aula 15'!F3", reais(t["1"])],
            ["Circulante", "B6", "='Aula 15'!F4", reais(t["1.1"])],
            ["Disponível", "B7", "='Aula 15'!F5", reais(t["1.1.1"])],
            ["Contas a receber", "B8", "='Aula 15'!F9", reais(t["1.1.2"])],
            ["Estoques", "B9", "='Aula 15'!F13", reais(t["1.1.3"])],
            ["Outros créditos", "B10", "='Aula 15'!F16", reais(t["1.1.4"])],
            ["Não-Circulante", "B12", "='Aula 15'!F20", reais(t["1.2"])],
            ["Realizável a Longo Prazo", "B13", "='Aula 15'!F21", reais(t["1.2.1"])],
            ["Investimentos", "B14", "='Aula 15'!F24", reais(t["1.2.2"])],
            ["Imobilizado", "B15", "='Aula 15'!F27", reais(t["1.2.3"])],
          ],
        },
        { tipo: "nota", variante: "dica", rotulo: "Atalho", texto: "Depois de digitar o sinal de igual, você pode apertar as setas do teclado para andar até a célula da outra aba, em vez de clicar com o mouse." },
      ],
      passos: [
        "Clique na célula B6 (Circulante). Digite =, clique na aba Aula 15, clique na célula F4 e aperte Enter.",
        "Repita para B7 (F5), B8 (F9), B9 (F13) e B10 (F16).",
        "Depois, para o Não-Circulante: B12 (F20), B13 (F21), B14 (F24) e B15 (F27).",
        "Olhe as células: todas devem ficar verdes.",
      ],
      campos: [
        numero("disponivel", "Quanto deu o Disponível (B7), em R$?", t["1.1.1"], "É o saldo do banco: R$ 403,90."),
        numero("estoques", "Quanto deu o grupo Estoques (B9), em R$?", t["1.1.3"], "Restaram 18 kits a R$ 30,00: R$ 540,00."),
      ],
      objetivo: "Preencher o Ativo ligando cada linha do Balanço ao saldo correspondente.",
    },
    {
      id: "passivo",
      titulo: "Etapa 4 — Preencher o Passivo, o Patrimônio Líquido e os totais",
      imagem: print("bp-4b-passivo", "Lado do Passivo e Patrimônio Líquido do Balanço preenchido: tudo zerado, exceto a linha Resultado do exercício (lucro), com 943,90, e o Total do Passivo + PL, com 943,90. As células estão contornadas em laranja.", "Passivo e PL: dívidas pagas, sobrou o lucro do exercício."),
      cenario: "Mesmo método. Atenção a duas linhas novas: Resultado do exercício e os dois totais, que são fórmulas simples de soma.",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["Linha do Balanço", "Célula a preencher", "Fórmula", "Saldo"],
          linhas: [
            ["Passivo", "D5", "='Aula 15'!F37", reais(t["2"])],
            ["Circulante", "D6", "='Aula 15'!F38", reais(t["2.1"])],
            ["Fornecedores", "D7", "='Aula 15'!F39", reais(t["2.1.1"])],
            ["Financiamentos e empréstimos", "D8", "='Aula 15'!F43", reais(t["2.1.2"])],
            ["Obrigações fiscais", "D9", "='Aula 15'!F46", reais(t["2.1.3"])],
            ["Contas a pagar", "D10", "='Aula 15'!F55", reais(t["2.1.5"])],
            ["Provisões", "D11", "='Aula 15'!F63", reais(t["2.1.6"])],
            ["Não-Circulante", "D13", "='Aula 15'!F67", reais(t["2.2"])],
            ["Financiamentos e empréstimos", "D14", "='Aula 15'!F68", reais(t["2.2.1"])],
            ["Outros tipos de empréstimos", "D15", "='Aula 15'!F71", reais(t["2.2.2"])],
            ["Patrimônio Líquido", "D17", "='Aula 15'!F73", reais(t["2.3"])],
            ["Capital Social", "D18", "='Aula 15'!F74", reais(t["2.3.1"])],
            ["Reservas de capital", "D19", "='Aula 15'!F77", reais(t["2.3.2"])],
            ["Lucros/prejuízos acumulados", "D20", "='Aula 15'!F79", reais(t["2.3.3"])],
            ["Resultado do exercício (lucro)", "D21", "='Aula 15'!F82", reais(fim.resultado)],
            ["Total do Ativo", "B23", "=B5", reais(t["1"])],
            ["Total do Passivo + PL", "D23", "=D17+D13+D6+D21", reais(t["2"] + fim.resultado)],
          ],
        },
        { tipo: "nota", variante: "aviso", rotulo: "Por que existe a linha «Resultado do exercício»?", texto: "O lucro do período ainda não foi transferido para a conta Lucros acumulados (isso é feito no fechamento do ano). Enquanto isso, o balanço o mostra em separado, dentro do Patrimônio Líquido, para que o total do Passivo + PL feche com o do Ativo." },
      ],
      passos: [
        "Preencha as 15 células da tabela, de D5 a D21, com o mesmo método: =, aba Aula 15, saldo, Enter.",
        "Em D21, o lucro, ligue ao F82 da aba Aula 15: é o saldo da conta 3 — RESULTADO DAS RECEITAS, CUSTOS E DESPESAS.",
        "Em B23 digite =B5 (o total do Ativo é o próprio Ativo).",
        "Em D23 digite =D17+D13+D6+D21: Patrimônio Líquido + Passivo Não Circulante + Passivo Circulante + Resultado.",
        "Olhe a Conferência, embaixo do modelo: a primeira linha (Total do Ativo = Total do Passivo + PL?) deve dizer Correto.",
      ],
      campos: [
        numero("total-passivo", "Quanto deu o Total do Passivo + PL (D23), em R$?", t["2"] + fim.resultado, "Passivo e capital zerados, mais o lucro de R$ 943,90."),
        escolher("fecha", "O Total do Ativo e o Total do Passivo + PL ficaram iguais?", ["Sim, os dois valem R$ 943,90", "Não, são diferentes"], 0, "Fecham porque cada lançamento foi feito com débito e crédito de mesmo valor."),
      ],
      objetivo: "Fechar o Balanço: o total do Ativo precisa ser igual ao total do Passivo + PL.",
    },
    {
      id: "dre",
      titulo: "Etapa 5 — Preencher a DRE",
      imagem: print("bp-5-dre", "DRE preenchida em verde: Receita bruta 3.700,00; Deduções 270,00; Receita líquida 3.430,00; Custo das mercadorias vendidas 2.460,00; Lucro bruto 970,00; Despesas com venda zerada; Despesas financeiras 26,10; Receita financeira zerada; Despesas administrativas zerada; Lucro Líquido 943,90.", "A DRE em escadinha, da receita bruta até o lucro líquido."),
      cenario: "A DRE tem dois tipos de célula: as que vêm da aba «Aula 15» e as que são contas feitas por você na própria aba.",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["Linha da DRE", "Célula", "Fórmula", "Resultado"],
          linhas: [
            ["(+) Receita bruta de vendas", "F5", "='Aula 15'!F85", reais(t["3.1.1.01"])],
            ["(–) Deduções (ICMS sobre as vendas)", "F7", "=-'Aula 15'!F87", reais(-t["3.1.1.03"])],
            ["(=) Receita líquida", "F9", "=F5-F7", reais(receitaLiquida)],
            ["(–) Custo das mercadorias vendidas", "F11", "='Aula 15'!F97", reais(t["3.2.1"])],
            ["(=) Lucro bruto", "F13", "=F9-F11", reais(lucroBruto)],
            ["(–) Despesas com venda", "F15", "='Aula 15'!F102", reais(t["3.2.2.02"])],
            ["(–) Despesas financeiras", "F17", "='Aula 15'!F104", reais(t["3.2.3"])],
            ["(+) Receita financeira", "F19", "='Aula 15'!F88", reais(t["3.1.2"])],
            ["(–) Despesas administrativas", "F21", "='Aula 15'!F101", reais(t["3.2.2.01"])],
            ["(=) Lucro Líquido", "F23", "=F13-F15-F17+F19-F21", reais(fim.resultado)],
          ],
        },
        { tipo: "nota", variante: "aviso", rotulo: "O sinal de menos na célula F7", texto: "Na aba Aula 15, a dedução (F87) aparece NEGATIVA (−R$ 270,00), porque reduz a receita. Na DRE, a linha já tem o rótulo «(–)», e o valor mostra-se positivo. Por isso a fórmula troca o sinal: =-'Aula 15'!F87." },
      ],
      passos: [
        "Preencha F5, F7, F11, F15, F17, F19 e F21 com as fórmulas da tabela (sinal de igual, aba Aula 15, saldo, Enter).",
        "Preencha as linhas de «contas» digitando a fórmula na própria célula: F9 =F5-F7; F13 =F9-F11; F23 =F13-F15-F17+F19-F21.",
        "Cada célula fica verde quando o valor está certo.",
        "Olhe o Lucro Líquido (F23): ele precisa ser igual ao Resultado do exercício que você ligou no Balanço (D21).",
      ],
      campos: [
        numero("receita-liquida", "Quanto deu a Receita líquida (F9), em R$?", receitaLiquida, "R$ 3.700,00 de vendas − R$ 270,00 de ICMS."),
        numero("lucro-bruto", "Quanto deu o Lucro bruto (F13), em R$?", lucroBruto, "R$ 3.430,00 − R$ 2.460,00 de custo das mercadorias."),
        numero("lucro-liquido", "Quanto deu o Lucro Líquido (F23), em R$?", fim.resultado, "R$ 970,00 de lucro bruto − R$ 26,10 de despesas financeiras (juros R$ 25,60 + tarifa R$ 0,50)."),
      ],
      objetivo: "Montar a DRE e chegar ao lucro líquido.",
    },
    {
      id: "conferencia",
      titulo: "Etapa 6 — A conferência final",
      imagem: print("bp-6-conferido", "Balanço e DRE completos, com todas as células em verde e, embaixo, o quadro Conferência contornado em laranja: as duas perguntas respondidas com Correto.", "Relatórios prontos: Ativo igual ao Passivo + PL, e lucro da DRE igual ao do Balanço."),
      passos: [
        "Olhe a planilha inteira: todas as células amarelas devem estar verdes.",
        "Role até a «Conferência», embaixo: «Total do Ativo = Total do Passivo + PL?» e «Lucro líquido da DRE = Resultado do exercício do Balanço?» precisam dizer Correto.",
        "Se alguma célula estiver vermelha, clique nela e confira a fórmula na barra de fórmulas: o número da célula da aba Aula 15 deve ser o da tabela da etapa 3, 4 ou 5.",
        "Salve o arquivo. Em uma empresa real, ele iria para o presidente e para o contador assinarem.",
      ],
      campos: [
        escolher("ponte", "Qual é a «ponte» entre a DRE e o Balanço Patrimonial?", ["O lucro líquido da DRE aparece no Patrimônio Líquido do Balanço", "O total do Ativo é copiado para a DRE", "Não existe nenhuma ligação"], 0, "O lucro do período aumenta o patrimônio da empresa, e por isso ele aparece no Balanço."),
      ],
      desafio: "Volte à aba «Aula 15» e mude o valor da venda dos 80 kits (fato 4) para 4000. Sem tocar na aba do Balanço, volte a ela: o que aconteceu com o lucro líquido? E com a conferência? Depois desfaça.",
      objetivo: "Conferir os dois relatórios e entender a ponte entre eles.",
    },
  ],
};

export default atividade;
