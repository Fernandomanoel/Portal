import { useMemo, useState } from "react";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { Icone } from "@/components/Icone";
import { CONFIG_PADRAO, calcularAcompanhamento, mensagemAoResponsavel, moeda, numero, type EntradaAcompanhamento, type Situacao } from "@/lib/acompanhamentoModulos";
import { limparTelefone, linkWhatsapp } from "@/lib/mensagensAlunos";
import estilos from "./ProfessorAcompanhamentoPage.module.css";

type Campos = Record<Exclude<keyof EntradaAcompanhamento, "nome">, string> & { nome: string; telefone: string };

const INICIAL: Campos = {
  nome: "",
  telefone: "",
  parcelasPagas: "",
  moduloAtual: "",
  totalModulos: "",
  faltas: "",
  aulasPorSemana: String(CONFIG_PADRAO.aulasPorSemana),
  aulasPorModulo: String(CONFIG_PADRAO.aulasPorModulo),
  mensalidadesPorModulo: String(CONFIG_PADRAO.mensalidadesPorModulo),
  valorReposicao: String(CONFIG_PADRAO.valorReposicao),
};

const DADOS: { campo: keyof Campos; rotulo: string; exemplo: string }[] = [
  { campo: "parcelasPagas", rotulo: "Parcelas pagas", exemplo: "Ex.: 8" },
  { campo: "moduloAtual", rotulo: "Módulo atual", exemplo: "Ex.: 2" },
  { campo: "totalModulos", rotulo: "Total de módulos", exemplo: "Ex.: 6" },
  { campo: "faltas", rotulo: "Faltas", exemplo: "Ex.: 12" },
];

const REGRAS: { campo: keyof Campos; rotulo: string }[] = [
  { campo: "aulasPorSemana", rotulo: "Aulas por semana" },
  { campo: "aulasPorModulo", rotulo: "Aulas por módulo" },
  { campo: "mensalidadesPorModulo", rotulo: "Mensalidades por módulo" },
  { campo: "valorReposicao", rotulo: "Valor de cada reposição (R$)" },
];

const CLASSE: Record<Situacao, string> = { REGULAR: estilos.regular, "ATENÇÃO": estilos.atencao, PENDENTE: estilos.pendente };
const TEXTO: Record<Situacao, string> = {
  REGULAR: "Módulo em dia com as parcelas e sem faltas.",
  "ATENÇÃO": "Módulo atrás das parcelas pagas, ou faltas a repor.",
  PENDENTE: "Módulo atrás das parcelas pagas e faltas a repor.",
};

const n = (texto: string) => Number(texto.replace(",", ".")) || 0;

export function ProfessorAcompanhamentoPage() {
  const [c, definirC] = useState<Campos>(INICIAL);
  const [mensagem, definirMensagem] = useState<string | null>(null);
  const [copiada, definirCopiada] = useState(false);

  const preenchido = c.parcelasPagas.trim() !== "" && c.moduloAtual.trim() !== "";
  const resultado = useMemo(
    () =>
      calcularAcompanhamento({
        nome: c.nome,
        parcelasPagas: n(c.parcelasPagas),
        moduloAtual: n(c.moduloAtual),
        totalModulos: n(c.totalModulos),
        faltas: n(c.faltas),
        aulasPorSemana: Number(c.aulasPorSemana.replace(",", ".")),
        aulasPorModulo: Number(c.aulasPorModulo.replace(",", ".")),
        mensalidadesPorModulo: Number(c.mensalidadesPorModulo.replace(",", ".")),
        valorReposicao: Number(c.valorReposicao.replace(",", ".")),
      }),
    [c],
  );
  const valido = "situacao" in resultado ? resultado : null;
  const texto = mensagem ?? (valido ? mensagemAoResponsavel(valido) : "");
  const telefone = limparTelefone(c.telefone);

  const mudar = (campo: keyof Campos, valor: string) => {
    definirC({ ...c, [campo]: valor });
    definirMensagem(null);
    definirCopiada(false);
  };

  const campo = ({ campo: id, rotulo, exemplo }: { campo: keyof Campos; rotulo: string; exemplo?: string }) => (
    <label key={id} className={estilos.campo}>
      <span>{rotulo}</span>
      <input inputMode="decimal" value={c[id]} placeholder={exemplo} onChange={(e) => mudar(id, e.target.value)} />
    </label>
  );

  return (
    <>
      <CabecalhoPagina
        titulo="Acompanhamento de módulos"
        texto="Informe as parcelas pagas, o módulo em que o aluno está e as faltas. O portal diz se ele está regular, em atenção ou pendente, mostra a conta e monta a mensagem para o responsável. Nada é guardado."
      />

      <div className={estilos.colunas}>
        <form className={estilos.painel} onSubmit={(e) => e.preventDefault()}>
          <h2>Dados do aluno</h2>
          <div className={estilos.grade}>
            <label className={estilos.campo}>
              <span>Nome (para a mensagem)</span>
              <input value={c.nome} maxLength={80} placeholder="Ex.: João" onChange={(e) => mudar("nome", e.target.value)} />
            </label>
            <label className={estilos.campo}>
              <span>WhatsApp do responsável (opcional)</span>
              <input value={c.telefone} inputMode="tel" maxLength={20} placeholder="Ex.: (92) 99123-4567" onChange={(e) => mudar("telefone", e.target.value)} />
            </label>
            {DADOS.map(campo)}
          </div>
          <h2>Regras do curso</h2>
          <div className={estilos.grade}>{REGRAS.map(campo)}</div>
          <button type="button" className={estilos.acao} onClick={() => { definirC(INICIAL); definirMensagem(null); }}>
            Limpar
          </button>
        </form>

        <section className={estilos.painel} aria-live="polite" aria-label="Resultado">
          <h2>Resultado</h2>
          {"erros" in resultado ? (
            <ul className={estilos.erros}>
              {resultado.erros.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          ) : !preenchido ? (
            <p className={estilos.suave}>Preencha as parcelas pagas e o módulo atual para ver a análise.</p>
          ) : (
            <>
              <p className={`${estilos.situacao} ${CLASSE[resultado.situacao]}`}>
                <Icone nome={resultado.situacao === "REGULAR" ? "check" : "alerta"} tamanho={18} />
                <strong>{resultado.situacao}</strong>
                <span>{TEXTO[resultado.situacao]}</span>
              </p>
              <dl className={estilos.numeros}>
                <div>
                  <dt>Módulos pagos</dt>
                  <dd>{numero(resultado.modulosCorrespondentes)}</dd>
                </div>
                <div>
                  <dt>Módulos de diferença</dt>
                  <dd>{numero(resultado.diferencaModulos)}</dd>
                </div>
                <div>
                  <dt>Semanas de reposição</dt>
                  <dd>{numero(resultado.semanasReposicaoCeil)}</dd>
                </div>
                <div>
                  <dt>Valor das reposições</dt>
                  <dd>{moeda(resultado.valorReposicoes)}</dd>
                </div>
                <div>
                  <dt>Mensalidades a mais, sem repor</dt>
                  <dd>{numero(resultado.mensalidadesAdicionaisCeil)}</dd>
                </div>
              </dl>
              <details className={estilos.conta}>
                <summary>Ver a conta</summary>
                <p>{resultado.explicacao}</p>
              </details>
            </>
          )}
        </section>
      </div>

      {valido && preenchido && (
        <section className={estilos.painel} aria-labelledby="titulo-mensagem">
          <h2 id="titulo-mensagem">Mensagem para o responsável</h2>
          <textarea className={estilos.mensagem} rows={12} value={texto} aria-labelledby="titulo-mensagem" onChange={(e) => definirMensagem(e.target.value)} />
          <div className={estilos.acoes}>
            {telefone && (
              <a className={estilos.enviar} href={linkWhatsapp(telefone, texto)} target="_blank" rel="noreferrer">
                <Icone nome="conversa" tamanho={16} />
                Abrir no WhatsApp
              </a>
            )}
            <button
              type="button"
              className={estilos.acao}
              onClick={() =>
                void navigator.clipboard.writeText(texto).then(
                  () => definirCopiada(true),
                  () => definirCopiada(false),
                )
              }
            >
              <Icone nome="copiar" tamanho={16} />
              {copiada ? "Copiada" : "Copiar mensagem"}
            </button>
            {mensagem !== null && (
              <button type="button" className={estilos.acao} onClick={() => definirMensagem(null)}>
                Voltar ao texto automático
              </button>
            )}
          </div>
          {!telefone && <p className={estilos.suave}>Informe o WhatsApp do responsável, com DDD, para abrir a conversa com a mensagem pronta.</p>}
        </section>
      )}
    </>
  );
}
