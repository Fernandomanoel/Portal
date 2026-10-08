import { useRef, useState, type KeyboardEvent, type PointerEvent as EventoPonteiro } from "react";

import { Icone, type NomeIcone } from "@/components/Icone";
import {
  alterarColuna,
  alternarTitulo,
  apagarColuna,
  apagarLinha,
  blocos,
  contagem,
  definirTitulo,
  definirValor,
  duplicarLinha,
  inserirLinha,
  inserirTitulo,
  moverColuna,
  moverLinha,
} from "@/lib/editarLista";
import { LARGURA_MAXIMA, LARGURA_MINIMA, TIPOS_COLUNA, type ColunaLista, type LinhaLista, type ListaAcompanhamento, type TipoColuna } from "@/types/lista";
import { ICONE_TIPO } from "./iconesTipo";
import { MenuSuspenso } from "./MenuSuspenso";
import estilos from "./GradeLista.module.css";


interface Props {
  lista: ListaAcompanhamento;
  alterar: (mudar: (lista: ListaAcompanhamento) => ListaAcompanhamento) => void;
  linhaAtiva: string | null;
  definirLinhaAtiva: (id: string | null) => void;
}

const LARGURA_ALCA = 56;

export function GradeLista({ lista, alterar, linhaAtiva, definirLinhaAtiva }: Props) {
  const corpo = useRef<HTMLTableSectionElement>(null);

  function focarCelula(linha: number, coluna: number) {
    // Na linha de título só existe uma célula: as setas param nela, seja qual for a coluna.
    const alvo =
      corpo.current?.querySelector<HTMLElement>(`[data-l="${linha}"][data-c="${coluna}"]`) ??
      corpo.current?.querySelector<HTMLElement>(`[data-l="${linha}"]`);
    alvo?.querySelector<HTMLElement>("input, select, button")?.focus();
  }

  function navegar(evento: KeyboardEvent<HTMLTableSectionElement>) {
    const celula = (evento.target as HTMLElement).closest<HTMLElement>("[data-l]");
    if (!celula) return;
    const l = Number(celula.dataset.l);
    const c = Number(celula.dataset.c);
    const alvo = evento.target as HTMLElement;
    const texto = alvo instanceof HTMLInputElement ? alvo : null;
    const select = alvo instanceof HTMLSelectElement;

    if (evento.key === "ArrowDown" && !select) {
      evento.preventDefault();
      focarCelula(l + 1, c);
    } else if (evento.key === "ArrowUp" && !select) {
      evento.preventDefault();
      focarCelula(l - 1, c);
    } else if (evento.key === "Enter" && texto) {
      evento.preventDefault();
      if (l + 1 >= lista.linhas.length) {
        alterar((atual) => inserirLinha(atual));
        requestAnimationFrame(() => focarCelula(l + 1, c));
      } else focarCelula(l + 1, c);
    } else if (evento.key === "ArrowRight" && (!texto || texto.selectionStart === texto.value.length)) {
      if (c + 1 < lista.colunas.length) {
        evento.preventDefault();
        focarCelula(l, c + 1);
      }
    } else if (evento.key === "ArrowLeft" && (!texto || texto.selectionEnd === 0)) {
      if (c > 0) {
        evento.preventDefault();
        focarCelula(l, c - 1);
      }
    }
  }

  const temRodape = lista.colunas.some((c) => c.tipo === "marca" || c.tipo === "simnao");
  type ItemGrade =
    | { tipo: "linha"; linha: LinhaLista; posicao: number; exibido: number; rotulo: string }
    | { tipo: "subtotal"; titulo: string | null; inicio: number; fim: number };
  const faixas = blocos(lista);
  const linhasDaGrade: ItemGrade[] = [];
  let numero = 0;
  let nBloco = 0;
  let blocoAtual: string | null = null;
  lista.linhas.forEach((linha, i) => {
    if (linha.titulo !== undefined) {
      numero = 0;
      nBloco += 1;
      blocoAtual = linha.titulo || `bloco ${nBloco}`;
      linhasDaGrade.push({ tipo: "linha", linha, posicao: i + 1, exibido: nBloco, rotulo: blocoAtual });
    } else {
      numero += 1;
      linhasDaGrade.push({ tipo: "linha", linha, posicao: i + 1, exibido: numero, rotulo: blocoAtual ? `${blocoAtual}, linha ${numero}` : `linha ${numero}` });
    }
    const faixa = faixas.find((f) => f.fim === i + 1 && f.fim > f.inicio);
    const proximaEhTitulo = lista.linhas[i + 1]?.titulo !== undefined || i + 1 === lista.linhas.length;
    if (faixa && proximaEhTitulo && temRodape) linhasDaGrade.push({ tipo: "subtotal", titulo: faixa.titulo, inicio: faixa.inicio, fim: faixa.fim });
  });

  const largura = LARGURA_ALCA + lista.colunas.reduce((s, c) => s + c.largura, 0);

  return (
    <div className={estilos.rolagem}>
      <table className={estilos.grade} style={{ width: largura }}>
        <colgroup>
          <col style={{ width: LARGURA_ALCA }} />
          {lista.colunas.map((c) => (
            <col key={c.id} style={{ width: c.largura }} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th scope="col" className={`${estilos.alca} ${estilos.canto}`}>
              <span className="sr-only">Linha</span>
            </th>
            {lista.colunas.map((coluna, i) => (
              <CabecalhoColuna key={coluna.id} coluna={coluna} indice={i} total={lista.colunas.length} alterar={alterar} primeira={i === 0} />
            ))}
          </tr>
        </thead>
        <tbody ref={corpo} onKeyDown={navegar}>
          {linhasDaGrade.map((item) =>
            item.tipo === "subtotal" ? (
              <tr key={`subtotal-${item.inicio}`} className={estilos.subtotal}>
                <th scope="row" className={estilos.alca}>
                  <span className="sr-only">Subtotal {item.titulo ?? "sem bloco"}</span>
                </th>
                {lista.colunas.map((coluna, c) => (
                  <td key={coluna.id} className={c === 0 ? estilos.fixa : undefined}>
                    {c === 0 && !contagem(lista, coluna) ? <span className={estilos.rotuloTotal}>Subtotal do bloco</span> : <Contagem conta={contagem(lista, coluna, item.inicio, item.fim)} />}
                  </td>
                ))}
              </tr>
            ) : (
              <tr
                key={item.linha.id}
                className={[
                  estilos.linha,
                  item.linha.titulo !== undefined ? estilos.linhaTitulo : "",
                  item.linha.cor ? estilos[`cor-${item.linha.cor}`] : "",
                  item.linha.negrito ? estilos.negrito : "",
                  linhaAtiva === item.linha.id ? estilos.ativa : "",
                ].join(" ")}
                onFocus={() => definirLinhaAtiva(item.linha.id)}
              >
                <th scope="row" className={estilos.alca}>
                  <MenuLinha linha={item.linha} posicao={item.posicao} exibido={item.exibido} total={lista.linhas.length} alterar={alterar} />
                </th>
                {item.linha.titulo !== undefined ? (
                  <td colSpan={lista.colunas.length} data-l={item.posicao - 1} data-c={0} className={estilos.celulaTitulo}>
                    <input
                      className={estilos.titulo}
                      value={item.linha.titulo}
                      placeholder="Título do bloco — ex.: Turma A · Seg e Qua, 08h às 10h"
                      aria-label={`Título do bloco ${item.exibido}`}
                      maxLength={120}
                      onChange={(e) => alterar((atual) => definirTitulo(atual, item.linha.id, e.target.value))}
                    />
                  </td>
                ) : (
                  lista.colunas.map((coluna, c) => (
                    <td key={coluna.id} data-l={item.posicao - 1} data-c={c} className={c === 0 ? estilos.fixa : undefined}>
                      <Celula
                        coluna={coluna}
                        linha={item.linha}
                        rotuloLinha={item.rotulo}
                        aoMudar={(valor) => alterar((atual) => definirValor(atual, item.linha.id, coluna.id, valor))}
                      />
                    </td>
                  ))
                )}
              </tr>
            ),
          )}
        </tbody>
        {temRodape && lista.linhas.length > 0 && (
          <tfoot>
            <tr>
              <th scope="row" className={estilos.alca}>
                <span className="sr-only">Totais</span>
              </th>
              {lista.colunas.map((coluna, c) => {
                return (
                  <td key={coluna.id} className={c === 0 ? estilos.fixa : undefined}>
                    {c === 0 && !contagem(lista, coluna) ? <span className={estilos.rotuloTotal}>{faixas.length ? "Total geral" : "Total"}</span> : <Contagem conta={contagem(lista, coluna)} />}
                  </td>
                );
              })}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

function Contagem({ conta }: { conta: ReturnType<typeof contagem> }) {
  if (!conta) return null;
  if ("marcadas" in conta) {
    return (
      <span className={`${estilos.total} tabular`}>
        <strong>{conta.marcadas}</strong> de {conta.total}
      </span>
    );
  }
  return (
    <span className={`${estilos.total} tabular`}>
      <span className={estilos.totalSim}>
        <strong>{conta.sim}</strong> Sim
      </span>
      <span className={estilos.totalNao}>
        <strong>{conta.nao}</strong> Não
      </span>
    </span>
  );
}

function Celula({ coluna, linha, rotuloLinha, aoMudar }: { coluna: ColunaLista; linha: LinhaLista; rotuloLinha: string; aoMudar: (valor: string | boolean | null) => void }) {
  const valor = linha.valores[coluna.id];
  const rotulo = `${coluna.titulo}, ${rotuloLinha}`;

  if (coluna.tipo === "marca") {
    const marcada = valor === true;
    return (
      <button type="button" className={estilos.marca} aria-pressed={marcada} aria-label={rotulo} onClick={() => aoMudar(!marcada)}>
        <span className={estilos.caixa}>{marcada && <Icone nome="check" tamanho={16} />}</span>
      </button>
    );
  }

  if (coluna.tipo === "simnao") {
    return (
      <span className={estilos.simnao} role="group" aria-label={rotulo}>
        <button type="button" className={`${estilos.opcaoSim} ${valor === "sim" ? estilos.sim : ""}`} aria-pressed={valor === "sim"} onClick={() => aoMudar(valor === "sim" ? null : "sim")}>
          Sim
        </button>
        <button type="button" className={`${estilos.opcaoNao} ${valor === "nao" ? estilos.nao : ""}`} aria-pressed={valor === "nao"} onClick={() => aoMudar(valor === "nao" ? null : "nao")}>
          Não
        </button>
      </span>
    );
  }

  if (coluna.tipo === "opcoes") {
    return (
      <select className={estilos.select} value={typeof valor === "string" ? valor : ""} aria-label={rotulo} onChange={(e) => aoMudar(e.target.value || null)}>
        <option value="">—</option>
        {(coluna.opcoes ?? []).map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  }

  return <input className={estilos.texto} value={typeof valor === "string" ? valor : ""} aria-label={rotulo} maxLength={500} onChange={(e) => aoMudar(e.target.value)} />;
}

function CabecalhoColuna({
  coluna,
  indice,
  total,
  primeira,
  alterar,
}: {
  coluna: ColunaLista;
  indice: number;
  total: number;
  primeira: boolean;
  alterar: Props["alterar"];
}) {
  const [confirmando, definirConfirmando] = useState(false);
  const mudar = (mudanca: Partial<ColunaLista>) => alterar((l) => alterarColuna(l, coluna.id, mudanca));

  function arrastar(evento: EventoPonteiro<HTMLSpanElement>) {
    evento.preventDefault();
    const inicio = evento.clientX;
    const larguraInicial = coluna.largura;
    const alvo = evento.currentTarget;
    alvo.setPointerCapture(evento.pointerId);
    const mover = (e: PointerEvent) => mudar({ largura: larguraInicial + e.clientX - inicio });
    const soltar = () => {
      alvo.removeEventListener("pointermove", mover);
      alvo.removeEventListener("pointerup", soltar);
    };
    alvo.addEventListener("pointermove", mover);
    alvo.addEventListener("pointerup", soltar);
  }

  return (
    <th scope="col" className={`${estilos.cabecalho} ${primeira ? estilos.fixa : ""}`}>
      <MenuSuspenso
        rotulo={`Coluna ${coluna.titulo}: editar`}
        classeGatilho={estilos.cabecalhoBotao}
        gatilho={
          <>
            <Icone nome={ICONE_TIPO[coluna.tipo]} tamanho={15} className={estilos.cabecalhoIcone} />
            <span className={estilos.cabecalhoTitulo}>{coluna.titulo}</span>
            <Icone nome="seta-baixo" tamanho={14} className={estilos.cabecalhoSeta} />
          </>
        }
      >
        {(fechar) => (
          <div className={estilos.menu}>
            <label className={estilos.campo}>
              <span>Nome da coluna</span>
              <input value={coluna.titulo} maxLength={80} onChange={(e) => mudar({ titulo: e.target.value })} onKeyDown={(e) => e.key === "Enter" && fechar()} />
            </label>
            <label className={estilos.campo}>
              <span>Tipo</span>
              <select value={coluna.tipo} onChange={(e) => mudar({ tipo: e.target.value as TipoColuna })}>
                {TIPOS_COLUNA.map((t) => (
                  <option key={t.tipo} value={t.tipo}>
                    {t.rotulo}
                  </option>
                ))}
              </select>
            </label>
            {coluna.tipo === "opcoes" && (
              <label className={estilos.campo}>
                <span>Opções (uma por linha)</span>
                <textarea
                  rows={4}
                  defaultValue={(coluna.opcoes ?? []).join("\n")}
                  onBlur={(e) => mudar({ opcoes: [...new Set(e.target.value.split("\n").map((o) => o.trim()).filter(Boolean))].slice(0, 30) })}
                />
              </label>
            )}
            <label className={estilos.campo}>
              <span>Largura</span>
              <input type="range" min={LARGURA_MINIMA} max={LARGURA_MAXIMA} step={8} value={coluna.largura} onChange={(e) => mudar({ largura: Number(e.target.value) })} />
            </label>
            <div className={estilos.menuLinha}>
              <button type="button" className={estilos.menuBotao} disabled={indice === 0} onClick={() => alterar((l) => moverColuna(l, coluna.id, -1))}>
                <Icone nome="seta-esquerda" tamanho={15} />
                Mover
              </button>
              <button type="button" className={estilos.menuBotao} disabled={indice === total - 1} onClick={() => alterar((l) => moverColuna(l, coluna.id, 1))}>
                Mover
                <Icone nome="seta-direita" tamanho={15} />
              </button>
            </div>
            {confirmando ? (
              <div className={estilos.confirmar}>
                <p>Apagar «{coluna.titulo}» e tudo o que está nela?</p>
                <div className={estilos.menuLinha}>
                  <button type="button" className={estilos.menuBotao} onClick={() => definirConfirmando(false)}>
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className={`${estilos.menuBotao} ${estilos.perigo}`}
                    onClick={() => {
                      fechar();
                      alterar((l) => apagarColuna(l, coluna.id));
                    }}
                  >
                    Apagar
                  </button>
                </div>
              </div>
            ) : (
              <button type="button" className={`${estilos.menuBotao} ${estilos.perigoSuave}`} disabled={total === 1} onClick={() => definirConfirmando(true)}>
                <Icone nome="lixeira" tamanho={15} />
                Apagar coluna
              </button>
            )}
          </div>
        )}
      </MenuSuspenso>
      <span className={estilos.redimensionar} onPointerDown={arrastar} aria-hidden="true" />
    </th>
  );
}

function MenuLinha({ linha, posicao, exibido, total, alterar }: { linha: LinhaLista; posicao: number; exibido: number; total: number; alterar: Props["alterar"] }) {
  const ehTitulo = linha.titulo !== undefined;
  const acoes: { rotulo: string; icone: NomeIcone; fazer: (l: ListaAcompanhamento) => ListaAcompanhamento; desativada?: boolean; perigo?: boolean }[] = [
    { rotulo: "Inserir linha acima", icone: "mais", fazer: (l) => inserirLinha(l, posicao - 1) },
    { rotulo: "Inserir linha abaixo", icone: "mais", fazer: (l) => inserirLinha(l, posicao) },
    { rotulo: "Inserir título de bloco acima", icone: "tabela", fazer: (l) => inserirTitulo(l, posicao - 1) },
    { rotulo: ehTitulo ? "Transformar em linha comum" : "Transformar em título de bloco", icone: "tabela", fazer: (l) => alternarTitulo(l, linha.id) },
    { rotulo: ehTitulo ? "Duplicar título" : "Duplicar linha", icone: "copiar", fazer: (l) => duplicarLinha(l, linha.id) },
    { rotulo: "Mover para cima", icone: "seta-esquerda", fazer: (l) => moverLinha(l, linha.id, -1), desativada: posicao === 1 },
    { rotulo: "Mover para baixo", icone: "seta-direita", fazer: (l) => moverLinha(l, linha.id, 1), desativada: posicao === total },
    { rotulo: ehTitulo ? "Apagar título (os alunos ficam)" : "Apagar linha", icone: "lixeira", fazer: (l) => apagarLinha(l, linha.id), perigo: true },
  ];
  const numero = exibido;
  return (
    <MenuSuspenso
      rotulo={ehTitulo ? `Título ${numero}: ações` : `Linha ${numero}: ações`}
      classeGatilho={estilos.alcaBotao}
      gatilho={
        <>
          {ehTitulo ? <Icone nome="tabela" tamanho={15} /> : <span className="tabular">{numero}</span>}
          <Icone nome="mais-opcoes" tamanho={14} className={estilos.alcaPontos} />
        </>
      }
    >
      {(fechar) => (
        <div className={estilos.menu}>
          {acoes.map((a) => (
            <button
              key={a.rotulo}
              type="button"
              className={`${estilos.menuBotao} ${estilos.menuItem} ${a.perigo ? estilos.perigoSuave : ""}`}
              disabled={a.desativada}
              onClick={() => {
                fechar();
                alterar(a.fazer);
              }}
            >
              <Icone nome={a.icone} tamanho={15} className={a.icone.startsWith("seta") ? estilos.girar : undefined} />
              {a.rotulo}
            </button>
          ))}
        </div>
      )}
    </MenuSuspenso>
  );
}
