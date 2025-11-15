import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { todoApi, createTodoSchema, CreateTodoInput, Todo } from '../api/todo.api';
import './TodoList.css';

const TodoList = () => {
  const queryClient = useQueryClient();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await todoApi.getTodos();
      return response.todos;
    },
  });

  const createMutation = useMutation({
    mutationFn: todoApi.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setShowForm(false);
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      todoApi.updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setEditingTodo(null);
      reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: todoApi.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: todoApi.toggleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTodoInput>({
    resolver: zodResolver(createTodoSchema),
  });

  const onSubmit = (data: CreateTodoInput) => {
    if (editingTodo) {
      updateMutation.mutate({ id: editingTodo._id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setShowForm(true);
    reset({ title: todo.title, description: todo.description || '' });
  };

  const handleCancel = () => {
    setEditingTodo(null);
    setShowForm(false);
    reset();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggle = (id: string) => {
    toggleMutation.mutate(id);
  };

  if (isLoading) {
    return <div className="loading">Loading todos...</div>;
  }

  if (error) {
    return <div className="error">Error loading todos</div>;
  }

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h2>My Todos</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) handleCancel();
          }}
          className="add-todo-btn"
        >
          {showForm ? 'Cancel' : '+ Add Todo'}
        </button>
      </div>

      {showForm && (
        <div className="todo-form-card">
          <h3>{editingTodo ? 'Edit Todo' : 'Create New Todo'}</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="todo-form">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                {...register('title')}
                className={errors.title ? 'error' : ''}
              />
              {errors.title && (
                <span className="error-text">{errors.title.message}</span>
              )}
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                {...register('description')}
                rows={3}
                className={errors.description ? 'error' : ''}
              />
              {errors.description && (
                <span className="error-text">{errors.description.message}</span>
              )}
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn" disabled={createMutation.isPending || updateMutation.isPending}>
                {editingTodo
                  ? updateMutation.isPending
                    ? 'Updating...'
                    : 'Update Todo'
                  : createMutation.isPending
                  ? 'Creating...'
                  : 'Create Todo'}
              </button>
              {editingTodo && (
                <button type="button" onClick={handleCancel} className="cancel-btn">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <div className="todos-grid">
        {data && data.length === 0 ? (
          <div className="empty-state">
            <p>No todos yet. Create your first todo!</p>
          </div>
        ) : (
          data?.map((todo) => (
            <div
              key={todo._id}
              className={`todo-card ${todo.completed ? 'completed' : ''}`}
            >
              <div className="todo-header-card">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo._id)}
                  className="todo-checkbox"
                />
                <h3 className="todo-title">{todo.title}</h3>
              </div>
              {todo.description && (
                <p className="todo-description">{todo.description}</p>
              )}
              <div className="todo-actions">
                <button
                  onClick={() => handleEdit(todo)}
                  className="edit-btn"
                  disabled={todo.completed}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
              <div className="todo-date">
                Created: {new Date(todo.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;

