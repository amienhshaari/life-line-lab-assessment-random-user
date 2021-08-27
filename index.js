const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const User = require('./schema/user');
require('dotenv').config();

mongoose.connect(
  `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

app.get('/', async (req, res) => {
  const allUsers = await User.find();
  const randomIndex = Math.floor(Math.random() * 9);

  res.json(allUsers[randomIndex]);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
