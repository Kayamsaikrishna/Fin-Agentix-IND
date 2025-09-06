const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { Model } = require('objection');
const knex = require('knex');
const knexfile = require('../knexfile');
const routes = require('./routes');

const app = express();

// Initialize knex
const db = knex(knexfile.development);
Model.knex(db);

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`User Service listening on port ${PORT}`);
});