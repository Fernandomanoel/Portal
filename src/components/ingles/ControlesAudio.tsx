import { useEffect } from "react";

import { Icone } from "@/components/Icone";
import { useNarracao } from "@/hooks/useNarracao";
import estilos from "./ControlesAudio.module.css";

const NORMAL = 0.92;
const DEVAGAR = 0.6;

interface Props {
  texto: string;
  /** Fala sozinha quando o texto aparece (exercício de ouvir, fala nova da Gabi). */
  tocarAoAbrir?: boolean;
  tamanho?: "grande" | "compacto";
}

/** "Ouvir" e "Ouvir devagar", na voz feminina em inglês do navegador. */
export function ControlesAudio({ texto, tocarAoAbrir = false, tamanho = "grande" }: Props) {
  const { suportado, estado, falar, parar } = useNarracao({ idioma: "en-US", velocidade: NORMAL });

  useEffect(() => {
    if (!tocarAoAbrir) return parar;
    // Pequena espera: deixa a tela trocar antes da voz começar.
    const id = window.setTimeout(() => falar(texto), 350);
    return () => {
      window.clearTimeout(id);
      parar();
    };
  }, [texto, tocarAoAbrir, falar, parar]);

  if (!suportado) {
    return <p className={estilos.semAudio}>Este navegador não tem voz para ler em inglês.</p>;
  }

  const classe = [estilos.controles, tamanho === "compacto" ? estilos.compacto : "", estado === "falando" ? estilos.falando : ""].join(" ");

  return (
    <div className={classe}>
      <button type="button" className={estilos.ouvir} onClick={() => falar(texto)}>
        <Icone nome="som" tamanho={tamanho === "compacto" ? 16 : 22} />
        Ouvir
        <span className={estilos.ondas} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </button>
      <button type="button" className={estilos.devagar} onClick={() => falar(texto, DEVAGAR)}>
        <Icone nome="devagar" tamanho={tamanho === "compacto" ? 16 : 20} />
        Devagar
      </button>
    </div>
  );
}
