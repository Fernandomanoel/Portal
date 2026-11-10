/**
 * Disparador de mensagens: a partir da planilha de controle, monta a mensagem
 * de cada aluno e o link que abre o WhatsApp com ela pronta. Quem envia é a
 * pessoa, um clique por aluno; o portal não fala com o WhatsApp sozinho.
 * Regras (faltas reais, mínimo de 2, só contrato ativo, telefone do aluno antes
 * do responsável) vêm do sistema de gestão de origem.
 */
import { comCabecalho, inteiroDaCelula, semAcento, type Tabela } from "./lerPlanilha";

export type TipoMensagem = "faltas" | "aviso";
export type Turno = "MANHA" | "TARDE" | "NOITE";

export const MODELO_PADRAO: Record<TipoMensagem, string> = {
  faltas: "Olá, {nome}! Notamos que você possui {faltas} falta(s) registrada(s). Lembrando que esta é a última semana para realizar a reposição do mês!",
  aviso: "Olá, {nome}! Informamos que não haverá aula no turno da {turno} nesta data. Qualquer dúvida, responda esta mensagem.",
};

export const MARCADORES: Record<TipoMensagem, string[]> = { faltas: ["{nome}", "{faltas}"], aviso: ["{nome}", "{turno}"] };
export const LIMITE_MODELO = 1000;
export const MIN_FALTAS = 2;

export const ROTULO_TURNO: Record<Turno, string> = { MANHA: "Manhã", TARDE: "Tarde", NOITE: "Noite" };

const MAPA_TURNO: Record<string, Turno> = {
  manha: "MANHA",
  matutino: "MANHA",
  morning: "MANHA",
  tarde: "TARDE",
  vespertino: "TARDE",
  afternoon: "TARDE",
  noite: "NOITE",
  noturno: "NOITE",
  night: "NOITE",
};

/** 55 + DDD + número, só dígitos; `null` quando não dá um telefone brasileiro. */
export function limparTelefone(numero: string): string | null {
  let digitos = numero.replace(/\D/g, "");
  if (!digitos) return null;
  if (digitos.startsWith("0") && (digitos.length === 11 || digitos.length === 12)) digitos = digitos.replace(/^0+/, "");
  if (digitos.startsWith("55") && (digitos.length === 12 || digitos.length === 13)) return digitos;
  if (digitos.length === 10 || digitos.length === 11) return `55${digitos}`;
  return null;
}

export interface Canal {
  numero: string;
  de: "aluno" | "responsavel";
}

export interface Destinatario {
  nome: string;
  canais: Canal[];
  faltas?: number;
  faltasPlanilha?: number;
  reposicoes?: number;
  turno?: Turno | null;
  turnoRotulo?: string;
}

function primeiroNome(nome: string): string {
  const primeiro = nome.trim().split(/\s+/)[0] ?? "";
  return primeiro.charAt(0).toLocaleUpperCase("pt-BR") + primeiro.slice(1).toLocaleLowerCase("pt-BR");
}

export function montarMensagem(tipo: TipoMensagem, modelo: string, d: Destinatario): string {
  const base = modelo.trim() || MODELO_PADRAO[tipo];
  return base
    .replaceAll("{nome}", primeiroNome(d.nome))
    .replaceAll("{faltas}", String(d.faltas ?? 0))
    .replaceAll("{turno}", d.turnoRotulo ?? "");
}

export const linkWhatsapp = (numero: string, mensagem: string) => `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

export interface LeituraMensagens {
  destinatarios: Destinatario[];
  /** Linhas deixadas de fora de propósito, para a tela explicar a conta. */
  ignorados: { inativos: number; poucasFaltas: number };
}

export function lerDestinatarios(tabela: Tabela, tipo: TipoMensagem): LeituraMensagens {
  const { coluna, linhas, celula } = comCabecalho(tabela);
  const nomes = [coluna(["Nome Aluno"]), coluna(["Aluno"]), coluna(["Nome do Aluno"])].filter((i) => i >= 0);
  if (!nomes.length) throw new Error('Planilha inválida: falta a coluna "Nome Aluno" ou "Aluno". Use a exportação padrão do sistema da escola.');
  const colFaltas = coluna(["Faltas"]);
  if (tipo === "faltas" && colFaltas < 0) throw new Error('Planilha inválida: falta a coluna "Faltas". Use a exportação padrão do sistema da escola.');
  const colReposicao = coluna(["Reposição", "Reposições"], "reposi");
  const colStatus = coluna(["Status Contrato"]);
  const colTurno = coluna(["Turno"]);
  const colAluno = coluna(["Telefone Aluno"]);
  const colResponsavel = coluna(["Telefone Responsável"]);

  const destinatarios: Destinatario[] = [];
  const ignorados = { inativos: 0, poucasFaltas: 0 };
  for (const linha of linhas) {
    const nome = nomes.map((i) => celula(linha, i)).find(Boolean);
    if (!nome) continue;
    if (colStatus >= 0 && celula(linha, colStatus) !== "Ativo") {
      ignorados.inativos += 1;
      continue;
    }
    const aluno = limparTelefone(celula(linha, colAluno));
    const responsavel = limparTelefone(celula(linha, colResponsavel));
    const canais: Canal[] = [];
    if (aluno) canais.push({ numero: aluno, de: "aluno" });
    if (responsavel && responsavel !== aluno) canais.push({ numero: responsavel, de: "responsavel" });

    if (tipo === "faltas") {
      const faltasPlanilha = inteiroDaCelula(celula(linha, colFaltas));
      const reposicoes = inteiroDaCelula(celula(linha, colReposicao));
      const faltas = Math.max(0, faltasPlanilha - reposicoes);
      if (faltas < MIN_FALTAS) {
        ignorados.poucasFaltas += 1;
        continue;
      }
      destinatarios.push({ nome, canais, faltas, faltasPlanilha, reposicoes });
    } else {
      const bruto = celula(linha, colTurno);
      const turno = MAPA_TURNO[semAcento(bruto)] ?? null;
      destinatarios.push({ nome, canais, turno, turnoRotulo: turno ? ROTULO_TURNO[turno] : bruto || "—" });
    }
  }
  return { destinatarios, ignorados };
}
