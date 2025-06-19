import { Page } from '@playwright/test';

export class SuchkriterienPage {
  constructor(private page: Page) {}

  readonly isbnInput = this.page.getByRole('textbox', { name: 'ISBN, z.B. 978-3-8362-6760-' });
  readonly titleInput = this.page.getByRole('textbox', { name: 'z.B. JavaScript Patterns' });
  readonly radioEPUB = this.page.locator('div').filter({ hasText: /^EPUB$/ }).getByRole('radio');
  readonly radioHARDCOVER = this.page.locator('div').filter({ hasText: /^HARDCOVER$/ }).getByRole('radio');
  readonly radioPAPERBACK = this.page.locator('div').filter({ hasText: /^PAPERBACK$/ }).getByRole('radio');
  readonly lieferbarSelect = this.page.getByRole('combobox');
  readonly checkboxJavaScript = this.page.locator('div').filter({ hasText: /^JavaScript$/ }).getByRole('checkbox');
  readonly checkboxTypeScript = this.page.locator('div').filter({ hasText: /^TypeScript$/ }).getByRole('checkbox');
  readonly checkboxJava = this.page.locator('div').filter({ hasText: /^Java$/ }).getByRole('checkbox');
  readonly checkboxPython = this.page.locator('div').filter({ hasText: /^Python$/ }).getByRole('checkbox');

  async enterISBN(isbn: string) {
    await this.isbnInput.fill(isbn);
    }

  async enterTitle(title: string) {
    await this.titleInput.fill(title);
    } 

  async selectArt(art: 'EPUB' | 'HARDCOVER' | 'PAPERBACK') {
   switch (art) {
     case 'EPUB':
     await this.radioEPUB.check();
       break;
     case 'HARDCOVER':
      await this.radioHARDCOVER.check();
      break;
     case 'PAPERBACK':
      await this.radioPAPERBACK.check();
      break;
    }
  }

  async selectLieferbar(option: '' | 'true' | 'false') {
    await this.lieferbarSelect.selectOption(option);
  }

  async selectSchlagwort(wort: 'JavaScript' | 'TypeScript' | 'Java' | 'Python') {
    switch (wort) {
      case 'JavaScript':
        await this.checkboxJavaScript.check();
        break;
      case 'TypeScript':
        await this.checkboxTypeScript.check();
        break;
      case 'Java':
        await this.checkboxJava.check();
        break;
      case 'Python':
        await this.checkboxPython.check();
        break;
    }
  }

  async selectSchlagwoerter(worte: ('JavaScript' | 'TypeScript' | 'Java' | 'Python')[]) {
  for (const wort of worte) {
    await this.selectSchlagwort(wort);
  }
}
  
    async clickSuchen() {
        await this.page.getByRole('button', { name: 'Suchen' }).click();
    }

}