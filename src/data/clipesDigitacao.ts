import type { Clipe } from "@/types/digitacaoClipe";

const BASE = `${import.meta.env.BASE_URL}digitacao/clipes`;

/** Chave do ranking da digitação com clipes (um só, para todos os clipes). */
export const ID_RANKING_CLIPE = "digitacao-clipe";

/**
 * Clipes da digitação «Digite o Clipe»: vídeo e letra fornecidos pelo usuário. Clipe novo é um objeto a mais aqui.
 * `inicio`/`fim` (segundos) marcam quando cada verso é cantado: o vídeo espera o aluno no fim do verso.
 */
export const CLIPES_DIGITACAO: Clipe[] = [
  {
    id: "trastevere",
    titulo: "Trastevere",
    artista: "Måneskin",
    video: `${BASE}/trastevere.mp4`,
    capa: `${BASE}/trastevere.jpg`,
    linhas: [
      { texto: "The touch of an angel, the taste of a drug", inicio: 0.0, fim: 5.4 },
      { texto: "The look of a stranger who has seen too much", inicio: 6.0, fim: 10.4 },
      { texto: "Nothing comes for free, but you can pay with your heart", inicio: 11.0, fim: 15.12 },
      { texto: "If you got one", inicio: 16.0, fim: 18.0 },
      { texto: "Tell me all your questions, all you got to ask", inicio: 19.8, fim: 24.88 },
      { texto: "She's licking his fingers and shuffling the cards", inicio: 24.88, fim: 29.56 },
      { texto: "I'll give you the talent, you can give me your life", inicio: 29.56, fim: 34.76 },
      { texto: "If you got one", inicio: 34.76, fim: 37.26 },
      { texto: "I swear to God that from tomorrow there will be no more pain", inicio: 38.5, fim: 43.78 },
      { texto: "I will cancel your name from each one of my songs", inicio: 43.78, fim: 48.34 },
      { texto: "Now I have to hold onto my knees", inicio: 48.34, fim: 51.08 },
      { texto: "But to be honest, I never truly gave a shit when you didn't come along", inicio: 51.08, fim: 59.48 },
      { texto: "Oh, so leave me alone", inicio: 60.08, fim: 63.48 },
      { texto: "Open up my chest, take everything I've got, yeah", inicio: 64.76, fim: 70.1 },
      { texto: "The touch of an angel, the taste of a drug", inicio: 72.62, fim: 77.36 },
      { texto: "The look of a stranger who has seen too much", inicio: 77.36, fim: 82.46 },
      { texto: "Nothing comes for free, but you can pay with your heart", inicio: 82.46, fim: 87.26 },
      { texto: "If you got one", inicio: 87.26, fim: 90.12 },
      { texto: "Tell me all your questions, all you got to ask", inicio: 92.36, fim: 96.36 },
      { texto: "She's licking his fingers and shuffling the cards", inicio: 96.96, fim: 101.34 },
      { texto: "I'll give you the talent, you can give me your life", inicio: 101.34, fim: 106.36 },
      { texto: "If you got one", inicio: 106.5, fim: 109.16 },
      { texto: "I swear to God that from tomorrow there will be no more pain", inicio: 110.62, fim: 115.76 },
      { texto: "I will cancel your name from each one of my songs", inicio: 115.76, fim: 120.36 },
      { texto: "Now I have to hold onto my knees", inicio: 120.36, fim: 122.5 },
      { texto: "But to be honest, I never truly gave a shit when you didn't come along", inicio: 123.1, fim: 130.72 },
      { texto: "Oh, so leave me alone", inicio: 130.72, fim: 135.14 },
      { texto: "Open up my chest, take everything I've got, yeah", inicio: 136.58, fim: 142.3 },
      { texto: "So leave me alone", inicio: 164.28, fim: 168.88 },
      { texto: "Open up my chest, take everything I've got", inicio: 170.72, fim: 176.12 },
    ],
  },
];
