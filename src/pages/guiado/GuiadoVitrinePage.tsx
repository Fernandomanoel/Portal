import { Link } from "react-router-dom";

import { Icone } from "@/components/Icone";
import { BotaoOuvir } from "@/components/guiado/BotaoOuvir";
import { Prateleira } from "@/components/guiado/Prateleira";
import { ASSUNTOS, JOGOS_CONCEITO, TUTORIAIS } from "@/data/guiado";
import { rotas } from "@/lib/rotas";
import estilos from "./GuiadoVitrinePage.module.css";

const APRESENTACAO =
  "Atividades com passos pequenos. Cada passo tem uma imagem e um botão para ouvir.";

const ACENTO_JOGOS = "#3d5bd9";

export function GuiadoVitrinePage() {
  const destaque = JOGOS_CONCEITO[0];

  return (
    <div className={estilos.pagina}>
      <section className={estilos.destaque} aria-labelledby="titulo-passo-a-passo">
        <div className={estilos.destaqueTexto}>
          <h1 id="titulo-passo-a-passo" className={estilos.titulo}>
            Passo a Passo
          </h1>
          <p className={estilos.apresentacao}>{APRESENTACAO}</p>
          <div className={estilos.acoes}>
            {destaque && (
              <Link to={rotas.guiadoJogo(destaque.slug)} className={estilos.comecar}>
                Comece por aqui: {destaque.titulo}
                <Icone nome="seta-direita" tamanho={22} />
              </Link>
            )}
            <BotaoOuvir texto={`Passo a Passo. ${APRESENTACAO}`} />
          </div>
        </div>
        <div className={estilos.destaqueVisual} aria-hidden="true">
          <Icone nome="mouse" tamanho={120} />
        </div>
      </section>

      {JOGOS_CONCEITO.length > 0 && (
        <Prateleira
          titulo="Jogos para conhecer o computador"
          icone="mouse"
          acento={ACENTO_JOGOS}
          itens={JOGOS_CONCEITO.map((jogo) => ({
            para: rotas.guiadoJogo(jogo.slug),
            titulo: jogo.titulo,
            descricao: jogo.descricao,
            capa: jogo.capa,
            etiqueta: "Jogo",
          }))}
        />
      )}

      {ASSUNTOS.map((assunto) => {
        const tutoriais = TUTORIAIS.filter((tutorial) => tutorial.assunto === assunto.id);
        if (tutoriais.length === 0) return null;
        return (
          <Prateleira
            key={assunto.id}
            titulo={assunto.nome}
            icone={assunto.icone}
            acento={assunto.acento}
            itens={tutoriais.map((tutorial) => ({
              para: rotas.guiadoTutorial(tutorial.caminho),
              titulo: tutorial.titulo,
              descricao: tutorial.descricao,
              capa: tutorial.capa,
              etiqueta: "Passo a passo",
            }))}
          />
        );
      })}
    </div>
  );
}
