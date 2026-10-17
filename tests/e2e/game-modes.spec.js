import { expect, test } from '@playwright/test';

test.describe('game mode selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('offers entry points for the classic and Hell Hand games', async ({ page }) => {
    await expect(page.locator('a[href="/classic"]')).toBeVisible();
    await expect(page.locator('a[href="/hell-hand"]')).toBeVisible();
  });

  for (const { language, live, soon } of [
    { language: 'en', live: 'Live', soon: 'Coming soon' },
    { language: 'pt', live: 'Disponível', soon: 'Em breve' },
  ]) {
    test(`shows table availability and pixel cards in ${language}`, async ({ page }) => {
      await page.evaluate((value) => localStorage.setItem('ohhell_language', value), language);
      await page.reload();

      const classicCard = page.locator('a[href="/classic"]');
      await expect(classicCard.getByText(live, { exact: true })).toBeVisible();
      await expect(
        page.locator('a[href="/hell-hand"]').getByText(soon, { exact: true }),
      ).toBeVisible();

      const cards = classicCard.locator('img[src*="spanish-8bit"]');
      await expect(cards).toHaveCount(3);
      for (const card of await cards.all()) {
        await expect(card).toBeVisible();
        await expect.poll(() => card.evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
      }
    });
  }

  test('opens the classic home', async ({ page }) => {
    await page.locator('a[href="/classic"]').click();

    await expect(page).toHaveURL(/\/classic$/);
    await expect(page.locator('main')).toBeVisible();
  });

  test('opens the Hell Hand home', async ({ page }) => {
    await page.locator('a[href="/hell-hand"]').click();

    await expect(page).toHaveURL(/\/hell-hand$/);
    await expect(page.locator('main')).toBeVisible();
  });
});

test.describe('standardized routes', () => {
  test('keeps legacy classic links working through redirects', async ({ page }) => {
    await page.goto('/home');

    await expect(page).toHaveURL(/\/classic$/);
    await expect(page.locator('main')).toBeVisible();
  });

  test('redirects the old Hell Hand setup route', async ({ page }) => {
    await page.goto('/hell-hand/game');

    await expect(page).toHaveURL(/\/hell-hand\/create-game$/);
  });

  test('keeps development tools under the dev namespace', async ({ page }) => {
    await page.goto('/playground');

    await expect(page).toHaveURL(/\/dev\/hell-hand\/card-editor$/);
  });
});
