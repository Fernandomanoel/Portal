import { MODELOS_FAGA } from "@/data/modelosFaga";
import { blocoDaAula, CONFIG_MODULOS_INGLES, DIAS_DA_SEMANA,  type ConfigModulosIngles, type FaixaFaga, type Turma } from "@/types/faga";

export const novoIdFaga = () => crypto.randomUUID().replace(/-/g, "").slice(0, 12);

/** Aulas, atividades e assuntos da autoavaliação de um livro («FB25»), com ids novos; nada marcado. */
export function modeloDoLivro(livro: string): { livro: string; faixas: FaixaFaga[]; topicos: string[]; config: ConfigModulosIngles } | null {
  const modelo = MODELOS_FAGA.find((m) => m.livro === livro);
  if (!modelo) return null;
  const faixas: FaixaFaga[] = modelo.faixas.map((f) => ({
    id: novoIdFaga(),
    titulo: f.titulo,
    bloco: blocoDaAula(f.titulo),
    inicio: "",
    fim: "",
    professor: "",
    atividades: f.atividades.map((rotulo) => ({ id: novoIdFaga(), rotulo, feita: false })),
  }));
  return { livro: modelo.livro, faixas, topicos: modelo.topicos, config: { ...CONFIG_MODULOS_INGLES, blocosDoLivro: new Set(faixas.map((f) => f.bloco)).size } };
}

const resumoDias = (dias: number[]) => DIAS_DA_SEMANA.filter((d) => dias.includes(d.id)).map((d) => d.curto).join(" e ") || "dias não definidos";

/** «Ter e Qui · 19h · 2 aula(s) por semana». */
export const descricaoDaTurma = (t: Pick<Turma, "dias" | "horario"> & { tipo?: Turma["tipo"] }) => `${t.tipo === "speed" ? "Speed · " : ""}${resumoDias(t.dias)}${t.horario ? ` · ${t.horario}` : ""} · ${t.dias.length} aula(s) por semana`;
