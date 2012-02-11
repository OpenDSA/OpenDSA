from django.conf.urls.defaults import patterns, include, url
from django.views.generic.simple import redirect_to
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings


# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
     url(r'^$', 'showfile.views.home', name='home'),
     url(r'^OpenDSA/$', 'showfile.views.index'),
     url(r'^OpenDSA/build/(?P<tag>\w+)/$','showfile.views.modules'),
     url(r'^OpenDSA/map/$', 'showfile.views.viewallexercises'),
    # url(r'^Backend/', include('Backend.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
     url(r'^admin/', include(admin.site.urls)),
)
urlpatterns += patterns('',
        url(r'^OpenDSA/static/(?P<path>.*)$', 'django.views.static.serve', {
            'document_root': settings.STATIC_ROOT,
        }),
   )
