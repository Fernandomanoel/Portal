import { useEffect, useRef, useState } from "react";

import { comoFrase, respostaEscritaCerta, tituloDoResultado } from "@/lib/ingles";
import type { AtividadeIngles, Dialogo, FalaDialogo } from "@/types/ingles";
import { CampoResposta } from "./CampoResposta";
import { ControlesAudio } from "./ControlesAudio";
import type { HumorGabi } from "./Gabi";
import { MolduraPratica } from "./MolduraPratica";
import { OpcoesResposta } from "./OpcoesResposta";
import { RodapeResposta } from "./RodapeResposta";
import { TelaAbertura, TelaResultado } from "./TelasPratica";
import estilos from "./DialogosIngles.module.css";

const PONTOS_POR_ACERTO = 15;
const ELOGIOS = ["Você acertou!", "Isso mesmo, acertou!", "Certíssimo!"];

/** A frase que o aluno "disse": sempre a resposta certa, para a conversa seguir fazendo sentido. */
function respostaCerta(fala: FalaDialogo): string {
  if (fala.tipo === "multipla") return fala.opcoes[fala.resposta];
  if (fala.tipo === "completar") return fala.antes + fala.opcoes[fala.resposta] + fala.depois;
  return comoFrase(fala.respostas[0]);
}

type Fase = { tipo: "abertura" } | { tipo: "conversando"; dialogo: number; fala: number } | { tipo: "resultado" };

interface Props {
  atividade: AtividadeIngles;
  dialogos: Dialogo[];
}

/** Diálogos: a conversa aparece como chat e o aluno escolhe, escreve ou completa a resposta. */
export function DialogosIngles({ atividade, dialogos }: Props) {
  const total = dialogos.reduce((soma, d) => soma + d.falas.length, 0);
  const [fase, definirFase] = useState<Fase>({ tipo: "abertura" });
  const [escolhida, definirEscolhida] = useState<number | null>(null);
  const [texto, definirTexto] = useState("");
  const [acertou, definirAcertou] = useState<boolean | null>(null);
  const [acertos, definirAcertos] = useState(0);
  const chatRef = useRef<HTMLOListElement>(null);

  const dIdx = fase.tipo === "conversando" ? fase.dialogo : 0;
  const tIdx = fase.tipo === "conversando" ? fase.fala : 0;
  const dialogo = dialogos[dIdx];
  const fala = dialogo.falas[tIdx];
  const turnoGlobal = dialogos.slice(0, dIdx).reduce((soma, d) => soma + d.falas.length, 0) + tIdx;
  const verificado = acertou !== null;
  const podeVerificar = !verificado && (fala.tipo === "escrever" ? texto.trim() !== "" : escolhida !== null);

  useEffect(() => {
    const chat = chatRef.current;
    if (chat) chat.scrollTop = chat.scrollHeight;
  }, [dIdx, tIdx, verificado]);

  function limpar() {
    definirEscolhida(null);
    definirTexto("");
    definirAcertou(null);
  }

  function comecar() {
    definirAcertos(0);
    limpar();
    definirFase({ tipo: "conversando", dialogo: 0, fala: 0 });
  }

  function verificar() {
    if (!podeVerificar) return;
    const certo = fala.tipo === "escrever" ? respostaEscritaCerta(texto, fala.respostas) : escolhida === fala.resposta;
    definirAcertou(certo);
    if (certo) definirAcertos((n) => n + 1);
  }

  function continuar() {
    limpar();
    if (tIdx + 1 < dialogo.falas.length) definirFase({ tipo: "conversando", dialogo: dIdx, fala: tIdx + 1 });
    else if (dIdx + 1 < dialogos.length) definirFase({ tipo: "conversando", dialogo: dIdx + 1, fala: 0 });
    else definirFase({ tipo: "resultado" });
  }

  useEffect(() => {
    if (fase.tipo !== "conversando") return;
    const aoTeclar = (evento: KeyboardEvent) => {
      const alvo = evento.target as HTMLElement;
      // Botão comum já age sozinho no Enter; a opção marcada, não: ali o Enter verifica.
      if (evento.key === "Enter" && (alvo.tagName !== "BUTTON" || alvo.getAttribute("role") === "radio")) {
        evento.preventDefault();
        if (verificado) continuar();
        else verificar();
        return;
      }
      if (fala.tipo !== "escrever" && !verificado && /^[1-9]$/.test(evento.key) && alvo.tagName !== "INPUT") {
        document.querySelectorAll<HTMLButtonElement>("[role=radio]")[Number(evento.key) - 1]?.click();
      }
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  });

  if (fase.tipo === "abertura") {
    return (
      <MolduraPratica titulo={atividade.titulo} acento={atividade.cor} humor="neutra">
        <TelaAbertura
          titulo={atividade.abertura.titulo}
          texto={atividade.abertura.texto}
          resumo={[`${dialogos.length} conversas`, `${total} respostas`, ...dialogos.map((d) => d.titulo)]}
          aoComecar={comecar}
        />
      </MolduraPratica>
    );
  }

  if (fase.tipo === "resultado") {
    const final = tituloDoResultado(acertos, total, ["Você manda muito bem nas conversas!", "Bom treino de diálogo!", "Vamos conversar de novo?"]);
    return (
      <MolduraPratica titulo={atividade.titulo} acento={atividade.cor} humor={final.humor} progresso={{ atual: total, total }} pontos={acertos * PONTOS_POR_ACERTO}>
        <TelaResultado titulo={final.titulo} acertos={acertos} total={total} pontos={acertos * PONTOS_POR_ACERTO} aoRecomecar={comecar} />
      </MolduraPratica>
    );
  }

  const humor: HumorGabi = verificado ? (acertou ? "acertou" : "errou") : "neutra";
  const certa = respostaCerta(fala);
  const palavraEscolhida = fala.tipo === "completar" && escolhida !== null ? fala.opcoes[escolhida] : null;

  return (
    <MolduraPratica
      titulo={atividade.titulo}
      acento={atividade.cor}
      humor={humor}
      etiqueta={{ icone: "conversa", texto: `Conversa ${dIdx + 1} de ${dialogos.length} · ${dialogo.titulo}` }}
      progresso={{ atual: turnoGlobal, total }}
      pontos={acertos * PONTOS_POR_ACERTO}
      rodape={
        <RodapeResposta
          podeVerificar={podeVerificar}
          ultimo={dIdx === dialogos.length - 1 && tIdx === dialogo.falas.length - 1}
          aoVerificar={verificar}
          aoContinuar={continuar}
          resultado={
            verificado
              ? {
                  acertou: !!acertou,
                  titulo: acertou ? ELOGIOS[turnoGlobal % ELOGIOS.length] : "Você errou — vamos praticar mais.",
                  detalhe:
                    fala.tipo === "escrever" ? (
                      <>
                        Você escreveu: <b lang="en">{texto}</b>
                        <br />
                        Resposta certa: <b lang="en">{fala.respostas[0]}</b>
                      </>
                    ) : (
                      <>
                        {acertou ? "A resposta era: " : "A resposta certa é: "}
                        <b lang="en">{certa}</b>
                      </>
                    ),
                }
              : null
          }
        />
      }
    >
      <ol className={estilos.chat} ref={chatRef} aria-label="Conversa">
        {dialogo.falas.slice(0, tIdx + 1).map((f, i) => {
          const atual = i === tIdx;
          return (
            <li key={`${dIdx}-${i}`} className={estilos.par}>
              <div className={estilos.gabi}>
                <span className={estilos.quem}>Gabi</span>
                <p className={estilos.bolha} lang="en">
                  {f.gabi}
                </p>
                <p className={estilos.traducao}>{f.traducao}</p>
                <ControlesAudio texto={f.gabi} tocarAoAbrir={atual} tamanho="compacto" />
              </div>
              {!atual && (
                <div className={estilos.voce}>
                  <span className={estilos.quem}>Você</span>
                  <p className={estilos.bolha} lang="en">
                    {respostaCerta(f)}
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className={estilos.resposta}>
        {fala.tipo === "completar" && (
          <p className={estilos.lacuna} lang="en">
            {fala.antes}
            <span className={palavraEscolhida ? estilos.espacoPreenchido : estilos.espaco}>{palavraEscolhida ?? " "}</span>
            {fala.depois}
          </p>
        )}
        {fala.tipo === "escrever" ? (
          <CampoResposta key={`${dIdx}-${tIdx}`} valor={texto} aoMudar={definirTexto} verificado={verificado} acertou={!!acertou} />
        ) : (
          <OpcoesResposta
            key={`${dIdx}-${tIdx}`}
            opcoes={fala.opcoes}
            resposta={fala.resposta}
            chave={fala.gabi}
            escolhida={escolhida}
            verificado={verificado}
            aoEscolher={definirEscolhida}
            fichas={fala.tipo === "completar"}
            idioma="en"
          />
        )}
      </div>
    </MolduraPratica>
  );
}
