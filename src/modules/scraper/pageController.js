const pageScraper = require('./pageScraper');

async function scrapeAll(browserInstance, url) {
  let browser;
  try {
    browser = await browserInstance;
    let scrapedData = {};
    // for (link in urls) {
    // console.log('Получил домен: '+urls[link]);
    console.log('Получил домен: ' + url);
    // const domain = `https://be1.ru/stat/${new URL(urls[link]).hostname}`;
    // const url = urls[link];
    const domain = `https://be1.ru/stat/${url.replace('www.', '')}`;
    console.log('Перехожу по адресу: ' + domain);
    // scrapedData[urls[link]] = await pageScraper.scraper(browser, domain);
    scrapedData[url] = await pageScraper.scraper(browser, domain);
    // }
    // scrapedData['url'] = await pageScraper.scraper(browser, urls);
    // scrapedData['HistoricalFiction'] = await pageScraper.scraper(browser, 'Historical Fiction');
    await browser.close();
    console.log(JSON.stringify(scrapedData));
    return JSON.stringify(scrapedData);
  } catch (err) {
    console.log('Could not resolve the browser instance => ', err);
  }
}
module.exports = (browserInstance, urls) => scrapeAll(browserInstance, urls);
