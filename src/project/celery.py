from __future__ import absolute_import

import os

from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings.dev')

broker_host = os.getenv('BROKER_HOST', 'broker')
broker_port = os.getenv('BROKER_PORT', '5672')
broker_user = os.getenv('BROKER_USER', 'guest')
broker_password = os.getenv('BROKER_PASSWORD', 'guest')

broker_url = f"amqp://{broker_user}:{broker_password}@{broker_host}:{broker_port}/"
app = Celery('project')
app.conf.update(
    broker_url=broker_url,
    task_serializer='json',
    task_always_eager=False,
    accept_content=['json'],  # Ignore other content
    result_serializer='json',
    timezone=os.getenv('TZ'),
    enable_utc=True,
)

app.autodiscover_tasks()
