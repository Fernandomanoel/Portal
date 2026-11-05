import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Projeto é um esforço temporário para criar um produto, serviço ou resultado único. O curso apresenta o ciclo de vida do projeto, a definição do escopo, o cronograma, os riscos, a comunicação e as ferramentas de acompanhamento, incluindo o método ágil.",
  topicos: [
    {
      titulo: "O que é projeto e gestão de projetos",
      texto: [
        "Projeto tem início e fim definidos, é único e envolve recursos limitados. Difere de uma rotina (que se repete). A gestão de projetos equilibra escopo (o que será entregue), prazo, custo e qualidade; mexer em um deles afeta os outros, o chamado triângulo das restrições.",
      ],
      pontos: ["Diferenciar projeto de atividade contínua.", "Explicar as restrições de escopo, prazo e custo."],
    },
    {
      titulo: "Fases do projeto",
      texto: [
        "As fases típicas: iniciação (justificar e autorizar), planejamento (escopo, cronograma, custos, riscos), execução, monitoramento e controle (comparar o realizado com o planejado) e encerramento (entregar, avaliar e registrar as lições aprendidas).",
      ],
      pontos: ["Listar as fases e o que acontece em cada uma."],
    },
    {
      titulo: "Escopo, EAP e cronograma",
      texto: [
        "O escopo diz o que está dentro e fora do projeto. A EAP (Estrutura Analítica do Projeto) divide o trabalho em partes menores, até pacotes que dá para estimar e atribuir. O cronograma ordena as atividades no tempo, com prazos, dependências e responsáveis. O gráfico de Gantt mostra isso em barras. O caminho crítico é a sequência que determina o prazo mínimo do projeto.",
      ],
      pontos: ["Fazer uma EAP simples.", "Ler um gráfico de Gantt."],
      erros: ["Não definir o que está fora do escopo e deixar o projeto crescer sem controle."],
    },
    {
      titulo: "Riscos, custos e comunicação",
      texto: [
        "Risco é um evento incerto que pode afetar o projeto. Gerenciar riscos é identificar, avaliar (probabilidade e impacto), planejar a resposta e acompanhar. O orçamento estima os custos de cada atividade e reserva uma margem para imprevistos. O plano de comunicação define quem recebe qual informação, quando e por qual canal.",
      ],
      pontos: ["Montar uma matriz simples de riscos.", "Definir quem precisa ser informado e quando."],
    },
    {
      titulo: "Métodos ágeis e ferramentas",
      texto: [
        "O método tradicional planeja tudo antes; o ágil entrega em ciclos curtos (sprints) e ajusta com base no retorno. O Scrum define papéis (dono do produto, time, Scrum Master) e cerimônias (planejamento, reunião diária, revisão e retrospectiva). Quadros Kanban (a fazer, fazendo, feito) tornam o trabalho visível. Ferramentas (Trello, planilhas, softwares de projeto) são apoio, não o método em si.",
      ],
      pontos: ["Diferenciar o tradicional do ágil.", "Montar um quadro Kanban simples."],
    },
  ],
  glossario: [
    { termo: "Escopo", definicao: "O que será e o que não será entregue no projeto." },
    { termo: "EAP", definicao: "Estrutura Analítica do Projeto: divisão do trabalho em partes." },
    { termo: "Gantt", definicao: "Gráfico de barras com as atividades no tempo." },
    { termo: "Sprint", definicao: "Ciclo curto de trabalho no Scrum." },
    { termo: "Kanban", definicao: "Quadro visual de acompanhamento das tarefas." },
    { termo: "Stakeholder", definicao: "Pessoa ou grupo afetado pelo projeto ou com interesse nele." },
  ],
  dicas: [
    "Faça um projeto real e pequeno na turma (uma feira, uma confraternização) e use o quadro Kanban durante o curso.",
    "Peça que cada equipe liste os riscos do próprio projeto e o que fará se acontecerem.",
    "Mostre que planejar não é prever tudo: é decidir o que fazer quando algo mudar.",
  ],
};

export default conteudo;
