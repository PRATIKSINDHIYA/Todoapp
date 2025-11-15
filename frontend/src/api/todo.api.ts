import api from './api';
import { z } from 'zod';

export const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

export const updateTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;

export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoResponse {
  message: string;
  todo: Todo;
}

export interface TodosResponse {
  message: string;
  todos: Todo[];
}

export const todoApi = {
  getTodos: async (): Promise<TodosResponse> => {
    const response = await api.get<TodosResponse>('/todos');
    return response.data;
  },

  getTodo: async (id: string): Promise<TodoResponse> => {
    const response = await api.get<TodoResponse>(`/todos/${id}`);
    return response.data;
  },

  createTodo: async (data: CreateTodoInput): Promise<TodoResponse> => {
    const response = await api.post<TodoResponse>('/todos', data);
    return response.data;
  },

  updateTodo: async (id: string, data: UpdateTodoInput): Promise<TodoResponse> => {
    const response = await api.put<TodoResponse>(`/todos/${id}`, data);
    return response.data;
  },

  deleteTodo: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/todos/${id}`);
    return response.data;
  },

  toggleTodo: async (id: string): Promise<TodoResponse> => {
    const response = await api.patch<TodoResponse>(`/todos/${id}/toggle`);
    return response.data;
  },
};

