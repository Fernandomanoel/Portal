import type { ProvaInterativa } from "@/types/quiz";

/**
 * Reorganizada a partir de Portal-Atividades (provas/Auxiliar Médico/
 * prova-auxiliar-medico.prova.html). Os mesmos assuntos da prova antiga
 * (sigilo, higienização, perfurocortantes, resíduos, limites de atuação,
 * classificação de risco, ficha de atendimento, sinais vitais, prontuário e
 * preparo de exames), agora em 10 situações do dia a dia da clínica, cada uma
 * com uma decisão a tomar. As questões 6 e 7 seguem o mesmo caso (a paciente
 * da recepção). Corrigida na hora.
 */
const prova: ProvaInterativa = {
  tipo: "mista",
  titulo: "Auxiliar Médico — Avaliação Prática: Um Dia na Clínica",
  perguntas: [
    {
      pergunta:
        "Situação 1 — Telefone. O filho de uma paciente liga para a clínica e pede o resultado do exame da mãe. Ele diz que é quem cuida dela e que ela não sabe usar o celular. O que você faz?",
      opcoes: [
        "Informa o resultado, porque o parentesco de primeiro grau autoriza o acesso.",
        "Informa o resultado se ele souber o nome completo e a data de nascimento da mãe.",
        "Explica que o resultado só é entregue à paciente ou a quem ela autorizou formalmente, e orienta como a autorização pode ser feita.",
        "Informa só a parte do laudo que estiver dentro dos valores normais.",
      ],
      correta: 2,
    },
    {
      pergunta:
        "Situação 2 — Entre dois atendimentos. Você acabou de ajudar com um curativo e, ao tirar as luvas, vê sangue visível na sua mão. O próximo paciente já está na porta. O que fazer?",
      opcoes: [
        "Passar álcool 70%, que resolve qualquer situação em segundos.",
        "Trocar de luvas e chamar o paciente, porque luva dispensa lavar as mãos.",
        "Lavar as mãos com água e sabão, porque com sujidade visível o álcool 70% não substitui a lavagem.",
        "Lavar as mãos só ao final do plantão, para não atrasar o atendimento.",
      ],
      correta: 2,
    },
    {
      pergunta:
        "Situação 3 — Coleta de sangue. Terminada a coleta, a agulha ainda está na sua mão e a caixa de perfurocortantes já chegou à linha de preenchimento máximo. Qual é a conduta correta?",
      opcoes: [
        "Reencapar a agulha com as duas mãos e jogar no lixo comum, para proteger quem recolhe.",
        "Colocar a agulha na caixa mesmo cheia, empurrando para caber.",
        "Descartar a agulha sem reencapar numa caixa rígida nova e avisar para a caixa cheia ser fechada e trocada.",
        "Deixar a agulha sobre a bancada até alguém trazer outra caixa.",
      ],
      correta: 2,
    },
    {
      pergunta:
        "Situação 4 — Fim do curativo. Na sala restaram: uma gaze com sangue, um frasco de medicamento vencido, um copo descartável usado para água e a agulha de uma injeção. Qual é a destinação correta de cada um?",
      opcoes: [
        "Gaze: grupo D (comum). Medicamento vencido: grupo A. Copo: grupo B. Agulha: grupo D.",
        "Gaze: grupo A (infectante). Medicamento vencido: grupo B (químico). Copo: grupo D (comum). Agulha: grupo E (perfurocortante).",
        "Tudo no saco branco leitoso, porque está tudo na sala de procedimentos.",
        "Gaze e agulha no grupo E. Medicamento vencido no grupo D. Copo no grupo A.",
      ],
      correta: 1,
    },
    {
      pergunta:
        "Situação 5 — Balcão. Um paciente conta que o remédio que o médico receitou \"não fez efeito nenhum\" e pede que você mande tomar o dobro. A farmácia ao lado também sugeriu trocar por outro mais barato. O que o auxiliar deve fazer?",
      opcoes: [
        "Orientar o dobro da dose, já que o paciente relatou que não teve efeito.",
        "Autorizar a troca por um similar, porque a farmácia já sugeriu.",
        "Dizer qual é o provável diagnóstico e deixar o paciente decidir sozinho.",
        "Não alterar dose nem trocar o medicamento: registrar o relato e comunicar ao médico ou ao enfermeiro responsável.",
      ],
      correta: 3,
    },
    {
      pergunta:
        "Situação 6 — Recepção (parte 1 do caso). Atendimento em 10/03/2026. A paciente diz: \"Meu nome é Ana Beatriz Souza Lima, nasci em 12 de março de 1958. Tô com uma dor no peito desde ontem à noite e hoje começou a puxar pro braço esquerdo. Já tomei um remédio de pressão que a minha vizinha me deu.\" Como preencher a ficha (idade em anos completos e queixa)?",
      opcoes: [
        "66 anos. Diagnóstico: infarto, porque é o quadro mais provável para essa idade.",
        "67 anos. Queixa principal com as palavras da paciente: dor no peito desde ontem à noite, irradiando para o braço esquerdo, e remédio de pressão tomado por conta própria.",
        "67 anos. Observações gerais: \"paciente passando mal desde ontem\".",
        "65 anos. Deixar a queixa em branco, porque só o médico escreve na consulta.",
      ],
      correta: 1,
    },
    {
      pergunta: "Situação 7 — Recepção (parte 2 do caso). Com a ficha pronta, qual deve ser a sua conduta imediata?",
      opcoes: [
        "Pedir que aguarde a ordem de chegada, como os demais pacientes da recepção.",
        "Orientar que repita o remédio de pressão da vizinha enquanto espera.",
        "Encaminhar já à classificação de risco, informando dor no peito com irradiação para o braço: a ordem segue a gravidade, não a chegada.",
        "Pedir que volte amanhã em jejum para colher exames antes da consulta.",
      ],
      correta: 2,
    },
    {
      pergunta:
        "Situação 8 — Triagem. Você aferiu um adulto em repouso: pressão 150 x 96 mmHg (referência: até 129 x 84); frequência cardíaca 104 bpm (60 a 100); frequência respiratória 18 irpm (12 a 20); temperatura axilar 37,2 °C (35,5 a 37,4); saturação 97% (95% ou mais). Qual leitura e qual conduta estão corretas?",
      opcoes: [
        "Tudo normal, porque só há alteração real quando três ou mais parâmetros estão fora.",
        "Pressão e frequência cardíaca fora da referência: comunicar ao enfermeiro ou ao médico, repetir a aferição após repouso e registrar as duas medidas.",
        "Só a pressão alterada: orientar que o paciente meça de novo numa farmácia e volte se a pressão continuar alta.",
        "Pressão, frequência cardíaca e temperatura alteradas: dar o anti-hipertensivo que ele costuma usar.",
      ],
      correta: 1,
    },
    {
      pergunta:
        "Situação 9 — Prontuário. Ao registrar, você percebe que anotou a pressão de outro paciente na ficha errada. Como corrigir?",
      opcoes: [
        "Apagar com corretivo e escrever o valor certo por cima.",
        "Riscar com um traço simples, mantendo o texto legível, escrever o valor correto ao lado e assinar com data e hora; registro nunca se apaga nem se rasura.",
        "Arrancar a folha e refazer a ficha, para o prontuário ficar limpo.",
        "Deixar como está e corrigir só se alguém perguntar.",
      ],
      correta: 1,
    },
    {
      pergunta:
        "Situação 10 — Agendamento. Uma paciente fará todos os exames do pedido no mesmo dia, às 08h00: glicemia de jejum (jejum de 8 horas), colesterol total e frações (jejum de 12 horas), hemograma completo (sem jejum) e ultrassonografia de abdome total (jejum de 6 horas + bexiga cheia). Quando há vários exames no mesmo dia, vale a exigência mais rigorosa. Qual orientação você dá?",
      opcoes: [
        "Jejum de 8 horas, o do primeiro exame da lista, e refazer o colesterol em outra data.",
        "Nenhum jejum, porque o hemograma é o exame principal do pedido.",
        "Jejum de 6 horas, o menor, para ela não ficar tanto tempo sem comer.",
        "Jejum de 12 horas, com água liberada, e beber água antes do ultrassom sem urinar até o exame.",
      ],
      correta: 3,
    },
  ],
};

export default prova;
