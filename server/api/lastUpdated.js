const app = require("express").Router();

const { LastUpdated } = require("../db/index.js");

app.get("/api/last-updated", async (req, res, next) => {
  try {
    const answers = await LastUpdated.findAll();

    res.send(answers[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
