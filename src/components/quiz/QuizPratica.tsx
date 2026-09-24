import { Icone } from "@/components/Icone";
import type { ProvaPratica } from "@/types/quiz";
import estilos from "./Quiz.module.css";

export function QuizPratica({ prova }: { prova: ProvaPratica }) {
  return (
    <section className={estilos.pergunta}>
      <h2 className={estilos.enunciado}>O que fazer</h2>
      <ol className={estilos.instrucoes}>
        {prova.instrucoes.map((instrucao, indice) => {
          // Cada "Tarefa N" começa um bloco novo: divisória e destaque, para
          // não virar uma parede só de texto numa prova prática longa.
          const tarefa = /^Tarefa \d/.test(instrucao);
          return (
            <li key={indice} className={tarefa ? `${estilos.instrucaoItem} ${estilos.instrucaoTarefa}` : estilos.instrucaoItem}>
              <span className={tarefa ? `${estilos.instrucaoNumero} ${estilos.instrucaoNumeroTarefa}` : estilos.instrucaoNumero}>
                {indice + 1}
              </span>
              <span>{instrucao}</span>
            </li>
          );
        })}
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
