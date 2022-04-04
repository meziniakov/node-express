import axios from 'axios';
import cheerio from 'cheerio';
const { scrapeEmails } = require('html-email-scraper');
const Domain = require('../../models/Domain');

const AXIOS_OPTIONS = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '1800',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    cookie:
      'SEARCH_SAMESITE=CgQIlZQB; HSID=AmSR1yQ6PTL7IzfZX; SSID=AhwkOCgH53Ba_bd5y; APISID=9XT0l2EkOUS_hJr5/A-IALt6V9213VeKjj; SAPISID=EMiHvEvtacy6oYKV/Azeq-JXfilKRi5-1L; __Secure-1PAPISID=EMiHvEvtacy6oYKV/Azeq-JXfilKRi5-1L; __Secure-3PAPISID=EMiHvEvtacy6oYKV/Azeq-JXfilKRi5-1L; SID=Igg4ug9R4PEAYIX5VLr-dJqqcGqbBJ-icZn31q32emIFA84nR7ARVEmnxn8wCCe3p5Ti7A.; __Secure-1PSID=Igg4ug9R4PEAYIX5VLr-dJqqcGqbBJ-icZn31q32emIFA84n73zX0opUv_FNga1CJdHIMg.; __Secure-3PSID=Igg4ug9R4PEAYIX5VLr-dJqqcGqbBJ-icZn31q32emIFA84nAhsOjhxWH3jXESCQhtq_Rg.; AEC=AVQQ_LC9X7i9bcYR0xlKgTr7p5o67sd6T5Zt3lHR-ZtgyO0kSgg9qU624w; NID=511=tYzwe5TAyVC9zZrRra45rMqlgUDWux0GkYTSukxki6U1z7XIEKfSbJC5Q_eJyDHHP9MhtGpEv8Clmxj408Ilyvb9x4z5SsLGnE8eMJPO7zJgpXN07Suf7JvE0TT8Rth06aW3UV5eM1cKTK0lRcM6P0avKF0PaXOnlsiQDB77fBkRFP_nk3FG_Jq2QRlVdFka9mrwbZ_5HLdFBv_EL8D7iMdr2QZJDT8uBQJaaVsVcTVe8N_yujub2ZUiNMPH7AfJ9ZjfW1GAMMsFQtgtxhBPiDw6YwJVOktbh_QOl9WHMNASmtqwTonsuBTbTlijn3n3aJHcbvs8d85LMQdk1938lfBPe9zc4jBTKVx2jMaJvSYTo4V98GmUpXJnnTp2DG9x0jvL4PWoIKUUC6ung0t_XuV3DwhP; 1P_JAR=2022-04-02-21; DV=w2SODZcxbHlZ0LiuPDVHP2UxIBnC_hchxDh5AdfYQQAAAFDnUmPnDIwfWgAAAOw7mDvytuuRGgAAAFgvVcgWkPXiEgAAAA',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
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
          { $addToSet: { projects: projectId } }
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

export async function getEmailsByGoogleSearch(req, res) {
  const { domain } = req.body;
  // const { domain } = req.params;
  // console.log(req.params);
  // return;
  const host = new URL(domain).host;
  host.replace('www.', '');
  let query = `site:${host} intext:@${host}`;
  let emails = [];
  try {
    await axios
      .get(
        `https://www.google.com/search?q=${query}&start=0&hl=en&gl=us`,
        AXIOS_OPTIONS
      )
      .then(({ data }) => {
        let $ = cheerio.load(data);
        emails = scrapeEmails($('*').text());
      });
    emails = [...new Set(emails)];
    console.log(emails);
    if (emails.length !== 0) {
      await Domain.updateOne({ domain }, { $addToSet: { emails } });
    }
    res.status(200).json({ emails });
  } catch (e) {
    console.log('Error: ', e);
  }
}
