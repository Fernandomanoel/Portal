import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/RH/prova-recursos-humanos.prova.html):
 * mesmas 10 questões (todas objetivas no original, sem parte prática) e o
 * mesmo gabarito (`const gabarito`). Metade virou dissertativa
 * autocorrigida, usando a resposta certa original como base das
 * `respostasAceitas`.
 */
const prova: ProvaInterativa = {
  tipo: "mista",
  titulo: "Avaliação — Recursos Humanos (RH)",
  perguntas: [
    {
      tipo: "dissertativa",
      pergunta:
        "Um candidato foi contratado com contrato de experiência de 45 dias. Ao final desse prazo, o gestor pediu para " +
        "prorrogar por mais 45 dias. Passados os 90 dias, ficou em dúvida se poderia prorrogar novamente por mais 30 dias. " +
        "De acordo com a CLT, qual é a orientação correta do RH?",
      respostasAceitas: [
        "não pode prorrogar novamente",
        "uma única prorrogação e o total não pode passar de 90 dias",
        "passa a vigorar por prazo indeterminado",
      ],
    },
    {
      pergunta:
        "Um empregado com 7 anos completos na mesma empresa foi dispensado sem justa causa. Conforme a Lei nº 12.506/2011, quantos dias de aviso prévio lhe são devidos?",
      opcoes: [
        "30 dias, pois o aviso prévio é sempre fixo.",
        "45 dias.",
        "51 dias (30 dias + 3 dias por ano completo de serviço).",
        "90 dias, que é o teto legal aplicado a partir do 5º ano.",
      ],
      correta: 2,
    },
    {
      tipo: "dissertativa",
      pergunta:
        "Após a Reforma Trabalhista (Lei nº 13.467/2017), o fracionamento das férias passou a seguir qual regra?",
      respostasAceitas: [
        "até 3 períodos, havendo concordância do empregado",
        "um deles de no mínimo 14 dias corridos e os demais de no mínimo 5 dias corridos",
      ],
    },
    {
      pergunta:
        "Em determinado mês, uma empresa registrou 8 admissões e 12 desligamentos, mantendo um efetivo médio de 200 colaboradores. " +
        "Aplicando a fórmula clássica de turnover — [(admissões + desligamentos) ÷ 2] ÷ efetivo médio × 100 — qual é o índice de rotatividade do período?",
      opcoes: ["2%", "20%", "10%", "5%"],
      correta: 3,
    },
    {
      pergunta: "Qual alternativa distingue corretamente cultura organizacional de clima organizacional?",
      opcoes: [
        "São sinônimos; a diferença é apenas o termo usado por cada autor.",
        "A cultura é o conjunto de valores, crenças e pressupostos enraizados e de mudança lenta; o clima é a percepção momentânea dos colaboradores sobre o ambiente, sendo mais volátil e medido por pesquisa.",
        "A cultura muda rapidamente conforme a liderança; o clima permanece estável por décadas.",
        "O clima é o que está formalizado no regimento interno e no código de conduta da empresa, enquanto a cultura é apenas a percepção informal que os funcionários têm do ambiente no dia a dia.",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que caracteriza essencialmente a avaliação de desempenho 360 graus?",
      respostasAceitas: [
        "avaliado por múltiplas fontes",
        "superior, pares, subordinados",
        "avaliado por várias pessoas, além da autoavaliação",
      ],
    },
    {
      pergunta:
        "O RH precisa orientar um gestor sobre os custos de uma dispensa sem justa causa. Sobre o FGTS, a informação correta é:",
      opcoes: [
        "O empregador deposita 8% da remuneração mensal e, na dispensa sem justa causa, paga multa rescisória de 40% sobre o saldo da conta vinculada.",
        "O empregador deposita 11% da remuneração e a multa rescisória é de 20%.",
        "O desconto de 8% é feito no salário do empregado, e a multa de 40% também é descontada dele.",
        "O FGTS só é devido nos contratos por prazo determinado e nos contratos de aprendizagem, não incidindo sobre os contratos por prazo indeterminado.",
      ],
      correta: 0,
    },
    {
      pergunta: "No modelo de avaliação de treinamento de Kirkpatrick, os quatro níveis são, na ordem:",
      opcoes: [
        "Custo, prazo, escopo e qualidade.",
        "Planejamento, execução, verificação e ação.",
        "Reação, aprendizagem, comportamento e resultados.",
        "Recrutamento, seleção, integração e retenção de talentos.",
      ],
      correta: 2,
    },
    {
      tipo: "dissertativa",
      pergunta:
        "Uma empresa decidiu preencher uma vaga de supervisão exclusivamente por recrutamento interno. Qual é a principal desvantagem dessa escolha?",
      respostasAceitas: [
        "reduzir a renovação de ideias",
        "endogamia",
        "conflito entre os candidatos não promovidos",
      ],
    },
    {
      tipo: "dissertativa",
      pergunta: "Sobre o pagamento do 13º salário (gratificação natalina), qual é a alternativa correta?",
      respostasAceitas: [
        "1ª parcela entre fevereiro e 30 de novembro",
        "2ª até 20 de dezembro",
        "inss e irrf apenas sobre a 2ª parcela",
      ],
    },
  ],
};

export default prova;
