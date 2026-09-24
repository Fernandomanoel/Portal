import { useEffect, useState } from "react";

import { respostaEscritaCerta, tituloDoResultado } from "@/lib/ingles";
import type { AtividadeIngles, ExercicioIngles } from "@/types/ingles";
import { CampoResposta } from "./CampoResposta";
import { ControlesAudio } from "./ControlesAudio";
import type { HumorGabi } from "./Gabi";
import { MolduraPratica } from "./MolduraPratica";
import { OpcoesResposta } from "./OpcoesResposta";
import { RodapeResposta } from "./RodapeResposta";
import { TelaAbertura, TelaResultado } from "./TelasPratica";
import estilos from "./ExerciciosIngles.module.css";

const PONTOS_POR_ACERTO = 15;
const ELOGIOS = ["Você acertou!", "Isso mesmo, acertou!", "Certíssimo!"];

const ENUNCIADO: Record<ExercicioIngles["tipo"], string> = {
  "ouvir-multipla": "Ouça e escolha o que você entendeu",
  "ouvir-escrever": "Ouça e escreva em inglês o que você ouviu",
  "ler-multipla": "Leia e escolha a tradução certa",
  traduzir: "Como se diz isso em inglês?",
};

const ETIQUETA = {
  "ouvir-multipla": { icone: "som", texto: "Audição" },
  "ouvir-escrever": { icone: "som", texto: "Audição e escrita" },
  "ler-multipla": { icone: "livro", texto: "Leitura" },
  traduzir: { icone: "lapis", texto: "Escrita" },
} as const;

type Fase = { tipo: "abertura" } | { tipo: "fazendo"; indice: number } | { tipo: "resultado" };

interface Props {
  atividade: AtividadeIngles;
  exercicios: ExercicioIngles[];
}

/** "Ouça e Leia": um exercício por vez, corrigido na hora, com a Gabi reagindo. */
export function ExerciciosIngles({ atividade, exercicios }: Props) {
  const total = exercicios.length;
  const [fase, definirFase] = useState<Fase>({ tipo: "abertura" });
  const [escolhida, definirEscolhida] = useState<number | null>(null);
  const [texto, definirTexto] = useState("");
  const [acertou, definirAcertou] = useState<boolean | null>(null);
  const [acertos, definirAcertos] = useState(0);

  const indice = fase.tipo === "fazendo" ? fase.indice : 0;
  const exercicio = exercicios[indice];
  const escrita = exercicio.tipo === "ouvir-escrever" || exercicio.tipo === "traduzir";
  const verificado = acertou !== null;
  const podeVerificar = !verificado && (escrita ? texto.trim() !== "" : escolhida !== null);

  function comecar() {
    definirAcertos(0);
    irPara(0);
  }

  function irPara(proximo: number) {
    definirEscolhida(null);
    definirTexto("");
    definirAcertou(null);
    definirFase(proximo < total ? { tipo: "fazendo", indice: proximo } : { tipo: "resultado" });
  }

  function verificar() {
    if (!podeVerificar) return;
    const certo =
      exercicio.tipo === "ouvir-escrever" || exercicio.tipo === "traduzir"
        ? respostaEscritaCerta(texto, exercicio.respostas)
        : escolhida === exercicio.resposta;
    definirAcertou(certo);
    if (certo) definirAcertos((n) => n + 1);
  }

  const continuar = () => irPara(indice + 1);

  // Teclado: 1, 2, 3 escolhem a opção; Enter verifica e depois continua.
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
    return (
      <MolduraPratica titulo={atividade.titulo} acento={atividade.cor} humor="neutra">
        <TelaAbertura
          titulo={atividade.abertura.titulo}
          texto={atividade.abertura.texto}
          resumo={[`${total} exercícios`, "Audição", "Leitura", "Escrita"]}
          aoComecar={comecar}
        />
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
  const respostaCerta =
    exercicio.tipo === "ouvir-escrever" || exercicio.tipo === "traduzir" ? exercicio.respostas[0] : exercicio.opcoes[exercicio.resposta];

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
                  detalhe: escrita ? (
                    <>
                      Você escreveu: <b lang="en">{texto}</b>
                      <br />
                      Resposta certa: <b lang="en">{respostaCerta}</b>
                    </>
                  ) : (
                    <>
                      {acertou ? "A resposta era: " : "A resposta certa é: "}
                      <b>{respostaCerta}</b>
                    </>
                  ),
                }
              : null
          }
        />
      }
    >
      <h1 className={estilos.enunciado}>{ENUNCIADO[exercicio.tipo]}</h1>

      {(exercicio.tipo === "ouvir-multipla" || exercicio.tipo === "ouvir-escrever") && (
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

      {exercicio.tipo === "ouvir-multipla" || exercicio.tipo === "ler-multipla" ? (
        <OpcoesResposta
          key={indice}
          opcoes={exercicio.opcoes}
          resposta={exercicio.resposta}
          chave={exercicio.frase}
          escolhida={escolhida}
          verificado={verificado}
          aoEscolher={definirEscolhida}
          idioma="pt-BR"
        />
      ) : (
        <CampoResposta key={indice} valor={texto} aoMudar={definirTexto} verificado={verificado} acertou={!!acertou} />
      )}
    </MolduraPratica>
  );
}
