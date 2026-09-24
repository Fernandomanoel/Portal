import { useEffect, useRef, useState, type ReactNode } from "react";

import { CartaoGuiado } from "@/components/guiado/CartaoGuiado";
import { MolduraGuiado, type AcaoGuiado } from "@/components/guiado/MolduraGuiado";
import { useEntrarEmTelaImersiva } from "@/hooks/TelaImersiva";
import { rotas } from "@/lib/rotas";
import { ItemDesenho, type NomeItem } from "./ItensDesenho";
import estilos from "./PecaOuProgramaJogo.module.css";

type Tipo = "peca" | "programa";

const ESCOLHAS: { tipo: Tipo; nome: string; dica: string }[] = [
  { tipo: "peca", nome: "Peça", dica: "Você pega com a mão" },
  { tipo: "programa", nome: "Programa", dica: "Você só vê na tela" },
];

const ITENS: { item: NomeItem; nome: string; comArtigo: string; tipo: Tipo; explicacao: string }[] = [
  { item: "mouse", nome: "Mouse", comArtigo: "O mouse", tipo: "peca", explicacao: "Você segura o mouse com a mão." },
  { item: "jogo", nome: "Jogo", comArtigo: "O jogo", tipo: "programa", explicacao: "O jogo aparece na tela. Você não pega o jogo com a mão." },
  { item: "teclado", nome: "Teclado", comArtigo: "O teclado", tipo: "peca", explicacao: "Você aperta as teclas com os dedos." },
  { item: "word", nome: "Word", comArtigo: "O Word", tipo: "programa", explicacao: "O Word aparece na tela para você escrever." },
  { item: "impressora", nome: "Impressora", comArtigo: "A impressora", tipo: "peca", explicacao: "A impressora fica em cima da mesa. Você pega a folha que sai dela." },
  { item: "calculadora", nome: "Calculadora do Windows", comArtigo: "A calculadora do Windows", tipo: "programa", explicacao: "Essa calculadora aparece na tela. Você clica nos números com o mouse." },
  { item: "caixaDeSom", nome: "Caixa de som", comArtigo: "A caixa de som", tipo: "peca", explicacao: "A caixa de som fica em cima da mesa e toca o som." },
  { item: "navegador", nome: "Navegador de internet", comArtigo: "O navegador", tipo: "programa", explicacao: "O navegador aparece na tela para abrir sites." },
];

const NOME_TIPO: Record<Tipo, string> = { peca: "peça", programa: "programa" };
const TOTAL = ITENS.length;
const INTRODUCAO =
  "O computador tem peças e programas. Peça é o que você pega com a mão. O nome disso é hardware. Programa é o que você só vê na tela. O nome disso é software.";

type Tela = { tipo: "inicio" } | { tipo: "item"; indice: number } | { tipo: "fim" };

export function PecaOuProgramaJogo() {
  useEntrarEmTelaImersiva();

  const [tela, definirTela] = useState<Tela>({ tipo: "inicio" });
  const [escolha, definirEscolha] = useState<Tipo | null>(null);
  const [acertos, definirAcertos] = useState(0);
  const [aviso, definirAviso] = useState<string | null>(null);
  const [recompensa, definirRecompensa] = useState(0);
  const tituloRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    tituloRef.current?.focus();
  }, [tela]);

  function irPara(proxima: Tela) {
    definirEscolha(null);
    definirAviso(null);
    definirRecompensa(0);
    definirTela(proxima);
  }

  function escolher(tipo: Tipo, indice: number) {
    definirAviso(null);
    definirEscolha(tipo);
    if (tipo === ITENS[indice].tipo && escolha !== ITENS[indice].tipo) {
      definirAcertos((atual) => Math.max(atual, indice + 1));
      definirRecompensa((atual) => atual + 1);
    }
  }

  let titulo: string;
  let texto: string | undefined;
  let visual: ReactNode;
  let voltar: AcaoGuiado | undefined;
  let avancar: AcaoGuiado;

  if (tela.tipo === "inicio") {
    titulo = "Peça ou Programa?";
    texto = INTRODUCAO;
    visual = <ItemDesenho item="mouse" descricao="Desenho de um mouse" />;
    avancar = { rotulo: "Começar", icone: "seta-direita", aoClicar: () => irPara({ tipo: "item", indice: 0 }) };
  } else if (tela.tipo === "item") {
    const indice = tela.indice;
    const atual = ITENS[indice];
    const certa = escolha === atual.tipo;
    titulo = `${atual.nome}: peça ou programa?`;
    texto = aviso
      ? aviso
      : escolha === null
        ? "Clique em Peça ou em Programa."
        : certa
          ? `Isso! ${atual.comArtigo} é ${NOME_TIPO[atual.tipo]}. ${atual.explicacao}`
          : `Quase! ${atual.explicacao} Tente de novo.`;
    visual = (
      <div className={estilos.visual}>
        <ItemDesenho item={atual.item} descricao={`Desenho: ${atual.nome}`} />
        <div className={estilos.escolhas}>
          {ESCOLHAS.map(({ tipo, nome, dica }) => (
            <button
              key={tipo}
              type="button"
              className={[
                estilos.escolha,
                escolha === tipo ? (certa ? estilos.certa : estilos.errada) : "",
              ].join(" ")}
              aria-pressed={escolha === tipo}
              onClick={() => escolher(tipo, indice)}
            >
              <span className={estilos.escolhaNome}>{nome}</span>
              <span className={estilos.escolhaDica}>{dica}</span>
            </button>
          ))}
        </div>
      </div>
    );
    voltar = {
      rotulo: "Voltar",
      icone: "seta-esquerda",
      aoClicar: () => irPara(indice === 0 ? { tipo: "inicio" } : { tipo: "item", indice: indice - 1 }),
    };
    avancar = {
      rotulo: indice === TOTAL - 1 ? "Terminar" : "Próximo",
      icone: "seta-direita",
      aoClicar: () =>
        certa
          ? irPara(indice + 1 < TOTAL ? { tipo: "item", indice: indice + 1 } : { tipo: "fim" })
          : definirAviso("Primeiro, clique na resposta certa: Peça ou Programa."),
    };
  } else {
    titulo = "Muito bem! Você sabe o que é peça e o que é programa.";
    texto = `Você acertou os ${TOTAL} desenhos. Peça você pega com a mão. Programa você só vê na tela.`;
    visual = <ItemDesenho item="navegador" descricao="Desenho de um programa aberto na tela" />;
    voltar = {
      rotulo: "Jogar de novo",
      icone: "recomecar",
      aoClicar: () => {
        definirAcertos(0);
        irPara({ tipo: "inicio" });
      },
    };
    avancar = { rotulo: "Escolher outra", icone: "seta-direita", para: rotas.guiado() };
  }

  const progressoAtual = tela.tipo === "fim" ? TOTAL : acertos;

  return (
    <MolduraGuiado
      titulo="Peça ou Programa?"
      sairPara={rotas.guiado()}
      acento="#1d7a45"
      progresso={{
        texto: tela.tipo === "fim" ? "Terminou" : tela.tipo === "inicio" ? `${TOTAL} desenhos` : `${progressoAtual} de ${TOTAL}`,
        atual: progressoAtual,
        total: TOTAL,
      }}
      recompensa={tela.tipo === "fim" ? 0 : recompensa}
      voltar={voltar}
      avancar={avancar}
    >
      <CartaoGuiado visual={visual} titulo={titulo} tituloRef={tituloRef} texto={texto} visualAlto />
    </MolduraGuiado>
  );
}
