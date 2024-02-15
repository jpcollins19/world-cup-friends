const Sequelize = require("sequelize");

const config = {
  logging: false,
};

if (process.env.LOGGING) {
  delete config.logging;
}

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/INSERT PG DB"

  //////////////insert db above//////////
);

module.exports = db;

//npm i @babel/core @babel/preset-react axios babel-loader nodemon react react-dom webpack webpack-cli redux react-redux redux-thunk redux-logger react-router-dom@5.3.0 mocha chai --save-dev && npm i express pg sequelize style-loader css-loader jsonwebtoken bcrypt dotenv

////////////////////////////////////////////

//do:  npm run start:dev -- this will get your dist folder to show

/* 

Move your unwanted data to the gitignore 

    echo node_modules >> .gitignore 
    echo dist/ >> .gitignore 

*/
