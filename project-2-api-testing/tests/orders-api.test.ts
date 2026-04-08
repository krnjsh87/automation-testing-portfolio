import { test, expect } from '@playwright/test';
import { APIClient } from '../src/api-client';
import { ENDPOINTS } from '../src/test-data';

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

test.describe('Todos API Tests (Order Proxy)', () => {
  let apiClient: APIClient;

  test.beforeAll(() => {
    apiClient = new APIClient();
  });

  test('TC201: GET all todos - success', async () => {
    const response = await apiClient.get<Todo[]>(ENDPOINTS.orders);

    expect(response).toBeTruthy();
    expect(Array.isArray(response)).toBe(true);
    expect(response.length).toBeGreaterThan(0);
  });

  test('TC202: GET todos by user ID', async () => {
    const userId = 1;

    const response = await apiClient.get<Todo[]>(
      `${ENDPOINTS.orders}?userId=${userId}`
    );

    expect(Array.isArray(response)).toBe(true);
    response.forEach(todo => {
      expect(todo.userId).toBe(userId);
    });
  });

  test('TC203: Create todo - success', async () => {
    const newTodo = {
      title: 'Test todo item',
      completed: false,
      userId: 1,
    };

    const response = await apiClient.post<Todo>(ENDPOINTS.orders, newTodo);

    expect(response).toBeTruthy();
    expect(response).toHaveProperty('id');
    expect(response.title).toBe(newTodo.title);
  });

  test('TC204: Todo completion status validation', async () => {
    const todos = await apiClient.get<Todo[]>(ENDPOINTS.orders);

    todos.forEach(todo => {
      expect(typeof todo.completed).toBe('boolean');
    });
  });

  test('TC205: Update todo - success', async () => {
    const todoId = 1;
    const updateData = {
      title: 'Updated todo',
      completed: true,
      userId: 1,
    };

    const response = await apiClient.put<Todo>(
      `${ENDPOINTS.orders}/${todoId}`,
      updateData
    );

    expect(response).toBeTruthy();
    expect(response.id).toBe(todoId);
  });

  test('TC206: Delete todo - success', async () => {
    const todoId = 1;

    const response = await apiClient.delete<Record<string, unknown>>(
      `${ENDPOINTS.orders}/${todoId}`
    );

    expect(response).toBeTruthy();
  });
});
