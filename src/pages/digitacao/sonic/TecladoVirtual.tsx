import { LINHAS, NOME_DEDO, acharTecla, type Pressionar } from "./teclado";
import estilos from "./TecladoVirtual.module.css";

interface Props {
  /** Próximo caractere já traduzido em teclas; o primeiro toque fica aceso. */
  proximo: Pressionar[];
  errou: boolean;
}

/** Teclado ABNT2 com a próxima tecla acesa e a cor do dedo que deve apertar. */
export function TecladoVirtual({ proximo, errou }: Props) {
  const agora = proximo[0];
  const acesas = new Set(agora ? [...agora.teclas, ...(agora.shift ? [agora.shift] : [])] : []);
  const principal = agora ? acharTecla(agora.teclas[0]) : undefined;
  const depois = proximo[1] ? acharTecla(proximo[1].teclas[0]) : undefined;

  let instrucao = "";
  if (principal) {
    const nome = principal.id === "espaco" ? "a barra de espaço" : `a tecla ${principal.rotulo}`;
    instrucao = agora?.shift
      ? `Segure Shift com a outra mão e aperte ${nome} com o ${NOME_DEDO[principal.dedo]}.`
      : `Aperte ${nome} com o ${NOME_DEDO[principal.dedo]}.`;
    if (depois) instrucao += ` Depois aperte ${depois.rotulo}.`;
  }

  return (
    <div className={estilos.bloco}>
      <p className={estilos.instrucao} aria-live="polite">
        {instrucao}
      </p>
      <div className={errou ? `${estilos.teclado} ${estilos.errou}` : estilos.teclado} aria-hidden="true">
        {LINHAS.map((linha, i) => (
          <div key={i} className={estilos.linha}>
            {linha.map((tecla) => (
              <span
                key={tecla.id}
                className={[estilos.tecla, acesas.has(tecla.id) ? estilos.acesa : "", tecla.apoio ? estilos.apoio : ""].join(" ")}
                data-dedo={tecla.dedo}
                style={{ flexGrow: tecla.largura ?? 1 }}
              >
                {tecla.rotuloShift && <small>{tecla.rotuloShift}</small>}
                {tecla.rotulo}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
