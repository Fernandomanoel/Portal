import { Icone } from "@/components/Icone";
import type { Progresso } from "./motor";
import estilos from "./MapaNiveis.module.css";

interface Props {
  niveis: { nome: string }[];
  atual: number;
  progresso: Progresso;
  aoEscolher: (nivel: number) => void;
}

/** Botões de nível: concluídos mostram as estrelas, os ainda não liberados ficam com cadeado. */
export function MapaNiveis({ niveis, atual, progresso, aoEscolher }: Props) {
  const feitos = Object.keys(progresso.estrelas).length;
  return (
    <nav className={estilos.mapa} aria-label={`Níveis: ${feitos} de ${niveis.length} concluídos`}>
      {niveis.map((nivel, i) => {
        const aberto = i <= progresso.liberado;
        const estrelas = progresso.estrelas[i];
        return (
          <button
            key={nivel.nome}
            type="button"
            className={[estilos.nivel, i === atual ? estilos.atual : "", estrelas ? estilos.feito : ""].join(" ")}
            disabled={!aberto}
            title={`Nível ${i + 1}: ${nivel.nome}${aberto ? "" : " (termine o anterior)"}`}
            aria-current={i === atual ? "step" : undefined}
            onClick={(evento) => {
              evento.stopPropagation();
              aoEscolher(i);
            }}
          >
            {aberto ? i + 1 : <Icone nome="cadeado" tamanho={13} />}
            {estrelas ? (
              <span className={estilos.estrelas} aria-label={`${estrelas} de 3 estrelas`}>
                {[1, 2, 3].map((n) => (
                  <i key={n} className={n <= estrelas ? estilos.cheia : ""} />
                ))}
              </span>
            ) : null}
          </button>
        );
      })}
    </nav>
  );
}
