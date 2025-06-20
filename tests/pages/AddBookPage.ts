import { Page } from '@playwright/test';

export class AddBookPage {
    constructor(private page: Page) {}

    readonly addIsbnInput = this.page.getByRole('textbox', { name: 'ISBN' });
    readonly addTitleInput = this.page.getByRole('textbox', { name: 'Titel' });
    readonly homepageInput = this.page.getByRole('textbox', {
        name: 'Homepage',
    });
    readonly anlegenButton = this.page.getByRole('button', {
        name: 'Buch anlegen',
    });
    readonly sidebarButton = this.page
        .getByRole('button')
        .filter({ hasText: /^$/ })
        .first();
    readonly newIsbnButton = this.page.getByRole('button', {
        name: 'Neue ISBN erzeugen',
    });
    readonly isbnInput = this.page.getByRole('textbox', {
        name: 'Generierte ISBN',
    });
    readonly copyButton = this.page.getByRole('button', {
        name: '📋 Kopieren',
    });
    readonly closesidebarButton = this.page.getByRole('button', {
        name: 'Close',
    });

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

    async clicksidebar() {
        await this.sidebarButton.click();
    }

    async clicknewisbn() {
        await this.newIsbnButton.click();
    }

    async clickcopy() {
        await this.copyButton.click();
    }

    async clickclosesidebar() {
        await this.closesidebarButton.click();
    }

    async getGeneratedIsbn() {
        return await this.isbnInput.inputValue();
    }
}
