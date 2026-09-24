import { ordemDasOpcoes } from "@/lib/ingles";
import estilos from "./OpcoesResposta.module.css";

interface Props {
  opcoes: string[];
  resposta: number;
  /** Chave estável da pergunta: define a ordem embaralhada das opções. */
  chave: string;
  escolhida: number | null;
  verificado: boolean;
  aoEscolher: (indice: number) => void;
  /** Opções em fichas lado a lado (completar a frase), em vez de linhas. */
  fichas?: boolean;
  /** Idioma das opções, para o leitor de tela pronunciar certo. */
  idioma?: "pt-BR" | "en";
}

export function OpcoesResposta({ opcoes, resposta, chave, escolhida, verificado, aoEscolher, fichas = false, idioma }: Props) {
  const ordem = ordemDasOpcoes(chave, opcoes.length);

  return (
    <div className={fichas ? `${estilos.opcoes} ${estilos.fichas}` : estilos.opcoes} role="radiogroup" lang={idioma}>
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
            className={classes.join(" ")}
            disabled={verificado}
            onClick={() => aoEscolher(indice)}
          >
            {!fichas && <span className={estilos.tecla}>{posicao + 1}</span>}
            <span>{opcoes[indice]}</span>
          </button>
        );
      })}
    </div>
  );
}
