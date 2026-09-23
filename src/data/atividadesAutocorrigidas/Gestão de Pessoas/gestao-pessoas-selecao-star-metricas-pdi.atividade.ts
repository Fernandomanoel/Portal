import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const OPCOES_ENPS = [
  { valor: "promotores", texto: "Promotores (Engajados e defensores da marca empregadora)" },
  { valor: "detratores", texto: "Detratores (Insatisfeitos que geram impacto negativo no clima)" },
];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Gestão de Pessoas II — Seleção STAR, Métricas e PDI",
  introducao:
    "Aprofunde seus conhecimentos em recrutamento por competências (Método STAR), cálculo e análise de indicadores de RH (Turnover e Absenteísmo), avaliação de eNPS, PDI com a regra 70:20:10 e gestão por OKRs. Preencha os campos diretamente na página e use o botão \"Corrigir atividade\" para conferir: campos com resposta objetiva são conferidos de verdade, e os demais são checados quanto ao preenchimento real (digitação aleatória é identificada e invalidada).",
  itens: [
    {
      id: "star-premissa",
      titulo: "Seleção por Competências e Técnica STAR",
      cenario:
        "Ao conduzir uma entrevista estruturada por competências, o recrutador utiliza o método STAR (Situação, Tarefa, Ação e Resultado). Qual é a principal premissa teórica dessa metodologia para prever a performance futura de um candidato?",
      campos: [
        {
          id: "star-premissa",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Focar em perguntas hipotéticas sobre o futuro, como \"o que você faria se ganhasse na loteria?\".",
              "Investigar comportamentos e fatos reais do passado para prever a probabilidade de desempenho futuro do profissional.",
              "Avaliar exclusivamente a prestígio das instituições de ensino listadas no currículo do candidato.",
            ],
            correta: 1,
          },
          mensagemCerta: "Correto! O método STAR baseia-se na investigação de comportamentos passados reais para prever a performance futura.",
          mensagemErrada: "Incorreto. A premissa da Seleção STAR é que comportamentos passados preveem o futuro.",
        },
      ],
    },
    {
      id: "metricas-turnover-absenteismo",
      titulo: "Métricas de RH: Turnover (Rotatividade) e Absenteísmo",
      cenario:
        "Uma empresa identificou alta rotatividade na equipe de tecnologia. Explique a diferença entre os conceitos de Turnover e Absenteísmo e qual o impacto direto na produtividade.",
      campos: [
        {
          id: "conceito-turnover",
          rotulo: "Conceito e impacto do TURNOVER",
          placeholder: "Ex: Taxa de substituição/rotatividade de funcionários que entram e saem da empresa...",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
        {
          id: "conceito-absenteismo",
          rotulo: "Conceito e impacto do ABSENTEÍSMO",
          placeholder: "Ex: Índice de ausências, faltas não justificadas e atrasos da equipe durante o expediente...",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
      ],
    },
    {
      id: "classificacao-enps",
      titulo: "Mensuração de Engajamento: eNPS (Employee Net Promoter Score)",
      instrucao:
        "Associe as notas atribuídas na pergunta do eNPS (\"Em uma escala de 0 a 10, o quanto você recomendaria nossa empresa como um bom lugar para trabalhar?\") à classificação do colaborador:",
      campos: [
        {
          id: "enps-notas-9-10",
          rotulo: "Colaboradores que respondem com notas 9 ou 10",
          regra: { tipo: "selecao", esperado: "promotores", opcoes: OPCOES_ENPS },
          mensagemCerta: "Perfeito! Notas 9-10 são Promotores e notas 0-6 são Detratores no cálculo do eNPS.",
          mensagemErrada: "Incorreto. Verifique a classificação das notas do eNPS.",
        },
        {
          id: "enps-notas-0-6",
          rotulo: "Colaboradores que respondem com notas de 0 a 6",
          regra: { tipo: "selecao", esperado: "detratores", opcoes: OPCOES_ENPS },
          mensagemCerta: "Perfeito! Notas 9-10 são Promotores e notas 0-6 são Detratores no cálculo do eNPS.",
          mensagemErrada: "Incorreto. Verifique a classificação das notas do eNPS.",
        },
      ],
    },
    {
      id: "pdi-70-20-10",
      titulo: "Desenvolvimento de Talentos: PDI e a Regra 70:20:10",
      cenario:
        "O modelo de desenvolvimento 70:20:10 defende que o aprendizado adulto ocorre de forma combinada. Explique como estruturar as ações de um PDI (Plano de Desenvolvimento Individual) dividindo as origens de aprendizado (prática, interações e cursos).",
      campos: [
        {
          id: "pdi-70-20-10",
          placeholder:
            "Descreva os componentes: 70% aprendizado prático no trabalho (experiência real), 20% trocas e mentorias (social/feedback) e 10% treinamentos formais/cursos...",
          regra: { tipo: "texto", minPalavras: 4, minCaracteres: 15, palavrasChave: /prátic|experiênc|mentori|troca|curso|treinament|social|70|20|10/i },
          mensagemErrada: "Mencione a divisão entre aprendizado prático (experiência), interações/mentorias e cursos formais.",
        },
      ],
    },
    {
      id: "okr-objetivo-key-results",
      titulo: "Alinhamento Estratégico: Framework OKR em Gestão de Pessoas",
      cenario:
        "Para alinhar os objetivos estratégicos da empresa com o trabalho diário dos times, utilizam-se OKRs. Explique a diferença entre um Objetivo (O) qualitativo e aspiracional e seus Resultados-Chave (KRs) numéricos e mensuráveis.",
      campos: [
        {
          id: "okr-objetivo-key-results",
          placeholder:
            "Explique que o Objetivo (O) traz a direção inspiracional (onde queremos chegar) e os Key Results (KRs) são as métricas numéricas concretas que medem o sucesso do atingimento...",
          regra: { tipo: "texto", minPalavras: 4, minCaracteres: 15, palavrasChave: /objetiv|meta|mensuráv|métric|resultado|número|direção|qualitativ/i },
          mensagemErrada: "Explique a diferença entre o Objetivo inspiracional e os Key Results (KRs) mensuráveis/numéricos.",
        },
      ],
    },
  ],
};

export default atividade;
