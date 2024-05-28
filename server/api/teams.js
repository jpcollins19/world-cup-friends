const app = require("express").Router();

const { Team } = require("../db/index.js");

app.get("/api/teams", async (req, res, next) => {
  try {
    const teams = await Team.findAll();

    res.send(teams);
  } catch (err) {
    next(err);
  }
});

app.put("/api/teams/:id", async (req, res, next) => {
  try {
    const team = await Team.findByPk(req.params.id);

    res.status(204).send(await team.update(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = app;
