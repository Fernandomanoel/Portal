import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { EstadoVazio } from "@/components/EstadoVazio";
import { Icone } from "@/components/Icone";
import { ATIVIDADES } from "@/data/atividades";
import { temConteudo } from "@/data/conteudosProfessor";
import { normalizar } from "@/lib/busca";
import { rotas } from "@/lib/rotas";
import { CATEGORIAS } from "@/types/curso";
import estilos from "./ProfessorConteudosPage.module.css";

export function ProfessorConteudosPage() {
  const [busca, definirBusca] = useState("");

  const grupos = useMemo(() => {
    const termo = normalizar(busca);
    return CATEGORIAS.map((categoria) => ({
      categoria,
      cursos: ATIVIDADES.filter(
        (curso) =>
          curso.categoria === categoria.id &&
          temConteudo(curso.slug) &&
          (!termo || normalizar(curso.titulo).includes(termo) || normalizar(curso.descricao).includes(termo)),
      ),
    })).filter((grupo) => grupo.cursos.length > 0);
  }, [busca]);

  return (
    <>
      <CabecalhoPagina
        titulo="Conteúdos para o professor"
        texto="A teoria de cada curso, na ordem das atividades, para conduzir a aula com segurança mesmo em assuntos que não são da sua área: explicação, o que o aluno precisa saber, exemplos, erros comuns e dicas de como ensinar. Os cursos do pacote Office não estão aqui."
      />

      <label className={estilos.busca}>
        <Icone nome="busca" tamanho={18} />
        <span className="sr-only">Buscar curso</span>
        <input type="search" value={busca} onChange={(e) => definirBusca(e.target.value)} placeholder="Buscar curso ou assunto" />
      </label>

      {grupos.length === 0 ? (
        <EstadoVazio icone="livro" titulo="Nenhum curso encontrado" texto="Tente outra palavra na busca." />
      ) : (
        grupos.map(({ categoria, cursos }) => (
          <section key={categoria.id} className={estilos.grupo} aria-labelledby={`cat-${categoria.id}`}>
            <h2 id={`cat-${categoria.id}`} className={estilos.titulo}>
              {categoria.nome}
            </h2>
            <ul className={estilos.lista}>
              {cursos.map((curso) => (
                <li key={curso.slug}>
                  <Link to={rotas.professorConteudo(curso.slug)} className={estilos.item} style={{ ["--acento" as string]: curso.cor }}>
                    <span className={estilos.sigla} aria-hidden="true">
                      {curso.sigla ?? curso.titulo.slice(0, 2)}
                    </span>
                    <span className={estilos.corpo}>
                      <strong>{curso.titulo}</strong>
                      <small>{curso.descricao}</small>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </>
  );
}
