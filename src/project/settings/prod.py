from .base import *  # NOQA
import os

from ..utils import str2bool

ALLOWED_HOSTS = os.getenv('DOMAIN_NAME').split(',')

DEBUG = False

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION': os.getenv('MEMCACHED_HOST', 'memcached'),
    }
}

SESSION_ENGINE = "django.contrib.sessions.backends.cache"

sentry_dsn = os.getenv('SENTRY_DSN')

if sentry_dsn:
    import sentry_sdk
    from sentry_sdk.integrations.django import DjangoIntegration

    sentry_sdk.init(
        dsn=os.getenv('SENTRY_DSN'),
        release=os.getenv('GIT_REV'),
        integrations=[DjangoIntegration()],
        # If you wish to associate users to errors (assuming you are using
        # django.contrib.auth) you may enable sending PII data.
        send_default_pii=True
    )

if str2bool(os.getenv('SSL_ENABLED', '')):
    # ENABLE SSL HANDLING
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SECURE_BROWSER_XSS_FILTER = True
    X_FRAME_OPTIONS = 'DENY'
    CSRF_COOKIE_HTTPONLY = True
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

try:
    from .custom import *
except ImportError:
    pass
