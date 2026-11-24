import { useState } from "react";

import { Icone } from "@/components/Icone";
import { avaliarCaso } from "@/lib/aulaIngles";
import type { BlocoDoTipo } from "@/types/aulaIngles";
import { BotaoFala } from "./BotaoFala";
import { ImagemAula } from "./ImagemAula";
import { Rico } from "./Rico";
import estilos from "./CasosEscrita.module.css";

export function CasosEscrita({ bloco }: { bloco: BlocoDoTipo<"casos-escrita"> }) {
  const [ativo, definirAtivo] = useState(bloco.casos[0].id);
  const [textos, definirTextos] = useState<Record<string, string>>({});
  const [modelosAbertos, definirModelosAbertos] = useState<ReadonlySet<string>>(new Set());
  const avaliacao = (id: string) => avaliarCaso(textos[id] ?? "", bloco.termosSintoma, bloco.minimoPalavras);

  return (
    <div>
      <div className={estilos.abas} role="tablist">
        {bloco.casos.map((caso) => {
          const concluido = avaliacao(caso.id).tudo;
          return (
            <button key={caso.id} type="button" role="tab" aria-selected={ativo === caso.id} className={estilos.aba} onClick={() => definirAtivo(caso.id)}>
              <span>{caso.rotulo}</span>
              <span className={estilos.situacao} data-concluido={concluido ? "sim" : "nao"}>
                {concluido ? (
                  <>
                    {bloco.rotulosEstado.concluido} <Icone nome="check" tamanho={13} />
                  </>
                ) : (
                  bloco.rotulosEstado.pendente
                )}
              </span>
            </button>
          );
        })}
      </div>

      {bloco.casos.map((caso) => {
        const resultado = avaliacao(caso.id);
        const criterios = [
          { chave: "comprimento", ok: resultado.comprimento, rotulo: bloco.criterios.comprimento },
          { chave: "vocabulario", ok: resultado.vocabulario, rotulo: bloco.criterios.vocabulario },
          { chave: "modais", ok: resultado.modais, rotulo: bloco.criterios.modais },
          { chave: "conector", ok: resultado.conector, rotulo: bloco.criterios.conector },
        ];
        return (
          <section key={caso.id} hidden={ativo !== caso.id} className={estilos.painel} role="tabpanel" aria-label={caso.rotulo}>
            <div className={estilos.caso}>
              <ImagemAula src={caso.imagem} alt={caso.alt} reserva={caso.alt} alta />
              <div className={estilos.casoTexto}>
                <div className={estilos.casoTopo}>
                  <span className={estilos.etiqueta}>{caso.etiqueta}</span>
                  <BotaoFala texto={caso.falaCaso} rotulo={caso.rotuloOuvir} />
                </div>
                <blockquote className={estilos.citacao}>{caso.citacao}</blockquote>
              </div>
            </div>

            <div className={estilos.perguntas}>
              <p className={estilos.perguntasTitulo}>{bloco.tituloPerguntas}</p>
              <ul>
                {caso.perguntas.map((pergunta) => (
                  <li key={pergunta}>
                    <Rico texto={pergunta} />
                  </li>
                ))}
              </ul>
            </div>

            <div className={estilos.campoTopo}>
              <label htmlFor={`texto-${caso.id}`} className={estilos.campoRotulo}>
                {caso.rotuloCampo}
              </label>
              <span className={estilos.contagem}>{bloco.rotuloContagem.replace("{n}", String(resultado.palavras)).replace("{min}", String(bloco.minimoPalavras))}</span>
            </div>
            <textarea
              id={`texto-${caso.id}`}
              className={estilos.campo}
              rows={5}
              placeholder={bloco.placeholder}
              value={textos[caso.id] ?? ""}
              onChange={(e) => definirTextos((antes) => ({ ...antes, [caso.id]: e.target.value }))}
            />

            <ul className={estilos.criterios}>
              {criterios.map((criterio) => (
                <li key={criterio.chave} className={estilos.criterio} data-ok={criterio.ok ? "sim" : "nao"}>
                  {criterio.rotulo}
                </li>
              ))}
            </ul>

            <button type="button" className={estilos.modeloBotao} disabled={!resultado.tudo} onClick={() => definirModelosAbertos((antes) => new Set(antes).add(caso.id))}>
              {bloco.rotuloBotaoModelo}
            </button>

            {modelosAbertos.has(caso.id) && (
              <div className={estilos.modelo}>
                <div className={estilos.modeloTopo}>
                  <span className={estilos.modeloRotulo}>{caso.modelo.rotulo}</span>
                  <BotaoFala texto={caso.modelo.texto} rotulo={caso.modelo.rotuloOuvir} />
                </div>
                <p className={estilos.modeloTexto}>{caso.modelo.texto}</p>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
