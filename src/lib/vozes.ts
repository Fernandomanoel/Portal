export type IdiomaNarracao = "pt-BR" | "en-US";

// A API de voz não diz o gênero: reconhecemos pelo nome as vozes femininas e
// masculinas mais comuns no Windows, no macOS, no Android e no Chrome.
const FEMININAS = [
  "female",
  "feminina",
  "zira",
  "aria",
  "jenny",
  "michelle",
  "ana",
  "emma",
  "ava",
  "samantha",
  "susan",
  "karen",
  "moira",
  "tessa",
  "victoria",
  "fiona",
  "kate",
  "salli",
  "joanna",
  "ivy",
  "kendra",
  "kimberly",
  "allison",
  "serena",
  "hazel",
  "libby",
  "sonia",
  "sara",
  "francisca",
  "maria",
  "luciana",
  "vitoria",
  "thalita",
  "leila",
  "manuela",
  "yara",
  "brenda",
  "camila",
  "joana",
];

const MASCULINAS = [
  "male",
  "masculino",
  "daniel",
  "antonio",
  "ricardo",
  "felipe",
  "fabio",
  "julio",
  "donato",
  "humberto",
  "nicolau",
  "valerio",
  "david",
  "mark",
  "guy",
  "george",
  "james",
  "ryan",
  "christopher",
  "eric",
  "roger",
  "brian",
  "andrew",
  "steffan",
  "fred",
  "alex",
  "tom",
  "rishi",
  "aaron",
  "arthur",
  "oliver",
  "thomas",
  "reed",
  "rocko",
  "grandpa",
];

// "Google US English" e "Google português do Brasil" são vozes femininas sem
// nenhum nome de pessoa.
const FEMININAS_SEM_NOME = ["google us english", "google português do brasil", "google portugues do brasil"];

type Genero = "feminina" | "masculina" | "desconhecida";

export function generoDaVoz(nome: string): Genero {
  const minusculo = nome.toLowerCase();
  // Palavra inteira: "female" contém "male", "Mariana" não é "Maria"... mas
  // "Microsoft Maria - Portuguese" tem "maria" como palavra.
  const palavras = minusculo.normalize("NFD").replace(/[̀-ͯ]/g, "").split(/[^a-z]+/);
  if (palavras.includes("female") || palavras.includes("feminina")) return "feminina";
  if (palavras.some((p) => MASCULINAS.includes(p))) return "masculina";
  if (palavras.some((p) => FEMININAS.includes(p))) return "feminina";
  if (FEMININAS_SEM_NOME.some((n) => minusculo.startsWith(n))) return "feminina";
  return "desconhecida";
}

interface VozLida {
  name: string;
  lang: string;
  localService: boolean;
}

/**
 * Vozes do idioma na ordem em que vale tentar: femininas primeiro, e entre
 * elas as instaladas no computador antes das online (as online são as que mais
 * falham: sem internet, rede lenta, ou o corte do Chrome em falas longas).
 */
export function ordenarVozes<V extends VozLida>(vozes: readonly V[], idioma: IdiomaNarracao): V[] {
  const prefixo = idioma.slice(0, 2);
  const pontuar = (voz: V) => {
    const genero = generoDaVoz(voz.name);
    let pontos = genero === "feminina" ? 8 : genero === "masculina" ? -8 : 0;
    if (voz.localService) pontos += 3;
    if (voz.lang.replace("_", "-").toLowerCase() === idioma.toLowerCase()) pontos += 2;
    return pontos;
  };
  return vozes
    .filter((voz) => voz.lang.replace("_", "-").toLowerCase().startsWith(prefixo))
    .map((voz, ordem) => ({ voz, ordem, pontos: pontuar(voz) }))
    .sort((a, b) => b.pontos - a.pontos || a.ordem - b.ordem)
    .map(({ voz }) => voz);
}

/**
 * Quebra a fala em frases curtas: o Chrome corta no meio (e às vezes dá erro)
 * uma fala longa numa voz online.
 */
export function dividirFala(texto: string, limite = 180): string[] {
  const frases = texto.replace(/\s+/g, " ").trim().match(/[^.!?;:]+[.!?;:]*\s*/g) ?? [];
  const partes: string[] = [];
  let atual = "";
  for (const frase of frases) {
    if ((atual + frase).length > limite && atual) {
      partes.push(atual.trim());
      atual = "";
    }
    if (frase.length > limite) {
      for (const pedaco of frase.split(/(?<=,)\s+/)) {
        if ((atual + pedaco).length > limite && atual) {
          partes.push(atual.trim());
          atual = "";
        }
        atual += `${pedaco} `;
      }
    } else {
      atual += frase;
    }
  }
  if (atual.trim()) partes.push(atual.trim());
  return partes;
}
