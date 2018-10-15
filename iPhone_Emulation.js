const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

const config = {
    launchOptions: {
        headless: false
    }
}

puppeteer.launch(config.launchOptions).then(async browser => {
  const page = await browser.newPage();
  await page.emulate(iPhone)
  await page.goto('https://www.google.com');
  await browser.close();    
});