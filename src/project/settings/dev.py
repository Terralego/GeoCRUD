from .base import *  # NOQA

DEBUG = True

ALLOWED_HOSTS = [
    '*'
]

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
MEDIA_URL = 'http://127.0.0.1:8000/media/'  # frontend cant resolve urls without domain

INSTALLED_APPS += (
    'debug_toolbar',
)

MIDDLEWARE += (
    'debug_toolbar.middleware.DebugToolbarMiddleware',
)
DEBUG_TOOLBAR_CONFIG = {
    'SHOW_TOOLBAR_CALLBACK': lambda x: True,
}

try:
    from .custom import *

except ImportError:
    pass
