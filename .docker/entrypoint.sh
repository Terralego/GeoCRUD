#!/usr/bin/env bash

cd /app/src || exit

# Activate venv
. /app/venv/bin/activate

echo "Waiting for postgres..."
while ! nc -z $POSTGRES_HOST $PGPORT; do
    sleep 0.1
done
echo "PostgreSQL started"

./manage.py migrate --no-input
./manage.py collectstatic --no-input

# exec
exec "$@"
