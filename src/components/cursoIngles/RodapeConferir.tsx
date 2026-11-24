import type { MensagensConferencia, RotulosConferencia } from "@/types/aulaIngles";
import { preencherMensagem } from "@/lib/aulaIngles";
import estilos from "./RodapeConferir.module.css";

interface Props {
  /** `null` até o aluno conferir. */
  resultado: { n: number; total: number } | null;
  mensagens: MensagensConferencia;
  rotulos?: RotulosConferencia;
  aoConferir: () => void;
  aoReiniciar: () => void;
}

/** Botões «CHECK THE ANSWERS» / «RESET / TRY AGAIN» e a mensagem do resultado, iguais em todas as práticas. */
export function RodapeConferir({ resultado, mensagens, rotulos, aoConferir, aoReiniciar }: Props) {
  const tudoCerto = resultado !== null && resultado.n === resultado.total;
  return (
    <>
      {resultado && (
        <p className={estilos.mensagem} data-estado={tudoCerto ? "ok" : "erro"} role="status">
          {preencherMensagem(tudoCerto ? mensagens.ok : mensagens.parcial, resultado.n, resultado.total)}
        </p>
      )}
      <div className={estilos.botoes}>
        <button type="button" className={estilos.principal} onClick={aoConferir}>
          {rotulos?.conferir ?? "CHECK THE ANSWERS"}
        </button>
        <button type="button" className={estilos.secundario} onClick={aoReiniciar}>
          {rotulos?.reiniciar ?? "RESET / TRY AGAIN"}
        </button>
      </div>
    </>
  );
}
