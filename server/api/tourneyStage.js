const app = require("express").Router();

const { TourneyStage } = require("../db/index.js");

app.get("/api/tourney-stage", async (req, res, next) => {
  try {
    const stages = await TourneyStage.findAll();

    res.send(stages[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
