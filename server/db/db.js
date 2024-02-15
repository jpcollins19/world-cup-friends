const Sequelize = require("sequelize");

const config = {
  logging: false,
};

if (process.env.LOGGING) {
  delete config.logging;
}

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/world-cup"
);

module.exports = db;

//npm i +++ --save-dev
// @babel/core
// nodemon
// redux-logger
// mocha
// chai


//npm i
// style-loader
// css-loader
