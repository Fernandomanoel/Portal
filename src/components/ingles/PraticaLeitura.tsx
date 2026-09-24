import { useEffect, useState, type ReactNode } from "react";

import { Icone, type NomeIcone } from "@/components/Icone";
import { tituloDoResultado } from "@/lib/ingles";
import type { AtividadeIngles, PerguntaCompreensao } from "@/types/ingles";
import type { HumorGabi } from "./Gabi";
import { MolduraPratica } from "./MolduraPratica";
import { OpcoesResposta } from "./OpcoesResposta";
import { RodapeResposta } from "./RodapeResposta";
import { TelaAbertura, TelaResultado } from "./TelasPratica";
import estilos from "./PraticaLeitura.module.css";

const PONTOS_POR_ACERTO = 15;
const ELOGIOS = ["Você acertou!", "Isso mesmo, acertou!", "Certíssimo!"];

export interface UnidadeLeitura {
  titulo: string;
  /** Rótulo do tipo ("Discurso", "Mensagens de celular"). */
  tipo: string;
  icone: NomeIcone;
  /** Botão para reabrir o material durante as perguntas ("Ver o texto de novo"). */
  rever: string;
  /** O texto ou a conversa, completo, com os controles de áudio e tradução. */
  material: ReactNode;
  perguntas: PerguntaCompreensao[];
}

type Fase =
  | { tipo: "abertura" }
  | { tipo: "lendo"; unidade: number }
  | { tipo: "respondendo"; unidade: number; pergunta: number }
  | { tipo: "resultado" };

interface Props {
  atividade: AtividadeIngles;
  unidades: UnidadeLeitura[];
  resumo: string[];
}

/**
 * Prática de "ler (e ouvir) primeiro, responder depois": cada unidade mostra o
 * material inteiro e, em seguida, as perguntas de compreensão uma a uma, com a
 * explicação da resposta. O material pode ser reaberto durante as perguntas.
 */
export function PraticaLeitura({ atividade, unidades, resumo }: Props) {
  const total = unidades.reduce((soma, u) => soma + u.perguntas.length, 0);
  const [fase, definirFase] = useState<Fase>({ tipo: "abertura" });
  const [escolhida, definirEscolhida] = useState<number | null>(null);
  const [acertou, definirAcertou] = useState<boolean | null>(null);
  const [acertos, definirAcertos] = useState(0);

  const uIdx = fase.tipo === "lendo" || fase.tipo === "respondendo" ? fase.unidade : 0;
  const pIdx = fase.tipo === "respondendo" ? fase.pergunta : 0;
  const unidade = unidades[uIdx];
  const pergunta = unidade.perguntas[pIdx];
  const respondidas = unidades.slice(0, uIdx).reduce((soma, u) => soma + u.perguntas.length, 0) + (fase.tipo === "respondendo" ? pIdx : 0);
  const verificado = acertou !== null;
  const podeVerificar = !verificado && escolhida !== null;

  function limpar() {
    definirEscolhida(null);
    definirAcertou(null);
  }

  function comecar() {
    definirAcertos(0);
    limpar();
    definirFase({ tipo: "lendo", unidade: 0 });
  }

  function verificar() {
    if (!podeVerificar) return;
    const certo = escolhida === pergunta.resposta;
    definirAcertou(certo);
    if (certo) definirAcertos((n) => n + 1);
  }

  function continuar() {
    limpar();
    if (pIdx + 1 < unidade.perguntas.length) definirFase({ tipo: "respondendo", unidade: uIdx, pergunta: pIdx + 1 });
    else if (uIdx + 1 < unidades.length) definirFase({ tipo: "lendo", unidade: uIdx + 1 });
    else definirFase({ tipo: "resultado" });
  }

  useEffect(() => {
    if (fase.tipo !== "respondendo") return;
    const aoTeclar = (evento: KeyboardEvent) => {
      const alvo = evento.target as HTMLElement;
      if (evento.key === "Enter" && (alvo.tagName !== "BUTTON" || alvo.getAttribute("role") === "radio")) {
        evento.preventDefault();
        if (verificado) continuar();
        else verificar();
        return;
      }
      if (!verificado && /^[1-9]$/.test(evento.key) && alvo.tagName !== "INPUT") {
        document.querySelectorAll<HTMLButtonElement>("[role=radio]")[Number(evento.key) - 1]?.click();
      }
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  });

  // Cada unidade nova começa do topo da página, não no meio do texto anterior.
  useEffect(() => {
    if (fase.tipo === "lendo") window.scrollTo({ top: 0 });
  }, [fase.tipo, uIdx]);

  if (fase.tipo === "abertura") {
    return (
      <MolduraPratica titulo={atividade.titulo} acento={atividade.cor} humor="neutra">
        <TelaAbertura titulo={atividade.abertura.titulo} texto={atividade.abertura.texto} resumo={[...resumo, `${total} perguntas`]} aoComecar={comecar} />
      </MolduraPratica>
    );
  }

  if (fase.tipo === "resultado") {
    const final = tituloDoResultado(acertos, total, ["Você entendeu tudo!", "Bom treino de leitura!", "Vamos ler de novo?"]);
    return (
      <MolduraPratica titulo={atividade.titulo} acento={atividade.cor} humor={final.humor} progresso={{ atual: total, total }} pontos={acertos * PONTOS_POR_ACERTO}>
        <TelaResultado titulo={final.titulo} acertos={acertos} total={total} pontos={acertos * PONTOS_POR_ACERTO} aoRecomecar={comecar} />
      </MolduraPratica>
    );
  }

  const etiqueta = {
    icone: unidade.icone,
    texto: unidades.length > 1 ? `${unidade.tipo} ${uIdx + 1} de ${unidades.length} · ${unidade.titulo}` : `${unidade.tipo} · ${unidade.titulo}`,
  };

  if (fase.tipo === "lendo") {
    return (
      <MolduraPratica
        titulo={atividade.titulo}
        acento={atividade.cor}
        humor="explicando"
        etiqueta={etiqueta}
        progresso={{ atual: respondidas, total }}
        pontos={acertos * PONTOS_POR_ACERTO}
        rodape={
          <div className={estilos.rodape}>
            <p className={estilos.aviso}>Leia com calma. Você pode voltar ao texto durante as perguntas.</p>
            <button type="button" className={estilos.seguir} onClick={() => definirFase({ tipo: "respondendo", unidade: uIdx, pergunta: 0 })} autoFocus>
              Responder {unidade.perguntas.length === 1 ? "a pergunta" : `${unidade.perguntas.length} perguntas`}
              <Icone nome="seta-direita" tamanho={18} />
            </button>
          </div>
        }
      >
        <h1 className={estilos.titulo}>{unidade.titulo}</h1>
        {unidade.material}
      </MolduraPratica>
    );
  }

  const humor: HumorGabi = verificado ? (acertou ? "acertou" : "errou") : "neutra";

  return (
    <MolduraPratica
      titulo={atividade.titulo}
      acento={atividade.cor}
      humor={humor}
      etiqueta={etiqueta}
      progresso={{ atual: respondidas, total }}
      pontos={acertos * PONTOS_POR_ACERTO}
      rodape={
        <RodapeResposta
          podeVerificar={podeVerificar}
          ultimo={uIdx === unidades.length - 1 && pIdx === unidade.perguntas.length - 1}
          aoVerificar={verificar}
          aoContinuar={continuar}
          resultado={
            verificado
              ? {
                  acertou: !!acertou,
                  titulo: acertou ? ELOGIOS[respondidas % ELOGIOS.length] : "Não foi essa — veja por quê.",
                  detalhe: pergunta.explicacao,
                }
              : null
          }
        />
      }
    >
      <p className={estilos.contador}>
        Pergunta {pIdx + 1} de {unidade.perguntas.length}
      </p>
      <h1 className={estilos.pergunta}>{pergunta.pergunta}</h1>
      <OpcoesResposta
        key={`${uIdx}-${pIdx}`}
        opcoes={pergunta.opcoes}
        resposta={pergunta.resposta}
        chave={pergunta.pergunta}
        escolhida={escolhida}
        verificado={verificado}
        aoEscolher={definirEscolhida}
      />
      <details className={estilos.rever}>
        <summary>
          <Icone nome={unidade.icone} tamanho={18} />
          {unidade.rever}
        </summary>
        <div className={estilos.reverCorpo}>{unidade.material}</div>
      </details>
    </MolduraPratica>
  );
}
