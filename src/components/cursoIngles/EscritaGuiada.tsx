import { useState } from "react";

import type { BlocoDoTipo } from "@/types/aulaIngles";
import { BotaoFala } from "./BotaoFala";
import estilos from "./EscritaGuiada.module.css";

export function EscritaGuiada({ bloco }: { bloco: BlocoDoTipo<"escrita-guiada"> }) {
  const [valores, definirValores] = useState<string[]>(() => bloco.itens.map(() => ""));
  const [mostrando, definirMostrando] = useState(false);

  return (
    <div>
      <div className={estilos.lista}>
        {bloco.itens.map((item, i) => (
          <div key={item.pt} className={estilos.cartao}>
            <p className={estilos.enunciado}>
              <span className={estilos.numero}>{i + 1}</span>
              {item.pt}
            </p>
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
            {mostrando && (
              <div className={estilos.sugestao}>
                <p className={estilos.sugestaoTexto}>
                  <span className={estilos.selo}>{bloco.rotuloSugestao}</span> {item.sugestao}
                </p>
                <BotaoFala texto={item.sugestao} />
              </div>
            )}
          </div>
        ))}
      </div>

      {mostrando && (
        <p className={estilos.mensagem} role="status">
          {bloco.mensagem}
        </p>
      )}

      <div className={estilos.botoes}>
        <button type="button" className={estilos.principal} onClick={() => definirMostrando(true)}>
          {bloco.rotulos.enviar}
        </button>
        <button
          type="button"
          className={estilos.secundario}
          onClick={() => {
            definirValores(bloco.itens.map(() => ""));
            definirMostrando(false);
          }}
        >
          {bloco.rotulos.limpar}
        </button>
      </div>
    </div>
  );
}
