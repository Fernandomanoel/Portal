# Contrato da API

> **O servidor que existe hoje está em [`SERVIDOR.md`](SERVIDOR.md).** Ele é
> mais simples que este contrato (sessão por cookie em vez de JWT, sem
> "aplicações" com código, rotas em `/api` sem versão) e cobre o que as provas
> precisam agora. Este documento continua sendo o desenho de longo prazo.

Base: `https://<dominio-da-api>/api/v1`

Todo corpo é JSON UTF-8. Todo campo de resposta é camelCase. Recursos são
substantivos no plural, sem verbo na URL. A linguagem é a do produto: os nomes
dos recursos e campos são em português, como o resto do código.

O prefixo de versão existe desde o começo. Mudança que quebra consumidor entra
como `/api/v2`, não como campo alterado em `/api/v1`. Campo novo é sempre
opcional.

---

## Autenticação

O portal tem **um** tipo de conta: instrutor. Aluno não faz login — ele responde
a prova pelo código de aplicação que o instrutor abre (ver *Aplicações*).

### `POST /sessoes`

Cria uma sessão. Público, com limite de tentativas.

```jsonc
// requisição
{ "email": "instrutor@escola.com", "senha": "..." }

// 201
{
  "accessToken": "eyJhbGciOi...",
  "expiraEm": 900,                    // segundos; 15 minutos
  "instrutor": { "id": "ins_7Yc2", "nome": "Fernando", "email": "..." }
}
```

O **refresh token não vai no corpo**. Ele volta como cookie `HttpOnly`,
`Secure`, `SameSite=None`, `Path=/api/v1/sessoes/renovacao`. `SameSite=None` é
necessário porque o frontend na Vercel e a API estão em origens diferentes; o
escopo estreito de `Path` limita a exposição.

O `accessToken` é guardado **só em memória** pelo frontend — nunca em
`localStorage`. Um XSS que consiga ler storage não leva a sessão junto.

Erros: `422` payload inválido · `401` credenciais incorretas (mensagem idêntica
para e-mail inexistente e senha errada, para não revelar quais contas existem)
· `429` com `Retry-After` após tentativas repetidas.

### `POST /sessoes/renovacao`

Troca o refresh token por um novo par. Autentica pelo cookie, não pelo
`Authorization`.

O refresh token é **rotacionado** a cada uso: o antigo é invalidado na mesma
transação em que o novo é emitido. Se um token já usado reaparecer, a família
inteira de tokens daquela sessão é revogada — é o sinal de que alguém copiou o
cookie.

Este é o único endpoint autenticado por cookie, então é o único com superfície
de CSRF. O servidor confere o header `Origin` contra a origem permitida e
recusa qualquer outra com `403`. Como o CORS já é restrito a uma origem, essa
checagem é suficiente e evita carregar um token anti-CSRF.

Erros: `401` refresh ausente, expirado ou já usado · `403` origem não permitida.

### `DELETE /sessoes/atual`

Encerra a sessão: revoga o refresh e limpa o cookie. Idempotente — encerrar uma
sessão já encerrada devolve `204`.

### Requisições autenticadas

`Authorization: Bearer <accessToken>`.

A API valida a assinatura e a expiração **antes de tocar no banco**. Sem token
válido, nenhum dado privado sai — nem em endpoint de leitura.

Erros: `401` token ausente, inválido ou expirado · `403` autenticado mas sem
permissão sobre aquele recurso.

---

## Formato de erro

Uma forma só, em todo endpoint:

```jsonc
{
  "error": {
    "code": "VALIDATION_ERROR",      // legível por máquina, UPPER_SNAKE
    "message": "A nota precisa estar entre 0 e 10.",  // legível por humano
    "details": { "nota": "fora do intervalo" }        // opcional
  }
}
```

| Status | Quando |
|---|---|
| `400` | Requisição malformada (JSON inválido, header obrigatório ausente) |
| `401` | Não autenticado |
| `403` | Autenticado, mas sem permissão — ou origem não permitida |
| `404` | Recurso não existe, ou existe e não é deste instrutor |
| `409` | Conflito: submissão em andamento com a mesma chave, aplicação já encerrada |
| `422` | Semanticamente inválido (campo fora do intervalo, tipo errado) |
| `429` | Limite de tentativas; acompanha `Retry-After` |
| `500` | Erro do servidor. **Nunca** expõe stack trace, SQL ou caminho de arquivo |

`404` em vez de `403` para recurso de outro instrutor é deliberado: responder
`403` confirmaria que aquele id existe.

---

## Paginação

Toda lista é paginada, desde o primeiro dia.

```
GET /provas?pagina=1&porPagina=20&ordenarPor=criadaEm&ordem=desc
```

```jsonc
{
  "dados": [ /* ... */ ],
  "paginacao": { "pagina": 1, "porPagina": 20, "totalItens": 142, "totalPaginas": 8 }
}
```

`porPagina` aceita 1–100, padrão 20. Valor fora do intervalo é `422`, não um
silencioso "ajustamos pra você".

---

## Provas

Uma prova é o modelo: título, tipo e questões. Ela não é respondida
diretamente — o que o aluno responde é uma *aplicação* dela.

### `GET /provas` — instrutor

Filtros: `curso`, `tipo` (`MULTIPLA_ESCOLHA` | `DESCRITIVA`), `busca` (casa
título e curso, sem acento e sem diferenciar maiúscula).

```jsonc
{
  "dados": [
    {
      "id": "prv_3Kd9",
      "titulo": "Windows 11 — Organização de pastas",
      "curso": "Windows 11",
      "tipo": "MULTIPLA_ESCOLHA",
      "totalQuestoes": 10,
      "criadaEm": "2026-09-14T13:02:00Z"
    }
  ],
  "paginacao": { /* ... */ }
}
```

### `GET /provas/:id` — instrutor

O mesmo objeto acima **mais** as questões, aí sim com o gabarito, porque quem
está lendo é o instrutor.

---

## Aplicações

Uma aplicação é uma prova aberta para uma turma, num dia. É o que dá um
endereço para o aluno e o que amarra as submissões.

### `POST /provas/:id/aplicacoes` — instrutor

```jsonc
// requisição
{ "turma": "Informática — noite", "encerraEm": "2026-09-21T22:00:00Z" }

// 201
{
  "id": "apl_8Qm4",
  "codigo": "K7M2P9",              // curto, o aluno digita; único enquanto aberta
  "provaId": "prv_3Kd9",
  "turma": "Informática — noite",
  "status": "ABERTA",
  "abertaEm": "2026-09-21T19:30:00Z",
  "encerraEm": "2026-09-21T22:00:00Z"
}
```

`encerraEm` é opcional. Sem ele, a aplicação fica aberta até o instrutor
encerrar.

### `GET /aplicacoes/:codigo` — público

O que o aluno recebe ao abrir a prova. **Sem gabarito.**

```jsonc
{
  "codigo": "K7M2P9",
  "status": "ABERTA",
  "prova": {
    "titulo": "Windows 11 — Organização de pastas",
    "tipo": "MULTIPLA_ESCOLHA",
    "questoes": [
      { "numero": 1, "enunciado": "Qual atalho cria uma pasta nova?",
        "opcoes": ["Ctrl + Shift + N", "Ctrl + N", "Alt + N", "Ctrl + Alt + P"] }
    ]
  }
}
```

O campo `correta` **não existe** nesta resposta. No portal antigo a correção
acontecia no navegador, então o gabarito era baixado junto com a prova e estava
a um Ctrl+U de distância. Aqui ele nunca sai do servidor.

Para prova descritiva, `questoes` traz só `numero` e `enunciado`.

Erros: `404` código inexistente · `409` aplicação encerrada, com
`code: "APLICACAO_ENCERRADA"`.

### `PATCH /aplicacoes/:id` — instrutor

Atualização parcial. Só `status` e `encerraEm` são editáveis.

```jsonc
{ "status": "ENCERRADA" }
```

---

## Submissões

### `POST /aplicacoes/:codigo/submissoes` — público

O envio do aluno. **Exige o header `Idempotency-Key`.**

```jsonc
// requisição
{
  "nomeAluno": "Maria Souza",
  "respostas": [
    { "numero": 1, "opcao": 0 },     // múltipla escolha: índice da opção
    { "numero": 2, "opcao": 3 }
  ]
}
// descritiva: { "numero": 1, "texto": "..." }
```

Resposta `201`:

```jsonc
{
  "id": "sub_5Rt1",
  "status": "CORRIGIDA",            // múltipla escolha corrige na hora
  "nota": 6.7,
  "acertos": 2,
  "totalQuestoes": 3,
  "enviadaEm": "2026-09-21T20:14:03Z"
}
```

Para descritiva, `status` é `AGUARDANDO_CORRECAO` e `nota` vem `null` — quem
lança é o instrutor.

#### A chave de idempotência

`Idempotency-Key` é obrigatório, não opcional. Envio de prova é a operação que
o aluno mais tende a repetir: a rede do laboratório oscila, ele não vê resposta,
clica de novo. Sem chave, isso vira duas submissões e o instrutor corrige a
mesma prova duas vezes.

Regras que o servidor garante:

- A chave é **gerada uma vez pelo cliente, por intenção de envio**, e reusada em
  toda retentativa. Um UUID novo a cada clique não é chave de idempotência — é
  um identificador de tentativa, e derruba a garantia inteira.
- A chave é reivindicada **numa operação atômica**, apoiada numa constraint
  `UNIQUE`. Um `SELECT` seguido de `INSERT` é corrida, não guarda: dois envios
  simultâneos leem "não existe" e ambos gravam.
- A chave é escopada à aplicação. A mesma chave em aplicações diferentes são
  intenções diferentes.
- **Mesma chave com corpo diferente falha alto**: `422`,
  `code: "IDEMPOTENCY_KEY_REUSADA"`. Devolver a primeira resposta para um corpo
  diferente esconde um bug do cliente.
- **Duplicata em andamento** (a primeira ainda processando) recebe `409` com
  `Retry-After`. O segundo pedido nunca passa porque o primeiro "parece
  travado" — é exatamente aí que duplicar custa caro.
- Retenção: **90 dias**, não 24 horas. A janela precisa sobreviver ao caminho
  mais longo que consegue re-entregar o mesmo envio.

Repetir o envio com a mesma chave e o mesmo corpo devolve `200` com a submissão
original — não cria outra, não recorrige, não muda a nota.

#### Envio único

Regra de produto, independente da idempotência: um aluno envia **uma vez** por
aplicação. Reenvio com chave nova depois de já ter enviado recebe `409`,
`code: "JA_ENVIADA"`.

No portal antigo essa trava era `localStorage`, então valia por navegador, não
por aluno — trocar de máquina ou limpar o navegador contornava. Aqui ela vale de
verdade.

### `GET /submissoes` — instrutor

Filtros: `aplicacaoId`, `status`, `busca` (nome do aluno). Ordenação padrão:
mais antiga primeiro, porque a fila de correção se trabalha pela ponta.

### `GET /submissoes/:id` — instrutor

A submissão com as respostas e, em prova de múltipla escolha, o que era o
esperado em cada questão.

### `PATCH /submissoes/:id` — instrutor

Lança ou corrige a nota de uma prova descritiva.

```jsonc
{ "nota": 8.5, "comentario": "Faltou citar o passo do sumário." }
```

`nota` é **número**, 0 a 10, com até uma casa decimal. A vírgula que o instrutor
digita é problema da interface, não do contrato — o frontend converte antes de
enviar. Fora do intervalo: `422`.

`comentario` é opcional.

Lançar nota em submissão de múltipla escolha é `422`,
`code: "NOTA_AUTOMATICA"` — ela já foi corrigida pelo servidor.

---

## O que o servidor garante

- **Nenhuma concatenação em SQL.** PDO com prepared statements em toda query,
  sem exceção.
- **Todo payload é revalidado no PHP**, campo a campo, antes de qualquer uso.
  Tipo, intervalo, tamanho e formato. O tipo do TypeScript não atravessa a rede.
- **Validação só na borda.** Depois que o payload passou, o código interno
  confia nos próprios tipos em vez de revalidar a cada camada.
- **CORS com uma origem**, a oficial do frontend. Sem `*`, sem lista que cresce
  sozinha. Preflight responde só os métodos e headers que a API realmente usa.
- **HTTPS obrigatório**, com HSTS. Requisição em HTTP é redirecionada, não
  atendida.
- **Erro de servidor não vaza detalhe interno.** O `500` carrega um id de
  correlação; o resto vai para o log.

---

## Fora deste contrato

Autenticação de aluno. Não existe conta de aluno no produto, e a aplicação com
código cobre o caso sem inventar uma. Se um dia passar a existir, entra como
recurso novo — não como mudança nos endpoints acima.
