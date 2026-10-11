import { randomUUID } from "node:crypto";

import type { ArquivoEnviado, Envio, LancarNotaInput, Professor, ReciboEnvio, SaidaProva } from "../src/types/envio.js";
import { TENTATIVAS_POR_QUESTAO } from "../src/types/quiz.js";
import { DIAS_GUARDADOS, LIMITE_ARQUIVO_MB } from "../src/types/envio.js";
import type { Armazenamento } from "./armazenamento.js";
import type { ListaAcompanhamento } from "../src/types/lista.js";
import { TODAS_AS_UNIDADES, type SessaoProfessor } from "../src/types/unidade.js";
import { caminhoLista, idListaValido, listarListas, novaLista, validarLista } from "./listas.js";
import { conferirItem } from "../src/lib/correcaoProva.js";
import { acharProva, corrigir, semGabarito, tipoDe, valoresDoItem, validarRespostas } from "./provas.js";
import {
  COOKIE_SESSAO,
  acharUnidade,
  autenticar,
  autenticarUnidade,
  criarFicha,
  lerFicha,
  todasAsUnidades,
  unidadePadrao,
  cookieApagado,
  cookieSessao,
  criarSessao,
  lerCookie,
  lerSessao,
  limparTentativas,
  tentativaPermitida,
} from "./seguranca.js";

/**
 * Todas as rotas de /api num lugar só, no formato Request → Response da web.
 * A função da Vercel (api/index.ts) e o servidor físico (servidor/local.ts)
 * só entregam a requisição aqui, cada um com o seu armazenamento.
 */

const DIA_MS = 24 * 60 * 60 * 1000;

/** Testes já feitos numa prova autocorrigida: por questão, quantos, a última resposta testada e se acertou. */
interface RegistroTentativas {
  itens: Record<string, { usadas: number; ultima: Record<string, string>; certo: boolean }>;
}

const chaveValida = (chave: unknown): chave is string => typeof chave === "string" && /^[a-zA-Z0-9-]{8,64}$/.test(chave);

type CodigoErro =
  | "VALIDATION_ERROR"
  | "NAO_AUTENTICADO"
  | "CREDENCIAIS_INVALIDAS"
  | "LIMITE_TENTATIVAS"
  | "TENTATIVAS_ESGOTADAS"
  | "NAO_ENCONTRADO"
  | "SEM_PERMISSAO"
  | "UNIDADE_INVALIDA"
  | "CONFLITO"
  | "ERRO_INTERNO";

function json(dado: unknown, status = 200, cabecalhos: HeadersInit = {}) {
  return Response.json(dado, { status, headers: { "Cache-Control": "no-store", ...cabecalhos } });
}

function erro(status: number, code: CodigoErro, message: string) {
  return json({ error: { code, message } }, status);
}

function dia(data: Date) {
  return data.toISOString().slice(0, 10);
}

function caminhoEnvio(id: string) {
  return `envios/${id.slice(0, 10)}/${id}.json`;
}

/** O id começa pela data do envio: dá para achar o arquivo e apagar por idade sem abrir nada. */
function idValido(id: string) {
  return /^\d{4}-\d{2}-\d{2}_[a-zA-Z0-9-]{8,64}$/.test(id);
}

function limiteArquivoBytes() {
  const mb = Number(process.env.LIMITE_ARQUIVO_MB) || LIMITE_ARQUIVO_MB;
  return mb * 1024 * 1024;
}

function nomeSeguro(nome: string) {
  const limpo = nome
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return limpo.slice(-120) || "arquivo";
}

function normalizarNome(nome: unknown): string | null {
  if (typeof nome !== "string") return null;
  const limpo = nome.replace(/\s+/g, " ").trim();
  return limpo.length >= 3 && limpo.length <= 80 ? limpo : null;
}

function validarSaidas(saidas: unknown): SaidaProva[] {
  if (!Array.isArray(saidas)) return [];
  return saidas.slice(0, 200).flatMap((s): SaidaProva[] => {
    if (!s || typeof s !== "object") return [];
    const { em, motivo, liberadaEm, liberadaPor } = s as Record<string, unknown>;
    if (typeof em !== "string" || !["aba", "janela", "tela-cheia"].includes(motivo as string)) return [];
    return [
      {
        em: em.slice(0, 40),
        motivo: motivo as SaidaProva["motivo"],
        ...(typeof liberadaEm === "string" ? { liberadaEm: liberadaEm.slice(0, 40) } : {}),
        ...(typeof liberadaPor === "string" ? { liberadaPor: liberadaPor.slice(0, 80) } : {}),
      },
    ];
  });
}

function ipDe(requisicao: Request) {
  return requisicao.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || requisicao.headers.get("x-real-ip") || "local";
}

function professorDa(requisicao: Request): Professor | null {
  return lerSessao(lerCookie(requisicao.headers.get("cookie"), COOKIE_SESSAO));
}

// ------------------------------------------------------------------ unidades

/** Envios e listas criados antes das unidades não têm o campo: valem como a unidade padrão. */
const unidadeDe = (recurso: { unidade?: string }) => recurso.unidade ?? unidadePadrao();

const coordenacao = (professor: Professor) => professor.unidade === TODAS_AS_UNIDADES;

/** Cada professor só toca no que é da sua unidade; a coordenação toca em tudo. */
const podeVer = (professor: Professor, recurso: { unidade?: string }) => coordenacao(professor) || unidadeDe(recurso) === professor.unidade;

/**
 * Unidade em que o professor está trabalhando agora: a dele, ou, na coordenação,
 * a que ela escolheu (?unidade=). `null` na coordenação sem escolha = todas.
 */
function unidadeAtiva(professor: Professor, url: URL): string | null | "invalida" {
  if (!coordenacao(professor)) return professor.unidade;
  const pedida = url.searchParams.get("unidade");
  if (!pedida || pedida === TODAS_AS_UNIDADES) return null;
  return acharUnidade(pedida) ? pedida : "invalida";
}

function sessaoDe(professor: Professor): SessaoProfessor {
  const todas = todasAsUnidades();
  const coord = coordenacao(professor);
  return {
    usuario: professor.usuario,
    nome: professor.nome,
    coordenacao: coord,
    unidade: coord ? { id: TODAS_AS_UNIDADES, nome: "Todas as unidades" } : (acharUnidade(professor.unidade) ?? { id: professor.unidade, nome: professor.unidade }),
    unidades: coord ? todas : [],
  };
}

/** Cookie SameSite=Strict já barra outro site; conferir a origem fecha o resto. */
function origemPermitida(requisicao: Request) {
  const origem = requisicao.headers.get("origin");
  if (!origem) return true;
  return new URL(origem).host === new URL(requisicao.url).host;
}

async function lerCorpoJson(requisicao: Request): Promise<Record<string, unknown> | null> {
  try {
    const corpo = await requisicao.json();
    return corpo && typeof corpo === "object" ? (corpo as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

// ------------------------------------------------------------------ envio

async function enviar(requisicao: Request, armazenamento: Armazenamento) {
  const tamanho = Number(requisicao.headers.get("content-length") || 0);
  if (tamanho > limiteArquivoBytes() + 512 * 1024) {
    return erro(413, "VALIDATION_ERROR", `O arquivo passa do limite de ${limiteArquivoBytes() / 1024 / 1024} MB.`);
  }

  let formulario: FormData;
  try {
    formulario = await requisicao.formData();
  } catch {
    return erro(400, "VALIDATION_ERROR", "Envio malformado.");
  }

  let dados: Record<string, unknown>;
  try {
    dados = JSON.parse(String(formulario.get("dados") ?? ""));
  } catch {
    return erro(422, "VALIDATION_ERROR", "Envio malformado.");
  }

  const chave = chaveValida(dados.chave) ? dados.chave : null;
  if (!chave) return erro(422, "VALIDATION_ERROR", "Envio sem chave.");

  // A senha da aba Provas identificou a unidade; sem a ficha não há para onde enviar a prova.
  const unidade = lerFicha(dados.ficha);
  if (!unidade) return erro(401, "UNIDADE_INVALIDA", "A sessão da unidade terminou. Volte à área de Provas e digite a senha da unidade de novo.");

  const agora = new Date();
  const id = `${dia(agora)}_${chave}`;

  // Mesmo envio chegando de novo (rede do laboratório oscilou, o aluno clicou
  // duas vezes): devolve o recibo do primeiro, não grava outro.
  const existente = await armazenamento.lerJson<Envio>(caminhoEnvio(id));
  if (existente) return json(recibo(existente));

  const provaId = typeof dados.provaId === "string" ? dados.provaId : "";
  const prova = await acharProva(provaId);
  if (!prova) return erro(404, "NAO_ENCONTRADO", "Essa prova não existe mais no portal.");

  const nomeAluno = normalizarNome(dados.nomeAluno);
  if (!nomeAluno) return erro(422, "VALIDATION_ERROR", "Informe o nome completo do aluno (de 3 a 80 letras).");

  const validacao = validarRespostas(prova, dados.respostas);
  if (!validacao.ok) return erro(422, "VALIDATION_ERROR", validacao.erro);

  // Prova autocorrigida: cada questão vale pela última resposta que o aluno
  // testou — editar depois de gastar as tentativas não adianta. Questão que
  // nunca foi testada vale pela resposta do envio.
  let tentativasUsadas: number[] | undefined;
  if (prova.tipo === "autocorrigida") {
    const registro = await armazenamento.lerJson<RegistroTentativas>(`tentativas/${chave}.json`);
    tentativasUsadas = prova.itens.map((_, i) => registro?.itens[i]?.usadas ?? 0);
    if (registro) {
      validacao.respostas = validacao.respostas.map((resposta, i) => {
        const testada = registro.itens[i];
        return testada ? JSON.stringify(valoresDoItem(prova.itens[i], testada.ultima)) : resposta;
      });
    }
  }

  const arquivoRecebido = formulario.get("arquivo");
  const temArquivo = arquivoRecebido instanceof File && arquivoRecebido.size > 0;
  const regra = prova.envioArquivo;
  if (regra?.obrigatorio && !temArquivo) return erro(422, "VALIDATION_ERROR", "Esta prova exige o envio do arquivo.");

  let arquivo: ArquivoEnviado | undefined;
  if (temArquivo && regra) {
    const nome = nomeSeguro(arquivoRecebido.name);
    const extensao = nome.slice(nome.lastIndexOf(".")).toLowerCase();
    if (!regra.extensoes.map((e) => e.toLowerCase()).includes(extensao)) {
      return erro(422, "VALIDATION_ERROR", `Arquivo não aceito. Envie ${regra.extensoes.join(", ")}.`);
    }
    if (arquivoRecebido.size > limiteArquivoBytes()) {
      return erro(422, "VALIDATION_ERROR", `O arquivo passa do limite de ${limiteArquivoBytes() / 1024 / 1024} MB.`);
    }
    const caminho = `arquivos/${id.slice(0, 10)}/${id}/${nome}`;
    const tipo = arquivoRecebido.type || "application/octet-stream";
    await armazenamento.salvarArquivo(caminho, new Uint8Array(await arquivoRecebido.arrayBuffer()), tipo);
    arquivo = { nome: arquivoRecebido.name.slice(0, 200), tipo, tamanho: arquivoRecebido.size, caminho };
  }

  const correcao = corrigir(prova, validacao.respostas);
  const iniciadaEm = typeof dados.iniciadaEm === "string" ? dados.iniciadaEm.slice(0, 40) : agora.toISOString();

  const envio: Envio = {
    id,
    provaId,
    provaTitulo: prova.titulo,
    tipoProva: tipoDe(prova),
    nomeAluno,
    unidade: unidade.id,
    iniciadaEm,
    enviadaEm: agora.toISOString(),
    respostas: validacao.respostas,
    ...(tentativasUsadas ? { tentativas: tentativasUsadas } : {}),
    ...(correcao
      ? { correcao: { acertos: correcao.acertos, total: correcao.total, ...("aRevisar" in correcao && correcao.aRevisar ? { aRevisar: correcao.aRevisar } : {}) } }
      : {}),
    // Múltipla escolha com arquivo anexo ainda sai com a nota automática; o
    // professor pode sobrescrever na área dele.
    nota: correcao ? correcao.nota : null,
    ...(arquivo ? { arquivo } : {}),
    saidas: validarSaidas(dados.saidas),
    apagarEm: new Date(agora.getTime() + DIAS_GUARDADOS * DIA_MS).toISOString(),
  };

  await armazenamento.salvarJson(caminhoEnvio(id), envio);
  return json(recibo(envio), 201);
}

function recibo(envio: Envio): ReciboEnvio {
  return {
    id: envio.id,
    nota: envio.correcao ? envio.nota : null,
    ...(envio.correcao ? { correcao: envio.correcao } : {}),
    enviadaEm: envio.enviadaEm,
  };
}

// ----------------------------------------------------------------- limpeza

/** Apaga envios e arquivos com mais de DIAS_GUARDADOS dias. Devolve quantos envios saíram. */
export async function limpar(armazenamento: Armazenamento, agora = new Date()) {
  const corte = dia(new Date(agora.getTime() - DIAS_GUARDADOS * DIA_MS));
  const itens = [...(await armazenamento.listar("envios/")), ...(await armazenamento.listar("arquivos/")), ...(await armazenamento.listar("tentativas/"))];
  const velhos = itens.filter((item) => {
    const data = item.caminho.split("/")[1] ?? "";
    // Data no caminho manda; sem ela (arquivo estranho na pasta), vale a data de criação.
    return /^\d{4}-\d{2}-\d{2}$/.test(data) ? data < corte : dia(item.criadoEm) < corte;
  });
  await armazenamento.apagar(velhos.map((item) => item.caminho));
  return velhos.filter((item) => item.caminho.startsWith("envios/")).length;
}

// ------------------------------------------------------------- professor

async function listarEnvios(url: URL, professor: Professor, armazenamento: Armazenamento) {
  const ativa = unidadeAtiva(professor, url);
  if (ativa === "invalida") return erro(422, "VALIDATION_ERROR", "Unidade desconhecida.");
  await limpar(armazenamento);
  const itens = (await armazenamento.listar("envios/")).filter((item) => item.caminho.endsWith(".json"));
  const envios = (await Promise.all(itens.map((item) => armazenamento.lerJson<Envio>(item.caminho)))).filter(
    (envio): envio is Envio => envio !== null,
  );

  const provaId = url.searchParams.get("provaId");
  const busca = (url.searchParams.get("busca") ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

  const filtrados = envios
    .filter((envio) => ativa === null || unidadeDe(envio) === ativa)
    .map((envio) => ({ ...envio, unidade: unidadeDe(envio) ?? undefined }))
    .filter((envio) => !provaId || envio.provaId === provaId)
    .filter(
      (envio) =>
        !busca ||
        `${envio.nomeAluno} ${envio.provaTitulo}`
          .normalize("NFD")
          .replace(/[̀-ͯ]/g, "")
          .toLowerCase()
          .includes(busca),
    )
    .sort((a, b) => b.enviadaEm.localeCompare(a.enviadaEm));

  return json({ dados: filtrados });
}

async function lancarNota(requisicao: Request, id: string, professor: Professor, armazenamento: Armazenamento) {
  const envio = await armazenamento.lerJson<Envio>(caminhoEnvio(id));
  if (!envio) return erro(404, "NAO_ENCONTRADO", "Envio não encontrado. Ele pode ter passado dos 7 dias e sido apagado.");

  const corpo = (await lerCorpoJson(requisicao)) as Partial<LancarNotaInput> | null;
  const nota = corpo?.nota;
  if (typeof nota !== "number" || !Number.isFinite(nota) || nota < 0 || nota > 10 || Math.round(nota * 10) !== nota * 10) {
    return erro(422, "VALIDATION_ERROR", "A nota precisa estar entre 0 e 10, com até uma casa decimal.");
  }
  const comentario = typeof corpo?.comentario === "string" ? corpo.comentario.trim().slice(0, 2000) : undefined;

  const atualizado: Envio = {
    ...envio,
    nota,
    comentario: comentario || undefined,
    corrigidaEm: new Date().toISOString(),
    corrigidaPor: professor.nome,
  };
  await armazenamento.salvarJson(caminhoEnvio(id), atualizado);
  return json(atualizado);
}

async function baixarArquivo(id: string, armazenamento: Armazenamento) {
  const envio = await armazenamento.lerJson<Envio>(caminhoEnvio(id));
  if (!envio?.arquivo) return erro(404, "NAO_ENCONTRADO", "Este envio não tem arquivo.");
  const lido = await armazenamento.lerArquivo(envio.arquivo.caminho);
  if (!lido) return erro(404, "NAO_ENCONTRADO", "O arquivo não foi encontrado.");

  const nomeDownload = `${nomeSeguro(envio.nomeAluno)}-${nomeSeguro(envio.arquivo.nome)}`;
  return new Response(lido.corpo, {
    headers: {
      "Content-Type": lido.tipo,
      "Content-Length": String(lido.tamanho),
      "Content-Disposition": `attachment; filename="${nomeDownload}"; filename*=UTF-8''${encodeURIComponent(nomeDownload)}`,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

async function apagarEnvio(id: string, armazenamento: Armazenamento) {
  const envio = await armazenamento.lerJson<Envio>(caminhoEnvio(id));
  if (!envio) return new Response(null, { status: 204 });
  await armazenamento.apagar([caminhoEnvio(id), ...(envio.arquivo ? [envio.arquivo.caminho] : [])]);
  return new Response(null, { status: 204 });
}

// ------------------------------------------------------------------ roteador

export async function atender(requisicao: Request, armazenamento: Armazenamento): Promise<Response> {
  try {
    return await rotear(requisicao, armazenamento);
  } catch (falha) {
    const correlacao = randomUUID().slice(0, 8);
    console.error(`[api ${correlacao}]`, falha);
    return json({ error: { code: "ERRO_INTERNO", message: `Erro no servidor (código ${correlacao}). Tente de novo.` } }, 500);
  }
}

async function rotear(requisicao: Request, armazenamento: Armazenamento): Promise<Response> {
  const url = new URL(requisicao.url);
  // Na Vercel, a regra de reescrita manda tudo para /api com a rota em ?rota=.
  const rota = (url.searchParams.get("rota") ?? url.pathname.replace(/^\/api\/?/, "")).replace(/\/+$/, "");
  const partes = rota.split("/").filter(Boolean);
  const metodo = requisicao.method;
  const seguro = url.protocol === "https:";

  if (metodo !== "GET" && metodo !== "HEAD" && !origemPermitida(requisicao)) {
    return erro(403, "SEM_PERMISSAO", "Origem não permitida.");
  }

  // Público: a prova que o aluno vai fazer, sem o gabarito.
  if (partes[0] === "provas" && partes.length > 1 && metodo === "GET") {
    const prova = await acharProva(partes.slice(1).map(decodeURIComponent).join("/"));
    return prova ? json(semGabarito(prova)) : erro(404, "NAO_ENCONTRADO", "Essa prova não existe.");
  }

  // Público: "Testar resposta" de uma questão da prova autocorrigida. O
  // servidor confere e devolve onde errou, sem revelar o gabarito; vale
  // tentar quantas vezes quiser — o que conta é o envio final.
  if (partes[0] === "provas" && partes.length > 2 && partes[partes.length - 1] === "verificar" && metodo === "POST") {
    const prova = await acharProva(partes.slice(1, -1).map(decodeURIComponent).join("/"));
    if (!prova || prova.tipo !== "autocorrigida") return erro(404, "NAO_ENCONTRADO", "Essa prova não existe.");
    const corpo = await lerCorpoJson(requisicao);
    const indice = Number(corpo?.item);
    const item = prova.itens[indice];
    if (!item) return erro(422, "VALIDATION_ERROR", "Questão inexistente.");
    if (!chaveValida(corpo?.chave)) return erro(422, "VALIDATION_ERROR", "Teste sem chave da prova.");

    // O limite vale no servidor: recarregar a página ou chamar a rota direto não dá tentativa a mais.
    const caminho = `tentativas/${corpo.chave}.json`;
    const registro = (await armazenamento.lerJson<RegistroTentativas>(caminho)) ?? { itens: {} };
    const atual = registro.itens[indice] ?? { usadas: 0, ultima: {}, certo: false };
    if (atual.certo) return erro(422, "VALIDATION_ERROR", "Essa questão já foi respondida certo e está travada.");
    if (atual.usadas >= TENTATIVAS_POR_QUESTAO) {
      return erro(422, "TENTATIVAS_ESGOTADAS", `As ${TENTATIVAS_POR_QUESTAO} tentativas dessa questão acabaram. Vale a última resposta testada.`);
    }

    const valores = valoresDoItem(item, corpo?.valores);
    const resultado = conferirItem(item, valores);
    registro.itens[indice] = { usadas: atual.usadas + 1, ultima: valores, certo: resultado.certo };
    await armazenamento.salvarJson(caminho, registro);
    return json({ ...resultado, tentativas: { usadas: atual.usadas + 1, maximo: TENTATIVAS_POR_QUESTAO } });
  }

  // Público: o aluno envia a prova.
  if (partes[0] === "envios" && partes.length === 1 && metodo === "POST") return enviar(requisicao, armazenamento);

  // Público: o aluno aceita a nota provisória de uma prova mista (dissertativa
  // pendente vira errada) em vez de esperar o professor revisar. Só funciona
  // enquanto a nota estiver mesmo pendente — nem antes, nem depois de lançada.
  if (partes[0] === "envios" && partes.length === 3 && partes[2] === "aceitar" && metodo === "POST") {
    const id = partes[1] ?? "";
    if (!idValido(id)) return erro(404, "NAO_ENCONTRADO", "Envio não encontrado.");
    const envio = await armazenamento.lerJson<Envio>(caminhoEnvio(id));
    if (!envio) return erro(404, "NAO_ENCONTRADO", "Envio não encontrado.");
    if (envio.nota !== null || !envio.correcao?.aRevisar) {
      return erro(422, "VALIDATION_ERROR", "Este envio não tem nota provisória pendente.");
    }
    const notaProvisoria = Math.round((envio.correcao.acertos / envio.correcao.total) * 100) / 10;
    const atualizado: Envio = {
      ...envio,
      nota: notaProvisoria,
      corrigidaEm: new Date().toISOString(),
      corrigidaPor: "Aluno (resultado provisório aceito)",
    };
    await armazenamento.salvarJson(caminhoEnvio(id), atualizado);
    return json(recibo(atualizado));
  }

  // Público: a senha da aba Provas identifica a unidade. Devolve a ficha que o envio carrega.
  if (partes[0] === "unidades" && partes[1] === "entrar" && metodo === "POST") {
    const ip = ipDe(requisicao);
    if (!tentativaPermitida(`unidade:${ip}`)) return erro(429, "LIMITE_TENTATIVAS", "Muitas tentativas. Espere alguns minutos.");
    if (!todasAsUnidades().length) return erro(503, "ERRO_INTERNO", "Nenhuma unidade foi configurada no servidor (variável UNIDADES).");
    const corpo = await lerCorpoJson(requisicao);
    const unidade = autenticarUnidade(String(corpo?.senha ?? ""));
    if (!unidade) return erro(401, "CREDENCIAIS_INVALIDAS", "Senha incorreta. Tente de novo.");
    limparTentativas(`unidade:${ip}`);
    return json({ unidade, ...criarFicha(unidade) });
  }

  // Público: o professor libera, na máquina do aluno, a prova que travou.
  if (partes[0] === "liberacoes" && metodo === "POST") {
    const ip = ipDe(requisicao);
    if (!tentativaPermitida(`liberar:${ip}`)) return erro(429, "LIMITE_TENTATIVAS", "Muitas tentativas. Espere alguns minutos.");
    const corpo = await lerCorpoJson(requisicao);
    const professor = autenticar(String(corpo?.usuario ?? ""), String(corpo?.senha ?? ""));
    if (!professor) return erro(401, "CREDENCIAIS_INVALIDAS", "Usuário ou senha do professor incorretos.");
    if (professor === "SEM_UNIDADE") return erro(403, "SEM_PERMISSAO", "Seu usuário ainda não está ligado a uma unidade.");
    // Só libera a máquina quem é da unidade que abriu a prova (ou a coordenação).
    const unidade = lerFicha(corpo?.ficha);
    if (!unidade) return erro(401, "UNIDADE_INVALIDA", "A sessão da unidade terminou. Volte à área de Provas.");
    if (!coordenacao(professor) && professor.unidade !== unidade.id) {
      return erro(403, "SEM_PERMISSAO", `Este professor não é da ${unidade.nome}.`);
    }
    limparTentativas(`liberar:${ip}`);
    return json({ nome: professor.nome });
  }

  if (partes[0] === "sessao") {
    if (metodo === "POST") {
      const ip = ipDe(requisicao);
      if (!tentativaPermitida(`entrar:${ip}`)) return erro(429, "LIMITE_TENTATIVAS", "Muitas tentativas. Espere alguns minutos.");
      const corpo = await lerCorpoJson(requisicao);
      const professor = autenticar(String(corpo?.usuario ?? ""), String(corpo?.senha ?? ""));
      if (!professor) return erro(401, "CREDENCIAIS_INVALIDAS", "Usuário ou senha incorretos.");
      if (professor === "SEM_UNIDADE") return erro(403, "SEM_PERMISSAO", "Seu usuário ainda não está ligado a uma unidade. Peça à coordenação para configurar.");
      limparTentativas(`entrar:${ip}`);
      return json(sessaoDe(professor), 200, { "Set-Cookie": cookieSessao(criarSessao(professor), seguro) });
    }
    if (metodo === "DELETE") return new Response(null, { status: 204, headers: { "Set-Cookie": cookieApagado(seguro) } });
    const professor = professorDa(requisicao);
    return professor ? json(sessaoDe(professor)) : erro(401, "NAO_AUTENTICADO", "Entre com seu usuário e senha.");
  }

  // Limpeza diária: chamada pelo agendador da Vercel (Authorization com
  // CRON_SECRET) ou por um professor logado.
  if (partes[0] === "limpeza") {
    const segredo = process.env.CRON_SECRET;
    const peloAgendador = segredo && requisicao.headers.get("authorization") === `Bearer ${segredo}`;
    if (!peloAgendador && !professorDa(requisicao)) return erro(401, "NAO_AUTENTICADO", "Sem permissão.");
    return json({ apagados: await limpar(armazenamento) });
  }

  if (partes[0] === "envios") {
    const professor = professorDa(requisicao);
    if (!professor) return erro(401, "NAO_AUTENTICADO", "Entre com seu usuário e senha.");

    if (partes.length === 1 && metodo === "GET") return listarEnvios(url, professor, armazenamento);

    const id = partes[1] ?? "";
    if (!idValido(id)) return erro(404, "NAO_ENCONTRADO", "Envio não encontrado.");

    // Envio de outra unidade responde como se não existisse.
    const doEnvio = await armazenamento.lerJson<Envio>(caminhoEnvio(id));
    if (doEnvio && !podeVer(professor, doEnvio)) return erro(404, "NAO_ENCONTRADO", "Envio não encontrado.");

    if (partes.length === 2 && metodo === "GET") {
      const envio = doEnvio;
      if (!envio) return erro(404, "NAO_ENCONTRADO", "Envio não encontrado. Ele pode ter passado dos 7 dias e sido apagado.");
      // Com o gabarito: o professor vê cada resposta ao lado da certa.
      return json({ envio: { ...envio, unidade: unidadeDe(envio) ?? undefined }, prova: await acharProva(envio.provaId) });
    }
    if (partes.length === 2 && metodo === "PATCH") return lancarNota(requisicao, id, professor, armazenamento);
    if (partes.length === 2 && metodo === "DELETE") return apagarEnvio(id, armazenamento);
    if (partes.length === 3 && partes[2] === "arquivo" && metodo === "GET") return baixarArquivo(id, armazenamento);
  }

  if (partes[0] === "listas") {
    const professor = professorDa(requisicao);
    if (!professor) return erro(401, "NAO_AUTENTICADO", "Entre com seu usuário e senha.");

    const ativa = unidadeAtiva(professor, url);
    if (ativa === "invalida") return erro(422, "VALIDATION_ERROR", "Unidade desconhecida.");

    if (partes.length === 1 && metodo === "GET") {
      return json({ dados: (await listarListas(armazenamento)).filter((l) => ativa === null || (l.unidade ?? unidadePadrao()) === ativa) });
    }
    if (partes.length === 1 && metodo === "POST") {
      // A coordenação precisa dizer em qual unidade a lista nasce.
      if (ativa === null) return erro(422, "VALIDATION_ERROR", "Escolha uma unidade antes de criar a lista.");
      const corpo = await lerCorpoJson(requisicao);
      const origemId = typeof corpo?.duplicarDe === "string" ? corpo.duplicarDe : null;
      let origem: ListaAcompanhamento | undefined;
      if (origemId) {
        if (!idListaValido(origemId)) return erro(404, "NAO_ENCONTRADO", "Lista não encontrada.");
        origem = (await armazenamento.lerJson<ListaAcompanhamento>(caminhoLista(origemId))) ?? undefined;
        if (!origem || !podeVer(professor, origem)) return erro(404, "NAO_ENCONTRADO", "Lista não encontrada.");
      }
      const lista = novaLista(professor, ativa, origem);
      await armazenamento.salvarJson(caminhoLista(lista.id), lista);
      return json(lista, 201);
    }

    const id = partes[1] ?? "";
    if (partes.length !== 2 || !idListaValido(id)) return erro(404, "NAO_ENCONTRADO", "Lista não encontrada.");
    const lida = await armazenamento.lerJson<ListaAcompanhamento>(caminhoLista(id));
    // Lista de outra unidade responde como se não existisse.
    const atual = lida && podeVer(professor, lida) ? lida : null;

    if (metodo === "GET") return atual ? json(atual) : erro(404, "NAO_ENCONTRADO", "Lista não encontrada. Ela pode ter sido apagada.");
    if (metodo === "DELETE") {
      if (atual) await armazenamento.apagar([caminhoLista(id)]);
      return new Response(null, { status: 204 });
    }
    if (metodo === "PUT") {
      if (!atual) return erro(404, "NAO_ENCONTRADO", "Lista não encontrada. Ela pode ter sido apagada.");
      const conferida = validarLista(await lerCorpoJson(requisicao));
      if (typeof conferida === "string") return erro(422, "VALIDATION_ERROR", conferida);
      // Outro professor gravou depois que esta tela abriu a lista: devolve a versão dele em vez de sobrescrever.
      if (conferida.versao !== atual.versao) {
        return json({ error: { code: "CONFLITO", message: `${atual.alteradaPor} alterou esta lista enquanto você editava.` }, atual }, 409);
      }
      const gravada: ListaAcompanhamento = {
        ...atual,
        ...conferida.lista,
        versao: atual.versao + 1,
        alteradaPor: professor.nome,
        alteradaEm: new Date().toISOString(),
      };
      await armazenamento.salvarJson(caminhoLista(id), gravada);
      return json(gravada);
    }
  }

  return erro(404, "NAO_ENCONTRADO", "Rota não encontrada.");
}
