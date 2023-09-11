import { test, expect } from '@playwright/test';
import exp from 'constants';
import { BASE_URL } from './utils/config';

test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(`${BASE_URL}/admin/orgs`);
});

test.describe('Organizations', () => {
    test('Organizations CRUD', async ({ page }) => {
        await test.step('Organization can be created', async () => {
            await page.getByRole('button', { name: 'New' }).click();
            await page.getByPlaceholder('Name').fill('Test organization 1');
            await page.getByRole('button', { name: 'Save' }).click();
            expect(
                page.getByRole('cell', {
                    name: 'Test organization 1',
                    exact: true,
                })
            ).toBeDefined();
        });

        await test.step('Organization can be updated', async () => {
            await page.getByLabel('Edit Test organization 1').click();
            await page
                .getByPlaceholder('Name')
                .fill('Test organization 1 - updated');
            await page.getByRole('button', { name: 'Save' }).click();
            await expect(
                page.getByRole('cell', {
                    name: 'Test organization 1 - updated',
                    exact: true,
                })
            ).toBeVisible();
        });

        await test.step('Organization can be deleted', async () => {
            await page.getByLabel('Delete Test organization 1').click();
            await page.getByRole('button', { name: 'Confirm' }).click();
            await expect(
                page.getByRole('cell', {
                    name: 'Test organization 1 - updated',
                    exact: true,
                })
            ).not.toBeVisible();
        });
    });

    test('Cannot create duplicate organizations', async ({ page }) => {
        await test.step('Verify creating 2 organizations with the same name fails', async () => {
            await page.getByRole('button', { name: 'New' }).click();
            await page.getByPlaceholder('Name').fill('Test organization dup');
            await page.getByRole('button', { name: 'Save' }).click();

            await page.getByRole('button', { name: 'New' }).click();
            await page.getByPlaceholder('Name').fill('Test organization dup');
            await page.getByRole('button', { name: 'Save' }).click();

            await expect(
                page.getByText('An organization with that name already exists')
            ).toBeVisible();

            await page.getByRole('button', { name: 'Close' }).click();
            await page.getByLabel('Delete Test organization dup').click();
            await page.getByRole('button', { name: 'Confirm' }).click();
        });
    });
});
