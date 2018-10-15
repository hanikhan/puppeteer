const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://google.com');
  await page.screenshot({ path: 'screenshots/google.png' });
  
  browser.close();
}

run();