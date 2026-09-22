import { Link } from "react-router-dom";

import { Icone } from "./Icone";
import type { AtividadeResumo } from "@/types/curso";
import { rotas } from "@/lib/rotas";
import estilos from "./ListaAtividadesAutocorrigidas.module.css";

export function ListaAtividadesAutocorrigidas({
  curso,
  atividades,
}: {
  curso: string;
  atividades: AtividadeResumo[];
}) {
  return (
    <ul className={estilos.lista}>
      {atividades.map((atividade) => (
        <li key={atividade.caminho} className={estilos.item}>
          <span className={estilos.selo}>
            <Icone nome="prova" />
          </span>

          <div className={estilos.texto}>
            <h3 className={estilos.titulo}>
              <Link to={rotas.atividadeAutocorrigida(curso, atividade.caminho)}>
                {atividade.titulo}
              </Link>
            </h3>
            <p className={estilos.descricao}>{atividade.descricao}</p>
          </div>

          <span className={estilos.tipo}>Autocorrigida</span>
        </li>
      ))}
    </ul>
  );
}
