#!/usr/bin/env bash
# Backup dos dados do portal e da conexão do WhatsApp, em ./backups, mantendo os 14 mais recentes.
# Para rodar todo dia às 3h:  crontab -e  e acrescente:   0 3 * * * /caminho/do/projeto/backup.sh
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p backups
DATA="$(date +%Y-%m-%d_%H%M)"
for volume in portal_dados evolution_instances; do
  docker run --rm -v "portal_${volume}:/d:ro" -v "$PWD/backups:/b" alpine tar czf "/b/${volume}-${DATA}.tgz" -C /d .
done
for volume in portal_dados evolution_instances; do
  ls -1t backups/${volume}-*.tgz 2>/dev/null | tail -n +15 | xargs -r rm --
done
echo "Backup feito em backups/ (${DATA})."
