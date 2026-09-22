import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Gestão Empresarial e Estratégica",
  introducao:
    "Análise SWOT (matriz FOFA), Ciclo PDCA, cálculo de Retorno sobre Investimento (ROI) e liderança na resolução de conflitos de equipe.",
  itens: [
    {
      id: "swot",
      titulo: "Matriz SWOT (Análise FOFA)",
      cenario:
        "A Matriz SWOT é uma ferramenta essencial para o planejamento estratégico. Ela mapeia o ambiente interno e externo da empresa.",
      instrucao: "Relacione cada cenário ao seu respectivo quadrante.",
      campos: [
        {
          id: "swot-row1",
          rotulo:
            "A empresa possui uma equipe altamente qualificada, tecnologia de ponta patenteada e processos internos muito eficientes. (Ambiente Interno Positivo)",
          regra: {
            tipo: "selecao",
            esperado: "forca",
            opcoes: [
              { valor: "forca", texto: "Força (Strengths)" },
              { valor: "fraqueza", texto: "Fraqueza (Weaknesses)" },
              { valor: "ameaca", texto: "Ameaça (Threats)" },
            ],
          },
          mensagemCerta: "Perfeito! Qualidades internas são Forças (Strengths). Perigos vindos de fora são Ameaças (Threats).",
          mensagemErrada: "Incorreto. Controle interno positivo é Força. O que vem de fora e atrapalha é uma Ameaça.",
        },
        {
          id: "swot-row2",
          rotulo:
            "Entrada de novos concorrentes internacionais no mercado com preços mais agressivos e novas regulamentações governamentais restritivas. (Ambiente Externo Negativo)",
          regra: {
            tipo: "selecao",
            esperado: "ameaca",
            opcoes: [
              { valor: "forca", texto: "Força (Strengths)" },
              { valor: "fraqueza", texto: "Fraqueza (Weaknesses)" },
              { valor: "ameaca", texto: "Ameaça (Threats)" },
            ],
          },
          mensagemCerta: "Perfeito! Qualidades internas são Forças (Strengths). Perigos vindos de fora são Ameaças (Threats).",
          mensagemErrada: "Incorreto. Controle interno positivo é Força. O que vem de fora e atrapalha é uma Ameaça.",
        },
      ],
    },
    {
      id: "pdca",
      titulo: "Ciclo PDCA e Melhoria Contínua",
      cenario:
        "O PDCA é o método interativo de gestão em quatro passos usado para controle e melhoria contínua de processos.",
      instrucao: "Julgue as definições de suas etapas.",
      campos: [
        {
          id: "pdca-row1",
          rotulo:
            "1. Na fase \"P\" (Plan / Planejar), a gestão deve identificar o problema, estabelecer metas, e criar um plano de ação sólido antes de executar qualquer tarefa.",
          regra: {
            tipo: "selecao",
            esperado: "V",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta:
            "Exato! Planejar antes de agir é vital (V). No 'C' nós Checamos/Verificamos, para então Agir corretivamente no 'A' e reiniciar o ciclo; não cancelamos sumariamente (F).",
          mensagemErrada:
            "Atenção: A primeira afirmação sobre 'Plan' está correta (V). Mas 'Check' significa Checar/Verificar os erros para ajustar, não Cancelar o projeto (A segunda é Falsa).",
        },
        {
          id: "pdca-row2",
          rotulo:
            "2. Na fase \"C\" (Check / Checar), caso sejam encontrados erros na execução, o projeto deve ser sumariamente cancelado (Cancel), sendo proibido refazer o planejamento.",
          regra: {
            tipo: "selecao",
            esperado: "F",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta:
            "Exato! Planejar antes de agir é vital (V). No 'C' nós Checamos/Verificamos, para então Agir corretivamente no 'A' e reiniciar o ciclo; não cancelamos sumariamente (F).",
          mensagemErrada:
            "Atenção: A primeira afirmação sobre 'Plan' está correta (V). Mas 'Check' significa Checar/Verificar os erros para ajustar, não Cancelar o projeto (A segunda é Falsa).",
        },
      ],
    },
    {
      id: "roi",
      titulo: "Retorno sobre o Investimento (ROI)",
      cenario:
        "O ROI é um indicador financeiro que mostra quanto a empresa ganhou em relação ao que foi investido em um projeto. A fórmula básica em percentual é: ((Receita Gerada - Custo) ÷ Custo) × 100.",
      instrucao:
        "Projeto de Expansão de Vendas Online. Calcule e digite o percentual do ROI deste projeto (apenas o número, sem o sinal de %).",
      tabelaReferencia: {
        colunas: ["Indicador", "Valor em Reais (R$)"],
        linhas: [
          ["Custo Total do Projeto (Investimento)", "R$ 10.000,00"],
          ["Receita Total Gerada pelo Projeto", "R$ 50.000,00"],
          ["Fórmula aplicada", "((50.000 - 10.000) ÷ 10.000) × 100"],
        ],
      },
      campos: [
        {
          id: "roi-percentual",
          placeholder: "Exemplo: 50",
          regra: { tipo: "numero", esperado: 400 },
          mensagemCerta:
            "Cálculo exato! Um lucro de 40 mil sobre 10 mil investidos representa um Retorno de 400% (a empresa quadruplicou o que aplicou).",
          mensagemErrada: "Incorreto. Subtraia 10.000 de 50.000. Pegue o resultado (40.000), divida por 10.000 e multiplique por 100.",
        },
      ],
    },
    {
      id: "lideranca",
      titulo: "Gestão de Equipes e Resolução de Conflitos",
      cenario:
        "Como Gerente Operacional, você percebeu que sua equipe está altamente desmotivada nos últimos 3 meses. As metas não estão sendo batidas e há discussões constantes entre os membros do setor, gerando um clima organizacional tóxico.",
      instrucao:
        "Qual deve ser a postura imediata de um bom líder diante desse cenário? (Mínimo de 10 palavras). Você deve mencionar a necessidade de dar \"feedback\", praticar a \"escuta ativa / diálogo\", e/ou \"reavaliar\" as metas.",
      campos: [
        {
          id: "lideranca-resposta",
          placeholder:
            "Ex: O gestor deve promover uma reunião para ouvir ativamente a equipe, entender os obstáculos e aplicar um feedback construtivo, reavaliando as metas se estiverem irreais...",
          regra: {
            tipo: "texto",
            minPalavras: 10,
            minCaracteres: 30,
            palavrasChave: /feedback|ouvir|escuta|escutar|diálogo|conversar|reavaliar|empatia|metas/i,
          },
          mensagemCerta:
            "Ótima postura de liderança! O líder atua como facilitador: promovendo a escuta ativa (entender a dor), resolvendo atritos via feedback e ajustando o planejamento irreal.",
          mensagemErrada:
            "A atitude gerencial exige comunicação. Mencione que você deve dar 'feedback', 'ouvir/escutar' a equipe, criar um 'diálogo', ou 'reavaliar' as metas impostas.",
        },
      ],
    },
    {
      id: "kanban-pratica",
      titulo: "Planejamento Estratégico com Kanban",
      cenario:
        "A gestão visual de projetos ajuda a equipe a saber exatamente em qual etapa cada tarefa está. Ferramentas como Kanban (To Do, Doing, Done) são vitais na gestão moderna. Utilize o Trello, Miro ou Canva para criar um quadro Kanban simples simulando o fluxo de um pequeno projeto da empresa.",
      instrucao: "Cole abaixo o link público de compartilhamento do seu quadro.",
      campos: [
        {
          id: "kanban-link",
          placeholder: "https://trello.com/b/... ou https://miro.com/...",
          regra: { tipo: "padrao", padrao: /^https?:\/\/(www\.)?(trello\.com|canva\.com|miro\.com)\/.+/i },
          mensagemCerta: "Link validado! O uso do Kanban otimiza o fluxo de trabalho e garante que nenhum prazo estratégico seja esquecido.",
          mensagemErrada: "URL inválida. Certifique-se de colar um link público do Trello (trello.com), Miro (miro.com) ou Canva (canva.com).",
        },
      ],
    },
  ],
};

export default atividade;
