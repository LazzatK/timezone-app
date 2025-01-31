import { test, expect, Page } from '@playwright/test';

test.describe('Time Zones', () => {
    test.beforeEach(async ({ page }: { page: Page }) => {
        await page.goto('/');
    });

    test('should sort rows by time', async ({ page }: { page: Page }) => {
        interface Timezone {
            label: string;
            selectOption: string;
        }

        const timezones: Timezone[] = [
            { label: "EST", selectOption: "Eastern Standard Time" },
            { label: "CST", selectOption: "Central Standard Time" },
            { label: "MST", selectOption: "Mountain Standard Time" },
            { label: "PST", selectOption: "Pacific Standard Time" },
            { label: "AST", selectOption: "Alaska Standard Time" },
            { label: "HAST", selectOption: "Hawaii-Aleutian Standard Time" },
        ];

        for (const timezone of timezones) {
            await page.click('button:has-text("Add Timezone")');
            await page.fill('input[name="label"]', timezone.label);
            await page.selectOption('select[name="timezone"]', timezone.selectOption);
            await page.click('button:has-text("Save")');
        }

        const rows = await page.locator('tbody tr');
        const actualRows: string[] = await rows.locator('td:nth-child(2)').allTextContents();

        const expectedRows: string[] = [
            "Pacific/Honolulu",
            "America/Juneau",
            "America/Vancouver",
            "America/Los_Angeles",
            "America/Denver",
            "America/Chicago",
            "America/New_York"
        ];

        expect(actualRows).toEqual(expectedRows);
    });

    test('should display "You" row', async ({ page }: { page: Page }) => {
        const userRow = await page.locator('tr:has-text("You")');
        await expect(userRow).toBeVisible();
    });

    test('should allow user to add a new timezone', async ({ page }: { page: Page }) => {
        await page.click('button:has-text("Add Timezone")');
        await page.fill('input[name="label"]', 'New Zone');
        await page.selectOption('select[name="timezone"]', 'Mountain Standard Time');
        await page.click('button:has-text("Save")');

        const newRow = await page.locator('tr:has-text("New Zone")');
        await expect(newRow).toBeVisible();
    });

    test('should not allow deleting the "You" row', async ({ page }: { page: Page }) => {
        const deleteButton = await page.locator('tr:has-text("You") button:has-text("Delete")');

        // TODO: depending on the implementation button could be either disabled or display warning message
        await expect(deleteButton).toBeDisabled();
    });
});
