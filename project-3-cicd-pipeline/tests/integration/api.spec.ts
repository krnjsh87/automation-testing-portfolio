import { test, expect } from '@playwright/test';

test.describe('Integration tests: API endpoints', () => {
    test('TC303: Fetch user list returns multiple users', async ({ request }) => {
        const response = await request.get('/api/users');
        expect(response.ok()).toBeTruthy();
        const users = await response.json();
        expect(Array.isArray(users)).toBeTruthy();
        expect(users.length).toBeGreaterThan(0);
        expect(users[0]).toHaveProperty('name');
    });

    test('TC304: Non-existent endpoint returns 404', async ({ request }) => {
        const response = await request.get('/api/invalid-endpoint');
        expect(response.status()).toBe(404);
        const body = await response.json();
        expect(body.error).toBe('Endpoint not found');
    });
});
