import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, resposta } from "../ajudantes";
import { comFigura, figura } from "../auxiliarMedicoComum";

const atividade: AtividadeAutocorrigida = {
  titulo: "Auxiliar Médico — Simulado: Paciente Alterado ou que Não Sabe Explicar",
  introducao:
    "Este é um simulado de situações reais: duas pessoas chegam ao consultório em momentos difíceis. Uma está alterada e fala alto; a outra está confusa e não consegue explicar o que sente. Em cada decisão, pense antes de responder: o que você faria de verdade? O objetivo é treinar calma, segurança e a regra de ouro do auxiliar — observar, acolher, chamar ajuda e registrar os fatos, sem nunca diagnosticar.",
  regras: {
    titulo: "Antes de começar",
    itens: [
      "Você não diagnostica, não prescreve e não interpreta: você observa, acolhe e chama quem pode decidir.",
      "Em dúvida sobre a gravidade, trate como urgência e avise o médico ou a equipe.",
      "Nunca deixe sozinha uma pessoa que passa mal ou está desorientada.",
    ],
  },
  itens: [
    comFigura(
      {
        id: "apresentacao-1",
        titulo: "Situação 1 — O Sr. Osvaldo",
        cenario: "São 9h10. O Sr. Osvaldo, 74 anos, chega ao balcão sozinho, aflito e com a voz alta. Diz que está esperando há uma hora (na verdade, são 20 minutos), bate a mão no balcão e responde \"não sei, não sei\" quando você pergunta o que ele está sentindo. A sala de espera está cheia e as pessoas olham.",
        blocos: [
          { tipo: "nota", variante: "dica", texto: "Antes de decidir, releia o quadro de condutas: calma e distância, ouvir, perguntas simples, chamar apoio e registrar." },
        ],
        objetivo: "Perceber que a alteração do paciente quase sempre tem um motivo: medo, dor, confusão. Sua missão é acolher e investigar, e não discutir.",
      },
      figura("conduta-paciente-alterado", "Paciente aflito e atendente calma; embaixo, cinco passos: calma e distância, ouvir, perguntas simples, chamar apoio e registrar.", "Cinco passos diante de um paciente alterado ou desorientado."),
    ),
    escolha({
      id: "primeira-reacao",
      titulo: "Decisão 1 — A primeira reação",
      instrucao: "O Sr. Osvaldo está aflito e fala alto no balcão. O que você faz primeiro?",
      opcoes: [
        "Falar baixo e devagar, chamá-lo pelo nome, convidar a sentar num lugar mais reservado e ouvir o que ele tem a dizer.",
        "Dizer em voz firme: \"Calma, senhor! O senhor está atrapalhando todo mundo\".",
        "Pedir que volte quando estiver mais tranquilo.",
        "Ignorar até ele se acalmar sozinho.",
      ],
      correta: 0,
      explicacao: "Voz baixa, nome e privacidade reduzem a tensão. Mandar \"ter calma\" ou expor a pessoa na frente de todos costuma aumentar a agitação.",
    }),
    comFigura(
      escolha({
        id: "sinal-de-alerta",
        titulo: "Decisão 2 — O que ele diz",
        cenario: "Já sentado na sala reservada, o Sr. Osvaldo respira fundo e diz, apertando o peito: \"Estou com um aperto aqui faz duas horas e me sinto suando frio. Não quis falar antes.\"",
        instrucao: "Qual é a conduta correta?",
        opcoes: [
          "Ficar com ele, avisar o médico ou a equipe imediatamente e acionar o SAMU (192) se for orientada a isso. Não deixá-lo sozinho.",
          "Dizer que deve ser ansiedade e voltar para o balcão.",
          "Oferecer um remédio que você tem na bolsa.",
          "Pedir que espere a sua vez, como os outros pacientes.",
        ],
        correta: 0,
        explicacao: "Dor ou aperto no peito com suor frio é sinal de alerta: avise na hora e fique com a pessoa. Você não diz o que é (não diagnostica) e não medica; chama quem pode decidir.",
      }),
      figura("sinais-de-alerta", "Lista de sinais de alerta em vermelho, o número 192 do SAMU em destaque e orientações enquanto a ajuda não chega.", "Sinais de alerta e o que fazer enquanto a ajuda chega."),
    ),
    escolha({
      id: "situacao-2",
      titulo: "Situação 2 — Dona Marta, que não sabe explicar",
      cenario: "À tarde, chega Dona Marta, 81 anos, sozinha. Ela segura um papel amassado, olha em volta, não lembra por que veio, não sabe o nome do médico e responde \"não sei\" a tudo. Há pouco tempo, ela estava bem, segundo a filha, que ligou mais cedo para avisar que a mãe tinha saído de casa. Você nota que ela parece desorientada e pouco coordenada ao andar.",
      instrucao: "Qual é a melhor conduta?",
      opcoes: [
        "Acomodá-la sentada, fazer perguntas simples uma de cada vez, procurar o cadastro pelo nome e documento, avisar imediatamente o médico ou a equipe sobre a confusão repentina e não deixá-la sozinha.",
        "Dizer que ela deve voltar quando lembrar o motivo.",
        "Pedir que espere na fila, como os demais.",
        "Concluir que \"a idade é assim mesmo\" e dispensá-la.",
      ],
      correta: 0,
      explicacao: "Confusão que surge de repente é sinal de alerta, em qualquer idade. Cabe a você acolher, buscar dados e chamar o médico ou a equipe; nunca concluir que é \"normal da idade\".",
    }),
    escolha({
      id: "perguntas-simples",
      titulo: "Decisão 3 — Como perguntar",
      cenario: "Dona Marta está sentada, olhando para você, e o papel amassado ainda está na mão dela.",
      instrucao: "Qual conjunto de perguntas é o mais adequado para começar?",
      opcoes: [
        "\"Como a senhora se chama?\" (espera a resposta) \"A senhora veio com alguém?\" (espera) \"Pode me mostrar esse papel?\"",
        "\"A senhora tem diabetes, pressão alta, problema de coração, tomou o remédio hoje e o que sentiu ontem?\"",
        "\"Por que a senhora não lembra? Isso não é normal!\"",
        "\"A senhora deveria ter vindo com um acompanhante.\"",
      ],
      correta: 0,
      explicacao: "Uma pergunta curta de cada vez, esperando a resposta, é a forma mais segura. Perguntas em bloco confundem e cobranças só aumentam a angústia.",
    }),
    comFigura(
      escolha({
        id: "registro",
        titulo: "Decisão 4 — Como registrar",
        cenario: "A ocorrência com o Sr. Osvaldo terminou: o médico foi avisado às 9h12 e o atendimento foi conduzido pela equipe. Você precisa registrar o que aconteceu.",
        instrucao: "Qual registro está correto?",
        opcoes: [
          "\"Chegou às 9h10, voz alta, mãos trêmulas. Disse: 'aperto no peito faz duas horas, suando frio'. Médico avisado às 9h12.\"",
          "\"Paciente nervoso, parece infarto, estava exagerando.\"",
          "\"O paciente é difícil e não colabora.\"",
          "Não registrar nada, para evitar problemas.",
        ],
        correta: 0,
        explicacao: "O registro correto traz fatos, horários, palavras do paciente entre aspas e quem foi avisado. Rótulos, julgamentos e diagnósticos não cabem ao auxiliar.",
      }),
      figura("registro-fiel", "Dois registros lado a lado: o ruim, com rótulos e diagnóstico, e o bom, com fatos, aspas e horário.", "Registro ruim x registro bom."),
    ),
    resposta({
      id: "relatorio-final",
      titulo: "Seu relatório do simulado",
      cenario: "Imagine que a ocorrência com a Dona Marta aconteceu às 15h40, que o médico foi avisado às 15h42 e que a filha foi localizada pelo telefone do cadastro às 15h50.",
      instrucao: "Escreva o registro da ocorrência com a Dona Marta, em poucas linhas, como o consultório exigiria: só fatos (o que você viu e ouviu), com horários, citando que o médico foi avisado e que a família foi contatada. Evite diagnóstico e julgamentos.",
      rotulo: "Registro da ocorrência",
      placeholder: "Às 15h40 chegou a paciente Marta, 81 anos, sozinha, desorientada... Às 15h42, o médico foi avisado... Às 15h50, a filha foi localizada...",
      chave: /^(?=[\s\S]*\d{1,2}\s*(h|:)\s*\d{0,2})(?=[\s\S]*m[eé]dico)(?=[\s\S]*(filha|fam[ií]lia|contato))[\s\S]*$/i,
      minPalavras: 30,
      minCaracteres: 160,
    }),
  ],
};

export default atividade;
