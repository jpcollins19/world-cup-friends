const Sequelize = require("sequelize");
const db = require("../db.js");
require("dotenv").config();

const { UUID, UUIDV4, STRING } = Sequelize;

const LastUpdated = db.define("lastUpdates", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  answer: {
    type: STRING,
    allowNull: false,
    defaultValue: "",
  },
});

module.exports = LastUpdated;
