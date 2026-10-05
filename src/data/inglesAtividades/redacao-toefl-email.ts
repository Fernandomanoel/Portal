import type { AtividadeIngles, CriterioRedacao } from "@/types/ingles";
import { ATENCAO_TOEFL_2026, ESCALA_TOEFL } from "./redacao-comum";

const CRITERIOS: CriterioRedacao[] = [
  {
    nome: "Task fulfilment",
    traducao: "Cumprimento da tarefa",
    peso: "Rubrica geral",
    avalia: "Se o e-mail atinge o objetivo da situação e cobre TODOS os tópicos pedidos no enunciado.",
    notaAlta: "Cada tópico do enunciado aparece claramente, desenvolvido com detalhes (datas, motivos, pedido concreto). Quem receber sabe o que fazer.",
    tiraPonto: "Pular um dos tópicos, responder vagamente (“there is a problem”) ou não fazer o pedido que a situação exige.",
    checklist: [
      "Respondi cada um dos tópicos do enunciado",
      "Cada tópico tem pelo menos um detalhe concreto (quando, o quê, por quê)",
      "O pedido final está claro: quem lê sabe o que tem que fazer",
    ],
  },
  {
    nome: "Organization and conventions",
    traducao: "Organização e convenções do e-mail",
    peso: "Rubrica geral",
    avalia: "Se o texto tem forma de e-mail: saudação, motivo logo no início, um assunto por parágrafo, fechamento e despedida.",
    notaAlta: "“Dear Professor Lee,” → motivo na primeira frase → tópicos em ordem → agradecimento e despedida (“Best regards,” + nome).",
    tiraPonto: "Sem saudação ou despedida, motivo só no fim, ou tudo num bloco único.",
    checklist: [
      "Abri com uma saudação adequada a quem vai ler (Dear...)",
      "Disse o motivo do e-mail logo na primeira ou segunda frase",
      "Fechei com agradecimento e despedida (Best regards, + nome)",
    ],
  },
  {
    nome: "Register and tone",
    traducao: "Registro e tom",
    peso: "Rubrica geral",
    avalia: "Se o tom combina com quem recebe e com a situação: educado com professor ou empresa, cordial com colega, firme numa reclamação sem ser grosseiro.",
    notaAlta: "Pedidos indiretos e educados (“Would it be possible to...?”, “I would appreciate it if...”), tom firme e respeitoso.",
    tiraPonto: "Exigência direta (“Give me...”), sarcasmo, abreviação de chat ou intimidade demais com um destinatário formal.",
    checklist: [
      "Fiz os pedidos de forma educada (Would it be possible / I would appreciate)",
      "O tom combina com quem vai ler (professor, gerente, colega)",
    ],
  },
  {
    nome: "Language use and accuracy",
    traducao: "Linguagem e correção",
    peso: "Rubrica geral",
    avalia: "Variedade de frases, vocabulário preciso para a situação e poucos erros de gramática, ortografia e pontuação.",
    notaAlta: "Frases variadas (condicionais, orações com because/which), vocabulário específico e quase nenhum erro.",
    tiraPonto: "Erros que confundem o pedido, frases todas iguais e palavras genéricas (thing, problem) sem detalhe.",
    checklist: [
      "Usei pelo menos uma frase complexa (if, because, which, although)",
      "Revisei concordância, tempos verbais e ortografia",
    ],
  },
];

const atividade: AtividadeIngles = {
  slug: "redacao-toefl-email",
  titulo: "TOEFL — Write an Email e Build a Sentence",
  descricao: "As duas tarefas novas de Writing do TOEFL 2026: um e-mail curto que cobre três tópicos, com o tom certo, e frases montadas na ordem correta.",
  nivel: "Avançado",
  trilha: "redacao",
  cor: "#9f1239",
  abertura: {
    titulo: "Escrever para alguém de verdade",
    texto:
      "No TOEFL de 2026, a seção de Writing começa com Build a Sentence (montar frases a partir de pedaços) e passa para Write an Email: uma situação real, três coisas que o e-mail precisa dizer e poucos minutos. Aqui você aprende o molde do e-mail, os pedidos educados e treina a montagem de frases do jeito que cai na prova.",
  },
  conteudo: {
    tipo: "redacao",
    redacao: {
      proposta: {
        exame: "TOEFL",
        tarefa: "Write an Email",
        minutos: 7,
        minPalavras: 80,
        enunciado: [
          "You recently signed up for a weekend photography workshop at a community centre. However, you have just found out that you need to work on the Saturday morning session.",
          "Write an email to the workshop organiser, Ms. Carter. In your email, do the following:",
        ],
        topicos: [
          "Explain why you cannot attend the Saturday morning session.",
          "Ask whether there is a way to make up the content you will miss.",
          "Suggest a possible solution.",
        ],
        enunciadoPt:
          "Escrever à organizadora explicando por que você não vai à sessão de sábado de manhã, perguntando como recuperar o conteúdo e sugerindo uma solução. Os três tópicos precisam aparecer, com tom educado.",
      },
      guia: [
        ATENCAO_TOEFL_2026,
        {
          titulo: "Write an Email: o formato",
          blocos: [
            {
              tipo: "lista",
              itens: [
                "Tempo de referência: cerca de 7 minutos para ler a situação e escrever.",
                "Você recebe uma situação do dia a dia (faculdade, trabalho, comunidade), o destinatário e três tópicos que o e-mail tem que cobrir.",
                "A ETS não fixa número mínimo de palavras para o e-mail. Neste treino usamos 80 como referência: menos do que isso quase sempre deixa um tópico sem detalhe.",
                "O que mais pesa: cobrir os três tópicos com detalhe e usar o tom adequado a quem vai ler.",
              ],
            },
          ],
        },
        {
          titulo: "O molde do e-mail",
          blocos: [
            {
              tipo: "tabela",
              colunas: ["Parte", "Exemplo"],
              linhas: [
                ["Saudação", "Dear Ms. Carter, / Dear Professor Lee, / Hi Sam, (só para colega próximo)"],
                ["Motivo", "I am writing about the photography workshop this weekend."],
                ["Tópico 1", "Explicação com detalhe: o quê, quando, por quê."],
                ["Tópico 2", "Pergunta educada: Would it be possible to...?"],
                ["Tópico 3", "Sugestão concreta: Perhaps I could... / One option might be..."],
                ["Fechamento", "Thank you for your understanding. I look forward to hearing from you."],
                ["Despedida", "Best regards, + seu nome"],
              ],
            },
            {
              tipo: "dica",
              texto: "Um parágrafo curto por tópico, na ordem do enunciado. Quem corrige confere os tópicos um a um — facilite a vida dele.",
            },
          ],
        },
        {
          titulo: "Pedidos educados: o tom certo",
          blocos: [
            {
              tipo: "exemplos",
              titulo: "Em vez de... use...",
              itens: [
                { en: "Send me the notes. → Would it be possible to send me the notes?", pt: "Ordem direta → pedido educado" },
                { en: "I want to change my session. → I would like to ask whether I could change my session.", pt: "“I want” soa exigente; “I would like” é cortês" },
                { en: "Tell me what to do. → I would appreciate any advice you could give me.", pt: "Pedir conselho sem dar ordem" },
                { en: "Sorry, I can't go. → Unfortunately, I will be unable to attend.", pt: "Mais formal e sem contração" },
              ],
            },
            {
              tipo: "exemplos",
              titulo: "Para sugerir uma solução",
              itens: [
                { en: "Perhaps I could join the Sunday group instead.", pt: "Talvez eu pudesse entrar no grupo de domingo." },
                { en: "One option might be to...", pt: "Uma opção poderia ser..." },
                { en: "If it is convenient for you, I could...", pt: "Se for conveniente para você, eu poderia..." },
              ],
            },
          ],
        },
        {
          titulo: "Build a Sentence: como funciona",
          blocos: [
            {
              tipo: "texto",
              texto:
                "Na primeira tarefa de Writing, você vê uma fala curta de uma conversa e monta a resposta da outra pessoa organizando palavras ou pequenos blocos na ordem correta. Às vezes sobra um bloco que não entra. O que é avaliado: ordem das palavras, estrutura de pergunta, posição de advérbios e preposições.",
            },
            {
              tipo: "lista",
              itens: [
                "Ache primeiro o verbo principal e o sujeito.",
                "Pergunta indireta não inverte: “Do you know where the library IS?”, não “where is the library”.",
                "Advérbios de frequência vêm antes do verbo principal (I usually take...) e depois do “to be” (She is always...).",
                "Tempo, lugar e modo: em geral, lugar antes de tempo (at the library on Monday).",
              ],
            },
            {
              tipo: "dica",
              texto: "Na etapa de treino desta atividade, as questões de montar frase seguem esse formato: leia a fala e monte a resposta.",
            },
          ],
        },
        {
          titulo: "Erros que mais custam nota",
          blocos: [
            {
              tipo: "lista",
              itens: [
                "Esquecer um dos três tópicos — o erro mais comum e o que mais derruba a nota.",
                "Tópico respondido sem detalhe: “I have a problem on Saturday” (que problema? que horas?).",
                "Tom errado: exigir em vez de pedir, ou escrever para um gerente como se fosse um amigo.",
                "Sem saudação ou sem despedida.",
              ],
            },
          ],
        },
      ],
      escala: ESCALA_TOEFL,
      criterios: CRITERIOS,
      modelo: {
        titulo: "E-mail modelo",
        nota: "Escrito para o nível mais alto da rubrica, 5 (estimativa do portal, não nota oficial)",
        paragrafos: [
          {
            papel: "Saudação e motivo",
            en: "Dear Ms. Carter, I am writing about the weekend photography workshop that I signed up for last month.",
            pt: "Prezada Sra. Carter, escrevo sobre o workshop de fotografia de fim de semana em que me inscrevi no mês passado.",
            comentario: "Saudação formal com o nome e o motivo já na primeira frase. A organizadora sabe do que se trata antes de ler o resto.",
          },
          {
            papel: "Tópico 1 — o motivo",
            en: "Unfortunately, I will be unable to attend the Saturday morning session, as my manager has just asked me to cover a colleague's shift from 8 a.m. to 1 p.m. that day.",
            pt: "Infelizmente, não poderei comparecer à sessão de sábado de manhã, pois meu gerente acabou de me pedir para cobrir o turno de um colega das 8h às 13h nesse dia.",
            comentario: "Explica com detalhe concreto (quem pediu, horário). “Unfortunately, I will be unable to” é formal e sem contração.",
          },
          {
            papel: "Tópico 2 — a pergunta",
            en: "Since this session covers lighting techniques, which I was especially looking forward to, I was wondering whether there is any way to make up the material I will miss.",
            pt: "Como essa sessão trata de técnicas de iluminação, que eu estava especialmente ansioso para aprender, gostaria de saber se há alguma forma de recuperar o conteúdo que vou perder.",
            comentario: "Pergunta indireta e educada (“I was wondering whether”), com oração relativa (“which I was especially looking forward to”) para variedade.",
          },
          {
            papel: "Tópico 3 — a sugestão e o fechamento",
            en: "If there is a Sunday group, perhaps I could join that session instead. Alternatively, I would be happy to read any handouts and practise at home. Thank you for your understanding, and I look forward to hearing from you. Best regards, Lucas Almeida",
            pt: "Se houver um grupo de domingo, talvez eu pudesse participar dessa sessão no lugar. Como alternativa, eu leria com prazer qualquer material e praticaria em casa. Obrigado pela compreensão; aguardo seu retorno. Atenciosamente, Lucas Almeida",
            comentario: "Duas sugestões concretas (condicional + “Alternatively”), fechamento cordial e despedida com nome. Os três tópicos cobertos, cerca de 120 palavras.",
          },
        ],
      },
      treino: [
        {
          pergunta: "Qual frase pede de forma adequada a uma organizadora que você não conhece?",
          opcoes: [
            "Send me the class notes now.",
            "Would it be possible to receive the notes from the session?",
            "Gimme the notes pls.",
            "I want the notes.",
          ],
          resposta: 1,
          explicacao: "“Would it be possible to...?” é um pedido indireto e educado. As outras soam como ordem ou usam linguagem de chat.",
        },
        {
          pergunta: "O enunciado pede três tópicos. Seu e-mail explica o motivo e sugere uma solução. O que acontece com a nota?",
          opcoes: [
            "Nada: dois tópicos bem escritos bastam.",
            "Cai, porque a tarefa ficou incompleta: faltou perguntar como recuperar o conteúdo.",
            "Sobe, porque o e-mail ficou mais curto.",
            "Depende só da gramática.",
          ],
          resposta: 1,
          explicacao: "Cobrir todos os tópicos é a base da rubrica. Um tópico faltando limita a nota, por melhor que esteja o inglês.",
        },
        {
          pergunta: "Qual é a melhor primeira frase depois de “Dear Ms. Carter,”?",
          opcoes: [
            "How are you? I hope your family is fine and the weather is nice.",
            "I am writing about the photography workshop this weekend.",
            "I have a big problem.",
            "Best regards.",
          ],
          resposta: 1,
          explicacao: "O motivo logo de cara. Conversa de abertura longa gasta tempo, e “I have a big problem” não diz nada concreto.",
        },
        {
          tipo: "ordenar",
          pergunta: "Build a Sentence — “Is the library open late tonight?” Monte a resposta:",
          palavras: ["I", "am", "not", "sure", "what", "time", "it", "closes."],
          extras: ["does"],
          explicacao: "Pergunta indireta (depois de “I am not sure”) não usa “does” nem inverte: “what time it closes”, não “what time does it close”.",
        },
        {
          tipo: "ordenar",
          pergunta: "Build a Sentence — “How do you usually get to campus?” Monte a resposta:",
          palavras: ["I", "usually", "take", "the", "bus", "to", "campus."],
          extras: ["takes"],
          explicacao: "Advérbio de frequência (usually) antes do verbo principal. Com “I”, o verbo fica sem -s.",
        },
        {
          tipo: "ordenar",
          pergunta: "Build a Sentence — “Did you find the professor's office?” Monte a resposta:",
          palavras: ["Could", "you", "tell", "me", "where", "it", "is?"],
          extras: ["is", "does"],
          explicacao: "Depois de “Could you tell me”, a pergunta indireta mantém a ordem de afirmação: “where it is”. Por isso o “is” extra sobra.",
        },
        {
          tipo: "ordenar",
          pergunta: "Monte a frase de sugestão para o e-mail:",
          palavras: ["Perhaps", "I", "could", "join", "the", "Sunday", "group", "instead."],
          extras: ["can", "joining"],
          explicacao: "“Perhaps I could...” sugere sem impor. “Could” é mais educado que “can” numa sugestão.",
        },
      ],
    },
  },
};

export default atividade;
