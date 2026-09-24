# Portal de Atividades

Portal de materiais de aula e provas dos cursos. Frontend em React + TypeScript;
o servidor das provas (`servidor/`) é TypeScript também e roda na Vercel ou num
servidor físico da escola — ver [`docs/SERVIDOR.md`](docs/SERVIDOR.md).

Este é o portal novo, escrito do zero. O site estático antigo continua no
repositório `Portal-Atividades` e serve apenas de referência — os dois não se
mesclam.

## Rodar

```bash
npm install
npm run dev
```

O portal sobe em `http://localhost:5173`.

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento, com a `/api` gravando em `./dados` |
| `npm run build` | Checagem de tipos e build de produção em `dist/` |
| `npm run build:servidor` | Servidor físico em `dist-servidor/servidor.mjs` |
| `npm run servidor` | Sobe o servidor físico (site + `/api`) |
| `npm run professor:senha` | Gera o login de um professor para `PROFESSORES` |
| `npm run preview` | Serve o build de produção |
| `npm run lint` | oxlint |

## Estrutura

```
src/
├── pages/          uma tela por rota
├── components/     layout, cards, provas, quiz — mais Icone, o sistema de ícones
├── hooks/          tema, prova em andamento, motor de prova, digitação
├── data/           catálogo: atividades, provas, inglês, digitação
├── types/          contratos de dados
├── styles/         tokens, reset e fontes
└── lib/            rotas, busca e cliente da API

servidor/           API das provas: envios, correção, área do professor, limpeza
api/index.ts        a mesma API como função da Vercel
docs/SERVIDOR.md    como o servidor roda, variáveis, rotas e garantias
docs/API.md         contrato da API de longo prazo
contrato/api.ts     os mesmos formatos em TypeScript
PRODUCT.md          verdade de produto: usuários, propósito, restrições
.impeccable/        contrato de direção visual
```

## Seções

- **Atividades** — quatro trilhas: Informática, Administrativa/Gestão,
  Programação, Design
- **Inglês** — trilha à parte, com atividades e provas próprias
- **Digitação** — treino de teclado com velocidade, precisão e contagem de erros
- **Passo a Passo** — tutoriais guiados e jogos de conceito de informática
  básica, para quem tem mais dificuldade de leitura
- **Provas** — o aluno se identifica pelo nome, faz a prova (travada em tela
  cheia quando a prova pede) e envia; a área do professor (`/professor`, com
  login) mostra os envios, os arquivos e as notas por 7 dias

## Conteúdo

Os catálogos são dado tipado em `src/data/`, e as telas foram construídas
contra o estado vazio como padrão: cada listagem tem um estado vazio
desenhado, não uma frase solta. Adicionar conteúdo é editar ou acrescentar
um objeto num desses arquivos — nenhuma tela nova precisa ser criada. Os
formatos mais elaborados têm guia próprio:

| O que adicionar | Guia |
|---|---|
| Material de apoio de um curso (PDF, vídeo, imagem, planilha...) | [`src/data/COMO-FORNECER-MATERIAL.md`](src/data/COMO-FORNECER-MATERIAL.md) |
| Atividade autocorrigida | [`src/data/atividadesAutocorrigidas/COMO-CRIAR-ATIVIDADE.md`](src/data/atividadesAutocorrigidas/COMO-CRIAR-ATIVIDADE.md) |
| Prova interativa | [`src/data/provasInterativas/COMO-CRIAR-PROVA.md`](src/data/provasInterativas/COMO-CRIAR-PROVA.md) |

Regra central do material de curso: todo arquivo do próprio portal (PDF,
Word, planilha, slides, vídeo, imagem) **baixa na hora, sem sair da aba da
atividade** — só `tipo: "link"` (site externo ou página HTML autocontida)
abre em nova aba. Ver o guia acima antes de cadastrar um material novo.

## Verificação

Com o servidor de desenvolvimento em pé na porta 5180:

```bash
node scripts/capturar.mjs          # capturas em tema claro e escuro
node scripts/verificar-prova.mjs   # os dois fluxos de prova, ponta a ponta
node scripts/verificar-telas.mjs   # 320/768/1024/1440 e ordem de tabulação
```

## Princípios do servidor

1. **O gabarito nunca sai do servidor.** O aluno recebe a prova sem a resposta
   certa; a correção de múltipla escolha acontece no servidor.
2. **Todo envio é revalidado no servidor.** O TypeScript do frontend garante
   estrutura para quem escreve o frontend, não para quem recebe a requisição.
3. **Envio de prova é idempotente.** Uma submissão reenviada por falha de rede
   não vira duas.
4. **Nada é guardado por mais de 7 dias.** Quem precisa guardar nota baixa antes.
