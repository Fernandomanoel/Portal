import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Atender bem é resolver o problema do cliente com respeito e clareza. O curso trata de postura, comunicação, escuta, atendimento presencial, telefônico e digital, reclamações e a satisfação do cliente.",
  topicos: [
    {
      titulo: "O que é atendimento e quem é o cliente",
      texto: [
        "Cliente é qualquer pessoa que depende do nosso trabalho: o comprador, mas também o colega de outro setor (cliente interno). Um bom atendimento reúne rapidez, cordialidade, conhecimento e resolução. A experiência completa, desde o primeiro contato até o pós-venda, é o que o cliente lembra.",
      ],
      pontos: ["Diferenciar cliente interno e externo.", "Citar atributos de um bom atendimento."],
    },
    {
      titulo: "Comunicação e escuta ativa",
      texto: [
        "Comunicar é transmitir e confirmar o entendimento. A escuta ativa significa dar atenção total, não interromper, repetir com as próprias palavras para confirmar e fazer perguntas. A linguagem corporal (olhar, postura, expressão) reforça ou desmente as palavras. Evite jargão, gírias e respostas secas.",
      ],
      pontos: ["Parafrasear o pedido do cliente.", "Escolher palavras claras e educadas."],
      erros: ["Interromper o cliente para dar a solução antes de entender.", "Dizer «não sei» sem oferecer um caminho."],
    },
    {
      titulo: "Atendimento presencial, telefônico e digital",
      texto: [
        "No presencial, cumprimente, olhe nos olhos e ofereça ajuda sem pressionar. No telefone, atenda rápido, identifique-se, fale com clareza, peça licença antes de pôr em espera e confirme os dados no fim. No digital (chat, e-mail, redes), responda no prazo, escreva sem erros e com tom cordial, e confirme o que o cliente entendeu.",
      ],
      pontos: ["Seguir um roteiro simples de atendimento telefônico.", "Escrever uma resposta de chat educada e objetiva."],
    },
    {
      titulo: "Reclamações e clientes difíceis",
      texto: [
        "Uma reclamação bem tratada pode fidelizar o cliente. Sequência recomendada: ouvir sem interromper, demonstrar empatia, pedir desculpas quando cabe, esclarecer os fatos, propor a solução e acompanhar até o fim. Não leve o tom do cliente para o lado pessoal e nunca discuta. Se não puder resolver, encaminhe para quem pode e informe o prazo.",
        "No Brasil, o Código de Defesa do Consumidor garante direitos como informação clara, troca e reparação nos casos previstos em lei.",
      ],
      pontos: ["Aplicar a sequência para tratar reclamação.", "Saber quando encaminhar o caso."],
    },
    {
      titulo: "Pós-venda e medição da satisfação",
      texto: [
        "O pós-venda confirma se o cliente ficou satisfeito e abre espaço para novas compras. A satisfação pode ser medida por pesquisa (por exemplo o NPS, que pergunta de 0 a 10 se a pessoa recomendaria) e por indicadores como tempo de resposta e taxa de resolução no primeiro contato.",
      ],
      pontos: ["Explicar para que serve o pós-venda.", "Dizer como se mede a satisfação."],
    },
  ],
  glossario: [
    { termo: "Escuta ativa", definicao: "Ouvir com atenção total e confirmar o entendimento." },
    { termo: "Empatia", definicao: "Colocar-se no lugar do outro para entender o que ele sente." },
    { termo: "Cliente interno", definicao: "Colega ou setor que depende do seu trabalho." },
    { termo: "NPS", definicao: "Pesquisa de recomendação, de 0 a 10." },
    { termo: "Pós-venda", definicao: "Acompanhamento do cliente depois da compra." },
  ],
  dicas: [
    "Treine com role-play de uma reclamação real: um aluno é o cliente irritado e outro atende.",
    "Grave, com consentimento, um atendimento simulado e analise o tom de voz e a postura.",
    "Ensine o mantra: ouvir, entender, resolver e confirmar.",
  ],
};

export default conteudo;
