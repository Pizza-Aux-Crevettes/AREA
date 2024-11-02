import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8081/');
  page.on('dialog', async dialog => {
    await dialog.accept(); // Accepts the dialog
  });
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('enzodziewulski@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('1234567890');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('heading', { name: 'Dashboard' }).isVisible();
});

test.describe('Check front', () => {
  test('check services are here', async ({ page }) => {
    await page.locator("//div[@class='top-part']//h1/preceding-sibling::div").click();
    await page.getByRole('menuitem', { name: 'Service Connection' }).click();
    await expect(page.getByRole('button', { name: 'Connect to Discord' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'disconnection of twitch' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'disconnection of Github' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'disconnection of Google' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Connect to Spotify' })).toBeVisible();
  });

  test('check change ip adress button is here', async ({ page }) => {
    await page.locator("//div[@class='top-part']//h1/preceding-sibling::div").click();
    await expect(page.getByRole('menuitem', { name: 'Change IP adress' })).toBeVisible();
  });

  test('check dislexic font button is here', async ({ page }) => {
    await page.locator("//div[@class='top-part']//h1/following-sibling::div").click();
    await expect(page.getByRole('menuitem', { name: 'Dislexic font' })).toBeVisible();
  });

  test('check it can download apk', async ({ page }) => {
    await page.locator("//div[@class='top-part']//h1/preceding-sibling::div").click();
    await page.getByRole('menuitem', { name: 'Download apk' }).click();
    const downloadPromise = page.waitForEvent('download');
      await page.getByRole('button', { name: 'Download apk' }).click();
      const download = await downloadPromise;
  });

  test('logout', async ({ page }) => {
    await page.locator("//div[@class='top-part']//h1/following-sibling::div").click();
    await page.getByRole('menuitem', { name: 'Log out' }).click();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });
});