# Servidor das provas

O servidor recebe as provas dos alunos, corrige as de múltipla escolha, guarda
os arquivos anexados e atende a área do professor. Os envios são apagados
sozinhos depois de 7 dias.

É um código só (`servidor/rotas.ts`, no formato `Request → Response` da web)
que roda em três lugares:

| Onde | Entrada | Onde guarda |
|---|---|---|
| Vercel (agora) | `api/index.ts` | Vercel Blob, privado |
| Servidor físico da escola | `servidor/local.ts` | pasta no disco (`DADOS_DIR`) |
| `npm run dev` | plugin `apiLocal` no `vite.config.ts` | `./dados` |

A troca entre Blob e disco é a interface `Armazenamento`
(`servidor/armazenamento.ts`); as rotas não sabem qual das duas estão usando.

## Variáveis de ambiente

| Variável | Obrigatória | O que é |
|---|---|---|
| `UNIDADES` | sim | Lista JSON das unidades: `id`, `nome` e a senha da aba Provas em hash. Gere cada item com `npm run unidade:senha`. Cada unidade precisa de uma senha diferente. |
| `PROFESSORES` | sim | Lista JSON de professores com a senha em hash e a **unidade** (`id` de `UNIDADES`, ou `*` para a coordenação, que vê todas). Gere cada item com `npm run professor:senha`. Professor sem unidade válida não entra. |
| `UNIDADE_PADRAO` | recomendada | `id` da unidade que herda os envios e as listas criados antes de existirem unidades. Sem ela, esses dados só a coordenação vê. |
| `SEGREDO_SESSAO` | sim | Pelo menos 32 caracteres aleatórios. Assina o cookie de sessão; trocar derruba todas as sessões. |
| `BLOB_READ_WRITE_TOKEN` | na Vercel | Criada sozinha quando o Blob é ligado ao projeto. Se a loja for ligada com um prefixo próprio (ex. `provas_READ_WRITE_TOKEN`), o servidor acha essa variável sozinho — não precisa ser exatamente esse nome. |
| `CRON_SECRET` | na Vercel | Autoriza a limpeza diária agendada em `vercel.json`. |
| `LIMITE_ARQUIVO_MB` | não | Tamanho máximo do arquivo da prova. Padrão 4 (na Vercel o corpo da requisição não passa de 4,5 MB). |
| `DADOS_DIR` | não | Servidor físico e dev: pasta dos dados. Padrão `./dados`. |
| `PORTA` | não | Servidor físico: porta. Padrão 8080. |
| `SITE_DIR` | não | Servidor físico: pasta do site. Padrão `dist`. |

No `npm run dev`, as variáveis vêm do `.env.local` (fora do git).

### Adicionar uma unidade

```bash
npm run unidade:senha -- centro "Unidade Centro" "senha-da-aba-provas"
```

A saída é um objeto JSON; `UNIDADES` é a lista desses objetos. O `id` (letras
minúsculas, números e hífen) é o que os professores usam em `unidade`. Trocar a
senha de uma unidade = gerar outro objeto e substituir na variável.

### Adicionar um professor

```bash
npm run professor:senha -- maria "Maria Souza" "uma senha forte" centro
```

A saída é um objeto JSON (o último argumento é o id da unidade do professor, ou `*`).
`PROFESSORES` é a lista desses objetos:

```
PROFESSORES=[{"usuario":"maria","nome":"Maria Souza","unidade":"centro","senha":"scrypt:..."},{...}]
```

Tirar alguém da lista derruba a sessão dele na próxima vez que ele usar a área
(a sessão confere a lista a cada requisição).

## Servidor físico

```bash
npm run build            # site em dist/ (e o registro de provas)
npm run build:servidor   # servidor em dist-servidor/servidor.mjs
PROFESSORES='[...]' SEGREDO_SESSAO='...' DADOS_DIR=/srv/portal-dados npm run servidor
```

Um processo só serve o site e a `/api`. A limpeza dos 7 dias roda ao subir e a
cada 6 horas. Para o servidor voltar sozinho depois de uma queda de energia,
rode por um gerenciador de serviço (systemd, pm2, NSSM no Windows). Faça backup
de `DADOS_DIR` se as notas precisarem durar mais que 7 dias.

Depois de mudar qualquer `.prova.ts`, rode os dois builds de novo: o gabarito
entra no servidor no build.

## Rotas

Todas em `/api`. Erro sempre no formato `{ "error": { "code", "message" } }`,
com `message` pronta para mostrar na tela.

| Rota | Quem | O que faz |
|---|---|---|
| `GET /provas/<id>` | público | A prova **sem o gabarito**, para o aluno fazer. |
| `POST /envios` | público | O aluno envia (multipart: `dados` em JSON, incluindo a `ficha` da unidade, + `arquivo`). Sem ficha válida responde 401 `UNIDADE_INVALIDA`. Devolve só nota e acertos. |
| `POST /unidades/entrar` | público | A senha da aba Provas (`{ senha }`) identifica a unidade e devolve `{ unidade, ficha, expiraEm }`. A ficha é assinada e vale 12 horas. |
| `POST /liberacoes` | público | Confere usuário e senha do professor (e a ficha) para destravar a prova na máquina do aluno. Só libera professor da unidade da ficha, ou a coordenação. |
| `POST /sessao` | público | Login do professor. Cookie `HttpOnly`, `SameSite=Strict`, 12 horas. |
| `GET /sessao` · `DELETE /sessao` | professor | Quem está logado · sair. |
| `GET /envios?provaId=&busca=&unidade=` | professor | Lista, mais novo primeiro, só da unidade do professor (a coordenação vê todas ou escolhe com `unidade=`). Roda a limpeza antes. |
| `GET /envios/<id>` | professor | `{ envio, prova }`, a prova com o gabarito. |
| `PATCH /envios/<id>` | professor | Lança a nota: `{ nota, comentario? }` (0 a 10, uma casa). |
| `DELETE /envios/<id>` | professor | Apaga o envio e o arquivo. |
| `GET /envios/<id>/arquivo` | professor | Baixa o arquivo, com o nome do aluno no nome. |
| `GET\|POST /limpeza` | agendador ou professor | Apaga o que passou de 7 dias. |
| `GET /listas` · `POST /listas` | professor | Listas de acompanhamento: resumo de todas · cria uma (`{ duplicarDe? }` copia outra). |
| `GET /listas/<id>` · `DELETE /listas/<id>` | professor | A lista inteira · apaga para todos. |
| `PUT /listas/<id>` | professor | Grava a lista inteira com a `versao` que a tela abriu. Se outro professor gravou antes, responde 409 com `atual` (a versão dele) em vez de sobrescrever; a tela junta as duas quando mexeram em células diferentes. |

## O que o servidor garante

- **O gabarito não sai do servidor.** O navegador recebe a prova sem `correta`
  e a nota é calculada no servidor. O `.prova.ts` nunca é importado em `src/`.
- **Tudo que chega é revalidado:** nome (3 a 80 letras), número de respostas,
  índice de cada opção, extensão e tamanho do arquivo, arquivo obrigatório.
- **Envio idempotente.** Cada prova aberta gera uma chave; o mesmo envio chegando
  duas vezes (rede oscilou, clique duplo) devolve o recibo do primeiro.
- **Senha em hash** (scrypt), comparação em tempo constante, limite de 10
  tentativas a cada 10 minutos por IP, no login e na liberação.
- **Pedido de outro site é recusado:** cookie `SameSite=Strict` e conferência da
  origem em tudo que não é leitura.
- **Cada unidade só enxerga o que é seu.** O envio nasce com a unidade da ficha
  (a ficha vem da senha da aba Provas e é assinada com `SEGREDO_SESSAO`: não dá
  para trocá-la nem inventá-la). Envio, arquivo, nota e lista de outra unidade
  respondem 404, como se não existissem, em qualquer rota. O professor tem a
  unidade na variável `PROFESSORES`: mudar um professor de unidade vale na
  hora, sem esperar a sessão acabar.
- **Listas de acompanhamento não vencem.** Moram em `listas/`, fora das pastas
  que a limpeza percorre (`envios/`, `arquivos/`, `tentativas/`): ficam até um
  professor apagar. São compartilhadas entre todos os professores, revalidadas
  no servidor (até 60 colunas, 1000 linhas, 500 caracteres por célula) e cada
  gravação registra quem alterou.
- **Nada passa de 7 dias.** O id do envio começa pela data (`2026-09-24_...`) e os
  arquivos ficam em pastas por dia, então a limpeza apaga por idade sem abrir
  nenhum arquivo.

## O que o servidor não garante

- **A trava de aba denuncia, não impede.** Nenhum navegador deixa um site barrar
  Alt+Tab, a tecla Windows ou o celular do aluno. A prova vai para tela cheia e,
  se o aluno sair, trava até o professor liberar. Cada saída fica registrada no
  envio.
- **O nome do aluno é o que ele digitou.** Não existe login de aluno.
- **O limite de tentativas é por processo.** Na Vercel, cada instância da função
  conta à parte; no servidor físico, é um processo só e o limite vale inteiro.
