import bodyParser from 'body-parser';

export default function parseResponce(app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
}
