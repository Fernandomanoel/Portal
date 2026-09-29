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
      <article className={estilos.card}>
        <p className={estilos.categoria}>{categoria}</p>
        <h3 className={estilos.titulo}>{titulo}</h3>
        <ListaProvas arquivos={arquivos} categoria={categoria} />
      </article>
    );
  }

  return (
    <article className={estilos.card}>
      <button
        type="button"
        className={estilos.alternar}
        aria-expanded={aberto}
        aria-controls={idLista}
        onClick={() => definirAberto((valor) => !valor)}
      >
        <span className={estilos.alternarTexto}>
          <span className={estilos.categoria}>{categoria}</span>
          <span className={estilos.titulo}>{titulo}</span>
          <span className={`${estilos.contagem} tabular`}>{arquivos.length === 1 ? "1 prova" : `${arquivos.length} provas`}</span>
        </span>
        <span className={aberto ? `${estilos.seta} ${estilos.setaAberta}` : estilos.seta}>
          <Icone nome="seta-baixo" tamanho={18} />
        </span>
      </button>

      {aberto && (
        <div id={idLista}>
          <ListaProvas arquivos={arquivos} categoria={categoria} />
        </div>
      )}
    </article>
  );
}
