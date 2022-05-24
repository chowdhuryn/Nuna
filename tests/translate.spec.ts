import { test, expect } from '@playwright/test';

import { HomePage } from '../pages/home-page';

test('User navigates to Google Translate', async ({ page }) => {
  const translatePage = new HomePage(page);

  await translatePage.open();

  const source_language = await translatePage.readSourceFile(
    'sourceLanguage.txt'
  );
  await translatePage.selectSource(source_language);

  const desination_language = await translatePage.readDestinationFile(
    'destinationLanguage.txt'
  );
  await translatePage.selectDestination(desination_language);

  let initial_text = await translatePage.readSource('initialText.txt');
  await translatePage.enterSourceText(initial_text);
  let translatedText = await translatePage.copyTranslation();
  // console.log(`initialText: `, initial_text);
  // console.log(`translatedText: `, translatedText);
  expect(
    await translatePage.verifyTranslation(initial_text, translatedText)
  ).toBe(true);

  await translatePage.swapLanguages();
  translatedText = initial_text;
  // console.log(`retranslatedText: `, translatedText);
  initial_text = await translatePage.getSourceText();
  // console.log(`reInitializedText: `, initial_text);
  expect(
    await translatePage.verifyTranslation(translatedText, initial_text)
  ).toBe(true);

  await translatePage.clearInputFields();
  await translatePage.selectVirtualKeyboard();
  await translatePage.enterHi();
});
