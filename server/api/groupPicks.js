const app = require("express").Router();

const { GroupPick } = require("../db/index.js");
const { User } = require("../db");

app.get("/api/group-picks", async (req, res, next) => {
  try {
    const picks = await GroupPick.findAll();

    res.send(picks);
  } catch (err) {
    next(err);
  }
});

app.post("/api/group-picks", async (req, res, next) => {
  try {
    const groupPickResult = await { ...req.body };

    const groupPick = await GroupPick.create(groupPickResult);

    res.status(201).send(groupPick);
  } catch (err) {
    next(err);
  }
});

app.put("/api/group-picks/:id", async (req, res, next) => {
  try {
    const pick = await GroupPick.findByPk(req.params.id);
    res.status(204).send(await pick.update(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = app;
