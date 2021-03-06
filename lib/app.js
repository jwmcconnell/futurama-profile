const express = require('express');
const app = express();

const profiles = require('./routes/profiles');

app.use(express.json());

app.use('/api/v1/profiles', profiles);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status);
  res.send({ error: err, message: err.message });
});

module.exports = app;
