import imagemGrafico from "@/assets/atividades/powerpoint/grafico-inserido.svg";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/powerpoint-tabelas-e-graficos.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Tabelas e Gráficos",
  introducao: "Avaliação Prática de PowerPoint",
  itens: [
    {
      id: "apresentacao",
      titulo: "Apresentação",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "O desafio:",
        },
        {
          tipo: "lista",
          itens: [
            "Tema livre — pode usar dados fictícios",
            "Mínimo de 5 slides",
            "Pelo menos 1 tabela e 1 gráfico",
          ],
        },
      ],
    },
    {
      id: "objetivo-apresentando-dados-de-forma-visual",
      titulo: "Objetivo — Apresentando dados de forma visual",
      blocos: [
        {
          tipo: "nota",
          variante: "dica",
          texto: "Criar uma apresentação com no mínimo 5 slides que mostre dados usando pelo menos UMA TABELA e UM GRÁFICO.",
        },
        {
          tipo: "subtitulo",
          texto: "Temas sugeridos (os dados podem ser inventados):",
        },
        {
          tipo: "lista",
          itens: [
            "Vendas mensais de uma loja",
            "Gastos do mês organizados por categoria",
            "Resultado de uma pesquisa com amigos",
            "Placar de um campeonato",
            "Temperatura da semana",
            "Notas de filmes favoritos",
          ],
        },
      ],
    },
    {
      id: "passo-a-passo-inserindo-uma-tabela-organizando-o",
      titulo: "Passo a Passo: Inserindo uma Tabela — Organizando os dados em linhas e colunas",
      blocos: [
        {
          tipo: "texto",
          texto: "1",
        },
        {
          tipo: "texto",
          texto: "Inserir → Tabela",
        },
        {
          tipo: "texto",
          texto: "2",
        },
        {
          tipo: "texto",
          texto: "primeira linha",
        },
        {
          tipo: "texto",
          texto: "3",
        },
        {
          tipo: "texto",
          texto: "Preencha as demais linhas com os dados.",
        },
        {
          tipo: "texto",
          texto: "4",
        },
        {
          tipo: "texto",
          texto: "Design da Tabela",
        },
        {
          tipo: "subtitulo",
          texto: "Exemplo:",
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "MêsVendas (R$) Janeiro4.500 Fevereiro5.200 Março6.100",
        },
      ],
    },
    {
      id: "qual-grafico-usar-cada-tipo-conta-uma-historia-d",
      titulo: "Qual Gráfico Usar? — Cada tipo conta uma história diferente",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "BARRAS",
        },
        {
          tipo: "texto",
          texto: "Comparar valores entre categorias diferentes",
        },
        {
          tipo: "subtitulo",
          texto: "PIZZA",
        },
        {
          tipo: "texto",
          texto: "Mostrar a proporção de cada parte em um total",
        },
        {
          tipo: "subtitulo",
          texto: "LINHA",
        },
        {
          tipo: "texto",
          texto: "Mostrar a evolução de algo ao longo do tempo",
        },
      ],
    },
    {
      id: "passo-a-passo-inserindo-um-grafico-transformando",
      titulo: "Passo a Passo: Inserindo um Gráfico — Transformando números em imagem",
      blocos: [
        {
          tipo: "texto",
          texto: "1",
        },
        {
          tipo: "texto",
          texto: "Inserir → Gráfico",
        },
        {
          tipo: "texto",
          texto: "2",
        },
        {
          tipo: "texto",
          texto: "planilha do Excel",
        },
        {
          tipo: "texto",
          texto: "3",
        },
        {
          tipo: "texto",
          texto: "seus dados",
        },
        {
          tipo: "texto",
          texto: "4",
        },
        {
          tipo: "texto",
          texto: "Feche a planilha — o gráfico no slide atualiza sozinho!",
        },
      ],
      imagem: {
        url: imagemGrafico,
        alt: "Slide do PowerPoint com um gráfico de barras, ao lado de uma mini planilha do Excel aberta com as colunas Mês e Vendas.",
        legenda: "O gráfico e a planilha ficam ligados: mude um número na planilha e a barra correspondente muda no slide.",
      },
    },
    {
      id: "formatando-e-destacando-deixando-o-grafico-facil",
      titulo: "Formatando e Destacando — Deixando o gráfico fácil de entender",
      blocos: [
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Título do gráfico",
          texto: "Clique no gráfico → Elementos do Gráfico (+) → marque \"Título do Gráfico\". Escreva algo claro, tipo \"Vendas por Mês\".",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Rótulos de dados",
          texto: "Em Elementos do Gráfico (+), marque \"Rótulos de Dados\" para mostrar os números em cima das barras/fatias.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Cores",
          texto: "Use a aba Design do Gráfico para trocar as cores e combinar com o resto da apresentação.",
        },
      ],
    },
    {
      id: "estrutura-dos-5-slides-uma-sequencia-que-faz-sen",
      titulo: "Estrutura dos 5+ Slides — Uma sequência que faz sentido",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "SLIDE 1",
        },
        {
          tipo: "texto",
          texto: "CAPA",
        },
        {
          tipo: "subtitulo",
          texto: "SLIDE 2",
        },
        {
          tipo: "texto",
          texto: "TABELA com os dados",
        },
        {
          tipo: "subtitulo",
          texto: "SLIDES 3-4",
        },
        {
          tipo: "texto",
          texto: "GRÁFICOS (um ou mais tipos)",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "✓ ÚLTIMO SLIDE:",
          texto: "Uma conclusão simples: o que os dados mostram? (ex: \"As vendas cresceram 35% no trimestre\")",
        },
      ],
    },
    {
      id: "erros-comuns-fique-de-olho-nisso",
      titulo: "Erros Comuns — Fique de olho nisso",
      blocos: [
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Gráfico sem título",
          texto: "Quem olha o slide precisa entender do que se trata sem precisar perguntar.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Tabela com informação demais",
          texto: "Se a tabela tem muitas linhas/colunas, considere resumir só o essencial no slide.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Tipo de gráfico errado",
          texto: "Não use gráfico de pizza pra mostrar evolução no tempo — use gráfico de linha.",
        },
      ],
    },
    {
      id: "checklist-antes-de-entregar",
      titulo: "Checklist Antes de Entregar",
      blocos: [
        {
          tipo: "texto",
          texto: "☐ Pelo menos 5 slides ☐ Pelo menos 1 tabela formatada ☐ Pelo menos 1 gráfico com título ☐ Tipo de gráfico combina com os dados ☐ Slide de capa e slide de conclusão",
        },
        {
          tipo: "texto",
          texto: "Boa sorte com os números!",
        },
      ],
    },
  ],
};

export default atividade;

