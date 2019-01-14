const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const PuppeteerNetworkStats = require('puppeteer-network-stats');

const eventNames = [
    'requestWillBeSent',
    'requestServedFromCache',
    'loadingFinished',
    'loadingFailed',
    'responseReceived'
];

const eventCaptureConfig = eventNames.map(
    (event) => ({[event]: (params) => ({[event]: params})})
).reduce(
    (result, item) => ({...result, ...item}), {}
);

async function captureEventsById({url, deviceName}) {
    const browser = await puppeteer.launch({headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    const device = devices[deviceName];

    if (device) {
      await page.emulate(device);
    }
    await page.setCacheEnabled(false);

    const networkStats = new PuppeteerNetworkStats(eventCaptureConfig);
    await networkStats.attach(page);

    await page.goto(url, {timeout: 0, waitUntil: 'networkidle0'});

    await networkStats.detach();
    await browser.close();

    const events = networkStats.getRequests();

    return {device, events};
  }

  module.exports = {captureEventsById, eventNames, eventCaptureConfig};