# Evolution API (WhatsApp) para o portal

A Evolution API é o serviço que fica ligado ao WhatsApp da escola. Aqui ela é instalada **uma vez** e fica no ar
para sempre: o Docker a religa sozinho depois de queda de energia ou reinício do computador, e a conexão do
WhatsApp (o QR Code) fica guardada, então não precisa ler de novo.

## Instalar

1. Instale o **Docker Desktop** e deixe-o aberto. Em *Settings > General*, marque **Start Docker Desktop when
   you sign in**, para ele abrir sozinho com o Windows.
2. Nesta pasta, dê dois cliques em **`instalar.bat`** (Windows) ou rode `./instalar.sh` (Linux e Mac).
3. O instalador gera a chave, sobe a Evolution e **abre o portal já ligado a ela**. O link também fica em
   `ligacao.txt` (guarde como uma senha: ele contém a chave).
4. No portal, em **Mensagens > Envio automático**, clique em **Conectar com QR Code** e leia com o celular da
   escola (WhatsApp > Dispositivos conectados > Conectar dispositivo). Só na primeira vez.

## O que nunca fazer

- **Não rode `docker compose down -v`** nem apague os volumes `evolution_evolution_pg` e
  `evolution_evolution_instances`: eles guardam o banco da Evolution e a conexão do WhatsApp.
- Não compartilhe `.env` nem `ligacao.txt`: têm a chave que comanda o WhatsApp.

## Dia a dia

| Quero | Comando (nesta pasta) |
| --- | --- |
| Ver se está no ar | `docker compose ps` |
| Ver o que aconteceu | `docker compose logs --tail 100 api` |
| Atualizar a Evolution (mantém tudo) | `instalar.bat -Atualizar` ou `./instalar.sh --atualizar` |
| Gerar o link de novo | rode o instalador outra vez (a chave não muda) |
| Usar de outro computador da escola | no `.env`, troque `EVOLUTION_BIND=127.0.0.1` por `EVOLUTION_BIND=0.0.0.0`, rode o instalador e libere a porta 8081 no firewall |

## Se der problema

- *«Não consegui falar com a Evolution»*: o Docker Desktop está fechado, ou o navegador bloqueou o acesso à rede
  local (aceite o aviso no topo da janela).
- *«A Evolution recusou a chave»*: o link ou a chave guardada no navegador é de uma instalação antiga. Abra o link
  de `ligacao.txt` de novo.
- O WhatsApp pede QR Code outra vez: o celular saiu de *Dispositivos conectados*, ou o número foi desconectado
  pelo WhatsApp. Leia o QR Code de novo.

## Aviso

A Evolution usa uma conexão com o WhatsApp que a empresa não autoriza oficialmente: em disparos grandes ou
repetidos, o número pode ser bloqueado. O portal mantém pausas entre os envios para reduzir o risco, mas ele
não some. Para uso comercial, o caminho seguro é a API oficial do WhatsApp (Meta).
