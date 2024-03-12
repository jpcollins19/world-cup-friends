const { db, User, TourneyStage, LastUpdated } = require("../db/index.js");

const tourneyStage = 1;
const lastUpdated = "4/9/24 at 1:30 PM CT";

const users = [
  {
    email: "jpatcollins@gmail.com",
    password: "nugget",
    name: "Joe",
    isAdmin: true,
    tiebreaker: 101,
    emailNotifications: true,
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
        emailNotifications: user.emailNotifications,
      }),
    ),
  );

  await TourneyStage.create({
    stage: tourneyStage,
  });

  await LastUpdated.create({
    answer: lastUpdated,
  });
};

module.exports = syncAndSeed;
