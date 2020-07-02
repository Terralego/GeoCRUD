import os
from datetime import timedelta

from ..utils import str2bool, get_b64_content

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)

SETTINGS_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SETTINGS_DIR)
BASE_DIR = os.path.dirname(os.path.dirname(PROJECT_DIR))
PUBLIC_DIR = os.path.join(BASE_DIR, 'public')
DATA_DIR = os.path.join(PUBLIC_DIR, 'data')

SECRET_KEY = os.getenv('SECRET_KEY')

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.gis',
    'django.contrib.postgres',
    'rest_framework',
    'rest_framework_gis',
    'rest_framework_jwt',
    'template_model',
    'template_engines',
    'reversion',
    'sorl.thumbnail',
    'drf_yasg',
    'mapbox_baselayer',
    'terra_utils',
    'terra_accounts',
    'terra_geocrud',
    'geostore',
    'config',
    # make django admin config easy
    'django_json_widget',
    'admin_ordering',
    'django_object_actions',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'project.urls'

TEMPLATES = [
    # ODT and DOCX engines should be put at first, to handle zip like templates before django which can't handle them
    {
        'BACKEND': 'template_engines.backends.odt.OdtEngine',
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            'loaders': [
                'template_model.loader.Loader',
            ],
        },
    },
    {
        'BACKEND': 'template_engines.backends.docx.DocxEngine',
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            'loaders': [
                'template_model.loader.Loader',
            ],
        },
    },
    {
        'BACKEND': 'template_engines.backends.weasyprint.WeasyprintEngine',
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            'loaders': [
                'template_model.loader.Loader',
            ],
        },
    },
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(PROJECT_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },

]

WSGI_APPLICATION = 'project.wsgi.application'

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        # with default docker stack, DB name should match user.
        # Let use POSTGRES_DB with external postgres server
        'NAME': os.getenv('POSTGRES_DB', os.getenv('POSTGRES_USER')),
        'HOST': os.getenv('POSTGRES_HOST'),
        'PORT': os.getenv('PGPORT'),
        'USER': os.getenv('POSTGRES_USER'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD'),
    }
}

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/
LANGUAGE_CODE = os.getenv('LANGUAGE_CODE', 'en-us')
TIME_ZONE = os.getenv('TZ', 'UTC')
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Backend api admin
ADMIN_SITE_HEADER = os.getenv('ADMIN_SITE_HEADER', 'GeoCRUD Backend Configuration')
ADMIN_SITE_TITLE = os.getenv('ADMIN_SITE_TITLE', 'Backend Configuration')
ADMIN_INDEX_TITLE = os.getenv('ADMIN_INDEX_TITLE', '')

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/
STATICFILES_DIRS = [
    os.path.join(PROJECT_DIR, "static"),
]
STATIC_URL = '/config/static/'
STATIC_ROOT = os.path.join(PUBLIC_DIR, 'static')

# Media files

MEDIA_URL = '/config/media/'
MEDIA_ROOT = os.path.join(DATA_DIR, 'media')

# Sending Email

EMAIL_HOST = os.getenv('EMAIL_HOST', "")
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD', "")
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER', "")
EMAIL_USE_TLS = str2bool(os.getenv('EMAIL_USE_TLS', "0"))
EMAIL_PORT = os.getenv('EMAIL_PORT', 25)
DEFAULT_FROM_EMAIL = os.getenv('DEFAULT_FROM_EMAIL', "ro-reply@geo.crud")
EMAIL_SUBJECT_PREFIX = os.getenv('EMAIL_SUBJECT_PREFIX', "[GeoCRUD]")


# django-geostore settings
TERRA_TILES_HOSTNAMES = os.getenv('TERRA_TILES_HOSTNAMES', '').split(',')   # used to improve performances by generating tilejson with multiple dns (ex : a.tiles.my-instance.com, b.tiles.my_istances.com ...)
MAX_TILE_ZOOM = 15  # Vector tiles are usable on display up to max zoom + 3
MIN_TILE_ZOOM = 2  # geostore bug if zoom < 2

# TERRALEGO and terra-admin related settings

AUTH_USER_MODEL = 'terra_accounts.TerraUser'

# Request and file upload
DATA_UPLOAD_MAX_MEMORY_SIZE = None
FILE_UPLOAD_MAX_MEMORY_SIZE = 100 * 1024 * 1024

JWT_AUTH = {
    'JWT_PAYLOAD_HANDLER': 'terra_accounts.jwt_payload.terra_payload_handler',
    'JWT_EXPIRATION_DELTA': timedelta(seconds=3600),
    'JWT_ALLOW_REFRESH': True,
}

LOGO_PATH = os.path.join(PROJECT_DIR, 'static', 'images', 'logo.png')
FAVICON_PATH = os.path.join(PROJECT_DIR, 'static', 'images', 'favicon.ico')

TERRA_APPLIANCE_SETTINGS = {
    "title": os.getenv("FRONTEND_TITLE", "GeoCRUD"),
    "theme": {
        "logo": {
            "src": "https://github.com/Terralego.png",
            "alt": os.getenv("FRONTEND_TITLE", "GeoCRUD")
        },
        "heading": os.getenv("FRONTEND_HEADING", ""),
    },
    "favicon": f"data:image/x-icon;base64,{ get_b64_content(FAVICON_PATH) }",
    # temp module settings
    "enabled_modules": [
        "CRUD",
        "User"
    ],
    "landing_module": "CRUD",
}

# REQUIRED
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'terra_utils.pagination.PagePagination',
    'PAGE_SIZE': 100,
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}

FRONT_URL = os.getenv('FRONT_URL', '')
HOSTNAME = os.getenv('HOSTNAME', '')

TERRA_GEOCRUD = {
    'EXTENT': [-4, 40, 6, 50],
    'MBGLRENDERER_URL': os.getenv('MBGLRENDERER_URL', 'http://mbglrenderer'),
    "map": {
        "mapbox_access_token": os.getenv('MAPBOX_TOKEN'),
        "center": [2, 46],
        "zoom": 5,
        "maxZoom": 18,
        "minZoom": 3
    },
    "MAX_ZOOM": 17,
}
