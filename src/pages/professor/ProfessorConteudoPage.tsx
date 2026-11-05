import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { EstadoVazio } from "@/components/EstadoVazio";
import { Icone } from "@/components/Icone";
import { ATIVIDADES } from "@/data/atividades";
import { carregarConteudo } from "@/data/conteudosProfessor";
import { rotas } from "@/lib/rotas";
import type { ConteudoCurso } from "@/types/conteudoProfessor";
import estilos from "./ProfessorConteudoPage.module.css";

const idDoTopico = (indice: number) => `topico-${indice + 1}`;

export function ProfessorConteudoPage() {
  const { curso: slug = "" } = useParams();
  const curso = ATIVIDADES.find((c) => c.slug === slug);
  const [carregado, definirCarregado] = useState<{ slug: string; conteudo: ConteudoCurso | null } | null>(null);

  useEffect(() => {
    let ativo = true;
    void carregarConteudo(slug).then((conteudo) => ativo && definirCarregado({ slug, conteudo }));
    return () => {
      ativo = false;
    };
  }, [slug]);

  if (!curso) {
    return <EstadoVazio icone="livro" titulo="Curso não encontrado" texto="Volte à lista de conteúdos e escolha um curso." />;
  }
  if (!carregado || carregado.slug !== slug) return <p aria-live="polite">Carregando o conteúdo…</p>;
  const conteudo = carregado.conteudo;
  if (!conteudo) {
    return <EstadoVazio icone="livro" titulo="Conteúdo em preparação" texto="A teoria deste curso ainda não foi escrita." />;
  }

  const atividadePorFim = (fim: string) => curso.atividades?.find((a) => a.caminho.split("/").pop() === fim);

  return (
    <>
      <CabecalhoPagina titulo={curso.titulo} texto={conteudo.resumo} voltarPara={rotas.professorConteudos()} />

      <div className={estilos.layout}>
        <nav className={estilos.indice} aria-label="Neste conteúdo">
          <strong>Neste conteúdo</strong>
          <ol>
            {conteudo.topicos.map((topico, i) => (
              <li key={topico.titulo}>
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
            <section key={topico.titulo} id={idDoTopico(i)} className={estilos.topico} aria-labelledby={`${idDoTopico(i)}-titulo`}>
              <h2 id={`${idDoTopico(i)}-titulo`}>
                <span className={estilos.numero}>{i + 1}</span>
                {topico.titulo}
              </h2>
              {topico.texto.map((paragrafo) => (
                <p key={paragrafo}>{paragrafo}</p>
              ))}
              {topico.exemplo && (
                <aside className={estilos.exemplo}>
                  <strong>Exemplo</strong>
                  <p>{topico.exemplo}</p>
                </aside>
              )}
              {topico.pontos && (
                <div className={estilos.caixa}>
                  <strong>O aluno precisa sair sabendo</strong>
                  <ul>
                    {topico.pontos.map((ponto) => (
                      <li key={ponto}>{ponto}</li>
                    ))}
                  </ul>
                </div>
              )}
              {topico.erros && (
                <div className={`${estilos.caixa} ${estilos.erros}`}>
                  <strong>Erros e confusões comuns</strong>
                  <ul>
                    {topico.erros.map((erro) => (
                      <li key={erro}>{erro}</li>
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
                  <dd>{item.definicao}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="como-conduzir" className={estilos.topico} aria-labelledby="conduzir-titulo">
            <h2 id="conduzir-titulo">Como conduzir a aula</h2>
            <ul className={estilos.dicas}>
              {conteudo.dicas.map((dica) => (
                <li key={dica}>{dica}</li>
              ))}
            </ul>
            <p className={estilos.usadoEm}>
              <Icone nome="livro" tamanho={16} />
              <Link to={rotas.curso(curso.slug)}>Ver as atividades do curso</Link>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
