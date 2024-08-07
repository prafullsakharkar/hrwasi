#!/bin/sh

python manage.py makemigrations
python manage.py migrate --no-input
python manage.py collectstatic --no-input

LOGFILE=/var/log/myapp/app.log
test -d $(dirname $LOGFILE) || mkdir -p $(dirname $LOGFILE)

chmod 644 .env
celery -A core worker --beat -l info >> /var/log/myapp/app.log &

gunicorn -c gunicorn_conf.py core.wsgi:application


