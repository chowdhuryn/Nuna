import type { Page } from 'playwright';
export class HomePage {
    readonly page: Page;
constructor(page: Page) {
        this.page = page;
    }
async open() {
        await this.page.goto('http://angular.realworld.io/');
    }
async goToLoginPage() {
        await this.page.click('a[routerlink="/login"]');
    }
async userIsLoggedIn(): Promise<boolean> {
        await page.waitForSelector(locator);    
        return await page.isVisible(locator);
    }
}