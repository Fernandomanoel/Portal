import { useEffect, useMemo, useState } from "react";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { Icone } from "@/components/Icone";
import { CampoPlanilha } from "@/components/ferramentas/CampoPlanilha";
import { DisparoAutomatico } from "@/components/ferramentas/DisparoAutomatico";
import { HistoricoDisparos } from "@/components/ferramentas/HistoricoDisparos";
import type { Tabela } from "@/lib/lerPlanilha";
import {
  LIMITE_MODELO,
  MARCADORES,
  MIN_FALTAS,
  MODELO_PADRAO,
  ROTULO_TURNO,
  lerDestinatarios,
  linkWhatsapp,
  montarMensagem,
  type Destinatario,
  type LeituraMensagens,
  type TipoMensagem,
  type Turno,
} from "@/lib/mensagensAlunos";
import estilos from "./ProfessorMensagensPage.module.css";

const TIPOS: { id: TipoMensagem; rotulo: string; texto: string; colunas: string }[] = [
  {
    id: "faltas",
    rotulo: "Aviso de faltas",
    texto: `Para alunos ativos com ${MIN_FALTAS} ou mais faltas, já descontadas as reposições.`,
    colunas: "Nome Aluno (ou Aluno), Faltas, Reposição, Status Contrato, Telefone Aluno e Telefone Responsável",
  },
  {
    id: "aviso",
    rotulo: "Lembrete por turno",
    texto: "Um recado para os alunos ativos de um turno, ou de todos.",
    colunas: "Nome Aluno (ou Aluno), Turno, Status Contrato, Telefone Aluno e Telefone Responsável",
  },
];

const CHAVE_MODELO = (tipo: TipoMensagem) => `portal:mensagens:modelo:${tipo}`;

function modeloGuardado(tipo: TipoMensagem): string {
  try {
    return localStorage.getItem(CHAVE_MODELO(tipo)) ?? MODELO_PADRAO[tipo];
  } catch {
    return MODELO_PADRAO[tipo];
  }
}

const telefoneBr = (numero: string) => numero.replace(/^55(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");

export function ProfessorMensagensPage() {
  const [tipo, definirTipo] = useState<TipoMensagem>("faltas");
  const [modelos, definirModelos] = useState<Record<TipoMensagem, string>>(() => ({ faltas: modeloGuardado("faltas"), aviso: modeloGuardado("aviso") }));
  const [tabela, definirTabela] = useState<Tabela | null>(null);
  const [erroLeitura, definirErroLeitura] = useState("");
  const [turno, definirTurno] = useState<Turno | "TODOS">("TODOS");
  const [abertos, definirAbertos] = useState<Set<string>>(new Set());
  const [copiado, definirCopiado] = useState("");
  const [versaoHistorico, definirVersaoHistorico] = useState(0);

  const modelo = modelos[tipo];
  const escolhido = TIPOS.find((t) => t.id === tipo)!;

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_MODELO(tipo), modelo);
    } catch {
      // Sem armazenamento (janela anônima): o modelo vale só enquanto a página estiver aberta.
    }
  }, [tipo, modelo]);

  const leitura = useMemo((): { dados: LeituraMensagens | null; erro: string } => {
    if (!tabela) return { dados: null, erro: "" };
    try {
      return { dados: lerDestinatarios(tabela, tipo), erro: "" };
    } catch (falha) {
      return { dados: null, erro: falha instanceof Error ? falha.message : "Não foi possível ler a planilha." };
    }
  }, [tabela, tipo]);

  const erro = erroLeitura || leitura.erro;
  const todos = leitura.dados?.destinatarios ?? [];
  const visiveis = tipo === "aviso" && turno !== "TODOS" ? todos.filter((d) => d.turno === turno) : todos;
  const comTelefone = visiveis.filter((d) => d.canais.length > 0);
  const semTelefone = visiveis.filter((d) => d.canais.length === 0);
  const chave = (d: Destinatario, numero: string) => `${d.nome}|${numero}`;
  const feitos = comTelefone.filter((d) => d.canais.some((c) => abertos.has(chave(d, c.numero)))).length;

  async function copiar(d: Destinatario) {
    try {
      await navigator.clipboard.writeText(montarMensagem(tipo, modelo, d));
      definirCopiado(d.nome);
    } catch {
      definirCopiado("");
    }
  }

  return (
    <>
      <CabecalhoPagina
        titulo="Mensagens para alunos"
        texto="Envie a planilha de controle e o portal monta a mensagem de cada aluno. Você pode abrir o WhatsApp aluno por aluno, com o texto pronto, ou disparar para todos de uma vez pelo envio automático."
      />

      <div className={estilos.tipos} role="radiogroup" aria-label="Tipo de mensagem">
        {TIPOS.map((t) => (
          <label key={t.id} className={estilos.tipo} data-ativo={tipo === t.id}>
            <input type="radio" name="tipo-mensagem" checked={tipo === t.id} onChange={() => definirTipo(t.id)} />
            <span>
              <strong>{t.rotulo}</strong>
              <span className={estilos.suave}>{t.texto}</span>
            </span>
          </label>
        ))}
      </div>

      <div className={estilos.modelo}>
        <label htmlFor="modelo-mensagem">Texto da mensagem</label>
        <textarea id="modelo-mensagem" rows={4} maxLength={LIMITE_MODELO} value={modelo} onChange={(e) => definirModelos({ ...modelos, [tipo]: e.target.value })} />
        <p className={estilos.suave}>
          Use {MARCADORES[tipo].map((m, i) => (
            <span key={m}>
              {i > 0 && " e "}
              <code>{m}</code>
            </span>
          ))}{" "}
          onde o portal deve escrever os dados de cada aluno. O texto fica guardado neste navegador.{" "}
          {modelo !== MODELO_PADRAO[tipo] && (
            <button type="button" className={estilos.ligacao} onClick={() => definirModelos({ ...modelos, [tipo]: MODELO_PADRAO[tipo] })}>
              Voltar ao texto padrão
            </button>
          )}
        </p>
      </div>

      <CampoPlanilha
        rotulo={tabela ? "Trocar a planilha" : "Escolher a planilha de controle"}
        colunas={escolhido.colunas}
        aoLer={(nova) => {
          definirTabela(nova);
          definirErroLeitura("");
          definirAbertos(new Set());
        }}
        aoFalhar={(mensagem) => {
          definirTabela(null);
          definirErroLeitura(mensagem);
        }}
      />

      {erro && (
        <p className={estilos.erro} role="alert">
          <Icone nome="alerta" tamanho={16} />
          {erro}
        </p>
      )}

      {leitura.dados && (
        <>
          <section className={estilos.resumo} aria-label="Resumo">
            <p>
              <strong>{comTelefone.length}</strong> mensagem(ns) para enviar · <strong>{feitos}</strong> já aberta(s) no WhatsApp
              {semTelefone.length > 0 && ` · ${semTelefone.length} sem telefone válido`}
            </p>
            <p className={estilos.suave}>
              {leitura.dados.ignorados.inativos > 0 && `${leitura.dados.ignorados.inativos} aluno(s) com contrato não ativo ficaram de fora. `}
              {tipo === "faltas" && leitura.dados.ignorados.poucasFaltas > 0 && `${leitura.dados.ignorados.poucasFaltas} aluno(s) com menos de ${MIN_FALTAS} faltas ficaram de fora.`}
            </p>
            {tipo === "aviso" && (
              <label className={estilos.turno}>
                Turno
                <select value={turno} onChange={(e) => definirTurno(e.target.value as Turno | "TODOS")}>
                  <option value="TODOS">Todos</option>
                  {(Object.keys(ROTULO_TURNO) as Turno[]).map((t) => (
                    <option key={t} value={t}>
                      {ROTULO_TURNO[t]}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </section>

          {comTelefone.length === 0 && <p className={estilos.suave}>Nenhum aluno desta planilha recebe esta mensagem.</p>}

          <ul className={estilos.lista}>
            {comTelefone.map((d, i) => {
              const mensagem = montarMensagem(tipo, modelo, d);
              const feito = d.canais.some((c) => abertos.has(chave(d, c.numero)));
              return (
                <li key={`${d.nome}-${i}`} className={estilos.item} data-feito={feito}>
                  <div className={estilos.quem}>
                    <strong>{d.nome}</strong>
                    <span className={estilos.suave}>
                      {tipo === "faltas" ? `${d.faltas} falta(s)${d.reposicoes ? ` (${d.faltasPlanilha} na planilha, ${d.reposicoes} reposta(s))` : ""}` : `Turno: ${d.turnoRotulo}`}
                    </span>
                    {feito && (
                      <span className={estilos.feito}>
                        <Icone nome="check" tamanho={14} />
                        Aberta no WhatsApp
                      </span>
                    )}
                  </div>
                  <p className={estilos.mensagem}>{mensagem}</p>
                  <div className={estilos.acoes}>
                    {d.canais.map((c) => (
                      <a
                        key={c.numero}
                        className={estilos.enviar}
                        href={linkWhatsapp(c.numero, mensagem)}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => definirAbertos((antes) => new Set(antes).add(chave(d, c.numero)))}
                      >
                        <Icone nome="conversa" tamanho={16} />
                        {c.de === "aluno" ? "Aluno" : "Responsável"} · {telefoneBr(c.numero)}
                      </a>
                    ))}
                    <button type="button" className={estilos.copiar} onClick={() => void copiar(d)}>
                      <Icone nome="copiar" tamanho={16} />
                      {copiado === d.nome ? "Copiada" : "Copiar texto"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          {semTelefone.length > 0 && (
            <section className={estilos.semTelefone} aria-labelledby="sem-telefone">
              <h2 id="sem-telefone">Sem telefone válido</h2>
              <p className={estilos.suave}>Estes alunos entrariam na lista, mas a planilha não tem um telefone com DDD para eles.</p>
              <ul>
                {semTelefone.map((d, i) => (
                  <li key={`${d.nome}-${i}`}>{d.nome}</li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}

      {/* Sempre visível: é aqui que o link do instalador da Evolution liga o portal, antes de qualquer planilha. */}
      <DisparoAutomatico key={tipo} tipo={tipo} modelo={modelo} destinatarios={visiveis} aoRegistrar={() => definirVersaoHistorico((v) => v + 1)} />

      <HistoricoDisparos versao={versaoHistorico} />
    </>
  );
}
