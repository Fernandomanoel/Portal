import { useId, useState } from "react";

import { Icone } from "@/components/Icone";
import { ListaProvas } from "@/components/provas/ListaProvas";
import type { ArquivoProva } from "@/types/prova";
import estilos from "./ProvaCard.module.css";

interface Props {
  titulo: string;
  categoria: string;
  arquivos: ArquivoProva[];
}

export function ProvaCard({ titulo, categoria, arquivos }: Props) {
  const [aberto, definirAberto] = useState(false);
  const idLista = useId();

  if (arquivos.length === 0) {
    return (
      <article className={`${estilos.card} ${estilos.cardVazio}`}>
        <h3 className={estilos.tituloVazio}>{titulo}</h3>
        <p className={estilos.emBreve}>Em breve</p>
      </article>
    );
  }

  const contagem = arquivos.length === 1 ? "1 prova" : `${arquivos.length} provas`;

  return (
    <article className={aberto ? `${estilos.card} ${estilos.cardAberto}` : estilos.card}>
      <h3 className={estilos.cabecalho}>
        <button
          type="button"
          className={estilos.alternar}
          aria-expanded={aberto}
          aria-controls={idLista}
          onClick={() => definirAberto((valor) => !valor)}
        >
          <span className={estilos.selo}>
            <Icone nome="prova" tamanho={18} />
          </span>
          <span className={estilos.alternarTexto}>
            <span className={estilos.titulo}>{titulo}</span>
            <span className={`${estilos.contagem} tabular`}>{contagem}</span>
          </span>
          <span className={aberto ? `${estilos.seta} ${estilos.setaAberta}` : estilos.seta}>
            <Icone nome="seta-baixo" tamanho={18} />
          </span>
        </button>
      </h3>

      <div id={idLista} className={aberto ? `${estilos.corpo} ${estilos.corpoAberto}` : estilos.corpo}>
        <div className={estilos.corpoInterno} inert={!aberto}>
          <div className={estilos.lista}>
            <ListaProvas arquivos={arquivos} categoria={categoria} plana />
          </div>
        </div>
      </div>
    </article>
  );
}
