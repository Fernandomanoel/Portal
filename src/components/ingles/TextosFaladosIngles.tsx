import { useState } from "react";

import type { NomeIcone } from "@/components/Icone";
import type { AtividadeIngles, TextoFalado } from "@/types/ingles";
import { BotaoTrecho } from "./BotaoTrecho";
import { ControlesAudio } from "./ControlesAudio";
import { PraticaLeitura, type UnidadeLeitura } from "./PraticaLeitura";
import estilos from "./TextosFaladosIngles.module.css";

const TIPO: Record<TextoFalado["tipo"], { rotulo: string; icone: NomeIcone }> = {
  discurso: { rotulo: "Discurso", icone: "megafone" },
  aviso: { rotulo: "Aviso", icone: "megafone" },
  apresentacao: { rotulo: "Apresentação", icone: "pessoas" },
};

/** O texto inteiro para ler e ouvir: parágrafo a parágrafo, com tradução sob demanda. */
function TextoFaladoVisao({ texto }: { texto: TextoFalado }) {
  const [comTraducao, definirComTraducao] = useState(false);
  const inteiro = texto.paragrafos.map((p) => p.en).join(" ");

  return (
    <div className={estilos.texto}>
      <p className={estilos.quem}>{texto.quem}</p>

      <div className={estilos.controles}>
        <ControlesAudio texto={inteiro} />
        <label className={estilos.alternar}>
          <input type="checkbox" checked={comTraducao} onChange={(e) => definirComTraducao(e.target.checked)} />
          Mostrar tradução
        </label>
      </div>

      <div className={estilos.paragrafos}>
        {texto.paragrafos.map((paragrafo) => (
          <div key={paragrafo.en} className={estilos.paragrafo}>
            <BotaoTrecho texto={paragrafo.en} />
            <div>
              <p className={estilos.en} lang="en">
                {paragrafo.en}
              </p>
              {comTraducao && <p className={estilos.pt}>{paragrafo.pt}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className={estilos.vocabulario}>
        <h2 className={estilos.vocabularioTitulo}>Palavras do texto</h2>
        <dl className={estilos.lista}>
          {texto.vocabulario.map((item) => (
            <div key={item.en}>
              <dt lang="en">{item.en}</dt>
              <dd>{item.pt}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

interface Props {
  atividade: AtividadeIngles;
  textos: TextoFalado[];
}

export function TextosFaladosIngles({ atividade, textos }: Props) {
  const unidades: UnidadeLeitura[] = textos.map((texto) => ({
    titulo: texto.titulo,
    tipo: TIPO[texto.tipo].rotulo,
    icone: TIPO[texto.tipo].icone,
    rever: "Ver o texto de novo",
    material: <TextoFaladoVisao texto={texto} />,
    perguntas: texto.perguntas,
  }));

  return <PraticaLeitura atividade={atividade} unidades={unidades} resumo={[`${textos.length} textos`, "Audição", "Leitura", "Compreensão"]} />;
}
