import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";

import { Icone, type NomeIcone } from "@/components/Icone";
import estilos from "./Prateleira.module.css";

export interface ItemPrateleira {
  para: string;
  titulo: string;
  descricao: string;
  capa?: string;
  etiqueta: string;
}

interface Props {
  titulo: string;
  icone: NomeIcone;
  acento: string;
  itens: ItemPrateleira[];
}

/** Uma fileira da vitrine, no jeito de app de streaming: rola de lado, e o card cresce um pouco sob o cursor. */
export function Prateleira({ titulo, icone, acento, itens }: Props) {
  const trilhoRef = useRef<HTMLUListElement>(null);
  const [limites, definirLimites] = useState({ inicio: true, fim: true });

  const medir = useCallback(() => {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    definirLimites({
      inicio: trilho.scrollLeft <= 2,
      fim: trilho.scrollLeft + trilho.clientWidth >= trilho.scrollWidth - 2,
    });
  }, []);

  useEffect(() => {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(trilho);
    return () => observador.disconnect();
  }, [medir, itens.length]);

  function rolar(direcao: 1 | -1) {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    trilho.scrollBy({ left: direcao * trilho.clientWidth * 0.8, behavior: "smooth" });
  }

  const idTitulo = useId();

  return (
    <section className={estilos.prateleira} aria-labelledby={idTitulo} style={{ "--acento": acento } as CSSProperties}>
      <div className={estilos.cabecalho}>
        <span className={estilos.selo}>
          <Icone nome={icone} tamanho={22} />
        </span>
        <h2 id={idTitulo} className={estilos.titulo}>
          {titulo}
        </h2>
        <span className={estilos.contagem}>
          {itens.length} {itens.length === 1 ? "atividade" : "atividades"}
        </span>
        <div className={estilos.setas}>
          <button
            type="button"
            className={estilos.seta}
            onClick={() => rolar(-1)}
            disabled={limites.inicio}
            aria-label={`Ver atividades anteriores de ${titulo}`}
          >
            <Icone nome="seta-esquerda" tamanho={20} />
          </button>
          <button
            type="button"
            className={estilos.seta}
            onClick={() => rolar(1)}
            disabled={limites.fim}
            aria-label={`Ver mais atividades de ${titulo}`}
          >
            <Icone nome="seta-direita" tamanho={20} />
          </button>
        </div>
      </div>

      <ul ref={trilhoRef} className={estilos.trilho} onScroll={medir}>
        {itens.map((item) => (
          <li key={item.para} className={estilos.item}>
            <Link to={item.para} className={estilos.card}>
              <span className={estilos.capa}>
                {item.capa ? (
                  <img src={item.capa} alt="" loading="lazy" />
                ) : (
                  <Icone nome={icone} tamanho={56} />
                )}
                <span className={estilos.etiqueta}>{item.etiqueta}</span>
              </span>
              <span className={estilos.corpo}>
                <span className={estilos.cardTitulo}>{item.titulo}</span>
                <span className={estilos.descricao}>{item.descricao}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
