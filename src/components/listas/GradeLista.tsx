import { useEffect, useMemo, useRef, useState, type ClipboardEvent, type CSSProperties, type KeyboardEvent, type PointerEvent as EventoPonteiro, type ReactNode } from "react";

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
  inserirColuna,
  inserirLinha,
  inserirTitulo,
  moverColuna,
  moverLinha,
} from "@/lib/editarLista";
import { agregar, numerosDaColuna, ROTULO_AGREGACAO, textoVisivel } from "@/lib/dadosLista";
import { calculadora, ehFormula, ehErro, formatarNumero, lerNumero, mostrarResultado, type Resultado } from "@/lib/formulas";
import { areaDaSelecao, areaUnica, colarTexto, copiarArea, indiceMesclagens, limparArea, type Selecao } from "@/lib/gradeLista";
import { FORMATOS_NUMERO, LARGURA_MAXIMA, LARGURA_MINIMA, LIMITES_LISTA, TIPOS_COLUNA, type Agregacao, type ColunaLista, type EstiloCelula, type LinhaLista, type ListaAcompanhamento, type TipoColuna } from "@/types/lista";
import { ICONE_TIPO } from "./iconesTipo";
import { MenuSuspenso } from "./MenuSuspenso";
import estilos from "./GradeLista.module.css";


interface Props {
  lista: ListaAcompanhamento;
  alterar: (mudar: (lista: ListaAcompanhamento) => ListaAcompanhamento) => void;
  linhaAtiva: string | null;
  definirLinhaAtiva: (id: string | null) => void;
  selecao: Selecao | null;
  definirSelecao: (selecao: Selecao | null) => void;
}

const LARGURA_ALCA = 56;
const LARGURA_MAIS = 48;

const ALTURA_LINHA = 36;
const ALTURA_CABECALHO = 22 + 34;

export function GradeLista({ lista, alterar, linhaAtiva, definirLinhaAtiva, selecao, definirSelecao }: Props) {
  const corpo = useRef<HTMLTableSectionElement>(null);
  const calc = useMemo(() => calculadora(lista), [lista]);
  const mesclas = useMemo(() => indiceMesclagens(lista), [lista]);
  const arrasto = useRef<{ l: number; c: number } | null>(null);
  const area = selecao ? areaDaSelecao(selecao) : null;
  const emArea = !!area && !areaUnica(area);

  useEffect(() => {
    const soltar = () => {
      arrasto.current = null;
    };
    window.addEventListener("pointerup", soltar);
    return () => window.removeEventListener("pointerup", soltar);
  }, []);

  // Colunas e linhas fixas ao rolar: a primeira coluna por padrão; linhas só se as primeiras forem comuns (sem título de bloco).
  const colunasFixas = Math.min(lista.congelar?.colunas ?? 1, lista.colunas.length);
  const linhasFixas = (() => {
    const n = Math.min(lista.congelar?.linhas ?? 0, lista.linhas.length);
    for (let i = 0; i < n; i++) if (lista.linhas[i].titulo !== undefined) return i;
    return n;
  })();
  const esquerdaDe = (c: number) => LARGURA_ALCA + lista.colunas.slice(0, c).reduce((soma, coluna) => soma + coluna.largura, 0);

  function atualizarSelecao(l: number, c: number, estender: boolean) {
    definirSelecao(estender && selecao ? { ancora: selecao.ancora, fim: { l, c } } : { ancora: { l, c }, fim: { l, c } });
  }

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

    // Com várias células selecionadas: Delete limpa todas; Shift + setas aumentam ou diminuem a seleção.
    if (emArea && (evento.key === "Delete" || evento.key === "Backspace")) {
      evento.preventDefault();
      alterar((atual) => limparArea(atual, area!));
      return;
    }
    if (evento.shiftKey && evento.key.startsWith("Arrow") && !select) {
      const base = selecao ?? { ancora: { l, c }, fim: { l, c } };
      const dl = evento.key === "ArrowDown" ? 1 : evento.key === "ArrowUp" ? -1 : 0;
      const dc = evento.key === "ArrowRight" ? 1 : evento.key === "ArrowLeft" ? -1 : 0;
      evento.preventDefault();
      definirSelecao({ ancora: base.ancora, fim: { l: Math.max(0, Math.min(lista.linhas.length - 1, base.fim.l + dl)), c: Math.max(0, Math.min(lista.colunas.length - 1, base.fim.c + dc)) } });
      return;
    }

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

  function aoCopiar(evento: ClipboardEvent<HTMLTableSectionElement>) {
    if (!emArea || !area) return;
    evento.preventDefault();
    evento.clipboardData.setData("text/plain", copiarArea(lista, area, (l, c) => textoVisivel(lista, calc, l, c)));
  }

  function aoColar(evento: ClipboardEvent<HTMLTableSectionElement>) {
    const celula = (evento.target as HTMLElement).closest<HTMLElement>("[data-l]");
    const texto = evento.clipboardData.getData("text/plain");
    // Um bloco copiado de outra planilha (tabulação ou várias linhas) preenche a grade a partir da célula selecionada.
    if (!celula || !/\t|\n/.test(texto.replace(/\n$/, ""))) return;
    evento.preventDefault();
    const l0 = area ? area.l1 : Number(celula.dataset.l);
    const c0 = area ? area.c1 : Number(celula.dataset.c);
    alterar((atual) => colarTexto(atual, l0, c0, texto, () => `l${crypto.randomUUID().replace(/-/g, "").slice(0, 8)}`));
  }

  const rodapeNumerico = (coluna: ColunaLista) => (coluna.tipo === "numero" && coluna.rodape ? coluna.rodape : null);
  const totalDe = (c: number, inicio: number, fim: number) => {
    const como = lista.colunas[c].rodape;
    return como ? agregar(numerosDaColuna(lista, calc, c, inicio, fim), como) : null;
  };

  const temRodape = lista.colunas.some((c) => c.tipo === "marca" || c.tipo === "simnao" || (c.tipo === "numero" && c.rodape));
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

  const largura = LARGURA_ALCA + LARGURA_MAIS + lista.colunas.reduce((s, c) => s + c.largura, 0);
  const total = lista.colunas.length + 2;
  const cheiaDeLinhas = lista.linhas.length >= LIMITES_LISTA.linhas;

  function novaLinha() {
    const indice = lista.linhas.length;
    alterar((atual) => inserirLinha(atual));
    requestAnimationFrame(() => focarCelula(indice, 0));
  }

  return (
    <div className={estilos.rolagem}>
      <table className={estilos.grade} style={{ width: largura }}>
        <colgroup>
          <col style={{ width: LARGURA_ALCA }} />
          {lista.colunas.map((c) => (
            <col key={c.id} style={{ width: c.largura }} />
          ))}
          <col style={{ width: LARGURA_MAIS }} />
        </colgroup>
        <thead>
          <tr className={estilos.letras}>
            <th className={`${estilos.alca} ${estilos.canto}`} />
            {lista.colunas.map((coluna, i) => (
              <th key={coluna.id} style={i < colunasFixas ? { position: "sticky", left: esquerdaDe(i), zIndex: 4 } : undefined} className={area && i >= area.c1 && i <= area.c2 ? estilos.letraAtiva : undefined}>
                <button type="button" className={estilos.letraBotao} aria-label={`Selecionar a coluna ${letraColuna(i)}`} onClick={() => lista.linhas.length && definirSelecao({ ancora: { l: 0, c: i }, fim: { l: lista.linhas.length - 1, c: i } })}>
                  {letraColuna(i)}
                </button>
              </th>
            ))}
            <th />
          </tr>
          <tr className={estilos.titulos}>
            <th scope="col" className={`${estilos.alca} ${estilos.canto}`}>
              <span className="sr-only">Linha</span>
            </th>
            {lista.colunas.map((coluna, i) => (
              <CabecalhoColuna key={coluna.id} coluna={coluna} indice={i} total={lista.colunas.length} alterar={alterar} esquerda={i < colunasFixas ? esquerdaDe(i) : null} />
            ))}
            <th scope="col" className={estilos.maisColuna}>
              <MenuNovaColuna lista={lista} alterar={alterar} classeGatilho={estilos.maisBotao} gatilho={<Icone nome="mais" tamanho={16} />} />
            </th>
          </tr>
        </thead>
        <tbody ref={corpo} onKeyDown={navegar} onCopy={aoCopiar} onPaste={aoColar} className={emArea ? estilos.emArea : undefined}>
          {linhasDaGrade.map((item) =>
            item.tipo === "subtotal" ? (
              <tr key={`subtotal-${item.inicio}`} className={estilos.subtotal}>
                <th scope="row" className={estilos.alca}>
                  <span className="sr-only">Subtotal {item.titulo ?? "sem bloco"}</span>
                </th>
                {lista.colunas.map((coluna, c) => (
                  <td key={coluna.id} style={c < colunasFixas ? { position: "sticky", left: esquerdaDe(c), zIndex: 1 } : undefined}>
                    {c === 0 && !contagem(lista, coluna) && !rodapeNumerico(coluna) ? <span className={estilos.rotuloTotal}>Subtotal do bloco</span> : rodapeNumerico(coluna) ? <TotalNumerico valor={totalDe(c, item.inicio, item.fim)} coluna={coluna} /> : <Contagem conta={contagem(lista, coluna, item.inicio, item.fim)} />}
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
                <th scope="row" className={estilos.alca} style={item.posicao - 1 < linhasFixas ? { top: ALTURA_CABECALHO + (item.posicao - 1) * ALTURA_LINHA, zIndex: 4 } : undefined}>
                  <MenuLinha linha={item.linha} posicao={item.posicao} exibido={item.linha.titulo !== undefined ? item.exibido : item.posicao} total={lista.linhas.length} alterar={alterar} />
                </th>
                {item.linha.titulo !== undefined ? (
                  <td colSpan={lista.colunas.length + 1} data-l={item.posicao - 1} data-c={0} className={estilos.celulaTitulo}>
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
                  lista.colunas.map((coluna, c) => {
                    const l = item.posicao - 1;
                    const merge = mesclas.get(`${item.linha.id}:${coluna.id}`);
                    if (merge && !merge.ancora) return null;
                    const estilo = item.linha.estilos?.[coluna.id];
                    const dentro = !!area && l >= area.l1 && l <= area.l2 && c >= area.c1 && c <= area.c2;
                    const fixaCol = c < colunasFixas;
                    const fixaLinha = l < linhasFixas;
                    const posicao: CSSProperties | undefined =
                      fixaCol || fixaLinha ? { position: "sticky", ...(fixaCol ? { left: esquerdaDe(c) } : {}), ...(fixaLinha ? { top: ALTURA_CABECALHO + l * ALTURA_LINHA } : {}), zIndex: fixaCol && fixaLinha ? 4 : fixaLinha ? 2 : 1 } : undefined;
                    return (
                      <td
                        key={coluna.id}
                        data-l={l}
                        data-c={c}
                        colSpan={merge && merge.colunas > 1 ? merge.colunas : undefined}
                        rowSpan={merge && merge.linhas > 1 ? merge.linhas : undefined}
                        style={posicao}
                        className={[estilo?.fundo ? estilos[`cel-${estilo.fundo}`] : "", estilo?.bordas === "todas" ? estilos.bordaForte : "", estilo?.bordas === "nenhuma" ? estilos.semBorda : "", dentro ? estilos.selecionada : "", merge ? estilos.mesclada : ""].filter(Boolean).join(" ")}
                        onFocus={() => atualizarSelecao(l, c, false)}
                        onPointerDown={(e) => {
                          if (e.shiftKey && selecao) {
                            e.preventDefault();
                            atualizarSelecao(l, c, true);
                          } else if (e.button === 0) arrasto.current = { l, c };
                        }}
                        onPointerEnter={(e) => {
                          const origem = arrasto.current;
                          if (e.buttons !== 1 || !origem || (origem.l === l && origem.c === c)) return;
                          window.getSelection()?.removeAllRanges();
                          definirSelecao({ ancora: origem, fim: { l, c } });
                        }}
                      >
                        <Celula
                          coluna={coluna}
                          linha={item.linha}
                          rotuloLinha={item.rotulo}
                          resultado={calc.resolver(l, c)}
                          estilo={estilo}
                          aoMudar={(valor) => alterar((atual) => definirValor(atual, item.linha.id, coluna.id, valor))}
                        />
                      </td>
                    );
                  })
                )}
                {item.linha.titulo === undefined && <td className={estilos.vazia} />}
              </tr>
            ),
          )}
          <tr className={estilos.adicionar}>
            <td colSpan={total}>
              <div className={estilos.adicionarAcoes}>
                <button type="button" className={estilos.adicionarBotao} disabled={cheiaDeLinhas} onClick={novaLinha}>
                  <Icone nome="mais" tamanho={15} />
                  Nova linha
                </button>
                <button
                  type="button"
                  className={estilos.adicionarBotao}
                  disabled={cheiaDeLinhas}
                  onClick={() => {
                    const indice = lista.linhas.length;
                    alterar((atual) => inserirTitulo(atual, indice));
                    requestAnimationFrame(() => document.querySelector<HTMLInputElement>(`[data-l="${indice}"] input`)?.focus());
                  }}
                >
                  <Icone nome="tabela" tamanho={15} />
                  Título de bloco
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        {temRodape && lista.linhas.length > 0 && (
          <tfoot>
            <tr>
              <th scope="row" className={estilos.alca}>
                <span className="sr-only">Totais</span>
              </th>
              {lista.colunas.map((coluna, c) => {
                return (
                  <td key={coluna.id} style={c < colunasFixas ? { position: "sticky", left: esquerdaDe(c), zIndex: 2 } : undefined}>
                    {c === 0 && !contagem(lista, coluna) && !rodapeNumerico(coluna) ? <span className={estilos.rotuloTotal}>{faixas.length ? "Total geral" : "Total"}</span> : rodapeNumerico(coluna) ? <TotalNumerico valor={totalDe(c, 0, lista.linhas.length)} coluna={coluna} /> : <Contagem conta={contagem(lista, coluna)} />}
                  </td>
                );
              })}
              <td className={estilos.vazia} />
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

/** Menu com os tipos de coluna: usado no «+» do cabeçalho da grade e na barra de ferramentas da página. */
export function MenuNovaColuna({ lista, alterar, classeGatilho, gatilho, rotulo = "Adicionar coluna" }: { lista: ListaAcompanhamento; alterar: Props["alterar"]; classeGatilho: string; gatilho: ReactNode; rotulo?: string }) {
  return (
    <MenuSuspenso rotulo={rotulo} classeGatilho={classeGatilho} alinhar="fim" gatilho={gatilho}>
      {(fechar) => (
        <div className={estilos.menu}>
          <p className={estilos.menuTitulo}>Nova coluna</p>
          {TIPOS_COLUNA.map((t) => (
            <button
              key={t.tipo}
              type="button"
              className={`${estilos.menuBotao} ${estilos.menuItem} ${estilos.tipoItem}`}
              disabled={lista.colunas.length >= LIMITES_LISTA.colunas}
              onClick={() => {
                fechar();
                alterar((l) => inserirColuna(l, t.tipo, t.tipo === "texto" ? "Observação" : t.tipo === "opcoes" ? "Situação" : t.rotulo));
              }}
            >
              <Icone nome={ICONE_TIPO[t.tipo]} tamanho={16} />
              <span>
                <strong>{t.rotulo}</strong>
                <small>{t.descricao}</small>
              </span>
            </button>
          ))}
        </div>
      )}
    </MenuSuspenso>
  );
}

/** A, B, C… Z, AA, AB… como nas planilhas. */
function letraColuna(i: number) {
  let n = i;
  let letra = "";
  do {
    letra = String.fromCharCode(65 + (n % 26)) + letra;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return letra;
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

function TotalNumerico({ valor, coluna }: { valor: number | null; coluna: ColunaLista }) {
  if (!coluna.rodape) return null;
  return (
    <span className={`${estilos.total} tabular`}>
      <span className={estilos.totalRotulo}>{ROTULO_AGREGACAO[coluna.rodape]}</span>
      <strong>{valor === null ? "—" : coluna.rodape === "contagem" ? valor : formatarNumero(valor, coluna.formato, coluna.casas)}</strong>
    </span>
  );
}

/** Texto e número: mostra o resultado quando é fórmula ou número formatado, e o que foi digitado enquanto se edita. */
function CelulaDigitavel({ coluna, valor, resultado, rotulo, estilo, aoMudar }: { coluna: ColunaLista; valor: ValorCelulaBruto; resultado: Resultado; rotulo: string; estilo?: EstiloCelula; aoMudar: (valor: string | null) => void }) {
  const [editando, definirEditando] = useState(false);
  const [rascunho, definirRascunho] = useState("");
  const ehNumero = coluna.tipo === "numero";
  const bruto = typeof valor === "string" ? valor : "";
  const formula = ehFormula(bruto);
  const numero = ehNumero && !formula ? lerNumero(bruto) : null;
  const mostrado = formula ? mostrarResultado(resultado, ehNumero ? coluna.formato : undefined, coluna.casas) : numero !== null ? formatarNumero(numero, coluna.formato, coluna.casas) : bruto;
  const erro = formula && ehErro(resultado);
  const direita = estilo?.alinhar ? estilo.alinhar === "direita" : ehNumero;
  const alinhamento = estilo?.alinhar ? ({ esquerda: "left", centro: "center", direita: "right" } as const)[estilo.alinhar] : direita ? "right" : undefined;

  function entrar() {
    definirEditando(true);
    definirRascunho(numero !== null ? bruto.replace(".", ",") : bruto);
  }
  function sair() {
    definirEditando(false);
    if (!ehNumero) return;
    const t = rascunho.trim();
    if (!t) return aoMudar(null);
    const n = t.startsWith("=") ? null : lerNumero(t);
    aoMudar(n !== null ? String(n) : t);
  }

  return (
    <input
      className={`${estilos.texto} ${erro && !editando ? estilos.erroFormula : ""} ${estilo?.negrito ? estilos.celNegrito : ""} ${estilo?.italico ? estilos.celItalico : ""}`}
      style={alinhamento ? { textAlign: alinhamento } : undefined}
      value={editando ? (ehNumero ? rascunho : bruto) : mostrado}
      aria-label={rotulo}
      title={formula && !editando ? bruto : undefined}
      maxLength={500}
      inputMode={ehNumero ? "decimal" : undefined}
      onFocus={entrar}
      onBlur={sair}
      onChange={(e) => {
        definirRascunho(e.target.value);
        if (!ehNumero) aoMudar(e.target.value);
      }}
    />
  );
}

type ValorCelulaBruto = string | boolean | undefined;

function Celula({ coluna, linha, rotuloLinha, resultado, estilo, aoMudar }: { coluna: ColunaLista; linha: LinhaLista; rotuloLinha: string; resultado: Resultado; estilo?: EstiloCelula; aoMudar: (valor: string | boolean | null) => void }) {
  const valor = linha.valores[coluna.id];
  const rotulo = `${coluna.titulo}, ${rotuloLinha}`;
  const negrito = estilo?.negrito ? estilos.celNegrito : "";
  const italico = estilo?.italico ? estilos.celItalico : "";

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
      <select className={`${typeof valor === "string" && valor ? `${estilos.select} ${estilos.tag}` : estilos.select} ${negrito} ${italico}`} value={typeof valor === "string" ? valor : ""} aria-label={rotulo} onChange={(e) => aoMudar(e.target.value || null)}>
        <option value="">—</option>
        {(coluna.opcoes ?? []).map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  }

  if (coluna.tipo === "data") {
    return <input type="date" className={`${estilos.texto} ${negrito} ${italico}`} value={typeof valor === "string" ? valor : ""} aria-label={rotulo} onChange={(e) => aoMudar(e.target.value || null)} />;
  }

  return <CelulaDigitavel coluna={coluna} valor={valor} resultado={resultado} rotulo={rotulo} estilo={estilo} aoMudar={aoMudar} />;
}

function CabecalhoColuna({
  coluna,
  indice,
  total,
  esquerda,
  alterar,
}: {
  coluna: ColunaLista;
  indice: number;
  total: number;
  /** Posição `left` quando a coluna está fixa ao rolar; `null` se rola junto. */
  esquerda: number | null;
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
    <th scope="col" className={estilos.cabecalho} style={esquerda !== null ? { position: "sticky", left: esquerda, zIndex: 4 } : undefined}>
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
            {coluna.tipo === "numero" && (
              <>
                <label className={estilos.campo}>
                  <span>Formato</span>
                  <select value={coluna.formato ?? "numero"} onChange={(e) => mudar({ formato: e.target.value as ColunaLista["formato"] })}>
                    {FORMATOS_NUMERO.map((f) => (
                      <option key={f.formato} value={f.formato}>
                        {f.rotulo}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={estilos.campo}>
                  <span>Casas decimais</span>
                  <select value={coluna.casas ?? ""} onChange={(e) => mudar({ casas: e.target.value === "" ? undefined : Number(e.target.value) })}>
                    <option value="">Automático</option>
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={estilos.campo}>
                  <span>Total no rodapé</span>
                  <select value={coluna.rodape ?? ""} onChange={(e) => mudar({ rodape: (e.target.value || undefined) as Agregacao | undefined })}>
                    <option value="">Nenhum</option>
                    {(Object.keys(ROTULO_AGREGACAO) as Agregacao[]).map((a) => (
                      <option key={a} value={a}>
                        {ROTULO_AGREGACAO[a]}
                      </option>
                    ))}
                  </select>
                </label>
              </>
            )}
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
