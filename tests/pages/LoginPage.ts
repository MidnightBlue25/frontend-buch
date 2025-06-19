import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  readonly usernameInput = this.page.getByRole('textbox', { name: 'Benutzername' });
  readonly passwortInput = this.page.getByRole('textbox', { name: 'Passwort' });
  readonly loginButton = this.page.getByRole('main').getByRole('button', { name: 'Login' });

  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async enterPasswort(passwort: string) {
    await this.passwortInput.fill(passwort);
  }

  async clickLogin() {
    await this.loginButton.click();
  }
}