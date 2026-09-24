import type { AtividadeIngles } from "@/types/ingles";

const atividade: AtividadeIngles = {
  slug: "conversas-trabalho",
  titulo: "Trabalho e E-mail — ASAP, FYI e o Tom Certo",
  descricao: "E-mails e chat de empresa com ASAP, FYI, EOD, OOO e cc, e a diferença entre escrever para o gerente e para o colega do lado.",
  nivel: "Intermediário",
  trilha: "vida-real",
  cor: "#0f766e",
  abertura: {
    titulo: "O inglês do escritório",
    texto: "No trabalho o inglês tem as próprias abreviações e um cuidado a mais com o tom. Você vai ler um e-mail do gerente, uma conversa no chat da equipe e um pedido de folga — e ver o que é formal, o que é neutro e o que só cabe entre colegas.",
  },
  conteudo: {
    tipo: "conversas",
    conversas: [
      {
        titulo: "Pedido da gerente",
        canal: "email",
        situacao: "A Karen, gerente, escreve para o Paulo, analista novo na empresa. Repare nas abreviações de e-mail e no tom.",
        pessoas: ["Karen Lee", "Paulo Silva"],
        falas: [
          {
            quem: 0,
            assunto: "Sales report – need by EOD",
            texto: "Hi Paulo,\n\nCould you please send me the sales report by EOD? The director asked for it ASAP.\n\nFYI, the meeting with the client moved to Thursday. I've attached the new agenda.\n\nThanks,\nKaren",
            traducao: "Oi, Paulo. Você pode, por favor, me mandar o relatório de vendas até o fim do dia? O diretor pediu o quanto antes. Para sua informação, a reunião com o cliente mudou para quinta. Anexei a nova pauta. Obrigada, Karen",
          },
          {
            quem: 1,
            assunto: "RE: Sales report – need by EOD",
            texto: "Hi Karen,\n\nSure, I'll send it by 5 p.m. Quick question: should I include the numbers from last month?\n\nBest regards,\nPaulo",
            traducao: "Oi, Karen. Claro, envio até as 17h. Uma dúvida rápida: devo incluir os números do mês passado? Atenciosamente, Paulo",
          },
          {
            quem: 0,
            assunto: "RE: RE: Sales report – need by EOD",
            texto: "Yes, please. And cc Tom on the email. He's OOO today, but he needs a copy.\n\nThanks!\nKaren",
            traducao: "Sim, por favor. E coloque o Tom em cópia no e-mail. Ele está fora do escritório hoje, mas precisa de uma cópia. Obrigada! Karen",
          },
        ],
        expressoes: [
          { termo: "EOD", porExtenso: "end of day", significado: "até o fim do expediente", registro: "neutro", uso: "Prazos em e-mail e chat de trabalho. Fora do trabalho quase ninguém usa." },
          { termo: "ASAP", porExtenso: "as soon as possible", significado: "o quanto antes", registro: "neutro", uso: "Pedir urgência no trabalho. Com chefe ou cliente, as soon as possible por extenso soa mais educado; ASAP toda hora parece grosseiro." },
          { termo: "FYI", porExtenso: "for your information", significado: "para sua informação, só avisando", registro: "neutro", uso: "Passar uma informação que não precisa de resposta. Com tom seco, pode soar como bronca." },
          { termo: "RE", porExtenso: "reply / regarding", significado: "resposta a", registro: "formal", uso: "Aparece sozinho no assunto quando você responde um e-mail. Você não precisa escrever." },
          { termo: "Could you please", significado: "você poderia, por favor", registro: "formal", uso: "Pedido educado no trabalho. Bem mais gentil que Send me ou I want." },
          { termo: "Best regards", significado: "atenciosamente", registro: "formal", uso: "Fecho de e-mail profissional. Mais leve: Best ou Thanks. Nunca em mensagem para amigo." },
          { termo: "cc", porExtenso: "carbon copy", significado: "com cópia; pôr em cópia", registro: "neutro", uso: "Colocar alguém em cópia no e-mail. Vira verbo: cc Tom = ponha o Tom em cópia." },
          { termo: "OOO", porExtenso: "out of office", significado: "fora do escritório (férias, folga, viagem)", registro: "neutro", uso: "Chat e e-mail de trabalho, e na resposta automática de férias." },
        ],
        perguntas: [
          {
            pergunta: "Até quando o Paulo precisa mandar o relatório?",
            opcoes: ["Até o fim do dia.", "Até quinta-feira.", "Até a semana que vem."],
            resposta: 0,
            explicacao: "EOD = end of day, fim do expediente. Ele promete mandar até as 17h. Quinta é o dia da reunião.",
          },
          {
            pergunta: "O que a Karen pediu ao escrever “cc Tom”?",
            opcoes: ["Colocar o Tom em cópia do e-mail.", "Ligar para o Tom.", "Mandar o relatório só para o Tom."],
            resposta: 0,
            explicacao: "cc = carbon copy: pôr em cópia.",
          },
          {
            pergunta: "Por que o Tom não vai responder hoje?",
            opcoes: ["Ele está fora do escritório.", "Ele está numa reunião com o cliente.", "Ele foi demitido."],
            resposta: 0,
            explicacao: "OOO = out of office, fora do escritório.",
          },
        ],
      },
      {
        titulo: "No chat da equipe",
        canal: "chat-trabalho",
        situacao: "Ana e Ben são colegas de equipe e conversam pelo chat da empresa. É mais solto que o e-mail, mas ainda é trabalho.",
        pessoas: ["Ana", "Ben"],
        falas: [
          { quem: 0, texto: "Hey Ben, got a sec?", traducao: "Oi, Ben, tem um minuto?" },
          { quem: 1, texto: "Sure, what's up?", traducao: "Claro, o que foi?" },
          { quem: 0, texto: "The client call got moved up to 2pm. Can you join?", traducao: "A ligação com o cliente foi adiantada para as 14h. Você consegue participar?" },
          { quem: 1, texto: "Yep, I'll be there. Do I need to prep anything?", traducao: "Sim, vou estar lá. Preciso preparar alguma coisa?" },
          { quem: 0, texto: "Just the slides from Monday. TBH they need a few tweaks.", traducao: "Só os slides de segunda. Pra ser sincera, precisam de uns ajustes." },
          { quem: 1, texto: "On it. I'll ping you when they're ready.", traducao: "Deixa comigo. Te chamo quando estiverem prontos." },
          { quem: 0, texto: "Awesome, thanks! Heads up: the client is a bit picky.", traducao: "Ótimo, obrigada! Só um aviso: o cliente é um pouco exigente." },
          { quem: 1, texto: "Noted!", traducao: "Anotado!" },
        ],
        expressoes: [
          { termo: "got a sec", porExtenso: "have you got a second?", significado: "tem um minuto?", registro: "informal", uso: "Puxar conversa com colega. Com o diretor: Do you have a moment?" },
          { termo: "Yep", porExtenso: "yes", significado: "é, sim", registro: "informal", uso: "Sim descontraído, falando e no chat. Em e-mail formal, yes." },
          { termo: "prep", porExtenso: "prepare", significado: "preparar", registro: "informal", uso: "Chat e fala do trabalho. Em documento, prepare." },
          { termo: "TBH", porExtenso: "to be honest", significado: "pra ser sincero(a)", registro: "informal", uso: "Chat com colegas e amigos. Suaviza uma crítica; no e-mail ao cliente, escreva por extenso." },
          { termo: "On it", porExtenso: "I'm on it", significado: "deixa comigo, já estou fazendo", registro: "neutro", uso: "Responder a um pedido, no chat ou falando. Mostra que você já vai resolver." },
          { termo: "ping", significado: "chamar, mandar mensagem rápida", registro: "neutro", uso: "Verbo de chat de trabalho: I'll ping you = te chamo, te mando mensagem." },
          { termo: "Heads up", significado: "aviso antecipado, fica o alerta", registro: "neutro", uso: "Avisar alguém de algo antes que aconteça. Serve com colega e com chefe." },
          { termo: "Noted", significado: "anotado, entendi", registro: "neutro", uso: "Confirmar que recebeu a informação. Curto, mas educado no trabalho." },
        ],
        perguntas: [
          {
            pergunta: "O que mudou na ligação com o cliente?",
            opcoes: ["Foi adiantada para as 14h.", "Foi cancelada.", "Mudou para segunda-feira."],
            resposta: 0,
            explicacao: "“got moved up to 2pm” = foi adiantada para as 14h. Moved up é adiantar; pushed back é adiar.",
          },
          {
            pergunta: "O que o Ben quis dizer com “I'll ping you”?",
            opcoes: ["Vou te mandar uma mensagem.", "Vou te ligar no celular pessoal.", "Vou te encontrar no almoço."],
            resposta: 0,
            explicacao: "ping é mandar uma mensagem rápida pelo chat.",
          },
          {
            pergunta: "Qual é o “heads up” que a Ana dá?",
            opcoes: ["O cliente é um pouco exigente.", "Os slides estão perfeitos.", "A reunião vai ser presencial."],
            resposta: 0,
            explicacao: "Heads up é um aviso antes da hora: “the client is a bit picky”.",
          },
        ],
      },
      {
        titulo: "Pedindo folga ao gerente",
        canal: "email",
        situacao: "O Rafael precisa de um dia de folga e escreve para o gerente. Compare o tom formal dele com a resposta mais leve do gerente.",
        pessoas: ["Rafael Costa", "David Johnson"],
        falas: [
          {
            quem: 0,
            assunto: "Day off request – Friday, May 10",
            texto: "Dear Mr. Johnson,\n\nI hope you're doing well. I was wondering if I could take Friday, May 10 off. I have a medical appointment in the morning.\n\nI'll make sure my tasks are done by Thursday. Please let me know if that works for you.\n\nKind regards,\nRafael Costa",
            traducao: "Prezado Sr. Johnson, espero que esteja bem. Gostaria de saber se posso folgar na sexta-feira, 10 de maio. Tenho uma consulta médica de manhã. Vou garantir que minhas tarefas estejam prontas até quinta. Por favor, me avise se estiver tudo bem para o senhor. Atenciosamente, Rafael Costa",
          },
          {
            quem: 1,
            assunto: "RE: Day off request – Friday, May 10",
            texto: "Hi Rafael,\n\nNo problem, your PTO is approved. Hope everything goes well at the appointment.\n\nBest,\nDavid",
            traducao: "Oi, Rafael. Sem problema, sua folga está aprovada. Espero que corra tudo bem na consulta. Abraço, David",
          },
          {
            quem: 0,
            assunto: "RE: RE: Day off request – Friday, May 10",
            texto: "Thank you so much, David. I appreciate it.\n\nRafael",
            traducao: "Muito obrigado, David. Agradeço. Rafael",
          },
        ],
        expressoes: [
          { termo: "Dear", significado: "prezado(a)", registro: "formal", uso: "Abrir e-mail formal, principalmente para quem você não conhece bem. Com colega próximo, Hi basta." },
          { termo: "I hope you're doing well", significado: "espero que esteja bem", registro: "formal", uso: "Abertura educada de e-mail de trabalho. Não é pergunta: não precisa de resposta." },
          { termo: "I was wondering if", significado: "gostaria de saber se / será que eu poderia", registro: "formal", uso: "Faz o pedido soar gentil, sem pressionar. Ótimo para pedir algo ao chefe ou a um cliente." },
          { termo: "let me know", significado: "me avise", registro: "neutro", uso: "Pedir retorno. Serve no e-mail formal e na mensagem para amigo." },
          { termo: "Kind regards", significado: "atenciosamente", registro: "formal", uso: "Fecho de e-mail profissional, um pouco mais caloroso que Regards." },
          { termo: "PTO", porExtenso: "paid time off", significado: "folga remunerada (dia de férias ou folga)", registro: "neutro", uso: "Palavra de RH e de trabalho nos EUA. Com amigos, diga day off." },
          { termo: "Best", porExtenso: "best regards / best wishes", significado: "abraço, atenciosamente (leve)", registro: "neutro", uso: "Fecho curto de e-mail de trabalho, entre pessoas que já se conhecem." },
          { termo: "I appreciate it", significado: "agradeço, fico grato(a)", registro: "neutro", uso: "Agradecer de um jeito sincero, no trabalho ou fora dele." },
        ],
        perguntas: [
          {
            pergunta: "Por que o Rafael pediu folga?",
            opcoes: ["Tem uma consulta médica.", "Vai viajar com a família.", "Está doente hoje."],
            resposta: 0,
            explicacao: "“I have a medical appointment in the morning.”",
          },
          {
            pergunta: "Por que o Rafael escreveu “I was wondering if I could...”?",
            opcoes: ["Para fazer o pedido de um jeito educado.", "Porque não sabia a data.", "Porque estava em dúvida se queria folgar."],
            resposta: 0,
            explicacao: "I was wondering if é uma forma gentil de pedir algo, sem soar como ordem.",
          },
          {
            pergunta: "O gerente assinou só “Best, David”. Isso mostra que:",
            opcoes: ["O tom dele é mais próximo e leve.", "Ele ficou bravo.", "Ele recusou o pedido."],
            resposta: 0,
            explicacao: "Best é um fecho curto e simpático. E o pedido foi aprovado: “your PTO is approved”.",
          },
        ],
      },
    ],
  },
};

export default atividade;
