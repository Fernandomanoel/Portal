import type { BlocoDoTipo } from "@/types/aulaIngles";
import { useExplicacaoPt } from "./contextoAula";
import { Rico } from "./Rico";
import estilos from "./Cabecalho.module.css";

export function Cabecalho({ bloco }: { bloco: BlocoDoTipo<"cabecalho"> }) {
  const { pt, alternar } = useExplicacaoPt();
  return (
    <header className={estilos.cabecalho}>
      <div>
        <span className={estilos.etiqueta}>{bloco.etiqueta}</span>
        <h2 className={estilos.titulo}>{bloco.titulo}</h2>
        {bloco.texto && (
          <p className={estilos.texto}>
            <Rico texto={bloco.texto} />
          </p>
        )}
      </div>
      {bloco.traducao && (
        <button type="button" className={estilos.traduzir} aria-pressed={pt} onClick={alternar}>
          {pt ? "SHOW IN ENGLISH" : "ME EXPLIQUE EM PORTUGUÊS"}
        </button>
      )}
    </header>
  );
}
