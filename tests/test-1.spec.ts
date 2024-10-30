import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('areaepitech18@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('AreaEpitech31.');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('heading', { name: 'Dashboard' }).isVisible();
});

test.describe('select weather and send email work', () => {
  test('select weather action', async ({ page }) => {
    await page.getByRole('button', { name: 'Add new area' }).click();
    await page.getByRole('button', { name: 'Select action' }).click();
    await page.getByRole('menuitem', { name: 'When it rains' }).click();
    await expect(page.getByRole('button', { name: 'Weather' })).toBeVisible();
  });

  test('select city (Lille)', async ({ page }) => {
    await page.getByPlaceholder('City').click();
    await page.getByText('Lille').click();
    const city_weather = page.locator("//div[@class='rectangle']//input[@value='Lille'][not(@type='hidden')]");
    await expect(city_weather).toBeVisible();
  })


  test('select send email reaction', async ({ page }) => {await page.getByRole('button', { name: 'Select reaction' }).click();
    await page.getByRole('menuitem', { name: 'Send an email' }).click();
    await page.getByPlaceholder('Enter an email').click();
    await page.getByPlaceholder('Enter an email').fill('test@gmail.com');
    await page.getByPlaceholder('Enter your input').click();
    await page.getByPlaceholder('Enter your input').fill('jojo');

  })

  test('apply weather/spotify', async ({ page }) => {
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    const disable_input = page.locator("//input[@placeholder = 'Enter an email'][@data-disabled = 'true']");
    await expect(disable_input).toBeVisible();

  });
});

test.describe('select receive mail and send mp(discord)', () => {
  test('select email action', async ({ page }) => {
    await page.getByRole('button', { name: 'Add new area' }).click();
    await page.getByRole('button', { name: 'Select action' }).click();
    await page.getByRole('menuitem', { name: 'When I receive an email' }).click();
    await expect(page.getByRole('button', { name: 'Email', exact: true })).toBeVisible();
  });

  test('select send mp (discord)', async ({ page }) => {
    await page.getByRole('button', { name: 'Select reaction' }).click();
    await page.getByRole('menuitem', { name: 'Send a mp' }).click();
    await page.getByPlaceholder('Enter an id Discord').click();
    await page.getByPlaceholder('Enter an id Discord').fill('id');
    await page.locator('#mantine-j2rssfpmv').click();
    await page.locator('#mantine-j2rssfpmv').fill('test');
    await page.locator('#mantine-dpyc7fkh1-dropdown > div').first().click();
    await page.locator('#mantine-hcomx40wf').fill('test');
  })

  test('apply email/mp(discord)', async ({ page }) => {
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();;
    const disable_input = "//span[text() = 'MP']/parent::span/parent::button/parent::div//input[@data-disabled='true'][@value= 'id test']";
    await expect(page.locator(disable_input)).toBeVisible();
  });
});

test.describe('select alerts and twitch clip', () => {
  test('select alerts action', async ({ page }) => {
    await page.getByRole('button', { name: 'Add new area' }).click();
    await page.getByRole('button', { name: 'Select action' }).click();
    await page.getByRole('menuitem', { name: 'When it is alerts' }).click();
    await expect(page.getByRole('button', { name: 'Alerts' })).toBeVisible();
  });

  test('select city (Tokyo)', async ({ page }) => {
    await page.locator("//span[text() = 'Alerts']/parent::span/parent::button/parent::div//input[@placeholder='City']").click();
    await page.getByRole('option', { name: 'Tokyo' }).click();
    const city_alert = page.locator("//div[@class='rectangle']//input[@value='Tokyo'][not(@type='hidden')]");
    await expect(city_alert).toBeVisible();
  })


  test('select twitch reaction', async ({ page }) => {
    await page.getByRole('button', { name: 'Select reaction' }).click();
    await page.getByRole('menuitem', { name: 'Create a twitch clip' }).click();
  })

  test('fill twitch input', async ({ page }) => {await page.getByRole('button', { name: 'Select reaction' }).click();
    const input_twitch = "//span[text() = 'Alerts']/parent::span/parent::button/parent::div//input[@placeholder='Enter your input']";
    await page.locator(input_twitch).click();
    await page.locator(input_twitch).fill('tokyo');
  })

  test('apply alerts/twitch', async ({ page }) => {
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();;
    const disable_input = "//span[text() = 'Alerts']/parent::span/parent::button/parent::div//input[@data-disabled='true'][@placeholder='Enter your input']";
    await expect(page.locator(disable_input)).toBeVisible();
  });
});

test.describe('select News and calendar', () => {
  test('select news action', async ({ page }) => {
    await page.getByRole('button', { name: 'Add new area' }).click();
    await page.getByRole('button', { name: 'Select action' }).click();
    await page.getByRole('menuitem', { name: 'When news appears' }).click();
    await expect(page.getByRole('button', { name: 'News' })).toBeVisible();
  });

  test('fill input news', async ({ page }) => {
    const news_input = "//span[text() = 'News']/parent::span/parent::button/parent::div//input[@placeholder='Enter your input']";
    await page.locator(news_input).click();
    await page.locator(news_input).fill('Tesla');
  })


  test('select calendar reaction', async ({ page }) => {
    await page.getByRole('button', { name: 'Select reaction' }).click();
    await page.getByRole('menuitem', { name: 'Create a Event on Google' }).click();
  })

  test('fill calendar input', async ({ page }) => {await page.getByRole('button', { name: 'Select reaction' }).click();
    const input_calendar = "//span[text() = 'News']/parent::span/parent::button/parent::div//input[@placeholder='Enter your input'][@value='']";
    await page.locator(input_calendar).click();
    await page.locator(input_calendar).fill('tesla news');
  })

  test('apply News/calendar', async ({ page }) => {
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();;
    const disable_input = "//span[text() = 'News']/parent::span/parent::button/parent::div//input[@data-disabled='true'][@value='Tesla']"
    await expect(page.locator(disable_input)).toBeVisible();
  });
});

test.describe('select receive mail and github issue', () => {
  test('select email action', async ({ page }) => {
    await page.getByRole('button', { name: 'Add new area' }).click();
    await page.getByRole('button', { name: 'Select action' }).click();
    await page.getByRole('menuitem', { name: 'When I receive an email' }).click();
    await expect(page.getByRole('button', { name: 'Email', exact: true })).toBeVisible();
  });

  test('select send mp (discord)', async ({ page }) => {
    await page.getByRole('button', { name: 'Select reaction' }).click();
    await page.getByRole('menuitem', { name: 'Create an issue on github' }).click();
  })

  test('fill github issue', async ({ page }) => {
    await page.getByPlaceholder('Organisations github').click();
    await page.getByText('EnzoDIWLK').click();
    await page.getByPlaceholder('Repos github').click();
    await page.getByRole('option', { name: 'EnzoDIWLK' }).locator('span').click();
    const input_issue = "//span[text() = 'Email']/parent::span/parent::button/parent::div//input[@placeholder='Enter your input'][@value='']";
    await page.locator(input_issue).click();
    await page.locator(input_issue).fill('test');
  })

  test('apply email/github', async ({ page }) => {
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();;
    const disable_input = "//span[text() = 'Email']/parent::span/parent::button/parent::div//input[@data-disabled='true'][@value= 'EnzoDIWLK EnzoDIWLK test']";
    await expect(page.locator(disable_input)).toBeVisible();
  });
});
