import 'module-alias/register';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app: express.Express = express();

const { PORT, NODE_ENV } = process.env;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.listen(PORT, () => {
  console.log(`> In ${NODE_ENV}`);
  console.log(`> Listening on ${PORT}`);
});
