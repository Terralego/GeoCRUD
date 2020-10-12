#!/usr/bin/env bash

cd /app/src || exit

# Activate venv
. /app/venv/bin/activate

echo "Waiting for postgres..."
while ! nc -z "$POSTGRES_HOST" "$PGPORT"; do
    sleep 0.1
done
echo "PostgreSQL started"

if [ "$MIGRATE" == "1" ]
then
  echo "Migrate database"
  ./manage.py migrate --no-input
fi;

if [ "$COLLECTSTATIC" == "1" ]
then
  echo "Collect staticfiles"
  ./manage.py collectstatic --no-input
fi;

# exec
exec "$@"
