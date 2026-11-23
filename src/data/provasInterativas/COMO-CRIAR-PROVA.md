# Como criar uma prova

Uma prova é um arquivo `.prova.ts` dentro desta pasta, numa subpasta com o
nome do curso:

```
src/data/provasInterativas/<Curso>/<slug>.prova.ts
```

O caminho sem `.prova.ts` (`Custos/prova-final`) é o **id** da prova: é por
ele que o servidor acha a prova para corrigir e é ele que aparece na área do
professor. Renomear o arquivo depois que houver envios separa os envios
antigos dos novos — escolha o nome antes de aplicar.

Para a prova aparecer na tela de Provas, acrescente uma entrada em
`src/data/provasManifest.ts`, no curso certo:

```ts
Custos: [{ tipo: "quiz", rotulo: "Prova final", caminho: "Custos/prova-final", tamanho: "10 questões" }],
```

Depois de criar ou renomear um `.prova.ts`, rode `npm run dev` ou
`npm run build`: os dois regeneram `servidor/provas.gerado.ts`, a lista de
provas que o servidor conhece.

## Os cinco tipos

### Múltipla escolha — corrigida na hora

O aluno recebe a nota assim que envia. `correta` é o índice da opção certa
(começa em 0).

```ts
import type { ProvaInterativa } from "@/types/quiz";

const prova: ProvaInterativa = {
  titulo: "Custos — Prova final",
  perguntas: [
    {
      pergunta: "O que é custo fixo?",
      opcoes: ["Varia com a produção", "Não varia com a produção", "É sempre imposto"],
      correta: 1,
    },
  ],
};

export default prova;
```

### Descritiva — o professor corrige

```ts
const prova: ProvaInterativa = {
  tipo: "descritiva",
  titulo: "Atendimento — Estudo de caso",
  perguntas: ["Descreva como você trataria um cliente que chegou irritado."],
};
```

### Prática — o aluno faz num programa e envia o arquivo

Sem perguntas na tela: só as instruções, o material de apoio (opcional) e o
campo de arquivo, que aqui é obrigatório no tipo.

```ts
const prova: ProvaInterativa = {
  tipo: "pratica",
  titulo: "Excel — Prova prática",
  instrucoes: ["Abra a planilha de dados.", "Calcule o total de cada linha com SOMA.", "Salve e envie."],
  material: { rotulo: "Planilha de dados", url: "/provas/excel/dados.xlsx" },
  envioArquivo: { obrigatorio: true, extensoes: [".xlsx"], rotulo: "Envie a planilha com as fórmulas" },
};
```

### Mista — múltipla escolha + dissertativa autocorrigida, no mesmo formulário

Pensada para provas que hoje são só múltipla escolha ficarem mais ricas sem
virar 100% manual: cada `pergunta` do array escolhe seu próprio formato.
Continua **toda autocorrigida** — a diferença é que uma dissertativa sem
correspondência não vira "errada" na hora, ela fica **a revisar** até o
professor conferir (ver `src/lib/correcaoTexto.ts`: a comparação ignora
maiúsculas, acentos e espaço extra, e conta como certa se a resposta do
aluno **contiver** alguma das `respostasAceitas`).

```ts
const prova: ProvaInterativa = {
  tipo: "mista",
  titulo: "Custos — Prova final",
  perguntas: [
    {
      pergunta: "O que é custo fixo?",
      opcoes: ["Varia com a produção", "Não varia com a produção", "É sempre imposto"],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "Dê um exemplo de custo fixo numa fábrica.",
      // Várias formas aceitas da mesma resposta certa — nunca só uma.
      respostasAceitas: ["aluguel", "salário", "depreciação"],
    },
  ],
};
```

Se nenhuma dissertativa ficar "a revisar" no envio, a nota sai automática na
hora, igual à múltipla escolha pura. Se alguma ficar, a nota do envio some
(`null`) até o professor lançar — o aluno vê uma mensagem avisando que o
professor vai conferir e pode ajustar a nota.

Nesse caso o aluno também vê a nota provisória (contando a(s) dissertativa(s)
pendente(s) como errada) e pode **aceitar esse resultado na hora**, em vez de
esperar o professor: `POST /api/envios/<id>/aceitar`, público, mas só funciona
enquanto a nota estiver mesmo pendente (nota `null` e `aRevisar > 0`) —
tentar de novo depois de já lançada dá erro. A tela pede confirmação em dois
passos antes de mandar, porque é definitivo: uma vez aceito, essa parte não
volta a ficar disponível para o professor revisar. **`respostasAceitas` é
gabarito**: nunca vaza pro navegador do aluno (o servidor tira antes de
entregar a prova), só a área do professor vê a lista completa.

### Autocorrigida — "Testar resposta", com 3 tentativas por questão

Para provas que vieram de página interativa (IA, Google Ads, JavaScript): cada
**item** é uma questão com 1+ **campos**, e ele só conta como certo se todos os
campos estiverem certos. O aluno clica em "Testar resposta", o servidor confere
e mostra onde errou; ele ajusta e testa de novo, mas só tem
`TENTATIVAS_POR_QUESTAO` (3) testes por questão — o servidor conta, então
recarregar a página não dá tentativa a mais. Acertou ou gastou as tentativas, a
resposta trava. No envio, cada questão vale pela **última resposta testada**
(a que não foi testada vale pela resposta escrita) e a nota é
`acertos ÷ questões × 10`. A área do professor mostra quantas tentativas cada
questão gastou. A prova é travada como qualquer outra que não seja
prática: ao entrar, o aluno não sai da tela.

```ts
const prova: ProvaInterativa = {
  tipo: "autocorrigida",
  titulo: "Prova de JavaScript",
  introducao: "Escreva o código e use “Testar resposta”.",
  itens: [
    {
      titulo: "Questão 1: Soma",
      enunciado: "Crie uma função calcular(a, b) que retorne a soma.",
      exemplo: { rotulo: "Exemplo de chamada", conteudo: "calcular(5, 3); // 8" },
      campos: [
        {
          id: "codigo",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [{ descricao: "Função calcular com 2 parâmetros", padrao: String.raw`function\s+calcular\s*\(\s*\w+\s*,\s*\w+\s*\)` }],
          },
        },
      ],
      mensagemCerta: "Excelente!",
      mensagemErrada: "Use function com return e +",
    },
  ],
};
```

Tipos de `regra` de cada campo: `selecao` (lista suspensa, `esperado` é o
`valor` da opção), `multipla_escolha` (`correta` é o índice), `marcar`
(caixas; `corretas` são os índices), `numero` (`esperado` e `tolerancia`),
`texto` (`minPalavras`, `minCaracteres`, `palavrasChave` como fonte de RegExp) e
`codigo` (`verificacoes`: expressões regulares aplicadas ao código **sem
comentários**; o código do aluno nunca é executado). Os campos que mostram
resultado por linha (`rotulo`, `mensagemCerta`, `mensagemErrada`) valem por campo
e por item. O gabarito (`regra`, mensagens) fica no servidor: o navegador só
recebe o tipo de entrada de cada campo.

Cada item aceita também uma **figura** (`imagem: { url, alt, legenda }`, arquivo em
`public/provas/<curso>/`, como as notas fiscais de Contabilidade e o fluxograma de
Lógica) e um **vídeo** (`video: { titulo, url, legenda }` com um mp4/webm em
`public/provas/<curso>/`, ou `video: { titulo, youtube: "<id>" }` com o id do
YouTube, a parte depois de `v=`). O aluno vê a figura ou o vídeo antes de responder.
Ilustrações novas saem do kit: `npm run ilustracoes -- <filtro>` (ver
`scripts/ilustracoes/README.md`; use `saida` para gravar em `public/`).

Para portar uma página interativa de Portal-Atividades, mantenha os mesmos
módulos, ordem, gabarito, mensagens e palavras-chave — só o suporte muda.
Exemplos: `JavaScript/prova-javascript-testes-automatizados`,
`Inteligência Artificial/avaliacao-ia-engenharia-prompts-llms`.

### Áudio na pergunta — provas de inglês (listening)

Em múltipla escolha e mista, qualquer pergunta aceita `audio: { texto }`: o
texto que o professor escreve **aqui, na criação da prova**, lido em inglês pela
voz do navegador ("Ouvir" e "Devagar"). Na aplicação, o aluno só ouve: o texto
não aparece e não pode ser escrito nem mudado. Use a `mista`, não a
`autocorrigida` — com 3 testes por questão a múltipla escolha entrega a resposta.

```ts
{
  pergunta: "Quantos anos tem a irmã do Lucas?",
  audio: { texto: "Teacher: How old are you, Lucas? Lucas: I am fifteen. Teacher: And your sister? Lucas: She is twelve." },
  opcoes: ["10 anos", "12 anos", "15 anos"],
  correta: 1,
},
```

Cada áudio tem **no máximo 2 minutos** (`SEGUNDOS_MAX_AUDIO`, estimado a ~110
palavras por minuto): texto mais longo faz `npm run dev`/`npm run build` parar
com o nome da prova e da questão. Nos diálogos, o nome antes dos dois-pontos é
lido e marca quem fala. Exemplo: `Inglês/listening-iniciante-1`, listada em
`PROVAS_INGLES` (`src/data/ingles.ts`), que aparece em Inglês → Provas.

## Regras que valem para qualquer tipo

### Envio de arquivo — `envioArquivo`

Sem o campo, a prova não pede arquivo. Com ele:

| Campo         | O que faz                                                        |
| ------------- | ---------------------------------------------------------------- |
| `obrigatorio` | `true`: o botão de enviar só libera com o arquivo anexado.       |
| `extensoes`   | Com ponto e em minúsculas: `[".xlsx", ".xls"]`.                  |
| `rotulo`      | Texto acima do campo. Sem ele, "Arquivo da prova".               |

O arquivo tem limite de 4 MB (limite de upload da Vercel). Numa prova de
múltipla escolha com arquivo, a nota automática sai na hora e o arquivo fica
para o professor conferir.

### Trava de aba — `permiteSairDaAba`

Por padrão, múltipla escolha e descritiva são **travadas**: depois que o
aluno digita o nome, a prova abre em tela cheia e, se ele sair dela, trocar de
aba ou de janela, a tela bloqueia até um professor digitar usuário e senha.
Cada saída fica registrada no envio (hora, motivo, quem liberou).

Prova prática já nasce **destravada**, porque o aluno precisa do outro
programa. Para mudar o padrão:

```ts
permiteSairDaAba: true,  // prova de IA: o aluno usa outras abas
permiteSairDaAba: false, // prova prática que mesmo assim deve travar
```

Nenhum navegador impede de verdade o Alt+Tab ou a tecla Windows: a trava não
impede a saída, ela a denuncia e bloqueia a prova até o professor liberar.

## O que não fazer

- Não importar a prova em nenhum arquivo de `src/`. Quem carrega é o
  servidor (pelo registro gerado), que entrega ao aluno a prova **sem o
  gabarito** e corrige ele mesmo. Importada no navegador, a resposta certa
  iria junto no JavaScript.
- No `.prova.ts`, só `import type`. O arquivo roda no servidor, onde o atalho
  `@/` não existe; import de tipo some na compilação, import de valor quebra.
- Não inventar prova sem fonte. Sem conteúdo real, não crie o arquivo — a
  tela de Provas já mostra "Em breve".
