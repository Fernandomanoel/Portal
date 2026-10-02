import { useMemo, useState } from "react";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { EstadoVazio } from "@/components/EstadoVazio";
import { Icone } from "@/components/Icone";
import { ProvaCard } from "@/components/cards/ProvaCard";
import { ProvasLock } from "@/components/provas/ProvasLock";
import { PROVAS_CATEGORIAS, PROVAS_MANIFEST } from "@/data/provasManifest";
import { normalizar } from "@/lib/busca";
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

  const grupos = useMemo(() => {
    const termo = normalizar(busca);
    return PROVAS_CATEGORIAS.filter((grupo) => !categoria || grupo.nome === categoria)
      .map((grupo) => ({
        nome: grupo.nome,
        cursos: cursos.filter(
          (entrada) =>
            entrada.categoria === grupo.nome && (!termo || normalizar(entrada.curso).includes(termo)),
        ),
      }))
      .filter((grupo) => grupo.cursos.length > 0);
  }, [cursos, busca, categoria]);

  if (!liberada) {
    return <ProvasLock aoEntrar={() => definirLiberada(true)} />;
  }

  return (
    <>
      <CabecalhoPagina
        titulo="Provas"
        texto="Provas dos cursos, por categoria."
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

        <button type="button" className={estilos.sair} onClick={() => definirLiberada(false)}>
          Sair da área de provas
        </button>

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

      {grupos.length > 0 ? (
        <div className={estilos.grupos}>
          {grupos.map((grupo) => {
            const comProva = grupo.cursos.filter((entrada) => entrada.arquivos.length > 0).length;
            return (
              <section key={grupo.nome} className={estilos.grupo} aria-labelledby={`grupo-${grupo.nome}`}>
                <div className={estilos.grupoCabecalho}>
                  <h2 id={`grupo-${grupo.nome}`} className={estilos.grupoTitulo}>
                    {grupo.nome}
                  </h2>
                  <p className={`${estilos.grupoMeta} tabular`}>
                    {comProva} de {grupo.cursos.length} com prova
                  </p>
                </div>
                <div className={estilos.grade}>
                  {grupo.cursos.map((entrada) => (
                    <ProvaCard
                      key={entrada.curso}
                      titulo={entrada.curso}
                      categoria={entrada.categoria}
                      arquivos={entrada.arquivos}
                    />
                  ))}
                </div>
              </section>
            );
          })}
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
