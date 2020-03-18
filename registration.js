const puppeteer = require("puppeteer");

function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time);
  });
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://stackoverflow.com/users/login");
  await page.type("#email", "email");
  await page.type("#password", "password");

  await delay(4000);

  await page.$eval("#submit-button", elem => elem.click());

  await page.waitForNavigation();

  console.log("New Page URL:", page.url());

  await page.screenshot({ path: "example.png" });

  await browser.close();
})();
