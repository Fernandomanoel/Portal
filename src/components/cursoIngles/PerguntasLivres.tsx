import { useEffect, useState } from "react";

import type { BlocoDoTipo } from "@/types/aulaIngles";
import { BotaoFala } from "./BotaoFala";
import { Rico } from "./Rico";
import estilos from "./PerguntasLivres.module.css";

export function PerguntasLivres({ bloco }: { bloco: BlocoDoTipo<"perguntas-livres"> }) {
  const [salvo, definirSalvo] = useState(false);

  useEffect(() => {
    if (!salvo) return;
    const id = window.setTimeout(() => definirSalvo(false), 3500);
    return () => window.clearTimeout(id);
  }, [salvo]);

  return (
    <div>
      <ol className={estilos.lista}>
        {bloco.perguntas.map((pergunta, i) => (
          <li key={i} className={estilos.cartao}>
            <div className={estilos.topo}>
              <p className={estilos.pergunta}>
                <span className={estilos.numero}>{i + 1}</span>
                <Rico texto={pergunta.texto} />
              </p>
              <BotaoFala texto={pergunta.fala} rotulo={bloco.rotuloOuvir} />
            </div>
            <textarea className={estilos.campo} rows={2} placeholder={bloco.placeholder} aria-label={`${i + 1}. ${pergunta.fala}`} />
          </li>
        ))}
      </ol>
      <div className={estilos.rodape}>
        <button type="button" className={estilos.salvar} onClick={() => definirSalvo(true)}>
          {bloco.botao}
        </button>
        {salvo && (
          <span className={estilos.mensagem} role="status">
            {bloco.mensagem}
          </span>
        )}
      </div>
    </div>
  );
}
