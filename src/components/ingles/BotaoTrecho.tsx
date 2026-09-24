import { Icone } from "@/components/Icone";
import { useNarracao } from "@/hooks/useNarracao";
import estilos from "./BotaoTrecho.module.css";

interface Props {
  texto: string;
  rotulo?: string;
}

/** Botão pequeno para ouvir um só trecho (parágrafo, fala) em inglês. */
export function BotaoTrecho({ texto, rotulo = "Ouvir este trecho" }: Props) {
  const { suportado, estado, falar, parar } = useNarracao({ idioma: "en-US", velocidade: 0.9 });
  if (!suportado) return null;
  const falando = estado === "falando";

  return (
    <button
      type="button"
      className={falando ? `${estilos.botao} ${estilos.falando}` : estilos.botao}
      onClick={() => (falando ? parar() : falar(texto))}
      aria-label={falando ? "Parar" : rotulo}
      title={falando ? "Parar" : rotulo}
    >
      <Icone nome="som" tamanho={17} />
    </button>
  );
}
