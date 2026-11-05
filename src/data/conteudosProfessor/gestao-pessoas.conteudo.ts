import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Gestão de pessoas olha para o ciclo completo do colaborador: atrair e selecionar, integrar, desenvolver, avaliar, reconhecer e desligar com respeito. O curso traz métodos (seleção STAR, PDI, modelo CHA), métricas de RH, segurança psicológica, diversidade e carreira.",
  topicos: [
    {
      titulo: "Recrutamento, seleção e onboarding",
      texto: [
        "Recrutar é atrair; selecionar é escolher. Etapas comuns: triagem de currículos, entrevista, testes e dinâmica, referências e proposta. Onboarding é a integração do novo colaborador: apresentar a cultura, o time, as ferramentas e o que se espera nos primeiros dias e meses. Um bom onboarding reduz a saída precoce.",
      ],
      pontos: ["Listar as etapas da seleção.", "Planejar os primeiros 30 dias de um novo colaborador."],
      atividades: ["gestao-pessoas-recrutamento-selecao-onboarding"],
    },
    {
      titulo: "Seleção por competências: o método STAR",
      texto: [
        "A entrevista por competências pede exemplos reais do passado, pois o comportamento passado ajuda a prever o futuro. O método STAR organiza a resposta: Situação (o contexto), Tarefa (o que precisava ser feito), Ação (o que a pessoa fez) e Resultado (o que aconteceu). O entrevistador pergunta «conte uma vez em que...».",
      ],
      pontos: ["Fazer uma pergunta comportamental.", "Reconhecer as quatro partes de uma resposta STAR."],
      exemplo: "Situação: pico de pedidos. Tarefa: entregar tudo no prazo. Ação: reorganizou a escala e pediu ajuda. Resultado: 98% das entregas no prazo.",
      atividades: ["gestao-pessoas-selecao-star-metricas-pdi"],
    },
    {
      titulo: "Métricas de RH e PDI",
      texto: [
        "Indicadores comuns: turnover (rotatividade) = desligamentos no período ÷ efetivo médio × 100; absenteísmo = horas de falta ÷ horas previstas × 100; tempo de contratação (dias para preencher uma vaga). Servem para enxergar problemas antes que cresçam.",
        "O PDI (Plano de Desenvolvimento Individual) registra, junto com o gestor, objetivos de desenvolvimento, ações (cursos, mentoria, projetos), prazos e como medir o progresso.",
      ],
      pontos: ["Calcular turnover e absenteísmo.", "Montar um PDI com meta e prazo."],
      exemplo: "5 desligamentos em um quadro médio de 100 pessoas: turnover de 5% no período.",
      atividades: ["gestao-pessoas-selecao-star-metricas-pdi"],
    },
    {
      titulo: "Segurança psicológica, People Analytics e DEI",
      texto: [
        "Segurança psicológica é o sentimento de poder errar, perguntar e discordar sem medo de punição ou humilhação. Equipes que a têm aprendem mais e reportam problemas mais cedo. People Analytics usa dados de pessoas (clima, desempenho, saídas) para decidir melhor, respeitando a privacidade.",
        "DEI significa Diversidade (diferenças presentes na equipe), Equidade (oportunidades justas, que podem exigir tratamentos diferentes) e Inclusão (todos se sentirem parte e ouvidos).",
      ],
      pontos: ["Dar exemplos de ações que criam segurança psicológica.", "Diferenciar diversidade, equidade e inclusão."],
      erros: ["Achar que diversidade é só contratar pessoas diferentes, sem incluir de fato."],
      atividades: ["gestao-pessoas-seguranca-psicologica-people-analytics"],
    },
    {
      titulo: "Carreira em Y, modelo CHA e offboarding",
      texto: [
        "A carreira em Y oferece dois caminhos a partir de certo ponto: gestão (liderar pessoas) ou especialista (aprofundar-se tecnicamente), sem obrigar o bom técnico a virar chefe. O modelo CHA descreve a competência como Conhecimento (saber), Habilidade (saber fazer) e Atitude (querer fazer).",
        "Offboarding é o processo de desligamento: entrevista de saída, devolução de equipamentos, transferência de conhecimento e comunicação respeitosa. Ajuda a aprender com a saída e preserva a imagem da empresa.",
      ],
      pontos: ["Explicar a carreira em Y.", "Classificar uma competência em C, H ou A.", "Listar passos de um offboarding."],
      atividades: ["gestao-pessoas-carreira-y-cha-offboarding"],
    },
  ],
  glossario: [
    { termo: "Onboarding", definicao: "Integração do novo colaborador à empresa." },
    { termo: "STAR", definicao: "Situação, Tarefa, Ação e Resultado." },
    { termo: "Turnover", definicao: "Rotatividade: proporção de desligamentos no quadro." },
    { termo: "PDI", definicao: "Plano de Desenvolvimento Individual." },
    { termo: "CHA", definicao: "Conhecimento, Habilidade e Atitude." },
    { termo: "DEI", definicao: "Diversidade, Equidade e Inclusão." },
  ],
  dicas: [
    "Peça que cada aluno conte uma história pelo STAR e a turma aponte as quatro partes.",
    "Use dados fictícios de uma empresa para calcular turnover e absenteísmo e discutir o que fazer.",
    "Trate DEI com escuta: peça exemplos e evite julgamento na sala.",
  ],
};

export default conteudo;
