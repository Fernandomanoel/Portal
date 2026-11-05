import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Liderar é influenciar pessoas para alcançar resultados, com respeito e clareza. O curso diferencia chefe e líder, apresenta estilos de liderança, comunicação, motivação, delegação, feedback e gestão de conflitos.",
  topicos: [
    {
      titulo: "Chefe, líder e gestor",
      texto: [
        "O chefe manda com base no cargo; o líder inspira e é seguido por escolha. Gestor é quem administra recursos e resultados; um bom gestor também lidera. Liderar envolve ter visão, comunicar com clareza, dar o exemplo, desenvolver a equipe e assumir responsabilidade.",
      ],
      pontos: ["Distinguir chefe de líder.", "Dar exemplos de liderança pelo exemplo."],
    },
    {
      titulo: "Estilos de liderança",
      texto: [
        "Autocrático: o líder decide sozinho (útil em emergência). Democrático: decide ouvindo a equipe (engaja). Liberal (laissez-faire): deixa a equipe decidir (funciona com pessoas muito maduras). A liderança situacional propõe adaptar o estilo à maturidade de cada pessoa e à tarefa: não há um estilo certo para tudo.",
      ],
      pontos: ["Reconhecer os estilos em exemplos.", "Escolher o estilo mais adequado para uma situação."],
    },
    {
      titulo: "Comunicação e feedback",
      texto: [
        "Líder explica o porquê das metas, escuta mais do que fala e dá retorno frequente. O bom feedback descreve o comportamento observado (fatos), o efeito dele e o que se espera daqui em diante, de forma respeitosa e no momento certo, de preferência em particular quando for corretivo e em público quando for elogio.",
      ],
      pontos: ["Dar um feedback em três partes: fato, impacto e pedido."],
    },
    {
      titulo: "Motivação e delegação",
      texto: [
        "Motivação é o que move a pessoa. Nem sempre é dinheiro: reconhecimento, autonomia, propósito e desenvolvimento pesam. Delegar é passar uma tarefa junto com a autoridade e o acesso necessários, combinando resultado esperado, prazo e como acompanhar. Delegar não é largar: o líder continua responsável pelo resultado.",
      ],
      pontos: ["Explicar por que delegar desenvolve a equipe.", "Combinar uma delegação com resultado e prazo."],
      erros: ["Delegar sem dar autoridade.", "Fazer micro gestão e não confiar na equipe."],
    },
    {
      titulo: "Conflitos e trabalho em equipe",
      texto: [
        "Conflito faz parte do trabalho em grupo. O líder atua ouvindo os lados, separando pessoas de problemas, buscando interesses em comum e fechando um combinado claro. Uma equipe forte tem objetivo comum, papéis claros, confiança e comunicação aberta.",
      ],
      pontos: ["Seguir passos para mediar um conflito."],
    },
  ],
  glossario: [
    { termo: "Liderança situacional", definicao: "Adaptar o estilo de liderar a cada pessoa e situação." },
    { termo: "Delegação", definicao: "Passar tarefa com autoridade e responsabilidade." },
    { termo: "Feedback", definicao: "Retorno sobre comportamento e desempenho." },
    { termo: "Engajamento", definicao: "Envolvimento e comprometimento com o trabalho." },
    { termo: "Empatia", definicao: "Compreender o ponto de vista e os sentimentos do outro." },
  ],
  dicas: [
    "Use dinâmicas de grupo e peça que o aluno observe quem lidera sem ter o cargo.",
    "Peça que cada aluno descreva o melhor líder que já teve e o que ele fazia.",
    "Evite receitas: o que funciona para uma equipe pode não funcionar em outra.",
  ],
};

export default conteudo;
