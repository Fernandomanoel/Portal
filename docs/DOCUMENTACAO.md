# Documentação do Portal de Atividades (Microlins)

Este documento explica o portal inteiro em duas partes:

- **Parte 1 — Usando o portal:** para instrutores e coordenação. O que cada
  seção faz, como funcionam as atividades e as provas e como acrescentar
  conteúdo.
- **Parte 2 — Técnica:** para quem mantém o código. Arquitetura, dados,
  servidor, geradores, verificação, deploy e regras que não se quebram.

Os números citados (cursos, atividades, provas) são da data em que este
documento foi escrito (outubro/2026) e mudam conforme o catálogo cresce.

---

# Parte 1 — Usando o portal

## 1. Visão geral

O portal reúne num endereço só o material de aula e as provas dos cursos
profissionalizantes. O aluno abre o portal no computador do laboratório (ou no
celular) e chega à atividade do dia sem depender de pendrive, e-mail ou do
instrutor passando arquivo por arquivo.

- **Endereço de produção:** `portal-microlins.vercel.app` (e domínios irmãos
  do mesmo projeto na Vercel).
- **Quem usa:**
  - **Alunos:** abrem atividades, fazem exercícios corrigidos na hora e
    respondem provas. Não existe login de aluno: ele digita o nome quando a
    prova pede.
  - **Instrutores:** indicam a atividade, aplicam provas e, na área do
    professor (com login), veem os envios, baixam os arquivos e lançam as
    notas.
  - **Público do «Passo a Passo»:** crianças e pessoas com dificuldade de
    leitura ou interpretação, incluindo pessoas no espectro autista, com
    tutoriais de um passo por tela, narrados em voz.
- **Tema claro e escuro:** o botão no menu troca o tema. Os dois fazem parte
  do produto, não são um extra.

## 2. Seções

| Seção | Endereço | O que tem |
|---|---|---|
| Início | `/` | Entrada com atalhos para as seções. |
| Atividades | `/atividades` | 65 cursos em 7 categorias. Cada curso tem material de apoio e atividades corrigidas dentro do portal. |
| Inglês | `/ingles` | Trilha própria: 21 atividades em 7 trilhas (vocabulário, ouvir e ler, frases, Gabi, vida real, textos e redação), mais as provas de inglês. |
| Digitação | `/digitacao` | Treino de teclado: modo livre, textos clássicos, Cavaleiros do Zodíaco, letras em inglês e Sonic, com velocidade, precisão, erros e ranking (`/digitacao/ranking`). |
| Passo a Passo | `/passo-a-passo` | 50 tutoriais guiados (10 de Windows, 10 de Word, 10 de Excel, 10 de PowerPoint, 5 de inteligência artificial e 5 de segurança digital) e 5 jogos de conceito sobre as peças do computador. |
| Provas | `/provas` | 48 provas interativas organizadas por curso, abertas pela senha de sala do instrutor. |
| Área do professor | `/professor` | Login por professor: lista de envios, arquivo anexado, respostas e lançamento de nota. |

### Atividades: categorias

| Categoria | Cursos | Atividades corrigidas no portal |
|---|---|---|
| Administrativa | 19 | 91 |
| Informática | 15 | 69 |
| Programação | 12 | 39 |
| Design | 7 | 9 |
| Marketing | 3 | 8 |
| Comportamental | 5 | 8 |
| Saúde | 4 | 0 |
| **Total** | **65** | **224** |

Na página de um curso aparecem duas listas:

- **Material de apoio:** PDF, Word, planilha, slides, vídeo, imagem ou link.
  Todo arquivo do próprio portal **baixa na hora, sem sair da aba**. Só os
  links (site externo ou página HTML autocontida) abrem em nova aba.
- **Atividades:** exercícios corrigidos dentro do portal (ver a seção 3).

Curso sem material ou sem atividade mostra um estado vazio desenhado. Não é
erro: quer dizer que o conteúdo ainda não foi cadastrado.

## 3. Atividades corrigidas no portal

Cada atividade é uma página com itens em sequência. O aluno lê o cenário,
resolve e clica para conferir. O portal diz o que está certo e explica o que
está errado. **Não vale nota e não guarda nada:** é treino.

### Tipos de questão

| Tipo | Como o aluno responde | Como é corrigido |
|---|---|---|
| Múltipla escolha | Escolhe uma opção | Opção certa. |
| Cálculo | Digita um número | Valor esperado, com uma tolerância pequena para arredondamento. |
| Associação | Liga cada item à resposta | Item por item. |
| Resposta curta e dissertativa | Escreve um texto | Número mínimo de palavras e palavras-chave do assunto. O conteúdo fino é com o instrutor. |
| Comando ou fórmula | Escreve a fórmula do Excel, o comando SQL ou o código | O formato do que foi escrito (ex.: começa com `=PROCV(` e usa `FALSO`). |
| Planilha dentro da atividade | Copia a tabela (botão «Copiar planilha»), cola no Excel e responde | Os resultados numéricos. |
| «Dia de trabalho» | Recebe um e-mail do gestor (briefing) e uma sequência de tarefas com dados grandes | Os resultados de cada etapa e um texto final. |

### Atividades de planilha de «configurar» e «preencher»

São as atividades de situação de trabalho administrativa. Cada área tem um
par:

- **Configurar:** o aluno baixa uma planilha só com os dados e monta as
  fórmulas, validações, formatação condicional, busca (PROCV) e proteção,
  guiado etapa por etapa.
- **Preencher:** o aluno baixa uma planilha **já configurada e protegida**,
  como as que existem nas empresas, e lança um mês de documentos reais, com os
  erros de verdade que aparecem no dia a dia.

O arquivo `.xlsx` é baixado pelo botão «Baixar planilha» dentro da própria
atividade.

| Área (curso) | Configurar | Preencher |
|---|---|---|
| Compras e Estoque | Controle de estoque com 60 itens: valor em estoque, alerta de reposição, PROCV e saldo com SOMASES | 89 documentos de setembro: código errado, documento repetido, venda sem saldo, desconto acima da alçada |
| Departamento Pessoal | Folha de 40 funcionários: INSS progressivo, IRRF com desconto simplificado, VT, líquido, FGTS e holerite | 83 ocorrências do ponto e do RH: horas extras, domingo, faltas, atrasos, vales, atestado e hora extra acima do limite |
| Crédito e Cobrança | Contas a receber: dias de atraso, faixas de vencimento, multa e juros por dia, resumo e consulta por cliente | Retorno do banco: nota errada, crédito repetido, pagamento em duplicidade, pagamento parcial e negativação |
| Assistente de Administração Financeira | Fluxo de caixa de outubro: saldo dia a dia, alerta de saldo negativo e o pior momento do mês | Conciliação bancária: tarifa não lançada, cheque não compensado, depósito em trânsito, valor digitado errado e duplicidade |
| Vendas | Pedidos de agosto: preço por código, alçada de desconto, comissão escalonada pela meta e ranking | Pedidos de setembro: código errado, item repetido, pedido cancelado, desconto com e sem aprovação |

Todos os dados dessas planilhas são fictícios. As tabelas de INSS e IRRF são
as de setembro/2025, o mês dos dados.

## 4. Provas

### Para o aluno

1. O instrutor libera a tela de Provas com a senha de sala e indica a prova.
2. O aluno digita o nome e começa. A interface trava: somem menu, rodapé e o
   botão de voltar, e o navegador avisa antes de fechar ou recarregar.
3. Na prova travada (o padrão), a prova abre em tela cheia. Se o aluno trocar
   de aba ou de janela, ou sair da tela cheia, a prova bloqueia até um
   professor digitar usuário e senha naquele computador. Cada saída fica
   registrada no envio.
4. Algumas provas pedem um arquivo (por exemplo, a planilha feita no Excel).
5. Ao enviar:
   - **Múltipla escolha:** a nota sai na hora, calculada no servidor.
   - **Descritiva e prática:** ficam «a corrigir» até o professor lançar a
     nota.

Os formatos de prova são cinco:
- múltipla escolha;
- descritiva;
- prática (com arquivo);
- mista;
- autocorrigida («Testar resposta», com 3 tentativas por questão).

### Para o professor

1. Entre em `/professor` com usuário e senha (cada professor tem o seu).
2. A lista mostra os envios, do mais novo para o mais antigo, com busca por
   aluno e filtro por prova.
3. Abra um envio para ver:
   - as respostas, com o gabarito ao lado;
   - as saídas da tela registradas;
   - o arquivo anexado, que pode ser baixado com o nome do aluno.
4. Lance a nota (0 a 10, uma casa decimal) e, se quiser, um comentário.

> **Atenção:** envios e arquivos são apagados sozinhos **7 dias** depois do
> envio. Quem precisa guardar a nota deve registrá-la antes.

## 5. Como acrescentar conteúdo

Nenhum conteúdo novo exige tela nova. Tudo é acrescentar um item num arquivo
de dados. Cada formato tem um guia com o passo a passo completo:

| Quero acrescentar | Onde | Guia |
|---|---|---|
| Material de apoio a um curso (PDF, vídeo, planilha...) | Arquivo em `public/atividades/<curso>/` e item em `materiais` do curso em `src/data/atividades.ts` | [`src/data/COMO-FORNECER-MATERIAL.md`](../src/data/COMO-FORNECER-MATERIAL.md) |
| Atividade corrigida no portal | Arquivo `.atividade.ts` em `src/data/atividadesAutocorrigidas/<Curso>/` e item em `atividades` do curso | [`COMO-CRIAR-ATIVIDADE.md`](../src/data/atividadesAutocorrigidas/COMO-CRIAR-ATIVIDADE.md) |
| Prova | Arquivo `.prova.ts` em `src/data/provasInterativas/<Curso>/` e entrada em `src/data/provasManifest.ts` | [`COMO-CRIAR-PROVA.md`](../src/data/provasInterativas/COMO-CRIAR-PROVA.md) |
| Curso novo | Um objeto `Curso` no array de `src/data/atividades.ts` (slug, título, descrição, categoria, cor, `materiais: []`) | Ver a seção 8 abaixo |

Regras de conteúdo:

- **Nunca inventar conteúdo de curso ou prova sem fonte.** Sem material real,
  deixe a lista vazia: a tela mostra o estado vazio.
- **Material de aluno vai em Atividades. Prova controlada pelo instrutor vai em
  Provas.** Não misturar as duas.
- **Arquivo binário** (vídeo, imagem, `.pptx`, `.xlsx`) nunca é cadastrado como
  link. Fica em `public/` e baixa pelo portal.

---

# Parte 2 — Técnica

## 6. Stack e arquitetura

| Camada | Tecnologia |
|---|---|
| Interface | React 19 + TypeScript (strict) + Vite 8 |
| Rotas | React Router 7 (data router), em `src/App.tsx` |
| Estilo | CSS Modules (um `.module.css` por componente) + variáveis em `src/styles/tokens.css`. Sem Tailwind nem CSS-in-JS. |
| Ícones | Só `src/components/Icone.tsx` (traço único, grade 24, `strokeWidth 1.6`). Nunca emoji. |
| Servidor | TypeScript em Node, sem framework, só para as provas (`servidor/`) |
| Armazenamento | Vercel Blob (produção) ou disco (servidor físico e dev) |
| Lint | oxlint |

**A regra central é «dado, não tela».** Todo catálogo é um array tipado em
`src/data/`, e as telas leem o array e criam as rotas sozinhas. Antes de
resolver algo com tela ou rota nova, confira se não é só um item faltando nos
dados.

## 7. Mapa de pastas

```
src/
├── App.tsx                 árvore de rotas
├── pages/                  uma tela por rota (atividades, inglês, digitação, guiado, provas, professor)
├── components/             layout, cards, atividades, inglês, digitação, guiado, provas, quiz, Icone
├── hooks/                  tema, prova em andamento, trava de prova, tela imersiva, narração, digitação
├── lib/                    rotas, busca, cliente da API, correção de atividade, prova e texto, ranking
├── types/                  contratos: curso, atividadeAutocorrigida, prova, quiz, envio, ingles, guiado
├── styles/                 tokens, reset e fontes
├── assets/                 imagens importadas no código (ilustrações SVG geradas)
└── data/
    ├── atividades.ts            catálogo de cursos (65)
    ├── atividadesAutocorrigidas/ atividades .atividade.ts por curso + ajudantes.ts + dados*.ts
    ├── provasInterativas/       provas .prova.ts por curso (só o servidor carrega)
    ├── provasManifest.ts        índice das provas por curso
    ├── ingles.ts, inglesAtividades/  trilha de inglês
    ├── digitacao.ts             textos de digitação
    └── guiado.ts                catálogo do Passo a Passo

public/atividades/<curso>/  arquivos baixados nas atividades (PDF, .xlsx, .pptx, imagens)
servidor/                   API das provas: rotas, segurança, armazenamento, registro gerado
api/index.ts                a mesma API como função da Vercel
scripts/
├── gerar-registro-provas.mjs  gera servidor/provas.gerado.ts (roda no dev e no build)
├── ilustracoes/               kit de ilustrações SVG das atividades (npm run ilustracoes)
├── planilhas/                 gera e confere as .xlsx das atividades de planilha
├── senha-professor.mjs        gera o login de um professor
├── capturar.mjs               capturas de tela em tema claro e escuro
├── verificar-prova.mjs        fluxos de prova ponta a ponta
└── verificar-telas.mjs        larguras 320/768/1024/1440 e ordem de tabulação
docs/                       SERVIDOR.md, API.md e este documento
contrato/api.ts             formatos da API de longo prazo em TypeScript
PRODUCT.md                  verdade de produto (usada pela skill Impeccable)
CLAUDE.md                   regras para agentes que editam o código
```

## 8. Modelo de dados

### Curso e material (`src/types/curso.ts`)

```ts
interface Curso {
  slug: string;            // vira a rota /atividades/<slug>
  titulo: string;
  descricao: string;
  categoria: "informatica" | "administrativa" | "programacao" | "design" | "marketing" | "saude" | "comportamental";
  sigla?: string;          // letras da capa gerada
  cor: string;
  materiais: Material[];   // pdf | doc | planilha | slides | video | imagem | link
  atividades?: AtividadeResumo[]; // { titulo, descricao, caminho }
  imagem?: string;
}
```

- **Material com arquivo local** (todo tipo exceto `link`): `arquivo` aponta
  para `public/...`.
- **Material externo ou página HTML autocontida:** `tipo: "link"` + `url`.

### Atividade corrigida (`src/types/atividadeAutocorrigida.ts`)

- **`AtividadeAutocorrigida`:**
  - `titulo`, `introducao`, `regras?`, `fonte?`;
  - `itens: ItemAtividade[]`.
- **`ItemAtividade`:**
  - texto do item: `cenario`, `instrucao` e `blocos` (texto, lista, nota,
    tabela, código, subtítulo);
  - tarefa: `passos`, `codigo`, `imagem` e `tabelaReferencia`;
  - `download?: { url, nome, rotulo, descricao? }`: o botão de arquivo dentro
    do item;
  - notas: `desafio`, `aviso` e `objetivo`;
  - `campos`: as respostas. Cada campo tem uma `regra`: `selecao`, `numero`
    com tolerância, `padrao` (regex) ou `texto` (mínimo de palavras e
    palavras-chave);
  - `passosGuiados`: só no Passo a Passo.
- **Ajudantes:** `src/data/atividadesAutocorrigidas/ajudantes.ts` monta os
  itens comuns: `escolha`, `calculo(s)`, `associar`, `resposta`, `planilha`,
  `dissertativa`, `briefing` e `consulta`.
- **Carregamento:** o arquivo é achado pelo caminho com `import.meta.glob`
  (`src/data/atividadesAutocorrigidas/index.ts`). A rota é
  `/atividades/<curso>/atividade/<caminho>`.

### Provas (`src/types/quiz.ts`, `src/types/prova.ts`, `src/types/envio.ts`)

- O `.prova.ts` tem as questões **com** gabarito. O id da prova é o caminho sem
  extensão (ex.: `Custos/prova-final`).
- O `provasManifest.ts` lista as provas por curso para a tela de Provas.
- `Envio` e `LancarNotaInput` formam o contrato com a área do professor.

## 9. Servidor das provas

O detalhe completo está em [`docs/SERVIDOR.md`](SERVIDOR.md). O contrato de
longo prazo está em [`docs/API.md`](API.md) e [`contrato/api.ts`](../contrato/api.ts).

O resumo:
- **Um código só, três lugares.** As rotas ficam em `servidor/rotas.ts`, no
  formato `Request → Response`, e rodam:
  - na Vercel, por `api/index.ts`;
  - no servidor físico, por `servidor/local.ts`;
  - no `npm run dev`, pelo plugin do Vite.
- **O gabarito nunca sai do servidor.** O registro `servidor/provas.gerado.ts`
  é gerado por `scripts/gerar-registro-provas.mjs` no dev e no build. O
  navegador recebe a prova sem a resposta por `GET /api/provas/<id>`.
  **Nunca importe um `.prova.ts` em `src/`:** o gabarito vazaria no bundle.
- **Garantias:**
  - todo envio é revalidado no servidor;
  - o envio é idempotente;
  - senhas em hash (scrypt) e limite de tentativas;
  - cookie `HttpOnly` + `SameSite=Strict`;
  - limpeza automática dos envios com mais de 7 dias.
- **Variáveis de ambiente.** Os valores nunca vão para o repositório:
  - `PROFESSORES`;
  - `SEGREDO_SESSAO`;
  - `CRON_SECRET`;
  - `BLOB_READ_WRITE_TOKEN`;
  - `LIMITE_ARQUIVO_MB`, `DADOS_DIR`, `PORTA` e `SITE_DIR`.
- **Novo professor:**
  `npm run professor:senha -- usuario "Nome" "senha"`. Acrescente a saída à
  lista `PROFESSORES`.

## 10. Geradores

### Ilustrações das atividades

O comando é `npm run ilustracoes -- <filtro>`. Ele gera os desenhos SVG de
tela (janelas do Office, Colab, banco de dados...) a partir de
`scripts/ilustracoes/telas/*.mjs` e os grava em `src/assets/atividades/`.
Toda imagem leva uma legenda dizendo que é um desenho do portal, não uma
captura de tela real.

### Planilhas das atividades de «configurar» e «preencher»

```bash
npm run planilhas                                               # gera as .xlsx em public/atividades/<curso>/
python3 scripts/planilhas/conferir.py "$(node scripts/planilhas/exportar.mjs)"   # confere as fórmulas
```

- **Dados.** Os dados de cada área estão em
  `src/data/atividadesAutocorrigidas/`: `dadosEstoque.ts`, `dadosFolha.ts`,
  `dadosCobranca.ts`, `dadosCaixa.ts` e `dadosVendas.ts`. Eles usam o sorteio
  com semente de `dadosFicticios.ts`, então a mesma semente sempre gera os
  mesmos números. As respostas das atividades são calculadas desses mesmos
  dados.
- **Exportação.** `scripts/planilhas/exportar.mjs` exporta tudo em JSON. Os
  geradores Python montam cada planilha: `estoque.py`, `folha.py`,
  `cobranca.py`, `caixa.py` e `vendas.py`, com estilos comuns em `comum.py`.
- **Conferência.** O `conferir.py` preenche cada planilha já configurada com
  os lançamentos certos, recalcula no LibreOffice e compara com as respostas.
  Divergência é bug, nunca «arredondamento».
- **Pré-requisitos:** Python 3 com `openpyxl`. Para conferir, também o
  LibreOffice com o Calc (`soffice`).
- **Mudou um `dados*.ts`?** Rode os dois comandos de novo e faça o commit das
  `.xlsx` geradas.

## 11. Verificação antes de enviar

| O quê | Comando |
|---|---|
| Tipos | `npx tsc -b --force` |
| Build completo (obrigatório antes de todo push) | `npm run build` |
| Lint | `npm run lint` |
| Capturas em tema claro e escuro | `node scripts/capturar.mjs` (com o dev na porta 5180) |
| Fluxos de prova ponta a ponta | `node scripts/verificar-prova.mjs` |
| Telas em 4 larguras e ordem de tabulação | `node scripts/verificar-telas.mjs` |
| Fórmulas das planilhas | `scripts/planilhas/conferir.py` (ver a seção 10) |

## 12. Deploy e fluxo de trabalho

- **Vercel:** o único projeto deste repositório é o **`portal.`**
  (`portal-microlins.vercel.app`). O projeto antigo duplicado
  (`portal-atividades`) foi desconectado do Git: ignore-o nos status checks.
- **Autor dos commits:** sempre
  `Fernandomanoel <fernandomanoel079@gmail.com>`. O time da Vercel é Hobby e
  não aceita colaboração, então commit de outro autor trava o deploy
  automático.
- **Branch e PR:**
  - a branch de trabalho é `alfred/practical-pascal-s5pzbq`;
  - os PRs são abertos como draft, com resumo e plano de teste;
  - se a branch já foi mergeada, recomece-a a partir da branch principal antes
    de criar commits novos.
- **Servidor físico (alternativa à Vercel):** `npm run build`, depois
  `npm run build:servidor` e por fim `npm run servidor`, com as variáveis de
  ambiente. Detalhes em [`docs/SERVIDOR.md`](SERVIDOR.md).

## 13. Regras que não se quebram

1. **Nomes em português:** variáveis, funções, rotas, tipos e conteúdo.
2. **Comentários** só para explicar uma decisão que não é óbvia.
3. **Ícones** só de `Icone.tsx`. **Nunca emoji como ícone.**
4. **Mudança visual em tela existente** passa pela skill **Impeccable**
   (`PRODUCT.md` + um componente existente como referência).
5. **Os tipos de `src/types/`** sustentam todo o conteúdo. Estendê-los é
   decisão maior, que precisa de confirmação.
6. **Conteúdo trazido do portal antigo** (`Portal-Atividades`) entra no padrão
   daqui, com a mecânica original preservada. Nunca copiar o HTML antigo
   para `public/` e só linkar.
7. **Não mudar `lancarNota` / `LancarNotaInput`** sem pedido explícito: é o
   ponto de «a IA sugere, o instrutor decide».
8. **Não aumentar os 7 dias** de guarda dos envios sem pedido explícito.
9. **Segredos** só em variável de ambiente.
10. **Gabarito** só no servidor: nunca importar `.prova.ts` em `src/`.

## 14. Limites conhecidos

- **Senha da tela de Provas:** é uma trava de interface. A segurança real é o
  login da área do professor.
- **Trava de aba:** denuncia e bloqueia, mas não impede. Nenhum navegador deixa
  um site barrar Alt+Tab ou a tecla Windows.
- **Limite de tentativas de login:** é contado por processo. Na Vercel, cada
  instância conta à parte.
- **Atividades de planilha** simplificam algumas regras, e isso está escrito
  nelas:
  - a falta não desconta o DSR da semana;
  - o custo da folha não inclui o INSS patronal;
  - as tabelas de INSS e IRRF são as de setembro/2025.
- **Passo a Passo:** os tutoriais funcionam só com texto e voz enquanto as
  imagens reais de cada passo não são fornecidas.
- **Saúde:** os 4 cursos ainda não têm atividades corrigidas no portal.
