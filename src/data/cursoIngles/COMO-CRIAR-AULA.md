# Como acrescentar uma aula ao Curso de Inglês

Uma aula é **um arquivo de dados**: `src/data/cursoIngles/<id>.aula.ts`, com `export default` de um `AulaIngles`
(`src/types/aulaIngles.ts`). A lista em `/curso-ingles`, a rota `/curso-ingles/<id>` e o servidor passam a enxergá-la
sozinhos (o registro `servidor/aulas.gerado.ts` é refeito por `npm run dev` e `npm run build`).

**Regras**
- **Nunca importe um `.aula.ts` em `src/`.** Quem carrega é o servidor, que só entrega depois da senha
  (`SENHA_CURSO_INGLES`). Um import no front poria a matéria e as respostas no código público do site.
- O `id` do arquivo usa letras minúsculas, números e hífen (`fb12-assunto`).
- Nenhum emoji: ícones vêm de `src/components/Icone.tsx`.
- Texto vindo de um HTML entra **sem alterar o conteúdo**. Mantenha os créditos do autor em `creditos`.

**Molde**
```ts
import type { AulaIngles } from "@/types/aulaIngles";

const aula: AulaIngles = {
  id: "fb12-assunto",
  codigo: "FB12",
  titulo: "TÍTULO DA AULA",
  rotuloTopo: "Interactive Lesson",
  rotuloMenu: "Course Outline",
  rotuloProgresso: "Lesson Progress",
  rotulosNavegacao: { anterior: "Previous", proximo: "Next", passo: "Step {n} of {total} · {rotulo}" },
  passos: [
    { id: "warm-up", modulo: "1. Warm up", rotulo: "1. Warm up", blocos: [{ tipo: "cabecalho", etiqueta: "Module 1", titulo: "1. Warm Up" }] },
  ],
  creditos: ["{b:© ano autor. All rights reserved.}"],
};

export default aula;
```

**Blocos disponíveis** (campo `tipo`; os campos de cada um estão em `BlocoAula`): `heroi`, `cabecalho`, `perguntas-livres`,
`mapa-corpo`, `flashcards`, `destaque-regra`, `ligar-causas`, `escolher-lacuna`, `link-passo`, `lista-ouvir`, `caixa-regra`,
`cartao-exemplos`, `dica`, `dica-contraste`, `ponte`, `aviso`, `pares-transformacao`, `cartao`, `lacunas-texto`,
`verdadeiro-falso`, `combinar-frases`, `escrita-guiada`, `deck-audio`, `dialogos-lacunas`, `nuvem-e-cartas`, `casos-escrita`.
Uma mecânica nova pede um bloco novo (tipo em `aulaIngles.ts`, componente em `src/components/cursoIngles/` e um `case`
em `BlocoAula.tsx`), e a confirmação de quem decide o formato.

**Marcação em texto** (`TextoAula`): `{b:negrito}` `{i:itálico}` `{u:negrito sublinhado}` `{dest:destaque}` `{pos:should}`
`{neg:shouldn't}` `{wh:which}` `{sim:...}` `{alerta:...}` `{chip:palavra}` `{dica:palavra|tradução}` `{link:texto|url}`.
Um objeto `{ en, pt }` vira o texto que o botão «ME EXPLIQUE EM PORTUGUÊS» alterna (use `traducao: true` no `cabecalho`).

**Fala:** cada texto com botão de som leva a fala em inglês (`fala`), que pode diferir do texto mostrado.

**Conferir antes do commit:** `npx tsc -b --force`, `npm run build`, e abrir a aula no navegador (a senha vem de `SENHA_CURSO_INGLES`
no `.env.local`).
