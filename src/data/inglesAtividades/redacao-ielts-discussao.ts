import type { AtividadeIngles } from "@/types/ingles";
import { CRITERIOS_IELTS_TASK2, ESCALA_IELTS } from "./redacao-comum";

const atividade: AtividadeIngles = {
  slug: "redacao-ielts-discussao",
  titulo: "IELTS Task 2 — Discussão e outros tipos",
  descricao: "Os outros quatro tipos de pergunta da Task 2 — discussão, vantagens e desvantagens, problema e solução, pergunta dupla — e como adaptar a estrutura a cada um.",
  nivel: "Avançado",
  trilha: "redacao",
  cor: "#9f1239",
  abertura: {
    titulo: "Cada pergunta pede um plano diferente",
    texto:
      "Na Task 2, ler errado a pergunta é o jeito mais rápido de perder nota: o texto pode estar bem escrito e mesmo assim não responder ao que foi pedido. Aqui você aprende a reconhecer os cinco tipos de pergunta, monta a redação “Discuss both views and give your opinion” e escreve a sua.",
  },
  conteudo: {
    tipo: "redacao",
    redacao: {
      proposta: {
        exame: "IELTS",
        tarefa: "Writing Task 2 · Discussion",
        minutos: 40,
        minPalavras: 250,
        enunciado: [
          "Some people think that the best way to reduce traffic congestion in cities is to build more roads. Others believe that governments should invest in public transport instead.",
          "Discuss both these views and give your own opinion.",
        ],
        enunciadoPt:
          "Explicar os dois lados (construir mais vias × investir em transporte público) com o mesmo cuidado e, além disso, dar a sua opinião. Esquecer a opinião, ou discutir só um lado, deixa a tarefa incompleta.",
      },
      guia: [
        {
          titulo: "Os cinco tipos de pergunta da Task 2",
          blocos: [
            {
              tipo: "tabela",
              colunas: ["Tipo", "Como a pergunta aparece", "O que precisa ter"],
              linhas: [
                ["Opinião", "To what extent do you agree or disagree?", "Sua posição do começo ao fim (veja a atividade de opinião)."],
                ["Discussão", "Discuss both these views and give your own opinion.", "Os dois lados explicados + a sua opinião clara."],
                ["Vantagens e desvantagens", "What are the advantages and disadvantages? / Do the advantages outweigh the disadvantages?", "Os dois lados; se a pergunta for “outweigh”, também diga qual pesa mais."],
                ["Problema e solução", "What problems does this cause? What solutions can you suggest?", "Problemas E soluções, de preferência ligados entre si."],
                ["Pergunta dupla", "Why is this happening? Is it a positive or negative development?", "Uma resposta para cada pergunta, na ordem em que aparecem."],
              ],
            },
            {
              tipo: "dica",
              texto: "Antes de escrever, conte quantas perguntas há no enunciado e numere-as. Cada uma precisa de pelo menos um parágrafo — ou de uma parte bem clara de um parágrafo.",
            },
          ],
        },
        {
          titulo: "Estrutura da redação de discussão",
          blocos: [
            {
              tipo: "tabela",
              colunas: ["Parágrafo", "O que vai nele"],
              linhas: [
                ["Introdução", "Paráfrase das duas visões + sua opinião em uma frase."],
                ["Visão A", "Por que algumas pessoas defendem a primeira visão: razão, explicação, exemplo. Escreva de forma justa, mesmo que você discorde."],
                ["Visão B", "Por que outras pessoas defendem a segunda visão, no mesmo esquema."],
                ["Conclusão", "Sua opinião retomada e o motivo principal. Se preferir, a opinião pode ficar mais forte no parágrafo da visão com que você concorda."],
              ],
            },
            {
              tipo: "exemplos",
              titulo: "Frases para apresentar cada lado sem perder a sua voz",
              itens: [
                { en: "Supporters of road building argue that...", pt: "Quem defende construir vias argumenta que..." },
                { en: "From their perspective, ...", pt: "Do ponto de vista deles, ..." },
                { en: "On the other hand, those who favour public transport point out that...", pt: "Por outro lado, quem prefere transporte público lembra que..." },
                { en: "Personally, I side with the latter view because...", pt: "Pessoalmente, fico com a segunda visão porque..." },
              ],
            },
          ],
        },
        {
          titulo: "Adaptando para os outros tipos",
          blocos: [
            {
              tipo: "exemplos",
              titulo: "Vantagens e desvantagens",
              itens: [
                { en: "One major advantage of... is that...", pt: "Uma grande vantagem de... é que..." },
                { en: "The most serious drawback, however, is...", pt: "A desvantagem mais séria, no entanto, é..." },
                { en: "On balance, I believe the benefits outweigh the drawbacks.", pt: "Pesando tudo, acredito que os benefícios superam as desvantagens." },
              ],
            },
            {
              tipo: "exemplos",
              titulo: "Problema e solução",
              itens: [
                { en: "A key problem caused by... is...", pt: "Um problema-chave causado por... é..." },
                { en: "One effective way to tackle this would be to...", pt: "Uma forma eficaz de enfrentar isso seria..." },
                { en: "If governments..., this problem could be significantly reduced.", pt: "Se os governos..., esse problema poderia ser muito reduzido." },
              ],
            },
            {
              tipo: "exemplos",
              titulo: "Pergunta dupla",
              itens: [
                { en: "There are several reasons why this trend has emerged.", pt: "Há vários motivos para essa tendência ter surgido." },
                { en: "In my view, this is largely a positive development, since...", pt: "Na minha visão, essa é em grande parte uma mudança positiva, já que..." },
              ],
            },
            {
              tipo: "dica",
              texto: "Problema e solução fica mais forte quando cada solução responde a um problema que você citou. Problema de trânsito → solução de trânsito, não uma solução solta para outro assunto.",
            },
          ],
        },
        {
          titulo: "Erros que mais custam nota",
          blocos: [
            {
              tipo: "lista",
              itens: [
                "Em “Discuss both views and give your opinion”: esquecer a opinião, ou dar a opinião só na última linha, sem razão.",
                "Desenvolver um lado com 150 palavras e o outro com 30. A tarefa pede os dois.",
                "Em perguntas duplas: responder só a primeira.",
                "Em “advantages outweigh disadvantages”: listar os dois lados sem dizer qual pesa mais.",
                "Trocar o tema: falar de poluição em geral quando a pergunta é sobre congestionamento.",
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
            en: "Traffic jams have become a daily problem in many large cities, and opinions differ on how to solve it. While some argue that expanding the road network is the most effective response, others maintain that public money should go into buses, trains and metro systems. In my view, investing in public transport offers a more lasting solution.",
            pt: "Os engarrafamentos se tornaram um problema diário em muitas cidades grandes, e as opiniões divergem sobre como resolvê-lo. Enquanto alguns argumentam que ampliar a malha viária é a resposta mais eficaz, outros sustentam que o dinheiro público deveria ir para ônibus, trens e metrô. Na minha visão, investir em transporte público oferece uma solução mais duradoura.",
            comentario: "As duas visões parafraseadas (“expanding the road network”, “buses, trains and metro systems”) e a opinião já na introdução. A pergunta tem duas partes — discutir e opinar — e a introdução sinaliza as duas.",
          },
          {
            papel: "Visão A",
            en: "Those in favour of building more roads believe that congestion is simply a matter of capacity. If a motorway has three lanes and is always full, adding two more lanes should allow vehicles to move more freely, at least in the short term. Supporters also point out that many people depend on cars for work, particularly in areas where buses are infrequent, so improving roads benefits a large proportion of the population directly.",
            pt: "Quem defende construir mais vias acredita que o congestionamento é simplesmente uma questão de capacidade. Se uma rodovia tem três faixas e está sempre cheia, acrescentar mais duas deveria permitir que os veículos circulem com mais liberdade, pelo menos a curto prazo. Os defensores também lembram que muitas pessoas dependem do carro para trabalhar, principalmente em áreas onde os ônibus passam pouco, então melhorar as vias beneficia diretamente uma grande parte da população.",
            comentario: "O lado com que o autor NÃO concorda, explicado de forma justa e com razão + exemplo. “At least in the short term” já prepara o contra-argumento sem distorcer a visão. Isso mostra controle — o examinador nota.",
          },
          {
            papel: "Visão B",
            en: "On the other hand, advocates of public transport argue that new roads tend to fill up again within a few years, because better driving conditions encourage more people to drive. A single train, by contrast, can carry hundreds of passengers using a fraction of the space that the same number of cars would occupy. I find this argument more convincing. Cities such as Copenhagen and Singapore, which have prioritised reliable public transport, show that people are willing to leave their cars at home when the alternative is fast, frequent and affordable.",
            pt: "Por outro lado, os defensores do transporte público argumentam que vias novas costumam encher de novo em poucos anos, porque condições melhores para dirigir incentivam mais pessoas a dirigir. Um único trem, em contraste, pode levar centenas de passageiros usando uma fração do espaço que o mesmo número de carros ocuparia. Acho esse argumento mais convincente. Cidades como Copenhague e Singapura, que priorizaram um transporte público confiável, mostram que as pessoas aceitam deixar o carro em casa quando a alternativa é rápida, frequente e acessível.",
            comentario: "Segunda visão no mesmo esquema e a opinião reforçada (“I find this argument more convincing”) com exemplo real e conhecido, sem número inventado. “By contrast”, “which have prioritised” e a estrutura “when the alternative is...” dão variedade gramatical.",
          },
          {
            papel: "Conclusão",
            en: "In conclusion, although wider roads may bring short-term relief, I believe that governments should focus their investment on public transport. Only an efficient alternative to driving can reduce the number of cars on city streets in the long run.",
            pt: "Em conclusão, embora vias mais largas possam trazer alívio a curto prazo, acredito que os governos deveriam concentrar o investimento em transporte público. Só uma alternativa eficiente ao carro consegue reduzir o número de veículos nas ruas da cidade a longo prazo.",
            comentario: "Reconhece a visão A em meia frase (“although...”), repete a opinião e o motivo principal. Fecha com “in the long run”, que espelha o “short-term” da visão A — coesão de texto inteiro, não só entre frases.",
          },
        ],
      },
      treino: [
        {
          pergunta: "“Why do people move to big cities? Is this a positive or negative development?” — que tipo de pergunta é essa?",
          opcoes: ["Opinião", "Discussão de duas visões", "Pergunta dupla", "Problema e solução"],
          resposta: 2,
          explicacao: "São duas perguntas diferentes: os motivos (why) e a avaliação (positive or negative). As duas precisam de resposta, na ordem.",
        },
        {
          pergunta: "Em “Discuss both these views and give your own opinion”, o que deixa a tarefa INCOMPLETA?",
          opcoes: [
            "Dar a opinião já na introdução.",
            "Explicar só a visão com que você concorda.",
            "Usar um parágrafo para cada visão.",
            "Reconhecer que a outra visão tem um ponto válido.",
          ],
          resposta: 1,
          explicacao: "A pergunta pede as DUAS visões. Mesmo discordando, explique a visão contrária de forma justa e depois diga por que você prefere a outra.",
        },
        {
          pergunta: "“Do the advantages of working from home outweigh the disadvantages?” — o que é obrigatório?",
          opcoes: [
            "Falar só das vantagens.",
            "Listar vantagens e desvantagens, sem tomar partido.",
            "Comparar os dois lados e dizer qual pesa mais.",
            "Explicar a história do trabalho remoto.",
          ],
          resposta: 2,
          explicacao: "“Outweigh” pede um julgamento: qual lado é maior. Listar os dois sem concluir responde só metade.",
        },
        {
          pergunta: "Problema citado: “Young people spend too much time on their phones.” Qual solução está mais bem ligada a ele?",
          opcoes: [
            "Governments should build more parks in every city.",
            "Schools could teach students to set screen-time limits and keep phones away during lessons.",
            "Companies should pay higher salaries to young workers.",
            "Public transport should be free for students.",
          ],
          resposta: 1,
          explicacao: "A solução responde ao problema citado (tempo no celular). As outras podem até ser boas ideias, mas não resolvem o problema que você apresentou.",
        },
        {
          pergunta: "Qual frase apresenta a visão contrária de forma justa, sem perder a sua voz?",
          opcoes: [
            "Some people stupidly think that more roads will help.",
            "Supporters of road building argue that extra lanes allow traffic to flow more freely.",
            "Roads are the answer and nobody can deny it.",
            "Everyone agrees that roads are useless.",
          ],
          resposta: 1,
          explicacao: "“Supporters... argue that” mostra a visão como dos outros, de forma neutra. Ofender ou exagerar (“nobody can deny”, “everyone agrees”) soa pouco acadêmico e enfraquece o argumento.",
        },
        {
          tipo: "ordenar",
          pergunta: "Monte a frase que dá a sua opinião numa redação de discussão:",
          palavras: ["Personally,", "I", "side", "with", "the", "latter", "view."],
          extras: ["former", "sides"],
          explicacao: "“The latter” = o segundo citado; “the former” = o primeiro. Use quando as duas visões acabaram de ser mencionadas — evita repetir tudo.",
        },
        {
          tipo: "ordenar",
          pergunta: "Monte a frase de solução com estrutura condicional:",
          palavras: ["If", "governments", "invested", "in", "trains,", "congestion", "would", "fall."],
          extras: ["will", "invest"],
          explicacao: "Segunda condicional (If + passado, would + verbo) para uma solução hipotética. Misturar “If... invested” com “will” é erro de tempo verbal comum.",
        },
      ],
    },
  },
};

export default atividade;
