import { test, expect } from '@playwright/test';
import { APIClient, APIError } from '../src/api-client';
import { ResponseValidator } from '../src/response-validator';
import { TEST_USERS, ENDPOINTS, User } from '../src/test-data';

test.describe('Users API Tests', () => {
  let apiClient: APIClient;
  let validator: ResponseValidator;

  test.beforeAll(() => {
    apiClient = new APIClient();
    validator = new ResponseValidator();
  });

  test('TC01: GET all users - success', async () => {
    const response = await apiClient.get<User[]>(ENDPOINTS.users);

    expect(response).toBeTruthy();
    expect(Array.isArray(response)).toBe(true);
    expect(response.length).toBeGreaterThan(0);
    expect(response[0]).toHaveProperty('id');
    expect(response[0]).toHaveProperty('name');
    expect(response[0]).toHaveProperty('email');
  });

  test('TC02: GET single user - success', async () => {
    const userId = 1;

    const response = await apiClient.get<User>(`${ENDPOINTS.users}/${userId}`);

    expect(response).toBeTruthy();
    expect(response.id).toBe(userId);
    expect(response.name).toBeTruthy();
    expect(response.email).toBeTruthy();
    expect(response.email).toContain('@');
  });

  test('TC03: GET non-existent user - 404', async () => {
    const userId = 99999;

    try {
      await apiClient.get<User>(`${ENDPOINTS.users}/${userId}`);
      expect(true).toBe(false); // Should not reach here
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).statusCode).toBe(404);
    }
  });

  test('TC04: POST create user - success', async () => {
    const newUser = TEST_USERS.newUser;

    const response = await apiClient.post<User>(ENDPOINTS.users, newUser);

    expect(response).toBeTruthy();
    expect(response).toHaveProperty('id');
    expect(response.name).toBe(newUser.name);
    expect(response.email).toBe(newUser.email);
    expect(response.username).toBe(newUser.username);
  });

  test('TC05: PUT update user - success', async () => {
    const userId = 1;
    const updateData = TEST_USERS.updateUser;

    const response = await apiClient.put<User>(
      `${ENDPOINTS.users}/${userId}`,
      updateData
    );

    expect(response).toBeTruthy();
    expect(response.id).toBe(userId);
    expect(response.name).toBe(updateData.name);
    expect(response.email).toBe(updateData.email);
  });

  test('TC06: PATCH partial update user - success', async () => {
    const userId = 1;
    const partialUpdate = { name: 'Partially Updated' };

    const response = await apiClient.patch<User>(
      `${ENDPOINTS.users}/${userId}`,
      partialUpdate
    );

    expect(response).toBeTruthy();
    expect(response.id).toBe(userId);
    expect(response.name).toBe(partialUpdate.name);
  });

  test('TC07: DELETE user - success', async () => {
    const userId = 1;

    const response = await apiClient.delete<Record<string, unknown>>(`${ENDPOINTS.users}/${userId}`);

    expect(response).toBeTruthy();
  });

  test('TC08: Validate user email format', async () => {
    const users = await apiClient.get<User[]>(ENDPOINTS.users);

    users.forEach(user => {
      expect(validator.isValidEmail(user.email)).toBe(true);
    });
  });

  test('TC09: Verify all required fields in user response', async () => {
    const requiredFields = ['id', 'name', 'username', 'email'];
    const users = await apiClient.get<User[]>(ENDPOINTS.users);

    users.forEach(user => {
      const hasAll = validator.hasRequiredProperties(
        user as unknown as Record<string, unknown>,
        requiredFields
      );
      expect(hasAll).toBe(true);
    });
  });

  test('TC10: Get users with custom headers', async () => {
    const response = await apiClient.get<User[]>(
      ENDPOINTS.users,
      { 'X-Custom-Header': 'test-value' }
    );

    expect(response).toBeTruthy();
    expect(Array.isArray(response)).toBe(true);
  });

  test('TC11: Bulk user creation', async () => {
    const createResponse1 = await apiClient.post<User>(ENDPOINTS.users, {
      name: 'User 1',
      email: 'user1@example.com',
      username: 'user1',
    });

    const createResponse2 = await apiClient.post<User>(ENDPOINTS.users, {
      name: 'User 2',
      email: 'user2@example.com',
      username: 'user2',
    });

    expect(createResponse1).toHaveProperty('id');
    expect(createResponse2).toHaveProperty('id');
  });

  test('TC12: User response structure validation', async () => {
    const user = await apiClient.get<User>(`${ENDPOINTS.users}/1`);

    expect(typeof user.id).toBe('number');
    expect(typeof user.name).toBe('string');
    expect(typeof user.username).toBe('string');
    expect(typeof user.email).toBe('string');
  });
});
