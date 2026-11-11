import { useEffect, useRef, useState } from "react";

import { Icone } from "@/components/Icone";
import { registrarDisparo } from "@/lib/apiDisparos";
import {
  ErroEvolution,
  LIMITE_IMAGEM_MB,
  RITMO,
  conectar,
  desconectar,
  enviar,
  esperar,
  estadoDaConexao,
  guardarConfig,
  lerConfig,
  lerImagem,
  pausaAntesDoProximo,
  type ConfigEvolution,
  type Estado,
  type Imagem,
} from "@/lib/evolution";
import { montarMensagem, type Destinatario, type TipoMensagem } from "@/lib/mensagensAlunos";
import type { ItemDisparo, RegistroDisparo } from "@/types/disparo";
import estilos from "./DisparoAutomatico.module.css";

interface Props {
  tipo: TipoMensagem;
  modelo: string;
  destinatarios: Destinatario[];
  /** Chamado quando um disparo termina e foi registrado, para a tela recarregar o histórico. */
  aoRegistrar: () => void;
}

type Fase = { nome: "parado" } | { nome: "confirmando" } | { nome: "enviando"; feitos: number; total: number; atual: string } | { nome: "fim"; fim: RegistroDisparo["fim"]; itens: ItemDisparo[]; registrado: boolean };

const ROTULO_ESTADO: Record<Estado, string> = { conectado: "WhatsApp conectado", desconectado: "WhatsApp desconectado", sem_instancia: "WhatsApp ainda não conectado" };
const ROTULO_FIM: Record<RegistroDisparo["fim"], string> = { completo: "Disparo concluído.", cancelado: "Disparo cancelado.", desconectado: "Disparo interrompido: o WhatsApp desconectou." };

export function DisparoAutomatico({ tipo, modelo, destinatarios, aoRegistrar }: Props) {
  const [config, definirConfig] = useState<ConfigEvolution>(lerConfig);
  const [estado, definirEstado] = useState<Estado | null>(null);
  const [qr, definirQr] = useState<{ imagem: string | null; codigo: string | null } | null>(null);
  const [ocupado, definirOcupado] = useState(false);
  const [erro, definirErro] = useState("");
  const [imagem, definirImagem] = useState<Imagem | null>(null);
  const [fase, definirFase] = useState<Fase>({ nome: "parado" });
  const cancelar = useRef(false);

  const comTelefone = destinatarios.filter((d) => d.canais.length > 0);
  const enviando = fase.nome === "enviando";
  const pronto = config.url.trim() !== "" && config.chave.trim() !== "";

  const mudar = (parte: Partial<ConfigEvolution>) => {
    const nova = { ...config, ...parte };
    definirConfig(nova);
    guardarConfig(nova);
    definirEstado(null);
    definirQr(null);
  };

  async function tentar<T>(acao: () => Promise<T>): Promise<T | undefined> {
    definirOcupado(true);
    definirErro("");
    try {
      return await acao();
    } catch (falha) {
      definirErro(falha instanceof ErroEvolution ? falha.message : "Algo deu errado ao falar com a Evolution API.");
      return undefined;
    } finally {
      definirOcupado(false);
    }
  }

  const verificar = () => tentar(async () => definirEstado(await estadoDaConexao(config)));
  const pedirQr = () =>
    tentar(async () => {
      const resposta = await conectar(config);
      definirEstado(resposta.estado);
      definirQr(resposta.estado === "conectado" ? null : { imagem: resposta.imagem, codigo: resposta.codigo });
    });
  const sair = () =>
    tentar(async () => {
      await desconectar(config);
      definirEstado("desconectado");
      definirQr(null);
    });

  // Com o QR Code na tela, confere sozinho se o celular já leu.
  useEffect(() => {
    if (!qr) return;
    const id = setInterval(() => {
      estadoDaConexao(config).then(
        (novo) => {
          if (novo === "conectado") {
            definirEstado(novo);
            definirQr(null);
          }
        },
        () => undefined,
      );
    }, 3000);
    return () => clearInterval(id);
  }, [qr, config]);

  // Fechar a aba no meio do disparo interrompe os envios: o navegador pede confirmação.
  useEffect(() => {
    if (!enviando) return;
    const avisar = (evento: BeforeUnloadEvent) => evento.preventDefault();
    window.addEventListener("beforeunload", avisar);
    return () => window.removeEventListener("beforeunload", avisar);
  }, [enviando]);

  async function disparar() {
    cancelar.current = false;
    const itens: ItemDisparo[] = [];
    let fim: RegistroDisparo["fim"] = "completo";
    let feitos = 0;
    for (const d of comTelefone) {
      if (cancelar.current) {
        fim = "cancelado";
        break;
      }
      definirFase({ nome: "enviando", feitos, total: comTelefone.length, atual: d.nome });
      if (feitos % RITMO.conferirACada === 0 && (await estadoDaConexao(config).catch(() => "desconectado" as Estado)) !== "conectado") {
        fim = "desconectado";
        break;
      }
      // A pausa é fatiada para o botão de cancelar responder logo.
      for (let resta = pausaAntesDoProximo(feitos); resta > 0 && !cancelar.current; resta -= 250) await esperar(Math.min(250, resta));
      if (cancelar.current) {
        fim = "cancelado";
        break;
      }
      const texto = montarMensagem(tipo, modelo, d);
      let usado = d.canais[0];
      let enviado = false;
      for (const canal of d.canais) {
        usado = canal;
        if (await enviar(config, canal.numero, texto, imagem)) {
          enviado = true;
          break;
        }
      }
      itens.push({ nome: d.nome, numero: usado.numero, canal: usado.de, status: enviado ? "enviado" : "falhou" });
      feitos += 1;
      if (!enviado && (await estadoDaConexao(config).catch(() => "desconectado" as Estado)) !== "conectado") {
        fim = "desconectado";
        break;
      }
    }
    if (fim !== "completo") {
      comTelefone.slice(itens.length).forEach((d) => itens.push({ nome: d.nome, numero: d.canais[0].numero, canal: d.canais[0].de, status: "cancelado" }));
      if (fim === "desconectado") definirEstado("desconectado");
    }
    destinatarios.filter((d) => d.canais.length === 0).forEach((d) => itens.push({ nome: d.nome, numero: "", canal: "", status: "sem_telefone" }));
    let registrado = true;
    try {
      await registrarDisparo({ tipo, modelo, comImagem: imagem !== null, fim, itens });
      aoRegistrar();
    } catch {
      registrado = false;
    }
    definirFase({ nome: "fim", fim, itens, registrado });
  }

  const conta = (itens: ItemDisparo[], status: ItemDisparo["status"]) => itens.filter((i) => i.status === status).length;

  return (
    <section className={estilos.painel} aria-labelledby="titulo-disparo">
      <h2 id="titulo-disparo">Envio automático</h2>
      <p className={estilos.suave}>
        Dispara para todos de uma vez pela Evolution API, o serviço da escola que fica ligado ao WhatsApp. Funciona no computador onde ela está instalada, com esta página aberta até o fim. O endereço e a chave ficam guardados só neste navegador.
      </p>

      <div className={estilos.grade}>
        <label className={estilos.campo}>
          <span>Endereço da Evolution API</span>
          <input value={config.url} onChange={(e) => mudar({ url: e.target.value })} placeholder="http://localhost:8080" disabled={enviando} autoComplete="off" />
        </label>
        <label className={estilos.campo}>
          <span>Chave (API key)</span>
          <input type="password" value={config.chave} onChange={(e) => mudar({ chave: e.target.value })} disabled={enviando} autoComplete="off" />
        </label>
        <label className={estilos.campo}>
          <span>Nome da conexão</span>
          <input value={config.instancia} onChange={(e) => mudar({ instancia: e.target.value })} maxLength={40} disabled={enviando} autoComplete="off" />
        </label>
      </div>

      <div className={estilos.linha}>
        {estado && (
          <span className={`${estilos.estado} ${estado === "conectado" ? estilos.ok : estilos.fora}`}>
            <Icone nome={estado === "conectado" ? "check" : "alerta"} tamanho={16} />
            {ROTULO_ESTADO[estado]}
          </span>
        )}
        <button type="button" className={estilos.acao} onClick={() => void verificar()} disabled={!pronto || ocupado || enviando}>
          Verificar conexão
        </button>
        {estado !== null && estado !== "conectado" && (
          <button type="button" className={estilos.acao} onClick={() => void pedirQr()} disabled={ocupado || enviando}>
            {ocupado ? "Aguarde…" : "Conectar com QR Code"}
          </button>
        )}
        {estado === "conectado" && (
          <button type="button" className={estilos.acao} onClick={() => void sair()} disabled={ocupado || enviando}>
            Desconectar
          </button>
        )}
      </div>

      {erro && (
        <p className={estilos.erro} role="alert">
          <Icone nome="alerta" tamanho={16} />
          {erro}
        </p>
      )}

      {qr && (
        <div className={estilos.qr}>
          {qr.imagem && <img src={qr.imagem} alt="QR Code para conectar o WhatsApp" width={240} height={240} />}
          <p>
            No celular da escola, abra o WhatsApp, vá em <strong>Dispositivos conectados</strong>, toque em <strong>Conectar dispositivo</strong> e aponte para o código.
            {qr.codigo && (
              <>
                {" "}
                Ou digite o código <code>{qr.codigo}</code>.
              </>
            )}{" "}
            Esta tela avisa sozinha quando conectar.
          </p>
        </div>
      )}

      {tipo === "aviso" && (
        <div className={estilos.imagem}>
          <label className={estilos.acao}>
            <Icone nome="imagem" tamanho={16} />
            {imagem ? "Trocar a imagem" : "Anexar uma imagem (opcional)"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              disabled={enviando}
              onChange={(e) => {
                const arquivo = e.target.files?.[0];
                e.target.value = "";
                if (!arquivo) return;
                lerImagem(arquivo).then(
                  (lida) => {
                    definirImagem(lida);
                    definirErro("");
                  },
                  (falha: Error) => definirErro(falha.message),
                );
              }}
            />
          </label>
          {imagem ? (
            <>
              <img src={`data:${imagem.tipo};base64,${imagem.base64}`} alt="Imagem que vai junto com o lembrete" />
              <button type="button" className={estilos.acao} onClick={() => definirImagem(null)} disabled={enviando}>
                Tirar a imagem
              </button>
            </>
          ) : (
            <span className={estilos.suave}>JPG, PNG ou WebP de até {LIMITE_IMAGEM_MB} MB. O texto vai como legenda.</span>
          )}
        </div>
      )}

      {fase.nome === "parado" && (
        <div className={estilos.linha}>
          <button type="button" className={estilos.disparar} disabled={estado !== "conectado" || comTelefone.length === 0} onClick={() => definirFase({ nome: "confirmando" })}>
            <Icone nome="megafone" tamanho={17} />
            Disparar para {comTelefone.length} aluno(s)
          </button>
          {estado !== "conectado" && <span className={estilos.suave}>Conecte o WhatsApp para liberar o disparo.</span>}
        </div>
      )}

      {fase.nome === "confirmando" && (
        <div className={estilos.confirmar} role="alertdialog" aria-label="Confirmar disparo">
          <p>
            Enviar <strong>{comTelefone.length}</strong> mensagem(ns){imagem ? " com imagem" : ""} pelo WhatsApp conectado? Leva cerca de {Math.max(1, Math.ceil((comTelefone.length * (RITMO.entreMs + RITMO.variacaoMs / 2 + RITMO.digitandoMs)) / 60000))} minuto(s), com pausas para o número não ser bloqueado.
          </p>
          <div className={estilos.linha}>
            <button type="button" className={estilos.disparar} onClick={() => void disparar()}>
              Confirmar e disparar
            </button>
            <button type="button" className={estilos.acao} onClick={() => definirFase({ nome: "parado" })}>
              Voltar
            </button>
          </div>
        </div>
      )}

      {fase.nome === "enviando" && (
        <div className={estilos.andamento} aria-live="polite">
          <progress value={fase.feitos} max={fase.total} aria-label="Andamento do disparo" />
          <p>
            <strong>
              {fase.feitos} de {fase.total}
            </strong>{" "}
            · agora: {fase.atual}. Mantenha esta página aberta.
          </p>
          <button
            type="button"
            className={estilos.acao}
            onClick={() => {
              cancelar.current = true;
            }}
          >
            Cancelar o disparo
          </button>
        </div>
      )}

      {fase.nome === "fim" && (
        <div className={estilos.resultado} aria-live="polite">
          <p>
            <strong>{ROTULO_FIM[fase.fim]}</strong> {conta(fase.itens, "enviado")} enviada(s), {conta(fase.itens, "falhou")} com falha
            {conta(fase.itens, "cancelado") > 0 && `, ${conta(fase.itens, "cancelado")} não enviada(s)`}
            {conta(fase.itens, "sem_telefone") > 0 && `, ${conta(fase.itens, "sem_telefone")} sem telefone`}.
          </p>
          {!fase.registrado && <p className={estilos.erro}>O disparo foi feito, mas o portal não conseguiu guardar o histórico dele.</p>}
          {conta(fase.itens, "falhou") > 0 && (
            <p className={estilos.suave}>
              Falharam:{" "}
              {fase.itens
                .filter((i) => i.status === "falhou")
                .map((i) => i.nome)
                .join(", ")}
              . Para estes, use o botão de WhatsApp de cada aluno na lista acima.
            </p>
          )}
          <button type="button" className={estilos.acao} onClick={() => definirFase({ nome: "parado" })}>
            Fechar
          </button>
        </div>
      )}
    </section>
  );
}
