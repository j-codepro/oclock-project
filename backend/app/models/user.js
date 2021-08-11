const Sequelize = require("sequelize");
const sequelize = require("../database");

class User extends Sequelize.Model {}

User.init(
  {
    email: Sequelize.STRING,
    pseudo: Sequelize.STRING,
    password: Sequelize.STRING,
    lastname: Sequelize.STRING,
    firstname: Sequelize.STRING,
    avatar: Sequelize.STRING,
    reward_count: Sequelize.INTEGER,
    admin: Sequelize.BOOLEAN,
  },
  {
    sequelize,
    tableName: "user",
  }
);

module.exports = User;
