import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { PainelRanking } from "@/components/digitacao/PainelRanking";
import { ENSAIOS } from "@/pages/digitacao/letrasIngles/dados";
import estilos from "./RankingGeralPage.module.css";

const JOGOS_FIXOS = [
  { id: "digitacao-textos-classicos", titulo: "Textos Clássicos" },
  { id: "digitacao-cavaleiros-zodiaco", titulo: "Batalha das 12 Casas" },
  { id: "digitacao-sonic", titulo: "Sonic Digital Pro" },
  { id: "digitacao-baloes", titulo: "Balões de Letras" },
  { id: "digitacao-constelacao", titulo: "Constelação" },
  { id: "digitacao-pulo", titulo: "Pulo das Palavras" },
  { id: "digitacao-nave", titulo: "Esquadrão Hiper" },
];

/**
 * Área central de ranking: o placar de cada jogo de digitação, num só
 * lugar — separada das telas dos jogos em si (que só pedem o apelido ao
 * terminar uma rodada, sem mostrar a lista).
 */
export function RankingGeralPage() {
  return (
    <>
      <CabecalhoPagina
        titulo="Ranking de Digitação"
        texto="O recorde de cada jogo, reunido aqui — os jogos em si só pedem o apelido ao terminar."
      />

      <div className={estilos.secoes}>
        {JOGOS_FIXOS.map((jogo) => (
          <section key={jogo.id} className={estilos.secao}>
            <h2 className={estilos.tituloSecao}>{jogo.titulo}</h2>
            <PainelRanking jogoId={jogo.id} />
          </section>
        ))}

        <section className={estilos.secao}>
          <h2 className={estilos.tituloSecao}>Inglês em Letras de Música</h2>
          {ENSAIOS.map((ensaio, indice) => (
            <div key={ensaio.tema} className={estilos.bloco}>
              <h3 className={estilos.tituloJogo}>
                Ensaio {indice + 1} — {ensaio.tema}
              </h3>
              <PainelRanking jogoId={`digitacao-letras-ingles-${indice}`} />
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
