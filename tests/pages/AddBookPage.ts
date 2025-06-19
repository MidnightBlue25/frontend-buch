import { Page } from '@playwright/test';

export class AddBookPage {
  constructor(private page: Page) {}

  readonly addIsbnInput = this.page.getByRole('textbox', { name: 'ISBN' });
  readonly addTitleInput = this. page.getByRole('textbox', { name: 'Titel' });
  readonly homepageInput = this.page.getByRole('textbox', { name: 'Homepage' });
  readonly anlegenButton = this.page.getByRole('button', { name: 'Buch anlegen' });

  async addIsbn(isbn: string) {
    await this.addIsbnInput.fill(isbn);
  }

  async addTitle(title: string) {
    await this.addTitleInput.fill(title);
  }

  async addHomepage(homepage: string) {
    await this.homepageInput.fill(homepage);
  }

  async clickanlegen() {
    await this.anlegenButton.click();
  }
}