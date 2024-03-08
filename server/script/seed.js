const { db, User, TourneyStage } = require("../db/index.js");

const tourneyStage = 1;

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

  await TourneyStage.create({
    stage: tourneyStage,
  });
};

module.exports = syncAndSeed;
