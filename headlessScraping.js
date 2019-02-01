const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://www.amazon.in/Timex-Analog-Black-Womens-Watch-TW000W106/dp/B073P9PL6G?pd_rd_w=lA08V&pf_rd_p=c0be5bc9-5fdf-4ef0-8b42-c8bf5d86dfa0&pf_rd_r=4BNAJX1602WW4HRXZVTY&pd_rd_r=e567878e-c530-42ff-95bc-d4a82aed1380&pd_rd_wg=rg1XB&ref_=pd_gw_unk');
  } catch (error) {
    console.log(error);
    browser.close();
  }

  // inject jQuery to use it for selectors
  await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});

  // get all data from page
  console.log('scraping...')
  const data = await page.evaluate(() => {
    const obj = {}
    
    obj.title = $('#productTitle').text()
    
    const prices = []
    $('#availability > span').each(function () {
        prices.push($(this).text().trim());
    });
    
    obj.description = obj.title
    
    obj.main_image = '...'
    
    obj.price = prices
    
    obj.colors = '...'

    return obj
  });

  // write data object in external file
  console.log('write output file')
  fs.writeFileSync('./output.json', JSON.stringify(data), 'utf-8');

  await browser.close();
})();