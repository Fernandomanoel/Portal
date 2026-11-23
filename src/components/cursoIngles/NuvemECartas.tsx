import { useState } from "react";

import { embaralhar, estadoDe } from "@/lib/aulaIngles";
import type { BlocoDoTipo } from "@/types/aulaIngles";
import { ImagemAula } from "./ImagemAula";
import { LinhaPratica } from "./LinhaPratica";
import { RodapeConferir } from "./RodapeConferir";
import estilos from "./NuvemECartas.module.css";

export function NuvemECartas({ bloco }: { bloco: BlocoDoTipo<"nuvem-e-cartas"> }) {
  const [palavras, definirPalavras] = useState(() => embaralhar(bloco.palavras));
  const [valores, definirValores] = useState<string[]>(() => bloco.personagens.map(() => ""));
  const [resultado, definirResultado] = useState<{ n: number; total: number } | null>(null);
  const certa = (i: number) => valores[i] === bloco.personagens[i].resposta;

  return (
    <div>
      <div className={estilos.nuvem}>
        <span className={estilos.nuvemRotulo}>{bloco.rotuloNuvem}</span>
        <ul className={estilos.palavras}>
          {palavras.map((palavra) => (
            <li key={palavra} className={estilos.palavra}>
              {palavra}
            </li>
          ))}
        </ul>
      </div>

      <div className={estilos.cartas}>
        {bloco.personagens.map((personagem, i) => (
          <LinhaPratica key={personagem.nome} coluna estado={estadoDe(resultado !== null, certa(i))}>
            <div className={estilos.cartao}>
              <ImagemAula src={personagem.imagem} alt={personagem.nome} reserva={personagem.nome} />
              <span className={estilos.nome}>{personagem.nome}</span>
              <select
                className={estilos.selecao}
                value={valores[i]}
                aria-label={`Symptom for ${personagem.nome}`}
                onChange={(e) => definirValores((antes) => antes.map((v, k) => (k === i ? e.target.value : v)))}
              >
                <option value="">{bloco.rotuloSelecao}</option>
                {palavras.map((palavra) => (
                  <option key={palavra} value={palavra}>
                    {palavra}
                  </option>
                ))}
              </select>
            </div>
          </LinhaPratica>
        ))}
      </div>

      <RodapeConferir
        resultado={resultado}
        mensagens={bloco.mensagens}
        rotulos={bloco.rotulos}
        aoConferir={() => definirResultado({ n: bloco.personagens.filter((_, i) => certa(i)).length, total: bloco.personagens.length })}
        aoReiniciar={() => {
          definirPalavras(embaralhar(bloco.palavras));
          definirValores(bloco.personagens.map(() => ""));
          definirResultado(null);
        }}
      />
    </div>
  );
}
