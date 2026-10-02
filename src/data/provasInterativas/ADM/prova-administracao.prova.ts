import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/ADM/prova-administracao.prova.html):
 * mesmas 10 perguntas e o mesmo gabarito do HTML original. Metade virou
 * dissertativa autocorrigida (a resposta certa do HTML original é a base
 * das `respostasAceitas`) — projeto piloto do novo formato misto.
 */
const prova: ProvaInterativa = {
  tipo: "mista",
  titulo: "Prova de Administração",
  perguntas: [
    {
      tipo: "dissertativa",
      pergunta: "Quais são as quatro funções clássicas do processo administrativo?",
      respostasAceitas: ["planejar, organizar, dirigir e controlar", "planejar organizar dirigir e controlar", "podc"],
    },
    {
      pergunta: "Frederick Taylor é considerado o pai de qual escola da administração?",
      opcoes: ["Administração Científica.", "Teoria Clássica.", "Escola das Relações Humanas."],
      correta: 0,
    },
    {
      tipo: "dissertativa",
      pergunta: "Na análise SWOT (ou FOFA), quais elementos compõem o ambiente interno?",
      respostasAceitas: ["forças e fraquezas", "força e fraqueza", "fraquezas e forças", "fraqueza e força"],
    },
    {
      pergunta: "Qual é o foco principal da Teoria das Relações Humanas?",
      opcoes: [
        "A estrutura organizacional e a hierarquia.",
        "O aumento da produtividade via métodos de trabalho.",
        "As pessoas e os grupos sociais dentro da organização.",
      ],
      correta: 2,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que define a \"Missão\" de uma organização?",
      respostasAceitas: ["razão de ser", "propósito atual da empresa", "propósito da empresa"],
    },
    {
      pergunta: "Na administração, o que significa o conceito de \"Eficiência\"?",
      opcoes: [
        "Fazer as coisas da maneira certa, otimizando recursos.",
        "Atingir os objetivos e metas traçados, independente do custo.",
        "Relacionar a empresa com o ambiente externo.",
      ],
      correta: 0,
    },
    {
      tipo: "dissertativa",
      pergunta: "Qual estilo de liderança é focado na participação dos subordinados no processo de decisão?",
      respostasAceitas: ["liderança democrática", "estilo democrático", "democrática"],
    },
    {
      pergunta: "A ferramenta de qualidade que busca identificar a causa raiz de um problema é:",
      opcoes: ["Diagrama de Ishikawa (Espinha de Peixe).", "Matriz BCG.", "Fluxograma."],
      correta: 0,
    },
    {
      tipo: "dissertativa",
      pergunta: "O Ciclo PDCA é uma ferramenta de:",
      respostasAceitas: ["melhoria contínua", "melhoria de processos"],
    },
    {
      pergunta: "Qual nível da pirâmide organizacional lida com decisões de longo prazo e diretrizes gerais?",
      opcoes: ["Nível Estratégico.", "Nível Tático.", "Nível Operacional."],
      correta: 0,
    },
  ],
};

export default prova;
