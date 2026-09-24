import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/excel-procv.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade de Excel Avançado I — PROCV",
  introducao: "Excel Avançado",
  itens: [
    {
      id: "o-que-e-o-procv",
      titulo: "O que é o PROCV",
      blocos: [
        {
          tipo: "texto",
          texto: "O PROCV (ou VLOOKUP) é uma função do Excel usada para procurar um valor em uma tabela e trazer uma informação relacionada.",
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "Ele procura na primeira coluna da tabela, de cima para baixo, e retorna um dado da mesma linha.",
        },
        {
          tipo: "texto",
          texto: "Faça a planilha abaixo da mesma forma que esta feita:",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C"],
          linhas: [
            ["1","TABELA DE DADOS","",""],
            ["2","","",""],
            ["3","CODIGO","PRODUTO","PREÇO"],
            ["4","101","Caneta","R$ 2,50"],
            ["5","102","Lápis","R$ 1,50"],
            ["6","103","Borracha","R$ 1,00"],
            ["7","104","Caderno","R$ 12,00"],
            ["8","","",""],
            ["9","PROCURA DE DADOS","",""],
            ["10","103","",""],
            ["11","101","",""],
          ],
        },
        {
          tipo: "texto",
          texto: "Após terminar quero que entenda o que é PROCV.",
        },
      ],
    },
    {
      id: "estrutura-da-formula",
      titulo: "Estrutura da Fórmula",
      blocos: [
        {
          tipo: "codigo",
          conteudo: "=PROCV(valor_procurado; tabela; núm_coluna; [procurar_intervalo])",
        },
        {
          tipo: "texto",
          texto: "Na fórmula do PROCV, \"valor_procurado\", é o que você quer buscar.",
        },
        {
          tipo: "texto",
          texto: "Ou seja quero nesta tabela, eu estou atrás do número 103, vou colocar:",
        },
        {
          tipo: "codigo",
          conteudo: "=PROCV(A CÉLULA ONDE ESTÁ O VALOR;)",
        },
        {
          tipo: "subtitulo",
          texto: "Tabela",
        },
        {
          tipo: "codigo",
          conteudo: "=PROCV(103;A TABELA DE A ATÉ O C)",
        },
        {
          tipo: "texto",
          texto: "É onde o Excel vai procurar.",
        },
        {
          tipo: "texto",
          texto: "Exemplo: A2:C4",
        },
        {
          tipo: "nota",
          variante: "aviso",
          rotulo: "Importante",
          texto: "",
        },
        {
          tipo: "subtitulo",
          texto: "Núm_coluna",
        },
        {
          tipo: "codigo",
          conteudo: "=PROCV(103;A2:C4;NÚMERO DA COLUNA)",
        },
        {
          tipo: "texto",
          texto: "É o número da coluna que você quer trazer.",
        },
        {
          tipo: "lista",
          itens: ["1 = Código","2 = Produto","3 = Preço"],
        },
        {
          tipo: "texto",
          texto: "Exemplo: 2 (para trazer o produto)",
        },
        {
          tipo: "subtitulo",
          texto: "procurar_intervalo",
        },
        {
          tipo: "lista",
          itens: ["FALSO → busca exata (mais usada)","VERDADEIRO → busca aproximada"],
        },
        {
          tipo: "texto",
          texto: "Normalmente use FALSO.",
        },
        {
          tipo: "texto",
          texto: "A fórmula ficará desta forma:",
        },
        {
          tipo: "codigo",
          conteudo: "=PROCV(103;A2:C4;2;FALSO)",
        },
        {
          tipo: "texto",
          texto: "Ou seja como está abaixo:",
        },
        {
          tipo: "texto",
          texto: "103",
        },
        {
          tipo: "texto",
          texto: "A3:C7",
        },
        {
          tipo: "texto",
          texto: "3",
        },
        {
          tipo: "texto",
          texto: "FALSO",
        },
        {
          tipo: "lista",
          itens: [
            "A cor vermelha na fórmula é o valor procurado",
            "A cor verde é toda a tabela separada na primeira linha e coluna e na última linha e coluna.",
            "A cor rosa na fórmula é a coluna da tabela, ou seja é a contagem da tabela",
            "A cor amarela na fórmula é basicamente o verdadeiro e falso, sempre coloque FALSO.",
          ],
        },
      ],
    },
  ],
};

export default atividade;
