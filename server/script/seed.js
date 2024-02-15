const {
  db,
  models: { User },
} = require("../db/index.js");

const users = [
  {
    email: "joe@gmail.com",
    password: "joe_pw",
    name: "Joe",
  },
  {
    email: "frank@gmail.com",
    password: "frank_pw",
    name: "Frank",
  },
];

const syncAndSeed = async () => {
  await db.sync({ force: true });
  /////////////////////////////////////////////////////////////
  const [Joe, Frank] = await Promise.all(
    users.map((user) =>
      User.create({
        email: user.email,
        password: user.password,
        name: user.name,
      })
    )
  );
};

module.exports = syncAndSeed;
