import postRouter from '../post/Routes';
import authorRouter from '../author/Routes';
// import apiPostRouter from '../post/apiPostRoutes';
import userRouter from '../user/Routes';
import domainRouter from '../domains/Routes';
import projectRouter from '../project/Routes';
import calorieRouter from '../calorie/Routes';
import parserRouter from '../parser/Routes';
import megaindexRouter from '../megaindex/Routes';
// import { home } from '../../home';

export default function routes(app) {
  app.use('/api/calorie', calorieRouter);
  app.use('/api/parser/', parserRouter);
  app.use('/api/megaindex/', megaindexRouter);
  app.use('/api/user', userRouter);
  app.use('/api/domain', domainRouter);
  app.use('/api/project', projectRouter);
  app.use('/api/post', postRouter);
  // app.use('/api/post', apiPostRouter);
  app.use('/api/author', authorRouter);
  // app.use('/', home);
  //   app.get('/excel', (req, res) => {
  //   // let filename = "./xlsx/test2.xlsx";
  //   let filename = './xlsx/xlsx2json_ex1.xlsx';
  //   let sheets = [];

  //   excel2json.parse(filename, sheets, (err, data) => {
  //     if (!err) {
  //       excel2json.toJson(data, (err, json) => {
  //         try {
  //           // console.log(json);
  //           // const name = json.Test1.find((n) => n.name)
  //           // res.send(json);
  //           // console.log(json.Test1)
  //           const data = json.Test1;
  //           // console.log(data)
  //           for (let key in data) {
  //             console.log(key, ':', data[key].region);
  //           }

  //           res.render('excel.ejs', { data: data });
  //         } catch (e) {
  //           res.json({ message: 'Errors: ' + e });
  //         }
  //       });
  //     } else {
  //       console.log(err);
  //       res.json({ message: 'Errors: ' + err });
  //     }
  //   });
  // });
}
