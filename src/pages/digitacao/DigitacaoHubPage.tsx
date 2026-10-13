import { Link } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { Icone } from "@/components/Icone";
import { JOGOS } from "@/data/jogosDigitacao";
import { rotas } from "@/lib/rotas";
import estilos from "./DigitacaoHubPage.module.css";

export function DigitacaoHubPage() {
  return (
    <>
      <CabecalhoPagina
        titulo="Digitação"
        texto="Cada jogo tem seu próprio jeito de treinar — escolha um para começar."
      />

      <ul className={estilos.grade}>
        {JOGOS.map((jogo, indice) => (
          <li
            key={jogo.para}
            className={estilos.item}
            style={{ ["--acento" as string]: jogo.acento, ["--atraso" as string]: `${indice * 55}ms` }}
          >
            <article className={estilos.card}>
              <div className={estilos.capa}>
                <span className={estilos.sigla}>{jogo.sigla}</span>
                <Icone nome={jogo.icone} tamanho={40} />
              </div>
              <div className={estilos.corpo}>
                <h3 className={estilos.titulo}>
                  <Link to={jogo.para}>{jogo.titulo}</Link>
                </h3>
                <p className={estilos.descricao}>{jogo.texto}</p>
                <p className={estilos.rodape}>
                  <Icone nome="check" tamanho={13} />
                  {jogo.etiqueta}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <Link to={rotas.digitacaoRanking()} className={estilos.cartaoRanking}>
        <span className={estilos.iconeRanking}>
          <Icone nome="trofeu" tamanho={26} />
        </span>
        <span className={estilos.textoRanking}>
          <strong className={estilos.tituloRanking}>Ranking geral</strong>
          <span className={estilos.descricaoRanking}>O recorde de todos os jogos, num só lugar.</span>
        </span>
        <span className={estilos.setaRanking}>
          <Icone nome="seta-direita" tamanho={18} />
        </span>
      </Link>
    </>
  );
}
