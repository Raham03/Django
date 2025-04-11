import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';
const LIST_CREATE_ENDPOINT = `${API_BASE_URL}/v2/todo/`;
const DELETE_ENDPOINT = `${API_BASE_URL}/v2/todo/`;

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const fetchTodos = () => {
    axios.get(LIST_CREATE_ENDPOINT)
      .then(response => {
        console.log("Fetched todos:", response.data);
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreateTodo = (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    axios.post(LIST_CREATE_ENDPOINT, { title: newTodoTitle, completed: false })
      .then(response => {
        console.log("Created todo:", response.data);
        setTodos([response.data, ...todos]);
        setNewTodoTitle('');
      })
      .catch(error => {
        console.error('Error creating todo:', error);
      });
  };

  const handleDeleteTodo = (pk) => {
    axios.delete(`${DELETE_ENDPOINT}${pk}/`)
      .then(response => {
        console.log("Deleted todo:", response.data);
        setTodos(todos.filter(todo => todo.id !== pk));
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };

  return (
    <div>
      <h2>Todo List</h2>
      <form onSubmit={handleCreateTodo}>
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Enter new todo"
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
