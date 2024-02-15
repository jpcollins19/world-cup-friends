const app = require("express").Router();
const {
  models: { User },
} = require("../db/index.js");

module.exports = app;

app.post("/api/authorize", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

app.get("/api/me", async (req, res, next) => {
  try {
    res.send(await User.byToken(req.headers.authorization));
  } catch (err) {
    next(err);
  }
});

// app.post("/api/add/auth", async (req, res, next) => {
//   try {
//     const auth = await { ...req.body };
//     const user = await User.create(auth);
//     res.status(201).send(user);
//   } catch (err) {
//     next(err);
//   }
// });

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});
