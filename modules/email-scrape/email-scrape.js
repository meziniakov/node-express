const Scraper = require('email-crawler');

export async function getEmailScrape(req, res) {
  const url = req.body.url;
  const maxLevel = req.body.maxLevel;
  // res.status(200).json(url);

  const emailscraper = new Scraper(url);
  emailscraper
    .getLevels(maxLevel)
    .then(emails => {
      console.log(emails); // Here are the emails crawled from traveling two levels down this domain
      res.status(200).json(emails);
    })
    .catch(e => {
      console.log('error: ', e);
    });
}
