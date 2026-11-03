import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { reais } from "../ajudantes";
import { ANEXOS_SIMPLES, aliquotaEfetiva, ESPERADO_SIMPLES, IMPOSTO_SIMPLES, SIMPLES_RBM, SIMPLES_RBT12 } from "../dadosContabilidade";
import { escolher, numero, planilhaDe, print } from "../contabilidadeComum";

const pct = (v: number, casas = 4) => `${(v * 100).toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas })}%`;
const a1 = aliquotaEfetiva("I", SIMPLES_RBT12);
const a2 = aliquotaEfetiva("II", SIMPLES_RBT12);
const a3 = aliquotaEfetiva("III", SIMPLES_RBT12);
const nova = 1200000;
const simulada = aliquotaEfetiva("I", nova);

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Escrita Fiscal — Simples Nacional: Alíquota Efetiva e Imposto do Mês na Planilha",
  introducao:
    "No Simples Nacional, a empresa paga um imposto único (o DAS) sobre o que vendeu no mês, mas a alíquota que vale não é a da tabela: é a alíquota efetiva, que depende de quanto a empresa faturou nos últimos 12 meses. Nesta atividade você monta, numa planilha, a consulta que descobre a faixa, calcula a alíquota efetiva e o imposto do mês nos Anexos I (Comércio), II (Indústria) e III (Serviços) para a Walking Pet.",
  itens: [
    {
      id: "como-funciona",
      titulo: "Antes de começar — como o Simples Nacional calcula o imposto",
      cenario: `A Walking Pet faturou ${reais(SIMPLES_RBT12)} nos últimos 12 meses (a RBT12) e ${reais(SIMPLES_RBM)} neste mês (a RBM). Quanto de imposto ela paga neste mês, se for tributada pelo Anexo I (Comércio), pelo II (Indústria) ou pelo III (Serviços)?`,
      blocos: [
        { tipo: "subtitulo", texto: "Os termos" },
        {
          tipo: "tabela",
          colunas: ["Sigla", "Significa", "Para que serve"],
          linhas: [
            ["RBM", "Receita Bruta do Mês", "É a base: o imposto do mês é uma porcentagem dela."],
            ["RBT12", "Receita Bruta Total dos últimos 12 meses", "Decide em que faixa da tabela a empresa está."],
            ["Alíquota nominal", "A porcentagem escrita na tabela da faixa", "Ponto de partida do cálculo."],
            ["Parcela a deduzir", "Um valor em reais da tabela da faixa", "Compensa o fato de a alíquota nominal ser aplicada sobre tudo."],
            ["Alíquota efetiva", "A porcentagem que realmente vale", "É a que se aplica à RBM."],
          ],
        },
        { tipo: "subtitulo", texto: "As duas fórmulas" },
        {
          tipo: "lista",
          itens: [
            "Alíquota efetiva = (RBT12 × alíquota nominal − parcela a deduzir) ÷ RBT12",
            "Imposto do mês (DAS) = RBM × alíquota efetiva",
          ],
        },
        {
          tipo: "texto",
          texto: `Exemplo resolvido, Anexo I, RBT12 de ${reais(SIMPLES_RBT12)}: está na 3ª faixa (de R$ 360.000,01 a R$ 720.000,00), alíquota nominal ${pct(a1.nominal / 100, 2)} e parcela a deduzir ${reais(a1.deduzir)}. Alíquota efetiva = (${reais(SIMPLES_RBT12)} × ${pct(a1.nominal / 100, 2)} − ${reais(a1.deduzir)}) ÷ ${reais(SIMPLES_RBT12)} = ${pct(a1.efetiva)}. Imposto do mês = ${reais(SIMPLES_RBM)} × ${pct(a1.efetiva)} = ${reais(IMPOSTO_SIMPLES("I"))}.`,
        },
        { tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "A alíquota efetiva cresce de forma suave conforme a empresa fatura mais. Se o imposto fosse sempre a alíquota nominal da faixa, passar de R$ 360.000 para R$ 360.001 daria um salto brusco no que a empresa paga. A parcela a deduzir suaviza a escada." },
      ],
      campos: [escolher("rbt12", "Qual receita decide a faixa em que a empresa se enquadra no Simples Nacional?", ["A RBM (receita do mês)", "A RBT12 (receita dos últimos 12 meses)", "O lucro do mês"], 1, "É a RBT12: o enquadramento olha o faturamento dos últimos 12 meses, não só o mês.")],
    },
    {
      id: "baixar",
      titulo: "Etapa 1 — Baixar a planilha e conhecer a aba Tabelas",
      download: planilhaDe("simples-nacional-para-calcular.xlsx", "Abas Leia-me, Tabelas (as seis faixas dos Anexos I, II e III) e Consulta Imposto Simples (a consulta para você montar)."),
      imagem: print("simples-1-tabelas", "Aba Tabelas com o Anexo I — Comércio: seis faixas com receita de e até, nome da faixa, alíquota nominal de 4% a 19% e parcela a deduzir de zero a R$ 378.000,00, contornadas em laranja.", "Tabela do Anexo I: cada linha é uma faixa de faturamento."),
      passos: [
        "Clique em «Baixar planilha», abra no Excel, habilite a edição e salve uma cópia com o seu nome.",
        "Abra a aba «Tabelas». O Anexo I (Comércio) ocupa as linhas 3 a 8; o Anexo II (Indústria), as linhas 12 a 17; o Anexo III (Serviços), as linhas 21 a 26.",
        "Leia as colunas: A é o início da faixa (a RBT12 «de»), B é o fim, C é o nome da faixa, D é a alíquota nominal e E é a parcela a deduzir.",
        "Repare que a coluna A começa em 0 e cresce: isso é essencial para a busca aproximada que você vai usar.",
      ],
      aviso: "Tabelas do Simples Nacional mudam por lei. Conferir a vigente em www8.receita.fazenda.gov.br/simplesnacional antes de usar em uma empresa real.",
      objetivo: "Saber onde ficam as tabelas e o que cada coluna guarda.",
    },
    {
      id: "consulta",
      titulo: "Etapa 2 — Conhecer a aba Consulta Imposto Simples",
      imagem: print("simples-2-consulta", "Aba de consulta: RBM de R$ 52.000,00 e RBT12 de R$ 540.000,00 em lilás, e uma tabela com os Anexos I, II e III e colunas Faixa, Alíquota nominal, Parcela a deduzir, Alíquota efetiva e Imposto do mês. As células amarelas a preencher estão contornadas em laranja.", "As células amarelas são as suas. A RBM e a RBT12, em lilás, são os dados de partida."),
      passos: [
        "Abra a aba «Consulta Imposto Simples». No alto, B1 é a RBM (R$ 52.000,00) e B2 é a RBT12 (R$ 540.000,00).",
        "Mais abaixo há uma linha para cada anexo e cinco células amarelas: Faixa, Alíquota nominal, Parcela a deduzir, Alíquota efetiva e Imposto do mês.",
        "A última coluna, «Confere?», diz OK ou Errado quando a linha estiver preenchida.",
        "Embaixo da tabela, duas células amarelas, B9 e B10, esperam o menor imposto e o anexo dele.",
      ],
      campos: [numero("rbm", "Qual é a RBM (receita do mês) da Walking Pet, na célula B1, em R$?", SIMPLES_RBM, "É a base do cálculo do imposto do mês.", 0)],
      objetivo: "Saber onde ficam os dados e as células a preencher.",
    },
    {
      id: "primeira",
      titulo: "Etapa 3 — Montar a linha do Anexo I",
      imagem: print("simples-3-primeira-linha", "Linha do Anexo I preenchida e contornada em laranja: faixa 3, alíquota nominal 9,50%, parcela a deduzir R$ 13.860,00, alíquota efetiva 6,9333% e imposto do mês R$ 3.605,33, com OK em verde.", "Anexo I pronto, com OK na coluna da direita."),
      passos: [
        "Clique na célula B5 (Faixa) e digite a fórmula =CORRESP($B$2;Tabelas!$A$3:$A$8;1). O terceiro argumento (1) faz a busca aproximada: acha a última faixa cujo início é menor ou igual à RBT12. Resultado: 3.",
        "Clique na C5 (Alíquota nominal) e digite =PROCV($B$2;Tabelas!$A$3:$E$8;4;VERDADEIRO). Ele busca a RBT12 na coluna A da tabela e traz a coluna 4 (alíquota nominal).",
        "Clique na D5 (Parcela a deduzir) e digite =PROCV($B$2;Tabelas!$A$3:$E$8;5;VERDADEIRO), igual à anterior, mas trazendo a coluna 5.",
        "Clique na E5 (Alíquota efetiva) e digite =($B$2*C5-D5)/$B$2. É a fórmula do começo da atividade.",
        "Clique na F5 (Imposto do mês) e digite =$B$1*E5: a RBM vezes a alíquota efetiva.",
        "Olhe a coluna «Confere?»: precisa dizer OK, em verde.",
      ],
      blocos: [
        { tipo: "nota", variante: "dica", rotulo: "Por quê o VERDADEIRO no final do PROCV?", texto: "Sem ele, o PROCV procura o valor EXATO da RBT12 na tabela e dá #N/D quando ele não existe (e quase nunca existe). Com ele, o PROCV procura a faixa onde o valor cai, e por isso a coluna A precisa estar em ordem crescente, começando em zero." },
        { tipo: "nota", variante: "dica", rotulo: "Por quê os $ em $B$2?", texto: "O cifrão trava a célula. Quando você copiar a fórmula para outra linha, B2 não anda: todas as linhas precisam olhar para a mesma RBT12." },
      ],
      campos: [
        numero("efetiva-1", "Qual é a alíquota efetiva do Anexo I, em % (E5)? Escreva só o número, com até 4 casas depois da vírgula.", Number((a1.efetiva * 100).toFixed(4)), `(${reais(SIMPLES_RBT12)} × ${pct(a1.nominal / 100, 2)} − ${reais(a1.deduzir)}) ÷ ${reais(SIMPLES_RBT12)} = ${pct(a1.efetiva)}.`, 0.01),
        numero("imposto-1", "Qual é o imposto do mês no Anexo I (F5), em R$?", IMPOSTO_SIMPLES("I"), `${reais(SIMPLES_RBM)} × ${pct(a1.efetiva)}.`),
      ],
      objetivo: "Montar, com PROCV aproximado, a linha completa de um anexo.",
    },
    {
      id: "outros-anexos",
      titulo: "Etapa 4 — Anexos II e III",
      cenario: "Cada anexo tem a sua tabela, em outro trecho da aba Tabelas. As fórmulas são as mesmas, mas apontam para a tabela do anexo. Por isso, ao copiar a linha de cima, troque os intervalos.",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["Anexo", "Linha da consulta", "Intervalo da tabela", "Fórmula da Faixa (coluna B)"],
          linhas: [
            ["I — Comércio", "5", "Tabelas!$A$3:$E$8", "=CORRESP($B$2;Tabelas!$A$3:$A$8;1)"],
            ["II — Indústria", "6", "Tabelas!$A$12:$E$17", "=CORRESP($B$2;Tabelas!$A$12:$A$17;1)"],
            ["III — Serviços", "7", "Tabelas!$A$21:$E$26", "=CORRESP($B$2;Tabelas!$A$21:$A$26;1)"],
          ],
        },
        { tipo: "nota", variante: "aviso", rotulo: "Copiar e arrastar não basta", texto: "Se você arrastar as fórmulas da linha 5 para baixo, os intervalos andam junto (A3:A8 vira A4:A9...) e vão para o lugar errado. Faça assim: copie as fórmulas da linha 5, cole na linha 6 e troque em cada uma o intervalo Tabelas!$A$3:$E$8 por Tabelas!$A$12:$E$17. Repita na linha 7 com Tabelas!$A$21:$E$26." },
      ],
      passos: [
        "Na linha 6 (Anexo II), preencha B6 a F6 com as mesmas fórmulas, apontando para Tabelas!$A$12:$E$17 (e $A$12:$A$17 na da faixa).",
        "Na linha 7 (Anexo III), faça o mesmo apontando para Tabelas!$A$21:$E$26.",
        "As fórmulas das colunas E e F mudam só o número da linha: =($B$2*C6-D6)/$B$2 e =$B$1*E6 na linha 6; C7, D7 e E7 na linha 7.",
        "Confira: as três linhas devem mostrar OK em verde.",
      ],
      campos: [
        numero("imposto-2", "Qual é o imposto do mês no Anexo II — Indústria (F6), em R$?", IMPOSTO_SIMPLES("II"), `${reais(SIMPLES_RBM)} × ${pct(a2.efetiva)}.`),
        numero("imposto-3", "Qual é o imposto do mês no Anexo III — Serviços (F7), em R$?", IMPOSTO_SIMPLES("III"), `${reais(SIMPLES_RBM)} × ${pct(a3.efetiva)}.`),
      ],
      objetivo: "Adaptar as fórmulas para outras tabelas, trocando só os intervalos.",
    },
    {
      id: "menor",
      titulo: "Etapa 5 — Achar o anexo de menor imposto",
      imagem: print("simples-4-resultado", "Consulta com as três linhas preenchidas e OK em verde, contornadas em laranja; embaixo, Menor imposto do mês R$ 3.605,33 e o Anexo I — Comércio, também contornados, com OK.", "As três linhas prontas, e o menor imposto com o anexo dele."),
      passos: [
        "Na célula B9, digite =MÍNIMO(F5:F7). Ela devolve o menor dos três impostos.",
        "Na célula B10, digite =ÍNDICE(A5:A7;CORRESP(B9;F5:F7;0)). O CORRESP acha em qual linha de F5:F7 está o menor valor e o ÍNDICE devolve o nome do anexo que está na mesma linha, na coluna A.",
        "Confira os OK ao lado, em G9 e G10.",
      ],
      aviso: "Esta comparação é só um exercício de planilha. Na vida real, o anexo não é escolhido: é determinado pela atividade da empresa (comércio, indústria ou serviços).",
      campos: [
        numero("menor", "Qual é o menor imposto do mês (B9), em R$?", ESPERADO_SIMPLES.menor, `É o do Anexo ${ESPERADO_SIMPLES.menorAnexo}.`),
        escolher("anexo", "Qual anexo tem o menor imposto?", ANEXOS_SIMPLES.map((a) => `Anexo ${a.id} — ${a.nome}`), ANEXOS_SIMPLES.findIndex((a) => a.id === ESPERADO_SIMPLES.menorAnexo), "As alíquotas de comércio são as menores nessa faixa de faturamento."),
      ],
      objetivo: "Usar MÍNIMO, ÍNDICE e CORRESP para achar um item pelo menor valor.",
    },
    {
      id: "simulacao",
      titulo: "Etapa 6 — Simular um faturamento maior",
      imagem: print("simples-5-simulacao", "Consulta com a RBT12 trocada para R$ 1.200.000,00 e contornada em laranja: as três linhas passam para a faixa 4 e as alíquotas efetivas e os impostos mudam. A coluna Confere? mostra um traço, porque o conferidor só vale para a RBT12 original.", "Trocando a RBT12, a faixa e a alíquota efetiva mudam sozinhas."),
      passos: [
        "Clique na célula B2 e troque 540000 por 1200000. Aperte Enter.",
        "Veja a coluna Faixa: as três linhas passam para 4 (de R$ 720.000,01 a R$ 1.800.000,00).",
        "Confira a nova alíquota efetiva e o novo imposto em cada linha.",
        "A coluna «Confere?» mostra um traço (—): o conferidor só vale para a RBT12 original, de R$ 540.000,00.",
        "Se digitar mais de R$ 4.800.000,00, a planilha recusa: acima disso a empresa não pode mais ser do Simples Nacional.",
        "Volte B2 para 540000 antes de fechar.",
      ],
      campos: [
        numero("faixa", "Com RBT12 de R$ 1.200.000,00, em qual faixa o Anexo I cai?", simulada.faixa, "Entre R$ 720.000,01 e R$ 1.800.000,00 é a 4ª faixa.", 0),
        numero("efetiva-nova", "Qual é a alíquota efetiva do Anexo I com essa RBT12, em %?", Number((simulada.efetiva * 100).toFixed(4)), `(${reais(nova)} × ${pct(simulada.nominal / 100, 2)} − ${reais(simulada.deduzir)}) ÷ ${reais(nova)} = ${pct(simulada.efetiva)}.`, 0.01),
        numero("imposto-novo", "Qual é o novo imposto do mês no Anexo I, com a mesma RBM, em R$?", Number((SIMPLES_RBM * simulada.efetiva).toFixed(2)), `${reais(SIMPLES_RBM)} × ${pct(simulada.efetiva)}.`),
      ],
      desafio: "Teste uma RBT12 de exatamente R$ 360.000,00 e outra de R$ 360.000,01. Em qual faixa cai cada uma? O que isso mostra sobre a coluna A da tabela?",
      objetivo: "Ver a faixa e a alíquota efetiva mudarem junto com a RBT12.",
    },
  ],
};

export default atividade;
