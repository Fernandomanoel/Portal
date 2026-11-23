import { useId } from "react";

import { Icone } from "@/components/Icone";
import { useNarracaoAula } from "./contextoAula";
import estilos from "./BotaoFala.module.css";

interface Props {
  texto: string;
  /** Com rótulo mostra «🔊 Listen»; sem, só o ícone. */
  rotulo?: string;
  velocidade?: number;
  /** Sobre fundo escuro. */
  escuro?: boolean;
  /** Nome para leitores de tela quando só há o ícone. */
  descricao?: string;
}

export function BotaoFala({ texto, rotulo, velocidade, escuro = false, descricao = "Listen" }: Props) {
  const chave = useId();
  const { falar, falandoChave, suportado } = useNarracaoAula();
  const falando = falandoChave === chave;
  return (
    <button
      type="button"
      className={`${estilos.botao} ${escuro ? estilos.escuro : ""}`}
      data-falando={falando ? "sim" : "nao"}
      aria-label={rotulo ? undefined : descricao}
      disabled={!suportado}
      onClick={() => falar(chave, texto, velocidade)}
    >
      <Icone nome="som" tamanho={15} />
      {rotulo && <span>{rotulo}</span>}
    </button>
  );
}
