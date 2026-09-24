import { NOTA_APROVACAO } from "@/types/quiz";

export function dataHora(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

export function hora(iso: string) {
  return new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

export function nota(valor: number) {
  return valor.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export function situacaoDaNota(valor: number | null): "pendente" | "aprovado" | "reprovado" {
  if (valor === null) return "pendente";
  return valor >= NOTA_APROVACAO ? "aprovado" : "reprovado";
}

export function tamanhoLegivel(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} MB`;
}

export function duracao(inicio: string, fim: string) {
  const minutos = Math.max(0, Math.round((new Date(fim).getTime() - new Date(inicio).getTime()) / 60000));
  if (minutos < 60) return `${minutos} min`;
  return `${Math.floor(minutos / 60)} h ${String(minutos % 60).padStart(2, "0")} min`;
}
