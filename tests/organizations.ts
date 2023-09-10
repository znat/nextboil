import { test, expect } from '@playwright/test';

test('Organizations CRUD', async ({ page }) => {
    await test.step('Go to organization admin', async () => {
    await page.goto('http://localhost:3000/admin/orgs');
    });

    await test.step('Organization can be created', async () => {
        await page.getByRole('button', { name: 'New' }).click();
        await page.getByPlaceholder('Name').fill('Test organization 1');
        await page.getByRole('button', { name: 'Save' }).click();
        expect(
            page.getByRole('cell', { name: 'Test organization 1', exact: true })
        ).toBeDefined();
    });

    await test.step('Organization can be updated', async () => {
        await page.getByLabel('Edit Test organization 1').click();
        await page
            .getByPlaceholder('Name')
            .fill('Test organization 1 - updated');
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(
            page.getByRole('cell', { name: 'Test organization 1 - updated', exact: true })
        ).toBeVisible();
    });

    await test.step('Organization can be deleted', async () => {
        await page.getByLabel('Delete Test organization 1').click();
        await page.getByRole('button', { name: 'Confirm' }).click();
        await expect(
            page.getByRole('cell', { name: 'Test organization 1 - updated', exact: true })
        ).not.toBeVisible();
    });
});
