const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.emulate(devices['iPhone X']);
  //start the tracing. open Chrome devtools > Performance and click on the up arrow button to open the trace file.
  await page.tracing.start({path: 'trace.json',screenshots:true});
  await page.goto('https://www.google.com')
  //stop the tracing
  await page.tracing.stop();
  await browser.close()
})()