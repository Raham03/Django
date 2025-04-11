from django.urls import path
from .views import todo_list_v2, todo_detail_v2, todo_toggle_v2

urlpatterns = [
    path('v2/todo/', todo_list_v2, name='todo-list-v2'),
    path('v2/todo/<int:pk>/', todo_detail_v2, name='todo-detail-v2'),
    path('v2/todo/<int:pk>/toggle/', todo_toggle_v2, name='todo-toggle-v2'),
]
