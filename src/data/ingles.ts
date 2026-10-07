import type { NomeIcone } from "@/components/Icone";
import { rotas } from "@/lib/rotas";
import type { AtalhoIngles, AtividadeIngles, ProvaIngles, TrilhaIngles } from "@/types/ingles";
import conversasFala from "./inglesAtividades/conversas-fala";
import conversasMensagens from "./inglesAtividades/conversas-mensagens";
import conversasRedesJogos from "./inglesAtividades/conversas-redes-jogos";
import conversasTrabalho from "./inglesAtividades/conversas-trabalho";
import dialogos1 from "./inglesAtividades/dialogos-1";
import dialogos2 from "./inglesAtividades/dialogos-2";
import frasesPerguntas from "./inglesAtividades/frases-perguntas";
import frasesRotina from "./inglesAtividades/frases-rotina";
import oucaELeia1 from "./inglesAtividades/ouca-e-leia-1";
import oucaELeia2 from "./inglesAtividades/ouca-e-leia-2";
import redacaoIeltsDiscussao from "./inglesAtividades/redacao-ielts-discussao";
import redacaoIeltsOpiniao from "./inglesAtividades/redacao-ielts-opiniao";
import redacaoIeltsTabela from "./inglesAtividades/redacao-ielts-tabela";
import redacaoToeflDiscussao from "./inglesAtividades/redacao-toefl-discussao";
import redacaoToeflEmail from "./inglesAtividades/redacao-toefl-email";
import textosApresentacoes from "./inglesAtividades/textos-apresentacoes";
import textosAvisos from "./inglesAtividades/textos-avisos";
import textosDiscursos from "./inglesAtividades/textos-discursos";
import vocabularioCasa from "./inglesAtividades/vocabulario-casa";
import vocabularioComida from "./inglesAtividades/vocabulario-comida";
import vocabularioRoupasClima from "./inglesAtividades/vocabulario-roupas-clima";

/**
 * Trilha de Inglês. Cada atividade é um arquivo em `inglesAtividades/` com o
 * conteúdo como dado — a tela (`PraticaIngles`) escolhe o formato pelo tipo.
 * A ordem aqui é a ordem de estudo dentro de cada trilha.
 */
export const ATIVIDADES_INGLES: AtividadeIngles[] = [
  vocabularioCasa,
  vocabularioComida,
  vocabularioRoupasClima,
  oucaELeia1,
  oucaELeia2,
  frasesRotina,
  frasesPerguntas,
  dialogos1,
  dialogos2,
  conversasMensagens,
  conversasFala,
  conversasTrabalho,
  conversasRedesJogos,
  textosApresentacoes,
  textosDiscursos,
  textosAvisos,
  redacaoIeltsOpiniao,
  redacaoIeltsDiscussao,
  redacaoIeltsTabela,
  redacaoToeflDiscussao,
  redacaoToeflEmail,
];

export interface Trilha {
  id: TrilhaIngles | "jogos";
  titulo: string;
  descricao: string;
  icone: NomeIcone;
  cor: string;
}

/** Trilhas por habilidade, na ordem em que aparecem na aba. */
export const TRILHAS_INGLES: Trilha[] = [
  { id: "vocabulario", titulo: "Vocabulário com imagens", descricao: "Veja o desenho, ouça a palavra e reconheça depois.", icone: "imagem", cor: "#c2410c" },
  { id: "ouvir-ler", titulo: "Ouvir e ler", descricao: "Frases do dia a dia para ouvir, ler, escrever e traduzir.", icone: "som", cor: "#0369a1" },
  { id: "frases", titulo: "Montar frases", descricao: "Toque nas palavras na ordem certa e aprenda a estrutura do inglês.", icone: "blocos", cor: "#15803d" },
  { id: "gabi", titulo: "Conversar com a Gabi", descricao: "Diálogos em que você escolhe ou escreve a resposta.", icone: "conversa", cor: "#6d28d9" },
  {
    id: "vida-real",
    titulo: "Inglês da vida real",
    descricao: "Mensagens, conversas, e-mails e jogos com abreviações e gírias explicadas: o que querem dizer e onde cabem.",
    icone: "celular",
    cor: "#0f766e",
  },
  { id: "textos", titulo: "Discursos e avisos", descricao: "Textos mais longos para ouvir e ler, com perguntas de compreensão.", icone: "megafone", cor: "#4338ca" },
  {
    id: "redacao",
    titulo: "Redação para exames (TOEFL e IELTS)",
    descricao: "Nível avançado: como cada redação é montada, os critérios que dão a nota, um modelo comentado, treino e a sua redação com cronômetro e métricas.",
    icone: "lapis",
    cor: "#9f1239",
  },
  { id: "jogos", titulo: "Jogos", descricao: "Inglês fora das práticas, em outras seções do portal.", icone: "musica", cor: "#be123c" },
];

/** Atividades de inglês que moram em outra seção e aparecem na trilha "Jogos" como atalho. */
export const ATALHOS_INGLES: AtalhoIngles[] = [
  {
    titulo: "Inglês em Letras de Música",
    descricao: "Treino de digitação com 8 letras de música em inglês, com precisão, velocidade e combo.",
    cor: "#be123c",
    para: rotas.digitacaoLetrasIngles(),
  },
];

export const PROVAS_INGLES: ProvaIngles[] = [];

export function acharAtividadeIngles(slug: string): AtividadeIngles | undefined {
  return ATIVIDADES_INGLES.find((atividade) => atividade.slug === slug);
}

export function totalDeTarefas(atividade: AtividadeIngles): number {
  const { conteudo } = atividade;
  switch (conteudo.tipo) {
    case "exercicios":
      return conteudo.exercicios.length;
    case "dialogos":
      return conteudo.dialogos.reduce((soma, dialogo) => soma + dialogo.falas.length, 0);
    case "textos":
      return conteudo.textos.reduce((soma, texto) => soma + texto.perguntas.length, 0);
    case "conversas":
      return conteudo.conversas.reduce((soma, conversa) => soma + conversa.perguntas.length, 0);
    case "redacao":
      return conteudo.redacao.treino.length;
  }
}

/** Resumo curto do tamanho da atividade, para a lista ("3 conversas · 26 expressões"). */
export function resumoDaAtividade(atividade: AtividadeIngles): string {
  const { conteudo } = atividade;
  switch (conteudo.tipo) {
    case "exercicios":
      return conteudo.vocabulario
        ? `${conteudo.vocabulario.length} palavras · ${conteudo.exercicios.length} exercícios`
        : `${conteudo.exercicios.length} exercícios`;
    case "dialogos":
      return `${conteudo.dialogos.length} conversas · ${totalDeTarefas(atividade)} respostas`;
    case "textos":
      return `${conteudo.textos.length} textos · ${totalDeTarefas(atividade)} perguntas`;
    case "conversas":
      return `${conteudo.conversas.length} conversas · ${conteudo.conversas.reduce((soma, c) => soma + c.expressoes.length, 0)} expressões`;
    case "redacao": {
      const { proposta, treino } = conteudo.redacao;
      return `${proposta.exame} · ${proposta.minutos} min · ${proposta.minPalavras}+ palavras · ${treino.length} questões de treino`;
    }
  }
}
