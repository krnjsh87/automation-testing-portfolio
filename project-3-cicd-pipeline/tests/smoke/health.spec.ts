import { test, expect } from '@playwright/test';

test.describe('Smoke tests: Health and basic UI', () => {
    test('TC301: Health check endpoint returns UP', async ({ request }) => {
        const response = await request.get('/health');
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(body.status).toBe('UP');
    });

    test('TC302: Homepage is accessible', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('h1')).toContainText('Automation Portfolio - Sample App');
    });
});
