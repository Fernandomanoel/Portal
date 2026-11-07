import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Inteligência emocional é a capacidade de perceber, entender e conduzir as próprias emoções e as dos outros. O curso trabalha autoconhecimento, controle emocional, empatia, relacionamento e como lidar com pressão e conflito no trabalho.",
  topicos: [
    {
      titulo: "O que são emoções e por que importam no trabalho",
      texto: [
        "Emoções são reações naturais (alegria, medo, raiva, tristeza) que informam o que está acontecendo. Nenhuma emoção é «errada»: o que importa é a forma de agir diante dela. Inteligência emocional, popularizada por Daniel Goleman, reúne cinco competências: autoconsciência, autorregulação, motivação, empatia e habilidades sociais.",
      ],
      pontos: ["Nomear as cinco competências.", "Diferenciar sentir de agir."],
      atividades: ["inteligencia-emocional-conhecendo-as-emocoes"],
    },
    {
      titulo: "Autoconhecimento e autorregulação",
      texto: [
        "Autoconhecimento é reconhecer o que se sente e o que dispara cada reação. Autorregulação é escolher a resposta: respirar, esperar antes de reagir, nomear a emoção («estou com raiva») e só depois decidir. Uma técnica simples é a pausa de seis segundos antes de responder em uma discussão.",
      ],
      pontos: ["Identificar os próprios gatilhos.", "Aplicar uma pausa antes de reagir."],
      atividades: ["inteligencia-emocional-conhecendo-a-si-mesmo"],
      erros: ["Confundir controlar emoção com reprimir: reprimir acumula e explode depois."],
    },
    {
      titulo: "Empatia e relacionamento",
      texto: [
        "Empatia é tentar compreender o que o outro sente, sem necessariamente concordar. Para exercitar: ouvir sem interromper, perguntar, observar o corpo e o tom e validar o sentimento antes de propor a solução. Relacionamentos saudáveis no trabalho dependem de respeito, clareza e confiança.",
      ],
      pontos: ["Praticar a escuta empática.", "Validar um sentimento antes de aconselhar."],
      atividades: ["inteligencia-emocional-situacoes-com-pessoas", "inteligencia-emocional-locais-e-ambientes"],
    },
    {
      titulo: "Pressão, estresse e conflitos",
      texto: [
        "O estresse é a resposta do corpo a uma demanda. Em dose moderada ajuda a render; em excesso, adoece. Estratégias: organizar o tempo, pausas, sono, atividade física e pedir ajuda. Em conflitos, fale sobre o comportamento e não sobre a pessoa («quando isso acontece, eu me sinto assim» é melhor do que «você é sempre assim»).",
      ],
      pontos: ["Dar uma estratégia para lidar com a pressão.", "Reformular uma crítica sem atacar a pessoa."],
      atividades: ["inteligencia-emocional-lidando-com-cada-emocao", "inteligencia-emocional-locais-e-ambientes"],
    },
  ],
  glossario: [
    { termo: "Autoconsciência", definicao: "Perceber o que sente e como isso afeta o comportamento." },
    { termo: "Autorregulação", definicao: "Conduzir as emoções e escolher como reagir." },
    { termo: "Empatia", definicao: "Compreender a emoção do outro." },
    { termo: "Gatilho", definicao: "Situação que dispara uma reação emocional forte." },
    { termo: "Resiliência", definicao: "Capacidade de se recuperar de dificuldades." },
  ],
  dicas: [
    "Cuide do clima da sala: o curso mexe com sentimentos, e ninguém deve ser obrigado a se expor.",
    "Use situações de trabalho fictícias para praticar a pausa e a reformulação.",
    "Não faça papel de terapeuta: se um aluno demonstrar sofrimento intenso, encaminhe à coordenação.",
  ],
};

export default conteudo;
