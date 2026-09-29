import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Assistente de Departamento Pessoal/
 * Avaliação - Assistente de Departamento Pessoal.prova.js): mesmas 10
 * perguntas e o mesmo gabarito do arquivo original. Metade virou dissertativa
 * autocorrigida, usando a resposta certa original como base das
 * `respostasAceitas`.
 */
const prova: ProvaInterativa = {
  tipo: "mista",
  titulo: "Avaliação — Assistente de Departamento Pessoal",
  perguntas: [
    {
      tipo: "dissertativa",
      pergunta: "O que o Departamento Pessoal (DP) é responsável por fazer numa empresa?",
      respostasAceitas: ["administrar questões trabalhistas", "folha de pagamento, admissões, demissões", "questões trabalhistas"],
    },
    {
      pergunta: "O que é a \"folha de pagamento\"?",
      opcoes: [
        "Um documento que lista os produtos vendidos",
        "O documento que registra os salários e descontos de todos os funcionários em um período",
        "Um relatório de vendas",
        "Um contrato de fornecedor",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que é a CTPS (Carteira de Trabalho e Previdência Social)?",
      respostasAceitas: ["histórico profissional do trabalhador", "registra o histórico profissional"],
    },
    {
      pergunta: "O que é o \"13º salário\"?",
      opcoes: [
        "Um bônus opcional que a empresa pode ou não pagar",
        "Uma gratificação obrigatória paga aos empregados, geralmente em duas parcelas ao ano",
        "Um décimo terceiro mês de trabalho",
        "Um tipo de multa trabalhista",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que é o FGTS?",
      respostasAceitas: ["fundo de garantia do tempo de serviço", "fundo de garantia"],
    },
    {
      pergunta: "Quantos dias de férias remuneradas um empregado CLT tem direito por ano, em regra geral?",
      opcoes: ["15 dias", "30 dias", "45 dias", "10 dias"],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que é o eSocial?",
      respostasAceitas: ["unifica o envio de informações trabalhistas", "sistema do governo que unifica"],
    },
    {
      pergunta: "O que é o \"aviso prévio\"?",
      opcoes: [
        "Um bônus de fim de ano",
        "A comunicação antecipada, obrigatória por lei, do fim do contrato de trabalho",
        "Um tipo de advertência por mau comportamento",
        "Um benefício de transporte",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que compõe geralmente o processo de admissão de um novo funcionário?",
      respostasAceitas: ["coleta de documentos, exame admissional", "exame admissional e registro"],
    },
    {
      pergunta: "Qual é a jornada de trabalho padrão prevista pela CLT?",
      opcoes: ["44 horas semanais", "60 horas semanais", "20 horas semanais", "80 horas semanais"],
      correta: 0,
    },
  ],
};

export default prova;
