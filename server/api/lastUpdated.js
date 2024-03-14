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

app.put("/api/last-updated/:id", async (req, res, next) => {
  try {
    console.log("made it to the api request", req.body);
    // const lastUpdatedArr = await LastUpdated.findAll();
    //
    // console.log("lastUpdatedArr", lastUpdatedArr);
    // const lastUpdated = lastUpdatedArr[0];
    //
    // console.log("lastUpdated", lastUpdated);
    //
    // const answer = { id: lastUpdated.id, answer: req.body };
    //
    // console.log("answer", answer);
    //
    // res.status(204).send(await lastUpdated.update(answer));

    const lastUpdated = await LastUpdated.findByPk(req.params.id);
    res.status(204).send(await lastUpdated.update(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = app;
