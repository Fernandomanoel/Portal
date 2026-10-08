import { useRef, useState, type KeyboardEvent, type PointerEvent as EventoPonteiro } from "react";

import { Icone, type NomeIcone } from "@/components/Icone";
import {
  alterarColuna,
  apagarColuna,
  apagarLinha,
  contagem,
  definirValor,
  duplicarLinha,
  inserirLinha,
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
    const alvo = corpo.current?.querySelector<HTMLElement>(`[data-l="${linha}"][data-c="${coluna}"]`);
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

  const largura = LARGURA_ALCA + lista.colunas.reduce((s, c) => s + c.largura, 0);
  const temRodape = lista.colunas.some((c) => c.tipo === "marca" || c.tipo === "simnao");

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
          {lista.linhas.map((linha, l) => (
            <tr
              key={linha.id}
              className={[estilos.linha, linha.cor ? estilos[`cor-${linha.cor}`] : "", linha.negrito ? estilos.negrito : "", linhaAtiva === linha.id ? estilos.ativa : ""].join(" ")}
              onFocus={() => definirLinhaAtiva(linha.id)}
            >
              <th scope="row" className={estilos.alca}>
                <MenuLinha linha={linha} numero={l + 1} total={lista.linhas.length} alterar={alterar} />
              </th>
              {lista.colunas.map((coluna, c) => (
                <td key={coluna.id} data-l={l} data-c={c} className={c === 0 ? estilos.fixa : undefined}>
                  <Celula
                    coluna={coluna}
                    linha={linha}
                    numero={l + 1}
                    aoMudar={(valor) => alterar((atual) => definirValor(atual, linha.id, coluna.id, valor))}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {temRodape && lista.linhas.length > 0 && (
          <tfoot>
            <tr>
              <th scope="row" className={estilos.alca}>
                <span className="sr-only">Totais</span>
              </th>
              {lista.colunas.map((coluna, c) => {
                const conta = contagem(lista, coluna);
                return (
                  <td key={coluna.id} className={`${c === 0 ? estilos.fixa : ""} tabular`}>
                    {conta && "marcadas" in conta && (
                      <span className={estilos.total}>
                        <strong>{conta.marcadas}</strong> de {conta.total}
                      </span>
                    )}
                    {conta && "sim" in conta && (
                      <span className={estilos.total}>
                        <span className={estilos.totalSim}>
                          <strong>{conta.sim}</strong> Sim
                        </span>
                        <span className={estilos.totalNao}>
                          <strong>{conta.nao}</strong> Não
                        </span>
                      </span>
                    )}
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

function Celula({ coluna, linha, numero, aoMudar }: { coluna: ColunaLista; linha: LinhaLista; numero: number; aoMudar: (valor: string | boolean | null) => void }) {
  const valor = linha.valores[coluna.id];
  const rotulo = `${coluna.titulo}, linha ${numero}`;

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

function MenuLinha({ linha, numero, total, alterar }: { linha: LinhaLista; numero: number; total: number; alterar: Props["alterar"] }) {
  const acoes: { rotulo: string; icone: NomeIcone; fazer: (l: ListaAcompanhamento) => ListaAcompanhamento; desativada?: boolean; perigo?: boolean }[] = [
    { rotulo: "Inserir linha acima", icone: "mais", fazer: (l) => inserirLinha(l, numero - 1) },
    { rotulo: "Inserir linha abaixo", icone: "mais", fazer: (l) => inserirLinha(l, numero) },
    { rotulo: "Duplicar linha", icone: "copiar", fazer: (l) => duplicarLinha(l, linha.id) },
    { rotulo: "Mover para cima", icone: "seta-esquerda", fazer: (l) => moverLinha(l, linha.id, -1), desativada: numero === 1 },
    { rotulo: "Mover para baixo", icone: "seta-direita", fazer: (l) => moverLinha(l, linha.id, 1), desativada: numero === total },
    { rotulo: "Apagar linha", icone: "lixeira", fazer: (l) => apagarLinha(l, linha.id), perigo: true },
  ];
  return (
    <MenuSuspenso
      rotulo={`Linha ${numero}: ações`}
      classeGatilho={estilos.alcaBotao}
      gatilho={
        <>
          <span className="tabular">{numero}</span>
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
