import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import logger from './modules/core/logger';
import parseResponce from './modules/core/parseResponce';
import cors from './modules/core/cors';
import errorHandler from './modules/core/errorHandler';
import routes from './modules/core/routes';
import config from 'config';

mongoose
  .connect(config.get('mongoURI'))
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const app = express();
const PORT = config.get('port') || 5000;
app.use(express.json({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

logger(app);
parseResponce(app);
cors(app);
routes(app);
errorHandler(app);

app.listen(PORT, () => {
  console.log('Сервер запущен на порту: ' + PORT);
});
