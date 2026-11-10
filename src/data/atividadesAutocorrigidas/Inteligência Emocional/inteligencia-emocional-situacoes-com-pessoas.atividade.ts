import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, escolha, resposta } from "../ajudantes";
import { comFigura, figura } from "../inteligenciaEmocionalComum";

const atividade: AtividadeAutocorrigida = {
  titulo: "Inteligência Emocional — Situações com Outras Pessoas",
  introducao:
    "Depois de olhar para dentro, é hora de olhar para o outro (o lado interpessoal). A mesma frase pode ser ouvida de formas muito diferentes por um extrovertido, um ambivertido e um introvertido. Aqui você treina o que dizer e como reagir em situações reais do trabalho e do convívio, escolhendo entre respostas que divergem, e aprende a adaptar o seu jeito ao jeito de quem está à sua frente.",
  itens: [
    comFigura(
      escolha({
        id: "cnv",
        titulo: "Falar sem atacar",
        blocos: [
          { tipo: "texto", texto: "A comunicação não violenta tem quatro passos: dizer o que você observou (o fato, sem julgar), o que sentiu, o que precisa e o que pede. Troque o rótulo (\"você é irresponsável\") pelo fato (\"você chegou depois das 9h três vezes\")." },
        ],
        instrucao: "Um colega chega atrasado pela terceira vez na semana e a loja abre sem ele. Qual frase segue os quatro passos?",
        opcoes: [
          "\"Você chegou depois das 9h três vezes esta semana e eu fiquei preocupado com a abertura. Pode me avisar quando for atrasar?\"",
          "\"Você é irresponsável e sempre faz isso.\"",
          "\"Ninguém aqui aguenta mais os seus atrasos.\"",
          "Não dizer nada e abrir a loja de cara feia.",
        ],
        correta: 0,
        explicacao: "A frase certa tem fato, sentimento e pedido: ela dá ao colega uma chance de mudar sem se sentir atacado.",
      }),
      figura("comunicacao-nao-violenta", "Quatro etapas — observação, sentimento, necessidade e pedido — com exemplo de como trocar um rótulo por um fato.", "Os quatro passos da comunicação não violenta."),
    ),
    comFigura(
      associar({
        id: "tres-perfis",
        titulo: "A mesma crítica, três pessoas diferentes",
        blocos: [
          { tipo: "texto", texto: "Imagine que a chefe aponta um erro na frente da equipe. Pessoas diferentes tendem a reagir de formas diferentes — e a ajuda também é diferente. Lembre-se: são tendências, e não regras." },
        ],
        instrucao: "Ligue cada perfil ao que mais ajuda.",
        opcoes: [
          "Contar até 4 e deixar a resposta para depois, quando estiver calmo",
          "Escolher antes como agir (responder agora ou pedir um tempo)",
          "Pedir uma conversa a sós, de preferência por escrito, para organizar o que quer dizer",
        ],
        linhas: [
          { id: "extro", rotulo: "Extrovertido: tende a responder na hora, em voz alta", correta: 0 },
          { id: "ambi", rotulo: "Ambivertido: ora responde, ora se cala", correta: 1 },
          { id: "intro", rotulo: "Introvertido: tende a se calar e remoer por dias", correta: 2 },
        ],
        explicacao: "Quem reage rápido precisa de pausa; quem remói precisa de espaço e de um jeito seguro de falar; quem oscila precisa decidir antes.",
      }),
      figura("mesma-situacao-tres-perfis", "Três personagens — extrovertido, ambivertido e introvertido — diante da mesma crítica em público, cada um com a sua tendência e o que ajuda.", "Mesma situação, três reações diferentes."),
    ),
    escolha({
      id: "colega-extrovertido",
      titulo: "O colega que fala o tempo todo",
      cenario: "Numa reunião de equipe, um colega muito extrovertido ocupa quase todo o tempo e interrompe os outros. Você tem uma ideia, mas não consegue falar.",
      instrucao: "O que você faz e diz?",
      opcoes: [
        "Esperar uma pausa e dizer com calma: \"Carlos, posso complementar? Tenho uma ideia sobre esse ponto.\"",
        "Interromper aos gritos: \"Chega, deixa os outros falarem!\"",
        "Ficar calado e comentar com os outros depois, nos corredores.",
        "Sair da reunião sem avisar.",
      ],
      correta: 0,
      explicacao: "Pedir a palavra com respeito, usando o nome da pessoa, é firme sem ser agressivo. Quem fala muito normalmente não percebe que está tomando o espaço.",
    }),
    escolha({
      id: "colega-introvertido",
      titulo: "O colega que quase não fala",
      cenario: "Numa reunião, uma colega introvertida não diz nada. O chefe comenta, em tom de brincadeira: \"Fulana, você não tem opinião?\" Ela fica vermelha e calada.",
      instrucao: "Como você ajuda?",
      opcoes: [
        "Depois da reunião, convidar para uma conversa e perguntar o que ela pensa, oferecendo que ela mande por escrito ou fale com mais calma.",
        "Dizer, na frente de todos: \"Fale, ninguém vai te comer!\"",
        "Concluir que ela não se interessa e deixar de lado.",
        "Ignorar: cada um que se vire.",
      ],
      correta: 0,
      explicacao: "Pessoas introvertidas costumam pensar antes de falar e se cansam de ser expostas. Um convite reservado e um canal alternativo (por escrito) dão espaço para a contribuição aparecer.",
    }),
    comFigura(
      escolha({
        id: "semaforo",
        titulo: "O semáforo da reação",
        blocos: [
          { tipo: "texto", texto: "Para qualquer situação tensa, use as três cores: vermelho (pare e respire), amarelo (pense no que sente, no que o outro sente e no que quer que aconteça depois) e verde (aja, com fatos, em primeira pessoa e com um pedido claro)." },
        ],
        instrucao: "Seu colega usou a sua caneca sem pedir e a quebrou. Você sente o rosto esquentar. Qual é a sequência correta?",
        opcoes: [
          "Vermelho: respirar. Amarelo: perceber a raiva e o que quer. Verde: \"Fiquei chateado porque a caneca era importante para mim. Pode me avisar da próxima vez?\"",
          "Verde direto: gritar o que veio à cabeça.",
          "Vermelho e depois sumir sem falar nada, para sempre.",
          "Amarelo: ficar pensando na raiva por dias sem dizer nada.",
        ],
        correta: 0,
        explicacao: "A ordem importa: primeiro acalmar, depois pensar, depois falar. Pular direto para o verde costuma virar briga; ficar parado no amarelo vira mágoa.",
      }),
      figura("semaforo-da-reacao", "Semáforo com três luzes — vermelho para pare, amarelo para pense e verde para aja — e uma explicação ao lado de cada cor.", "O semáforo da reação."),
    ),
    resposta({
      id: "adaptar-o-jeito",
      titulo: "Adaptando a sua conversa ao outro",
      instrucao: "Pense em uma pessoa do seu convívio (trabalho, escola ou família) com um jeito muito diferente do seu. Descreva se ela é mais extrovertida, introvertida ou ambivertida e escreva uma situação difícil com ela. Diga exatamente o que você falaria e como adaptaria o seu jeito.",
      rotulo: "Sua adaptação",
      placeholder: "Penso em... ela é mais... Numa situação em que... eu diria: \"...\" e adaptaria...",
      minPalavras: 30,
      minCaracteres: 160,
    }),
  ],
};

export default atividade;
