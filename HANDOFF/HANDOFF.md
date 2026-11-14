# HANDOFF — Portal de Atividades (Microlins)

Gerado em 2026-11-13 a partir do estado do repositório e da conversa. Onde algo não pôde ser verificado, está escrito **"não confirmado"**. Nenhum segredo está neste arquivo (só nomes de variáveis).

> **ATUALIZAÇÃO (2026-11-14):** o disparador automático de WhatsApp e a integração com a Evolution API foram **removidos do portal** (rotas `/api/whatsapp` e `/api/disparos`, `servidor/whatsapp.ts`, `servidor/disparos.ts`, `src/lib/evolution.ts`, painel e histórico, permissão `whatsapp`, serviços da Evolution no `docker-compose.yml`). A aba **Mensagens** também foi removida (permissão `mensagens` incluída); só sobrou `src/lib/mensagensAlunos.ts` com `limparTelefone`/`linkWhatsapp`, usados pelo acompanhamento de módulos. A aba **Digitação** saiu da área do professor: as configurações (zerar ranking e progresso) agora ficam em `/digitacao/configuracao`, atrás da senha da área de provas da unidade; a permissão `digitacao` deixou de existir. `DIAS_GUARDADOS` passou de 7 para **3 dias**. As seções deste arquivo sobre Evolution, modo local/servidor e o plano do instalador nativo estão **desatualizadas**.

---

## 1. Objetivo e estado atual

### Objetivo
Portal de materiais de aula e provas dos cursos da Microlins (React + TypeScript), com uma área do professor (provas enviadas, listas tipo planilha, acompanhamento, mensagens a alunos etc.). O dono do projeto é **Fernando Manoel** (não técnico: não roda código, vê tudo por intermédio do agente; quer explicações simples, em **português**). O projeto é dele e ele pretende vender; usa na escola, mas **não quer código do portal no PC/Docker da instituição** até haver acordo pago.

Objetivo da última etapa: um **disparador de mensagens de WhatsApp** dentro do portal, usando a **Evolution API**, **sem banco/armazenamento próprio para as mensagens** ("somente disparar"), visível **só para o administrador e para quem ele liberar** (permissão `whatsapp`).

### Pronto (verificado por teste ou por commit)
- Portal publicado na Vercel; servidor TypeScript em `servidor/` (função Vercel em `api/index.ts` e servidor físico em `servidor/local.ts`).
- Login de professor/administrador, usuários criados pela tela com permissões e unidades, listas (editor tipo planilha, fórmulas, gráficos, exportação .xlsx), acompanhamento de módulos, analisador de pacotes, mensagens para alunos (links wa.me), histórico dos alunos, digitação (recomeçar/zerar ranking), atividades por curso.
- Login resiliente: administrador nunca lê o armazenamento; falha do Blob não derruba o login (PR #33, já mesclado).
- **Envio automático de WhatsApp com dois modos** (commit `0c54642`, branch `alfred/practical-pascal-s5pzbq`, PR #34 em rascunho):
  - **Local** (portal na Vercel): a página aberta no PC da escola fala direto com `http://localhost:8081`; endereço e chave ficam só no `localStorage` do navegador.
  - **Servidor** (VPS): `/api/whatsapp/*` repassa à Evolution; chave só em variável de ambiente.
  - Testado com **Evolution simulada** (mock): chave errada recusada, QR, conexão, 2 envios, histórico gravado. `npx tsc -b --force` e `npm run build` passam.
- Histórico de disparos em `disparos/<data>/<id>.json`, por 90 dias (`DIAS_HISTORICO_DISPAROS`).
- Pacote VPS (Docker): `docker-compose.yml` (caddy, portal, evolution_api, evolution_db), `Caddyfile`, `Dockerfile`, `.env.exemplo`, `instalar-vps.sh`, `backup.sh`, `docs/VPS.md` — validado só em sintaxe/mock (veja "não verificado").

### Falta / não verificado
- **WhatsApp real não foi conectado** na Evolution do PC da escola; nenhuma mensagem real foi enviada. (não confirmado se funciona de ponta a ponta com o WhatsApp real.)
- **PR #34 ainda é rascunho**; não confirmado se foi mesclado ou se o deploy da Vercel do modo local já está no ar.
- Builds reais do Docker, HTTPS do Caddy e `instalar-vps.sh` num VPS real: **não verificados** (o sandbox não tem Docker daemon).
- No PC da escola (ações do usuário, pendentes): apagar `C:\portal-docker` e `C:\portal`; ligar "Start Docker Desktop when you sign in"; abrir o portal nesse PC → Mensagens → Envio automático → colar a chave de `C:\evolution\.env`, nome `portal`, ler o QR, testar com um número.
- `microapp/` (cópia de outro sistema) ainda está no repositório; o usuário foi perguntado se quer removê-lo e **não respondeu**.
- O usuário tornou o repositório público temporariamente; **não confirmado** se voltou a privado.
- Aplicar na Vercel as variáveis `PROFESSORES`/`UNIDADES` corrigidas: o usuário estava editando; **não confirmado** se concluiu.

---

## 2. Decisões e motivos

| Decisão | Motivo |
|---|---|
| Catálogos como dado tipado em `src/data/*.ts` (regra "dado, não tela") | Adicionar conteúdo = acrescentar um objeto; telas e rotas já leem o array (CLAUDE.md). |
| Provas interativas só carregadas pelo servidor (`servidor/provas.gerado.ts`); nunca importar `.prova.ts` em `src/` | Importar no front vazaria o gabarito no bundle. |
| Autor dos commits sempre `Fernandomanoel <fernandomanoel079@gmail.com>` | Time Vercel Hobby: autor diferente trava o deploy automático (CLAUDE.md). |
| Envio de prova some em 7 dias (`DIAS_GUARDADOS`) | Decisão do usuário; não aumentar sem pedido. |
| Segredos só em variáveis de ambiente | `PROFESSORES`, `UNIDADES`, `SEGREDO_SESSAO`, `CRON_SECRET`, `EVOLUTION_API_KEY` nunca no repositório. |
| `api/tsconfig.json` próprio | `@vercel/node` usava o tsconfig raiz sem opções → 52 erros TS no build da Vercel (TS2307 `@/types/quiz`, TS2550 `.at`). |
| Administrador nunca lê o armazenamento; falha do Blob é "fail-open" com log para os demais; senha errada devolve 401, não 500 | O erro "Erro no servidor (código …)" vinha da cota do Vercel Blob estourada (Advanced Operations 2K/mês no Hobby). |
| Reduzir operações do Blob (sem limpeza ao abrir provas; autosave das listas a cada 4 s) | O custo do Blob é por chamada, não por tamanho (commit `45d7625`). |
| Ranking de digitação fica no navegador, com botão de zerar; progresso com "Recomeçar do zero" | Respostas do usuário às perguntas de design. |
| Envio automático **por permissão `whatsapp`**, fora do acesso padrão | O usuário pediu que a API apareça só para o administrador e quem ele liberar. `permissoesDe` adiciona `usuarios` e `whatsapp` ao administrador; `whatsapp` implica `mensagens`. |
| Evolution **não** roda na Vercel | Função serverless não mantém processo/WebSocket/disco do WhatsApp. |
| Evolution fica no PC da escola, em `C:\evolution` (porta 8081, `restart: always`); **sem código do portal no PC** | O usuário não quer o código do portal na instituição até haver acordo pago. |
| Modo local (navegador → `http://localhost:8081`) em vez de domínio + Cloudflare Tunnel | O usuário não entendeu a parte de domínio/túnel; Chrome permite `localhost` a partir de https; o plano aprovado foi o "modo local" (arquivo de plano da sessão). |
| Manter o modo servidor como alternativa automática (se `EVOLUTION_API_KEY` existir no servidor) | Serve para um VPS futuro; o painel pergunta `GET /api/whatsapp/estado` e escolhe o modo. |
| Ritmo de envio: 4–6 s entre mensagens, pausa de 30 s a cada 40, conferência da conexão a cada 10, tentativa no telefone do aluno e depois no do responsável | Reduzir risco de banimento (WhatsApp não oficial/Baileys) — mecânica herdada do sistema de origem. |
| Tudo que vem do portal antigo entra no padrão do portal (dado tipado, componentes, tokens, sem emoji) | Regra do CLAUDE.md; nunca copiar HTML antigo para `public/`. |
| Ícones só de `src/components/Icone.tsx`; nunca emoji | Convenção do projeto. |
| Repositório do servidor Evolution alternativo (API oficial da Meta) **não adotada** | Citada como alternativa de menor risco de ban (templates, verificação de empresa, custo por conversa); o usuário não escolheu. |
| Venda como SaaS com advogado para propriedade intelectual/contrato/LGPD; separar conteúdo próprio × da empresa × de terceiros | Conversa de negócio; **não é decisão técnica nem confirmada como feita**. |

---

## 3. Stack, versões e como rodar do zero

- **Front:** React 19.2.x, react-router-dom 7.18.x, TypeScript ~6.0.2 (strict), Vite 8.3.x, CSS Modules + custom properties (`src/styles/tokens.css`), sem Tailwind.
- **Servidor:** TypeScript em Node, sem framework; empacotado com rolldown 1.2.9 (`npm run build:servidor`).
- **Armazenamento:** Vercel Blob (`@vercel/blob` ^2.8.0) na Vercel; disco (`DADOS_DIR`) no servidor físico/VPS.
- **Lint:** oxlint. **Testes de tela usados na sessão:** Playwright ^1.63 (scripts ad hoc; não há suíte de testes automatizados confirmada).
- **Ambiente da sessão:** Node v22.23.4, npm 10.9.9 (versão mínima exigida: não confirmado).
- **Evolution API:** imagem `evoapicloud/evolution-api:v2.3.7` + Postgres (WhatsApp não oficial — Baileys).

### Instalar e rodar
```bash
git clone https://github.com/Fernandomanoel/Portal-Atividades-Microlins   # nome do repo foi renomeado para Fernandomanoel/Portal (veja §8)
cd Portal-Atividades-Microlins
git checkout alfred/practical-pascal-s5pzbq
npm install
npm run dev            # http://localhost:5173 ; /api grava em ./dados
```
Para testar login/área do professor localmente é preciso definir `SEGREDO_SESSAO` (32+ caracteres), `UNIDADES` e `PROFESSORES` (veja `docs/SERVIDOR.md`); os hashes de senha saem de `npm run professor:senha` e `npm run unidade:senha`.

---

## 4. Estrutura de pastas e arquivos importantes

```
CLAUDE.md, PRODUCT.md, README.md   regras para agentes / contrato de produto / comandos
docs/SERVIDOR.md                   servidor, variáveis, rotas, envio automático, VPS
docs/VPS.md                        instalar o portal completo num VPS com Docker
docs/DOCUMENTACAO.md, API.md       doc geral e contrato de longo prazo (+ contrato/api.ts)
api/index.ts, api/tsconfig.json    função da Vercel
servidor/
  rotas.ts          roteador da API (login, envios, listas, usuários, /whatsapp, /disparos, limpar())
  seguranca.ts      sessão assinada, hash scrypt, PROFESSORES/UNIDADES, diagnóstico de configuração
  usuarios.ts       usuários criados pela tela
  listas.ts         listas do professor
  whatsapp.ts       ponte para a Evolution (modo servidor): conectar, enviar, validarEnvio
  disparos.ts       histórico de disparos
  armazenamentoBlob.ts / armazenamentoDisco.ts / armazenamento.ts
  local.ts          servidor físico (site + API); dev.ts, node.ts auxiliares
  provas.gerado.ts  GERADO por scripts/gerar-registro-provas.mjs (não editar)
src/
  App.tsx, main.tsx
  pages/            uma tela por rota; pages/professor/* = área do professor
  components/       Icone.tsx; ferramentas/DisparoAutomatico.tsx (+ .module.css), HistoricoDisparos.tsx
  lib/evolution.ts  cliente do disparo: modo servidor ou local (ver §6)
  lib/mensagensAlunos.ts  monta mensagens/ destinatários a partir da planilha
  lib/apiProvas.ts  `chamar`, `comJson`, `ErroApi`
  types/acesso.ts   PERMISSOES e PERMISSOES_PADRAO
  data/             catálogos: atividades, provasManifest, ingles, jogosDigitacao, provasInterativas/*.prova.ts
scripts/            gerar-registro-provas, senha-professor, senha-unidade, ilustrações, planilhas, verificações
docker-compose.yml, Caddyfile, Dockerfile, .env.exemplo, instalar-vps.sh, backup.sh   pacote VPS
microapp/           cópia isolada de outro sistema (candidata a remoção; não integrada)
vercel.json         headers, redirect de domínio, rewrites /api, cron /api/limpeza (07:00 UTC)
```

---

## 5. Variáveis de ambiente (apenas nomes)

Extraídas de `process.env.*` em `servidor/`, `api/`, `scripts/`:

| Nome | Uso |
|---|---|
| `SEGREDO_SESSAO` | assina o cookie de login (32+ caracteres) |
| `PROFESSORES` | JSON dos professores (senha = hash scrypt) |
| `UNIDADES` | JSON das unidades |
| `UNIDADE_PADRAO` | unidade que herda envios/listas antigos (opcional) |
| `UNIDADE`, `SENHA_UNIDADE` | usados em `scripts/` (senha-unidade); detalhe: não confirmado |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob |
| `CRON_SECRET` | protege a rota de limpeza (cron) |
| `EVOLUTION_API_KEY` | liga o modo servidor do WhatsApp |
| `EVOLUTION_URL` | padrão `http://evolution_api:8080` |
| `EVOLUTION_INSTANCE` | padrão `portal` |
| `PORTA`, `DADOS_DIR`, `SITE_DIR`, `LIMITE_ARQUIVO_MB` | servidor físico/VPS |
| `DOMINIO`, `EVOLUTION_DB_SENHA` | só no `.env` do VPS (`.env.exemplo`) |

Na Vercel, o projeto citado em CLAUDE.md é o **`portal.`**. No PC da escola, a chave da Evolution é `AUTHENTICATION_API_KEY` no `C:\evolution\.env` (nome confirmado só pelos rótulos da tela e pela conversa).

---

## 6. Como o envio automático funciona (resumo técnico)

`src/lib/evolution.ts` chama `GET /api/whatsapp/estado`:
- `configurado: true` → **servidor**: `conectar`/`enviar`/`desconectar` via `/api/whatsapp/*`.
- `configurado: false` → **local**: usa `lerConfig()` (localStorage, chave `portal:mensagens:evolution`; padrão `http://localhost:8081`, instância `portal`) e fala direto com a Evolution (`/instance/connectionState`, `/instance/create`, `/instance/connect`, `/message/sendText|sendMedia`).
`DisparoAutomatico.tsx` mostra o formulário (endereço, chave, nome) só no modo local; o painel e o histórico só aparecem com a permissão `whatsapp` (`ProfessorMensagensPage.tsx`).
Limites (servidor): número `^\d{10,15}$`, texto 1–4096, imagem JPG/PNG/WebP ≤ 5 MB.

---

## 7. Problemas conhecidos, bugs em aberto, próximos passos

### Conhecidos / riscos
- **Modo local só funciona no navegador do PC da escola** (de outro aparelho, `localhost` seria o próprio aparelho). Chrome pode pedir permissão de "rede local". Não verificado com Chrome real.
- **CORS do modo local:** o teste usou um mock que devolve `Access-Control-Allow-Origin: *`. A Evolution real v2.3.7 precisa aceitar a origem do portal — **não confirmado** (se falhar, é preciso ajustar CORS na Evolution).
- **Risco de banimento** do número (WhatsApp não oficial). O ritmo conservador já está implementado; sem garantia.
- **Cota do Vercel Blob (Hobby):** Advanced Operations 2K/mês; ao estourar, todas as operações falham (a aba de professor pode falhar para quem não é administrador).
- **Disco C: do PC da escola com ~8 GB livres**: usar `docker builder prune`; **nunca** `docker volume prune` nem `docker compose down -v`.
- **Domínio canônico:** `CLAUDE.md` cita `portal-microlins.vercel.app`; `vercel.json` redireciona esse host para `oportale.vercel.app`. Qual é o definitivo: **não confirmado**.
- **Avisos do `npm run lint`:** vários `react(set-state-in-effect)` preexistentes (warnings, não erros).
- `microapp/` vem de outro sistema; origem/licença: **não confirmado**.
- O repositório foi **renomeado** (`Fernandomanoel/Portal`); o remote local ainda aponta para `Portal-Atividades-Microlins` e o push avisa "repository moved". Ferramentas do GitHub na sessão só aceitaram o nome antigo (`fernandomanoel/portal-atividades-microlins`).

### Próximos passos (em ordem sugerida)
1. Conferir se o PR #34 pode sair de rascunho e ser mesclado; ver o status do deploy na Vercel.
2. No PC da escola: concluir os passos da §1 e **testar um disparo real** para um número do próprio usuário; registrar o resultado (CORS, QR, envio).
3. Decidir sobre `microapp/` (remover em branch separada) e voltar o repositório a privado.
4. Se precisar disparar fora do PC da escola: VPS (`docs/VPS.md`; Hostinger KVM 2 foi a recomendação, KVM 1 R$ 29,99 "viável mas apertado") ou túnel; alternativa de menor risco: API oficial da Meta.
5. Parte jurídica/negócio para a venda (advogado, LGPD): fora do código.

---

## 8. Comandos úteis

```bash
npm run dev                 # desenvolvimento (gera o registro de provas antes)
npx tsc -b --force          # checagem de tipos isolada (rodar antes de todo push)
npm run build               # tsc -b + vite build (rodar antes de todo commit/push)
npm run lint                # oxlint
npm run build:servidor && npm run servidor   # servidor físico em dist-servidor/servidor.mjs (usa PORTA, DADOS_DIR, SITE_DIR)
npm run professor:senha     # gera login de professor (--admin para administrador)
npm run unidade:senha       # gera senha da aba Provas de uma unidade
./instalar-vps.sh           # VPS: cria .env e sobe o compose (ver docs/VPS.md)
git push -u origin alfred/practical-pascal-s5pzbq   # branch de trabalho
```
Deploy: automático pela Vercel a cada push (projeto `portal.`); PRs como **rascunho**, sem template, com resumo + plano de teste. Se a branch de trabalho já tiver sido mesclada, reiniciá-la a partir da branch padrão.

### Teste local do envio automático (como foi feito)
1. `npm run build && npm run build:servidor`.
2. Subir o servidor com `PORTA`, `DADOS_DIR` (pasta temporária), `SITE_DIR=dist`, `SEGREDO_SESSAO`, `PROFESSORES` (admin com hash gerado), `UNIDADES`, **sem** `EVOLUTION_API_KEY`.
3. Subir uma Evolution falsa em 8081 (chave de teste), abrir `/professor/mensagens` com Playwright, salvar a chave, conectar, carregar uma planilha CSV (`Nome Aluno;Faltas;Reposição;Status Contrato;Telefone Aluno;Telefone Responsável`) e disparar.
4. Apagar `dados`/`.env` temporários ao terminar.
(Os scripts de teste ficaram no scratchpad da sessão e **não** estão no repositório.)
