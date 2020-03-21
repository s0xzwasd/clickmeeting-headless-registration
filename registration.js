const fs = require(`fs-extra`);
const generator = require(`generate-password`);
const puppeteer = require(`puppeteer`);

const args = process.argv.slice(2);
const accountID = args[0];
const companyName = args[1];
const customEmail = args[2];

const addNewData = (login, password) => {
  fs.writeFile(`users.txt`, `${login};${password}\n`, { flag: `a+` }, error => {
    console.log(error ? error : `Values ​​were successfully saved to file!`);
  });
};

(async () => {
  const browser = await puppeteer.launch();
  const login = customEmail ? customEmail : `tb-master+${accountID}@ya.ru`;
  const page = await browser.newPage();
  const password = generator.generate({
    length: 10,
    numbers: true
  });
  const registrationPage = `https://clickmeeting.com/free-signup`;
  const successPage = `https://account-panel.clickmeeting.com/verify-account`;

  await page.setViewport({
    width: 1440,
    height: 800
  });

  if (isNaN(accountID)) {
    console.log(`Please use a numbers for ACCOUNT_ID. The previous value was: ${accountID}`);
    await browser.close();
    return process.exit(1);
  }

  await page.goto(registrationPage, { waitUntil: `networkidle0` });

  await page.type(`#user_name`, companyName);
  await page.type(`#user_email`, login);
  await page.type(`#user_password`, password);
  await page.$eval(`.check-element`, elem => elem.click());
  await page.$eval(`.btn-signup-free`, elem => elem.click());

  await page.waitForNavigation();

  if (page.url() === successPage) {
    console.log(`
      Registration successfull!
      User login: ${login}
      User password: ${password}
    `);
    addNewData(login, password);
  }

  await browser.close();
})();
