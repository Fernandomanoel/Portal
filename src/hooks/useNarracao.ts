import { useCallback, useEffect, useRef, useState } from "react";

type EstadoNarracao = "parada" | "falando";

export type IdiomaNarracao = "pt-BR" | "en-US";

interface Opcoes {
  idioma?: IdiomaNarracao;
  /** 1 é a velocidade normal do navegador. */
  velocidade?: number;
}

// A API de voz não diz o gênero da voz: usamos os nomes das vozes femininas
// mais comuns no Windows, no macOS, no Android e no Chrome.
const VOZES_FEMININAS = [
  "female",
  "google us english",
  "google uk english female",
  "zira",
  "aria",
  "jenny",
  "michelle",
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
  "ava",
  "allison",
  "serena",
  "hazel",
  "libby",
  "sonia",
  "francisca",
  "maria",
  "luciana",
  "vitoria",
  "thalita",
];

function ehFeminina(voz: SpeechSynthesisVoice) {
  const nome = voz.name.toLowerCase();
  return VOZES_FEMININAS.some((parte) => nome.includes(parte));
}

/** Voz do idioma pedido, de preferência feminina e do país exato (en-US antes de en-GB). */
function escolherVoz(idioma: IdiomaNarracao): SpeechSynthesisVoice | undefined {
  const vozes = window.speechSynthesis.getVoices();
  const prefixo = idioma.slice(0, 2);
  const doIdioma = vozes.filter((voz) => voz.lang.replace("_", "-").toLowerCase().startsWith(prefixo));
  const doPais = doIdioma.filter((voz) => voz.lang.replace("_", "-") === idioma);
  const candidatas = doPais.length ? doPais : doIdioma;
  return candidatas.find(ehFeminina) ?? doIdioma.find(ehFeminina) ?? candidatas[0];
}

/**
 * Narração pela voz do próprio navegador, sempre com voz feminina quando o
 * sistema tiver uma. Pode ser repetida sem limite. Trocar por áudio gravado
 * no futuro é mudar só `falar`/`parar` aqui dentro.
 */
export function useNarracao({ idioma = "pt-BR", velocidade = 0.85 }: Opcoes = {}) {
  const suportado = typeof window !== "undefined" && "speechSynthesis" in window;
  const [estado, definirEstado] = useState<EstadoNarracao>("parada");
  const vozRef = useRef<SpeechSynthesisVoice | undefined>(undefined);

  useEffect(() => {
    if (!suportado) return;
    // No Chrome a lista de vozes chega depois do carregamento; sem esperar
    // por ela, a fala sai na voz padrão do sistema (às vezes em outro idioma).
    const atualizar = () => {
      vozRef.current = escolherVoz(idioma);
    };
    atualizar();
    window.speechSynthesis.addEventListener("voiceschanged", atualizar);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", atualizar);
      window.speechSynthesis.cancel();
    };
  }, [suportado, idioma]);

  const parar = useCallback(() => {
    if (!suportado) return;
    window.speechSynthesis.cancel();
    definirEstado("parada");
  }, [suportado]);

  const falar = useCallback(
    (texto: string, velocidadeDestaVez?: number) => {
      if (!suportado) return;
      window.speechSynthesis.cancel();
      vozRef.current ??= escolherVoz(idioma);
      const fala = new SpeechSynthesisUtterance(texto);
      fala.lang = idioma;
      fala.rate = velocidadeDestaVez ?? velocidade;
      if (vozRef.current) fala.voice = vozRef.current;
      fala.onstart = () => definirEstado("falando");
      fala.onend = () => definirEstado("parada");
      fala.onerror = () => definirEstado("parada");
      // Chrome às vezes fica "pausado" depois de um cancel(): retomar antes
      // de falar evita o botão que não faz som nenhum.
      window.speechSynthesis.resume();
      window.speechSynthesis.speak(fala);
    },
    [suportado, idioma, velocidade],
  );

  return { suportado, estado, falar, parar };
}
