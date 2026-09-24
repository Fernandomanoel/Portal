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

## Os três tipos

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
