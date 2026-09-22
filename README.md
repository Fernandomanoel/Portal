# Portal de Atividades

Portal de materiais de aula e provas dos cursos. Frontend em React + TypeScript,
hospedado na Vercel; backend em PHP + PostgreSQL, ainda por implementar.

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
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Checagem de tipos e build de produção em `dist/` |
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
└── lib/            rotas e busca

docs/API.md         contrato da API
contrato/api.ts     os mesmos formatos em TypeScript
PRODUCT.md          verdade de produto: usuários, propósito, restrições
.impeccable/        contrato de direção visual
```

## Seções

- **Atividades** — quatro trilhas: Informática, Administrativa/Gestão,
  Programação, Design
- **Inglês** — trilha à parte, com atividades e provas próprias
- **Digitação** — treino de teclado com velocidade, precisão e contagem de erros
- **Provas** — área do instrutor, protegida por senha

## Conteúdo

Os catálogos nascem vazios e as telas foram construídas contra esse estado: cada
listagem tem um estado vazio desenhado, não uma frase solta. Adicionar conteúdo é
editar um arquivo em `src/data/` — nenhuma tela nova precisa ser criada.

## Verificação

Com o servidor de desenvolvimento em pé na porta 5180:

```bash
node scripts/capturar.mjs          # capturas em tema claro e escuro
node scripts/verificar-prova.mjs   # os dois fluxos de prova, ponta a ponta
node scripts/verificar-telas.mjs   # 320/768/1024/1440 e ordem de tabulação
```

## Princípios do backend

Ainda não implementado. O contrato em [`docs/API.md`](docs/API.md) já fixa o que
a implementação precisa honrar:

1. **PDO com prepared statements, sempre.** Nenhuma variável entra concatenada em
   SQL.
2. **O gabarito nunca sai do servidor.** A correção de múltipla escolha acontece
   no backend.
3. **Todo payload JSON é revalidado no PHP.** O TypeScript do frontend garante
   estrutura para quem escreve o frontend, não para quem recebe a requisição.
4. **CORS restrito à origem oficial do frontend.** Uma origem, não curinga.
   HTTPS obrigatório.
5. **Envio de prova é idempotente.** Uma submissão reenviada por timeout de rede
   não vira duas notas.
