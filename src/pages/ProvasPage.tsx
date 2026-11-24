import { useMemo, useState } from "react";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { EstadoVazio } from "@/components/EstadoVazio";
import { Icone } from "@/components/Icone";
import { ProvaCard } from "@/components/cards/ProvaCard";
import { ListaProvas } from "@/components/provas/ListaProvas";
import { ProvasLock } from "@/components/provas/ProvasLock";
import { PROVAS_INGLES } from "@/data/ingles";
import { entrarNasProvasIngles } from "@/lib/apiProvas";
import { PROVAS_CATEGORIAS, PROVAS_MANIFEST } from "@/data/provasManifest";
import { normalizar } from "@/lib/busca";
import { guardarFicha, limparFicha } from "@/lib/unidade";
import type { FichaUnidade } from "@/types/unidade";
import estilos from "./ProvasPage.module.css";

function ProvasInformatica({ ficha, aoSair }: { ficha: FichaUnidade; aoSair: () => void }) {
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

  return (
    <>
      <CabecalhoPagina
        titulo="Provas"
        texto={`Provas dos cursos, por categoria. Respostas enviadas para: ${ficha.unidade.nome}.`}
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

        <button type="button" className={estilos.sair} onClick={aoSair}>
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

type AreaProvas = "informatica" | "ingles";

const ABAS: { id: AreaProvas; rotulo: string }[] = [
  { id: "informatica", rotulo: "Informática" },
  { id: "ingles", rotulo: "Inglês" },
];

/** Provas divididas em Informática e Inglês. A senha de Inglês é outra: a ficha que ela devolve só abre provas de Inglês. */
export function ProvasPage() {
  const [area, definirArea] = useState<AreaProvas>("informatica");
  // Estado só em memória: recarregar a página pede a senha de novo, como antes.
  const [ficha, definirFicha] = useState<FichaUnidade | null>(null);
  const liberada = ficha !== null && (ficha.area ?? "informatica") === area;
  const sair = () => {
    limparFicha();
    definirFicha(null);
  };

  return (
    <>
      <div className={estilos.abasArea} role="tablist" aria-label="Área das provas">
        {ABAS.map((aba) => (
          <button
            key={aba.id}
            type="button"
            role="tab"
            aria-selected={area === aba.id}
            className={area === aba.id ? `${estilos.abaArea} ${estilos.abaAreaAtiva}` : estilos.abaArea}
            onClick={() => definirArea(aba.id)}
          >
            {aba.rotulo}
          </button>
        ))}
      </div>

      {!liberada ? (
        <ProvasLock
          key={area}
          titulo={area === "ingles" ? "Provas de Inglês" : "Área de provas"}
          texto={
            area === "ingles"
              ? "Escolha a unidade e digite a senha das provas de Inglês. A prova do aluno vai para a unidade escolhida."
              : undefined
          }
          conferir={area === "ingles" ? entrarNasProvasIngles : undefined}
          aoEntrar={(nova) => {
            guardarFicha(nova);
            definirFicha(nova);
          }}
        />
      ) : area === "informatica" ? (
        <ProvasInformatica ficha={ficha} aoSair={sair} />
      ) : (
        <>
          <CabecalhoPagina titulo="Provas de Inglês" texto={`Respostas enviadas para: ${ficha.unidade.nome}.`} />
          <button type="button" className={estilos.sair} onClick={sair}>
            Sair da área de provas
          </button>
          {PROVAS_INGLES.length === 0 ? (
            <EstadoVazio icone="prova" titulo="Nenhuma prova de Inglês ainda" texto="As provas de Inglês aparecem aqui assim que forem adicionadas." origem="src/data/ingles.ts" />
          ) : (
            <ListaProvas arquivos={PROVAS_INGLES} categoria="ingles" />
          )}
        </>
      )}
    </>
  );
}
