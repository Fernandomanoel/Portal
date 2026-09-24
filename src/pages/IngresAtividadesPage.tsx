import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

import { EstadoVazio } from "@/components/EstadoVazio";
import { Icone, type NomeIcone } from "@/components/Icone";
import { Gabi } from "@/components/ingles/Gabi";
import { ATALHOS_INGLES, ATIVIDADES_INGLES, totalDeTarefas } from "@/data/ingles";
import { rotas } from "@/lib/rotas";
import estilos from "./IngresAtividadesPage.module.css";

interface Linha {
  para: string;
  titulo: string;
  descricao: string;
  cor: string;
  icone: NomeIcone;
  meta: string;
}

export function IngresAtividadesPage() {
  const linhas: Linha[] = [
    ...ATIVIDADES_INGLES.map((atividade) => ({
      para: rotas.inglesAtividade(atividade.slug),
      titulo: atividade.titulo,
      descricao: atividade.descricao,
      cor: atividade.cor,
      icone: (atividade.conteudo.tipo === "exercicios" ? "som" : "conversa") as NomeIcone,
      meta:
        atividade.conteudo.tipo === "exercicios"
          ? `${totalDeTarefas(atividade)} exercícios`
          : `${atividade.conteudo.dialogos.length} conversas · ${totalDeTarefas(atividade)} respostas`,
    })),
    ...ATALHOS_INGLES.map((atalho) => ({ ...atalho, icone: "musica" as NomeIcone, meta: "Jogo de digitação" })),
  ];

  if (linhas.length === 0) {
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
      <ul className={estilos.lista}>
        {linhas.map((linha) => (
          <li key={linha.para} className={estilos.item} style={{ "--acento": linha.cor } as CSSProperties}>
            <span className={estilos.selo}>
              <Icone nome={linha.icone} tamanho={26} />
            </span>
            <div className={estilos.texto}>
              <h2 className={estilos.titulo}>
                <Link to={linha.para}>{linha.titulo}</Link>
              </h2>
              <p className={estilos.descricao}>{linha.descricao}</p>
              <p className={estilos.meta}>{linha.meta}</p>
            </div>
            <Icone nome="seta-direita" tamanho={22} className={estilos.seta} />
          </li>
        ))}
      </ul>

      <aside className={estilos.gabi} aria-label="Gabi">
        <p className={estilos.balao}>
          Oi! Eu sou a Gabi. Escolha uma prática: eu falo em inglês com você, e você pode ouvir de novo quantas vezes quiser.
        </p>
        <div className={estilos.figura}>
          <Gabi humor="neutra" />
        </div>
      </aside>
    </div>
  );
}
