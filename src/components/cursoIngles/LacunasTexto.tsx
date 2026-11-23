import { useState } from "react";

import { normalizarModal, ehLacuna, estadoDe } from "@/lib/aulaIngles";
import type { BlocoDoTipo } from "@/types/aulaIngles";
import { CampoLacuna } from "./CampoLacuna";
import { RodapeConferir } from "./RodapeConferir";
import estilos from "./LacunasTexto.module.css";

export function LacunasTexto({ bloco }: { bloco: BlocoDoTipo<"lacunas-texto"> }) {
  const [valores, definirValores] = useState<Record<number, string>>({});
  const [resultado, definirResultado] = useState<{ n: number; total: number } | null>(null);

  const certa = (n: number) => bloco.lacunas.find((l) => l.n === n)?.aceitas.includes(normalizarModal(valores[n] ?? "")) ?? false;

  return (
    <div>
      <div className={estilos.texto}>
        {bloco.paragrafos.map((paragrafo, p) => (
          <p key={p}>
            {paragrafo.map((trecho, t) =>
              ehLacuna(trecho) ? (
                <CampoLacuna key={t} trecho={trecho} valor={valores[trecho.lacuna] ?? ""} estado={estadoDe(resultado !== null, certa(trecho.lacuna))} aoMudar={(v) => definirValores((antes) => ({ ...antes, [trecho.lacuna]: v }))} />
              ) : (
                trecho
              ),
            )}
          </p>
        ))}
      </div>
      <RodapeConferir
        resultado={resultado}
        mensagens={bloco.mensagens}
        rotulos={bloco.rotulos}
        aoConferir={() => definirResultado({ n: bloco.lacunas.filter((l) => certa(l.n)).length, total: bloco.lacunas.length })}
        aoReiniciar={() => {
          definirValores({});
          definirResultado(null);
        }}
      />
    </div>
  );
}
