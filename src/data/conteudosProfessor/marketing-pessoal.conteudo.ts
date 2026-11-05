import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Marketing pessoal é cuidar da imagem profissional como quem cuida de uma marca: saber o que se tem de valor, como isso é percebido e como mostrar com coerência no currículo, nas redes e no dia a dia de trabalho.",
  topicos: [
    {
      titulo: "Autoconhecimento e proposta de valor",
      texto: [
        "O ponto de partida é saber quem você é profissionalmente: pontos fortes, interesses, valores e o que você entrega de diferente. A proposta de valor pessoal responde a uma pergunta simples: que problema eu resolvo e para quem?",
        "Uma forma prática de organizar é a análise FOFA pessoal (Forças, Oportunidades, Fraquezas e Ameaças), que separa o que é interno (forças e fraquezas) do que vem de fora (oportunidades e ameaças do mercado).",
      ],
      pontos: ["Escrever a própria proposta de valor em uma frase.", "Fazer uma FOFA pessoal."],
      erros: ["Listar qualidades genéricas («responsável», «proativo») sem exemplos."],
    },
    {
      titulo: "Imagem, postura e comunicação",
      texto: [
        "A imagem profissional é a soma da aparência, do comportamento e da comunicação. Pontualidade, cumprir o combinado, escrever com clareza e ouvir fazem parte da marca pessoal tanto quanto a roupa. Em geral, adequar-se ao ambiente de trabalho é mais importante do que seguir a moda.",
        "A comunicação inclui o que se diz, como se diz e o que o corpo mostra. Clareza, tom respeitoso e escuta atenta pesam mais do que vocabulário difícil.",
      ],
      pontos: ["Explicar a diferença entre imagem real e imagem percebida.", "Dar exemplos de comportamentos que constroem confiança."],
    },
    {
      titulo: "Currículo, LinkedIn e presença digital",
      texto: [
        "O currículo deve ser objetivo (em geral uma página), com dados de contato, resumo profissional, experiências com resultados e formação. O LinkedIn funciona como um currículo vivo, com foto adequada, título que diz o que a pessoa faz e conexões da área.",
        "Tudo o que está público nas redes sociais faz parte da imagem: antes de uma contratação, é comum a empresa pesquisar o candidato. Convém separar o perfil pessoal do profissional ou ajustar a privacidade.",
      ],
      pontos: ["Montar um currículo claro e objetivo.", "Revisar o que está público nas próprias redes."],
      erros: ["Currículo com foto informal, erros de português ou informações que não podem ser comprovadas."],
    },
    {
      titulo: "Networking e reputação",
      texto: [
        "Networking é a rede de relações profissionais, construída com troca, e não só com pedido: ajudar, agradecer, manter contato. Reputação é o que dizem de você quando você não está presente, e leva anos para construir e pouco tempo para perder.",
      ],
      pontos: ["Dar exemplos de networking genuíno.", "Explicar por que a reputação é um patrimônio."],
    },
  ],
  glossario: [
    { termo: "Marca pessoal", definicao: "O conjunto de percepções que os outros têm sobre você como profissional." },
    { termo: "Proposta de valor", definicao: "O que você entrega de útil e diferente, e para quem." },
    { termo: "FOFA (SWOT)", definicao: "Forças, Oportunidades, Fraquezas e Ameaças." },
    { termo: "Networking", definicao: "Rede de contatos profissionais cultivada ao longo do tempo." },
    { termo: "Elevator pitch", definicao: "Apresentação pessoal de 30 a 60 segundos." },
  ],
  dicas: [
    "Peça que cada aluno escreva e fale o seu elevator pitch, e dê feedback em duplas.",
    "Faça a revisão de perfis de redes sociais com permissão do aluno e sem expor ninguém na frente da turma.",
    "Deixe claro que marketing pessoal não é fingir: é mostrar com coerência o que a pessoa realmente tem.",
  ],
};

export default conteudo;
