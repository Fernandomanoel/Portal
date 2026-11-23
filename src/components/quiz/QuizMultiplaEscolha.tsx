import { ControlesAudio } from "@/components/ingles/ControlesAudio";
import type { ProvaMultiplaEscolhaAluno } from "@/types/quiz";
import estilos from "./Quiz.module.css";

interface Props {
  prova: ProvaMultiplaEscolhaAluno;
  escolhas: Record<number, number>;
  aoResponder: (pergunta: number, opcao: number) => void;
}

export function QuizMultiplaEscolha({ prova, escolhas, aoResponder }: Props) {
  return (
    <>
      {prova.perguntas.map((pergunta, indice) => (
        <fieldset key={indice} className={estilos.pergunta}>
          <legend className={estilos.enunciado}>
            <span className={estilos.numero}>{indice + 1}.</span>
            <span>{pergunta.pergunta}</span>
          </legend>
          {pergunta.audio && (
            <div className={estilos.audio}>
              <ControlesAudio texto={pergunta.audio.texto} />
            </div>
          )}

          <div className={estilos.opcoes}>
            {pergunta.opcoes.map((opcao, opcaoIndice) => {
              const marcada = escolhas[indice] === opcaoIndice;
              return (
                <label key={opcaoIndice} className={marcada ? `${estilos.opcao} ${estilos.opcaoMarcada}` : estilos.opcao}>
                  <input type="radio" name={`pergunta-${indice}`} checked={marcada} onChange={() => aoResponder(indice, opcaoIndice)} />
                  <span>{opcao}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}
    </>
  );
}
