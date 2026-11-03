import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { PLANO } from "../dadosContabilidade";
import { escolher, numero, planilhaDe, print, sintetica } from "../contabilidadeComum";

const sinteticas = PLANO.filter(([, , t]) => t === "S").length;
const analiticas = PLANO.filter(([, , t]) => t === "A").length;
const filhasDe = (codigo: string) => PLANO.filter(([c]) => c.startsWith(`${codigo}.`) && c.split(".").length === codigo.split(".").length + 1).length;

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Contabilidade — Plano de Contas: Conta Sintética ou Analítica",
  introducao:
    "Toda contabilidade começa por uma lista organizada de contas: o plano de contas. Aqui você trabalha numa planilha com o plano de contas completo de uma empresa (108 contas) e classifica cada uma como Sintética (S) ou Analítica (A). A planilha corrige você na hora. O passo a passo, com figuras da própria planilha, está nesta página.",
  itens: [
    {
      id: "o-que-e",
      titulo: "Antes de começar — o que é um plano de contas",
      cenario:
        "A contadora da empresa precisa registrar tudo o que acontece: venda, compra, pagamento, imposto. Para não virar bagunça, cada tipo de coisa tem um «gaveteiro» com número e nome: uma conta. O conjunto organizado de todas as contas é o plano de contas.",
      imagem: print("plano-4-cores", "Trecho do plano de contas com o grupo Passivo em laranja: contas de títulos em negrito e, abaixo delas, as contas com números mais longos.", "Cada grupo tem a sua cor. Quanto mais longo o número, mais detalhada a conta."),
      blocos: [
        { tipo: "subtitulo", texto: "Os três grandes grupos" },
        {
          tipo: "tabela",
          colunas: ["Número", "Grupo", "Cor na planilha", "O que guarda"],
          linhas: [
            ["1", "ATIVO", "Azul", "O que a empresa tem e vai render: dinheiro, estoque, clientes que vão pagar, máquinas."],
            ["2", "PASSIVO E PATRIMÔNIO LÍQUIDO", "Laranja", "O que a empresa deve (fornecedores, impostos, empréstimos) e o que é dos sócios (capital)."],
            ["3", "RESULTADO DAS RECEITAS, CUSTOS E DESPESAS", "Verde (receitas) e vermelho (custos e despesas)", "O que a empresa ganhou e gastou no período: o resultado, lucro ou prejuízo."],
          ],
        },
        { tipo: "subtitulo", texto: "Como o número conta uma história" },
        {
          tipo: "texto",
          texto:
            "O número da conta tem níveis separados por ponto. 1 é o Ativo; 1.1 é o Ativo Circulante (o que vira dinheiro logo); 1.1.1 é Caixa, bancos e equivalentes; 1.1.1.02 é Contas bancárias. Cada ponto a mais é um detalhe a mais, como pasta, subpasta e arquivo no computador.",
        },
        { tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "Um plano organizado deixa qualquer contador do país ler a contabilidade da empresa: o 1.1.1.02 sempre significa o mesmo lugar. Sem isso, cada empresa teria a sua língua." },
      ],
      campos: [escolher("grupo-resultado", "Qual grupo do plano guarda as receitas, os custos e as despesas?", ["1 — Ativo", "2 — Passivo e Patrimônio Líquido", "3 — Resultado das receitas, custos e despesas"], 2, "É o grupo 3: ele mostra se a empresa teve lucro ou prejuízo no período.")],
    },
    {
      id: "baixar",
      titulo: "Etapa 1 — Baixar a planilha e conhecer a tela",
      download: planilhaDe("plano-de-contas-para-classificar.xlsx", "Abas Leia-me e Aula 13 (o plano de contas com 108 contas, a coluna amarela para você preencher e o placar)."),
      imagem: print("plano-1-planilha", "Planilha do plano de contas: à esquerda os números e nomes das contas em faixas de azul, à direita uma coluna amarela marcada em laranja para preencher com S ou A.", "A coluna amarela (em laranja) é onde você trabalha. Todo o resto a planilha faz sozinha."),
      passos: [
        "Clique em «Baixar planilha» e abra o arquivo no Excel. Se aparecer a faixa amarela «Modo de Exibição Protegido», clique em Habilitar Edição.",
        "Salve uma cópia com o seu nome (Arquivo > Salvar como), por exemplo Plano de contas - Maria.xlsx, e trabalhe nela.",
        "Clique na aba «Aula 13». À esquerda estão os números das contas (colunas A a D) e os nomes (coluna E).",
        "Olhe a coluna amarela: é a única em que você digita. No topo está escrito «Preencha com S para Sintética ou A para Analítica».",
        "Repare nas colunas ao lado: uma escreve o tipo por extenso e a outra diz Certo ou Errado. Ficam vazias até você responder.",
      ],
      aviso: "Digite só S ou A, em maiúscula ou minúscula. Qualquer outra letra é recusada pela planilha.",
      objetivo: "Abrir a planilha e saber onde digitar e onde olhar a correção.",
    },
    {
      id: "regra",
      titulo: "Etapa 2 — A regra para reconhecer Sintética e Analítica",
      cenario:
        "Conta sintética é a que apenas agrupa: ela é um título, e o saldo dela é a soma das contas que estão embaixo. Nela o contador nunca lança nada. Conta analítica é a ponta da árvore: não tem nenhuma conta embaixo, e é nela que se registram os lançamentos.",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["", "Sintética (S)", "Analítica (A)"],
          linhas: [
            ["Função", "Agrupa e soma", "Recebe os lançamentos"],
            ["Tem contas embaixo?", "Sim", "Não"],
            ["Nível do número", "Curto (1, 1.1, 1.1.1)", "Mais longo (1.1.1.02)"],
            ["Exemplo", "1.1.1 Caixa, bancos e equivalentes", "1.1.1.02 Contas bancárias"],
          ],
        },
        { tipo: "subtitulo", texto: "O teste dos três segundos" },
        {
          tipo: "lista",
          numerada: true,
          itens: [
            "Olhe o número da conta, por exemplo 1.1.2.",
            "Procure logo abaixo se existe alguma conta cujo número começa com o dele seguido de ponto: 1.1.2.01, 1.1.2.02, 1.1.2.03.",
            "Achou? Então é Sintética (S). Não achou nenhuma? Então é Analítica (A).",
          ],
        },
        { tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "É por isso que o lançamento só vale em conta analítica: se você lançasse numa sintética, o valor ficaria «sem gaveta» e o relatório não fecharia. As contas de cima só mostram o total das de baixo." },
      ],
      instrucao: "Aplique o teste dos três segundos. Marque S ou A para cada conta do plano.",
      campos: [
        sintetica("c-1-1-2", "1.1.2 — Contas a receber (abaixo dela há 1.1.2.01, 1.1.2.02 e 1.1.2.03)", "S", `Tem ${filhasDe("1.1.2")} contas embaixo: é Sintética.`),
        sintetica("c-1-1-2-01", "1.1.2.01 — Clientes (não tem nenhuma conta embaixo)", "A", "Não tem contas embaixo: é Analítica, e é nela que se lança a venda a prazo."),
        sintetica("c-2-1-3-02", "2.1.3.02 — ICMS", "A", "Ponta da árvore: é Analítica."),
        sintetica("c-3-1-1", "3.1.1 — Receitas operacionais", "S", "Agrupa as contas de venda de mercadorias, de serviços e as deduções: é Sintética."),
      ],
      objetivo: "Aplicar a regra «tem conta embaixo? então é Sintética» antes de preencher a planilha.",
    },
    {
      id: "primeiras",
      titulo: "Etapa 3 — Preencher as primeiras contas",
      imagem: print("plano-2-acerto", "Planilha com as primeiras oito contas já respondidas: S nas contas de título e A nas contas de detalhe; ao lado, o tipo por extenso e a palavra Certo em verde. A conta Caixa está contornada em laranja.", "Respondido certo: a planilha escreve «Conta Analítica» e pinta «Certo» de verde."),
      passos: [
        "Clique na célula amarela da conta 1 — ATIVO e digite S. Aperte Enter: o cursor desce para a conta seguinte.",
        "Em 1.1 — ATIVO CIRCULANTE, digite S. Enter.",
        "Em 1.1.1 — Caixa, bancos e equivalentes, digite S. Enter. Tem três contas embaixo (1.1.1.01 a 1.1.1.03).",
        "Em 1.1.1.01 — Caixa, digite A. Enter. Faça o mesmo em 1.1.1.02 e 1.1.1.03: nenhuma tem contas embaixo.",
        "Em 1.1.2 — Contas a receber, digite S. Em 1.1.2.01 — Clientes, digite A.",
        "A cada resposta, olhe as duas colunas ao lado: «Conta Sintética/Analítica» confirma o que você digitou e «Certo» (verde) ou «Errado» (vermelho) corrige.",
      ],
      campos: [numero("filhas-caixa", "Quantas contas analíticas existem embaixo de 1.1.1 — Caixa, bancos e equivalentes?", filhasDe("1.1.1"), "São 1.1.1.01 Caixa, 1.1.1.02 Contas bancárias e 1.1.1.03 Contas de movimento.", 0)],
      objetivo: "Preencher as primeiras contas e ver a correção aparecer na hora.",
    },
    {
      id: "errado",
      titulo: "Etapa 4 — Quando aparece «Errado»",
      imagem: print("plano-3-erro", "Duas respostas erradas contornadas em laranja: Caixa, bancos e equivalentes respondida como A e Contas bancárias respondida como S, as duas com a palavra Errado em vermelho.", "As duas últimas respostas estão erradas: a planilha pinta «Errado» de vermelho."),
      cenario:
        "Errar faz parte: a planilha existe para você corrigir na hora, sem esperar. Quando a coluna da direita ficar vermelha, não apague tudo: releia o número da conta e refaça o teste dos três segundos.",
      passos: [
        "Ache a linha com «Errado» em vermelho.",
        "Leia o número da conta e olhe as linhas logo abaixo dela: o número dela aparece no começo do número de outras contas?",
        "Se aparece, a conta é S. Se não aparece, é A. Clique na célula amarela, digite a resposta certa e aperte Enter.",
        "Confira: o «Errado» vira «Certo» sozinho.",
        "Se você digitar outra letra (por exemplo X), a planilha avisa «Digite S ou A» em vermelho.",
      ],
      blocos: [
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Como a planilha corrige",
          texto: "Por dentro, cada linha tem uma fórmula SE que compara a sua letra com a resposta certa guardada numa coluna escondida: =SE(F3=\"\";\"\";SE(F3=J3;\"Certo\";\"Errado\")). Lendo: se a célula está vazia, não mostra nada; se a sua resposta for igual à da coluna J, mostra Certo; senão, Errado.",
        },
      ],
      campos: [escolher("o-que-fazer", "A planilha mostrou «Errado» na conta 1.1.1.02 — Contas bancárias, e você tinha digitado S. O que fazer?", ["Trocar para A, porque Contas bancárias não tem contas embaixo", "Deixar como está e seguir adiante", "Apagar a linha da planilha"], 0, "Contas bancárias é ponta da árvore: é Analítica."), ],
      objetivo: "Usar o «Errado» como pista e corrigir sozinho, aplicando a regra.",
    },
    {
      id: "terminar",
      titulo: "Etapa 5 — Terminar o plano e conferir o placar",
      imagem: print("plano-5-placar", "Planilha com o quadro Placar contornado em laranja à direita: 20 certas, 0 erradas e 88 faltando; abaixo, o total de 108 contas, 36 sintéticas e 72 analíticas.", "O Placar, à direita, conta quantas você acertou, errou e quantas faltam."),
      passos: [
        "Continue descendo pelo plano até o fim (conta 3.2.4.03). São 108 contas.",
        "Quando tiver dúvida, use o teste dos três segundos: conta com «filhas» embaixo é S, sem filhas é A.",
        "Olhe o quadro Placar, à direita das colunas amarelas: Certas, Erradas e Faltam se atualizam sozinhos.",
        "Corrija todos os «Errado» até Erradas e Faltam chegarem a 0 e Certas a 108.",
        "No fim do quadro Placar estão os totais do plano: contas no plano, sintéticas e analíticas. Anote os números para responder aqui.",
      ],
      aviso: "O placar só enxerga o que você preencheu. Se Faltam não chegou a zero, ainda há linhas amarelas em branco.",
      campos: [
        numero("total", "Quantas contas tem o plano ao todo?", PLANO.length, "São 108 contas, de 1 — ATIVO até 3.2.4.03.", 0),
        numero("sinteticas", "Quantas são Sintéticas?", sinteticas, "Contas que agrupam: o plano tem 36.", 0),
        numero("analiticas", "Quantas são Analíticas?", analiticas, "Contas que recebem lançamento: 72. Sintéticas + Analíticas dão 108.", 0),
      ],
      objetivo: "Classificar o plano inteiro, chegar a 108 certas e saber quantas contas recebem lançamento.",
    },
    {
      id: "desafio",
      titulo: "Etapa 6 — Para fixar",
      cenario: "Duas últimas perguntas: elas mostram que você entendeu a ideia por trás da planilha, não só decorou as respostas.",
      campos: [
        escolher("lancar", "Em qual tipo de conta o contador faz os lançamentos?", ["Sintética", "Analítica", "Tanto faz"], 1, "Só nas analíticas. As sintéticas mostram a soma delas."),
        escolher("saldo-sintetica", "Como o saldo de uma conta sintética é calculado?", ["Digitado à mão pelo contador", "Somando os saldos das contas que estão embaixo dela", "Copiando o saldo da conta do grupo anterior"], 1, "A conta sintética apenas soma as de baixo, e é por isso que os totais do Ativo, do Passivo e do Resultado aparecem sozinhos."),
      ],
      desafio: "Na planilha, escolha qualquer conta sintética de três níveis (como 2.1.4) e conte a mão quantas contas analíticas ela tem. Depois confira com o que se espera: cada grupo de três níveis tem entre 1 e 7 contas de detalhe.",
      objetivo: "Fixar que o lançamento só entra nas contas analíticas e que as sintéticas somam.",
    },
  ],
};

export default atividade;
