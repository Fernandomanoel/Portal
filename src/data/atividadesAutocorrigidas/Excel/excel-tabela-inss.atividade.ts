import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/excel-tabela-inss.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Excel Básico — Cálculo do INSS",
  introducao: "Excel Básico",
  itens: [
    {
      id: "o-que-voce-ira-fazer",
      titulo: "O que você irá fazer",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Criar uma tabela no Excel",
            "Calcular o desconto do INSS",
            "Usar fórmulas simples",
            "Trabalhar com porcentagem",
          ],
        },
        {
          tipo: "texto",
          texto: "Você fará a sua planilha desta forma, primeiro escreva! Depois deixe bonito.",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C","D","E"],
          linhas: [
            ["1","INSS","","","",""],
            ["2","","","","",""],
            ["3","FUNCIONÁRIOS","SALÁRIO","INSS (%)","DESCONTO INSS","SALÁRIO LÍQUIDO"],
            ["4","ANA CLAUDIA","R$ 1.200,00","7,50%","",""],
            ["5","JOÃO EPAMINONDAS","R$ 1.800,00","9%","",""],
            ["6","JOCICLEIDE JONATAS","R$ 2.800,00","12%","",""],
            ["7","PEDRO CAMARA","R$ 3.500,00","14%","",""],
            ["8","CHICO BILL","R$ 1.518,00","7,50%","",""],
            ["9","","","","",""],
          ],
        },
      ],
    },
    {
      id: "primeiro-passo",
      titulo: "Primeiro passo",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Mescle a primeira linha do A1 até o E1",
            "Após mesclar as células, pinte as mesmas na cor azul no ícone de preenchimento",
            "Na coluna onde está \"SALÁRIO\", coloque os valores em R$, NÃO ESCREVA!",
            "Selecione a coluna onde estão os números e aperte em Página Inicial, procure a aba Número;",
            "Aperte na caixa onde está escrito \"Geral\", aperte na setinha para baixo, e coloque em Moeda ou em Contábil",
          ],
        },
      ],
    },
    {
      id: "segundo-passo-formulas",
      titulo: "Segundo passo (Fórmulas)",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Na coluna Desconto INSS, você colocará a fórmula = B4 * C4",
            "B4 é o salário",
            "C4 é a porcentagem do INSS",
            "Já o * (Asterisco), é a multiplicação dos valores, ou seja, se o salário é de 1500 e a porcentagem do INSS é 7,5%, vai haver a multiplicação de:",
            "1500 (Salário) * (Multiplicação) 7,5% (Porcentagem do INSS), sendo o resultado = 112,50",
          ],
        },
        {
          tipo: "codigo",
          conteudo: "= B4 * C4",
        },
      ],
    },
    {
      id: "desconto-do-salario",
      titulo: "Desconto do salário",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Na coluna Salário Líquido, você colocará a fórmula = B4 – D4",
            "B4 é o salário",
            "D4 é o valor descontado da fórmula passada",
            "O sinal - (menos) significa subtração, ou seja, você vai tirar o valor do desconto do salário.",
          ],
        },
        {
          tipo: "codigo",
          conteudo: "= B4 – D4",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Exemplo",
          texto: "Se o salário é 1500 e o desconto do INSS é 112,50, então: 1500 (Salário Bruto) – 112,50 (Desconto do INSS) Resultado = 1.387,50 Esse será o salário líquido do funcionário.",
        },
      ],
    },
  ],
};

export default atividade;
