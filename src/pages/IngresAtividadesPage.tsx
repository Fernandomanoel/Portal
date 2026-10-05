import { useMemo, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";

import { EstadoVazio } from "@/components/EstadoVazio";
import { Icone, type NomeIcone } from "@/components/Icone";
import { Gabi } from "@/components/ingles/Gabi";
import { ATALHOS_INGLES, ATIVIDADES_INGLES, TRILHAS_INGLES, resumoDaAtividade, type Trilha } from "@/data/ingles";
import { normalizar } from "@/lib/busca";
import { rotas } from "@/lib/rotas";
import type { AtividadeIngles, NivelIngles } from "@/types/ingles";
import estilos from "./IngresAtividadesPage.module.css";

interface Item {
  para: string;
  titulo: string;
  descricao: string;
  icone: NomeIcone;
  meta: string;
  nivel?: NivelIngles;
  /** Tudo que a busca olha, já normalizado. */
  busca: string;
}

function iconeDaAtividade(atividade: AtividadeIngles): NomeIcone {
  const { conteudo } = atividade;
  if (conteudo.tipo === "dialogos") return "conversa";
  if (conteudo.tipo === "textos") return conteudo.textos[0]?.tipo === "apresentacao" ? "pessoas" : "megafone";
  if (conteudo.tipo === "conversas") {
    const canal = conteudo.conversas[0]?.canal;
    return canal === "email" ? "email" : canal === "presencial" ? "pessoas" : "celular";
  }
  if (conteudo.tipo === "redacao") return "lapis";
  if (conteudo.vocabulario) return "imagem";
  return conteudo.exercicios.every((e) => e.tipo === "ordenar") ? "blocos" : "som";
}

/** A busca também acha pelas abreviações ensinadas ("brb", "ASAP"). */
function textoDeBusca(atividade: AtividadeIngles, trilha: string): string {
  const extras = atividade.conteudo.tipo === "conversas" ? atividade.conteudo.conversas.flatMap((c) => c.expressoes.map((e) => e.termo)) : [];
  return normalizar([atividade.titulo, atividade.descricao, trilha, ...extras].join(" "));
}

function itensDaTrilha(trilha: Trilha): Item[] {
  if (trilha.id === "jogos") {
    return ATALHOS_INGLES.map((atalho) => ({
      para: atalho.para,
      titulo: atalho.titulo,
      descricao: atalho.descricao,
      icone: "musica",
      meta: "Jogo de digitação",
      busca: normalizar(`${atalho.titulo} ${atalho.descricao} ${trilha.titulo}`),
    }));
  }
  return ATIVIDADES_INGLES.filter((a) => a.trilha === trilha.id).map((atividade) => ({
    para: rotas.inglesAtividade(atividade.slug),
    titulo: atividade.titulo,
    descricao: atividade.descricao,
    icone: iconeDaAtividade(atividade),
    meta: resumoDaAtividade(atividade),
    nivel: atividade.nivel,
    busca: textoDeBusca(atividade, trilha.titulo),
  }));
}

const NIVEIS: (NivelIngles | null)[] = [null, "Básico", "Intermediário", "Avançado"];

export function IngresAtividadesPage() {
  const [busca, definirBusca] = useState("");
  const [nivel, definirNivel] = useState<NivelIngles | null>(null);

  const trilhas = useMemo(() => {
    const termo = normalizar(busca);
    return TRILHAS_INGLES.map((trilha) => ({
      trilha,
      itens: itensDaTrilha(trilha).filter(
        // Jogo não tem nível: some só quando a busca não bate, não quando filtra nível.
        (item) => (!termo || item.busca.includes(termo)) && (!nivel || !item.nivel || item.nivel === nivel),
      ),
    })).filter(({ itens }) => itens.length > 0);
  }, [busca, nivel]);

  const total = ATIVIDADES_INGLES.length + ATALHOS_INGLES.length;
  const filtrando = busca.trim() !== "" || nivel !== null;

  if (total === 0) {
    return (
      <EstadoVazio
        icone="ingles"
        titulo="Nenhuma atividade de inglês ainda"
        texto="As atividades da trilha de inglês aparecem aqui assim que forem adicionadas."
        origem="src/data/ingles.ts"
      />
    );
  }

  return (
    <div className={estilos.palco}>
      <div className={estilos.principal}>
        <div className={estilos.ferramentas}>
          <form className={estilos.busca} role="search" onSubmit={(evento) => evento.preventDefault()}>
            <Icone nome="busca" tamanho={17} />
            <input
              type="search"
              value={busca}
              onChange={(evento) => definirBusca(evento.target.value)}
              placeholder="Buscar prática, tema ou abreviação"
              aria-label="Buscar nas atividades de inglês"
            />
          </form>
          <div className={estilos.niveis} role="group" aria-label="Filtrar por nível">
            {NIVEIS.map((opcao) => (
              <button
                key={opcao ?? "todos"}
                type="button"
                className={nivel === opcao ? `${estilos.nivel} ${estilos.nivelAtivo}` : estilos.nivel}
                aria-pressed={nivel === opcao}
                onClick={() => definirNivel(opcao)}
              >
                {opcao ?? "Todos os níveis"}
              </button>
            ))}
          </div>
        </div>

        {!filtrando && (
          <nav className={estilos.atalhos} aria-label="Ir para a trilha">
            {trilhas.map(({ trilha, itens }) => (
              <a key={trilha.id} href={`#trilha-${trilha.id}`} className={estilos.atalho} style={{ "--acento": trilha.cor } as CSSProperties}>
                <Icone nome={trilha.icone} tamanho={16} />
                {trilha.titulo}
                <span className={estilos.atalhoConta}>{itens.length}</span>
              </a>
            ))}
          </nav>
        )}

        {trilhas.length === 0 ? (
          <div className={estilos.nada}>
            <EstadoVazio icone="busca" titulo="Nenhuma prática encontrada" texto="Tente outra palavra ou mostre todos os níveis." />
            <button
              type="button"
              className={estilos.limpar}
              onClick={() => {
                definirBusca("");
                definirNivel(null);
              }}
            >
              Mostrar todas as práticas
            </button>
          </div>
        ) : (
          trilhas.map(({ trilha, itens }) => (
            <section
              key={trilha.id}
              id={`trilha-${trilha.id}`}
              className={estilos.trilha}
              style={{ "--acento": trilha.cor } as CSSProperties}
              aria-labelledby={`titulo-${trilha.id}`}
            >
              <header className={estilos.trilhaTopo}>
                <span className={estilos.trilhaSelo}>
                  <Icone nome={trilha.icone} tamanho={22} />
                </span>
                <div>
                  <h2 id={`titulo-${trilha.id}`} className={estilos.trilhaTitulo}>
                    {trilha.titulo}
                  </h2>
                  <p className={estilos.trilhaDescricao}>{trilha.descricao}</p>
                </div>
              </header>

              <ul className={estilos.lista}>
                {itens.map((item) => (
                  <li key={item.para} className={estilos.item}>
                    <span className={estilos.itemIcone}>
                      <Icone nome={item.icone} tamanho={20} />
                    </span>
                    <div className={estilos.itemTexto}>
                      <h3 className={estilos.itemTitulo}>
                        <Link to={item.para}>{item.titulo}</Link>
                      </h3>
                      <p className={estilos.itemDescricao}>{item.descricao}</p>
                      <p className={estilos.itemMeta}>
                        {item.nivel && <span className={estilos.itemNivel}>{item.nivel}</span>}
                        <span>{item.meta}</span>
                      </p>
                    </div>
                    <Icone nome="seta-direita" tamanho={20} className={estilos.seta} />
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>

      <aside className={estilos.gabi} aria-label="Gabi">
        <p className={estilos.balao}>
          Oi! Eu sou a Gabi. Está começando? Vá pelo vocabulário com imagens. Quer entender o inglês de verdade, com as abreviações do celular e do trabalho?
          Vá para o inglês da vida real.
        </p>
        <div className={estilos.figura}>
          <Gabi humor="neutra" />
        </div>
      </aside>
    </div>
  );
}
