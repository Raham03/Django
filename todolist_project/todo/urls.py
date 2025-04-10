from django.urls import path
from . import views

urlpatterns = [
    path('', views.todo_list, name='todo_list'),
    path('delete/<int:pk>/', views.todo_delete, name='todo_delete'),
    path('toggle/<int:pk>/', views.todo_toggle, name='todo_toggle'),
]
