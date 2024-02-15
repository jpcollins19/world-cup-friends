const {
  db,
  models: { User },
} = require("../db/index.js");

const users = [
  {
    email: "jpatcollins@gmail.com",
    password: "nugget",
    name: "Joe",
  },
];

const syncAndSeed = async () => {
  await db.sync({ force: true });
  /////////////////////////////////////////////////////////////
  const [Joe] = await Promise.all(
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
