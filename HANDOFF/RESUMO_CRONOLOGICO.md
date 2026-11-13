# Resumo cronológico da conversa

Fonte: o resumo de contexto da sessão, o histórico do git e o que foi executado nesta sessão. A parte **inicial** da conversa só existe em forma resumida; o que não pôde ser confirmado está marcado. Nenhuma senha, hash, token ou chave foi copiada.

Links: repositório https://github.com/Fernandomanoel/Portal (antes `Portal-Atividades-Microlins`) · PR #34 https://github.com/Fernandomanoel/Portal/pull/34 (rascunho) · PR #33 https://github.com/Fernandomanoel/Portal/pull/33 (mesclado).

---

## Fase 1 — Usuários, permissões e logins (antes do PR #33)
- Pedidos do usuário: configurar usuários existentes e limites de acesso; analisar se o aluno está atrasado (já existia no código); ajustar variáveis `PROFESSORES`/`UNIDADES` na Vercel; pedir o passo a passo no painel da Vercel; remover a unidade "TESTE"; trocar senhas de prova × senha do professor (as senhas em si **não** constam aqui).
- Resultado: usuários criados pela tela com permissões/unidades (commit `530e60a`), ajuste de professores da variável (`d06aef3`), diagnóstico de `UNIDADES`/`PROFESSORES` com JSON quebrado ou trocado (`f3e8824`).
- Problema relatado: "clico nas unidades e aparecem professores" → causa provável: conteúdo de `PROFESSORES` colado em `UNIDADES` (o diagnóstico acima detecta isso).
- Pedido de prompt para o Claude no Chrome verificar a tela; detalhes do que foi feito lá: **não confirmado**.

## Fase 2 — Build da Vercel com 52 erros de TypeScript
- Erros: TS2307 (`@/types/quiz`) e TS2550 (`.at`). Causa: `@vercel/node` usava o tsconfig raiz sem opções.
- Correção (commit `d071d35`): arquivo `api/tsconfig.json` (atalho `@/`, lib ES2023, strict).

## Fase 3 — Pacotes e Mensagens trazidos do sistema de origem
- Usuário queria o "analisador de pacotes" e um disparador de mensagens; escolhas: Pacotes no portal; mensagens prontas + link WhatsApp.
- Commits `c2652ce` (analisador de pacotes e mensagens, planilha lida no navegador) e `d06aef3` (acompanhamento de módulos + permissões).
- `src/lib/mensagensAlunos.ts`: só contrato ativo, mínimo de 2 faltas (faltas = Faltas − Reposições), telefone do aluno antes do responsável, `linkWhatsapp = https://wa.me/<número>?text=<mensagem>`.

## Fase 4 — Disparo automático pela Evolution (1ª versão) e histórico
- Pedido: "disparador de msgs e aproveitar tudo o MICROAPP"; respostas: Evolution já no PC; recursos: envio em massa, histórico/auditoria, lembrete com imagem.
- Commit `9d49f92`: envio direto do navegador à Evolution (QR, pausas, cancelar, imagem) + histórico em `disparos/`.

## Fase 5 — Erro de login 500 e cota do Blob
- Sintoma: tela de professor com "Erro no servidor (código …)". Captura da Vercel: Advanced Operations do Blob estouradas (2K/mês no Hobby).
- Correções (PR #33, mesclado): commits `4b905c6` (login de professor da variável não depende do armazenamento) e `45d7625` (menos operações do Blob; autosave das listas a cada 4 s). Também: Digitação com "Recomeçar do zero", zerar ranking e correção do recorde (`f3b283b`).
- Bug do ranking: 80/95 e depois 60/99 substituía o recorde, e `NaN` quebrava a ordenação → corrigido em `src/lib/rankingDigitacao.ts`.
- Explicações dadas ao usuário: como funciona o Blob (custo por chamada, não por tamanho), preço do Vercel Pro (~US$ 20/usuário/mês), alternativas de hospedagem (VPS), domínio ~R$ 40/ano (**confirmar preço**).

## Fase 6 — Docker, VPS e a posição do usuário
- Usuário: sistema é dele e pretende vender; quer **nada do código na instituição** até haver acordo pago; "quero só a conexão da API".
- Commits: `1bf9901` (Dockerfile e compose para a escola), `8640b84` (disparador avulso `/disparador`), `3a6d3b1` (pasta `evolution/` com instalador) — **removidos depois** (disparador avulso e `evolution/`), por decisão de manter só o necessário.
- Outro chat do usuário limpou o PC da escola e deixou a Evolution em `C:\evolution` (porta 8081, `restart: always`). Detalhes desse relatório: só conhecidos pelo texto que o usuário colou.
- Commit `9352be3`: envio automático só para administrador e quem ele liberar (permissão `whatsapp`).
- Commit `1857678`: portal completo para VPS (Caddy/HTTPS, compose, instalador, backup) com ponte de servidor para a Evolution:

```ts
// servidor/whatsapp.ts (trecho)
const url = () => (process.env.EVOLUTION_URL?.trim() || "http://evolution_api:8080").replace(/\/+$/, "");
const chave = () => process.env.EVOLUTION_API_KEY?.trim() ?? "";
export const whatsappConfigurado = () => chave() !== "";
```
- PR #34 aberto como rascunho com esse desenho; o preview da Vercel passou.

## Fase 7 — "O PC fica ligado e o portal faz uma ligação"
- Usuário rejeitou VPS por ora (KVM 1 R$ 29,99 considerado; "no site só há análise e recebimento de provas") e disse: o PC fica ligado quando for usar o disparador.
- Primeira proposta (domínio + Cloudflare Tunnel) foi **descartada**: o usuário disse não entender e pediu para reler o chat.
- Plano aprovado: **modo local** — o navegador no PC da escola fala com `http://localhost:8081`.

## Fase 8 — Implementação do modo local (esta etapa final)
- Commit `0c54642`: `src/lib/evolution.ts` reescrito com os dois modos:

```ts
export async function situacaoDoWhatsapp(): Promise<SituacaoWhatsapp> {
  const doServidor = await chamar<{ configurado: boolean; estado: Estado }>("whatsapp/estado");
  if (doServidor.configurado) { modoAtual = "servidor"; return { modo: "servidor", ...doServidor }; }
  modoAtual = "local";
  const config = lerConfig();                       // localStorage
  if (!config.chave.trim()) return { modo: "local", configurado: false, estado: "desconectado" };
  return { modo: "local", configurado: true, estado: await estadoLocal(config) };
}
```
- `DisparoAutomatico.tsx`: formulário (endereço, chave, nome) só no modo local; `ErroEvolution` tratado junto de `ErroApi`. `docs/SERVIDOR.md` atualizado.
- Teste (Playwright + Evolution simulada na 8081, servidor físico sem `EVOLUTION_API_KEY`): chave errada recusada; chave certa → QR → "conectado"; disparo de 2 mensagens → "2 enviada(s), 0 com falha"; histórico gravado ("Aviso de faltas … concluído").
- Comandos usados no teste:

```bash
npm run build && npm run build:servidor
PORTA=5191 DADOS_DIR=/tmp/dadosT SITE_DIR=dist SEGREDO_SESSAO=<32+ chars> PROFESSORES='[...]' UNIDADES='[...]' node dist-servidor/servidor.mjs
node <scratchpad>/evo81.cjs      # Evolution simulada
node <scratchpad>/loc.cjs        # roteiro Playwright
```
- Push da branch `alfred/practical-pascal-s5pzbq`; PR #34 atualizado (título: "Envio automático de WhatsApp: modo local (PC da escola) e modo servidor (VPS)").
- Incidentes: um comando que importava `servidor.mjs` iniciou o servidor e travou (processo encerrado); `pkill` com regex inválida (sem efeito); a atualização do PR falhou com o nome novo do repositório e funcionou com o nome antigo.

## Estado ao encerrar
Pendente: teste real no PC da escola, decisão sobre `microapp/`, repositório privado, merge do PR #34 — ver `HANDOFF.md`.
