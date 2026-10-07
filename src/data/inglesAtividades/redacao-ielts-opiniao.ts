import type { AtividadeIngles } from "@/types/ingles";
import { CRITERIOS_IELTS_TASK2, ESCALA_IELTS } from "./redacao-comum";

const atividade: AtividadeIngles = {
  slug: "redacao-ielts-opiniao",
  titulo: "IELTS Task 2 — Redação de opinião",
  descricao: "A redação que mais pesa no IELTS: concordar ou discordar de uma afirmação em 250+ palavras e 40 minutos, com estrutura de quatro parágrafos.",
  nivel: "Avançado",
  trilha: "redacao",
  cor: "#9f1239",
  abertura: {
    titulo: "A redação que vale o dobro",
    texto:
      "No IELTS Writing, a Task 2 vale o dobro da Task 1. Aqui você vai ver como a redação de opinião (“To what extent do you agree or disagree?”) é montada, quais critérios dão a nota, ler uma redação modelo comentada parágrafo a parágrafo, treinar e escrever a sua com cronômetro.",
  },
  conteudo: {
    tipo: "redacao",
    redacao: {
      proposta: {
        exame: "IELTS",
        tarefa: "Writing Task 2 · Opinion",
        minutos: 40,
        minPalavras: 250,
        enunciado: [
          "Some people believe that unpaid community service should be a compulsory part of high school programmes (for example, working for a charity, improving the neighbourhood or teaching sports to younger children).",
          "To what extent do you agree or disagree?",
          "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
        ],
        enunciadoPt:
          "Dizer o quanto você concorda ou discorda de tornar o trabalho voluntário obrigatório no ensino médio, com razões e exemplos. Vale concordar totalmente, discordar totalmente ou concordar em parte — desde que a posição fique clara do começo ao fim.",
      },
      guia: [
        {
          titulo: "O formato",
          blocos: [
            {
              tipo: "lista",
              itens: [
                "Tempo recomendado: 40 minutos (a prova de Writing inteira tem 60 minutos para as duas tarefas).",
                "Mínimo: 250 palavras. Abaixo disso, a nota de Task Response cai. O ideal fica entre 260 e 320: mais que isso aumenta o risco de erro sem ganhar ponto.",
                "Registro formal e acadêmico: nada de contrações (don't), gírias ou perguntas ao leitor.",
                "A Task 2 vale o dobro da Task 1 na nota de Writing. Se o tempo apertar, priorize a Task 2.",
              ],
            },
          ],
        },
        {
          titulo: "Como reconhecer uma redação de opinião",
          blocos: [
            {
              tipo: "texto",
              texto: "O enunciado termina com uma pergunta que pede a SUA posição sobre uma afirmação. As formas mais comuns:",
            },
            {
              tipo: "exemplos",
              itens: [
                { en: "To what extent do you agree or disagree?", pt: "Até que ponto você concorda ou discorda?" },
                { en: "Do you agree or disagree?", pt: "Você concorda ou discorda?" },
                { en: "Is this a positive or negative development?", pt: "Isso é uma mudança positiva ou negativa? (também pede posição)" },
              ],
            },
            {
              tipo: "dica",
              texto: "“To what extent” aceita posição parcial (“I largely agree, although...”). Mas parcial não é “em cima do muro”: diga de que lado você pende e mantenha isso até o fim.",
            },
          ],
        },
        {
          titulo: "A estrutura de quatro parágrafos",
          blocos: [
            {
              tipo: "tabela",
              colunas: ["Parágrafo", "O que vai nele", "Tamanho"],
              linhas: [
                ["Introdução", "Paráfrase do tema + sua posição clara (thesis statement). Opcional: uma frase dizendo o que vem a seguir.", "2–3 frases, ~40–50 palavras"],
                ["Desenvolvimento 1", "Frase-tópico com a primeira razão → explicação → exemplo concreto → ligação com a pergunta.", "~90–100 palavras"],
                ["Desenvolvimento 2", "Segunda razão no mesmo esquema. Se sua posição é parcial, este pode trazer o lado oposto e por que ele pesa menos.", "~90–100 palavras"],
                ["Conclusão", "Repete a posição com outras palavras e resume as duas razões. Nenhuma ideia nova.", "2 frases, ~30–40 palavras"],
              ],
            },
            {
              tipo: "dica",
              texto: "A fórmula de cada parágrafo do meio é PEEL: Point (a ideia), Explain (por quê), Example (um caso concreto), Link (de volta à pergunta).",
            },
          ],
        },
        {
          titulo: "Planejar antes de escrever (5 minutos)",
          blocos: [
            {
              tipo: "lista",
              numerada: true,
              itens: [
                "Sublinhe o tema e a pergunta. Aqui: tema = voluntariado obrigatório no ensino médio; pergunta = concorda ou discorda.",
                "Decida a posição em 30 segundos. Escolha o lado para o qual você tem as melhores razões, não o que acha “mais certo”.",
                "Anote duas razões e um exemplo para cada uma, em palavras soltas.",
                "Escreva a introdução e confira: a posição está clara para quem ler só ela?",
                "Reserve 3–5 minutos no fim para revisar concordância, artigos e ortografia.",
              ],
            },
          ],
        },
        {
          titulo: "Frases que ajudam (e as que atrapalham)",
          blocos: [
            {
              tipo: "exemplos",
              titulo: "Para dar a posição",
              itens: [
                { en: "I strongly agree that...", pt: "Concordo totalmente que..." },
                { en: "While there are some drawbacks, I largely agree that...", pt: "Embora haja desvantagens, concordo em grande parte que..." },
                { en: "I am not convinced that... should be compulsory.", pt: "Não estou convencido de que... deva ser obrigatório." },
              ],
            },
            {
              tipo: "exemplos",
              titulo: "Para explicar e dar exemplo",
              itens: [
                { en: "This is mainly because...", pt: "Isso acontece principalmente porque..." },
                { en: "As a result, ...", pt: "Como resultado, ..." },
                { en: "A clear example of this is...", pt: "Um exemplo claro disso é..." },
                { en: "In countries such as..., students are required to...", pt: "Em países como..., os alunos são obrigados a..." },
              ],
            },
            {
              tipo: "exemplos",
              titulo: "Para concluir",
              itens: [
                { en: "In conclusion, I firmly believe that...", pt: "Em conclusão, acredito firmemente que..." },
                { en: "Overall, the benefits of... clearly outweigh the drawbacks.", pt: "No geral, os benefícios de... claramente superam as desvantagens." },
              ],
            },
            {
              tipo: "atencao",
              texto:
                "Frases decoradas e genéricas (“In this modern era, technology is a double-edged sword”) não ganham ponto de vocabulário — o examinador as reconhece. Use as frases acima como estrutura, mas o conteúdo tem que ser sobre o tema.",
            },
          ],
        },
        {
          titulo: "Erros que mais custam nota",
          blocos: [
            {
              tipo: "lista",
              itens: [
                "Copiar o enunciado na introdução. Paráfrase: “unpaid community service” → “volunteer work”; “compulsory” → “mandatory”, “required”.",
                "Posição só na conclusão, ou diferente da introdução.",
                "Exemplo vago (“many people think”) em vez de concreto (“in my school, students who coached younger children...”).",
                "Conclusão com ideia nova.",
                "Estatística inventada com cara de real. Exemplo pessoal ou hipotético é aceito; número falso não ajuda.",
              ],
            },
          ],
        },
      ],
      escala: ESCALA_IELTS,
      criterios: CRITERIOS_IELTS_TASK2,
      modelo: {
        titulo: "Redação modelo",
        nota: "Escrita para nível de banda 7.5–8 (estimativa do portal, não nota oficial)",
        paragrafos: [
          {
            papel: "Introdução",
            en: "It has been suggested that secondary schools should require students to take part in volunteer work, such as helping charities or coaching younger children. While I accept that compulsory service may place extra pressure on some teenagers, I largely agree with this proposal, as it develops practical skills and strengthens the link between young people and their communities.",
            pt: "Tem sido sugerido que as escolas de ensino médio exijam que os alunos participem de trabalho voluntário, como ajudar instituições de caridade ou treinar crianças mais novas. Embora eu aceite que o serviço obrigatório possa colocar uma pressão extra sobre alguns adolescentes, concordo em grande parte com a proposta, já que ela desenvolve habilidades práticas e fortalece a ligação entre os jovens e suas comunidades.",
            comentario:
              "Paráfrase do tema (“require... volunteer work” em vez de copiar “unpaid community service should be compulsory”), concessão curta com “While” e posição clara (“I largely agree”) com as duas razões que vêm a seguir. Quem lê só este parágrafo já sabe o que o texto defende.",
          },
          {
            papel: "Desenvolvimento 1",
            en: "The main benefit of mandatory volunteering is that it teaches skills that a classroom rarely provides. When students organise a food collection or run a weekend football session, they have to plan, communicate with adults and solve unexpected problems. For instance, a teenager who coaches a group of ten-year-olds quickly learns to explain ideas clearly and stay patient under pressure, abilities that employers consistently value. These experiences would be far less common if participation were left entirely to choice, since the students who would gain the most are often the least likely to volunteer.",
            pt: "O principal benefício do voluntariado obrigatório é que ele ensina habilidades que a sala de aula raramente oferece. Quando os alunos organizam uma arrecadação de alimentos ou conduzem um treino de futebol no fim de semana, eles precisam planejar, se comunicar com adultos e resolver problemas inesperados. Por exemplo, um adolescente que treina um grupo de crianças de dez anos aprende rapidamente a explicar ideias com clareza e a manter a paciência sob pressão, capacidades que os empregadores valorizam constantemente. Essas experiências seriam bem menos comuns se a participação ficasse totalmente a critério de cada um, já que os alunos que mais ganhariam costumam ser os menos propensos a se voluntariar.",
            comentario:
              "PEEL completo: frase-tópico (“The main benefit... is that”), explicação (planejar, comunicar, resolver), exemplo concreto (treinar crianças) e ligação com a pergunta — por que precisa ser obrigatório. Collocations naturais: “run a session”, “stay patient under pressure”, “consistently value”.",
          },
          {
            papel: "Desenvolvimento 2",
            en: "In addition, compulsory service helps young people understand the society they live in. Many teenagers spend most of their time with people of the same age and background, so working at a shelter or a community garden exposes them to problems they might otherwise ignore. Admittedly, some students already have heavy workloads or part-time jobs, and an inflexible requirement could add to their stress. However, this can be solved by allowing schools to set a modest number of hours and to accept a wide range of activities, rather than by abandoning the idea altogether.",
            pt: "Além disso, o serviço obrigatório ajuda os jovens a entender a sociedade em que vivem. Muitos adolescentes passam a maior parte do tempo com pessoas da mesma idade e origem, então trabalhar em um abrigo ou em uma horta comunitária os expõe a problemas que, de outra forma, poderiam ignorar. É verdade que alguns alunos já têm uma carga pesada de estudos ou empregos de meio período, e uma exigência inflexível poderia aumentar o estresse deles. No entanto, isso pode ser resolvido permitindo que as escolas definam um número modesto de horas e aceitem uma grande variedade de atividades, em vez de abandonar a ideia por completo.",
            comentario:
              "Segunda razão + o lado oposto tratado e rebatido (“Admittedly... However...”). É isso que sustenta o “largely agree” da introdução sem ficar em cima do muro. Estruturas complexas variadas: “so working... exposes”, “they might otherwise ignore”, “rather than by abandoning”.",
          },
          {
            papel: "Conclusão",
            en: "In conclusion, I believe that making community service part of the secondary curriculum is a sensible policy, provided that it is introduced flexibly. It equips students with practical skills and a broader view of society, benefits that outweigh the extra demands it places on their time.",
            pt: "Em conclusão, acredito que tornar o serviço comunitário parte do currículo do ensino médio é uma política sensata, desde que seja introduzida com flexibilidade. Ela dá aos alunos habilidades práticas e uma visão mais ampla da sociedade, benefícios que superam as exigências extras sobre o tempo deles.",
            comentario:
              "Repete a posição com outras palavras (“a sensible policy”), retoma as duas razões e a condição do parágrafo 2 (“provided that”). Nenhuma ideia nova. O texto inteiro tem por volta de 330 palavras — acima do mínimo, sem exagero.",
          },
        ],
      },
      treino: [
        {
          pergunta: "Qual introdução tem uma posição clara para “To what extent do you agree or disagree?”",
          opcoes: [
            "Community service is a very interesting topic and there are many opinions about it in the modern world.",
            "Although compulsory volunteering may burden some students, I largely agree that it should be part of school programmes.",
            "In this essay I will discuss the advantages and disadvantages of community service.",
            "Some people agree and some people disagree, and both sides have good points.",
          ],
          resposta: 1,
          explicacao:
            "Só a segunda diz de que lado o autor está. As outras são genéricas ou ficam em cima do muro — e “discuss advantages and disadvantages” responde outra pergunta, não a de opinião.",
        },
        {
          pergunta: "Qual é a melhor paráfrase de “unpaid community service should be compulsory”?",
          opcoes: [
            "Community service unpaid should be compulsory.",
            "Students should be required to do volunteer work.",
            "Unpaid community service must be compulsory for everyone.",
            "Community service is good.",
          ],
          resposta: 1,
          explicacao: "“Required” substitui “compulsory” e “volunteer work” substitui “unpaid community service”, mantendo o sentido. Inverter a ordem das palavras ou repetir os termos não é paráfrase.",
        },
        {
          pergunta: "Qual frase usa o conectivo com o sentido certo?",
          opcoes: [
            "Volunteering builds confidence. However, it also teaches teamwork.",
            "Volunteering takes time. Therefore, many students enjoy it.",
            "Volunteering takes time. Nevertheless, most students find it rewarding.",
            "Volunteering is useful. For example, it is useful.",
          ],
          resposta: 2,
          explicacao:
            "“Nevertheless” marca contraste: toma tempo, mesmo assim é recompensador. “However” entre duas vantagens não tem contraste, “Therefore” liga causa e efeito que não existem ali e o “For example” não traz exemplo nenhum.",
        },
        {
          pergunta: "Qual exemplo ganha mais em Task Response?",
          opcoes: [
            "Many people say that volunteering is good for young people.",
            "Volunteering is good because it is very helpful and useful.",
            "In my school, students who tutored younger pupils in maths improved their own grades as well.",
            "Everyone knows that volunteering has a lot of benefits.",
          ],
          resposta: 2,
          explicacao:
            "Exemplo concreto, específico e ligado à ideia. As outras opções são afirmações genéricas sem prova — “many people say” e “everyone knows” não sustentam nada.",
        },
        {
          pergunta: "Qual frase está no registro certo para o IELTS?",
          opcoes: [
            "Kids don't really get a lot out of school stuff.",
            "Teenagers do not always benefit from purely academic activities.",
            "Teens dont get nothing from school, right?",
            "You know, school is kinda boring for teens.",
          ],
          resposta: 1,
          explicacao: "Sem contrações (do not), sem gíria (kids, stuff, kinda), sem pergunta ao leitor. As outras perderiam ponto em Lexical Resource — e a terceira tem dupla negação e erro de ortografia.",
        },
        {
          tipo: "ordenar",
          pergunta: "Monte a frase-tópico do parágrafo:",
          palavras: ["The", "main", "benefit", "of", "volunteering", "is", "that", "it", "builds", "practical", "skills."],
          extras: ["are", "because"],
          explicacao: "Frase-tópico: anuncia a ideia do parágrafo logo de cara. “The main benefit of X is that...” é uma estrutura segura e acadêmica.",
        },
        {
          pergunta: "O que NÃO deve aparecer na conclusão?",
          opcoes: [
            "A posição repetida com outras palavras.",
            "Um resumo das duas razões principais.",
            "Um argumento novo que ainda não foi explicado.",
            "Uma expressão como “In conclusion” ou “Overall”.",
          ],
          resposta: 2,
          explicacao: "A conclusão fecha o que já foi dito. Ideia nova sem desenvolvimento enfraquece Task Response e Coherence.",
        },
        {
          tipo: "ordenar",
          pergunta: "Monte a frase com estrutura complexa (concessão):",
          palavras: ["Although", "it", "takes", "time,", "volunteering", "develops", "valuable", "skills."],
          extras: ["but"],
          explicacao: "“Although” já faz o contraste; colocar “but” junto é erro clássico (Although..., but...). Uma oração com “Although” conta como estrutura complexa em Grammatical Range.",
        },
      ],
    },
  },
};

export default atividade;
