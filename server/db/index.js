const db = require("./db");
const User = require("./models/User");
const Team = require("./models/Team");
const GroupPick = require("./models/GroupPick");
const TourneyStage = require("./models/TourneyStage");
const LastUpdated = require("./models/LastUpdated");

module.exports = { db, User, Team, GroupPick, TourneyStage, LastUpdated };
