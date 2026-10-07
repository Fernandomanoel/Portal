import type { CriterioRedacao, Redacao, SecaoRedacao } from "@/types/ingles";

/**
 * Peças repetidas entre as redações de exame: escalas oficiais e critérios.
 * Os critérios do IELTS são os mesmos quatro em toda Task 2; a Task 1 só
 * troca o primeiro (Task Achievement no lugar de Task Response).
 */

export const ESCALA_IELTS: Redacao["escala"] = {
  titulo: "A escala do IELTS: bandas de 0 a 9",
  nota: "Cada critério recebe uma banda de 0 a 9 e a nota da tarefa é a média dos quatro. Na nota final de Writing, a Task 2 vale o dobro da Task 1. O resultado é arredondado para a meia banda mais próxima (6.0, 6.5, 7.0...).",
  faixas: [
    { nota: "9", descricao: "Expert: responde por completo, texto fluido, vocabulário e gramática naturais e precisos; erros só raríssimos, de “deslize”." },
    { nota: "8", descricao: "Muito bom: ideias bem desenvolvidas, vocabulário amplo com uso preciso; poucos erros, que não atrapalham." },
    { nota: "7", descricao: "Bom: posição clara do começo ao fim, conectivos variados, algumas palavras menos comuns; erros ocasionais. Nota pedida por muitas universidades." },
    { nota: "6", descricao: "Competente: responde, mas parte das ideias fica pouco desenvolvida; conectivos às vezes mecânicos; erros que quase não atrapalham." },
    { nota: "5", descricao: "Modesto: responde só em parte, texto repetitivo, vocabulário limitado; erros frequentes que às vezes confundem." },
    { nota: "4 ou menos", descricao: "Limitado: foge da pergunta, pouca organização, vocabulário básico e erros que atrapalham a leitura. Texto abaixo do mínimo de palavras também cai aqui." },
  ],
};

export const ESCALA_TOEFL: Redacao["escala"] = {
  titulo: "A escala do TOEFL iBT (formato de 2026)",
  nota: "Desde 21 de janeiro de 2026 o TOEFL iBT dá a nota de cada seção numa escala de 1 a 6, em meios pontos, alinhada ao CEFR; durante a transição o boletim também mostra a escala antiga de 0 a 120 no total. Cada tarefa de escrita é lida por avaliador e por correção automática da ETS, com uma rubrica geral de 0 a 5.",
  faixas: [
    { nota: "5", descricao: "Resposta totalmente bem-sucedida: relevante, bem explicada, com estruturas variadas, vocabulário preciso e quase nenhum erro." },
    { nota: "4", descricao: "Geralmente bem-sucedida: relevante e bem explicada, com erros pequenos e pouco frequentes." },
    { nota: "3", descricao: "Parcialmente bem-sucedida: contribui, mas parte das ideias fica sem explicação ou confusa; erros perceptíveis." },
    { nota: "2", descricao: "Em grande parte malsucedida: ideias pouco desenvolvidas ou fora do assunto, vocabulário limitado e muitos erros." },
    { nota: "1 ou 0", descricao: "Malsucedida: quase não responde, copia o enunciado, está em outra língua ou em branco." },
  ],
};

export const ATENCAO_TOEFL_2026: SecaoRedacao = {
  titulo: "Antes de começar: o TOEFL mudou em 2026",
  blocos: [
    {
      tipo: "texto",
      texto:
        "A partir de 21 de janeiro de 2026 a seção de Writing do TOEFL iBT passou a ter três tarefas: Build a Sentence (montar frases), Write an Email (escrever um e-mail) e Writing for an Academic Discussion (participar de um fórum de aula). A antiga tarefa integrada (ler, ouvir uma aula e resumir) saiu do exame.",
    },
    {
      tipo: "atencao",
      texto:
        "Tempos e quantidades por tarefa podem ser ajustados pela ETS. Os tempos aqui são os de referência para o treino; confira sempre o formato atual em ets.org/toefl antes da prova.",
    },
  ],
};

const COERENCIA_IELTS: CriterioRedacao = {
  nome: "Coherence and Cohesion",
  traducao: "Coerência e coesão",
  peso: "25%",
  avalia: "Se o texto tem uma ordem lógica fácil de seguir: um assunto por parágrafo, ideia central clara em cada um e conectivos e pronomes ligando as frases.",
  notaAlta: "Parágrafos bem divididos, cada um com uma frase-tópico. Conectivos variados e usados com naturalidade, sem enfileirar “Firstly, Secondly, Moreover” em todas as frases.",
  tiraPonto: "Texto num bloco só, parágrafos sem ideia central, conectivo errado (“However” onde não há contraste) ou conectivo em excesso, de forma mecânica.",
  checklist: [
    "Dividi o texto em parágrafos, cada um com uma ideia central",
    "Cada parágrafo de desenvolvimento começa com uma frase-tópico",
    "Usei conectivos variados e com o sentido certo (contraste, causa, exemplo)",
  ],
};

const VOCABULARIO_IELTS: CriterioRedacao = {
  nome: "Lexical Resource",
  traducao: "Vocabulário",
  peso: "25%",
  avalia: "A variedade e a precisão das palavras: sinônimos em vez de repetição, combinações naturais (collocations), registro formal e ortografia.",
  notaAlta: "Palavras menos comuns usadas com precisão (“exacerbate”, “a significant proportion of”), collocations naturais (“pose a risk”, “tackle a problem”) e paráfrase do enunciado.",
  tiraPonto: "Repetir as mesmas palavras do enunciado, gíria e linguagem informal (kids, stuff, a lot of), palavra “difícil” no lugar errado e erros de ortografia frequentes.",
  checklist: [
    "Parafraseei o enunciado em vez de copiar as palavras dele",
    "Não repeti a mesma palavra-chave muitas vezes: usei sinônimos",
    "Evitei palavras informais e contrações (kids, a lot of, don't)",
  ],
};

const GRAMATICA_IELTS: CriterioRedacao = {
  nome: "Grammatical Range and Accuracy",
  traducao: "Variedade e correção gramatical",
  peso: "25%",
  avalia: "Se há frases simples e complexas (orações com which, although, if, voz passiva) e quantas frases saem sem erro, incluindo pontuação.",
  notaAlta: "Mistura de estruturas complexas com a maioria das frases sem erro algum. Pontuação correta, sem frases emendadas por vírgula.",
  tiraPonto: "Só frases curtas e simples, ou frases longas demais e confusas; erros repetidos de concordância (people is), tempo verbal e artigos.",
  checklist: [
    "Usei pelo menos três estruturas complexas (although, which, if, voz passiva)",
    "Revisei concordância verbal, plural e artigos (a, an, the)",
    "Nenhuma frase passa de umas 40 palavras nem está emendada só com vírgulas",
  ],
};

export const CRITERIOS_IELTS_TASK2: CriterioRedacao[] = [
  {
    nome: "Task Response",
    traducao: "Resposta à tarefa",
    peso: "25%",
    avalia: "Se o texto responde exatamente à pergunta feita (todas as partes dela), com uma posição clara e ideias desenvolvidas com explicação e exemplo.",
    notaAlta: "Posição clara já na introdução e mantida até a conclusão; cada ideia principal é explicada e sustentada por um exemplo relevante. Todas as partes da pergunta respondidas.",
    tiraPonto: "Responder só metade da pergunta, mudar de opinião no meio, ideias genéricas sem explicação, fugir do tema ou ficar abaixo de 250 palavras.",
    checklist: [
      "Respondi todas as partes da pergunta",
      "Minha opinião aparece na introdução e se repete na conclusão",
      "Cada ideia principal tem explicação e um exemplo",
    ],
  },
  COERENCIA_IELTS,
  VOCABULARIO_IELTS,
  GRAMATICA_IELTS,
];

export const CRITERIOS_IELTS_TASK1: CriterioRedacao[] = [
  {
    nome: "Task Achievement",
    traducao: "Cumprimento da tarefa",
    peso: "25%",
    avalia: "Se o texto apresenta um panorama (overview) das tendências principais, escolhe os dados mais importantes e faz comparações, sem opinião pessoal.",
    notaAlta: "Overview claro com as duas ou três tendências principais; números escolhidos com critério para sustentar as comparações; nada inventado e nenhuma opinião.",
    tiraPonto: "Faltar o overview (é o erro que mais derruba a nota), listar todos os números sem comparar, interpretar causas que o gráfico não mostra ou dar opinião.",
    checklist: [
      "Escrevi um overview com as tendências principais, sem números",
      "Escolhi os dados mais importantes e comparei, em vez de listar tudo",
      "Não dei opinião nem expliquei causas que os dados não mostram",
    ],
  },
  COERENCIA_IELTS,
  VOCABULARIO_IELTS,
  GRAMATICA_IELTS,
];
