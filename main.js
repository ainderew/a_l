import { Builder, until, By } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import cron from 'node-cron';
import { config } from './config.js';
import { successMessage } from './message.js';

const URL = config.URL;

const getFormattedDate = () => {
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return `${months[month]} ${date}`;
};

await successMessage(getFormattedDate());
const options = new chrome.Options();
options.addArguments('--headless');

console.log('AUTOMATE ATTENDANCE RUNNING...');

async function login() {
  const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    await driver.get(URL);
    const userNameInput = await driver.findElement({ id: 'txtUsername' });
    await userNameInput.sendKeys(config.USERNAME);
    const userPasswordInput = await driver.findElement({ id: 'txtPassword' });
    await userPasswordInput.sendKeys(config.PASS);
    await driver.findElement({ id: 'btnLogIn' }).click();

    const anotherButton1 = await driver.wait(
      until.elementLocated(By.css('[data-bind="click: toggleClock"]')),
    );
    await driver.wait(until.elementIsVisible(anotherButton1));
    await anotherButton1.click();

    const anotherButton = await driver.wait(
      until.elementLocated(By.css('[data-bind="click: webBundyLogIn"]')),
    );

    await driver.wait(until.elementIsVisible(anotherButton));
    await anotherButton.click();

    const timeInBtn = await driver.wait(
      until.elementLocated(By.css('[data-bb-handler="success"]')),
    );

    await driver.wait(until.elementIsVisible(timeInBtn));
    await timeInBtn.click();

    const date = getFormattedDate();
    await successMessage(`LOGGED IN ${date}`);
    console.log(`LOGGED IN ${getFormattedDate()}`);
  } catch (err) {
    throw err;
  }
}

async function logout() {
  const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    await driver.get(URL);
    const userNameInput = await driver.findElement({ id: 'txtUsername' });
    await userNameInput.sendKeys(config.USERNAME);
    const userPasswordInput = await driver.findElement({ id: 'txtPassword' });
    await userPasswordInput.sendKeys(config.PASS);
    await driver.findElement({ id: 'btnLogIn' }).click();

    const anotherButton1 = await driver.wait(
      until.elementLocated(By.css('[data-bind="click: toggleClock"]')),
    );
    await driver.wait(until.elementIsVisible(anotherButton1));
    await anotherButton1.click();

    const anotherButton = await driver.wait(
      until.elementLocated(By.css('[data-bind="click: webBundyLogOut"]')),
    );

    await driver.wait(until.elementIsVisible(anotherButton));
    await anotherButton.click();

    const timeOutBtn = await driver.wait(
      until.elementLocated(By.css('[data-bb-handler="success"]')),
    );
    await driver.wait(until.elementIsVisible(timeOutBtn));
    await timeOutBtn.click();

    const date = getFormattedDate();
    console.log(`LOGGED OUT ${date}`);
    await successMessage(`LOGGED OUT ${getFormattedDate()}`);
    console.log(`LOGGED IN ${getFormattedDate()}`);
  } catch (err) {
    throw err;
  }
}

cron.schedule(
  '0 6,22 * * 1-5',
  function () {
    const time = new Date().getHours();

    if (time === 22) {
      login();
    } else {
      logout();
    }
  },
  {
    timezone: 'Asia/Manila',
  },
);
