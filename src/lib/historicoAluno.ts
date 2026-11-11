/**
 * Histórico do aluno («Acompanhamento Educacional»): monta o texto a partir de
 * escolhas e formata um texto já escrito. As frases vêm dos históricos reais da
 * escola; cada trecho tem mais de uma redação, para «sugerir outra» sem repetir.
 *
 * Gênero: os trechos usam `{masculino|feminino}`, por exemplo `alun{o|a}`.
 */

export type Genero = "m" | "f";

const MARCA = /\{([^{}|]*)\|([^{}|]*)\}/g;

/** Resolve os `{o|a}` de um texto para o gênero escolhido. */
export const resolver = (texto: string, genero: Genero) => texto.replace(MARCA, (_t, m: string, f: string) => (genero === "m" ? m : f));

// ----------------------------------------------------------------- escolhas

export type Desempenho = "excelente" | "bom" | "regular" | "dificuldades";
export type Dificuldade = "nenhuma" | "leve" | "muita";
export type Ajuda = "pede" | "so-quando-nao-consegue" | "nao-pede";
export type Personalidade = "nenhuma" | "introvertido" | "extrovertido" | "ambivertido";
export type Frequencia = "nenhuma" | "presente" | "chega-atrasado" | "faltoso-repoe" | "faltoso-nao-repoe" | "sem-justificativa";
export type Comportamento = "nenhum" | "perfeito" | "adequado" | "falante-distraido" | "retraido";
export type Contrato = "nenhum" | "normal" | "adiantado" | "atraso" | "quitado";
export type CausaAtraso = "faltas" | "nao-concluidas" | "dificuldade-modulo" | "atrasos-chegada" | "sem-reposicao";

export interface Escolhas {
  genero: Genero;
  desempenho: Desempenho;
  modulo: string;
  dificuldade: Dificuldade;
  ajuda: Ajuda | "nenhuma";
  personalidade: Personalidade;
  frequencia: Frequencia;
  comportamento: Comportamento;
  contrato: Contrato;
  causas: CausaAtraso[];
  aulasEmAtraso: string;
  extra: string;
}

export const ESCOLHAS_INICIAIS: Escolhas = {
  genero: "f",
  desempenho: "excelente",
  modulo: "",
  dificuldade: "nenhuma",
  ajuda: "nenhuma",
  personalidade: "nenhuma",
  frequencia: "presente",
  comportamento: "perfeito",
  contrato: "normal",
  causas: [],
  aulasEmAtraso: "",
  extra: "",
};

export const OPCOES = {
  desempenho: [
    { id: "excelente", rotulo: "Excelente" },
    { id: "bom", rotulo: "Bom" },
    { id: "regular", rotulo: "Regular" },
    { id: "dificuldades", rotulo: "Com dificuldades, mas progredindo" },
  ],
  dificuldade: [
    { id: "nenhuma", rotulo: "Sem dificuldade no módulo" },
    { id: "leve", rotulo: "Dificuldade no módulo, faz sozinho às vezes" },
    { id: "muita", rotulo: "Muita dificuldade no módulo" },
  ],
  ajuda: [
    { id: "nenhuma", rotulo: "Não citar" },
    { id: "pede", rotulo: "Pede ajuda quando precisa" },
    { id: "so-quando-nao-consegue", rotulo: "Só pede quando não consegue" },
    { id: "nao-pede", rotulo: "Não pede ajuda" },
  ],
  personalidade: [
    { id: "nenhuma", rotulo: "Não citar" },
    { id: "introvertido", rotulo: "Introvertido" },
    { id: "extrovertido", rotulo: "Extrovertido" },
    { id: "ambivertido", rotulo: "Ambivertido" },
  ],
  frequencia: [
    { id: "nenhuma", rotulo: "Não citar" },
    { id: "presente", rotulo: "Sempre presente" },
    { id: "chega-atrasado", rotulo: "Presente, mas às vezes chega atrasado" },
    { id: "faltoso-repoe", rotulo: "Faltoso, mas sempre repõe" },
    { id: "faltoso-nao-repoe", rotulo: "Faltoso e não repõe" },
    { id: "sem-justificativa", rotulo: "Falta sem justificar" },
  ],
  comportamento: [
    { id: "nenhum", rotulo: "Não citar" },
    { id: "perfeito", rotulo: "Perfeito" },
    { id: "adequado", rotulo: "Adequado em sala" },
    { id: "falante-distraido", rotulo: "Falante e distraído" },
    { id: "retraido", rotulo: "Retraído" },
  ],
  contrato: [
    { id: "nenhum", rotulo: "Não citar" },
    { id: "normal", rotulo: "Em normalidade" },
    { id: "adiantado", rotulo: "Adiantado" },
    { id: "atraso", rotulo: "Em atraso" },
    { id: "quitado", rotulo: "Quitou as parcelas, faltam módulos" },
  ],
  causas: [
    { id: "faltas", rotulo: "Faltas" },
    { id: "nao-concluidas", rotulo: "Aulas não concluídas no dia" },
    { id: "dificuldade-modulo", rotulo: "Dificuldade no módulo" },
    { id: "atrasos-chegada", rotulo: "Atrasos na chegada" },
    { id: "sem-reposicao", rotulo: "Não repôs as faltas" },
  ],
} as const;

// ------------------------------------------------------------------ trechos

type Redacoes = readonly string[];

const ABERTURA: Record<Desempenho, Redacoes> = {
  excelente: [
    "Alun{o|a} esforçad{o|a} e comprometid{o|a} com seus estudos, com um desempenho excelente nas atividades e avaliações.",
    "Alun{o|a} esforçad{o|a} e comprometid{o|a} com seus estudos, com um desempenho excelente nas atividades, mesmo com dificuldades, se sobressai.",
  ],
  bom: [
    "Alun{o|a} esforçad{o|a} e comprometid{o|a} com seus estudos, com um bom desempenho nas atividades e avaliações.",
    "Alun{o|a} esforçad{o|a} e comprometid{o|a} com o curso, e consegue realizar as atividades no momento certo.",
  ],
  regular: [
    "Alun{o|a} esforçad{o|a} com seus estudos, com um desempenho regular nas atividades e avaliações.",
    "Alun{o|a} esforçad{o|a}, com um desempenho regular, que pode melhorar com mais dedicação nas atividades.",
  ],
  dificuldades: [
    "Alun{o|a} esforçad{o|a}, contudo, apresenta dificuldades nas atividades, mas está progredindo a cada aula.",
    "Alun{o|a} esforçad{o|a} e comprometid{o|a} com seus estudos, mas ainda apresenta dificuldades de entendimento dos assuntos; mesmo assim, sempre se sobressai.",
  ],
};

const entreParenteses = (c: Escolhas) => (c.modulo.trim() ? ` (${c.modulo.trim()})` : "");

const DIFICULDADE = (c: Escolhas): Record<Exclude<Dificuldade, "nenhuma">, Redacoes> => ({
  leve: [
    `Contudo, apresenta dificuldades com o módulo atual${entreParenteses(c)}, mas {o|a} tal está progredindo a cada aula e, com isso, consegue realizar as aulas sozinh{o|a} às vezes.`,
    `Apresenta certa dificuldade com o módulo atual${entreParenteses(c)}, mas vem progredindo a cada aula e já realiza parte das atividades sozinh{o|a}.`,
  ],
  muita: [
    `Contudo, apresenta dificuldades com o módulo atual${entreParenteses(c)}, mas {o|a} tal está progredindo a cada aula e, com isso, consegue realizar as aulas sozinh{o|a} às vezes, mas com muita dificuldade.`,
    `Tem muita dificuldade com o módulo atual${entreParenteses(c)}, e precisa de mais tempo e acompanhamento do instrutor para concluir as aulas.`,
  ],
});

const AJUDA: Record<Ajuda, Redacoes> = {
  pede: ["Quando tem dificuldade, {o|a} mesm{o|a} pede ajuda.", "Quando tem dúvidas, {o|a} tal pergunta e pede ajuda ao instrutor."],
  "so-quando-nao-consegue": ["Não costuma pedir ajuda; só chama o instrutor quando não consegue executar a atividade.", "É muito calad{o|a} e, mesmo com dúvida, às vezes não chama o instrutor."],
  "nao-pede": ["Não é capaz de pedir auxílio, mesmo quando tem dificuldade.", "Mesmo com dúvida, {o|a} alun{o|a} não chama o instrutor."],
};

const PERSONALIDADE: Record<Exclude<Personalidade, "nenhuma">, Redacoes> = {
  introvertido: ["Sua personalidade é puxada para a introversão, sendo uma pessoa prática de se lidar.", "Sua personalidade é puxada para a introversão, porém não é tímid{o|a}."],
  extrovertido: ["Sua personalidade é puxada para a extroversão, sendo uma pessoa prática de se lidar e se comunicar.", "Muito extrovertid{o|a} e falante, sempre comunicativ{o|a} com os instrutores."],
  ambivertido: ["Sua personalidade é equilibrada entre a introversão e a extroversão, sendo uma pessoa prática de se lidar.", "Tem uma personalidade ambivertida: se comunica bem quando precisa e sabe respeitar o momento de concentração."],
};

const FREQUENCIA: Record<Exclude<Frequencia, "nenhuma">, Redacoes> = {
  presente: [
    "Sempre presente, quando tem dúvidas {o|a} tal pergunta, completa as aulas adequadamente.",
    "Sempre presente, chega no horário e termina as aulas no tempo certo.",
  ],
  "chega-atrasado": [
    "Sempre presente, mas às vezes chega atrasad{o|a}.",
    "Frequente, porém, com alguns atrasos na chegada, o que atrapalha o fechamento das aulas do dia.",
  ],
  "faltoso-repoe": ["Contudo, é muito faltos{o|a}, mas sempre repõe as suas aulas.", "Falta com frequência, mas sempre faz as reposições."],
  "faltoso-nao-repoe": ["Contudo, está muito faltos{o|a} e não fez reposições das faltas.", "Tem faltado muito e ainda não repôs as aulas perdidas."],
  "sem-justificativa": [
    "Está faltando muito, sem apresentar nenhuma justificativa; mesmo ligando e enviando mensagens, não temos respaldo sobre as faltas.",
    "A frequência é muito baixa e, mesmo com contato da escola, não há justificativa para as ausências.",
  ],
};

const COMPORTAMENTO: Record<Exclude<Comportamento, "nenhum">, Redacoes> = {
  perfeito: ["Seu comportamento é perfeito.", "Tem um comportamento exemplar em sala."],
  adequado: ["Tem um comportamento adequado em sala.", "Seu comportamento em sala é adequado."],
  "falante-distraido": [
    "Tem um comportamento falante e muito distraído, e também muito dependente do instrutor.",
    "É falante e se distrai com facilidade, o que atrasa a conclusão das atividades.",
  ],
  retraido: ["Tem uma postura mais retraída e pouco se comunica.", "Tem uma postura reservada, com pouca comunicação em sala."],
};

const FRASE_CAUSA: Record<CausaAtraso, (c: Escolhas) => string> = {
  faltas: () => "faltas",
  "nao-concluidas": () => "aulas não concluídas no mesmo dia",
  "dificuldade-modulo": (c) => (c.modulo.trim() ? `dificuldade no módulo de ${c.modulo.trim()}` : "dificuldade no módulo atual"),
  "atrasos-chegada": () => "atrasos na chegada",
  "sem-reposicao": () => "reposições não concluídas",
};

const lista = (itens: string[]) => (itens.length <= 1 ? (itens[0] ?? "") : `${itens.slice(0, -1).join(", ")} e ${itens[itens.length - 1]}`);

const CONTRATO = (c: Escolhas): Record<Exclude<Contrato, "nenhum">, Redacoes> => {
  const aulas = c.aulasEmAtraso.trim();
  const causas = lista(c.causas.map((id) => FRASE_CAUSA[id](c)));
  const atraso = `${aulas ? `; aproximadamente ${aulas} aula(s)` : ""}${causas ? `, devido a ${causas}` : ""}`;
  return {
    normal: ["Por fim, {o|a} alun{o|a} encontra-se em normalidade com suas aulas no momento atual.", "Por fim, {o|a} alun{o|a} está em dia com suas aulas."],
    adiantado: ["Por fim, {o|a} alun{o|a} se encontra adiantad{o|a}, mas nada que comprometa o contrato.", "Por fim, {o|a} alun{o|a} está adiantad{o|a} em suas aulas até o momento."],
    atraso: [
      `Por fim, {o|a} alun{o|a} encontra-se em atraso com suas aulas${atraso}.`,
      `Por fim, {o|a} alun{o|a} está em atraso no contrato${atraso}, o que dificulta o encerramento adequado do curso.`,
    ],
    quitado: [
      `Por fim, {o|a} alun{o|a} já quitou todas as parcelas do curso, mas ainda tem módulos a concluir${aulas ? ` (cerca de ${aulas} aula(s) para finalizar)` : ""}${causas ? `, devido a ${causas}` : ""}.`,
      `Por fim, as parcelas do curso já foram quitadas, mas {o|a} alun{o|a} ainda precisa concluir módulos${causas ? `, por conta de ${causas}` : ""}.`,
    ],
  };
};

const escolher = (opcoes: Redacoes, variante: number) => opcoes[variante % opcoes.length];

/** Monta o histórico. `variante` troca a redação de cada trecho (0 é a primeira; sugerir outra soma 1). */
export function montarHistorico(c: Escolhas, variante = 0): string {
  const partes: string[] = [escolher(ABERTURA[c.desempenho], variante)];
  if (c.dificuldade !== "nenhuma") partes.push(escolher(DIFICULDADE(c)[c.dificuldade], variante));
  if (c.ajuda !== "nenhuma") partes.push(escolher(AJUDA[c.ajuda], variante));
  if (c.personalidade !== "nenhuma") partes.push(escolher(PERSONALIDADE[c.personalidade], variante));
  if (c.frequencia !== "nenhuma") partes.push(escolher(FREQUENCIA[c.frequencia], variante));
  if (c.comportamento !== "nenhum") partes.push(escolher(COMPORTAMENTO[c.comportamento], variante));
  if (c.contrato !== "nenhum") partes.push(escolher(CONTRATO(c)[c.contrato], variante));
  if (c.extra.trim()) partes.push(c.extra.trim());
  return arrumarTexto(resolver(partes.join(" "), c.genero));
}

// ----------------------------------------------------------------- 1º dia

export type Experiencia = "sem" | "com" | "intermediario" | "recapitular";
export type AtividadeDoDia = "de olho na carreira" | "aula inaugural" | "primeira aula com pouco auxílio";

export interface EscolhasPrimeiroDia {
  genero: Genero;
  experiencia: Experiencia;
  poucoControleDoMouse: boolean;
  personalidade: Personalidade;
  atividades: AtividadeDoDia[];
  extra: string;
}

export const PRIMEIRO_DIA_INICIAL: EscolhasPrimeiroDia = { genero: "f", experiencia: "sem", poucoControleDoMouse: false, personalidade: "nenhuma", atividades: ["de olho na carreira"], extra: "" };

export const OPCOES_PRIMEIRO_DIA = {
  experiencia: [
    { id: "sem", rotulo: "Sem experiência sólida" },
    { id: "com", rotulo: "Com experiência" },
    { id: "intermediario", rotulo: "Domínio intermediário (foco em certificados)" },
    { id: "recapitular", rotulo: "Quer recapitular e atualizar" },
  ],
  atividades: ["de olho na carreira", "aula inaugural", "primeira aula com pouco auxílio"],
} as const;

const EXPERIENCIA: Record<Experiencia, Redacoes> = {
  sem: [
    "Alun{o|a} não tem experiência sólida com informática, com foco em aprender e se aperfeiçoar com foco profissional.",
    "Alun{o|a} não tem experiência sólida com informática, com foco em aprender e manusear melhor a máquina com foco profissional.",
  ],
  com: [
    "Alun{o|a} tem experiência com informática; concluiu a primeira aula com tranquilidade e rapidez, mas isso não significa que tenha um domínio considerado avançado ou intermediário.",
    "Alun{o|a} tem experiência com informática e soube conduzir os componentes com facilidade, com um bom entendimento sobre o que foi questionado nas práticas.",
  ],
  intermediario: [
    "Alun{o|a} tem experiência com informática; concluiu a primeira aula com tranquilidade e rapidez, e tem um domínio considerado intermediário, com o foco em obter os certificados.",
    "Alun{o|a} tem um domínio intermediário de informática, com o foco em obter os certificados.",
  ],
  recapitular: [
    "Alun{o|a} tem experiência com informática, com o foco de recapitular os conteúdos e atualizá-los, pois já faz muito tempo que estudou e quer se aperfeiçoar.",
    "Alun{o|a} já estudou informática há bastante tempo e agora quer recapitular e atualizar os conteúdos.",
  ],
};

export function montarPrimeiroDia(c: EscolhasPrimeiroDia, variante = 0): string {
  const partes: string[] = [escolher(EXPERIENCIA[c.experiencia], variante)];
  if (c.poucoControleDoMouse) partes.push("De primeira impressão, {o|a} alun{o|a} não tem muito controle sob o mouse, mas tem um certo entendimento do que executa. (observação do 1º dia)");
  else partes.push("(observação do 1º dia)");
  if (c.personalidade !== "nenhuma") partes.push(escolher(PERSONALIDADE[c.personalidade], variante));
  if (c.extra.trim()) partes.push(c.extra.trim());
  const texto = resolver(partes.join(" "), c.genero);
  const executou = c.atividades.filter((a) => a !== "primeira aula com pouco auxílio").map((a) => (a === "aula inaugural" ? "a 'aula inaugural'" : `o '${a}'`));
  const auxilio = c.atividades.includes("primeira aula com pouco auxílio");
  const frases = [executou.length ? `Executou ${lista(executou)}` : "", auxilio ? `${executou.length ? "e c" : "C"}oncluiu a primeira aula com pouco auxílio` : ""].filter(Boolean);
  const fim = frases.length ? `\n\n${frases.join(" ")}.` : "";
  return arrumarTexto(texto) + fim;
}

// ---------------------------------------------------------------- formatar

/**
 * Arruma espaços e pontuação sem mexer no sentido: espaços duplicados, espaço antes de vírgula e ponto,
 * falta de espaço depois deles, vírgulas repetidas, maiúscula no começo de cada frase e ponto final.
 */
export function arrumarTexto(texto: string): string {
  const paragrafos = texto
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((linha) => {
      let t = linha.replace(/[ \t ]+/g, " ").trim();
      if (!t) return "";
      t = t
        .replace(/\s+([,.;:!?)])/g, "$1")
        .replace(/\(\s+/g, "(")
        .replace(/,(\s*,)+/g, ",")
        .replace(/([,;:])(?=[^\s\d)"'])/g, "$1 ")
        .replace(/\.{4,}/g, "...")
        .replace(/([^.])\.\.(?!\.)/g, "$1.")
        .replace(/([.!?])(?=[A-ZÁÀÂÃÉÊÍÓÔÕÚÇ])/g, "$1 ")
        .replace(/,\s*([.;!?])/g, "$1");
      t = t.replace(/(^|[.!?]\s+)([a-zà-ú])/g, (_m, antes: string, letra: string) => antes + letra.toLocaleUpperCase("pt-BR"));
      if (/[\p{L}\p{N})'"]$/u.test(t)) t += ".";
      return t;
    });
  return paragrafos.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

const PARES_DE_GENERO: [string, string][] = [
  ["aluno", "aluna"],
  ["alunos", "alunas"],
  ["esforçado", "esforçada"],
  ["comprometido", "comprometida"],
  ["faltoso", "faltosa"],
  ["introvertido", "introvertida"],
  ["extrovertido", "extrovertida"],
  ["ambivertido", "ambivertida"],
  ["tímido", "tímida"],
  ["calado", "calada"],
  ["atrasado", "atrasada"],
  ["adiantado", "adiantada"],
  ["avançado", "avançada"],
  ["distraído", "distraída"],
  ["dependente", "dependente"],
  ["sozinho", "sozinha"],
  ["autodidata", "autodidata"],
  ["inteligente", "inteligente"],
  ["comunicativo", "comunicativa"],
  ["retraído", "retraída"],
  ["falante", "falante"],
  ["quite", "quite"],
  ["ele", "ela"],
  ["dele", "dela"],
  ["o mesmo", "a mesma"],
  ["do mesmo", "da mesma"],
  ["ao mesmo", "à mesma"],
  ["o tal", "a tal"],
  ["do tal", "da tal"],
  ["um aluno", "uma aluna"],
  ["do aluno", "da aluna"],
  ["dos alunos", "das alunas"],
  ["ao aluno", "à aluna"],
  ["no aluno", "na aluna"],
  ["pelo aluno", "pela aluna"],
  ["uma pessoa", "uma pessoa"],
];

const ESCAPAR = (t: string) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function preservarCaixa(original: string, novo: string) {
  if (original === original.toUpperCase() && original.length > 1) return novo.toUpperCase();
  return original[0] === original[0].toUpperCase() ? novo[0].toUpperCase() + novo.slice(1) : novo;
}

/**
 * Troca o gênero de um texto pronto nas palavras mais comuns dos históricos (aluno/aluna, esforçado/esforçada,
 * o mesmo/a mesma...). É uma ajuda, não uma revisão: o texto precisa ser relido depois.
 */
export function trocarGenero(texto: string, para: Genero): string {
  const pares = PARES_DE_GENERO.map(([m, f]) => (para === "f" ? [m, f] : [f, m]) as [string, string]).filter(([de, para2]) => de !== para2);
  // Expressões maiores primeiro, para «do mesmo» não ser tratado como «mesmo».
  pares.sort((a, b) => b[0].length - a[0].length);
  const mapa = new Map(pares.map(([de, pr]) => [de.toLowerCase(), pr]));
  const padrao = new RegExp(`(?<![\\p{L}])(${pares.map(([de]) => ESCAPAR(de)).join("|")})(?![\\p{L}])`, "giu");
  // O artigo «o»/«a» e os «do/da» soltos ficam como estão: sem análise gramatical não dá para trocar com segurança.
  return texto
    .replace(/(?<![\p{L}])([Oo]|[Aa]) (aluno|aluna|alunos|alunas)(?![\p{L}])/gu, (_m, artigo: string, nome: string) => {
      const novoNome = mapa.get(nome.toLowerCase()) ?? nome;
      const novoArtigo = para === "f" ? "a" : "o";
      return `${preservarCaixa(artigo, novoArtigo)} ${novoNome}`;
    })
    .replace(padrao, (achado) => preservarCaixa(achado, mapa.get(achado.toLowerCase()) ?? achado));
}
