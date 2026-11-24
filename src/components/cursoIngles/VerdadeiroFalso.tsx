import { useId, useState } from "react";

import { estadoDe } from "@/lib/aulaIngles";
import type { BlocoDoTipo } from "@/types/aulaIngles";
import { LinhaPratica } from "./LinhaPratica";
import { RodapeConferir } from "./RodapeConferir";
import estilos from "./VerdadeiroFalso.module.css";

type Escolha = "true" | "false" | "";

export function VerdadeiroFalso({ bloco }: { bloco: BlocoDoTipo<"verdadeiro-falso"> }) {
  const base = useId();
  const [valores, definirValores] = useState<Escolha[]>(() => bloco.itens.map(() => ""));
  const [resultado, definirResultado] = useState<{ n: number; total: number } | null>(null);
  const certa = (i: number) => valores[i] === String(bloco.itens[i].resposta);

  return (
    <div>
      <div className={estilos.lista}>
        {bloco.itens.map((item, i) => (
          <LinhaPratica key={item.afirmacao} estado={estadoDe(resultado !== null, certa(i))}>
            <p className={estilos.afirmacao}>
              <strong className={estilos.numero}>{i + 1}.</strong>
              {item.afirmacao}
            </p>
            <div className={estilos.opcoes} role="radiogroup" aria-label={`Statement ${i + 1}`}>
              {(["true", "false"] as const).map((valor) => (
                <label key={valor} className={estilos.opcao}>
                  <input
                    type="radio"
                    name={`${base}-${i}`}
                    value={valor}
                    checked={valores[i] === valor}
                    onChange={() => definirValores((antes) => antes.map((v, k) => (k === i ? valor : v)))}
                  />
                  <span>{valor === "true" ? "True" : "False"}</span>
                </label>
              ))}
            </div>
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
