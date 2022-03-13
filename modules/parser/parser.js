import axios from 'axios';
import cheerio from 'cheerio';
const Domain = require('../../models/Domain');

const AXIOS_OPTIONS = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
  },
};

export async function getOrganicSearch(req, res) {
  //распарсиваем post запрос
  const { projectId, count } = req.body;
  const encodeKeywords = encodeURI(req.body.keywords);
  const keywords = encodeKeywords.split(',');
  let { countUpdate, countInsert } = '';

  // keywords.forEach(async keyword => {
  const scrapeData = [];
  for (let k = 0; k < keywords.length; k++) {
    for (let start = 0; start < count * 10; start = start + 10) {
      await axios
        .get(
          `https://www.google.com/search?q=${keywords[k]}&start=${start}&hl=en&gl=us`,
          AXIOS_OPTIONS
        )
        .then(({ data }) => {
          let $ = cheerio.load(data);
          const links = [];
          const titles = [];
          const snippets = [];

          $('.yuRUbf > a').each((i, el) => {
            links[i] = $(el).attr('href');
          });
          $('.yuRUbf > a > h3').each((i, el) => {
            titles[i] = $(el).text();
          });
          $('.VwiC3b').each((i, el) => {
            snippets[i] = $(el).text().trim();
          });

          let result = {};
          for (let i = 0; i < links.length; i++) {
            const url = new URL(links[i]);
            result = {
              domain: url.protocol + '//' + url.host,
              link: links[i],
              title: titles[i],
              description: snippets[i],
              projects: [projectId],
            };
            scrapeData.push(result);
          }
        })
        .catch(e => console.log('Error', e));
    }
  }
  await addDomain(scrapeData);

  res.status(200).json({ countInsert: countInsert, countUpdate: countUpdate });

  async function addDomain(scrapeData) {
    try {
      //фильтруем
      const allDomain = scrapeData.map(el => el.domain);
      const existingRecords = await Domain.find({ domain: { $in: allDomain } });
      const existingDomains = existingRecords.map(el => el.domain);
      const missingItems = scrapeData.filter(
        item => !existingDomains.includes(item.domain)
      );
      const presentItems = scrapeData.filter(item =>
        existingDomains.includes(item.domain)
      );
      console.log('missingItems', missingItems);

      //insert to db
      if (missingItems.length > 0) {
        await Domain.insertMany(missingItems)
          .then(res => (countInsert = res.length - 1))
          .catch(e => console.log('Ошибка вставки новых записей', e));
      }

      //update to db
      if (presentItems.length > 0) {
        await Domain.updateMany(
          { domain: { $in: presentItems.map(item => item.domain) } },
          { $push: { projects: projectId } }
        )
          .then(res => (countUpdate = res.modifiedCount))
          .catch(e => console.log('Ошибка обновления записей', e));
      }

      // Проверяем существуют ли домены в базе
      // let domainExist = await Domain.findOne({ domain: newDomain.domain });
      // // Если существует то добавим projectId и сохраним
      // if (domainExist) {
      //   const domainUpdate = await Domain.updateOne(
      //     {
      //       domain: domainExist.domain,
      //     },
      //     {
      //       $addToSet: {
      //         projects: domainExist.projectId,
      //       },
      //     }
      //   );
      //   domainUpdate.save(err => {
      //     if (err) throw err;
      //     console.log(`Домен ${domainUpdate.domain} успешно обновлен`);
      //   });
      //   // иначе создаем новый домен
      // } else {
      //   const domain = await new Domain(newDomain);
      //   await domain.save(err => {
      //     if (err) throw err;
      //     console.log(`Домен ${domain.domain} успешно добавлен`);
      //   });
      // }
    } catch (e) {
      console.log('Ошибка добавления или обновления:', e);
    }
  }
}
