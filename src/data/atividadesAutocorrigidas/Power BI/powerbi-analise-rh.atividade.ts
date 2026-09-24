import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/powerbi-analise-rh.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Fazendo Análise de Funcionários de RH",
  introducao: "Aprender a analisar: Salários; Departamentos; Tempo de empresa",
  itens: [
    {
      id: "base-de-dados-copie-para-excel",
      titulo: "Base de dados (copie para Excel)",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["","A","B","C","D","E"],
          linhas: [
            ["1","Nome","Departamento","Salário","Admissão","Idade"],
            ["2","Ana","Financeiro","5000","01/02/2020","28"],
            ["3","João","TI","5000","15/06/2019","35"],
            ["4","Maria","RH","3500","10/01/2025","39"],
            ["5","Pedro","TI","4500","20/03/2018","40"],
            ["6","Carla","Financeiro","3200","05/03/2022","29"],
            ["7","Lucas","RH","3800","12/11/2021","21"],
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
      id: "importar-dados-no-power-bi",
      titulo: "Importar dados no Power BI",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Abra o Power BI",
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
      id: "criar-medidas-dax",
      titulo: "Criar medidas (DAX)",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Salário Médio:",
        },
        {
          tipo: "codigo",
          conteudo: "Salário Médio = AVERAGE(Funcionarios[Salário])",
        },
        {
          tipo: "subtitulo",
          texto: "Total de Funcionários",
        },
        {
          tipo: "codigo",
          conteudo: "Total Funcionários = COUNT(Funcionarios[Nome])",
        },
      ],
    },
    {
      id: "criar-visuais",
      titulo: "Criar visuais",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Cartões",
        },
        {
          tipo: "lista",
          itens: ["Total Funcionários","Salário Médio"],
        },
        {
          tipo: "subtitulo",
          texto: "Gráfico de colunas",
        },
        {
          tipo: "lista",
          itens: ["Eixo: Departamento","Valores: Salário (média ou soma)"],
        },
        {
          tipo: "subtitulo",
          texto: "Gráfico de pizza",
        },
        {
          tipo: "lista",
          itens: ["Legenda: Departamento","Valores: Quantidade de funcionários"],
        },
      ],
    },
    {
      id: "filtros",
      titulo: "Filtros",
      blocos: [
        {
          tipo: "texto",
          texto: "Adicione segmentadores:",
        },
        {
          tipo: "lista",
          itens: ["Departamento","Idade"],
        },
      ],
    },
  ],
};

export default atividade;
