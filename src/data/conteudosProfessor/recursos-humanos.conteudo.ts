import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Recursos Humanos cuida de atrair, desenvolver e manter as pessoas da empresa. O curso apresenta os subsistemas de RH, cargos e salários, recrutamento, avaliação de desempenho, treinamento, comunicação interna, relações trabalhistas e benefícios. Regras da lei trabalhista mudam: confirme a legislação vigente.",
  topicos: [
    {
      titulo: "Subsistemas de RH, cargos e salários",
      texto: [
        "O RH se divide em subsistemas: provisão (recrutamento e seleção), aplicação (descrição de cargos, integração), manutenção (remuneração, benefícios, saúde e segurança), desenvolvimento (treinamento, carreira) e monitoramento (avaliação, indicadores). Cargo é o conjunto de tarefas e responsabilidades; a descrição de cargo registra o que a pessoa faz, e a análise de cargos serve de base para classificar e definir o salário.",
        "Plano de cargos e salários organiza os cargos em níveis e faixas salariais justas internamente (equidade) e competitivas no mercado.",
      ],
      pontos: ["Citar os subsistemas do RH.", "Montar a descrição de um cargo.", "Explicar equidade interna e competitividade externa."],
      atividades: ["recursos-humanos-assistente-rh"],
    },
    {
      titulo: "Recrutamento e divulgação de vaga",
      texto: [
        "Recrutamento é atrair candidatos; seleção é escolher entre eles. Pode ser interno (promoção, indicação) ou externo (sites de vagas, redes). O anúncio de vaga deve trazer o cargo, atividades, requisitos, benefícios e como se candidatar, sem discriminar por sexo, idade, cor ou estado civil.",
      ],
      pontos: ["Escrever um anúncio de vaga objetivo e sem discriminação."],
      atividades: ["recursos-humanos-assistente-rh"],
    },
    {
      titulo: "Avaliação de desempenho, treinamento e feedback",
      texto: [
        "Avaliação de desempenho compara o que a pessoa entrega com o esperado. Métodos comuns: autoavaliação, avaliação pelo gestor e a avaliação 360 graus (colegas, subordinados e gestores). Treinamento supre lacunas imediatas; desenvolvimento prepara para crescer. O ciclo é: levantar necessidades, planejar, aplicar e avaliar o resultado.",
        "Feedback é o retorno sobre o desempenho. Um bom feedback é específico (fatos), oportuno, respeitoso e termina com combinados de melhoria. A comunicação interna transmite o que a empresa espera e decide.",
      ],
      pontos: ["Descrever o ciclo do treinamento.", "Aplicar a avaliação 360.", "Dar um feedback construtivo."],
      atividades: ["recursos-humanos-gestao-talentos-comunicacao"],
    },
    {
      titulo: "Relações trabalhistas e conflitos",
      texto: [
        "Conflitos trabalhistas comuns: assédio moral (humilhação repetida), jornadas abusivas, abandono de emprego, faltas graves. A CLT prevê as faltas graves que justificam a dispensa por justa causa (art. 482), como improbidade, desídia e indisciplina. Para ser válida, a justa causa exige prova, proporcionalidade e imediatidade (agir logo).",
        "Acordos e convenções coletivas negociados com o sindicato podem complementar a lei. Teletrabalho tem regras próprias, e o direito à desconexão protege o descanso do empregado fora do expediente.",
      ],
      pontos: ["Explicar o que é assédio moral.", "Citar os requisitos da justa causa.", "Explicar o direito à desconexão."],
      erros: ["Aplicar justa causa sem prova ou muito depois do fato."],
      atividades: ["recursos-humanos-relacoes-trabalhistas-conflitos", "recursos-humanos-relacoes-trabalhistas-conflitos-2"],
    },
    {
      titulo: "Contratos, férias e benefícios",
      texto: [
        "O contrato de experiência dura no máximo 90 dias. Férias: após 12 meses, 30 dias com adicional de 1/3, divisíveis em até três períodos; o empregado pode vender 1/3 (abono pecuniário). Benefícios podem ser obrigatórios (vale-transporte, para quem pede) ou voluntários (plano de saúde, vale-refeição), e fazem parte do pacote de remuneração indireta.",
      ],
      pontos: ["Explicar o abono pecuniário.", "Diferenciar benefício obrigatório de voluntário."],
      atividades: ["recursos-humanos-contratos-ferias-beneficios"],
    },
  ],
  glossario: [
    { termo: "Descrição de cargo", definicao: "Registro das tarefas e responsabilidades de um cargo." },
    { termo: "Avaliação 360°", definicao: "Avaliação feita por gestor, pares, subordinados e o próprio avaliado." },
    { termo: "Feedback", definicao: "Retorno sobre o desempenho de alguém." },
    { termo: "Justa causa", definicao: "Dispensa por falta grave do empregado, prevista em lei." },
    { termo: "Abono pecuniário", definicao: "Venda de até um terço das férias." },
    { termo: "Remuneração indireta", definicao: "Benefícios que complementam o salário." },
  ],
  dicas: [
    "Peça que os alunos escrevam um anúncio de vaga e apontem frases discriminatórias nos de colegas.",
    "Treine feedback em duplas: fato, impacto, pedido.",
    "Leve casos reais (sem nomes) de justa causa e discuta se havia prova, proporcionalidade e imediatidade.",
  ],
};

export default conteudo;
