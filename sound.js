const puppeteer = require('puppeteer');

const URL = 'https://www.youtube.com/watch?v=lhZOFUY1weo';

(async() => {
// Note: headless doesn't play audio. Launch headful chrome.
const browser = await puppeteer.launch({headless: false});
const page = await browser.newPage();
await page.goto(URL, {waitUntil: 'networkidle2'});

const playingAudio = await page.evaluate(() => {
  const mediaEls = Array.from(document.querySelectorAll('audio,video'));
  return mediaEls.every(el => el.duration > 0 && !el.paused);
});

console.log('Playing audio:', playingAudio);
await browser.close();
})();