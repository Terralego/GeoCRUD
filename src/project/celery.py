from __future__ import absolute_import

import os

from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings.dev')

app = Celery('project')
app.conf.update(
    broker_url=os.getenv('BROKER_URL'),
    task_serializer='json',
    task_always_eager=False,
    accept_content=['json'],  # Ignore other content
    result_serializer='json',
    timezone=os.getenv('TZ'),
    enable_utc=True,
)

app.autodiscover_tasks()
