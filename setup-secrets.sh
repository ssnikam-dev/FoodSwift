#!/usr/bin/env bash
# Generates .env, init.sql and init-mongo.js with random passwords that match each other.
# None of these files are committed (see .gitignore).
set -euo pipefail
cd "$(dirname "$0")"

if [ -f .env ]; then echo ".env already exists - refusing to overwrite."; exit 1; fi

read -rp "API domain (e.g. api.example.com): " DOMAIN
gen() { openssl rand -hex 12; }
MYSQL_ROOT=$(gen); MONGO_ROOT=$(gen); REST=$(gen); FOOD=$(gen); USR=$(gen); ORD=$(gen)

fill() {
  sed -e "s/CHANGE_ME_DOMAIN/$DOMAIN/g" \
      -e "s/CHANGE_ME_MYSQL_ROOT/$MYSQL_ROOT/g" \
      -e "s/CHANGE_ME_MONGO_ROOT/$MONGO_ROOT/g" \
      -e "s/CHANGE_ME_RESTAURANT/$REST/g" \
      -e "s/CHANGE_ME_FOOD/$FOOD/g" \
      -e "s/CHANGE_ME_USER/$USR/g" \
      -e "s/CHANGE_ME_ORDER/$ORD/g" "$1"
}

fill .env.example > .env
fill init.sql.example > init.sql
fill init-mongo.js.example > init-mongo.js
chmod 600 .env init.sql init-mongo.js
echo "Created .env, init.sql and init-mongo.js. Keep them out of Git."
