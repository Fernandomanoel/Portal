import { useState } from "react";

import { normalizarFrase, estadoDe } from "@/lib/aulaIngles";
import type { BlocoDoTipo } from "@/types/aulaIngles";
import { LinhaPratica } from "./LinhaPratica";
import { RodapeConferir } from "./RodapeConferir";
import estilos from "./CombinarFrases.module.css";

export function CombinarFrases({ bloco }: { bloco: BlocoDoTipo<"combinar-frases"> }) {
  const [valores, definirValores] = useState<string[]>(() => bloco.itens.map(() => ""));
  const [resultado, definirResultado] = useState<{ n: number; total: number } | null>(null);
  const certa = (i: number) => normalizarFrase(valores[i]) === normalizarFrase(bloco.itens[i].resposta);

  return (
    <div>
      <div className={estilos.lista}>
        {bloco.itens.map((item, i) => (
          <LinhaPratica key={item.enunciado} coluna estado={estadoDe(resultado !== null, certa(i))}>
            <div className={estilos.topo}>
              <p className={estilos.enunciado}>
                <span className={estilos.numero}>{i + 1}</span>
                {item.enunciado}
              </p>
              {item.dica && <span className={estilos.dica}>({item.dica})</span>}
            </div>
            <input
              type="text"
              className={estilos.campo}
              value={valores[i]}
              placeholder={bloco.placeholder}
              aria-label={`Sentence ${i + 1}`}
              autoComplete="off"
              spellCheck={false}
              onChange={(e) => definirValores((antes) => antes.map((v, k) => (k === i ? e.target.value : v)))}
            />
          </LinhaPratica>
        ))}
      </div>
      <RodapeConferir
        resultado={resultado}
        mensagens={bloco.mensagens}
        rotulos={bloco.rotulos}
        aoConferir={() => definirResultado({ n: bloco.itens.filter((_, i) => certa(i)).length, total: bloco.itens.length })}
        aoReiniciar={() => {
          definirValores(bloco.itens.map(() => ""));
          definirResultado(null);
        }}
      />
    </div>
  );
}
