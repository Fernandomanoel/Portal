import { useState } from "react";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { Icone, type NomeIcone } from "@/components/Icone";
import {
  analisarContrato,
  CONFIG_CONTRATO,
  formatarMoeda,
  formatarNumero,
  mensagemParaResponsavel,
  type Situacao,
} from "@/lib/analisadorContratos";
import estilos from "./ProfessorAnalisadorPage.module.css";

const VAZIO = { nome: "", parcelasPagas: "", moduloAtual: "", totalModulos: "", faltas: "" };

const CAMPOS_NUMERICOS = [
  { nome: "parcelasPagas", rotulo: "Parcelas pagas" },
  { nome: "moduloAtual", rotulo: "Módulo atual ou concluído" },
  { nome: "totalModulos", rotulo: "Total de módulos" },
  { nome: "faltas", rotulo: "Quantidade de faltas" },
] as const;

const SITUACOES: Record<Situacao, { rotulo: string; icone: NomeIcone; classe: string }> = {
  REGULAR: { rotulo: "Regular", icone: "check", classe: estilos.regular },
  "ATENÇÃO": { rotulo: "Atenção", icone: "alerta", classe: estilos.atencao },
  PENDENTE: { rotulo: "Pendente", icone: "alerta", classe: estilos.pendente },
};

function numero(texto: string): number {
  const valor = Number(texto);
  return Number.isFinite(valor) ? valor : 0;
}

export function ProfessorAnalisadorPage() {
  const [campos, definirCampos] = useState(VAZIO);
  const [mensagem, definirMensagem] = useState("");
  const [copiado, definirCopiado] = useState(false);

  const resultado = analisarContrato({
    nome: campos.nome,
    parcelasPagas: numero(campos.parcelasPagas),
    moduloAtual: numero(campos.moduloAtual),
    totalModulos: numero(campos.totalModulos),
    faltas: numero(campos.faltas),
  });

  function mudar(nome: keyof typeof VAZIO, valor: string) {
    definirCampos((antes) => ({ ...antes, [nome]: valor }));
    definirCopiado(false);
  }

  function limpar() {
    definirCampos(VAZIO);
    definirMensagem("");
    definirCopiado(false);
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(mensagem);
      definirCopiado(true);
    } catch {
      definirCopiado(false);
    }
  }

  return (
    <>
      <CabecalhoPagina
        titulo="Analisador de contratos"
        texto="Compare as parcelas pagas com o módulo em que o aluno está e veja quanto as faltas custam em reposição ou em extensão do contrato. Nada do que você digita aqui é salvo ou enviado."
      />

      <div className={estilos.grade}>
        <form className={estilos.painel} onSubmit={(evento) => evento.preventDefault()}>
          <h2 className={estilos.subtitulo}>Dados do aluno</h2>

          <div className={estilos.campo}>
            <label htmlFor="analisador-nome">Nome do aluno</label>
            <input id="analisador-nome" type="text" autoComplete="off" value={campos.nome} onChange={(e) => mudar("nome", e.target.value)} />
          </div>

          {CAMPOS_NUMERICOS.map(({ nome, rotulo }) => (
            <div key={nome} className={estilos.campo}>
              <label htmlFor={`analisador-${nome}`}>{rotulo}</label>
              <input
                id={`analisador-${nome}`}
                type="number"
                inputMode="numeric"
                min={0}
                value={campos[nome]}
                onChange={(e) => mudar(nome, e.target.value)}
              />
            </div>
          ))}

          <p className={estilos.regra}>
            Conta com {CONFIG_CONTRATO.aulasPorSemana} aulas por semana, {CONFIG_CONTRATO.aulasPorModulo} aulas e{" "}
            {CONFIG_CONTRATO.mensalidadesPorModulo} mensalidades por módulo, e {formatarMoeda(CONFIG_CONTRATO.valorReposicao)} por
            reposição.
          </p>

          <button type="button" className={estilos.secundario} onClick={limpar}>
            <Icone nome="recomecar" tamanho={16} />
            Limpar
          </button>
        </form>

        <section className={estilos.painel} aria-labelledby="analisador-resultado" aria-live="polite">
          <h2 id="analisador-resultado" className={estilos.subtitulo}>
            Resultado
          </h2>

          {!resultado.valido ? (
            <ul className={estilos.erros} role="alert">
              {resultado.erros.map((erro) => (
                <li key={erro}>{erro}</li>
              ))}
            </ul>
          ) : (
            <>
              <p className={`${estilos.situacao} ${SITUACOES[resultado.analise.situacao].classe}`}>
                <Icone nome={SITUACOES[resultado.analise.situacao].icone} tamanho={16} />
                {SITUACOES[resultado.analise.situacao].rotulo}
              </p>

              <dl className={estilos.numeros}>
                <div>
                  <dt>Valor das reposições</dt>
                  <dd>{formatarMoeda(resultado.analise.valorReposicoes)}</dd>
                </div>
                <div>
                  <dt>Semanas de reposição</dt>
                  <dd>{formatarNumero(resultado.analise.semanasReposicao)}</dd>
                </div>
                <div>
                  <dt>Mensalidades extras</dt>
                  <dd>{formatarNumero(resultado.analise.mensalidadesAdicionais)}</dd>
                </div>
                <div>
                  <dt>Módulos pelas parcelas</dt>
                  <dd>{formatarNumero(resultado.analise.modulosCorrespondentes)}</dd>
                </div>
                <div>
                  <dt>Diferença de módulos</dt>
                  <dd>{formatarNumero(resultado.analise.diferencaModulos)}</dd>
                </div>
              </dl>

              <details className={estilos.conta}>
                <summary>Ver a conta passo a passo</summary>
                <pre>{resultado.analise.explicacao}</pre>
              </details>

              <button type="button" className={estilos.primario} onClick={() => definirMensagem(mensagemParaResponsavel(resultado.analise))}>
                <Icone nome="conversa" tamanho={16} />
                Gerar mensagem para o responsável
              </button>

              {mensagem && (
                <div className={estilos.campo}>
                  <label htmlFor="analisador-mensagem">Mensagem (pode editar antes de copiar)</label>
                  <textarea
                    id="analisador-mensagem"
                    rows={12}
                    value={mensagem}
                    onChange={(e) => {
                      definirMensagem(e.target.value);
                      definirCopiado(false);
                    }}
                  />
                  <button type="button" className={estilos.secundario} onClick={() => void copiar()}>
                    <Icone nome={copiado ? "check" : "copiar"} tamanho={16} />
                    {copiado ? "Copiada" : "Copiar mensagem"}
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
}
