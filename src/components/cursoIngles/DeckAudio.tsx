import { Icone } from "@/components/Icone";
import type { BlocoDoTipo } from "@/types/aulaIngles";
import { useNarracaoAula } from "./contextoAula";
import estilos from "./DeckAudio.module.css";

export function DeckAudio({ bloco }: { bloco: BlocoDoTipo<"deck-audio"> }) {
  const { dialogo, suportado } = useNarracaoAula();
  return (
    <div className={estilos.deck}>
      <div className={estilos.linha}>
        <div className={estilos.faixa}>
          <span className={estilos.rotulo}>{bloco.rotulo}</span>
          <audio controls preload="none" className={estilos.audio}>
            <source src={bloco.mp3} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div className={estilos.botoes}>
          <button type="button" className={estilos.tocar} disabled={!suportado} onClick={() => dialogo.tocar(bloco.roteiro)}>
            <Icone nome="som" tamanho={17} />
            <span>{bloco.rotuloTocar}</span>
          </button>
          {dialogo.tocando && (
            <button type="button" className={estilos.parar} onClick={dialogo.parar}>
              <Icone nome="parar" tamanho={16} />
              <span>{bloco.rotuloParar}</span>
            </button>
          )}
        </div>
      </div>
      {dialogo.tocando && (
        <p className={estilos.status} role="status">
          <span className={estilos.ponto} aria-hidden="true" />
          <span>{dialogo.rotuloAtual ? `${bloco.rotuloFalando} ${dialogo.rotuloAtual}` : bloco.rotuloInicio}</span>
        </p>
      )}
    </div>
  );
}
