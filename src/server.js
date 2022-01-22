import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import keys from './modules/core/keys';
import logger from './modules/core/logger';
import parseResponce from './modules/core/parseResponce';
import cors from './modules/core/cors';
import errorHandler from './modules/core/errorHandler';
import routes from './modules/core/routes';

mongoose
  .connect(keys.mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

export const app = express();
const port = 7000;
app.use(express.json());
app.use('/static', express.static((__dirname, 'static')));
app.set('view engine', 'ejs');

const clientPath = path.join(__dirname, '/client');
app.use(express.static(clientPath));

logger(app);
parseResponce(app);
cors(app);
routes(app);
errorHandler(app);

app.listen(port, () => {
  console.log('Сервер запущен на порту: ' + port);
});
