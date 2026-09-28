# Como fornecer material de um curso

Todo material de apoio de um curso (`Curso.materiais`, em `src/data/atividades.ts`)
é um objeto `Material` (`src/types/curso.ts`), renderizado pela mesma tela
para todos os cursos (`ListaMateriais` → `AtividadePage`). Adicionar material
é **acrescentar um objeto**, nunca criar tela nova.

## A regra central: arquivo baixa, link abre

```ts
export type TipoMaterial = "pdf" | "doc" | "planilha" | "slides" | "video" | "imagem" | "link";

export interface Material {
  titulo: string;
  descricao?: string;
  tipo: TipoMaterial;
  arquivo?: string; // tudo que não é "link"
  url?: string;     // só "link"
}
```

Os sete tipos caem em dois grupos, e a tela trata cada grupo de um jeito —
**escolher o tipo errado quebra o comportamento**, mesmo que o arquivo abra:

| Grupo | Tipos | Campo | O que acontece ao clicar |
|---|---|---|---|
| Arquivo do portal | `pdf`, `doc`, `planilha`, `slides`, `video`, `imagem` | `arquivo` | **Baixa na hora**, sem sair da aba da atividade. |
| Externo | `link` | `url` | Abre em **nova aba** — é para site de terceiro ou página HTML autocontida, não para arquivo binário. |

Isso é o bug que gerou este guia: um vídeo (`.mp4`) e uma foto (`.jpg`)
tinham sido cadastrados como `tipo: "link"` porque na hora não existia
`tipo: "video"`/`"imagem"`. Resultado: em vez de baixar, o navegador tentava
tocar o vídeo ou abrir a imagem numa aba nova — o aluno não conseguia levar
o arquivo para o programa que devia usar. **Nunca cadastre arquivo binário
(vídeo, imagem, `.pptx`, `.zip`, o que for) como `"link"`.** `"link"` é só
para endereço de outro site ou para uma página HTML que já é uma atividade
completa em si (ver `atividadesAutocorrigidas/COMO-CRIAR-ATIVIDADE.md`).

## Passo a passo

1. Coloque o arquivo em `public/atividades/<slug-do-curso>/<nome>.<ext>`.
   Nunca em `src/assets/` — isso é só para o que é `import`ado direto no
   código.
2. Acrescente um objeto em `materiais` no curso certo, em `src/data/atividades.ts`:

   ```ts
   {
     titulo: "Vídeo de prática — tartaruga no computador",
     descricao: "Vídeo curto usado na Avaliação Prática. Baixe e insira no slide.",
     tipo: "video",
     arquivo: "/atividades/powerpoint/tartaruga-no-computador.mp4",
   }
   ```

3. Escolha `tipo` pelo que o arquivo **é**, não pelo programa que abre ele:
   `pdf` (apostila, enunciado), `doc` (Word), `planilha` (Excel), `slides`
   (PowerPoint/Canva exportado), `video` (`.mp4`, `.mov`, `.webm` — material
   para o aluno baixar e usar, não um vídeo explicativo incorporado na
   tela), `imagem` (foto ou imagem de apoio para o exercício).
4. Só use `link` + `url` quando for **mesmo** um endereço de fora do
   portal (site de terceiro, documentação oficial) ou uma página HTML
   autocontida servida pelo próprio portal — nesses dois casos abrir em
   nova aba é o comportamento certo.
5. Rode `npm run build` — se `tipo` estiver escrito errado ou faltar o
   campo certo (`arquivo` vs `url`), o TypeScript já acusa.

## O que não fazer

- Não usar `url` num material que não seja `tipo: "link"`, nem `arquivo`
  num `tipo: "link"` — o tipo já decide qual campo a tela lê.
- Não inventar um tipo novo (`"audio"`, `"zip"`...) sem necessidade real:
  se o arquivo já cai em `doc`/`planilha`/`slides`/`pdf`/`video`/`imagem`,
  use o que existe. Precisando mesmo de um tipo novo, é decisão para
  confirmar com o usuário — estender `TipoMaterial` implica mexer em
  `ListaMateriais.tsx` (mapas `ICONE`/`ROTULO`) e em `Icone.tsx` (ícone
  novo, nunca emoji).
- Não inventar material sem arquivo real — sem o arquivo (nem no repo
  antigo, nem enviado pelo usuário), não crie a entrada; a tela já mostra
  "Nenhum material neste curso ainda" quando a lista está vazia.
