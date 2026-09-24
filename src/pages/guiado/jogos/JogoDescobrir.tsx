import { useEffect, useRef, useState, type ReactNode } from "react";

import { CartaoGuiado } from "@/components/guiado/CartaoGuiado";
import { MolduraGuiado, type AcaoGuiado } from "@/components/guiado/MolduraGuiado";
import { useEntrarEmTelaImersiva } from "@/hooks/TelaImersiva";
import { rotas } from "@/lib/rotas";

export interface InfoParte {
  nome: string;
  /** Nome com artigo, para "Isso! Esse é o monitor." */
  comArtigo: string;
  funcao: string;
}

export interface JogoDescobrirConfig<T extends string> {
  titulo: string;
  acento: string;
  abertura: string;
  partes: Record<T, InfoParte>;
  /** "parte"/"partes", "peça"/"peças": como o jogo chama o que se descobre. */
  palavra: { singular: string; plural: string };
  perguntas: { pergunta: string; resposta: T }[];
  fim: string;
  desenho: (estado: {
    interativo: boolean;
    destacada?: T | null;
    encontradas?: Set<T>;
    aoEscolher?: (parte: T) => void;
  }) => ReactNode;
}

type Tela = { tipo: "inicio" } | { tipo: "descobrir" } | { tipo: "pergunta"; indice: number } | { tipo: "fim" };

/**
 * Mecânica comum a Mouse, Peças do Computador e CPU e HD: primeiro a pessoa
 * clica em cada parte do desenho para descobrir o nome e para que serve;
 * depois responde perguntas clicando na parte certa. Errar só mostra
 * "Quase!" — sem ponto perdido, sem limite de tentativas.
 */
export function JogoDescobrir<T extends string>({
  titulo: tituloJogo,
  acento,
  abertura,
  partes,
  palavra,
  perguntas,
  fim,
  desenho,
}: JogoDescobrirConfig<T>) {
  useEntrarEmTelaImersiva();

  const ids = Object.keys(partes) as T[];
  const totalPartes = ids.length;
  const total = totalPartes + perguntas.length;

  const [tela, definirTela] = useState<Tela>({ tipo: "inicio" });
  const [encontradas, definirEncontradas] = useState<Set<T>>(new Set());
  const [ultima, definirUltima] = useState<T | null>(null);
  const [resposta, definirResposta] = useState<{ parte: T; certa: boolean } | null>(null);
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

  function descobrir(parte: T) {
    definirAviso(null);
    definirUltima(parte);
    if (!encontradas.has(parte)) {
      definirEncontradas(new Set(encontradas).add(parte));
      premiar();
    }
  }

  function responder(parte: T, indice: number) {
    definirAviso(null);
    const certa = parte === perguntas[indice].resposta;
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
  let visual: ReactNode;
  let voltar: AcaoGuiado | undefined;
  let avancar: AcaoGuiado;

  if (tela.tipo === "inicio") {
    titulo = tituloJogo;
    texto = abertura;
    visual = desenho({ interativo: false });
    avancar = { rotulo: "Começar", icone: "seta-direita", aoClicar: () => irPara({ tipo: "descobrir" }) };
  } else if (tela.tipo === "descobrir") {
    const faltam = totalPartes - encontradas.size;
    if (aviso) {
      titulo = aviso;
      texto = `Clique nas ${palavra.plural} do desenho.`;
    } else if (ultima) {
      titulo = partes[ultima].nome;
      texto = partes[ultima].funcao;
    } else {
      titulo = `Clique em uma ${palavra.singular} do desenho.`;
      texto = "Você vai descobrir o nome e para que serve.";
    }
    visual = desenho({ interativo: true, destacada: ultima, encontradas, aoEscolher: descobrir });
    voltar = { rotulo: "Voltar", icone: "seta-esquerda", aoClicar: () => irPara({ tipo: "inicio" }) };
    avancar = {
      rotulo: "Próximo",
      icone: "seta-direita",
      aoClicar: () =>
        faltam > 0
          ? definirAviso(`Ainda falta descobrir ${faltam} ${faltam === 1 ? palavra.singular : palavra.plural}.`)
          : irPara({ tipo: "pergunta", indice: 0 }),
    };
  } else if (tela.tipo === "pergunta") {
    const indice = tela.indice;
    titulo = perguntas[indice].pergunta;
    texto = aviso
      ? aviso
      : resposta
        ? resposta.certa
          ? `Isso! ${iniciar(partes[resposta.parte].comArtigo)}.`
          : `Quase! Aí é ${partes[resposta.parte].comArtigo}. Tente de novo.`
        : undefined;
    visual = desenho({
      interativo: true,
      destacada: resposta?.parte ?? null,
      aoEscolher: (parte) => responder(parte, indice),
    });
    voltar = {
      rotulo: "Voltar",
      icone: "seta-esquerda",
      aoClicar: () => irPara(indice === 0 ? { tipo: "descobrir" } : { tipo: "pergunta", indice: indice - 1 }),
    };
    avancar = {
      rotulo: indice === perguntas.length - 1 ? "Terminar" : "Próximo",
      icone: "seta-direita",
      aoClicar: () =>
        resposta?.certa
          ? irPara(indice + 1 < perguntas.length ? { tipo: "pergunta", indice: indice + 1 } : { tipo: "fim" })
          : definirAviso("Primeiro, clique na parte certa do desenho."),
    };
  } else {
    titulo = fim;
    texto = `Você descobriu ${totalPartes} ${palavra.plural} e acertou ${perguntas.length} perguntas.`;
    visual = desenho({ interativo: false, encontradas: new Set(ids) });
    voltar = { rotulo: "Jogar de novo", icone: "recomecar", aoClicar: recomecar };
    avancar = { rotulo: "Escolher outra", icone: "seta-direita", para: rotas.guiado() };
  }

  const progressoAtual = tela.tipo === "fim" ? total : tela.tipo === "inicio" ? 0 : encontradas.size + acertos;

  return (
    <MolduraGuiado
      titulo={tituloJogo}
      sairPara={rotas.guiado()}
      acento={acento}
      progresso={{
        texto: tela.tipo === "fim" ? "Terminou" : tela.tipo === "inicio" ? `${total} desafios` : `${progressoAtual} de ${total}`,
        atual: progressoAtual,
        total,
      }}
      recompensa={tela.tipo === "fim" ? 0 : recompensa}
      voltar={voltar}
      avancar={avancar}
    >
      <CartaoGuiado visual={visual} titulo={titulo} tituloRef={tituloRef} texto={texto} />
    </MolduraGuiado>
  );
}

/** "o monitor" → "Esse é o monitor"; "a CPU" → "Essa é a CPU". */
function iniciar(comArtigo: string) {
  return comArtigo.startsWith("a ") ? `Essa é ${comArtigo}` : `Esse é ${comArtigo}`;
}
