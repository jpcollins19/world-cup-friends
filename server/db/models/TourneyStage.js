const Sequelize = require("sequelize");
const db = require("../db.js");
require("dotenv").config();

const { UUID, UUIDV4, INTEGER } = Sequelize;

const TourneyStage = db.define("tourneyStages", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  stage: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

module.exports = TourneyStage;
