import os

import debug_toolbar
from django.conf import settings
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.static import serve

from config.views import schema_view
from .utils import str2bool

admin.site.site_header = settings.ADMIN_SITE_HEADER
admin.site.site_title = settings.ADMIN_SITE_TITLE
admin.site.index_title = settings.ADMIN_INDEX_TITLE

urlpatterns = [
    # APIs
    path('api/mapbox-baselayer/', include('mapbox_baselayer.urls')),
    path('api/crud/', include('terra_geocrud.urls')),
    path('api/', include('terra_settings.urls')),
    path('api/', include('terra_accounts.urls')),
    # admin
    path('api/admin/', admin.site.urls),
]

if str2bool(os.getenv('API_DOC_ENABLED')):
    urlpatterns += [
        # schemas
        path('api/swagger/',
             schema_view.with_ui('swagger', cache_timeout=0),
             name='schema-swagger-ui'),
        path('api/redoc/',
             schema_view.with_ui('redoc', cache_timeout=0),
             name='schema-redoc'),
    ]

if settings.DEBUG:
    urlpatterns += [
        # serve media files in local dev env
        re_path(r'^config/media/(?P<path>.*)$', serve, {
            'document_root': settings.MEDIA_ROOT,
        }),
        # enable django-debug-toolbar
        path('__debug__/', include(debug_toolbar.urls)),
    ]
