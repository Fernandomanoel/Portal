import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/powerbi-dashboard-atacadao.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Dashboard de Vendas do Atacadão",
  introducao: "Power BI",
  itens: [
    {
      id: "projeto-atacadao",
      titulo: "Projeto Atacadão",
      blocos: [
        {
          tipo: "texto",
          texto: "Inspirado no estilo da empresa Atacadão",
        },
        {
          tipo: "nota",
          variante: "objetivo",
          texto: "Analisar vendas de uma loja e responder:",
          itens: [
            "Quem vende mais",
            "Qual produto gera mais lucro",
            "Como os clientes pagam",
            "Evolução das vendas",
          ],
        },
      ],
    },
    {
      id: "base-de-dados",
      titulo: "Base de dados",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Baixe a Planilha do Excel por meio do link abaixo: https://microapp.x10.mx/basedados.html",
            "Baixe o arquivo \"Controle de Estoque\"",
            "Salve na Pasta Documentos",
          ],
        },
      ],
    },
    {
      id: "importacao",
      titulo: "Importação",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Abra o Power BI",
            "Clique em Obter Dados → Excel",
            "Importe a Planilha baixada",
            "Clique em Carregar",
          ],
        },
      ],
    },
    {
      id: "medidas-dax",
      titulo: "Medidas (DAX)",
      blocos: [
        {
          tipo: "texto",
          texto: "Crie essas medidas:",
        },
        {
          tipo: "subtitulo",
          texto: "Faturamento:",
        },
        {
          tipo: "codigo",
          conteudo: "Faturamento = SUM(Vendas[Total])",
        },
        {
          tipo: "subtitulo",
          texto: "Quantidade Vendida:",
        },
        {
          tipo: "codigo",
          conteudo: "Qtd Vendida = SUM(Vendas[Quantidade])",
        },
        {
          tipo: "subtitulo",
          texto: "Ticket Médio:",
        },
        {
          tipo: "codigo",
          conteudo: "Ticket Médio = DIVIDE([Faturamento], COUNTROWS(Vendas))",
        },
      ],
    },
    {
      id: "colocar-a-imagem",
      titulo: "Colocar a imagem",
      blocos: [
        {
          tipo: "texto",
          texto: "Como colocar uma foto no Power BI — passo a passo:",
        },
        {
          tipo: "lista",
          itens: [
            "Vá na aba INSERIR",
            "Clique em IMAGEM",
            "Escolha a imagem no seu computador (ex: logo do Atacadão)",
            "Clique em ABRIR",
          ],
          numerada: true,
        },
      ],
    },
    {
      id: "dashboard",
      titulo: "Dashboard",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Logo (canto esquerdo)",
            "Para baixar o logo, basta entrar no site: https://microapp.x10.mx/basedados.html",
            "E clicar no arquivo Logo Atacadão",
            "Título:",
          ],
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "Relatório de Vendas – Atacadão Manaus",
        },
      ],
    },
    {
      id: "graficos",
      titulo: "Gráficos",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Faturamento por Produto",
        },
        {
          tipo: "lista",
          itens: ["Tipo: Coluna"],
        },
        {
          tipo: "subtitulo",
          texto: "Faturamento por Vendedor",
        },
        {
          tipo: "lista",
          itens: ["Tipo: Barra"],
        },
        {
          tipo: "subtitulo",
          texto: "Forma de Pagamento",
        },
        {
          tipo: "lista",
          itens: ["Tipo: Pizza"],
        },
        {
          tipo: "subtitulo",
          texto: "Vendas por Data",
        },
        {
          tipo: "lista",
          itens: ["Tipo: Linha"],
        },
      ],
    },
    {
      id: "salvar-e-enviar-a-atividade",
      titulo: "Salvar e enviar a atividade",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Salvar o arquivo no computador (Power BI)",
        },
        {
          tipo: "texto",
          texto: "No Power BI:",
        },
        {
          tipo: "lista",
          itens: [
            "Clique em Arquivo",
            "Clique em Salvar como",
            "Escolha a pasta desejada (ex: Documentos, Desktop, etc.)",
            "Dê um nome ao arquivo — Exemplo: Dashboard_Vendas.pbix",
            "Clique em Salvar",
          ],
          numerada: true,
        },
        {
          tipo: "subtitulo",
          texto: "Enviar no Portal do Aluno Microlins",
        },
        {
          tipo: "lista",
          itens: [
            "Acesse o portal: https://portaldoaluno.microlins.com.br/home/",
            "Faça login na sua conta",
            "No menu lateral esquerdo, clique em: Atividade Power BI",
            "Clique em Meus Documentos",
            "Selecione o curso (Power BI ou outro correspondente)",
            "Clique em Enviar Arquivo",
            "Clique em \"Clique aqui\" e selecione o arquivo salvo no seu computador",
            "Por fim, clique em Enviar Arquivo para finalizar",
          ],
          numerada: true,
        },
      ],
    },
  ],
};

export default atividade;
