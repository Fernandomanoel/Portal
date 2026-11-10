// Extrai matéria e nota das ocorrências "Pós prova" do Histórico de Contratos.
// Sem imports de propósito, para o Node conseguir rodar scripts/verificar-analisador.mjs direto neste arquivo.

type Celula = string | number | null;

export class ErroPosProva extends Error {}

export interface ProvaExtraida {
  materia: string | null;
  nota: number | null;
  /** A nota como foi escrita na planilha ("7,5"), para mostrar sem reformatar. */
  notaExibicao: string | null;
}

export interface RelatorioPosProva {
  alunos: { nome: string; provas: ProvaExtraida[] }[];
  totalOcorrencias: number;
}

const ANCORA_MODULO = /m[oó]dulo\s*:/iu;
const PREFIXO_PROVA_REALIZADA = /^\s*prova\s+realizada\s*!\s*/iu;
const ROTULO_NOTA = /(?:prova|nota)\s*:\s*(\d+(?:[,.]\d+)?)/iu;
const INICIO_ROTULO_NOTA = /(?:prova|nota)\s*:/iu;
const FIM_BLOCO = /(?:livro|book|m[eé]dia)\s*:|aprovad[oa]|reprovad[oa]/iu;

const COLUNAS = ["Aluno", "Ocorrência", "Descrição"] as const;
const LIMITE_CABECALHO = 80;

function semAcento(texto: string): string {
  return texto.normalize("NFD").replace(/\p{Mn}/gu, "").replace(/\s+/g, " ").trim().toLowerCase();
}

function texto(valor: Celula | undefined): string {
  if (valor === null || valor === undefined) return "";
  return String(valor).trim();
}

function extrairBloco(bloco: string): ProvaExtraida {
  const nota = ROTULO_NOTA.exec(bloco);
  const corte = INICIO_ROTULO_NOTA.exec(bloco) ?? FIM_BLOCO.exec(bloco);
  const materia = (corte ? bloco.slice(0, corte.index) : bloco).replace(/\s+/g, " ").replace(/^[ :-]+|[ :-]+$/g, "");
  return {
    materia: materia || null,
    nota: nota ? Number(nota[1].replace(",", ".")) : null,
    notaExibicao: nota ? nota[1] : null,
  };
}

/** Nunca lança: descrição vazia vira lista vazia, e o que não der para identificar volta como null. */
export function extrairProvas(descricao: string | null): ProvaExtraida[] {
  const limpo = (descricao ?? "").trim();
  if (!limpo) return [];
  const incompleta: ProvaExtraida = { materia: null, nota: null, notaExibicao: null };

  if (ANCORA_MODULO.test(limpo)) {
    const provas = limpo.split(ANCORA_MODULO).slice(1).filter((bloco) => bloco.trim()).map(extrairBloco);
    return provas.length > 0 ? provas : [incompleta];
  }
  const semPrefixo = limpo.replace(PREFIXO_PROVA_REALIZADA, "").trim();
  return semPrefixo ? [extrairBloco(semPrefixo)] : [incompleta];
}

function localizarCabecalho(matriz: Celula[][]): { linha: number; colunas: Record<(typeof COLUNAS)[number], number> } {
  const alvos = new Map(COLUNAS.map((nome) => [semAcento(nome), nome]));
  let melhor = new Map<string, number>();
  for (let i = 0; i < Math.min(matriz.length, LIMITE_CABECALHO); i++) {
    const achadas = new Map<string, number>();
    matriz[i].forEach((valor, j) => {
      const nome = alvos.get(semAcento(texto(valor)));
      if (nome && !achadas.has(nome)) achadas.set(nome, j);
    });
    if (achadas.size === COLUNAS.length) {
      return { linha: i, colunas: Object.fromEntries(achadas) as Record<(typeof COLUNAS)[number], number> };
    }
    if (achadas.size > melhor.size) melhor = achadas;
  }
  const faltando = COLUNAS.filter((nome) => !melhor.has(nome));
  throw new ErroPosProva(
    `Planilha inválida: faltam as colunas ${faltando.map((c) => `"${c}"`).join(", ")}. O cabeçalho deve conter "Aluno", "Ocorrência" e "Descrição".`,
  );
}

export function relatorioPosProva(matriz: Celula[][]): RelatorioPosProva {
  const { linha, colunas } = localizarCabecalho(matriz);
  const alunos = new Map<string, { nome: string; provas: ProvaExtraida[] }>();
  let totalOcorrencias = 0;

  for (const dados of matriz.slice(linha + 1)) {
    if (semAcento(texto(dados[colunas["Ocorrência"]])) !== "pos prova") continue;
    const nome = texto(dados[colunas.Aluno]);
    if (!nome) continue;
    totalOcorrencias++;
    if (!alunos.has(nome)) alunos.set(nome, { nome, provas: [] });
    alunos.get(nome)!.provas.push(...extrairProvas(texto(dados[colunas["Descrição"]])));
  }

  if (alunos.size === 0) throw new ErroPosProva('Nenhuma linha com ocorrência "Pós prova" foi encontrada.');
  return { alunos: [...alunos.values()], totalOcorrencias };
}
