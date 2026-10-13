import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { Icone, type NomeIcone } from "@/components/Icone";
import { rotas } from "@/lib/rotas";
import estilos from "./TopoJogo.module.css";

export interface Medida {
  rotulo: string;
  valor: ReactNode;
}

/** Voltar, título e o placar ao vivo do jogo, no topo da tela cheia. */
export function TopoJogo({ titulo, icone, medidas }: { titulo: string; icone: NomeIcone; medidas: Medida[] }) {
  return (
    <header className={estilos.topo}>
      <Link to={rotas.digitacao()} className={estilos.voltar}>
        <Icone nome="seta-esquerda" tamanho={18} />
        Voltar
      </Link>
      <h1 className={estilos.titulo}>
        <Icone nome={icone} tamanho={22} />
        {titulo}
      </h1>
      <dl className={estilos.medidas}>
        {medidas.map((medida) => (
          <div key={medida.rotulo}>
            <dt>{medida.rotulo}</dt>
            <dd>{medida.valor}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
