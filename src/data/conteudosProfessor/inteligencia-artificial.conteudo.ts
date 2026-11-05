import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "O curso mostra o que é Inteligência Artificial na prática, como as ferramentas de IA generativa funcionam em linhas gerais, como pedir bem (engenharia de prompt) e como usar com responsabilidade. Ferramentas e recursos mudam rápido: ensine conceitos e boas práticas, não um produto específico.",
  topicos: [
    {
      titulo: "O que é IA, aprendizado de máquina e IA generativa",
      texto: [
        "Inteligência Artificial é o campo que faz computadores executarem tarefas que normalmente exigem inteligência humana (reconhecer imagens, entender texto, recomendar). O aprendizado de máquina (machine learning) é a técnica em que o sistema aprende padrões a partir de dados, em vez de seguir regras escritas à mão. A IA generativa cria conteúdo novo (texto, imagem, áudio, código) a partir do que aprendeu. Os modelos de linguagem (LLMs) preveem a próxima palavra mais provável, com base em enormes quantidades de texto.",
        "Importante: a IA não «sabe» de verdade. Ela produz respostas plausíveis, e por isso pode errar com muita confiança (as chamadas alucinações).",
      ],
      pontos: ["Diferenciar IA, aprendizado de máquina e IA generativa.", "Explicar o que é uma alucinação."],
      atividades: ["ia-introducao-e-prompts"],
    },
    {
      titulo: "Engenharia de prompt: pedir bem",
      texto: [
        "O prompt é a instrução dada à IA. Um bom prompt traz: o papel («aja como um professor de matemática»), o contexto (quem é o público e o objetivo), a tarefa clara, o formato desejado (lista, tabela, 5 linhas) e exemplos, se houver. Pede-se, depois, ajustes: «mais curto», «com exemplos do dia a dia». Perguntas vagas geram respostas vagas.",
      ],
      pontos: ["Reescrever um prompt ruim em um prompt bom.", "Pedir ajustes à resposta."],
      exemplo: "Ruim: «fale de marketing». Bom: «Explique o funil de vendas a iniciantes em um parágrafo curto e dê um exemplo com uma padaria».",
      atividades: ["ia-introducao-e-prompts", "ia-generativa-engenharia-prompt-aplicacoes"],
    },
    {
      titulo: "Aplicações no dia a dia e no trabalho",
      texto: [
        "A IA ajuda a resumir textos, rascunhar e-mails, gerar ideias, traduzir, explicar conceitos, montar planos de estudo e criar imagens. O resultado é um rascunho: a pessoa revisa, corrige e decide. A IA é uma ferramenta de apoio, e não um substituto do raciocínio.",
      ],
      pontos: ["Dar exemplos de usos úteis.", "Explicar por que se deve revisar o que a IA produz."],
      atividades: ["ia-generativa-engenharia-prompt-aplicacoes"],
    },
    {
      titulo: "Limites, ética e privacidade",
      texto: [
        "Cuidados: não informar dados pessoais, senhas ou informações confidenciais da empresa em ferramentas públicas; conferir fatos e fontes; reconhecer vieses (a IA reproduz preconceitos dos dados); respeitar direitos autorais; e declarar o uso de IA quando for relevante (trabalhos escolares e profissionais). Imagens e vídeos podem ser falsos: desconfie de conteúdo que parece bom demais.",
      ],
      pontos: ["Listar o que não se deve compartilhar com uma IA.", "Citar ao menos dois riscos do uso de IA."],
      erros: ["Copiar a resposta da IA sem conferir.", "Colar dados de clientes em uma ferramenta pública."],
      atividades: ["ia-introducao-e-prompts"],
    },
  ],
  glossario: [
    { termo: "Prompt", definicao: "Instrução ou pergunta dada a uma IA." },
    { termo: "LLM", definicao: "Modelo de linguagem de grande porte, que gera texto." },
    { termo: "IA generativa", definicao: "IA que cria conteúdo novo (texto, imagem, áudio, código)." },
    { termo: "Alucinação", definicao: "Resposta falsa apresentada com confiança." },
    { termo: "Viés", definicao: "Tendência injusta nos resultados, vinda dos dados." },
    { termo: "Machine learning", definicao: "Aprendizado de máquina: o sistema aprende padrões a partir de dados." },
  ],
  dicas: [
    "Peça que os alunos comparem a resposta a um prompt vago e a um prompt detalhado.",
    "Faça um exercício de checagem: peça uma informação e verifique em fontes confiáveis.",
    "Deixe claro desde o início as regras da escola sobre o uso de IA em trabalhos.",
  ],
};

export default conteudo;
