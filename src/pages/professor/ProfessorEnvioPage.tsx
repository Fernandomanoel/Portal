import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { EstadoVazio } from "@/components/EstadoVazio";
import { Icone } from "@/components/Icone";
import { ErroApi, apagarEnvio, lancarNota, obterEnvio, urlArquivo } from "@/lib/apiProvas";
import { conferirItem } from "@/lib/correcaoProva";
import { respostaAceita, verificarCodigo } from "@/lib/correcaoTexto";
import { rotas } from "@/lib/rotas";
import type { Envio, SaidaProva } from "@/types/envio";
import { TENTATIVAS_POR_QUESTAO, type ProvaInterativa } from "@/types/quiz";
import { MensagemHistorico } from "./MensagemHistorico";
import { MensagemResultado } from "./MensagemResultado";
import { dataHora, duracao, hora, nota, situacaoDaNota, tamanhoLegivel } from "./formato";
import { useProfessor } from "./ProfessorLayout";
import estilos from "./ProfessorEnvioPage.module.css";

type Estado =
  | { fase: "carregando" }
  | { fase: "pronto"; envio: Envio; prova: ProvaInterativa | null }
  | { fase: "ausente"; mensagem: string };

const MOTIVO: Record<SaidaProva["motivo"], string> = {
  aba: "Trocou de aba",
  janela: "Abriu outra janela ou programa",
  "tela-cheia": "Saiu da tela cheia",
};

export function ProfessorEnvioPage() {
  const { id = "" } = useParams();
  const { sessaoVencida } = useProfessor();
  const [estado, definirEstado] = useState<Estado>({ fase: "carregando" });

  useEffect(() => {
    let ativo = true;
    obterEnvio(id)
      .then(({ envio, prova }) => ativo && definirEstado({ fase: "pronto", envio, prova }))
      .catch((falha) => {
        if (!ativo) return;
        if (falha instanceof ErroApi && falha.status === 401) sessaoVencida();
        else definirEstado({ fase: "ausente", mensagem: falha instanceof ErroApi ? falha.message : "Não foi possível abrir o envio." });
      });
    return () => {
      ativo = false;
    };
  }, [id, sessaoVencida]);

  if (estado.fase === "carregando") return <p aria-live="polite">Carregando o envio…</p>;

  if (estado.fase === "ausente") {
    return (
      <>
        <CabecalhoPagina titulo="Envio não encontrado" voltarPara={rotas.professor()} />
        <EstadoVazio icone="prova" titulo="Esse envio não está mais aqui" texto={estado.mensagem} />
      </>
    );
  }

  const { envio, prova } = estado;
  return (
    <DetalheEnvio
      envio={envio}
      prova={prova}
      aoAtualizar={(atualizado) => definirEstado({ fase: "pronto", envio: atualizado, prova })}
      aoSessaoVencida={sessaoVencida}
    />
  );
}

interface DetalheProps {
  envio: Envio;
  prova: ProvaInterativa | null;
  aoAtualizar: (envio: Envio) => void;
  aoSessaoVencida: () => void;
}

function DetalheEnvio({ envio, prova, aoAtualizar, aoSessaoVencida }: DetalheProps) {
  return (
    <>
      <CabecalhoPagina titulo={envio.nomeAluno} texto={envio.provaTitulo} voltarPara={rotas.professor()} />

      <div className={estilos.grade}>
        <div className={estilos.coluna}>
          <dl className={estilos.resumo}>
            <div>
              <dt>Começou</dt>
              <dd className="tabular">{dataHora(envio.iniciadaEm)}</dd>
            </div>
            <div>
              <dt>Enviou</dt>
              <dd className="tabular">{dataHora(envio.enviadaEm)}</dd>
            </div>
            <div>
              <dt>Tempo de prova</dt>
              <dd className="tabular">{duracao(envio.iniciadaEm, envio.enviadaEm)}</dd>
            </div>
            {envio.correcao && (
              <div>
                <dt>Acertos</dt>
                <dd className="tabular">
                  {envio.correcao.acertos} de {envio.correcao.total}
                  {!!envio.correcao.aRevisar && ` (${envio.correcao.aRevisar} a revisar)`}
                </dd>
              </div>
            )}
          </dl>

          {envio.arquivo && (
            <section className={estilos.bloco} aria-labelledby="titulo-arquivo">
              <h2 id="titulo-arquivo" className={estilos.blocoTitulo}>
                Arquivo enviado
              </h2>
              <div className={estilos.arquivo}>
                <Icone nome="doc" tamanho={22} />
                <div className={estilos.arquivoTexto}>
                  <p className={estilos.arquivoNome}>{envio.arquivo.nome}</p>
                  <p className={`${estilos.suave} tabular`}>{tamanhoLegivel(envio.arquivo.tamanho)}</p>
                </div>
                <a className={estilos.baixar} href={urlArquivo(envio.id)} download>
                  <Icone nome="baixar" tamanho={16} />
                  Baixar
                </a>
              </div>
            </section>
          )}

          <Saidas saidas={envio.saidas} />

          <Respostas envio={envio} prova={prova} />
        </div>

        <aside className={estilos.lateral}>
          <FormularioNota envio={envio} aoAtualizar={aoAtualizar} aoSessaoVencida={aoSessaoVencida} />
          <MensagemResultado key={`${envio.id}-${envio.nota}`} envio={envio} />
          <MensagemHistorico key={`historico-${envio.id}-${envio.nota}`} envio={envio} />
          <p className={`${estilos.apagarEm} tabular`}>
            <Icone nome="relogio" tamanho={16} />
            Apagado sozinho em {new Date(envio.apagarEm).toLocaleDateString("pt-BR")}
          </p>
          <BotaoApagar envio={envio} aoSessaoVencida={aoSessaoVencida} />
        </aside>
      </div>
    </>
  );
}

function Saidas({ saidas }: { saidas: SaidaProva[] }) {
  return (
    <section className={estilos.bloco} aria-labelledby="titulo-saidas">
      <h2 id="titulo-saidas" className={estilos.blocoTitulo}>
        Saídas da prova
      </h2>
      {saidas.length === 0 ? (
        <p className={estilos.suave}>O aluno não saiu da prova.</p>
      ) : (
        <ul className={estilos.saidas}>
          {saidas.map((saida) => (
            <li key={saida.em} className={estilos.saida}>
              <Icone nome="alerta" tamanho={16} />
              <span>
                <strong className="tabular">{hora(saida.em)}</strong> · {MOTIVO[saida.motivo]}
                {saida.liberadaEm && (
                  <span className={estilos.suave}>
                    {" "}
                    · liberada por {saida.liberadaPor ?? "professor"} às <span className="tabular">{hora(saida.liberadaEm)}</span>
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Respostas({ envio, prova }: { envio: Envio; prova: ProvaInterativa | null }) {
  if (envio.tipoProva === "pratica") return null;

  return (
    <section className={estilos.bloco} aria-labelledby="titulo-respostas">
      <h2 id="titulo-respostas" className={estilos.blocoTitulo}>
        Respostas
      </h2>
      {!prova && <p className={estilos.suave}>A prova saiu do portal depois do envio: as respostas aparecem sem o enunciado.</p>}
      <ol className={estilos.respostas}>
        {envio.respostas.map((resposta, i) => {
          if (prova?.tipo === "descritiva") {
            return (
              <li key={i} className={estilos.resposta}>
                <p className={estilos.enunciado}>{prova.perguntas[i]}</p>
                <p className={estilos.texto}>{String(resposta ?? "")}</p>
              </li>
            );
          }

          if (prova?.tipo === "autocorrigida") {
            const item = prova.itens[i];
            let valores: Record<string, string> = {};
            try {
              valores = JSON.parse(String(resposta ?? "{}"));
            } catch {
              valores = {};
            }
            const resultado = conferirItem(item, valores);
            return (
              <li key={i} className={estilos.resposta}>
                <p className={estilos.enunciado}>{item.titulo}</p>
                <p className={resultado.certo ? estilos.certa : estilos.errada}>
                  <Icone nome={resultado.certo ? "check" : "x"} tamanho={16} />
                  {resultado.certo ? "Questão certa" : "Questão errada"}
                  {envio.tentativas ? ` · ${envio.tentativas[i]} de ${TENTATIVAS_POR_QUESTAO} tentativas` : ""}
                </p>
                {item.campos.map((campo) => {
                  const campoResultado = resultado.campos[campo.id];
                  const valor = valores[campo.id] ?? "";
                  return (
                    <div key={campo.id}>
                      {campo.rotulo && <p className={estilos.gabarito}>{campo.rotulo}</p>}
                      <pre className={estilos.texto}>{valor || "sem resposta"}</pre>
                      <p className={campoResultado.certo ? estilos.certa : estilos.errada}>
                        <Icone nome={campoResultado.certo ? "check" : "x"} tamanho={16} />
                        {campoResultado.certo ? "Campo certo" : (campoResultado.mensagem ?? "Campo errado")}
                      </p>
                      {campoResultado.detalhes && (
                        <ul className={estilos.gabarito}>
                          {campoResultado.detalhes.map((detalhe) => (
                            <li key={detalhe.descricao}>
                              {detalhe.ok ? "✓" : "✗"} {detalhe.descricao}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </li>
            );
          }

          const pergunta = prova && prova.tipo !== "pratica" ? prova.perguntas[i] : undefined;

          if (pergunta && pergunta.tipo === "dissertativa" && pergunta.verificacoes) {
            const texto = String(resposta ?? "");
            const testes = verificarCodigo(texto, pergunta.verificacoes);
            const passou = testes.every((teste) => teste.ok);
            return (
              <li key={i} className={estilos.resposta}>
                <p className={estilos.enunciado}>{pergunta.pergunta}</p>
                <p className={passou ? estilos.certa : estilos.errada}>
                  <Icone nome={passou ? "check" : "alerta"} tamanho={16} />
                  {passou ? "Passou em todas as verificações" : "Não passou em todas as verificações"}
                </p>
                <pre className={estilos.texto}>{texto || "sem resposta"}</pre>
                <ul className={estilos.gabarito}>
                  {testes.map((teste) => (
                    <li key={teste.descricao}>
                      {teste.ok ? "✓" : "✗"} {teste.descricao}
                    </li>
                  ))}
                </ul>
              </li>
            );
          }

          if (pergunta && pergunta.tipo === "dissertativa") {
            const texto = String(resposta ?? "");
            const bateu = respostaAceita(texto, pergunta.respostasAceitas);
            return (
              <li key={i} className={estilos.resposta}>
                <p className={estilos.enunciado}>{pergunta.pergunta}</p>
                <p className={bateu ? estilos.certa : estilos.revisar}>
                  <Icone nome={bateu ? "check" : "alerta"} tamanho={16} />
                  {bateu ? "Bateu com a correção automática: " : "A revisar: "}
                  {texto || "sem resposta"}
                </p>
                <p className={estilos.gabarito}>Respostas aceitas: {pergunta.respostasAceitas.join(", ")}</p>
              </li>
            );
          }

          if (typeof resposta === "string") {
            return (
              <li key={i} className={estilos.resposta}>
                <p className={estilos.texto}>{resposta}</p>
              </li>
            );
          }

          if (!pergunta) {
            return (
              <li key={i} className={estilos.resposta}>
                <p>Opção {typeof resposta === "number" ? resposta + 1 : "—"}</p>
              </li>
            );
          }
          const acertou = resposta === pergunta.correta;
          return (
            <li key={i} className={estilos.resposta}>
              <p className={estilos.enunciado}>{pergunta.pergunta}</p>
              <p className={acertou ? estilos.certa : estilos.errada}>
                <Icone nome={acertou ? "check" : "x"} tamanho={16} />
                {acertou ? "Acertou: " : "Marcou: "}
                {typeof resposta === "number" ? pergunta.opcoes[resposta] : "sem resposta"}
              </p>
              {!acertou && <p className={estilos.gabarito}>Certa: {pergunta.opcoes[pergunta.correta]}</p>}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/** "8,5", "8.5" ou "10" → número; null se não for uma nota de 0 a 10 com até uma casa. */
function lerNota(texto: string): number | null {
  const limpo = texto.trim().replace(",", ".");
  if (!/^\d{1,2}(\.\d)?$/.test(limpo)) return null;
  const valor = Number(limpo);
  return valor >= 0 && valor <= 10 ? valor : null;
}

function FormularioNota({ envio, aoAtualizar, aoSessaoVencida }: { envio: Envio; aoAtualizar: (envio: Envio) => void; aoSessaoVencida: () => void }) {
  const [texto, definirTexto] = useState(envio.nota === null ? "" : nota(envio.nota));
  const [comentario, definirComentario] = useState(envio.comentario ?? "");
  const [erro, definirErro] = useState<string | null>(null);
  const [salvando, definirSalvando] = useState(false);
  const [salvo, definirSalvo] = useState(false);
  const situacao = situacaoDaNota(envio.nota);

  async function salvar(evento: FormEvent) {
    evento.preventDefault();
    const valor = lerNota(texto);
    if (valor === null) {
      definirErro("Digite uma nota de 0 a 10, com até uma casa decimal (8,5).");
      return;
    }
    definirSalvando(true);
    definirErro(null);
    definirSalvo(false);
    try {
      const atualizado = await lancarNota(envio.id, { nota: valor, comentario: comentario.trim() || undefined });
      aoAtualizar(atualizado);
      definirTexto(nota(valor));
      definirSalvo(true);
    } catch (falha) {
      if (falha instanceof ErroApi && falha.status === 401) aoSessaoVencida();
      else definirErro(falha instanceof ErroApi ? falha.message : "Não foi possível salvar a nota.");
    } finally {
      definirSalvando(false);
    }
  }

  return (
    <form className={estilos.notaCaixa} onSubmit={salvar}>
      <div className={`${estilos.notaAtual} ${estilos[situacao]}`}>
        <strong className={`${estilos.notaValor} tabular`}>{envio.nota === null ? "—" : nota(envio.nota)}</strong>
        <p className={estilos.notaSituacao}>
          {envio.corrigidaPor
            ? `Lançada por ${envio.corrigidaPor} em ${dataHora(envio.corrigidaEm ?? envio.enviadaEm)}`
            : envio.correcao && envio.nota !== null
              ? "Nota automática"
              : envio.correcao?.aRevisar
                ? `A revisar: ${envio.correcao.aRevisar} dissertativa${envio.correcao.aRevisar === 1 ? "" : "s"} sem correspondência automática`
                : "A corrigir"}
        </p>
      </div>

      <div className={estilos.campo}>
        <label htmlFor="nota">{envio.nota === null ? "Nota (0 a 10)" : "Mudar a nota (0 a 10)"}</label>
        <input
          id="nota"
          inputMode="decimal"
          value={texto}
          onChange={(e) => {
            definirTexto(e.target.value);
            definirSalvo(false);
          }}
          placeholder="8,5"
          autoComplete="off"
          aria-invalid={!!erro}
        />
      </div>
      <div className={estilos.campo}>
        <label htmlFor="comentario">
          Comentário <span className={estilos.suave}>(opcional)</span>
        </label>
        <textarea
          id="comentario"
          value={comentario}
          onChange={(e) => {
            definirComentario(e.target.value);
            definirSalvo(false);
          }}
          maxLength={2000}
          rows={3}
        />
      </div>

      {erro && (
        <p className={estilos.erro} role="alert">
          {erro}
        </p>
      )}
      {salvo && (
        <p className={estilos.salvo} role="status">
          <Icone nome="check" tamanho={16} />
          Nota salva.
        </p>
      )}

      <button type="submit" className={estilos.principal} disabled={salvando || !texto.trim()}>
        {salvando ? "Salvando…" : envio.corrigidaPor ? "Atualizar a nota" : "Lançar a nota"}
      </button>
    </form>
  );
}

function BotaoApagar({ envio, aoSessaoVencida }: { envio: Envio; aoSessaoVencida: () => void }) {
  const navegar = useNavigate();
  const [confirmando, definirConfirmando] = useState(false);
  const [apagando, definirApagando] = useState(false);
  const [erro, definirErro] = useState<string | null>(null);

  async function apagar() {
    definirApagando(true);
    try {
      await apagarEnvio(envio.id);
      navegar(rotas.professor(), { replace: true });
    } catch (falha) {
      if (falha instanceof ErroApi && falha.status === 401) aoSessaoVencida();
      else definirErro(falha instanceof ErroApi ? falha.message : "Não foi possível apagar.");
      definirApagando(false);
    }
  }

  if (!confirmando) {
    return (
      <button type="button" className={estilos.apagar} onClick={() => definirConfirmando(true)}>
        <Icone nome="lixeira" tamanho={16} />
        Apagar este envio
      </button>
    );
  }

  return (
    <div className={estilos.confirmar} role="group" aria-label="Confirmar exclusão">
      <p>
        Apagar a prova de {envio.nomeAluno}
        {envio.arquivo ? " e o arquivo" : ""}? Não dá para desfazer.
      </p>
      {erro && (
        <p className={estilos.erro} role="alert">
          {erro}
        </p>
      )}
      <div className={estilos.confirmarBotoes}>
        <button type="button" className={estilos.apagarDeVez} onClick={apagar} disabled={apagando}>
          {apagando ? "Apagando…" : "Apagar de vez"}
        </button>
        <button type="button" className={estilos.cancelar} onClick={() => definirConfirmando(false)} disabled={apagando}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
