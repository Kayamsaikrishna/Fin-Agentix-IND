
import express from 'express';
import { json, urlencoded } from 'body-parser';
import { testDbConnection } from './database/connection';
import { router } from './routes';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

testDbConnection();

app.use('/api', router);

export { app };
