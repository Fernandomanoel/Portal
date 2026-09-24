import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/powerbi-primeiro-dashboard.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Criando o seu primeiro Dashboard",
  introducao: "Nesta atividade você vai aprender a: Importar dados; Criar gráficos; Montar um painel básico",
  itens: [
    {
      id: "passo-1-crie-a-planilha-por-meio-do-excel-2021",
      titulo: "Passo 1: Crie a Planilha por meio do Excel 2021",
      blocos: [
        {
          tipo: "texto",
          texto: "Você pode criar uma tabela simples no Excel com estes dados:",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C","D"],
          linhas: [
            ["1","Produto","Categoria","Vendas","Data"],
            ["2","A","Eletrônicos","100","01/01/2024"],
            ["3","B","Roupas","200","02/01/2024"],
            ["4","C","Eletrônicos","250","03/01/2024"],
            ["5","D","Alimentos","150","04/01/2024"],
          ],
        },
        {
          tipo: "texto",
          texto: "No Excel, clique em Arquivo:",
        },
        {
          tipo: "lista",
          itens: [
            "Clique em Salvar Como",
            "Escolha Este Computador",
            "Clique em Documentos (ou \"Documents\")",
            "Dê um nome para o arquivo",
            "Clique em Salvar",
          ],
          numerada: true,
        },
      ],
    },
    {
      id: "passo-2-importar-dados-no-power-bi",
      titulo: "Passo 2: Importar dados no Power BI",
      blocos: [
        {
          tipo: "texto",
          texto: "Abra o Power BI:",
        },
        {
          tipo: "lista",
          itens: [
            "Clique em \"Obter Dados\"",
            "Escolha Excel ou CSV",
            "Selecione seu arquivo",
            "Clique em Carregar",
          ],
          numerada: true,
        },
      ],
    },
    {
      id: "passo-3-criar-visualizacoes",
      titulo: "Passo 3: Criar visualizações",
      blocos: [
        {
          tipo: "texto",
          texto: "Agora vem a parte mais legal:",
        },
        {
          tipo: "subtitulo",
          texto: "1. Gráfico de colunas",
        },
        {
          tipo: "texto",
          texto: "Arraste:",
        },
        {
          tipo: "lista",
          itens: ["Produto → Eixo","Vendas → Valores"],
        },
        {
          tipo: "subtitulo",
          texto: "2. Gráfico de pizza",
        },
        {
          tipo: "texto",
          texto: "Arraste:",
        },
        {
          tipo: "lista",
          itens: ["Categoria → Legenda","Vendas → Valores"],
        },
      ],
    },
    {
      id: "passo-4-filtro-por-data",
      titulo: "Passo 4: Filtro por data",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Adicione um segmentador",
            "Coloque o campo Data",
            "Agora você pode filtrar os dados interativamente",
          ],
        },
      ],
    },
    {
      id: "passo-5-personalizar",
      titulo: "Passo 5: Personalizar",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Clique nos gráficos",
            "Vá em \"Formatar\" (ícone de rolinho)",
            "Mude cores, títulos e estilos",
          ],
        },
      ],
    },
  ],
};

export default atividade;
