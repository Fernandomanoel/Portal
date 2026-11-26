import type { Tabela } from "@/lib/lerPlanilha";
import { CONFIG_POR_TIPO, DIAS_DA_SEMANA, type AlunoTurma, type TipoTurma } from "@/types/faga";

/**
 * Importa a planilha de agendamentos da escola (colunas Aluno, Matéria, Dias Agendamento, Horas Agendamento,
 * Data Início, Data Final Prevista…) e monta as turmas: alunos que têm os mesmos dias e horário e o mesmo tipo
 * (Annual ou Speed) caem na mesma turma. Só matérias de Inglês entram; o resto é listado como ignorado.
 */

export interface AlunoImportado extends AlunoTurma {
  nivel: string;
  proximoNivel: string;
  inicio: string;
  fim: string;
}

export interface TurmaImportada {
  chave: string;
  nome: string;
  tipo: TipoTurma;
  config: { aulasPorBloco: number; mesesPorLivro: number };
  dias: number[];
  horario: string;
  alunos: AlunoImportado[];
}

export interface ResultadoImportacao {
  turmas: TurmaImportada[];
  /** Matérias que não são de Inglês (Inteligência Emocional, cursos de informática…), com a quantidade de linhas. */
  ignoradas: { materia: string; linhas: number }[];
  /** Alunos que entram, mas com algo a conferir (sem dia ou horário, nome repetido…). */
  avisos: { aluno: string; motivo: string }[];
  totalLinhas: number;
}

const semAcento = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
export const chaveDeNome = (nome: string) => semAcento(nome).replace(/\s+/g, " ");

const DIA_POR_NOME: Record<string, number> = {};
for (const d of DIAS_DA_SEMANA) {
  DIA_POR_NOME[semAcento(d.nome)] = d.id;
  DIA_POR_NOME[semAcento(`${d.nome}-feira`)] = d.id;
  DIA_POR_NOME[semAcento(`${d.nome} feira`)] = d.id;
}

const ehIngles = (materia: string) => /^(annual book|speed)/.test(semAcento(materia));

/** Data da célula (número de série do Excel ou dd/mm/aaaa ou aaaa-mm-dd) em AAAA-MM-DD; vazio se não der. */
export function dataDaCelula(valor: string): string {
  const v = valor.trim();
  if (!v) return "";
  if (/^\d{4}-\d{2}-\d{2}/.test(v)) return v.slice(0, 10);
  const br = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (br) return `${br[3]}-${br[2].padStart(2, "0")}-${br[1].padStart(2, "0")}`;
  const n = Number(v.replace(",", "."));
  if (Number.isFinite(n) && n > 20000 && n < 80000) {
    const d = new Date(Date.UTC(1899, 11, 30) + Math.floor(n) * 86_400_000);
    return d.toISOString().slice(0, 10);
  }
  return "";
}

/** «14:00:00,15:00:00» (ou fração do dia do Excel) em horas inteiras. */
function horasDaCelula(valor: string): number[] {
  const horas: number[] = [];
  for (const parte of valor.split(",")) {
    const p = parte.trim();
    if (!p) continue;
    const hhmm = p.match(/^(\d{1,2}):(\d{2})/);
    const n = Number(p.replace(",", "."));
    const h = hhmm ? Number(hhmm[1]) : Number.isFinite(n) && n >= 0 && n < 1 ? Math.floor(n * 24 + 1e-6) : NaN;
    if (Number.isFinite(h) && !horas.includes(h)) horas.push(h);
  }
  return horas.sort((a, b) => a - b);
}

/** Horas consecutivas viram um intervalo («14h–16h»: duas aulas de 1 hora); senão, a lista. */
function descricaoDoHorario(horas: number[]): string {
  if (!horas.length) return "";
  const seguidas = horas.every((h, i) => i === 0 || h === horas[i - 1] + 1);
  return seguidas ? `${horas[0]}h–${horas[horas.length - 1] + 1}h` : horas.map((h) => `${h}h`).join(", ");
}

const curto = (id: number) => DIAS_DA_SEMANA.find((d) => d.id === id)?.curto ?? "";
const ordemDoDia = (id: number) => (id + 6) % 7;

export function lerPlanilhaDeAlunos(tabela: Tabela): ResultadoImportacao {
  const cab = tabela.findIndex((linha) => linha.some((c) => semAcento(c) === "aluno") && linha.some((c) => semAcento(c) === "materia"));
  if (cab < 0) throw new Error('Planilha inválida: não achei as colunas "Aluno" e "Matéria". Use a planilha de agendamentos exportada pelo sistema da escola.');
  const nomes = tabela[cab].map(semAcento);
  const col = (...opcoes: string[]) => nomes.findIndex((n) => opcoes.includes(n));
  const iAluno = col("aluno");
  const iMateria = col("materia");
  const iDias = col("dias agendamento");
  const iHoras = col("horas agendamento");
  const iProxima = col("proxima materia");
  const iInicio = col("data inicio");
  const iFim = col("data final prevista");
  if (iDias < 0 || iHoras < 0) throw new Error('Planilha inválida: faltam as colunas "Dias Agendamento" e "Horas Agendamento".');
  const celula = (linha: string[], i: number) => (i >= 0 ? (linha[i] ?? "").trim() : "");

  const grupos = new Map<string, TurmaImportada>();
  const ignoradas = new Map<string, number>();
  const avisos: ResultadoImportacao["avisos"] = [];
  const vistos = new Set<string>();
  let totalLinhas = 0;
  let sequencia = 0;

  for (const linha of tabela.slice(cab + 1)) {
    const nome = celula(linha, iAluno).replace(/\s+/g, " ");
    if (!nome) continue;
    totalLinhas += 1;
    const materia = celula(linha, iMateria);
    if (!ehIngles(materia)) {
      ignoradas.set(materia || "(sem matéria)", (ignoradas.get(materia || "(sem matéria)") ?? 0) + 1);
      continue;
    }
    const chaveNome = chaveDeNome(nome);
    if (vistos.has(chaveNome)) {
      avisos.push({ aluno: nome, motivo: "Aparece mais de uma vez em Inglês na planilha: só a primeira linha foi usada." });
      continue;
    }
    vistos.add(chaveNome);

    const dias = [...new Set(celula(linha, iDias).split(",").map((d) => DIA_POR_NOME[semAcento(d)]).filter((d): d is number => d !== undefined))].sort((a, b) => ordemDoDia(a) - ordemDoDia(b));
    const horas = horasDaCelula(celula(linha, iHoras));
    const tipo: TipoTurma = semAcento(materia).startsWith("speed") ? "speed" : "regular";
    if (!dias.length) avisos.push({ aluno: nome, motivo: "Sem dia de aula na planilha." });
    else if (!horas.length) avisos.push({ aluno: nome, motivo: "Sem horário na planilha." });

    const chave = `${tipo}|${dias.join("-")}|${horas.join("-")}`;
    let turma = grupos.get(chave);
    if (!turma) {
      const horario = descricaoDoHorario(horas);
      const diasTexto = dias.length ? dias.map(curto).join(" e ") : "Sem dia";
      turma = { chave, nome: `${tipo === "speed" ? "Speed · " : ""}${diasTexto}${horario ? ` ${horario}` : ""}`, tipo, config: { ...CONFIG_POR_TIPO[tipo] }, dias, horario, alunos: [] };
      grupos.set(chave, turma);
    }
    const proxima = celula(linha, iProxima);
    sequencia += 1;
    turma.alunos.push({
      id: `imp${sequencia}${Math.random().toString(36).slice(2, 8)}`,
      nome,
      livro: "",
      nivel: materia,
      proximoNivel: ehIngles(proxima) ? proxima : "",
      inicio: dataDaCelula(celula(linha, iInicio)),
      fim: dataDaCelula(celula(linha, iFim)),
    });
  }

  const turmas = [...grupos.values()].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR", { numeric: true }));
  for (const t of turmas) t.alunos.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  if (!turmas.length) throw new Error("Nenhum aluno de Inglês (Annual Book ou Speed) foi encontrado na planilha.");
  return { turmas, ignoradas: [...ignoradas].map(([materia, linhas]) => ({ materia, linhas })).sort((a, b) => b.linhas - a.linhas), avisos, totalLinhas };
}
