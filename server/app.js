const express = require('express');
const cors = require('cors');
const rootRouter = require('./routers');
const { errorHandler } = require('./middlewares/errors');

const app = express();

app.use(express.json());
app.use(cors());

app.use(rootRouter);

app.use(errorHandler);

module.exports = app;