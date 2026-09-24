import { useEffect, useRef, type ReactNode } from "react";

import { Icone } from "@/components/Icone";
import estilos from "./RodapeResposta.module.css";

interface Props {
  podeVerificar: boolean;
  resultado: { acertou: boolean; titulo: string; detalhe: ReactNode } | null;
  ultimo: boolean;
  aoVerificar: () => void;
  aoContinuar: () => void;
}

/** Barra embaixo do cartão: "Verificar" antes, resultado e "Continuar" depois. */
export function RodapeResposta({ podeVerificar, resultado, ultimo, aoVerificar, aoContinuar }: Props) {
  const continuarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!resultado) return;
    // Espera o Enter que verificou terminar: focar o botão no mesmo toque
    // faria o navegador "clicar" em Continuar e pular o resultado.
    const id = window.setTimeout(() => continuarRef.current?.focus(), 120);
    return () => window.clearTimeout(id);
  }, [resultado]);

  if (!resultado) {
    return (
      <div className={estilos.rodape}>
        <button type="button" className={estilos.botao} disabled={!podeVerificar} onClick={aoVerificar}>
          Verificar
        </button>
      </div>
    );
  }

  return (
    <div className={`${estilos.rodape} ${resultado.acertou ? estilos.acertou : estilos.errou}`} role="status">
      <div className={estilos.mensagem}>
        <span className={estilos.selo}>
          <Icone nome={resultado.acertou ? "check" : "x"} tamanho={22} />
        </span>
        <div>
          <p className={estilos.titulo}>{resultado.titulo}</p>
          <p className={estilos.detalhe}>{resultado.detalhe}</p>
        </div>
      </div>
      <button ref={continuarRef} type="button" className={estilos.botao} onClick={aoContinuar}>
        {ultimo ? "Ver resultado" : "Continuar"}
        <Icone nome="seta-direita" tamanho={18} />
      </button>
    </div>
  );
}
