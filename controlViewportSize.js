const puppeteer = require('puppeteer');

const config = {
    launchOptions: {
        headless: false
    },
    viewport:{width:920, height:1080}
}

puppeteer.launch(config.launchOptions).then(async browser => {
  const page = await browser.newPage();
  await page.setViewport(config.viewport)
  await page.goto('https://www.google.com');
  await browser.close();    
});