import { Page } from '@playwright/test';

export class SuchPage {
  constructor(private page: Page) {}

  readonly idInput = this.page.getByPlaceholder('Gib eine Buch-ID ein, z.B. 1');
  readonly suchenButton = this.page.getByRole('button', { name: 'Suchen' });
  readonly kriterienButton = this.page.getByRole('button', { name: 'Kriterien' });


  readonly isbnField = this.page.getByText('ISBN:', { exact: false });
  readonly titleField = this.page.getByText('Title:', { exact: false });

  async enterId(id: string) {
    await this.idInput.fill(id);
  }

  async clickSuchen() {
    await this.suchenButton.click();
  }

  async clickKriterien() {
    await this.kriterienButton.click();
  }

  async expectBuchErgebnis() {
    await this.isbnField.waitFor();
    await this.titleField.waitFor();
  }
}
