import { useState, type ReactNode } from "react";

import { Icone, type NomeIcone } from "@/components/Icone";
import { corrigirItem, itemTemCorrecao, type ResultadoItem } from "@/lib/atividadeAutocorrigida";
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
      if (itemTemCorrecao(item)) proximos[item.id] = corrigirItem(item, respostas);
    }
    definirResultados(proximos);
  }

  const resumo = resultados && resumirResultados(resultados);
  const temCorrecao = atividade.itens.some(itemTemCorrecao);

  return (
    <div className={estilos.pagina}>
      <p className={estilos.introducao}>{atividade.introducao}</p>

      {atividade.regras && (
        <Nota tipo="regras" rotulo={atividade.regras.titulo}>
          <ul className={estilos.regrasLista}>
            {atividade.regras.itens.map((regra) => (
              <li key={regra}>{regra}</li>
            ))}
          </ul>
        </Nota>
      )}

      {resumo && (
        <div className={estilos.resumo}>
          <span className={estilos.resumoCerto}>
            {resumo.certas} certa{resumo.certas === 1 ? "" : "s"}
          </span>
          <span className={estilos.resumoRevisar}>{resumo.revisar} para revisar</span>
          <span className={estilos.resumoVazio}>{resumo.vazias} em branco</span>
        </div>
      )}

      {atividade.itens.length > 3 && (
        <nav className={estilos.indice} aria-label="Índice da atividade">
          <p className={estilos.indiceTitulo}>Nesta atividade</p>
          <ol className={estilos.indiceLista}>
            {atividade.itens.map((item, indice) => (
              <li key={item.id}>
                <a href={`#item-${item.id}`}>
                  <span className={estilos.indiceNumero}>{indice + 1}.</span> {item.titulo}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <ol className={estilos.lista}>
        {atividade.itens.map((item, indice) => (
          <li key={item.id} id={`item-${item.id}`} className={estilos.item}>
            <div className={estilos.itemCabecalho}>
              <span className={estilos.itemNumero}>{indice + 1}.</span>
              <h3 className={estilos.itemTitulo}>{item.titulo}</h3>
            </div>

            {item.cenario && <p className={estilos.cenario}>{item.cenario}</p>}
            {item.instrucao && <p className={estilos.instrucao}>{item.instrucao}</p>}

            {item.passos && item.passos.length > 0 && (
              <>
                <h4 className={estilos.passosTitulo}>Tarefa</h4>
                <ol className={estilos.passos}>
                  {item.passos.map((passo) => (
                    <li key={passo}>{passo}</li>
                  ))}
                </ol>
              </>
            )}

            {item.codigo && (
              <pre className={item.codigo.terminal ? `${estilos.codigo} ${estilos.codigoTerminal}` : estilos.codigo}>
                <code>{item.codigo.terminal ? comoTerminal(item.codigo.conteudo) : item.codigo.conteudo}</code>
              </pre>
            )}

            {item.imagem && (
              <figure className={estilos.imagem}>
                <img src={item.imagem.url} alt={item.imagem.alt} loading="lazy" />
                {item.imagem.legenda && (
                  <figcaption className={estilos.imagemLegenda}>{item.imagem.legenda}</figcaption>
                )}
              </figure>
            )}

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

            {item.desafio && (
              <Nota tipo="desafio" rotulo="Desafio extra">
                {item.desafio}
              </Nota>
            )}

            {item.aviso && (
              <Nota tipo="aviso" rotulo="Atenção">
                {item.aviso}
              </Nota>
            )}

            {item.objetivo && (
              <Nota tipo="objetivo" rotulo="Objetivo">
                {item.objetivo}
              </Nota>
            )}

            {item.campos && item.campos.length > 0 && (
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
            )}
          </li>
        ))}
      </ol>

      {atividade.fonte && (
        <p className={estilos.fonte}>
          {atividade.fonte.texto}{" "}
          <a href={atividade.fonte.url} target="_blank" rel="noopener noreferrer">
            Ver fonte oficial
          </a>
          .
        </p>
      )}

      {temCorrecao && (
        <div className={estilos.acoes}>
          <button type="button" className={estilos.corrigir} onClick={corrigir}>
            Corrigir atividade
          </button>
        </div>
      )}
    </div>
  );
}

const ICONE_NOTA: Record<"objetivo" | "desafio" | "aviso" | "regras", NomeIcone> = {
  objetivo: "alvo",
  desafio: "trofeu",
  aviso: "alerta",
  regras: "escudo",
};

function Nota({ tipo, rotulo, children }: { tipo: keyof typeof ICONE_NOTA; rotulo: string; children: ReactNode }) {
  return (
    <div className={`${estilos.nota} ${estilos[`nota_${tipo}`]}`}>
      <Icone nome={ICONE_NOTA[tipo]} tamanho={18} className={estilos.notaIcone} />
      <div className={estilos.notaCorpo}>
        <p className={estilos.notaRotulo}>{rotulo}</p>
        {typeof children === "string" ? <p>{children}</p> : children}
      </div>
    </div>
  );
}

function comoTerminal(conteudo: string) {
  return conteudo
    .split("\n")
    .map((linha) => (linha.trim() ? `$ ${linha}` : linha))
    .join("\n");
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
