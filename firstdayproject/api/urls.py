from django.contrib import admin
from django.urls import path,include
from .views import note_list_create,note_detail
urlpatterns = [
    path("notes/",note_list_create),
    path("notes/<int:id>/",note_detail),
]