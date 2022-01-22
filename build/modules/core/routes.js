"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = routes;

var _Routes = _interopRequireDefault(require("../post/Routes"));

var _Routes2 = _interopRequireDefault(require("../author/Routes"));

var _apiPostRoutes = _interopRequireDefault(require("../post/apiPostRoutes"));

var _Routes3 = _interopRequireDefault(require("../user/Routes"));

var _home = require("../../home");

function routes(app) {
  app.use('/user', _Routes3["default"]);
  app.use('/post', _Routes["default"]);
  app.use('/api/post', _apiPostRoutes["default"]);
  app.use('/author', _Routes2["default"]);
  app.use('/', _home.home); //   app.get('/excel', (req, res) => {
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