# Molde de Atividades — criar rápido, sempre no padrão

## Problema

Como permitir que qualquer professor crie uma atividade nova (texto +
imagens) copiando uma pronta e trocando só o conteúdo — em ~15 minutos, sem
alterar o código do portal, sem inchar o site e sem sair do padrão?

## Direção escolhida

**Agora, só o urgente: o kit de ilustração dentro do projeto.** As
ilustrações do Windows 11 eram geradas por scripts que existiam só numa
sessão temporária; sem eles, ninguém mais faria ilustrações no mesmo estilo.
O kit está em `scripts/ilustracoes/` (JavaScript, como os demais scripts do
projeto), com as peças prontas e as telas atuais como exemplo, e roda com
`npm run ilustracoes`.

O resto do molde já atende a demanda atual (baixa e pontual): o tipo
`AtividadeAutocorrigida` (passos, imagem, desafio, atenção, objetivo,
regras), o guia `src/data/atividadesAutocorrigidas/COMO-CRIAR-ATIVIDADE.md`
e as atividades de Windows 11 como exemplos para copiar.

**Imagem padrão: print do professor** (Windows + Shift + S). O kit fica para
casos especiais — destacar algo ou telas difíceis/arriscadas de capturar.

## Suposições a validar

- [ ] Um professor monta uma atividade em ~15 min copiando uma pronta — teste:
      pedir uma atividade de outro curso (ex.: Excel) e cronometrar.
- [ ] Prints dos professores resolvem a maioria dos casos — teste: na primeira
      atividade feita por um professor, contar quantas imagens precisaram do kit.
- [ ] Alguém técnico usa o kit sem ajuda — teste: gerar uma tela nova só pelo
      `scripts/ilustracoes/README.md`.

## Feito agora

- Kit de ilustração em `scripts/ilustracoes/` + `npm run ilustracoes`.
- Seção de imagens no `COMO-CRIAR-ATIVIDADE.md` (print por padrão, kit para
  casos especiais).
- Nenhuma mudança em carregamento, catálogo ou tipo das atividades.

## Não fazer agora (e por quê)

- **Título só no catálogo** — elimina a duplicação título/descrição entre o
  arquivo da atividade e `src/data/atividades.ts`; vale quando houver volume
  de criação.
- **Imagem pelo nome** (`imagem: "arquivo.svg"` em vez de `import`) — economiza
  4–8 linhas por atividade; poucas atividades hoje.
- **Verificação automática** (`npm run verificar-atividades` no build:
  objetivo, `alt`, emoji, imagem inexistente, atividade fora do catálogo) —
  barata e útil; **primeira da fila** quando mais gente criar atividades.
- **Arquivo único por atividade** — faria o portal baixar todas as ~50
  atividades de uma vez (~400 KB a mais), contra o objetivo de site leve.
- **Gerador `npm run nova-atividade`** — exagero para demanda pontual;
  copiar a atividade vizinha faz o mesmo.
- **Atividades em Markdown** — os professores programam, e o TypeScript já
  barra erro de formato de graça.

## Perguntas em aberto

- Quem vai criar atividades no futuro, e com que frequência? Decide quando os
  itens acima passam a valer.
- Vale definir um padrão de captura para os prints (tamanho de janela, tema
  claro) para ficarem uniformes?
