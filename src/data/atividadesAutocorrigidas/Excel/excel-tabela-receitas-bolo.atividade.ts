import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/excel-tabela-receitas-bolo.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade de Excel — Tabela de Receitas de Bolo",
  introducao: "Excel Básico",
  itens: [
    {
      id: "objetivo",
      titulo: "Objetivo",
      blocos: [
        {
          tipo: "texto",
          texto: "Preencher e visualizar uma tabela com diferentes receitas de bolo, ingredientes principais e tempo de preparo.",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C","D"],
          linhas: [
            ["1","Receita de Bolo","Ingredientes Principais","Tempo de Preparo (min)","Dificuldade"],
            ["2","Bolo de Cenoura","Cenoura, ovos, farinha","50","Fácil"],
            ["3","Bolo de Chocolate","Chocolate, leite, farinha","60","Médio"],
            ["4","Bolo de Fubá","Fubá, leite, ovos","45","Fácil"],
            ["5","Bolo de Laranja","Laranja, ovos, farinha","55","Fácil"],
            ["6","Bolo de Milho","Milho, leite condensado","50","Médio"],
          ],
        },
      ],
    },
    {
      id: "atividade-sugerida",
      titulo: "Atividade Sugerida",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Abrir o Excel.",
            "Criar uma nova planilha e digitar o título: \"Minhas Receitas de Bolo\".",
            "Preencher as colunas com os dados acima (ou outros à sua escolha).",
            "Colorir cada linha com uma cor diferente (ajuda na visualização).",
            "Fazer uma formatação simples: deixar os títulos em negrito e centralizados.",
            "Se quiser, usar a função de filtro para classificar por tempo de preparo ou dificuldade.",
          ],
          numerada: true,
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Atividade Extra (opcional)",
          texto: "",
          itens: [
            "Criar uma nova coluna chamada \"Já fiz?\" com as opções: ou .",
            "A pessoa pode marcar quais receitas já testou.",
          ],
        },
      ],
    },
  ],
};

export default atividade;
