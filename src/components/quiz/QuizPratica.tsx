import { Icone } from "@/components/Icone";
import type { ProvaPratica } from "@/types/quiz";
import estilos from "./Quiz.module.css";

export function QuizPratica({ prova }: { prova: ProvaPratica }) {
  return (
    <section className={estilos.pergunta}>
      <h2 className={estilos.enunciado}>O que fazer</h2>
      <ol className={estilos.instrucoes}>
        {prova.instrucoes.map((instrucao, indice) => (
          <li key={indice}>{instrucao}</li>
        ))}
      </ol>
      {prova.material && (
        <a href={prova.material.url} target="_blank" rel="noreferrer" className={estilos.material}>
          <Icone nome="pdf" tamanho={18} />
          {prova.material.rotulo}
        </a>
      )}
    </section>
  );
}
