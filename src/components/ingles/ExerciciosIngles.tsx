import { useEffect, useState } from "react";

import { normalizarResposta, respostaEscritaCerta, tituloDoResultado } from "@/lib/ingles";
import type { AtividadeIngles, ExercicioIngles, ItemVocabulario } from "@/types/ingles";
import { CampoResposta } from "./CampoResposta";
import { ControlesAudio } from "./ControlesAudio";
import { FiguraIngles } from "./FiguraIngles";
import type { HumorGabi } from "./Gabi";
import { MolduraPratica } from "./MolduraPratica";
import { MontarFrase } from "./MontarFrase";
import { OpcoesFiguras } from "./OpcoesFiguras";
import { OpcoesResposta } from "./OpcoesResposta";
import { RodapeResposta } from "./RodapeResposta";
import { TelaAbertura, TelaResultado } from "./TelasPratica";
import { VocabularioIlustrado } from "./VocabularioIlustrado";
import estilos from "./ExerciciosIngles.module.css";

const PONTOS_POR_ACERTO = 15;
const ELOGIOS = ["Você acertou!", "Isso mesmo, acertou!", "Certíssimo!"];

type TipoExercicio = ExercicioIngles["tipo"];

const ENUNCIADO: Record<TipoExercicio, string> = {
  "ouvir-multipla": "Ouça e escolha o que você entendeu",
  "ouvir-escrever": "Ouça e escreva em inglês o que você ouviu",
  "ler-multipla": "Leia e escolha a tradução certa",
  traduzir: "Como se diz isso em inglês?",
  "imagem-multipla": "O que é isso? Escolha em inglês",
  "imagem-escrever": "Escreva em inglês o nome do desenho",
  "ouvir-imagem": "Ouça e toque no desenho certo",
  ordenar: "Monte a frase em inglês",
};

const ETIQUETA = {
  "ouvir-multipla": { icone: "som", texto: "Audição" },
  "ouvir-escrever": { icone: "som", texto: "Audição e escrita" },
  "ler-multipla": { icone: "livro", texto: "Leitura" },
  traduzir: { icone: "lapis", texto: "Escrita" },
  "imagem-multipla": { icone: "imagem", texto: "Imagem" },
  "imagem-escrever": { icone: "imagem", texto: "Imagem e escrita" },
  "ouvir-imagem": { icone: "som", texto: "Audição e imagem" },
  ordenar: { icone: "blocos", texto: "Montar frase" },
} as const;

/** Habilidade de cada tipo, para o resumo da tela de abertura. */
const HABILIDADE: Record<TipoExercicio, string> = {
  "ouvir-multipla": "Audição",
  "ouvir-escrever": "Audição",
  "ouvir-imagem": "Audição",
  "ler-multipla": "Leitura",
  traduzir: "Escrita",
  "imagem-escrever": "Escrita",
  "imagem-multipla": "Imagens",
  ordenar: "Montar frases",
};

function ehEscrita(exercicio: ExercicioIngles) {
  return exercicio.tipo === "ouvir-escrever" || exercicio.tipo === "traduzir" || exercicio.tipo === "imagem-escrever";
}

function respostaCerta(exercicio: ExercicioIngles): string {
  switch (exercicio.tipo) {
    case "ouvir-escrever":
    case "traduzir":
    case "imagem-escrever":
      return exercicio.respostas[0];
    case "ouvir-imagem":
      return exercicio.frase;
    case "ordenar":
      return exercicio.palavras.join(" ");
    default:
      return exercicio.opcoes[exercicio.resposta];
  }
}

type Fase = { tipo: "abertura" } | { tipo: "vocabulario" } | { tipo: "fazendo"; indice: number } | { tipo: "resultado" };

interface Props {
  atividade: AtividadeIngles;
  exercicios: ExercicioIngles[];
  vocabulario?: ItemVocabulario[];
}

/** Exercícios um por vez, corrigidos na hora, com a Gabi reagindo. */
export function ExerciciosIngles({ atividade, exercicios, vocabulario }: Props) {
  const total = exercicios.length;
  const [fase, definirFase] = useState<Fase>({ tipo: "abertura" });
  const [escolhida, definirEscolhida] = useState<number | null>(null);
  const [texto, definirTexto] = useState("");
  const [montada, definirMontada] = useState<number[]>([]);
  const [acertou, definirAcertou] = useState<boolean | null>(null);
  const [acertos, definirAcertos] = useState(0);

  const indice = fase.tipo === "fazendo" ? fase.indice : 0;
  const exercicio = exercicios[indice];
  const escrita = ehEscrita(exercicio);
  const verificado = acertou !== null;
  const podeVerificar =
    !verificado && (escrita ? texto.trim() !== "" : exercicio.tipo === "ordenar" ? montada.length > 0 : escolhida !== null);
  const fichas = exercicio.tipo === "ordenar" ? [...exercicio.palavras, ...(exercicio.extras ?? [])] : [];

  function comecar() {
    definirAcertos(0);
    irPara(0);
  }

  function irPara(proximo: number) {
    definirEscolhida(null);
    definirTexto("");
    definirMontada([]);
    definirAcertou(null);
    definirFase(proximo < total ? { tipo: "fazendo", indice: proximo } : { tipo: "resultado" });
  }

  function verificar() {
    if (!podeVerificar) return;
    let certo: boolean;
    if (exercicio.tipo === "ouvir-escrever" || exercicio.tipo === "traduzir" || exercicio.tipo === "imagem-escrever") {
      certo = respostaEscritaCerta(texto, exercicio.respostas);
    } else if (exercicio.tipo === "ordenar") {
      // Compara o texto, não os índices: palavra repetida ("the ... the") vale em qualquer das duas fichas.
      certo = normalizarResposta(montada.map((i) => fichas[i]).join(" ")) === normalizarResposta(exercicio.palavras.join(" "));
    } else {
      certo = escolhida === exercicio.resposta;
    }
    definirAcertou(certo);
    if (certo) definirAcertos((n) => n + 1);
  }

  const continuar = () => irPara(indice + 1);

  // Teclado: 1 a 9 escolhem a opção; Enter verifica e depois continua.
  useEffect(() => {
    if (fase.tipo !== "fazendo") return;
    const aoTeclar = (evento: KeyboardEvent) => {
      const alvo = evento.target as HTMLElement;
      // Botão comum já age sozinho no Enter; a opção marcada, não: ali o Enter verifica.
      if (evento.key === "Enter" && (alvo.tagName !== "BUTTON" || alvo.getAttribute("role") === "radio")) {
        evento.preventDefault();
        if (verificado) continuar();
        else verificar();
        return;
      }
      if (!escrita && !verificado && /^[1-9]$/.test(evento.key) && alvo.tagName !== "INPUT") {
        const botoes = document.querySelectorAll<HTMLButtonElement>("[role=radio]");
        botoes[Number(evento.key) - 1]?.click();
      }
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  });

  if (fase.tipo === "abertura") {
    const habilidades = [...new Set(exercicios.map((e) => HABILIDADE[e.tipo]))];
    return (
      <MolduraPratica titulo={atividade.titulo} acento={atividade.cor} humor="neutra">
        <TelaAbertura
          titulo={atividade.abertura.titulo}
          texto={atividade.abertura.texto}
          resumo={[...(vocabulario ? [`${vocabulario.length} palavras novas`] : []), `${total} exercícios`, ...habilidades]}
          aoComecar={() => (vocabulario ? definirFase({ tipo: "vocabulario" }) : comecar())}
        />
      </MolduraPratica>
    );
  }

  if (fase.tipo === "vocabulario" && vocabulario) {
    return (
      <MolduraPratica titulo={atividade.titulo} acento={atividade.cor} humor="explicando">
        <VocabularioIlustrado itens={vocabulario} aoComecar={comecar} />
      </MolduraPratica>
    );
  }

  if (fase.tipo === "resultado") {
    const final = tituloDoResultado(acertos, total, ["Mandou muito bem!", "Bom treino!", "Vamos praticar mais uma vez?"]);
    return (
      <MolduraPratica titulo={atividade.titulo} acento={atividade.cor} humor={final.humor} progresso={{ atual: total, total }} pontos={acertos * PONTOS_POR_ACERTO}>
        <TelaResultado titulo={final.titulo} acertos={acertos} total={total} pontos={acertos * PONTOS_POR_ACERTO} aoRecomecar={comecar} />
      </MolduraPratica>
    );
  }

  const humor: HumorGabi = verificado ? (acertou ? "acertou" : "errou") : "explicando";
  const certa = respostaCerta(exercicio);

  let detalhe;
  if (escrita) {
    detalhe = (
      <>
        Você escreveu: <b lang="en">{texto}</b>
        <br />
        Resposta certa: <b lang="en">{certa}</b>
      </>
    );
  } else if (exercicio.tipo === "ordenar") {
    detalhe = (
      <>
        {acertou ? "A frase é: " : "A frase certa é: "}
        <b lang="en">{certa}</b>
      </>
    );
  } else if (exercicio.tipo === "ouvir-imagem") {
    detalhe = (
      <>
        Você ouviu: <b lang="en">{certa}</b>
      </>
    );
  } else {
    detalhe = (
      <>
        {acertou ? "A resposta era: " : "A resposta certa é: "}
        <b>{certa}</b>
      </>
    );
  }

  return (
    <MolduraPratica
      titulo={atividade.titulo}
      acento={atividade.cor}
      humor={humor}
      etiqueta={ETIQUETA[exercicio.tipo]}
      progresso={{ atual: indice, total }}
      pontos={acertos * PONTOS_POR_ACERTO}
      rodape={
        <RodapeResposta
          podeVerificar={podeVerificar}
          ultimo={indice === total - 1}
          aoVerificar={verificar}
          aoContinuar={continuar}
          resultado={
            verificado
              ? {
                  acertou: !!acertou,
                  titulo: acertou ? ELOGIOS[indice % ELOGIOS.length] : "Você errou — vamos praticar mais.",
                  detalhe: exercicio.explicacao ? (
                    <>
                      {detalhe}
                      <br />
                      {exercicio.explicacao}
                    </>
                  ) : (
                    detalhe
                  ),
                }
              : null
          }
        />
      }
    >
      <h1 className={estilos.enunciado}>{ENUNCIADO[exercicio.tipo]}</h1>

      {(exercicio.tipo === "ouvir-multipla" || exercicio.tipo === "ouvir-escrever" || exercicio.tipo === "ouvir-imagem") && (
        <div className={estilos.estimuloAudio}>
          <ControlesAudio key={indice} texto={exercicio.frase} tocarAoAbrir />
          <p className={estilos.dica}>Ouça quantas vezes quiser.</p>
        </div>
      )}

      {exercicio.tipo === "ler-multipla" && (
        <div className={estilos.estimuloTexto}>
          <p className={estilos.frase} lang="en">
            {exercicio.frase}
          </p>
          <ControlesAudio key={indice} texto={exercicio.frase} tamanho="compacto" />
        </div>
      )}

      {exercicio.tipo === "traduzir" && (
        <p className={estilos.traduzir}>
          <span className={estilos.aspas} aria-hidden="true">
            “
          </span>
          {exercicio.prompt}
        </p>
      )}

      {(exercicio.tipo === "imagem-multipla" || exercicio.tipo === "imagem-escrever") && (
        <div className={estilos.quadro}>
          <FiguraIngles nome={exercicio.figura} descricao="Desenho para você dizer o nome em inglês" className={estilos.quadroFigura} />
          {verificado && <ControlesAudio key={indice} texto={certa} tamanho="compacto" />}
        </div>
      )}

      {exercicio.tipo === "ordenar" && (
        <div className={estilos.estimuloOrdenar}>
          <p className={estilos.traduzir}>
            <span className={estilos.aspas} aria-hidden="true">
              “
            </span>
            {exercicio.traducao}
          </p>
          {exercicio.dica && <p className={estilos.dica}>{exercicio.dica}</p>}
          {verificado && <ControlesAudio key={indice} texto={certa} tamanho="compacto" />}
        </div>
      )}

      {exercicio.tipo === "ouvir-multipla" || exercicio.tipo === "ler-multipla" || exercicio.tipo === "imagem-multipla" ? (
        <OpcoesResposta
          key={indice}
          opcoes={exercicio.opcoes}
          resposta={exercicio.resposta}
          chave={exercicio.tipo === "imagem-multipla" ? `${exercicio.figura}-${indice}` : exercicio.frase}
          escolhida={escolhida}
          verificado={verificado}
          aoEscolher={definirEscolhida}
          idioma={exercicio.tipo === "imagem-multipla" ? "en" : "pt-BR"}
        />
      ) : exercicio.tipo === "ouvir-imagem" ? (
        <OpcoesFiguras
          key={indice}
          figuras={exercicio.figuras}
          resposta={exercicio.resposta}
          chave={exercicio.frase}
          escolhida={escolhida}
          verificado={verificado}
          aoEscolher={definirEscolhida}
        />
      ) : exercicio.tipo === "ordenar" ? (
        <MontarFrase
          key={indice}
          fichas={fichas}
          chave={exercicio.traducao}
          montada={montada}
          aoMudar={definirMontada}
          verificado={verificado}
          acertou={!!acertou}
        />
      ) : (
        <CampoResposta key={indice} valor={texto} aoMudar={definirTexto} verificado={verificado} acertou={!!acertou} />
      )}
    </MolduraPratica>
  );
}
