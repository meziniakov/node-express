const puppeteer = require('puppeteer');
const Domain = require('../../models/Domain');

const chromeOptions = {
  // executablePath:
  //   '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  slowMo: 10,
  defaultViewport: null,
  args: [
    '--disable-setuid-sandbox',
    '--window-size=1920,1080',
    // '--proxy-server=https://64.235.204.107:3128'
  ],
  ignoreHTTPSErrors: true,
};

async function startBrowser() {
  let browser;
  try {
    console.log('Открываю браузер......');
    browser = await puppeteer.launch(chromeOptions);
  } catch (err) {
    console.log('Could not create a browser instance => : ', err);
  }
  return browser;
}

async function parseMegaindex(browser, _id, domain) {
  const promise = new Promise(async (resolve, reject) => {
    const dataObj = {};
    try {
      let page = await browser.newPage();
      const megaindex = `https://ru.megaindex.com/info/${domain}`;
      // console.log(`Перехожу по адресу: ${megaindex}`);
      await page.goto(megaindex, { waitUntil: 'networkidle2' });
      // console.log('Ожидаю загрузки селектора: #serp .count');
      await page.waitForSelector('#serp .count');

      let traffic = await page.$eval('#serp .count', traffic_organic => {
        if (traffic_organic.textContent.includes('M')) {
          return (
            traffic_organic.textContent.replace(/[^0-9.,\s]/g, '') * 1000000
          );
        } else if (traffic_organic.textContent.includes('K')) {
          return traffic_organic.textContent.replace(/[^0-9.,\s]/g, '') * 1000;
        } else {
          return traffic_organic.textContent;
        }
      });
      dataObj['traffic'] = traffic ? traffic : '';
      // console.log('Траффик:' + dataObj['traffic']);

      let traffic_season = traffic !== '' ? dataObj['traffic'] * 0.9 : '';
      dataObj['traffic_season'] = traffic_season;
      // console.log('Сезонный траффик:' + dataObj['traffic_season']);

      let project_stage = 10;
      dataObj['project_stage'] = project_stage;

      let profit_await = traffic_season === '' ? '' : traffic_season * 0.3;
      dataObj['profit_await'] = profit_await;
      // console.log('Ожидаемый доход:' + dataObj['profit_await']);

      let evaluate_min =
        profit_await === '' ? '' : project_stage * profit_await * 0.5;
      dataObj['evaluate_min'] = evaluate_min;

      let evaluate_middle =
        profit_await === '' ? '' : project_stage * profit_await * 0.75;
      dataObj['evaluate_middle'] = evaluate_middle;

      let evaluate_max =
        profit_await === '' ? '' : project_stage * profit_await;
      dataObj['evaluate_max'] = evaluate_max;

      await page.close();
      // await browser.close();

      await Domain.updateOne({ _id }, { $set: dataObj });
      resolve(dataObj);
      reject('Error');
    } catch (err) {
      console.log('Ошибка => ', err);
    }
  });
  return promise;
}

async function scrapeAll(browser, idAndDomain) {
  const promise = new Promise(async (resolve, reject) => {
    try {
      let scrapedData = [];
      for (let index in idAndDomain) {
        let { _id, domain } = idAndDomain[index];
        domain = new URL(domain).host;
        domain.replace('www.', '');
        console.log('Opening ' + domain);
        console.log(domain);
        scrapedData[domain] = await parseMegaindex(browser, _id, domain);
        scrapedData.push(scrapedData[domain]);
      }
      resolve(scrapedData);
      await browser.close();
      reject('Error');
    } catch (err) {
      console.log('Could not resolve the browser instance => ', err);
    }
  });
  return promise;
}

export async function getData(req, res) {
  const idAndDomain = req.body;
  console.log(idAndDomain);
  // res.json({ domains });
  // domains = await Domain.find({ _id: { $in: ids } });
  // const urls = domains.map(row => row.domain);

  let browser = await startBrowser();
  console.log(browser);
  let result = await scrapeAll(browser, idAndDomain);
  res.status(201).json({ status: 'success', result: result });
}
