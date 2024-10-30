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

test.afterEach(async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await page.locator("//button[@class='button-cross']").click();;
  await page.getByRole('button', { name: 'Yes' }).click();
});

test.describe('create action and reaction', () => {
  test('select weather and send email work', async ({ page }) => {
    await page.getByRole('button', { name: 'Add new area' }).click();
    await page.getByRole('button', { name: 'Select action' }).click();
    await page.getByRole('menuitem', { name: 'When it rains' }).click();
    // select city (Lille)
    await page.getByPlaceholder('City').click();
    await page.getByText('Lille').click();
    const city_weather = page.locator("//div[@class='rectangle']//input[@value='Lille'][not(@type='hidden')]");
    await expect(city_weather).toBeVisible();

    // select send email reaction
    await page.getByRole('button', { name: 'Select reaction' }).click();
    await page.getByRole('menuitem', { name: 'Send an email' }).click();
    await page.getByPlaceholder('Enter an email').click();
    await page.getByPlaceholder('Enter an email').fill('test@gmail.com');
    await page.getByPlaceholder('Enter your input').click();
    await page.getByPlaceholder('Enter your input').fill('jojo');

    // apply weather/spotify
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    const disable_input = page.locator("//input[@placeholder = 'Enter an email'][@data-disabled = 'true']");
    await expect(disable_input).toBeVisible();
  });

  test('select receive mail and send mp(discord)', async ({ page }) => {
    await page.getByRole('button', { name: 'Add new area' }).click();
    await page.getByRole('button', { name: 'Select action' }).click();
    await page.getByRole('menuitem', { name: 'When I receive an email' }).click();

    // select send mp (discord)
    await page.getByRole('button', { name: 'Select reaction' }).click();
    await page.getByRole('menuitem', { name: 'Send a mp' }).click();
    await page.getByPlaceholder('Enter an id Discord').click();
    await page.getByPlaceholder('Enter an id Discord').fill('id');
    const input_clip = "//span[text() = 'MP']/parent::span/parent::button/parent::div//input[@placeholder='Enter your input']"
    await page.locator(input_clip).click();
    await page.locator(input_clip).fill('test');

    // apply email/mp(discord)
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();;
    const disable_input = "//span[text() = 'MP']/parent::span/parent::button/parent::div//input[@data-disabled='true'][@value= 'id test']";
    await expect(page.locator(disable_input)).toBeVisible();
  });

  test('select alerts and twitch clip', async ({ page }) => {
    await page.getByRole('button', { name: 'Add new area' }).click();
    await page.getByRole('button', { name: 'Select action' }).click();
    await page.getByRole('menuitem', { name: 'When it is alerts' }).click();

    // select city (Tokyo)
    await page.locator("//span[text() = 'Alerts']/parent::span/parent::button/parent::div//input[@placeholder='City']").click();
    await page.getByRole('option', { name: 'Tokyo' }).click();
    const city_alert = page.locator("//div[@class='rectangle']//input[@value='Tokyo'][not(@type='hidden')]");
    await expect(city_alert).toBeVisible();

    // select twitch reaction
    await page.getByRole('button', { name: 'Select reaction' }).click();
    await page.getByRole('menuitem', { name: 'Create a twitch clip' }).click();

    // fill twitch input
    const input_twitch = "//span[text() = 'Alerts']/parent::span/parent::button/parent::div//input[@placeholder='Enter your input']";
    await page.locator(input_twitch).click();
    await page.locator(input_twitch).fill('tokyo');

    // apply alerts/twitch
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();;
    const disable_input = "//span[text() = 'Alerts']/parent::span/parent::button/parent::div//input[@data-disabled='true'][@placeholder='Enter your input']";
    await expect(page.locator(disable_input)).toBeVisible();
  });

  test('select News and calendar', async ({ page }) => {
    await page.getByRole('button', { name: 'Add new area' }).click();
    await page.getByRole('button', { name: 'Select action' }).click();
    await page.getByRole('menuitem', { name: 'When news appears' }).click();

    // fill input news
    const news_input = "//span[text() = 'News']/parent::span/parent::button/parent::div//input[@placeholder='Enter your input']";
    await page.locator(news_input).click();
    await page.locator(news_input).fill('Tesla');

    // select calendar reaction
    await page.getByRole('button', { name: 'Select reaction' }).click();
    await page.getByRole('menuitem', { name: 'Create a Event on Google' }).click();

    // fill calendar input
    const input_calendar = "//span[text() = 'News']/parent::span/parent::button/parent::div//input[@placeholder='Enter your input'][@value='']";
    await page.locator(input_calendar).click();
    await page.locator(input_calendar).fill('tesla news');

    // apply News/calendar'
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();;
    const disable_input = "//span[text() = 'News']/parent::span/parent::button/parent::div//input[@data-disabled='true'][@value='Tesla']"
    await expect(page.locator(disable_input)).toBeVisible();
  });

  test('select receive mail and github issue', async ({ page }) => {
    await page.getByRole('button', { name: 'Add new area' }).click();
    await page.getByRole('button', { name: 'Select action' }).click();
    await page.getByRole('menuitem', { name: 'When I receive an email' }).click();

    // select github issue'
    await page.getByRole('button', { name: 'Select reaction' }).click();
    await page.getByRole('menuitem', { name: 'Create an issue on github' }).click();

    // fill github issue'
    await page.getByPlaceholder('Organisations github').click();
    await page.getByText('EnzoDIWLK').click();
    await page.getByPlaceholder('Repos github').click();
    await page.getByRole('option', { name: 'EnzoDIWLK' }).locator('span').click();
    const input_issue = "//span[text() = 'Email']/parent::span/parent::button/parent::div//input[@placeholder='Enter your input'][@value='']";
    await page.locator(input_issue).click();
    await page.locator(input_issue).fill('test');

    // apply email/github
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();;
    const disable_input = "//span[text() = 'Email']/parent::span/parent::button/parent::div//input[@data-disabled='true'][@value= 'EnzoDIWLK EnzoDIWLK test']";
    await expect(page.locator(disable_input)).toBeVisible();
  });

  test('select receive mail and github branch', async ({ page }) => {
    await page.getByRole('button', { name: 'Add new area' }).click();
    await page.getByRole('button', { name: 'Select action' }).click();
    await page.getByRole('menuitem', { name: 'When I receive an email' }).click();

    // select github branch
    await page.getByRole('button', { name: 'Select reaction' }).click();
    await page.getByRole('menuitem', { name: 'Create a branch on github' }).click();

    // fill github branch
    await page.getByPlaceholder('Organisations github').click();
    await page.getByText('EnzoDIWLK').click();
    await page.getByPlaceholder('Repos github').click();
    await page.getByRole('option', { name: 'EnzoDIWLK' }).locator('span').click();
    const input_issue = "//span[text() = 'Email']/parent::span/parent::button/parent::div//input[@placeholder='Enter your input'][@value='']";
    await page.locator(input_issue).click();
    await page.locator(input_issue).fill('test');

    // apply email/github branch
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();;
    const disable_input = "//span[text() = 'Email']/parent::span/parent::button/parent::div//input[@data-disabled='true'][@value= 'EnzoDIWLK EnzoDIWLK test']";
    await expect(page.locator(disable_input)).toBeVisible();
  });
});
