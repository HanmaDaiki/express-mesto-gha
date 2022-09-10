require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000, DB_CONN } = process.env;
const app = express();
// id "631c31297da1e10941dbacd7"
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '631c31297da1e10941dbacd7',
  };

  next();
});

mongoose.connect(DB_CONN, {
  useNewUrlParser: true,
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.listen(PORT, () => {
  console.log(`Сервер запущен на порте: ${PORT}`);
});
