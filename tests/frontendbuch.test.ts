import { test, expect } from '@playwright/test';
import { StartseitePage } from './pages/StartseitePage';
import { SuchPage } from './pages/SuchPage';
import { SuchkriterienPage } from './pages/SuchkriterienPage';

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

test('Search with ID', async ({ page }) => {
  const startseite = new StartseitePage(page);
  const suchePage = new SuchPage(page);

  await page.goto('http://localhost:3001/');
  await startseite.clickSuche();

  await suchePage.enterId('1');
  await suchePage.clickSuchen();

  await expect(page.getByText('ISBN: 978-3-897-22583-')).toBeVisible();
});

test('Search with isbn', async ({ page }) => {
  const startseite = new StartseitePage(page);
  const suchePage = new SuchPage(page);
  const suchkriterienPage = new SuchkriterienPage(page);

  await page.goto('http://localhost:3001/');
  await startseite.clickSuche();

  await suchePage.clickKriterien();

  await suchkriterienPage.enterISBN('978-3-897-22583-1');
  await suchkriterienPage.clickSuchen();

  await expect(page.getByText('ISBN: 978-3-897-22583-1|')).toBeVisible();
  await expect(page.getByText('Title: Alpha|')).toBeVisible();
});

test('Search with title', async ({ page }) => {
  const startseite = new StartseitePage(page);
  const suchePage = new SuchPage(page);
  const suchkriterienPage = new SuchkriterienPage(page);

  await page.goto('http://localhost:3001/');
  await startseite.clickSuche();

  await suchePage.clickKriterien();

  await suchkriterienPage.enterTitle('be');
  await suchkriterienPage.clickSuchen();

  await expect(page.getByText('ISBN: 978-3-827-31552-6|')).toBeVisible();
  await expect(page.getByText('Title: Beta|')).toBeVisible();
});

test('Search with art', async ({ page }) => {
  const startseite = new StartseitePage(page);
  const suchePage = new SuchPage(page);
  const suchkriterienPage = new SuchkriterienPage(page);

  await page.goto('http://localhost:3001/');
  await startseite.clickSuche();

  await suchePage.clickKriterien();

  await suchkriterienPage.selectArt('EPUB');
  await suchkriterienPage.clickSuchen();

  await expect(page.getByText('ISBN: 978-3-897-22583-1|')).toBeVisible();
  await expect(page.getByText('Title: Alpha|')).toBeVisible();
  await expect(page.getByText('ISBN: 978-0-007-09732-6|')).toBeVisible();
  await expect(page.getByText('Title: Delta|')).toBeVisible();
});

test('Search with lieferbar', async ({ page }) => {
  const startseite = new StartseitePage(page);
  const suchePage = new SuchPage(page);
  const suchkriterienPage = new SuchkriterienPage(page);

  await page.goto('http://localhost:3001/');
  await startseite.clickSuche();

  await suchePage.clickKriterien();

  await suchkriterienPage.selectLieferbar('false');
  await suchkriterienPage.clickSuchen();

  await expect(page.getByText('ISBN: 978-3-540-43081-0|')).toBeVisible();
  await expect(page.getByText('Title: Phi|')).toBeVisible();
  await expect(page.getByText('ISBN: 978-0-132-35088-4|')).toBeVisible();
  await expect(page.getByText('Title: Iota|')).toBeVisible();
});

test('Search with schlagwort', async ({ page }) => {
  const startseite = new StartseitePage(page);
  const suchePage = new SuchPage(page);
  const suchkriterienPage = new SuchkriterienPage(page);

  await page.goto('http://localhost:3001/');
  await startseite.clickSuche();

  await suchePage.clickKriterien();

  await suchkriterienPage.selectSchlagwoerter(['JavaScript', 'TypeScript']);
  await suchkriterienPage.clickSuchen();

  await expect(page.getByText('ISBN: 978-3-827-31552-6|')).toBeVisible();
  await expect(page.getByText('Title: Beta|')).toBeVisible();
});