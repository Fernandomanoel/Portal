import { ordemDasOpcoes } from "@/lib/ingles";
import estilos from "./MontarFrase.module.css";

interface Props {
  /** Todas as fichas (palavras da frase + as que sobram), na ordem do dado. */
  fichas: string[];
  chave: string;
  /** Índices das fichas já colocadas na frase, na ordem em que o aluno tocou. */
  montada: number[];
  aoMudar: (montada: number[]) => void;
  verificado: boolean;
  acertou: boolean;
}

/** Monta a frase tocando nas palavras; tocar numa palavra já usada devolve ela ao banco. */
export function MontarFrase({ fichas, chave, montada, aoMudar, verificado, acertou }: Props) {
  const ordem = ordemDasOpcoes(chave, fichas.length);
  const usadas = new Set(montada);
  const classeLinha = [estilos.linha, verificado ? (acertou ? estilos.certa : estilos.errada) : ""].join(" ");

  return (
    <div className={estilos.montar}>
      <div className={classeLinha} aria-label="Sua frase" lang="en">
        {montada.length === 0 && <span className={estilos.vazia}>Toque nas palavras abaixo, na ordem.</span>}
        {montada.map((indice) => (
          <button
            key={indice}
            type="button"
            className={estilos.ficha}
            disabled={verificado}
            onClick={() => aoMudar(montada.filter((i) => i !== indice))}
            aria-label={`Tirar "${fichas[indice]}" da frase`}
          >
            {fichas[indice]}
          </button>
        ))}
      </div>

      <div className={estilos.banco} aria-label="Palavras" lang="en">
        {ordem.map((indice) => (
          <button
            key={indice}
            type="button"
            className={usadas.has(indice) ? `${estilos.ficha} ${estilos.usada}` : estilos.ficha}
            disabled={verificado || usadas.has(indice)}
            onClick={() => aoMudar([...montada, indice])}
          >
            {fichas[indice]}
          </button>
        ))}
      </div>
    </div>
  );
}
