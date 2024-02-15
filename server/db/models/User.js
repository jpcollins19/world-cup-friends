const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db.js");
require("dotenv").config();

const { STRING, UUID, UUIDV4 } = Sequelize;

const SALT_ROUNDS = 5;

const User = db.define("users", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  name: {
    type: STRING,
    defaultValue: null,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
});

User.addHook("beforeSave", async function (user) {
  if (user._changed.has("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
});

User.byToken = async (token) => {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id);
    if (user) {
      return user;
    }
    const error = Error("bad credentials - in byToken - on try");
    error.status = 401;
    throw error;
  } catch (err) {
    console.log("REEEEED", err);
    const error = Error("bad credentials - in byToken on catch");
    error.status = 401;
    throw error;
  }
};

User.authenticate = async ({ email, password }) => {
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.JWT, {
        expiresIn: 30 * 60,
      });
      return token;
    }
    const error = Error("bad credentials - in authenticate - try");
    error.status = 401;
    throw error;
  } catch (err) {
    console.log("REEED", err);
    const error = Error("bad credentials - in authenticate - catch");
    error.status = 401;
    throw error;
  }
};

module.exports = User;
