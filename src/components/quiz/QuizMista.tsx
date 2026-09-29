import type { ProvaMistaAluno } from "@/types/quiz";
import estilos from "./Quiz.module.css";

interface Props {
  prova: ProvaMistaAluno;
  escolhas: Record<number, number>;
  textos: string[];
  aoResponder: (pergunta: number, opcao: number) => void;
  aoEscrever: (pergunta: number, texto: string) => void;
}

export function QuizMista({ prova, escolhas, textos, aoResponder, aoEscrever }: Props) {
  return (
    <>
      {prova.perguntas.map((pergunta, indice) =>
        pergunta.tipo === "dissertativa" ? (
          <section key={indice} className={estilos.pergunta}>
            <label className={estilos.enunciado} htmlFor={`resposta-${indice}`}>
              <span className={estilos.numero}>{indice + 1}.</span>
              <span>{pergunta.pergunta}</span>
            </label>
            <textarea
              id={`resposta-${indice}`}
              className={estilos.resposta}
              value={textos[indice] ?? ""}
              onChange={(evento) => aoEscrever(indice, evento.target.value)}
            />
          </section>
        ) : (
          <fieldset key={indice} className={estilos.pergunta}>
            <legend className={estilos.enunciado}>
              <span className={estilos.numero}>{indice + 1}.</span>
              <span>{pergunta.pergunta}</span>
            </legend>
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
        ),
      )}
    </>
  );
}
