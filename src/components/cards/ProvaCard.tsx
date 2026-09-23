import { ListaProvas } from "@/components/provas/ListaProvas";
import type { ArquivoProva } from "@/types/prova";
import estilos from "./ProvaCard.module.css";

interface Props {
  titulo: string;
  categoria: string;
  arquivos: ArquivoProva[];
}

export function ProvaCard({ titulo, categoria, arquivos }: Props) {
  return (
    <article className={estilos.card}>
      <p className={estilos.categoria}>{categoria}</p>
      <h3 className={estilos.titulo}>{titulo}</h3>
      <ListaProvas arquivos={arquivos} categoria={categoria} />
    </article>
  );
}
