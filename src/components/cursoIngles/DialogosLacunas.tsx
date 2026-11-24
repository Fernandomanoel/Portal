import { useState } from "react";

import { normalizarPalavra, ehLacuna, estadoDe } from "@/lib/aulaIngles";
import type { BlocoDoTipo } from "@/types/aulaIngles";
import { CampoLacuna } from "./CampoLacuna";
import { RodapeConferir } from "./RodapeConferir";
import estilos from "./DialogosLacunas.module.css";

export function DialogosLacunas({ bloco }: { bloco: BlocoDoTipo<"dialogos-lacunas"> }) {
  const [valores, definirValores] = useState<Record<number, string>>({});
  const [resultado, definirResultado] = useState<{ n: number; total: number } | null>(null);
  const certa = (n: number) => normalizarPalavra(valores[n] ?? "") === bloco.respostas.find((r) => r.n === n)?.aceita;

  return (
    <div>
      <div className={estilos.grade}>
        {bloco.dialogos.map((dialogo) => (
          <section key={dialogo.titulo} className={`${estilos.cartao} ${dialogo.largo ? estilos.largo : ""}`}>
            <span className={estilos.titulo}>{dialogo.titulo}</span>
            <div className={estilos.falas}>
              {dialogo.falas.map((fala, f) => (
                <p key={f} className={estilos.fala}>
                  <strong className={fala.quem === "A" ? estilos.falanteA : estilos.falanteB}>{fala.quem}:</strong>{" "}
                  {fala.partes.map((trecho, t) =>
                    ehLacuna(trecho) ? (
                      <CampoLacuna key={t} trecho={trecho} valor={valores[trecho.lacuna] ?? ""} estado={estadoDe(resultado !== null, certa(trecho.lacuna))} aoMudar={(v) => definirValores((antes) => ({ ...antes, [trecho.lacuna]: v }))} />
                    ) : (
                      trecho
                    ),
                  )}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
      <RodapeConferir
        resultado={resultado}
        mensagens={bloco.mensagens}
        rotulos={bloco.rotulos}
        aoConferir={() => definirResultado({ n: bloco.respostas.filter((r) => certa(r.n)).length, total: bloco.respostas.length })}
        aoReiniciar={() => {
          definirValores({});
          definirResultado(null);
        }}
      />
    </div>
  );
}
