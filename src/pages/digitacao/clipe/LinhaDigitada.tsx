import estilos from "./LinhaDigitada.module.css";

/** O verso inteiro, com o que já foi digitado em destaque e a próxima letra marcada. */
export function LinhaDigitada({ texto, digitado, erro }: { texto: string; digitado: string; erro: boolean }) {
  const palavras = texto.split(" ");
  const inicios = palavras.map((_, i) => palavras.slice(0, i).reduce((soma, w) => soma + w.length + 1, 0));
  const classeDe = (n: number) => (n < digitado.length ? estilos.feita : n === digitado.length ? `${estilos.atual}${erro ? ` ${estilos.erro}` : ""}` : estilos.falta);
  return (
    <p className={estilos.linha} aria-label={texto}>
      {palavras.map((palavra, indice) => {
        const inicio = inicios[indice];
        const ultima = indice === palavras.length - 1;
        return (
          <span key={indice} className={estilos.palavra} aria-hidden="true">
            {[...palavra].map((letra, i) => (
              <span key={i} className={classeDe(inicio + i)}>
                {letra}
              </span>
            ))}
            {!ultima && <span className={classeDe(inicio + palavra.length)}>{" "}</span>}
          </span>
        );
      })}
    </p>
  );
}
