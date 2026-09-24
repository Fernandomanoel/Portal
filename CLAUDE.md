# Portal de Atividades (Microlins) — guia para agentes

Contexto de produto completo está em `PRODUCT.md` (leia antes de qualquer
mudança de UI — é o contrato usado pela skill Impeccable). Estrutura de
pastas e comandos estão no `README.md`. O servidor das provas que existe
está em `docs/SERVIDOR.md`; `docs/API.md` + `contrato/api.ts` são o desenho
de longo prazo. Este arquivo não repete esses — cobre só o que um agente
precisa saber para não quebrar convenção ao editar código.

## Stack

React 19 + TypeScript (strict) + Vite 8, React Router 7 (data router).
CSS Modules + custom properties (`src/styles/tokens.css`) — sem
Tailwind, sem CSS-in-JS. O catálogo é dado estático em `src/data/*.ts` +
arquivos em `public/`. O único servidor é o das provas (`servidor/`, TS em
Node, sem framework): função da Vercel em `api/index.ts` e servidor físico
em `servidor/local.ts`, os dois chamando `servidor/rotas.ts`. Código do
servidor importa com extensão `.js` e não usa o atalho `@/`.

## Comandos

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — `tsc -b && vite build`; rode antes de qualquer commit
- `npm run lint` — oxlint
- `npx tsc -b --force` — typecheck isolado, mais rápido que o build completo

## A regra central: dado, não tela

Todo catálogo (cursos, provas, inglês, digitação) é um array tipado em
`src/data/`. Adicionar conteúdo é **acrescentar um objeto**, nunca criar
tela nova — as telas (`AtividadesPage`, `AtividadePage`, `ProvasPage`...)
já leem o array e criam a rota sozinhas. Antes de resolver algo com um
componente ou rota nova, verifique se não é só um item faltando em
`src/data/atividades.ts`, `provasManifest.ts`, `ingles.ts` ou
`digitacao.ts`. Os tipos que definem essa "fórmula" ficam em `src/types/`
(`curso.ts`, `prova.ts`, `quiz.ts`) — estendê-los é uma decisão maior que
merece confirmação do usuário, porque tudo que já existe depende deles.

Materiais de curso (`Material` em `src/types/curso.ts`) só têm tipo
`pdf | doc | planilha | slides | link`. Arquivo local: `arquivo` +
caminho em `public/atividades/<slug>/...`. Externo ou página HTML
autocontida: `tipo: "link"` + `url` (mesmo quando a "URL" é um caminho
local tipo `/atividades/<slug>/pagina.html`).

Provas interativas (`ProvaInterativa` em `src/types/quiz.ts`) moram em
`src/data/provasInterativas/<Curso>/<slug>.prova.ts` — molde e regras
(`envioArquivo`, `permiteSairDaAba`, `tipo: "pratica"`) em
`COMO-CRIAR-PROVA.md` na mesma pasta. **Nunca importe um `.prova.ts` em
`src/`**: quem carrega é o servidor, pelo registro gerado
(`servidor/provas.gerado.ts`, feito por `scripts/gerar-registro-provas.mjs`
no `dev`/`build`), e o navegador recebe a prova sem o gabarito por
`GET /api/provas/<id>`. Import no front vaza a resposta certa no bundle.
Isso é a área do instrutor (senha em `ProvasLock.tsx`), separada de
Atividades — não confundir as duas ao portar conteúdo do repositório
antigo (`Portal-Atividades`): prova/avaliação de curso vai em
`provasManifest.ts` só quando for de fato controlada pelo instrutor;
material de apoio do aluno vai em `Curso.materiais`.

## Convenções de código

- Nomes de variável, função, rota e conteúdo em **português** (`titulo`,
  `descricao`, `acharCurso`, `/atividades/:curso`). Nomes de tipo também.
- Sem comentários explicando o óbvio; comentário só quando explica uma
  decisão não óbvia (ex.: por que um provedor de contexto não tem
  `beforeunload`, por que um array está vazio de propósito).
- Um `.module.css` por componente/página, mesmo nome base do `.tsx`.
- Ícones vêm só de `src/components/Icone.tsx` (sistema de traço único,
  grid 24, `strokeWidth 1.6`). **Nunca emoji como ícone.** Adicionar um
  ícone novo é acrescentar um `NomeIcone` + path SVG nesse arquivo, no
  mesmo estilo dos existentes.
- Assets binários (imagens, áudio, PDF, docx) referenciados por caminho
  de string dinâmico (não `import` estático) vão em `public/<área>/...`;
  os que são importados diretamente no código vão em `src/assets/`.
- Ao portar conteúdo do repositório antigo (`Portal-Atividades`), preserve
  a mecânica/formato original (fórmulas, regras de jogo, formato de
  prova) — só a linguagem/organização muda para caber no padrão daqui.

## Fluxo de PR

Branch de trabalho: `alfred/practical-pascal-s5pzbq`. PRs são criados como
draft, sem template no repo (escrever descrição livre, resumo + plano de
teste). Rode `npx tsc -b --force` e `npm run build` limpos antes de todo
push. Dois projetos Vercel buildam a cada push (`portal-atividades-
microlins` e, por coincidência de nome de branch, `portal-atividades` —
repositório antigo, não relacionado); confira os dois nos status checks.
Se a branch de trabalho já tiver sido mergeada, reinicie-a a partir do
default branch antes de empilhar commits novos — nunca empilhe sobre
histórico já mergeado.

## Fronteiras

- **Tudo que for puxado do portal antigo ou criado entra no padrão do
  portal — sem exceção.** Nunca copiar a página HTML antiga para `public/`
  e só linkar: atividade vira `.atividade.ts` (molde em
  `atividadesAutocorrigidas/COMO-CRIAR-ATIVIDADE.md`), dado tipado,
  componentes e tokens do portal, sem emoji, com o conteúdo inteiro
  preservado. Se o molde não comportar a mecânica, estenda o molde (ou crie
  um componente no padrão) em vez de pendurar HTML solto.

- Nunca inventar conteúdo de curso/prova sem fonte — quando não houver
  arquivo real (nem no repo antigo, nem enviado pelo usuário), deixe
  `materiais: []`/manifesto vazio; a tela já trata isso como estado vazio.
- Não mudar `lancarNota`/`LancarNotaInput` (contrato de nota do instrutor)
  sem pedido explícito — é o ponto de "IA sugere, instrutor decide". Hoje
  ele é o `PATCH /api/envios/<id>` da área do professor.
- Envio de prova some em 7 dias (`DIAS_GUARDADOS`) por decisão do usuário —
  não aumentar sem pedido. Segredos (`PROFESSORES`, `SEGREDO_SESSAO`,
  `CRON_SECRET`) só em variável de ambiente, nunca no repositório.
- Mudança visual em qualquer tela existente passa pela skill **Impeccable**
  (`impeccable context` antes, `impeccable detect --json` depois),
  usando `PRODUCT.md` e um componente já existente (ex. `CursoCard`) como
  referência de vocabulário visual — não inventar um padrão novo em
  paralelo ao que já existe.
