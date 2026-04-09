import { test, expect } from '@playwright/test';

test.describe('Regression tests: Complete flow validation', () => {
    test('TC305: Full application state check', async ({ page, request }) => {
        // 1. Check health
        const healthResponse = await request.get('/health');
        expect(healthResponse.ok()).toBeTruthy();
        
        // 2. Load UI
        await page.goto('/');
        await expect(page.locator('h1')).toBeVisible();
        
        // 3. Verify API data matches expectation
        const userResponse = await request.get('/api/users');
        const users = await userResponse.json();
        expect(users).toContainEqual(expect.objectContaining({ name: 'Jane Smith' }));
    });
});
