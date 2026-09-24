import { useEffect, useRef, useState } from "react";

import { CartaoGuiado } from "@/components/guiado/CartaoGuiado";
import { MolduraGuiado, type AcaoGuiado } from "@/components/guiado/MolduraGuiado";
import { useEntrarEmTelaImersiva } from "@/hooks/TelaImersiva";
import { rotas } from "@/lib/rotas";
import { MouseDesenho, type ParteMouse } from "./MouseDesenho";

const ACENTO = "#3d5bd9";

/** Linguagem literal: o que a parte é e o que acontece quando se usa — sem comparação. */
const PARTES: Record<ParteMouse, { nome: string; funcao: string }> = {
  esquerdo: {
    nome: "Botão esquerdo",
    funcao: "Você aperta esse botão para escolher e para abrir as coisas na tela. É o botão que você mais usa.",
  },
  direito: {
    nome: "Botão direito",
    funcao: "Você aperta esse botão para abrir um menu com mais opções.",
  },
  rodinha: {
    nome: "Rodinha",
    funcao: "Você gira a rodinha com o dedo para subir e descer a tela.",
  },
};

const PERGUNTAS: { pergunta: string; resposta: ParteMouse }[] = [
  { pergunta: "Clique no botão que você usa para abrir as coisas na tela.", resposta: "esquerdo" },
  { pergunta: "Clique na parte que você gira para descer a tela.", resposta: "rodinha" },
  { pergunta: "Clique no botão que abre um menu com mais opções.", resposta: "direito" },
];

const TOTAL_PARTES = Object.keys(PARTES).length;
const TOTAL = TOTAL_PARTES + PERGUNTAS.length;

type Tela = { tipo: "inicio" } | { tipo: "descobrir" } | { tipo: "pergunta"; indice: number } | { tipo: "fim" };

export function OQueEOMouseJogo() {
  useEntrarEmTelaImersiva();

  const [tela, definirTela] = useState<Tela>({ tipo: "inicio" });
  const [encontradas, definirEncontradas] = useState<Set<ParteMouse>>(new Set());
  const [ultima, definirUltima] = useState<ParteMouse | null>(null);
  const [resposta, definirResposta] = useState<{ parte: ParteMouse; certa: boolean } | null>(null);
  const [acertos, definirAcertos] = useState(0);
  const [aviso, definirAviso] = useState<string | null>(null);
  const [recompensa, definirRecompensa] = useState(0);
  const tituloRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    tituloRef.current?.focus();
  }, [tela]);

  function premiar() {
    definirRecompensa((atual) => atual + 1);
  }

  function irPara(proxima: Tela) {
    definirAviso(null);
    definirResposta(null);
    definirRecompensa(0);
    definirTela(proxima);
  }

  function descobrir(parte: ParteMouse) {
    definirAviso(null);
    definirUltima(parte);
    if (!encontradas.has(parte)) {
      definirEncontradas(new Set(encontradas).add(parte));
      premiar();
    }
  }

  function responder(parte: ParteMouse, indice: number) {
    definirAviso(null);
    const certa = parte === PERGUNTAS[indice].resposta;
    definirResposta({ parte, certa });
    if (certa && resposta?.certa !== true) {
      definirAcertos((atual) => Math.max(atual, indice + 1));
      premiar();
    }
  }

  function recomecar() {
    definirEncontradas(new Set());
    definirUltima(null);
    definirAcertos(0);
    irPara({ tipo: "inicio" });
  }

  let titulo: string;
  let texto: string | undefined;
  let desenho;
  let voltar: AcaoGuiado | undefined;
  let avancar: AcaoGuiado;

  if (tela.tipo === "inicio") {
    titulo = "O que é o Mouse?";
    texto = "O mouse é a peça que você segura com a mão para mexer a seta na tela. Vamos conhecer as partes dele.";
    desenho = <MouseDesenho interativo={false} />;
    avancar = { rotulo: "Começar", icone: "seta-direita", aoClicar: () => irPara({ tipo: "descobrir" }) };
  } else if (tela.tipo === "descobrir") {
    const faltam = TOTAL_PARTES - encontradas.size;
    if (aviso) {
      titulo = aviso;
      texto = "Clique nas partes do desenho do mouse.";
    } else if (ultima) {
      titulo = PARTES[ultima].nome;
      texto = PARTES[ultima].funcao;
    } else {
      titulo = "Clique em uma parte do mouse.";
      texto = "Você vai descobrir o nome dela e para que ela serve.";
    }
    desenho = <MouseDesenho interativo destacada={ultima} encontradas={encontradas} aoEscolher={descobrir} />;
    voltar = { rotulo: "Voltar", icone: "seta-esquerda", aoClicar: () => irPara({ tipo: "inicio" }) };
    avancar = {
      rotulo: "Próximo",
      icone: "seta-direita",
      aoClicar: () =>
        faltam > 0
          ? definirAviso(`Ainda falta descobrir ${faltam} ${faltam === 1 ? "parte" : "partes"}.`)
          : irPara({ tipo: "pergunta", indice: 0 }),
    };
  } else if (tela.tipo === "pergunta") {
    const indice = tela.indice;
    titulo = PERGUNTAS[indice].pergunta;
    texto = aviso
      ? aviso
      : resposta
        ? resposta.certa
          ? `Isso! Esse é o ${PARTES[resposta.parte].nome.toLowerCase()}.`
          : `Quase! Esse é o ${PARTES[resposta.parte].nome.toLowerCase()}. Tente de novo.`
        : undefined;
    desenho = (
      <MouseDesenho
        interativo
        destacada={resposta?.parte ?? null}
        aoEscolher={(parte) => responder(parte, indice)}
      />
    );
    voltar = {
      rotulo: "Voltar",
      icone: "seta-esquerda",
      aoClicar: () => irPara(indice === 0 ? { tipo: "descobrir" } : { tipo: "pergunta", indice: indice - 1 }),
    };
    avancar = {
      rotulo: indice === PERGUNTAS.length - 1 ? "Terminar" : "Próximo",
      icone: "seta-direita",
      aoClicar: () =>
        resposta?.certa
          ? irPara(indice + 1 < PERGUNTAS.length ? { tipo: "pergunta", indice: indice + 1 } : { tipo: "fim" })
          : definirAviso("Primeiro, clique na parte certa do desenho."),
    };
  } else {
    titulo = "Muito bem! Você conhece o mouse.";
    texto = "Você descobriu as 3 partes e acertou as 3 perguntas.";
    desenho = <MouseDesenho interativo={false} encontradas={new Set(Object.keys(PARTES) as ParteMouse[])} />;
    voltar = { rotulo: "Jogar de novo", icone: "recomecar", aoClicar: recomecar };
    avancar = { rotulo: "Escolher outra", icone: "seta-direita", para: rotas.guiado() };
  }

  const progressoAtual =
    tela.tipo === "fim" ? TOTAL : tela.tipo === "inicio" ? 0 : encontradas.size + acertos;

  return (
    <MolduraGuiado
      titulo="O que é o Mouse?"
      sairPara={rotas.guiado()}
      acento={ACENTO}
      progresso={{
        texto: tela.tipo === "fim" ? "Terminou" : tela.tipo === "inicio" ? `${TOTAL} desafios` : `${progressoAtual} de ${TOTAL}`,
        atual: progressoAtual,
        total: TOTAL,
      }}
      recompensa={tela.tipo === "fim" ? 0 : recompensa}
      voltar={voltar}
      avancar={avancar}
    >
      <CartaoGuiado visual={desenho} titulo={titulo} tituloRef={tituloRef} texto={texto} />
    </MolduraGuiado>
  );
}
