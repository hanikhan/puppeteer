const puppeteer = require('puppeteer');

const username = process.env.USERNAME || 'hanikhan18';
const searchable = process.argv.includes('--searchable');

(async() => {

const browser = await puppeteer.launch();

const page = await browser.newPage();
await page.setViewport({width: 1200, height: 800, deviceScaleFactor: 2});
await page.goto(`https://twitter.com/${username}`);

// Can't use elementHandle.click() because it clicks the center of the element
// with the mouse. On tweets like https://twitter.com/hanikhan18/status/1041391572116332544
// there is an embedded card link to another tweet that it clicks.
await page.$eval(`.tweet[data-screen-name="${username}"]`, tweet => tweet.click());
await page.waitForSelector('.tweet.permalink-tweet', {visible: true});

const overlay = await page.$('.tweet.permalink-tweet');
const screenshot = await overlay.screenshot({path: 'screenshots/tweet.png'});

if (searchable) {
  await page.evaluate(tweet => {
    const width = getComputedStyle(tweet).width;
    tweet = tweet.cloneNode(true);
    tweet.style.width = width;
    document.body.innerHTML = `
      <div style="display:flex;justify-content:center;align-items:center;height:100vh;">;
        ${tweet.outerHTML}
      </div>
    `;
  }, overlay);
} else {
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          html, body {
            height: 100vh;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fafafa;
          }
          img {
            max-width: 60%;
            box-shadow: 3px 3px 6px #eee;
            border-radius: 6px;
          }
        </style>
      </head>
      <body>
        <img src="data:img/png;base64,${screenshot.toString('base64')}">
      </body>
    </html>
  `);
}

await page.pdf({path: 'screenshots/tweet.pdf', printBackground: true});

await browser.close();

})();