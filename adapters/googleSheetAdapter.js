import * as dotenv from 'dotenv';
import { GoogleSpreadsheet } from 'google-spreadsheet';
dotenv.config({ path: 'variables.env' });

export const getDataPromise = async () => {
  // the unique id of the google sheet
  const doc = new GoogleSpreadsheet(
    '1At8j3RzGNs34LXe0maPZ2w7MDBKdWT8q3x_VALlKzco'
  );

  // connect with Google sheets
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  });

  await doc.loadInfo();
  // only get the first sheet
  const sheet = doc.sheetsByIndex[0];

  // get all the data from this sheet.
  const rows = await sheet.getRows();

  // only pass on the row data from the sheets
  const filteredRows = rows.map((row) => row._rawData);

  return filteredRows;
};
