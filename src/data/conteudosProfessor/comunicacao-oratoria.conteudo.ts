import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Oratória é falar em público com clareza, segurança e propósito. O curso trabalha o medo de falar, a preparação, a estrutura do discurso, a voz e o corpo, os recursos visuais e o contato com a plateia.",
  topicos: [
    {
      titulo: "O medo de falar em público",
      texto: [
        "Quase todo mundo sente nervosismo antes de falar em público: o coração acelera, as mãos suam. É uma reação natural de alerta, e pode virar energia. O que ajuda: preparar-se bem, ensaiar em voz alta, respirar fundo, chegar cedo ao local e começar com uma frase que já está bem treinada.",
      ],
      pontos: ["Dizer por que o nervosismo é normal.", "Aplicar duas técnicas de preparação."],
    },
    {
      titulo: "Planejando o que dizer",
      texto: [
        "Antes de escrever, defina o objetivo (informar, convencer, motivar), o público e o tempo. A estrutura mais simples tem abertura (prender a atenção e anunciar o tema), desenvolvimento (de duas a quatro ideias principais com exemplos) e fechamento (retomar o essencial e chamar para a ação). Uma boa abertura usa uma pergunta, uma história curta ou um dado surpreendente.",
      ],
      pontos: ["Estruturar um discurso de 3 minutos.", "Escrever uma abertura que prenda a atenção."],
      erros: ["Querer falar de tudo e estourar o tempo.", "Ler o texto em vez de falar com as pessoas."],
    },
    {
      titulo: "Voz, corpo e presença",
      texto: [
        "A voz: variar o volume, o ritmo e usar pausas dá ênfase e dá tempo para a plateia pensar. A dicção clara (articular bem as palavras) é treinável. O corpo: postura aberta, pés firmes, gestos naturais na altura do tronco, olhar distribuído pela plateia. Evite se esconder atrás do papel, colocar as mãos nos bolsos o tempo todo e andar sem parar.",
      ],
      pontos: ["Usar pausas de propósito.", "Manter contato visual com a plateia."],
    },
    {
      titulo: "Recursos visuais e perguntas da plateia",
      texto: [
        "Slides são apoio, não roteiro: pouco texto, imagens claras e uma ideia por slide. Para responder perguntas: escute até o fim, repita a pergunta se necessário, responda com objetividade e, se não souber, diga que vai verificar e retorne.",
      ],
      pontos: ["Preparar slides simples.", "Responder uma pergunta difícil com honestidade."],
    },
  ],
  glossario: [
    { termo: "Dicção", definicao: "Clareza na pronúncia das palavras." },
    { termo: "Abertura", definicao: "Início do discurso, que prende a atenção." },
    { termo: "Pausa", definicao: "Silêncio proposital que dá ênfase." },
    { termo: "Contato visual", definicao: "Olhar para as pessoas da plateia." },
    { termo: "Ethos, pathos, logos", definicao: "Credibilidade, emoção e razão: os três apelos da persuasão." },
  ],
  dicas: [
    "Comece com falas curtas de 1 minuto sobre um tema livre, para quebrar o gelo.",
    "Dê feedback em três partes: o que funcionou, o que melhorar e uma sugestão prática.",
    "Grave as apresentações para o aluno se ver: costuma ser desconfortável e muito eficaz.",
  ],
};

export default conteudo;
