import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/excel-funcao-se-bonus-faltas.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Função SE — Bônus por Faltas",
  introducao: "Excel Básico",
  itens: [
    {
      id: "funcao-se",
      titulo: "Função SE",
      blocos: [
        {
          tipo: "texto",
          texto: "Aprender a utilizar a função SE no Excel para calcular bônus salarial de acordo com a quantidade de faltas do funcionário.",
        },
        {
          tipo: "subtitulo",
          texto: "O que é a fórmula SE?",
        },
        {
          tipo: "texto",
          texto: "A função SE é utilizada no Excel para realizar testes lógicos, ou seja, verificar se uma condição é verdadeira ou falsa e, a partir disso, mostrar um resultado.",
        },
        {
          tipo: "texto",
          texto: "A estrutura da função SE é:",
        },
        {
          tipo: "codigo",
          conteudo: "SE(teste_lógico; valor_se_verdadeiro; valor_se_falso)",
        },
        {
          tipo: "subtitulo",
          texto: "Entendendo cada parte da fórmula",
        },
        {
          tipo: "lista",
          itens: [
            "Teste_lógico: é a condição que será analisada pelo Excel. Exemplo: verificar se o número de faltas é igual a zero.",
            "Valor_se_verdadeiro: é o resultado que aparecerá caso a condição seja verdadeira. Exemplo: se o funcionário não tiver faltas, ele recebe o bônus de R$ 200,00.",
            "Valor_se_falso: é o resultado que aparecerá caso a condição seja falsa. Exemplo: se o funcionário tiver uma ou mais faltas, ele não recebe bônus.",
          ],
        },
        {
          tipo: "subtitulo",
          texto: "O que essa fórmula faz?",
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "",
          itens: [
            "O Excel verifica se o valor da célula B2 é igual a 0",
            "Se for verdadeiro, retorna 200",
            "Se for falso, retorna 0",
          ],
        },
      ],
    },
    {
      id: "atividade",
      titulo: "Atividade",
      blocos: [
        {
          tipo: "texto",
          texto: "Uma empresa concede um bônus de R$ 200,00 para os funcionários que não tiveram nenhuma falta no mês. Caso o funcionário tenha uma ou mais faltas, ele não receberá o bônus.",
        },
        {
          tipo: "texto",
          texto: "Você deverá usar a função SE para calcular automaticamente o valor do bônus.",
        },
        {
          tipo: "texto",
          texto: "Abra o Excel e faça esta tabela abaixo:",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C"],
          linhas: [
            ["1","BÔNUS SALARIAL","",""],
            ["2","Funcionário","Faltas no Mês","Bônus (R$)"],
            ["3","João","0",""],
            ["4","Pedrinho","2",""],
            ["5","Maria","0",""],
            ["6","Carlos","1",""],
            ["7","Ana","2",""],
          ],
        },
        {
          tipo: "subtitulo",
          texto: "Instruções",
        },
        {
          tipo: "lista",
          itens: [
            "Observe a quantidade de faltas de cada funcionário.",
            "Na coluna Bônus (R$), crie uma fórmula usando a função SE.",
            "Se o número de faltas for igual a 0, o bônus será R$ 200,00.",
            "Caso contrário, o bônus será R$ 0,00.",
            "Copie a fórmula para as demais linhas.",
          ],
        },
        {
          tipo: "texto",
          texto: "O resultado tem que ser:",
        },
        {
          tipo: "lista",
          itens: ["Funcionários sem faltas recebem R$ 200,00","Funcionários com faltas recebem R$ 0,00"],
        },
        {
          tipo: "texto",
          texto: "Aplicando a fórmula na linha do João (linha 3):",
        },
        {
          tipo: "texto",
          texto: "B3=0",
        },
        {
          tipo: "texto",
          texto: "200",
        },
        {
          tipo: "texto",
          texto: "0",
        },
        {
          tipo: "lista",
          itens: [
            "O teste lógico: verifica se as Faltas no Mês (B3) são iguais a 0.",
            "Valor se verdadeiro: se não teve faltas, o bônus é 200.",
            "Valor se falso: se teve alguma falta, o bônus é 0.",
          ],
        },
        {
          tipo: "nota",
          variante: "aviso",
          rotulo: "Importante",
          texto: "",
        },
      ],
    },
  ],
};

export default atividade;
