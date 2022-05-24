import type { Page } from 'playwright';
import { isVisible } from '../framework/common-actions';
import { readFileSync } from 'fs';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(): Promise<void> {
    await this.page.goto('https://translate.google.com/');
  }

  async goToLoginPage(): Promise<void> {
    await this.page.click('a[routerlink="/login"]');
  }

  async readSourceFile(fileName: string): Promise<string> {
    return readFileSync(`./textFiles/${fileName}`, 'utf-8');
  }

  async readDestinationFile(fileName: string): Promise<string> {
    return readFileSync(`./textFiles/${fileName}`, 'utf-8');
  }

  async selectSource(language: string): Promise<void> {
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

  async selectDestination(language: string): Promise<void> {
    // For some unknown reason a couple seconds wait is needed here to make the destination language select dropdown open
    await this.page.waitForTimeout(2000);

    await this.page
      .locator(
        `//div[@jsname='gnoFo']//button[@aria-label='More target languages']//div[3]`
      )
      .click();

    const desination_language = `(//div[contains(text(),'${language}')])[2]`;
    await this.page.waitForSelector(desination_language);
    await this.page.locator(desination_language).click();

    await this.page.click(
      `//div[@jsname='gnoFo']//button[@aria-label='More source languages']//div[3]`
    );
  }

  async enterSourceText(initial_text: string): Promise<void> {
    await this.page.fill(`textarea[aria-label='Source text']`, initial_text);
  }

  async readSource(fileName: string): Promise<string> {
    return readFileSync(`./textFiles/${fileName}`, 'utf-8');
  }

  async copyTranslation(): Promise<string> {
    await this.page.locator('[aria-label="Copy translation"]').click();

    this.page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    const affirmativeText = await this.page.evaluate(() =>
      navigator.clipboard.readText()
    );
    return affirmativeText;
  }

  async verifyTranslation(
    inputText: string,
    translatedText: string
  ): Promise<boolean> {
    if (inputText === `Demokratien` && translatedText === `Democracia`) {
      return true;
    } else if (translatedText === `Demokratien` && inputText === `Democracia`) {
      return true;
    } else {
      return false;
    }
  }

  async swapLanguages(): Promise<void> {
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

  async clearInputFields(): Promise<void> {
    await this.page.locator('[aria-label="Clear source text"]').click();
  }

  async selectVirtualKeyboard(): Promise<void> {
    await this.page.locator('a[role="button"]').nth(2).click();
  }

  async enterHi(): Promise<void> {
    await this.page.locator('#K16').first().click();
    await this.page.locator('#kbd button:has-text("H")').click();
    await this.page.locator('#kbd button:has-text("i")').click();
    await this.page.locator('#K16').first().click();
    await this.page.locator('button:has-text("!")').click();
  }
}
