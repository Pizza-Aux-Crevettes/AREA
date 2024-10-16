import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8081/');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('areaepitech18@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('AreaEpitech31.');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('heading', { name: 'Dashboard' }).isVisible();
});

test.describe('check weather raining and spotify work', () => {

  // inscription login (X, google, spotify...)

  test('connect to spotify', async ({ page }) => {
    await page.getByRole('img', { name: 'Menu logo' }).click();
    await expect(page.getByRole('menuitem', { name: 'Dashboard' })).toBeVisible();
    await page.getByRole('menuitem', { name: 'Service Connection' }).click();
    await expect(page.getByRole('heading', { name: 'Service Connection' })).toBeVisible();
    await page.getByRole('button', { name: 'Connect to Spotify' }).click();
    await page.getByTestId('login-username').click();
    await page.getByTestId('login-username').fill('areaepitech18@gmail.com');
    await page.getByTestId('login-password').click();
    await page.getByTestId('login-password').fill('AreaEpitech31.');
    await page.getByTestId('login-button').click();
  });

  test('select weather action', async ({ page }) => {
    await page.getByRole('img', { name: 'Menu logo' }).click();
    await page.getByRole('menuitem', { name: 'Dashboard' }).click();
    await page.getByRole('button', { name: 'Action', exact: true }).first().click();
    await expect(page.getByRole('menuitem', { name: 'When I recieve an email' })).toBeVisible();
    await page.getByRole('menuitem', { name: 'When it rains' }).click();
    await page.getByRole('button', { name: 'Weather' }).isVisible();
  });

  test('select city (Lille)', async ({ page }) => {
    await page.getByRole('button', { name: 'City' }).click();
    await expect(page.getByRole('menuitem', { name: 'Lyon' })).toBeVisible();
    await page.getByRole('menuitem', { name: 'Lille' }).click();
    await page.getByRole('button', { name: 'Lille' }).isVisible();
  })

  test('select spotify reaction', async ({ page }) => {
    await page.getByRole('button', { name: 'Action', exact: true }).first().click();
    await expect(page.getByRole('menuitem', { name: 'When I recieve an email' })).toBeVisible();
    await page.getByRole('menuitem', { name: 'When it rains' }).click();
    await page.getByRole('button', { name: 'Spotify' }).isVisible();
  })

  test('apply weather/spotify', async ({ page }) => {
    await page.getByRole('button', { name: 'Apply' }).first().click();
    //maybe check log
  });

});

test.describe('check weather alert and tweet', () => {

});

test.describe('check actualities send mail', () => {

});

test.describe('check mail reiceved send discord private message', () => {

});

//
test('test', async ({ page }) => {
  await page.getByRole('button', { name: 'Apply' }).first().click();
  await page.getByRole('button', { name: 'City' }).click();

  await page.getByRole('button', { name: 'Apply' }).first().click();

  await page.getByRole('button', { name: 'Add new area' }).click();
  await expect(page.getByText('ActionReaction').nth(2)).toBeVisible();

  await expect(page.getByRole('button', { name: 'Exit logo' })).toBeVisible();

  await page.getByRole('img', { name: 'Menu logo' }).click();
  await expect(page.getByRole('menuitem', { name: 'Dashboard' })).toBeVisible();

  await page.getByRole('menuitem', { name: 'Service Connection' }).click();
  await expect(page.getByRole('heading', { name: 'Service Connection' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Connect to discord' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Connect to Twitter (X)' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Connect to Google' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Connect to Spotify' })).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Service Connection' })).toBeVisible();
  await page.getByRole('button', { name: 'Connect to Spotify' }).click();
  await page.getByTestId('login-username').click();
  await page.getByTestId('login-username').fill('areaepitech18@gmail.com');
  await page.getByTestId('login-password').click();
  await page.getByTestId('login-password').fill('AreaEpitech31.');
  await page.getByTestId('login-button').click();

  await page.getByRole('img', { name: 'Menu logo' }).click();
  await page.getByRole('menuitem', { name: 'Dashboard' }).click();

  await page.getByRole('button', { name: 'Exit logo' }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});