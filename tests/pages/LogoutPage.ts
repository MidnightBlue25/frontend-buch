import { Page } from '@playwright/test';

export class LogoutPage {
  constructor(private page: Page) {}

  readonly logoutButton = this.page.getByRole('button', { name: 'Logout' });
  readonly jaLogoutButton = this.page.getByRole('button', { name: 'Ja' });

  async clickLogout() {
    await this.logoutButton.click();
  }

  async jaLogout() {
    await this.jaLogoutButton.click();
  }

}