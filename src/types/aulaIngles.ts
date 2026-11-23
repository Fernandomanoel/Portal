/**
 * Aulas do Curso de Inglês (área com senha, separada de /ingles). Cada aula é um arquivo `.aula.ts` em
 * `src/data/cursoIngles/` que só o servidor carrega e só entrega depois da senha; o navegador recebe estes tipos
 * por `GET /api/curso-ingles/aulas/<id>`. Nunca importe um `.aula.ts` em `src/`.
 */

/**
 * Texto da aula com marcação em linha: `{b:negrito}`, `{i:itálico}`, `{u:sublinhado}`, `{dest:destaque sublinhado}`,
 * `{pos:...}` (should), `{neg:...}` (shouldn't), `{wh:...}` (which), `{sim:...}` e `{alerta:...}` (rótulos de contraste),
 * `{chip:...}` (palavra em etiqueta), `{dica:palavra|tradução}` (balão ao passar o mouse) e `{link:texto|url}`.
 * Um objeto `{ en, pt }` troca de idioma com o botão «ME EXPLIQUE EM PORTUGUÊS» do passo.
 */
export type TextoAula = string | { en: string; pt: string };

/** Desenho em SVG guardado como dado: a tag e os atributos já em camelCase (`strokeDasharray`). */
export interface FormaSvg {
  tag: "path" | "ellipse" | "circle" | "rect";
  attrs: Record<string, string | number>;
}

/** Linha com texto na tela e a fala em inglês (a fala pode diferir do texto: parênteses, pontuação). */
export interface ItemFalado {
  texto: string;
  fala: string;
}

export interface MensagensConferencia {
  /** `{n}` e `{total}` viram os números. */
  ok: string;
  parcial: string;
}

export interface RotulosConferencia {
  conferir?: string;
  reiniciar?: string;
}

/** Trecho de um texto com lacunas: texto solto, ou uma lacuna numerada. `largura` só ajusta o tamanho da caixa. */
export type TrechoLacuna = string | { lacuna: number; largura?: "p" | "m" | "g" };

export interface Sintoma {
  id: string;
  termo: string;
  regiaoRotulo: string;
  descricao: string;
  exemplo: string;
  /** Região que acende no desenho. */
  regiao: FormaSvg[];
  ponto: { x: number; y: number; cor: "perigo" | "alerta" };
}

export interface RotulosMapaCorpo {
  explorados: string;
  badgeInicial: string;
  badgeSelecionado: string;
  badgeExplorado: string;
  tituloInicial: string;
  regiaoInicial: string;
  regiaoPrefixo: string;
  descricaoInicial: string;
  exemploRotulo: string;
  exemploInicial: string;
  pronuncia: string;
  normal: string;
  devagar: string;
}

export interface CartaVocabulario {
  en: string;
  pt: string;
  icone: FormaSvg[];
}

export interface FalaDialogoSimulado {
  falante: "A" | "B";
  rotulo: string;
  texto: string;
}

export interface CasoEscrita {
  id: string;
  /** Rótulo da aba, «Case 1: Sofia». */
  rotulo: string;
  etiqueta: string;
  imagem: string;
  alt: string;
  rotuloOuvir: string;
  falaCaso: string;
  citacao: string;
  perguntas: string[];
  rotuloCampo: string;
  modelo: { rotulo: string; texto: string; rotuloOuvir: string };
}

export interface ParFrase {
  texto: string;
  fala: string;
}

export type BlocoAula =
  | { tipo: "heroi"; etiqueta: string; titulo: string; texto: string; objetivosTitulo: string; objetivos: string[] }
  | { tipo: "cabecalho"; etiqueta: string; titulo: string; texto?: TextoAula; traducao?: boolean }
  | { tipo: "perguntas-livres"; perguntas: ItemFalado[]; rotuloOuvir: string; placeholder: string; botao: string; mensagem: string }
  | {
      tipo: "mapa-corpo";
      cabecalho: { etiqueta: string; titulo: string; texto: string };
      viewBox: string;
      rotuloSvg: string;
      fundo: FormaSvg[];
      silhueta: FormaSvg[];
      sintomas: Sintoma[];
      rotulos: RotulosMapaCorpo;
    }
  | { tipo: "flashcards"; cartas: CartaVocabulario[]; rotuloVirar: string; rotuloPortugues: string }
  | { tipo: "destaque-regra"; ancora: string; etiqueta: string; titulo: string; texto: string; grupos: { titulo: string; itens: ItemFalado[] }[] }
  | {
      tipo: "ligar-causas";
      legenda: { n: number; termo: string }[];
      itens: { texto: string; resposta: string; fala: string }[];
      rotuloOuvir: string;
      mensagens: MensagensConferencia;
      rotulos?: RotulosConferencia;
    }
  | {
      tipo: "escolher-lacuna";
      itens: { antes: string; opcoes: [string, string]; resposta: string; depois: string; fala: string }[];
      /** Blocos mostrados entre a lista e os botões de conferir. */
      aposLista?: BlocoAula[];
      mensagens: MensagensConferencia;
      rotulos?: RotulosConferencia;
    }
  | { tipo: "link-passo"; antes: string; rotuloLink: string; depois: string; passo: string; ancora: string }
  | { tipo: "lista-ouvir"; itens: ItemFalado[]; rotuloOuvir: string }
  | { tipo: "caixa-regra"; texto: TextoAula; fala: string; rotuloOuvir: string }
  | {
      tipo: "cartao-exemplos";
      titulo: string;
      tom: "pos" | "neg" | "perg";
      formula: string;
      exemplos: { texto: string; traducao: string; fala: string }[];
      extras?: BlocoAula[];
    }
  | { tipo: "dica"; rotulo: string; texto: TextoAula }
  | { tipo: "dica-contraste"; titulo: string; intro: TextoAula; colunas: { texto: TextoAula; exemplo: string; fala: string }[] }
  | { tipo: "ponte"; antes: ParFrase; depois: ParFrase }
  | { tipo: "aviso"; texto: TextoAula }
  | { tipo: "pares-transformacao"; pares: { antes: ParFrase; depois: ParFrase }[] }
  | { tipo: "cartao"; titulo: string; descricao?: string; blocos: BlocoAula[] }
  | {
      tipo: "lacunas-texto";
      paragrafos: TrechoLacuna[][];
      /** Respostas aceitas por lacuna; a comparação ignora maiúsculas, espaços repetidos e o tipo de apóstrofo. */
      lacunas: { n: number; aceitas: string[] }[];
      mensagens: MensagensConferencia;
      rotulos?: RotulosConferencia;
    }
  | { tipo: "verdadeiro-falso"; itens: { afirmacao: string; resposta: boolean }[]; mensagens: MensagensConferencia; rotulos?: RotulosConferencia }
  | {
      tipo: "combinar-frases";
      itens: { enunciado: string; dica?: string; resposta: string }[];
      placeholder: string;
      mensagens: MensagensConferencia;
      rotulos?: RotulosConferencia;
    }
  | {
      tipo: "escrita-guiada";
      itens: { pt: string; sugestao: string }[];
      placeholder: string;
      rotuloSugestao: string;
      mensagem: string;
      rotulos: { enviar: string; limpar: string };
    }
  | { tipo: "deck-audio"; rotulo: string; mp3: string; rotuloTocar: string; rotuloParar: string; rotuloInicio: string; rotuloFalando: string; roteiro: FalaDialogoSimulado[] }
  | {
      tipo: "dialogos-lacunas";
      dialogos: { titulo: string; largo?: boolean; falas: { quem: "A" | "B"; partes: TrechoLacuna[] }[] }[];
      respostas: { n: number; aceita: string }[];
      mensagens: MensagensConferencia;
      rotulos?: RotulosConferencia;
    }
  | {
      tipo: "nuvem-e-cartas";
      rotuloNuvem: string;
      palavras: string[];
      personagens: { nome: string; imagem: string; resposta: string }[];
      rotuloSelecao: string;
      mensagens: MensagensConferencia;
      rotulos?: RotulosConferencia;
    }
  | {
      tipo: "casos-escrita";
      casos: CasoEscrita[];
      tituloPerguntas: string;
      /** `{n}` e `{min}` viram os números. */
      rotuloContagem: string;
      minimoPalavras: number;
      termosSintoma: string[];
      criterios: { comprimento: string; vocabulario: string; modais: string; conector: string };
      rotuloBotaoModelo: string;
      rotulosEstado: { pendente: string; concluido: string };
      placeholder: string;
    };

export interface PassoAula {
  id: string;
  /** Grupo no menu lateral. */
  modulo: string;
  rotulo: string;
  blocos: BlocoAula[];
}

export interface AulaIngles {
  id: string;
  codigo: string;
  titulo: string;
  /** Logotipo do cabeçalho; se a imagem não carregar, aparece `reserva` num selo. */
  logo?: { src: string; alt: string; reserva: string };
  rotuloTopo: string;
  rotuloMenu: string;
  rotuloProgresso: string;
  rotulosNavegacao: { anterior: string; proximo: string; passo: string };
  passos: PassoAula[];
  /** Créditos do autor e das fontes, mantidos como no original. */
  creditos: TextoAula[];
}

export interface ResumoAulaIngles {
  id: string;
  codigo: string;
  titulo: string;
  passos: number;
}

export type BlocoDoTipo<T extends BlocoAula["tipo"]> = Extract<BlocoAula, { tipo: T }>;
