import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Gestão de Pessoas/
 * Avaliação - Gestão de Pessoas (Múltipla Escolha).prova.js): mesmas 8
 * perguntas e o mesmo gabarito do arquivo original. Metade virou dissertativa
 * autocorrigida, usando a resposta certa original como base das
 * `respostasAceitas`.
 */
const prova: ProvaInterativa = {
  tipo: "mista",
  titulo: "Avaliação — Gestão de Pessoas",
  perguntas: [
    {
      tipo: "dissertativa",
      pergunta: "O que é \"Gestão de Pessoas\"?",
      respostasAceitas: ["administrar o capital humano", "práticas para administrar o capital humano"],
    },
    {
      pergunta: "O que é \"recrutamento e seleção\"?",
      opcoes: [
        "O processo de demitir funcionários",
        "O processo de atrair e escolher candidatos para preencher vagas",
        "O pagamento de salários",
        "A avaliação de desempenho anual",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que é \"clima organizacional\"?",
      respostasAceitas: ["percepção coletiva dos funcionários", "ambiente de trabalho"],
    },
    {
      pergunta: "Para que serve a \"avaliação de desempenho\"?",
      opcoes: [
        "Apenas para punir funcionários",
        "Para medir e melhorar o desempenho dos colaboradores, identificando pontos fortes e de melhoria",
        "Para decidir o horário de almoço",
        "Para calcular o estoque da empresa",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que é \"treinamento e desenvolvimento\" (T&D)?",
      respostasAceitas: ["capacitar e desenvolver as habilidades", "capacitar os colaboradores"],
    },
    {
      pergunta: "O que caracteriza uma boa liderança na gestão de pessoas?",
      opcoes: [
        "Impor ordens sem ouvir a equipe",
        "Inspirar, orientar e desenvolver a equipe, com boa comunicação",
        "Ignorar os problemas da equipe",
        "Tratar todos de forma indiferente",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que é \"employer branding\"?",
      respostasAceitas: ["imagem da empresa como um bom lugar para trabalhar", "employer branding"],
    },
    {
      pergunta: "Por que a comunicação interna é importante na gestão de pessoas?",
      opcoes: [
        "Não tem impacto na empresa",
        "Melhora o engajamento, alinhamento e clima entre os colaboradores",
        "Serve apenas para informar feriados",
        "É responsabilidade exclusiva do RH, sem envolver gestores",
      ],
      correta: 1,
    },
  ],
};

export default prova;
