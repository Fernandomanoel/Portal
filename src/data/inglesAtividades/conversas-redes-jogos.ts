import type { AtividadeIngles } from "@/types/ingles";

const atividade: AtividadeIngles = {
  slug: "conversas-redes-jogos",
  titulo: "Redes Sociais e Jogos — DM, GG, FOMO",
  descricao: "Comentários, DM e chat de jogo online: TBT, FOMO, NGL, GG, IRL e as gírias mais novas, com o que cada uma significa e para quem usar.",
  nivel: "Intermediário",
  trilha: "vida-real",
  cor: "#0f766e",
  abertura: {
    titulo: "O inglês da internet",
    texto: "Rede social e jogo online têm um dialeto próprio. São três conversas — comentários num post, o chat de uma partida e dois amigos da internet combinando de se encontrar — com cada sigla explicada. Toque nas palavras sublinhadas.",
  },
  conteudo: {
    tipo: "conversas",
    conversas: [
      {
        titulo: "Comentários num post",
        canal: "rede-social",
        situacao: "A Jess postou uma foto antiga de viagem e o Marco comenta. Depois eles continuam a conversa.",
        pessoas: ["jess.travels", "marco_22"],
        falas: [
          { quem: 0, texto: "TBT to my trip to Rio last summer! Best week ever", traducao: "Relembrando minha viagem ao Rio no verão passado! Melhor semana da vida" },
          { quem: 1, texto: "omg i have serious FOMO rn", traducao: "meu Deus, tô morrendo de vontade de ter ido, agora" },
          { quem: 0, texto: "haha u should come next time!", traducao: "haha você devia vir da próxima vez!" },
          { quem: 1, texto: "for real? DM me the details", traducao: "sério? me manda os detalhes no privado" },
          { quem: 0, texto: "sent! also NGL the food was the best part", traducao: "mandei! e não vou mentir, a comida foi a melhor parte" },
          { quem: 1, texto: "IKR brazilian food is amazing", traducao: "né? comida brasileira é incrível" },
        ],
        expressoes: [
          { termo: "TBT", porExtenso: "throwback Thursday", significado: "relembrando (foto antiga, postada na quinta)", registro: "informal", uso: "Legenda de rede social para foto antiga. Hoje muita gente usa em qualquer dia." },
          { termo: "FOMO", porExtenso: "fear of missing out", significado: "medo de ficar de fora, de perder algo legal", registro: "informal", uso: "Rede social e conversa entre amigos. Já aparece até em matéria de jornal." },
          { termo: "rn", porExtenso: "right now", significado: "agora", registro: "informal", uso: "Só em chat e comentário." },
          { termo: "for real", significado: "sério? / de verdade", registro: "informal", uso: "Mostrar surpresa ou reforçar que é verdade, falando ou no chat." },
          { termo: "DM", porExtenso: "direct message", significado: "mensagem direta, no privado", registro: "neutro", uso: "Conversa privada numa rede social. Vira verbo: DM me = me manda no privado." },
          { termo: "NGL", porExtenso: "not gonna lie", significado: "não vou mentir, sinceramente", registro: "informal", uso: "Antes de uma opinião sincera, em chat e rede social." },
          { termo: "IKR", porExtenso: "I know, right?", significado: "né? pois é!", registro: "informal", uso: "Concordar com empolgação num comentário ou chat." },
        ],
        perguntas: [
          {
            pergunta: "Por que o Marco está com “FOMO”?",
            opcoes: ["Ele queria ter ido na viagem também.", "Ele tem medo de avião.", "Ele perdeu o celular."],
            resposta: 0,
            explicacao: "FOMO = fear of missing out, a sensação de estar perdendo algo legal.",
          },
          {
            pergunta: "O que o Marco pediu com “DM me the details”?",
            opcoes: ["Que a Jess mandasse os detalhes no privado.", "Que ela postasse mais fotos.", "Que ela ligasse para ele."],
            resposta: 0,
            explicacao: "DM = direct message, mensagem privada.",
          },
          {
            pergunta: "“TBT” na legenda de uma foto quer dizer que:",
            opcoes: ["É uma foto antiga, relembrando um momento.", "A foto foi tirada hoje.", "A foto está à venda."],
            resposta: 0,
            explicacao: "TBT = throwback Thursday: postar uma lembrança.",
          },
        ],
      },
      {
        titulo: "Chat da partida",
        canal: "rede-social",
        situacao: "Dois jogadores do mesmo time conversam pelo chat de um jogo online, durante e depois da partida.",
        pessoas: ["xDragon", "Nina_pro"],
        falas: [
          { quem: 0, texto: "gl hf everyone", traducao: "boa sorte e divirtam-se, pessoal" },
          { quem: 1, texto: "ty u2", traducao: "valeu, pra você também" },
          { quem: 0, texto: "brb 2 min, doorbell", traducao: "já volto, 2 minutos, campainha" },
          { quem: 1, texto: "np we'll cover u", traducao: "sem problema, a gente te cobre" },
          { quem: 0, texto: "back. what did i miss?", traducao: "voltei. o que eu perdi?" },
          { quem: 1, texto: "we lost the tower but it's ok. push mid", traducao: "perdemos a torre, mas tudo bem. avança pelo meio" },
          { quem: 1, texto: "GG! that was close", traducao: "boa partida! foi por pouco" },
          { quem: 0, texto: "gg wp nina, u carried us", traducao: "boa partida, jogou bem, Nina, você carregou o time" },
        ],
        expressoes: [
          { termo: "gl hf", porExtenso: "good luck, have fun", significado: "boa sorte, divirta-se", registro: "informal", uso: "Educação no começo de uma partida online." },
          { termo: "ty", porExtenso: "thank you", significado: "valeu, obrigado(a)", registro: "informal", uso: "Chat de jogo e mensagem rápida." },
          { termo: "u2", porExtenso: "you too", significado: "pra você também", registro: "informal", uso: "Responder a um desejo (gl hf, have a nice day) no chat." },
          { termo: "brb", porExtenso: "be right back", significado: "já volto", registro: "informal", uso: "Avisar que vai se afastar do jogo ou do chat por pouco tempo." },
          { termo: "np", porExtenso: "no problem", significado: "sem problema", registro: "informal", uso: "Resposta rápida no chat." },
          { termo: "GG", porExtenso: "good game", significado: "boa partida", registro: "informal", uso: "No fim da partida, de quem ganhou ou perdeu. Dito antes do fim, pode ser deboche, tipo “já era”." },
          { termo: "wp", porExtenso: "well played", significado: "jogou bem", registro: "informal", uso: "Elogio depois da partida, normalmente junto com GG." },
          { termo: "carried", porExtenso: "carry (carregar)", significado: "carregou o time, jogou por todos", registro: "informal", uso: "Gíria de jogo: u carried us = você levou a gente nas costas." },
        ],
        perguntas: [
          {
            pergunta: "Por que o xDragon saiu do jogo por 2 minutos?",
            opcoes: ["A campainha tocou.", "A internet caiu.", "Ele foi almoçar."],
            resposta: 0,
            explicacao: "“brb 2 min, doorbell” = já volto, 2 minutos, campainha.",
          },
          {
            pergunta: "Quando se costuma escrever “GG”?",
            opcoes: ["No fim da partida.", "No começo, antes de jogar.", "Quando alguém entra no time."],
            resposta: 0,
            explicacao: "GG = good game, dito ao terminar. No começo, o normal é gl hf.",
          },
          {
            pergunta: "“u carried us” é:",
            opcoes: ["Um elogio: você jogou pelo time todo.", "Uma reclamação: você atrapalhou.", "Um pedido para carregar o jogo."],
            resposta: 0,
            explicacao: "Carry, na gíria de jogo, é ganhar a partida praticamente sozinho pelo time.",
          },
        ],
      },
      {
        titulo: "Amigos da internet",
        canal: "rede-social",
        situacao: "Olivia e Sam se conheceram num grupo de fãs de uma série e combinam de se encontrar pessoalmente numa convenção.",
        pessoas: ["Olivia", "Sam"],
        falas: [
          { quem: 0, texto: "we've been chatting for months and never met IRL lol", traducao: "a gente conversa há meses e nunca se viu pessoalmente kkk" },
          { quem: 1, texto: "ikr! the con is next month, u going?", traducao: "pois é! a convenção é mês que vem, você vai?" },
          { quem: 0, texto: "def! i already got my ticket", traducao: "com certeza! já comprei meu ingresso" },
          { quem: 1, texto: "same. let's meet at the entrance at 10?", traducao: "eu também. vamos nos encontrar na entrada às 10?" },
          { quem: 0, texto: "bet. i'll be wearing a yellow hoodie", traducao: "fechado. vou estar de moletom amarelo" },
          { quem: 1, texto: "lmk when u get there", traducao: "me avisa quando chegar" },
        ],
        expressoes: [
          { termo: "IRL", porExtenso: "in real life", significado: "na vida real, pessoalmente", registro: "informal", uso: "Diferenciar o mundo online do encontro de verdade." },
          { termo: "lol", porExtenso: "laughing out loud", significado: "kkk", registro: "informal", uso: "Deixa a frase leve ou engraçada." },
          { termo: "ikr", porExtenso: "I know, right?", significado: "pois é!", registro: "informal", uso: "Concordar com empolgação." },
          { termo: "def", porExtenso: "definitely", significado: "com certeza", registro: "informal", uso: "Chat entre amigos." },
          { termo: "same", porExtenso: "same here", significado: "eu também", registro: "informal", uso: "Resposta curta de chat para dizer que com você é igual." },
          { termo: "bet", significado: "fechado, combinado", registro: "informal", uso: "Gíria recente, forte nos EUA entre jovens, para aceitar um plano. Não use com o chefe." },
          { termo: "lmk", porExtenso: "let me know", significado: "me avisa", registro: "informal", uso: "Chat entre amigos. No trabalho, let me know por extenso." },
        ],
        perguntas: [
          {
            pergunta: "O que quer dizer “never met IRL”?",
            opcoes: ["Eles nunca se encontraram pessoalmente.", "Eles nunca conversaram online.", "Eles nunca foram a um show."],
            resposta: 0,
            explicacao: "IRL = in real life, na vida real.",
          },
          {
            pergunta: "Como a Olivia vai estar vestida?",
            opcoes: ["De moletom amarelo.", "De boné vermelho.", "De camiseta da série."],
            resposta: 0,
            explicacao: "“i'll be wearing a yellow hoodie” = vou estar de moletom amarelo.",
          },
          {
            pergunta: "Para quem você responderia só “bet”?",
            opcoes: ["Para um amigo que chamou você para sair.", "Para o diretor da escola.", "Num e-mail para uma empresa."],
            resposta: 0,
            explicacao: "bet é gíria bem informal: com amigos, sim; com diretor ou empresa, não.",
          },
        ],
      },
    ],
  },
};

export default atividade;
