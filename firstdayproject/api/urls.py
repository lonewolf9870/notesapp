from django.contrib import admin
from django.urls import path,include
from .views.auth_views import register,login
from .views.note_views import note_list_create,note_detail
urlpatterns = [
    path("v1/register/",register),
    path("v1/login/",login),
    path("v1/notes/",note_list_create),
    path("v1/notes/<int:id>/",note_detail),
]