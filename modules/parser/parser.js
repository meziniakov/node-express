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
  const projectId = req.params.projectId;
  const keyword = encodeURI(req.params.keyword);
  const count = req.params.count;
  const result = [];

  for (let start = 0; start < count * 10; start = start + 10) {
    await axios
      .get(
        `https://www.google.com/search?q=${keyword}&start=${start}&hl=en&gl=us`,
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

        for (let i = 0; i < links.length; i++) {
          const url = new URL(links[i]);
          result[i] = {
            domain: url.protocol + '//' + url.host,
            link: links[i],
            title: titles[i],
            description: snippets[i],
            projects: [projectId],
          };
        }
        console.log(result);
        addDomain(result);
        res.status(200).json(result);
      })
      .catch(e => console.log(e));
  }

  async function addDomain(newDomain) {
    try {
      for (let i = 0; i < newDomain.length; i++) {
        const domain = await new Domain(newDomain[i]);
        if (await domain.save())
          console.log(`Домен ${domain.domain} успешно добавлен`);
      }
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: 'Ошибка добавления' });
    }
  }
}
