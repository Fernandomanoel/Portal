import { useState } from "react";

import { estadoDe } from "@/lib/aulaIngles";
import type { BlocoDoTipo } from "@/types/aulaIngles";
import { BlocoAula } from "./BlocoAula";
import { LinhaPratica } from "./LinhaPratica";
import { RodapeConferir } from "./RodapeConferir";
import estilos from "./EscolherLacuna.module.css";

export function EscolherLacuna({ bloco }: { bloco: BlocoDoTipo<"escolher-lacuna"> }) {
  const [valores, definirValores] = useState<string[]>(() => bloco.itens.map(() => ""));
  const [resultado, definirResultado] = useState<{ n: number; total: number } | null>(null);

  function conferir() {
    definirResultado({ n: bloco.itens.filter((item, i) => valores[i] === item.resposta).length, total: bloco.itens.length });
  }

  function reiniciar() {
    definirValores(bloco.itens.map(() => ""));
    definirResultado(null);
  }

  return (
    <div>
      <div className={estilos.lista}>
        {bloco.itens.map((item, i) => (
          <LinhaPratica key={item.antes} coluna estado={estadoDe(resultado !== null, valores[i] === item.resposta)}>
            <p className={estilos.frase}>
              <span className={estilos.numero}>{i + 1}</span>
              {item.antes}{" "}
              <select
                className={estilos.selecao}
                value={valores[i]}
                aria-label={`Sentence ${i + 1}`}
                onChange={(e) => definirValores((antes) => antes.map((v, k) => (k === i ? e.target.value : v)))}
              >
                <option value="">Choose...</option>
                {item.opcoes.map((opcao) => (
                  <option key={opcao} value={opcao}>
                    {opcao}
                  </option>
                ))}
              </select>{" "}
              {item.depois}
            </p>
          </LinhaPratica>
        ))}
      </div>

      {bloco.aposLista?.map((extra, i) => (
        <BlocoAula key={i} bloco={extra} />
      ))}

      <RodapeConferir resultado={resultado} mensagens={bloco.mensagens} rotulos={bloco.rotulos} aoConferir={conferir} aoReiniciar={reiniciar} />
    </div>
  );
}
