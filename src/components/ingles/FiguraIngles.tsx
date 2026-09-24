import { FIGURAS, type NomeFigura } from "./figuras";
import estilos from "./FiguraIngles.module.css";

interface Props {
  nome: NomeFigura;
  /** Texto para leitor de tela. No exercício, não pode entregar a resposta. */
  descricao: string;
  className?: string;
}

export function FiguraIngles({ nome, descricao, className }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={className ? `${estilos.figura} ${className}` : estilos.figura} role="img" aria-label={descricao}>
      {FIGURAS[nome]}
    </svg>
  );
}
