import type { ProvaDescritiva } from "@/types/quiz";
import estilos from "./Quiz.module.css";

interface Props {
  prova: ProvaDescritiva;
  textos: string[];
  aoEscrever: (pergunta: number, texto: string) => void;
}

export function QuizDescritiva({ prova, textos, aoEscrever }: Props) {
  return (
    <>
      {prova.perguntas.map((enunciado, indice) => (
        <section key={indice} className={estilos.pergunta}>
          <label className={estilos.enunciado} htmlFor={`resposta-${indice}`}>
            <span className={estilos.numero}>{indice + 1}.</span>
            <span>{enunciado}</span>
          </label>
          <textarea
            id={`resposta-${indice}`}
            className={estilos.resposta}
            value={textos[indice] ?? ""}
            onChange={(evento) => aoEscrever(indice, evento.target.value)}
          />
        </section>
      ))}
    </>
  );
}
