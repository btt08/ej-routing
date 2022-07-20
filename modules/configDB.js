const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, `../db.env`)
});

module.exports = {
  USER: process.env.USER,
  PWD: process.env.DBPWD,
  DB_NAME: process.env.DB_NAME
};