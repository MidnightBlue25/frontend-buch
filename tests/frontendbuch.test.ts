import { test, expect } from '@playwright/test';
import { StartseitePage } from './pages/StartseitePage';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3001/');

  // Expect a title "Buch SPA" a substring.
  await expect(page).toHaveTitle('Buch SPA');
});

test('go to suche page', async ({ page }) => {
  const startseite = new StartseitePage(page);

  await page.goto('http://localhost:3001/');

  await startseite.clickSuche();

  // Expects page to have a heading with the name of Buch Details.
  await expect(page.getByRole('heading', { name: /Buch Details/ })).toBeVisible({});
});

test('go to neu page', async ({ page }) => {
  const startseite = new StartseitePage(page);

  await page.goto('http://localhost:3001/');

  await startseite.clickNeu();

  // Expects page to have a heading with the name of Neues Buch anlegen.
  await expect(page.getByRole('heading', { name: /Neues Buch anlegen/ })).toBeVisible({});
});

test('go to login page', async ({ page }) => {
  const startseite = new StartseitePage(page);

  await page.goto('http://localhost:3001/');

  await startseite.clickLogin();

  // Expects page to have a heading with the name of Einloggen.
  await expect(page.getByRole('heading', { name: /Einloggen/ })).toBeVisible({});
});
