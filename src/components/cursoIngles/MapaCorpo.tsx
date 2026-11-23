import { useId, useState, type KeyboardEvent } from "react";

import { Icone } from "@/components/Icone";
import type { BlocoDoTipo } from "@/types/aulaIngles";
import { useNarracaoAula } from "./contextoAula";
import { FormaSvgEl } from "./FormaSvgEl";
import estilos from "./MapaCorpo.module.css";

const COR_PONTO = { perigo: "var(--danger)", alerta: "var(--warning)" } as const;

export function MapaCorpo({ bloco }: { bloco: BlocoDoTipo<"mapa-corpo"> }) {
  const { rotulos, sintomas } = bloco;
  const [selecionado, definirSelecionado] = useState<string | null>(null);
  const [explorados, definirExplorados] = useState<ReadonlySet<string>>(new Set());
  const chaveNormal = useId();
  const chaveLenta = useId();
  const { falar, falandoChave } = useNarracaoAula();
  const atual = sintomas.find((s) => s.id === selecionado) ?? null;

  function escolher(id: string) {
    definirSelecionado(id);
    definirExplorados((antes) => new Set(antes).add(id));
  }

  const teclado = (id: string) => (evento: KeyboardEvent) => {
    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      escolher(id);
    }
  };

  return (
    <div>
      <div className={estilos.topo}>
        <div>
          <span className={estilos.etiqueta}>{bloco.cabecalho.etiqueta}</span>
          <h2 className={estilos.titulo}>{bloco.cabecalho.titulo}</h2>
          <p className={estilos.texto}>{bloco.cabecalho.texto}</p>
        </div>
        <div className={estilos.contador}>
          <div>
            <span className={estilos.contadorRotulo}>{rotulos.explorados}</span>
            <span className={estilos.contadorNumero}>
              {explorados.size} / {sintomas.length}
            </span>
          </div>
          <progress className={estilos.barra} value={explorados.size} max={sintomas.length} aria-label={rotulos.explorados} />
        </div>
      </div>

      <div className={estilos.colunas}>
        <div className={estilos.figura}>
          <svg viewBox={bloco.viewBox} className={estilos.svg} role="img" aria-label={bloco.rotuloSvg}>
            <g className={estilos.fundo}>
              {bloco.fundo.map((forma, i) => (
                <FormaSvgEl key={i} forma={forma} />
              ))}
            </g>
            <g className={estilos.silhueta}>
              {bloco.silhueta.map((forma, i) => (
                <FormaSvgEl key={i} forma={forma} />
              ))}
            </g>
            {sintomas.map((s) => (
              <g key={s.id} className={estilos.regiao} data-ativa={selecionado === s.id ? "sim" : "nao"} onClick={() => escolher(s.id)}>
                {s.regiao.map((forma, i) => (
                  <FormaSvgEl key={i} forma={forma} />
                ))}
              </g>
            ))}
            {sintomas.map((s) => (
              <g
                key={s.id}
                className={estilos.ponto}
                data-ativo={selecionado === s.id ? "sim" : "nao"}
                transform={`translate(${s.ponto.x}, ${s.ponto.y})`}
                role="button"
                tabIndex={0}
                aria-label={s.termo}
                onClick={() => escolher(s.id)}
                onKeyDown={teclado(s.id)}
              >
                <circle className={estilos.pulso} r={12} style={{ fill: COR_PONTO[s.ponto.cor] }} opacity={0.35} />
                <circle className={estilos.nucleo} r={6.5} />
              </g>
            ))}
          </svg>
          <div className={estilos.pilulas}>
            {sintomas.map((s) => (
              <button key={s.id} type="button" className={estilos.pilula} aria-pressed={selecionado === s.id} onClick={() => escolher(s.id)}>
                {s.termo}
              </button>
            ))}
          </div>
        </div>

        <div className={estilos.detalhe}>
          <div>
            <div className={estilos.selos}>
              <span className={estilos.selo}>{atual ? rotulos.badgeSelecionado : rotulos.badgeInicial}</span>
              {atual && (
                <span className={estilos.explorado}>
                  {rotulos.badgeExplorado}
                  <Icone nome="check" tamanho={13} />
                </span>
              )}
            </div>
            <h3 className={estilos.termo}>{atual ? atual.termo : rotulos.tituloInicial}</h3>
            <p className={estilos.regiaoNome}>{atual ? `${rotulos.regiaoPrefixo} ${atual.regiaoRotulo}` : rotulos.regiaoInicial}</p>
            <div className={estilos.caixa}>
              <p className={estilos.descricao}>{atual ? atual.descricao : rotulos.descricaoInicial}</p>
              <div className={estilos.exemplo}>
                <span className={estilos.exemploRotulo}>{rotulos.exemploRotulo}</span>
                <p className={estilos.exemploTexto}>{atual ? atual.exemplo : rotulos.exemploInicial}</p>
              </div>
            </div>
          </div>
          <div>
            <span className={estilos.pronuncia}>{rotulos.pronuncia}</span>
            <div className={estilos.audio}>
              <button
                type="button"
                className={estilos.ouvir}
                data-falando={falandoChave === chaveNormal ? "sim" : "nao"}
                disabled={!atual}
                onClick={() => atual && falar(chaveNormal, atual.termo, 0.9)}
              >
                <Icone nome="som" tamanho={17} />
                <span>{rotulos.normal}</span>
              </button>
              <button
                type="button"
                className={`${estilos.ouvir} ${estilos.lento}`}
                data-falando={falandoChave === chaveLenta ? "sim" : "nao"}
                disabled={!atual}
                onClick={() => atual && falar(chaveLenta, atual.termo, 0.62)}
              >
                <Icone nome="devagar" tamanho={17} />
                <span>{rotulos.devagar}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
