from django.shortcuts import render, redirect, get_object_or_404
from .models import Todo
from .forms import TodoForm

def todo_list(request):
    todos = Todo.objects.all().order_by('-created_at')
    form = TodoForm()

    if request.method == 'POST':
        form = TodoForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('todo_list')

    return render(request, 'todo/todo_list.html', {'todos': todos, 'form': form})

def todo_delete(request, pk):
    todo = get_object_or_404(Todo, pk=pk)
    if request.method == 'POST':
        todo.delete()
        return redirect('todo_list')
    return render(request, 'todo/todo_confirm_delete.html', {'todo': todo})

def todo_toggle(request, pk):
    todo = get_object_or_404(Todo, pk=pk)
    todo.completed = not todo.completed
    todo.save()
    return redirect('todo_list')
