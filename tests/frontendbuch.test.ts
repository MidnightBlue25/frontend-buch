import { test, expect } from '@playwright/test';
import { StartseitePage } from './pages/startseitePage';
import { SuchPage } from './pages/suchPage';
import { SuchkriterienPage } from './pages/suchkriterienPage';
import { LoginPage } from './pages/loginPage';
import { LogoutPage } from './pages/logoutPage';
import { AddBookPage } from './pages/addBookPage';

test('has title', async ({ page }) => {
  await page.goto('https://localhost:3001/');

  // Expect a title "Buch SPA" a substring.
  await expect(page).toHaveTitle('Buch SPA');
});

test('go to suche page', async ({ page }) => {
  const startseite = new StartseitePage(page);

  await page.goto('https://localhost:3001/');

  await startseite.clickSuche();

  // Expects page to have a heading with the name of Buch Details.
  await expect(page.getByRole('heading', { name: /Buch Details/ })).toBeVisible({});
});

test('go to neu page', async ({ page }) => {
  const startseite = new StartseitePage(page);

  await page.goto('https://localhost:3001/');

  await startseite.clickNeu();

  // Expects page to have a heading with the name of Neues Buch anlegen.
  await expect(page.getByRole('heading', { name: /Neues Buch anlegen/ })).toBeVisible({});
});

test('go to login page', async ({ page }) => {
  const startseite = new StartseitePage(page);

  await page.goto('https://localhost:3001/');

  await startseite.clickLogin();

  // Expects page to have a heading with the name of Einloggen.
  await expect(page.getByRole('heading', { name: /Einloggen/ })).toBeVisible({});
});

test('Search with ID', async ({ page }) => {
  const startseite = new StartseitePage(page);
  const suchePage = new SuchPage(page);

  await page.goto('https://localhost:3001/');
  await startseite.clickSuche();

  await suchePage.enterId('1');
  await suchePage.clickSuchen();

  await expect(page.getByText('ISBN: 978-3-897-22583-1')).toBeVisible();
});

test('Search with isbn', async ({ page }) => {
  const startseite = new StartseitePage(page);
  const suchePage = new SuchPage(page);
  const suchkriterien = new SuchkriterienPage(page);

  await page.goto('https://localhost:3001/');
  await startseite.clickSuche();

  await suchePage.clickKriterien();

  await suchkriterien.enterISBN('978-3-897-22583-1');
  await suchkriterien.clickSuchen();

  await expect(page.getByText('ISBN: 978-3-897-22583-1|')).toBeVisible();
  await expect(page.getByText('Title: Alpha|')).toBeVisible();
});

test('Search with title', async ({ page }) => {
  const startseite = new StartseitePage(page);
  const suchePage = new SuchPage(page);
  const suchkriterien = new SuchkriterienPage(page);

  await page.goto('https://localhost:3001/');
  await startseite.clickSuche();

  await suchePage.clickKriterien();

  await suchkriterien.enterTitle('be');
  await suchkriterien.clickSuchen();

  await expect(page.getByText('ISBN: 978-3-827-31552-6|')).toBeVisible();
  await expect(page.getByText('Title: Beta|')).toBeVisible();
});

test('Search with art', async ({ page }) => {
  const startseite = new StartseitePage(page);
  const suchePage = new SuchPage(page);
  const suchkriterien = new SuchkriterienPage(page);

  await page.goto('https://localhost:3001/');
  await startseite.clickSuche();

  await suchePage.clickKriterien();

  await suchkriterien.selectArt('EPUB');
  await suchkriterien.clickSuchen();

  await expect(page.getByText('ISBN: 978-3-897-22583-1|')).toBeVisible();
  await expect(page.getByText('Title: Alpha|')).toBeVisible();
  await expect(page.getByText('ISBN: 978-0-007-09732-6|')).toBeVisible();
  await expect(page.getByText('Title: Delta|')).toBeVisible();
});

test('Search with lieferbar', async ({ page }) => {
  const startseite = new StartseitePage(page);
  const suchePage = new SuchPage(page);
  const suchkriterien = new SuchkriterienPage(page);

  await page.goto('https://localhost:3001/');
  await startseite.clickSuche();

  await suchePage.clickKriterien();

  await suchkriterien.selectLieferbar('false');
  await suchkriterien.clickSuchen();

  await expect(page.getByText('ISBN: 978-3-540-43081-0|')).toBeVisible();
  await expect(page.getByText('Title: Phi|')).toBeVisible();
  await expect(page.getByText('ISBN: 978-0-132-35088-4|')).toBeVisible();
  await expect(page.getByText('Title: Iota|')).toBeVisible();
});

test('Search with schlagwort', async ({ page }) => {
  const startseite = new StartseitePage(page);
  const suchePage = new SuchPage(page);
  const suchkriterien = new SuchkriterienPage(page);

  await page.goto('https://localhost:3001/');
  await startseite.clickSuche();

  await suchePage.clickKriterien();

  await suchkriterien.selectSchlagwoerter(['JavaScript', 'TypeScript']);
  await suchkriterien.clickSuchen();

  await expect(page.getByText('ISBN: 978-3-827-31552-6|')).toBeVisible();
  await expect(page.getByText('Title: Beta|')).toBeVisible();
});

test('Search with multiple criteria', async ({ page }) => {
  const startseite = new StartseitePage(page);
  const suchePage = new SuchPage(page);
  const suchkriterien = new SuchkriterienPage(page);

  await page.goto('https://localhost:3001/');
  await startseite.clickSuche();

  await suchePage.clickKriterien();

  await suchkriterien.selectArt('HARDCOVER');
  await suchkriterien.selectLieferbar('true');
  await suchkriterien.selectSchlagwort('JavaScript');
  await suchkriterien.clickSuchen();

  await expect(page.getByText('ISBN: 978-3-827-31552-6|')).toBeVisible();
  await expect(page.getByText('Title: Beta|')).toBeVisible();
  await expect(page.getByText('ISBN: 978-0-321-19368-1|')).toBeVisible();
  await expect(page.getByText('Title: Zeta|')).toBeVisible();
});

test('login', async ({ page }) => {
  const startseite = new StartseitePage(page);
  const login = new LoginPage(page);

  await page.goto('https://localhost:3001/');
  await startseite.clickLogin();

  await login.enterUsername('admin');
  await login.enterPasswort('p');

  await login.clickLogin();

  await expect(page.getByText('Erfolgreich eingeloggt!')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
});

test('logout', async ({ page }) => {
  const startseite = new StartseitePage(page);
  const login = new LoginPage(page);
  const logout = new LogoutPage(page);

  await page.goto('https://localhost:3001/');
  await startseite.clickLogin();

  await login.enterUsername('admin');
  await login.enterPasswort('p');

  await login.clickLogin();

  await logout.clickLogout();
  await logout.jaLogout();

  await expect(page.getByText('Erfolgreich ausgeloggt!')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test('buch einlegen', async ({ page }) => {
  const startseite = new StartseitePage(page);
  const login = new LoginPage(page);
  const addBook = new AddBookPage(page);

  await page.goto('https://localhost:3001/');
  await startseite.clickLogin();

  await login.enterUsername('admin');
  await login.enterPasswort('p');

  await login.clickLogin();
  await expect(page.getByText('Erfolgreich eingeloggt!')).toBeVisible();

  await addBook.clicksidebar();
  await addBook.clicknewisbn();

  const isbn = await addBook.getGeneratedIsbn();
  await addBook.clickclosesidebar();

  await startseite.clickNeu();
  await addBook.addIsbn(isbn);
  await addBook.addTitle('Testbuch');
  await addBook.addHomepage('https://example.com');

  await addBook.clickanlegen();

  await expect(page.getByText('Buch erfolgreich angelegt!')).toBeVisible();
});