import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, escolha, resposta } from "../ajudantes";
import { comFigura, figura } from "../inteligenciaEmocionalComum";

const atividade: AtividadeAutocorrigida = {
  titulo: "Inteligência Emocional — Locais, Ambientes e Mediação",
  introducao:
    "A mesma frase não cai igual no trabalho, na sala de aula, em casa ou nas redes sociais. Inteligência emocional também é ler o ambiente e as pessoas que estão nele: escolher o tom, o momento e o lugar certos. Neste desafio, você aprende o que cada ambiente pede e treina como mediar um conflito entre duas pessoas — por exemplo, dois colegas que discutem no trabalho — sem tomar partido.",
  itens: [
    comFigura(
      associar({
        id: "tom-por-ambiente",
        titulo: "Cada lugar pede um tom",
        blocos: [
          { tipo: "texto", texto: "Antes de falar, pergunte-se: onde estamos, quem está ouvindo e qual é o objetivo? Uma crítica pode ser necessária no trabalho, mas feita na frente de todos vira humilhação. Uma conversa afetuosa em casa pode soar informal demais numa reunião." },
        ],
        instrucao: "Ligue cada ambiente ao principal cuidado.",
        opcoes: [
          "Criticar a sós, falando de fatos e não de pessoas",
          "Dúvida é bem-vinda e ninguém é exposto na frente da turma",
          "Velhas mágoas voltam fácil: escolha o momento, e não discuta cansado",
          "O cliente irritado não é inimigo: acolha e resolva",
          "O texto não tem tom de voz: releia antes de enviar",
        ],
        linhas: [
          { id: "trabalho", rotulo: "Trabalho (equipe e chefia)", correta: 0 },
          { id: "aula", rotulo: "Sala de aula", correta: 1 },
          { id: "familia", rotulo: "Família", correta: 2 },
          { id: "publico", rotulo: "Atendimento ao público", correta: 3 },
          { id: "redes", rotulo: "Redes sociais e mensagens", correta: 4 },
        ],
        explicacao: "O conteúdo da mensagem pode ser o mesmo; o que muda é o lugar, o tom e o momento — e isso decide se a mensagem é ouvida.",
      }),
      figura("ambientes-e-tom", "Tabela com cinco ambientes — trabalho, sala de aula, família, atendimento ao público e redes sociais — com o tom esperado e o cuidado principal de cada um.", "O tom esperado e o cuidado de cada ambiente."),
    ),
    escolha({
      id: "feedback-no-trabalho",
      titulo: "No trabalho: a crítica ao colega",
      cenario: "Você percebe que um colega entregou um relatório com erros que vão chegar ao cliente. Ele é mais sensível a críticas e tem a fama de se chatear fácil. A equipe está reunida na copa.",
      instrucao: "Qual é a melhor atitude?",
      opcoes: [
        "Chamá-lo para uma conversa reservada e dizer: \"Vi dois números trocados no relatório. Quer que eu revise com você antes de enviar?\"",
        "Avisar em voz alta, na copa: \"Olha, o relatório do fulano está todo errado!\"",
        "Corrigir o relatório sem avisar e deixar o colega sem saber.",
        "Mandar uma mensagem no grupo da equipe com os erros dele.",
      ],
      correta: 0,
      explicacao: "Local reservado, fatos específicos e oferta de ajuda: a crítica vira ajuda. Expor na frente de todos ou corrigir às escondidas fere a confiança.",
    }),
    escolha({
      id: "cliente-irritado",
      titulo: "No atendimento: o cliente alterado",
      cenario: "Um cliente chega ao balcão gritando que o pedido atrasou. Outras pessoas observam. Você sente o coração acelerar.",
      instrucao: "Qual sequência funciona melhor?",
      opcoes: [
        "Respirar, falar baixo e devagar, chamar o cliente pelo nome, reconhecer o aborrecimento e dizer o que será feito agora.",
        "Gritar de volta para mostrar que você não tem medo.",
        "Dizer: \"O senhor precisa se acalmar\" e virar as costas.",
        "Entregar o pedido sem falar nada e fingir que nada aconteceu.",
      ],
      correta: 0,
      explicacao: "Voz baixa, nome e reconhecimento do problema reduzem a tensão. \"Acalme-se\" costuma irritar mais; o objetivo é resolver, não vencer.",
    }),
    comFigura(
      associar({
        id: "etapas-da-mediacao",
        titulo: "Mediando uma discussão entre dois colegas",
        blocos: [
          { tipo: "texto", texto: "Mediar é ajudar duas pessoas a chegarem a um acordo, sem decidir quem está certo. O mediador cuida do ambiente, ouve com igualdade, resume os fatos e ajuda a combinar o próximo passo." },
          { tipo: "lista", numerada: true, itens: ["Separar e acalmar: local reservado, sem plateia.", "Ouvir cada um sem interromper nem tomar partido.", "Resumir os fatos sem culpados.", "Buscar juntos o que cada um pode fazer.", "Combinar e voltar a conversar (data e forma)."] },
        ],
        instrucao: "Ligue cada frase do mediador à etapa em que ela cabe.",
        opcoes: ["Separar e acalmar", "Ouvir cada um", "Resumir os fatos", "Buscar o acordo"],
        linhas: [
          { id: "sala", rotulo: "\"Vamos conversar na sala ao lado, só nós três.\"", correta: 0 },
          { id: "primeiro", rotulo: "\"Maria, conte como você viu. Depois será a vez do João.\"", correta: 1 },
          { id: "fatos", rotulo: "\"Entendi que o prazo era sexta e o arquivo só foi entregue na segunda.\"", correta: 2 },
          { id: "acordo", rotulo: "\"O que cada um pode fazer para isso não se repetir?\"", correta: 3 },
        ],
        explicacao: "O mediador conduz o processo, e não o resultado: quem decide o acordo são as duas pessoas.",
      }),
      figura("mediar-conflito", "Um mediador no centro entre duas pessoas e cinco etapas: separe e acalme, ouça cada um, resuma os fatos, busquem juntos e combine e volte.", "As cinco etapas da mediação."),
    ),
    escolha({
      id: "mediador-perfis",
      titulo: "Mediando pessoas de perfis diferentes",
      cenario: "Ana é extrovertida: fala alto e rápido. Bruno é introvertido: fala pouco e baixo. Os dois discutiram por causa de um prazo. Ana já disse tudo o que pensa; Bruno, ainda não abriu a boca.",
      instrucao: "Como o mediador conduz?",
      opcoes: [
        "Pedir à Ana que espere, dar tempo e espaço ao Bruno (inclusive para escrever o que pensa, se preferir) e só então resumir os dois lados.",
        "Pedir que Bruno \"fale logo\" porque o tempo está acabando.",
        "Dar razão à Ana, porque ela explicou melhor.",
        "Encerrar a conversa dizendo que os dois estão errados.",
      ],
      correta: 0,
      explicacao: "Equilibrar o espaço é parte da mediação: quem fala mais não pode abafar quem pensa antes de falar. Dar tempo ao mais quieto garante que os dois lados apareçam.",
    }),
    resposta({
      id: "minha-mediacao",
      titulo: "Seu roteiro de mediação",
      cenario: "No trabalho, dois colegas — um extrovertido e uma introvertida — discutiram por causa da divisão das tarefas e agora nem se falam. Você é a pessoa em quem os dois confiam.",
      instrucao: "Escreva como você conduziria a conversa: onde e quando a faria, o que diria para abrir, como daria espaço aos dois jeitos de falar e como fecharia com um combinado.",
      rotulo: "Seu roteiro",
      placeholder: "Eu chamaria os dois para... Abriria dizendo: \"...\" Daria espaço a cada um... No fim combinaríamos...",
      minPalavras: 35,
      minCaracteres: 190,
    }),
  ],
};

export default atividade;
