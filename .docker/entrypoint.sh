#!/usr/bin/env bash

cd /app/src || exit

# Activate venv
. /app/venv/bin/activate

/usr/local/bin/wait-for-postgres.sh ./manage.py migrate --no-input
./manage.py collectstatic --no-input

# exec
exec "$@"
