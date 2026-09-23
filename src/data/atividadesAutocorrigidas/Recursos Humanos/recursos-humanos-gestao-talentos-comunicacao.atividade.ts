import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const OPCOES_AVALIACAO = [
  { valor: "90graus", texto: "Avaliação 90 Graus (Líder-Liderado)" },
  { valor: "360graus", texto: "Avaliação 360 Graus" },
  { valor: "auto", texto: "Autoavaliação" },
];

const OPCOES_VF = [
  { valor: "V", texto: "Verdadeiro (V)" },
  { valor: "F", texto: "Falso (F)" },
];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Gestão de Talentos e Comunicação",
  introducao: "Métodos de avaliação de desempenho, treinamento e desenvolvimento, comunicação interna e feedback.",
  itens: [
    {
      id: "metodos-avaliacao-desempenho",
      titulo: "Métodos de Avaliação de Desempenho",
      cenario:
        "O setor de RH está reformulando o ciclo de avaliações da empresa. Associe o conceito correto a cada metodologia de Avaliação de Desempenho:",
      campos: [
        {
          id: "avaliacao-por-todos",
          rotulo: "O colaborador é avaliado por todos à sua volta: líder, pares (colegas do mesmo nível), subordinados e até clientes externos.",
          regra: { tipo: "selecao", esperado: "360graus", opcoes: OPCOES_AVALIACAO },
          mensagemCerta:
            "Perfeito! 360 Graus envolve todos; Autoavaliação é reflexão própria; e 90 Graus é o gestor avaliando o subordinado.",
          mensagemErrada: "Incorreto. Revise os conceitos: Todos os lados = 360 Graus; Reflexão própria = Autoavaliação; Apenas Chefe = 90 Graus.",
        },
        {
          id: "avaliacao-autocritica",
          rotulo: "O próprio colaborador faz uma análise crítica sobre seus pontos fortes, fraquezas e resultados alcançados no período.",
          regra: { tipo: "selecao", esperado: "auto", opcoes: OPCOES_AVALIACAO },
          mensagemCerta:
            "Perfeito! 360 Graus envolve todos; Autoavaliação é reflexão própria; e 90 Graus é o gestor avaliando o subordinado.",
          mensagemErrada: "Incorreto. Revise os conceitos: Todos os lados = 360 Graus; Reflexão própria = Autoavaliação; Apenas Chefe = 90 Graus.",
        },
        {
          id: "avaliacao-gestor-subordinado",
          rotulo: "É o método mais tradicional, onde o gestor imediato avalia o desempenho de seu subordinado direto.",
          regra: { tipo: "selecao", esperado: "90graus", opcoes: OPCOES_AVALIACAO },
          mensagemCerta:
            "Perfeito! 360 Graus envolve todos; Autoavaliação é reflexão própria; e 90 Graus é o gestor avaliando o subordinado.",
          mensagemErrada: "Incorreto. Revise os conceitos: Todos os lados = 360 Graus; Reflexão própria = Autoavaliação; Apenas Chefe = 90 Graus.",
        },
      ],
    },
    {
      id: "treinamento-desenvolvimento-vf",
      titulo: "Treinamento & Desenvolvimento",
      cenario: "Treinar e desenvolver talentos são conceitos complementares, mas com focos distintos. Julgue as afirmações abaixo:",
      campos: [
        {
          id: "vf-treinamento-curto-prazo",
          rotulo:
            "1. O \"Treinamento\" é uma ação de curto prazo, focada em capacitar o colaborador para realizar as tarefas imediatas do seu cargo atual (Hard Skills).",
          regra: { tipo: "selecao", esperado: "V", opcoes: OPCOES_VF },
          mensagemCerta: "Correto! Treinamento é imediato/técnico (V). Desenvolvimento foca no longo prazo, liderança e soft skills (F).",
          mensagemErrada:
            "Atenção: o Treinamento é para o presente (Verdadeiro), mas o Desenvolvimento prepara a pessoa para o futuro e foca muito no comportamento (Falso).",
        },
        {
          id: "vf-desenvolvimento-apenas-softwares",
          rotulo:
            "2. O \"Desenvolvimento\" foca exclusivamente em ensinar o uso de novos softwares operacionais, ignorando o preparo comportamental e a formação de futuros líderes (Soft Skills).",
          regra: { tipo: "selecao", esperado: "F", opcoes: OPCOES_VF },
          mensagemCerta: "Correto! Treinamento é imediato/técnico (V). Desenvolvimento foca no longo prazo, liderança e soft skills (F).",
          mensagemErrada:
            "Atenção: o Treinamento é para o presente (Verdadeiro), mas o Desenvolvimento prepara a pessoa para o futuro e foca muito no comportamento (Falso).",
        },
      ],
    },
    {
      id: "termo-comunicacao-interna",
      titulo: "Comunicação e Engajamento Interno",
      cenario:
        "A Comunicação Organizacional possui vertentes voltadas para fora (clientes) e para dentro (colaboradores). Existe um termo técnico muito utilizado pelo RH e Marketing que define as ações, campanhas e estratégias voltadas exclusivamente para encantar e engajar o público interno (os próprios funcionários da empresa).",
      instrucao: "Qual é a palavra exata (um único termo) que define o \"Marketing Interno\" de uma organização?",
      campos: [
        {
          id: "termo-comunicacao-interna",
          placeholder: "Digite a palavra exata...",
          regra: { tipo: "padrao", padrao: /^endo\s?marketing$/i },
          mensagemCerta: "Exato! O Endomarketing é a estratégia de engajamento e comunicação institucional voltada para dentro da empresa.",
          mensagemErrada: "Incorreto. O termo exato para \"Marketing Interno\" é Endomarketing.",
        },
      ],
    },
    {
      id: "feedback-pos-avaliacao",
      titulo: "Reunião de Feedback Pós-Avaliação",
      cenario:
        "Após a rodada de Avaliação de Desempenho, você (Analista de RH) acompanha o gestor em uma reunião de feedback. O colaborador avaliado recebe notas baixas no quesito \"Trabalho em Equipe\", cruza os braços, eleva o tom de voz e se coloca na defensiva, negando os fatos.",
      instrucao:
        "Com base nas boas práticas de Relações Interpessoais, como você deve conduzir e contornar essa situação? (Dica: cite a importância da escuta ativa, manter a calma/empatia e fornecer um feedback construtivo/desenvolvimento).",
      campos: [
        {
          id: "feedback-pos-avaliacao",
          placeholder: "Descreva sua abordagem para acalmar os ânimos e tornar a reunião produtiva...",
          regra: {
            tipo: "texto",
            minPalavras: 8,
            minCaracteres: 30,
            palavrasChave: /escuta|ouvir|empatia|calma|construtivo|desenvolver|desenvolvimento|solução|mediar/i,
          },
          mensagemCerta:
            "Excelente abordagem! Ouvir com empatia, não revidar e manter o foco no desenvolvimento transforma o feedback de um conflito para uma oportunidade de melhoria.",
          mensagemErrada:
            "Faltam atitudes essenciais na resolução de conflitos. Mencione a prática da \"escuta ativa\", manter a \"empatia/calma\" ou focar em um feedback \"construtivo\".",
        },
      ],
    },
    {
      id: "material-treinamento-link",
      titulo: "Criação de Material para Treinamento",
      cenario:
        "A comunicação visual é essencial para engajar equipes durante os treinamentos. Utilize o Canva (para criar um infográfico/cartaz de treinamento) ou o Google Slides (para criar a capa de uma apresentação de Onboarding).",
      instrucao: "Cole abaixo o link público de compartilhamento do seu material (Canva ou Google Slides):",
      campos: [
        {
          id: "material-treinamento-link",
          placeholder: "https://www.canva.com/... ou https://docs.google.com/presentation/...",
          regra: { tipo: "padrao", padrao: /^https?:\/\/(www\.)?(canva\.com|docs\.google\.com)\/.+/i },
          mensagemCerta: "Link validado! O material visual enriquecerá muito os processos de T&D.",
          mensagemErrada: "URL inválida. Por favor, insira o link público de compartilhamento do Canva ou Google Slides.",
        },
      ],
    },
  ],
};

export default atividade;
