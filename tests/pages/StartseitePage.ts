import { Page } from '@playwright/test';

export class StartseitePage {
  constructor(private page: Page) {}

  readonly sucheLink = this.page.getByRole('link', { name: 'Suche' });
  readonly neuLink = this.page.getByRole('link', { name: 'Neu' });
  readonly loginButton = this.page.getByRole('button', { name: 'Login' });
  readonly logoutButton = this.page.getByRole('button', { name: 'Logout' });

  async clickSuche() {
    await this.sucheLink.click();
  }

    async clickNeu() {
    await this.neuLink.click();
  }

    async clickLogin() {
    await this.loginButton.click();
  }

    async clickLogout() {
    await this.logoutButton.click();
  }
}
