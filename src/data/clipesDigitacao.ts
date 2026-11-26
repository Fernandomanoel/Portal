import type { Clipe } from "@/types/digitacaoClipe";

const BASE = `${import.meta.env.BASE_URL}digitacao/clipes`;

/** Chave do ranking da digitação com clipes (um só, para todos os clipes). */
export const ID_RANKING_CLIPE = "digitacao-clipe";

/** Clipes da digitação «Digite o Clipe»: vídeo e letra fornecidos pelo usuário. Clipe novo é um objeto a mais aqui. */
export const CLIPES_DIGITACAO: Clipe[] = [
  {
    id: "trastevere",
    titulo: "Trastevere",
    artista: "Måneskin",
    video: `${BASE}/trastevere.mp4`,
    capa: `${BASE}/trastevere.jpg`,
    linhas: [
      { texto: "The touch of an angel, the taste of a drug" },
      { texto: "The look of a stranger who has seen too much" },
      { texto: "Nothing comes for free, but you can pay with your heart" },
      { texto: "If you got one" },
      { texto: "Tell me all your questions, all you got to ask" },
      { texto: "She's licking his fingers and shuffling the cards" },
      { texto: "I'll give you the talent, you can give me your life" },
      { texto: "If you got one" },
      { texto: "I swear to God that from tomorrow there will be no more pain" },
      { texto: "I will cancel your name from each one of my songs" },
      { texto: "Now I have to hold onto my knees" },
      { texto: "But to be honest, I never truly gave a shit when you didn't come along" },
      { texto: "Oh, so leave me alone" },
      { texto: "Open up my chest, take everything I've got, yeah" },
      { texto: "The touch of an angel, the taste of a drug" },
      { texto: "The look of a stranger who has seen too much" },
      { texto: "Nothing comes for free, but you can pay with your heart" },
      { texto: "If you got one" },
      { texto: "Tell me all your questions, all you got to ask" },
      { texto: "She's licking his fingers and shuffling the cards" },
      { texto: "I'll give you the talent, you can give me your life" },
      { texto: "If you got one" },
      { texto: "I swear to God that from tomorrow there will be no more pain" },
      { texto: "I will cancel your name from each one of my songs" },
      { texto: "Now I have to hold onto my knees" },
      { texto: "But to be honest, I never truly gave a shit when you didn't come along" },
      { texto: "Oh, so leave me alone" },
      { texto: "Open up my chest, take everything I've got, yeah" },
      { texto: "So leave me alone" },
      { texto: "Open up my chest, take everything I've got" },
    ],
  },
];
