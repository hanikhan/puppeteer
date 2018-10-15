const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

let config = {
    launchOptions: {
        headless: false
    }
}

puppeteer.launch(config.launchOptions).then(async browser => {
  const page = await browser.newPage();
  //Check all configurations available with puppeteer
  console.log(devices);
  //simple test
  await page.goto('https://www.google.com');
  await browser.close();    
});