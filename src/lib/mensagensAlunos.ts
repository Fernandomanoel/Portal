/**
 * Telefone e link do WhatsApp usados pelo acompanhamento de módulos: o portal só abre o `wa.me` com o texto
 * pronto; quem envia é a pessoa, um clique por aluno. Não existe disparo automático.
 */

/** 55 + DDD + número, só dígitos; `null` quando não dá um telefone brasileiro. */
export function limparTelefone(numero: string): string | null {
  let digitos = numero.replace(/\D/g, "");
  if (!digitos) return null;
  if (digitos.startsWith("0") && (digitos.length === 11 || digitos.length === 12)) digitos = digitos.replace(/^0+/, "");
  if (digitos.startsWith("55") && (digitos.length === 12 || digitos.length === 13)) return digitos;
  if (digitos.length === 10 || digitos.length === 11) return `55${digitos}`;
  return null;
}

export const linkWhatsapp = (numero: string, mensagem: string) => `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
