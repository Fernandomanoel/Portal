import { useCallback, useEffect, useRef, useState } from "react";

import { Icone } from "@/components/Icone";
import { PainelRanking } from "@/components/digitacao/PainelRanking";
import { ID_RANKING_CLIPE } from "@/data/clipesDigitacao";
import { calcularPPM, calcularPrecisao, formatarTempo, normalizarLetra } from "@/lib/clipeDigitacao";
import { useYoutube } from "@/lib/youtube";
import type { Clipe } from "@/types/digitacaoClipe";
import { LinhaDigitada } from "./LinhaDigitada";
import estilos from "./TreinoClipe.module.css";

export function TreinoClipe({ clipe, aoSair }: { clipe: Clipe; aoSair: () => void }) {
  const [indice, definirIndice] = useState(0);
  const [digitado, definirDigitado] = useState("");
  const [acertos, definirAcertos] = useState(0);
  const [erros, definirErros] = useState(0);
  const [inicio, definirInicio] = useState<number | null>(null);
  const [fim, definirFim] = useState<number | null>(null);
  const [agora, definirAgora] = useState(() => Date.now());
  const [erroAtivo, definirErroAtivo] = useState(false);

  const alvoRef = useRef<HTMLDivElement>(null);
  const palcoRef = useRef<HTMLDivElement>(null);
  const campoRef = useRef<HTMLInputElement>(null);
  const video = useYoutube(alvoRef, clipe.youtubeId);

  const linha = clipe.linhas[indice];
  const terminou = fim !== null;

  useEffect(() => {
    if (inicio === null || terminou) return;
    const intervalo = window.setInterval(() => definirAgora(Date.now()), 500);
    return () => window.clearInterval(intervalo);
  }, [inicio, terminou]);

  useEffect(() => {
    if (!erroAtivo) return;
    const espera = window.setTimeout(() => definirErroAtivo(false), 220);
    return () => window.clearTimeout(espera);
  }, [erroAtivo]);

  useEffect(() => {
    if (!terminou) campoRef.current?.focus();
  }, [indice, terminou]);

  const irParaLinha = useCallback(
    (novo: number) => {
      const alvo = Math.min(Math.max(novo, 0), clipe.linhas.length - 1);
      definirIndice(alvo);
      definirDigitado("");
      const segundos = clipe.linhas[alvo].inicio;
      if (segundos !== undefined) video.irPara(segundos);
    },
    [clipe.linhas, video],
  );

  function recomecar() {
    definirIndice(0);
    definirDigitado("");
    definirAcertos(0);
    definirErros(0);
    definirInicio(null);
    definirFim(null);
    video.irPara(clipe.linhas[0].inicio ?? 0);
    video.tocar();
  }

  function aoDigitar(valor: string) {
    if (!linha || terminou) return;
    // Só entra uma letra por vez e só a certa: errou, a linha espera (e o erro conta na precisão).
    if (valor.length !== digitado.length + 1 || !valor.startsWith(digitado)) return;
    const tecla = valor[valor.length - 1];
    const esperada = linha.texto[digitado.length];
    const agoraMs = Date.now();
    if (inicio === null) {
      definirInicio(agoraMs);
      video.tocar();
    }
    if (normalizarLetra(tecla) !== normalizarLetra(esperada)) {
      definirErros((e) => e + 1);
      definirErroAtivo(true);
      return;
    }
    definirAcertos((a) => a + 1);
    const proximo = digitado + esperada;
    if (proximo.length < linha.texto.length) return definirDigitado(proximo);
    if (indice === clipe.linhas.length - 1) {
      definirDigitado(proximo);
      definirAgora(agoraMs);
      definirFim(agoraMs);
    } else {
      definirIndice(indice + 1);
      definirDigitado("");
    }
  }

  const fimOuAgora = fim ?? agora;
  const ppm = calcularPPM(inicio, acertos, fimOuAgora);
  const precisao = calcularPrecisao(acertos, erros);
  const progresso = Math.round(((indice + (terminou ? 1 : digitado.length / (linha?.texto.length || 1))) / clipe.linhas.length) * 100);

  function telaCheia() {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void palcoRef.current?.requestFullscreen?.();
  }

  return (
    <div className={estilos.pagina}>
      <div className={estilos.palco} ref={palcoRef}>
        <div className={estilos.video}>
          <div ref={alvoRef} className={estilos.player} />
          {video.falha && <p className={estilos.falha}>{video.falha}</p>}
        </div>

        <div className={estilos.painel}>
          <dl className={estilos.numeros}>
            <div>
              <dt>Linha</dt>
              <dd>
                {Math.min(indice + 1, clipe.linhas.length)}/{clipe.linhas.length}
              </dd>
            </div>
            <div>
              <dt>PPM</dt>
              <dd>{ppm}</dd>
            </div>
            <div>
              <dt>Precisão</dt>
              <dd>{precisao}%</dd>
            </div>
          </dl>
          <div className={estilos.controles} role="group" aria-label="Controles do vídeo">
            <button type="button" onClick={() => irParaLinha(indice - 1)} disabled={indice === 0 || terminou} aria-label="Verso anterior">
              <Icone nome="seta-esquerda" tamanho={18} />
            </button>
            <button type="button" onClick={video.alternar} disabled={!video.pronto} aria-label={video.tocando ? "Pausar o vídeo" : "Tocar o vídeo"}>
              <Icone nome={video.tocando ? "pausa" : "play"} tamanho={18} />
            </button>
            <button type="button" onClick={recomecar} aria-label="Recomeçar do primeiro verso">
              <Icone nome="recomecar" tamanho={18} />
            </button>
            <button type="button" onClick={() => irParaLinha(indice + 1)} disabled={indice >= clipe.linhas.length - 1 || terminou} aria-label="Próximo verso">
              <Icone nome="seta-direita" tamanho={18} />
            </button>
            <button type="button" onClick={telaCheia} aria-label="Tela cheia">
              <Icone nome="tela-cheia" tamanho={18} />
            </button>
          </div>
          <span className={estilos.tempo}>
            {formatarTempo(video.tempo.atual)} / {formatarTempo(video.tempo.total)}
          </span>
        </div>
        <div className={estilos.barra} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progresso} aria-label="Progresso da letra">
          <span style={{ width: `${progresso}%` }} />
        </div>

        {!terminou && linha ? (
          <div className={estilos.verso}>
            <LinhaDigitada texto={linha.texto} digitado={digitado} erro={erroAtivo} />
            {linha.traducao && <p className={estilos.traducao}>{linha.traducao}</p>}
            <input
              ref={campoRef}
              className={estilos.campo}
              value={digitado}
              onChange={(e) => aoDigitar(e.target.value)}
              onPaste={(e) => e.preventDefault()}
              placeholder={inicio === null ? "Comece a digitar para tocar o vídeo" : ""}
              aria-label="Digite o verso aqui"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>
        ) : (
          <div className={estilos.resultado}>
            <h2>Letra completa</h2>
            <dl className={estilos.numeros}>
              <div>
                <dt>PPM</dt>
                <dd>{ppm}</dd>
              </div>
              <div>
                <dt>Precisão</dt>
                <dd>{precisao}%</dd>
              </div>
            </dl>
            <PainelRanking jogoId={ID_RANKING_CLIPE} resultadoPendente={{ ppm, precisao }} somenteFormulario />
            <button type="button" className={estilos.primario} onClick={recomecar}>
              <Icone nome="recomecar" tamanho={16} />
              Digitar de novo
            </button>
          </div>
        )}
      </div>

      <button type="button" className={estilos.sair} onClick={aoSair}>
        <Icone nome="seta-esquerda" tamanho={16} />
        Escolher outro clipe
      </button>
    </div>
  );
}
