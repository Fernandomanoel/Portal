#!/usr/bin/env bash
# Instala (ou atualiza) a Evolution API neste computador e gera o link que liga o portal a ela.
# Pode rodar quantas vezes quiser: não muda a chave nem apaga a conexão do WhatsApp.
#   ./instalar.sh              instala/religa e gera o link
#   ./instalar.sh --atualizar  baixa a imagem mais nova e recria o contêiner (os dados ficam)
#   ./instalar.sh --mostrar    também mostra o link na tela (ele contém a chave)
# Variáveis: PORTAL_URL (padrão https://portal-microlins.vercel.app), SEM_DOCKER=1 (só gera .env e o link).
set -euo pipefail
cd "$(dirname "$0")"

PORTAL_URL="${PORTAL_URL:-https://portal-microlins.vercel.app}"
ATUALIZAR=0; MOSTRAR=0
for arg in "$@"; do
  case "$arg" in
    --atualizar) ATUALIZAR=1 ;;
    --mostrar) MOSTRAR=1 ;;
    *) echo "Opção desconhecida: $arg"; exit 1 ;;
  esac
done

gerar() { # $1 = bytes aleatórios, em hexadecimal
  if command -v openssl >/dev/null 2>&1; then openssl rand -hex "$1"; else head -c "$1" /dev/urandom | od -An -tx1 | tr -d ' \n'; fi
}

if [ "${SEM_DOCKER:-}" != "1" ]; then
  command -v docker >/dev/null 2>&1 || { echo "O Docker não está instalado. Instale o Docker Desktop (ou Docker Engine) e rode de novo."; exit 1; }
  docker compose version >/dev/null 2>&1 || { echo "O comando 'docker compose' não está disponível. Atualize o Docker."; exit 1; }
fi

if [ ! -f .env ]; then
  umask 077
  {
    echo "EVOLUTION_API_KEY=$(gerar 24)"
    echo "EVOLUTION_DB_SENHA=$(gerar 16)"
    echo "EVOLUTION_PORTA=8081"
    echo "EVOLUTION_BIND=127.0.0.1"
  } > .env
  echo "Chaves geradas e guardadas em evolution/.env (não compartilhe esse arquivo)."
else
  echo "Usando as chaves que já existem em evolution/.env."
fi

valor() { grep -E "^$1=" .env | head -n1 | cut -d= -f2-; }
CHAVE="$(valor EVOLUTION_API_KEY)"; PORTA="$(valor EVOLUTION_PORTA)"; PORTA="${PORTA:-8081}"

if [ "${SEM_DOCKER:-}" != "1" ]; then
  if [ "$ATUALIZAR" = "1" ]; then docker compose pull; fi
  docker compose up -d
  echo -n "Esperando a Evolution API ligar"
  for _ in $(seq 1 60); do
    if curl -s -o /dev/null --max-time 3 "http://127.0.0.1:${PORTA}/"; then ok=1; break; fi
    echo -n "."; sleep 2
  done
  echo
  [ "${ok:-0}" = "1" ] || { echo "A Evolution não respondeu em 2 minutos. Veja os registros: docker compose logs api"; exit 1; }
fi

JSON="{\"url\":\"http://localhost:${PORTA}\",\"chave\":\"${CHAVE}\",\"instancia\":\"portal\"}"
CODIGO="$(printf '%s' "$JSON" | base64 | tr -d '\n=' | tr '+/' '-_')"
LINK="${PORTAL_URL%/}/professor/mensagens#evolution=${CODIGO}"
( umask 077; printf '%s\n' "$LINK" > ligacao.txt )

echo "Pronto. A Evolution API está no ar e volta sozinha se o computador reiniciar."
echo "Para ligar o portal a ela, abra o link que está em evolution/ligacao.txt neste computador."
[ "$MOSTRAR" = "1" ] && echo "$LINK"
if command -v xdg-open >/dev/null 2>&1; then xdg-open "$LINK" >/dev/null 2>&1 || true; elif command -v open >/dev/null 2>&1; then open "$LINK" || true; fi
