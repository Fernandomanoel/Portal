import estilos from "./CampoResposta.module.css";

interface Props {
  valor: string;
  aoMudar: (valor: string) => void;
  verificado: boolean;
  acertou?: boolean;
}

export function CampoResposta({ valor, aoMudar, verificado, acertou }: Props) {
  const classe = [estilos.campo, verificado ? (acertou ? estilos.certo : estilos.errado) : ""].join(" ");

  return (
    <input
      className={classe}
      value={valor}
      onChange={(evento) => aoMudar(evento.target.value)}
      disabled={verificado}
      placeholder="Digite em inglês…"
      aria-label="Sua resposta em inglês"
      lang="en"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={false}
      autoFocus
    />
  );
}
