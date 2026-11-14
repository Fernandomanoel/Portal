# Portal completo em um servidor (VPS)

Tudo roda num servidor só, na internet: o portal e os dados. O
computador da escola só abre o site no navegador; nada fica instalado nele.

```
internet ──HTTPS──> Caddy ──> Portal
                              └─ dados
```

Só o Caddy abre portas (80 e 443); o portal não tem porta aberta para fora.

## O que contratar

- **VPS Linux** (Ubuntu 22.04 ou 24.04), com **pelo menos 2 GB de RAM** e 20 GB de disco. Planos de uns R$ 30 a
  R$ 40 por mês atendem (confira os preços atuais e se o plano aceita Docker).
- **Endereço (domínio)**: dois jeitos.
  - *Sem comprar nada:* use `IP-COM-HIFENS.sslip.io`. Se o IP do servidor é `203.0.113.10`, o endereço é
    `203-0-113-10.sslip.io`. O HTTPS funciona do mesmo jeito. Serve para começar.
  - *Domínio próprio* (melhor para vender e para o endereço não mudar): crie um registro **A** do nome
    (por exemplo `portal.suaescola.com.br`) apontando para o IP do servidor, e espere propagar.

## Instalar (uma vez)

1. Entre no servidor por SSH (`ssh root@IP-DO-SERVIDOR`) e crie uma chave de leitura do repositório privado:
   `ssh-keygen -t ed25519 -N "" -f ~/.ssh/portal` e depois `cat ~/.ssh/portal.pub`. No GitHub, no repositório,
   vá em **Settings > Deploy keys > Add deploy key** e cole a chave (só leitura).
2. Baixe o projeto:
   ```
   GIT_SSH_COMMAND="ssh -i ~/.ssh/portal" git clone git@github.com:Fernandomanoel/Portal.git
   cd Portal
   ```
3. Rode `./instalar-vps.sh`. Ele instala o Docker (se você aceitar), pergunta o endereço e cria o arquivo `.env`
   com as chaves geradas sozinho.
4. Abra o `.env` (`nano .env`) e cole as linhas **`UNIDADES=`** e **`PROFESSORES=`** (os JSON com as senhas em hash,
   cada um numa linha só, sem aspas em volta). Salve (Ctrl+O, Enter) e saia (Ctrl+X).
5. Rode `./instalar-vps.sh` de novo. Ele confere o `.env`, sobe tudo e espera o portal responder.
6. Abra `https://SEU-ENDERECO/professor` e entre como administrador para conferir.

## Firewall

Libere só o necessário (rode antes de fechar a sessão SSH, para não se trancar fora):
```
ufw allow OpenSSH && ufw allow 80 && ufw allow 443 && ufw enable
```

## Dia a dia

| Quero | Comando (na pasta do projeto) |
| --- | --- |
| Ver se está tudo no ar | `docker compose ps` |
| Ver o que aconteceu | `docker compose logs --tail 100 portal` (ou `caddy`) |
| Atualizar o portal | `git pull` e depois `docker compose up -d --build` (use a mesma `GIT_SSH_COMMAND`) |
| Fazer backup | `./backup.sh` (guarda em `backups/`, mantém 14) |
| Backup todo dia às 3h | `crontab -e` e acrescente `0 3 * * * /caminho/do/Portal/backup.sh` |

Depois de mudar um `.prova.ts`, rode `docker compose up -d --build` de novo: o gabarito entra no servidor no build.

## O que nunca fazer

- **`docker compose down -v`**, `docker volume prune` e `docker system prune --volumes` apagam os volumes: os dados
  do portal.
- Compartilhar o `.env`: ele tem o segredo do login. Quem acessa o servidor
  (SSH) acessa tudo.

## Cuidados

- **Os dados começam vazios.** O que está no Vercel Blob (listas, envios, usuários criados pela tela) não migra
  sozinho; só valem os usuários e unidades do `.env`. Se precisar trazer algo, avise.
- **O servidor é seu.** Atualizações do sistema (`apt update && apt upgrade`), backups e segurança do SSH
  (preferir chave a senha) passam a ser sua responsabilidade.
- **Dados de alunos:** como o servidor guarda nomes, telefones e notas, vale ter o acordo de tratamento de
  dados (LGPD) com a escola.

## Se der problema

- *O endereço não abre:* confira o DNS (o nome aponta para o IP certo?) e as portas 80 e 443 no firewall e no
  painel do provedor. `docker compose logs caddy` mostra o certificado.
