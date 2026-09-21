# Portal de Atividades — API

Backend do Portal de Atividades. PHP + PostgreSQL, consumido pelo frontend
React hospedado na Vercel.

Este repositório começa pelo **contrato**: os endpoints, os formatos e as regras
estão definidos antes de existir implementação, porque o frontend precisa
programar contra eles e porque contrato decidido depois vira contrato acidental.

- [`docs/API.md`](docs/API.md) — o contrato: endpoints, erros, autenticação,
  paginação e as regras que o servidor garante.
- [`contrato/api.ts`](contrato/api.ts) — os mesmos tipos em TypeScript. É a
  fonte da verdade que o frontend espelha.

## Estado

Nada implementado ainda. O contrato existe para ser revisado antes de virar
código.

## Princípios que a implementação precisa honrar

1. **PDO com prepared statements, sempre.** Nenhuma variável entra concatenada
   em SQL, em hipótese nenhuma.
2. **O gabarito nunca sai do servidor.** A correção de múltipla escolha acontece
   no backend. O aluno recebe as questões sem as respostas certas.
3. **Todo payload JSON é revalidado no PHP.** O TypeScript do frontend garante
   estrutura para quem escreve o frontend, não para quem recebe a requisição.
4. **CORS restrito à origem oficial do frontend.** Uma origem, não curinga.
   HTTPS obrigatório.
5. **Envio de prova é idempotente.** Uma submissão reenviada por timeout de rede
   não vira duas notas.
