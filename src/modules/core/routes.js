import postRouter from '../post/Routes';
import authorRouter from '../author/Routes';
// import apiPostRouter from '../post/apiPostRoutes';
import userRouter from '../user/Routes';
import domainRouter from '../domains/Routes';
import projectRouter from '../project/Routes';
import calorieRouter from '../calorie/Routes';
import parserRouter from '../parser/Routes';
import emailScrapeRouter from '../email-scrape/Routes';
import megaindexRouter from '../megaindex/Routes';
import xlsxRouter from '../xls/Routes';

export default function routes(app) {
  app.use('/api/calorie', calorieRouter);
  app.use('/api/xlsx', xlsxRouter);
  app.use('/api/parser/', parserRouter);
  app.use('/api/email-scrape/', emailScrapeRouter);
  app.use('/api/megaindex/', megaindexRouter);
  app.use('/api/user', userRouter);
  app.use('/api/domain', domainRouter);
  app.use('/api/project', projectRouter);
  app.use('/api/post', postRouter);
  // app.use('/api/post', apiPostRouter);
  app.use('/api/author', authorRouter);
}
