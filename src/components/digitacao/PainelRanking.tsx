import { useEffect, useState } from "react";

import {
  EVENTO_RANKING,
  obterRanking,
  registrarResultado,
  ultimoApelidoUsado,
  type RegistroRanking,
} from "@/lib/rankingDigitacao";
import estilos from "./PainelRanking.module.css";

interface PainelRankingProps {
  jogoId: string;
  /** Presente quando há um resultado recém-concluído aguardando registro. */
  resultadoPendente?: { ppm: number; precisao: number } | null;
  /** Chamado depois que o apelido é enviado, para o jogo poder liberar o resultado pendente. */
  aoRegistrar?: () => void;
  /**
   * true: mostra só o campo de apelido (usado dentro do próprio jogo, ao
   * terminar uma rodada) — sem a lista, sem título, sem caixa.
   * false (padrão): mostra a lista completa — usado na área geral de
   * ranking (`/digitacao/ranking`), fora do jogo.
   */
  somenteFormulario?: boolean;
}

/**
 * Registro e exibição de recorde, em dois modos: só o formulário de apelido
 * (dentro do jogo, ao terminar uma rodada) ou a lista completa (na área
 * geral de ranking). Provisório em localStorage (ver
 * src/lib/rankingDigitacao.ts) — a interface já é a que vai ficar quando o
 * backend existir.
 */
export function PainelRanking({
  jogoId,
  resultadoPendente,
  aoRegistrar,
  somenteFormulario = false,
}: PainelRankingProps) {
  const [ranking, definirRanking] = useState<RegistroRanking[]>([]);
  const [apelido, definirApelido] = useState("");

  useEffect(() => {
    if (somenteFormulario) return;
    const atualizar = () => definirRanking(obterRanking(jogoId));
    atualizar();
    // Outra aba (ou o professor zerando o placar) muda o armazenamento: a lista acompanha.
    window.addEventListener("storage", atualizar);
    window.addEventListener(EVENTO_RANKING, atualizar);
    return () => {
      window.removeEventListener("storage", atualizar);
      window.removeEventListener(EVENTO_RANKING, atualizar);
    };
  }, [jogoId, somenteFormulario]);

  useEffect(() => {
    if (resultadoPendente) definirApelido(ultimoApelidoUsado());
  }, [resultadoPendente]);

  function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    if (!resultadoPendente) return;
    const atualizado = registrarResultado(jogoId, {
      apelido,
      ppm: resultadoPendente.ppm,
      precisao: resultadoPendente.precisao,
    });
    definirRanking(atualizado);
    aoRegistrar?.();
  }

  const formulario = resultadoPendente && (
    <form className={estilos.formulario} onSubmit={enviar}>
      <label className={estilos.rotulo} htmlFor={`apelido-${jogoId}`}>
        Seu resultado: {resultadoPendente.ppm} ppm · {resultadoPendente.precisao}% de
        precisão. Qual apelido entra no placar?
      </label>
      <div className={estilos.linhaEnvio}>
        <input
          id={`apelido-${jogoId}`}
          className={estilos.campo}
          value={apelido}
          onChange={(evento) => definirApelido(evento.target.value)}
          placeholder="Seu apelido"
          maxLength={24}
          autoFocus
        />
        <button type="submit" className={estilos.botao}>
          Registrar no ranking
        </button>
      </div>
    </form>
  );

  if (somenteFormulario) {
    if (!resultadoPendente) return null;
    return <div className={estilos.somenteFormulario}>{formulario}</div>;
  }

  return (
    <div className={estilos.painel}>
      <h3 className={estilos.titulo}>Recorde da turma</h3>

      {formulario}

      {ranking.length === 0 ? (
        <p className={estilos.vazio}>Ninguém registrou um recorde ainda.</p>
      ) : (
        <ol className={estilos.lista}>
          {ranking.map((registro, indice) => (
            <li key={`${registro.apelido}-${registro.data}`} className={estilos.item}>
              <span className={estilos.posicao}>{indice + 1}º</span>
              <span className={estilos.apelido}>{registro.apelido}</span>
              <span className={estilos.metricas}>
                {registro.ppm} ppm · {registro.precisao}%
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
