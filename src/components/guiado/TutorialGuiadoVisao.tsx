import { useEffect, useMemo, useRef, useState } from "react";

import type { NomeIcone } from "@/components/Icone";
import { tocarSomRecompensa } from "@/lib/somRecompensa";
import type { AtividadeAutocorrigida, PassoGuiado } from "@/types/atividadeAutocorrigida";
import { CartaoGuiado, VisualIcone, VisualImagem } from "./CartaoGuiado";
import { MolduraGuiado, type AcaoGuiado } from "./MolduraGuiado";

interface Props {
  atividade: AtividadeAutocorrigida;
  icone: NomeIcone;
  acento: string;
  sairPara: string;
}

type Tela = { tipo: "inicio" } | { tipo: "passo"; indice: number } | { tipo: "fim" };

/** Tela de execução de um tutorial: um micro-passo por vez, com recompensa a cada passo concluído. */
export function TutorialGuiadoVisao({ atividade, icone, acento, sairPara }: Props) {
  const sequencia = useMemo(
    () =>
      atividade.itens.flatMap((item, indiceItem) =>
        (item.passosGuiados ?? []).map((passo: PassoGuiado) => ({
          passo,
          parte: item.titulo,
          numeroParte: indiceItem + 1,
        })),
      ),
    [atividade],
  );
  const total = sequencia.length;
  const totalPartes = atividade.itens.length;

  const [tela, definirTela] = useState<Tela>({ tipo: "inicio" });
  const [recompensa, definirRecompensa] = useState(0);
  const tituloRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    tituloRef.current?.focus();
  }, [tela]);

  function avancarPasso(indice: number) {
    tocarSomRecompensa();
    definirRecompensa((atual) => atual + 1);
    definirTela(indice + 1 < total ? { tipo: "passo", indice: indice + 1 } : { tipo: "fim" });
  }

  function voltarPasso(indice: number) {
    definirRecompensa(0);
    definirTela(indice === 0 ? { tipo: "inicio" } : { tipo: "passo", indice: indice - 1 });
  }

  function recomecar() {
    definirRecompensa(0);
    definirTela({ tipo: "inicio" });
  }

  let conteudo;
  let voltar: AcaoGuiado | undefined;
  let avancar: AcaoGuiado;
  let progresso;

  if (tela.tipo === "inicio") {
    conteudo = (
      <CartaoGuiado
        visual={<VisualIcone icone={icone} />}
        titulo={atividade.titulo}
        tituloRef={tituloRef}
        texto={atividade.introducao}
      />
    );
    avancar = { rotulo: "Começar", icone: "seta-direita", aoClicar: () => definirTela({ tipo: "passo", indice: 0 }) };
    progresso = { texto: `${total} passos`, atual: 0, total };
  } else if (tela.tipo === "passo") {
    const { passo, parte, numeroParte } = sequencia[tela.indice];
    const indice = tela.indice;
    conteudo = (
      <CartaoGuiado
        visual={passo.imagem ? <VisualImagem url={passo.imagem.url} alt={passo.imagem.alt} /> : <VisualIcone icone={icone} />}
        etiqueta={totalPartes > 1 ? `Parte ${numeroParte} de ${totalPartes} · ${parte}` : parte}
        numero={indice + 1}
        titulo={passo.texto}
        tituloRef={tituloRef}
        narracao={passo.textoNarrado}
      />
    );
    voltar = { rotulo: "Voltar", icone: "seta-esquerda", aoClicar: () => voltarPasso(indice) };
    avancar = {
      rotulo: indice === total - 1 ? "Terminar" : "Próximo",
      icone: "seta-direita",
      aoClicar: () => avancarPasso(indice),
    };
    progresso = { texto: `Passo ${indice + 1} de ${total}`, atual: indice, total };
  } else {
    conteudo = (
      <CartaoGuiado
        visual={<VisualIcone icone="estrela" destaque />}
        titulo="Muito bem! Você terminou."
        tituloRef={tituloRef}
        texto={`Você fez os ${total} passos e ganhou ${total} estrelas.`}
      />
    );
    voltar = { rotulo: "Fazer de novo", icone: "recomecar", aoClicar: recomecar };
    avancar = { rotulo: "Escolher outra", icone: "seta-direita", para: sairPara };
    progresso = { texto: "Terminou", atual: total, total };
  }

  return (
    <MolduraGuiado
      titulo={atividade.titulo}
      sairPara={sairPara}
      acento={acento}
      progresso={progresso}
      recompensa={tela.tipo === "passo" ? recompensa : 0}
      voltar={voltar}
      avancar={avancar}
    >
      {conteudo}
    </MolduraGuiado>
  );
}
