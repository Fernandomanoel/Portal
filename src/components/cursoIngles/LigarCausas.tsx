import { useState } from "react";

import { estadoDe } from "@/lib/aulaIngles";
import type { BlocoDoTipo } from "@/types/aulaIngles";
import { BotaoFala } from "./BotaoFala";
import { LinhaPratica } from "./LinhaPratica";
import { RodapeConferir } from "./RodapeConferir";
import estilos from "./LigarCausas.module.css";

export function LigarCausas({ bloco }: { bloco: BlocoDoTipo<"ligar-causas"> }) {
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
      <ul className={estilos.legenda}>
        {bloco.legenda.map((item) => (
          <li key={item.n} className={estilos.termo}>
            <span className={estilos.numero}>({item.n})</span> {item.termo}
          </li>
        ))}
      </ul>

      <div className={estilos.lista}>
        {bloco.itens.map((item, i) => (
          <LinhaPratica key={item.texto} estado={estadoDe(resultado !== null, valores[i] === item.resposta)}>
            <div className={estilos.enunciado}>
              <select
                className={estilos.selecao}
                value={valores[i]}
                aria-label={`Select ache number for statement ${i + 1}`}
                onChange={(e) => definirValores((antes) => antes.map((v, k) => (k === i ? e.target.value : v)))}
              >
                <option value="">#</option>
                {bloco.legenda.map((opcao) => (
                  <option key={opcao.n} value={String(opcao.n)}>
                    {opcao.n}
                  </option>
                ))}
              </select>
              <span className={estilos.texto}>{item.texto}</span>
            </div>
            <BotaoFala texto={item.fala} rotulo={bloco.rotuloOuvir} />
          </LinhaPratica>
        ))}
      </div>

      <RodapeConferir resultado={resultado} mensagens={bloco.mensagens} rotulos={bloco.rotulos} aoConferir={conferir} aoReiniciar={reiniciar} />
    </div>
  );
}
