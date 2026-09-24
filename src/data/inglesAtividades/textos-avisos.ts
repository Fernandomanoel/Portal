import type { AtividadeIngles } from "@/types/ingles";

const atividade: AtividadeIngles = {
  slug: "textos-avisos",
  titulo: "Avisos — Aeroporto, Metrô e Loja",
  descricao: "3 anúncios de alto-falante do jeito que você ouviria numa viagem: embarque no aeroporto, mudança no metrô e oferta no supermercado.",
  nivel: "Intermediário",
  trilha: "textos",
  cor: "#4338ca",
  abertura: {
    titulo: "Atenção, passageiros!",
    texto: "Aviso de alto-falante é rápido e cheio de informação: número do voo, portão, horário, desconto. Ouça cada aviso, quantas vezes quiser, e responda o que você precisaria saber se estivesse lá.",
  },
  conteudo: {
    tipo: "textos",
    textos: [
      {
        titulo: "Embarque no aeroporto",
        quem: "Anúncio pelo alto-falante no portão de embarque de um aeroporto nos Estados Unidos.",
        tipo: "aviso",
        paragrafos: [
          {
            en: "Good afternoon, ladies and gentlemen. This is a boarding announcement for Flight 482 to Chicago.",
            pt: "Boa tarde, senhoras e senhores. Este é um aviso de embarque do voo 482 para Chicago.",
          },
          {
            en: "We are now inviting passengers with small children and anyone needing extra assistance to board at Gate 15.",
            pt: "Estamos convidando agora passageiros com crianças pequenas e quem precisar de assistência extra para embarcar no portão 15.",
          },
          {
            en: "Please have your boarding pass and ID ready. Due to a full flight, large bags may need to be checked at the gate.",
            pt: "Por favor, tenham o cartão de embarque e o documento em mãos. Como o voo está lotado, malas grandes talvez precisem ser despachadas no portão.",
          },
          {
            en: "Group 1 will begin boarding in about ten minutes. Thank you for flying with us.",
            pt: "O grupo 1 começa a embarcar em cerca de dez minutos. Obrigado por voar conosco.",
          },
        ],
        vocabulario: [
          { en: "boarding", pt: "embarque" },
          { en: "flight", pt: "voo" },
          { en: "gate", pt: "portão" },
          { en: "boarding pass", pt: "cartão de embarque" },
          { en: "ID", pt: "documento de identidade" },
          { en: "full flight", pt: "voo lotado" },
          { en: "checked bags", pt: "malas despachadas" },
        ],
        perguntas: [
          {
            pergunta: "Para onde vai o voo 482?",
            opcoes: ["Chicago.", "Portão 15.", "Nova York."],
            resposta: 0,
            explicacao: "“Flight 482 to Chicago”. O 15 é o número do portão.",
          },
          {
            pergunta: "Quem pode embarcar primeiro?",
            opcoes: ["Passageiros com crianças pequenas ou que precisam de ajuda.", "O grupo 1.", "Quem tem malas grandes."],
            resposta: 0,
            explicacao: "“passengers with small children and anyone needing extra assistance”. O grupo 1 embarca daqui a uns dez minutos.",
          },
          {
            pergunta: "Por que malas grandes talvez sejam despachadas?",
            opcoes: ["Porque o voo está lotado.", "Porque estão pesadas demais.", "Porque o portão mudou."],
            resposta: 0,
            explicacao: "“Due to a full flight” = por causa do voo lotado.",
          },
        ],
      },
      {
        titulo: "Mudança no metrô",
        quem: "Aviso gravado que toca dentro de um trem do metrô.",
        tipo: "aviso",
        paragrafos: [
          {
            en: "Attention, passengers. The next station is Central Park.",
            pt: "Atenção, passageiros. A próxima estação é Central Park.",
          },
          {
            en: "Due to track work, this train will not stop at 72nd Street. Passengers for 72nd Street, please get off at Central Park and take the shuttle bus.",
            pt: "Por causa de obras na linha, este trem não vai parar na rua 72. Passageiros para a rua 72, por favor, desçam em Central Park e peguem o ônibus de ligação.",
          },
          {
            en: "Please stand clear of the closing doors, and remember to take all your belongings with you.",
            pt: "Por favor, afastem-se das portas que estão fechando e lembrem-se de levar todos os seus pertences.",
          },
        ],
        vocabulario: [
          { en: "next station", pt: "próxima estação" },
          { en: "track work", pt: "obras na linha" },
          { en: "get off", pt: "descer" },
          { en: "shuttle bus", pt: "ônibus de ligação" },
          { en: "stand clear", pt: "afaste-se" },
          { en: "belongings", pt: "pertences" },
        ],
        perguntas: [
          {
            pergunta: "Por que o trem não vai parar na rua 72?",
            opcoes: ["Por causa de obras na linha.", "Porque a estação fechou para sempre.", "Porque o trem está atrasado."],
            resposta: 0,
            explicacao: "“Due to track work” = por causa de obras na linha.",
          },
          {
            pergunta: "Quem vai para a rua 72 deve:",
            opcoes: ["Descer em Central Park e pegar o ônibus.", "Ficar no trem até o fim da linha.", "Descer na estação seguinte e voltar a pé."],
            resposta: 0,
            explicacao: "“please get off at Central Park and take the shuttle bus”.",
          },
          {
            pergunta: "“Stand clear of the closing doors” pede para:",
            opcoes: ["Se afastar das portas que estão fechando.", "Segurar a porta para os outros.", "Sair pela porta da frente."],
            resposta: 0,
            explicacao: "stand clear = fique longe, afaste-se.",
          },
        ],
      },
      {
        titulo: "Oferta no supermercado",
        quem: "Anúncio no sistema de som de um supermercado.",
        tipo: "aviso",
        paragrafos: [
          {
            en: "Attention, shoppers! For the next thirty minutes, all fruits and vegetables are twenty percent off.",
            pt: "Atenção, clientes! Nos próximos trinta minutos, todas as frutas e verduras estão com vinte por cento de desconto.",
          },
          {
            en: "That's right: buy one bag of apples and get the second one free. You'll find the offer in aisle three, next to the bakery.",
            pt: "Isso mesmo: compre um saco de maçãs e leve o segundo de graça. A oferta está no corredor três, ao lado da padaria.",
          },
          {
            en: "And a reminder: the store closes at ten p.m. today. Thank you for shopping with us!",
            pt: "E um lembrete: a loja fecha às 22h hoje. Obrigado por comprar conosco!",
          },
        ],
        vocabulario: [
          { en: "shoppers", pt: "clientes" },
          { en: "twenty percent off", pt: "vinte por cento de desconto" },
          { en: "buy one, get one free", pt: "compre um, leve outro de graça" },
          { en: "aisle", pt: "corredor" },
          { en: "bakery", pt: "padaria" },
          { en: "reminder", pt: "lembrete" },
        ],
        perguntas: [
          {
            pergunta: "Por quanto tempo vale o desconto das frutas e verduras?",
            opcoes: ["30 minutos.", "O dia todo.", "Até as 22h."],
            resposta: 0,
            explicacao: "“For the next thirty minutes”. 22h é o horário em que a loja fecha.",
          },
          {
            pergunta: "Onde fica a oferta das maçãs?",
            opcoes: ["No corredor 3, perto da padaria.", "No caixa.", "Na entrada da loja."],
            resposta: 0,
            explicacao: "“in aisle three, next to the bakery”.",
          },
          {
            pergunta: "Na oferta das maçãs, quem compra um saco:",
            opcoes: ["Leva o segundo de graça.", "Paga metade do preço nos dois.", "Ganha 20% de desconto só no primeiro."],
            resposta: 0,
            explicacao: "“buy one bag of apples and get the second one free”.",
          },
        ],
      },
    ],
  },
};

export default atividade;
