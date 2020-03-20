const puppeteer = require("puppeteer");
const generator = require("generate-password");
const fs = require("fs-extra");

const args = process.argv.slice(2);
const accountID = args[0];
const companyName = args[1];

const delay = time => {
  return new Promise(function(resolve) {
    setTimeout(resolve, time);
  });
};

const addNewData = (login, password) => {
  fs.writeFile("users.txt", login + ";" + password + "\n", { flag: "a+" }, err => {
    console.log(err ? err : "No errors! :)");
  });
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const registrationPage = "https://clickmeeting.com/free-signup";
  const successPage = "https://account-panel.clickmeeting.com/verify-account";
  const login = "tb-master+" + accountID + "@ya.ru";
  const password = generator.generate({
    length: 10,
    numbers: true
  });

  if (isNaN(accountID)) {
    console.log("Please use a number for ACCOUNT_ID");
    await browser.close();
    return process.exit(1);
  }

  await page.setViewport({
    width: 1440,
    height: 800
  });

  await page.goto(registrationPage, { waitUntil: "networkidle0" });

  await page.type("#user_name", companyName);
  await page.type("#user_email", login);
  await page.type("#user_password", password);

  await delay(2000);

  await page.$eval(".check-element", elem => elem.click());

  await delay(3000);

  await page.$eval(".btn-signup-free", elem => elem.click());

  await page.waitForNavigation();

  if (page.url() === successPage) {
    console.log("Registration successfull");
    console.log("User login: " + login);
    console.log("User password: " + password);

    addNewData(login, password);
  }

  await browser.close();
})();
