import type { CSSProperties } from "react";

import type { AtividadeFaga } from "@/types/faga";
import estilos from "./FagaTrilha.module.css";

interface Props {
  atividades: AtividadeFaga[];
  /** Com isto cada bolinha vira botão: clicar marca ou desmarca a atividade. Sem isto, só desenha (impressão). */
  aoAlternar?: (id: string) => void;
}

/**
 * Trilha de uma aula: uma bolinha por atividade, ligadas por uma linha que escurece até o fim,
 * com o nome inclinado acima. As cores vêm de `--f-claro`, `--f-escuro` e `--f-fundo`, definidas por quem usa
 * (a tela usa os tokens do portal; a impressão usa cores fixas de papel).
 */
export function FagaTrilha({ atividades, aoAlternar }: Props) {
  if (atividades.length === 0) return <p className={estilos.vazia}>Sem atividades nesta aula.</p>;
  return (
    <ol className={estilos.trilha}>
      {atividades.map((a, i) => {
        const passo = { "--t": `${atividades.length > 1 ? Math.round((i / (atividades.length - 1)) * 100) : 100}%` } as CSSProperties;
        const classe = a.feita ? `${estilos.passo} ${estilos.feito}` : estilos.passo;
        return (
          <li key={a.id} className={classe} style={passo}>
            <span className={estilos.rotulo}>{a.rotulo}</span>
            {aoAlternar ? (
              <button type="button" className={estilos.bolinha} aria-pressed={a.feita} aria-label={a.rotulo} onClick={() => aoAlternar(a.id)} />
            ) : (
              <span className={estilos.bolinha} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
