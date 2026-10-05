import { useEffect, useMemo, useState } from "react";

import { Icone, type NomeIcone } from "@/components/Icone";
import { tituloDoResultado } from "@/lib/ingles";
import { analisarRedacao, contarPalavras, formatarTempo } from "@/lib/redacao";
import type { AtividadeIngles, BlocoRedacao, CriterioRedacao, PropostaRedacao, QuestaoTreinoRedacao, Redacao } from "@/types/ingles";
import { BotaoTrecho } from "./BotaoTrecho";
import type { HumorGabi } from "./Gabi";
import { MolduraPratica } from "./MolduraPratica";
import { MontarFrase } from "./MontarFrase";
import { OpcoesResposta } from "./OpcoesResposta";
import { RodapeResposta } from "./RodapeResposta";
import { TelaAbertura } from "./TelasPratica";
import estilos from "./RedacaoIngles.module.css";

const PONTOS_POR_ACERTO = 15;

const ETAPAS: { titulo: string; icone: NomeIcone }[] = [
  { titulo: "Como é a tarefa", icone: "livro" },
  { titulo: "Como é avaliada", icone: "alvo" },
  { titulo: "Redação modelo", icone: "doc" },
  { titulo: "Treino", icone: "check" },
  { titulo: "Sua redação", icone: "lapis" },
];

type Fase = { tipo: "abertura" } | { tipo: "etapa"; etapa: 0 | 1 | 2 | 4 } | { tipo: "treino"; questao: number } | { tipo: "resultado" };

// ------------------------------------------------------------------ blocos

function Blocos({ blocos }: { blocos: BlocoRedacao[] }) {
  return (
    <>
      {blocos.map((bloco, i) => {
        switch (bloco.tipo) {
          case "texto":
            return (
              <p key={i} className={estilos.texto}>
                {bloco.texto}
              </p>
            );
          case "lista": {
            const Lista = bloco.numerada ? "ol" : "ul";
            return (
              <Lista key={i} className={estilos.lista}>
                {bloco.itens.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </Lista>
            );
          }
          case "exemplos":
            return (
              <div key={i} className={estilos.exemplos}>
                {bloco.titulo && <p className={estilos.exemplosTitulo}>{bloco.titulo}</p>}
                <ul>
                  {bloco.itens.map((item) => (
                    <li key={item.en}>
                      <span lang="en" className={estilos.en}>
                        {item.en}
                      </span>
                      {item.pt && <span className={estilos.pt}>{item.pt}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            );
          case "tabela":
            return <Tabela key={i} colunas={bloco.colunas} linhas={bloco.linhas} />;
          case "dica":
          case "atencao":
            return (
              <p key={i} className={bloco.tipo === "dica" ? estilos.dica : estilos.atencao}>
                <Icone nome={bloco.tipo === "dica" ? "livro" : "alerta"} tamanho={18} />
                <span>{bloco.texto}</span>
              </p>
            );
        }
      })}
    </>
  );
}

function Tabela({ colunas, linhas, titulo }: { colunas: string[]; linhas: string[][]; titulo?: string }) {
  return (
    <div className={estilos.tabelaRolagem}>
      <table className={estilos.tabela}>
        {titulo && <caption>{titulo}</caption>}
        <thead>
          <tr>
            {colunas.map((coluna) => (
              <th key={coluna} scope="col">
                {coluna}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha) => (
            <tr key={linha.join("|")}>
              {linha.map((celula, i) => (i === 0 ? <th key={i} scope="row">{celula}</th> : <td key={i}>{celula}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------- proposta

/** O enunciado como aparece no exame, com os dados da tarefa (tabela, fórum ou tópicos). */
function Proposta({ proposta }: { proposta: PropostaRedacao }) {
  return (
    <section className={estilos.proposta} aria-label="Enunciado da redação">
      <div className={estilos.propostaTopo}>
        <span className={estilos.selo}>
          {proposta.exame} · {proposta.tarefa}
        </span>
        <span className={estilos.propostaMeta}>
          <Icone nome="relogio" tamanho={16} />
          {proposta.minutos} min · mínimo de {proposta.minPalavras} palavras
        </span>
      </div>

      {proposta.discussao && (
        <div className={estilos.forum}>
          <div className={estilos.post}>
            <p className={estilos.postAutor}>{proposta.discussao.professor.nome}</p>
            <p lang="en">{proposta.discussao.professor.texto}</p>
          </div>
          {proposta.discussao.colegas.map((colega) => (
            <div key={colega.nome} className={`${estilos.post} ${estilos.postColega}`}>
              <p className={estilos.postAutor}>{colega.nome}</p>
              <p lang="en">{colega.texto}</p>
            </div>
          ))}
        </div>
      )}

      <div className={estilos.enunciado} lang="en">
        {proposta.enunciado.map((paragrafo) => (
          <p key={paragrafo}>{paragrafo}</p>
        ))}
        {proposta.topicos && (
          <ul>
            {proposta.topicos.map((topico) => (
              <li key={topico}>{topico}</li>
            ))}
          </ul>
        )}
      </div>

      {proposta.tabela && <Tabela titulo={proposta.tabela.titulo} colunas={proposta.tabela.colunas} linhas={proposta.tabela.linhas} />}

      <p className={estilos.enunciadoPt}>
        <strong>O que pede:</strong> {proposta.enunciadoPt}
      </p>
    </section>
  );
}

// --------------------------------------------------------------- critérios

function Criterios({ redacao }: { redacao: Redacao }) {
  return (
    <>
      <p className={estilos.texto}>
        O examinador não dá uma nota "no geral": ele lê o texto procurando critérios fixos, sempre os mesmos. Saber quais são é a forma mais rápida de subir a nota.
      </p>
      <div className={estilos.criterios}>
        {redacao.criterios.map((criterio) => (
          <article key={criterio.nome} className={estilos.criterio}>
            <header className={estilos.criterioTopo}>
              <div>
                <h3 lang="en">{criterio.nome}</h3>
                <p>{criterio.traducao}</p>
              </div>
              <span className={estilos.peso}>{criterio.peso}</span>
            </header>
            <dl className={estilos.criterioCorpo}>
              <div>
                <dt>O que o examinador olha</dt>
                <dd>{criterio.avalia}</dd>
              </div>
              <div>
                <dt className={estilos.dtAlta}>Nota alta</dt>
                <dd>{criterio.notaAlta}</dd>
              </div>
              <div>
                <dt className={estilos.dtBaixa}>O que tira ponto</dt>
                <dd>{criterio.tiraPonto}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <section className={estilos.escala} aria-labelledby="titulo-escala">
        <h2 id="titulo-escala" className={estilos.subtitulo}>
          {redacao.escala.titulo}
        </h2>
        {redacao.escala.nota && <p className={estilos.texto}>{redacao.escala.nota}</p>}
        <ol className={estilos.faixas}>
          {redacao.escala.faixas.map((faixa) => (
            <li key={faixa.nota}>
              <span className={estilos.faixaNota}>{faixa.nota}</span>
              <span>{faixa.descricao}</span>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

// ------------------------------------------------------------------ modelo

function Modelo({ redacao }: { redacao: Redacao }) {
  const [traducao, definirTraducao] = useState(false);
  const [comentarios, definirComentarios] = useState(true);
  const { modelo } = redacao;
  const palavras = modelo.paragrafos.reduce((soma, p) => soma + contarPalavras(p.en), 0);

  return (
    <>
      <Proposta proposta={redacao.proposta} />
      <div className={estilos.modeloTopo}>
        <div>
          <h2 className={estilos.subtitulo}>{modelo.titulo}</h2>
          <p className={estilos.modeloMeta}>
            {modelo.nota} · <span className="tabular">{palavras}</span> palavras
          </p>
        </div>
        <div className={estilos.alternadores}>
          <label className={estilos.alternar}>
            <input type="checkbox" checked={comentarios} onChange={(e) => definirComentarios(e.target.checked)} />
            Comentários
          </label>
          <label className={estilos.alternar}>
            <input type="checkbox" checked={traducao} onChange={(e) => definirTraducao(e.target.checked)} />
            Tradução
          </label>
        </div>
      </div>
      <div className={estilos.modelo}>
        {modelo.paragrafos.map((paragrafo) => (
          <div key={paragrafo.en} className={estilos.paragrafo}>
            <span className={estilos.papel}>{paragrafo.papel}</span>
            <div className={estilos.paragrafoTexto}>
              <BotaoTrecho texto={paragrafo.en} />
              <div>
                <p lang="en" className={estilos.en}>
                  {paragrafo.en}
                </p>
                {traducao && <p className={estilos.pt}>{paragrafo.pt}</p>}
              </div>
            </div>
            {comentarios && (
              <p className={estilos.comentario}>
                <Icone nome="lapis" tamanho={16} />
                <span>{paragrafo.comentario}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

// ------------------------------------------------------------------ editor

function chaveRascunho(slug: string) {
  return `redacao-ingles:${slug}`;
}

function lerRascunho(slug: string): string {
  try {
    return window.localStorage.getItem(chaveRascunho(slug)) ?? "";
  } catch {
    return "";
  }
}

function salvarRascunho(slug: string, texto: string) {
  try {
    window.localStorage.setItem(chaveRascunho(slug), texto);
  } catch {
    // Sem armazenamento (aba anônima, bloqueio): o texto só vive nesta tela.
  }
}

interface EditorProps {
  redacao: Redacao;
  texto: string;
  aoMudarTexto: (texto: string) => void;
  segundos: number;
  rodando: boolean;
  aoAlternarCronometro: () => void;
  marcados: Set<string>;
  aoMarcar: (item: string) => void;
}

function Editor({ redacao, texto, aoMudarTexto, segundos, rodando, aoAlternarCronometro, marcados, aoMarcar }: EditorProps) {
  const { proposta } = redacao;
  const analise = useMemo(() => analisarRedacao(texto), [texto]);
  const restante = proposta.minutos * 60 - segundos;
  const atingiu = analise.palavras >= proposta.minPalavras;
  const fracao = Math.min(1, analise.palavras / proposta.minPalavras);

  return (
    <>
      <Proposta proposta={proposta} />

      <div className={estilos.editorTopo}>
        <div className={restante <= 0 ? `${estilos.cronometro} ${estilos.cronometroFim}` : estilos.cronometro} role="timer" aria-live="off">
          <Icone nome="relogio" tamanho={18} />
          <span className="tabular">{restante > 0 ? formatarTempo(restante) : "Tempo esgotado"}</span>
        </div>
        <button type="button" className={estilos.botaoSecundario} onClick={aoAlternarCronometro}>
          {rodando ? "Pausar" : segundos > 0 ? "Continuar cronômetro" : "Iniciar cronômetro"}
        </button>
        <p className={estilos.editorAviso}>Corretor ortográfico desligado, como no exame.</p>
      </div>

      <label className={estilos.rotuloEditor} htmlFor="texto-redacao">
        Sua redação (em inglês)
      </label>
      <textarea
        id="texto-redacao"
        className={estilos.editor}
        lang="en"
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="sentences"
        value={texto}
        placeholder="Start writing here. Press Enter to start a new paragraph."
        onChange={(e) => aoMudarTexto(e.target.value)}
      />

      <div className={estilos.barraPalavras} aria-hidden="true">
        <span style={{ transform: `scaleX(${fracao})` }} className={atingiu ? estilos.barraCheia : undefined} />
      </div>

      <section className={estilos.metricas} aria-label="Métricas da sua redação">
        <dl className={estilos.numeros}>
          <div className={atingiu ? estilos.numeroOk : undefined}>
            <dt>Palavras</dt>
            <dd className="tabular">
              {analise.palavras}
              <small>/{proposta.minPalavras}</small>
            </dd>
          </div>
          <div>
            <dt>Parágrafos</dt>
            <dd className="tabular">{analise.paragrafos}</dd>
          </div>
          <div>
            <dt>Frases</dt>
            <dd className="tabular">{analise.frases}</dd>
          </div>
          <div>
            <dt>Média por frase</dt>
            <dd className="tabular">
              {analise.mediaPorFrase}
              <small> palavras</small>
            </dd>
          </div>
          <div>
            <dt>Palavras diferentes</dt>
            <dd className="tabular">{analise.palavrasDiferentes}</dd>
          </div>
        </dl>

        <div className={estilos.sinais}>
          <p className={estilos.sinal}>
            <strong>Conectivos usados ({analise.conectivos.length}):</strong>{" "}
            {analise.conectivos.length ? (
              <span lang="en">{analise.conectivos.join(", ")}</span>
            ) : (
              "nenhum ainda — ligue as ideias com however, therefore, for example…"
            )}
          </p>
          {analise.contracoes.length > 0 && (
            <p className={estilos.alerta}>
              <Icone nome="alerta" tamanho={16} />
              <span>
                Contrações em texto acadêmico: <span lang="en">{analise.contracoes.join(", ")}</span>. Escreva por extenso (do not, it is).
              </span>
            </p>
          )}
          {analise.informais.length > 0 && (
            <p className={estilos.alerta}>
              <Icone nome="alerta" tamanho={16} />
              <span>
                Palavras informais: <span lang="en">{analise.informais.join(", ")}</span>. Troque por equivalentes formais (children, many, things → aspects).
              </span>
            </p>
          )}
          {analise.repetidas.length > 0 && (
            <p className={estilos.alerta}>
              <Icone nome="alerta" tamanho={16} />
              <span>
                Repetição: <span lang="en">{analise.repetidas.map((r) => `${r.palavra} (${r.vezes}×)`).join(", ")}</span>. Use sinônimos ou reescreva a frase.
              </span>
            </p>
          )}
          {analise.frasesLongas > 0 && (
            <p className={estilos.alerta}>
              <Icone nome="alerta" tamanho={16} />
              <span>
                {analise.frasesLongas === 1 ? "1 frase passa" : `${analise.frasesLongas} frases passam`} de 40 palavras: divida para ganhar clareza.
              </span>
            </p>
          )}
        </div>
      </section>

      <section className={estilos.checklist} aria-labelledby="titulo-checklist">
        <h2 id="titulo-checklist" className={estilos.subtitulo}>
          Antes de terminar, confira pelos critérios
        </h2>
        {redacao.criterios.map((criterio: CriterioRedacao) => (
          <fieldset key={criterio.nome} className={estilos.grupoChecklist}>
            <legend lang="en">{criterio.nome}</legend>
            {criterio.checklist.map((item) => (
              <label key={item} className={estilos.itemChecklist}>
                <input type="checkbox" checked={marcados.has(item)} onChange={() => aoMarcar(item)} />
                <span>{item}</span>
              </label>
            ))}
          </fieldset>
        ))}
      </section>

      <details className={estilos.rever}>
        <summary>
          <Icone nome="doc" tamanho={18} />
          Ver a redação modelo de novo
        </summary>
        <div className={estilos.reverCorpo}>
          {redacao.modelo.paragrafos.map((p) => (
            <p key={p.en} lang="en" className={estilos.en}>
              {p.en}
            </p>
          ))}
        </div>
      </details>
    </>
  );
}

// --------------------------------------------------------------- principal

interface Props {
  atividade: AtividadeIngles;
  redacao: Redacao;
}

/**
 * Redação de exame em cinco etapas: como a tarefa funciona, os critérios que
 * dão a nota, uma redação modelo comentada, um treino corrigido na hora e a
 * redação do aluno com cronômetro, métricas ao vivo e autoavaliação pelos
 * critérios. O portal não dá nota de banda: só mostra o que dá para conferir.
 */
export function RedacaoIngles({ atividade, redacao }: Props) {
  const { proposta, treino } = redacao;
  const [fase, definirFase] = useState<Fase>({ tipo: "abertura" });
  const [escolhida, definirEscolhida] = useState<number | null>(null);
  const [montada, definirMontada] = useState<number[]>([]);
  const [acertou, definirAcertou] = useState<boolean | null>(null);
  const [acertos, definirAcertos] = useState(0);
  const [texto, definirTexto] = useState(() => lerRascunho(atividade.slug));
  const [segundos, definirSegundos] = useState(0);
  const [rodando, definirRodando] = useState(false);
  const [marcados, definirMarcados] = useState<Set<string>>(() => new Set());
  const [copiado, definirCopiado] = useState(false);

  useEffect(() => {
    if (!rodando) return;
    const id = window.setInterval(() => definirSegundos((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [rodando]);

  const posicao = fase.tipo === "etapa" ? `etapa-${fase.etapa}` : fase.tipo === "treino" ? `treino-${fase.questao}` : fase.tipo;
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [posicao]);

  function mudarTexto(novo: string) {
    definirTexto(novo);
    salvarRascunho(atividade.slug, novo);
    // O cronômetro começa sozinho na primeira letra, como no exame.
    if (!rodando && segundos === 0 && novo.trim()) definirRodando(true);
  }

  function marcar(item: string) {
    definirMarcados((atual) => {
      const proximo = new Set(atual);
      if (proximo.has(item)) proximo.delete(item);
      else proximo.add(item);
      return proximo;
    });
  }

  function irParaEtapa(etapa: number) {
    if (etapa === 3) {
      definirAcertos(0);
      limparQuestao();
      definirFase(treino.length ? { tipo: "treino", questao: 0 } : { tipo: "etapa", etapa: 4 });
    } else {
      definirFase({ tipo: "etapa", etapa: etapa as 0 | 1 | 2 | 4 });
    }
  }

  function limparQuestao() {
    definirEscolhida(null);
    definirMontada([]);
    definirAcertou(null);
  }

  const totalCriterios = redacao.criterios.reduce((soma, c) => soma + c.checklist.length, 0);
  const humorTreino: HumorGabi = acertou === null ? "neutra" : acertou ? "acertou" : "errou";

  if (fase.tipo === "abertura") {
    return (
      <MolduraPratica titulo={atividade.titulo} acento={atividade.cor} humor="neutra">
        <TelaAbertura
          titulo={atividade.abertura.titulo}
          texto={atividade.abertura.texto}
          resumo={[`${proposta.exame} · ${proposta.tarefa}`, ...ETAPAS.map((e, i) => `${i + 1}. ${e.titulo}`)]}
          aoComecar={() => irParaEtapa(0)}
        />
      </MolduraPratica>
    );
  }

  if (fase.tipo === "resultado") {
    const analise = analisarRedacao(texto);
    const pendentes = redacao.criterios.flatMap((c) => c.checklist.filter((item) => !marcados.has(item)).map((item) => ({ criterio: c.nome, item })));
    const final = tituloDoResultado(acertos, Math.max(1, treino.length), ["Treino excelente!", "Bom treino!", "Vale rever o modelo"]);

    async function copiar() {
      try {
        await navigator.clipboard.writeText(texto);
        definirCopiado(true);
      } catch {
        definirCopiado(false);
      }
    }

    function baixar() {
      const arquivo = new Blob([`${proposta.exame} — ${proposta.tarefa}\n${proposta.enunciado.join("\n")}\n\n${texto}\n`], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(arquivo);
      const link = document.createElement("a");
      link.href = url;
      link.download = `redacao-${atividade.slug}.txt`;
      link.click();
      URL.revokeObjectURL(url);
    }

    return (
      <MolduraPratica titulo={atividade.titulo} acento={atividade.cor} humor={final.humor} progresso={{ atual: ETAPAS.length, total: ETAPAS.length }} pontos={acertos * PONTOS_POR_ACERTO}>
        <div className={estilos.resultado}>
          <h1 className={estilos.titulo}>Resumo da sua redação</h1>
          <dl className={estilos.placar}>
            <div>
              <dt>Treino</dt>
              <dd className="tabular">
                {acertos}/{treino.length}
              </dd>
            </div>
            <div className={analise.palavras >= proposta.minPalavras ? estilos.numeroOk : estilos.numeroFalta}>
              <dt>Palavras</dt>
              <dd className="tabular">
                {analise.palavras}
                <small>/{proposta.minPalavras}</small>
              </dd>
            </div>
            <div className={segundos <= proposta.minutos * 60 ? estilos.numeroOk : estilos.numeroFalta}>
              <dt>Tempo</dt>
              <dd className="tabular">
                {formatarTempo(segundos)}
                <small>/{proposta.minutos}:00</small>
              </dd>
            </div>
            <div>
              <dt>Autoavaliação</dt>
              <dd className="tabular">
                {marcados.size}/{totalCriterios}
              </dd>
            </div>
          </dl>

          <p className={estilos.texto}>
            O portal não dá nota de banda: quem corrige {proposta.exame} é um examinador, pelos critérios. Use este resumo para revisar e mostre a redação ao professor.
          </p>

          {(pendentes.length > 0 || analise.palavras < proposta.minPalavras) && (
            <section className={estilos.melhorar} aria-labelledby="titulo-melhorar">
              <h2 id="titulo-melhorar" className={estilos.subtitulo}>
                O que revisar
              </h2>
              <ul>
                {analise.palavras < proposta.minPalavras && (
                  <li>
                    <strong>Tamanho:</strong> faltam {proposta.minPalavras - analise.palavras} palavras para o mínimo. Texto curto perde ponto direto.
                  </li>
                )}
                {pendentes.map(({ criterio, item }) => (
                  <li key={item}>
                    <strong lang="en">{criterio}:</strong> {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className={estilos.acoes}>
            <button type="button" className={estilos.botaoPrincipal} onClick={copiar} disabled={!texto.trim()}>
              <Icone nome="doc" tamanho={18} />
              {copiado ? "Copiado!" : "Copiar a redação"}
            </button>
            <button type="button" className={estilos.botaoSecundario} onClick={baixar} disabled={!texto.trim()}>
              <Icone nome="baixar" tamanho={18} />
              Baixar .txt
            </button>
            <button type="button" className={estilos.botaoSecundario} onClick={() => irParaEtapa(4)}>
              <Icone nome="lapis" tamanho={18} />
              Voltar a escrever
            </button>
            <button type="button" className={estilos.botaoSecundario} onClick={() => irParaEtapa(0)}>
              <Icone nome="recomecar" tamanho={18} />
              Rever desde o começo
            </button>
          </div>
        </div>
      </MolduraPratica>
    );
  }

  // ------------------------------------------------------------- treino
  if (fase.tipo === "treino") {
    const questao: QuestaoTreinoRedacao = treino[fase.questao];
    const ordenar = questao.tipo === "ordenar";
    const fichas = ordenar ? [...questao.palavras, ...(questao.extras ?? [])] : [];
    const verificado = acertou !== null;
    const podeVerificar = !verificado && (ordenar ? montada.length > 0 : escolhida !== null);
    const ultimo = fase.questao === treino.length - 1;
    const respostaCerta = ordenar ? questao.palavras.join(" ") : questao.opcoes[questao.resposta];

    function verificar() {
      if (!podeVerificar) return;
      const certo = ordenar ? montada.map((i) => fichas[i]).join(" ") === questao.palavras.join(" ") : escolhida === questao.resposta;
      definirAcertou(certo);
      if (certo) definirAcertos((n) => n + 1);
    }

    function continuar() {
      limparQuestao();
      if (ultimo) definirFase({ tipo: "etapa", etapa: 4 });
      else definirFase({ tipo: "treino", questao: fase.tipo === "treino" ? fase.questao + 1 : 0 });
    }

    return (
      <MolduraPratica
        titulo={atividade.titulo}
        acento={atividade.cor}
        humor={humorTreino}
        etiqueta={{ icone: ETAPAS[3].icone, texto: `Etapa 4 de ${ETAPAS.length} · Treino` }}
        progresso={{ atual: 3, total: ETAPAS.length }}
        pontos={acertos * PONTOS_POR_ACERTO}
        rodape={
          <RodapeResposta
            podeVerificar={podeVerificar}
            ultimo={false}
            aoVerificar={verificar}
            aoContinuar={continuar}
            resultado={
              verificado
                ? {
                    acertou: !!acertou,
                    titulo: acertou ? "Isso mesmo!" : "Não foi essa — veja por quê.",
                    detalhe: (
                      <>
                        {!acertou && ordenar && (
                          <span className={estilos.respostaCerta} lang="en">
                            {respostaCerta}
                          </span>
                        )}
                        {questao.explicacao}
                      </>
                    ),
                  }
                : null
            }
          />
        }
      >
        <p className={estilos.contador}>
          Questão {fase.questao + 1} de {treino.length}
        </p>
        <h1 className={estilos.pergunta}>{questao.pergunta}</h1>
        {ordenar ? (
          <MontarFrase
            key={fase.questao}
            fichas={fichas}
            chave={questao.pergunta}
            montada={montada}
            aoMudar={definirMontada}
            verificado={verificado}
            acertou={!!acertou}
          />
        ) : (
          <OpcoesResposta
            key={fase.questao}
            opcoes={questao.opcoes}
            resposta={questao.resposta}
            chave={questao.pergunta}
            escolhida={escolhida}
            verificado={verificado}
            aoEscolher={definirEscolhida}
          />
        )}
      </MolduraPratica>
    );
  }

  // ------------------------------------------------- etapas de conteúdo
  const etapa = fase.etapa;
  const conteudo =
    etapa === 0 ? (
      <>
        <Proposta proposta={proposta} />
        {redacao.guia.map((secao) => (
          <section key={secao.titulo} className={estilos.secao}>
            <h2 className={estilos.subtitulo}>{secao.titulo}</h2>
            <Blocos blocos={secao.blocos} />
          </section>
        ))}
      </>
    ) : etapa === 1 ? (
      <Criterios redacao={redacao} />
    ) : etapa === 2 ? (
      <Modelo redacao={redacao} />
    ) : (
      <Editor
        redacao={redacao}
        texto={texto}
        aoMudarTexto={mudarTexto}
        segundos={segundos}
        rodando={rodando}
        aoAlternarCronometro={() => definirRodando((r) => !r)}
        marcados={marcados}
        aoMarcar={marcar}
      />
    );

  const humor: HumorGabi = etapa === 4 ? "neutra" : "explicando";
  const avancar = etapa === 4 ? () => {
    definirRodando(false);
    definirFase({ tipo: "resultado" });
  } : () => irParaEtapa(etapa + 1);

  return (
    <MolduraPratica
      titulo={atividade.titulo}
      acento={atividade.cor}
      humor={humor}
      etiqueta={{ icone: ETAPAS[etapa].icone, texto: `Etapa ${etapa + 1} de ${ETAPAS.length} · ${ETAPAS[etapa].titulo}` }}
      progresso={{ atual: etapa, total: ETAPAS.length }}
      pontos={acertos * PONTOS_POR_ACERTO}
      rodape={
        <div className={estilos.rodape}>
          {etapa > 0 ? (
            <button type="button" className={estilos.botaoSecundario} onClick={() => irParaEtapa(etapa === 4 ? 2 : etapa - 1)}>
              <Icone nome="seta-esquerda" tamanho={18} />
              {etapa === 4 ? "Rever o modelo" : "Voltar"}
            </button>
          ) : (
            <span />
          )}
          <button type="button" className={estilos.seguir} onClick={avancar} disabled={etapa === 4 && !texto.trim()}>
            {etapa === 4 ? "Terminar e ver o resumo" : etapa === 2 ? "Ir para o treino" : "Continuar"}
            <Icone nome="seta-direita" tamanho={18} />
          </button>
        </div>
      }
    >
      <h1 className={estilos.titulo}>{ETAPAS[etapa].titulo}</h1>
      {conteudo}
    </MolduraPratica>
  );
}
