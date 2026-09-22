import { useState } from "react";

import { Icone } from "@/components/Icone";
import { corrigirItem, type ResultadoItem } from "@/lib/atividadeAutocorrigida";
import type { AtividadeAutocorrigida, Campo } from "@/types/atividadeAutocorrigida";
import estilos from "./AtividadeAutocorrigida.module.css";

interface Props {
  atividade: AtividadeAutocorrigida;
}

type Resultados = Record<string, ResultadoItem>;

export function AtividadeAutocorrigidaVisao({ atividade }: Props) {
  const [respostas, definirRespostas] = useState<Record<string, string>>({});
  const [resultados, definirResultados] = useState<Resultados | null>(null);

  function atualizar(id: string, valor: string) {
    definirRespostas((atual) => ({ ...atual, [id]: valor }));
  }

  function corrigir() {
    const proximos: Resultados = {};
    for (const item of atividade.itens) {
      proximos[item.id] = corrigirItem(item, respostas);
    }
    definirResultados(proximos);
  }

  const resumo = resultados && resumirResultados(resultados);

  return (
    <div className={estilos.pagina}>
      <p className={estilos.introducao}>{atividade.introducao}</p>

      {resumo && (
        <div className={estilos.resumo}>
          <span className={estilos.resumoCerto}>{resumo.certas} certa{resumo.certas === 1 ? "" : "s"}</span>
          <span className={estilos.resumoRevisar}>{resumo.revisar} para revisar</span>
          <span className={estilos.resumoVazio}>{resumo.vazias} em branco</span>
        </div>
      )}

      <ol className={estilos.lista}>
        {atividade.itens.map((item, indice) => (
          <li key={item.id} className={estilos.item}>
            <div className={estilos.itemCabecalho}>
              <span className={estilos.itemNumero}>{indice + 1}</span>
              <h3 className={estilos.itemTitulo}>{item.titulo}</h3>
            </div>

            {item.cenario && <p className={estilos.cenario}>{item.cenario}</p>}
            {item.instrucao && <p className={estilos.instrucao}>{item.instrucao}</p>}

            {item.tabelaReferencia && (
              <div className={estilos.tabelaEnvoltorio}>
                <table className={estilos.tabela}>
                  <thead>
                    <tr>
                      {item.tabelaReferencia.colunas.map((coluna) => (
                        <th key={coluna}>{coluna}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {item.tabelaReferencia.linhas.map((linha, linhaIndice) => (
                      <tr key={linhaIndice}>
                        {linha.map((celula, celulaIndice) => (
                          <td key={celulaIndice}>{celula}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className={estilos.campos}>
              {item.campos.map((campo) => (
                <CampoEntrada
                  key={campo.id}
                  campo={campo}
                  valor={respostas[campo.id] ?? ""}
                  resultado={resultados?.[item.id]?.campos[campo.id]}
                  aoMudar={(valor) => atualizar(campo.id, valor)}
                />
              ))}
            </div>
          </li>
        ))}
      </ol>

      <div className={estilos.acoes}>
        <button type="button" className={estilos.corrigir} onClick={corrigir}>
          Corrigir atividade
        </button>
      </div>
    </div>
  );
}

function resumirResultados(resultados: Resultados) {
  let certas = 0;
  let revisar = 0;
  let vazias = 0;
  for (const resultado of Object.values(resultados)) {
    if (resultado.status === "certo") certas++;
    else if (resultado.status === "vazio") vazias++;
    else revisar++;
  }
  return { certas, revisar, vazias };
}

interface CampoProps {
  campo: Campo;
  valor: string;
  resultado: ResultadoItem["campos"][string] | undefined;
  aoMudar: (valor: string) => void;
}

function CampoEntrada({ campo, valor, resultado, aoMudar }: CampoProps) {
  if (!campo.regra) {
    return (
      <p className={estilos.somenteLeitura}>
        {campo.rotulo && <strong>{campo.rotulo}: </strong>}
        {campo.valorPadrao}
      </p>
    );
  }

  const classeCampo =
    resultado?.status === "certo"
      ? `${estilos.controle} ${estilos.controleCerto}`
      : resultado?.status === "errado"
        ? `${estilos.controle} ${estilos.controleErrado}`
        : estilos.controle;

  return (
    <div className={estilos.campo}>
      {campo.rotulo && <label className={estilos.rotulo}>{campo.rotulo}</label>}

      {campo.regra.tipo === "selecao" ? (
        <select className={classeCampo} value={valor} onChange={(evento) => aoMudar(evento.target.value)}>
          <option value="">Selecione...</option>
          {campo.regra.opcoes.map((opcao) => (
            <option key={opcao.valor} value={opcao.valor}>
              {opcao.texto}
            </option>
          ))}
        </select>
      ) : campo.regra.tipo === "multipla_escolha" ? (
        <div className={estilos.opcoes} role="radiogroup">
          {campo.regra.opcoes.map((texto, indice) => (
            <label key={indice} className={estilos.opcao}>
              <input
                type="radio"
                name={campo.id}
                checked={valor === String(indice)}
                onChange={() => aoMudar(String(indice))}
              />
              <span>{texto}</span>
            </label>
          ))}
        </div>
      ) : campo.regra.tipo === "texto" ? (
        <textarea
          className={classeCampo}
          value={valor}
          placeholder={campo.placeholder}
          onChange={(evento) => aoMudar(evento.target.value)}
        />
      ) : (
        <input
          type="text"
          className={classeCampo}
          value={valor}
          placeholder={campo.placeholder}
          onChange={(evento) => aoMudar(evento.target.value)}
        />
      )}

      {resultado && resultado.status !== "vazio" && (
        <p className={resultado.status === "certo" ? estilos.feedbackCerto : estilos.feedbackErrado}>
          <Icone nome={resultado.status === "certo" ? "check" : "x"} tamanho={14} />
          {resultado.mensagem ?? (resultado.status === "certo" ? "Correto." : "Reveja essa resposta.")}
        </p>
      )}
    </div>
  );
}
