const Sequelize = require("sequelize");
const db = require("../db.js");
require("dotenv").config();

const { STRING, UUID, UUIDV4, BOOLEAN } = Sequelize;

const Team = db.define("teams", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  flag: {
    type: STRING,
  },
  group: {
    type: STRING,
  },
  outOfTourney: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Team;
