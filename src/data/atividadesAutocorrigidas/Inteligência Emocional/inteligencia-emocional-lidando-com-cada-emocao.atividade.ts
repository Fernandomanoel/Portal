import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, escolha, resposta } from "../ajudantes";
import { comFigura, figura } from "../inteligenciaEmocionalComum";

const atividade: AtividadeAutocorrigida = {
  titulo: "Inteligência Emocional — Lidando com Cada Emoção",
  introducao:
    "Sentir é automático; reagir é uma escolha. Aqui você aprende duas técnicas simples para ganhar tempo entre a emoção e a reação (a regra do PARE e a respiração quadrada) e o que costuma ajudar em cada emoção: raiva, medo e ansiedade, tristeza, frustração e alegria. As estratégias são hábitos do dia a dia: não substituem acompanhamento profissional quando a emoção for muito intensa ou durar muito tempo.",
  regras: {
    titulo: "Importante",
    itens: [
      "Se a tristeza, a ansiedade ou a raiva forem muito fortes, durarem semanas ou atrapalharem o trabalho e a vida, procure ajuda profissional (psicólogo, médico, serviço de saúde).",
      "Em risco imediato para você ou para outra pessoa, ligue para o CVV (188, 24 horas) ou para o SAMU (192).",
    ],
  },
  itens: [
    comFigura(
      escolha({
        id: "pare",
        titulo: "A regra do PARE",
        blocos: [
          { tipo: "texto", texto: "Entre o que acontece e o que você faz existe um espaço pequeno. A regra do PARE usa esse espaço em quatro movimentos: Pare, Respire, Observe (o que sinto, o que pensei) e Escolha a reação que ajuda, em vez da do impulso." },
          { tipo: "nota", variante: "dica", texto: "Quatro segundos já fazem diferença: é o tempo de uma respiração lenta." },
        ],
        instrucao: "Um colega diz, na frente de todos: \"Você errou de novo.\" Qual resposta aplica o PARE?",
        opcoes: [
          "Respirar e dizer: \"Me mostra onde foi? Quero entender para não repetir.\"",
          "Responder na hora: \"Errei nada, você é que não sabe explicar!\"",
          "Ficar calado, sorrir e guardar a raiva para mais tarde.",
          "Levantar e sair da sala batendo a porta.",
        ],
        correta: 0,
        explicacao: "A resposta calma, com uma pergunta, resolve o problema e mantém a relação. Explodir, engolir e fugir não resolvem nada.",
      }),
      figura("tecnica-pare", "Quatro etapas — Pare, Respire, Observe e Escolha — e o contraste entre reação no impulso e reação escolhida diante de uma crítica.", "A regra do PARE na prática."),
    ),
    comFigura(
      {
        id: "respiracao",
        titulo: "Exercício: respiração quadrada",
        cenario: "Respirar devagar avisa ao corpo que não há perigo e acalma o coração. A respiração quadrada tem quatro tempos iguais e serve para antes de uma prova, de uma apresentação ou depois de uma discussão.",
        passos: [
          "Sente-se com as costas apoiadas e os pés no chão.",
          "Puxe o ar pelo nariz, contando devagar até 4.",
          "Segure o ar, contando até 4.",
          "Solte o ar pela boca, devagar, contando até 4.",
          "Fique sem ar nos pulmões, contando até 4.",
          "Repita quatro vezes, sentindo os ombros descerem e o batimento diminuir.",
        ],
        aviso: "Se ficar tonto(a), encurte a contagem para 3 e respire normalmente. Quem tem problemas respiratórios ou de pressão deve conversar com um profissional antes.",
        campos: [
          {
            id: "como-ficou",
            rotulo: "Depois do exercício, como você se sentiu? (uma frase)",
            placeholder: "Ex.: mais calmo, ombros mais leves...",
            regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
            mensagemCerta: "Registrado. Se funcionou, use sempre que o corpo esquentar.",
          },
        ],
        objetivo: "Ter uma técnica de bolso para acalmar o corpo antes de decidir o que fazer.",
      },
      figura("respiracao-quadrada", "Quadrado roxo com setas nos quatro lados: puxe o ar, segure, solte o ar e segure, cada um com quatro tempos; ao lado, quando usar a técnica.", "Respiração quadrada: quatro tempos em cada lado."),
    ),
    associar({
      id: "estrategia-por-emocao",
      titulo: "O que ajuda em cada emoção",
      blocos: [
        { tipo: "texto", texto: "Cada emoção pede um cuidado diferente. Reprimir (engolir) ou explodir quase nunca ajuda; reconhecer, dar um tempo e agir com clareza, sim." },
      ],
      instrucao: "Ligue cada emoção à estratégia mais saudável.",
      opcoes: [
        "Afastar-se um pouco, respirar e só depois falar do fato, com um pedido claro",
        "Dividir o que dá medo em passos pequenos e fazer o primeiro; buscar informação",
        "Permitir sentir, conversar com alguém de confiança e cuidar do sono e da alimentação",
        "Reconhecer o esforço, aprender com o erro e tentar de novo de outro jeito",
        "Compartilhar com quem importa e anotar o que ajudou a chegar lá",
      ],
      linhas: [
        { id: "raiva", rotulo: "Raiva", correta: 0 },
        { id: "medo", rotulo: "Medo e ansiedade", correta: 1 },
        { id: "tristeza", rotulo: "Tristeza", correta: 2 },
        { id: "frustracao", rotulo: "Frustração", correta: 3 },
        { id: "alegria", rotulo: "Alegria", correta: 4 },
      ],
      explicacao: "Cada emoção pede uma resposta própria: a raiva, pausa; o medo, passos pequenos; a tristeza, apoio; a frustração, aprendizado; a alegria, compartilhar.",
    }),
    escolha({
      id: "ansiedade-prova",
      titulo: "Ansiedade antes de falar em público",
      cenario: "Amanhã você apresenta um trabalho para a turma. Hoje à noite o coração dispara só de pensar, você imagina tudo dando errado e não consegue dormir.",
      instrucao: "Qual é o plano mais útil?",
      opcoes: [
        "Ensaiar em voz alta com um colega, dividir a fala em partes pequenas, respirar com a técnica quadrada e dormir cedo.",
        "Ficar a noite toda repassando o que pode dar errado.",
        "Decidir que vai faltar para não passar vergonha.",
        "Tomar muito café para ficar mais atento.",
      ],
      correta: 0,
      explicacao: "Ensaiar e dividir em passos reduz o medo do desconhecido; a respiração acalma o corpo e dormir ajuda a pensar com clareza. Fugir só aumenta o medo da próxima vez.",
    }),
    resposta({
      id: "meu-plano",
      titulo: "O seu plano para a emoção mais difícil",
      instrucao: "Escolha a emoção que mais atrapalha você (raiva, ansiedade, tristeza, frustração...). Escreva o que costuma disparar, o que o seu corpo faz e dois passos que você vai tentar na próxima vez (por exemplo, a regra do PARE e uma conversa com alguém).",
      rotulo: "Seu plano",
      placeholder: "A emoção que mais me atrapalha é... costuma aparecer quando... meu corpo... na próxima vez eu vou...",
      minPalavras: 25,
      minCaracteres: 130,
    }),
  ],
};

export default atividade;
