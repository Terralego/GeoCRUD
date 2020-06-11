from .prod import *  #NOQA

# Write or edit all django settings values available
# Add dependencies, custom apps, environment variable
ADMINS = (
    ('jec', "test@test.org"),
)
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
