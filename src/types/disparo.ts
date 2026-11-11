/**
 * Histórico dos disparos de WhatsApp feitos pela aba Mensagens. O envio em si sai
 * do navegador para a Evolution API da escola; o portal só guarda o registro, para
 * auditoria: quem disparou, quando, para quem e o que deu certo.
 */

export type StatusDisparo = "enviado" | "falhou" | "sem_telefone" | "cancelado";

export interface ItemDisparo {
  nome: string;
  /** Número que recebeu (ou a última tentativa); vazio quando não havia telefone. */
  numero: string;
  canal: "aluno" | "responsavel" | "";
  status: StatusDisparo;
}

export interface RegistroDisparo {
  id: string;
  unidade: string;
  tipo: "faltas" | "aviso";
  /** Texto do modelo usado, com os marcadores ({nome}, {faltas}, {turno}). */
  modelo: string;
  comImagem: boolean;
  /** Como terminou: até o fim, cancelado por quem disparou, ou interrompido porque o WhatsApp caiu. */
  fim: "completo" | "cancelado" | "desconectado";
  itens: ItemDisparo[];
  disparadoPor: string;
  disparadoEm: string;
}

export const LIMITES_DISPARO = { itens: 2000, modelo: 1000, nome: 120 } as const;
/** O histórico guarda nome e telefone de alunos: fica por 90 dias e é apagado pela limpeza diária. */
export const DIAS_HISTORICO_DISPAROS = 90;
