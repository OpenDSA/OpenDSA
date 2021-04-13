from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('configure', views.configure, name='configure'),
    path('simple2full', views.simple2full, name='simple2full'),
]
