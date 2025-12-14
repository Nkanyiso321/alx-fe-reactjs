import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  // Test 1: Initial render
  test('renders TodoList component with initial todos', () => {
    render(<TodoList />);
    
    // Check if the component container is rendered
    expect(screen.getByTestId('todo-container')).toBeInTheDocument();
    
    // Check if the form is rendered
    expect(screen.getByTestId('add-todo-form')).toBeInTheDocument();
    
    // Check if the input is rendered
    expect(screen.getByTestId('todo-input')).toBeInTheDocument();
    
    // Check if the add button is rendered
    expect(screen.getByTestId('add-button')).toBeInTheDocument();
    
    // Check if initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check if the todo list is rendered
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    
    // Check if stats are rendered
    expect(screen.getByTestId('todo-stats')).toBeInTheDocument();
  });

  // Test 2: Adding a new todo
  test('adds a new todo when form is submitted', async () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    const todoList = screen.getByTestId('todo-list');
    
    // Initial todo count
    const initialTodos = todoList.children.length;
    
    // Type new todo text
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    expect(input.value).toBe('New Test Todo');
    
    // Submit form
    fireEvent.click(addButton);
    
    // Check if input is cleared
    expect(input.value).toBe('');
    
    // Check if new todo is added to the list
    await waitFor(() => {
      expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    });
    
    // Check if todo count increased
    expect(todoList.children.length).toBe(initialTodos + 1);
  });

  // Test 3: Toggling todo completion
  test('toggles todo completion status when clicked', () => {
    render(<TodoList />);
    
    // Get the first todo item
    const firstTodoText = screen.getByTestId('todo-text-1'); // "Learn React"
    const firstTodoItem = screen.getByTestId('todo-item-1');
    
    // Initially, it should be completed (based on initial state)
    expect(firstTodoItem).toHaveAttribute('data-completed', 'true');
    
    // Click to toggle to incomplete
    fireEvent.click(firstTodoText);
    
    // Should now be incomplete
    expect(firstTodoItem).toHaveAttribute('data-completed', 'false');
    
    // Click again to toggle back to completed
    fireEvent.click(firstTodoText);
    
    // Should be completed again
    expect(firstTodoItem).toHaveAttribute('data-completed', 'true');
  });

  // Test 4: Deleting a todo
  test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    
    const todoList = screen.getByTestId('todo-list');
    const initialCount = todoList.children.length;
    const todoTextToDelete = 'Build a Todo App';
    
    // Verify the todo exists initially
    expect(screen.getByText(todoTextToDelete)).toBeInTheDocument();
    
    // Get and click the delete button for todo with id 2
    const deleteButton = screen.getByTestId('delete-button-2');
    fireEvent.click(deleteButton);
    
    // Verify the todo is removed
    expect(screen.queryByText(todoTextToDelete)).not.toBeInTheDocument();
    
    // Verify the list count decreased
    expect(todoList.children.length).toBe(initialCount - 1);
  });

  // Test 5: Empty todo input handling
  test('does not add empty todo', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    const todoList = screen.getByTestId('todo-list');
    
    const initialCount = todoList.children.length;
    
    // Try to add empty todo
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(addButton);
    
    // Count should remain the same
    expect(todoList.children.length).toBe(initialCount);
    
    // Try to add todo with only spaces
    fireEvent.change(input, { target: { value: '     ' } });
    fireEvent.click(addButton);
    
    // Count should still remain the same
    expect(todoList.children.length).toBe(initialCount);
  });

  // Test 6: Todo stats update correctly
  test('updates stats correctly when todos change', () => {
    render(<TodoList />);
    
    // Get all stats elements
    const stats = screen.getByTestId('todo-stats');
    const statsText = stats.textContent;
    
    // Check initial stats
    expect(statsText).toContain('Total: 3');
    expect(statsText).toContain('Completed: 1'); // Only "Learn React" is completed initially
    expect(statsText).toContain('Remaining: 2');
    
    // Add a new todo
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);
    
    // Check updated stats
    const updatedStatsText = screen.getByTestId('todo-stats').textContent;
    expect(updatedStatsText).toContain('Total: 4');
    expect(updatedStatsText).toContain('Completed: 1');
    expect(updatedStatsText).toContain('Remaining: 3');
    
    // Toggle a todo to complete
    const secondTodoText = screen.getByTestId('todo-text-2'); // "Build a Todo App"
    fireEvent.click(secondTodoText);
    
    // Check stats after toggling
    const toggledStatsText = screen.getByTestId('todo-stats').textContent;
    expect(toggledStatsText).toContain('Total: 4');
    expect(toggledStatsText).toContain('Completed: 2');
    expect(toggledStatsText).toContain('Remaining: 2');
    
    // Delete a todo
    const deleteButton = screen.getByTestId('delete-button-1'); // Delete "Learn React"
    fireEvent.click(deleteButton);
    
    // Check stats after deletion
    const deletedStatsText = screen.getByTestId('todo-stats').textContent;
    expect(deletedStatsText).toContain('Total: 3');
    expect(deletedStatsText).toContain('Completed: 1');
    expect(deletedStatsText).toContain('Remaining: 2');
  });

  // Test 7: Form submission with Enter key
  test('adds todo when form is submitted with Enter key', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const todoList = screen.getByTestId('todo-list');
    const initialCount = todoList.children.length;
    
    // Type and submit with Enter
    fireEvent.change(input, { target: { value: 'Todo with Enter' } });
    fireEvent.submit(screen.getByTestId('add-todo-form'));
    
    // Check if todo was added
    expect(screen.getByText('Todo with Enter')).toBeInTheDocument();
    expect(todoList.children.length).toBe(initialCount + 1);
  });
});