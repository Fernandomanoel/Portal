import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/excel-filtro-de-dados.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Departamento de Vendas e Filtro de Dados",
  introducao: "Excel Básico",
  itens: [
    {
      id: "atividade-excel-2021",
      titulo: "Atividade Excel 2021",
      blocos: [
        {
          tipo: "texto",
          texto: "Uma distribuidora de livros utiliza alguns recursos avançados em planilhas eletrônicas do Excel para organizar, resumir e otimizar o processo de análise das informações.",
        },
        {
          tipo: "texto",
          texto: "Diariamente, o Departamento de Vendas da distribuidora insere na planilha dados referentes aos pedidos realizados. Fazem parte da planilha de pedidos: o número e a data do pedido, o nome do vendedor e o valor total de cada pedido. Para facilitar a análise desses dados, são aplicados os recursos de: tabela dinâmica, gráfico dinâmico, validação de dados e funções para calcular a quantidade de pedidos e o valor total de vendas. Ao mesmo tempo, o Departamento de Vendas faz o controle das vendas realizadas e do estoque de livros, e utiliza, para análise de dados, recursos como: filtro avançado, formulários e macro.",
        },
        {
          tipo: "texto",
          texto: "Para o controle de pagamento dos vendedores, o Departamento Administrativo da distribuidora elaborou uma pequena planilha para: pesquisar o nome e o salário-base dos funcionários, calcular a comissão, INSS, salário-família, vale-transporte, vale-refeição, imposto de renda e salário líquido.",
        },
        {
          tipo: "subtitulo",
          texto: "Faça a tabela abaixo",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C","D","E","F","G","H","I"],
          linhas: [
            ["1","","","","","","","","",""],
            [
              "2",
              "PEDIDO",
              "DATA DE PEDIDO",
              "VENDEDOR",
              "VALOR TOTAL",
              "",
              "DATA PEDIDO",
              "VENDEDOR",
              "QUANTIDADE DE PEDIDOS",
              "VALOR TOTAL DE VENDAS",
            ],
            ["3","1039","10/05/2025","Ana Maria","1400","","","","",""],
            ["4","1045","11/05/2025","João Paulo","1000","","","","",""],
            ["5","1057","12/05/2025","Ana Maria","1900","","","","",""],
            ["6","1059","13/05/2025","Ana Maria","1623","","","","",""],
            ["7","1060","14/05/2025","Ana Maria","8000","","","","",""],
            ["8","1063","15/05/2025","João Paulo","1000","","","","",""],
            ["9","1046","16/05/2025","João Paulo","3000","","","","",""],
            ["10","1080","17/05/2025","Caetano","900","","","","",""],
            ["11","1070","18/05/2025","Caetano","1100","","","","",""],
            ["12","1016","19/05/2025","Caetano","802","","","","",""],
            ["13","1071","20/05/2025","Antonio","1770","","","","",""],
            ["14","1044","21/05/2025","Ana Maria","1200","","","","",""],
            ["15","1023","22/05/2025","Ana Maria","1200","","","","",""],
            ["16","1072","23/05/2025","Antonio","575","","","","",""],
          ],
        },
      ],
    },
    {
      id: "1-tabela-dinamica",
      titulo: "1. Tabela Dinâmica",
      blocos: [
        {
          tipo: "texto",
          texto: "Utilize os dados da planilha Pedidos e crie uma Tabela Dinâmica em uma nova planilha, conforme imagem abaixo:",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B"],
          linhas: [
            ["1","DATA DE PEDIDO","(Tudo)"],
            ["2","",""],
            ["3","Rótulos de Linha","Soma de VALOR TOTAL"],
            ["4","Ana Maria","15323"],
            ["5","Antonio","2345"],
            ["6","Caetano","2802"],
            ["7","João Paulo","5000"],
            ["8","Total Geral","25470"],
          ],
        },
      ],
    },
    {
      id: "2-grafico-dinamico",
      titulo: "2. Gráfico Dinâmico",
      blocos: [
        {
          tipo: "texto",
          texto: "Considere a imagem a seguir e, a partir dos dados da Tabela Dinâmica, crie um Gráfico Dinâmico que resuma os dados dos vendedores e os respectivos valores de venda (colunas: Ana Maria, Antonio, Caetano, João Paulo — no eixo com o total de vendas de cada um, conforme a Tabela Dinâmica acima).",
        },
      ],
    },
    {
      id: "planilha-de-estoque",
      titulo: "Planilha de Estoque",
      blocos: [
        {
          tipo: "texto",
          texto: "Faça a planilha abaixo:",
        },
        {
          tipo: "texto",
          texto: "Ou baixe ela apertando no link fornecido pelo professor.",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C","D","E"],
          linhas: [
            ["1","Título","Autor","Categoria","Quantidade","Valor Unitário"],
            [
              "2",
              "202 perguntas sobre biocombustíveis",
              "Luiz Vicente Gentil",
              "Meio Ambiente",
              "4",
              "R$ 53,00",
            ],
            ["3","A arte de receber","Naison Ladurie","Gastronomia e Enologia","5","R$ 99,90"],
            [
              "4",
              "A formação do professor e currículos escritos",
              "José Maria Pires Azanha",
              "Educação",
              "7",
              "R$ 49,00",
            ],
            ["5","A história mundial da roupa","Patricia Mears","Moda","9","R$ 174,00"],
            [
              "6",
              "A imagem digital e a fotografia",
              "Ricardo Hori",
              "Design e Arquitetura",
              "6",
              "R$ 29,90",
            ],
            ["7","A televisão levada a sério","Arlindo Machado","Comunicação e Artes","6","R$ 55,50"],
            ["8","Access 2010","Marile Silve Mendonça de Barros","Informática","4","R$ 45,00"],
            ["9","Adobe Dreamweaver CS6","Ana Laura Gomes","Informática","2","R$ 55,00"],
            ["10","Adobe InDesign CS4","Marcos Serafim de Andrade","Informática","1","R$ 59,90"],
            [
              "11",
              "Álbum de figurinhas",
              "Fanny Abramovich e Marcelo Cipis",
              "Ciências Humanas",
              "2",
              "R$ 27,00",
            ],
            ["12","Arte de cozinhar","Domingos Rodrigues","Gastronomia e Enologia","2","R$ 92,00"],
            [
              "13",
              "Beleza: segredos do jardim",
              "Guilherme Maira Dourado",
              "Desenvolvimento Social",
              "2",
              "R$ 24,50",
            ],
            [
              "14",
              "Benefícios da cirurgia cosmética a laser",
              "Tina Alter, Lydia Preston e Otávio R. Macedo",
              "Beleza e Estética",
              "10",
              "R$ 94,00",
            ],
            ["15","Carnes e churrasco","Marcos Bassi","Gastronomia e Enologia","15","R$ 89,00"],
            ["16","Chaves das sensações","Paulo Rappini","Comunicação e Artes","6","R$ 59,90"],
            ["17","Comer é um sentimento","Francis Slom","Gastronomia e Enologia","6","R$ 63,30"],
            ["18","Comida como cultura","Massimo Montanari","Gastronomia e Enologia","8","R$ 53,90"],
            [
              "19",
              "Como montar e administrar bares e restaurantes",
              "percival Maricato",
              "Turismo e Hotelaria",
              "9",
              "R$ 56,90",
            ],
            [
              "20",
              "Como ser um designer gráfico sem vender sua alma",
              "Adrian Shaughnessy",
              "Design e Arquitetura",
              "1",
              "R$ 54,90",
            ],
            ["21","CorelDraw X5","Maria Ângela Serafim de Andrade","Informática","10","R$ 59,90"],
          ],
        },
      ],
    },
    {
      id: "1-filtro-avancado",
      titulo: "1. Filtro Avançado",
      blocos: [
        {
          tipo: "texto",
          texto: "Realize os filtros a seguir, na planilha Filtro Avançado.",
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "",
          itens: [
            "a) Título que inicie com a letra \"M\" e Valor Unitário \"maior que 70\".",
            "b) Valor Unitário \"igual a 25\" ou \"igual a 45\".",
            "c) Categoria \"igual a Informática\".",
            "d) Autor que inicie com a letra \"E\" ou Quantidade \"igual a 18\" ou Valor Unitário \"menor que 20\".",
            "e) Autor que inicie com o nome \"Patricia\" e Categoria \"igual a Moda\" e Quantidade \"maior que 5\".",
          ],
        },
      ],
    },
    {
      id: "2-formulario",
      titulo: "2. Formulário",
      blocos: [
        {
          tipo: "texto",
          texto: "Com base na imagem apresentada em aula, crie um formulário avançado com os itens da planilha de estoque (Título, Autor, Categoria, Quantidade e Valor Unitário) para facilitar a inclusão de novos registros.",
        },
      ],
    },
  ],
};

export default atividade;
