import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/powerbi-analise-de-vendas.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Análise de Vendas",
  introducao: "Power BI",
  itens: [
    {
      id: "parte-0-baixe-a-planilha",
      titulo: "Parte 0 — Baixe a planilha",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Baixe a Planilha do Excel por meio do link abaixo: https://microapp.x10.mx/basedados.html",
            "Baixe o arquivo \"Controle de Vendas\"",
            "Salve na Pasta Documentos",
          ],
          numerada: true,
        },
      ],
    },
    {
      id: "parte-1-importacao",
      titulo: "Parte 1 — Importação",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Abra o Power BI",
            "Clique em Obter Dados → Excel",
            "Importe a tabela de vendas",
            "Clique em Carregar",
          ],
          numerada: true,
        },
      ],
    },
    {
      id: "parte-2-tratamento-de-dados",
      titulo: "Parte 2 — Tratamento de dados",
      blocos: [
        {
          tipo: "texto",
          texto: "No Power Query:",
        },
        {
          tipo: "lista",
          itens: [
            "Verifique se:",
            "— Data está como Data",
            "— Preço_Unitário e Total estão como Número decimal",
            "Clique em Fechar e Aplicar",
          ],
        },
      ],
    },
    {
      id: "parte-3-medidas-dax",
      titulo: "Parte 3 — Medidas (DAX)",
      blocos: [
        {
          tipo: "texto",
          texto: "Crie essas medidas:",
        },
        {
          tipo: "subtitulo",
          texto: "1. Faturamento Total",
        },
        {
          tipo: "codigo",
          conteudo: "Faturamento = SUM(Vendas[Total])",
        },
        {
          tipo: "subtitulo",
          texto: "2. Quantidade Vendida",
        },
        {
          tipo: "codigo",
          conteudo: "Qtd Vendida = SUM(Vendas[Quantidade])",
        },
        {
          tipo: "subtitulo",
          texto: "3. Ticket Médio",
        },
        {
          tipo: "codigo",
          conteudo: "Ticket Médio = DIVIDE([Faturamento], COUNTROWS(Vendas))",
        },
      ],
    },
    {
      id: "parte-4-visuais",
      titulo: "Parte 4 — Visuais",
      blocos: [
        {
          tipo: "texto",
          texto: "Crie os seguintes gráficos:",
        },
        {
          tipo: "subtitulo",
          texto: "1. Faturamento por Produto",
        },
        {
          tipo: "lista",
          itens: ["Gráfico de colunas","Eixo: Produto","Valores: Faturamento"],
        },
        {
          tipo: "subtitulo",
          texto: "2. Faturamento por Vendedor",
        },
        {
          tipo: "lista",
          itens: ["Gráfico de barras","Eixo: Vendedor","Valores: Faturamento"],
        },
        {
          tipo: "subtitulo",
          texto: "3. Forma de Pagamento",
        },
        {
          tipo: "lista",
          itens: ["Gráfico de pizza","Legenda: Forma_Pagamento","Valores: Contagem de vendas"],
        },
        {
          tipo: "subtitulo",
          texto: "4. Vendas por Data",
        },
        {
          tipo: "lista",
          itens: ["Gráfico de linha","Eixo: Data","Valores: Faturamento"],
        },
      ],
    },
    {
      id: "parte-5-upload",
      titulo: "Parte 5 — Upload",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Salvar em uma pasta (no computador)",
        },
        {
          tipo: "lista",
          itens: [
            "Clique em Arquivo",
            "Clique em Salvar como",
            "Escolha a pasta (ex: Documentos, Desktop ou outra)",
            "Dê um nome (ex: Dashboard_Vendas.pbix)",
            "Clique em Salvar",
          ],
          numerada: true,
        },
        {
          tipo: "subtitulo",
          texto: "Para upar no Portal do Aluno Microlins",
        },
        {
          tipo: "lista",
          itens: [
            "Faça o login no site do aluno: https://portaldoaluno.microlins.com.br/home/",
            "Na parte esquerda, ou seja, na lateral",
            "Aperte em \"Meus Documentos\"",
            "Selecione o curso Power Bi ou Qualquer outro",
            "Aperte em Enviar Arquivo",
            "Click em Clique Aqui e Selecione a pasta no qual você salvou esta atividade",
            "E logo após, aperte em Enviar Arquivo",
          ],
          numerada: true,
        },
      ],
    },
  ],
};

export default atividade;
