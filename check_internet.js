const util = require('util');
const dns = require('dns');
const puppeteer = require('puppeteer');

async function isConnected() {
  try {
    const lookupService = util.promisify(dns.lookupService);
    const result = await lookupService('8.8.8.8', 53);
    return true;
  } catch (err) {
    return false;
  }
}

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();

  page.on('online', () => console.info('Online!'));
  page.on('offline', () => console.info('Offline!'));

  // Adds window.connectionChange in page.
  await page.exposeFunction('connectionChange', async online => {
    // Since online/offline events aren't 100% reliable, do an
    // actual dns lookup to confirm connectivity.
    const isReallyConnected = await isConnected();
    page.emit(isReallyConnected ? 'online' : 'offline');
  });

  // Monitor browser online/offline events in the page.
  await page.evaluateOnNewDocument(() => {
    window.addEventListener('online', e => window.connectionChange(navigator.onLine));
    window.addEventListener('offline', e => window.connectionChange(navigator.onLine));
  });

  // Kick off a navigation so evaluateOnNewDocument runs.
  await page.goto('data:text/html,hi');

  // await browser.close(); // Don't close the browser so we can monitor!

  //run the code and try turning internet connection on/off to validate the logic
});