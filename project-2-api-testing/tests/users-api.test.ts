import { test, expect } from '@playwright/test';
import { APIClient } from '../src/api-client';

test.describe('Users API Tests', () => {
  let apiClient: APIClient;

  test.beforeAll(() => {
    apiClient = new APIClient('https://jsonplaceholder.typicode.com');
  });

  test('should fetch all users', async () => {
    const users = await apiClient.get<any[]>('/users');
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('name');
  });

  test('should create a new user', async () => {
    const newUser = {
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
    };
    const response = await apiClient.post<any>('/users', newUser);
    expect(response.name).toBe(newUser.name);
    expect(response).toHaveProperty('id');
  });
});
