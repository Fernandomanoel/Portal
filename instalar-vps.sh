#!/usr/bin/env bash
# Prepara o portal completo (site + API) em um VPS Linux (Ubuntu ou Debian), dentro da pasta do projeto.
# Pode rodar de novo quantas vezes quiser: não troca as chaves que já existem.
#   1ª vez: cria o .env com as chaves e para pedindo que você preencha UNIDADES e PROFESSORES.
#   2ª vez: confere o .env e sobe tudo.
set -euo pipefail
cd "$(dirname "$0")"

gerar() { if command -v openssl >/dev/null 2>&1; then openssl rand -hex "$1"; else head -c "$1" /dev/urandom | od -An -tx1 | tr -d ' \n'; fi; }
valor() { grep -E "^$1=" .env 2>/dev/null | head -n1 | cut -d= -f2-; }

if [ "${SEM_DOCKER:-}" != "1" ]; then
  if ! command -v docker >/dev/null 2>&1; then
    echo "O Docker não está instalado."
    read -r -p "Instalar agora com o instalador oficial (get.docker.com)? [s/N] " resp
    if [ "$resp" = "s" ] || [ "$resp" = "S" ]; then curl -fsSL https://get.docker.com | sh; else echo "Instale o Docker e rode de novo."; exit 1; fi
  fi
  docker compose version >/dev/null 2>&1 || { echo "O 'docker compose' não está disponível. Atualize o Docker."; exit 1; }
fi

if [ ! -f .env ]; then
  umask 077
  cp .env.exemplo .env
  IP="$(curl -4 -fsS --max-time 5 https://ifconfig.me 2>/dev/null || true)"
  PADRAO="${IP:+${IP//./-}.sslip.io}"
  read -r -p "Endereço do portal (domínio) [${PADRAO:-portal.exemplo.com.br}]: " DOM
  DOM="${DOM:-${PADRAO:-portal.exemplo.com.br}}"
  sed -i "s|^DOMINIO=.*|DOMINIO=${DOM}|; s|^SEGREDO_SESSAO=.*|SEGREDO_SESSAO=$(gerar 24)|" .env
  echo
  echo "Criei o .env com as chaves geradas (não compartilhe esse arquivo)."
  echo "Falta você colar, no .env, as linhas UNIDADES= e PROFESSORES= (os JSON com as senhas em hash)."
  echo "Abra com:  nano .env     (salve com Ctrl+O, Enter, e saia com Ctrl+X). Depois rode ./instalar-vps.sh de novo."
  exit 0
fi

# Confere os JSON de UNIDADES e PROFESSORES sem mostrar nada deles.
python3 - <<'PY' || { echo "Corrija o .env e rode de novo."; exit 1; }
import json, sys
env = {}
for linha in open(".env", encoding="utf-8"):
    if "=" in linha and not linha.lstrip().startswith("#"):
        chave, _, valor = linha.rstrip("\n").partition("=")
        env[chave.strip()] = valor
def lista(nome):
    try:
        v = json.loads(env.get(nome, ""))
    except Exception:
        print(f"{nome} não é um JSON válido (confira vírgulas, aspas e colchetes)."); sys.exit(1)
    if not isinstance(v, list) or not v:
        print(f"{nome} precisa ser uma lista com pelo menos um item."); sys.exit(1)
    return v
un, pr = lista("UNIDADES"), lista("PROFESSORES")
if any("scrypt:..." in str(i.get("senha", "")) for i in un + pr):
    print("UNIDADES ou PROFESSORES ainda têm o texto de exemplo (scrypt:...). Cole os hashes de verdade."); sys.exit(1)
ids = {u.get("id") for u in un}
for p in pr:
    if p.get("unidade") not in ids and p.get("unidade") != "*":
        print(f"O professor «{p.get('usuario')}» aponta para uma unidade que não existe em UNIDADES."); sys.exit(1)
for nome in ("SEGREDO_SESSAO", "DOMINIO"):
    if not env.get(nome) or env[nome].startswith("troque-") or env[nome].endswith("exemplo.com.br"):
        print(f"{nome} ainda está com o valor de exemplo."); sys.exit(1)
print(".env conferido.")
PY

if [ "${SEM_DOCKER:-}" != "1" ]; then
  docker compose up -d --build
  echo
  echo "Esperando o portal responder (o primeiro HTTPS pode levar um minuto)..."
  for _ in $(seq 1 60); do
    if curl -fsS -o /dev/null --max-time 5 "https://$(valor DOMINIO)/"; then ok=1; break; fi
    sleep 3
  done
  [ "${ok:-0}" = "1" ] || { echo "Ainda não respondeu. Confira o DNS e as portas 80 e 443. Registros: docker compose logs caddy portal"; exit 1; }
fi
echo
echo "Pronto: https://$(valor DOMINIO)/"
echo "Entre em /professor como administrador para conferir o acesso."
