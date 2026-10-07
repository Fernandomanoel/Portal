import type { AtividadeIngles } from "@/types/ingles";
import { CRITERIOS_IELTS_TASK1, ESCALA_IELTS } from "./redacao-comum";

const atividade: AtividadeIngles = {
  slug: "redacao-ielts-tabela",
  titulo: "IELTS Academic Task 1 — Descrever uma tabela",
  descricao: "Relatório de 150+ palavras em 20 minutos sobre dados: como escrever o overview, escolher os números certos e comparar sem dar opinião.",
  nivel: "Avançado",
  trilha: "redacao",
  cor: "#9f1239",
  abertura: {
    titulo: "Dados viram texto",
    texto:
      "Na Task 1 do IELTS Academic você recebe um gráfico, tabela, mapa ou processo e escreve um relatório objetivo. Não há opinião: o que dá nota é o overview (o panorama geral) e a escolha dos dados certos para comparar. Os números da tarefa desta atividade são fictícios, feitos para o treino.",
  },
  conteudo: {
    tipo: "redacao",
    redacao: {
      proposta: {
        exame: "IELTS",
        tarefa: "Academic Writing Task 1 · Table",
        minutos: 20,
        minPalavras: 150,
        enunciado: [
          "The table below shows the average number of hours per week that adults in one country spent on five leisure activities in 2005, 2015 and 2025.",
          "Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        ],
        enunciadoPt:
          "Resumir a tabela: dizer as tendências principais (o que subiu, o que caiu, o que lidera) e comparar as atividades, com os números que sustentam isso. Sem opinião e sem explicar causas.",
        tabela: {
          titulo: "Average weekly hours spent on leisure activities by adults (fictional data)",
          colunas: ["Activity", "2005", "2015", "2025"],
          linhas: [
            ["Watching television", "15", "12", "8"],
            ["Using social media", "2", "8", "13"],
            ["Socialising in person", "7", "6", "5"],
            ["Reading", "5", "4", "3.5"],
            ["Sport and exercise", "3", "3.5", "4.5"],
          ],
        },
      },
      guia: [
        {
          titulo: "O formato",
          blocos: [
            {
              tipo: "lista",
              itens: [
                "Tempo recomendado: 20 minutos, dentro dos 60 minutos da prova de Writing.",
                "Mínimo: 150 palavras. O ideal fica entre 160 e 200.",
                "Pode vir: gráfico de linhas, de barras, de pizza, tabela, mapa (antes × depois) ou diagrama de processo. Às vezes, dois juntos.",
                "Vale metade do peso da Task 2 na nota de Writing — não gaste mais de 20 minutos aqui.",
                "No IELTS General Training, a Task 1 é uma carta, não um relatório de dados.",
              ],
            },
          ],
        },
        {
          titulo: "A estrutura em quatro partes",
          blocos: [
            {
              tipo: "tabela",
              colunas: ["Parte", "O que vai nela"],
              linhas: [
                ["Introdução", "Uma frase: paráfrase do que a tabela mostra (o quê, onde, quando). Sem números."],
                ["Overview", "Duas frases com as tendências principais: o que mais cresceu, o que mais caiu, o que lidera no começo e no fim. Sem números. É o parágrafo mais importante."],
                ["Detalhe 1", "Um grupo de dados (por exemplo, as atividades que caíram) com números e comparações."],
                ["Detalhe 2", "O outro grupo (as que subiram), também com números e comparações."],
              ],
            },
            {
              tipo: "dica",
              texto: "Agrupe os dados por padrão, não na ordem da tabela. Aqui: televisão, encontros e leitura caíram; redes sociais e esporte subiram. Dois grupos = dois parágrafos de detalhe.",
            },
            {
              tipo: "atencao",
              texto: "Sem overview, a nota de Task Achievement costuma ficar em 5, por melhor que esteja o resto. Escreva-o sempre, de preferência logo depois da introdução.",
            },
          ],
        },
        {
          titulo: "A linguagem das tendências",
          blocos: [
            {
              tipo: "exemplos",
              titulo: "Subir e cair",
              itens: [
                { en: "rose / increased / climbed from 2 to 13 hours", pt: "subiu / aumentou de 2 para 13 horas" },
                { en: "fell / decreased / declined to 8 hours", pt: "caiu / diminuiu para 8 horas" },
                { en: "a sharp rise / a steady decline / a slight increase", pt: "uma alta acentuada / uma queda constante / um leve aumento" },
                { en: "remained stable at / fluctuated around", pt: "permaneceu estável em / oscilou em torno de" },
              ],
            },
            {
              tipo: "exemplos",
              titulo: "Comparar",
              itens: [
                { en: "nearly twice as many hours as...", pt: "quase o dobro de horas que..." },
                { en: "overtook television as the most popular activity", pt: "ultrapassou a televisão como atividade mais popular" },
                { en: "while / whereas reading dropped slightly, ...", pt: "enquanto a leitura caiu um pouco, ..." },
                { en: "the figure for sport", pt: "o número referente ao esporte" },
              ],
            },
            {
              tipo: "exemplos",
              titulo: "Introdução e overview",
              itens: [
                { en: "The table compares how many hours per week adults in one country devoted to...", pt: "A tabela compara quantas horas por semana os adultos de um país dedicavam a..." },
                { en: "Overall, ... while ...", pt: "No geral, ... enquanto ..." },
                { en: "The most striking change was...", pt: "A mudança mais marcante foi..." },
              ],
            },
          ],
        },
        {
          titulo: "Erros que mais custam nota",
          blocos: [
            {
              tipo: "lista",
              itens: [
                "Esquecer o overview, ou colocar números nele.",
                "Listar todos os números da tabela, um por um, sem comparar.",
                "Explicar causas (“because people bought smartphones”): a tabela não mostra isso.",
                "Dar opinião (“this is worrying”) — Task 1 é relatório.",
                "Errar o tempo verbal: dados do passado pedem passado (rose, fell). Para 2025 também, se a tabela trata de anos já vividos.",
                "Copiar o enunciado na introdução.",
              ],
            },
          ],
        },
      ],
      escala: ESCALA_IELTS,
      criterios: CRITERIOS_IELTS_TASK1,
      modelo: {
        titulo: "Relatório modelo",
        nota: "Escrito para nível de banda 7.5–8 (estimativa do portal, não nota oficial)",
        paragrafos: [
          {
            papel: "Introdução",
            en: "The table compares the average amount of time adults in one country devoted each week to five leisure activities in 2005, 2015 and 2025.",
            pt: "A tabela compara o tempo médio que os adultos de um país dedicavam por semana a cinco atividades de lazer em 2005, 2015 e 2025.",
            comentario: "Uma frase só, paráfrase completa: “shows the average number of hours” virou “compares the average amount of time... devoted”. Diz o quê, quem e quando, sem nenhum número.",
          },
          {
            papel: "Overview",
            en: "Overall, the most striking change was the rapid growth of social media, which replaced television as the most time-consuming pastime. Sport was the only other activity to gain popularity, while time spent watching TV, socialising face to face and reading all declined.",
            pt: "No geral, a mudança mais marcante foi o crescimento rápido das redes sociais, que substituíram a televisão como o passatempo que mais consome tempo. O esporte foi a única outra atividade a ganhar espaço, enquanto o tempo vendo TV, encontrando pessoas pessoalmente e lendo caiu.",
            comentario: "O coração do relatório: as duas tendências principais (troca de liderança TV → redes sociais; quem subiu × quem caiu) sem um único número. Quem lê só este parágrafo entende a tabela.",
          },
          {
            papel: "Detalhe 1",
            en: "In 2005, adults spent 15 hours a week in front of the television, more than any other activity, but this figure fell steadily to 12 hours in 2015 and to just 8 hours in 2025. Meeting people in person and reading followed a similar, though gentler, downward trend, dropping from 7 to 5 hours and from 5 to 3.5 hours respectively.",
            pt: "Em 2005, os adultos passavam 15 horas por semana em frente à televisão, mais do que em qualquer outra atividade, mas esse número caiu de forma constante para 12 horas em 2015 e para apenas 8 horas em 2025. Encontrar pessoas pessoalmente e ler seguiram uma tendência de queda parecida, embora mais suave, passando de 7 para 5 horas e de 5 para 3,5 horas, respectivamente.",
            comentario: "Agrupa tudo o que caiu. Números escolhidos (início e fim, e o meio só para a TV), não a tabela inteira. “Respectively” resume dois dados numa frase só; “similar, though gentler” compara as quedas.",
          },
          {
            papel: "Detalhe 2",
            en: "By contrast, the time spent on social media rose dramatically, from only 2 hours in 2005 to 8 hours a decade later. By 2025 it had reached 13 hours, overtaking television by 5 hours. Sport and exercise also became more popular, although the increase was modest, from 3 to 4.5 hours over the twenty-year period.",
            pt: "Em contraste, o tempo nas redes sociais subiu de forma impressionante, de apenas 2 horas em 2005 para 8 horas uma década depois. Em 2025, chegou a 13 horas, ultrapassando a televisão em 5 horas. Esporte e exercícios também ficaram mais populares, embora o aumento tenha sido modesto, de 3 para 4,5 horas ao longo dos vinte anos.",
            comentario: "O grupo que subiu, com comparação direta (“overtaking television by 5 hours”). Past perfect (“By 2025 it had reached”) e “although the increase was modest” mostram variedade gramatical. Nenhuma causa ou opinião — só os dados. Cerca de 200 palavras no total.",
          },
        ],
      },
      treino: [
        {
          pergunta: "Qual frase é um bom overview para esta tabela?",
          opcoes: [
            "Television fell from 15 to 12 and then to 8 hours.",
            "Overall, social media became the most popular activity, while most other pastimes declined.",
            "I think people should read more and use social media less.",
            "The table has five activities and three years.",
          ],
          resposta: 1,
          explicacao: "Overview = tendência geral, sem números. A primeira é detalhe, a terceira é opinião (proibida na Task 1) e a quarta só descreve a tabela, sem dizer o que ela mostra.",
        },
        {
          pergunta: "Qual frase NÃO deveria aparecer num relatório da Task 1?",
          opcoes: [
            "Reading dropped from 5 to 3.5 hours.",
            "Sport rose slightly over the period.",
            "Social media grew because smartphones became cheaper.",
            "By 2025, social media had overtaken television.",
          ],
          resposta: 2,
          explicacao: "A tabela não diz nada sobre preço de smartphone. Explicar causas que os dados não mostram é especulação e tira ponto de Task Achievement.",
        },
        {
          pergunta: "De 3 para 4,5 horas em vinte anos é...",
          opcoes: ["a dramatic rise", "a modest increase", "a sharp fall", "stable"],
          resposta: 1,
          explicacao: "Um aumento pequeno: “modest”, “slight” ou “gradual”. “Dramatic” serve para redes sociais (de 2 para 13). Escolher o adjetivo certo para o tamanho da mudança conta em Lexical Resource.",
        },
        {
          pergunta: "Qual é a melhor forma de organizar os parágrafos de detalhe?",
          opcoes: [
            "Uma linha da tabela por parágrafo, na mesma ordem.",
            "Um parágrafo por ano: 2005, 2015 e 2025.",
            "Agrupar por padrão: o que caiu num parágrafo, o que subiu no outro.",
            "Começar pelo menor número e ir até o maior.",
          ],
          resposta: 2,
          explicacao: "Agrupar pelo padrão facilita a comparação e mostra que você entendeu os dados — conta em Coherence and Cohesion e em Task Achievement.",
        },
        {
          pergunta: "Complete: “In 2025, adults spent 13 hours on social media, ___ only 8 on television.”",
          opcoes: ["whereas", "because", "so", "therefore"],
          resposta: 0,
          explicacao: "“Whereas” (ou “while”) compara dois dados contrastantes na mesma frase. “Because”, “so” e “therefore” criariam relação de causa que não existe.",
        },
        {
          tipo: "ordenar",
          pergunta: "Monte a frase de comparação:",
          palavras: ["Social", "media", "overtook", "television", "as", "the", "most", "popular", "activity."],
          extras: ["more", "than"],
          explicacao: "“Overtake... as the most popular” descreve uma troca de liderança com um verbo só. É mais preciso que “became bigger than”.",
        },
        {
          tipo: "ordenar",
          pergunta: "Monte a frase com o tempo verbal certo para um marco no passado:",
          palavras: ["By", "2025,", "the", "figure", "had", "reached", "13", "hours."],
          extras: ["has", "reach"],
          explicacao: "“By + ano no passado” pede past perfect (had reached): o número já tinha chegado lá naquele ponto. “Has reached” seria present perfect, que não combina com uma data fechada.",
        },
      ],
    },
  },
};

export default atividade;
