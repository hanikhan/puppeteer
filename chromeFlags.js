const puppeteer = require('puppeteer');

const config = {
    launchOptions: {
        headless: false,
        args: [
            '--disable-infobars',
            //'--start-maximized',
            '--start-fullscreen'
          ]
    },
}

puppeteer.launch(config.launchOptions).then(async browser => {
    const page = await browser.newPage();
    //await page.setViewport({width: 1920, height: 1080});
    await page.goto('http://google.com');
    await page.evaluate('document.documentElement.webkitRequestFullscreen()');
    await page.waitFor(5000);
    await browser.close(); 
});