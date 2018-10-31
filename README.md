# Project for Basic Chrome Puppeteer examples:

### Setup
- Install dependencies : `npm install`

### Examples:
- Run a test that logs all devices available for emulation: `npm run logAllDevices`
- Run a test with iPhone emulation: `npm run iPhone`
- Run a test that uses custom viewport size: `npm run controlViewportSize`
- Run a test that uses selector and interaction on the page: `npm run demoAut`
- Run a test that takes screenshot: `npm run screenshot`
- Run a test that takes screenshot in headless mode: `npm run headlessScreenshot`
- Run a script that does headless scraping: `npm run headlessScraping`
- Run a test that uses chrome flags: `npm run chromeFlags`
- Sample for visual regression and loading pages side by side:
    - `node pageLoad_sideByside.js --no-throttle --no-mobile -u https://www.google.com/ https://www.google.co.uk/`
    - `node pageLoad_sideByside.js --url http://www.google.com http://www.google.co.uk`
- Sample for taking screenshot of particular element and converting it to PDF(headless)
    - `node element_to_pdf.js`
- Run a script that tests sound: `npm run sound`
- Run a script for performance/tracing: `npm run devTool_tracing`