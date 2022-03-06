import excel2json from 'excel2json';
// let filename = "./xlsx/xlsx2json_ex1.xlsx";
let filename = './xlsx/test.xlsx';
// let filename = "./xlsx/reestr.xlsx";

let sheets = '1';
excel2json.parse(filename, sheets, (err, data) => {
  console.log(data);
  excel2json.toJson(data, function (err, json) {
    console.log(json);
    // {
    //    Test: {
    //        first: {
    //            _id: 'first',
    //            obj: { code: 'one', value: 1 }
    //        },
    //        second: {
    //            _id: 'second',
    //            obj: { code: 'two', value: 2 }
    //        }
    //    }
    // }
  });
});
