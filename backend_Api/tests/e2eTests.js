const { Builder, By, until } = require('selenium-webdriver');

describe('End-to-End Tests', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should register a new user', async () => {
    await driver.get('http://localhost:3000/signup');
    await driver.findElement(By.name('email')).sendKeys('test@example.com');
    await driver.findElement(By.name('password')).sendKeys('password123');
    await driver.findElement(By.css('button[type="submit"]')).click();
    const successMessage = await driver.wait(until.elementLocated(By.css('.success-message')), 5000);
    expect(await successMessage.getText()).toBe('Registration successful!');
  });

  it('should login an existing user', async () => {
    await driver.get('http://localhost:3000/login');
    await driver.findElement(By.name('email')).sendKeys('test@example.com');
    await driver.findElement(By.name('password')).sendKeys('password123');
    await driver.findElement(By.css('button[type="submit"]')).click();
    const dashboard = await driver.wait(until.elementLocated(By.css('.dashboard')), 5000);
    expect(await dashboard.isDisplayed()).toBe(true);
  });
});