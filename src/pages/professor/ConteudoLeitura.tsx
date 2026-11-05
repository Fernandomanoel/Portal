import { Link } from "react-router-dom";

import { Icone } from "@/components/Icone";
import type { Curso } from "@/types/curso";
import { formatar } from "@/lib/formatacao";
import { rotas } from "@/lib/rotas";
import type { ConteudoCurso } from "@/types/conteudoProfessor";
import estilos from "./ProfessorConteudoPage.module.css";

const idDoTopico = (indice: number) => `topico-${indice + 1}`;

export function ConteudoLeitura({ curso, conteudo }: { curso: Curso; conteudo: ConteudoCurso }) {
  const atividadePorFim = (fim: string) => curso.atividades?.find((a) => a.caminho.split("/").pop() === fim);

  return (
      <div className={estilos.layout}>
        <nav className={estilos.indice} aria-label="Neste conteúdo">
          <strong>Neste conteúdo</strong>
          <ol>
            {conteudo.topicos.map((topico, i) => (
              <li key={i}>
                <a href={`#${idDoTopico(i)}`}>{topico.titulo}</a>
              </li>
            ))}
            <li>
              <a href="#glossario">Glossário</a>
            </li>
            <li>
              <a href="#como-conduzir">Como conduzir a aula</a>
            </li>
          </ol>
        </nav>

        <div className={estilos.conteudo}>
          {conteudo.topicos.map((topico, i) => (
            <section key={i} id={idDoTopico(i)} className={estilos.topico} aria-labelledby={`${idDoTopico(i)}-titulo`}>
              <h2 id={`${idDoTopico(i)}-titulo`}>
                <span className={estilos.numero}>{i + 1}</span>
                {topico.titulo}
              </h2>
              {topico.texto.map((paragrafo, j) => (
                <p key={`${i}-${j}`}>{formatar(paragrafo)}</p>
              ))}
              {topico.exemplo && (
                <aside className={estilos.exemplo}>
                  <strong>Exemplo</strong>
                  <p>{formatar(topico.exemplo)}</p>
                </aside>
              )}
              {topico.pontos && (
                <div className={estilos.caixa}>
                  <strong>O aluno precisa sair sabendo</strong>
                  <ul>
                    {topico.pontos.map((ponto, j) => (
                      <li key={j}>{formatar(ponto)}</li>
                    ))}
                  </ul>
                </div>
              )}
              {topico.erros && (
                <div className={`${estilos.caixa} ${estilos.erros}`}>
                  <strong>Erros e confusões comuns</strong>
                  <ul>
                    {topico.erros.map((erro, j) => (
                      <li key={j}>{formatar(erro)}</li>
                    ))}
                  </ul>
                </div>
              )}
              {topico.atividades && (
                <p className={estilos.usadoEm}>
                  <Icone nome="prova" tamanho={16} />
                  <span>Aparece em:</span>
                  {topico.atividades.map((fim) => {
                    const atividade = atividadePorFim(fim);
                    return atividade ? (
                      <Link key={fim} to={rotas.atividadeAutocorrigida(curso.slug, atividade.caminho)}>
                        {atividade.titulo.replace(/^Atividade (Prática|Auto-Corretiva)( de)?:?\s*/i, "")}
                      </Link>
                    ) : null;
                  })}
                </p>
              )}
            </section>
          ))}

          <section id="glossario" className={estilos.topico} aria-labelledby="glossario-titulo">
            <h2 id="glossario-titulo">Glossário</h2>
            <dl className={estilos.glossario}>
              {conteudo.glossario.map((item) => (
                <div key={item.termo}>
                  <dt>{item.termo}</dt>
                  <dd>{formatar(item.definicao)}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="como-conduzir" className={estilos.topico} aria-labelledby="conduzir-titulo">
            <h2 id="conduzir-titulo">Como conduzir a aula</h2>
            <ul className={estilos.dicas}>
              {conteudo.dicas.map((dica, j) => (
                <li key={j}>{formatar(dica)}</li>
              ))}
            </ul>
            <p className={estilos.usadoEm}>
              <Icone nome="livro" tamanho={16} />
              <Link to={rotas.curso(curso.slug)}>Ver as atividades do curso</Link>
            </p>
          </section>
        </div>
      </div>
  );
}
