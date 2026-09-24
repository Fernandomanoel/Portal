import type { AtividadeIngles } from "@/types/ingles";

const TERCEIRA_PESSOA = "Com he, she ou it, o verbo ganha -s no fim.";

const atividade: AtividadeIngles = {
  slug: "frases-rotina",
  titulo: "Monte a Frase — Rotina",
  descricao: "12 frases sobre o dia a dia para montar tocando nas palavras, com o presente simples e as palavras de frequência (always, never).",
  nivel: "Básico",
  trilha: "frases",
  cor: "#15803d",
  abertura: {
    titulo: "Hora de montar frases!",
    texto: "Eu mostro a frase em português e você monta em inglês tocando nas palavras, na ordem certa. Cuidado: em algumas tem uma palavra a mais que não serve. Tocou errado? É só tocar de novo na palavra para tirar.",
  },
  conteudo: {
    tipo: "exercicios",
    exercicios: [
      { tipo: "ordenar", traducao: "Eu acordo às sete horas.", palavras: ["I", "wake", "up", "at", "seven", "o'clock"] },
      { tipo: "ordenar", traducao: "Eu tomo café da manhã com a minha família.", palavras: ["I", "have", "breakfast", "with", "my", "family"], extras: ["a"] },
      { tipo: "ordenar", traducao: "Ela vai para o trabalho de ônibus.", palavras: ["She", "goes", "to", "work", "by", "bus"], extras: ["go"], dica: TERCEIRA_PESSOA },
      {
        tipo: "ordenar",
        traducao: "Nós não trabalhamos aos domingos.",
        palavras: ["We", "don't", "work", "on", "Sundays"],
        extras: ["doesn't"],
        explicacao: "Com I, you, we e they o negativo é don't. Doesn't é só para he, she e it.",
      },
      { tipo: "ordenar", traducao: "Ele gosta de jogar futebol.", palavras: ["He", "likes", "to", "play", "soccer"], extras: ["like"], dica: TERCEIRA_PESSOA },
      {
        tipo: "ordenar",
        traducao: "Eu sempre escovo os dentes antes de dormir.",
        palavras: ["I", "always", "brush", "my", "teeth", "before", "bed"],
        extras: ["the"],
        explicacao: "Always vem antes do verbo. E com partes do corpo o inglês usa my, your: brush my teeth.",
      },
      { tipo: "ordenar", traducao: "Minha irmã estuda inglês à noite.", palavras: ["My", "sister", "studies", "English", "at", "night"], extras: ["study"], dica: TERCEIRA_PESSOA },
      {
        tipo: "ordenar",
        traducao: "Que horas você almoça?",
        palavras: ["What", "time", "do", "you", "have", "lunch"],
        extras: ["does"],
        dica: "Pergunta no presente começa com What time + do.",
      },
      { tipo: "ordenar", traducao: "Eles moram perto da escola.", palavras: ["They", "live", "near", "the", "school"], extras: ["lives"] },
      { tipo: "ordenar", traducao: "Eu nunca bebo café à noite.", palavras: ["I", "never", "drink", "coffee", "at", "night"], extras: ["drinks"] },
      {
        tipo: "ordenar",
        traducao: "Você trabalha aos sábados?",
        palavras: ["Do", "you", "work", "on", "Saturdays"],
        extras: ["Does"],
        explicacao: "Pergunta com you começa com Do. Does é para he, she e it.",
      },
      { tipo: "ordenar", traducao: "Meu pai cozinha o jantar todo dia.", palavras: ["My", "dad", "cooks", "dinner", "every", "day"], extras: ["cook"], dica: TERCEIRA_PESSOA },
    ],
  },
};

export default atividade;
