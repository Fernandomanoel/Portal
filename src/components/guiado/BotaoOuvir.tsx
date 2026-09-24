import { useEffect } from "react";

import { Icone } from "@/components/Icone";
import { useNarracao } from "@/hooks/useNarracao";
import estilos from "./BotaoOuvir.module.css";

interface Props {
  texto: string;
}

export function BotaoOuvir({ texto }: Props) {
  const { suportado, estado, falar, parar } = useNarracao();

  // Texto novo (passo seguinte) nunca herda a fala do anterior.
  useEffect(() => parar, [texto, parar]);

  if (!suportado) return null;

  const falando = estado === "falando";

  return (
    <button
      type="button"
      className={falando ? `${estilos.botao} ${estilos.falando}` : estilos.botao}
      onClick={() => falar(texto)}
      aria-label={falando ? "Ouvindo. Clique para ouvir de novo" : "Ouvir"}
    >
      <Icone nome="som" tamanho={26} />
      <span className={estilos.rotulo}>Ouvir</span>
      <span className={estilos.ondas} aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </button>
  );
}
