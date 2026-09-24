import { ordemDasOpcoes } from "@/lib/ingles";
import { FiguraIngles } from "./FiguraIngles";
import type { NomeFigura } from "./figuras";
import estilos from "./OpcoesFiguras.module.css";

interface Props {
  figuras: NomeFigura[];
  resposta: number;
  chave: string;
  escolhida: number | null;
  verificado: boolean;
  aoEscolher: (indice: number) => void;
}

/** Desenhos como opções de resposta: "ouça e toque no desenho certo". */
export function OpcoesFiguras({ figuras, resposta, chave, escolhida, verificado, aoEscolher }: Props) {
  const ordem = ordemDasOpcoes(chave, figuras.length);

  return (
    <div className={estilos.grade} role="radiogroup" aria-label="Desenhos">
      {ordem.map((indice, posicao) => {
        const classes = [estilos.opcao];
        if (escolhida === indice) classes.push(estilos.escolhida);
        if (verificado && indice === resposta) classes.push(estilos.certa);
        else if (verificado && indice === escolhida) classes.push(estilos.errada);
        return (
          <button
            key={indice}
            type="button"
            role="radio"
            aria-checked={escolhida === indice}
            aria-label={`Desenho ${posicao + 1}`}
            className={classes.join(" ")}
            disabled={verificado}
            onClick={() => aoEscolher(indice)}
          >
            <span className={estilos.tecla}>{posicao + 1}</span>
            <FiguraIngles nome={figuras[indice]} descricao={`Desenho ${posicao + 1}`} className={estilos.figura} />
          </button>
        );
      })}
    </div>
  );
}
