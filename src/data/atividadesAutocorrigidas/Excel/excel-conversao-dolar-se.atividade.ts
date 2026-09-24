import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/excel-conversao-dolar-se.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Convertendo em Dólar e usando o SE",
  introducao: "Excel Básico",
  itens: [
    {
      id: "04-papelaria-papel-branco-conversao-em-dolar",
      titulo: "04) Papelaria Papel Branco — Conversão em Dólar",
      blocos: [
        {
          tipo: "texto",
          texto: "Elaborar as planilhas abaixo, fazendo-se o que se pede:",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C","D","E"],
          linhas: [
            ["1","Valor do Dólar","R$ 2,94","","",""],
            ["2","Papelaria Papel Branco","","","",""],
            ["3","Produtos","Qtde","Preço Unit.","Total R$","Total US$"],
            ["4","Caneta Azul","500","R$ 0,15","",""],
            ["5","Caneta Vermelha","750","R$ 0,15","",""],
            ["6","Caderno","250","R$ 10,00","",""],
            ["7","Régua","310","R$ 0,50","",""],
            ["8","Lápis","500","R$ 0,10","",""],
            ["9","Papel Sulfite","1500","R$ 2,50","",""],
            ["10","Tinta Nanquim","190","R$ 6,00","",""],
          ],
        },
        {
          tipo: "subtitulo",
          texto: "Fórmulas",
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "",
          itens: [
            "Total R$: multiplicar Qtde por Preço Unitário",
            "Total US$: dividir Total R$ por Valor do Dólar — usar $ nas fórmulas",
            "Alterar as colunas de acordo com a necessidade.",
          ],
        },
        {
          tipo: "texto",
          texto: "Ou seja, para a linha da Caneta Azul (linha 4), as fórmulas ficam assim:",
        },
        {
          tipo: "texto",
          texto: "*",
        },
        {
          tipo: "lista",
          itens: ["Total R$ (D4): multiplica a Qtde (B4) pelo Preço Unitário (C4)."],
        },
        {
          tipo: "texto",
          texto: "/",
        },
        {
          tipo: "lista",
          itens: [
            "Total US$ (E4): divide o Total R$ (D4) pelo Valor do Dólar em B1, usando $B$1 (referência absoluta) para poder arrastar a fórmula para as outras linhas sem perder a referência da célula do dólar.",
          ],
        },
        {
          tipo: "nota",
          variante: "aviso",
          rotulo: "Importante",
          texto: "$B$1",
        },
      ],
    },
    {
      id: "05-folha-de-pagamento-aumento-com-se",
      titulo: "05) Folha de Pagamento — Aumento com SE",
      blocos: [
        {
          tipo: "texto",
          texto: "Elaborar a planilha abaixo, fazendo-se o que se pede:",
        },
        {
          tipo: "texto",
          texto: "Fazer uma folha de pagamento e calcular o novo salário, baseado no aumento. Se o salário for menor ou igual a R$ 1.000,00, aumento de 40%. Se for maior que R$ 1.000,00, aumento de 30%. Os valores R$ 360,00 e R$ 1.260,00 da primeira linha também deverão ser calculados....",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C","D","E","F","G"],
          linhas: [
            ["1","Nome","Salário","Aumento","Novo Salário","","Até 1000,00","40%"],
            ["2","João dos Santos","R$ 900,00","R$ 360,00","R$ 1.260,00","","mais 1000,00","30%"],
            ["3","Maria da Silva","R$ 1.200,00","","","","",""],
            ["4","Manoel das Flores","R$ 1.500,00","","","","",""],
            ["5","Lambarildo Peixe","R$ 2.000,00","","","","",""],
            ["6","Sebastião Souza","R$ 1.400,00","","","","",""],
            ["7","Ana Flávia Silveira","R$ 990,00","","","","",""],
            ["8","Silvia Helena Santos","R$ 854,00","","","","",""],
            ["9","Alberto Roberto","R$ 1.100,00","","","","",""],
          ],
        },
        {
          tipo: "subtitulo",
          texto: "Estrutura da Fórmula SE",
        },
        {
          tipo: "codigo",
          conteudo: "=SE(teste_lógico;valor_se_verdadeiro;valor_se_falso)",
        },
        {
          tipo: "texto",
          texto: "Aplicando a regra \"até R$ 1.000,00 → 40% de aumento, acima de R$ 1.000,00 → 30% de aumento\" na coluna Aumento (linha 2):",
        },
        {
          tipo: "codigo",
          conteudo: "=SE(B2<=1000;B2*40%;B2*30%)",
        },
        {
          tipo: "texto",
          texto: "E o Novo Salário (coluna D) é o Salário mais o Aumento:",
        },
        {
          tipo: "codigo",
          conteudo: "=B2+C2",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Conferindo a primeira linha",
          texto: "João dos Santos ganha R$ 900,00 (menor que R$ 1.000,00), então o aumento é de 40%: 900 × 40% = R$ 360,00. Novo salário: 900 + 360 = R$ 1.260,00 — exatamente os valores já preenchidos na tabela.",
        },
        {
          tipo: "texto",
          texto: "Depois é só arrastar as duas fórmulas (Aumento e Novo Salário) para as demais linhas, do funcionário Maria da Silva até Alberto Roberto.",
        },
      ],
    },
  ],
};

export default atividade;
