# Prompt de retomada (cole numa sessão nova do Claude Code)

Copie tudo abaixo da linha.

---

Você vai continuar um trabalho já avançado no projeto **Portal de Atividades (Microlins)**. Responda **sempre em português**, com explicações simples: o dono (Fernando Manoel) não é técnico, não roda código e só vê o que você mostra.

## Antes de qualquer coisa
1. Leia, nesta ordem: `HANDOFF/HANDOFF.md`, `HANDOFF/RESUMO_CRONOLOGICO.md`, `CLAUDE.md`, `PRODUCT.md`, `docs/SERVIDOR.md`.
2. Repositório: `Fernandomanoel/Portal-Atividades-Microlins` (foi renomeado para `Fernandomanoel/Portal`; as ferramentas do GitHub da sessão anterior só aceitaram o nome antigo). Branch de trabalho: `alfred/practical-pascal-s5pzbq`. PR em aberto como rascunho: #34 (https://github.com/Fernandomanoel/Portal/pull/34).
3. Rode `npm install` e confirme que `npx tsc -b --force` e `npm run build` passam.

## Projeto em uma frase
React 19 + TypeScript + Vite 8 (CSS Modules, sem Tailwind), servidor Node em `servidor/` (função da Vercel em `api/index.ts`, servidor físico em `servidor/local.ts`). Catálogos são **dados tipados em `src/data/`** (adicionar conteúdo = acrescentar um objeto, nunca tela nova).

## Regras que NÃO pode quebrar (do CLAUDE.md)
- Nomes e conteúdo em português; ícones só de `src/components/Icone.tsx`; nunca emoji.
- Nunca importar `.prova.ts` em `src/` (vaza gabarito).
- Segredos só em variáveis de ambiente; nunca no repositório, nem em conversas.
- Autor dos commits: `Fernandomanoel <fernandomanoel079@gmail.com>` (nunca "Claude"), senão a Vercel Hobby trava o deploy.
- Não mudar `lancarNota`/`LancarNotaInput`; não aumentar `DIAS_GUARDADOS` (7 dias).
- PRs como rascunho; rodar `npx tsc -b --force` e `npm run build` antes de todo push.
- Mudança visual passa pela skill Impeccable, usando `PRODUCT.md`.

## Onde paramos (resumo)
- **Meta:** disparador de WhatsApp pela **Evolution API**, sem guardar mensagens (só o histórico de resultado por 90 dias), visível **só ao administrador e a quem ele liberar** (permissão `whatsapp`).
- **Decisão do dono:** portal continua na **Vercel**; a Evolution fica no **PC da escola** (`C:\evolution`, porta 8081, Docker, WhatsApp ainda **não conectado**); **nenhum código do portal no PC da escola**.
- **Implementado (commit `0c54642`, PR #34):** `src/lib/evolution.ts` escolhe sozinho entre **modo servidor** (`/api/whatsapp/*`, se `EVOLUTION_API_KEY` existir no servidor) e **modo local** (a página aberta no PC da escola fala com `http://localhost:8081`; endereço/chave só no `localStorage`). `DisparoAutomatico.tsx` mostra o formulário no modo local. Testado só com Evolution **simulada**.
- **Não verificado:** WhatsApp real, CORS da Evolution real v2.3.7 com a origem do portal, Docker/Caddy/`instalar-vps.sh` num VPS, status do deploy.

## Seu primeiro trabalho
1. Rode `git status`, `git log --oneline -5` e confira o estado do PR #34 e do deploy da Vercel; diga ao dono o que viu.
2. Pergunte (uma vez, de forma simples) se ele já conectou o WhatsApp no PC da escola e testou o disparo. Se houver erro, ajude a diagnosticar (mensagem exata da tela; suspeitas: CORS, chave errada, Docker parado, permissão de rede local do Chrome).
3. Pendências que dependem dele (lembre-as): apagar `C:\portal-docker` e `C:\portal`; ligar "Start Docker Desktop when you sign in"; manter o repositório **privado**; decidir se remove `microapp/` do repositório.
4. Só mexa em código quando houver pedido claro; não invente conteúdo de curso/prova sem fonte.

Não peça nem repita senhas, chaves ou tokens. Se algo não estiver claro, diga "não confirmado" em vez de supor.
