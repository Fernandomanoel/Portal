import type { AtividadeIngles, CriterioRedacao } from "@/types/ingles";
import { ATENCAO_TOEFL_2026, ESCALA_TOEFL } from "./redacao-comum";

const CRITERIOS: CriterioRedacao[] = [
  {
    nome: "Relevance and contribution",
    traducao: "Relevância e contribuição para a discussão",
    peso: "Rubrica geral",
    avalia: "Se a resposta entra na conversa: responde à pergunta do professor, reage ao que os colegas disseram e acrescenta uma ideia própria.",
    notaAlta: "Posição clara na primeira frase, referência a pelo menos um colega e uma ideia nova — não só repetir o que eles já disseram.",
    tiraPonto: "Repetir o argumento de um colega com outras palavras, responder outra pergunta ou escrever uma redação genérica que ignora o fórum.",
    checklist: [
      "Minha posição aparece logo na primeira ou segunda frase",
      "Citei um colega pelo nome e reagi à ideia dele",
      "Trouxe uma ideia ou um exemplo que nenhum colega mencionou",
    ],
  },
  {
    nome: "Elaboration",
    traducao: "Desenvolvimento",
    peso: "Rubrica geral",
    avalia: "Se a ideia principal é explicada e sustentada com razões, detalhes e exemplos, e não só afirmada.",
    notaAlta: "Uma ideia principal bem desenvolvida: razão → explicação → exemplo concreto. Profundidade conta mais que quantidade de ideias.",
    tiraPonto: "Três ou quatro ideias soltas sem explicação, ou exemplos vagos (“many people think”).",
    checklist: [
      "Expliquei POR QUE penso assim, não só O QUE penso",
      "Dei um exemplo concreto (situação, caso, experiência)",
      "Escrevi pelo menos 100 palavras",
    ],
  },
  {
    nome: "Language use",
    traducao: "Variedade de linguagem",
    peso: "Rubrica geral",
    avalia: "Variedade de estruturas (orações subordinadas, condicionais, voz passiva) e vocabulário preciso e idiomático.",
    notaAlta: "Frases de tamanhos e estruturas diferentes, conectivos naturais e palavras precisas para o tema.",
    tiraPonto: "Só frases curtas e iguais, palavras muito básicas (good, bad, thing) repetidas e conectivo decorado em todas as frases.",
    checklist: [
      "Usei pelo menos duas estruturas complexas (although, if, which, voz passiva)",
      "Troquei palavras genéricas (good, bad, thing) por outras mais precisas",
    ],
  },
  {
    nome: "Accuracy",
    traducao: "Correção",
    peso: "Rubrica geral",
    avalia: "Quantidade de erros de gramática, vocabulário, ortografia e pontuação, e se eles atrapalham a leitura.",
    notaAlta: "Quase nenhum erro; os poucos que aparecem são “deslizes” que não confundem.",
    tiraPonto: "Erros frequentes de concordância, tempo verbal, artigos e ortografia — principalmente os que deixam a frase confusa.",
    checklist: [
      "Revisei concordância (he thinks, people are) e tempos verbais",
      "Conferi ortografia e pontuação no último minuto",
    ],
  },
];

const atividade: AtividadeIngles = {
  slug: "redacao-toefl-discussao",
  titulo: "TOEFL — Writing for an Academic Discussion",
  descricao: "Participar de um fórum de aula: ler a pergunta do professor e as respostas de dois colegas e escrever a sua contribuição em 10 minutos, com 100+ palavras.",
  nivel: "Avançado",
  trilha: "redacao",
  cor: "#9f1239",
  abertura: {
    titulo: "Um fórum, dez minutos",
    texto:
      "No TOEFL iBT, a Academic Discussion simula um fórum de aula on-line: o professor faz uma pergunta, dois colegas respondem e você entra na conversa. É curta e rápida — por isso a estrutura tem que estar pronta na cabeça antes da prova. Aqui você aprende essa estrutura, os critérios da rubrica e escreve a sua resposta.",
  },
  conteudo: {
    tipo: "redacao",
    redacao: {
      proposta: {
        exame: "TOEFL",
        tarefa: "Writing for an Academic Discussion",
        minutos: 10,
        minPalavras: 100,
        discussao: {
          professor: {
            nome: "Dr. Morales (professor)",
            texto:
              "This week we are looking at how technology is changing education. Many universities now record their lectures and put them online, so students can watch them at any time. Some people say this means students no longer need to attend lectures in person. What do you think: should attending lectures in person still be required at universities? Why or why not?",
          },
          colegas: [
            {
              nome: "Hannah",
              texto:
                "I don't think attendance should be required. Recorded lectures let students pause, rewind and take better notes. Many students also work part-time, so being able to watch lectures in the evening makes university possible for them.",
            },
            {
              nome: "Daniel",
              texto:
                "I disagree with Hannah. When attendance is optional, many students fall behind because they keep postponing the videos. Going to class creates a routine, and that discipline is important for success.",
            },
          ],
        },
        enunciado: [
          "Your professor is teaching a class on education. Write a post responding to the professor's question.",
          "In your response, you should express and support your opinion and make a contribution to the discussion in your own words.",
          "An effective response will contain at least 100 words.",
        ],
        enunciadoPt:
          "Escrever um post respondendo ao professor: dizer se a presença em aula deve continuar obrigatória, apoiar a opinião com razão e exemplo e acrescentar algo à discussão — sem repetir Hannah ou Daniel.",
      },
      guia: [
        ATENCAO_TOEFL_2026,
        {
          titulo: "O formato da tarefa",
          blocos: [
            {
              tipo: "lista",
              itens: [
                "Tempo: 10 minutos, incluindo a leitura do fórum.",
                "Tamanho: a ETS diz que uma resposta eficaz tem pelo menos 100 palavras. Entre 110 e 150 é um bom alvo para 10 minutos.",
                "Você lê a pergunta do professor e duas respostas de colegas, que normalmente defendem lados diferentes.",
                "Registro: acadêmico, mas de fórum — pode usar “I” e falar com os colegas pelo nome. Evite gíria e abreviações de chat.",
                "Não há corretor ortográfico no exame. Por isso o editor do portal também vem com ele desligado.",
              ],
            },
          ],
        },
        {
          titulo: "A estrutura em quatro movimentos",
          blocos: [
            {
              tipo: "tabela",
              colunas: ["Movimento", "O que fazer", "Tamanho"],
              linhas: [
                ["1. Posição", "Responda à pergunta do professor de forma direta.", "1 frase"],
                ["2. Ponte", "Reaja a um colega: concorde, discorde ou mostre o que faltou na ideia dele.", "1 frase"],
                ["3. Sua contribuição", "Uma ideia NOVA, com razão, explicação e exemplo concreto. É a parte que mais pesa.", "3–5 frases"],
                ["4. Fechamento", "Retome a posição em poucas palavras.", "1 frase"],
              ],
            },
            {
              tipo: "dica",
              texto: "A palavra-chave da rubrica é “contribution”. Se a sua razão principal é a mesma de Hannah ou Daniel, você só concordou. Procure um ângulo diferente: outro grupo de pessoas afetado, uma consequência a longo prazo, um meio-termo.",
            },
          ],
        },
        {
          titulo: "Planejar em um minuto",
          blocos: [
            {
              tipo: "lista",
              numerada: true,
              itens: [
                "Leia a pergunta do professor e marque o que exatamente ela pede (aqui: a presença deve ser obrigatória?).",
                "Leia os colegas e anote a razão de cada um em duas palavras (Hannah: flexibilidade; Daniel: disciplina).",
                "Escolha o lado e um ângulo novo (por exemplo: o que se aprende com a interação ao vivo, que não aparece no vídeo).",
                "Escreva. Guarde o último minuto para revisar.",
              ],
            },
          ],
        },
        {
          titulo: "Frases que ajudam",
          blocos: [
            {
              tipo: "exemplos",
              titulo: "Posição",
              itens: [
                { en: "In my opinion, universities should still require students to attend lectures.", pt: "Na minha opinião, as universidades ainda deveriam exigir presença nas aulas." },
                { en: "I believe a flexible approach makes the most sense here.", pt: "Acredito que uma abordagem flexível faz mais sentido aqui." },
              ],
            },
            {
              tipo: "exemplos",
              titulo: "Ponte com o colega",
              itens: [
                { en: "Daniel makes a good point about routine, but I would go further.", pt: "Daniel tem razão sobre a rotina, mas eu iria além." },
                { en: "I understand Hannah's view; however, she overlooks...", pt: "Entendo o ponto da Hannah; no entanto, ela deixa de lado..." },
              ],
            },
            {
              tipo: "exemplos",
              titulo: "Contribuição nova",
              itens: [
                { en: "What neither of them mentions is...", pt: "O que nenhum dos dois menciona é..." },
                { en: "Another factor to consider is...", pt: "Outro fator a considerar é..." },
                { en: "For example, in my own experience...", pt: "Por exemplo, na minha própria experiência..." },
              ],
            },
          ],
        },
        {
          titulo: "Erros que mais custam nota",
          blocos: [
            {
              tipo: "lista",
              itens: [
                "Repetir a razão de um colega com outras palavras.",
                "Escrever uma redação de quatro parágrafos com introdução longa: em 10 minutos, não sobra tempo para desenvolver a ideia.",
                "Ficar abaixo de 100 palavras.",
                "Ignorar o fórum e não citar ninguém.",
                "Dar três razões rasas em vez de uma bem explicada.",
              ],
            },
          ],
        },
      ],
      escala: ESCALA_TOEFL,
      criterios: CRITERIOS,
      modelo: {
        titulo: "Resposta modelo",
        nota: "Escrita para o nível mais alto da rubrica, 5 (estimativa do portal, não nota oficial)",
        paragrafos: [
          {
            papel: "Posição e ponte",
            en: "In my opinion, universities should still expect students to attend most lectures in person. Daniel is right that attendance builds a routine, but I think there is an even more important reason that neither he nor Hannah mentions.",
            pt: "Na minha opinião, as universidades ainda deveriam esperar que os alunos assistam à maioria das aulas presencialmente. Daniel tem razão quando diz que a presença cria uma rotina, mas acho que há um motivo ainda mais importante que nem ele nem Hannah mencionam.",
            comentario: "Posição na primeira frase (com “most”, uma nuance que mostra raciocínio). Ponte com Daniel e o anúncio de que vem algo novo: “neither he nor Hannah mentions”. Duas frases, sem enrolação.",
          },
          {
            papel: "Contribuição",
            en: "A recorded video cannot answer questions. When students are in the room, they can ask the professor to clarify a difficult concept immediately, and they also hear the questions their classmates ask, which often reveal misunderstandings they did not know they had. For example, in my statistics course last year, a short discussion that started with one student's question helped me finally understand a topic I had watched online twice without success.",
            pt: "Um vídeo gravado não responde perguntas. Quando os alunos estão na sala, podem pedir ao professor que esclareça um conceito difícil na hora, e também ouvem as perguntas dos colegas, que muitas vezes revelam dúvidas que eles nem sabiam que tinham. Por exemplo, no meu curso de estatística do ano passado, uma conversa curta que começou com a pergunta de um aluno me ajudou a finalmente entender um assunto que eu tinha assistido on-line duas vezes sem sucesso.",
            comentario: "A ideia nova (interação ao vivo) com razão, explicação e um exemplo pessoal concreto. Estruturas variadas: “which often reveal”, “they did not know they had”, “that started with”, “I had watched”. É aqui que está a nota.",
          },
          {
            papel: "Fechamento",
            en: "Recordings are a useful tool for review, but they work best as a supplement to live classes rather than a replacement.",
            pt: "As gravações são uma ferramenta útil para revisão, mas funcionam melhor como complemento das aulas ao vivo do que como substituto.",
            comentario: "Fecha reconhecendo o ponto de Hannah sem mudar de posição (“supplement... rather than a replacement”). Cerca de 135 palavras: bom tamanho para 10 minutos.",
          },
        ],
      },
      treino: [
        {
          pergunta: "Hannah defende flexibilidade; Daniel, disciplina. Qual ideia é uma CONTRIBUIÇÃO nova?",
          opcoes: [
            "Recorded lectures are flexible, so students can watch them anytime.",
            "Going to class helps students create a routine.",
            "Live lectures let students ask questions and learn from classmates' questions.",
            "I agree with Daniel because attendance is important.",
          ],
          resposta: 2,
          explicacao: "As duas primeiras repetem Hannah e Daniel; a quarta só concorda. A interação ao vivo é um ângulo que nenhum colega trouxe — isso é “contribution”.",
        },
        {
          pergunta: "Qual primeira frase é melhor para esta tarefa?",
          opcoes: [
            "Technology has changed many aspects of modern life in the twenty-first century.",
            "In my opinion, attending lectures in person should remain a requirement.",
            "This is a very interesting question that many people discuss.",
            "Hannah and Daniel both wrote their opinions about lectures.",
          ],
          resposta: 1,
          explicacao: "Em 10 minutos, a posição vem logo. Introdução genérica gasta tempo e palavras sem ganhar ponto.",
        },
        {
          pergunta: "Qual frase faz uma boa “ponte” com o colega?",
          opcoes: [
            "Daniel is wrong.",
            "Hannah said something.",
            "I see Hannah's point about part-time jobs; however, she overlooks how easy it is to postpone videos.",
            "Like Daniel said, routine is important, like he said.",
          ],
          resposta: 2,
          explicacao: "Reconhece o ponto do colega e mostra o que ficou de fora, com conectivo de contraste. As outras são vagas, rudes ou repetitivas.",
        },
        {
          pergunta: "O que pesa mais na rubrica?",
          opcoes: [
            "Escrever quatro razões curtas.",
            "Uma razão bem explicada, com exemplo concreto.",
            "Escrever 300 palavras.",
            "Usar o máximo possível de palavras difíceis.",
          ],
          resposta: 1,
          explicacao: "“Elaboration” é profundidade: explicar e exemplificar. Quantidade de ideias soltas não substitui desenvolvimento.",
        },
        {
          pergunta: "Qual frase está adequada ao registro do fórum acadêmico?",
          opcoes: [
            "IMO in-person classes r better tbh.",
            "In-person classes are way cooler, lol.",
            "I would argue that in-person classes offer something recordings cannot.",
            "Yo, recordings are trash.",
          ],
          resposta: 2,
          explicacao: "Fórum acadêmico permite “I”, mas não abreviações de chat (IMO, tbh, r) nem gíria. A terceira é natural e formal na medida certa.",
        },
        {
          tipo: "ordenar",
          pergunta: "Monte a frase que anuncia uma ideia nova:",
          palavras: ["What", "neither", "of", "them", "mentions", "is", "the", "value", "of", "live", "questions."],
          extras: ["mention", "either"],
          explicacao: "“What neither of them mentions is...” deixa claro, numa frase só, que você leu os dois colegas e vai acrescentar algo. “Neither” pede verbo no singular (mentions).",
        },
        {
          tipo: "ordenar",
          pergunta: "Monte o fechamento:",
          palavras: ["Recordings", "work", "best", "as", "a", "supplement", "rather", "than", "a", "replacement."],
          extras: ["more", "then"],
          explicacao: "“Rather than” compara duas funções. Atenção: “than” (comparação), não “then” (depois) — erro de ortografia comum que conta em Accuracy.",
        },
      ],
    },
  },
};

export default atividade;
