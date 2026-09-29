import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Crédido e Cobrança/
 * prova-credito-e-cobranca.prova.html): mesmas 10 questões e o mesmo
 * gabarito do HTML original (`const gabarito`/`PRATICAS`). As duas questões
 * práticas (9, 10) já eram dissertativas por natureza no original — viraram
 * dissertativa autocorrigida aqui, com a decisão final (a parte expressável
 * como frase curta) como resposta aceita; o cálculo em si o professor
 * confere se a questão cair "a revisar". Mais três das perguntas objetivas
 * também viraram dissertativa, para fechar a metade.
 */
const prova: ProvaInterativa = {
  tipo: "mista",
  titulo: "Avaliação — Crédito e Cobrança",
  perguntas: [
    {
      tipo: "dissertativa",
      pergunta: "Na análise pelos 5 C's do crédito, o \"C\" de Capacidade refere-se a quê?",
      respostasAceitas: ["capacidade de geração de recursos", "renda e fluxo de caixa"],
    },
    {
      pergunta: "Sobre o score de crédito, é correto afirmar:",
      opcoes: [
        "É uma pontuação estatística que estima a probabilidade de inadimplência; é um apoio à decisão, não um veto automático à concessão.",
        "É uma lista de devedores mantida em conjunto pelos bancos, na qual o cliente passa a constar automaticamente ao atrasar qualquer parcela.",
        "É definido pelo próprio cliente ao preencher a ficha cadastral.",
        "Score baixo impede legalmente a concessão de crédito por qualquer instituição.",
      ],
      correta: 0,
    },
    {
      pergunta: "Ao calcular o comprometimento de renda de um proponente, a prática correta é:",
      opcoes: [
        "Considerar a renda bruta e apenas a parcela do novo financiamento.",
        "Considerar somente as dívidas já existentes, pois a nova parcela ainda não foi contratada.",
        "Considerar a renda líquida e somar a nova parcela às parcelas de dívidas já existentes.",
        "Usar o limite do cartão de crédito como se fosse renda disponível.",
      ],
      correta: 2,
    },
    {
      tipo: "dissertativa",
      pergunta: "Qual das alternativas seria uma garantia real: aval, fiança, alienação fiduciária ou carta de recomendação?",
      respostasAceitas: ["alienação fiduciária"],
    },
    {
      pergunta: "Segundo o Código de Defesa do Consumidor, por quanto tempo uma informação negativa pode permanecer nos cadastros de proteção ao crédito?",
      opcoes: ["Por prazo indeterminado, até a quitação da dívida.", "No máximo 5 anos.", "No máximo 10 anos.", "No máximo 2 anos."],
      correta: 1,
    },
    {
      pergunta:
        "Um operador ligou para o vizinho do devedor informando o valor da dívida e ameaçou \"mandar um oficial buscar os móveis\" caso não houvesse pagamento no mesmo dia. Sobre essa conduta, é correto afirmar:",
      opcoes: [
        "É permitida, desde que a dívida realmente exista.",
        "É irregular somente se o devedor apresentar reclamação formal por escrito junto ao órgão de defesa do consumidor da sua cidade.",
        "É permitida apenas após 90 dias de atraso.",
        "É irregular: o CDC veda expor o consumidor a constrangimento ou ameaça na cobrança, e a exposição da dívida a terceiros fere o sigilo.",
      ],
      correta: 3,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que é a régua de cobrança (aging) em uma carteira de crédito?",
      respostasAceitas: ["segmentação dos títulos por faixas de dias de atraso", "régua de cobrança"],
    },
    {
      pergunta: "A sequência que representa corretamente as fases do processo de cobrança é:",
      opcoes: [
        "Judicial → extrajudicial → administrativa → preventiva.",
        "Preventiva (antes do vencimento) → administrativa (contato direto) → extrajudicial (protesto/negativação) → judicial.",
        "Administrativa → preventiva → judicial → extrajudicial.",
        "Todas as fases devem ocorrer simultaneamente desde o primeiro dia de atraso, de modo a aumentar a pressão exercida sobre o devedor.",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta:
        "Análise de crédito — proposta nº 4471, financiamento de um sofá em 10 parcelas. Renda líquida comprovada: R$ 3.200,00. Parcelas de dívidas " +
        "já existentes: R$ 640,00. Parcela do crédito solicitado: R$ 480,00. Score 620 (faixa média), sem restrições no CPF, 2 anos de emprego. " +
        "Política da empresa: comprometimento máximo de 30% da renda líquida. Comprometimento (%) = (parcelas atuais + parcela nova) ÷ renda líquida × 100. " +
        "Parcela máxima = (renda líquida × limite da política) − parcelas atuais. Calcule o comprometimento, a parcela máxima permitida, e diga qual decisão " +
        "está de acordo com a política da empresa.",
      respostasAceitas: ["não aprovar o valor solicitado", "negociar entrada ou reduzir a parcela"],
    },
    {
      tipo: "dissertativa",
      pergunta:
        "Cálculo de cobrança — parcela de R$ 800,00 vencida em 10/03, paga em 25/03 (15 dias de atraso). Multa = valor da parcela × 2%. " +
        "Juros de mora = valor da parcela × (1% ÷ 30) × dias de atraso. Total = parcela + multa + juros. Calcule a multa, os juros de mora e o total a pagar.",
      respostasAceitas: ["820"],
    },
  ],
};

export default prova;
