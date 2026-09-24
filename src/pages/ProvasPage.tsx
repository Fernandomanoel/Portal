import { useMemo, useState } from "react";

import { Link } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { EstadoVazio } from "@/components/EstadoVazio";
import { Icone } from "@/components/Icone";
import { ProvaCard } from "@/components/cards/ProvaCard";
import { ProvasLock } from "@/components/provas/ProvasLock";
import { PROVAS_CATEGORIAS, PROVAS_MANIFEST } from "@/data/provasManifest";
import { normalizar } from "@/lib/busca";
import { rotas } from "@/lib/rotas";
import estilos from "./ProvasPage.module.css";

export function ProvasPage() {
  // Estado só em memória: recarregar a página pede a senha de novo, como antes.
  const [liberada, definirLiberada] = useState(false);
  const [busca, definirBusca] = useState("");
  const [categoria, definirCategoria] = useState<string | null>(null);

  const cursos = useMemo(
    () =>
      PROVAS_CATEGORIAS.flatMap((grupo) =>
        grupo.cursos.map((curso) => ({
          curso,
          categoria: grupo.nome,
          arquivos: PROVAS_MANIFEST[curso] ?? [],
        })),
      ),
    [],
  );

  const filtrados = useMemo(() => {
    const termo = normalizar(busca);
    return cursos.filter((entrada) => {
      if (categoria && entrada.categoria !== categoria) return false;
      if (!termo) return true;
      return normalizar(entrada.curso).includes(termo);
    });
  }, [cursos, busca, categoria]);

  if (!liberada) {
    return <ProvasLock aoEntrar={() => definirLiberada(true)} />;
  }

  return (
    <>
      <CabecalhoPagina
        titulo="Provas"
        texto="Provas dos cursos, por categoria."
        acoes={
          <div className={estilos.acoesTopo}>
            <Link to={rotas.professor()} className={estilos.professor}>
              <Icone nome="prova" tamanho={16} />
              Provas enviadas pelos alunos
            </Link>
            <button
              type="button"
              className={estilos.sair}
              onClick={() => definirLiberada(false)}
            >
              Sair da área de provas
            </button>
          </div>
        }
      />

      <div className={estilos.ferramentas}>
        <form className={estilos.busca} role="search" onSubmit={(evento) => evento.preventDefault()}>
          <Icone nome="busca" tamanho={17} />
          <input
            type="search"
            value={busca}
            onChange={(evento) => definirBusca(evento.target.value)}
            placeholder="Buscar curso"
            aria-label="Buscar curso nas provas"
          />
        </form>

        <div className={estilos.filtros} role="group" aria-label="Filtrar por categoria">
          <button
            type="button"
            onClick={() => definirCategoria(null)}
            className={categoria === null ? `${estilos.filtro} ${estilos.filtroAtivo}` : estilos.filtro}
            aria-pressed={categoria === null}
          >
            Todas
          </button>
          {PROVAS_CATEGORIAS.map((grupo) => (
            <button
              key={grupo.nome}
              type="button"
              onClick={() => definirCategoria(grupo.nome)}
              className={categoria === grupo.nome ? `${estilos.filtro} ${estilos.filtroAtivo}` : estilos.filtro}
              aria-pressed={categoria === grupo.nome}
            >
              {grupo.nome}
            </button>
          ))}
        </div>
      </div>

      {filtrados.length > 0 ? (
        <div className={estilos.grade}>
          {filtrados.map((entrada) => (
            <ProvaCard
              key={`${entrada.categoria}-${entrada.curso}`}
              titulo={entrada.curso}
              categoria={entrada.categoria}
              arquivos={entrada.arquivos}
            />
          ))}
        </div>
      ) : (
        <EstadoVazio
          icone="busca"
          titulo="Nenhum curso com esse nome"
          texto={`Nada encontrado para "${busca}". Tente outro termo ou veja todas as categorias.`}
        />
      )}
    </>
  );
}
