const app = require("express").Router();

const { User } = require("../db/index.js");

app.get("/api/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (err) {
    next(err);
  }
});

app.put("/api/users/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(204).send(await user.update(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = app;
