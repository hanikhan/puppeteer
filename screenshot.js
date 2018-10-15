const puppeteer = require('puppeteer');

const config = {
    launchOptions: {
        headless: false
    },
    viewport:{width:1920, height:1080}
}

//locators
const registrationPage = {
    firstname: 'input[name="firstName"]',
    lastname: 'input[name="lastName"]',
    username: 'input[name="email"]',
    password:  'input[name="password"]',
    confirmPassword:  'input[name="confirmPassword"]',
    submit: 'input[name="register"]'
}

const registrationConfirmation = {
    sigin: 'a[href="mercurysignon.php"]'
}

puppeteer.launch(config.launchOptions).then(async browser => {
  const page = await browser.newPage();
  await page.setViewport(config.viewport)
  
  //mercury tours registration page
  await page.goto('http://newtours.demoaut.com/mercuryregister.php');

  //wait for the firstname to appear
  await page.waitFor(registrationPage.firstname);

  //enter the details
  await page.type(registrationPage.firstname, 'firstName');
  await page.type(registrationPage.lastname, 'lastName');
  await page.type(registrationPage.username, 'test');
  await page.type(registrationPage.password, 'password');
  await page.type(registrationPage.confirmPassword, 'password');

  const pos = await page.evaluate(selector => {
    const element = document.querySelector(selector);
    const {x, y, width, height} = element.getBoundingClientRect();
    return {x, y, width, height};
}, 'img[src="/images/masts/mast_register.gif"]');

  //take screenshot
  await page.screenshot({ path:'screenshots/demoAut.png', clip: pos})

  await page.click(registrationPage.submit);

  //after page submission check for the sign-in confirmation
  await page.waitFor(registrationConfirmation.sigin);
  await page.click(registrationConfirmation.sigin);

  await browser.close();    
});