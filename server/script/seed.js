const { db, User } = require("../db/index.js");

const users = [
  {
    email: "jpatcollins@gmail.com",
    password: "nugget",
    name: "Joe",
    isAdmin: true,
    tiebreaker: 101,
  },
  {
    email: "jack@gmail.com",
    password: "jack",
    name: "Jack",
  },
];

const syncAndSeed = async () => {
  await db.sync({ force: true });
  /////////////////////////////////////////////////////////////
  const [Joe, Jack] = await Promise.all(
    users.map((user) =>
      User.create({
        email: user.email,
        password: user.password,
        name: user.name,
        isAdmin: user.isAdmin,
        tiebreaker: user.tiebreaker,
      }),
    ),
  );
};

module.exports = syncAndSeed;
