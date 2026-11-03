import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { reais } from "../ajudantes";
import { AULA_14, fechamento, saldos } from "../dadosContabilidade";
import { escolher, numero, planilhaDe, print } from "../contabilidadeComum";

const ate = (n: number) => saldos(AULA_14.slice(0, n));
const fim = fechamento(AULA_14);
const final = ate(AULA_14.length);

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Contabilidade — Lançamentos na Planilha: Compra e Venda da Walking Pet",
  introducao:
    "A Walking Pet é uma loja de produtos para animais. Neste primeiro dia de contabilidade de verdade você registra, na planilha, sete fatos de uma compra e de duas vendas de kits beleza, usando o método das partidas dobradas: todo fato tem um valor, uma conta que recebe (débito) e uma conta que dá (crédito). A planilha confere cada lançamento e calcula sozinha o saldo de todas as contas.",
  itens: [
    {
      id: "partidas-dobradas",
      titulo: "Antes de começar — débito e crédito sem mistério",
      cenario:
        "No dia a dia, «crédito» e «débito» soam como cartão. Na contabilidade são só dois lados da mesma folha: o esquerdo (débito) e o direito (crédito). Cada fato que acontece na empresa mexe em pelo menos duas contas, uma de cada lado, sempre pelo mesmo valor. Por isso o método se chama partidas dobradas.",
      blocos: [
        { tipo: "subtitulo", texto: "Quando cada tipo de conta aumenta" },
        {
          tipo: "tabela",
          colunas: ["Tipo de conta", "Exemplo", "Aumenta com", "Diminui com"],
          linhas: [
            ["Ativo (o que a empresa tem)", "Contas bancárias, Clientes, Estoque", "Débito", "Crédito"],
            ["Passivo (o que a empresa deve)", "Fornecedores, ICMS a pagar", "Crédito", "Débito"],
            ["Receita (o que a empresa ganha)", "Venda de mercadorias", "Crédito", "Débito"],
            ["Custo e despesa (o que a empresa gasta)", "Custo das mercadorias, tarifas", "Débito", "Crédito"],
          ],
        },
        { tipo: "subtitulo", texto: "A pergunta que resolve todo lançamento" },
        {
          tipo: "lista",
          numerada: true,
          itens: [
            "Quanto foi? (o valor do fato)",
            "Qual conta AUMENTOU ou RECEBEU alguma coisa? Quando é Ativo ou despesa, ela vai a DÉBITO.",
            "Qual conta DEU ou passou a DEVER? Quando é Passivo ou receita, ela vai a CRÉDITO.",
          ],
        },
        { tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "O valor é igual nos dois lados. Assim a conta sempre fecha: tudo o que a empresa TEM (Ativo) vem de dívida com terceiros (Passivo), de dinheiro dos sócios (Patrimônio Líquido) ou do lucro (Resultado)." },
      ],
      instrucao: "Teste a regra com o primeiro fato do dia.",
      campos: [escolher("estoque-debito", "A Walking Pet comprou mercadoria e o ESTOQUE (Ativo) aumentou. Em que lado se lança o estoque?", ["Débito", "Crédito"], 0, "Ativo aumenta a débito. A dívida com o fornecedor, que é Passivo, aumenta a crédito.")],
    },
    {
      id: "baixar",
      titulo: "Etapa 1 — Baixar a planilha e conhecer as colunas",
      download: planilhaDe("walking-pet-aula-14-para-lancar.xlsx", "Abas Leia-me e Aula 14: o plano de contas com saldos automáticos à esquerda e os 7 fatos da Walking Pet à direita, para você lançar."),
      imagem: print("a14-1-lancamentos", "Área de lançamentos da planilha: sete fatos em roxo, cada um com colunas Valor, Conta a debitar e Conta a creditar. As células de valor, débito e crédito do primeiro fato estão contornadas em laranja.", "Você digita nas três células contornadas. As colunas «OK» ao lado conferem."),
      passos: [
        "Clique em «Baixar planilha», abra no Excel e habilite a edição. Salve uma cópia com o seu nome.",
        "Abra a aba «Aula 14». À esquerda (colunas A a F) está o plano de contas, com os saldos em R$. À direita (colunas H a N) estão os lançamentos.",
        "Coluna H, em roxo: o fato que aconteceu na empresa. Você lê e decide o lançamento.",
        "Coluna I, em lilás: o valor. Coluna K, em vermelho: o número da conta a DEBITAR. Coluna M, em verde: o número da conta a CREDITAR.",
        "As colunas J, L e N, ao lado de cada uma, dizem OK (verde) ou Errado (vermelho) assim que você digita.",
        "Para achar o número de uma conta, procure o nome dela na coluna E, à esquerda, e leia o número na coluna D. Só vale conta de quatro níveis (analítica), como 1.1.3.02.",
      ],
      aviso: "Não digite nas colunas de saldo (F) nem nas de OK. São fórmulas, e a planilha as atualiza sozinha.",
      objetivo: "Saber o que cada coluna faz antes de lançar.",
    },
    {
      id: "compra",
      titulo: "Etapa 2 — Primeiro fato: comprar 100 kits a prazo",
      cenario: `Fato 1: «${AULA_14[0].texto}».`,
      imagem: print("a14-2-primeiro", "Primeira linha de lançamentos preenchida e contornada em laranja: valor 3.000,00, débito 1.1.3.02 e crédito 2.1.1.01, as três com OK em verde.", "Lançamento 1 certo: as três colunas de conferência ficam verdes."),
      passos: [
        "Calcule o valor: 100 kits × R$ 30,00 = R$ 3.000,00. Digite 3000 na célula de Valor (coluna I) do fato 1.",
        "O que aumentou? O estoque da loja, que é Ativo. Procure «Produtos acabados» no plano: é a conta 1.1.3.02. Digite 1.1.3.02 em Conta a debitar (coluna K).",
        "O que a empresa passou a dever? Ela ficou devendo R$ 3.000,00 ao fornecedor: «Fornecedores nacionais», conta 2.1.1.01. Digite 2.1.1.01 em Conta a creditar (coluna M).",
        "Aperte Enter e olhe as três colunas de conferência: precisam ficar com OK em verde.",
      ],
      blocos: [
        {
          tipo: "tabela",
          colunas: ["Conta", "Tipo", "O que aconteceu", "Lado"],
          linhas: [
            ["1.1.3.02 Produtos acabados", "Ativo", "Entrou estoque: aumentou", "Débito"],
            ["2.1.1.01 Fornecedores nacionais", "Passivo", "Surgiu uma dívida: aumentou", "Crédito"],
          ],
        },
      ],
      campos: [numero("passivo-1", "Depois do fato 1, qual é o saldo de Fornecedores nacionais (2.1.1.01) no plano de contas, em R$?", ate(1)["2.1.1.01"], `${reais(3000)}: a dívida com o fornecedor. Olhe a coluna F, ao lado do nome da conta.`)],
      objetivo: "Fazer o primeiro lançamento de partidas dobradas e ver os saldos reagirem.",
    },
    {
      id: "saldos",
      titulo: "Etapa 3 — Os saldos se atualizam sozinhos",
      imagem: print("a14-3-saldo-estoque", "Coluna de saldos do plano de contas, só com quatro linhas visíveis: ATIVO, Produtos acabados, PASSIVO E PATRIMÔNIO LÍQUIDO e Fornecedores nacionais, todas com R$ 3.000,00. As contas Produtos acabados e Fornecedores nacionais estão contornadas em laranja.", "Dois lados do mesmo fato: o estoque (Ativo) e a dívida (Passivo) valem R$ 3.000,00 cada."),
      passos: [
        "Na coluna F, procure a conta 1.1.3.02 — Produtos acabados: ela mostra R$ 3.000,00.",
        "Suba pela coluna F: as contas sintéticas (1.1.3 Estoques, 1.1 Ativo Circulante e 1 ATIVO) também passaram a mostrar R$ 3.000,00, porque somam as de baixo.",
        "Desça até 2.1.1.01 — Fornecedores nacionais: R$ 3.000,00. E o total PASSIVO E PATRIMÔNIO LÍQUIDO (conta 2) também subiu.",
        "Repare: Ativo (R$ 3.000,00) e Passivo (R$ 3.000,00) estão iguais. É o equilíbrio das partidas dobradas.",
      ],
      blocos: [
        { tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "Cada saldo é calculado por uma fórmula SOMASE que soma todos os lançamentos em que o número da conta aparece como débito e subtrai os em que aparece como crédito. Você nunca digita um saldo: só lança fatos." },
      ],
      campos: [escolher("equilibrio", "Depois do fato 1, Ativo e Passivo estão iguais (R$ 3.000,00 cada). Isso mostra que...", ["os dois lados do lançamento têm o mesmo valor", "a empresa ganhou R$ 3.000,00 de lucro", "o estoque é uma dívida"], 0, "O lançamento mexeu em duas contas pelo mesmo valor, e por isso o Ativo e o Passivo cresceram juntos. Lucro só aparece quando há venda.")],
      objetivo: "Entender que o saldo das contas é consequência dos lançamentos.",
    },
    {
      id: "venda-vista",
      titulo: "Etapa 4 — Venda à vista e a baixa do estoque",
      cenario: `Fato 2: «${AULA_14[1].texto}». Fato 3: «${AULA_14[2].texto}».`,
      imagem: print("a14-4-venda", "Quatro linhas de lançamentos preenchidas, com os fatos 2 e 3 contornados em laranja: venda de 50,00 (débito 1.1.1.02, crédito 3.1.1.01) e baixa de 30,00 (débito 3.2.1.01, crédito 1.1.3.02).", "Toda venda de mercadoria vira dois lançamentos: um pelo preço e outro pelo custo."),
      passos: [
        "Fato 2 (a venda): valor 50. O dinheiro entrou na conta do banco, que é Ativo e aumenta: debite 1.1.1.02 — Contas bancárias. A venda é uma receita, que aumenta a crédito: credite 3.1.1.01 — Venda de mercadorias.",
        "Fato 3 (o estoque saiu): valor 30, o que o kit custou. O estoque diminuiu, e Ativo diminui a crédito: credite 1.1.3.02 — Produtos acabados.",
        "Esse custo é uma despesa da venda: ela aumenta a débito. Debite 3.2.1.01 — Custos dos insumos/produtos.",
        "Confira os OK. Depois olhe os saldos: Contas bancárias R$ 50,00; Produtos acabados caiu de R$ 3.000,00 para R$ 2.970,00.",
      ],
      blocos: [
        {
          tipo: "tabela",
          colunas: ["Fato", "Débito", "Crédito", "Valor"],
          linhas: [
            ["2 — Venda à vista", "1.1.1.02 Contas bancárias", "3.1.1.01 Venda de mercadorias", reais(50)],
            ["3 — Baixa do estoque", "3.2.1.01 Custos dos insumos/produtos", "1.1.3.02 Produtos acabados", reais(30)],
          ],
        },
        { tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "A venda registra o que a empresa GANHOU (R$ 50,00). A baixa registra o que a empresa GASTOU para vender (R$ 30,00). A diferença, R$ 20,00, é o lucro bruto do kit. Sem a baixa, a loja pensaria que ainda tem o kit na prateleira." },
      ],
      campos: [
        numero("banco-2", "Depois do fato 2, qual é o saldo de Contas bancárias (1.1.1.02), em R$?", ate(2)["1.1.1.02"], "O cliente depositou R$ 50,00 na conta da loja."),
        numero("estoque-3", "Depois do fato 3, qual é o saldo de Produtos acabados (1.1.3.02), em R$?", ate(3)["1.1.3.02"], "R$ 3.000,00 − R$ 30,00 = R$ 2.970,00."),
      ],
      objetivo: "Registrar uma venda e a baixa do estoque, dois lançamentos para um mesmo fato.",
    },
    {
      id: "venda-prazo",
      titulo: "Etapa 5 — Venda a prazo no cartão",
      cenario: `Fato 4: «${AULA_14[3].texto}». Fato 5: «${AULA_14[4].texto}».`,
      imagem: print("a14-4b-cartao", "Cinco linhas de lançamentos preenchidas, com os fatos 4 e 5 contornados em laranja: venda a prazo de 50,00 (débito 1.1.2.01, crédito 3.1.1.01) e nova baixa de 30,00.", "Venda a prazo: o dinheiro ainda não entrou, mas o cliente já deve. Isso é uma conta a receber."),
      passos: [
        "Fato 4: valor 50. O dinheiro ainda NÃO está no banco: o cliente passou a dever à loja. Isso é Ativo (um direito a receber). Debite 1.1.2.01 — Clientes.",
        "A venda continua sendo receita. Credite 3.1.1.01 — Venda de mercadorias.",
        "Fato 5: de novo a baixa do estoque, igual à do fato 3. Valor 30, débito 3.2.1.01 e crédito 1.1.3.02.",
        "Confira os OK e o saldo de Clientes (1.1.2.01): R$ 50,00.",
      ],
      aviso: "A receita é reconhecida quando a venda acontece, mesmo que o dinheiro só chegue depois. É por isso que a conta debitada aqui é Clientes e não o banco.",
      campos: [
        numero("clientes-4", "Depois do fato 4, qual é o saldo de Clientes (1.1.2.01), em R$?", ate(4)["1.1.2.01"], "O cartão ainda vai pagar R$ 50,00: é um valor a receber."),
        numero("estoque-5", "Depois do fato 5, qual é o saldo de Produtos acabados (1.1.3.02), em R$?", ate(5)["1.1.3.02"], "R$ 2.970,00 − R$ 30,00 = R$ 2.940,00: restam 98 kits no estoque."),
      ],
      objetivo: "Diferenciar venda à vista (banco) e venda a prazo (Clientes).",
    },
    {
      id: "tarifa",
      titulo: "Etapa 6 — Tarifa do cartão e recebimento",
      cenario: `Fato 6: «${AULA_14[5].texto}». Fato 7: «${AULA_14[6].texto}».`,
      imagem: print("a14-4c-tarifa", "Sete linhas de lançamentos preenchidas, com os fatos 6 e 7 contornados em laranja: tarifa de 0,50 (débito 3.2.3.02, crédito 1.1.1.02) e recebimento de 50,00 (débito 1.1.1.02, crédito 1.1.2.01).", "Os dois últimos fatos fecham a venda no cartão."),
      passos: [
        "Fato 6 (a tarifa): calcule 1% de R$ 50,00 = R$ 0,50. Digite 0,5 em Valor.",
        "A tarifa é uma despesa financeira e aumenta a débito. Debite 3.2.3.02 — Outros tipos de despesa financeira (tarifas, etc).",
        "O dinheiro saiu da conta do banco, que é Ativo e diminui a crédito. Credite 1.1.1.02 — Contas bancárias.",
        "Fato 7 (o recebimento): valor 50. O dinheiro finalmente entrou no banco: debite 1.1.1.02 — Contas bancárias. O cliente deixou de dever: credite 1.1.2.01 — Clientes.",
        "Confira que todos os OK estão verdes. O saldo de Clientes voltou a zero.",
      ],
      campos: [
        numero("tarifa", "Qual é o valor da tarifa de 1% sobre a venda de R$ 50,00, em R$?", AULA_14[5].valor, "1% de 50 = 50 × 0,01 = R$ 0,50."),
        numero("banco-7", "Depois dos 7 fatos, qual é o saldo de Contas bancárias (1.1.1.02), em R$?", final["1.1.1.02"], "R$ 50,00 da venda à vista − R$ 0,50 de tarifa + R$ 50,00 do cartão = R$ 99,50."),
      ],
      objetivo: "Registrar uma despesa financeira e a baixa de uma conta a receber.",
    },
    {
      id: "errado",
      titulo: "Etapa 7 — Quando aparece «Errado»",
      imagem: print("a14-5-erro", "Fato 3 lançado com débito 1.1.3.02 e crédito 3.2.1.01 (invertidos), contornado em laranja: as colunas de débito e de crédito mostram Errado em vermelho.", "Débito e crédito trocados de lugar: a planilha acusa nas duas colunas."),
      passos: [
        "Quando uma coluna de conferência ficar vermelha, não adivinhe: volte ao fato e pergunte «qual conta aumentou e qual conta deu?».",
        "Se as DUAS colunas (débito e crédito) ficaram vermelhas e os números parecem corretos, provavelmente você os inverteu. Troque o número de uma coluna pelo da outra.",
        "Se só o Valor ficou vermelho, refaça a conta. Lembre: 100 kits × R$ 30,00, 1% de R$ 50,00.",
        "Se a conta do débito ou do crédito for de outro grupo (por exemplo, uma despesa no lugar de um Ativo), revise a tabela «Quando cada tipo de conta aumenta» no começo desta atividade.",
      ],
      campos: [escolher("invertido", "Na baixa do estoque você digitou débito 1.1.3.02 e crédito 3.2.1.01 e as duas colunas ficaram vermelhas. O que fazer?", ["Trocar os dois números de lugar: débito 3.2.1.01 e crédito 1.1.3.02", "Mudar o valor", "Apagar o fato"], 0, "O estoque diminuiu (Ativo diminui a crédito) e o custo aumentou (despesa aumenta a débito). Os números estavam certos, mas nos lados errados.")],
      objetivo: "Interpretar o «Errado» e corrigir um lançamento invertido.",
    },
    {
      id: "conferencia",
      titulo: "Etapa 8 — Conferir os totais",
      imagem: print("a14-6-conferencia", "Os sete lançamentos prontos, todos com OK verde, e embaixo o quadro O saldo do ATIVO, do PASSIVO e do RESULTADO, contornado em laranja, com a palavra Correto nas três linhas.", "Embaixo da lista, três conferências dizem «Correto» quando os totais batem."),
      passos: [
        "Olhe as sete linhas: todas as colunas precisam estar com OK em verde.",
        "Logo abaixo, no quadro «O saldo do ATIVO / PASSIVO / RESULTADO ainda está», as três linhas precisam dizer Correto.",
        "Se alguma disser Errado, volte e ache o lançamento com erro: um OK vermelho ou um lançamento ainda em branco.",
      ],
      campos: [
        numero("ativo", "Qual é o saldo do ATIVO (conta 1), em R$?", fim.ativo, "R$ 99,50 no banco + R$ 2.940,00 de estoque + clientes zerado."),
        numero("passivo", "Qual é o saldo do PASSIVO E PATRIMÔNIO LÍQUIDO (conta 2), em R$?", fim.passivo + fim.patrimonio, "Só a dívida com o fornecedor: R$ 3.000,00."),
        numero("resultado", "Qual é o saldo do RESULTADO (conta 3), em R$?", fim.resultado, "Receitas R$ 100,00 − custos R$ 60,00 − tarifa R$ 0,50 = R$ 39,50 de lucro."),
      ],
      objetivo: "Conferir Ativo, Passivo e Resultado depois de todos os lançamentos.",
    },
    {
      id: "equacao",
      titulo: "Etapa 9 — A conta que sempre fecha",
      imagem: print("a14-7-saldos-finais", "Coluna de saldos finais com dez contas visíveis: ATIVO 3.039,50; Contas bancárias 99,50; Clientes zerado; Produtos acabados 2.940,00; PASSIVO E PL 3.000,00; Fornecedores nacionais 3.000,00; RESULTADO 39,50; Venda de mercadorias 100,00; Custos 60,00 e tarifas 0,50.", "Os saldos finais de cada grupo de contas."),
      cenario: `Compare os totais: Ativo ${reais(fim.ativo)}, Passivo ${reais(fim.passivo)} e Resultado ${reais(fim.resultado)}. Ativo (${reais(fim.ativo)}) = Passivo (${reais(fim.passivo)}) + Resultado (${reais(fim.resultado)}). Essa é a equação contábil: tudo o que a empresa tem vem de dívida ou de lucro.`,
      blocos: [
        { tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "Se a equação não fecha, há lançamento errado ou faltando. Por isso o contador, ao fim do mês, confere Ativo = Passivo + Patrimônio Líquido + Resultado antes de entregar qualquer relatório." },
      ],
      campos: [numero("lucro-bruto-kit", "Cada kit foi vendido por R$ 50,00 e custou R$ 30,00. Qual foi o lucro bruto de cada kit, em R$?", AULA_14[1].valor - AULA_14[2].valor, "R$ 50,00 − R$ 30,00 = R$ 20,00. Os dois kits renderam R$ 40,00 de lucro bruto; tirando a tarifa de R$ 0,50, sobram os R$ 39,50 do resultado.")],
      desafio: `Na planilha, troque o valor do fato 1 de ${reais(3000)} para ${reais(3500)} (e confira o que acontece com os OK e com os totais). Depois desfaça. A equação continua fechando?`,
      objetivo: "Entender que Ativo = Passivo + Resultado e usar isso para conferir a contabilidade.",
    },
  ],
};

export default atividade;
