import { getDataPromise } from '../adapters/googleSheetAdapter.js';

export async function getPets(req, res){
  const rows = await getDataPromise();
  res.json(rows);
}