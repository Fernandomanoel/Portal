import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Auxiliar Médico/
 * prova-auxiliar-medico.prova.html): as mesmas 10 questões e o mesmo
 * gabarito. Cada uma das 3 questões práticas (8, 9 e 10) tinha 3 partes com
 * 1/3 de ponto; aqui cada parte é uma pergunta. As partes numéricas (idade,
 * contagens, horas de jejum) eram digitadas e viraram escolha, porque a
 * dissertativa aceita por "contém" e um "2" casaria com "12".
 */
const prova: ProvaInterativa = {
  tipo: "mista",
  titulo: "Auxiliar Médico — Avaliação",
  perguntas: [
    {
      pergunta:
        "Questão 1 — Sigilo profissional. O filho de uma paciente liga para a clínica e pede o resultado do exame dela, dizendo que é ele quem cuida da mãe e que ela não sabe usar o celular. Qual é a conduta correta do auxiliar?",
      opcoes: [
        "Informar, porque o grau de parentesco de primeiro grau autoriza o acesso aos dados da paciente.",
        "Informar apenas se ele confirmar por telefone o nome completo e a data de nascimento da mãe.",
        "Informar somente a parte do laudo que estiver dentro dos valores considerados normais no exame.",
        "Não informar: o resultado só é entregue à paciente ou a quem ela tiver autorizado formalmente.",
      ],
      correta: 3,
    },
    {
      pergunta: "Questão 2 — Higienização das mãos. Sobre a higienização das mãos na assistência, assinale a correta:",
      opcoes: [
        "O álcool 70% substitui a lavagem com água e sabão em qualquer situação, inclusive com sujidade.",
        "Com sujidade visível é obrigatório água e sabão; o álcool 70% não substitui a lavagem nesse caso.",
        "A higienização é necessária apenas antes do contato com o paciente, não depois do atendimento.",
        "O uso de luvas dispensa a higienização das mãos, desde que elas sejam trocadas a cada paciente.",
      ],
      correta: 1,
    },
    {
      pergunta: "Questão 3 — Perfurocortantes. Sobre o descarte de material perfurocortante, é correto afirmar:",
      opcoes: [
        "A agulha vai direto ao recipiente rígido, sem reencapar, respeitando o limite de preenchimento.",
        "A agulha deve ser reencapada com as duas mãos antes do descarte, para proteger quem a manuseia.",
        "O recipiente pode ser preenchido até a borda, desde que seja fechado com fita antes do transporte.",
        "Agulhas e seringas podem ir no lixo comum quando o paciente não tem doença infecciosa conhecida.",
      ],
      correta: 0,
    },
    {
      pergunta: "Questão 4 — Processamento de artigos. Sobre esterilização, desinfecção e antissepsia, assinale a correta:",
      opcoes: [
        "A desinfecção elimina todas as formas de vida, inclusive os esporos, em artigos e em superfícies.",
        "A antissepsia é aplicada em superfícies e bancadas, e a desinfecção é aplicada na pele do paciente.",
        "A esterilização elimina todas as formas de vida, inclusive esporos; a antissepsia atua em tecido vivo.",
        "Os três termos descrevem o mesmo processo, mudando apenas o produto químico que será utilizado.",
      ],
      correta: 2,
    },
    {
      pergunta: "Questão 5 — Resíduos de saúde. Sobre a segregação dos resíduos de serviços de saúde, é correto afirmar:",
      opcoes: [
        "Todos os resíduos gerados no consultório são infectantes e seguem no mesmo saco branco leitoso.",
        "O grupo A é o infectante, o B é o químico, o D é o comum e o E reúne os perfurocortantes.",
        "Medicamentos vencidos são resíduo comum e podem ser descartados junto com o lixo do escritório.",
        "A segregação é feita apenas no expurgo, ao final do turno, e não no local em que o resíduo é gerado.",
      ],
      correta: 1,
    },
    {
      pergunta: "Questão 6 — Limites de atuação. Sobre os limites de atuação do auxiliar na clínica, assinale a correta:",
      opcoes: [
        "Ele pode orientar a troca de medicamento por um similar quando a farmácia não tiver o prescrito.",
        "Ele pode informar ao paciente o provável diagnóstico quando o quadro for evidente e conhecido.",
        "Ele pode ajustar a dose prescrita se o paciente relatar que a medicação não fez efeito nenhum.",
        "Ele atua sob supervisão e não prescreve, não dá diagnóstico e não altera dose de medicamento.",
      ],
      correta: 3,
    },
    {
      pergunta: "Questão 7 — Acolhimento e classificação de risco. Sobre o acolhimento com classificação de risco, é correto afirmar:",
      opcoes: [
        "A ordem de atendimento segue a gravidade do quadro, e não a ordem de chegada dos pacientes.",
        "A ordem de chegada deve ser mantida sempre, pois é o critério mais justo para todos os pacientes.",
        "A classificação de risco é feita pela recepção, que decide quem entra primeiro no consultório.",
        "Pacientes classificados como não urgentes devem ser dispensados e orientados a voltar outro dia.",
      ],
      correta: 0,
    },
    {
      pergunta:
        "Questão 8 (prática: cadastro e ficha de atendimento), parte a. Você está na recepção e vai preencher a ficha a partir da fala da paciente. Data do atendimento: 10/03/2026. A paciente diz no balcão: \"Meu nome é Ana Beatriz Souza Lima, nasci em 12 de março de 1958. Tô com uma dor no peito desde ontem à noite e hoje começou a puxar pro braço esquerdo. Já tomei um remédio de pressão que a minha vizinha me deu.\" Ficha: nome completo Ana Beatriz Souza Lima; data de nascimento 12/03/1958; data do atendimento 10/03/2026; queixa relatada: dor no peito com irradiação para o braço esquerdo. Qual idade registrar na ficha? (A idade é registrada em anos completos na data do atendimento.)",
      opcoes: ["65 anos", "66 anos", "67 anos", "68 anos"],
      correta: 2,
    },
    {
      pergunta: "Questão 8, parte b. Onde e como registrar o que a paciente relatou?",
      opcoes: [
        "No campo de diagnóstico, anotando “infarto”, que é o quadro mais provável para essa idade.",
        "Nas observações gerais, de forma resumida, apenas como “paciente passando mal desde ontem”.",
        "Na queixa principal, com as palavras da paciente, incluindo início, evolução e o remédio usado.",
        "Em nenhum campo por enquanto: a queixa só deve ser escrita pelo médico durante a consulta.",
      ],
      correta: 2,
    },
    {
      pergunta: "Questão 8, parte c. Qual deve ser a sua conduta imediata na recepção?",
      opcoes: [
        "Encaminhar já à classificação de risco, informando dor torácica com irradiação para o braço.",
        "Registrar a ficha e pedir que ela aguarde a ordem de chegada, como os demais da recepção.",
        "Orientar que repita o remédio de pressão da vizinha enquanto aguarda a chamada do médico.",
        "Pedir que retorne amanhã em jejum, porque será preciso colher exames antes da consulta.",
      ],
      correta: 0,
    },
    {
      pergunta:
        "Questão 9 (prática: sinais vitais), parte a. Você aferiu os sinais vitais de um paciente adulto em repouso: pressão arterial 150 x 96 mmHg (referência: até 129 x 84); frequência cardíaca 104 bpm (referência: 60 a 100); frequência respiratória 18 irpm (referência: 12 a 20); temperatura axilar 37,2 °C (referência: 35,5 a 37,4); saturação de oxigênio 97% (referência: 95% ou mais). Quantos parâmetros ficaram fora da faixa de referência?",
      opcoes: ["Nenhum", "1", "2", "3"],
      correta: 2,
    },
    {
      pergunta: "Questão 9, parte b. Como registrar corretamente essas medidas no prontuário?",
      opcoes: [
        "Anotar a lápis para poder corrigir depois, caso a próxima aferição dê um resultado diferente.",
        "Anotar valor, unidade, horário da aferição e quem aferiu, sem rasuras e sem apagar nada.",
        "Anotar somente os valores alterados, pois os que estão normais não mudam a conduta clínica.",
        "Arredondar os valores para facilitar a leitura e registrar tudo apenas ao final do plantão.",
      ],
      correta: 1,
    },
    {
      pergunta: "Questão 9, parte c. Qual é a conduta correta do auxiliar diante desses valores?",
      opcoes: [
        "Administrar o anti-hipertensivo que o paciente costuma usar e repetir a medida em trinta minutos.",
        "Orientar que ele procure uma farmácia para aferir de novo e retorne se o valor continuar alto.",
        "Registrar como normal, pois só há alteração real quando três ou mais parâmetros estão fora.",
        "Comunicar ao enfermeiro ou médico, repetir a aferição após repouso e registrar as duas medidas.",
      ],
      correta: 3,
    },
    {
      pergunta:
        "Questão 10 (prática: agendamento e preparo de exames), parte a. A paciente vai realizar todos os exames do pedido no mesmo dia, às 08h00. Preparo: glicemia de jejum — jejum de 8 horas; colesterol total e frações — jejum de 12 horas; hemograma completo — não exige jejum; ultrassonografia de abdome total — jejum de 6 horas + bexiga cheia. Quantos exames do pedido exigem jejum?",
      opcoes: ["1", "2", "3", "4"],
      correta: 2,
    },
    {
      pergunta:
        "Questão 10, parte b. Quando há vários exames no mesmo dia, vale sempre a exigência mais rigorosa. Qual jejum, em horas, você deve orientar à paciente?",
      opcoes: ["6 horas", "8 horas", "10 horas", "12 horas"],
      correta: 3,
    },
    {
      pergunta: "Questão 10, parte c. Qual orientação deve ser dada à paciente?",
      opcoes: [
        "Jejum de 8 horas, que é o do primeiro exame da lista, refazendo o colesterol em outra data.",
        "Jejum de 6 horas, o menor da lista, para que ela não fique tempo demais sem se alimentar.",
        "Jejum de 12 horas, com água liberada, e beber água antes do ultrassom sem urinar até o exame.",
        "Nenhum jejum, porque o hemograma é o exame principal do pedido e não exige preparo algum.",
      ],
      correta: 2,
    },
  ],
};

export default prova;
