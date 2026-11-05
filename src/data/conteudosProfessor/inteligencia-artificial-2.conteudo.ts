import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "A continuação aplica a IA ao trabalho: mapear tarefas que podem ser automatizadas, medir ganho de tempo, usar a IA para analisar dados e escrever melhores prompts, proteger dados, criar vídeos e apresentações e montar relatórios com apoio de IA. O foco é julgamento: o que delegar à IA, o que conferir e o que nunca compartilhar.",
  topicos: [
    {
      titulo: "Onde a IA ajuda no escritório",
      texto: [
        "Tarefas boas para IA: repetitivas, baseadas em texto ou padrões, de baixo risco e fáceis de conferir (rascunhos, resumos, classificação de mensagens, tabelas). Tarefas ruins: decisões com consequências sérias sem revisão, assuntos confidenciais e qualquer coisa que exija responsabilidade legal. Uma técnica simples é listar as tarefas, estimar tempo, frequência e risco, e decidir o que automatizar primeiro.",
      ],
      pontos: ["Classificar uma tarefa como boa ou má candidata à IA.", "Estimar o tempo economizado."],
      exemplo: "Resumir 20 e-mails por dia leva 40 minutos; com IA e revisão, 15. Ganho de 25 minutos por dia.",
      atividades: ["ia2-fundamentos-e-aplicacoes-praticas", "ia2-automatizando-tarefas-repetitivas"],
    },
    {
      titulo: "Técnica de prompt avançada",
      texto: [
        "Prompts fortes têm papel, contexto, tarefa, restrições, formato e critérios de qualidade. Técnicas: dar exemplos (few-shot), pedir o raciocínio passo a passo, dividir tarefas grandes em etapas, pedir que a própria IA critique e melhore sua resposta e fixar o tom de voz. Para avaliar prompts, use uma rubrica: clareza, contexto, formato, restrições e verificabilidade.",
      ],
      pontos: ["Avaliar um prompt por uma rubrica.", "Dividir uma tarefa em etapas."],
      atividades: ["ia2-tecnica-de-prompt"],
    },
    {
      titulo: "Análise de dados com apoio de IA",
      texto: [
        "A IA pode sugerir análises, explicar resultados e escrever fórmulas, mas pode errar cálculos. Regra: peça a análise, depois confira por amostragem com seus próprios cálculos (no Excel, por exemplo). Dados sensíveis devem ser removidos ou anonimizados antes de serem usados. Sempre se pede à IA que mostre como chegou ao resultado.",
      ],
      pontos: ["Conferir um resultado da IA por amostragem.", "Anonimizar dados antes de usar."],
      erros: ["Confiar em um total calculado pela IA sem conferir."],
      atividades: ["ia2-analise-de-dados-potencializada-com-ia"],
    },
    {
      titulo: "Segurança, ética e proteção de dados",
      texto: [
        "Classificar a informação ajuda: pública (pode ir a ferramentas externas), interna (só em ferramentas autorizadas pela empresa) e confidencial ou pessoal (CPF, saúde, contratos), que não deve ser enviada a ferramentas públicas. A LGPD (Lei Geral de Proteção de Dados) protege dados pessoais. Siga a política da empresa e, na dúvida, pergunte antes.",
      ],
      pontos: ["Classificar informações em públicas, internas e confidenciais.", "Dizer o que é a LGPD."],
      atividades: ["ia2-seguranca-e-etica-no-uso-da-ia"],
    },
    {
      titulo: "Tendências e priorização de ideias",
      texto: [
        "Para escolher onde investir em IA, pontue cada ideia por impacto (quanto ganha), esforço (quanto custa para fazer) e risco. Priorizam-se as de alto impacto e baixo esforço. Acompanhar tendências (agentes, multimodalidade, modelos menores) exige senso crítico: nem tudo o que é novidade serve ao seu negócio.",
      ],
      pontos: ["Priorizar ideias por impacto e esforço."],
      atividades: ["ia2-tendencias-e-inovacoes"],
    },
    {
      titulo: "Vídeos, apresentações, relatórios e tabelas vinculadas",
      texto: [
        "Ferramentas de IA geram roteiros, imagens, vídeos curtos e slides (por exemplo, no Canva). O trabalho humano está no roteiro, no objetivo e na revisão final. Em relatórios, a IA ajuda a explicar números e redigir resumos; tabelas vinculadas (Excel e Power BI) atualizam as informações quando a fonte muda, e a IA pode ajudar a escrever as medidas e os textos que acompanham.",
      ],
      pontos: ["Planejar um vídeo curto antes de gerá-lo.", "Explicar o que é uma tabela vinculada."],
      atividades: ["ia2-videos-e-apresentacoes-no-canva", "ia2-relatorios-e-tabelas-vinculadas"],
    },
  ],
  glossario: [
    { termo: "Few-shot", definicao: "Técnica de dar poucos exemplos ao modelo para orientar a resposta." },
    { termo: "Rubrica", definicao: "Lista de critérios para avaliar algo." },
    { termo: "LGPD", definicao: "Lei Geral de Proteção de Dados Pessoais." },
    { termo: "Anonimizar", definicao: "Remover o que identifica uma pessoa nos dados." },
    { termo: "Automação", definicao: "Execução de uma tarefa repetitiva sem trabalho manual." },
  ],
  dicas: [
    "Peça sempre a verificação humana: «a IA rascunhou, quem confere?».",
    "Use casos reais da rotina dos alunos para mapear tarefas e medir o tempo.",
    "Atualize os exemplos com frequência, pois as ferramentas mudam.",
  ],
};

export default conteudo;
