import type { BlocoAula as DadosBloco } from "@/types/aulaIngles";
import { Aviso } from "./Aviso";
import { Cabecalho } from "./Cabecalho";
import { CaixaRegra } from "./CaixaRegra";
import { CartaoExemplos } from "./CartaoExemplos";
import { Cartao } from "./Cartao";
import { CasosEscrita } from "./CasosEscrita";
import { CombinarFrases } from "./CombinarFrases";
import { DeckAudio } from "./DeckAudio";
import { DestaqueRegra } from "./DestaqueRegra";
import { Dica } from "./Dica";
import { DicaContraste } from "./DicaContraste";
import { DialogosLacunas } from "./DialogosLacunas";
import { EscolherLacuna } from "./EscolherLacuna";
import { EscritaGuiada } from "./EscritaGuiada";
import { Flashcards } from "./Flashcards";
import { Heroi } from "./Heroi";
import { LacunasTexto } from "./LacunasTexto";
import { LigarCausas } from "./LigarCausas";
import { LinkPasso } from "./LinkPasso";
import { ListaOuvir } from "./ListaOuvir";
import { MapaCorpo } from "./MapaCorpo";
import { NuvemECartas } from "./NuvemECartas";
import { ParesTransformacao } from "./ParesTransformacao";
import { PerguntasLivres } from "./PerguntasLivres";
import { Ponte } from "./Ponte";
import { VerdadeiroFalso } from "./VerdadeiroFalso";

/** Escolhe o componente de cada tipo de bloco da aula. */
export function BlocoAula({ bloco }: { bloco: DadosBloco }) {
  switch (bloco.tipo) {
    case "heroi":
      return <Heroi bloco={bloco} />;
    case "cabecalho":
      return <Cabecalho bloco={bloco} />;
    case "perguntas-livres":
      return <PerguntasLivres bloco={bloco} />;
    case "mapa-corpo":
      return <MapaCorpo bloco={bloco} />;
    case "flashcards":
      return <Flashcards bloco={bloco} />;
    case "destaque-regra":
      return <DestaqueRegra bloco={bloco} />;
    case "ligar-causas":
      return <LigarCausas bloco={bloco} />;
    case "escolher-lacuna":
      return <EscolherLacuna bloco={bloco} />;
    case "link-passo":
      return <LinkPasso bloco={bloco} />;
    case "lista-ouvir":
      return <ListaOuvir bloco={bloco} />;
    case "caixa-regra":
      return <CaixaRegra bloco={bloco} />;
    case "cartao-exemplos":
      return <CartaoExemplos bloco={bloco} />;
    case "dica":
      return <Dica bloco={bloco} />;
    case "dica-contraste":
      return <DicaContraste bloco={bloco} />;
    case "ponte":
      return <Ponte bloco={bloco} />;
    case "aviso":
      return <Aviso bloco={bloco} />;
    case "pares-transformacao":
      return <ParesTransformacao bloco={bloco} />;
    case "cartao":
      return <Cartao bloco={bloco} />;
    case "lacunas-texto":
      return <LacunasTexto bloco={bloco} />;
    case "verdadeiro-falso":
      return <VerdadeiroFalso bloco={bloco} />;
    case "combinar-frases":
      return <CombinarFrases bloco={bloco} />;
    case "escrita-guiada":
      return <EscritaGuiada bloco={bloco} />;
    case "deck-audio":
      return <DeckAudio bloco={bloco} />;
    case "dialogos-lacunas":
      return <DialogosLacunas bloco={bloco} />;
    case "nuvem-e-cartas":
      return <NuvemECartas bloco={bloco} />;
    case "casos-escrita":
      return <CasosEscrita bloco={bloco} />;
  }
}
