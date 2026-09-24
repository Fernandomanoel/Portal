import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/ia-introducao-e-prompts.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Introdução à IA e Engenharia de Prompt",
  introducao: "Inteligência Artificial",
  itens: [
    {
      id: "o-que-e-inteligencia-artificial-de-verdade",
      titulo: "O que é Inteligência Artificial, de verdade",
      blocos: [
        {
          tipo: "texto",
          texto: "Esqueça a ideia de \"robô que pensa\" ou \"máquina mágica\". Na prática, uma IA como o ChatGPT, o Gemini ou o Claude é um sistema treinado com uma quantidade gigantesca de exemplos de texto (livros, sites, conversas, códigos) para aprender padrões de como as palavras costumam aparecer juntas.",
        },
        {
          tipo: "texto",
          texto: "Quando você faz uma pergunta, a IA não está \"pensando\" nem \"sabendo\" a resposta como uma pessoa sabe. Ela está calculando, palavra por palavra, qual é a continuação mais provável considerando tudo que já viu durante o treinamento e o que você escreveu. É estatística e padrão em uma escala enorme — não consciência.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Por que isso importa para você",
          texto: "Entender que a IA \"prevê a próxima palavra mais provável\" explica também por que ela às vezes erra com muita confiança: ela não está checando um fato num banco de dados, está gerando o texto que parece mais correto com base em padrões. Vamos falar mais disso adiante.",
        },
        {
          tipo: "subtitulo",
          texto: "Os termos que você vai ouvir por aí",
        },
        {
          tipo: "subtitulo",
          texto: "Inteligência Artificial (IA)",
        },
        {
          tipo: "texto",
          texto: "O nome geral para sistemas de computador feitos para realizar tarefas que normalmente exigiriam raciocínio humano, como reconhecer imagens, entender texto ou tomar decisões.",
        },
        {
          tipo: "subtitulo",
          texto: "Machine Learning (Aprendizado de Máquina)",
        },
        {
          tipo: "texto",
          texto: "Uma forma de fazer IA em que o sistema aprende com dados e exemplos, em vez de seguir regras escritas manualmente por um programador.",
        },
        {
          tipo: "subtitulo",
          texto: "IA Generativa",
        },
        {
          tipo: "texto",
          texto: "IA que cria coisas novas — textos, imagens, músicas, código — em vez de só classificar ou prever números. É a categoria do ChatGPT, do Gemini e de geradores de imagem.",
        },
        {
          tipo: "subtitulo",
          texto: "LLM (Modelo de Linguagem)",
        },
        {
          tipo: "texto",
          texto: "Sigla de Large Language Model. É o tipo de IA generativa especializada em texto: entender o que você escreve e gerar respostas em linguagem natural. ChatGPT, Gemini e Claude são LLMs.",
        },
        {
          tipo: "texto",
          texto: "Ou seja: IA é a categoria geral, Machine Learning é a técnica de aprender com dados, IA Generativa é quando o sistema cria conteúdo novo, e LLM é o modelo de linguagem específico que você usa para conversar.",
        },
      ],
    },
    {
      id: "para-que-serve-no-dia-a-dia",
      titulo: "Para que serve no dia a dia",
      blocos: [
        {
          tipo: "texto",
          texto: "IA generativa já faz parte de tarefas comuns de estudo e trabalho. Alguns exemplos reais:",
        },
        {
          tipo: "lista",
          itens: [
            "Assistentes de texto (ChatGPT, Gemini, Claude) — tirar dúvidas, explicar um assunto de outra forma, revisar um texto, ajudar a organizar ideias.",
            "Geração de imagem — criar ilustrações, artes e rascunhos visuais a partir de uma descrição em texto.",
            "Tradução — traduzir textos entre idiomas com boa qualidade e rapidez.",
            "Resumo de textos — transformar um artigo longo ou um capítulo de livro em um resumo dos pontos principais.",
            "Ajuda em programação — explicar um erro de código, sugerir uma função, ajudar a entender uma linguagem nova.",
          ],
        },
        {
          tipo: "nota",
          variante: "aviso",
          texto: "Mas atenção às limitações: errar com total confiança \"alucinação\" nunca use uma resposta de IA sem checar",
        },
      ],
    },
    {
      id: "engenharia-de-prompt-a-parte-pratica",
      titulo: "Engenharia de Prompt — a parte prática",
      blocos: [
        {
          tipo: "texto",
          texto: "Prompt é o nome que se dá à instrução ou pergunta que você escreve para uma IA. \"Engenharia de prompt\" é simplesmente a habilidade de escrever bons pedidos para conseguir boas respostas — quanto melhor o prompt, melhor (e mais útil) é o resultado.",
        },
        {
          tipo: "subtitulo",
          texto: "Boas práticas na hora de escrever um prompt",
        },
        {
          tipo: "lista",
          itens: [
            "Seja específico. Em vez de um pedido vago, diga exatamente o que você quer.",
            "Dê contexto. Explique para quem é, com que finalidade, qual é o nível de conhecimento envolvido.",
            "Peça o formato de saída. Quer uma lista? Uma tabela? Um texto curto? Diga isso no prompt.",
            "Dê exemplos quando possível. Mostrar um exemplo do que você espera ajuda demais a IA acertar o tom e o formato.",
            "Itere. Se a primeira resposta não veio boa, não desista — refine o prompt, adicione mais detalhes ou peça para a IA ajustar algo específico da resposta anterior.",
          ],
        },
        {
          tipo: "subtitulo",
          texto: "Prompt ruim × prompt bom",
        },
        {
          tipo: "texto",
          texto: "PROMPT RUIM",
        },
        {
          tipo: "texto",
          texto: "\"me fale sobre cachorros\"",
        },
        {
          tipo: "texto",
          texto: "PROMPT BOM",
        },
        {
          tipo: "texto",
          texto: "\"Liste 5 raças de cachorro boas para quem mora em apartamento pequeno, com 1 frase explicando o motivo de cada uma.\"",
        },
        {
          tipo: "texto",
          texto: "PROMPT RUIM",
        },
        {
          tipo: "texto",
          texto: "\"me ajuda com meu trabalho de história\"",
        },
        {
          tipo: "texto",
          texto: "PROMPT BOM",
        },
        {
          tipo: "texto",
          texto: "\"Estou no 2º ano do ensino médio e preciso entender a Revolução Industrial para uma prova. Explique em tópicos simples: o que foi, quando aconteceu e 3 consequências principais.\"",
        },
        {
          tipo: "texto",
          texto: "PROMPT RUIM",
        },
        {
          tipo: "texto",
          texto: "\"escreve um email\"",
        },
        {
          tipo: "texto",
          texto: "PROMPT BOM",
        },
        {
          tipo: "texto",
          texto: "\"Escreva um e-mail formal e curto (até 5 frases) pedindo ao professor um novo prazo para entregar um trabalho, explicando que fiquei doente essa semana.\"",
        },
        {
          tipo: "nota",
          variante: "aviso",
          texto: "quem o quê como",
        },
      ],
    },
    {
      id: "atividade-pratica-guiada",
      titulo: "Atividade prática guiada",
      blocos: [
        {
          tipo: "texto",
          texto: "Abra uma IA de conversação gratuita — ChatGPT, Gemini, Claude ou outra de sua preferência — e complete os 3 exercícios abaixo, na ordem.",
        },
        {
          tipo: "texto",
          texto: "1",
        },
        {
          tipo: "subtitulo",
          texto: "Prompt simples",
        },
        {
          tipo: "texto",
          texto: "Escreva um prompt bem simples e direto, por exemplo: \"me dê dicas de estudo\". Observe a resposta: ela é genérica? Específica? Faltou alguma coisa que você gostaria de saber?",
        },
        {
          tipo: "texto",
          texto: "2",
        },
        {
          tipo: "subtitulo",
          texto: "Mesmo pedido, mais contexto",
        },
        {
          tipo: "texto",
          texto: "Reescreva o mesmo pedido do exercício 1, mas agora com contexto e formato — por exemplo: \"Estou estudando para uma prova de matemática sobre equações do 2º grau, tenho 3 dias antes da prova e costumo me distrair fácil. Me dê um plano de estudo de 3 dias, em tópicos.\" Compare as duas respostas: o que mudou?",
        },
        {
          tipo: "texto",
          texto: "3",
        },
        {
          tipo: "subtitulo",
          texto: "Desafio aberto",
        },
        {
          tipo: "texto",
          texto: "Escolha um assunto que você está estudando de verdade agora (de qualquer matéria) e peça para a IA te ajudar a planejar um resumo dele, especificando: os tópicos que você quer que apareçam, o nível de detalhe (resumo bem curto ou mais completo) e o formato (tópicos, texto corrido, tabela). Leia o resultado com atenção — ele cobriu bem o que você pediu?",
        },
      ],
    },
    {
      id: "uso-responsavel",
      titulo: "Uso responsável",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Não copie e cole sem checar. Como vimos, a IA pode alucinar — sempre confirme fatos, números e datas importantes em outra fonte.",
            "Não use para fazer o trabalho por você sem entender o conteúdo. Use a IA para aprender e destravar ideias, não para substituir o seu próprio entendimento — no fim, quem precisa saber a matéria é você, não a IA.",
            "Cuidado com dados pessoais. Evite colocar em prompts informações sensíveis como CPF, endereço, senhas ou dados de terceiros — o que você digita pode ficar registrado no serviço.",
          ],
        },
      ],
    },
    {
      id: "checklist-da-atividade",
      titulo: "Checklist da atividade",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Entendi a diferença entre IA, Machine Learning, IA Generativa e LLM.",
            "Sei explicar por que a IA pode \"alucinar\" e por que preciso checar as respostas.",
            "Pratiquei as boas práticas de prompt: ser específico, dar contexto, pedir formato, usar exemplos e iterar.",
            "Completei os 3 exercícios guiados numa IA de conversação gratuita.",
            "Entendi os cuidados de uso responsável, incluindo dados pessoais.",
          ],
        },
      ],
    },
  ],
};

export default atividade;
