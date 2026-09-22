import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const OPCOES_CAPACITACAO = [
  { valor: "upskilling", texto: "Upskilling (Aprimoramento de habilidades no mesmo cargo)" },
  { valor: "reskilling", texto: "Reskilling (Requalificação total para uma nova função/cargo)" },
];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Gestão de Pessoas IV — Carreira em Y, Modelo CHA e Offboarding",
  introducao:
    "Aprenda a mapear o Triângulo de Competências (CHA), estruturar trilhas de Carreira em Y, aplicar estratégias de Upskilling e Reskilling, conduzir Entrevistas de Desligamento éticas e gerir times híbridos. Preencha os campos diretamente na página e use o botão \"Corrigir atividade\" para conferir: campos com resposta objetiva são conferidos de verdade, e os demais são checados quanto ao preenchimento real (digitação aleatória é identificada e invalidada).",
  itens: [
    {
      id: "modelo-cha-atitude",
      titulo: "Gestão por Competências: O Triângulo CHA (Saber, Saber Fazer, Querer Fazer)",
      cenario:
        "Na gestão de pessoas, o modelo CHA desmembra uma competência em três pilares essenciais. Qual alternativa descreve corretamente o pilar da Atitude (Querer Fazer)?",
      campos: [
        {
          id: "modelo-cha-atitude",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "É o conhecimento teórico acumulado em cursos e graduações (Saber).",
              "É a postura comportamental, motivação, proatividade e comprometimento em colocar em prática o conhecimento teórico (Querer Fazer).",
              "É o domínio técnico e operacional de uma ferramenta específica (Saber Fazer).",
            ],
            correta: 1,
          },
          mensagemCerta: "Correto! A Atitude (Querer Fazer) refere-se ao comportamento, proatividade e motivação para agir.",
          mensagemErrada: "Incorreto. A opção B descreve a Atitude no modelo CHA (Saber = Conhecimento, Habilidade = Saber fazer, Atitude = Querer fazer).",
        },
      ],
    },
    {
      id: "carreira-em-y",
      titulo: "Arquitetura de Trilhas de Carreira: A Carreira em Y",
      cenario:
        "Um profissional técnico de alta senioridade não deseja gerenciar pessoas ou equipes, mas quer continuar crescendo em remuneração e impacto na empresa. Explique como a Carreira em Y atende a esse profissional e qual a diferença entre a vertente de Gestão e a de Especialista/Técnica.",
      campos: [
        {
          id: "carreira-y-gestao",
          rotulo: "Foco da Trilha de GESTÃO (Liderança)",
          placeholder: "Ex: Gestão de pessoas, liderança de equipes, desenvolvimento de liderados e metas estratégicas...",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
        {
          id: "carreira-y-especialista",
          rotulo: "Foco da Trilha de ESPECIALISTA (Técnica)",
          placeholder: "Ex: Aprofundamento técnico, arquitetura de soluções, inovação e mentoria técnica sem gestão de pessoas...",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
      ],
    },
    {
      id: "upskilling-reskilling",
      titulo: "Desenvolvimento Contínuo: Upskilling vs. Reskilling",
      instrucao: "Associe o desafio de capacitação do colaborador à estratégia de desenvolvimento adequada para a transformação digital:",
      campos: [
        {
          id: "capacitacao-mesmo-cargo",
          rotulo: "Aprimorar e aprofundar as competências que o colaborador já possui no seu cargo atual para que ele atue de forma mais eficiente com novas tecnologias.",
          regra: { tipo: "selecao", esperado: "upskilling", opcoes: OPCOES_CAPACITACAO },
          mensagemCerta: "Perfeito! Upskilling = aprimorar a função atual; Reskilling = requalificar para um novo cargo.",
          mensagemErrada: "Incorreto. Verifique a diferença entre aprimorar (Upskilling) e requalificar (Reskilling).",
        },
        {
          id: "capacitacao-nova-funcao",
          rotulo: "Requalificar integralmente um profissional cujo cargo foi automatizado para que ele assuma uma função completamente nova na empresa.",
          regra: { tipo: "selecao", esperado: "reskilling", opcoes: OPCOES_CAPACITACAO },
          mensagemCerta: "Perfeito! Upskilling = aprimorar a função atual; Reskilling = requalificar para um novo cargo.",
          mensagemErrada: "Incorreto. Verifique a diferença entre aprimorar (Upskilling) e requalificar (Reskilling).",
        },
      ],
    },
    {
      id: "entrevista-desligamento",
      titulo: "Processo de Desligamento Humanizado e Entrevista de Desligamento",
      cenario:
        "O encerramento do ciclo de um colaborador é tão importante quanto o seu onboarding. Qual é a principal finalidade estratégica da Entrevista de Desligamento (Exit Interview) e como conduzila com ética para colher dados de melhoria contínua?",
      campos: [
        {
          id: "entrevista-desligamento",
          placeholder:
            "Explique a coleta de feedbacks sinceros sobre o clima, liderança e processos, a identificação das causas reais de saída e a manutenção do relacionamento positivo (Employer Branding/Alumni)...",
          regra: { tipo: "texto", minPalavras: 4, minCaracteres: 15, palavrasChave: /feedback|motiv|saíd|causa|melhoria|clima|lideranç|relacionament|process/i },
          mensagemErrada: "Mencione termos como feedback, identificação de motivos de saída, melhoria de processos ou clima organizacional.",
        },
      ],
    },
    {
      id: "lideranca-hibrida-assincrona",
      titulo: "Liderança na Era Híbrida e Comunicação Assíncrona",
      cenario:
        "Liderar times distribuídos geograficamente exige migrar da \"cultura do presencialismo\" para a \"cultura de entregas e confiança\". Descreva quais práticas de comunicação assíncrona e alinhamento por entregas evitam a microgestão e aumentam a autonomia dos liderados.",
      campos: [
        {
          id: "lideranca-hibrida-assincrona",
          placeholder:
            "Discorra sobre documentação centralizada de processos, foco em resultados (OKRs/KPIs) em vez de horas logadas, alinhamentos claros de prioridades e respeito à autonomia e ao tempo focado...",
          regra: { tipo: "texto", minPalavras: 4, minCaracteres: 15, palavrasChave: /assíncron|entrega|confianç|autonomi|document|metas|resultado|process/i },
          mensagemErrada: "Mencione práticas como comunicação assíncrona, foco em entregas/resultados, autonomia ou documentação.",
        },
      ],
    },
  ],
};

export default atividade;
