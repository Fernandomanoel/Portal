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
| `PROFESSORES` | sim | Lista JSON de professores com a senha em hash. Gere cada item com `npm run professor:senha`. |
| `SEGREDO_SESSAO` | sim | Pelo menos 32 caracteres aleatórios. Assina o cookie de sessão; trocar derruba todas as sessões. |
| `BLOB_READ_WRITE_TOKEN` | na Vercel | Criada sozinha quando o Blob é ligado ao projeto. Se a loja for ligada com um prefixo próprio (ex. `provas_READ_WRITE_TOKEN`), o servidor acha essa variável sozinho — não precisa ser exatamente esse nome. |
| `CRON_SECRET` | na Vercel | Autoriza a limpeza diária agendada em `vercel.json`. |
| `LIMITE_ARQUIVO_MB` | não | Tamanho máximo do arquivo da prova. Padrão 4 (na Vercel o corpo da requisição não passa de 4,5 MB). |
| `DADOS_DIR` | não | Servidor físico e dev: pasta dos dados. Padrão `./dados`. |
| `PORTA` | não | Servidor físico: porta. Padrão 8080. |
| `SITE_DIR` | não | Servidor físico: pasta do site. Padrão `dist`. |

No `npm run dev`, as variáveis vêm do `.env.local` (fora do git).

### Adicionar um professor

```bash
npm run professor:senha -- maria "Maria Souza" "uma senha forte"
```

A saída é um objeto JSON. `PROFESSORES` é a lista desses objetos:

```
PROFESSORES=[{"usuario":"maria","nome":"Maria Souza","senha":"scrypt:..."},{...}]
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
| `POST /envios` | público | O aluno envia (multipart: `dados` em JSON + `arquivo`). Devolve só nota e acertos. |
| `POST /liberacoes` | público | Confere usuário e senha do professor para destravar a prova na máquina do aluno. |
| `POST /sessao` | público | Login do professor. Cookie `HttpOnly`, `SameSite=Strict`, 12 horas. |
| `GET /sessao` · `DELETE /sessao` | professor | Quem está logado · sair. |
| `GET /envios?provaId=&busca=` | professor | Lista, mais novo primeiro. Roda a limpeza antes. |
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
