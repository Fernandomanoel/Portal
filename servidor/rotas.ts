import { randomUUID } from "node:crypto";

import type { ArquivoEnviado, Envio, LancarNotaInput, Professor, ReciboEnvio, SaidaProva } from "../src/types/envio.js";
import { TENTATIVAS_POR_QUESTAO } from "../src/types/quiz.js";
import { DIAS_GUARDADOS, LIMITE_ARQUIVO_MB } from "../src/types/envio.js";
import type { Armazenamento } from "./armazenamento.js";
import type { HistoricoConteudo, RevisaoConteudo } from "../src/types/conteudoProfessor.js";
import { LIMITES_CONTEUDO } from "../src/types/conteudoProfessor.js";
import type { Compartilhamento, ListaAcompanhamento } from "../src/types/lista.js";
import { AREAS_PADRAO, IDS_AREA, PERMISSOES_DE_INGLES, PERMISSOES_PADRAO, normalizarAreas, normalizarPermissoes, type AjusteFixo, type AreaId, type PermissaoId, type UsuarioFixo } from "../src/types/acesso.js";
import { caminhoAjuste, caminhoUsuario, lerAjuste, lerUsuario, listarUsuarios, semSenha, usuarioValido, validarAcesso, validarNome, validarSenhaNova, type UsuarioGuardado } from "./usuarios.js";
import { TODAS_AS_UNIDADES, type SessaoProfessor } from "../src/types/unidade.js";
import { caminhoConteudo, comentarioValido, slugValido, validarConteudo } from "./conteudos.js";
import { caminhoLista, idListaValido, listarListas, novaLista, validarLista } from "./listas.js";
import { conferirItem } from "../src/lib/correcaoProva.js";
import { caminhoFaga, idFagaValido, lerFaga, listarFagas, sanearFaga } from "./fagas.js";
import { acharProva, corrigir, semGabarito, tipoDe, valoresDoItem, validarRespostas } from "./provas.js";
import {
  COOKIE_SESSAO,
  acharUnidade,
  autenticar,
  avisarConfiguracao,
  gerarHashSenha,
  professorDaVariavel,
  professores,
  senhaDoCadastroConfere,
  autenticarUnidade,
  criarFicha,
  lerFicha,
  lembretesDasUnidades,
  todasAsUnidades,
  unidadePadrao,
  cookieApagado,
  cookieSessao,
  criarSessao,
  lerCookie,
  lerSessaoBruta,
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

/** Quem está logado, com unidades e permissões lidas de novo a cada requisição: mudar o cadastro vale na hora. */
async function professorDa(requisicao: Request, armazenamento: Armazenamento): Promise<Professor | null> {
  const sessao = lerSessaoBruta(lerCookie(requisicao.headers.get("cookie"), COOKIE_SESSAO));
  if (!sessao) return null;
  if (sessao.origem === "variavel") {
    const daVariavel = professorDaVariavel(sessao.usuario);
    return daVariavel && comAjuste(daVariavel, await ajusteDe(armazenamento, daVariavel));
  }
  return professorCadastrado(await lerUsuario(armazenamento, sessao.usuario));
}

/**
 * Ajuste feito pela tela para um professor da variável. O administrador nunca é ajustado, então o
 * login dele não depende do armazenamento. Se o armazenamento falhar (Blob fora do ar ou não ligado
 * ao projeto), vale o acesso padrão da variável e o problema vai para o log: login não pode cair
 * por causa de um ajuste opcional, e sem armazenamento não há dado de aluno ao alcance de ninguém.
 */
async function ajusteDe(armazenamento: Armazenamento, professor: Professor): Promise<AjusteFixo | null> {
  if (professor.administrador) return null;
  try {
    return await lerAjuste(armazenamento, professor.usuario);
  } catch (falha) {
    console.error(`[configuração] Não foi possível ler o ajuste de «${professor.usuario}» (confira se o Blob está ligado ao projeto):`, falha);
    return null;
  }
}

/**
 * Aplica o ajuste que o administrador fez pela tela a um professor da variável: bloqueio,
 * unidades e permissões. Administrador da variável nunca é ajustado, para ninguém se trancar fora.
 */
function comAjuste(professor: Professor, ajuste: AjusteFixo | null): Professor | null {
  if (!ajuste || professor.administrador) return professor;
  if (!ajuste.ativo) return null;
  const existentes = todasAsUnidades().map((u) => u.id);
  const unidades = ajuste.unidades.includes(TODAS_AS_UNIDADES) ? [TODAS_AS_UNIDADES] : ajuste.unidades.filter((u) => existentes.includes(u));
  if (!unidades.length) return null;
  return { ...professor, unidade: unidades[0], unidades, permissoes: normalizarPermissoes(ajuste.permissoes), areas: normalizarAreas(ajuste.areas) };
}

function professorCadastrado(usuario: UsuarioGuardado | null): Professor | null {
  if (!usuario || !usuario.ativo) return null;
  // Unidade que deixou de existir sai do acesso; sem nenhuma, o usuário não entra.
  const existentes = todasAsUnidades().map((u) => u.id);
  const unidades = usuario.unidades.includes(TODAS_AS_UNIDADES) ? [TODAS_AS_UNIDADES] : usuario.unidades.filter((u) => existentes.includes(u));
  if (!unidades.length) return null;
  return {
    usuario: usuario.usuario,
    nome: usuario.nome,
    unidade: unidades[0],
    unidades,
    permissoes: normalizarPermissoes(usuario.permissoes),
    areas: normalizarAreas(usuario.areas),
    origem: "cadastro",
  };
}

/** Usuário e senha da tela de login: primeiro a variável PROFESSORES, depois quem foi criado pela tela. */
async function autenticarProfessor(usuario: string, senha: string, armazenamento: Armazenamento): Promise<Professor | "SEM_UNIDADE" | null> {
  const daVariavel = autenticar(usuario, senha);
  if (daVariavel === "SEM_UNIDADE") return daVariavel;
  if (daVariavel) return comAjuste(daVariavel, await ajusteDe(armazenamento, daVariavel));
  const nome = usuario.trim().toLowerCase();
  let guardado: UsuarioGuardado | null = null;
  if (usuarioValido(nome)) {
    try {
      guardado = await lerUsuario(armazenamento, nome);
    } catch (falha) {
      // Sem armazenamento não há usuário criado pela tela: responde como usuário inexistente, não como erro do servidor.
      console.error("[configuração] Não foi possível ler os usuários criados pela tela (confira se o Blob está ligado ao projeto):", falha);
    }
  }
  const confere = senhaDoCadastroConfere(senha, guardado?.senha);
  if (!guardado || !confere || !guardado.ativo) return null;
  return professorCadastrado(guardado) ?? "SEM_UNIDADE";
}

// ------------------------------------------------------------------ acesso

/** Permissões em vigor: as do cadastro, ou as padrão (professor da variável) mais gerenciar usuários se for administrador. */
function permissoesDe(professor: Professor): PermissaoId[] {
  const base = professor.permissoes ?? PERMISSOES_PADRAO;
  const todas = normalizarPermissoes(professor.administrador ? [...base, "usuarios"] : base);
  // Cada área só traz as suas abas: quem não é de Inglês não usa a FAGA, e quem é só de Inglês não usa as de Informática.
  const areas = areasDe(professor);
  const soInformatica = areas.includes("informatica");
  const soIngles = areas.includes("ingles");
  return todas.filter((p) => {
    if (PERMISSOES_DE_INGLES.includes(p)) return soIngles;
    if (p === "provas" || p === "usuarios") return true;
    return soInformatica;
  });
}
/** Áreas em vigor. O administrador da variável alcança as duas. */
function areasDe(professor: Professor): AreaId[] {
  return professor.administrador ? [...IDS_AREA] : normalizarAreas(professor.areas ?? AREAS_PADRAO);
}
const areaDaProva = (provaId: string): AreaId => (provaId.startsWith("Ingles/") ? "ingles" : "informatica");
const areaDoEnvio = (envio: { area?: AreaId; provaId: string }): AreaId => envio.area ?? areaDaProva(envio.provaId);
const podeVerEnvio = (professor: Professor, envio: Envio) => podeVer(professor, envio) && areasDe(professor).includes(areaDoEnvio(envio));
const temPermissao = (professor: Professor, id: PermissaoId) => permissoesDe(professor).includes(id);
const semPermissao = () => erro(403, "SEM_PERMISSAO", "Seu usuário não tem acesso a esta área. Fale com quem administra o portal.");

/** Unidades que o professor alcança: `null` = todas; senão a lista de ids. */
function escopo(professor: Professor): string[] | null {
  const ids = professor.unidades ?? [professor.unidade];
  return ids.includes(TODAS_AS_UNIDADES) ? null : ids;
}
const noEscopo = (professor: Professor, unidade: string | null | undefined) => {
  const e = escopo(professor);
  return e === null || (unidade != null && e.includes(unidade));
};
/** Mais de uma unidade (ou todas): escolhe qual olhar, como a coordenação. */
const escolheUnidade = (professor: Professor) => (escopo(professor)?.length ?? 2) !== 1;

// ------------------------------------------------------------------ unidades

/** Envios e listas criados antes das unidades não têm o campo: valem como a unidade padrão. */
const unidadeDe = (recurso: { unidade?: string }) => recurso.unidade ?? unidadePadrao();

/** Cada professor só toca no que é das suas unidades; quem alcança todas, toca em tudo. */
const podeVer = (professor: Professor, recurso: { unidade?: string }) => noEscopo(professor, unidadeDe(recurso));

/**
 * Unidade em que o professor está trabalhando agora: a única que ele alcança, ou, com
 * várias, a que escolheu (?unidade=). `null` sem escolha = todas as que ele alcança.
 */
function unidadeAtiva(professor: Professor, url: URL): string | null | "invalida" {
  const e = escopo(professor);
  if (e && e.length === 1) return e[0];
  const pedida = url.searchParams.get("unidade");
  if (!pedida || pedida === TODAS_AS_UNIDADES) return null;
  if (!acharUnidade(pedida) || (e && !e.includes(pedida))) return "invalida";
  return pedida;
}

function sessaoDe(professor: Professor): SessaoProfessor {
  const todas = todasAsUnidades();
  const e = escopo(professor);
  const escolhe = escolheUnidade(professor);
  const doEscopo = e === null ? todas : todas.filter((u) => e.includes(u.id));
  const permissoes = permissoesDe(professor);
  const lembretes = permissoes.includes("provas") ? lembretesDasUnidades() : {};
  const unico = e && e.length === 1 ? e[0] : "";
  return {
    usuario: professor.usuario,
    nome: professor.nome,
    coordenacao: escolhe,
    unidade: escolhe
      ? { id: TODAS_AS_UNIDADES, nome: e === null ? "Todas as unidades" : "Todas as minhas unidades" }
      : (acharUnidade(unico) ?? { id: unico, nome: unico }),
    unidades: escolhe ? doEscopo : [],
    senhasProvas: escolhe ? Object.fromEntries(Object.entries(lembretes).filter(([id]) => doEscopo.some((u) => u.id === id))) : unico in lembretes ? { [unico]: lembretes[unico] } : {},
    todasAsUnidades: e === null,
    permissoes,
    areas: areasDe(professor),
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
    area: areaDaProva(provaId),
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

// ------------------------------------------------------------------ listas

/** Lista da unidade dona, ou compartilhada com ela (todas, ou unidades escolhidas), aparece na visão dessa unidade. */
function vistaPelaUnidade(lista: { unidade?: string; compartilhamento?: Compartilhamento }, unidade: string) {
  const comp = lista.compartilhamento;
  return unidadeDe(lista) === unidade || comp?.com === "todas" || !!comp?.unidades.includes(unidade);
}

/**
 * O que o professor faz numa lista. Vê quem alcança a unidade dona ou uma unidade com quem ela foi
 * compartilhada. Edita quem tem «listas_editar» e é da dona, ou recebeu com edição liberada.
 * Administra (compartilhar, apagar) só quem é da dona, ou alcança todas.
 */
function acessoLista(professor: Professor, lista: { unidade?: string; compartilhamento?: Compartilhamento }) {
  const e = escopo(professor);
  const daDona = noEscopo(professor, unidadeDe(lista));
  const comp = lista.compartilhamento;
  const recebe = !!comp && (e === null || comp.com === "todas" || e.some((u) => comp.unidades.includes(u)));
  const podeEditar = temPermissao(professor, "listas_editar");
  return {
    ver: temPermissao(professor, "listas") && (daDona || recebe),
    editar: podeEditar && (daDona || (recebe && !!comp?.edicao)),
    administrar: podeEditar && daDona,
  };
}

const comAcesso = (professor: Professor, lista: ListaAcompanhamento): ListaAcompanhamento => {
  const { editar, administrar } = acessoLista(professor, lista);
  return { ...lista, acesso: { editar, administrar } };
};

// ------------------------------------------------------------------ usuários

async function rotearUsuarios(requisicao: Request, partes: string[], quem: Professor, armazenamento: Armazenamento): Promise<Response> {
  const metodo = requisicao.method;
  const unidades = todasAsUnidades().map((u) => u.id);
  const meuEscopo = escopo(quem);
  const minhasPermissoes = permissoesDe(quem);

  /** Quem cria não dá o que não tem: nem unidade fora do seu alcance, nem permissão que não possui. */
  const minhasAreas = areasDe(quem);
  const dentroDoMeuAlcance = (acesso: { unidades: string[]; permissoes: PermissaoId[]; areas?: AreaId[] }) => {
    if (acesso.areas?.some((a) => !minhasAreas.includes(a))) return "Você não pode liberar uma área que o seu próprio usuário não tem.";
    if (meuEscopo !== null && (acesso.unidades.includes(TODAS_AS_UNIDADES) || acesso.unidades.some((u) => !meuEscopo.includes(u)))) {
      return "Você não pode liberar unidades que o seu próprio usuário não alcança.";
    }
    if (acesso.permissoes.some((p) => !minhasPermissoes.includes(p))) return "Você não pode liberar permissões que o seu próprio usuário não tem.";
    return null;
  };

  if (partes.length === 1 && metodo === "GET") {
    const fixos: UsuarioFixo[] = await Promise.all(
      professores().map(async (p) => {
        const administrador = p.administrador === true;
        const ajuste = administrador ? null : await lerAjuste(armazenamento, p.usuario);
        return {
          usuario: p.usuario,
          nome: p.nome || p.usuario,
          unidade: p.unidade,
          administrador,
          unidades: ajuste?.unidades ?? [p.unidade],
          permissoes: normalizarPermissoes(ajuste?.permissoes ?? (administrador ? [...PERMISSOES_PADRAO, "usuarios"] : PERMISSOES_PADRAO)),
          areas: administrador ? [...IDS_AREA] : normalizarAreas(ajuste?.areas),
          ativo: ajuste?.ativo ?? true,
          ajustado: ajuste !== null,
          ajustavel: !administrador && usuarioValido(p.usuario.toLowerCase()),
        };
      }),
    );
    return json({ dados: (await listarUsuarios(armazenamento)).map(semSenha), fixos, unidades: todasAsUnidades() });
  }

  if (partes.length === 1 && metodo === "POST") {
    const corpo = (await lerCorpoJson(requisicao)) ?? {};
    const usuario = String(corpo.usuario ?? "").trim().toLowerCase();
    if (!usuarioValido(usuario)) return erro(422, "VALIDATION_ERROR", "O usuário usa de 3 a 30 letras minúsculas, números, ponto, hífen ou sublinhado.");
    if (professores().some((p) => p.usuario.toLowerCase() === usuario) || (await lerUsuario(armazenamento, usuario))) {
      return erro(409, "CONFLITO", "Já existe um usuário com esse nome de acesso.");
    }
    const nome = validarNome(corpo);
    if (!nome) return erro(422, "VALIDATION_ERROR", "Informe o nome do usuário.");
    const senha = validarSenhaNova(corpo.senha);
    if (!senha) return erro(422, "VALIDATION_ERROR", "A senha precisa ter de 8 a 100 caracteres.");
    const acesso = validarAcesso(corpo, unidades);
    if (typeof acesso === "string") return erro(422, "VALIDATION_ERROR", acesso);
    const negado = dentroDoMeuAlcance(acesso);
    if (negado) return erro(403, "SEM_PERMISSAO", negado);
    const novo: UsuarioGuardado = { usuario, nome, senha: gerarHashSenha(senha), ...acesso, ativo: true, criadoEm: new Date().toISOString(), criadoPor: quem.nome };
    await armazenamento.salvarJson(caminhoUsuario(usuario), novo);
    return json(semSenha(novo), 201);
  }

  // Professor da variável PROFESSORES: a tela ajusta unidades, permissões e bloqueio; nome e senha continuam na Vercel.
  if (partes.length === 3 && partes[1] === "fixos" && metodo === "PATCH") {
    const nomeAlvo = partes[2].toLowerCase();
    const fixo = professores().find((p) => p.usuario.toLowerCase() === nomeAlvo);
    if (!fixo) return erro(404, "NAO_ENCONTRADO", "Usuário não encontrado.");
    if (fixo.administrador === true) return erro(403, "SEM_PERMISSAO", "O acesso de um administrador só muda pela variável PROFESSORES, na Vercel.");
    if (!usuarioValido(nomeAlvo)) return erro(422, "VALIDATION_ERROR", "Este usuário tem um nome fora do padrão e só muda pela Vercel.");
    if (nomeAlvo === quem.usuario.toLowerCase()) return erro(422, "VALIDATION_ERROR", "Você não pode ajustar o próprio usuário.");
    const atual = await lerAjuste(armazenamento, nomeAlvo);
    const emVigor = { unidades: atual?.unidades ?? [fixo.unidade], permissoes: normalizarPermissoes(atual?.permissoes ?? PERMISSOES_PADRAO), areas: normalizarAreas(atual?.areas) };
    if (dentroDoMeuAlcance(emVigor)) return erro(403, "SEM_PERMISSAO", "Este usuário tem mais acesso do que o seu: só quem tem o mesmo alcance, ou mais, pode alterá-lo.");

    const corpo = (await lerCorpoJson(requisicao)) ?? {};
    if (corpo.padrao === true) {
      await armazenamento.apagar([caminhoAjuste(nomeAlvo)]);
      return new Response(null, { status: 204 });
    }
    const acesso = validarAcesso({ unidades: corpo.unidades ?? emVigor.unidades, permissoes: corpo.permissoes ?? emVigor.permissoes, areas: corpo.areas ?? emVigor.areas }, unidades);
    if (typeof acesso === "string") return erro(422, "VALIDATION_ERROR", acesso);
    const negado = dentroDoMeuAlcance(acesso);
    if (negado) return erro(403, "SEM_PERMISSAO", negado);
    if (corpo.ativo !== undefined && typeof corpo.ativo !== "boolean") return erro(422, "VALIDATION_ERROR", "Valor inválido para «ativo».");
    const ajuste: AjusteFixo = { usuario: fixo.usuario, ...acesso, ativo: (corpo.ativo as boolean | undefined) ?? atual?.ativo ?? true, alteradoEm: new Date().toISOString(), alteradoPor: quem.nome };
    await armazenamento.salvarJson(caminhoAjuste(nomeAlvo), ajuste);
    return json(ajuste);
  }

  const alvo = (partes[1] ?? "").toLowerCase();
  if (partes.length !== 2 || !usuarioValido(alvo)) return erro(404, "NAO_ENCONTRADO", "Usuário não encontrado.");
  const guardado = await lerUsuario(armazenamento, alvo);
  if (!guardado) return erro(404, "NAO_ENCONTRADO", "Usuário não encontrado.");
  const euMesmo = alvo === quem.usuario.toLowerCase();
  // Quem tem menos alcance não mexe em quem tem mais (trocar a senha dele seria entrar no lugar dele).
  if (!euMesmo && dentroDoMeuAlcance({ unidades: guardado.unidades, permissoes: guardado.permissoes, areas: normalizarAreas(guardado.areas) })) {
    return erro(403, "SEM_PERMISSAO", "Este usuário tem mais acesso do que o seu: só quem tem o mesmo alcance, ou mais, pode alterá-lo.");
  }

  if (metodo === "DELETE") {
    if (euMesmo) return erro(422, "VALIDATION_ERROR", "Você não pode apagar o próprio usuário.");
    await armazenamento.apagar([caminhoUsuario(alvo)]);
    return new Response(null, { status: 204 });
  }

  if (metodo === "PATCH") {
    const corpo = (await lerCorpoJson(requisicao)) ?? {};
    const atualizado: UsuarioGuardado = { ...guardado, alteradoEm: new Date().toISOString() };
    if (corpo.nome !== undefined) {
      const nome = validarNome(corpo);
      if (!nome) return erro(422, "VALIDATION_ERROR", "Informe o nome do usuário.");
      atualizado.nome = nome;
    }
    if (corpo.senha !== undefined) {
      const senha = validarSenhaNova(corpo.senha);
      if (!senha) return erro(422, "VALIDATION_ERROR", "A senha precisa ter de 8 a 100 caracteres.");
      atualizado.senha = gerarHashSenha(senha);
    }
    if (corpo.unidades !== undefined || corpo.permissoes !== undefined || corpo.areas !== undefined) {
      const acesso = validarAcesso({ unidades: corpo.unidades ?? guardado.unidades, permissoes: corpo.permissoes ?? guardado.permissoes, areas: corpo.areas ?? guardado.areas }, unidades);
      if (typeof acesso === "string") return erro(422, "VALIDATION_ERROR", acesso);
      const negado = dentroDoMeuAlcance(acesso);
      if (negado) return erro(403, "SEM_PERMISSAO", negado);
      if (euMesmo && !acesso.permissoes.includes("usuarios")) return erro(422, "VALIDATION_ERROR", "Você não pode tirar de si mesmo a permissão de gerenciar usuários.");
      atualizado.unidades = acesso.unidades;
      atualizado.permissoes = acesso.permissoes;
      atualizado.areas = acesso.areas;
    }
    if (corpo.ativo !== undefined) {
      if (typeof corpo.ativo !== "boolean") return erro(422, "VALIDATION_ERROR", "Valor inválido para «ativo».");
      if (euMesmo && !corpo.ativo) return erro(422, "VALIDATION_ERROR", "Você não pode desativar o próprio usuário.");
      atualizado.ativo = corpo.ativo;
    }
    await armazenamento.salvarJson(caminhoUsuario(alvo), atualizado);
    return json(semSenha(atualizado));
  }

  return erro(404, "NAO_ENCONTRADO", "Rota não encontrada.");
}

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
  // A limpeza que apaga de verdade roda uma vez por dia (cron). Aqui só se escondem os vencidos, pela data no
  // caminho: cada listagem no Blob conta como operação avançada, e a cota gratuita é pequena.
  const corte = dia(new Date(Date.now() - DIAS_GUARDADOS * DIA_MS));
  const itens = (await armazenamento.listar("envios/")).filter((item) => item.caminho.endsWith(".json") && (item.caminho.split("/")[1] ?? "") >= corte);
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
    .filter((envio) => areasDe(professor).includes(areaDoEnvio(envio)))
    .filter((envio) => (ativa === null ? noEscopo(professor, unidadeDe(envio)) : unidadeDe(envio) === ativa))
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

  // Público: as unidades para escolher na aba Provas (só id e nome; a senha nunca sai do servidor).
  if (partes[0] === "unidades" && partes.length === 1 && metodo === "GET") {
    const dados = todasAsUnidades().sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    if (!dados.length) {
      const motivo = avisarConfiguracao().find((p) => p.includes("UNIDADES"));
      return erro(503, "ERRO_INTERNO", `Nenhuma unidade foi configurada no servidor. ${motivo ?? "Confira a variável UNIDADES."}`);
    }
    avisarConfiguracao();
    return json({ dados });
  }

  // Público: a unidade escolhida + a senha dela. Devolve a ficha que o envio carrega.
  if (partes[0] === "unidades" && partes[1] === "entrar" && metodo === "POST") {
    const ip = ipDe(requisicao);
    if (!tentativaPermitida(`unidade:${ip}`)) return erro(429, "LIMITE_TENTATIVAS", "Muitas tentativas. Espere alguns minutos.");
    if (!todasAsUnidades().length) return erro(503, "ERRO_INTERNO", "Nenhuma unidade foi configurada no servidor (variável UNIDADES).");
    const corpo = await lerCorpoJson(requisicao);
    const unidade = autenticarUnidade(String(corpo?.unidade ?? ""), String(corpo?.senha ?? ""));
    if (!unidade) return erro(401, "CREDENCIAIS_INVALIDAS", "Senha incorreta. Tente de novo.");
    limparTentativas(`unidade:${ip}`);
    return json({ unidade, ...criarFicha(unidade) });
  }

  // Público: o professor libera, na máquina do aluno, a prova que travou.
  if (partes[0] === "liberacoes" && metodo === "POST") {
    const ip = ipDe(requisicao);
    if (!tentativaPermitida(`liberar:${ip}`)) return erro(429, "LIMITE_TENTATIVAS", "Muitas tentativas. Espere alguns minutos.");
    const corpo = await lerCorpoJson(requisicao);
    const professor = await autenticarProfessor(String(corpo?.usuario ?? ""), String(corpo?.senha ?? ""), armazenamento);
    if (!professor) return erro(401, "CREDENCIAIS_INVALIDAS", "Usuário ou senha do professor incorretos.");
    if (professor === "SEM_UNIDADE") return erro(403, "SEM_PERMISSAO", "Seu usuário ainda não está ligado a uma unidade.");
    if (!temPermissao(professor, "provas")) return semPermissao();
    // Só libera a máquina quem é da unidade que abriu a prova (ou a coordenação).
    const unidade = lerFicha(corpo?.ficha);
    if (!unidade) return erro(401, "UNIDADE_INVALIDA", "A sessão da unidade terminou. Volte à área de Provas.");
    if (!noEscopo(professor, unidade.id)) {
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
      const professor = await autenticarProfessor(String(corpo?.usuario ?? ""), String(corpo?.senha ?? ""), armazenamento);
      if (!professor) {
        avisarConfiguracao();
        return erro(401, "CREDENCIAIS_INVALIDAS", "Usuário ou senha incorretos.");
      }
      if (professor === "SEM_UNIDADE") {
        avisarConfiguracao();
        return erro(403, "SEM_PERMISSAO", "Seu usuário ainda não está ligado a uma unidade. Peça à coordenação para configurar.");
      }
      limparTentativas(`entrar:${ip}`);
      return json(sessaoDe(professor), 200, { "Set-Cookie": cookieSessao(criarSessao(professor), seguro) });
    }
    if (metodo === "DELETE") return new Response(null, { status: 204, headers: { "Set-Cookie": cookieApagado(seguro) } });
    const professor = await professorDa(requisicao, armazenamento);
    return professor ? json(sessaoDe(professor)) : erro(401, "NAO_AUTENTICADO", "Entre com seu usuário e senha.");
  }

  // Limpeza diária: chamada pelo agendador da Vercel (Authorization com
  // CRON_SECRET) ou por um professor logado.
  if (partes[0] === "limpeza") {
    const segredo = process.env.CRON_SECRET;
    const peloAgendador = segredo && requisicao.headers.get("authorization") === `Bearer ${segredo}`;
    if (!peloAgendador && !(await professorDa(requisicao, armazenamento))) return erro(401, "NAO_AUTENTICADO", "Sem permissão.");
    return json({ apagados: await limpar(armazenamento) });
  }

  if (partes[0] === "envios") {
    const professor = await professorDa(requisicao, armazenamento);
    if (!professor) return erro(401, "NAO_AUTENTICADO", "Entre com seu usuário e senha.");
    if (!temPermissao(professor, "provas")) return semPermissao();

    if (partes.length === 1 && metodo === "GET") return listarEnvios(url, professor, armazenamento);

    const id = partes[1] ?? "";
    if (!idValido(id)) return erro(404, "NAO_ENCONTRADO", "Envio não encontrado.");

    // Envio de outra unidade responde como se não existisse.
    const doEnvio = await armazenamento.lerJson<Envio>(caminhoEnvio(id));
    if (doEnvio && !podeVerEnvio(professor, doEnvio)) return erro(404, "NAO_ENCONTRADO", "Envio não encontrado.");

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

  if (partes[0] === "fagas") {
    const professor = await professorDa(requisicao, armazenamento);
    if (!professor) return erro(401, "NAO_AUTENTICADO", "Entre com seu usuário e senha.");
    if (!temPermissao(professor, "faga")) return semPermissao();

    if (partes.length === 1 && metodo === "GET") {
      const ativa = unidadeAtiva(professor, url);
      if (ativa === "invalida") return erro(422, "VALIDATION_ERROR", "Unidade desconhecida.");
      const todas = await listarFagas(armazenamento);
      return json({ dados: todas.filter((f) => (ativa === null ? noEscopo(professor, f.unidade) : f.unidade === ativa)) });
    }

    if (partes.length === 1 && metodo === "POST") {
      const ativa = unidadeAtiva(professor, url);
      if (ativa === "invalida") return erro(422, "VALIDATION_ERROR", "Unidade desconhecida.");
      if (ativa === null) return erro(422, "VALIDATION_ERROR", "Escolha a unidade do aluno no alto da página antes de criar a FAGA.");
      const dados = sanearFaga((await lerCorpoJson(requisicao)) ?? {});
      if (typeof dados === "string") return erro(422, "VALIDATION_ERROR", dados);
      const agora = new Date().toISOString();
      const nova = { id: randomUUID(), unidade: ativa, ...dados, criadoEm: agora, alteradoEm: agora, criadoPor: professor.nome };
      await armazenamento.salvarJson(caminhoFaga(nova.id), nova);
      return json(nova, 201);
    }

    const id = partes[1] ?? "";
    if (partes.length !== 2 || !idFagaValido(id)) return erro(404, "NAO_ENCONTRADO", "FAGA não encontrada.");
    const atual = await lerFaga(armazenamento, id);
    // FAGA de outra unidade responde como se não existisse.
    if (!atual || !noEscopo(professor, atual.unidade)) return erro(404, "NAO_ENCONTRADO", "FAGA não encontrada.");

    if (metodo === "GET") return json(atual);
    if (metodo === "PUT") {
      const dados = sanearFaga((await lerCorpoJson(requisicao)) ?? {});
      if (typeof dados === "string") return erro(422, "VALIDATION_ERROR", dados);
      const salva = { ...atual, ...dados, alteradoEm: new Date().toISOString() };
      await armazenamento.salvarJson(caminhoFaga(id), salva);
      return json(salva);
    }
    if (metodo === "DELETE") {
      await armazenamento.apagar([caminhoFaga(id)]);
      return new Response(null, { status: 204 });
    }
  }

  if (partes[0] === "listas") {
    const professor = await professorDa(requisicao, armazenamento);
    if (!professor) return erro(401, "NAO_AUTENTICADO", "Entre com seu usuário e senha.");
    if (!temPermissao(professor, "listas")) return semPermissao();

    const ativa = unidadeAtiva(professor, url);
    if (ativa === "invalida") return erro(422, "VALIDATION_ERROR", "Unidade desconhecida.");

    if (partes.length === 1 && metodo === "GET") {
      const todas = await listarListas(armazenamento);
      const visiveis = todas.filter((l) => acessoLista(professor, l).ver && (ativa === null || vistaPelaUnidade(l, ativa)));
      return json({ dados: visiveis.map((l) => ({ ...l, acesso: { editar: acessoLista(professor, l).editar, administrar: acessoLista(professor, l).administrar } })) });
    }
    if (partes.length === 1 && metodo === "POST") {
      if (!temPermissao(professor, "listas_editar")) return semPermissao();
      const corpo = await lerCorpoJson(requisicao);
      // Sem unidade escolhida só nasce lista da rede (para todas), e só por quem alcança todas as unidades.
      const paraTodas = ativa === null;
      if (paraTodas && !(escopo(professor) === null && corpo?.paraTodas === true)) {
        return erro(422, "VALIDATION_ERROR", "Escolha uma unidade antes de criar a lista.");
      }
      const origemId = typeof corpo?.duplicarDe === "string" ? corpo.duplicarDe : null;
      let origem: ListaAcompanhamento | undefined;
      if (origemId) {
        if (!idListaValido(origemId)) return erro(404, "NAO_ENCONTRADO", "Lista não encontrada.");
        origem = (await armazenamento.lerJson<ListaAcompanhamento>(caminhoLista(origemId))) ?? undefined;
        if (!origem || !acessoLista(professor, origem).ver) return erro(404, "NAO_ENCONTRADO", "Lista não encontrada.");
      }
      const lista = novaLista(professor, paraTodas ? TODAS_AS_UNIDADES : ativa, origem);
      await armazenamento.salvarJson(caminhoLista(lista.id), lista);
      return json(comAcesso(professor, lista), 201);
    }

    const id = partes[1] ?? "";
    if (partes.length !== 2 || !idListaValido(id)) return erro(404, "NAO_ENCONTRADO", "Lista não encontrada.");
    const lida = await armazenamento.lerJson<ListaAcompanhamento>(caminhoLista(id));
    // Lista que o professor não alcança responde como se não existisse.
    const atual = lida && acessoLista(professor, lida).ver ? lida : null;

    if (metodo === "GET") return atual ? json(comAcesso(professor, atual)) : erro(404, "NAO_ENCONTRADO", "Lista não encontrada. Ela pode ter sido apagada.");
    if (metodo === "DELETE") {
      if (atual) {
        // Apagar é de quem é da unidade dona: a unidade que só recebeu o compartilhamento não leva a lista embora.
        if (!acessoLista(professor, atual).administrar) return erro(403, "SEM_PERMISSAO", "Só a unidade dona da lista pode apagá-la.");
        await armazenamento.apagar([caminhoLista(id)]);
      }
      return new Response(null, { status: 204 });
    }
    if (metodo === "PUT") {
      if (!atual) return erro(404, "NAO_ENCONTRADO", "Lista não encontrada. Ela pode ter sido apagada.");
      const acesso = acessoLista(professor, atual);
      if (!acesso.editar) return erro(403, "SEM_PERMISSAO", "Você só pode ver esta lista, não editar.");
      const conferida = validarLista(await lerCorpoJson(requisicao), todasAsUnidades().map((u) => u.id));
      if (typeof conferida === "string") return erro(422, "VALIDATION_ERROR", conferida);
      // Outro professor gravou depois que esta tela abriu a lista: devolve a versão dele em vez de sobrescrever.
      if (conferida.versao !== atual.versao) {
        return json({ error: { code: "CONFLITO", message: `${atual.alteradaPor} alterou esta lista enquanto você editava.` }, atual: comAcesso(professor, atual) }, 409);
      }
      // Mudar com quem a lista é compartilhada é só da unidade dona; quem apenas recebe não mexe nisso.
      const compartilhamento = acesso.administrar && conferida.compartilhamento !== undefined ? (conferida.compartilhamento ?? undefined) : atual.compartilhamento;
      const { acesso: _acesso, ...guardada } = atual;
      const gravada: ListaAcompanhamento = {
        ...guardada,
        ...conferida.lista,
        compartilhamento,
        versao: atual.versao + 1,
        alteradaPor: professor.nome,
        alteradaEm: new Date().toISOString(),
      };
      await armazenamento.salvarJson(caminhoLista(id), gravada);
      return json(comAcesso(professor, gravada));
    }
  }

  // Usuários: criados e editados por quem tem a permissão «usuarios» (administrador).
  if (partes[0] === "usuarios") {
    const professor = await professorDa(requisicao, armazenamento);
    if (!professor) return erro(401, "NAO_AUTENTICADO", "Entre com seu usuário e senha.");
    if (!temPermissao(professor, "usuarios")) return semPermissao();
    return rotearUsuarios(requisicao, partes, professor, armazenamento);
  }

  // Conteúdos dos cursos: uma «wiki» editada por qualquer professor, com o histórico de versões.
  if (partes[0] === "conteudos") {
    const professor = await professorDa(requisicao, armazenamento);
    if (!professor) return erro(401, "NAO_AUTENTICADO", "Entre com seu usuário e senha.");
    if (!temPermissao(professor, "conteudos")) return semPermissao();
    const slug = partes[1] ?? "";
    if (partes.length !== 2 || !slugValido(slug)) return erro(404, "NAO_ENCONTRADO", "Conteúdo não encontrado.");
    const historico = (await armazenamento.lerJson<HistoricoConteudo>(caminhoConteudo(slug))) ?? { slug, revisoes: [] };

    if (metodo === "GET") return json(historico);
    if (metodo === "PUT") {
      const corpo = await lerCorpoJson(requisicao);
      const conteudo = validarConteudo(corpo?.conteudo);
      if (typeof conteudo === "string") return erro(422, "VALIDATION_ERROR", conteudo);
      const atualNumero = historico.revisoes.at(-1)?.numero ?? 0;
      // Outro professor gravou depois que esta tela abriu o conteúdo: devolve o dele em vez de sobrescrever.
      if (Number(corpo?.base) !== atualNumero) {
        return json({ error: { code: "CONFLITO", message: `${historico.revisoes.at(-1)?.autor ?? "Outro professor"} alterou este conteúdo enquanto você editava.` }, atual: historico }, 409);
      }
      const nova: RevisaoConteudo = {
        numero: atualNumero + 1,
        autor: professor.nome,
        unidade: professor.unidade,
        em: new Date().toISOString(),
        comentario: comentarioValido(corpo?.comentario),
        tipo: corpo?.tipo === "restauracao" ? "restauracao" : "edicao",
        conteudo,
      };
      const gravado: HistoricoConteudo = { slug, revisoes: [...historico.revisoes, nova].slice(-LIMITES_CONTEUDO.revisoes) };
      await armazenamento.salvarJson(caminhoConteudo(slug), gravado);
      return json(gravado);
    }
  }

  return erro(404, "NAO_ENCONTRADO", "Rota não encontrada.");
}
