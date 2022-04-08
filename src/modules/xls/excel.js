import XLSX, { utils } from 'xlsx';
import fs from 'fs';
import Reestr from '../../models/Reestr';

export async function getXlsx(req, res) {
  var buf = fs.readFileSync(__dirname + '/reestr.xlsx');
  var wb = XLSX.read(buf, { type: 'buffer' });

  var data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
  // const data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
  //   header: 1,
  // });

  function ExcelDateToJSDate(date) {
    return new Date(Math.round((date - 25569) * 86400 * 1000));
  }

  // console.log(ExcelDateToJSDate(44116));
  // await db.collection('coll').insertMany(data, { ordered: true });
  const dat = 'Дата договора';
  data[0][dat] = ExcelDateToJSDate(data[0][dat]);

  console.log(data[0]);
  const newReestr = await new Reestr(data[0]);
  await newReestr
    .save()
    .then(() =>
      res.status(200).json({ status: 'success', message: 'newReestr saved' })
    )
    .catch(e => {
      console.log(e);
      res.status(200).json({ status: 'error', message: 'newReestr not saved' });
    });
}
