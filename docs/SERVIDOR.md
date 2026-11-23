# Servidor das provas

O servidor recebe as provas dos alunos, corrige as de múltipla escolha, guarda
os arquivos anexados e atende a área do professor. Os envios são apagados
sozinhos depois de 3 dias.

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
| `UNIDADES` | sim | Lista JSON das unidades: `id`, `nome` e a senha da aba Provas em hash. Gere cada item com `npm run unidade:senha`. O `id` e o `nome` aparecem na lista de unidades da aba Provas; a senha não sai do servidor. |
| `PROFESSORES` | sim | Lista JSON de professores com a senha em hash e a **unidade** (`id` de `UNIDADES`, ou `*` para a coordenação, que vê todas). Gere cada item com `npm run professor:senha`. Professor sem `unidade` (cadastrado antes das unidades) fica na `UNIDADE_PADRAO`; com uma unidade que não existe, não entra. |
| `UNIDADE_PADRAO` | recomendada | `id` da unidade que herda os envios e as listas criados antes de existirem unidades. Sem ela, esses dados só a coordenação vê. |
| `SENHA_CURSO_INGLES` | para usar o Curso de Inglês | Hash scrypt da senha da área «Curso de Inglês» (`/curso-ingles`). Gere com `npm run curso-ingles:senha -- 'a-senha'` e cole só o hash. **Sem a variável a área abre sem senha** (decisão provisória); com ela, a tela de senha volta sozinha, sem mudar código. Trocar a variável troca a senha; os acessos já abertos valem até vencer (12 h). |
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

Com `--lembrete` no fim do comando, o objeto leva também `lembrete`: a senha em texto,
que a área do professor mostra (escondida, com botão Mostrar) a quem esqueceu. Só vai
para professor logado, da própria unidade (a coordenação vê a da unidade escolhida), e
nunca para a lista pública de unidades. É uma troca consciente: quem tem esse login lê
a senha. Sem `lembrete`, nada aparece.

### Usuários criados pela tela (diretoria, coordenação, apoio)

Além dos professores da variável, existe a aba **Usuários** na área do professor. Quem tem a
permissão «Gerenciar usuários» cria logins escolhendo **de quais unidades** a pessoa é (uma, várias
ou todas, inclusive as futuras) e **o que ela acessa**: provas enviadas e correção, conteúdos, listas
(só ver, ou criar e editar) e gerenciar usuários. Eles ficam em `usuarios/<usuario>.json` no
armazenamento, com a senha só em hash; as mudanças valem na hora (desativar derruba o acesso).

- **O primeiro administrador** vem da variável: gere o professor com `--admin`
  (`npm run professor:senha -- fernando "Fernando" 'senha-forte' '*' --admin`) ou acrescente
  `"administrador":true` ao objeto dele em `PROFESSORES`. É só isso que ele ganha a mais.
- Quem cria não libera o que não tem: nem unidade fora do próprio alcance, nem permissão que não possui,
  e não altera quem tem mais acesso do que ele. Ninguém desativa ou apaga o próprio usuário.
- Professores da variável `PROFESSORES` continuam valendo, com as permissões padrão (provas, conteúdos
  e listas), e só mudam pela Vercel.

### Ajustar professores da variável pela tela

Na aba Usuários, o administrador também ajusta os professores da variável `PROFESSORES`: de quais unidades
são, o que acessam (inclusive as abas Módulos, Pacotes e Histórico) e se estão bloqueados. O ajuste fica em
`ajustes/<usuario>.json` e vale na hora, mesmo para quem já está logado; «Voltar ao padrão» apaga o ajuste.
Nome, usuário e senha continuam só na Vercel, e um professor com `"administrador": true` nunca é ajustado
pela tela, para ninguém se trancar do lado de fora.

### Listas compartilhadas entre unidades

Cada lista tem uma **unidade dona** (ou a **rede**, criada por quem alcança todas as unidades) e pode ser
compartilhada com **todas as unidades** ou com **unidades escolhidas**, só para leitura ou também para
edição. A unidade dona sempre edita, compartilha e apaga; quem só recebe vê (ou edita, se liberado), mas
não muda o compartilhamento nem apaga. Quem não alcança a unidade dona nem recebeu a lista não a enxerga.

### Grade, fórmulas e gráficos das listas

A lista é uma grade no estilo planilha: uma lista nova já nasce de A a Z com 100 linhas, e quem precisar de mais acrescenta (limite de 60 colunas e 1000 linhas). Além de texto, opção, caixa de marcação e pessoa, ela tem colunas
**número** (formato número, moeda ou percentual, casas decimais e total no rodapé: soma, média, mínimo,
máximo ou contagem) e **data** (guardada como `yyyy-mm-dd`). Uma célula que começa com `=` é fórmula
(`=SOMA(C1:C10)`, `=SE(B2>3;"alto";"baixo")`, `MÉDIA`, `CONT.SE`, `SOMASE`, `ARRED`, `SEERRO`...; `;` separa
argumentos e `,` é o decimal). As funções também existem em inglês. Endereços contam de A1 na primeira
coluna e primeira linha, e linhas de título de bloco contam como linha. O cálculo roda no navegador
(`src/lib/formulas.ts`, sem `eval`); o servidor só guarda o texto da fórmula e valida o formato.

Cor de fundo, negrito, itálico, alinhamento e bordas são por célula. Dá para mesclar células dentro de um
bloco, fixar até 5 linhas e 3 colunas, e copiar e colar blocos (Ctrl+C e Ctrl+V, também de outra planilha).

Os **gráficos** ficam na própria lista (`graficos`, até 12): colunas, barras, empilhadas, linhas, área,
pizza e rosca, com até 6 séries somadas, em média, contagem, mínimo ou máximo por categoria. Cada um baixa
como PNG, e a exportação `.xlsx` leva as fórmulas reais, os formatos, as mesclagens, as linhas e colunas
fixas e uma segunda aba "Gráficos" com as imagens.

### Pacotes e Módulos (ferramentas vindas do sistema de gestão)

Duas abas da área do professor trazem, no padrão do portal, funções do sistema em `microapp/`. Elas
leem a planilha **no navegador** (`src/lib/lerPlanilha.ts`: `.xlsx`, `.xls` e `.csv`, sem biblioteca):
o arquivo com nomes e telefones dos alunos não é enviado nem guardado no servidor.

- **Pacotes** (`src/lib/pacotes.ts`): com a planilha de agendamentos (colunas Educador, Aluno, Qtd Aula
  Realizada, Qtd Agendamento, Dias Agendamento), calcula o previsto até hoje por aluno e marca Atrasado,
  Em dia (até 1 aula de diferença) ou Adiantado, por grupo Seg/Qua, Ter/Qui e Sábado. Desconta os
  feriados nacionais (sem Carnaval e Corpus Christi) e o dia 5/9. O relatório sai em `.csv`.
- **Módulos** (`src/lib/acompanhamentoModulos.ts`): calculadora que compara parcelas pagas, módulo atual e
  faltas e diz se o aluno está REGULAR, em ATENÇÃO ou PENDENTE, com a conta e a mensagem ao responsável.
- O portal não tem aba de mensagens nem disparo de WhatsApp. O acompanhamento de módulos só abre o link
  `wa.me` (`src/lib/mensagensAlunos.ts`) com a mensagem pronta; quem envia é a pessoa, um aluno por vez.

### Curso de Inglês (área com senha)

Aulas interativas em `/curso-ingles`, separadas das atividades de `/ingles`. O conteúdo (texto, exercícios e
respostas) **não vai no código do site**: mora em `src/data/cursoIngles/<id>.aula.ts`, é carregado só pelo servidor
(registro gerado `servidor/aulas.gerado.ts`, por `scripts/gerar-registro-aulas.mjs` no `dev` e no `build`) e, **quando `SENHA_CURSO_INGLES` existe**, só sai com o
cookie `portal_curso_ingles`, que essa senha libera (HttpOnly, 12 h, vale só para essa área). Sem a variável a área está
aberta (provisório): qualquer pessoa com o endereço lê a aula.
O limite de tentativas é o das outras senhas (10 a cada 10 minutos por IP). Como acrescentar uma aula: `src/data/cursoIngles/COMO-CRIAR-AULA.md`.
Os áudios e as fotos da aula FB11 ficam em sites de terceiros (englishworksheets.net e shutterstock.com), como no original.

### Cota do Vercel Blob (plano gratuito)

O Blob do plano Hobby tem cota mensal: 2 mil operações avançadas (gravar, copiar, **listar**) e 10 mil
simples (ler). Passou disso, a Vercel recusa novas operações até a virada do mês ou até o upgrade, e tudo que
usa o Blob responde «Erro no servidor (código ...)». Para gastar pouco:

- cada gravação e cada listagem é uma operação avançada: a tela de provas enviadas **não** roda mais a
  limpeza ao abrir (só esconde os envios vencidos pela data no caminho; quem apaga é o cron diário das 7h);
- o autosave das listas espera 4 s de pausa antes de gravar (o rascunho fica no navegador nesse intervalo);
- veja o consumo em Vercel > Storage > Blob > Usage, ou em Settings > Usage.

### Digitação (ranking e progresso) e Histórico dos alunos

- **Ranking e progresso dos jogos ficam no navegador** de cada computador (`localStorage`), não no portal: o
  placar de um PC não aparece em outro. As **configurações do instrutor** (link no pé da página `/digitacao`, só abre com a senha da área de
  provas da unidade) zeram os rankings e o progresso *deste* computador; cada jogo também tem o botão «Recomeçar do zero», que apaga só o progresso
  dele. Um ranking único para a turma toda exigiria guardar no servidor, o que gasta operações do Blob.
- **Histórico** (`src/lib/historicoAluno.ts`, permissão `historico`): monta o texto do acompanhamento
  educacional a partir de escolhas (desempenho, dificuldade, personalidade, frequência, comportamento,
  situação do contrato) ou da observação do primeiro dia, com o gênero do texto, outra redação sugerida,
  «Arrumar espaços e pontuação» e troca de gênero de um texto pronto. Roda no navegador; nada é guardado.

### Quando o login ou a lista de unidades não funciona

O servidor confere as variáveis `UNIDADES` e `PROFESSORES` e escreve o problema nos logs (Vercel > Logs,
linhas que começam com `[configuração]`). Os casos que ele reconhece: JSON quebrado, uma variável colada
na outra, professor apontando para uma unidade que não existe em `UNIDADES`, entradas sem `id`, `nome`,
`usuario` ou `senha`. Na aba Provas, a mensagem «Nenhuma unidade foi configurada» passa a dizer o motivo.
Variável alterada só vale depois de um novo deploy.

O login de quem está na variável `PROFESSORES` **não depende do armazenamento**: o administrador nunca o
consulta, e para os demais, se o Blob falhar (ou não estiver ligado ao projeto), vale o acesso padrão e o
erro vai para o log. Já os usuários criados pela tela, os ajustes, as listas e os envios precisam do Blob
(Storage > Blob, ligado ao projeto): sem ele, essas áreas respondem «Erro no servidor (código ...)».

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

Um processo só serve o site e a `/api`. A limpeza dos 3 dias roda ao subir e a
cada 6 horas. Para o servidor voltar sozinho depois de uma queda de energia,
rode por um gerenciador de serviço (systemd, pm2, NSSM no Windows). Faça backup
de `DADOS_DIR` se as notas precisarem durar mais que 3 dias.

### Servidor completo (VPS com Docker)

O `Dockerfile` e o `docker-compose.yml` da raiz sobem o portal e o Caddy (HTTPS
automático) num servidor só, com os dados em volumes e sem depender da Vercel nem do Blob. O passo a passo, com
firewall, backup e o que nunca fazer, está em **`docs/VPS.md`**; `./instalar-vps.sh` cria o `.env` com as
chaves e confere tudo antes de subir.

Depois de mudar qualquer `.prova.ts`, rode os dois builds de novo: o gabarito
entra no servidor no build.

## Rotas

Todas em `/api`. Erro sempre no formato `{ "error": { "code", "message" } }`,
com `message` pronta para mostrar na tela.

| Rota | Quem | O que faz |
|---|---|---|
| `GET /provas/<id>` | público | A prova **sem o gabarito**, para o aluno fazer. |
| `POST /envios` | público | O aluno envia (multipart: `dados` em JSON, incluindo a `ficha` da unidade, + `arquivo`). Sem ficha válida responde 401 `UNIDADE_INVALIDA`. Devolve só nota e acertos. |
| `GET /unidades` | público | As unidades para escolher na aba Provas: `{ dados: [{ id, nome }] }`, em ordem alfabética. Nunca devolve a senha. |
| `POST /unidades/entrar` | público | A unidade escolhida e a senha dela (`{ unidade, senha }`) devolvem `{ unidade, ficha, expiraEm }`. A ficha é assinada e vale 12 horas. Senha errada vale como unidade inexistente: mesma resposta, mesmo tempo. |
| `POST /liberacoes` | público | Confere usuário e senha do professor (e a ficha) para destravar a prova na máquina do aluno. Só libera professor da unidade da ficha, ou a coordenação. |
| `POST /sessao` | público | Login do professor. Cookie `HttpOnly`, `SameSite=Strict`, 12 horas. |
| `GET /sessao` · `DELETE /sessao` | professor | Quem está logado · sair. |
| `GET /envios?provaId=&busca=&unidade=` | professor | Lista, mais novo primeiro, só da unidade do professor (a coordenação vê todas ou escolhe com `unidade=`). Roda a limpeza antes. |
| `GET /envios/<id>` | professor | `{ envio, prova }`, a prova com o gabarito. |
| `PATCH /envios/<id>` | professor | Lança a nota: `{ nota, comentario? }` (0 a 10, uma casa). |
| `DELETE /envios/<id>` | professor | Apaga o envio e o arquivo. |
| `GET /envios/<id>/arquivo` | professor | Baixa o arquivo, com o nome do aluno no nome. |
| `POST /curso-ingles/entrar` · `POST /curso-ingles/sair` | público | Confere a senha do Curso de Inglês e dá o cookie da área (sem a variável, responde `ok` sem cookie) · apaga o cookie. |
| `GET /curso-ingles/aulas` · `GET /curso-ingles/aulas/<id>` | cookie da área (se há senha) | Lista das aulas (`{ dados, comSenha }`) · a aula completa (`{ aula }`). Com senha configurada e sem o cookie: 401. |
| `GET\|POST /limpeza` | agendador ou professor | Apaga o que passou de 3 dias. |
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
- **Nada passa de 3 dias.** O id do envio começa pela data (`2026-09-24_...`) e os
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
