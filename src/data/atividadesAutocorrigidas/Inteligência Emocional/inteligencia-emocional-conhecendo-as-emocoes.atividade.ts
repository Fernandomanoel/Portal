import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, escolha, resposta } from "../ajudantes";
import { comFigura, figura } from "../inteligenciaEmocionalComum";

const atividade: AtividadeAutocorrigida = {
  titulo: "Inteligência Emocional — Conhecendo as Emoções",
  introducao:
    "Antes de controlar uma emoção, é preciso reconhecê-la e dar nome a ela. Esta atividade apresenta as seis emoções básicas, mostra como cada uma aparece no corpo, ensina a medir a intensidade e pede que você olhe para as suas próprias emoções. Algumas perguntas têm resposta certa; as de autoconhecimento não: elas só pedem que você seja sincero(a) consigo mesmo(a).",
  itens: [
    comFigura(
      associar({
        id: "para-que-servem",
        titulo: "Para que serve cada emoção",
        blocos: [
          { tipo: "texto", texto: "Emoções não são defeitos: são mensagens. Cada uma prepara o corpo e a mente para agir de um jeito. O problema nunca é sentir, e sim reagir sem pensar." },
          { tipo: "nota", variante: "dica", texto: "Perguntar \"o que essa emoção está tentando me dizer?\" costuma ser mais útil do que perguntar \"por que eu sinto isso?\"." },
        ],
        instrucao: "Ligue cada emoção à sua função.",
        opcoes: ["Avisa que algo foi injusto ou ultrapassou um limite", "Protege de um perigo real ou imaginado", "Pede pausa, cuidado e apoio depois de uma perda", "Aproxima das pessoas e reforça o que é bom"],
        linhas: [
          { id: "raiva", rotulo: "Raiva", correta: 0 },
          { id: "medo", rotulo: "Medo", correta: 1 },
          { id: "tristeza", rotulo: "Tristeza", correta: 2 },
          { id: "alegria", rotulo: "Alegria", correta: 3 },
        ],
        explicacao: "Quando você entende a função, a emoção deixa de ser uma inimiga e vira informação para decidir melhor.",
      }),
      figura("emocoes-basicas", "Seis rostos — alegria, tristeza, raiva, medo, nojo e surpresa — cada um com a função da emoção.", "As seis emoções básicas e para que servem."),
    ),
    comFigura(
      escolha({
        id: "sinais-no-corpo",
        titulo: "O corpo avisa primeiro",
        blocos: [
          { tipo: "texto", texto: "Antes de você perceber o que sente, o corpo já mostrou: coração acelerado, rosto quente, mãos suadas, nó na garganta, estômago apertado, ombros tensos. Quem aprende a ler esses sinais ganha segundos preciosos para escolher o que fazer." },
        ],
        instrucao: "Numa reunião, uma crítica deixa você com o rosto quente, o maxilar travado e as mãos fechadas. Qual é a melhor leitura desses sinais?",
        opcoes: ["Raiva ou irritação chegando: é hora de respirar antes de responder.", "Sono: é só cansaço.", "Alegria: o corpo está feliz.", "Nenhuma: o corpo não tem a ver com emoção."],
        correta: 0,
        explicacao: "Calor no rosto, maxilar travado e mãos fechadas são sinais clássicos de raiva. Perceber isso a tempo permite escolher a resposta, em vez de explodir.",
      }),
      figura("emocao-no-corpo", "Silhueta humana com cinco pontos marcados — rosto, peito, estômago, mãos e ombros — e a emoção ligada a cada um.", "Onde cada emoção costuma aparecer no corpo."),
    ),
    comFigura(
      associar({
        id: "intensidade",
        titulo: "Dar o nome certo à intensidade",
        blocos: [
          { tipo: "texto", texto: "A mesma emoção tem graus: do incômodo à fúria, da preocupação ao pânico. Quem só tem a palavra mais forte (\"estou com ódio\", \"estou desesperado\") reage como se tudo fosse emergência. Usar a palavra exata ajuda você a reagir na medida." },
        ],
        instrucao: "Ligue cada situação ao nome mais adequado da emoção.",
        opcoes: ["Irritação", "Preocupação", "Desânimo", "Euforia"],
        linhas: [
          { id: "fila", rotulo: "A fila do banco está demorando mais do que o esperado e você suspira", correta: 0 },
          { id: "prova", rotulo: "Você pensa na prova de amanhã e fica remexendo no assunto", correta: 1 },
          { id: "meta", rotulo: "Você não bateu a meta por pouco e está sem vontade de recomeçar", correta: 2 },
          { id: "pulo", rotulo: "Você acaba de saber que passou no emprego dos sonhos e quase grita", correta: 3 },
        ],
        explicacao: "Nomear com precisão baixa a intensidade: \"estou irritado\" pede uma pausa; \"estou furioso\" pode pedir muito mais.",
      }),
      figura("escala-de-intensidade", "Quatro linhas — raiva, medo, tristeza e alegria — cada uma com quatro graus de intensidade, do mais fraco ao mais forte.", "Cada emoção tem graus de intensidade."),
    ),
    resposta({
      id: "minhas-emocoes",
      titulo: "Olhando para si: a emoção da semana",
      instrucao: "Pense na emoção mais forte que você sentiu nesta semana. Escreva qual foi, em que situação aconteceu, onde você a sentiu no corpo e como a chamaria (do mais fraco ao mais forte). Não há resposta certa: é para você se conhecer.",
      rotulo: "Sua emoção da semana",
      placeholder: "Na terça, quando... eu senti... no corpo, percebi... eu a chamaria de...",
      minPalavras: 20,
      minCaracteres: 100,
    }),
  ],
};

export default atividade;
