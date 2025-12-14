import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Write Tests', completed: false }
  ]);
  
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    
    const todo = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false
    };
    
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-container" data-testid="todo-container">
      <h1>Todo List</h1>
      
      <form onSubmit={handleAddTodo} className="add-todo-form" data-testid="add-todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="todo-input"
          data-testid="todo-input"
        />
        <button type="submit" className="add-button" data-testid="add-button">
          Add
        </button>
      </form>

      <ul className="todo-list" data-testid="todo-list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
            data-testid={`todo-item-${todo.id}`}
            data-completed={todo.completed}
          >
            <span
              className="todo-text"
              onClick={() => handleToggleTodo(todo.id)}
              data-testid={`todo-text-${todo.id}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="delete-button"
              data-testid={`delete-button-${todo.id}`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      
      <div className="todo-stats" data-testid="todo-stats">
        <p>Total: {todos.length}</p>
        <p>Completed: {todos.filter(todo => todo.completed).length}</p>
        <p>Remaining: {todos.filter(todo => !todo.completed).length}</p>
      </div>
    </div>
  );
};

export default TodoList;