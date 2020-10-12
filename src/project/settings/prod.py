from .base import *  # NOQA
import os

from ..utils import str2bool

ALLOWED_HOSTS = os.getenv('DOMAIN_NAME').split(',')

DEBUG = False

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION': f"{os.getenv('MEMCACHED_HOST', 'memcached')}:{os.getenv('MEMCACHED_PORT', '11211')}",
    }
}

SESSION_ENGINE = "django.contrib.sessions.backends.cache"


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
