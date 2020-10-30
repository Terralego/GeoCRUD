from django.contrib import admin
from geostore import models as geostore_models
from terra_geocrud import models as geocrud_models, admin as geocrud_admin


admin.site.register(geocrud_models.CrudGroupView, geocrud_admin.CrudGroupViewAdmin)
admin.site.register(geocrud_models.CrudView, geocrud_admin.CrudViewAdmin)
admin.site.register(geocrud_models.AttachmentCategory, geocrud_admin.AttachmentCategoryAdmin)
admin.site.register(geostore_models.Layer, geocrud_admin.CrudLayerAdmin)
admin.site.register(geostore_models.Feature, geocrud_admin.CrudFeatureAdmin)
