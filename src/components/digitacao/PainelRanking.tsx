import { useEffect, useState } from "react";

import {
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
}

/**
 * Placar tipo arcade: mostra o top 10 do jogo e, quando há um resultado
 * pendente (rodada recém-terminada), pede o apelido para gravar o recorde.
 *
 * Provisório em localStorage (ver src/lib/rankingDigitacao.ts) — a interface
 * já é a que vai ficar quando o backend existir.
 */
export function PainelRanking({
  jogoId,
  resultadoPendente,
  aoRegistrar,
}: PainelRankingProps) {
  const [ranking, definirRanking] = useState<RegistroRanking[]>([]);
  const [apelido, definirApelido] = useState("");

  useEffect(() => {
    definirRanking(obterRanking(jogoId));
  }, [jogoId]);

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

  return (
    <div className={estilos.painel}>
      <h3 className={estilos.titulo}>Recorde da turma</h3>

      {resultadoPendente && (
        <form className={estilos.formulario} onSubmit={enviar}>
          <label className={estilos.rotulo} htmlFor={`apelido-${jogoId}`}>
            Seu resultado: {resultadoPendente.ppm} ppm ·{" "}
            {resultadoPendente.precisao}% de precisão. Qual apelido entra no
            placar?
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
              Registrar
            </button>
          </div>
        </form>
      )}

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
