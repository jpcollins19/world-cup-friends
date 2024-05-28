const Sequelize = require("sequelize");
const db = require("../db.js");
require("dotenv").config();

const { STRING, UUID, UUIDV4, INTEGER, BOOLEAN } = Sequelize;

const GroupPick = db.define("groupPicks", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  userUuid: {
    type: UUID,
    allowNull: false,
  },
  teamUuid: {
    type: UUID,
    allowNull: false,
  },
  groupLetter: {
    type: STRING,
    allowNull: false,
  },
  groupPlacement: {
    type: INTEGER,
    allowNull: false,
  },
  thirdPlaceToAdvanceToKo: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = GroupPick;
