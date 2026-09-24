import { useId, useState, type ReactNode } from "react";

import { Icone, type NomeIcone } from "@/components/Icone";
import type { AtividadeIngles, CanalConversa, ConversaReal, Expressao, Registro } from "@/types/ingles";
import { BotaoTrecho } from "./BotaoTrecho";
import { PraticaLeitura, type UnidadeLeitura } from "./PraticaLeitura";
import estilos from "./ConversasReaisIngles.module.css";

const CANAL: Record<CanalConversa, { rotulo: string; icone: NomeIcone }> = {
  mensagem: { rotulo: "Mensagens de celular", icone: "celular" },
  presencial: { rotulo: "Conversa cara a cara", icone: "pessoas" },
  email: { rotulo: "E-mail de trabalho", icone: "email" },
  "chat-trabalho": { rotulo: "Chat do trabalho", icone: "conversa" },
  "rede-social": { rotulo: "Rede social e jogo online", icone: "celular" },
};

const REGISTRO: Record<Registro, string> = {
  informal: "Informal",
  neutro: "Neutro",
  formal: "Formal",
};

function escapar(texto: string) {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Troca cada expressão do glossário, no meio da fala, por um botão que abre a explicação dela. */
function marcarExpressoes(texto: string, expressoes: Expressao[], ativa: string | null, aoEscolher: (termo: string) => void): ReactNode[] {
  if (!expressoes.length) return [texto];
  const termos = [...expressoes].sort((a, b) => b.termo.length - a.termo.length).map((e) => escapar(e.termo));
  const padrao = new RegExp(`(?<![\\p{L}\\p{N}'])(${termos.join("|")})(?![\\p{L}\\p{N}'])`, "giu");
  const partes: ReactNode[] = [];
  let inicio = 0;
  for (const achado of texto.matchAll(padrao)) {
    const expressao = expressoes.find((e) => e.termo.toLowerCase() === achado[0].toLowerCase());
    if (!expressao || achado.index === undefined) continue;
    partes.push(texto.slice(inicio, achado.index));
    partes.push(
      <button
        key={achado.index}
        type="button"
        className={ativa === expressao.termo ? `${estilos.termo} ${estilos.termoAtivo}` : estilos.termo}
        onClick={() => aoEscolher(expressao.termo)}
        title={expressao.significado}
      >
        {achado[0]}
      </button>,
    );
    inicio = achado.index + achado[0].length;
  }
  partes.push(texto.slice(inicio));
  return partes;
}

function ConversaVisao({ conversa }: { conversa: ConversaReal }) {
  const prefixo = useId();
  const [comTraducao, definirComTraducao] = useState(false);
  const [ativa, definirAtiva] = useState<string | null>(null);
  const falada = conversa.canal === "presencial";
  const canal = CANAL[conversa.canal];

  function abrir(termo: string) {
    definirAtiva(termo);
    document.getElementById(`${prefixo}-${termo}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  return (
    <div className={estilos.conversa}>
      <div className={estilos.situacao}>
        <span className={estilos.canal}>
          <Icone nome={canal.icone} tamanho={16} />
          {canal.rotulo}
        </span>
        <p>{conversa.situacao}</p>
      </div>

      <div className={estilos.controles}>
        <p className={estilos.dica}>As palavras sublinhadas estão explicadas logo abaixo. Toque nelas.</p>
        <label className={estilos.alternar}>
          <input type="checkbox" checked={comTraducao} onChange={(e) => definirComTraducao(e.target.checked)} />
          Mostrar tradução
        </label>
      </div>

      {conversa.canal === "email" ? (
        <ol className={estilos.emails}>
          {conversa.falas.map((fala, i) => (
            <li key={i} className={estilos.email}>
              <p className={estilos.emailCabecalho}>
                <span>
                  <b>De:</b> {conversa.pessoas[fala.quem]}
                </span>
                <span>
                  <b>Para:</b> {conversa.pessoas[fala.quem === 0 ? 1 : 0]}
                </span>
                {fala.assunto && (
                  <span lang="en">
                    <b>Assunto:</b> {marcarExpressoes(fala.assunto, conversa.expressoes, ativa, abrir)}
                  </span>
                )}
              </p>
              <p className={estilos.emailCorpo} lang="en">
                {marcarExpressoes(fala.texto, conversa.expressoes, ativa, abrir)}
              </p>
              {comTraducao && <p className={estilos.traducao}>{fala.traducao}</p>}
            </li>
          ))}
        </ol>
      ) : (
        <ol className={falada ? estilos.chat : `${estilos.chat} ${estilos.chatCelular}`}>
          {conversa.falas.map((fala, i) => {
            const mesmaPessoa = i > 0 && conversa.falas[i - 1].quem === fala.quem;
            return (
              <li key={i} className={fala.quem === 1 ? `${estilos.fala} ${estilos.direita}` : estilos.fala}>
                {!mesmaPessoa && <span className={estilos.nome}>{conversa.pessoas[fala.quem]}</span>}
                <div className={estilos.linhaBolha}>
                  <p className={estilos.bolha} lang="en">
                    {marcarExpressoes(fala.texto, conversa.expressoes, ativa, abrir)}
                  </p>
                  {falada && <BotaoTrecho texto={fala.texto} rotulo="Ouvir esta fala" />}
                </div>
                {comTraducao && <p className={estilos.traducao}>{fala.traducao}</p>}
              </li>
            );
          })}
        </ol>
      )}

      <section className={estilos.glossario} aria-label="Expressões desta conversa">
        <h2 className={estilos.glossarioTitulo}>Expressões desta conversa</h2>
        <ul className={estilos.expressoes}>
          {conversa.expressoes.map((expressao) => (
            <li
              key={expressao.termo}
              id={`${prefixo}-${expressao.termo}`}
              className={ativa === expressao.termo ? `${estilos.expressao} ${estilos.expressaoAtiva}` : estilos.expressao}
            >
              <div className={estilos.expressaoTopo}>
                <span className={estilos.expressaoTermo} lang="en">
                  {expressao.termo}
                </span>
                {expressao.porExtenso && (
                  <span className={estilos.porExtenso} lang="en">
                    = {expressao.porExtenso}
                  </span>
                )}
                <span className={`${estilos.registro} ${estilos[`registro_${expressao.registro}`]}`}>{REGISTRO[expressao.registro]}</span>
              </div>
              <p className={estilos.significado}>{expressao.significado}</p>
              <p className={estilos.uso}>
                <b>Onde usar:</b> {expressao.uso}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

interface Props {
  atividade: AtividadeIngles;
  conversas: ConversaReal[];
}

export function ConversasReaisIngles({ atividade, conversas }: Props) {
  const unidades: UnidadeLeitura[] = conversas.map((conversa) => ({
    titulo: conversa.titulo,
    tipo: "Conversa",
    icone: CANAL[conversa.canal].icone,
    rever: "Ver a conversa de novo",
    material: <ConversaVisao conversa={conversa} />,
    perguntas: conversa.perguntas,
  }));
  const expressoes = conversas.reduce((soma, c) => soma + c.expressoes.length, 0);

  return <PraticaLeitura atividade={atividade} unidades={unidades} resumo={[`${conversas.length} conversas`, `${expressoes} expressões explicadas`]} />;
}
