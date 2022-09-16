//import * as dotenv from 'dotenv';
import express from 'express';
import indexRouter from './routes/index.js';
//dotenv.config({ path: 'variables.env' });

console.log('🦊', process.env.SUPABASE_URL);

const app = express();

// support json encoded and url-encoded bodies, mainly used for post and update
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

//add error handling
// TODO: add centralised error handling

app.listen(3010, () => {
  console.log('Simple service started on port 3010');
});
