const app = require("express").Router();

const { GroupPick } = require("../db/index.js");

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
    console.log("req", req);
    console.log("res", res);

    const groupPickResult = await { ...req.body };

    console.log("groupPick api call", groupPickResult);

    const groupPick = await GroupPick.create(groupPickResult);

    res.status(201).send(groupPick);
  } catch (err) {
    next(err);
  }
});

// app.put("/api/group-picks/:id", async (req, res, next) => {
//   try {
//     const pick = await Team.GroupPick(req.params.id);
//
//     res.status(204).send(await pick.update(req.body));
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = app;
