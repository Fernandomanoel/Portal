import { Icone, type NomeIcone } from "@/components/Icone";
import { PainelRanking } from "@/components/digitacao/PainelRanking";
import type { Medida } from "./TopoJogo";
import estilos from "./QuadroJogo.module.css";

export interface Botao {
  rotulo: string;
  icone?: NomeIcone;
  acao: () => void;
  principal?: boolean;
}

interface Props {
  icone: NomeIcone;
  titulo: string;
  texto?: string;
  medidas?: Medida[];
  estrelas?: number;
  /** Presente no fim de jogo: pede o apelido para o ranking. */
  ranking?: { jogoId: string; ppm: number; precisao: number };
  botoes: Botao[];
  atalho?: string;
}

/** Quadro sobre a cena: começo de nível, nível concluído e fim de jogo. */
export function QuadroJogo({ icone, titulo, texto, medidas, estrelas, ranking, botoes, atalho }: Props) {
  return (
    <section className={estilos.fundo} aria-live="polite" onClick={(evento) => evento.stopPropagation()}>
      <div className={estilos.caixa}>
        <span className={estilos.selo}>
          <Icone nome={icone} tamanho={30} />
        </span>
        <h2>{titulo}</h2>
        {texto && <p className={estilos.texto}>{texto}</p>}

        {estrelas !== undefined && (
          <p className={estilos.estrelas} aria-label={`${estrelas} de 3 estrelas`}>
            {[1, 2, 3].map((n) => (
              <Icone key={n} nome="estrela" tamanho={34} className={n <= estrelas ? estilos.cheia : estilos.vazia} />
            ))}
          </p>
        )}

        {medidas && (
          <dl className={estilos.medidas}>
            {medidas.map((medida) => (
              <div key={medida.rotulo}>
                <dt>{medida.rotulo}</dt>
                <dd>{medida.valor}</dd>
              </div>
            ))}
          </dl>
        )}

        {ranking && (
          <PainelRanking jogoId={ranking.jogoId} resultadoPendente={{ ppm: ranking.ppm, precisao: ranking.precisao }} somenteFormulario />
        )}

        <div className={estilos.botoes}>
          {botoes.map((botao) => (
            <button
              key={botao.rotulo}
              type="button"
              className={botao.principal ? estilos.principal : estilos.secundario}
              onClick={botao.acao}
            >
              {botao.icone && <Icone nome={botao.icone} tamanho={18} />}
              {botao.rotulo}
            </button>
          ))}
        </div>
        {atalho && <p className={estilos.atalho}>{atalho}</p>}
      </div>
    </section>
  );
}
