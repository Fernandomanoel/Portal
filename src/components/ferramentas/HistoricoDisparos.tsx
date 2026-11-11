import { useEffect, useState } from "react";

import { listarDisparos } from "@/lib/apiDisparos";
import { ErroApi } from "@/lib/apiProvas";
import type { RegistroDisparo, StatusDisparo } from "@/types/disparo";
import estilos from "./HistoricoDisparos.module.css";

const ROTULO_TIPO: Record<RegistroDisparo["tipo"], string> = { faltas: "Aviso de faltas", aviso: "Lembrete por turno" };
const ROTULO_FIM: Record<RegistroDisparo["fim"], string> = { completo: "concluído", cancelado: "cancelado", desconectado: "interrompido (WhatsApp caiu)" };
const ROTULO_STATUS: Record<StatusDisparo, string> = { enviado: "Enviada", falhou: "Falhou", sem_telefone: "Sem telefone", cancelado: "Não enviada" };
const CLASSE_STATUS: Record<StatusDisparo, string> = { enviado: estilos.enviado, falhou: estilos.falhou, sem_telefone: estilos.neutro, cancelado: estilos.neutro };

const quando = (iso: string) => new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
const telefoneBr = (numero: string) => numero.replace(/^55(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");

/** Auditoria dos disparos automáticos: quem disparou, quando e o resultado de cada destinatário. */
export function HistoricoDisparos({ versao }: { versao: number }) {
  const [dados, definirDados] = useState<{ dados: RegistroDisparo[]; diasGuardados: number } | null>(null);
  const [erro, definirErro] = useState("");

  useEffect(() => {
    let ativo = true;
    listarDisparos().then(
      (lidos) => ativo && (definirDados(lidos), definirErro("")),
      (falha) => ativo && definirErro(falha instanceof ErroApi ? falha.message : "Não foi possível carregar o histórico."),
    );
    return () => {
      ativo = false;
    };
  }, [versao]);

  return (
    <section className={estilos.historico} aria-labelledby="titulo-historico">
      <h2 id="titulo-historico">Histórico de disparos</h2>
      {erro ? (
        <p className={estilos.suave} role="alert">
          {erro}
        </p>
      ) : dados === null ? (
        <p className={estilos.suave}>Carregando o histórico…</p>
      ) : dados.dados.length === 0 ? (
        <p className={estilos.suave}>Nenhum disparo automático ainda. Cada disparo fica registrado aqui por {dados.diasGuardados} dias.</p>
      ) : (
        <>
          <p className={estilos.suave}>Os registros ficam guardados por {dados.diasGuardados} dias e depois são apagados sozinhos.</p>
          <ul className={estilos.lista}>
            {dados.dados.map((r) => {
              const de = (s: StatusDisparo) => r.itens.filter((i) => i.status === s).length;
              return (
                <li key={r.id}>
                  <details>
                    <summary>
                      <strong>{ROTULO_TIPO[r.tipo]}</strong>
                      <span>
                        {quando(r.disparadoEm)} · {r.disparadoPor} · {ROTULO_FIM[r.fim]}
                        {r.comImagem && " · com imagem"}
                      </span>
                      <span className={estilos.contas}>
                        {de("enviado")} enviada(s) · {de("falhou")} falha(s)
                        {de("cancelado") + de("sem_telefone") > 0 && ` · ${de("cancelado") + de("sem_telefone")} não enviada(s)`}
                      </span>
                    </summary>
                    <p className={estilos.modelo}>{r.modelo}</p>
                    <div className={estilos.rolagem}>
                      <table>
                        <thead>
                          <tr>
                            <th scope="col">Aluno</th>
                            <th scope="col">Número</th>
                            <th scope="col">Situação</th>
                          </tr>
                        </thead>
                        <tbody>
                          {r.itens.map((i, n) => (
                            <tr key={n}>
                              <th scope="row">{i.nome}</th>
                              <td>{i.numero ? `${telefoneBr(i.numero)}${i.canal === "responsavel" ? " (responsável)" : ""}` : "—"}</td>
                              <td>
                                <span className={`${estilos.status} ${CLASSE_STATUS[i.status]}`}>{ROTULO_STATUS[i.status]}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </details>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
}
