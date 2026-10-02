import { useCallback, useEffect, useMemo, useState } from "react";
import { useBlocker, useNavigate } from "react-router-dom";

import { useProvaEmAndamento } from "@/hooks/ProvaEmAndamento";
import { useTravaProva } from "@/hooks/useTravaProva";
import { ErroApi, aceitarResultadoProvisorio, enviarProva, verificarItem } from "@/lib/apiProvas";
import type { ReciboEnvio, SaidaProva } from "@/types/envio";
import { ehAutocorrigida, ehDescritiva, ehMista, ehPratica, totalDeQuestoes, type ProvaParaAluno, type ResultadoItem } from "@/types/quiz";
import { CampoArquivo, problemaDoArquivo } from "./CampoArquivo";
import { ProvaBloqueada } from "./ProvaBloqueada";
import { ProvaIdentificacao } from "./ProvaIdentificacao";
import { QuizAceitarResultado } from "./QuizAceitarResultado";
import { QuizAutocorrigida } from "./QuizAutocorrigida";
import { QuizDescritiva } from "./QuizDescritiva";
import { QuizMista } from "./QuizMista";
import { QuizMultiplaEscolha } from "./QuizMultiplaEscolha";
import { QuizNota } from "./QuizNota";
import { QuizPratica } from "./QuizPratica";
import { QuizSaidaBloqueada } from "./QuizSaidaBloqueada";
import estilos from "./Quiz.module.css";

type Fase =
  | { tipo: "identificacao" }
  | { tipo: "respondendo" }
  | { tipo: "enviando" }
  | { tipo: "enviada"; recibo: ReciboEnvio };

interface Props {
  prova: ProvaParaAluno;
  /** Caminho da prova em provasInterativas/, sem ".prova.ts": o id que o servidor conhece. */
  provaId: string;
  voltarPara: string;
}

/**
 * A regra da trava: prova travada é o padrão. `permiteSairDaAba: true`
 * desliga (a de IA). Prova prática, que é feita em outro programa, já nasce
 * destravada, a não ser que a prova diga `permiteSairDaAba: false`.
 */
function provaTravada(prova: ProvaParaAluno) {
  if (prova.permiteSairDaAba !== undefined) return !prova.permiteSairDaAba;
  return !ehPratica(prova);
}

function formatarNota(valor: number) {
  return valor.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function mensagemResultado(recibo: ReciboEnvio, nomeAluno: string, hora: string) {
  if (!recibo.correcao) return `${nomeAluno}, sua prova foi enviada em ${hora}. O professor vai corrigir e lançar a nota.`;
  const { acertos, total, aRevisar } = recibo.correcao;
  if (recibo.nota !== null) {
    if (!aRevisar) return `${nomeAluno}, você acertou ${acertos} de ${total} questões. Prova enviada em ${hora}.`;
    return `${nomeAluno}, você aceitou o resultado provisório. Nota final: ${formatarNota(recibo.nota)}. Prova enviada em ${hora}.`;
  }
  const singular = aRevisar === 1;
  return `${nomeAluno}, ${acertos} de ${total} questões já foram confirmadas. ${aRevisar} ${singular ? "questão vai" : "questões vão"} passar pelo professor(a) — se a resposta estiver certa, a nota é ajustada. Prova enviada em ${hora}.`;
}

export function QuizContainer({ prova, provaId, voltarPara }: Props) {
  const navegar = useNavigate();
  const { travar, liberar } = useProvaEmAndamento();
  const travada = provaTravada(prova);
  const totalQuestoes = totalDeQuestoes(prova);

  const [fase, definirFase] = useState<Fase>({ tipo: "identificacao" });
  const [nomeAluno, definirNomeAluno] = useState("");
  const [iniciadaEm, definirIniciadaEm] = useState("");
  // Uma chave por prova aberta: reenviar depois de falha de rede não duplica o envio.
  const [chave] = useState(() => crypto.randomUUID());
  const [escolhas, definirEscolhas] = useState<Record<number, number>>({});
  const [textos, definirTextos] = useState<string[]>(() => Array.from({ length: totalQuestoes }, () => ""));
  const [valores, definirValores] = useState<Record<string, string>[]>(() => Array.from({ length: totalQuestoes }, () => ({})));
  const [resultados, definirResultados] = useState<(ResultadoItem | undefined)[]>([]);
  const [testando, definirTestando] = useState<number | null>(null);
  const [arquivo, definirArquivo] = useState<File | null>(null);
  const [saidas, definirSaidas] = useState<SaidaProva[]>([]);
  const [erroEnvio, definirErroEnvio] = useState<string | null>(null);
  const [mostrarAceitar, definirMostrarAceitar] = useState(false);
  const [aceitando, definirAceitando] = useState(false);
  const [erroAceitar, definirErroAceitar] = useState<string | null>(null);

  const emAndamento = fase.tipo === "respondendo" || fase.tipo === "enviando";
  const saidaPendente = saidas.find((saida) => !saida.liberadaEm) ?? null;

  const registrarSaida = useCallback((motivo: SaidaProva["motivo"]) => {
    definirSaidas((atual) => (atual.some((s) => !s.liberadaEm) ? atual : [...atual, { em: new Date().toISOString(), motivo }]));
  }, []);

  const trava = useTravaProva(travada && fase.tipo === "respondendo", registrarSaida);
  const { sairTelaCheia } = trava;

  useEffect(() => {
    if (emAndamento) travar();
    else liberar();
    return liberar;
  }, [emAndamento, travar, liberar]);

  useEffect(() => {
    if (fase.tipo === "enviada") sairTelaCheia();
  }, [fase.tipo, sairTelaCheia]);

  // Fechar a aba é barrado pelo beforeunload do ProvedorProvaEmAndamento; isto
  // barra o resto: um link do portal, o botão voltar do navegador.
  const bloqueio = useBlocker(({ currentLocation, nextLocation }) => emAndamento && currentLocation.pathname !== nextLocation.pathname);

  const respondidas = ehPratica(prova)
    ? 0
    : ehAutocorrigida(prova)
      ? resultados.filter((resultado) => resultado?.certo).length
      : ehDescritiva(prova)
      ? textos.filter((texto) => texto.trim().length > 0).length
      : ehMista(prova)
        ? prova.perguntas.filter((pergunta, i) => (pergunta.tipo === "dissertativa" ? textos[i]?.trim().length > 0 : escolhas[i] !== undefined)).length
        : Object.keys(escolhas).length;

  const problemaArquivo = arquivo && prova.envioArquivo ? problemaDoArquivo(arquivo, prova.envioArquivo) : null;
  const faltaArquivo = !!prova.envioArquivo?.obrigatorio && !arquivo;
  // Na prova com teste na hora, o aluno envia quando quiser: o que não estiver certo vale zero.
  const completa = (ehAutocorrigida(prova) || respondidas === totalQuestoes) && !faltaArquivo && !problemaArquivo;

  const pendencia = useMemo(() => {
    if (ehAutocorrigida(prova)) return `${respondidas} de ${totalQuestoes} questões testadas e certas. Questão sem acerto vale zero no envio.`;
    if (respondidas < totalQuestoes) return `Responda todas as questões (${respondidas} de ${totalQuestoes}).`;
    if (faltaArquivo) return "Anexe o arquivo da prova.";
    if (problemaArquivo) return problemaArquivo;
    return null;
  }, [prova, respondidas, totalQuestoes, faltaArquivo, problemaArquivo]);

  async function comecar(nome: string) {
    definirNomeAluno(nome);
    definirIniciadaEm(new Date().toISOString());
    if (travada) await trava.entrarTelaCheia();
    definirFase({ tipo: "respondendo" });
  }

  async function aoLiberar(professor: string) {
    definirSaidas((atual) => atual.map((s) => (s.liberadaEm ? s : { ...s, liberadaEm: new Date().toISOString(), liberadaPor: professor })));
    await trava.entrarTelaCheia();
  }

  async function enviar() {
    if (!completa) return;
    definirFase({ tipo: "enviando" });
    definirErroEnvio(null);
    const respostas = ehPratica(prova)
      ? []
      : ehAutocorrigida(prova)
        ? prova.itens.map((_, i) => JSON.stringify(valores[i] ?? {}))
        : ehDescritiva(prova)
        ? textos
        : ehMista(prova)
          ? prova.perguntas.map((pergunta, i) => (pergunta.tipo === "dissertativa" ? (textos[i] ?? "") : (escolhas[i] ?? null)))
          : Array.from({ length: totalQuestoes }, (_, i) => escolhas[i] ?? null);
    try {
      const recibo = await enviarProva({ chave, provaId, nomeAluno, iniciadaEm, respostas, saidas }, arquivo);
      definirFase({ tipo: "enviada", recibo });
    } catch (falha) {
      definirErroEnvio(falha instanceof ErroApi ? falha.message : "Não foi possível enviar. Tente de novo.");
      definirFase({ tipo: "respondendo" });
    }
  }

  function mudarCampo(item: number, campo: string, valor: string) {
    definirValores((atual) => atual.map((v, i) => (i === item ? { ...v, [campo]: valor } : v)));
    // A resposta mudou: o resultado antigo não vale mais, só um novo teste confirma.
    definirResultados((atual) => atual.map((r, i) => (i === item ? undefined : r)));
  }

  async function testarItem(item: number) {
    if (!ehAutocorrigida(prova)) return;
    definirTestando(item);
    definirErroEnvio(null);
    try {
      const resultado = await verificarItem(provaId, item, valores[item] ?? {});
      definirResultados((atual) => {
        const proximo = [...atual];
        proximo[item] = resultado;
        return proximo;
      });
    } catch (falha) {
      definirErroEnvio(falha instanceof ErroApi ? falha.message : "Não foi possível testar agora. Tente de novo.");
    } finally {
      definirTestando(null);
    }
  }

  async function confirmarAceite() {
    if (fase.tipo !== "enviada") return;
    definirAceitando(true);
    definirErroAceitar(null);
    try {
      const novoRecibo = await aceitarResultadoProvisorio(fase.recibo.id);
      definirFase({ tipo: "enviada", recibo: novoRecibo });
      definirMostrarAceitar(false);
    } catch (falha) {
      definirErroAceitar(falha instanceof ErroApi ? falha.message : "Não foi possível confirmar. Tente de novo.");
    } finally {
      definirAceitando(false);
    }
  }

  if (fase.tipo === "identificacao") {
    return (
      <div className={estilos.prova}>
        <ProvaIdentificacao prova={prova} travada={travada} aoComecar={comecar} aoVoltar={() => navegar(voltarPara)} />
      </div>
    );
  }

  if (fase.tipo === "enviada") {
    const { recibo } = fase;
    const hora = new Date(recibo.enviadaEm).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
    const pendente = recibo.nota === null && !!recibo.correcao?.aRevisar;
    const notaProvisoria = pendente ? Math.round((recibo.correcao!.acertos / recibo.correcao!.total) * 100) / 10 : null;

    return (
      <div className={estilos.prova}>
        <header className={estilos.topo}>
          <h1 className={estilos.titulo}>{prova.titulo}</h1>
        </header>
        <QuizNota nota={recibo.nota} detalhe={mensagemResultado(recibo, nomeAluno, hora)} />

        {pendente && notaProvisoria !== null && (
          <div className={estilos.provisoria}>
            <p className={estilos.provisoriaTexto}>
              Se as questões pendentes forem consideradas erradas, sua nota seria <strong>{formatarNota(notaProvisoria)}</strong>. Prefere não
              esperar o professor?
            </p>
            <button
              type="button"
              className={estilos.aceitarProvisoria}
              onClick={() => {
                definirErroAceitar(null);
                definirMostrarAceitar(true);
              }}
            >
              Aceitar este resultado agora
            </button>
          </div>
        )}

        <div className={estilos.acoes}>
          <button type="button" className={estilos.sair} onClick={() => navegar(voltarPara)}>
            Voltar para as provas
          </button>
        </div>

        {mostrarAceitar && notaProvisoria !== null && (
          <QuizAceitarResultado
            notaProvisoria={notaProvisoria}
            aRevisar={recibo.correcao!.aRevisar!}
            enviando={aceitando}
            erro={erroAceitar}
            aoConfirmar={confirmarAceite}
            aoCancelar={() => definirMostrarAceitar(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className={estilos.prova}>
      <header className={estilos.topo}>
        <div className={estilos.topoTexto}>
          <h1 className={estilos.titulo}>{prova.titulo}</h1>
          <p className={estilos.aluno}>{nomeAluno}</p>
        </div>
        {totalQuestoes > 0 && (
          <span className={`${estilos.andamento} tabular`}>
            {respondidas} de {totalQuestoes}
            {ehAutocorrigida(prova) ? " certas" : ""}
          </span>
        )}
      </header>

      {ehPratica(prova) ? (
        <QuizPratica prova={prova} />
      ) : ehDescritiva(prova) ? (
        <QuizDescritiva
          prova={prova}
          textos={textos}
          aoEscrever={(pergunta, texto) =>
            definirTextos((atual) => {
              const proximo = [...atual];
              proximo[pergunta] = texto;
              return proximo;
            })
          }
        />
      ) : ehAutocorrigida(prova) ? (
        <QuizAutocorrigida prova={prova} valores={valores} resultados={resultados} testando={testando} aoMudar={mudarCampo} aoTestar={testarItem} />
      ) : ehMista(prova) ? (
        <QuizMista
          prova={prova}
          escolhas={escolhas}
          textos={textos}
          aoResponder={(pergunta, opcao) => definirEscolhas((atual) => ({ ...atual, [pergunta]: opcao }))}
          aoEscrever={(pergunta, texto) =>
            definirTextos((atual) => {
              const proximo = [...atual];
              proximo[pergunta] = texto;
              return proximo;
            })
          }
        />
      ) : (
        <QuizMultiplaEscolha
          prova={prova}
          escolhas={escolhas}
          aoResponder={(pergunta, opcao) => definirEscolhas((atual) => ({ ...atual, [pergunta]: opcao }))}
        />
      )}

      {prova.envioArquivo && (
        <CampoArquivo
          regra={prova.envioArquivo}
          arquivo={arquivo}
          aoEscolher={definirArquivo}
          aoAbrirSeletor={trava.pausar}
          aoFecharSeletor={trava.retomar}
        />
      )}

      <div className={estilos.acoes}>
        <button type="button" className={estilos.enviar} disabled={!completa || fase.tipo === "enviando"} onClick={enviar}>
          {fase.tipo === "enviando" ? "Enviando…" : "Enviar prova"}
        </button>
        {erroEnvio ? (
          <p className={estilos.erro} role="alert">
            {erroEnvio}
          </p>
        ) : (
          <p className={estilos.aviso}>{pendencia ?? "O envio é único: depois de enviar não dá para refazer."}</p>
        )}
      </div>

      {travada && saidaPendente && <ProvaBloqueada saida={saidaPendente} aoLiberar={aoLiberar} />}

      {bloqueio.state === "blocked" && <QuizSaidaBloqueada aoFicar={() => bloqueio.reset()} aoSair={() => bloqueio.proceed()} />}
    </div>
  );
}
