import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
    page.on('dialog', async dialog => {
      await dialog.accept(); // Accepts the dialog
    });
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('enzodziewulski@gmail.com');
    await page.getByLabel('Email').press('Tab');
    await page.getByLabel('Password').fill('1234567890');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('heading', { name: 'Dashboard' }).isVisible();
    await page.locator('.close-button > .button-native').first().click();
});

test.describe('Check front', () => {
  test('check services are here', async ({ page }) => {
    await page.locator("//ion-icon[@name = 'menu']").click();
    await page.getByRole('button', { name: 'Service Connection' }).click();
    await expect(page.locator('ion-text').filter({ hasText: 'Connect to discord' })).toBeVisible();
    await expect(page.locator('ion-text').filter({ hasText: 'Disconnect of twitch' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Disconnect of google' })).toBeVisible();
    await expect(page.locator('ion-text').filter({ hasText: 'Connect to spotify' })).toBeVisible();
    await expect(page.locator('ion-text').filter({ hasText: 'Disconnect of github' })).toBeVisible();
  });

  test('check change ip adress button is here', async ({ page }) => {
    await page.locator("//ion-icon[@name = 'menu']").click();
    await page.getByRole('button', { name: 'Change IP adress' }).isVisible();
  });

  test('check dislexic font button is here', async ({ page }) => {
    await page.locator("//ion-icon[@name = 'settings-outline']").click();
    await page.getByRole('button', { name: 'Dislexic font' }).isVisible();
  });

  test('logout', async ({ page }) => {
    await page.locator("//ion-icon[@name = 'settings-outline']").click();
    await page.getByRole('button', { name: 'Log out' }).click();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });
});