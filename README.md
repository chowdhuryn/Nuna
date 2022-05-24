## Page Object Model Pattern with Playwright

![alt text](./playwright-logo.png)

This repository contains simple automation test framework written with TypeScript and Playwright and implements Page Object Model Pattern.

If you want to run test locally, please follow these steps:

1. Clone this repository
2. Make sure you have `node.js` installed. If you don't, please visit [official website](https://nodejs.org/en/download/) for instructions 
3. Run `npm install` to install node modules
4. That's it, now you can run tests with `npm run test` - it will run test in Chromium browser.

If you want to run it in headed mode, then change configuration to `headless: true` in `playwright.config.js`

The code performs the following actions:

1. Using Google Translate application (https://translate.google.com/)  

▪ select source language from the drop-down menu on the left 

▪ select translation language from the drop-down menu on the right 

▪ enter the initial text in the input field on the left 

▪ make sure that the actual translation result in the right field is correct 

2. Swaps languages button and verifies the result. 

3. Clears the input field, clicks "select input tool" button, selects "screen keyboard" and  enters "Hi!" 
