#!/usr/bin/env bash

cd /app/src || exit

./manage.py migrate --no-input
./manage.py collectstatic --no-input

# exec
exec "$@"
