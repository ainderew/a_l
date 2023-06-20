import { Builder, until, By, Key } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import { config } from './config';

const URL = config.M_URL;

const options = new chrome.Options();
options.addArguments('--headless');

export async function successMessage(message) {
  const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    await driver.get(URL);
    const userNameInput = await driver.findElement({ id: 'email' });
    await userNameInput.sendKeys(config.M_USER);
    const userPasswordInput = await driver.findElement({ id: 'pass' });
    await userPasswordInput.sendKeys(config.M_PASS);
    const loginBtn = await driver.wait(
      until.elementLocated(By.css('[data-testid="royal_login_button"]')),
    );
    await loginBtn.click();

    await driver.wait(until.urlIs(config.M_URL), 10000);

    await driver.get(config.S_URL);
    await driver.actions().sendKeys(Key.ESCAPE).perform();
    const messageBtn = await driver.wait(until.elementLocated(By.css('[aria-label="Message"]')));
    await messageBtn.click();
    await driver.actions().sendKeys(Key.ESCAPE).perform();
    await messageBtn.click();

    const delayInMilliseconds = 7000;
    await new Promise(resolve => setTimeout(resolve, delayInMilliseconds));

    await driver.actions().sendKeys(message).perform();
    await driver.actions().sendKeys(Key.ENTER).perform();
    // await sendBtn.click();
  } catch (err) {
    throw err;
  }
}
