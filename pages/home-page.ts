import type { Page } from 'playwright';
import { isVisible } from '../framework/common-actions';
import { readFileSync } from 'fs';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('https://translate.google.com/');
  }

  async goToLoginPage() {
    await this.page.click('a[routerlink="/login"]');
  }

  async readSourceFile(fileName) {
    return readFileSync(`./textFiles/${fileName}`, 'utf-8');
  }

  async readDestinationFile(fileName) {
    return readFileSync(`./textFiles/${fileName}`, 'utf-8');
  }

  async selectSource(language) {
    await this.page
      .locator(
        `//div[@jsname='gnoFo']//button[@aria-label='More source languages']//div[3]`
      )
      .click();

    await this.page
      .locator(`(//div[contains(text(),'${language}')])[1]`)
      .click();

    await this.page.click(
      `//div[@jsname='gnoFo']//button[@aria-label='More source languages']//div[3]`
    );
  }

  async selectDestination(language) {
    await this.page.waitForTimeout(2000);

    await this.page
      .locator(
        `//div[@jsname='gnoFo']//button[@aria-label='More target languages']//div[3]`
      )
      .click({ clickCount: 1 });

    const desination_language = `(//div[contains(text(),'${language}')])[2]`;
    await this.page.waitForSelector(desination_language);
    await this.page.locator(desination_language).click();

    await this.page.click(
      `//div[@jsname='gnoFo']//button[@aria-label='More source languages']//div[3]`
    );
  }

  async enterSourceText(initial_text) {
    await this.page.fill(`textarea[aria-label='Source text']`, initial_text);
  }

  async readSource(fileName) {
    return readFileSync(`./textFiles/${fileName}`, 'utf-8');
  }

  async copyTranslation(): Promise<String> {
    await this.page.locator('[aria-label="Copy translation"]').click();

    this.page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    const affirmativeText = await this.page.evaluate(() =>
      navigator.clipboard.readText()
    );
    return affirmativeText;
  }

  async verifyTranslation(inputText, translatedText): Promise<boolean> {
    if (inputText === `Demokratien` && translatedText === `Democracia`) {
      return true;
    } else if (translatedText === `Demokratien` && inputText === `Democracia`) {
      return true;
    } else {
      return false;
    }
  }

  async userIsLoggedIn(): Promise<boolean> {
    return await isVisible(this.page, 'a[routerlink="/editor"]');
  }

  async goToSettings() {
    await this.page.click('a[routerlink="/settings"]');
  }

  async swapLanguages() {
    await this.page.click(
      `//div[@jsname='gnoFo']//c-wiz[@jsrenderer='chbWbf']//div[@jscontroller='HwavCb']//div[3]`
    );
  }

  async getSourceText(): Promise<string> {
    return await this.page.$eval(
      `//textarea[@aria-label='Source text']`,
      (el) => el.value
    );
  }

  async clearInputFields() {
    await this.page.locator('[aria-label="Clear source text"]').click();
  }

  async selectVirtualKeyboard() {
    await this.page.locator('a[role="button"]').nth(2).click();
  }

  async enterHi() {
    await this.page.locator('#K16').first().click();
    await this.page.locator('#kbd button:has-text("H")').click();
    await this.page.locator('#kbd button:has-text("i")').click();
    await this.page.locator('#K16').first().click();
    await this.page.locator('button:has-text("!")').click();
  }
}
